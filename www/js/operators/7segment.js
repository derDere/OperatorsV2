const S7_TOP_NO = { 0: 1, 2: 1, 3: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 14: 1, 15: 1 }
const S7_TOP_LEFT_NO = { 0: 1, 4: 1, 5: 1, 6: 1, 8: 1, 9: 1, 10: 1, 11: 1, 14: 1, 15: 1 }
const S7_TOP_RIGHT_NO = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 7: 1, 8: 1, 9: 1, 10: 1, 13: 1 }
const S7_MIDDLE_NO = { 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1 }
const S7_BOTTOM_LEFT_NO = { 0: 1, 2: 1, 6: 1, 8: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1 }
const S7_BOTTOM_RIGHT_NO = { 0: 1, 1: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 13: 1 }
const S7_BOTTOM_NO = { 0: 1, 2: 1, 3: 1, 5: 1, 6: 1, 8: 1, 9: 1, 11: 1, 12: 1, 13: 1, 14: 1 }

const Op_7sDisplay = register(
	"7 Segment Display",
	"Display",
	"Displays 7 inputs as a numeric display",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.width += 20

			this.in1 = this.newInput("S1", "Top Segment", "Lights the top segment while true")
			this.in2 = this.newInput("S2", "Top Left Segment", "Lights the top left segment while true")
			this.in3 = this.newInput("S3", "Top Right Segment", "Lights the top right segment while true")
			this.in4 = this.newInput("S4", "Middle Segment", "Lights the middle segment while true")
			this.in5 = this.newInput("S5", "Bottom Left Segment", "Lights the bottom left segment while true")
			this.in6 = this.newInput("S6", "Bottom Right Segment", "Lights the bottom right segment while true")
			this.in7 = this.newInput("S7", "Bottom Segment", "Lights the bottom segment while true")
			this.in8 = this.newInput("D", "Dot", "Lights the dot while true")

			this.s7_t = false
			this.s7_tl = false
			this.s7_tr = false
			this.s7_m = false
			this.s7_bl = false
			this.s7_br = false
			this.s7_b = false
			this.s7_d = false
		}

		_getInnerHtml() {
			let r = '<div class="segment segment-top disabled"></div>'
			r += '<div class="segment segment-top-left disabled"></div>'
			r += '<div class="segment segment-top-right disabled"></div>'
			r += '<div class="segment segment-middle disabled"></div>'
			r += '<div class="segment segment-bottom-left disabled"></div>'
			r += '<div class="segment segment-bottom-right disabled"></div>'
			r += '<div class="segment segment-bottom disabled"></div>'
			r += '<div class="segment segment-dot disabled"></div>'

			if (this.s7_t) r += '<div class="segment segment-top"></div>'
			if (this.s7_tl) r += '<div class="segment segment-top-left"></div>'
			if (this.s7_tr) r += '<div class="segment segment-top-right"></div>'
			if (this.s7_m) r += '<div class="segment segment-middle"></div>'
			if (this.s7_bl) r += '<div class="segment segment-bottom-left"></div>'
			if (this.s7_br) r += '<div class="segment segment-bottom-right"></div>'
			if (this.s7_b) r += '<div class="segment segment-bottom"></div>'
			if (this.s7_d) r += '<div class="segment segment-dot"></div>'

			return r
		}

		createElement() {
			let ele = document.createElement('div')
			ele.className = 'seven-segment-display'
			ele.innerHTML = this._getInnerHtml()
			return ele
		}
		
		updateElement() {
			this.ele.innerHTML = this._getInnerHtml()
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.s7_t = !!(this.in1.value)
			this.s7_tl = !!(this.in2.value)
			this.s7_tr = !!(this.in3.value)
			this.s7_m = !!(this.in4.value)
			this.s7_bl = !!(this.in5.value)
			this.s7_br = !!(this.in6.value)
			this.s7_b = !!(this.in7.value)
			this.s7_d = !!(this.in8.value)
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noFill()
			p5ctx.stroke('#00000020')
			p5ctx.strokeWeight(8)

			p5ctx.line(-5, -35, 20, -35) // Top
			p5ctx.line(-10, -7.5, -10, -27.5) // Top Left
			p5ctx.line(25, -7.5, 25, -27.5) // Top Right
			p5ctx.line(-5, 0, 20, 0) // Middle
			p5ctx.line(-10, 7.5, -10, 27.5) // Bottom Left
			p5ctx.line(25, 7.5, 25, 27.5) // Bottom Right
			p5ctx.line(-5, 35, 20, 35) // Bottom
			p5ctx.line(35, 35, 35, 35) // Dot

			p5ctx.stroke(255, 0, 0)

			if (this.s7_t) p5ctx.line(-5, -35, 20, -35) // Top
			if (this.s7_tl) p5ctx.line(-10, -7.5, -10, -27.5) // Top Left
			if (this.s7_tr) p5ctx.line(25, -7.5, 25, -27.5) // Top Right
			if (this.s7_m) p5ctx.line(-5, 0, 20, 0) // Middle
			if (this.s7_bl) p5ctx.line(-10, 7.5, -10, 27.5) // Bottom Left
			if (this.s7_br) p5ctx.line(25, 7.5, 25, 27.5) // Bottom Right
			if (this.s7_b) p5ctx.line(-5, 35, 20, 35) // Bottom
			if (this.s7_d) p5ctx.line(35, 35, 35, 35) // Dot

			p5ctx.pop()
		}
	}
)

