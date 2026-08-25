// OperatorDemo: lädt einen gespeicherten Operator-Aufbau (JSON im Format des
// Editor-Speicherns) in ein eigenes kleines p5-Canvas — für Live-Demos im
// Wiki (www/wiki.html). Die Logik läuft dort wie auf der Hauptfläche: Werte
// fließen pro Frame durch die Verbindungen, Canvas-Elemente wie Schalter
// bleiben klickbar. Verschieben, Auswählen und neues Verdrahten gibt es in
// Demos nicht — sie sind Anschauungsstücke.
//
// Unverdrahtete IOs erscheinen als Bedienfelder neben dem Canvas: Eingänge
// links (stellbar), Ausgänge rechts (nur lesend) — je Pin eine Zeile aus dem
// Displaynamen als Beschriftung und einem kleinen Wert-Quadrat (IoValueBox)
// in den Statusfarben; die Pin-Beschreibung liegt als Tooltip auf der Zeile.
//
// Die Wiki-Seite lädt die Operator-Klassen ohne die Hauptfläche (sketch.js)
// und ohne das Properties-Panel (properties.js). Deren Seiten-Globals stellt
// dieser Kopf bereit. Die Globals sind zwischen allen Demos geteilt — darum
// setzt jede Demo sie am Anfang ihres Frames auf den eigenen Stand und
// sichert ihn am Ende zurück; so laufen beliebig viele Demos nebeneinander.

var mainP5 = null // gesetzt von der versteckten Hilfsinstanz unten
var tooltip = ""
var mousePos = null
var dragOffset = null
var lastOperator = null
var shiftPressed = false
var ctrlPressed = false

// Die Wiki-Seite hat kein Properties-Panel
function updateProps(operator) { }

// Versteckte p5-Instanz nur für die Helfer (createVector, color, ...), welche
// die Klassen über das Global mainP5 nutzen — ein sichtbares Canvas hat sie
// nicht. Ihr Loop bleibt an (leerer Draw): mainP5.frameCount muss weiterzählen,
// daran hängt der Einmal-pro-Bild-Abgleich der Linien-Auffächerung
// (simpleBezierFanSync), der die Verbindungswege baut.
new p5(p => {
	mainP5 = p
	p.setup = () => {
		let can = p.createCanvas(1, 1)
		can.elt.style.display = 'none'
	}
	p.draw = () => { }
})

// Jede Demo bekommt einen eigenen Bereich im Weltkoordinatenraum, damit sich
// die Linien-Auffächerung (simple_bezier_fan.js) der Demos nicht gegenseitig sieht
const DEMO_WORLD_SPACING = 100000
const DEMO_PADDING = 30
const DEMO_MIN_WIDTH = 200
const DEMO_MIN_HEIGHT = 120

const AllOperatorDemos = []

// Kleines Wert-Quadrat (max. 20×20) neben dem Demo-Canvas: zeigt einen Bool-
// oder Bytewert in den Statusfarben — rot = true (Haken), weiß = false (leer),
// blau = Bytewert (zweistelliger Hex-Code). Bei Eingängen öffnet ein Klick
// einen Schieberegler von -1 bis 256 (-1 = false, 256 = true, dazwischen der
// Bytewert): Er legt sich als Rahmen auf Zeilenhöhe über die Zeile —
// Displayname, Regler und Quadrat nebeneinander, das Quadrat bleibt exakt an
// seinem Platz, der Rahmen klappt nach außen (vom Canvas weg) auf. Ein Klick
// aufs Quadrat bei offenem Regler schaltet zwischen true und false um.
// Ausgänge nutzen dasselbe Quadrat nur lesend.
class IoValueBox {

	constructor(io, readonly) {
		this.io = io
		this.readonly = readonly

		// werden von _buildIoRow gesetzt — der offene Regler holt sich
		// Beschriftung und Quadrat aus der Zeile in seinen Rahmen
		this.row = null
		this.label = null

		this._lastShown = null
		this.popup = null
		this.slider = null
		this._outsideHandler = null

		this.ele = document.createElement('div')
		this.ele.className = 'operator-demo-io-box'
		if (!this.readonly) {
			this.ele.classList.add('editable')
			this.ele.addEventListener('click', () => this._boxClicked())
		}

		this.refresh()
	}

	// Quadrat an den aktuellen IO-Wert angleichen (läuft jeden Frame)
	refresh() {
		let value = this.io.value
		let shown
		let cls
		if (value === true) {
			shown = '✓'
			cls = 'io-true'
		}
		else if (typeof value === 'number') {
			shown = ('00' + (value & 255).toString(16).toUpperCase()).substr(-2)
			cls = 'io-byte'
		}
		else {
			shown = ''
			cls = 'io-false'
		}
		let key = cls + ':' + shown
		if (key != this._lastShown) {
			this._lastShown = key
			this.ele.textContent = shown
			this.ele.classList.remove('io-true', 'io-false', 'io-byte')
			this.ele.classList.add(cls)
		}
	}

