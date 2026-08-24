// Wiederverwendbare WebSocket-Verbindung zu einem Funk-Kanal des Servers.
//
// Verbindet sich auf /ws?channel=<name>&role=listen|send, hält die Verbindung
// mit automatischem Reconnect offen und meldet Statuswechsel sowie empfangene
// Kanalwerte über Callbacks. Wird von den Network-Operatoren verwendet.

const WS_RECONNECT_DELAY_MS = 1000

class ChannelSocket {

	constructor(channel, role) {
		this.channel = channel
		this.role = role // 'listen' oder 'send'
		this.isConnected = false

		this.onValue = null // callback(value) — empfangener Kanalwert (0-255)
		this.onStatus = null // callback(isConnected) — bei jedem Statuswechsel

		this._socket = null
		this._reconnectTimer = null
		this._killed = false

		this._open()
	}

	_url() {
		let protocol = (location.protocol == 'https:') ? 'wss://' : 'ws://'
		return protocol + location.host + '/ws' +
			'?channel=' + encodeURIComponent(this.channel) +
			'&role=' + encodeURIComponent(this.role)
	}

	_open() {
		if (this._killed) {
			return
		}
		let socket
		try {
			socket = new WebSocket(this._url())
		}
		catch {
			// z. B. direkt als Datei geöffnete Seite (kein Host) — später erneut versuchen
			this._scheduleReconnect()
			return
		}
		this._socket = socket
		socket.onopen = () => this._setConnected(true)
		socket.onclose = () => {
			this._setConnected(false)
			this._scheduleReconnect()
		}
		socket.onmessage = (event) => {
			let value = parseInt(event.data)
			if (!isNaN(value) && this.onValue) {
				this.onValue(value & 255)
			}
		}
	}

	_setConnected(connected) {
		if (this.isConnected == connected) {
			return
		}
		this.isConnected = connected
		if (this.onStatus) {
			this.onStatus(connected)
		}
	}

	_scheduleReconnect() {
		if (this._killed || this._reconnectTimer) {
			return
		}
		this._reconnectTimer = setTimeout(() => {
			this._reconnectTimer = null
			this._open()
		}, WS_RECONNECT_DELAY_MS)
	}

	// Schickt einen Bytewert in den Kanal (für role 'send').
	send(value) {
		if (!this.isConnected) {
			return
		}
		this._socket.send(String(value & 255))
	}

	// Wechselt den Kanal: alte Verbindung schließen, sofort neu verbinden.
	setChannel(channel) {
		if (this.channel == channel) {
			return
		}
		this.channel = channel
		this._closeSocket()
		this._open()
	}

	// Trennt endgültig — es folgt kein Reconnect mehr.
	kill() {
		this._killed = true
		this._closeSocket()
	}

	_closeSocket() {
		if (this._reconnectTimer) {
			clearTimeout(this._reconnectTimer)
			this._reconnectTimer = null
		}
		if (this._socket) {
			this._socket.onclose = null // gewolltes Schließen löst keinen Reconnect aus
			if (this._socket.readyState == WebSocket.CONNECTING) {
				// noch im Verbindungsaufbau: erst nach dem Öffnen schließen
				this._socket.onopen = function () { this.close() }
			}
			else {
				this._socket.close()
			}
			this._socket = null
		}
		this._setConnected(false)
	}
}
