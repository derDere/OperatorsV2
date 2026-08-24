// Funk-Kanäle über WebSockets — imitiert Funkverkehr zwischen den Frontends.
//
// Clients verbinden sich auf /ws?channel=<name>&role=listen|send. Je Kanal hält
// der Server einen flüchtigen Bytewert (0-255) ausschließlich im Speicher:
//
//  - Ein Kanal existiert nur, solange mindestens ein Horcher (role=listen)
//    verbunden ist. Sendungen in einen Kanal ohne Horcher verpuffen ungespeichert.
//  - Eingehende Werte werden nicht sofort verarbeitet, sondern gesammelt und in
//    einem festen Takt abgearbeitet (Game-Server-Prinzip): jeder Client wird
//    gleich behandelt, keiner kann die anderen durch Massensenden blockieren.
//  - Alle Sendungen eines Takts überlagern sich bitweise (ODER) zum neuen
//    Kanalwert — wie gleichzeitiger Funkverkehr auf einer Frequenz.
//  - Ändert sich der Kanalwert, geht er als Text an alle Horcher des Kanals.
//  - Sendet eine Weile niemand, verklingt das Signal: der Wert fällt auf 0.
//
// Das WebSocket-Protokoll (RFC 6455) ist bewusst ohne Abhängigkeiten
// implementiert — nur der kleine Ausschnitt, den dieser Server braucht:
// unfragmentierte Text- und Kontroll-Frames bis 125 Byte Nutzlast.

const crypto = require('crypto')

const TICK_RATE = 20 // Takte je Sekunde
const DECAY_TICKS = 20 // Takte ohne Sendung, nach denen das Signal auf 0 verklingt
const MAX_PAYLOAD = 125 // längste Nutzlast (kurze Längenform von RFC 6455)
const WS_MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11' // Handshake-Konstante aus RFC 6455

const OPCODE_TEXT = 0x1
const OPCODE_CLOSE = 0x8
const OPCODE_PING = 0x9
const OPCODE_PONG = 0xA

// Je Kanalname: { value, listeners: Set<net.Socket>, tickAccum, ticksSinceSend }.
// tickAccum sammelt die ODER-Überlagerung aller Sendungen des laufenden Takts
// (null = in diesem Takt kam nichts an).
const channels = new Map()

function handleUpgrade(req, socket, head) {
	const url = new URL(req.url, 'http://localhost')
	const channelName = url.searchParams.get('channel')
	const role = url.searchParams.get('role')
	const key = req.headers['sec-websocket-key']

	if (!channelName || (role != 'listen' && role != 'send') || !key) {
		socket.write('HTTP/1.1 400 Bad Request\r\n\r\n')
		socket.destroy()
		return
	}

	const accept = crypto.createHash('sha1').update(key + WS_MAGIC).digest('base64')
	socket.write(
		'HTTP/1.1 101 Switching Protocols\r\n' +
		'Upgrade: websocket\r\n' +
		'Connection: Upgrade\r\n' +
		'Sec-WebSocket-Accept: ' + accept + '\r\n' +
		'\r\n'
	)
	socket.setNoDelay(true)

	const client = {
		socket: socket,
		channelName: channelName,
		role: role,
		buffer: (head && head.length > 0) ? head : Buffer.alloc(0)
	}

	if (role == 'listen') {
		let chan = channels.get(channelName)
		if (!chan) {
			chan = { value: 0, listeners: new Set(), tickAccum: null, ticksSinceSend: 0 }
			channels.set(channelName, chan)
		}
		chan.listeners.add(socket)
		sendText(socket, String(chan.value)) // beim Einschalten den aktuellen Stand hören
	}

	socket.on('data', (data) => {
		client.buffer = Buffer.concat([client.buffer, data])
		parseFrames(client)
	})
	socket.on('error', () => socket.destroy())
	socket.on('close', () => removeClient(client))

	if (client.buffer.length > 0) {
		parseFrames(client)
	}
}

function removeClient(client) {
	if (client.role != 'listen') {
		return
	}
	const chan = channels.get(client.channelName)
	if (!chan) {
		return
	}
	chan.listeners.delete(client.socket)
	if (chan.listeners.size <= 0) {
		channels.delete(client.channelName) // niemand horcht mehr → Eintrag komplett weg
	}
}

