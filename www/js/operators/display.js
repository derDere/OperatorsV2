const Op_Lamp = register(
	"Lamp",
	"Display",
	"Displays a state of ON or OFF",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.lampDiv1 = null
			this.lampDiv2 = null

			this.color = "#ff0000"

			this.state = false

			this.in = this.newInput("I", "Input", "The lamp lights up while this is true")
		}

		getConfig() {
			return {
				...super.getConfig(),
				color: this.color
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded)
			if ('color' in conf) {
				this.color = conf.color
			}
		}

		createElement() {
			let ele = document.createElement('div')
			ele.className = "lamp " + (this.state ? 'lamp-on' : 'lamp-off')

			this.lampDiv1 = document.createElement('div')
			this.lampDiv1.className = "bulb"
			this.lampDiv1.style.background = this.color
			ele.appendChild(this.lampDiv1)

			this.lampDiv2 = document.createElement('div')
			this.lampDiv2.className = "bulb second"
			this.lampDiv2.style.background = this.color
			ele.appendChild(this.lampDiv2)

			let glow = document.createElement('div')
			glow.className = "glow"
			ele.appendChild(glow)

			return ele
		}

		updateElement() {
			this.ele.className = "lamp " + (this.state ? 'lamp-on' : 'lamp-off')
			this.lampDiv1.style.background = this.color
			this.lampDiv2.style.background = this.color
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.state = !!(this.in.value)
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.stroke(0)
			if (this.state) {
				p5ctx.fill(this.color)
			} else {
				p5ctx.fill(100)
			}
			p5ctx.circle(0, 0, 30)
			p5ctx.noStroke()
			if (this.state) {
				p5ctx.fill(255, 255, 255, 30)
				for (let i = 27; i > 5; i -= 3) {
					p5ctx.circle(0, 0, 30 - i)
				}
			}

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(10)
			p5ctx.text('LAMP', 0, -21)
			p5ctx.text(this.state ? 'ON' : 'OFF', 0, 23)

			p5ctx.pop()
		}
	}
)

