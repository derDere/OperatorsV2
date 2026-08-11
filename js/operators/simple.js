class base_Simple extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_a = this.newInput("I1")
		this.in_b = this.newInput("I2")
		this.out_c = this.newOutput("O")
		this.out_not_c = this.newOutput("!O")

		this.action = (a, b) => false
		this.icon = ""
	}

	doUpdate(tick) {
		super.doUpdate(tick)

		let a = !!(this.in_a.value)
		let b = !!(this.in_b.value)

		let c = this.action(a, b)
		let nc = !c

		this.out_c.value = c
		this.out_not_c.value = nc
	}

	doDraw(tick) {
		super.doDraw(tick)

		push()

		noStroke()
		fill(0)
		textAlign(CENTER, CENTER)
		textSize(18)
		text(this.icon, 0, 0)

		pop()
	}
}

const Op_And = register(
	"And",
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
	"Pipes 1 value throu",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width = 20

			this.in_i = this.newInput("")
			this.out_o = this.newOutput("")

			this.height = 20
		}

		doUpdate(tick) {
			super.doUpdate(tick)

			this.out_o.value = this.in_i.value
		}
	}
)

const Op_Pipe4 = register(
	"Pipe 4",
	"Pipes 4 values throu",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width = 20

			this.in_i1 = this.newInput("")
			this.in_i2 = this.newInput("")
			this.in_i3 = this.newInput("")
			this.in_i4 = this.newInput("")

			this.out_o1 = this.newOutput("")
			this.out_o2 = this.newOutput("")
			this.out_o3 = this.newOutput("")
			this.out_o4 = this.newOutput("")
		}

		doUpdate(tick) {
			super.doUpdate(tick)

			this.out_o1.value = this.in_i1.value
			this.out_o2.value = this.in_i2.value
			this.out_o3.value = this.in_i3.value
			this.out_o4.value = this.in_i4.value
		}
	}
)

const Op_Pipe8 = register(
	"Pipe 8",
	"Pipes 8 values throu",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width = 20

			this.in_i1 = this.newInput("")
			this.in_i2 = this.newInput("")
			this.in_i3 = this.newInput("")
			this.in_i4 = this.newInput("")
			this.in_i5 = this.newInput("")
			this.in_i6 = this.newInput("")
			this.in_i7 = this.newInput("")
			this.in_i8 = this.newInput("")

			this.out_o1 = this.newOutput("")
			this.out_o2 = this.newOutput("")
			this.out_o3 = this.newOutput("")
			this.out_o4 = this.newOutput("")
			this.out_o5 = this.newOutput("")
			this.out_o6 = this.newOutput("")
			this.out_o7 = this.newOutput("")
			this.out_o8 = this.newOutput("")
		}

		doUpdate(tick) {
			super.doUpdate(tick)

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
	"Provides any value",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.binary = true
			this.value = false

			this.out_v = this.newOutput("V")
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

		doUpdate(tick) {
			super.doUpdate(tick)

			let v = (this.value & 255)
			if (this.binary) {
				v = !!v
			}

			this.out_v.value = v
		}

		doDraw(tick) {
			super.doDraw(tick)
			push()
			noStroke()
			fill(0)
			textAlign(CENTER, BOTTOM)
			textSize(18)
			text(this.out_v.value + '', 0, 5)
			textAlign(CENTER, TOP)
			textSize(10)
			text('VALUE' + '', 0, 5)
			pop()
		}
	}
)
