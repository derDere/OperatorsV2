const Op_Comment = register(
  "Comment",
  "Organisation",
  "A way to place a Note or a Comment",
  class extends Operator {

    constructor(x = 0, y = 0) {
      super(x, y)

      this.borderColor = mainP5.color('#9e9a6a')
      this.backgroundColor = mainP5.color('#F8F2B3')

      this.borderHoverColor = mainP5.color('#9e9a6a')
      this.backgroundHoverColor = mainP5.color('#F8F2B3')

      this.borderActiveColor = mainP5.color('#9e9a6a')
      this.backgroundActiveColor = mainP5.color('#F8F2B3')

      this.size = 14
      this._comment = "???"
    }

    get comment() {
      let c = this._comment
      c = c.replace(/\\/g, "\\\\")
      c = c.replace(/\n/g, "\\n")
      c = c.replace(/\t/g, "\\t")
      c = c.replace(/\r/g, "\\r")
      c = c.replace(/\0/g, "\\0")
			//c = c.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      return c
    }

    set comment(value) {
      const BACKSLASH = "<<<BACKSLASH>>>"
      const BACKSLASH_RE = new RegExp(BACKSLASH, "g")
      let c = value
      c = c.replace(/\\\\/g, BACKSLASH)
      c = c.replace(/\\n/g, "\n")
      c = c.replace(/\\t/g, "\t")
      c = c.replace(/\\r/g, "\r")
      c = c.replace(/\\0/g, "\0")
			c = c.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      c = c.replace(BACKSLASH_RE, "\\")
      this._comment = c
    }

    getConfig() {
      return {
        ...super.getConfig(),
        Comment: this.comment,
        "Font Size": this.size
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded)
      if ('Comment' in conf) {
        this.comment = conf.Comment
      }
      if ('Font Size' in conf) {
        this.size = conf["Font Size"]
      }
    }

    _FontStyle(p5ctx) {
      p5ctx.noStroke()
      p5ctx.fill('#4a4079')
      p5ctx.textFont("Comic Sans MS")
      p5ctx.textAlign(p5ctx.LEFT, p5ctx.TOP)
      p5ctx.textSize(this.size)
    }

    doUpdate(tick, p5ctx) {
      super.doUpdate(tick, p5ctx)

      p5ctx.push()
      this._FontStyle(p5ctx)
      
		  let bounds = p5ctx.textBounds(this._comment, 0, 0);

      let w = p5ctx.ceil((bounds.w + 10) / 20) * 20
      let h = p5ctx.ceil((bounds.h + 10) / 20) * 20

      if (w < 80) w = 80
      if (h < 60) h = 60

      this.width = w
      this.height = h

      p5ctx.pop()
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      p5ctx.push()

      this._FontStyle(p5ctx)

      p5ctx.text(this._comment, (-this.width / 2) + 5, (-this.height / 2) + 5)

      p5ctx.pop()
    }
  }
)

const bookmarkAnchors = {}
var datAnchors = null
var datAnchorsBlocker = null

function initDatAnchors() {
  datAnchors = new dat.GUI()
  datAnchors.title = "📘 Bookmarks"
  datAnchors.position = "bottom-right"
  datAnchorsBlocker = new DatBlocker(datAnchors)
}

const Op_Anchor = register(
  "Anchor",
  "Organisation",
  "Place this anywere on your canvas to bookmark the location and find those same coordinate again.",
  class extends Operator {

    constructor(x = 0, y = 0) {
      super(x, y)

      this.isAnchor = true

      this.height = 40

      this.borderColor = mainP5.color('transparent')
      this.backgroundColor = mainP5.color('transparent')
      this.backgroundHoverColor = mainP5.color('#ffffff30')
      this.backgroundActiveColor = mainP5.color('#00000030')

      this.size = 14
      let [dx, dy] = this.getDragPos()
      this.title = "New Anchor (" + dx + ", " + -dy + ")"
      this.anchorKey = this.title

      this.updateDatAnchors()
    }

    kill() {
      super.kill()
      delete bookmarkAnchors[this.anchorKey]
      datAnchors.edit(bookmarkAnchors)
    }

    updateDatAnchors() {
      if (this.anchorKey in bookmarkAnchors) {
        delete bookmarkAnchors[this.anchorKey]
      }
      let key = this.title
      let count = 0
      while(key in bookmarkAnchors) {
        key = this.title + ` (${++count})`
      }
      this.anchorKey = key
      bookmarkAnchors[this.anchorKey] = this.goto.bind(this)
      if (!!datAnchors) {
        datAnchors.edit(bookmarkAnchors)
      }
    }

    goto() {
      let [x, y] = this.getDragPos()
      dragOffset.x = x
      dragOffset.y = y
    }

    getConfig() {
      return {
        ...super.getConfig(),
        Title: this.title,
        "Font Size": this.size
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded)
      if ('Title' in conf) {
        this.title = conf.Title
        this.updateDatAnchors()
      }
      if ('Font Size' in conf) {
        this.size = conf["Font Size"]
      }
    }

    _FontStyle(p5ctx) {
      p5ctx.noStroke()
      p5ctx.fill('#4a4079')
      p5ctx.textStyle(p5ctx.BOLD)
      p5ctx.textFont("Comic Sans MS")
      p5ctx.textAlign(p5ctx.LEFT, p5ctx.TOP)
      p5ctx.textSize(this.size)
    }

    getDragPos() {
      let x = -(this.pos.x - (this.width / 2))
      let y = -(this.pos.y + (this.height / 2))

      x -= (mainP5.width / 2) - 2
      y += (mainP5.height / 2) - 1

      return [x, y]
    }

    doUpdate(tick, p5ctx) {
      super.doUpdate(tick, p5ctx)

      p5ctx.push()
      this._FontStyle(p5ctx)
      
		  let bounds = p5ctx.textBounds(this.title, 0, 0);

      let w = p5ctx.ceil((bounds.w + 30) / 20) * 20
      let h = p5ctx.ceil((bounds.h + 10) / 20) * 20

      if (w < 80) w = 80
      if (h < 40) h = 40

      this.width = w
      this.height = h

      p5ctx.pop()
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      p5ctx.push()

      this._FontStyle(p5ctx)

      p5ctx.text(this.title, (-this.width / 2) + 15, -5)

      p5ctx.noFill()
      p5ctx.stroke('#4a4079')
      p5ctx.line(
        (-this.width / 2) - 1, (this.height / 2) + 1,
        (-this.width / 2) - 1, (this.height / 2) - (p5ctx.height / 2) + 1,
      )
      p5ctx.line(
        (-this.width / 2) - 1, (this.height / 2) + 1,
        (-this.width / 2) - 1 + (p5ctx.width / 2), (this.height / 2) + 1,
      )

      p5ctx.pop()
    }
  }
)

