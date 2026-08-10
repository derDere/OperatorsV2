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

const Op_4bit_to_byte = register(
  "4bit to byte decoder",
  "Decodes 4bit into a byte signal",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)

      this.in1 = this.newInput("B0")
      this.in2 = this.newInput("B1")
      this.in3 = this.newInput("B2")
      this.in4 = this.newInput("B3")
  
      this.ouByte = this.newOutput("B")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)

      let b0 = !!(this.in1.value) ? 1 : 0
      let b1 = !!(this.in2.value) ? 1 : 0
      let b2 = !!(this.in3.value) ? 1 : 0
      let b3 = !!(this.in4.value) ? 1 : 0

      let v = 0
      v |= (b0 << 0)
      v |= (b1 << 1)
      v |= (b2 << 2)
      v |= (b3 << 3)

      this.ouByte.value = v
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)

      rotate(PI/2)
      textAlign(CENTER, CENTER)
      text("4bit to Byte", 0, 0)
      
      pop()
    }
  }
)

const Op_8bit_to_byte = register(
  "8bit to byte decoder",
  "Decodes 8bit into a byte signal",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)

      this.in1 = this.newInput("B0")
      this.in2 = this.newInput("B1")
      this.in3 = this.newInput("B2")
      this.in4 = this.newInput("B3")
      this.in5 = this.newInput("B4")
      this.in6 = this.newInput("B5")
      this.in7 = this.newInput("B6")
      this.in8 = this.newInput("B7")
  
      this.ouByte = this.newOutput("B")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)

      let b0 = !!(this.in1.value) ? 1 : 0
      let b1 = !!(this.in2.value) ? 1 : 0
      let b2 = !!(this.in3.value) ? 1 : 0
      let b3 = !!(this.in4.value) ? 1 : 0
      let b4 = !!(this.in5.value) ? 1 : 0
      let b5 = !!(this.in6.value) ? 1 : 0
      let b6 = !!(this.in7.value) ? 1 : 0
      let b7 = !!(this.in8.value) ? 1 : 0

      let v = 0
      v |= (b0 << 0)
      v |= (b1 << 1)
      v |= (b2 << 2)
      v |= (b3 << 3)
      v |= (b4 << 4)
      v |= (b5 << 5)
      v |= (b6 << 6)
      v |= (b7 << 7)

      this.ouByte.value = v
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)

      rotate(PI/2)
      textAlign(CENTER, CENTER)
      text("8bit to Byte", 0, 0)
      
      pop()
    }
  }
)

const Op_byte_to_4bit = register(
  "Byte to 4bit decoder",
  "Decodes a byte into 4bit",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)

      this.in1 = this.newInput("B")
  
      this.ouB1 = this.newOutput("B0")
      this.ouB2 = this.newOutput("B1")
      this.ouB3 = this.newOutput("B2")
      this.ouB4 = this.newOutput("B3")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)

      let v = this.in1.value & 255

      let b0 = !!(v & 1)
      let b1 = !!(v & 2)
      let b2 = !!(v & 4)
      let b3 = !!(v & 8)

      this.ouB1.value = b0
      this.ouB2.value = b1
      this.ouB3.value = b2
      this.ouB4.value = b3
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)

      rotate(PI/2)
      textAlign(CENTER, CENTER)
      text("Byte to 4bit", 0, 0)
      
      pop()
    }
  }
)

const Op_byte_to_8bit = register(
  "Byte to 8bit decoder",
  "Decodes a byte into 8bit",
  class extends Operator {
    
    constructor(x = 0, y = 0) {
      super(x, y)

      this.in1 = this.newInput("B")
  
      this.ouB1 = this.newOutput("B0")
      this.ouB2 = this.newOutput("B1")
      this.ouB3 = this.newOutput("B2")
      this.ouB4 = this.newOutput("B3")
      this.ouB5 = this.newOutput("B4")
      this.ouB6 = this.newOutput("B5")
      this.ouB7 = this.newOutput("B6")
      this.ouB8 = this.newOutput("B7")
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)

      let v = this.in1.value & 255

      let b0 = !!(v & 1)
      let b1 = !!(v & 2)
      let b2 = !!(v & 4)
      let b3 = !!(v & 8)
      let b4 = !!(v & 16)
      let b5 = !!(v & 32)
      let b6 = !!(v & 64)
      let b7 = !!(v & 128)

      this.ouB1.value = b0
      this.ouB2.value = b1
      this.ouB3.value = b2
      this.ouB4.value = b3
      this.ouB5.value = b4
      this.ouB6.value = b5
      this.ouB7.value = b6
      this.ouB8.value = b7
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      noStroke()
      fill(0)

      rotate(PI/2)
      textAlign(CENTER, CENTER)
      text("Byte to 8bit", 0, 0)
      
      pop()
    }
  }
)