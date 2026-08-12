const DIALOG_VIEWPORT_MARGIN = 8

var newOpPos = null
var newOpDialogOpen = false
var toolTip = null
var toolTipTitle = null
var toolTipBody = null

function showToolTip() {
	toolTip.style.display = 'block'
	toolTipTitle.innerText = this.name
	toolTipBody.innerText = this.description
}

function hideToolTip() {
	toolTip.style.display = 'none'
}

function initNewOperatorDialog() {
	toolTip = document.getElementById('dialog-info-box')
	toolTipTitle = document.getElementById('dialog-info-box-title')
	toolTipBody = document.getElementById('dialog-info-box-body')
	for (let entryKey in OperatorRegistry) {
		let entry = OperatorRegistry[entryKey]
		let option = document.createElement('span')
		option.className = "new-entry-option"
		option.dataset.entryName = entry.name
		let ctx = new p5(p => {
			let e = new entry.classFnk(0, 0)
			p.setup = () => {
				let can = ctx.createCanvas(ctx.max(e.width + 20, 50), ctx.max(e.height + 10, 50))
				can.parent(option)
			}
			p.draw = () => {
				ctx.background('transparent')
				ctx.translate(ctx.width / 2 - 10, ctx.height / 2)
				e.borderWeight = ctx.max(e.height / 60, 1)
				e.draw(0, ctx)
				ctx.noLoop()
				e.kill()
			}
		})
		option.addEventListener('mouseover', showToolTip.bind(entry))
		option.addEventListener('mouseleave', hideToolTip.bind(entry))
		option.addEventListener('click', operatorSelected.bind(entry))
		newOperatorSelection.appendChild(option)
	}

	newOperatorDialog.addEventListener('toggle', _dialogToggled)
}

function _selectionMouseEnter(event) {
	mainP5.print(event)
}

function _dialogToggled(event) {
	newOpDialogOpen = event.newState === 'open'
	if (!newOpDialogOpen) {
		newOpPos = null
	}
}

function operatorSelected(event) {
	new this.classFnk(newOpPos.x, newOpPos.y)
	newOperatorDialog.hidePopover()
	newOpPos = null
}

function addNewOperator(event, p5ctx) {
	newOpPos = mousePos.copy()
	newOpDialogOpen = true
	newOperatorSelection.value = '__NONE__'
	newOperatorDialog.showPopover()
	_moveDialogTo(event.clientX, event.clientY, p5ctx)
}

function _moveDialogTo(clientX, clientY, p5ctx) {
	let bounds = newOperatorDialog.getBoundingClientRect()
	clientX -= (bounds.width / 2)
	clientY -= (bounds.height / 2)
	let maxLeft = p5ctx.windowWidth - bounds.width - DIALOG_VIEWPORT_MARGIN
	let maxTop = p5ctx.windowHeight - bounds.height - DIALOG_VIEWPORT_MARGIN

	newOperatorDialog.style.left = p5ctx.max(DIALOG_VIEWPORT_MARGIN, p5ctx.min(clientX, maxLeft)) + 'px'
	newOperatorDialog.style.top = p5ctx.max(DIALOG_VIEWPORT_MARGIN, p5ctx.min(clientY, maxTop)) + 'px'
}