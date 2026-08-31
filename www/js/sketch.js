const DEBUG = true

// Zoom der Zeichenflaeche. Das Mausrad multipliziert den Massstab mit
// ZOOM_STEP (oder teilt ihn) — ein Rasten ist damit immer derselbe
// prozentuale Schritt, und das Zoomen fuehlt sich auf jeder Stufe gleich
// schnell an.
const ZOOM_MIN = 0.125
const ZOOM_MAX = 4
const ZOOM_STEP = 1.1

// Raster im Hintergrund der Flaeche. Die Zellweite ist eine dieser Stufen in
// Welt-Einheiten: Beim Herauszoomen rueckt sie eine Stufe hoch, beim
// Hineinzoomen eine hinunter — das Raster bleibt dadurch immer in einem gut
// lesbaren Abstand, statt zu grauem Flimmern zu verschmelzen. Gewechselt
// wird, sobald eine Zelle unter GRID_MIN_CELL Bildpunkte schrumpfen wuerde.
const GRID_STEPS = [10, 20, 40, 80]
const GRID_MIN_CELL = 20
const GRID_LINE_COLOR = '#000000'
const GRID_LINE_OPACITY = 0.067

// Weltkoordinate, auf der die Rasterlinien liegen (im Abstand der
// Zellweite). Dort sitzen auch die Raender eingerasteter Bausteine — der
// Wert ist am Bildschirm ausgemessen, nicht hergeleitet.
const GRID_LINE_ORIGIN = -10.5

var tick = 0
var mousePos = null
var dragOffset = null
var zoomScale = 1
var canvasIsDragged = false
var lastDragMousePos = null
var mainCanvas = null
var screenSplit = 0.2
var mainP5 = null
var tooltip = ""

function updateSplitter(p5ctx) {
	let canvasSize = p5ctx.round(p5ctx.windowWidth * (1 - screenSplit))
	if (canvasSize < 50) {
		canvasSize = 50
	}
	let space = p5ctx.windowWidth - canvasSize - SPLITTER_WIDTH
	if (space < 50) {
		space = 50
	}
	appgui.style.width = space + 'px'
	appgui_splitter.style.left = space + 'px'
	appgui_splitter.dataset.space = space
	return canvasSize
}

function main_setup(p5ctx) {
	initProps()

	mainCanvas = p5ctx.createCanvas(updateSplitter(p5ctx), p5ctx.windowHeight)

	p5ctx.frameRate(1000000)

	dragOffset = p5ctx.createVector(0, 0)

	initSplitter()
	initNewOperatorDialog()
	createTableOfElements()
	initMenu()
	initDatAnchors()
	initWelcome()
}

function doubleClicked(event, p5ctx) {
	if (event.target != mainCanvas.elt) {
		return
	}
	if (!hoverControl && !newOpDialogOpen) {
		addNewOperator(event, p5ctx)
	}
}

function windowResized(p5ctx) {
	p5ctx.resizeCanvas(updateSplitter(p5ctx), p5ctx.windowHeight)
}

function mousePressed(event, p5ctx) {
	const NotOnControl = (!hoverControl)
	const MouseInBounds = (
		(p5ctx.mouseX >= 0) &&
		(p5ctx.mouseX < p5ctx.width) &&
		(p5ctx.mouseY >= 0) &&
		(p5ctx.mouseY < p5ctx.height)
	)

	if (
		NotOnControl &&
		MouseInBounds &&
		p5ctx.mouseButton.right
	) {
		canvasIsDragged = true
	}

	if (
		NotOnControl &&
		MouseInBounds &&
		p5ctx.mouseButton.left
	) {
		if (ctrlPressed) {
			// Ctrl + Ziehen auf freier Flaeche schneidet Verbindungen statt auszuwaehlen
			cutStartPoint = mousePos.copy()
		}
		else {
			selectedOperators = []
			updateProps(null)
			startSelection(event, p5ctx)
		}
	}
}

