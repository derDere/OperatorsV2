var dgui
var lastOperator
var currentSettings = {}
var items = []

var datBlockControl = null

class DatBlocker extends Control {
	constructor() {
		super()
	  this.name = 'DatGuiBlocker'
	  this.id = 'DatGuiBlocker'
	  this.width = dgui.width
	  this.height = 500
	  this.zIndex = 2000000000

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
		let datHeight = dgui.domElement.getBoundingClientRect().height
		this.width = dgui.width + 1
		this.height = datHeight + 21
		this.zIndex = 2000000000
		let x = (p5ctx.width / 2) - (this.width / 2) - dragOffset.x - 14
		let y = (-p5ctx.height / 2) + (this.height / 2) - dragOffset.y
		this.pos.x = x
		this.pos.y = y
	}
}

function initProps() {
	dgui = new dat.GUI()

	datBlockControl = new DatBlocker()
}

function valueChangedEventHandler(a, b, c, d) {
	lastOperator.setConfig(currentSettings)
}

function updateProps(operator) {
	if (lastOperator == operator) {
		return
	}
	lastOperator = operator

	let conf = operator.getConfig()
	currentSettings = conf

	for (let item of items) {
		dgui.remove(item)
	}

	items = []

	let propCount = 0

	for (let key in conf) {
		if (key.startsWith('_')) {
			continue
		}
		let item = dgui.add(conf, key)
		item.onChange(valueChangedEventHandler)
		items.push(item)
		propCount += 1
	}

	if (propCount > 0) {
		dgui.open()
	}
	else {
		dgui.close()
	}
}