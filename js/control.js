const AllControls = []
var hoverControl = null
var lastHoverControl = null
var mouseWasDown = false
var lastMousePos = null

const BOUNDS_TYPE_RECT = 'rect'
const BOUNDS_TYPE_CIRCLE = 'circle'
const DEFAULT_SIZE = 30

class Control {

  toRect() {
    this.hasRectBounds = true
    this.hasCircleBounds = false
  }

  toCircle() {
    this.hasRectBounds = false
    this.hasCircleBounds = true
  }

  doUpdate(tick) { /* virtual */ }
  doDraw(tick) { /* virtual */ }

  constructor(x = 0, y = 0, size = DEFAULT_SIZE, type = BOUNDS_TYPE_RECT, parent = null) {
    this.pos = createVector(x, y)
    this.width = size * 2
    this.height = size * 2
    this.radius = size
    this.hasRectBounds = type === BOUNDS_TYPE_RECT
    this.hasCircleBounds = type === BOUNDS_TYPE_CIRCLE
    this._parent = parent
    this.children = []
    this.name = (this.hasRectBounds ? 'Rect' : 'Circle') + 'Control' + (AllControls.length + 1)

    this._willClick = false

    this._mouseDownEventHandler = []
    this._mouseMoveEventHandler = []
    this._mouseUpEventHandler = []
    this._mouseClickEventHandler = []
    this._mouseEnterEventHandler = []
    this._mouseExitEventHandler = []

    this.borderWeight = 1

    this.borderColor = color(0)
    this.backgroundColor = color(255, 255, 255, 230)

    this.borderHoverColor = color(0, 128, 255)
    this.backgroundHoverColor = color(255)

    this.borderActiveColor = color(255, 0, 0)
    this.backgroundActiveColor = color(255)

    this.cursor = 'pointer'
    this.isMouseOver = false
    this.isMouseDown = false
    this.hasMouseCapture = false

    this.doNotCaptureMouse = false

    if (!!(this?._parent?.children)) {
      this._parent.children.push(this)
    }

    let zIndex = 0
    if (AllControls.length > 0) {
      zIndex = AllControls[AllControls.length - 1].zIndex + 1
    }
    this.zIndex = zIndex

    AllControls.push(this)
  }

  kill() {
    let i = AllControls.indexOf(this)
    if (i >= 0) {
      AllControls.splice(i, 1)
    }
    i = this._parent?.children?.indexOf(this) | -1
    if (i >= 0) {
      this._parent?.children?.splice(i, 1)
    }
    this.parent = null
  }

  get parent() {
    return this._parent
  }

  set parent(newParent) {
    if (!!(this?._parent?.children)) {
      let i = this._parent.children.indexOf(this)
      this._parent.children.splice(i, 1)
    }
    this._parent = newParent
    if (!!(this?._parent?.children)) {
      this._parent.children.push(this)
    }
  }

  get actualPos() {
    let ap = this.pos.copy()
    let p = this._parent
    while(!!p) {
      ap = ap.add(p.pos)
      p = p._parent
    }
    return ap
  }

  get relativeMousePos() {
    let rp = mousePos.copy().sub(this.actualPos)
    return rp
  }

  get checkMouseOver() {
    let ap = this.actualPos
    if (this.hasRectBounds) {
      let xFit = (mousePos.x >= (ap.x - (this.width / 2))) && (mousePos.x < (ap.x + (this.width / 2)))
      let yFit = (mousePos.y >= (ap.y - (this.height / 2))) && (mousePos.y < (ap.y + (this.height / 2)))
      return xFit && yFit
    }
    else if (this.hasCircleBounds) {
      let mouseDist = ap.copy().sub(mousePos).mag()
      return mouseDist <= this.radius
    }
    return false
  }

  onMouseDown(cb) {
    this._mouseDownEventHandler.push(cb)
  }
  offMouseDown(cb) {
    let i = this._mouseDownEventHandler.indexOf(cb)
    if (i < 0) return
    this._mouseDownEventHandler.splice(i, 1)
  }
  _triggerMouseDown() {
    this._willClick = true
    for(let cb of this._mouseDownEventHandler) {
      if (cb(this) === false) {
        break
      }
    }
  }

  onMouseUp(cb) {
    this._mouseUpEventHandler.push(cb)
  }
  offMouseUp(cb) {
    let i = this._mouseUpEventHandler.indexOf(cb)
    if (i < 0) return
    this._mouseUpEventHandler.splice(i, 1)
  }
  _triggerMouseUp() {
    for(let cb of this._mouseUpEventHandler) {
      if (cb(this) === false) {
        break
      }
    }
    if (this._willClick == true) {
      this._triggerMouseClick()
    }
  }

  onMouseMove(cb) {
    this._mouseMoveEventHandler.push(cb)
  }
  offMouseMove(cb) {
    let i = this._mouseMoveEventHandler.indexOf(cb)
    if (i < 0) return
    this._mouseMoveEventHandler.splice(i, 1)
  }
  _triggerMouseMove(movement) {
    this._willClick = false
    for(let cb of this._mouseMoveEventHandler) {
      if (cb(this, movement) === false) {
        break
      }
    }
  }

  onMouseClick(cb) {
    this._mouseClickEventHandler.push(cb)
  }
  offMouseClick(cb) {
    let i = this._mouseClickEventHandler.indexOf(cb)
    if (i < 0) return
    this._mouseClickEventHandler.splice(i, 1)
  }
  _triggerMouseClick() {
    this._willClick = false
    for(let cb of this._mouseClickEventHandler) {
      if (cb(this) === false) {
        break
      }
    }
  }

