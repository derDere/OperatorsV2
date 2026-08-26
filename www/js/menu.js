var datMenu = null
var datMenuObj = null
var datMenuBlocker = null

function initMenu() {
  datMenuObj = {
    "📄 New": _newFile,
    "💾 Save As": _saveFile,
    "📂 Open File": _loadFile,
    "📤 Export": _exportFile,
    "📥 Import": _importFile,
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

function _downloadJson(jj, fileName) {
  const blob = new Blob([jj], { type: "application/zip;charset=utf-8" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(link.href)
}

function _pickJsonFile(onLoaded) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'

  input.onchange = function (event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = function (e) {
      onLoaded(e.target.result)
    }

    reader.readAsText(file)
  }

  input.click()
}

// Leert die komplette Schaltung und setzt die Ansicht auf den Ursprung
function _newFile() {
  if (!confirm("Do you really want to remove everything?!")) {
    return
  }
  for (const op of [...AllOperators]) {
    op.kill()
  }
  for (const con of [...AllConnections]) {
    if (con == mouseConnection) continue
    con.kill()
  }
  selectedOperators = []
  updateProps(null)
  dragOffset.x = 0
  dragOffset.y = 0
}

function _saveFile() {
  _downloadJson(allOperatorsToJson(), "Unknown.json")
  lastSaveTime = Date.now()
}

// Beim Verlassen der Seite warnt der Browser-eigene Dialog, wenn das letzte
// Speichern laenger als diese Spanne zurueckliegt (der Seitenstart zaehlt
// als frisch gespeichert)
const UNSAVED_WARNING_MS = 60 * 1000
var lastSaveTime = Date.now()

window.addEventListener('beforeunload', (e) => {
  if ((Date.now() - lastSaveTime) > UNSAVED_WARNING_MS) {
    e.preventDefault()
    e.returnValue = ''
  }
})

function _loadFile() {
  _pickJsonFile(jj => loadJsonToAll(jj))
}

// Exportiert die Auswahl samt der Verbindungen dazwischen; ohne Auswahl die
// ganze Schaltung. Das Dateiformat ist dasselbe wie beim Speichern.
function _exportFile() {
  let ops = (selectedOperators.length > 0) ? selectedOperators : AllOperators
  _downloadJson(JSON.stringify(operatorsToJsonData(ops)), "Export.json")
}

// Fuegt den Dateiinhalt mittig in der Ansicht der laufenden Schaltung hinzu,
// ohne sie zu leeren
function _importFile() {
  _pickJsonFile(jj => addJsonDataCentered(JSON.parse(jj)))
}
