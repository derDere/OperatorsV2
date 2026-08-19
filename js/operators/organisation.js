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

const Op_Anchor = register(
  "Anchor",
  "Organisation",
  "Place this anywere on your canvas to mark the location and find those same coordinate again.",
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
      this.title = "New Anchor (" + x + ", " + -y + ")"
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