function mouseReleased() {
	canvasIsDragged = false
	stopSelection(mainP5)
	if (cutStartPoint) {
		cutConnections(cutStartPoint, mousePos, mainP5)
		cutStartPoint = null
	}
}

var shiftPressed = false
var ctrlPressed = false
var opClipboard = null
var pasteCount = 0
var cutStartPoint = null

function duplicateSelection() {
	if (selectedOperators.length <= 0) return
	let data = operatorsToJsonData(selectedOperators)
	selectedOperators = addJsonDataToAll(data, 20, 20)
}

function copySelection() {
	if (selectedOperators.length <= 0) return
	opClipboard = operatorsToJsonData(selectedOperators)
	pasteCount = 0
}

function pasteClipboard() {
	if (!opClipboard) return
	// mittig einfuegen; jedes weitere Einfuegen versetzt, damit nichts deckungsgleich stapelt
	selectedOperators = addJsonDataCentered(opClipboard, 20 * pasteCount)
	pasteCount += 1
}

// Trennt alle Verbindungen, deren Linie die Strecke von `from` nach `to`
// kreuzt. Die Strecke wird in kurzen Schritten abgetastet und gegen die
// punktgenaue Trefferpruefung der jeweiligen Linienart gehalten.
function cutConnections(from, to, p5ctx) {
	// Abgetastet wird in Schritten von rund drei Bildpunkten — in
	// Weltkoordinaten also feiner, je weiter herausgezoomt ist
	let sampleStep = 3 / zoomScale
	let steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / sampleStep))
	for (const con of [...AllConnections]) {
		if (con == mouseConnection) continue
		if (!con.start || !con.end) continue
		for (let i = 0; i <= steps; i++) {
			let point = {
				x: from.x + ((to.x - from.x) * (i / steps)),
				y: from.y + ((to.y - from.y) * (i / steps))
			}
			if (con.line.isMouseOver(point, p5ctx)) {
				con.kill()
				break
			}
		}
	}
}

function drawCutLine(p5ctx) {
	if (!cutStartPoint) return
	p5ctx.push()
	p5ctx.stroke('#ff3333')
	p5ctx.strokeWeight(2 / zoomScale)
	p5ctx.drawingContext.setLineDash([6 / zoomScale, 6 / zoomScale])
	p5ctx.line(cutStartPoint.x, cutStartPoint.y, mousePos.x, mousePos.y)
	p5ctx.drawingContext.setLineDash([])
	p5ctx.pop()
}

function keyPressed(e) {
	let currentEle = document.activeElement
	let typing = currentEle && currentEle.tagName.toUpperCase() == "INPUT"

	if (e.key == 'Delete' && !typing) {
		if (!!connectionHover) {
			connectionHover.kill()
		}
		else if (selectedOperators.length > 0) {
			for (let op of [...selectedOperators]) {
				op.kill()
			}
		}
	}
	if (e.ctrlKey && !typing) {
		if (e.key == 'd' || e.key == 'D') {
			e.preventDefault() // sonst oeffnet der Browser den Lesezeichen-Dialog
			duplicateSelection()
		}
		// Ctrl+C nur abfangen, wenn keine Textauswahl kopiert werden soll
		if ((e.key == 'c' || e.key == 'C') && (window.getSelection() + '').length <= 0) {
			copySelection()
		}
		if (e.key == 'v' || e.key == 'V') {
			pasteClipboard()
		}
		if (e.key == '0') {
			e.preventDefault() // sonst greift der Seitenzoom des Browsers
			zoomAt(mainP5.width / 2, mainP5.height / 2, 1 / zoomScale, mainP5)
		}
	}
	if (e.key == 'Shift') {
		shiftPressed = true
	}
	if (e.key == 'Control') {
		ctrlPressed = true
	}
}

function keyReleased(e) {
	if (e.key == 'Shift') {
		shiftPressed = false
	}
	if (e.key == 'Control') {
		ctrlPressed = false
	}
}