const Op_Label = register(
  "Label",
  "Organisation",
  "Displays a static text in the panel area",
  class extends Placeable {

    constructor(x = 0, y = 0) {
      super(x, y)

      // stark durchscheinend, damit er nicht wie ein funktionaler Baustein wirkt
      this.backgroundColor = mainP5.color('#ffffff30')
      this.backgroundHoverColor = mainP5.color('#ffffff60')
      this.backgroundActiveColor = mainP5.color('#ffffff60')

      this.text = "Label"
      this.href = ""
      this.fontFamily = "Arial"
      this.fontSize = 14
      this.color = "#000000"
      this.background = "#ffffff"

      this._bgCell = null // Zelle, die aktuell die Hintergrundfarbe traegt
    }

    kill() {
      super.kill()
      if (this._bgCell) {
        this._bgCell.style.backgroundColor = ''
        this._bgCell = null
      }
    }

    getConfig() {
      return {
        ...super.getConfig(),
        Text: this.text,
        Href: this.href,
        "Font Family": this.fontFamily,
        "Font Size": this.fontSize,
        color: this.color,
        Background: this.background
      }
    }

    setConfig(conf, loaded = false) {
      super.setConfig(conf, loaded)
      if ('Text' in conf) {
        this.text = conf.Text
      }
      if ('Href' in conf) {
        this.href = conf.Href
      }
      if ('Font Family' in conf) {
        this.fontFamily = conf['Font Family']
      }
      if ('Font Size' in conf) {
        this.fontSize = conf['Font Size']
      }
      if ('color' in conf) {
        this.color = conf.color
      }
      if ('Background' in conf) {
        this.background = conf.Background
      }
    }

    createElement() {
      return document.createElement('div')
    }

    updateElement(ele) {
      // Mit gesetztem Href wird der Text als Link in neuem Tab dargestellt,
      // in Textfarbe des Labels; ohne Href als blanker Text.
      if (this.href) {
        let link = ele.firstElementChild
        if (!link || link.tagName != 'A') {
          ele.innerText = ''
          link = document.createElement('a')
          link.target = '_blank'
          link.rel = 'noopener'
          link.style.color = 'inherit'
          ele.appendChild(link)
        }
        link.href = this.href
        link.innerText = this.text
      }
      else {
        ele.innerText = this.text
      }
      ele.style.fontFamily = this.fontFamily
      ele.style.fontSize = this.fontSize + 'px'
      ele.style.color = this.color

      // Allein in der Zelle traegt die Zelle die Hintergrundfarbe — sie fuellt
      // dann randlos und der Text bleibt durch die Zellzentrierung mittig.
      // Mit Nachbarn ist das Label inline und die Farbe liegt als
      // Marker-Markierung direkt auf dem Text.
      let cell = ele.parentElement
      let alone = !!cell && cell.children.length == 1

      if (this._bgCell && (!alone || this._bgCell != cell)) {
        this._bgCell.style.backgroundColor = ''
        this._bgCell = null
      }

      if (alone) {
        cell.style.backgroundColor = this.background
        this._bgCell = cell
        ele.style.backgroundColor = 'transparent'
        ele.style.display = ''
        ele.style.padding = ''
        ele.style.borderRadius = ''
      }
      else {
        ele.style.backgroundColor = this.background
        ele.style.display = 'inline'
        ele.style.padding = '1px 4px'
        ele.style.borderRadius = '3px'
      }
    }

    doDraw(tick, p5ctx) {
      super.doDraw(tick, p5ctx)

      p5ctx.push()

      p5ctx.noStroke()
      p5ctx.fill(0)
      p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
      p5ctx.textSize(12)
      p5ctx.text(this.text.substring(0, 11), 0, 5)
      p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
      p5ctx.textSize(10)
      p5ctx.text('LABEL', 0, 5)

      p5ctx.pop()
    }
  }
)