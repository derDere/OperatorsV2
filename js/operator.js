const OperatorRegistry = {}
var selectedOperators = []
var AllOperators = []

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

		this.lastId = this.id

		this.name = "?"
		this.isOutput = false
		this.renderName = true

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
		if (this.lastId != this.id) {
			this.lastId = this.id
		}

		this.backgroundColor = valueColor(this.value, 1, false, p5ctx)
		this.backgroundHoverColor = valueColor(this.value, 0.8, false, p5ctx)
		if (this.isMouseOver) {
			tooltip = this.value + ''
		}
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

		this.isSelectable = true

		this.isSelected = false
		this.io_color = mainP5.color(0)

		this.width += 20
		this.inputs = []
		this.outputs = []

		this.fixPlacement()

		this._movedBySelection = false

		this.onMouseClick(this.selectionClick.bind(this))

		AllOperators.push(this)
	}

	kill() {
		super.kill()
		let i = selectedOperators.indexOf(this)
		if (i >= 0) {
			selectedOperators.splice(i, 1)
			if (lastOperator == this) {
				updateProps(null)
			}
		}
		i = AllOperators.indexOf(this)
		if (i >= 0) {
			AllOperators.splice(i, 1)
		}
	}

	getConfig() {
		return {
			"#new": this.entryName,
			_id: this.id,
			_x: this.pos.x,
			_y: this.pos.y,
			Order: this.zIndex
		}
	}

	setConfig(conf, loaded = false) {
		if ("_id" in conf && loaded) {
			let oldId = this.id
			this.id = conf._id
			this._fixOldIoIds(oldId, this.id)
		}
		if ("_x" in conf && loaded) {
			this.pos.x = conf._x
		}
		if ("_y" in conf && loaded) {
			this.pos.y = conf._y
		}
		if ("Order" in conf) {
			this.zIndex = conf.Order
		}
	}

	_fixOldIoIds(oldId, newId) {
		for (const io of [...this.inputs, ...this.outputs]) {
			let oldi = io.id
			let newi = oldi.replace(oldId, newId)
			io.id = newi
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
		
		// Draw Selectionm
		if (this.isSelected) {
			p5ctx.push()
			p5ctx.stroke('#0080ff40')
			p5ctx.strokeWeight(5)
			p5ctx.noFill()
			p5ctx.rect(0, 0, this.width + 5, this.height + 5)
			p5ctx.pop()
		}

		// Draw Propertie Mark
		if (lastOperator == this) {
			p5ctx.noStroke()
			p5ctx.fill('#aaa8')
			let ap = this.actualPos
			let acX = (this.width / 2)
			let acY = -(this.height / 2)
			p5ctx.triangle(
				acX, acY,
				acX - 15, acY,
				acX, acY + 15
			)
		}

		// Draw IOs
		p5ctx.fill(this.io_color)
		p5ctx.noStroke()
		p5ctx.textAlign(p5ctx.LEFT, p5ctx.CENTER)
		p5ctx.textSize(9)
		for (let inp of this.inputs) {
			if (!inp.renderName) continue
			p5ctx.text(inp.name, inp.pos.x + inp.radius + inp.borderWeight + 2, inp.pos.y)
		}
		p5ctx.textAlign(p5ctx.RIGHT, p5ctx.CENTER)
		for (let oup of this.outputs) {
			if (!oup.renderName) continue
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

	newInput(input_name) {
		let render = true
		if (input_name.length <= 0) {
			input_name = "IN" + this.inputs.length
			render = false
		}
		for (const inp of this.inputs) {
			if (inp.name == input_name) {
				console.error("input name '" + input_name + "' already in use")
				return
			}
		}
		let inp = new IOControl(this)
		inp.id = this.id + '_in_' + input_name
		inp.name = input_name
		inp.renderName = render
		this.inputs.push(inp)
		this._reorderIOs()
		return inp
	}

	newOutput(output_name) {
		let render = true
		if (output_name.length <= 0) {
			output_name = "OUT" + this.outputs.length
			render = false
		}
		for (const oup of this.outputs) {
			if (oup.name == output_name) {
				console.error("output name '" + output_name + "' already in use")
				return
			}
		}
		let oup = new IOControl(this)
		oup.id = this.id + '_out_' + output_name
		oup.name = output_name
		oup.renderName = render
		oup.isOutput = true
		this.outputs.push(oup)
		this._reorderIOs()
		return oup
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function allOperatorsToJson() {
	let all = []
	for (const op of AllOperators) {
		all.push(op.getConfig())
	}

	let lines = []
	for (const con of AllConnections) {
		if (!con.start) continue
		if (!con.end) continue
		if (con == mouseConnection) continue
		let startId = con.start.id
		let endId = con.end.id
		lines.push({
			s: startId,
			e: endId
		})
	}


	let data = {
		doff: [dragOffset.x, dragOffset.y],
		opAll: all,
		conAll: lines
	}

	return JSON.stringify(data)
}

function loadJsonToAll(jj) {
	for (const op of [...AllOperators]) {
		op.kill()
	}

	let data = JSON.parse(jj)

	let [dragOffX, dragOffY] = data.doff
	dragOffset.x = dragOffX
	dragOffset.y = dragOffY

	for (const opc of data.opAll) {
		let entryName = opc['#new']
		if (entryName in OperatorRegistry) {
			let entry = OperatorRegistry[entryName]
			let newOp = new entry.classFnk(opc._x, opc._y)
			newOp.entryName = entry.name
			newOp.setConfig(opc, true)
		}
	}

	for(const con of [...AllConnections]) {
		if (con == mouseConnection) continue
		con.kill()
	}

	for (const conc of data.conAll) {
		let sid = conc.s
		let eid = conc.e
		let startIO = getControlById(sid)
		let endIO = getControlById(eid)

		if (!startIO) continue
		if (!endIO) continue

		new Connection(startIO, endIO)
	}
}

function sss() {
	console.log(allOperatorsToJson())
}

function loooo() {
	let jj = prompt("sss")
	loadJsonToAll(jj)
}

/*

{"doff":[312,-101],"opAll":[{"#new":"Text Input","_id":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb","_x":-130,"_y":-80,"Order":100,"col":0,"row":0,"colSpan":1,"rowSpan":1,"eleWidth":165},{"#new":"Clock","_id":"571a41fb-4407-4453-ae8a-18a675c578bf","_x":-490,"_y":220,"Order":100},{"#new":"RS FlipFlop","_id":"7eca0ca3-eba8-4ac0-88aa-3e24dcd29169","_x":110,"_y":140,"Order":100},{"#new":"Terminal Display","_id":"7f69a8ad-abac-4a83-9fe4-146d13d287a3","_x":100,"_y":-40,"Order":100,"col":0,"row":1,"colSpan":1,"rowSpan":1,"Terminal Width":20,"Terminal Height":8,"Show Cursor":true,"Fill random on Clear":true},{"#new":"RS FlipFlop","_id":"106c5976-02d8-488c-9d26-ba3ebdced551","_x":-610,"_y":-140,"Order":100},{"#new":"Clock","_id":"b6799a5f-4669-433d-bcca-cade3fac8405","_x":-470,"_y":-140,"Order":100},{"#new":"Pulse","_id":"a03df75a-13e0-4a0b-a604-0456bc9783e6","_x":-350,"_y":-140,"Order":100},{"#new":"Pulse","_id":"800e584e-38ef-437d-b6d6-d2286e1ebdda","_x":-370,"_y":220,"Order":100},{"#new":"Pulse","_id":"5131cb3a-254e-4afd-95de-a5d0cbf8ed24","_x":-70,"_y":280,"Order":100},{"#new":"Button","_id":"e9fdabbb-eea6-4392-aaae-3da575e3c929","_x":-870,"_y":80,"Order":100,"col":0,"row":2,"colSpan":1,"rowSpan":1,"text":"CLEAR"},{"#new":"Pipe 4","_id":"5b18e422-3c05-4923-a298-d205bf02268b","_x":-150,"_y":160,"Order":100},{"#new":"Pulse","_id":"147b97a3-8ec3-4c8d-a585-002dc764456c","_x":-70,"_y":360,"Order":100}],"conAll":[{"s":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_out_N","e":"7eca0ca3-eba8-4ac0-88aa-3e24dcd29169_in_S"},{"s":"7eca0ca3-eba8-4ac0-88aa-3e24dcd29169_out_Q","e":"571a41fb-4407-4453-ae8a-18a675c578bf_in_P"},{"s":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_out_B","e":"7f69a8ad-abac-4a83-9fe4-146d13d287a3_in_B"},{"s":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_out_T","e":"7f69a8ad-abac-4a83-9fe4-146d13d287a3_in_W"},{"s":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_out_W","e":"106c5976-02d8-488c-9d26-ba3ebdced551_in_S"},{"s":"106c5976-02d8-488c-9d26-ba3ebdced551_out_Q","e":"b6799a5f-4669-433d-bcca-cade3fac8405_in_P"},{"s":"b6799a5f-4669-433d-bcca-cade3fac8405_out_C","e":"a03df75a-13e0-4a0b-a604-0456bc9783e6_in_I"},{"s":"a03df75a-13e0-4a0b-a604-0456bc9783e6_out_U","e":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_in_F"},{"s":"571a41fb-4407-4453-ae8a-18a675c578bf_out_C","e":"800e584e-38ef-437d-b6d6-d2286e1ebdda_in_I"},{"s":"800e584e-38ef-437d-b6d6-d2286e1ebdda_out_U","e":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_in_P"},{"s":"5131cb3a-254e-4afd-95de-a5d0cbf8ed24_out_U","e":"7eca0ca3-eba8-4ac0-88aa-3e24dcd29169_in_R"},{"s":"e9fdabbb-eea6-4392-aaae-3da575e3c929_out_O","e":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_in_C"},{"s":"e9fdabbb-eea6-4392-aaae-3da575e3c929_out_O","e":"7f69a8ad-abac-4a83-9fe4-146d13d287a3_in_C"},{"s":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_out_E","e":"5b18e422-3c05-4923-a298-d205bf02268b_in_IN0"},{"s":"5b18e422-3c05-4923-a298-d205bf02268b_out_OUT0","e":"5131cb3a-254e-4afd-95de-a5d0cbf8ed24_in_I"},{"s":"e9fdabbb-eea6-4392-aaae-3da575e3c929_out_O","e":"7eca0ca3-eba8-4ac0-88aa-3e24dcd29169_in_R"},{"s":"e9fdabbb-eea6-4392-aaae-3da575e3c929_out_O","e":"106c5976-02d8-488c-9d26-ba3ebdced551_in_R"},{"s":"5131cb3a-254e-4afd-95de-a5d0cbf8ed24_out_U","e":"106c5976-02d8-488c-9d26-ba3ebdced551_in_R"},{"s":"e578f92b-9cd3-4e42-a551-c88a8dcd43eb_out_E","e":"5b18e422-3c05-4923-a298-d205bf02268b_in_IN2"},{"s":"5b18e422-3c05-4923-a298-d205bf02268b_out_OUT2","e":"147b97a3-8ec3-4c8d-a585-002dc764456c_in_I"},{"s":"147b97a3-8ec3-4c8d-a585-002dc764456c_out_U","e":"7eca0ca3-eba8-4ac0-88aa-3e24dcd29169_in_R"}]}

*/