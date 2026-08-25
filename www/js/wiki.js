// Wiki-Navigation: lädt Markdown-Seiten als fertige HTML-Fragmente vom
// Server (/wiki/<seite>) in den Inhaltsbereich von wiki.html. Welche Seite
// gezeigt wird, steht im URL-Hash (#ordner/seite) — die Links im Markdown
// sind serverseitig bereits auf solche Hash-Links umgeschrieben, darum
// laufen Navigation und Browser-Zurück über das hashchange-Ereignis.
//
// Nach jedem Laden werden die Demo-Container (.operator-demo, erzeugt vom
// Server aus operatorsv2-Codeblöcken) mit OperatorDemo-Instanzen belebt und
// beim Seitenwechsel wieder abgeräumt.

var wikiContentEle = null
var activeDemos = []
var wikiLoadCounter = 0

function currentHashPage() {
	let page = decodeURIComponent(location.hash.replace(/^#/, ''))
	page = page.replace(/^\/+|\/+$/g, '')
	if (page.length <= 0) {
		page = 'index'
	}
	return page
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
	let box = document.createElement('div')
	box.className = 'wiki-error'
	box.innerText = message
	wikiContentEle.appendChild(box)
}

async function loadWikiPage(page) {
	// Zähler gegen überholende Ladevorgänge: nur der jüngste darf den Inhalt setzen
	let loadId = ++wikiLoadCounter

	killActiveDemos()

	let html = null
	let errorMessage = null
	try {
		let response = await fetch('/wiki/' + page)
		if (response.ok) {
			html = await response.text()
		}
		else if (response.status === 404) {
			errorMessage = "Seite '" + page + "' gibt es nicht."
		}
		else {
			errorMessage = "Seite '" + page + "' konnte nicht geladen werden (" + response.status + ")."
		}
	}
	catch (err) {
		errorMessage = "Seite '" + page + "' konnte nicht geladen werden: " + err.message
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
	window.addEventListener('hashchange', () => loadWikiPage(currentHashPage()))
	loadWikiPage(currentHashPage())
})
