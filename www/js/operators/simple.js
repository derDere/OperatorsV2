// Eingangszahl der Bündel-Modi der simplen Gatter
const SIMPLE_MODE_INPUT_COUNTS = { nibble: 4, byte: 8 }

class base_Simple extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		// Mode bestimmt die IO-Bestückung, Variant bei nibble/byte die Verschaltung
		// (combined: ein Gatter über alle Eingänge; channeled: unabhängige Zweifach-Gatter).
		// Die Unterklassen setzen action/icon und rufen danach _rebuildIOs() auf.
		this.mode = 'bit'
		this.variant = 'combined'
		this.isUnary = false // einstellige Gatter (Not) haben je Eingang eine eigene Ausgangs-Lane

		this.action = (a, b) => false
		this.icon = ""
	}

	// Legt die IOs passend zu Mode und Variant neu an; Verbindungen an
	// wegfallenden Pins räumt der Connection-Kill-Mechanismus im nächsten Frame ab
	_rebuildIOs() {
		for (const io of [...this.inputs, ...this.outputs]) {
			io.kill()
		}
		this.inputs = []
		this.outputs = []

		if (this.isUnary) {
			this._buildUnaryIOs()
		}
		else {
			this._buildBinaryIOs()
		}
	}

	_buildUnaryIOs() {
		if (this.mode == 'bit') {
			this.newInput("A", "Input", "Boolean value to negate")
			this.newOutput("!A", "Output", "The negated value of input A")
		}
		else if (this.mode == 'bitwise') {
			this.newInput("A", "Byte", "Byte whose bits are all flipped")
			this.newOutput("!A", "Complement", "The input byte with every bit flipped")
		}
		else {
			let count = SIMPLE_MODE_INPUT_COUNTS[this.mode]
			for (let i = 1; i <= count; i++) {
				this.newInput("A" + i, "Input " + i, "Boolean value to negate")
			}
			for (let i = 1; i <= count; i++) {
				this.newOutput("!A" + i, "Output " + i, "The negated value of input A" + i)
			}
		}
	}

	_buildBinaryIOs() {
		if (this.mode == 'bit') {
			this.newInput("I1", "Input 1", "First boolean input of the gate")
			this.newInput("I2", "Input 2", "Second boolean input of the gate")
			this.newOutput("O", "Output", "Result of the gate applied to both inputs")
			this.newOutput("!O", "Inverted Output", "Opposite of the output O")
		}
		else if (this.mode == 'bitwise') {
			this.newInput("A", "Byte A", "First byte operand")
			this.newInput("B", "Byte B", "Second byte operand")
			this.newOutput("O", "Output", "Byte with the gate applied per bit position")
			this.newOutput("!O", "Inverted Output", "The output byte with every bit flipped")
		}
		else if (this.variant == 'channeled') {
			let channels = SIMPLE_MODE_INPUT_COUNTS[this.mode] / 2
			for (let c = 1; c <= channels; c++) {
				this.newInput("A" + c, "Input A" + c, "First input of gate channel " + c)
				this.newInput("B" + c, "Input B" + c, "Second input of gate channel " + c)
			}
			for (let c = 1; c <= channels; c++) {
				this.newOutput("O" + c, "Output " + c, "Result of gate channel " + c)
				this.newOutput("!O" + c, "Inverted Output " + c, "Opposite of output O" + c)
			}
		}
		else {
			let count = SIMPLE_MODE_INPUT_COUNTS[this.mode]
			for (let i = 1; i <= count; i++) {
				this.newInput("I" + i, "Input " + i, "Input " + i + " of the gate")
			}
			this.newOutput("O", "Output", "Result of the gate applied across all inputs")
			this.newOutput("!O", "Inverted Output", "Opposite of the output O")
		}
	}

	getConfig() {
		let conf = {
			...super.getConfig(),
			Mode: this.mode
		}
		if (!this.isUnary) {
			conf.Variant = this.variant
		}
		return conf
	}

	setConfig(conf, loaded = false) {
		super.setConfig(conf, loaded)
		let mode = ('Mode' in conf) ? conf.Mode : this.mode
		let variant = ('Variant' in conf) ? conf.Variant : this.variant
		// Neu bestückt wird nur, wenn sich das Pin-Layout wirklich ändert —
		// Variant wirkt nur bei nibble/byte, ein wirkungsloser Rebuild würde Verbindungen kappen
		let layoutChanged = (mode != this.mode) ||
			((variant != this.variant) && (mode == 'nibble' || mode == 'byte') && !this.isUnary)
		this.mode = mode
		this.variant = variant
		if (layoutChanged) {
			this._rebuildIOs()
		}
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		if (this.mode == 'bitwise') {
			// action pro Bitstelle der Byte-Operanden anwenden
			let a = (this.inputs[0].value) & 255
			let b = this.isUnary ? 0 : ((this.inputs[1].value) & 255)
			let result = 0
			for (let i = 0; i < 8; i++) {
				if (this.action(!!(a & (1 << i)), !!(b & (1 << i)))) {
					result |= (1 << i)
				}
			}
			this.outputs[0].value = result
			if (!this.isUnary) {
				this.outputs[1].value = (~result) & 255
			}
		}
		else if (this.isUnary) {
			for (let i = 0; i < this.inputs.length; i++) {
				this.outputs[i].value = this.action(!!(this.inputs[i].value), false)
			}
		}
		else if (this.variant == 'channeled' && this.mode != 'bit') {
			// unabhängige Zweifach-Gatter: Eingänge paarweise (A, B) je Kanal
			for (let c = 0; c < this.inputs.length / 2; c++) {
				let result = this.action(!!(this.inputs[c * 2].value), !!(this.inputs[c * 2 + 1].value))
				this.outputs[c * 2].value = result
				this.outputs[c * 2 + 1].value = !result
			}
		}
		else {
			// bit und combined: das Gatter über alle Eingänge verkettet
			// (AND: alle, OR: mindestens einer, XOR: Parität)
			let result = !!(this.inputs[0].value)
			for (let i = 1; i < this.inputs.length; i++) {
				result = this.action(result, !!(this.inputs[i].value))
			}
			this.outputs[0].value = result
			this.outputs[1].value = !result
		}
	}

	doDraw(tick, p5ctx) {
		super.doDraw(tick, p5ctx)

		p5ctx.push()

		p5ctx.noStroke()
		p5ctx.fill(0)
		p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
		p5ctx.textSize(18)
		p5ctx.text(this.icon, 0, 0)

		p5ctx.pop()
	}
}