  onMouseEnter(cb) {
    this._mouseEnterEventHandler.push(cb)
  }
  offMouseEnter(cb) {
    let i = this._mouseEnterEventHandler.indexOf(cb)
    if (i < 0) return
    this._mouseEnterEventHandler.splice(i, 1)
  }
  _triggerMouseEnter() {
    for(let cb of this._mouseEnterEventHandler) {
      if (cb(this) === false) {
        break
      }
    }
  }

  onMouseExit(cb) {
    this._mouseExitEventHandler.push(cb)
  }
  offMouseExit(cb) {
    let i = this._mouseExitEventHandler.indexOf(cb)
    if (i < 0) return
    this._mouseExitEventHandler.splice(i, 1)
  }
  _triggerMouseExit() {
    for(let cb of this._mouseExitEventHandler) {
      if (cb(this) === false) {
        break
      }
    }
  }

  isInFrame() {
    let ap = this.actualPos

    ap = ap.add(width / 2, height / 2)
    ap = ap.add(dragOffset)

    let xOff = 0
    let yOff = 0

    if (this.hasRectBounds) {
      xOff = (this.width + this.borderWeight) / 2
      yOff = (this.height + this.borderWeight) / 2
    } else {
      xOff = (this.radius + this.borderWeight) / 2
      yOff = (this.radius + this.borderWeight) / 2
    }

    if (ap.x < -xOff) return false
    if (ap.x > width + xOff) return false
    if (ap.y < -yOff) return false
    if (ap.y > height + yOff) return false
    return true
  }

  update(tick) {
    if (this.checkMouseOver) {
      hoverControl = this
    }

    this.doUpdate(tick)

    for (let child of this.children) {
      child.update(tick)
    }
  }

  draw(tick) {
    if (this.isInFrame()) {
      push()

      strokeWeight(this.borderWeight)

      // Set Style
      if (this.isMouseDown) {
        stroke(this.borderActiveColor)
        fill(this.backgroundActiveColor)
      }
      else if (this.isMouseOver) {
        stroke(this.borderHoverColor)
        fill(this.backgroundHoverColor)
      }
      else {
        stroke(this.borderColor)
        fill(this.backgroundColor)
      }

      // Pove by parent
      let p = this._parent
      while(!!p) {
        translate(p.pos.x, p.pos.y)
        p = p._parent
      }
      translate(this.pos.x, this.pos.y)

      // draw
      if (this.hasRectBounds) {
        rectMode(CENTER)
        let xOff = ((this.borderWeight - windowWidth) % 2) / 2
        let yOff = ((this.borderWeight - windowHeight) % 2) / 2
        translate(xOff, yOff)
        rect(0, 0, this.width, this.height)
      }
      else if (this.hasCircleBounds) {
        circle(0, 0, this.radius * 2)
      }

      // draw overwrite
      this.doDraw(tick)

      pop()
    }

    const drawOrder = [...this.children];
    drawOrder.sort((a, b) => a.zIndex - b.zIndex)
    for (let child of this.children) {
      child.draw(tick)
    }
  }
}

function updateControls(tick) {
  cursor('default')
  if (!lastMousePos) {
    lastMousePos = mousePos.copy()
  }

  let mouseGotPressed = (mouseIsPressed != mouseWasDown) && mouseIsPressed
  let mouseGotReleased = (mouseIsPressed != mouseWasDown) && !mouseIsPressed
  mouseWasDown = mouseIsPressed

  let mouseMovement = mousePos.copy().sub(lastMousePos)
  let mouseGotMoved = false
  if (mouseMovement.mag() > 0) {
    mouseGotMoved = true
  }
  lastMousePos = mousePos.copy()

  const updateOrder = [...AllControls];
  updateOrder.sort((a, b) => a.zIndex - b.zIndex)

  let capturedMouseControl = null
  if (hoverControl?.hasMouseCapture) {
    capturedMouseControl = hoverControl
  }
  hoverControl = null

  for (let c of updateOrder) {
    if (!c._parent) {
      c.update(tick)
    }
    c.isMouseOver = false
    c.hasMouseCapture = false
    c.isMouseDown = false
  }

  if (mouseIsPressed && !!capturedMouseControl) {
    hoverControl = capturedMouseControl
  }

  let capturedMouseUp = false
  if ((lastHoverControl != hoverControl) && !!lastHoverControl) {
    lastHoverControl._triggerMouseExit()
    if (mouseGotReleased) {
      if (!!capturedMouseControl) {
        capturedMouseControl._triggerMouseUp()
        capturedMouseUp = true
      }
    }
  }
  if ((lastHoverControl != hoverControl) && !!hoverControl) {
    hoverControl._triggerMouseEnter()
  }
  lastHoverControl = hoverControl

  if (!!hoverControl) {
    cursor('pointer')

    hoverControl.isMouseOver = true

    if (mouseIsPressed) {
      hoverControl.isMouseDown = true
      if (!hoverControl.doNotCaptureMouse) {
        hoverControl.hasMouseCapture = true
      }
    }

    if (mouseGotPressed) {
      hoverControl._triggerMouseDown()
    }
    if (mouseGotMoved) {
      hoverControl._triggerMouseMove(mouseMovement)
    }
    if (mouseGotReleased && !capturedMouseUp) {
      hoverControl._triggerMouseUp()
    }
  }
}

function drawControls(tick) {
  const drawOrder = [...AllControls];
  drawOrder.sort((a, b) => a.zIndex - b.zIndex)

  for (let c of drawOrder) {
    if (!!c._parent) continue
    c.draw(tick)
  }
}