// Zerlegt den Empfangspuffer eines Clients in WebSocket-Frames. Frames können
// über TCP-Pakete verteilt oder darin zusammengefasst ankommen, daher wird
// gesammelt und in einer Schleife entnommen, solange ein Frame vollständig ist.
function parseFrames(client) {
	while (true) {
		const buf = client.buffer
		if (buf.length < 2) {
			return
		}

		const fin = (buf[0] & 0x80) != 0
		const opcode = buf[0] & 0x0f
		const masked = (buf[1] & 0x80) != 0
		let len = buf[1] & 0x7f
		let offset = 2

		if (len == 126) {
			if (buf.length < 4) {
				return
			}
			len = buf.readUInt16BE(2)
			offset = 4
		}

		// Client-Frames müssen maskiert sein; Fragmente und lange Frames braucht
		// dieses Protokoll nicht (die Nutzlast ist maximal eine dreistellige Zahl).
		if (!fin || !masked || len > MAX_PAYLOAD) {
			closeClient(client)
			return
		}

		if (buf.length < offset + 4 + len) {
			return // Frame noch unvollständig — auf weitere TCP-Daten warten
		}

		const mask = buf.subarray(offset, offset + 4)
		const payload = Buffer.from(buf.subarray(offset + 4, offset + 4 + len))
		for (let i = 0; i < payload.length; i++) {
			payload[i] ^= mask[i % 4]
		}
		client.buffer = buf.subarray(offset + 4 + len)

		handleFrame(client, opcode, payload)
		if (client.socket.destroyed) {
			return
		}
	}
}

function handleFrame(client, opcode, payload) {
	if (opcode == OPCODE_TEXT) {
		if (client.role == 'send') {
			handleSend(client.channelName, payload.toString())
		}
	}
	else if (opcode == OPCODE_PING) {
		sendFrame(client.socket, OPCODE_PONG, payload)
	}
	else if (opcode == OPCODE_CLOSE) {
		closeClient(client)
	}
	// alles andere (Binär, Pong, ...) wird ignoriert
}

function handleSend(channelName, text) {
	const chan = channels.get(channelName)
	if (!chan) {
		return // niemand horcht — die Sendung verpufft
	}
	const value = parseInt(text)
	if (isNaN(value)) {
		return
	}
	chan.tickAccum = (chan.tickAccum === null ? 0 : chan.tickAccum) | (value & 255)
}

// Der zentrale Takt: verrechnet je Kanal die Sendungen des letzten Takts und
// lässt Signale verklingen, in die niemand mehr sendet.
function tick() {
	for (const chan of channels.values()) {
		let newValue = chan.value

		if (chan.tickAccum !== null) {
			newValue = chan.tickAccum
			chan.tickAccum = null
			chan.ticksSinceSend = 0
		}
		else {
			chan.ticksSinceSend += 1
			if (chan.ticksSinceSend >= DECAY_TICKS) {
				newValue = 0
			}
		}

		if (newValue != chan.value) {
			chan.value = newValue
			broadcast(chan, String(newValue))
		}
	}
}

function broadcast(chan, text) {
	for (const socket of chan.listeners) {
		sendText(socket, text)
	}
}

function sendText(socket, text) {
	sendFrame(socket, OPCODE_TEXT, Buffer.from(text))
}

function sendFrame(socket, opcode, payload) {
	if (socket.destroyed) {
		return
	}
	const frame = Buffer.alloc(2 + payload.length)
	frame[0] = 0x80 | opcode // FIN + Opcode
	frame[1] = payload.length // kurze Längenform reicht (<= 125 Byte)
	payload.copy(frame, 2)
	socket.write(frame)
}

function closeClient(client) {
	sendFrame(client.socket, OPCODE_CLOSE, Buffer.alloc(0))
	client.socket.destroy() // das 'close'-Event räumt den Client aus dem Kanal
}

setInterval(tick, 1000 / TICK_RATE)

module.exports = { handleUpgrade }