const Op_And = register(
	"And",
	"Logic",
	"C = A && B",
	class extends base_Simple {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (a, b) => a && b
			this.icon = "AND"

			this._rebuildIOs()
		}
	}
)

const Op_Or = register(
	"Or",
	"Logic",
	"C = A || B",
	class extends base_Simple {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (a, b) => a || b
			this.icon = "OR"

			this._rebuildIOs()
		}
	}
)

const Op_Xor = register(
	"Xor",
	"Logic",
	"C = A xor B",
	class extends base_Simple {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (a, b) => (a != b) && (a || b)
			this.icon = "XOR"

			this._rebuildIOs()
		}
	}
)

const Op_Not = register(
	"Not",
	"Logic",
	"C = A not B",
	class extends base_Simple {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.isUnary = true
			this.action = (a, b) => !a
			this.icon = "NOT"

			this._rebuildIOs()
		}
	}
)

const Op_Pipe1 = register(
	"Pipe 1",
	"Utility",
	"Pipes 1 value throu",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width = 20

			this.in_i = this.newInput("", "Input", "Value that is passed straight through to the output")
			this.out_o = this.newOutput("", "Output", "The unchanged value from the input")

			this.height = 20
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.out_o.value = this.in_i.value
		}
	}
)

const Op_Pipe4 = register(
	"Pipe 4",
	"Utility",
	"Pipes 4 values throu",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width = 20

			this.in_i1 = this.newInput("", "Input 1", "Value that is passed straight through to output 1")
			this.in_i2 = this.newInput("", "Input 2", "Value that is passed straight through to output 2")
			this.in_i3 = this.newInput("", "Input 3", "Value that is passed straight through to output 3")
			this.in_i4 = this.newInput("", "Input 4", "Value that is passed straight through to output 4")

			this.out_o1 = this.newOutput("", "Output 1", "The unchanged value from input 1")
			this.out_o2 = this.newOutput("", "Output 2", "The unchanged value from input 2")
			this.out_o3 = this.newOutput("", "Output 3", "The unchanged value from input 3")
			this.out_o4 = this.newOutput("", "Output 4", "The unchanged value from input 4")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.out_o1.value = this.in_i1.value
			this.out_o2.value = this.in_i2.value
			this.out_o3.value = this.in_i3.value
			this.out_o4.value = this.in_i4.value
		}
	}
)

