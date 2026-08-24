const Op_Pulse = register(
	"Pulse",
	"Logic",
	"Gives a 1 Tick pulse on state change",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.last = false

			this.in_s = this.newInput("I") // Input

			this.out_p_u = this.newOutput("U") // Up flank
			this.out_p_d = this.newOutput("D") // Down flank
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let inputState = !!(this.in_s.value)

			let flankUp = false
			let flankDown = false

			if (inputState != this.last) {
				if (inputState) {
					flankUp = true
				}
				else {
					flankDown = true
				}
			}

			this.out_p_u.value = flankUp
			this.out_p_d.value = flankDown

			this.last = inputState
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(12)
			p5ctx.text('PULSE', 0, 0)

			p5ctx.pop()
		}
	}
)

const Op_RsFlipFlop = register(
	"RS FlipFlop",
	"Logic",
	"Sets or Resets a state permanently via inputs",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.in_s = this.newInput("S")
			this.in_r = this.newInput("R")

			this.out_o = this.newOutput("Q")
			this.out_no = this.newOutput("!Q")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let s = !!(this.in_s.value)
			let r = !!(this.in_r.value)

			if (s) {
				this.state = true
			}
			else if (r) {
				this.state = false
			}

			this.out_o.value = this.state
			this.out_no.value = !this.state
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text('R/S', 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('FlipFlop', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_TFlipFlop = register(
	"T FlipFlop",
	"Logic",
	"Toggles a state permanently via inputs",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false
			this.last = false

			this.in_t = this.newInput("T")

			this.out_o = this.newOutput("Q")
			this.out_no = this.newOutput("!Q")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let t = !!(this.in_t.value)

			if (t != this.last) {
				if (t) {
					this.state = !this.state
				}
			}

			this.last = t

			this.out_o.value = this.state
			this.out_no.value = !this.state
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text('T', 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('FlipFlop', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_Memory1 = register(
	"Memory (1 bit)",
	"Memory",
	"Stores 1 bit of memory when triggered",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false
			this.last = false

			this.in_v = this.newInput("B1")
			this.in_t = this.newInput("T")

			this.out_b = this.newOutput("B")
			this.out_nb = this.newOutput("!B")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = !!(this.in_v.value)
			let t = !!(this.in_t.value)

			if (t != this.last) {
				if (t) {
					this.state = v
				}
			}

			this.last = t

			this.out_b.value = this.state
			this.out_nb.value = !this.state
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.state ? '1' : '0', 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('MEM1', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_Memory8 = register(
	"Memory (1 byte)",
	"Memory",
	"Stores 1 byte of memory when triggered",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = 0
			this.last = false

			this.in_v = this.newInput("B")
			this.in_t = this.newInput("T")

			this.out_b = this.newOutput("B")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = (this.in_v.value & 255)
			let t = !!(this.in_t.value)

			if (t != this.last) {
				if (t) {
					this.state = v
				}
			}

			this.last = t

			this.out_b.value = this.state
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.state, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('MEM8', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_4bit_to_byte = register(
	"4bit to byte decoder",
	"Converter",
	"Decodes 4bit into a byte signal",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in1 = this.newInput("B0")
			this.in2 = this.newInput("B1")
			this.in3 = this.newInput("B2")
			this.in4 = this.newInput("B3")

			this.ouByte = this.newOutput("B")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let b0 = !!(this.in1.value) ? 1 : 0
			let b1 = !!(this.in2.value) ? 1 : 0
			let b2 = !!(this.in3.value) ? 1 : 0
			let b3 = !!(this.in4.value) ? 1 : 0

			let v = 0
			v |= (b0 << 0)
			v |= (b1 << 1)
			v |= (b2 << 2)
			v |= (b3 << 3)

			this.ouByte.value = v
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)

			p5ctx.rotate(p5ctx.PI / 2)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.text("4bit to Byte", 0, 0)

			p5ctx.pop()
		}
	}
)

const Op_8bit_to_byte = register(
	"8bit to byte decoder",
	"Converter",
	"Decodes 8bit into a byte signal",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in1 = this.newInput("B0")
			this.in2 = this.newInput("B1")
			this.in3 = this.newInput("B2")
			this.in4 = this.newInput("B3")
			this.in5 = this.newInput("B4")
			this.in6 = this.newInput("B5")
			this.in7 = this.newInput("B6")
			this.in8 = this.newInput("B7")

			this.ouByte = this.newOutput("B")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let b0 = !!(this.in1.value) ? 1 : 0
			let b1 = !!(this.in2.value) ? 1 : 0
			let b2 = !!(this.in3.value) ? 1 : 0
			let b3 = !!(this.in4.value) ? 1 : 0
			let b4 = !!(this.in5.value) ? 1 : 0
			let b5 = !!(this.in6.value) ? 1 : 0
			let b6 = !!(this.in7.value) ? 1 : 0
			let b7 = !!(this.in8.value) ? 1 : 0

			let v = 0
			v |= (b0 << 0)
			v |= (b1 << 1)
			v |= (b2 << 2)
			v |= (b3 << 3)
			v |= (b4 << 4)
			v |= (b5 << 5)
			v |= (b6 << 6)
			v |= (b7 << 7)

			this.ouByte.value = v
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)

			p5ctx.rotate(p5ctx.PI / 2)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.text("8bit to Byte", 0, 0)

			p5ctx.pop()
		}
	}
)

const Op_byte_to_4bit = register(
	"Byte to 4bit decoder",
	"Converter",
	"Decodes a byte into 4bit",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in1 = this.newInput("B")

			this.ouB1 = this.newOutput("B0")
			this.ouB2 = this.newOutput("B1")
			this.ouB3 = this.newOutput("B2")
			this.ouB4 = this.newOutput("B3")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = this.in1.value & 255

			let b0 = !!(v & 1)
			let b1 = !!(v & 2)
			let b2 = !!(v & 4)
			let b3 = !!(v & 8)

			this.ouB1.value = b0
			this.ouB2.value = b1
			this.ouB3.value = b2
			this.ouB4.value = b3
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)

			p5ctx.rotate(p5ctx.PI / 2)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.text("Byte to 4bit", 0, 0)

			p5ctx.pop()
		}
	}
)

const Op_byte_to_8bit = register(
	"Byte to 8bit decoder",
	"Converter",
	"Decodes a byte into 8bit",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in1 = this.newInput("B")

			this.ouB1 = this.newOutput("B0")
			this.ouB2 = this.newOutput("B1")
			this.ouB3 = this.newOutput("B2")
			this.ouB4 = this.newOutput("B3")
			this.ouB5 = this.newOutput("B4")
			this.ouB6 = this.newOutput("B5")
			this.ouB7 = this.newOutput("B6")
			this.ouB8 = this.newOutput("B7")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = this.in1.value & 255

			let b0 = !!(v & 1)
			let b1 = !!(v & 2)
			let b2 = !!(v & 4)
			let b3 = !!(v & 8)
			let b4 = !!(v & 16)
			let b5 = !!(v & 32)
			let b6 = !!(v & 64)
			let b7 = !!(v & 128)

			this.ouB1.value = b0
			this.ouB2.value = b1
			this.ouB3.value = b2
			this.ouB4.value = b3
			this.ouB5.value = b4
			this.ouB6.value = b5
			this.ouB7.value = b6
			this.ouB8.value = b7
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)

			p5ctx.rotate(p5ctx.PI / 2)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.text("Byte to 8bit", 0, 0)

			p5ctx.pop()
		}
	}
)

