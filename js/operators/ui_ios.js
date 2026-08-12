const Op_Switch = register(
	"Switch",
	"Toggle it on or off",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.out_c = this.newOutput("O")
			this.out_not_c = this.newOutput("!O")

			this.onMouseClick(this.switched.bind(this))
		}

		switched(sender) {
			this.state = !this.state
		}

		getEle(callback) {
			let checked = this.state ? 'checked' : ''
			return '<input type="checkbox" class="switch" onchange="' + callback + '" ' + checked + '/>'
		}

		eleChanged(newValue) {
			this.state = (newValue == true)
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let a = !!(this.state)

			let c = a
			let nc = !c

			this.out_c.value = c
			this.out_not_c.value = nc
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(18)
			p5ctx.text(this.state ? 'ON' : 'OFF', 0, 0)
			p5ctx.textSize(10)
			p5ctx.text('SWITCH', 0, -20)
			p5ctx.text('Click Me', 0, 20)

			p5ctx.pop()
		}
	}
)

const Op_Button = register(
	"Button",
	"Click to send a 1 tick pulse",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.pressed = false
			this.text = "Press!"

			this.out_c = this.newOutput("O")
			this.out_not_c = this.newOutput("!O")

			this.onMouseClick(this.switched.bind(this))
		}

		getConfig() {
			return {
				...super.getConfig(),
				text: this.text
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded = false)
			if ('text' in conf) {
				this.text = conf.text
			}
		}

		switched(sender) {
			this.pressed = true
		}

		getEle(callback) {
			return '<input type="button" class="btn" onclick="' + callback + '" value="' + encodeHtml(this.text) + '" />'
		}

		eleChanged(newValue) {
			this.pressed = true
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let a = !!(this.pressed)
			this.pressed = false

			let c = a
			let nc = !c

			this.out_c.value = c
			this.out_not_c.value = nc
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(18)
			p5ctx.text('BTN', 0, 0)
			p5ctx.textSize(10)
			p5ctx.text(this.text, 0, -20)
			p5ctx.text('Click Me', 0, 20)

			p5ctx.pop()
		}
	}
)

const Op_Tick = register(
	"Tick",
	"Switches state every frame",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.out_c = this.newOutput("T")
			this.out_not_c = this.newOutput("!T")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.state = (tick % 2) == 1

			let a = !!(this.state)

			let c = a
			let nc = !c

			this.out_c.value = c
			this.out_not_c.value = nc
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(18)
			p5ctx.text('TICK', 0, 0)

			p5ctx.pop()
		}
	}
)

const Op_Clock = register(
	"Clock",
	"Switches Output every X Ticks if powered",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.count = 0
			this.state = false
			this.b = 0

			this.in_b = this.newInput("B")
			this.in_p = this.newInput("P")

			this.out_c = this.newOutput("C")
			this.out_nc = this.newOutput("!C")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let p = !!(this.in_p.value)
			let b = (this.in_b.value) & 255
			this.b = b

			if (p) {
				this.count += 1
			}

			if (this.count >= b && p) {
				this.state = !this.state
				this.count = 0
			}

			let a = !!(this.state)

			let c = a
			let nc = !c

			this.out_c.value = c
			this.out_nc.value = nc
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text('CLK', 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('T: ' + this.b, 0, 5)

			p5ctx.pop()
		}
	}
)
