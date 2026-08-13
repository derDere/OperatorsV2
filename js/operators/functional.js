class base_Functional extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_b1 = this.newInput("B1")
		this.in_b2 = this.newInput("B2")
		this.out_r = this.newOutput("R")
		this.out_o = this.newOutput("O")
		this.out_no = this.newOutput("!O")

		this.func = (a, b) => 0
		this.outp = (a, b) => false
		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let a = (this.in_b1.value) & 255
		let b = (this.in_b2.value) & 255

		let r = this.func(a, b)
    let o = this.outp(a, b)
		let no = !o

		this.out_r.value = r
		this.out_o.value = o
		this.out_no.value = no
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

const Op_Equals = register(
	"Equals",
	"O = B1 == B2",
	class extends base_Functional {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.func = (a, b) => a ^ b
			this.outp = (a, b) => a == b
			this.icon = "EQ"
		}
	}
)