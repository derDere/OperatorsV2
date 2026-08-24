const Op_NetSender = register(
	"Network Sender",
	"Network",
	"Sends 1 byte into a defined network channel",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

      this.channel = NewId()

      this._connected = false

			this.in_b = this.newInput("B") // Byte
      this.in_t = this.newInput("T") // Trigger

      this._lastT = false

      this._ws = new ChannelSocket(this.channel, 'send')
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
				this.channel = conf.Channel
				this._ws.setChannel(this.channel)
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
        p5ctx.PI * 1.5,
        true
      )
    
      p5ctx.fill(255)
      p5ctx.stroke(0)
      p5ctx.translate(10, 0)
      p5ctx.rotate(-p5ctx.PI * 0.25, 0)
      p5ctx.arc(
        0, 0,
        30, 40,
        p5ctx.PI * 0.5,
        p5ctx.PI * 1.5,
        true
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

      this.channel = NewId()

      this._connected = false

			this.out_b = this.newOutput("B") // Byte
      this.out_t = this.newOutput("T") // Trigger

      this.value = 0 // gets updated via websocket

      this._lastV = 0

      this._ws = new ChannelSocket(this.channel, 'listen')
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
				this.channel = conf.Channel
				this._ws.setChannel(this.channel)
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
        p5ctx.PI * 1.5,
        true
      )
    
      p5ctx.fill(255)
      p5ctx.stroke(0)
      p5ctx.translate(10, 0)
      p5ctx.rotate(-p5ctx.PI * 0.25, 0)
      p5ctx.arc(
        0, 0,
        30, 40,
        p5ctx.PI * 0.5,
        p5ctx.PI * 1.5,
        true
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