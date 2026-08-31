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
 * Senkrechte Teilstücke, die mit anderen SimpleBezier-Linien exakt
 * übereinander liegen, werden über simple_bezier_fan.js seitlich
 * aufgefächert. Dafür hält jede Linie zwei Zwischenspeicher: die Grundform
 * (nur von der Endlage abhängig) und den fertigen Weg samt umschließendem
 * Rechteck (zusätzlich vom zugeteilten Versatz abhängig). Beides wird nur
 * neu gerechnet, wenn sich Endlage bzw. Versatz wirklich ändern; Treffer-
 * und Zeichenprüfung laufen zuerst gegen das Rechteck.
 */
class SimpleBezier extends ConnectionLine {

	constructor(connection) {
		super(connection)

		// Grundform samt Endlage, für die sie gerechnet wurde;
		// NaN erzwingt den ersten Aufbau.
		this._basePath = []
		this._shape = null
		this._verticals = []
		this._keyAx = NaN
		this._keyAy = NaN
		this._keyBx = NaN
		this._keyBy = NaN
		this._keyMirrored = false

		// Fertiger Weg (Grundform plus Versätze) samt umschließendem Rechteck.
		this._path = []
		this._box = null
		this._finalDirty = false

		AllSimpleBezierLines.push(this)
		simpleBezierFanInvalidate()
	}

