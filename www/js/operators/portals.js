const AllPortals = {}

const Op_Portal1i = register(
	"Portal 1 Entry",
	"Utility",
	"Transports 1 value throu to any exit portal",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

      this.isPortal = true
      this.isInputPortal = true

      this.name = mainP5.round(mainP5.random(0,255)).toString(16).toUpperCase() + mainP5.round(mainP5.random(0,255)).toString(16).toUpperCase()

			this.width = 40

			this.in_i1 = this.newInput("I1") // Input 1

      AllPortals[this.id] = this
		}

    kill() {
      super.kill()
      delete AllPortals[this.id]
    }

    getConfig() {
			return {
				...super.getConfig(),
				Name: this.name
			}
		}

		setConfig(conf, loaded = false) {
      let startId = this.id
			super.setConfig(conf, loaded)
      if (loaded) {
        delete AllPortals[startId]
        AllPortals[this.id] = this
      }
			if ('Name' in conf) {
				this.name = conf.Name
			}
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)
		}

    doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

      p5ctx.push()

      p5ctx.noStroke()
      p5ctx.fill('#0080ff')
      p5ctx.ellipse(this.width / 2, 0, 8, this.height)
      p5ctx.textAlign(p5ctx.LEFT, p5ctx.CENTER)
      p5ctx.textSize(16)
      p5ctx.text(this.name, this.width/2 + 10, 0)

      p5ctx.pop()
    }
	}
)

const Op_Portal4i = register(
	"Portal 4 Entry",
	"Utility",
	"Transports 4 values throu to any exit portal",
	class extends Op_Portal1i {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in_i2 = this.newInput("I2") // Input 2
			this.in_i3 = this.newInput("I3") // Input 3
			this.in_i4 = this.newInput("I4") // Input 4
		}
	}
)

const Op_Portal8i = register(
	"Portal 8 Entry",
	"Utility",
	"Transports 8 values throu to any exit portal",
	class extends Op_Portal4i {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in_i5 = this.newInput("I5") // Input 2
			this.in_i6 = this.newInput("I6") // Input 2
			this.in_i7 = this.newInput("I7") // Input 3
			this.in_i8 = this.newInput("I8") // Input 4
		}
	}
)

const Op_PortalXo = register(
	"Portal Exit",
	"Utility",
	"Transports 1-8 value out of any entry portal",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

      this.isPortal = true
      this.isOutputPortal = true

      this.foundOrigin = false
      this.originName = "????"
			this.lastOutCount = 0

      this.origin = null

			this.width = 40
		}

    getConfig() {
			return {
				...super.getConfig(),
				Origin: this.origin
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded)
			if ('Origin' in conf) {
				this.origin = conf.Origin
			}
			this._updatePortals()
		}

		_clearOutputs() {
			for(let io of [...this.outputs]) {
				io.kill()
			}
			this.outputs = []
		}

    _findOrigin() {
      let o = AllPortals[this.origin]
      if (o) return o
      return false
    }

		_updatePortals() {
      let o = this._findOrigin()
			if (!o) return
			if (this.lastOutCount != o.inputs.length) {
				this._clearOutputs()
				for(let i = 1; i <= o.inputs.length; i++) {
					let out = this.newOutput("O" + i)
					out.id = this.id + '_out_' + i
				}
				this.lastOutCount = o.inputs.length
			}
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

      let o = this._findOrigin()

      if (o) {
        this.foundOrigin = true
				this.originName = o.name
				
				this._updatePortals()
				
				for(let i = 0; i < o.inputs.length; i++) {
					let int = o.inputs[i]
					let out = this.outputs[i]
					out.value = int.value
				}
      }
      else {
				this.foundOrigin = false
      	this.originName = "????"
				this.lastOutCount = 0
				this._clearOutputs()
      	this.origin = null

				for(let out of this.outputs) {
					out.value = false
				}
      }
		}

    doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

      p5ctx.push()

      p5ctx.noStroke()
      if (this.foundOrigin) {
        p5ctx.fill('#ff8000')
      }
      else {
        p5ctx.fill('#444')
      }
      p5ctx.ellipse(-this.width / 2, 0, 8, this.height)
      p5ctx.textAlign(p5ctx.RIGHT, p5ctx.CENTER)
      p5ctx.textSize(16)
      p5ctx.text(this.originName, -this.width/2 - 10, 0)

      p5ctx.pop()
    }
	}
)