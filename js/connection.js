const AllConnections = []
var mouseConnection = null
var connectionHover = null

class Connection {

	constructor(start, end, lineType = SimpleBezier) {
		this.start = start
		this.end = end
		this.value = false

		this.path = null

		this._lineType = null
		this.line = null
		this.lineType = lineType

		AllConnections.push(this)
	}

	get lineType() {
		return this._lineType
	}

	set lineType(type) {
		if (type === this._lineType) {
			return
		}
		if (!!this.line) {
			this.line.kill()
		}
		this._lineType = type
		this.line = new type(this)
	}

	kill() {
		let i = AllConnections.indexOf(this)
		AllConnections.splice(i, 1)
		if (connectionHover == this) {
			connectionHover = null
		}
		if (this.end) {
			this.end.value = false
		}
		this.line.kill()
	}

	update(tick, p5ctx) {
		if (
			(!!this.start) &&
			(!!this.end)
		) {
			this.end.value = this.start.value
			this.value = this.start.value
		}
		this.line.update(tick, p5ctx)
		if (this.line?.mouseIsOver) {
			if (this.start) {
				tooltip = (this.start.value) + ''
			}
		}
	}

	draw(tick, p5ctx) {
		this.line.draw(tick, p5ctx)
	}
}

function updateConnections(tick, p5ctx) {
	if (mouseConnection === null) {
		mouseConnection = new Connection(null, null)
	}

	connectionHover = null

	// Nur ChipPath-Linien brauchen einen verlegten Weg — alle anderen
	// Linienarten rechnen ihre Form selbst, für sie wäre der Router reine
	// verschenkte Rechenzeit.
	const routedConnections = []
	for (let con of AllConnections) {
		if (con.line instanceof ChipPath) {
			routedConnections.push(con)
		}
	}
	if (routedConnections.length > 0) {
		wireRouter.updateRoutes(routedConnections)
	}
	if (mouseConnection.line instanceof ChipPath) {
		mouseConnection.path = wireRouter.previewRoute(mouseConnection, mousePos)
	}

	for (let con of AllConnections) {
		con.update(tick, p5ctx)
		con.line.mouseIsOver = false
	}

	if (!!connectionHover) {
		connectionHover.line.mouseIsOver = true
	}
}

function connectionsNextFrame(p5ctx) {
	if (!p5ctx.mouseIsPressed) {
		mouseConnection.start = null
		mouseConnection.end = null
		mouseConnection.path = null
	}
}

function drawConnections(tick, p5ctx) {
	for (let con of AllConnections) {
		con.draw(tick, p5ctx)
	}
}