	/** Trägt die Linie aus dem Auffächern aus. */
	kill() {
		super.kill()
		const i = AllSimpleBezierLines.indexOf(this)
		if (i >= 0) {
			AllSimpleBezierLines.splice(i, 1)
		}
		simpleBezierFanInvalidate()
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

	/** Der Polygonzug der Linie in Weltkoordinaten, aus dem Zwischenspeicher. */
	get points() {
		simpleBezierFanSync()
		if (this._finalDirty) {
			this._rebuildFinal()
		}
		return this._path
	}

	/**
	 * Bringt die Grundform auf Stand: rechnet Weg, Form und Senkrechten neu,
	 * wenn sich die Endlage geändert hat. Liefert, ob etwas neu gerechnet
	 * wurde — das Signal für simpleBezierFanSync, neu zu bündeln.
	 */
	_updateBase() {
		const ends = this._endPoints()
		if (!ends) {
			if (this._basePath.length === 0) {
				return false
			}
			this._basePath = []
			this._shape = null
			this._verticals = []
			this._path = []
			this._box = null
			this._finalDirty = false
			this._keyAx = NaN
			return true
		}

		const a = ends[0]
		const b = ends[1]
		const mirrored = this._isMirrored()
		if (
			(a.x === this._keyAx) && (a.y === this._keyAy) &&
			(b.x === this._keyBx) && (b.y === this._keyBy) &&
			(mirrored === this._keyMirrored)
		) {
			return false
		}

		let route
		if (mirrored) {
			route = this._route({ x: -a.x, y: a.y }, { x: -b.x, y: b.y })
			for (const point of route.points) {
				point.x = -point.x
			}
		}
		else {
			route = this._route(a, b)
		}

		this._basePath = route.points
		this._shape = route.shape
		this._extractVerticals()
		this._finalDirty = true
		this._keyAx = a.x
		this._keyAy = a.y
		this._keyBx = b.x
		this._keyBy = b.y
		this._keyMirrored = mirrored
		return true
	}

	/**
	 * Baut den Weg von `a` nach `b` für die Normal-Ausrichtung: aus `a` geht
	 * es nach rechts hinaus, in `b` von links hinein. Der Bogen (loop) kommt
	 * unabgeschrägt zurück — die Abschrägung passiert erst beim fertigen Weg,
	 * damit Versätze vorher eingerechnet werden können. Alle Punkte sind
	 * frisch erzeugt. Die Fallgrenzen sind so gewählt, dass die Formen an
	 * ihnen stetig ineinander übergehen.
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
			return {
				shape: 'flat',
				points: [
					{ x: a.x, y: a.y },
					{ x: a.x + stub, y: a.y },
					{ x: b.x - stub, y: b.y },
					{ x: b.x, y: b.y },
				],
			}
		}

		// Steil nach vorn: die Diagonale allein schafft die Höhe nicht — die
		// Mitte wird senkrecht und hängt über zwei Diagonalen an den Absprüngen.
		if (dx >= (2 * escape)) {
			const diag = (dx - (2 * escape)) / 2
			return {
				shape: 'steep',
				points: [
					{ x: a.x, y: a.y },
					{ x: a.x + escape, y: a.y },
					{ x: a.x + escape + diag, y: a.y + (ys * diag) },
					{ x: b.x - escape - diag, y: b.y - (ys * diag) },
					{ x: b.x - escape, y: b.y },
					{ x: b.x, y: b.y },
				],
			}
		}

		// Nach hinten mit genug Höhe: außen 90° in die Senkrechten, den
		// Rückweg macht die Diagonale in der Mitte (135°-Anschlüsse).
		const diag = (2 * escape) - dx
		if (ady >= (diag + (2 * SIMPLE_BEZIER_MIN_VERTICAL))) {
			const vertical = (ady - diag) / 2
			return {
				shape: 'back',
				points: [
					{ x: a.x, y: a.y },
					{ x: a.x + escape, y: a.y },
					{ x: a.x + escape, y: a.y + (ys * vertical) },
					{ x: b.x - escape, y: b.y - (ys * vertical) },
					{ x: b.x - escape, y: b.y },
					{ x: b.x, y: b.y },
				],
			}
		}

		// Nach hinten ohne Höhe: die S-Form hat keinen Platz, der Weg läuft
		// als Bogen außen herum — auf der Seite des Ziels.
		const depth = Math.max(SIMPLE_BEZIER_LOOP_MIN, diag / 2)
		const yFar = ((dy < 0) ? Math.min(a.y, b.y) : Math.max(a.y, b.y)) + (ys * depth)
		return {
			shape: 'loop',
			points: [
				{ x: a.x, y: a.y },
				{ x: a.x + escape, y: a.y },
				{ x: a.x + escape, y: yFar },
				{ x: b.x - escape, y: yFar },
				{ x: b.x - escape, y: b.y },
				{ x: b.x, y: b.y },
			],
		}
	}

	/**
	 * Sammelt die senkrechten Teilstücke der Grundform fürs Auffächern —
	 * je Senkrechte Lage, Ordnungsschlüssel und Versatz-Budget.
	 */
	_extractVerticals() {
		this._verticals = []
		const pts = this._basePath
		if ((this._shape !== 'steep') && (this._shape !== 'back') && (this._shape !== 'loop')) {
			return
		}

		// Abwärts heißt: der Start liegt über dem Ende. Der Ordnungsschlüssel
		// sortiert ein Bündel von links nach rechts — abwärts liegt die höhere
		// Linie rechts (großes y zuerst), aufwärts links (kleines y zuerst).
		const down = pts[pts.length - 1].y >= pts[0].y

		const add = (i0, i1, lo, hi) => {
			const y0 = Math.min(pts[i0].y, pts[i1].y)
			const y1 = Math.max(pts[i0].y, pts[i1].y)
			const band = (y0 + y1) / 2
			this._verticals.push({
				x: pts[i0].x,
				y0: y0,
				y1: y1,
				order: down ? -band : band,
				lo: lo,
				hi: hi,
				shift: 0,
				applied: 0,
			})
		}

		if (this._shape === 'steep') {
			// Die Mittelsenkrechte darf zwischen den beiden festen Ecken der
			// Absprünge wandern; 1 px Diagonale bleibt auf jeder Seite übrig.
			const xMin = Math.min(pts[1].x, pts[4].x) + 1
			const xMax = Math.max(pts[1].x, pts[4].x) - 1
			add(2, 3, Math.min(0, xMin - pts[2].x), Math.max(0, xMax - pts[2].x))
			return
		}

		// back und loop: je eine Senkrechte am Start- und am Zielabsprung.
		// Zum Pin hin begrenzt die Mindestlänge des Absprungs den Spielraum,
		// nach außen ist er offen.
		const stubStart = pts[1].x - pts[0].x
		if (stubStart >= 0) {
			add(1, 2, Math.min(0, SIMPLE_BEZIER_MIN_STUB - stubStart), SIMPLE_BEZIER_FAN_OPEN)
		}
		else {
			add(1, 2, -SIMPLE_BEZIER_FAN_OPEN, Math.max(0, -stubStart - SIMPLE_BEZIER_MIN_STUB))
		}

		const stubEnd = pts[5].x - pts[4].x
		if (stubEnd >= 0) {
			add(3, 4, -SIMPLE_BEZIER_FAN_OPEN, Math.max(0, stubEnd - SIMPLE_BEZIER_MIN_STUB))
		}
		else {
			add(3, 4, Math.min(0, stubEnd + SIMPLE_BEZIER_MIN_STUB), SIMPLE_BEZIER_FAN_OPEN)
		}
	}

	/**
	 * Baut den fertigen Weg aus Grundform und zugeteilten Versätzen:
	 * Senkrechte verschieben, beim Bogen abschrägen, Weg säubern und das
	 * umschließende Rechteck bestimmen.
	 */
	_rebuildFinal() {
		this._finalDirty = false

		const base = this._basePath
		if (base.length < 2) {
			this._path = []
			this._box = null
			return
		}

		let shifted = false
		for (const vertical of this._verticals) {
			if (vertical.shift !== 0) {
				shifted = true
				break
			}
		}

		let pts
		if (!shifted) {
			for (const vertical of this._verticals) {
				vertical.applied = 0
			}
			pts = base
		}
		else {
			pts = base.map((point) => ({ x: point.x, y: point.y }))

			if (this._shape === 'steep') {
				// Die Mittelsenkrechte wandert an den 45°-Diagonalen entlang:
				// x und y verschieben sich gemeinsam, die Länge bleibt.
				const vertical = this._verticals[0]
				const slope = (((pts[2].x - pts[1].x) * (pts[2].y - pts[1].y)) > 0) ? 1 : -1
				pts[2].x += vertical.shift
				pts[2].y += slope * vertical.shift
				pts[3].x += vertical.shift
				pts[3].y += slope * vertical.shift
				vertical.applied = vertical.shift
			}
			else {
				// back und loop: beide Senkrechten wandern waagerecht, die
				// Absprünge ändern nur ihre Länge.
				const v1 = this._verticals[0]
				const v2 = this._verticals[1]
				pts[1].x += v1.shift
				pts[2].x += v1.shift
				pts[3].x += v2.shift
				pts[4].x += v2.shift
				v1.applied = v1.shift
				v2.applied = v2.shift

				if ((this._shape === 'back') && (v1.shift !== v2.shift)) {
					// Ungleiche Versätze verändern die Breite der Mitteldiagonale;
					// die Höhendifferenz schlucken die beiden Senkrechten je zur
					// Hälfte, damit die Diagonale exakt 45° behält.
					const span = Math.abs(pts[3].x - pts[2].x)
					const sigma = (pts[3].y >= pts[2].y) ? 1 : -1
					const diff = (sigma * span) - (pts[3].y - pts[2].y)
					pts[2].y -= diff / 2
					pts[3].y += diff / 2
				}
			}
		}

		if (this._shape === 'loop') {
			pts = chamferCorners(pts, SIMPLE_BEZIER_CHAMFER)
		}
		pts = compressPolyline(pts)

		const box = {
			left: pts[0].x,
			right: pts[0].x,
			top: pts[0].y,
			bottom: pts[0].y,
		}
		for (const point of pts) {
			if (point.x < box.left) box.left = point.x
			if (point.x > box.right) box.right = point.x
			if (point.y < box.top) box.top = point.y
			if (point.y > box.bottom) box.bottom = point.y
		}

		this._path = pts
		this._box = box
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
		const tolerance = this.hitTolerance
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
		return this.isBoxInView(box.left, box.top, box.right, box.bottom, padding, p5ctx)
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
