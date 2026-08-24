class base_Simple extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_a = this.newInput("I1") // Input 1
		this.in_b = this.newInput("I2") // Input 2
		this.out_c = this.newOutput("O") // Output
		this.out_not_c = this.newOutput("!O") // Not Output

		this.action = (a, b) => false
		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let a = !!(this.in_a.value)
		let b = !!(this.in_b.value)

		let c = this.action(a, b)
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

			this.inputs.pop().kill()
			this.outputs.pop().kill()
			this._reorderIOs()

			this.inputs[0].name = "A"
			this.outputs[0].name = "!A"

			this.action = (a, b) => !a
			this.icon = "NOT"
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

			this.in_i = this.newInput("") // Input
			this.out_o = this.newOutput("") // Output

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

			this.in_i1 = this.newInput("") // Input 1
			this.in_i2 = this.newInput("") // Input 2
			this.in_i3 = this.newInput("") // Input 3
			this.in_i4 = this.newInput("") // Input 4

			this.out_o1 = this.newOutput("") // Output 1
			this.out_o2 = this.newOutput("") // Output 2
			this.out_o3 = this.newOutput("") // Output 3
			this.out_o4 = this.newOutput("") // Output 4
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

			this.in_i1 = this.newInput("") // Input 1
			this.in_i2 = this.newInput("") // Input 2
			this.in_i3 = this.newInput("") // Input 3
			this.in_i4 = this.newInput("") // Input 4
			this.in_i5 = this.newInput("") // Input 5
			this.in_i6 = this.newInput("") // Input 6
			this.in_i7 = this.newInput("") // Input 7
			this.in_i8 = this.newInput("") // Input 8

			this.out_o1 = this.newOutput("") // Output 1
			this.out_o2 = this.newOutput("") // Output 2
			this.out_o3 = this.newOutput("") // Output 3
			this.out_o4 = this.newOutput("") // Output 4
			this.out_o5 = this.newOutput("") // Output 5
			this.out_o6 = this.newOutput("") // Output 6
			this.out_o7 = this.newOutput("") // Output 7
			this.out_o8 = this.newOutput("") // Output 8
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
	"Input",
	"Provides any value",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.binary = true
			this.value = false

			this.out_v = this.newOutput("V") // Value
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
