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

		// Das Panel liegt in Bildpunkten, der Blocker ist ein Control in
		// Weltkoordinaten: Groesse und Mitte werden daher durch den Zoom geteilt
		let boxWidth = guiBounds.width + 2
		let boxHeight = guiBounds.height + 2

		this.width = boxWidth / zoomScale
		this.height = boxHeight / zoomScale

		let x = p5ctx.floor((guiBounds.left - canvasBounds.left) + (boxWidth / 2)) - 0.5
		let y = p5ctx.floor((guiBounds.top - canvasBounds.top) + (boxHeight / 2))

		this.pos.x = (x - (p5ctx.width / 2) - dragOffset.x) / zoomScale
		this.pos.y = (y - (p5ctx.height / 2) - dragOffset.y) / zoomScale
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

const PropertyDefinitions = {
	"Mode": {
		type: "select",
		options: { "Bit": "bit", "Nibble": "nibble", "Byte": "byte", "Bitwise": "bitwise" }
	},
	"Variant": {
		type: "select",
		options: { "Combined": "combined", "Channeled": "channeled" }
	},
	"Base": {
		type: "select",
		options: { "Binary": "binary", "Octal": "octal", "Decimal": "decimal" }
	},
	"col": "Column:number[0,1000,1]",
	"row": "Row:number[0,1000,1]",
	"colSpan": "Column Span:number[1,1000,1]",
	"rowSpan": "Row Span:number[1,1000,1]",
	"Order": "Order:number[1,100000,1]",
	"Screen Width": "slider[25,1024,1]",
	"Screen Height": "slider[25,1024,1]",
	"Terminal Width": "slider[1,255,1]",
	"Terminal Height": "slider[1,255,1]",
	"eleWidth": "Input Width:slider[20,1000,1]",
	"value": "Value:slider[0,255,1]",
	"color": "Color:color",
	"Background": "color",
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

	if ('Origin' in conf) {
		let portals = {}
		for (const id in AllPortals) {
			const portal = AllPortals[id];
			portals[portal.name] = portal.id
		}
		PropertyDefinitions['Origin'] = {
			type: "select",
			options: portals
		}
	}

	let newFields = dgui.edit(conf, PropertyDefinitions)

	for (const prop in newFields) {
		const field = newFields[prop];
		field.onChange(valueChangedEventHandler)
	}

	if (dgui.domElement.classList.contains('dat-empty')) {
		dgui.close()
	}
	else {
		dgui.open()
	}
}