const Op_Byte = register(
	"Byte",
	"Display",
	"Displays a Byte in a choosen way",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.showBinary = false
			this.showOctal = false
			this.showDecimal = false
			this.showHexadecimal = true
			this.showCharacter = false
			this.showLeadingZeros = true
			this.fontSize = 18
			this.fontFamily = "Courier New"
			this.color = "#000000"
			this.background = "#ffffff"
			this.advancedDisplay = true
			this.seperator = "\\n"

			this.value = 0

			this._bgCell = null // Zelle, die aktuell die Hintergrundfarbe traegt

			this.in = this.newInput("B", "Byte", "Byte value shown in the configured formats")
		}

		kill() {
			super.kill()
			if (this._bgCell) {
				this._bgCell.style.backgroundColor = ''
				this._bgCell = null
			}
		}

		getConfig() {
			return {
				...super.getConfig(),
			  "Font Family": this.fontFamily,
			  "Font Size": this.fontSize,
			  color: this.color,
			  Background: this.background,
			  "Advanced Display": this.advancedDisplay,
			  "Show Leading Zeros": this.showLeadingZeros,
			  "Seperator": this.seperator,
			  "Show Bin": this.showBinary,
			  "Show Oct": this.showOctal,
			  "Show Dec": this.showDecimal,
			  "Show Hex": this.showHexadecimal,
			  "Show Char": this.showCharacter
			}
		}

		setConfig(conf, loaded=false) {
			super.setConfig(conf, loaded)
			if ('Font Family' in conf) {
				this.fontFamily = conf['Font Family']
			}
			if ('Font Size' in conf) {
				this.fontSize = conf['Font Size']
			}
			if ('color' in conf) {
				this.color = conf.color
			}
			if ('Background' in conf) {
				this.background = conf.Background
			}
			if ('Advanced Display' in conf) {
				this.advancedDisplay = conf['Advanced Display']
			}
			if ('Show Leading Zeros' in conf) {
				this.showLeadingZeros = conf['Show Leading Zeros']
			}
			if ('Seperator' in conf) {
				this.seperator = conf['Seperator']
			}
			if ('Show Bin' in conf) {
				this.showBinary = conf['Show Bin']
			}
			if ('Show Oct' in conf) {
				this.showOctal = conf['Show Oct']
			}
			if ('Show Dec' in conf) {
				this.showDecimal = conf['Show Dec']
			}
			if ('Show Hex' in conf) {
				this.showHexadecimal = conf['Show Hex']
			}
			if ('Show Char' in conf) {
				this.showCharacter = conf['Show Char']
			}
		}

		createElement() {
			let ele = document.createElement('div')
			ele.className = 'byte-display'
			ele.style.fontSize = this.fontSize + 'px'
			ele.style.fontFamily = this.fontFamily
			ele.style.color = this.color
			ele.innerText = this._getValueDisplay()
			return ele
		}

		updateElement() {
			this.ele.style.fontSize = this.fontSize + 'px'
			this.ele.style.fontFamily = this.fontFamily
			this.ele.style.color = this.color
			this.ele.innerText = this._getValueDisplay()

			// Allein in der Zelle traegt die Zelle die Hintergrundfarbe — sie fuellt
			// dann randlos und der Wert bleibt durch die Zellzentrierung mittig.
			// Mit Nachbarn liegt die Farbe als Marker-Markierung direkt auf dem Wert.
			let cell = this.ele.parentElement
			let alone = !!cell && cell.children.length == 1

			if (this._bgCell && (!alone || this._bgCell != cell)) {
				this._bgCell.style.backgroundColor = ''
				this._bgCell = null
			}

			if (alone) {
				cell.style.backgroundColor = this.background
				this._bgCell = cell
				this.ele.style.backgroundColor = 'transparent'
				this.ele.style.padding = ''
				this.ele.style.borderRadius = ''
			}
			else {
				this.ele.style.backgroundColor = this.background
				this.ele.style.padding = '1px 4px'
				this.ele.style.borderRadius = '3px'
			}
		}

		_charify(ignoreSetting = false) {
			let c = String.fromCharCode(this.value)
			let jj = c
			if (this.advancedDisplay || ignoreSetting) {
				jj = JSON.stringify(c)
				jj = "'" + jj.substr(1)
				jj = jj.substr(0, jj.length - 1) + "'c"
			}
			return jj
		}

		_getValueDisplay() {
			let newText = ""

			let centerCorrection = ''

			if (this.showBinary || this.showHexadecimal) {
				centerCorrection = ' '
			}

			let BIN = this.advancedDisplay ? '0b' : ''
			let OCT = this.advancedDisplay ? (centerCorrection + '0o') : ''
			let DEC = this.advancedDisplay ? (centerCorrection + '0d') : ''
			let HEX = this.advancedDisplay ? '0x' : ''

			// Fuellt Bin auf 8, Oct/Dec auf 3 und Hex auf 2 Stellen mit fuehrenden Nullen auf
			let FRONT = this.showLeadingZeros ? '00000000' : ''

			const Displays = [
				[
					this.showBinary,
					v => BIN + (FRONT + v.toString(2)).substr(-8)
				],
				[
					this.showOctal,
					v => OCT + (FRONT + v.toString(8)).substr(-3)
				],
				[
					this.showDecimal,
					v => DEC + (FRONT + v.toString(10)).substr(-3)
				],
				[
					this.showHexadecimal,
					v => HEX + (FRONT + v.toString(16).toUpperCase()).substr(-2)
				],
				[
					this.showCharacter,
					v => this._charify()
				]
			]

			let sep = this.seperator
			sep = sep.replace(/\\n/g, '\n')
			sep = sep.replace(/\\t/g, '\t')
			sep = sep.replace(/\\r/g, '\r')
			sep = sep.replace(/\\0/g, '\0')
			sep = sep.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));

			for (const [active, funk] of Displays) {
				if (!active) continue
				if (newText.length > 0) {
					newText += sep
				}
				newText += funk(this.value)
			}

			if (newText.length <= 0) {
				newText = this.value + ''
			}

			return newText
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.value = (this.in.value) & 255
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(18)
			if (this.showBinary) {
				p5ctx.textSize(10)
				p5ctx.text('0b' + this.value.toString(2).toUpperCase() + '', 0, 0)
			}
			else if (this.showOctal) {
				p5ctx.text('0o' + this.value.toString(8).toUpperCase() + '', 0, 0)
			}
			else if (this.showDecimal) {
				p5ctx.text('0d' + this.value.toString(10).toUpperCase() + '', 0, 0)
			}
			else {
				p5ctx.text('0x' + this.value.toString(16).toUpperCase() + '', 0, 0)
			}
			p5ctx.textSize(10)
			p5ctx.text('Byte', 0, -21)
			
			let jj = this._charify(true)
			p5ctx.text(jj, 0, 23)

			p5ctx.pop()
		}
	}
)
