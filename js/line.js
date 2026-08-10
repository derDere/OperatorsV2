const AllLines = []
var mouseLine = null
var lineHover = null

class Line {

  constructor(start, end) {
    this.start = start
    this.end = end

    this.lineColor = color(0)
    this.lineWeight = 2
    this.value = false
    this.mouseOverWeight = 5
    this.mouseOverColor = color(0, 255, 0, 192)
    this.mouseIsOver = false

    // Stützpunkte des verlegten Wegs in Weltkoordinaten, vom Router gefüllt
    this.path = null

    AllLines.push(this)
  }

  kill() {
    let i = AllLines.indexOf(this)
    AllLines.splice(i, 1)
    if (lineHover == this) {
      lineHover = null
    }
    if (this.end) {
      this.end.value = false
    }
  }

  /** Der zu zeichnende Weg; ohne verlegten Weg die direkte Verbindung. */
  get points() {
    if (!!this.path && (this.path.length >= 2)) {
      return this.path
    }

    let startPos = null
    let endPos = null
    if (!!this.start) {
      startPos = this.start.actualPos
    }
    if (!!this.end) {
      endPos = this.end.actualPos
    }
    if (!startPos && !endPos) {
      return []
    }
    if (!startPos) {
      startPos = mousePos
    }
    if (!endPos) {
      endPos = mousePos
    }
    return [
      { x: startPos.x, y: startPos.y },
      { x: endPos.x, y: endPos.y },
    ]
  }

  /** Berührt der Weg den sichtbaren Ausschnitt? */
  isInFrame(points, padding = 0) {
    if (points.length < 2) {
      return false
    }

    let left = points[0].x
    let right = points[0].x
    let top = points[0].y
    let bottom = points[0].y
    for (const point of points) {
      if (point.x < left) left = point.x
      if (point.x > right) right = point.x
      if (point.y < top) top = point.y
      if (point.y > bottom) bottom = point.y
    }

    const viewLeft = -(width / 2) - dragOffset.x - padding
    const viewTop = -(height / 2) - dragOffset.y - padding
    const viewRight = viewLeft + width + (2 * padding)
    const viewBottom = viewTop + height + (2 * padding)

    if (right < viewLeft) return false
    if (left > viewRight) return false
    if (bottom < viewTop) return false
    if (top > viewBottom) return false
    return true
  }

  isMouseOver(ap) {
    if (!this.start || !this.end) {
      return false
    }

    const points = this.points
    if (points.length < 2) {
      return false
    }

    const tolerance = this.mouseOverWeight / 2
    if (!this.isInFrame(points, tolerance)) {
      return false
    }

    for (let i = 1; i < points.length; i++) {
      if (this._distanceToSegment(ap, points[i - 1], points[i]) <= tolerance) {
        return true
      }
    }
    return false
  }

  /** Kürzester Abstand eines Punktes zu einem Wegabschnitt. */
  _distanceToSegment(point, from, to) {
    const dx = to.x - from.x
    const dy = to.y - from.y
    const lengthSq = (dx * dx) + (dy * dy)

    let projection = 0
    if (lengthSq > 0) {
      projection = (((point.x - from.x) * dx) + ((point.y - from.y) * dy)) / lengthSq
      projection = Math.min(1, Math.max(0, projection))
    }

    const closestX = from.x + (projection * dx)
    const closestY = from.y + (projection * dy)
    return Math.hypot(point.x - closestX, point.y - closestY)
  }

  update(tick) {
    if (this.isMouseOver(mousePos)) {
      lineHover = this
    }
    if (
      (!!this.start) &&
      (!!this.end)
    ) {
      this.end.value = this.start.value
      this.value = this.start.value
      this.lineColor = valueColor(this.value, 1, true)
    }
    else {
      this.lineColor = color(255)
    }
  }

  draw(tick) {
    const points = this.points
    if (points.length < 2) {
      return false
    }
    if (!this.isInFrame(points, this.mouseOverWeight)) {
      return false
    }

    push()
    noFill()

    if (this.mouseIsOver) {
      stroke(this.mouseOverColor)
      strokeWeight(this.mouseOverWeight)
      this._strokePath(points)
    }

    stroke(this.lineColor)
    strokeWeight(this.lineWeight)
    this._strokePath(points)

    pop()
  }

  _strokePath(points) {
    beginShape()
    for (const point of points) {
      vertex(point.x, point.y)
    }
    endShape()
  }
}

function updateLines(tick) {
  if (mouseLine === null) {
    mouseLine = new Line(null, null)
  }

  lineHover = null

  wireRouter.updateRoutes(AllLines)
  mouseLine.path = wireRouter.previewRoute(mouseLine, mousePos)

  for(let lin of AllLines) {
    lin.update(tick)
    lin.mouseIsOver = false
  }

  if (!!lineHover) {
    lineHover.mouseIsOver = true
  }
}

function linesNextFrame() {
  if (!mouseIsPressed) {
    mouseLine.start = null
    mouseLine.end = null
    mouseLine.path = null
  }
}

function drawLines(tick) {
  for(let lin of AllLines) {
    lin.draw(tick)
  }
}
