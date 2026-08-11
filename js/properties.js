var dgui
var lastOperator
var currentSettings = {}
var items = []

function initProps() {
	dgui = new dat.GUI()
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