const Op_Pipe8 = register(
	"Pipe 8",
	"Utility",
	"Pipes 8 values throu",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width = 20

			this.in_i1 = this.newInput("", "Input 1", "Value that is passed straight through to output 1")
			this.in_i2 = this.newInput("", "Input 2", "Value that is passed straight through to output 2")
			this.in_i3 = this.newInput("", "Input 3", "Value that is passed straight through to output 3")
			this.in_i4 = this.newInput("", "Input 4", "Value that is passed straight through to output 4")
			this.in_i5 = this.newInput("", "Input 5", "Value that is passed straight through to output 5")
			this.in_i6 = this.newInput("", "Input 6", "Value that is passed straight through to output 6")
			this.in_i7 = this.newInput("", "Input 7", "Value that is passed straight through to output 7")
			this.in_i8 = this.newInput("", "Input 8", "Value that is passed straight through to output 8")

			this.out_o1 = this.newOutput("", "Output 1", "The unchanged value from input 1")
			this.out_o2 = this.newOutput("", "Output 2", "The unchanged value from input 2")
			this.out_o3 = this.newOutput("", "Output 3", "The unchanged value from input 3")
			this.out_o4 = this.newOutput("", "Output 4", "The unchanged value from input 4")
			this.out_o5 = this.newOutput("", "Output 5", "The unchanged value from input 5")
			this.out_o6 = this.newOutput("", "Output 6", "The unchanged value from input 6")
			this.out_o7 = this.newOutput("", "Output 7", "The unchanged value from input 7")
			this.out_o8 = this.newOutput("", "Output 8", "The unchanged value from input 8")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.out_o1.value = this.in_i1.value
			this.out_o2.value = this.in_i2.value
			this.out_o3.value = this.in_i3.value
			this.out_o4.value = this.in_i4.value
			this.out_o5.value = this.in_i5.value
			this.out_o6.value = this.in_i6.value
			this.out_o7.value = this.in_i7.value
			this.out_o8.value = this.in_i8.value
		}
	}
)

const Op_Value = register(
	"Value",
	"Fixed Input",
	"Provides any value",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.binary = true
			this.value = false

			this.out_v = this.newOutput("V", "Value", "The configured value, as bit or byte depending on the Binary setting")
		}

		getConfig() {
			return {
				...super.getConfig(),
				binary: !!this.binary,
				value: this.value & 255
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded)
			if ("binary" in conf) {
				this.binary = !!conf.binary
			}
			if ("value" in conf) {
				this.value = conf.value & 255
			}
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = (this.value & 255)
			if (this.binary) {
				v = !!v
			}

			this.out_v.value = v
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			let value = this.out_v.value
			let charDisplay = ''
			let advDisplay = ''

			if (this.binary) {
				value = !!value
				advDisplay = value ? "ON" : "OFF"
			}
			else {
				value = value & 255
				advDisplay = ('00' + value.toString(16).toUpperCase()).substr(-2)
			}
			charDisplay = charify(value)

			p5ctx.push()
			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(10)
			p5ctx.text('VALUE', 0, -15)
			p5ctx.textSize(18)
			p5ctx.text(value + '', 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text(advDisplay, 0, 5)
			p5ctx.text(charDisplay, 0, 15)
			p5ctx.pop()
		}
	}
)
