// Alle Zeichen, die der Terminal-Screen anzeigen kann. Die Reihenfolge ist der
// Flapscreen-Durchlauf: Leerzeichen, 0-9, Buchstaben nach Häufigkeit in der
// englischen Sprache, Sonderzeichen zuletzt.
const DISPLAYED_CHARS = " 0123456789etaoinshrdlcumwfgypbvkjxqzETAOINSHRDLCUMWFGYPBVKJXQZ!\"/()=?*';:-+#.,<>|@[]{}_~\\$€&%§"

// Schneller Lookup: Zeichen -> Index in DISPLAYED_CHARS
const DISPLAYED_INDEX = {}
for (let i = 0; i < DISPLAYED_CHARS.length; i++) {
  DISPLAYED_INDEX[DISPLAYED_CHARS[i]] = i
}

const TERMINAL_CELL_W = 10
const TERMINAL_CELL_H = 15
const TERMINAL_CELL_M = 1

const Op_TerminalDisplay = register(
  "Terminal Display",
  "Display",
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

      this.rowElements = null
      this.cursorEle = null
      this._dirtyRows = new Set()

      this.data = []
      this.display = []

      this.fillRandomOnClear = true
      this.showCursor = true
      this._term_w = 20
      this._term_h = 8
      this._term_x = 0
      this._term_y = 0
      this.inChar = " "
      this.atChar = " "
      this.lastW = false
      this.lastS = false
      this.lastG = false

      this._updateDataDisplaySize()
      this._randomFill()

      this.in_b = this.newInput("B") // Byte
      this.in_w = this.newInput("W") // Write
      this.in_s = this.newInput("S") // Set
      this.in_x = this.newInput("X") // Cursor pos X for Goto
      this.in_y = this.newInput("Y") // Cursor pos Y for Goto
      this.in_g = this.newInput("G") // Goto X Y
      this.in_c = this.newInput("C") // Clear

      this.out_b = this.newOutput("B") // Byte (at Cursor)
      this.out_x = this.newOutput("X") // Current X
      this.out_y = this.newOutput("Y") // Current Y
      this.out_t = this.newOutput("T") // Trigger
      this.out_e = this.newOutput("E") // Empty
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
      let h = mainP5.min(this.display.length, this.data.length)
      if (h <= 0) {
        return
      }
      let w = mainP5.min(this.display[0].length, this.data[0].length)
      for (let y = 0; y < h; y++) {
        let dataRow = this.data[y]
        let displayRow = this.display[y]
        let changed = false
        for (let x = 0; x < w; x++) {
          if (dataRow[x] == displayRow[x]) {
            continue
          }
          let tc = dataRow[x]
          if (DISPLAYED_INDEX[tc] === undefined) {
            tc = '?'
            if (displayRow[x] == tc) {
              continue
            }
          }
          // Flapscreen-Rolle: dreht nur vorwaerts, nach dem letzten Zeichen beginnt sie von vorn
          let di = DISPLAYED_INDEX[displayRow[x]]
          if (di === undefined) {
            di = -1
          }
          displayRow[x] = DISPLAYED_CHARS[(di + 1) % DISPLAYED_CHARS.length]
          changed = true
        }
        if (changed) {
          this._dirtyRows.add(y)
        }
      }
    }

    updateElement() {
      if (!this.rowElements) {
        this._dirtyRows.clear()
        this.ele.innerHTML = ""
        this.rowElements = []
        let cols = 0
        if (this.display.length > 0) {
          cols = this.display[0].length
        }
        this.ele.style.width = ((cols * (TERMINAL_CELL_M + TERMINAL_CELL_W)) + TERMINAL_CELL_M) + 'px'
        this.ele.style.height = ((this.display.length * (TERMINAL_CELL_M + TERMINAL_CELL_H)) + TERMINAL_CELL_M) + 'px'
        for (let y = 0; y < this.display.length; y++) {
          let row = document.createElement("div")
          row.className = "terminal-display-row"
          row.style.top = ((TERMINAL_CELL_M + TERMINAL_CELL_H) * y) + 'px'
          this.ele.appendChild(row)
          this.rowElements.push(row)
          this._dirtyRows.add(y)
        }
        this.cursorEle = document.createElement("span")
        this.cursorEle.className = "terminal-display-cell cursor"
        this.ele.appendChild(this.cursorEle)
      }

      // Nur Zeilen anfassen, deren Inhalt sich geaendert hat
      for (let y of this._dirtyRows) {
        this.rowElements[y].textContent = this.display[y].join('')
      }
      this._dirtyRows.clear()

      // Cursor als einzelnes Overlay-Element ueber der Zeile
      if (this.showCursor && this._term_y < this.display.length && this.display.length > 0 && this._term_x < this.display[0].length) {
        this.cursorEle.style.display = 'block'
        this.cursorEle.style.top = ((TERMINAL_CELL_M + TERMINAL_CELL_H) * this._term_y) + 'px'
        this.cursorEle.style.left = ((TERMINAL_CELL_M + TERMINAL_CELL_W) * this._term_x) + 'px'
        let c = this.display[this._term_y][this._term_x]
        if (this.cursorEle.textContent != c) {
          this.cursorEle.textContent = c
        }
      } else {
        this.cursorEle.style.display = 'none'
      }
    }

    _randomFill() {
      for (let y = 0; y < this.display.length; y++) {
        for (let x = 0; x < this.display[0].length; x++) {
          let i = mainP5.round(mainP5.random(1000000, 9999999)) % DISPLAYED_CHARS.length
          this.display[y][x] = DISPLAYED_CHARS[i]
        }
        this._dirtyRows.add(y)
      }
    }

    get termW() {
      return mainP5.round(mainP5.min(mainP5.max(this._term_w, 0), 255))
    }
    set termW(value) {
      this._term_w = mainP5.round(mainP5.min(mainP5.max(value, 0), 255))
      this._updateDataDisplaySize()
    }

    get termH() {
      return mainP5.round(mainP5.min(mainP5.max(this._term_h, 0), 255))
    }
    set termH(value) {
      this._term_h = mainP5.round(mainP5.min(mainP5.max(value, 0), 255))
      this._updateDataDisplaySize()
    }

    getConfig() {
      return {
        ...super.getConfig(),
        "Terminal Width": this.termW,
        "Terminal Height": this.termH,
        "Show Cursor": this.showCursor,
        "Fill random on Clear": this.fillRandomOnClear
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded)
      if ('Terminal Width' in conf) {
        this.termW = conf['Terminal Width']
      }
      if ('Terminal Height' in conf) {
        this.termH = conf['Terminal Height']
      }
      if ('Show Cursor' in conf) {
        this.showCursor = conf['Show Cursor']
      }
      if ('Fill random on Clear' in conf) {
        this.fillRandomOnClear = conf['Fill random on Clear']
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
      this.rowElements = null
      this._fixXY()
    }

    addChar(c, moveCursor = true) {
      // Nicht darstellbare Zeichen werden als '?' angezeigt
      if (!DISPLAYED_CHARS.includes(c)) {
        c = '?'
      }
      this.data[this._term_y][this._term_x] = c
      if (moveCursor) {
        this._term_x += 1
        this._fixXY()
      }
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
      let w = !!(this.in_w.value)
      let s = !!(this.in_s.value)
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
        if (this.fillRandomOnClear) {
          this._randomFill()
        }
      }

      let cc = String.fromCharCode(b)

      if (this.lastW != w && w) {
        if (b == 0) {
          this._term_x += 1
          this._fixXY()
        } else if (b == 10) {
          // \n: Cursor an den Anfang der nächsten Zeile — schreibt nichts
          this._term_x = 0
          this._term_y += 1
          this._fixXY()
        } else if (b == 13) {
          // \r: Cursor an den Anfang der aktuellen Zeile — schreibt nichts
          this._term_x = 0
        } else if (b == 9) {
          // Tab: 4 Leerzeichen, aber höchstens bis zum Zeilenende — schreibt nie in die nächste Zeile hinein
          let fill = mainP5.min(4, this._term_w - this._term_x)
          for (let i = 0; i < fill; i++) {
            this.addChar(' ')
          }
        } else {
          this.addChar(cc)
        }
      }
      this.lastW = w

      if (this.lastS != s && s) {
        if (b != 0) {
          this.addChar(cc, false)
        }
      }
      this.lastS = s

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