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
//
// NEU-INDEXIERUNG IM BETRIEB: wiki/ ist ein Mount und wird von außen
// aktualisiert (auf dem Server zieht ein wöchentliches Update das Repo per
// git pull). Neue Seiten sind dann sofort abrufbar, der Index kennt sie aber
// nicht — er entstand beim Serverstart. Weil sich am Image dabei nichts
// ändert, wird der Container auch nicht ersetzt. Darum gibt es die Route
// ADMIN_ROUTE: sie baut den Index neu auf, ohne den Server neu zu starten.
// Sie ist absichtlich nur von INNERHALB des Containers über Loopback
// erreichbar (siehe _isLocalRequest) — von außen, also auch durch einen
// Reverse Proxy hindurch, ist sie es nicht. `make server_refresh` ruft sie
// per `docker exec` auf.

const fs = require('fs')
const path = require('path')
const wiki = require('./wiki')

const ROUTE_PREFIX = '/pagefind/'
const ADMIN_ROUTE = '/admin/reindex'

const INDEX_MIME_TYPES = {
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.wasm': 'application/wasm'
}

// Index-Dateien nach Pfad (z. B. "pagefind.js"), befüllt von buildIndex.
// Kein const: buildIndex baut in eine eigene Map und tauscht sie am Ende in
// einem Zug ein. Dadurch beantwortet ein Neuaufbau Anfragen weiter aus dem
// alten, vollständigen Index, statt kurzzeitig aus einem halben — und
// gelöschte Seiten verschwinden, statt liegen zu bleiben.
let _files = new Map()
let _ready = false
let _building = false

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

/** Baut den Suchindex über alle Wiki-Seiten auf; Fehler lassen den Server weiterlaufen.
 *  Liefert { ok, pages, files, reason, busy } — der Aufrufer kann das melden. */
async function buildIndex() {
	if (_building) {
		// Zwei Aufbauten gleichzeitig würden sich nur behindern. busy trennt
		// diesen Fall vom echten Fehler: der Aufrufer soll es später erneut
		// versuchen, statt Alarm zu schlagen. Tritt regelmäßig auf, wenn kurz
		// nach dem Serverstart neu indexiert wird — der Startaufbau läuft dann
		// noch.
		return { ok: false, busy: true, reason: 'Ein Indexaufbau läuft bereits' }
	}
	_building = true
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
		let staged = new Map()
		for (const file of files) {
			staged.set(file.path, file.content)
		}
		await pagefind.close()

		// Erst jetzt eintauschen: bis hierher lief die Suche aus dem alten Index.
		_files = staged
		_ready = true
		console.log('Suche: Index über ' + pages.length + ' Wiki-Seiten aufgebaut (' + _files.size + ' Dateien)')
		return { ok: true, pages: pages.length, files: _files.size }
	}
	catch (err) {
		console.error('Suche: Indexaufbau fehlgeschlagen — die Wiki-Suche bleibt aus', err)
		return { ok: false, reason: String(err && err.message ? err.message : err) }
	}
	finally {
		_building = false
	}
}

/** Fühlt sich dieses Modul für die Anfrage zuständig? */
function handles(req) {
	return req.url.startsWith(ROUTE_PREFIX) || req.url.split('?')[0] === ADMIN_ROUTE
}

/** Kommt die Anfrage aus dem Container selbst (Loopback)?
 *
 *  Bewusst nur der Socket-Absender, KEIN Header: X-Forwarded-For & Co. kann
 *  jeder Client frei setzen. Eine Anfrage durch einen Reverse Proxy trägt
 *  dessen Netzadresse, eine über einen veröffentlichten Docker-Port die des
 *  Docker-Gateways — beides ist nicht Loopback. Nur wer bereits im Container
 *  ist, kommt hier durch. */
function _isLocalRequest(req) {
	let addr = req.socket.remoteAddress || ''
	// Node liefert IPv4 über IPv6-Sockets als "::ffff:127.0.0.1".
	if (addr.startsWith('::ffff:')) {
		addr = addr.substring(7)
	}
	return addr === '127.0.0.1' || addr === '::1'
}

/** Baut den Index auf Zuruf neu auf. Nur von innen, nur per POST. */
async function _handleReindex(req, res) {
	if (!_isLocalRequest(req)) {
		console.warn('Suche: Neu-Indexierung von ' + req.socket.remoteAddress + ' abgelehnt')
		res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(JSON.stringify({ ok: false, reason: 'Nur innerhalb des Containers erlaubt' }))
		return
	}
	if (req.method !== 'POST') {
		res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8', 'Allow': 'POST' })
		res.end(JSON.stringify({ ok: false, reason: 'Nur POST' }))
		return
	}

	// Synchron antworten: der Aufrufer (make server_refresh) soll am Ergebnis
	// erkennen, ob der Index wirklich steht — nicht nur, dass der Auftrag ankam.
	let result = await buildIndex()
	if (result.busy) {
		// 503 + Retry-After: derselbe Umgang wie bei einer Suchanfrage, solange
		// der Index noch nicht steht. Kein Fehler, sondern "gleich nochmal".
		res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8', 'Retry-After': '2' })
		res.end(JSON.stringify(result))
		return
	}
	res.writeHead(result.ok ? 200 : 500, { 'Content-Type': 'application/json; charset=utf-8' })
	res.end(JSON.stringify(result))
}

function handleRequest(req, res) {
	if (req.url.split('?')[0] === ADMIN_ROUTE) {
		// _handleReindex ist async; eine unbehandelte Ablehnung wäre fatal
		// (Node beendet den Prozess), darum hier auffangen.
		_handleReindex(req, res).catch(err => {
			console.error('Suche: Neu-Indexierung abgebrochen', err)
			if (!res.headersSent) {
				res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
				res.end(JSON.stringify({ ok: false, reason: 'Interner Fehler' }))
			}
		})
		return
	}

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
