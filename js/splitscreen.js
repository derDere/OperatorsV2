const SPLITTER_WIDTH = 5

var isSplitterDragging = false
var splitterDragOffset = 0

function SplitterMouseMove(event) {
    if (isSplitterDragging) {
        let newSpace = event.clientX - splitterDragOffset
        let spaceP = (newSpace + SPLITTER_WIDTH) / windowWidth
        screenSplit = spaceP
        resizeCanvas(updateSplitter(), windowHeight)
        return false
    }
    return true
}

function SplitterMouseDown(event) {
    let space = parseInt(appgui_splitter.dataset.space)
    isSplitterDragging = true
    splitterDragOffset = event.clientX - space
    return false
}

function SplitterMouseUp() {
    isSplitterDragging = false
    splitterDragOffset = 0
    return false
}

function initSplitter() {
    appgui_splitter.style.width = SPLITTER_WIDTH + 'px'
    appgui_splitter.addEventListener('mousedown', SplitterMouseDown)
    document.body.addEventListener('mouseup', SplitterMouseUp)
    document.body.addEventListener('mousemove', SplitterMouseMove)
}