	_boxClicked() {
		if (this.popup) {
			// offener Regler: Klick aufs Quadrat schaltet zwischen true und false um
			this._setValue(this.io.value === true ? false : true)
		}
		else {
			this._openSlider()
		}
	}

	_setValue(value) {
		this.io.value = value
		if (this.slider) {
			this.slider.value = (value === true) ? 256 : ((typeof value === 'number') ? value : -1)
		}
		this.refresh()
	}

	_openSlider() {
		// Zeile friert ihre Maße ein, damit beim Herauslösen von Beschriftung
		// und Quadrat nichts verrutscht
		let rowRect = this.row.getBoundingClientRect()
		let boxRect = this.ele.getBoundingClientRect()
		this.row.style.minWidth = rowRect.width + 'px'
		this.row.style.minHeight = rowRect.height + 'px'

		this.popup = document.createElement('div')
		this.popup.className = 'operator-demo-io-slider'

		this.slider = document.createElement('input')
		this.slider.type = 'range'
		this.slider.min = -1
		this.slider.max = 256
		this.slider.step = 1
		let value = this.io.value
		this.slider.value = (value === true) ? 256 : ((typeof value === 'number') ? value : -1)
		this.slider.addEventListener('input', () => {
			let v = parseInt(this.slider.value)
			this.io.value = (v <= -1) ? false : ((v >= 256) ? true : (v & 255))
			this.refresh()
		})

		// Displayname, Regler und Quadrat wandern gemeinsam in den Rahmen
		this.popup.appendChild(this.label)
		this.popup.appendChild(this.slider)
		this.popup.appendChild(this.ele)
		document.body.appendChild(this.popup)

		// Rahmen so legen, dass das Quadrat exakt an seinem Platz bleibt —
		// der Rahmen wächst damit nach außen, vom Canvas weg
		this.popup.style.left = '0px'
		this.popup.style.top = '0px'
		let inFrameRect = this.ele.getBoundingClientRect()
		this.popup.style.left = (boxRect.left - inFrameRect.left) + 'px'
		this.popup.style.top = (boxRect.top - inFrameRect.top) + 'px'

		this._outsideHandler = (event) => {
			if (this.popup.contains(event.target)) {
				return
			}
			this.closeSlider()
		}
		document.addEventListener('pointerdown', this._outsideHandler, true)
		window.addEventListener('scroll', this._outsideHandler, true)
	}

	closeSlider() {
		if (!this.popup) {
			return
		}
		document.removeEventListener('pointerdown', this._outsideHandler, true)
		window.removeEventListener('scroll', this._outsideHandler, true)
		this._outsideHandler = null

		// Beschriftung und Quadrat zurück in ihre Zeile
		this.row.appendChild(this.label)
		this.row.appendChild(this.ele)
		this.row.style.minWidth = ''
		this.row.style.minHeight = ''

		this.popup.remove()
		this.popup = null
		this.slider = null
	}
}

class OperatorDemo {

	constructor(eleId, jj) {
		this.eleId = eleId
		this.ele = document.getElementById(this.eleId)
		this.jj = jj

		this.index = AllOperatorDemos.length
		AllOperatorDemos.push(this)

		this._idPrefix = 'demo' + this.index + '_'
		this.operators = []
		this.connections = []
		this.ioBoxes = []
		this.tick = 0
		this.p5 = null

		// Sicherungs-Stände der geteilten Globals zwischen den Frames dieser Demo
		this._dragOffset = mainP5.createVector(0, 0)
		this._hoverControl = null
		this._lastHoverControl = null
		this._mouseWasDown = false
		this._lastMousePos = null

		this.ele.innerHTML = ''
		this.ele.classList.add('operator-demo')

		try {
			this._load(JSON.parse(this.jj))
		}
		catch (err) {
			console.error('OperatorDemo: Demo konnte nicht geladen werden', err)
			this._showError(err)
			return
		}

		this._startCanvas()
		this._buildIoPanels()
	}

	kill() {
		for (const box of this.ioBoxes) {
			box.closeSlider()
		}
		this.ioBoxes = []
		for (const con of [...this.connections]) {
			con.kill()
		}
		for (const op of [...this.operators]) {
			op.kill()
		}
		this.connections = []
		this.operators = []
		if (this.p5) {
			this.p5.remove()
			this.p5 = null
		}
		this.ele.innerHTML = ''
		let i = AllOperatorDemos.indexOf(this)
		if (i >= 0) {
			AllOperatorDemos.splice(i, 1)
		}
	}

