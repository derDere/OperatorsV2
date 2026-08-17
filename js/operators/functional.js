class base_Functional extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_b1 = this.newInput("B1") // Byte 1
		this.in_b2 = this.newInput("B2") // Byte 2 

		this.icon = ""
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

class base_Functional_calc extends base_Functional {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.out_r = this.newOutput("R") // Result
		this.out_rn = this.newOutput("RN") // is Result Negative
		this.out_o = this.newOutput("O") // Overflow
		this.out_on = this.newOutput("ON") // is Overflow Negative

		this.func = (a, b) => [0] // Should Return R because RN O ON are defined by the base!

		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let b1 = (this.in_b1.value) & 255
		let b2 = (this.in_b2.value) & 255

		let r = p5ctx.round(this.func(b1, b2))

		let rn = r < 0
		let on = false
		if (rn) {
			r *= -1
			on = true
		}
		let o = 0
		if (r > 255) {
			o = r - 255
			r -= o
		}
		else {
			on = false
		}

		this.out_r.value = r & 255
		this.out_rn.value = rn
		this.out_o.value = o
		this.out_on.value = on
	}
}

class base_Functional_comparer extends base_Functional {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.out_b = this.newOutput("B") // Bitwise Output
		this.out_o = this.newOutput("O") // Output
		this.out_no = this.newOutput("!O") // Not Output

		// (this placeholder function, purposly, has an invalid output with O and !O both being false to identify it as a placeholder)
		this.func = (a, b) => [0, false, false] // Should Return B O !O in that order!

		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let b1 = (this.in_b1.value) & 255
		let b2 = (this.in_b2.value) & 255

		let [b, o, no] = this.func(b1, b2)

		this.out_b.value = b
		this.out_o.value = o
		this.out_no.value = no
	}
}

const Op_Add = register(
	"Add",
	"O = B1 + B2",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a + b)

			this.icon = "+"
		}
	}
)

const Op_Sub = register(
	"Subtract",
	"O = B1 - B2",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a - b)

			this.icon = "-"
		}
	}
)

const Op_Mult = register(
	"Multiply",
	"O = B1 * B2",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a * b)

			this.icon = "\u00d7" // ×
		}
	}
)

const Op_Divide = register(
	"Divide",
	"O = B1 / B2",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a / b)

			this.icon = "/"
		}
	}
)

const Op_Equals = register(
	"Equals",
	"O = B1 == B2",
	class extends base_Functional_comparer {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => [
				(a ^ b) & 255,
				a == b,
				!(a == b)
			]

			this.icon = "EQ"
		}
	}
)