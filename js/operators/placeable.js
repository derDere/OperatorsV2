const AllPlaceables = []
var TableOfEle;

class Placeable extends Operator {

	constructor(x = 0, y = 0) {
		super(x, y)

		this.label = 'Unknown'
		let [c, r] = findFreeSpace()
		this._col = c
		this._row = r
		this._colSpan = 1
		this._rowSpan = 1
		this._lastEle = ""
		this._lastCellId = ""

		AllPlaceables.push(this)

		updateTableOfElements()
	}

	getConfig() {
		return {
			...super.getConfig(),
			col: this._col,
			row: this._row,
			colSpan: this._colSpan,
			rowSpan: this._rowSpan
		}
	}

	setConfig(conf, loaded = false) {
		super.setConfig(conf, loaded)
		if ("col" in conf) {
			this.col = conf.col
		}
		if ("row" in conf) {
			this.row = conf.row
		}
		if ("colSpan" in conf) {
			this.colSpan = conf.colSpan
		}
		if ("rowSpan" in conf) {
			this.rowSpan = conf.rowSpan
		}
	}

	kill() {
		super.kill()
		let i = AllPlaceables.indexOf(this)
		if (i >= 0) {
			AllPlaceables.splice(i, 1)
		}
	}

	get col() {
		return this._col
	}
	set col(value) {
		this._col = value
		updateTableOfElements()
	}

	get row() {
		return this._row
	}
	set row(value) {
		this._row = value
		updateTableOfElements()
	}

	get colSpan() {
		return this._colSpan
	}
	set colSpan(value) {
		this._colSpan = value
		updateTableOfElements()
	}

	get rowSpan() {
		return this._rowSpan
	}
	set rowSpan(value) {
		this._rowSpan = value
		updateTableOfElements()
	}

	getEle(callback) { // cb is a string with a js function name that can be placed inside of a onChanged input event if the Placeable wants to receive user input
		// The result of this function should be a html string containing a single main element
		return '<div class="place-none">None</div>'
	}

	eleChanged(newValue) {
		// Gets called from the element if the element is an input and th callback was properly integrated
	}
}

function createTableOfElements() {
	TableOfEle = document.createElement('table')
	TableOfEle.className = 'toe'

	appgui.appendChild(TableOfEle)

	updateTableOfElements()

	updatePlacableElements()
}

function updateTableOfElements() {
	if (!TableOfEle) return

	let maxC = 0
	let maxR = 0
	for (let p of AllPlaceables) {
		if ((p.col + p.colSpan) > maxC) {
			maxC = p.col + p.colSpan
		}
		if ((p.row + p.rowSpan) > maxR) {
			maxR = p.row + p.rowSpan
		}
	}
	let grid = []
	for (let y = 0; y < maxR; y++) {
		let row = []
		for (let x = 0; x < maxC; x++) {
			row.push(1)
		}
		grid.push(row)
	}
	for (let p of AllPlaceables) {
		let px = p.col
		let py = p.row
		for (let y = 0; y < p.rowSpan; y++) {
			for (let x = 0; x < p.colSpan; x++) {
				if (x != 0 && y != 0) {
					grid[x][y] = 0
				}
			}
		}
	}
	for (let y = 0; y < maxR; y++) {
		let rowId = 'toe-row-' + y
		let row = document.getElementById(rowId)
		if (!row) {
			row = document.createElement('tr')
			row.id = rowId
			TableOfEle.appendChild(row)
		}
		for (let x = 0; x < maxC; x++) {
			let cellId = 'toe-cell-' + x + '-' + y
			let cell = document.getElementById(cellId)
			if (!cell) {
				cell = document.createElement('td')
				cell.id = cellId
				cell.className = "toe-cell"
				cell.dataset.x = x
				cell.dataset.y = y
				cell.align = 'center'
				cell.valign = 'middle'
				row.appendChild(cell)
			}
		}
	}
}

function updatePlacableElements() {
	for (let p of AllPlaceables) {
		let cellId = 'toe-cell-' + p.col + '-' + p.row
		if (p._lastCellId.length > 0 && p._lastCellId != cellId) {
			let oldCell = document.getElementById(p._lastCellId)
			oldCell.innerHTML = ""
			p._lastEle = ""
		}
		p._lastCellId = cellId
		let cell = document.getElementById(cellId)
		let newEle = p.getEle('placeableEleChanged(this);')
		if (p._lastEle != newEle) {
			p._lastEle = newEle
			cell.innerHTML = newEle
			let ele = cell.children[0]
			ele.dataset.cid = p.id
		}
	}
}

function findFreeSpace() {
	let maxC = 1
	let maxR = 1
	let blocked = {}
	for (let p of AllPlaceables) {
		if ((p.col + p.colSpan) > maxC) {
			maxC = p.col + p.colSpan
		}
		if ((p.row + p.rowSpan) > maxR) {
			maxR = p.row + p.rowSpan
		}
		let cellId = 'toe-cell-' + p.col + '-' + p.row
		blocked[cellId] = true
	}
	for (let y = 0; y < maxR; y++) {
		for (let x = 0; x < maxC; x++) {
			let cellId = 'toe-cell-' + x + '-' + y
			if (!(cellId in blocked)) {
				return [x, y]
			}
		}
	}
	return [0, maxR]
}

function placeableEleChanged(ele) {
	let cid = ele.dataset.cid
	let placeable = ControlMap[cid]

	if (!ele) return
	if (!placeable) return

	let newVal
	if ((ele.type === 'checkbox') || (ele.type === 'radio')) {
		newVal = ele.checked
	}
	else {
		newVal = ele.value
	}

	placeable.eleChanged(newVal)
}