const Op_4bit_to_7sSeg = register(
	"4bit to 7 Segment decoder",
	"Converter",
	"Decodes a 4 bit value to a 7 segment display",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.in1 = this.newInput("B0", "Bit 0", "Bit 0 (value 1) of the number to display")
			this.in2 = this.newInput("B1", "Bit 1", "Bit 1 (value 2) of the number to display")
			this.in3 = this.newInput("B2", "Bit 2", "Bit 2 (value 4) of the number to display")
			this.in4 = this.newInput("B3", "Bit 3", "Bit 3 (value 8) of the number to display")
			this.inD = this.newInput("D", "Dot", "Passed straight through to the dot output")

			this.ou1 = this.newOutput("S1", "Top Segment", "True when the top segment is part of the number")
			this.ou2 = this.newOutput("S2", "Top Left Segment", "True when the top left segment is part of the number")
			this.ou3 = this.newOutput("S3", "Top Right Segment", "True when the top right segment is part of the number")
			this.ou4 = this.newOutput("S4", "Middle Segment", "True when the middle segment is part of the number")
			this.ou5 = this.newOutput("S5", "Bottom Left Segment", "True when the bottom left segment is part of the number")
			this.ou6 = this.newOutput("S6", "Bottom Right Segment", "True when the bottom right segment is part of the number")
			this.ou7 = this.newOutput("S7", "Bottom Segment", "True when the bottom segment is part of the number")
			this.ouD = this.newOutput("D", "Dot", "Mirrors the dot input")
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

			let s7_t = v in S7_TOP_NO
			let s7_tl = v in S7_TOP_LEFT_NO
			let s7_tr = v in S7_TOP_RIGHT_NO
			let s7_m = v in S7_MIDDLE_NO
			let s7_bl = v in S7_BOTTOM_LEFT_NO
			let s7_br = v in S7_BOTTOM_RIGHT_NO
			let s7_b = v in S7_BOTTOM_NO

			this.ou1.value = s7_t
			this.ou2.value = s7_tl
			this.ou3.value = s7_tr
			this.ou4.value = s7_m
			this.ou5.value = s7_bl
			this.ou6.value = s7_br
			this.ou7.value = s7_b

			this.ouD.value = !!(this.inD.value)
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)

			p5ctx.rotate(p5ctx.PI / 2)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.text("4bit to 7seg", 0, 0)

			p5ctx.pop()
		}
	}
)
