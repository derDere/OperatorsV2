/** Waagerechter Mindest-Absprung aus jedem Anschluss heraus (Pixel). */
const SIMPLE_BEZIER_ESCAPE = 10

/** Mindestlänge der beiden Senkrechten einer Rückwärts-S-Kurve (Pixel). */
const SIMPLE_BEZIER_MIN_VERTICAL = 10

/** Mindesttiefe des Bogens, wenn eine Rückwärtskurve außen herum laufen muss (Pixel). */
const SIMPLE_BEZIER_LOOP_MIN = 20

/** Kantenlänge der 45°-Abschrägungen an den Ecken des Bogens (Pixel). */
const SIMPLE_BEZIER_CHAMFER = 20

/**
 * Linienart als vereinfachte Bezierkurve.
 *
 * Die Linie folgt der Form einer echten Bezierkurve so nah wie möglich,
 * besteht aber nur aus geraden Teilstücken, die waagerecht, senkrecht oder
 * exakt 45° diagonal laufen — und an keinem Knick ist der Innenwinkel
 * spitzer als 90°. Je nach Lage der beiden Enden entsteht eine von vier
 * Formen:
 *
 * - flach nach vorn:       H–D–H, eine mittige Diagonale zwischen zwei Horizontalen
 * - steil nach vorn:       H–D–V–D–H, senkrechte Mitte über Diagonalen angebunden
 * - nach hinten mit Höhe:  H–V–D–V–H, die Diagonale in der Mitte macht den Rückweg
 * - nach hinten ohne Höhe: ein abgeschrägter Bogen außen herum
 *
 * Gerechnet wird immer in einer Ausrichtung: der Start läuft nach rechts
 * hinaus. Hängt die Linie stattdessen an einem Eingang, wird an der
 * senkrechten Achse gespiegelt gerechnet und das Ergebnis zurückgespiegelt.
 * Die Geometrie-Helfer compressPolyline und chamferCorners kommen aus
 * router.js.
 *
 * Der fertige Weg wird samt umschließendem Rechteck zwischengespeichert und
 * erst neu gerechnet, wenn sich ein Ende bewegt. Treffer- und Zeichenprüfung
 * laufen zuerst gegen das Rechteck: Linien außerhalb des Bilds oder abseits
 * der Maus kosten damit je Bild nur ein paar Vergleiche.
 */
class SimpleBezier extends ConnectionLine {

	constructor(connection) {
		super(connection)

		// Zwischengespeicherter Weg samt umschließendem Rechteck und der
		// Endlage, für die er gerechnet wurde. NaN erzwingt den ersten Aufbau.
		this._path = []
		this._box = null
		this._keyAx = NaN
		this._keyAy = NaN
		this._keyBx = NaN
		this._keyBy = NaN
		this._keyMirrored = false
	}

	/**
	 * Die beiden Endpunkte der Linie. Ein fehlendes Ende folgt dem
	 * Mauszeiger; ohne beide Enden gibt es keine Linie (null).
	 */
	_endPoints() {
		let startPos = null
		let endPos = null
		if (!!this.connection.start) {
			startPos = this.connection.start.actualPos
		}
		if (!!this.connection.end) {
			endPos = this.connection.end.actualPos
		}
		if (!startPos && !endPos) {
			return null
		}
		if (!startPos) {
			startPos = mousePos
		}
		if (!endPos) {
			endPos = mousePos
		}
		return [
			{ x: startPos.x, y: startPos.y },
			{ x: endPos.x, y: endPos.y },
		]
	}

	/**
	 * Läuft die Linie aus dem Startende nach links hinaus? Das ist der Fall,
	 * wenn sie an einem Eingang beginnt. Dann wird gespiegelt gerechnet.
	 */
	_isMirrored() {
		if (!!this.connection.start) {
			return !this.connection.start.isOutput
		}
		if (!!this.connection.end) {
			return this.connection.end.isOutput
		}
		return false
	}

	/**
	 * Der Polygonzug der Linie in Weltkoordinaten — aus dem Zwischenspeicher,
	 * solange sich die Endlage nicht geändert hat.
	 */
	get points() {
		const ends = this._endPoints()
		if (!ends) {
			return []
		}

		const a = ends[0]
		const b = ends[1]
		const mirrored = this._isMirrored()
		if (
			(a.x === this._keyAx) && (a.y === this._keyAy) &&
			(b.x === this._keyBx) && (b.y === this._keyBy) &&
			(mirrored === this._keyMirrored)
		) {
			return this._path
		}

		let path
		if (mirrored) {
			path = this._route({ x: -a.x, y: a.y }, { x: -b.x, y: b.y })
			for (const point of path) {
				point.x = -point.x
			}
		}
		else {
			path = this._route(a, b)
		}
		path = compressPolyline(path)

		const box = {
			left: path[0].x,
			right: path[0].x,
			top: path[0].y,
			bottom: path[0].y,
		}
		for (const point of path) {
			if (point.x < box.left) box.left = point.x
			if (point.x > box.right) box.right = point.x
			if (point.y < box.top) box.top = point.y
			if (point.y > box.bottom) box.bottom = point.y
		}

		this._path = path
		this._box = box
		this._keyAx = a.x
		this._keyAy = a.y
		this._keyBx = b.x
		this._keyBy = b.y
		this._keyMirrored = mirrored
		return this._path
	}

