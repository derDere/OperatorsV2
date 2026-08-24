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

function calcOverflow(value) {
	let r = value
	let rn = r < 0
	let on = false
	if (rn) {
		r *= -1
		on = true
	}
	let o = 0
	if (r > 255) {
		let tmp = r
		r %= 255
		o = p5ctx.round((tmp - r) / 255)
	}
	else {
		on = false
	}
	return [r, rn, o, on]
}

class base_Functional_solo extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_b1 = this.newInput("B1") // Byte 1 

		this.out_r = this.newOutput("R") // Result
		this.out_rn = this.newOutput("RN") // is Result Negative

		this.func = b => [0] // Should only Return R because RN is calculated from the update

		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let b1 = (this.in_b1.value) & 255

		let r = p5ctx.round(this.func(b1))

		let rn = false
		if (r < 0) {
			r *= -1
			rn = true
		}

		this.out_r.value = r & 255
		this.out_rn.value = !!rn
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

		let v = p5ctx.round(this.func(b1, b2))

		let [r, rn, o, on] = calcOverflow(v)

		this.out_r.value = r & 255
		this.out_rn.value = !!rn
		this.out_o.value = o & 255
		this.out_on.value = !!on
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

		this.out_b.value = b & 255
		this.out_o.value = !!o
		this.out_no.value = !!no
	}
}

const Op_Add = register(
	"Add",
	"Math",
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
	"Math",
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
	"Math",
	"O = B1 * B2",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a * b)

			this.icon = "\u00d7" // ×
		}
	}
)

const Op_Scale = register(
	"Scale",
	"Math",
	"O = B1 * (B2 / 255)",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a * (b / 255))

			this.icon = "Scale"
		}
	}
)

const Op_Divide = register(
	"Divide",
	"Math",
	"O = B1 / B2",
	class extends base_Functional_calc {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => (a / b) | 0

			this.icon = "/"
		}
	}
)

const Op_Sin = register(
	"Sinus",
	"Math",
	"O = Sin(B1) * 255 where (PI*2 = 255)",
	class extends base_Functional_solo {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a) => {
				let rad = (a / 255) * (mainP5.PI * 2)
				let r = mainP5.sin(rad) * 255
				return r
			}

			this.icon = "SIN"
		}
	}
)

const Op_Cos = register(
	"Cosinus",
	"Math",
	"O = Cos(B1) * 255 where (PI*2 = 255)",
	class extends base_Functional_solo {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a) => {
				let rad = (a / 255) * (mainP5.PI * 2)
				let r = mainP5.cos(rad) * 255
				return r
			}

			this.icon = "COS"
		}
	}
)

const Op_Equals = register(
	"Equals",
	"Math",
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

const Op_Tan = register(
	"Tangents",
	"Math",
	"T = Tan(B1) * 255 if co=0 else (1/Tan(B1)) * 255 where (PI*2 = 255)",
	class extends Operator {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.in_b1 = this.newInput("B1") // Byte 1 

			this.out_t = this.newOutput("T") // Tan / Cotan
			this.out_co = this.newOutput("CO") // Use Cotan
			this.out_tn = this.newOutput("TN") // Tan/Cotan is negative

			this.icon = "TAN"
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let b1 = (this.in_b1.value) & 255

			let rad = (b1 / 255) * (mainP5.PI * 2);

			let s = mainP5.sin(rad);
			let c = mainP5.cos(rad);

			let tn = ((s < 0) !== (c < 0)) ? 1 : 0;

			s = mainP5.abs(s);
			c = mainP5.abs(c);

			let t = 0;
			let co = 0;

			if (s <= c) {
				t = mainP5.round((s / c) * 255);
				co = 0;
			} else {
				t = mainP5.round((c / s) * 255);
				co = 1;
			}

			if (t > 255) t = 255;

			this.out_t.value = t & 255
			this.out_co.value = !!co
			this.out_tn.value = !!tn
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
)


const Op_Rnd = register(
	"Random",
	"Math",
	"O = rand(0- 255)",
	class extends Operator {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.out_r = this.newOutput("R") // Random

			this.icon = "RND"
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let r = mainP5.random(0, 255)

			this.out_r.value = r & 255
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
)

const Op_Noise = register(
	"Noise",
	"Math",
	"O = Noise(a / s, b / s, c / s) * 255",
	class extends Operator {
		constructor(x = 0, y = 0) {
			super(x, y)
			
			this.in_a = this.newInput("A") // A Val
			this.in_b = this.newInput("B") // B Val
			this.in_c = this.newInput("C") // C Bal
			this.in_s = this.newInput("S") // Scale

			this.out_r = this.newOutput("N") // Noise

			this.icon = "NOI"
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)
			
			let a = (this.in_a.value) & 255
			let b = (this.in_b.value) & 255
			let c = (this.in_c.value) & 255
			let s = (this.in_s.value) & 255	

			if (s < 1) s = 1

			let r = mainP5.noise(a/s, b/s, c/s) * 255

			this.out_r.value = r & 255
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
)