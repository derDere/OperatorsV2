var datMenu = null
var datMenuObj = null
var datMenuBlocker = null

function initMenu() {
  datMenuObj = {
    "💾 Save As": _saveFile,
    "📂 Open File": _loadFile,
    "🌐 Wiki": _gotoWiki
  }

  datMenu = new dat.GUI()
  datMenu.title = "🏠 Menu"
  datMenuBlocker = new DatBlocker(datMenu)

  datMenu.edit(datMenuObj)
  datMenu.open()
}

function _gotoWiki() {
  const zielUrl = "/wiki.html"
  const fensterName = "Operator V2 - Wiki"
  const einstellungen = "width=1000,height=1000,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes"
  window.open(zielUrl, fensterName, einstellungen);
}

function _saveFile() {
  let jj = allOperatorsToJson()

  const blob = new Blob([jj], { type: "application/zip;charset=utf-8" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "Unknown.json"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(link.href)
}

function _loadFile() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'

  input.onchange = function (event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = function (e) {
      jj = e.target.result
      loadJsonToAll(jj)
    }

    reader.readAsText(file)
  }

  input.click()
}