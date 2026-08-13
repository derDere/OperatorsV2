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

		createElement() {
			let ele = document.createElement('input')
			ele.type = 'checkbox'
			ele.className = 'switch'
			ele.addEventListener('change', this.checkedChanged.bind(this))
			ele.checked = this.state ? 'checked' : null
			return ele
		}

		updateElement() {
			this.ele.checked = this.state ? 'checked' : null
		}

		checkedChanged() {
			let checked = this.ele?.checked
			this.state = checked
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

			this.onMouseClick(this.button_clicked.bind(this))
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

		button_clicked() {
			this.pressed = true
		}

		createElement() {
			let ele = document.createElement('input')
			ele.type = 'button'
			ele.className = 'btn'
			ele.value = this.text
			ele.addEventListener('click', this.button_clicked.bind(this))
			return ele
		}

		updateElement() {
			this.ele.value = this.text
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

const Op_TextInput = register(
	"Text Input",
	"Provides a way to read bytes entered by the user",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.stackDisplayEle = null
			this.textInputEle = null

			this.stack = []

			this.powered = false
			this.lastF = false

			this.in_p = this.newInput("P")
			this.in_f = this.newInput("F")
			this.in_c = this.newInput("C")

			this.out_b = this.newOutput("B")
			this.out_t = this.newOutput("T")
			this.out_e = this.newOutput("E")
		}

		_getStackChars() {
			let content = ""
			for (let cc of this.stack) {
				content += String.fromCharCode(cc);
			}
			const PART_LEN = 12
			if (content.length > ((PART_LEN * 2) + 3)) {
				let tmp = content
				content = tmp.substr(0, PART_LEN)
				content += '...'
				content += tmp.substr(tmp.length - PART_LEN, PART_LEN)
			}
			return content
		}

		createElement() {
			let ele = document.createElement('div')
			ele.className = 'text-input'
			if (!this.stackDisplayEle) {
				this.stackDisplayEle = document.createElement('div')
				this.stackDisplayEle.innerText = this._getStackChars()
			}
			ele.appendChild(this.stackDisplayEle)
			if (!this.textInputEle) {
				this.textInputEle = document.createElement('input')
				this.textInputEle.type = 'text'
				this.textInputEle.placeholder = ">_"
				this.textInputEle.addEventListener('input', this._textInput.bind(this))
			}
			ele.appendChild(this.textInputEle)
			return ele
		}

		updateElement() {
			let content = this._getStackChars()
			if (content.length <= 0) {
				this.stackDisplayEle.className = "empty"
				this.stackDisplayEle.innerText = 'EMPTY'
			}
			else {
				this.stackDisplayEle.className = ""
				this.stackDisplayEle.innerText = content
			}
		}

		_textInput() {
			let data = this.textInputEle.value
			if (data.length <= 0) return
			let leftData = ""
			for(let i = 0; i < data.length; i++) {
				let c = data.charCodeAt(i)
				if ((c >= 0) && c < 256) {
					leftData += data[i]
				}
			}
			this.textInputEle.value = leftData
		}

		_readOneChar() {
			let data = this.textInputEle.value
			if (data.length <= 0) return
			let c = data.charCodeAt(0)
			if ((c >= 0) && c < 256) {
				this.stack.push(c)
			}
			data = data.substr(1)
			this.textInputEle.value = data
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let p = !!(this.in_p.value)
			let f = !!(this.in_f.value)
			let c = !!(this.in_c.value)

			if (c) {
				this.stack = []
			}

			this.powered = p
			let t = false
			let b = 0

			if (p) {
				this._readOneChar()
			}

			let e = this.stack <= 0

			if (this.lastF != f && f) {
				if (this.stack.length > 0) {
					b = this.stack[0]
					this.stack.splice(0, 1)
					t = true
				}
			}
			this.lastF = f

			this.out_b.value = b
			this.out_t.value = t
			this.out_e.value = e
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(18)
			p5ctx.text(this.stack.length, 0, 0)
			p5ctx.textSize(10)
			p5ctx.text("Stacked:", 0, -20)
			p5ctx.text('Text Input', 0, 20)

			p5ctx.pop()
		}
	}
)