// Die Weltweite einer Rasterzelle bei diesem Massstab: die feinste Stufe,
// deren Zelle noch mindestens GRID_MIN_CELL Bildpunkte breit ist.
function gridStepFor(zoom) {
	for (const step of GRID_STEPS) {
		if ((step * zoom) >= GRID_MIN_CELL) {
			return step
		}
	}
	return GRID_STEPS[GRID_STEPS.length - 1]
}

// Rastet den Massstab so ein, dass eine Rasterzelle genau eine ganze Zahl
// von Bildpunkten breit ist.
//
// Das ist keine Kosmetik, sondern Bedingung: Der Browser legt die Kachelweite
// eines Hintergrundbildes in Bruchteilen eines Bildpunktes ab und rundet
// dabei. Bei krummer Weite laeuft dieser Rest ueber die Kacheln auf — weit
// weg von der Bildmitte liegt das Raster dann sichtbar neben den Bausteinen,
// und benachbarte Kacheln runden auf dieselbe Pixelspalte, wodurch einzelne
// Linien ganz verschwinden. Bei ganzzahliger Weite gibt es keinen Rest.
//
// Die Stufe der Zellweite haengt selbst am Massstab, deshalb die Schleife:
// Aendert das Einrasten die Stufe, wird mit der neuen Stufe nachgerastet.
function snapZoom(zoom) {
	let snapped = zoom
	for (let pass = 0; pass < 3; pass++) {
		let step = gridStepFor(snapped)
		let cell = Math.max(1, Math.round(step * snapped))
		let next = cell / step
		if (next === snapped) {
			break
		}
		snapped = next
	}
	return snapped
}

// Aendert den Massstab um `factor` und zieht dragOffset so nach, dass der
// Weltpunkt unter (screenX, screenY) an derselben Bildschirmstelle stehen
// bleibt — gezoomt wird also immer auf den Ankerpunkt zu.
function zoomAt(screenX, screenY, factor, p5ctx) {
	let before = zoomScale
	let after = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, before * factor))
	after = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, snapZoom(after)))
	if (after == before) {
		return
	}

	let worldX = (screenX - (p5ctx.width / 2) - dragOffset.x) / before
	let worldY = (screenY - (p5ctx.height / 2) - dragOffset.y) / before

	zoomScale = after
	// Ganze Bildpunkte, damit Bausteinraender und Rasterlinien auf denselben
	// Pixelspalten landen; der Ankerpunkt wandert dabei um hoechstens einen
	// halben Bildpunkt
	dragOffset.x = Math.round(screenX - (p5ctx.width / 2) - (worldX * after))
	dragOffset.y = Math.round(screenY - (p5ctx.height / 2) - (worldY * after))
}

// Das Mausrad zoomt auf den Mauszeiger zu. p5 horcht am window — ueber den
// Panels und dem Bausteindialog bleibt das Rad daher ausdruecklich wirkungslos.
function mouseWheel(event, p5ctx) {
	if (event.target != mainCanvas.elt) {
		return
	}
	if (newOpDialogOpen) {
		return
	}
	if (!event.delta) {
		return
	}

	zoomAt(p5ctx.mouseX, p5ctx.mouseY, (event.delta < 0) ? ZOOM_STEP : (1 / ZOOM_STEP), p5ctx)

	return false // verhindert das Scrollen der Seite
}

// Baut das Rasterbild als Inline-SVG (data-URI). Breite und Hoehe des SVG
// entsprechen genau der Zellgroesse, es wird also unskaliert gezeichnet:
// Die Zelle folgt dem Zoom, die Linien bleiben trotzdem einen Bildpunkt duenn.
function gridBackgroundUrl(cell) {
	let svg =
		'<svg xmlns="http://www.w3.org/2000/svg" width="' + cell + '" height="' + cell + '">' +
		'<path d="M0 0.5H' + cell + 'M0.5 0V' + cell + '"' +
		' fill="none" stroke="' + GRID_LINE_COLOR + '"' +
		' stroke-opacity="' + GRID_LINE_OPACITY + '" stroke-width="1"' +
		' shape-rendering="crispEdges"/>' +
		'</svg>'
	return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")'
}

