const Op_Switch = register(
	"Switch",
	"Toggle it on or off",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.out_c = this.newOutput("O") // Output
			this.out_not_c = this.newOutput("!O") // Not Output

			this.switchCtrl = new Control(-10, 0, 10, BOUNDS_TYPE_CIRCLE, this)
			this.switchCtrl.backgroundColor = mainP5.color(255)

			this.switchCtrl.onMouseClick(this.switched.bind(this))
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

			let sx = a ? 10 : -10
			this.switchCtrl.pos.x = p5ctx.lerp(this.switchCtrl.pos.x, sx, 0.2)

			let c = a
			let nc = !c

			this.out_c.value = c
			this.out_not_c.value = nc
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()
			p5ctx.noStroke()

			if (this.state) {
				p5ctx.fill('#4CAF50')
			}
			else {
				p5ctx.fill('#CCCCCC')
			}
			p5ctx.circle(-10, 0, 26)
			p5ctx.circle(10, 0, 26)
			p5ctx.rect(0, 0, 20, 26)

			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(10)
			p5ctx.text('SWITCH', 0, -20)
			p5ctx.text('Click Me', 0, 22)

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

			this.out_c = this.newOutput("O") // Output
			this.out_not_c = this.newOutput("!O") // Not Output

			this.btnCtrl = new Control(0, 0, 12, BOUNDS_TYPE_RECT, this)
			this.btnCtrl.width = 44
			this.btnCtrl.backgroundColor = mainP5.color('transparent')
			this.btnCtrl.backgroundHoverColor = mainP5.color('#ffffff30')
			this.btnCtrl.backgroundActiveColor = mainP5.color('#00000030')

			this.btnCtrl.onMouseClick(this.button_clicked.bind(this))
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
			p5ctx.fill('#E9E9ED')
			p5ctx.rect(0, 0, this.btnCtrl.width, this.btnCtrl.height)
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(12)
			p5ctx.text('Button', 0, 1)
			p5ctx.textSize(10)
			p5ctx.text(this.text, 0, -20)
			p5ctx.text('Click Me', 0, 22)

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

			this.out_c = this.newOutput("T") // Tick
			this.out_not_c = this.newOutput("!T") // Not Tick
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

			this.in_b = this.newInput("B") // Byte (Clock Delay)
			this.in_p = this.newInput("P") // Power

			this.out_c = this.newOutput("C") // Clock
			this.out_nc = this.newOutput("!C") // Not Clock
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

const TEXT_INPUT_DEFAULT_WIDTH = 165
const TEXT_INPUT_MIN_WIDTH = 80
//const TEXT_INPUT_DEFAULT_PART_LEN = 12
const Op_TextInput = register(
	"Text Input",
	"Provides a way to read bytes entered by the user",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

      this.borderColor = mainP5.color('#aaa')
      this.backgroundColor = mainP5.color('#020')

      this.borderHoverColor = mainP5.color('#aaa')
      this.backgroundHoverColor = mainP5.color('#131')

      this.borderActiveColor = mainP5.color('#555')
      this.backgroundActiveColor = mainP5.color('#000')

      this.io_color = mainP5.color(220)

			this.stackDisplayEle = null
			this.textInputEle = null
			this.elementWidth = TEXT_INPUT_DEFAULT_WIDTH

			this.stack = []

			this.entered = false
			this.powered = false
			this.lastF = false

			this.in_p = this.newInput("P") // Power
			this.in_f = this.newInput("F") // Flush
			this.in_c = this.newInput("C") // Clear

			this.out_b = this.newOutput("B") // Byte
			this.out_t = this.newOutput("T") // Trigger
			this.out_n = this.newOutput("N") // New Line
			this.out_w = this.newOutput("W") // Waiting
			this.out_e = this.newOutput("E") // Empty
		}

		getConfig() {
			return {
				...super.getConfig(),
				eleWidth: mainP5.max(this.elementWidth, TEXT_INPUT_MIN_WIDTH)
			}
		}

		setConfig(conf, loaded=false) {
			super.setConfig(conf, loaded)
			if ('eleWidth' in conf) {
				this.elementWidth = mainP5.max(conf.eleWidth, TEXT_INPUT_MIN_WIDTH)
			}
		}

		_getStackChars() {
			let content = ""
			for (let cc of this.stack) {
				content += String.fromCharCode(cc);
			}
			/* Old way of compressing! the new way is CSS
			let charLenM = ((TEXT_INPUT_DEFAULT_PART_LEN * 2) + 3) / (TEXT_INPUT_DEFAULT_WIDTH - 6)
			const partLen = mainP5.floor((mainP5.floor(charLenM * this.elementWidth) - 3) / 2)
			if (content.length > ((partLen * 2) + 3)) {
				let tmp = content
				content = tmp.substr(0, partLen)
				content += '...'
				content += tmp.substr(tmp.length - partLen, partLen)
			}*/
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
				this.textInputEle.addEventListener('keydown', this._keyDown.bind(this))
			}
			ele.appendChild(this.textInputEle)
			return ele
		}

		updateElement() {
			this.ele.style.width = this.elementWidth + 'px'
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

		_keyDown(event) {
			if (event.key === 'Enter') {
        event.preventDefault(); // Verhindert das Absenden des Formulars
        this.entered = true
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
			let w = this.textInputEle?.value?.length > 0

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

			let newLine = this.entered
			this.entered = false

			this.out_b.value = b
			this.out_t.value = t
			this.out_n.value = newLine
			this.out_w.value = w
			this.out_e.value = e
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill('#afa')
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

const Op_Slider = register(
	"Slider",
	"A Slinder Input 0-255",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.value = 0
			this.val_changed = false

			this.out_v = this.newOutput("V") // Value
			this.out_t = this.newOutput("T") // trigger if value changed
		}

		changed(sender) {
			let v = parseInt(this.ele.value)
			if (v < 0) v = 0
			if (v > 255) v = 255
			v = mainP5.round(v)
			this.val_changed = this.value != v
			this.value = v
			this.ele.title = this.value + ''
		}

		createElement() {
			let ele = document.createElement('input')
			ele.type = 'range'
			ele.className = 'slider-io'
			ele.addEventListener('input', this.changed.bind(this))
			ele.min = 0
			ele.max = 255
			ele.step = 1
			ele.value = this.value
			ele.title = this.value + ''
			return ele
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let t = this.val_changed
			this.val_changed = false

			this.out_v.value = p5ctx.round(this.value & 255)
			this.out_t.value = t
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()
			p5ctx.noStroke()

			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(18)
			p5ctx.text(this.value, 0, 0)
			p5ctx.textSize(10)
			p5ctx.text('Slider', 0, -20)
			p5ctx.text('0-255', 0, 22)

			p5ctx.pop()
		}
	}
)