const ANALOG_PI = 128


class base_Vector1t1 extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_ax = this.newInput("AX") // Input Vector A.X
		this.in_ay = this.newInput("AY") // Input Vector A.Y

		this.out_cx = this.newOutput("CX") // Output Vector C.X
    this.out_cy = this.newOutput("CY") // Output Vector C.Y

		this.action = (x, y) => [x, y]

		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let ax = (this.in_ax.value) & 255
		let ay = (this.in_ay.value) & 255

		let [cx, cy] = this.action(ax, ay)

		this.out_cx.value = cx & 255
    this.out_cy.value = cy & 255
	}

	doDraw(tick, p5ctx) {
		super.doDraw(tick, p5ctx)

		p5ctx.push()

		p5ctx.noStroke()
		p5ctx.fill(0)
		p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
		p5ctx.textSize(14)
		p5ctx.text(this.icon, 0, 0)

		p5ctx.pop()
	}
}

class base_Vector1at1 extends base_Vector1t1 {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_v = this.newInput("V") // Input Value

		this.action = (x1, y1, v) => [x, y]

		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let ax = (this.in_ax.value) & 255
		let ay = (this.in_ay.value) & 255
		let v = (this.in_v.value) & 255

		let [cx, cy] = this.action(ax, ay, v)

		this.out_cx.value = cx & 255
    this.out_cy.value = cy & 255
	}
}

class base_Vector2t1 extends base_Vector1t1 {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.in_bx = this.newInput("BX") // Input Vector B.X
		this.in_by = this.newInput("BY") // Input Vector B.Y

		this.action = (x1, y1, x2, y2) => [x, y]

		this.icon = ""
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let ax = (this.in_ax.value) & 255
		let ay = (this.in_ay.value) & 255
		let bx = (this.in_bx.value) & 255
		let by = (this.in_by.value) & 255

		let [cx, cy] = this.action(ax, ay, bx, by)

		this.out_cx.value = cx & 255
    this.out_cy.value = cy & 255
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

const Op_Vector_Add = register(
	"Vector Add",
	"(CX, CY) = (AX, AY) + (BX, BY)",
	class extends base_Vector2t1 {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (x1, y1, x2, y2) => [x1 + x2, y1 + y2]

			this.icon = "Vector\nADD"
		}
	}
)

const Op_Vector_Sub = register(
	"Vector Subtract",
	"(CX, CY) = (AX, AY) - (BX, BY)",
	class extends base_Vector2t1 {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (x1, y1, x2, y2) => [x1 - x2, y1 - y2]

			this.icon = "Vector\nSub"
		}
	}
)

const Op_Vector_Mod = register(
	"Vector Modulo",
	"(CX, CY) = (AX, AY) mod (BX, BY)",
	class extends base_Vector2t1 {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (x1, y1, x2, y2) => [x1 % x2, y1 % y2]

			this.icon = "Vector\nSub"
		}
	}
)

const Op_Vector_Scale = register(
	"Vector Scale",
	"(CX, CY) = (AX, AY) * (V / 255)",
	class extends base_Vector1at1 {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (x1, y1, v) => [x1 * (v / 255), y1 * (v / 255)]

			this.icon = "Vector\nScale"
		}
	}
)

const Op_Vector_Mult = register(
	"Vector Multiply",
	"(CX, CY) = (AX, AY) * V",
	class extends base_Vector1at1 {
		constructor(x = 0, y = 0) {
			super(x, y)

			this.action = (x1, y1, v) => [x1 * v, y1 * v]

			this.icon = "Vector\nMult"
		}
	}
)