	// Baut Operatoren und Verbindungen aus dem gespeicherten JSON auf —
	// wie loadJsonToAll, aber auf diese Demo begrenzt
	_load(data) {
		let worldOffsetX = (this.index + 1) * DEMO_WORLD_SPACING

		for (const opc of (data.opAll || [])) {
			let entryName = opc[CONSTRUCTOR_KEY]
			if (!(entryName in OperatorRegistry)) {
				throw new Error("Unbekannter Operator: '" + entryName + "'")
			}
			let entry = OperatorRegistry[entryName]
			let newOp = new entry.classFnk(opc._x, opc._y)
			newOp.entryName = entry.name
			newOp.setConfig(opc, true)

			// IDs je Demo eindeutig machen — so darf derselbe Aufbau mehrfach auf einer Seite stehen
			this._remapId(newOp, this._idPrefix + newOp.id)
			if (newOp.isOutputPortal && newOp.origin) {
				newOp.origin = this._idPrefix + newOp.origin
			}

			newOp.pos.x += worldOffsetX

			// Demos sind Anschauung: Verschieben und Einrasten bleiben aus
			newOp.onMove = () => { }
			newOp.fixPlacement = () => { }

			this.operators.push(newOp)
		}

		for (const conc of (data.conAll || [])) {
			let startIO = this._findIO(this._idPrefix + conc.s)
			let endIO = this._findIO(this._idPrefix + conc.e)
			if (!startIO || !endIO) {
				throw new Error("Verbindung mit unbekanntem IO: '" + conc.s + "' → '" + conc.e + "'")
			}
			this.connections.push(new Connection(startIO, endIO))
		}
	}

	_remapId(op, newId) {
		let oldId = op.id
		op.id = newId
		op._fixOldIoIds(oldId, newId)
		delete ControlMap[oldId]
		ControlMap[newId] = op
		if (AllPortals[oldId] == op) {
			delete AllPortals[oldId]
			AllPortals[newId] = op
		}
	}

	_findIO(ioId) {
		for (const op of this.operators) {
			for (const io of [...op.inputs, ...op.outputs]) {
				if (io.id == ioId) {
					return io
				}
			}
		}
		return null
	}

	// Alle Controls dieser Demo samt Kindern — pro Frame frisch eingesammelt,
	// weil Operatoren (z. B. Portal-Ausgänge) zur Laufzeit IOs erzeugen können
	_collectControls() {
		let all = []
		const walk = (control) => {
			all.push(control)
			for (const child of control.children) {
				walk(child)
			}
		}
		for (const op of this.operators) {
			walk(op)
		}
		return all
	}

	// Umschließendes Rechteck aller Operatoren (Weltkoordinaten)
	_bounds() {
		let box = null
		for (const op of this.operators) {
			let left = op.pos.x - (op.width / 2)
			let right = op.pos.x + (op.width / 2)
			let top = op.pos.y - (op.height / 2)
			let bottom = op.pos.y + (op.height / 2)
			if (!box) {
				box = { left: left, right: right, top: top, bottom: bottom }
			}
			else {
				box.left = mainP5.min(box.left, left)
				box.right = mainP5.max(box.right, right)
				box.top = mainP5.min(box.top, top)
				box.bottom = mainP5.max(box.bottom, bottom)
			}
		}
		if (!box) {
			box = { left: 0, right: 0, top: 0, bottom: 0 }
		}
		return box
	}

	_startCanvas() {
		let box = this._bounds()
		let width = Math.max(DEMO_MIN_WIDTH, Math.ceil(box.right - box.left) + (2 * DEMO_PADDING))
		let height = Math.max(DEMO_MIN_HEIGHT, Math.ceil(box.bottom - box.top) + (2 * DEMO_PADDING))

		// dragOffset schiebt die Mitte des Aufbaus in die Canvas-Mitte
		this._dragOffset = mainP5.createVector(-(box.left + box.right) / 2, -(box.top + box.bottom) / 2)

		this.canvasWrap = document.createElement('div')
		this.canvasWrap.className = 'operator-demo-canvas'
		this.ele.appendChild(this.canvasWrap)

		this.p5 = new p5(p => {
			p.setup = () => {
				p.createCanvas(width, height)
				p.frameRate(60)
			}
			p.draw = () => this._frame(p)
		}, this.canvasWrap)
	}

