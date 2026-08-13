const Op_Lamp = register(
	"Lamp",
	"Displays a state of ON or OFF",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.state = false

			this.in = this.newInput("I")
		}

		createElement() {
			let ele = document.createElement('div')
			ele.className = this.state ? 'lamp-on' : 'lamp-off'
			return ele
		}

		updateElement() {
			this.ele.className = this.state ? 'lamp-on' : 'lamp-off'
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			this.state = !!(this.in.value)
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.stroke(0)
			if (this.state) {
				p5ctx.fill(255, 0, 0)
			} else {
				p5ctx.fill(100)
			}
			p5ctx.circle(0, 0, 30)
			p5ctx.noStroke()
			if (this.state) {
				p5ctx.fill(255, 255, 255, 30)
				for (let i = 27; i > 5; i -= 3) {
					p5ctx.circle(0, 0, 30 - i)
				}
			}

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(10)
			p5ctx.text('LAMP', 0, -21)
			p5ctx.text(this.state ? 'ON' : 'OFF', 0, 23)

			p5ctx.pop()
		}
	}
)
