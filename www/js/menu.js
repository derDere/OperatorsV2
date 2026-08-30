var datMenu = null
var datMenuObj = null
var datMenuBlocker = null

// zuletzt vom Server geholte Beispiel-Dateinamen (www/examples/*.json)
var exampleFileNames = []

function initMenu() {
  datMenu = new dat.GUI()
  datMenu.title = "🏠 Menu"
  datMenuBlocker = new DatBlocker(datMenu)

  _rebuildMenu()
  datMenu.close()

  // Die Beispiel-Liste kommt vom Server und wird bei jedem Aufklappen des
  // Menues frisch geholt — neu abgelegte Dateien erscheinen so ohne Neuladen
  datMenu.onOpen(_refreshExamples)
  _refreshExamples()
}

function _rebuildMenu() {
  datMenuObj = {
    "📄 New": _newFile,
    "💾 Save As": _saveFile,
    "📂 Open File": _loadFile,
    "📤 Export": _exportFile,
    "📥 Import": _importFile,
    "🌐 Wiki": openWikiWindow,
    "👋 Welcome": showWelcome
  }

  let definitions = {}
  for (const fileName of exampleFileNames) {
    // Punkte im Schluessel wuerde edit() als Verschachtelung deuten — darum raus damit
    let key = 'example:' + fileName.replace(/\./g, '_')
    datMenuObj[key] = () => _loadExample(fileName)
    definitions[key] = {
      label: fileName.replace(/\.json$/i, ''),
      folder: '📚 Examples'
    }
  }

  datMenu.edit(datMenuObj, definitions)
}

// Holt die Beispiel-Liste vom Server; nur bei einer Aenderung wird das Menue
// neu aufgebaut. Ohne erreichbaren Server (Seite direkt aus dem Dateisystem
// geoeffnet) bleibt das Menue einfach ohne Beispiele.
function _refreshExamples() {
  fetch('/examples/')
    .then((response) => {
      if (!response.ok) throw new Error('HTTP ' + response.status)
      return response.json()
    })
    .then((names) => {
      if (!Array.isArray(names)) return
      if (JSON.stringify(names) == JSON.stringify(exampleFileNames)) return
      exampleFileNames = names
      _rebuildMenu()
    })
    .catch(() => {})
}

// Laedt nach Rueckfrage ein Beispiel vom Server und ersetzt damit die
// komplette Schaltung (dasselbe Format wie beim Datei-Oeffnen)
function _loadExample(fileName) {
  let label = fileName.replace(/\.json$/i, '')
  if (!confirm('Do you really want to load the example "' + label + '"? The current circuit will be replaced!')) {
    return
  }
  fetch('/examples/' + encodeURIComponent(fileName))
    .then((response) => {
      if (!response.ok) throw new Error('HTTP ' + response.status)
      return response.text()
    })
    .then((jj) => loadJsonToAll(jj))
    .catch((err) => alert('Loading the example failed: ' + err.message))
}

// Oeffnet das Wiki in einem eigenen Fenster ohne Browser-Menueleiste; auch die
// Willkommens-Meldung (js/welcome.js) verlinkt darauf
function openWikiWindow() {
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
  if (AllOperators.length <= 0) {
    return // eine leere Schaltung hat nichts zu verlieren
  }
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
