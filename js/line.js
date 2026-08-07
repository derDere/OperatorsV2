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

    AllLines.push(this)
  }

  kill() {
    let i = AllLines.indexOf(this)
    AllLines.splice(i, 1)
    if (lineHover == this) {
      lineHover = null
    }
  }

  isMouseOver(ap) {
    if (!this.start || !this.end) {
      return false
    }

    if (
      (!this.start?.isInFrame()) &&
      (!this.end?.isInFrame())
    ) {
      return false
    }

    const tolerance = this.mouseOverWeight / 2

    const p0 = this.start.actualPos.copy()
    const p3 = this.end.actualPos.copy()

    let xD = abs((p3.x - p0.x) / 2)
    if (xD < 100) {
      xD = 100
    }
    if (!(this.start.isOutput)) {
      xD = -xD
    }

    const p1 = createVector(p0.x + xD, p0.y)
    const p2 = createVector(p3.x - xD, p3.y)

    if (
      ap.x < Math.min(p0.x, p1.x, p2.x, p3.x) - tolerance ||
      ap.x > Math.max(p0.x, p1.x, p2.x, p3.x) + tolerance ||
      ap.y < Math.min(p0.y, p1.y, p2.y, p3.y) - tolerance ||
      ap.y > Math.max(p0.y, p1.y, p2.y, p3.y) + tolerance
    ) {
      return false
    }

    const polygonLength = p0.dist(p1) + p1.dist(p2) + p2.dist(p3)
    const steps = constrain(ceil(polygonLength / 8), 12, 160)

    let previous = p0
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const current = createVector(
        bezierPoint(p0.x, p1.x, p2.x, p3.x, t),
        bezierPoint(p0.y, p1.y, p2.y, p3.y, t)
      )
      const segment = p5.Vector.sub(current, previous)
      const lengthSq = segment.magSq()
      const projection = lengthSq > 0
        ? constrain(p5.Vector.sub(ap, previous).dot(segment) / lengthSq, 0, 1)
        : 0
      const closest = p5.Vector.add(previous, p5.Vector.mult(segment, projection))

      if (closest.dist(ap) <= tolerance) {
        return true
      }

      previous = current
    }
    return false
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
    if (
      (
        (!this.start?.isInFrame()) &&
        (!this.end?.isInFrame())
      ) &&
      this != mouseLine
    ) {
      return false
    }
    push()
    noFill()
    stroke(this.lineColor)
    strokeWeight(this.lineWeight)

    let startPos
    let endPos
    let oneEndSet = false

    if (!!this.start) {
      startPos = this.start.actualPos.copy()
      oneEndSet = true
    }
    else {
      startPos = mousePos.copy()
    }

    if (!!this.end) {
      endPos = this.end.actualPos.copy()
      oneEndSet = true
    }
    else {
      endPos = mousePos.copy()
    }

    if (oneEndSet) {
      let xD = abs((endPos.x - startPos.x) / 2)
      if (xD < 100) {
        xD = 100
      }
      if (!(this?.start?.isOutput)) {
        xD = -xD
      }
      if (this.mouseIsOver) {
        push()
        stroke(this.mouseOverColor)
        strokeWeight(this.mouseOverWeight)
        bezier(
          startPos.x, startPos.y,
          startPos.x + xD, startPos.y,
          endPos.x - xD, endPos.y,
          endPos.x, endPos.y
        )
        pop()
      }
      bezier(
        startPos.x, startPos.y,
        startPos.x + xD, startPos.y,
        endPos.x - xD, endPos.y,
        endPos.x, endPos.y
      )
    }

    pop()
  }
}

function updateLines(tick) {
  if (mouseLine === null) {
    mouseLine = new Line(null, null)
  }

  lineHover = null

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
  }
}

function drawLines(tick) {
  for(let lin of AllLines) {
    lin.draw(tick)
  }
}
