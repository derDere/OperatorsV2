// Wiki-Suche: baut beim Serverstart mit Pagefind einen Volltext-Index über
// alle Markdown-Seiten des Wiki-Ordners und liefert die Index-Dateien unter
// /pagefind/ aus. Der Index lebt komplett im Speicher — die Ordner www und
// wiki bleiben unangetastet (im Container sind sie read-only gemountet).
//
// Ablauf beim Start (buildIndex):
//   1. Alle .md-Dateien unter dem Wiki-Root einsammeln.
//   2. Jede Seite mit derselben Markdown-Pipeline wie die Wiki-Route rendern
//      (wiki.js exportiert renderMarkdown) und als virtuelle HTML-Seite an
//      Pagefind übergeben. Die Demo-Blöcke tragen data-pagefind-ignore und
//      bleiben dadurch außen vor.
//   3. Die fertigen Index-Dateien per getFiles() in eine Map übernehmen.
//
// Mehrsprachigkeit: Die Wiki-Inhalte liegen je Sprache in einem eigenen
// Baum (wiki/de/**, wiki/en/**). Das erste Pfadsegment bestimmt das
// lang-Attribut der indexierten Seite — Pagefind baut daraus von selbst
// einen getrennten Index samt Wortstamm-Erkennung je Sprache, und der
// Browser-Client wählt den Index über das lang-Attribut von wiki.html.
//
// Die Seiten-URLs im Index entsprechen den Hash-Seiten des Wiki-Frontends
// ("/de/grundlagen/steuerung" → "#de/grundlagen/steuerung") — das Suchfeld
// in wiki.html (www/js/wiki_search.js) übersetzt Treffer direkt in
// Hash-Links.

const fs = require('fs')
const path = require('path')
const wiki = require('./wiki')

const ROUTE_PREFIX = '/pagefind/'

const INDEX_MIME_TYPES = {
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.wasm': 'application/wasm'
}

// Index-Dateien nach Pfad (z. B. "pagefind.js"), befüllt von buildIndex
const _files = new Map()
let _ready = false

/** Alle Markdown-Seiten unterhalb von dir, als Pfade relativ zum Wiki-Root */
async function _collectMarkdownFiles(dir, relPrefix = '') {
	let pages = []
	let entries = await fs.promises.readdir(dir, { withFileTypes: true })
	for (const entry of entries) {
		let rel = relPrefix + entry.name
		if (entry.isDirectory()) {
			pages = pages.concat(await _collectMarkdownFiles(path.join(dir, entry.name), rel + '/'))
		}
		else if (entry.isFile() && rel.toLowerCase().endsWith('.md')) {
			pages.push(rel)
		}
	}
	return pages
}

/** Baut den Suchindex über alle Wiki-Seiten auf; Fehler lassen den Server weiterlaufen */
async function buildIndex() {
	try {
		// pagefind ist ein reines ES-Modul — aus diesem CommonJS-Modul per dynamischem import() laden
		const pagefind = await import('pagefind')
		const { index } = await pagefind.createIndex()

		let pages = await _collectMarkdownFiles(wiki.WIKI_ROOT)
		for (const rel of pages) {
			let text = await fs.promises.readFile(path.join(wiki.WIKI_ROOT, rel), 'utf8')
			let fragment = await wiki.renderMarkdown(rel, text)
			let url = '/' + rel.slice(0, -3) // ohne .md — entspricht der Hash-Seite im Frontend
			// das erste Pfadsegment ist der Sprachbaum (wiki/de/**, wiki/en/**)
			let first = rel.split('/')[0]
			let lang = /^[a-z]{2}(-[a-z]{2})?$/i.test(first) ? first : 'en'
			let content = '<!DOCTYPE html><html lang="' + lang + '"><head><meta charset="utf-8"></head><body>' + fragment + '</body></html>'
			let { errors } = await index.addHTMLFile({ url: url, content: content })
			if (errors && errors.length > 0) {
				console.error('Suche: Seite ' + rel + ' konnte nicht indexiert werden:', errors)
			}
		}

		const { files } = await index.getFiles()
		for (const file of files) {
			_files.set(file.path, file.content)
		}
		await pagefind.close()

		_ready = true
		console.log('Suche: Index über ' + pages.length + ' Wiki-Seiten aufgebaut (' + _files.size + ' Dateien)')
	}
	catch (err) {
		console.error('Suche: Indexaufbau fehlgeschlagen — die Wiki-Suche bleibt aus', err)
	}
}

/** Fühlt sich dieses Modul für die Anfrage zuständig? */
function handles(req) {
	return req.url.startsWith(ROUTE_PREFIX)
}

function handleRequest(req, res) {
	let urlPath
	try {
		urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
	}
	catch {
		res.writeHead(400)
		res.end('Bad Request')
		return
	}

	if (!_ready) {
		// Der Index entsteht direkt nach dem Serverstart — kurz darauf noch einmal versuchen
		res.writeHead(503, { 'Retry-After': '2' })
		res.end('Search index is still being built')
		return
	}

	let rel = urlPath.substring(ROUTE_PREFIX.length)
	let content = _files.get(rel)
	if (content === undefined) {
		res.writeHead(404)
		res.end('Not Found')
		return
	}

	let mime = INDEX_MIME_TYPES[path.extname(rel).toLowerCase()] || 'application/octet-stream'
	res.writeHead(200, { 'Content-Type': mime })
	res.end(Buffer.from(content))
}

module.exports = { buildIndex, handles, handleRequest }
