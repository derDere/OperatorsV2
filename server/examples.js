// Beispiel-Route: liefert unter /examples/ die Namen der Beispiel-Dateien
// (www/examples/*.json) als JSON-Liste. Die Dateien selbst kommen über die
// statische Auslieferung — diese Route beantwortet nur die Liste und liest
// den Ordner bei jeder Anfrage frisch, damit neu abgelegte Beispiele sofort
// im Menü erscheinen.

const fs = require('fs')
const path = require('path')

const WWW_ROOT = path.resolve(process.env.WWW_ROOT || path.join(__dirname, '..', 'www'))
const EXAMPLES_ROOT = path.join(WWW_ROOT, 'examples')
const ROUTE_PATH = '/examples/'

/** Fühlt sich dieses Modul für die Anfrage zuständig? */
function handles(req) {
	let pathname = req.url.split('?')[0]
	return pathname === ROUTE_PATH || pathname === '/examples'
}

function handleRequest(req, res) {
	fs.readdir(EXAMPLES_ROOT, (err, entries) => {
		if (err) {
			console.error('Examples: Ordner nicht lesbar: ' + EXAMPLES_ROOT, err)
			res.writeHead(500)
			res.end('Internal Server Error')
			return
		}
		let names = entries
			.filter((name) => name.toLowerCase().endsWith('.json'))
			.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(JSON.stringify(names))
	})
}

module.exports = { handles, handleRequest }