	_frame(p) {
		this.tick += 1

		// geteilte Globals auf den Stand dieser Demo bringen
		tooltip = ""
		dragOffset = this._dragOffset
		mousePos = p.createVector(p.mouseX - (p.width / 2) - dragOffset.x, p.mouseY - (p.height / 2) - dragOffset.y)
		hoverControl = this._hoverControl
		lastHoverControl = this._lastHoverControl
		mouseWasDown = this._mouseWasDown
		lastMousePos = this._lastMousePos
		connectionHover = null
		if (mouseConnection === null) {
			mouseConnection = new Connection(null, null)
		}

		p.cursor('default')

		let controls = this._collectControls()

		for (const con of this.connections) {
			con.update(this.tick, p)
			con.line.mouseIsOver = false
		}
		if (!!connectionHover) {
			connectionHover.line.mouseIsOver = true
		}

		updateControls(this.tick, p, controls)

		// Demos kennen keine Auswahl und keine neuen Verbindungen
		selectedOperators = []
		mouseConnection.start = null
		mouseConnection.end = null

		p.clear()
		p.push()
		p.translate(p.width / 2, p.height / 2)
		p.translate(dragOffset.x, dragOffset.y)
		for (const con of this.connections) {
			con.draw(this.tick, p)
		}
		drawControls(this.tick, p, controls)
		p.pop()

		this._drawTooltip(p)

		// die Wert-Quadrate der Bedienfelder mitziehen
		for (const box of this.ioBoxes) {
			box.refresh()
		}

		// Stand für den nächsten Frame dieser Demo sichern
		this._hoverControl = hoverControl
		this._lastHoverControl = lastHoverControl
		this._mouseWasDown = mouseWasDown
		this._lastMousePos = lastMousePos
	}

	// Wert-Tooltip an der Maus, wie ihn die Hauptfläche zeichnet
	_drawTooltip(p) {
		if (tooltip.trim().length <= 0) {
			return
		}
		p.push()
		p.textSize(12)
		p.textAlign(p.LEFT, p.TOP)
		let tx = p.mouseX + 20
		let ty = p.mouseY + 20
		let bounds = p.textBounds(tooltip, tx, ty)
		p.stroke('333')
		p.fill('#ffffff80')
		p.rect(tx - 0.5, ty - 0.5, p.round(bounds.w) + 10, p.round(bounds.h) + 10)
		p.noStroke()
		p.fill('#000')
		p.text(tooltip, tx + 5, ty + 5)
		p.pop()
	}

	// Bedienfelder für die unverdrahteten IOs der Demo:
	// Eingänge links vom Canvas (stellbar), Ausgänge rechts (nur lesend)
	_buildIoPanels() {
		let freeInputs = []
		let freeOutputs = []
		for (const op of this.operators) {
			for (const inp of op.inputs) {
				if (!this.connections.some(con => con.end == inp)) {
					freeInputs.push([op, inp])
				}
			}
			for (const oup of op.outputs) {
				if (!this.connections.some(con => con.start == oup)) {
					freeOutputs.push([op, oup])
				}
			}
		}

		let inputPanel = this._buildIoPanel(freeInputs, false)
		if (inputPanel) {
			this.ele.insertBefore(inputPanel, this.canvasWrap)
		}
		let outputPanel = this._buildIoPanel(freeOutputs, true)
		if (outputPanel) {
			this.ele.appendChild(outputPanel)
		}
	}

	_buildIoPanel(freeIos, readonly) {
		if (freeIos.length <= 0) {
			return null
		}

		// Der Operatorname kommt nur mit auf die Beschriftung, wenn im Feld
		// mehrere Operatoren vertreten sind — sonst ist er redundant
		let owners = new Set(freeIos.map(([op, io]) => op))
		let withOwnerName = owners.size > 1

		let panel = document.createElement('div')
		panel.className = 'operator-demo-ios ' + (readonly ? 'outputs' : 'inputs')
		for (const [op, io] of freeIos) {
			panel.appendChild(this._buildIoRow(op, io, readonly, withOwnerName))
		}
		return panel
	}

	_buildIoRow(op, io, readonly, withOwnerName) {
		let row = document.createElement('div')
		row.className = 'operator-demo-io'
		if (io.description) {
			row.dataset.tip = io.description
		}

		let label = document.createElement('span')
		label.className = 'operator-demo-io-label'
		let name = io.displayName || io.name
		label.innerText = withOwnerName ? (op.entryName + ' · ' + name) : name

		let box = new IoValueBox(io, readonly)
		box.row = row
		box.label = label
		this.ioBoxes.push(box)

		// Beschriftung außen, Quadrat am Canvas — Ausgänge spiegelbildlich zu Eingängen
		if (readonly) {
			row.appendChild(box.ele)
			row.appendChild(label)
		}
		else {
			row.appendChild(label)
			row.appendChild(box.ele)
		}
		return row
	}

	_showError(err) {
		let box = document.createElement('div')
		box.className = 'operator-demo-error'
		box.innerText = 'Demo konnte nicht geladen werden: ' + err.message
		this.ele.appendChild(box)
	}
}
