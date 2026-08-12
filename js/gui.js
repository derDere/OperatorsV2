const DIALOG_VIEWPORT_MARGIN = 8

var newOpPos = null
var newOpDialogOpen = false

function initNewOperatorDialog() {
	for (let entryKey in OperatorRegistry) {
		let entry = OperatorRegistry[entryKey]
		let option = document.createElement('span')
		option.className = "new-entry-option"
		option.value = entry.name
		option.innerText = entry.name
		newOperatorSelection.appendChild(option)
	}

	newOperatorSelection.addEventListener('change', operatorSelected)
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
	let key = newOperatorSelection.value
	if (key in OperatorRegistry) {
		let entry = OperatorRegistry[key]
		new entry.classFnk(newOpPos.x, newOpPos.y)
		newOperatorDialog.hidePopover()
		newOpPos = null
	}
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