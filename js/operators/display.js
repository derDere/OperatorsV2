const Op_Lamp = register(
  "Lamp",
  "Displays a state of ON or OFF",
  class extends Placeable {
    
    constructor(x = 0, y = 0) {
      super(x, y)
  
      this.state = false
  
      this.in = this.newInput("I")
    }

    getEle(callback) {
        if (this.state) {
            return '<div class="lamp-on"></div>'
        }
        else {
            return '<div class="lamp-off"></div>'
        }
    }
  
    doUpdate(tick) {
      super.doUpdate(tick)
      
      this.state = !!(this.in.value)
    }
  
    doDraw(tick) {
      super.doDraw(tick)
      
      push()
  
      stroke(0)
      if (this.state) {
        fill(255, 0, 0)
      } else {
        fill(100)
      }
      circle(0, 0, 30)
      noStroke()
      if (this.state) {
        fill(255, 255, 255, 30)
        for(let i = 27; i > 5; i-=3) {
            circle(0, 0, 30 - i)
        }
      }

      noStroke()
      fill(0)
      textAlign(CENTER, CENTER)
      textSize(10)
      text('LAMP', 0, -21)
      text(this.state ? 'ON' : 'OFF', 0, 23)
      
      pop()
    }
  }
)