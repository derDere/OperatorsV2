// Sprachwahl der Anwendung, gemeinsam genutzt von Wiki und Editor.
//
// Beide Seiten — wiki.html und index.html — lesen dieselbe gemerkte Wahl aus
// dem localStorage. Dadurch richtet sich die Willkommens-Tour des Editors nach
// der Sprache, die im Wiki-Dropdown gewählt wurde. Ohne gemerkte Wahl
// entscheidet die Browsersprache, und wenn auch die keine der Sprachen nennt,
// der Fallback.
//
// Der Editor selbst hat bewusst keine eigene Sprachwahl: Er zeigt nur die
// Willkommens-Tour übersetzt, seine übrige Oberfläche bleibt englisch.

const WIKI_LANGUAGES = ['de', 'en']
const WIKI_LANGUAGE_FALLBACK = 'en'
const WIKI_LANGUAGE_STORAGE_KEY = 'operatorsv2-wiki-lang'

// Erkennt die gewünschte Sprache: gemerkte Wahl vor Browsersprache
function detectLanguage() {
	let stored = null
	try {
		stored = localStorage.getItem(WIKI_LANGUAGE_STORAGE_KEY)
	}
	catch { }
	if (WIKI_LANGUAGES.includes(stored)) {
		return stored
	}
	for (const nav of (navigator.languages || [navigator.language || ''])) {
		let short = String(nav).toLowerCase().split('-')[0]
		if (WIKI_LANGUAGES.includes(short)) {
			return short
		}
	}
	return WIKI_LANGUAGE_FALLBACK
}

// Merkt die Sprachwahl. Andere bereits geöffnete Fenster derselben Anwendung
// erfahren davon über das storage-Ereignis und stellen sich sofort um.
function storeLanguage(lang) {
	try {
		localStorage.setItem(WIKI_LANGUAGE_STORAGE_KEY, lang)
	}
	catch { }
}
