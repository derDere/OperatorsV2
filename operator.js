const OperatorRegistry = []

function valueColor(value, m = 1, isLine = false) {
  if (value === true) {
    return color(255 * m, 0, 0)
  }
  else if (value === false) {
    if (isLine) {
      return color(0 + (255 * (1 - m)))
    } else {
      return color(255 * m)
    }
  }
  else {
    return color(0, 128 * m, 255 * m)
  }
}

class IOControl extends Control {
  
  constructor(parent) {
    super(0, 0, 5, BOUNDS_TYPE_CIRCLE, parent)

    this.name = "?"
    this.isOutput = false
    
    this.doNotCaptureMouse = true
    
    this.borderActiveColor = color(0, 128, 0)
    this.backgroundActiveColor = color(0, 255, 0)

    this.value = false

    this.onMouseDown(this.lineStart.bind(this))
    this.onMouseUp(this.lineEnd.bind(this))
  }

  lineStart(sender) {
    mouseLine.start = this
  }

  lineEnd(sender) {
    let other = mouseLine.start
    if (
      (!!other) &&
      (other != this) &&
      (other.isOutput != this.isOutput)
    ) {
      let sio = other
      let eio = this
      if (eio.isOutput) {
        let tmp = eio
        eio = sio
        sio = tmp
      }
      let nl = new Line(sio, eio)
    }
    mouseLine.start = null
  }

  doUpdate(tick) {
    this.backgroundColor = valueColor(this.value)
    this.backgroundHoverColor = valueColor(this.value, 0.8)
  }
  
}

class OperatorEntry {
  constructor(name, description, classFnk) {
    this.name = name
    this.description = description
    this.classFnk = classFnk
  }

  new(x, y) {
    return new this.classFnk(x, y)
  }
}

function register(name, description, classFnk) {
  let entry = new OperatorEntry(name, description, classFnk)
  OperatorRegistry.push(entry)
  return classFnk
}

class Operator extends Movable {
  
  constructor(x = 0, y = 0) {
    super(x, y, DEFAULT_SIZE, BOUNDS_TYPE_RECT)

    this.width += 20
    this.inputs = []
    this.outputs = []

    this.fixPlacement()
  }

  doUpdate(tick) {
    this.doNotCaptureMouse = (
      (mouseLine.start != null) ||
      (mouseLine.end != null)
    )
  }

  doDraw(tick) {
    push()
    fill(0)
    noStroke()
    textAlign(LEFT, CENTER)
    textSize(9)
    for(let inp of this.inputs) {
      text(inp.name, inp.pos.x + inp.radius + inp.borderWeight + 2, inp.pos.y)
    }
    textAlign(RIGHT, CENTER)
    for(let oup of this.outputs) {
      text(oup.name, oup.pos.x - oup.radius - oup.borderWeight - 2, oup.pos.y)
    }
    pop()
  }

  _reorderIOs() {
    let mC = max(this.inputs.length, this.outputs.length) // Anzahl der Längeren Liste
    let space = 20 // Platz zwichen den IOs der längeren Liste
    let extra = (mC % 2 == 1) ? 0 : 1 // Extra platz anzahl ausserhalb der IOs
    let cH = (mC + extra) * space // Neue Höhe des Controls
    if (cH < (DEFAULT_SIZE * 2)) {
      cH = (DEFAULT_SIZE * 2)
    }
    let oM = (cH - ((mC - 1) * space)) / 2 // Äußeres Margin über/unter der größeren Liste

    this.height = cH
    
    for(let [side, list] of [[-1, this.inputs], [1, this.outputs]]) {
      if (list.length <= 0) {
        continue // Für eine leere Liste muss auch nichts berechnet werden!
      }
      let listSpace = (cH - (2 * oM)) // platz swischen den IOs dieser liste
      if (list.length > 1) {
        listSpace /= (list.length - 1)
      }
      else {
        listSpace = 0
      }
      let x = side * (this.width / 2)
      for(let i = 0; i < list.length; i++) {
        let y = (-this.height / 2) + (oM + (i * listSpace))
        let io = list[i]
        io.pos = createVector(x, y)
      }
    }
  }

  newInput(name) {
    let inp = new IOControl(this)
    inp.name = name
    this.inputs.push(inp)
    this._reorderIOs()
    return inp
  }

  newOutput(name) {
    let oup = new IOControl(this)
    oup.name = name
    oup.isOutput = true
    this.outputs.push(oup)
    this._reorderIOs()
    return oup
  }
}


































// EOF