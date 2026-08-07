const DEBUG = true

var tick = 0
var mousePos = null
var dragOffset = null
var canvasIsDragged = false
var lastDragMousePos = null
var mainCanvas = null

function setup() {
  mainCanvas = createCanvas(windowWidth, windowHeight)

  dragOffset = createVector(0, 0)

  for (let i = 0; i < OperatorRegistry.length; i++) {
    let entry = OperatorRegistry[i]
    entry.new(0, (i - ((OperatorRegistry.length - 1) / 2)) * 80)
  }
}

function doubleClicked() {
  addNewOperator()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function mousePressed() {
  if (!hoverControl) {
    canvasIsDragged = true
  }
}

function mouseReleased() {
  canvasIsDragged = false
}

function keyPressed(e) {
  if(e.key == 'Delete') {
    if (!!lineHover) {
      lineHover.kill()
    }
  }
}

function doCanvasDrag() {
  let mouseDragPos = createVector(mouseX, mouseY)
  if (canvasIsDragged) {
    dragOffset = dragOffset.copy().sub(lastDragMousePos.copy().sub(mouseDragPos))
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

  doCanvasDrag()

  clear()
  noSmooth()

  setCanvasPosition()

  mousePos = createVector(mouseX - (width / 2) - dragOffset.x, mouseY - (height / 2) - dragOffset.y)

  updateLines(tick)
  updateControls(tick)

  drawLines(tick)
  drawControls(tick)

  linesNextFrame()
}
