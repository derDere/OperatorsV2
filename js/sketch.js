const DEBUG = true

var tick = 0
var mousePos = null
var dragOffset = null
var canvasIsDragged = false
var lastDragMousePos = null
var mainCanvas = null
var screenSplit = 0.2

function updateSplitter() {
	let canvasSize = round(windowWidth * (1 - screenSplit))
	if (canvasSize < 50) {
		canvasSize = 50
	}
	let space = windowWidth - canvasSize - SPLITTER_WIDTH
	if (space < 50) {
		space = 50
	}
	appgui.style.width = space + 'px'
	appgui_splitter.style.left = space + 'px'
	appgui_splitter.dataset.space = space
	return canvasSize
}

function setup() {
	initProps()

	mainCanvas = createCanvas(updateSplitter(), windowHeight)

	dragOffset = createVector(0, 0)

	initSplitter()
	initNewOperatorDialog()
	createTableOfElements()
}

function doubleClicked(event) {
	if (!hoverControl && !newOpDialogOpen) {
		addNewOperator(event)
	}
}

function windowResized() {
	resizeCanvas(updateSplitter(), windowHeight)
}

function mousePressed() {
	if (
		(!hoverControl) &&
		(mouseX >= 0) &&
		(mouseX < width) &&
		(mouseY >= 0) &&
		(mouseY < height) &&
		(mouseButton.right)
	) {
		canvasIsDragged = true
	}
}

function mouseReleased() {
	canvasIsDragged = false
}

var shiftPressed = false
var ctrlPressed = false

function keyPressed(e) {
	if (e.key == 'Delete') {
		if (!!lineHover) {
			lineHover.kill()
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

function doCanvasDrag() {
	let mouseDragPos = createVector(mouseX, mouseY)
	if (canvasIsDragged) {
		dragOffset = dragOffset.copy().sub(lastDragMousePos.copy().sub(mouseDragPos))
		cursor(MOVE)
	}
	lastDragMousePos = mouseDragPos.copy()
}

function setCanvasPosition() {
	translate(width / 2, height / 2)
	translate(dragOffset.x, dragOffset.y)

	const BORDER_CORRECTION = 11 // makes the elements border fit on the grid correctly
	mainCanvas.elt.style.backgroundPositionX = round((width / 2) + dragOffset.x - BORDER_CORRECTION) + 'px'
	mainCanvas.elt.style.backgroundPositionY = round((height / 2) + dragOffset.y - BORDER_CORRECTION) + 'px'
}

function draw() {
	tick += 1

	cursor('default')
	clear()
	noSmooth()

	if (!newOpDialogOpen) {
		doCanvasDrag()
	}

	setCanvasPosition()

	mousePos = createVector(mouseX - (width / 2) - dragOffset.x, mouseY - (height / 2) - dragOffset.y)

	if (!newOpDialogOpen) {
		updateLines(tick)
		updateControls(tick)
	}

	drawLines(tick)
	drawControls(tick)

	if (!newOpDialogOpen) {
		linesNextFrame()
	}

	updatePlacableElements()
}
