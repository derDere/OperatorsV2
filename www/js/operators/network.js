function generateStringGuid(str) {
  // 1. Einfacher Hash-Algorithmus (DJB2) zur Zustandserzeugung
  let hash1 = 5381
  let hash2 = 8933

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash1 = ((hash1 << 5) + hash1) ^ char
    hash2 = ((hash2 << 5) + hash2) ^ char
  }

  // 2. Buffer aus den Hashes erstellen (32-Bit-Konvertierung)
  const b1 = Math.abs(hash1).toString(16).padStart(8, '0')
  const b2 = Math.abs(hash2).toString(16).padStart(8, '0')
  const b3 = Math.abs(hash1 ^ hash2).toString(16).padStart(8, '0')
  const b4 = Math.abs(hash1 & hash2).toString(16).padStart(8, '0')

  // 3. String zusammensetzen
  const part1 = b1
  const part2 = b2.substring(0, 4)
  // UUID v4 Vorgabe: Das erste Zeichen im 3. Block muss eine '4' sein
  const part3 = '4' + b3.substring(1, 4)
  // UUID v4 Vorgabe: Das erste Zeichen im 4. Block muss '8', '9', 'a' oder 'b' sein
  const allowedChars = ['8', '9', 'a', 'b']
  const part4 = allowedChars[Math.abs(hash2) % 4] + b4.substring(1, 4)
  // Der letzte Block einer UUID ist zwölf Zeichen lang
  const part5 = b1.substring(4, 8) + b2.substring(4, 8) + b3.substring(4, 8)

  return `${part1}-${part2}-${part3}-${part4}-${part5}`
}

function isValidGuid(guid) {
  // Regulärer Ausdruck für das standardmäßige UUID/GUID Format
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return guidRegex.test(guid)
}

// Ein Kanal wird unter einem frei wählbaren Namen eingestellt, die Verbindung
// braucht dafür eine feste Kennung. Ein Name, der bereits als GUID geschrieben
// ist, gilt unverändert, jeder andere wird stabil auf eine GUID abgebildet.
// Der Name selbst bleibt unangetastet — er ist es, was in den Properties steht
// und was gespeichert wird.
function channelGuid(name) {
  name = String(name)
  if (isValidGuid(name)) {
    return name.toLowerCase()
  }
  return generateStringGuid(name)
}

// Zeichnet den Fingerabdruck eines Kanals: die 16 Bytes seiner Kennung als
// 4x4-Feld aus Farben. Erwartet eine fertige Kennung aus channelGuid.
function channelDisplay(guid, p5ctx) {
  guid = guid.replace(/-/g, '').toLowerCase()

  const parts = []

  for (let i = 0; i < guid.length; i+=2) {
    let part = guid.substr(i, 2);
    part = '#00' + part[0] + '0' + part[1] + '0'
    parts.push(part)
  }

  p5ctx.push()
  p5ctx.rectMode(p5ctx.CORNER)
  p5ctx.translate(-20, -20)
  p5ctx.noStroke()

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let i = y * 4 + x
      p5ctx.fill(parts[i])
      p5ctx.rect((x * 10) + 0.5, (y * 10) + 0.5, 10, 10)
    } 
  }
  
  p5ctx.pop()
}

