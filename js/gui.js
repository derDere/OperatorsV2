const DIALOG_VIEWPORT_MARGIN = 8

var newOpPos = null
var newOpDialogOpen = false

function initNewOperatorDialog() {
	for (let entryKey in OperatorRegistry) {
		let entry = OperatorRegistry[entryKey]
		let option = document.createElement('option')
		option.value = entry.name
		option.innerText = entry.name
		newOperatorSelection.appendChild(option)
	}

	newOperatorSelection.addEventListener('change', operatorSelected)
	newOperatorDialog.addEventListener('toggle', _dialogToggled)
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

function addNewOperator(event) {
	newOpPos = mousePos.copy()
	newOpDialogOpen = true
	newOperatorSelection.value = '__NONE__'
	newOperatorDialog.showPopover()
	_moveDialogTo(event.clientX, event.clientY)
}

function _moveDialogTo(clientX, clientY) {
	let bounds = newOperatorDialog.getBoundingClientRect()
	clientX -= (bounds.width / 2)
	clientY -= (bounds.height / 2)
	let maxLeft = windowWidth - bounds.width - DIALOG_VIEWPORT_MARGIN
	let maxTop = windowHeight - bounds.height - DIALOG_VIEWPORT_MARGIN

	newOperatorDialog.style.left = max(DIALOG_VIEWPORT_MARGIN, min(clientX, maxLeft)) + 'px'
	newOperatorDialog.style.top = max(DIALOG_VIEWPORT_MARGIN, min(clientY, maxTop)) + 'px'
}