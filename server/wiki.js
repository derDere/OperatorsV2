// Wiki-Route: liefert die Doku aus dem wiki-Ordner aus. Markdown-Dateien
// werden per marked zu HTML-Fragmenten umgewandelt, die www/wiki.html
// dynamisch in die Seite lädt; alle anderen Dateien (Bilder usw.) kommen roh.
//
// Beim Umwandeln werden die Verweise für die clientseitige Navigation
// umgeschrieben: relative Links auf .md-Dateien werden zu Hash-Links
// (#ordner/seite — Navigation läuft im Browser über das hashchange-Ereignis),
// andere relative Pfade zeigen auf /wiki/<pfad> und werden von dieser Route
// roh ausgeliefert. Von einem Link mitgeführte Seitenanker entfallen — es
// zählt nur der Seitenpfad.
//
// Codeblöcke der Sprache "operatorsv2" enthalten einen gespeicherten
// Operator-Aufbau als JSON (dasselbe Format wie das Speichern im Editor).
// Sie werden zu Demo-Containern mit eingebettetem JSON, aus denen wiki.js
// per OperatorDemo (www/js/op_demo.js) lauffähige Canvas-Demos erzeugt.
// data-pagefind-ignore hält das JSON aus dem Suchindex heraus (search.js).
//
// Die Umwandlung selbst ist als renderMarkdown exportiert — die Suche
// (search.js) rendert damit beim Indexaufbau dieselben Seiteninhalte.

const fs = require('fs')
const path = require('path')

const WIKI_ROOT = path.resolve(process.env.WIKI_ROOT || path.join(__dirname, '..', 'wiki'))
const ROUTE_PREFIX = '/wiki/'

// Rohdateien neben den Markdown-Seiten (Bilder, Downloads, ...)
const ASSET_MIME_TYPES = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.json': 'application/json; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8'
}

// marked ist ein reines ES-Modul — aus diesem CommonJS-Modul wird es darum
// einmalig per dynamischem import() geladen und dabei konfiguriert.
let _markedPromise = null
function _getMarked() {
	if (!_markedPromise) {
		_markedPromise = import('marked').then((mod) => {
			mod.marked.use({
				gfm: true,
				walkTokens: _rewriteToken,
				renderer: { code: _renderCode }
			})
			return mod.marked
		})
	}
	return _markedPromise
}

// Verzeichnis der gerade umgewandelten Seite (relativ zum Wiki-Root, in
// Posix-Schreibweise) — marked.parse läuft synchron, darum genügt eine
// Modulvariable, um relative Links gegen die richtige Seite aufzulösen.
let _currentDir = ''

function _rewriteToken(token) {
	if (token.type === 'link' || token.type === 'image') {
		token.href = _rewriteHref(token.href)
	}
}

function _rewriteHref(href) {
	if (!href) {
		return href
	}
	// Absolute URLs (http:, mailto:, ...), Hash-Links und absolute Pfade bleiben unangetastet
	if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('#') || href.startsWith('/')) {
		return href
	}
	let target = href.split('#')[0]
	let resolved = path.posix.normalize(path.posix.join(_currentDir, target))
	if (resolved.startsWith('..')) {
		// führt aus dem Wiki heraus — bleibt, wie der Autor es geschrieben hat
		return href
	}
	if (resolved.toLowerCase().endsWith('.md')) {
		return '#' + resolved.slice(0, -3)
	}
	return ROUTE_PREFIX + resolved
}

function _escapeHtml(text) {
	return String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

function _renderCode(token) {
	let lang = (token.lang || '').trim().split(/\s+/)[0].toLowerCase()
	if (lang === 'operatorsv2') {
		// "</" JSON-konform maskieren, damit kein "</script>" im Inhalt das Tag vorzeitig beendet
		let jj = token.text.replace(/<\//g, '<\\/')
		return '<div class="operator-demo" data-pagefind-ignore="all"><script type="application/json">' + jj + '</script></div>\n'
	}
	let cls = lang ? ' class="language-' + _escapeHtml(lang) + '"' : ''
	return '<pre><code' + cls + '>' + _escapeHtml(token.text) + '\n</code></pre>\n'
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

	// Seitenpfad relativ zum Wiki-Root; ohne Endung ist eine Markdown-Seite gemeint
	let rel = urlPath.substring(ROUTE_PREFIX.length)
	if (rel.length <= 0 || rel.endsWith('/')) {
		rel += 'index'
	}
	if (path.extname(rel) === '') {
		rel += '.md'
	}

	let filePath = path.resolve(path.join(WIKI_ROOT, rel))
	if (!filePath.startsWith(WIKI_ROOT + path.sep)) {
		res.writeHead(403)
		res.end('Forbidden')
		return
	}

	if (path.extname(filePath).toLowerCase() === '.md') {
		_serveMarkdown(filePath, rel, res)
	}
	else {
		_serveAsset(filePath, res)
	}
}

/**
 * Wandelt einen Markdown-Text in das HTML-Fragment einer Wiki-Seite um.
 * rel ist der Seitenpfad relativ zum Wiki-Root (Posix-Schreibweise, mit
 * .md-Endung) — er bestimmt, wogegen relative Links aufgelöst werden.
 */
function renderMarkdown(rel, text) {
	return _getMarked().then((marked) => {
		_currentDir = path.posix.dirname(rel)
		if (_currentDir === '.') {
			_currentDir = ''
		}
		return marked.parse(text)
	})
}

function _serveMarkdown(filePath, rel, res) {
	fs.readFile(filePath, 'utf8', (err, text) => {
		if (err) {
			res.writeHead(404)
			res.end('Not Found')
			return
		}
		renderMarkdown(rel, text)
			.then((html) => {
				res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
				res.end(html)
			})
			.catch((convertErr) => {
				console.error('Wiki: Markdown-Umwandlung fehlgeschlagen für ' + rel, convertErr)
				res.writeHead(500)
				res.end('Internal Server Error')
			})
	})
}

function _serveAsset(filePath, res) {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404)
			res.end('Not Found')
			return
		}
		let mime = ASSET_MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
		res.writeHead(200, { 'Content-Type': mime })
		res.end(data)
	})
}

module.exports = { handles, handleRequest, renderMarkdown, WIKI_ROOT }
