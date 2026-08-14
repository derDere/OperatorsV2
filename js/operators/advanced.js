const Op_Stack = register(
	"Stack",
	"Stacks byte values if triggered or pops, flushes, or clears them",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.stack = []

      this.output = 0

			this.lastT = false
      this.lastF = false
      this.lastP = false
      this.lastC = false

      this.in_v = this.newInput("V") // Value
			this.in_t = this.newInput("T") // Trigger
			this.in_f = this.newInput("F") // Flush
			this.in_p = this.newInput("P") // Pop
			this.in_c = this.newInput("C") // Clear

			this.out_b = this.newOutput("B") // Byte
			this.out_t = this.newOutput("T") // Trigger
			this.out_e = this.newOutput("E") // Empty
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = (this.in_v.value & 255)
			let t = !!(this.in_t.value)
			let f = !!(this.in_f.value)
			let p = !!(this.in_p.value)
			let c = !!(this.in_c.value)

      let trigger = false
      let flush = false
      let pop = false
      let clear = false
      let outT = false
      let empty = false

			if (t != this.lastT && t) {
        trigger = true
			}
      if (f != this.lastF && f) {
        flush = true
			}
      if (p != this.lastP && p) {
        pop = true
			}
      if (c != this.lastC && c) {
        clear = true
			}

			this.lastT = t
			this.lastF = f
			this.lastP = p
			this.lastC = c

      if (trigger) {
        this.stack.push(v)
      }

      if (clear) {
        this.stack = []
      }

      if (flush && this.stack.length > 0) {
        this.output = this.stack[0]
        this.stack.splice(0,1)
        outT = true
      }
      else if (pop && this.stack.length > 0) {
        this.output = this.stack.pop()
        outT = true
      }
      else if (this.stack.length <= 0) {
        this.output = 0
      }

      empty = (this.stack.length <= 0)

			let b0 = !!(this.value & 1)
			let b1 = !!(this.value & 2)
			let b2 = !!(this.value & 4)
			let b3 = !!(this.value & 8)
			let o = this.value >= 16

			this.out_b.value = this.output
			this.out_t.value = outT
			this.out_e.value = empty
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.stack.length, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('STACK', 0, 5)

      for(let i = 0; i < this.stack.length; i++) {
        p5ctx.text(this.stack[i], 0, -30 - (i * 10))
      }

			p5ctx.pop()
		}
	}
)
