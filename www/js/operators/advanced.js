const Op_Stack = register(
	"Stack",
	"Memory",
	"Stacks byte values if triggered or pops, flushes, or clears them. Keep reads without removing, Reset restarts reading, E = empty/end",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.stack = []

      this.output = 0

      this.readPos = 0 // Lesezeiger im Keep-Modus

			this.lastT = false
      this.lastF = false
      this.lastP = false
      this.lastC = false
      this.lastR = false

      this.in_v = this.newInput("V") // Value
			this.in_t = this.newInput("T") // Trigger
			this.in_f = this.newInput("F") // Flush
			this.in_p = this.newInput("P") // Pop
			this.in_c = this.newInput("C") // Clear
			this.in_k = this.newInput("K") // Keep
			this.in_r = this.newInput("R") // Reset

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
			let k = !!(this.in_k.value)
			let r = !!(this.in_r.value)

      let trigger = false
      let flush = false
      let pop = false
      let clear = false
      let reset = false
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
      if (r != this.lastR && r) {
        reset = true
			}

			this.lastT = t
			this.lastF = f
			this.lastP = p
			this.lastC = c
			this.lastR = r

      if (trigger) {
        this.stack.push(v)
      }

      if (clear) {
        this.stack = []
      }

      if (clear || reset) {
        this.readPos = 0
      }

      if (k) {
        // Keep-Modus: Lesen entfernt nichts — ein Lesezeiger wandert über den Stapel
        if (flush && this.readPos < this.stack.length) {
          this.output = this.stack[this.readPos]
          this.readPos++
          outT = true
        }
        else if (pop && this.readPos < this.stack.length) {
          this.output = this.stack[this.stack.length - 1 - this.readPos]
          this.readPos++
          outT = true
        }
        else if (this.stack.length <= 0) {
          this.output = 0
        }
        empty = (this.readPos >= this.stack.length) // E = End: alles gelesen
      }
      else {
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
      }

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

			p5ctx.pop()
		}
	}
)

const Op_Register = register(
	"Register",
	"Memory",
	"Stores bytes at addressed memory",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.mem = {}

			this.count = 0

			this.lastC = false
			this.lastW = false
			this.lastA = 0
			this.lastB = 0

      this.in_a = this.newInput("A") // Address
			this.in_b = this.newInput("B") // Byte
			this.in_w = this.newInput("W") // Write
			this.in_c = this.newInput("C") // Clear

			this.out_a = this.newOutput("A") // Address
			this.out_b = this.newOutput("B") // Byte
			this.out_t = this.newOutput("T") // Trigger
			this.out_e = this.newOutput("E") // Empty
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let a = (this.in_a.value) & 255
			let b = (this.in_b.value) & 255
			let w = !!(this.in_w.value)
			let c = !!(this.in_c.value)

      let write = false
      let clear = false
			let trigger = false

			if (w != this.lastW && w) {
        write = true
			}
			this.lastW = w

      if (c != this.lastC && c) {
        clear = true
			}
			this.lastC = c
			
      if (write) {
        this.mem[a] = b
      }

      if (clear) {
				this.mem = {}
      }

			this.count = Object.keys(this.mem).length

      let empty = (this.count <= 0)

			let b_out = 0
			if (a in this.mem) {
				b_out = this.mem[a]
			}

			a = a & 255
			b_out = b_out & 255

			if (this.lastA != a) {
				trigger = true
			}
			if (this.lastB != b_out) {
				trigger = true
			}
			this.lastA = a
			this.lastB = b_out

			this.out_a.value = a & 255
			this.out_b.value = b_out & 255
			this.out_t.value = trigger
			this.out_e.value = empty
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.count, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('REG', 0, 5)

			p5ctx.pop()
		}
	}
)
