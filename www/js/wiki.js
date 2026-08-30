// Wiki-Navigation: lädt Markdown-Seiten als fertige HTML-Fragmente vom
// Server (/wiki/<seite>) in den Inhaltsbereich von wiki.html. Welche Seite
// gezeigt wird, steht im URL-Hash (#<sprache>/<seite>) — die Links im
// Markdown sind serverseitig bereits auf solche Hash-Links umgeschrieben,
// darum laufen Navigation und Browser-Zurück über das hashchange-Ereignis.
//
// Das Wiki ist mehrsprachig: Die Inhalte liegen je Sprache in einem eigenen
// Baum (wiki/de/**, wiki/en/**) mit identischen Datei-Pfaden — das erste
// Segment des Hashs wählt den Baum. Hash-Links ohne Sprachsegment bekommen
// die erkannte Sprache vorangestellt: gespeicherte Auswahl aus dem
// Dropdown der Kopfleiste, sonst die Browsersprache (js/lang.js). Das
// lang-Attribut der Seite folgt immer der angezeigten Seite — daran
// orientiert sich auch die Suche (wiki_search.js wählt darüber den
// Pagefind-Sprachindex).
//
// Nach jedem Laden werden die Demo-Container (.operator-demo, erzeugt vom
// Server aus operatorsv2-Codeblöcken) mit OperatorDemo-Instanzen belebt und
// beim Seitenwechsel wieder abgeräumt.

// Oberflächentexte des Wrappers je Sprache
const WIKI_STRINGS = {
	de: {
		pageMissing: (page) => "Seite '" + page + "' gibt es nicht.",
		pageFailedStatus: (page, status) => "Seite '" + page + "' konnte nicht geladen werden (" + status + ").",
		pageFailed: (page, message) => "Seite '" + page + "' konnte nicht geladen werden: " + message,
		backTitle: 'Zurück zur vorherigen Seite',
		langTitle: 'Sprache des Wikis'
	},
	en: {
		pageMissing: (page) => "The page '" + page + "' does not exist.",
		pageFailedStatus: (page, status) => "The page '" + page + "' could not be loaded (" + status + ").",
		pageFailed: (page, message) => "The page '" + page + "' could not be loaded: " + message,
		backTitle: 'Back to the previous page',
		langTitle: 'Wiki language'
	}
}

var wikiContentEle = null
var wikiTitleEle = null
var wikiLangEle = null
var wikiLangCurrentEle = null
var wikiLangOptionsEle = null
var activeDemos = []
var wikiLoadCounter = 0

