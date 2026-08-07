class base_Simple extends Operator {

  constructor(x = 0, y = 0) {
    super(x, y)

    this.in_a = this.newInput("I1")
    this.in_b = this.newInput("I2")
    this.out_c = this.newOutput("O")
    this.out_not_c = this.newOutput("!O")

    this.action = (a, b) => false
    this.icon = ""
  }

  doUpdate(tick) {
    super.doUpdate(tick)

    let a = !!(this.in_a.value)
    let b = !!(this.in_b.value)

    let c = this.action(a, b)
    let nc = !c

    this.out_c.value = c
    this.out_not_c.value = nc
  }

  doDraw(tick) {
    super.doDraw(tick)

    push()

    noStroke()
    fill(0)
    textAlign(CENTER, CENTER)
    textSize(18)
    text(this.icon, 0, 0)

    pop()
  }
}

const Op_And = register(
  "And",
  "C = A && B",
  class extends base_Simple {
    constructor(x = 0, y = 0) {
      super(x, y)

      this.action = (a, b) => a && b
      this.icon = "AND"
    }
  }
)

const Op_Or = register(
  "Or",
  "C = A || B",
  class extends base_Simple {
    constructor(x = 0, y = 0) {
      super(x, y)

      this.action = (a, b) => a || b
      this.icon = "OR"
    }
  }
)

const Op_Xor = register(
  "Xor",
  "C = A xor B",
  class extends base_Simple {
    constructor(x = 0, y = 0) {
      super(x, y)

      this.action = (a, b) => (a != b) && (a || b)
      this.icon = "XOR"
    }
  }
)

const Op_Not = register(
  "Not",
  "C = A not B",
  class extends base_Simple {
    constructor(x = 0, y = 0) {
      super(x, y)

      this.inputs.pop().kill()
      this.outputs.pop().kill()
      this._reorderIOs()

      this.inputs[0].name = "A"
      this.outputs[0].name = "!A"

      this.action = (a, b) => !a
      this.icon = "NOT"
    }
  }
)