// Zellweite in Bildpunkten. Durch das Einrasten des Massstabs (snapZoom) ist
// das immer eine ganze Zahl; gerundet wird nur gegen den Rechenrest der
// Fliesskommazahlen.
function gridCellSize() {
	return Math.round(gridStepFor(zoomScale) * zoomScale)
}

var lastGridCell = null

// Haelt das Hintergrundraster am Zoom. Neu gebaut wird das SVG nur, wenn
// sich die Zellweite wirklich aendert — nicht in jedem Frame.
function updateGridBackground() {
	let cell = gridCellSize()
	if (cell === lastGridCell) {
		return
	}
	lastGridCell = cell

	mainCanvas.elt.style.backgroundImage = gridBackgroundUrl(cell)
	mainCanvas.elt.style.backgroundSize = cell + 'px ' + cell + 'px'
}

function doCanvasDrag(p5ctx) {
	let mouseDragPos = p5ctx.createVector(p5ctx.mouseX, p5ctx.mouseY)
	if (canvasIsDragged) {
		dragOffset = dragOffset.copy().sub(lastDragMousePos.copy().sub(mouseDragPos))
		// auf hochaufloesenden Anzeigen kann die Mausposition gebrochen sein —
		// die Flaeche bleibt trotzdem auf ganzen Bildpunkten
		dragOffset.x = Math.round(dragOffset.x)
		dragOffset.y = Math.round(dragOffset.y)
		p5ctx.cursor(p5ctx.MOVE)
	}
	lastDragMousePos = mouseDragPos.copy()
}

function setCanvasPosition(p5ctx) {
	p5ctx.translate(p5ctx.width / 2, p5ctx.height / 2)
	p5ctx.translate(dragOffset.x, dragOffset.y)
	p5ctx.scale(zoomScale)

	updateGridBackground()

	// Die Kachel wird so gelegt, dass ihre Linie auf GRID_LINE_ORIGIN liegt.
	// Der halbe Bildpunkt kommt aus dem SVG selbst: Dort sitzt die Linie bei
	// 0,5 in der Kachel und skaliert nicht mit.
	//
	// Das Modulo holt die Kachelposition in die Naehe des Bildrandes, statt
	// sie beim weit entfernten Nullpunkt zu lassen. Das Muster wiederholt sich
	// ohnehin, aber so bleibt die Zahl der Kacheln bis zum Bild klein — und
	// mit ihr jeder Rest, den der Browser beim Kacheln aufsammeln koennte.
	let cell = gridCellSize()
	let originX = p5ctx.round((p5ctx.width / 2) + dragOffset.x + (GRID_LINE_ORIGIN * zoomScale) - 0.5)
	let originY = p5ctx.round((p5ctx.height / 2) + dragOffset.y + (GRID_LINE_ORIGIN * zoomScale) - 0.5)

	mainCanvas.elt.style.backgroundPositionX = (((originX % cell) + cell) % cell) + 'px'
	mainCanvas.elt.style.backgroundPositionY = (((originY % cell) + cell) % cell) + 'px'
}

