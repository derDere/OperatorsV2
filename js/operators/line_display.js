

const Op_LineDisplay = register(
  "Line Display",
  "Displays a Lines on a screen",
  class extends Placeable {

    constructor(x = 0, y = 0) {
      super(x, y)

      this.borderWeight = 3

      this.width += 20

      this.borderColor = mainP5.color('#aaa')
      this.backgroundColor = mainP5.color('#020')

      this.borderHoverColor = mainP5.color('#aaa')
      this.backgroundHoverColor = mainP5.color('#131')

      this.borderActiveColor = mainP5.color('#555')
      this.backgroundActiveColor = mainP5.color('#000')

      this.io_color = mainP5.color(220)

      this._can_w = 255
      this._can_h = 255
      this._pen_x = 128
      this._pen_y = 128
      this._pen_w = 1
      this.showCursor = true
      this.screenW = 255
      this.screenH = 255
      this.ctx = null
      this.can = null
      this.dot = null

      this.lastG = false
      this.lastD = false
      this.lastC = false

      this.in_x = this.newInput("X") // Pen Pos X for Goto
      this.in_y = this.newInput("Y") // Pen Pos Y for Goto
      this.in_g = this.newInput("G") // Goto
      this.in_d = this.newInput("D") // Drawto
      this.in_w = this.newInput("W") // Weight of pen
      this.in_c = this.newInput("C") // Clear

      this.out_x = this.newOutput("X") // current pen x
      this.out_y = this.newOutput("Y") // current pen y
      this.out_g = this.newOutput("G") // Gone to trigger
      this.out_d = this.newOutput("D") // Drawn to trigger
      this.out_w = this.newOutput("W") // current Pen weight
      this.out_t = this.newOutput("T") // General trigger
    }

    doUpdate(tick, p5ctx) {
      super.doUpdate(tick, p5ctx)

      let x = (this.in_x.value) & 255
      let y = (this.in_y.value) & 255
      let g = !!(this.in_g.value)
      let d = !!(this.in_d.value)
      let w = (this.in_w.value) & 255
      let c = !!(this.in_c.value)

      w = p5ctx.max(w, 1)

      let drawTo = false
      if (this.lastD != d && d) {
        drawTo = true
      }
      this.lastD = d

      let goTo = false
      if (this.lastG != g && g) {
        goTo = true
      }
      this.lastG = d

      this._pen_w = w

      if (drawTo) {
        this.ctx.strokeWeight(w)
        this.ctx.line(
          this._pen_x,
          this._pen_y,
          x,
          y
        )
        this._pen_x = x
        this._pen_y = y
      }
      else if (goTo) {
        this._pen_x = x
        this._pen_y = y
      }

      if (this.lastC != c && c) {
        this.ctx.clear()
        this.ctx.background('transparent')
      }
      this.lastC = c

      this.out_x.value = this._pen_x & 255
      this.out_y.value = this._pen_y & 255
      this.out_g.value = goTo
      this.out_d.value = drawTo
      this.out_w.value = this._pen_w & 255
      this.out_t.value = goTo || drawTo
    }

    getConfig() {
      return {
        ...super.getConfig(),
        "Screen Width": this.screenW,
        "Screen Height": this.screenH,
        "Show Cursor": this.showCursor,
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded = false)
      if ('Screen Width' in conf) {
        this.screenW = conf['Screen Width']
      }
      if ('Screen Height' in conf) {
        this.screenH = conf['Screen Height']
      }
      if ('Show Cursor' in conf) {
        this.showCursor = conf['Show Cursor']
      }
    }

    createElement() {
      let ele = document.createElement('div')
      ele.className = "line-display"
      let dot = document.createElement('div')
      dot.className = 'dot'
      this.dot = dot
      ele.appendChild(dot)
      this.ctx = new p5(this._p5Construction.bind(this))
      return ele
    }

    updateElement() {
      let sw = mainP5.min(mainP5.max(this.screenW, 25), 1024)
      let sh = mainP5.min(mainP5.max(this.screenH, 25), 1024)

      let psm = this._pen_w / 255 // pen size multiplier
      let cxp = this._pen_x / 255
      let cyp = this._pen_y / 255
      let psw = sw * psm
      let psh = sh * psm
      let cx = (mainP5.round(cxp * sw)) - mainP5.round(psw / 2)
      let cy = (mainP5.round(cyp * sh)) - mainP5.round(psh / 2)

      this.can.style.height = sh + 'px'
      this.can.style.width = sw + 'px'

      this.dot.style.top = cy + 'px'
      this.dot.style.left = cx + 'px'
      this.dot.style.width = mainP5.round(psw) + 'px'
      this.dot.style.height = mainP5.round(psh) + 'px'

      if (this.showCursor) {
        this.ele.classList.remove('no-cursor')
      }
      else {
        this.ele.classList.add('no-cursor')
      }
    }

    _p5Construction(p) {
      p.setup = this._p5setup.bind(this)
      p.draw = this._p5draw.bind(this)
    }

    _p5setup() {
      let can = this.ctx.createCanvas(255, 255)
      can.parent(this.ele)
      this.can = can.canvas
    }

    _p5draw() {
      this.ctx.background('transparent')
      this.ctx.noLoop()
      this.ctx.stroke("#afa")
      this.ctx.noFill()
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      p5ctx.push()

      p5ctx.noStroke()
      p5ctx.fill('#afa')
      p5ctx.textFont('Courier New')

      p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
      p5ctx.textSize(10)
      p5ctx.textStyle(p5ctx.NORMAL)
      p5ctx.text("x: " + this._pen_x, 0, 0)
      p5ctx.text("y: " + this._pen_y, 0, 15)
      p5ctx.text("w: " + this._pen_w, 0, 30)

      p5ctx.noFill()
      p5ctx.strokeWeight(p5ctx.min(p5ctx.max(this._pen_w, 1), 5))
      p5ctx.stroke('#afa')
      p5ctx.strokeJoin(p5ctx.ROUND)
      p5ctx.translate(0, -5)
      p5ctx.beginShape()
      p5ctx.vertex(4.84, -28.19)
      p5ctx.vertex(-13.21, -20.19)
      p5ctx.vertex(12.58, -18.48)
      p5ctx.vertex(2.90, -6.48)
      p5ctx.vertex(-7.41, -12.19)
      p5ctx.endShape()

      p5ctx.pop()
    }
  }
)