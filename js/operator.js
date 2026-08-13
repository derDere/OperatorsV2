const OperatorRegistry = {}
var selectedOperators = []

function valueColor(value, m = 1, isLine = false, p5ctx = mainP5) {
	if (value === true) {
		return p5ctx.color(255 * m, 0, 0)
	}
	else if (value === false) {
		if (isLine) {
			return p5ctx.color(0 + (255 * (1 - m)))
		} else {
			return p5ctx.color(255 * m)
		}
	}
	else {
		return p5ctx.color(0, 128 * m, 255 * m)
	}
}

class IOControl extends Control { ////////////////////////////////////////////////////////////////////////////////////

	constructor(parent) {
		super(0, 0, 5, BOUNDS_TYPE_CIRCLE, parent)

		this.name = "?"
		this.isOutput = false

		this.doNotCaptureMouse = true

		this.borderActiveColor = mainP5.color(0, 128, 0)
		this.backgroundActiveColor = mainP5.color(0, 255, 0)

		this.value = false

		this.onMouseDown(this.connectionStart.bind(this))
		this.onMouseUp(this.connectionEnd.bind(this))
	}

	connectionStart(sender) {
		mouseConnection.start = this
	}

	connectionEnd(sender) {
		let other = mouseConnection.start
		if (
			(!!other) &&
			(other != this) &&
			(other.isOutput != this.isOutput)
		) {
			let sio = other
			let eio = this
			if (eio.isOutput) {
				let tmp = eio
				eio = sio
				sio = tmp
			}
			new Connection(sio, eio)
		}
		mouseConnection.start = null
	}

	doUpdate(tick, p5ctx) {
		this.backgroundColor = valueColor(this.value, 1, false, p5ctx)
		this.backgroundHoverColor = valueColor(this.value, 0.8, false, p5ctx)
	}

}

class OperatorEntry {
	constructor(name, description, classFnk) {
		this.name = name
		this.description = description
		this.classFnk = classFnk
	}

	new(x, y) {
		return new this.classFnk(x, y)
	}
}

function register(name, description, classFnk) {
	let entry = new OperatorEntry(name, description, classFnk)
	OperatorRegistry[entry.name] = entry
	return classFnk
}

class Operator extends Movable { ////////////////////////////////////////////////////////////////////////////////////

	constructor(x = 0, y = 0) {
		super(x, y, DEFAULT_SIZE, BOUNDS_TYPE_RECT)

		this.isSelected = false
		this.io_color = mainP5.color(0)

		this.width += 20
		this.inputs = []
		this.outputs = []

		this.fixPlacement()

		this._movedBySelection = false

		this.onMouseClick(this.selectionClick.bind(this))
	}

	getConfig() {
		return {
			_id: this.id,
			_x: this.pos.x,
			_y: this.pos.y
		}
	}

	setConfig(conf, loaded = false) {
		if ("_id" in conf && loaded) {
			this.id = conf._id
		}
		if ("_x" in conf && loaded) {
			this.pos.x = conf._x
		}
		if ("_y" in conf && loaded) {
			this.pos.y = conf._y
		}
	}

	selectionClick() {
		if ((!shiftPressed) && (!ctrlPressed)) {
			selectedOperators = []
			updateProps(this)
		}
		let i = selectedOperators.indexOf(this)
		if (i <= -1) {
			selectedOperators.push(this)
		}
		else if (ctrlPressed) {
			selectedOperators.splice(i, 1)
		}
	}

	onMove(movement) {
		super.onMove(movement)
		if (!this._movedBySelection) {
			if (this.isSelected) {
				for (let op of selectedOperators) {
					if (op == this) {
						continue
					}
					op._movedBySelection = true
					op.onMove(movement)
					op._movedBySelection = false
				}
			}
		}
	}

	fixPlacement() {
		super.fixPlacement()
		if (!this._movedBySelection) {
			if (this.isSelected) {
				for (let op of selectedOperators) {
					if (op == this) {
						continue
					}
					op._movedBySelection = true
					op.fixPlacement()
					op._movedBySelection = false
				}
			}
		}
	}

	doUpdate(tick, p5ctx) {
		this.doNotCaptureMouse = (
			(mouseConnection.start != null) ||
			(mouseConnection.end != null)
		)
		let i = selectedOperators.indexOf(this)
		if (i >= 0) {
			this.isSelected = true
		}
		else {
			this.isSelected = false
		}
	}

	doDraw(tick, p5ctx) {
		p5ctx.push()
		if (this.isSelected) {
			p5ctx.push()
			p5ctx.stroke('#0080ff40')
			p5ctx.strokeWeight(5)
			p5ctx.noFill()
			p5ctx.rect(0, 0, this.width + 5, this.height + 5)
			p5ctx.pop()
		}
		p5ctx.fill(this.io_color)
		p5ctx.noStroke()
		p5ctx.textAlign(p5ctx.LEFT, p5ctx.CENTER)
		p5ctx.textSize(9)
		for (let inp of this.inputs) {
			p5ctx.text(inp.name, inp.pos.x + inp.radius + inp.borderWeight + 2, inp.pos.y)
		}
		p5ctx.textAlign(p5ctx.RIGHT, p5ctx.CENTER)
		for (let oup of this.outputs) {
			p5ctx.text(oup.name, oup.pos.x - oup.radius - oup.borderWeight - 2, oup.pos.y)
		}
		p5ctx.pop()
	}

	_reorderIOs() {
		let mC = mainP5.max(this.inputs.length, this.outputs.length) // Anzahl der Längeren Liste
		let space = 20 // Platz zwichen den IOs der längeren Liste
		let extra = (mC % 2 == 1) ? 0 : 1 // Extra platz anzahl ausserhalb der IOs
		let cH = (mC + extra) * space // Neue Höhe des Controls
		if (cH < (DEFAULT_SIZE * 2)) {
			cH = (DEFAULT_SIZE * 2)
		}
		let oM = (cH - ((mC - 1) * space)) / 2 // Äußeres Margin über/unter der größeren Liste

		this.height = cH

		for (let [side, list] of [[-1, this.inputs], [1, this.outputs]]) {
			if (list.length <= 0) {
				continue // Für eine leere Liste muss auch nichts berechnet werden!
			}
			let listSpace = (cH - (2 * oM)) // platz swischen den IOs dieser liste
			if (list.length > 1) {
				listSpace /= (list.length - 1)
			}
			else {
				listSpace = 0
			}
			let x = side * (this.width / 2)
			for (let i = 0; i < list.length; i++) {
				let y = (-this.height / 2) + (oM + (i * listSpace))
				let io = list[i]
				io.pos = mainP5.createVector(x, y)
			}
		}
	}

	newInput(name) {
		let inp = new IOControl(this)
		inp.name = name
		this.inputs.push(inp)
		this._reorderIOs()
		return inp
	}

	newOutput(name) {
		let oup = new IOControl(this)
		oup.name = name
		oup.isOutput = true
		this.outputs.push(oup)
		this._reorderIOs()
		return oup
	}
}