const Op_Counter4 = register(
	"Counter4",
	"Memory",
	"Counts up a 4bit value if triggered",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.value = 0
			this.lastI = false
			this.lastD = false

			this.in_i = this.newInput("I")
			this.in_d = this.newInput("D")
			this.in_r = this.newInput("R")

			this.out_u = this.newOutput("U")

			this.out_b1 = this.newOutput("B0")
			this.out_b2 = this.newOutput("B1")
			this.out_b3 = this.newOutput("B2")
			this.out_b4 = this.newOutput("B3")

			this.out_o = this.newOutput("O")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let i = !!(this.in_i.value)
			let d = !!(this.in_d.value)
			let r = !!(this.in_r.value)

			if (i != this.lastI) {
				if (i) {
					this.value += 1
				}
			}
			else if (d != this.lastD) {
				if (d) {
					this.value -= 1
				}
			}

			if (r) {
				this.value = 0
			}

			this.lastI = i
			this.lastD = d

			let b0 = !!(this.value & 1)
			let b1 = !!(this.value & 2)
			let b2 = !!(this.value & 4)
			let b3 = !!(this.value & 8)
			let o = this.value >= 16
			let u = this.value < 0

			if (o) {
				this.value = 0
			}
			if (u) {
				this.value = 15
			}

			this.out_u.value = u
			this.out_b1.value = b0
			this.out_b2.value = b1
			this.out_b3.value = b2
			this.out_b4.value = b3
			this.out_o.value = o
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.value, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('COUNTER', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_Counter8 = register(
	"Counter8",
	"Memory",
	"Counts up a byte value if triggered",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.value = 0
			this.lastI = false
			this.lastD = false

			this.in_i = this.newInput("I")
			this.in_d = this.newInput("D")
			this.in_r = this.newInput("R")

			this.out_u = this.newOutput("U")

			this.out_b = this.newOutput("B")

			this.out_o = this.newOutput("O")
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let i = !!(this.in_i.value)
			let d = !!(this.in_d.value)
			let r = !!(this.in_r.value)

			if (i != this.lastI) {
				if (i) {
					this.value += 1
				}
			}
			else if (d != this.lastD) {
				if (d) {
					this.value -= 1
				}
			}

			if (r) {
				this.value = 0
			}

			this.lastI = i
			this.lastD = d

			let b = (this.value) & 255
			let o = this.value >= 255
			let u = this.value < 0

			if (o) {
				this.value = 0
			}
			if (u) {
				this.value = 255
			}

			this.out_u.value = u
			this.out_b.value = b
			this.out_o.value = o
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.value, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('COUNTER', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_Repeater = register(
	"Repeater",
	"Signal",
	"Delays the bit signal S by D ticks (FIFO). Lock freezes it and ignores the input",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.buffer = [] // FIFO: pro Tick ein Signalwert
			this.output = false
			this.delay = 0

			this.in_d = this.newInput("D") // Delay (Byte, Ticks)
			this.in_s = this.newInput("S") // Signal
			this.in_l = this.newInput("L") // Lock

			this.out_o = this.newOutput("O") // Output
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let d = (this.in_d.value) & 255
			let s = !!(this.in_s.value)
			let l = !!(this.in_l.value)

			this.delay = d

			if (!l) {
				this.buffer.push(s)
				// Sinkt der Delay, holt der Puffer in einem Tick auf — es zählt der zuletzt gepoppte Wert
				while (this.buffer.length > d) {
					this.output = this.buffer.shift()
				}
			}

			this.out_o.value = this.output
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('RPT: ' + this.delay, 0, 5)

			let disbuf = this.buffer

			p5ctx.push()
			p5ctx.translate((-this.width / 2) + 20, -5)
			p5ctx.stroke(0)
			p5ctx.noFill()
			p5ctx.beginShape()
			if (disbuf.length > 0) {
				let step = (this.width - 30) / (disbuf.length + 1)
				for (let i = 0; i < disbuf.length; i++) {
					let y = disbuf[i] ? -5 : 5
					p5ctx.vertex(step * i, y)
					p5ctx.vertex(step * (i + 1), y)
				}
			}
			p5ctx.endShape()
			p5ctx.pop()

			p5ctx.pop()
		}
	}
)