	/**
	 * Baut den Weg von `a` nach `b` für die Normal-Ausrichtung: aus `a` geht
	 * es nach rechts hinaus, in `b` von links hinein. Alle Punkte sind frisch
	 * erzeugt und dürfen verändert werden. Die Fallgrenzen sind so gewählt,
	 * dass die Formen an ihnen stetig ineinander übergehen.
	 */
	_route(a, b) {
		const escape = SIMPLE_BEZIER_ESCAPE
		const dx = b.x - a.x
		const dy = b.y - a.y
		const ady = Math.abs(dy)
		const ys = (dy < 0) ? -1 : 1

		// Flach genug nach vorn: eine Diagonale, mittig zwischen den Enden.
		if (dx >= (ady + (2 * escape))) {
			const stub = (dx - ady) / 2
			return [
				{ x: a.x, y: a.y },
				{ x: a.x + stub, y: a.y },
				{ x: b.x - stub, y: b.y },
				{ x: b.x, y: b.y },
			]
		}

		// Steil nach vorn: die Diagonale allein schafft die Höhe nicht — die
		// Mitte wird senkrecht und hängt über zwei Diagonalen an den Absprüngen.
		if (dx >= (2 * escape)) {
			const diag = (dx - (2 * escape)) / 2
			return [
				{ x: a.x, y: a.y },
				{ x: a.x + escape, y: a.y },
				{ x: a.x + escape + diag, y: a.y + (ys * diag) },
				{ x: b.x - escape - diag, y: b.y - (ys * diag) },
				{ x: b.x - escape, y: b.y },
				{ x: b.x, y: b.y },
			]
		}

		// Nach hinten mit genug Höhe: außen 90° in die Senkrechten, den
		// Rückweg macht die Diagonale in der Mitte (135°-Anschlüsse).
		const diag = (2 * escape) - dx
		if (ady >= (diag + (2 * SIMPLE_BEZIER_MIN_VERTICAL))) {
			const vertical = (ady - diag) / 2
			return [
				{ x: a.x, y: a.y },
				{ x: a.x + escape, y: a.y },
				{ x: a.x + escape, y: a.y + (ys * vertical) },
				{ x: b.x - escape, y: b.y - (ys * vertical) },
				{ x: b.x - escape, y: b.y },
				{ x: b.x, y: b.y },
			]
		}

		// Nach hinten ohne Höhe: die S-Form hat keinen Platz, der Weg läuft
		// als Bogen außen herum — auf der Seite des Ziels, mit abgeschrägten
		// Ecken statt der rohen 90°-Knicke.
		const depth = Math.max(SIMPLE_BEZIER_LOOP_MIN, diag / 2)
		const yFar = ((dy < 0) ? Math.min(a.y, b.y) : Math.max(a.y, b.y)) + (ys * depth)
		return chamferCorners([
			{ x: a.x, y: a.y },
			{ x: a.x + escape, y: a.y },
			{ x: a.x + escape, y: yFar },
			{ x: b.x - escape, y: yFar },
			{ x: b.x - escape, y: b.y },
			{ x: b.x, y: b.y },
		], SIMPLE_BEZIER_CHAMFER)
	}

	/** Liegt der Punkt `ap` (Weltkoordinaten) auf der Linie? */
	isMouseOver(ap, p5ctx) {
		if (!this.connection.start || !this.connection.end) {
			return false
		}

		const points = this.points
		if (points.length < 2) {
			return false
		}

		// Grobe Vorprüfung gegen das umschließende Rechteck des Wegs.
		const tolerance = this.mouseOverWeight / 2
		const box = this._box
		if (ap.x < (box.left - tolerance)) return false
		if (ap.x > (box.right + tolerance)) return false
		if (ap.y < (box.top - tolerance)) return false
		if (ap.y > (box.bottom + tolerance)) return false

		for (let i = 1; i < points.length; i++) {
			if (this._distanceToSegment(ap, points[i - 1], points[i]) <= tolerance) {
				return true
			}
		}
		return false
	}

	/** Kürzester Abstand eines Punktes zu einem Abschnitt des Polygonzugs. */
	_distanceToSegment(point, from, to) {
		const dx = to.x - from.x
		const dy = to.y - from.y
		const lengthSq = (dx * dx) + (dy * dy)

		let projection = 0
		if (lengthSq > 0) {
			projection = (((point.x - from.x) * dx) + ((point.y - from.y) * dy)) / lengthSq
			projection = Math.min(1, Math.max(0, projection))
		}

		const closestX = from.x + (projection * dx)
		const closestY = from.y + (projection * dy)
		return Math.hypot(point.x - closestX, point.y - closestY)
	}

	/** Berührt das umschließende Rechteck des Wegs den sichtbaren Ausschnitt? */
	_isInFrame(box, padding, p5ctx) {
		const viewLeft = -(p5ctx.width / 2) - dragOffset.x - padding
		const viewTop = -(p5ctx.height / 2) - dragOffset.y - padding
		const viewRight = viewLeft + p5ctx.width + (2 * padding)
		const viewBottom = viewTop + p5ctx.height + (2 * padding)

		if (box.right < viewLeft) return false
		if (box.left > viewRight) return false
		if (box.bottom < viewTop) return false
		if (box.top > viewBottom) return false
		return true
	}

	/** Zeichnet die Linie, bei Maus-über mit Hervorhebung darunter. */
	draw(tick, p5ctx) {
		const points = this.points
		if (points.length < 2) {
			return
		}
		if (!this._isInFrame(this._box, this.mouseOverWeight, p5ctx)) {
			return
		}

		p5ctx.push()
		p5ctx.noFill()

		if (this.mouseIsOver) {
			this._strokeMouseOver(p5ctx)
			this._strokePath(points, p5ctx)
		}

		this._strokeLine(p5ctx)
		this._strokePath(points, p5ctx)

		p5ctx.pop()
	}

	/** Zeichnet den Polygonzug durch alle Stützpunkte. */
	_strokePath(points, p5ctx) {
		p5ctx.beginShape()
		for (const point of points) {
			p5ctx.vertex(point.x, point.y)
		}
		p5ctx.endShape()
	}
}
