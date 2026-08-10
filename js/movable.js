class Movable extends Control {

  constructor(x = 0, y = 0, size = DEFAULT_SIZE, type = BOUNDS_TYPE_RECT, parent = null) {
    super(x, y, size, type, parent)

    this.isMoving = false
    this.placementStep = 20

    this.onMouseDown(this._moveStart.bind(this))
    this.onMouseUp(this._moveEnd.bind(this))
    this.onMouseMove(this._moveDrag.bind(this))
  }

  _moveStart(sender) {
    this.isMoving = true
  }

  _moveEnd(sender) {
    this.isMoving = false

    this.fixPlacement()
  }

  fixPlacement() {
    let xFix = 0
    let yFix = 0

    if ((round(this.width / 20) % 2) == 0) xFix = 10
    if ((round(this.height / 20) % 2) == 0) yFix = 10

    let xD = (round((this.pos.x - xFix) / this.placementStep) * this.placementStep) + xFix
    let yD = (round((this.pos.y - yFix) / this.placementStep) * this.placementStep) + yFix

    this.pos.x = xD
    this.pos.y = yD
  }

  _moveDrag(sender, movement) {
    if (this.isMoving == true) {
      this.onMove(movement)
    }
  }

  onMove(movement) {
    this.pos = this.pos.add(movement)
  }

}
