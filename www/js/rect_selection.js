var selectionStartPoint = null
var selectionBounds = null

function startSelection(event, p5ctx) {
  selectionStartPoint = mousePos.copy()
}

function stopSelection(p5ctx) {
  selectionStartPoint = null
  selectionBounds = null
}

function IsInBounds(p) {
  if (!selectionBounds) return false
  if (p.x < selectionBounds.x) return false
  if (p.y < selectionBounds.y) return false
  if (p.x >= (selectionBounds.x + selectionBounds.w)) return false
  if (p.y >= (selectionBounds.y + selectionBounds.h)) return false
  return true
}

function updateSelection(p5ctx) {
  if (!!selectionStartPoint) {
    let tlx = p5ctx.min(mousePos.x, selectionStartPoint.x)
    let tly = p5ctx.min(mousePos.y, selectionStartPoint.y)
    let brx = p5ctx.max(mousePos.x, selectionStartPoint.x)
    let bry = p5ctx.max(mousePos.y, selectionStartPoint.y)

    let w = brx - tlx
    let h = bry - tly

    selectionBounds = {
      x: tlx,
      y: tly,
      w: w,
      h: h
    }

    selectedOperators = []
    for (const c of AllControls) {
      if (!c.isSelectable) continue
      if (IsInBounds(c.pos)) {
        selectedOperators.push(c)
      }
    }
    if (selectedOperators.length >= 1) {
      updateProps(selectedOperators[0])
    }
  }
}

function drawSelection(p5ctx) {
  if (!selectionBounds) return

  p5ctx.push()
  p5ctx.stroke('#0080ff')
  p5ctx.strokeWeight(2 / zoomScale)

  p5ctx.fill('#0080ff40')

  p5ctx.rect(
    selectionBounds.x,
    selectionBounds.y,
    selectionBounds.w,
    selectionBounds.h
  )

  p5ctx.pop()
}