const Op_Pulse = register(
  "Pulse",
  "Gives a 1 Tick pulse on state change",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)
  
      this.last = false
      
      this.in_s = this.newInput("A")
  
      this.out_p_u = this.newOutput("U")
      this.out_p_d = this.newOutput("D")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)
  
      let inputState = !!(this.in_s.value)

      let flankUp = false
      let flankDown = false
      
      if (inputState != this.last) {
        if (inputState) {
            flankUp = true
        }
        else {
            flankDown = true
        }
      }
      
      this.out_p_u.value = flankUp
      this.out_p_d.value = flankDown

      this.last = inputState
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)
      textAlign(CENTER, CENTER)
      textSize(12)
      text('PULSE', 0, 0)
      
      pop()
    }
  }
)

const Op_RsFlipFlop = register(
  "RS FlipFlop",
  "Sets or Resets a state permanently via inputs",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)
  
      this.state = false
      
      this.in_s = this.newInput("S")
      this.in_r = this.newInput("R")
  
      this.out_o = this.newOutput("Q")
      this.out_no = this.newOutput("!Q")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)
  
      let s = !!(this.in_s.value)
      let r = !!(this.in_r.value)
      
      if (s) {
        this.state = true
      }
      else if (r) {
        this.state = false
      }
      
      this.out_o.value = this.state
      this.out_no.value = !this.state
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)
      textAlign(CENTER, BOTTOM)
      textSize(18)
      text('R/S', 0, 5)
      textAlign(CENTER, TOP)
      textSize(10)
      text('FlipFlop', 0, 5)
      
      pop()
    }
  }
)

const Op_TFlipFlop = register(
  "T FlipFlop",
  "Toggles a state permanently via inputs",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)
  
      this.state = false
      this.last = false
      
      this.in_t = this.newInput("T")
  
      this.out_o = this.newOutput("Q")
      this.out_no = this.newOutput("!Q")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)
  
      let t = !!(this.in_t.value)
      
      if (t != this.last) {
        if (t) {
            this.state = !this.state
        }
      }

      this.last = t
      
      this.out_o.value = this.state
      this.out_no.value = !this.state
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)
      textAlign(CENTER, BOTTOM)
      textSize(18)
      text('T', 0, 5)
      textAlign(CENTER, TOP)
      textSize(10)
      text('FlipFlop', 0, 5)
      
      pop()
    }
  }
)

const Op_Memory = register(
  "Memory",
  "Stores 1bit of memory when triggered",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)
  
      this.state = false
      this.last = false
      
      this.in_v = this.newInput("B1")
      this.in_t = this.newInput("T")
  
      this.out_b = this.newOutput("B")
      this.out_nb = this.newOutput("!B")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)
  
      let v = !!(this.in_v.value)
      let t = !!(this.in_t.value)
      
      if (t != this.last) {
        if (t) {
            this.state = v
        }
      }

      this.last = t
      
      this.out_b.value = this.state
      this.out_nb.value = !this.state
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)
      textAlign(CENTER, BOTTOM)
      textSize(18)
      text(this.state ? '1' : '0', 0, 5)
      textAlign(CENTER, TOP)
      textSize(10)
      text('Memory', 0, 5)
      
      pop()
    }
  }
)