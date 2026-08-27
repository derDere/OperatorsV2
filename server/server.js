// Webserver für OperatorsV2: liefert den www-Ordner als statische Seite aus.
//
// Architektur: ein einziger http.Server mit einer zentralen Verteilstelle
// (handleRequest). Weitere Routen klinken sich dort über ihr Pfad-Präfix ein,
// bevor die statische Auslieferung greift — so macht es die Wiki-Route
// (wiki.js, Präfix /wiki/), und eine spätere API macht es genauso.
// WebSockets nimmt derselbe Server über sein 'upgrade'-Ereignis an — die
// Funk-Kanäle dahinter implementiert websocket.js.

const http = require('http')
const fs = require('fs')
const path = require('path')
const websocket = require('./websocket')
const wiki = require('./wiki')
const examples = require('./examples')

const PORT = parseInt(process.env.PORT || '8080')
const WWW_ROOT = path.resolve(process.env.WWW_ROOT || path.join(__dirname, '..', 'www'))

const MIME_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.ttf': 'font/ttf'
}

function handleRequest(req, res) {
	if (wiki.handles(req)) {
		wiki.handleRequest(req, res)
		return
	}
	if (examples.handles(req)) {
		examples.handleRequest(req, res)
		return
	}
	serveStatic(req, res)
}

function serveStatic(req, res) {
	let urlPath
	try {
		urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
	}
	catch {
		res.writeHead(400)
		res.end('Bad Request')
		return
	}
	if (urlPath.endsWith('/')) {
		urlPath += 'index.html'
	}

	let filePath = path.resolve(path.join(WWW_ROOT, urlPath))
	if (!filePath.startsWith(WWW_ROOT + path.sep)) {
		res.writeHead(403)
		res.end('Forbidden')
		return
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404)
			res.end('Not Found')
			return
		}
		let mime = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
		res.writeHead(200, { 'Content-Type': mime })
		res.end(data)
	})
}

const server = http.createServer(handleRequest)

server.on('upgrade', websocket.handleUpgrade)

server.listen(PORT, () => {
	console.log('OperatorsV2-Server läuft auf Port ' + PORT + ', www-Ordner: ' + WWW_ROOT)
})
