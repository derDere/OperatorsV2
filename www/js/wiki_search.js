// Wiki-Suche (Kopfleiste von wiki.html): Volltextsuche über alle Wiki-Seiten
// auf Basis von Pagefind. Der Server baut den Index beim Start auf und
// liefert ihn unter /pagefind/ aus (server/search.js); dieses Skript lädt
// die Pagefind-Bibliothek erst bei der ersten Eingabe nach und zeigt die
// Treffer als aufklappbare Liste unter dem Suchfeld. Die Treffer-URLs
// entsprechen den Hash-Seiten der Wiki-Navigation (wiki.js) — ein Klick
// navigiert also ganz normal per Hash-Link.

const SEARCH_MAX_RESULTS = 8
const SEARCH_DEBOUNCE_MS = 200

var searchInputEle = null
var searchResultsEle = null
var _pagefindPromise = null
var _searchCounter = 0

// Lädt die Pagefind-Bibliothek beim ersten Bedarf; schlägt der Abruf fehl
// (der Index entsteht direkt nach dem Serverstart), wird beim nächsten
// Tastendruck erneut versucht
function _getPagefind() {
	if (!_pagefindPromise) {
		_pagefindPromise = import('/pagefind/pagefind.js')
		_pagefindPromise.catch(() => { _pagefindPromise = null })
	}
	return _pagefindPromise
}

function _hideSearchResults() {
	searchResultsEle.hidden = true
}

function _showSearchMessage(message) {
	searchResultsEle.innerHTML = ''
	let ele = document.createElement('div')
	ele.className = 'wiki-search-message'
	ele.innerText = message
	searchResultsEle.appendChild(ele)
	searchResultsEle.hidden = false
}

// Treffer-URL → Seitenname der Hash-Navigation ("/grundlagen/steuerung" → "grundlagen/steuerung")
function _resultUrlToPage(url) {
	return url.replace(/\.html$/i, '').replace(/^\/+|\/+$/g, '')
}

function _buildResultLink(result) {
	let link = document.createElement('a')
	link.className = 'wiki-search-result'
	link.href = '#' + _resultUrlToPage(result.url)
	link.addEventListener('click', () => _hideSearchResults())

	let title = document.createElement('span')
	title.className = 'wiki-search-result-title'
	title.innerText = result.meta.title || _resultUrlToPage(result.url)
	link.appendChild(title)

	let excerpt = document.createElement('span')
	excerpt.className = 'wiki-search-result-excerpt'
	excerpt.innerHTML = result.excerpt // vom eigenen Index erzeugt; <mark> hebt die Fundstellen hervor
	link.appendChild(excerpt)

	return link
}

async function _runSearch() {
	let term = searchInputEle.value.trim()
	let searchId = ++_searchCounter

	if (term.length <= 0) {
		_hideSearchResults()
		return
	}

	let pagefind
	try {
		pagefind = await _getPagefind()
	}
	catch {
		if (searchId == _searchCounter) {
			_showSearchMessage('Die Suche wird gerade vorbereitet — gleich noch einmal tippen.')
		}
		return
	}

	let search = await pagefind.debouncedSearch(term, {}, SEARCH_DEBOUNCE_MS)
	if (search === null || searchId != _searchCounter) {
		return // eine neuere Eingabe hat diese Suche überholt
	}

	let results = await Promise.all(search.results.slice(0, SEARCH_MAX_RESULTS).map(r => r.data()))
	if (searchId != _searchCounter) {
		return
	}

	if (results.length <= 0) {
		_showSearchMessage("Keine Treffer für '" + term + "'.")
		return
	}

	searchResultsEle.innerHTML = ''
	for (const result of results) {
		searchResultsEle.appendChild(_buildResultLink(result))
	}
	searchResultsEle.hidden = false
}

window.addEventListener('load', () => {
	searchInputEle = document.getElementById('wiki-search')
	searchResultsEle = document.getElementById('wiki-search-results')

	searchInputEle.addEventListener('input', () => _runSearch())

	// Fokus mit vorhandenem Text klappt die Liste wieder auf
	searchInputEle.addEventListener('focus', () => {
		if (searchInputEle.value.trim().length > 0) {
			_runSearch()
		}
	})

	searchInputEle.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			_hideSearchResults()
			searchInputEle.blur()
		}
		if (event.key === 'Enter') {
			// Enter öffnet den ersten Treffer
			let first = searchResultsEle.querySelector('a.wiki-search-result')
			if (first) {
				first.click()
			}
		}
	})

	// Klick außerhalb des Suchbereichs klappt die Liste zu
	document.addEventListener('pointerdown', (event) => {
		if (!document.getElementById('wiki-search-box').contains(event.target)) {
			_hideSearchResults()
		}
	})

	// Seitenwechsel (auch über den Zurück-Knopf) schließt die Liste
	window.addEventListener('hashchange', () => _hideSearchResults())
})
