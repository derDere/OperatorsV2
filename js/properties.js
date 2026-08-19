var dgui
var lastOperator
var currentSettings = {}
var items = []

var datBlockControl = null

class DatBlocker extends Control {
	constructor(dgui) {
		super()
		this.dgui = dgui
	  this.name = 'DatGuiBlocker'
	  this.id = 'DatGuiBlocker'
	  this.width = this.dgui.width
	  this.height = 500
	  this.zIndex = 2000000000

		this.isDatBlocker = true

		const TRANSPARENT = mainP5.color('transparent')
		const GRAY_BORDER = mainP5.color('#999')
		this.borderColor = GRAY_BORDER
		this.backgroundColor = TRANSPARENT
		this.borderHoverColor = GRAY_BORDER
		this.backgroundHoverColor = TRANSPARENT
		this.borderActiveColor = GRAY_BORDER
		this.backgroundActiveColor = TRANSPARENT
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)

		let canvasBounds = p5ctx.canvas.getBoundingClientRect()
		let guiBounds = this.dgui.bounds

		this.width = guiBounds.width + 2
		this.height = guiBounds.height + 2

		let x = p5ctx.floor(-(p5ctx.width / 2) + (this.width / 2))
		let y = p5ctx.floor(-(p5ctx.height / 2) + (this.height / 2))

		x -= dragOffset.x
		y -= dragOffset.y

		x -= 0.5

		x += (guiBounds.left - canvasBounds.left)
		y += (guiBounds.top - canvasBounds.top)

		this.pos.x = x
		this.pos.y = y
	}
}

function initProps() {
	dgui = new dat.GUI()
  dgui.title = "🛠️ Properties"

	datBlockControl = new DatBlocker(dgui)
}

function valueChangedEventHandler(a, b, c, d) {
	lastOperator.setConfig(currentSettings)
}

function updateProps(operator) {
	if (lastOperator == operator) {
		return
	}
	lastOperator = operator

	let conf
	if (!!operator) {
		conf = operator.getConfig()
	}
	else {
		conf = {}
	}
	currentSettings = conf

	dgui.edit(conf)

	if (dgui.domElement.classList.contains('dat-empty')) {
		dgui.close()
	}
	else {
		dgui.open()
	}
}