// Seitenpfad aus dem Hash, immer mit Sprachsegment: "de/operatoren/index".
// Sprachlose Hashes (leer oder Links aus alten Lesezeichen) bekommen die
// erkannte Sprache vorangestellt.
function currentHashPage() {
	let page = decodeURIComponent(location.hash.replace(/^#/, ''))
	page = page.replace(/^\/+|\/+$/g, '')
	let first = page.split('/')[0]
	if (!WIKI_LANGUAGES.includes(first)) {
		page = detectLanguage() + (page.length > 0 ? '/' + page : '/index')
	}
	if (page.split('/').length < 2) {
		page += '/index'
	}
	return page
}

function pageLanguage(page) {
	return page.split('/')[0]
}

// Wechselt auf denselben Seitenpfad im anderen Sprachbaum und merkt sich die Wahl
function switchLanguage(newLang) {
	storeLanguage(newLang)
	let rest = currentHashPage().split('/').slice(1).join('/')
	location.hash = '#' + newLang + '/' + rest
}

// Kopfleiste und Seitensprache an die angezeigte Seite angleichen
function applyLanguage(lang) {
	document.documentElement.lang = lang
	let strings = WIKI_STRINGS[lang]
	document.getElementById('wiki-back').title = strings.backTitle
	wikiLangCurrentEle.title = strings.langTitle
	wikiTitleEle.href = '#' + lang + '/index'

	// Der Sprach-Knopf trägt die Flagge der angezeigten Sprache (Kopie aus
	// der Auswahlliste), die zugehörige Option wird markiert
	for (const option of wikiLangOptionsEle.querySelectorAll('button[data-lang]')) {
		let active = option.dataset.lang == lang
		option.classList.toggle('active', active)
		if (active) {
			wikiLangCurrentEle.innerHTML = option.innerHTML
		}
	}

	if (typeof updateWikiSearchLanguage === 'function') {
		updateWikiSearchLanguage(lang)
	}
}

function killActiveDemos() {
	for (const demo of [...activeDemos]) {
		demo.kill()
	}
	activeDemos = []
}

function initDemos() {
	let blocks = wikiContentEle.querySelectorAll('.operator-demo')
	let count = 0
	for (const block of blocks) {
		count += 1
		block.id = 'operator-demo-' + count
		let jsonEle = block.querySelector('script[type="application/json"]')
		let jj = jsonEle ? jsonEle.textContent : ''
		activeDemos.push(new OperatorDemo(block.id, jj))
	}
}

function showWikiError(message) {
	wikiContentEle.innerHTML = ''
	let errorBox = document.createElement('div')
	errorBox.className = 'wiki-error'
	errorBox.innerText = message
	wikiContentEle.appendChild(errorBox)
}

async function loadWikiPage(page) {
	// Zähler gegen überholende Ladevorgänge: nur der jüngste darf den Inhalt setzen
	let loadId = ++wikiLoadCounter

	let strings = WIKI_STRINGS[pageLanguage(page)]
	applyLanguage(pageLanguage(page))

	killActiveDemos()

	let html = null
	let errorMessage = null
	try {
		let response = await fetch('/wiki/' + page)
		if (response.ok) {
			html = await response.text()
		}
		else if (response.status === 404) {
			errorMessage = strings.pageMissing(page)
		}
		else {
			errorMessage = strings.pageFailedStatus(page, response.status)
		}
	}
	catch (err) {
		errorMessage = strings.pageFailed(page, err.message)
	}

	if (loadId != wikiLoadCounter) {
		return
	}

	if (errorMessage !== null) {
		showWikiError(errorMessage)
		return
	}

	wikiContentEle.innerHTML = html
	initDemos()
	window.scrollTo(0, 0)
}

// Erst nach dem load-Ereignis starten — dann sind die p5-Instanzen
// (op_demo.js) bereit und die Demos können sofort erzeugt werden
window.addEventListener('load', () => {
	wikiContentEle = document.getElementById('wiki-content')
	wikiTitleEle = document.getElementById('wiki-title')
	wikiLangEle = document.getElementById('wiki-lang')
	wikiLangCurrentEle = document.getElementById('wiki-lang-current')
	wikiLangOptionsEle = document.getElementById('wiki-lang-options')

	window.addEventListener('hashchange', () => loadWikiPage(currentHashPage()))
	loadWikiPage(currentHashPage())

	// Zurück-Knopf im Kopfbereich: Das Wiki-Fenster öffnet oft ohne
	// Browser-Menüleiste, darum gibt es den Zurück-Schritt hier als Knopf
	document.getElementById('wiki-back').addEventListener('click', () => history.back())

	// Sprachwahl: Der Flaggen-Knopf klappt die Flaggenliste auf, ein Klick
	// auf eine Flagge wechselt zur selben Seite im anderen Sprachbaum
	wikiLangCurrentEle.addEventListener('click', () => {
		wikiLangOptionsEle.hidden = !wikiLangOptionsEle.hidden
	})
	for (const option of wikiLangOptionsEle.querySelectorAll('button[data-lang]')) {
		option.addEventListener('click', () => {
			wikiLangOptionsEle.hidden = true
			switchLanguage(option.dataset.lang)
		})
	}
	document.addEventListener('pointerdown', (event) => {
		if (!wikiLangEle.contains(event.target)) {
			wikiLangOptionsEle.hidden = true
		}
	})
})
