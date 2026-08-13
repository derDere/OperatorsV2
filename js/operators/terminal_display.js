const RANDOM_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"§$%&/()=?*';:-1234567890+#-.,<>|@"
const TERMINAL_CELL_W = 10
const TERMINAL_CELL_H = 15
const TERMINAL_CELL_M = 1

const Op_TerminalDisplay = register(
  "Terminal Display",
  "Displays a ASCII Terminal",
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

      this.charElements = {}

      this.data = []
      this.display = []

      this.showCursor = true
      this._term_w = 20
      this._term_h = 8
      this._term_x = 0
      this._term_y = 0
      this.inChar = " "
      this.atChar = " "
      this.lastT = false
      this.lastG = false

      this._updateDataDisplaySize()
      this._randomFill()

      this.in_b = this.newInput("B")
      this.in_t = this.newInput("T")
      this.in_x = this.newInput("X")
      this.in_y = this.newInput("Y")
      this.in_g = this.newInput("G")
      this.in_c = this.newInput("C")

      this.out_b = this.newOutput("B")
      this.out_x = this.newOutput("X")
      this.out_y = this.newOutput("Y")
      this.out_t = this.newOutput("T")
      this.out_e = this.newOutput("E")
    }

    _getEleDisplayContent() {
      return "Hallo Welt!"
    }

    createElement() {
      let ele = document.createElement('div')
      ele.className = "terminal-display"
      return ele
    }

    _updateDisplay() {
      for (let y = 0; y < mainP5.min(this.display.length, this.data.length); y++) {
        for (let x = 0; x < mainP5.min(this.display[0].length, this.data[0].length); x++) {
          let tc = (this.data[y][x] + ' ')
          let ta = tc.charCodeAt(0) & 255
          let dc = (this.display[y][x] + ' ')
          let da = dc.charCodeAt(0) & 255
          let s = 0
          if (ta > da) {
            s = 1
          }
          if (ta < da) {
            s = -1
          }
          if (s != 0) {
            da += s
            dc = String.fromCharCode(da)
            this.display[y][x] = dc
          }
        }
      }
    }

    updateElement() {
      if (Object.keys(this.charElements).length <= 0) {
        this.ele.innerHTML = ""
      }
      this.ele.style.height = ((this.display.length * (TERMINAL_CELL_M + TERMINAL_CELL_H)) + TERMINAL_CELL_M) + 'px'
      for (let y = 0; y < this.display.length; y++) {
        this.ele.style.width = ((this.display[0].length * (TERMINAL_CELL_M + TERMINAL_CELL_W)) + TERMINAL_CELL_M) + 'px'
        for (let x = 0; x < this.display[0].length; x++) {
          let key = x + ',' + y
          let char
          if (!(key in this.charElements)) {
            char = document.createElement("span")
            char.className = "terminal-display-cell"
            char.style.top = ((TERMINAL_CELL_M + TERMINAL_CELL_H) * y) + 'px'
            char.style.left = ((TERMINAL_CELL_M + TERMINAL_CELL_W) * x) + 'px'
            this.ele.appendChild(char)
            this.charElements[key] = char
          }
          else {
            char = this.charElements[key]
          }
          if (x == this._term_x && y == this._term_y && this.showCursor) {
            char.classList.add('cursor')
          } else if (char.classList.contains('cursor')) {
            char.classList.remove('cursor')
          }
          char.innerText = this.display[y][x]
        }
      }
    }

    _randomFill() {
      for (let y = 0; y < this.display.length; y++) {
        for (let x = 0; x < this.display[0].length; x++) {
          let i = mainP5.round(mainP5.random(1000000, 9999999)) % RANDOM_CHARS.length
          let c = RANDOM_CHARS[i] + ' '
          let cc = c.charCodeAt(0)
          this.display[y][x] = String.fromCharCode(cc)
        }
      }
    }

    get termW() {
      return mainP5.round(mainP5.min(mainP5.max(this._term_w, 0)), 255)
    }
    set termW(value) {
      this._term_w = mainP5.round(mainP5.min(mainP5.max(value, 0)), 255)
      this._updateDataDisplaySize()
    }

    get termH() {
      return mainP5.round(mainP5.min(mainP5.max(this._term_h, 0)), 255)
    }
    set termH(value) {
      this._term_h = mainP5.round(mainP5.min(mainP5.max(value, 0)), 255)
      this._updateDataDisplaySize()
    }

    getConfig() {
      return {
        ...super.getConfig(),
        "Terminal Width": this.termW,
        "Terminal Height": this.termH,
        "Show Cursor" : this.showCursor
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded = false)
      if ('Terminal Width' in conf) {
        this.termW = conf['Terminal Width']
      }
      if ('Terminal Height' in conf) {
        this.termH = conf['Terminal Height']
      }
      if ('Show Cursor' in conf) {
        this.showCursor = conf['Show Cursor']
      }
    }

    _updateDataDisplaySize() {
      let newData = []
      let newDisplay = []

      for (let y = 0; y < this._term_h; y++) {
        let rowData = []
        let rowDisplay = []
        for (let x = 0; x < this._term_w; x++) {
          rowData.push(' ')
          rowDisplay.push(' ')
        }
        newData.push(rowData)
        newDisplay.push(rowDisplay)
      }

      for (let y = 0; y < mainP5.min(newData.length, this.data.length); y++) {
        for (let x = 0; x < mainP5.min(newData[0].length, this.data[0].length); x++) {
          newData[y][x] = this.data[y][x]
          newDisplay[y][x] = this.display[y][x]
        }
      }

      this.data = newData
      this.display = newDisplay
      this.charElements = {}
    }

    addChar(c) {
      this.data[this._term_y][this._term_x] = c
      this._term_x += 1
      this._fixXY()
    }

    _fixXY() {
      if (this._term_x >= this._term_w) {
        this._term_x = 0
        this._term_y += 1
      }
      if (this._term_y >= this._term_h) {
        this._term_x = this._term_w - 1
        this._term_y = this._term_h - 1
      }
    }

    doUpdate(tick, p5ctx) {
      super.doUpdate(tick, p5ctx)
      this._updateDisplay()

      let startX = this._term_x
      let startY = this._term_y
      let startC = this.atChar

      let b = (this.in_b.value) & 255
      let t = !!(this.in_t.value)
      let x = (this.in_x.value) & 255
      let y = (this.in_y.value) & 255
      let g = !!(this.in_g.value)
      let c = !!(this.in_c.value)

      let e = true

      for (let y = 0; y < this.data.length; y++) {
        for (let x = 0; x < this.data[0].length; x++) {
          if (c) {
            this.data[y][x] = ' '
          }
          else if (this.data[y][x] != ' ') {
            e = false
            break
          }
        }
        if ((!e) && (!c)) {
          break
        }
      }
      if (c) {
        this._term_x = 0
        this._term_y = 0
      }

      let cc = String.fromCharCode(b)
      if (this.lastT != t && t) {
        if (b == 0) {
          this._term_x += 1
          this._fixXY()
        } else {
          this.addChar(cc)
        }
      }
      this.lastT = t

      if (this.lastG != g && g) {
        this._term_x = x
        this._term_y = y
        this._fixXY()
      }
      this.lastG = g
      
      this.inChar = cc
      this.atChar = this.data[this._term_y][this._term_x]

      let outT = (startX != this._term_x) || (startY != this._term_y) || (startC != this.atChar)

      this.out_b.value = (this.atChar.charCodeAt(0)) & 255
      this.out_x.value = this._term_x
      this.out_y.value = this._term_y
      this.out_t.value = outT
      this.out_e.value = e
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      p5ctx.push()

      p5ctx.noStroke()
      p5ctx.fill('#afa')

      p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
      p5ctx.textFont('Courier New')
      p5ctx.textSize(22)
      p5ctx.textStyle(p5ctx.BOLD)
      p5ctx.text(">_", 0, 0)
      p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
      p5ctx.textSize(10)
      p5ctx.textStyle(p5ctx.NORMAL)
      p5ctx.text("x: " + this._term_x, 0, 25)
      p5ctx.text("y: " + this._term_y, 0, 40)
      p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
      p5ctx.text("In: '" + this.inChar + "'", 0, -40)
      p5ctx.text("At: '" + this.atChar + "'", 0, -25)

      p5ctx.pop()
    }
  }
)