const DEBUG = true

var tick = 0
var mousePos = null
var dragOffset = null
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
}

function doubleClicked(event, p5ctx) {
	if (event.originalTarget != mainCanvas.elt) {
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
		selectedOperators = []
		updateProps(null)
		startSelection(event, p5ctx)
	}
}

function mouseReleased() {
	canvasIsDragged = false
	stopSelection(mainP5)
}

var shiftPressed = false
var ctrlPressed = false

function keyPressed(e) {
	if (e.key == 'Delete') {
		let currentEle = document.activeElement
		if (currentEle && currentEle.tagName.toUpperCase() == "INPUT") {
			return
		}
		if (!!connectionHover) {
			connectionHover.kill()
		}
		else if (selectedOperators.length > 0) {
			for (let op of [...selectedOperators]) {
				op.kill()
			}
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

function doCanvasDrag(p5ctx) {
	let mouseDragPos = p5ctx.createVector(p5ctx.mouseX, p5ctx.mouseY)
	if (canvasIsDragged) {
		dragOffset = dragOffset.copy().sub(lastDragMousePos.copy().sub(mouseDragPos))
		p5ctx.cursor(p5ctx.MOVE)
	}
	lastDragMousePos = mouseDragPos.copy()
}

function setCanvasPosition(p5ctx) {
	p5ctx.translate(p5ctx.width / 2, p5ctx.height / 2)
	p5ctx.translate(dragOffset.x, dragOffset.y)

	const BORDER_CORRECTION = 11 // makes the elements border fit on the grid correctly
	mainCanvas.elt.style.backgroundPositionX = p5ctx.round((p5ctx.width / 2) + dragOffset.x - BORDER_CORRECTION) + 'px'
	mainCanvas.elt.style.backgroundPositionY = p5ctx.round((p5ctx.height / 2) + dragOffset.y - BORDER_CORRECTION) + 'px'
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

	mousePos = p5ctx.createVector(p5ctx.mouseX - (p5ctx.width / 2) - dragOffset.x, p5ctx.mouseY - (p5ctx.height / 2) - dragOffset.y)

	updateSelection(p5ctx)

	if (!newOpDialogOpen) {
		updateConnections(tick, p5ctx)
		updateControls(tick, p5ctx)
	}

	p5ctx.push()
	p5ctx.noFill()
	p5ctx.stroke('#5554')
	p5ctx.strokeWeight(1)
	let xOC = ((p5ctx.width + 1) % 2) / 2
	let yOC = ((p5ctx.height + 1) % 2) / 2
	p5ctx.line(-dragOffset.x - p5ctx.width, -10 - yOC, -dragOffset.x + p5ctx.width, -10 - yOC)
	p5ctx.line(-10 - xOC, -dragOffset.y - p5ctx.height, -10 - xOC, -dragOffset.y + p5ctx.height)
	p5ctx.pop()

	drawSelection(p5ctx)

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
	p5ctx.text("Double click to add operators.\nRight click to move.", 10, 10)
	
	p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
	p5ctx.text(`${-dragOffset.x}, ${dragOffset.y}`, p5ctx.width / 2, p5ctx.height - 5)

	if (tooltip.trim().length > 0) {
		p5ctx.push()
		p5ctx.textSize(12)
		p5ctx.textAlign(p5ctx.LEFT, p5ctx.TOP)
		let tx = p5ctx.mouseX + 20
		let ty = p5ctx.mouseY + 20
		let bounds = p5ctx.textBounds(tooltip, tx, ty);
		p5ctx.stroke('333')
		p5ctx.fill('#ffffff80')
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
	p.keyPressed = (event) => keyPressed(event)
	p.keyReleased = (event) => keyReleased(event)
})
