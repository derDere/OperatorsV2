const Op_Switch = register(
	"Switch",
	"User Input",
	"Toggle it on or off",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.out_c = this.newOutput("O", "Output", "True while the switch is turned on")
			this.out_not_c = this.newOutput("!O", "Inverted Output", "True while the switch is turned off")

			this.switchCtrl = new Control(-10, 0, 10, BOUNDS_TYPE_CIRCLE, this)
			this.switchCtrl.backgroundColor = mainP5.color(255)

			this.switchCtrl.onMouseClick(this.switched.bind(this))
		}

    getConfig() {
			return {
				...super.getConfig(),
				_state: this.state
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded)
			if ('_state' in conf && loaded) {
				this.state = conf._state
			}
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
	"User Input",
	"Click to send a 1 tick pulse",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.pressed = false
			this.text = "Press!"

			this.out_c = this.newOutput("O", "Output", "True for one tick when the button is clicked")
			this.out_not_c = this.newOutput("!O", "Inverted Output", "Opposite of the output O")

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
			super.setConfig(conf, loaded)
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
	"Signal",
	"Switches state every frame",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.out_c = this.newOutput("T", "Tick", "Alternates between true and false every frame")
			this.out_not_c = this.newOutput("!T", "Inverted Tick", "Opposite of the tick output")
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
	"Signal",
	"Switches Output every X Ticks if powered",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.count = 0
			this.state = false
			this.b = 0

			this.in_b = this.newInput("B", "Interval", "Byte that sets how many ticks pass before the clock toggles")
			this.in_p = this.newInput("P", "Power", "The clock only counts and toggles while this is true")

			this.out_c = this.newOutput("C", "Clock", "Square wave signal that toggles every interval")
			this.out_nc = this.newOutput("!C", "Inverted Clock", "Opposite of the clock output")
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
	"User Input",
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

			this.in_p = this.newInput("P", "Power", "While true, one typed character per tick is read into the stack")
			this.in_f = this.newInput("F", "Flush", "A rising edge emits the oldest stacked byte on B")
			this.in_c = this.newInput("C", "Clear", "Empties the character stack while true")

			this.out_b = this.newOutput("B", "Byte", "Character code emitted by the last flush")
			this.out_t = this.newOutput("T", "Trigger", "True for one tick when a byte is emitted on B")
			this.out_n = this.newOutput("N", "New Line", "True for one tick when the user presses Enter")
			this.out_w = this.newOutput("W", "Waiting", "True while unread text is still waiting in the input field")
			this.out_e = this.newOutput("E", "Empty", "True while the character stack is empty")
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
	"User Input",
	"A Slinder Input 0-255",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.value = 0
			this.val_changed = false

			this.out_v = this.newOutput("V", "Value", "Current slider position as a byte from 0 to 255")
			this.out_t = this.newOutput("T", "Trigger", "True for one tick when the slider value changes")
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
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(14)
			p5ctx.text(this.value, 0, 0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(10)
			p5ctx.text('Slider', 0, -20)
			p5ctx.text('0-255', 0, 22)

			p5ctx.fill(120)
			p5ctx.rect(0, 7, 45, 2)

			let sx = -45/2
			let m = (this.value / 255)
			sx += 45 * m

			let nm = 1 - m
			p5ctx.noStroke()
			p5ctx.fill('#0080ff')
			p5ctx.rect((-45 / 2) * nm, 7, 45 * m, 2)
			
			p5ctx.stroke('#0080ff')
			p5ctx.fill(255)
			p5ctx.circle(sx, 7, 6)

			p5ctx.pop()
		}
	}
)
const Op_Time = register(
	"Time",
	"Signal",
	"Outputs the current clock time. T toggles when the selected time part changes, with no part selected the millisecond counts",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false
			this.lastParts = null
			this.isUTC = false

			this.in_y = this.newInput("Y", "Year", "While true, a year change toggles the trigger")
			this.in_mo = this.newInput("MO", "Month", "While true, a month change toggles the trigger")
			this.in_d = this.newInput("D", "Day", "While true, a day change toggles the trigger")
			this.in_h = this.newInput("H", "Hour", "While true, an hour change toggles the trigger")
			this.in_mi = this.newInput("MI", "Minute", "While true, a minute change toggles the trigger")
			this.in_s = this.newInput("S", "Second", "While true, a second change toggles the trigger")

			this.out_yh = this.newOutput("YH", "Year High", "High byte of the current year")
			this.out_yl = this.newOutput("YL", "Year Low", "Low byte of the current year")
			this.out_mo = this.newOutput("MO", "Month", "The current month (1-12)")
			this.out_d = this.newOutput("D", "Day", "The current day of the month (1-31)")
			this.out_dw = this.newOutput("DW", "Day of Week", "The current day of the week (0 = Monday)")
			this.out_kw = this.newOutput("KW", "Calendar Week", "The current ISO calendar week (week 1 holds the first Thursday of the year)")
			this.out_h = this.newOutput("H", "Hour", "The current hour (0-23)")
			this.out_mi = this.newOutput("MI", "Minute", "The current minute (0-59)")
			this.out_s = this.newOutput("S", "Second", "The current second (0-59)")
			this.out_msh = this.newOutput("MSH", "Millisecond High", "High byte of the current millisecond")
			this.out_msl = this.newOutput("MSL", "Millisecond Low", "Low byte of the current millisecond")
			this.out_t = this.newOutput("T", "Trigger", "Toggles when the selected time part changes")
		}

		getConfig() {
			return {
				...super.getConfig(),
				IsUTC: this.isUTC
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded)
			if ('IsUTC' in conf) {
				this.isUTC = !!conf.IsUTC
			}
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let now = new Date()
			let parts = this.isUTC ? [
				now.getUTCFullYear(),
				now.getUTCMonth() + 1,
				now.getUTCDate(),
				now.getUTCHours(),
				now.getUTCMinutes(),
				now.getUTCSeconds(),
				now.getUTCMilliseconds()
			] : [
				now.getFullYear(),
				now.getMonth() + 1,
				now.getDate(),
				now.getHours(),
				now.getMinutes(),
				now.getSeconds(),
				now.getMilliseconds()
			]

			let selects = [
				!!(this.in_y.value),
				!!(this.in_mo.value),
				!!(this.in_d.value),
				!!(this.in_h.value),
				!!(this.in_mi.value),
				!!(this.in_s.value)
			]

			if (this.lastParts) {
				let anySelected = selects.some(s => s)
				let changed = false
				for (let i = 0; i < parts.length; i++) {
					// ohne Auswahl zaehlt die Millisekunde (Index 6)
					let watched = anySelected ? (i < 6 && selects[i]) : (i == 6)
					if (watched && parts[i] != this.lastParts[i]) {
						changed = true
					}
				}
				if (changed) {
					this.state = !this.state
				}
			}
			this.lastParts = parts

			// Kalenderwoche nach ISO 8601 (Erstausgabe 1988, loeste die ISO 2015:1976
			// "Numbering of weeks" ab): KW1 ist die Woche, in der der erste Donnerstag
			// des Jahres liegt; Wochentag 0 = Montag. Gerechnet wird in UTC auf dem
			// bereits gewaehlten Datum, damit keine Sommerzeit hineinspielt.
			let date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]))
			let dayOfWeek = (date.getUTCDay() + 6) % 7
			date.setUTCDate(date.getUTCDate() - dayOfWeek + 3) // Donnerstag derselben Woche
			let firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4)) // der 4. Januar liegt immer in KW1
			firstThursday.setUTCDate(firstThursday.getUTCDate() - ((firstThursday.getUTCDay() + 6) % 7) + 3)
			let week = 1 + Math.round((date - firstThursday) / (7 * 24 * 60 * 60 * 1000))

			this.out_yh.value = (parts[0] >> 8) & 255
			this.out_yl.value = parts[0] & 255
			this.out_mo.value = parts[1]
			this.out_d.value = parts[2]
			this.out_dw.value = dayOfWeek
			this.out_kw.value = week
			this.out_h.value = parts[3]
			this.out_mi.value = parts[4]
			this.out_s.value = parts[5]
			this.out_msh.value = (parts[6] >> 8) & 255
			this.out_msl.value = parts[6] & 255
			this.out_t.value = this.state
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text('TIME', 0, 5)
			if (this.lastParts) {
				let hh = ('0' + this.lastParts[3]).substr(-2)
				let mm = ('0' + this.lastParts[4]).substr(-2)
				let ss = ('0' + this.lastParts[5]).substr(-2)
				p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
				p5ctx.textSize(10)
				p5ctx.text(hh + ':' + mm + ':' + ss, 0, 5)
			}

			p5ctx.pop()
		}
	}
)