function main_draw(p5ctx) {
	tick += 1

	p5ctx.push()

	tooltip = ""
	p5ctx.cursor('default')
	p5ctx.clear()
	p5ctx.noSmooth()

	if (!newOpDialogOpen) {
		doCanvasDrag(p5ctx)
	}

	setCanvasPosition(p5ctx)

	mousePos = p5ctx.createVector(
		(p5ctx.mouseX - (p5ctx.width / 2) - dragOffset.x) / zoomScale,
		(p5ctx.mouseY - (p5ctx.height / 2) - dragOffset.y) / zoomScale
	)

	updateSelection(p5ctx)

	if (!newOpDialogOpen) {
		updateConnections(tick, p5ctx)
		updateControls(tick, p5ctx)
	}

	// Nullpunkt-Kreuz: eine Hilfslinie, die auf jeder Zoomstufe gleich duenn
	// bleibt und den sichtbaren Ausschnitt in Weltkoordinaten ueberspannt
	p5ctx.push()
	p5ctx.noFill()
	p5ctx.stroke('#5554')
	p5ctx.strokeWeight(1 / zoomScale)
	let xOC = ((p5ctx.width + 1) % 2) / 2
	let yOC = ((p5ctx.height + 1) % 2) / 2
	let viewCenterX = -dragOffset.x / zoomScale
	let viewCenterY = -dragOffset.y / zoomScale
	let viewWidth = p5ctx.width / zoomScale
	let viewHeight = p5ctx.height / zoomScale
	p5ctx.line(viewCenterX - viewWidth, -10 - yOC, viewCenterX + viewWidth, -10 - yOC)
	p5ctx.line(-10 - xOC, viewCenterY - viewHeight, -10 - xOC, viewCenterY + viewHeight)
	p5ctx.pop()

	drawSelection(p5ctx)
	drawCutLine(p5ctx)

	drawConnections(tick, p5ctx)
	drawControls(tick, p5ctx)

	if (!newOpDialogOpen) {
		connectionsNextFrame(p5ctx)
	}

	updatePlacableElements()

	p5ctx.pop()

	p5ctx.push()

	p5ctx.noStroke()
	p5ctx.fill('#00000080')
	p5ctx.textSize(12)
	p5ctx.textAlign(p5ctx.LEFT, p5ctx.TOP)
	p5ctx.text(
		"Double click to add operators.\n" +
		"Right click to move.\n" +
		"Mouse wheel: zoom (Ctrl+0: 100%)\n" +
		"Del: delete selection / hovered line\n" +
		"Ctrl+D: duplicate selection\n" +
		"Ctrl+C / Ctrl+V: copy & paste\n" +
		"Ctrl+Drag: cut connections\n" +
		"Connections: " + (AllConnections.length - 1) + "\n" +
		"Operators: " + AllOperators.length + "\n" +
		"Zoom: " + p5ctx.round(zoomScale * 100) + "%",
		10, 10)

	p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
	p5ctx.text(
		`${p5ctx.round(-dragOffset.x / zoomScale)}, ${p5ctx.round(dragOffset.y / zoomScale)}`,
		p5ctx.width / 2, p5ctx.height - 5)

	if (tooltip.trim().length > 0) {
		p5ctx.push()
		p5ctx.textSize(12)
		p5ctx.textAlign(p5ctx.LEFT, p5ctx.TOP)
		let tx = p5ctx.mouseX + 20
		let ty = p5ctx.mouseY + 20
		let bounds = p5ctx.textBounds(tooltip, tx, ty);
		p5ctx.stroke('333')
		p5ctx.fill('#ffffffD0')
		p5ctx.rect(tx - 0.5, ty - 0.5, p5ctx.round(bounds.w) + 10, p5ctx.round(bounds.h) + 10)

		p5ctx.noStroke()
		p5ctx.fill('#000')
		p5ctx.text(tooltip, tx + 5, ty + 5)
		p5ctx.pop()
	}

	p5ctx.pop()
}

new p5(p => {
	mainP5 = p

	p.setup = () => main_setup(p)
	p.draw = () => main_draw(p)
	p.windowResized = () => windowResized(p)
	p.doubleClicked = (event) => doubleClicked(event, p)
	p.mousePressed = (event) => mousePressed(event, p)
	p.mouseReleased = () => mouseReleased()
	p.mouseWheel = (event) => mouseWheel(event, p)
	p.keyPressed = (event) => keyPressed(event)
	p.keyReleased = (event) => keyReleased(event)
})
