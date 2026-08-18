const AllPlaceables = []
var TableOfEle;
var CellOwners = {}

function encodeHtml(html) {
	if (!html) return ""
	let encodedStr = html.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
		return '&#' + i.charCodeAt(0) + ';'
	})
	encodedStr = encodedStr.replace(/"/g, '&quot;')
	encodedStr = encodedStr.replace(/'/g, '&#39;')
	return encodedStr
}

function charify(value) {
	let c = String.fromCharCode(value)
	let jj = c
	jj = JSON.stringify(c)
	jj = "'" + jj.substr(1)
	jj = jj.substr(0, jj.length - 1) + "'c"
	return jj
}

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
		this.ele = null

		AllPlaceables.push(this)

		updateTableOfElements()
	}

	getConfig() {
		let sreturn = {
			...super.getConfig(),
			col: this.col,
			row: this.row,
			colSpan: this.colSpan,
			rowSpan: this.rowSpan
		}
		return sreturn
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
		this.ele?.remove()
		this.ele = null
		updateTableOfElements()
	}

	get col() {
		return mainP5.round(mainP5.max(this._col, 0))
	}
	set col(value) {
		this._col = mainP5.round(mainP5.max(value, 0))
		updateTableOfElements()
	}

	get row() {
		return mainP5.round(mainP5.max(this._row, 0))
	}
	set row(value) {
		this._row = mainP5.round(mainP5.max(value, 0))
		updateTableOfElements()
	}

	get colSpan() {
		return mainP5.round(mainP5.max(this._colSpan, 1))
	}
	set colSpan(value) {
		this._colSpan = mainP5.round(mainP5.max(value, 1))
		updateTableOfElements()
	}

	get rowSpan() {
		return mainP5.round(mainP5.max(this._rowSpan, 1))
	}
	set rowSpan(value) {
		this._rowSpan = mainP5.round(mainP5.max(value, 1))
		updateTableOfElements()
	}

	doUpdate(tick, p5ctx) {
		super.doUpdate(tick, p5ctx)
		if (this.ele) {
			this.ele.dataset.zIndex = this.zIndex
			this.updateElement(this.ele)
		}
	}

	updateElement(ele) {
		/* virtual */
	}

	createElement() {
		let ele = document.createElement('div')
		ele.className = 'place-none'
		ele.innerText = 'None'
		return ele
	}

	getEle() {
		if (!this.ele) {
			this.ele = this.createElement()
			this.ele.dataset.ctrlId = this.id
			this.ele.dataset.zIndex = this.zIndex
		}
		return this.ele
	}
}

function createTableOfElements() {
	TableOfEle = document.createElement('table')
	TableOfEle.className = 'toe'

	appgui.appendChild(TableOfEle)

	updateTableOfElements()

	updatePlacableElements()
}

function getCellId(x, y) {
	return 'toe-cell-' + x + '-' + y
}

function computeTableLayout() {
	let anchors = []
	let anchorById = {}
	for (let p of AllPlaceables) {
		let cellId = getCellId(p.col, p.row)
		let anchor = anchorById[cellId]
		if (!anchor) {
			anchor = { x: p.col, y: p.row, colSpan: 1, rowSpan: 1, cellId: cellId }
			anchorById[cellId] = anchor
			anchors.push(anchor)
		}
		anchor.colSpan = mainP5.max(anchor.colSpan, p.colSpan)
		anchor.rowSpan = mainP5.max(anchor.rowSpan, p.rowSpan)
	}

	let maxC = 0
	let maxR = 0
	for (let a of anchors) {
		maxC = mainP5.max(maxC, a.x + a.colSpan)
		maxR = mainP5.max(maxR, a.y + a.rowSpan)
	}

	anchors.sort((a, b) => (a.y - b.y) || (a.x - b.x))

	let owners = {}
	let cells = []
	for (let a of anchors) {
		if (a.cellId in owners) {
			continue
		}
		let colSpan = mainP5.min(a.colSpan, maxC - a.x)
		let rowSpan = mainP5.min(a.rowSpan, maxR - a.y)
		for (let y = a.y; y < a.y + rowSpan; y++) {
			for (let x = a.x; x < a.x + colSpan; x++) {
				if (getCellId(x, y) in owners) {
					if (y == a.y) {
						colSpan = x - a.x
					} else {
						rowSpan = y - a.y
					}
					break
				}
			}
		}
		for (let y = a.y; y < a.y + rowSpan; y++) {
			for (let x = a.x; x < a.x + colSpan; x++) {
				owners[getCellId(x, y)] = a.cellId
			}
		}
		cells.push({ x: a.x, y: a.y, colSpan: colSpan, rowSpan: rowSpan, cellId: a.cellId })
	}

	return { maxC: maxC, maxR: maxR, cells: cells, owners: owners }
}