const Op_NetSender = register(
  "Network Sender",
  "Network",
  "Sends 1 byte into a defined network channel",
  class extends Operator {

    constructor(x = 0, y = 0) {
      super(x, y)

      // Gespeichert und angezeigt wird der Name, verbunden wird über seine Kennung
      this.channel = NewId()
      this._channelGuid = channelGuid(this.channel)

      this._connected = false

      this.in_b = this.newInput("B", "Byte", "Byte value sent into the channel on a trigger")
      this.in_t = this.newInput("T", "Trigger", "A rising edge sends the current byte")

      this._lastT = false

      this._ws = new ChannelSocket(this._channelGuid, 'send')
    }

    kill() {
      super.kill()
      this._ws.kill()
    }

    getConfig() {
      return {
        ...super.getConfig(),
        Channel: this.channel
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded)
      if ('Channel' in conf) {
        this.channel = String(conf.Channel)
        this._channelGuid = channelGuid(this.channel)
        this._ws.setChannel(this._channelGuid)
      }
    }

    doUpdate(tick, p5ctx) {
      super.doUpdate(tick, p5ctx)

      this._connected = this._ws.isConnected

      let b = (this.in_b.value) & 255
      let t = !!(this.in_t.value)
      let send = false

      if (this._lastT != t && t) {
        send = true
      }
      this._lastT = t

      if (send) {
        this._ws.send(b)
      }
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      channelDisplay(this._channelGuid, p5ctx)

      p5ctx.push()
      if (this._connected) {
        p5ctx.fill('#0080ff')
      }
      else {
        p5ctx.fill('#444')
      }
      p5ctx.translate(this.width / 2, 0)

      p5ctx.push()
      p5ctx.noStroke()
      p5ctx.ellipse(
        0, 0,
        20, this.height,
      )
      p5ctx.pop()

      p5ctx.arc(
        0, 0,
        30, this.height,
        p5ctx.PI * 0.5,
        p5ctx.PI * 1.5
      )

      p5ctx.fill(255)
      p5ctx.stroke(0)
      p5ctx.translate(10, 0)
      p5ctx.rotate(-p5ctx.PI * 0.25, 0)
      p5ctx.arc(
        0, 0,
        30, 40,
        p5ctx.PI * 0.5,
        p5ctx.PI * 1.5
      )
      p5ctx.ellipse(
        0, 0,
        10, 40
      )
      p5ctx.line(
        -4, -7,
        11, 0
      )
      p5ctx.line(
        -4, 7,
        11, 0
      )

      p5ctx.push()
      if (this._lastT) {
        p5ctx.fill('#f00')
      }
      p5ctx.ellipse(
        11, 0,
        4, 4
      )
      p5ctx.pop()

      p5ctx.noFill()

      if (this._connected) {
        let r = p5ctx.round(tick / 4) % 10
        r *= 5
        p5ctx.ellipse(
          11, 0,
          r, r
        )
      }

      p5ctx.pop()
    }
  }
)

const Op_NetReceiver = register(
  "Network Receiver",
  "Network",
  "Receives 1 byte from a defined network channel",
  class extends Operator {

    constructor(x = 0, y = 0) {
      super(x, y)

      // Gespeichert und angezeigt wird der Name, verbunden wird über seine Kennung
      this.channel = NewId()
      this._channelGuid = channelGuid(this.channel)

      this._connected = false

      this.out_b = this.newOutput("B", "Byte", "The byte received last from the channel")
      this.out_t = this.newOutput("T", "Trigger", "True for one tick when the received byte changes")

      this.value = 0 // gets updated via websocket

      this._lastV = 0

      this._ws = new ChannelSocket(this._channelGuid, 'listen')
      this._ws.onValue = (v) => { this.value = v }
    }

    kill() {
      super.kill()
      this._ws.kill()
    }

    getConfig() {
      return {
        ...super.getConfig(),
        Channel: this.channel
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded)
      if ('Channel' in conf) {
        this.channel = String(conf.Channel)
        this._channelGuid = channelGuid(this.channel)
        this._ws.setChannel(this._channelGuid)
      }
    }

    doUpdate(tick, p5ctx) {
      super.doUpdate(tick, p5ctx)

      this._connected = this._ws.isConnected

      let t = false
      let b = this.value

      if (this._lastV != b) {
        t = true
      }
      this._lastV = b

      this.out_b.value = b & 255
      this.out_t.value = !!t
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      channelDisplay(this._channelGuid, p5ctx)

      p5ctx.push()

      p5ctx.scale(-1, 1)

      if (this._connected) {
        p5ctx.fill('#ff8000')
      }
      else {
        p5ctx.fill('#444')
      }
      p5ctx.translate(this.width / 2, 0)

      p5ctx.push()
      p5ctx.noStroke()
      p5ctx.ellipse(
        0, 0,
        20, this.height,
      )
      p5ctx.pop()

      p5ctx.arc(
        0, 0,
        30, this.height,
        p5ctx.PI * 0.5,
        p5ctx.PI * 1.5
      )

      p5ctx.fill(255)
      p5ctx.stroke(0)
      p5ctx.translate(10, 0)
      p5ctx.rotate(-p5ctx.PI * 0.25, 0)
      p5ctx.arc(
        0, 0,
        30, 40,
        p5ctx.PI * 0.5,
        p5ctx.PI * 1.5
      )
      p5ctx.ellipse(
        0, 0,
        10, 40
      )
      p5ctx.line(
        -4, -7,
        11, 0
      )
      p5ctx.line(
        -4, 7,
        11, 0
      )

      p5ctx.ellipse(
        11, 0,
        4, 4
      )

      p5ctx.noFill()

      if (this._connected) {
        let r = 10 - (p5ctx.round(tick / 4) % 10)
        r *= 5
        p5ctx.ellipse(
          11, 0,
          r, r
        )
      }

      p5ctx.pop()
    }
  }
)