function updateTableOfElements() {
	if (!TableOfEle) return

	let layout = computeTableLayout()
	CellOwners = layout.owners

	let spanById = {}
	for (let c of layout.cells) {
		spanById[c.cellId] = c
	}

	for (let y = 0; y < layout.maxR; y++) {
		let rowId = 'toe-row-' + y
		let row = document.getElementById(rowId)
		if (!row) {
			row = document.createElement('tr')
			row.id = rowId
			TableOfEle.appendChild(row)
		}
		let wantedCells = []
		for (let x = 0; x < layout.maxC; x++) {
			let cellId = getCellId(x, y)
			let owner = CellOwners[cellId]
			if (owner && owner != cellId) {
				continue
			}
			let cell = document.getElementById(cellId)
			if (!cell) {
				cell = document.createElement('td')
				cell.id = cellId
				cell.className = "toe-cell"
				cell.dataset.x = x
				cell.dataset.y = y
				cell.align = 'center'
				cell.valign = 'middle'
			}
			let span = spanById[cellId]
			cell.colSpan = span ? span.colSpan : 1
			cell.rowSpan = span ? span.rowSpan : 1
			wantedCells.push(cell)
		}
		let cellCheckStr = wantedCells.map(c => c.id).join()
		if (row.dataset.cellCheck != cellCheckStr) {
			for (const old of [...row.children]) {
				if (wantedCells.indexOf(old) < 0) {
					old.remove()
				}
			}
			for (const cell of wantedCells) {
				row.appendChild(cell)
			}
			row.dataset.cellCheck = cellCheckStr
		}
	}

	let currentRows = TableOfEle.children
	while (currentRows.length > layout.maxR) {
		currentRows[currentRows.length - 1].remove()
		currentRows = TableOfEle.children
	}
}

function updatePlacableElements() {
	for (let p of AllPlaceables) {
		let posId = getCellId(p.col, p.row)
		let cellId = CellOwners[posId] || posId
		let ele = p.getEle()
		let parent = ele.parentElement
		let parentId = parent?.id
		if (parentId != cellId) {
			let cell = document.getElementById(cellId)
			if (cell) {
				cell.appendChild(ele)
			}
		}
	}

	// Check order based on Control.zIndex
	let cells = TableOfEle.getElementsByTagName("td")
	for (const cell of cells) {
		let childEles = [...cell.children]
		if (childEles.length > 0) {
			childEles.sort((a, b) => (parseInt(a.dataset.zIndex) | 0) - (parseInt(b.dataset.zIndex) | 0))
			let orderCheckStr = childEles.map(e => e.dataset.ctrlId).join()
			let oldOrderCheckStr = cell.dataset.orderCheck
			if (oldOrderCheckStr != orderCheckStr) {
				for (const child of childEles) {
					cell.appendChild(child)
				}
				cell.dataset.orderCheck = orderCheckStr
			}
		}
	}
}

function findFreeSpace() {
	let layout = computeTableLayout()
	for (let y = 0; y < layout.maxR; y++) {
		for (let x = 0; x < layout.maxC; x++) {
			if (!(getCellId(x, y) in layout.owners)) {
				return [x, y]
			}
		}
	}
	return [0, layout.maxR]
}