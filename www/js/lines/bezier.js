/** Mindestlänge, mit der ein Kontrollpunkt waagerecht aus dem Ende herausführt (Pixel). */
const BEZIER_HANDLE_MIN = 20

/** Angestrebter Abstand zweier Abtastpunkte entlang der Kurve (Pixel). */
const BEZIER_SAMPLE_SPACING = 8

/** Unter- und Obergrenze der Abtastschritte je Kurve. */
const BEZIER_SAMPLE_MIN = 8
const BEZIER_SAMPLE_MAX = 64

/**
 * Linienart als kubische Bezierkurve.
 *
 * Die Kurve wird aus vier Punkten gebildet: den beiden Endpunkten und je
 * einem Kontrollpunkt, der waagerecht aus dem Anschluss herausführt — aus
 * einem Ausgang nach rechts, aus einem Eingang nach links. Gezeichnet wird
 * mit der fertigen Bezier-Funktion von p5; für die Maus-über-Prüfung wird
 * die Kurve zu einem Polygonzug abgetastet und der Abstand zu dessen
 * Abschnitten gemessen.
 */
class Bezier extends ConnectionLine {

	/**
	 * Die beiden Endpunkte der Kurve. Ein fehlendes Ende folgt dem
	 * Mauszeiger; ohne beide Enden gibt es keine Kurve (null).
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
	 * Die vier Punkte der Kurve: Ende A, Kontrollpunkt zu A, Kontrollpunkt
	 * zu B, Ende B. Die Kontrollpunkte liegen auf Höhe ihres Endes und führen
	 * um die halbe Luftlinie (mindestens BEZIER_HANDLE_MIN) waagerecht heraus.
	 * Null, solange kein Ende bekannt ist.
	 */
	_curvePoints() {
		const ends = this._endPoints()
		if (!ends) {
			return null
		}

		const start = ends[0]
		const end = ends[1]
		const handle = Math.max(
			BEZIER_HANDLE_MIN,
			Math.hypot(end.x - start.x, end.y - start.y) / 2
		)
		const startDir = this._handleDir(this.connection.start, this.connection.end)
		const endDir = this._handleDir(this.connection.end, this.connection.start)

		return [
			start,
			{ x: start.x + (startDir * handle), y: start.y },
			{ x: end.x + (endDir * handle), y: end.y },
			end,
		]
	}

	/**
	 * Richtung, in der der Kontrollpunkt aus einem Ende herausführt:
	 * +1 nach rechts, -1 nach links. Aus einem Ausgang geht es nach rechts,
	 * aus einem Eingang nach links. Ein loses Ende (Mauszeiger) verhält sich
	 * wie das Gegenstück des anderen Endes; ohne jeden Anhalt bleibt der
	 * Kontrollpunkt auf dem Ende liegen (0).
	 */
	_handleDir(io, otherIo) {
		if (!!io) {
			return io.isOutput ? 1 : -1
		}
		if (!!otherIo) {
			return otherIo.isOutput ? -1 : 1
		}
		return 0
	}

	/**
	 * Tastet die Kurve zu einem Polygonzug ab. Die Schrittzahl folgt der
	 * Länge des Kontrollpolygons — die ist eine obere Schranke der
	 * Kurvenlänge, die Abtastung bleibt also überall dicht genug.
	 */
	_samplePoints(curve) {
		let hullLength = 0
		for (let i = 1; i < curve.length; i++) {
			hullLength += Math.hypot(curve[i].x - curve[i - 1].x, curve[i].y - curve[i - 1].y)
		}
		const steps = Math.min(
			BEZIER_SAMPLE_MAX,
			Math.max(BEZIER_SAMPLE_MIN, Math.ceil(hullLength / BEZIER_SAMPLE_SPACING))
		)

		const sampled = []
		for (let i = 0; i <= steps; i++) {
			sampled.push(this._pointAt(curve, i / steps))
		}
		return sampled
	}

	/** Punkt der kubischen Bezierkurve an der Stelle t (0 bis 1). */
	_pointAt(curve, t) {
		const u = 1 - t
		const w0 = u * u * u
		const w1 = 3 * u * u * t
		const w2 = 3 * u * t * t
		const w3 = t * t * t
		return {
			x: (w0 * curve[0].x) + (w1 * curve[1].x) + (w2 * curve[2].x) + (w3 * curve[3].x),
			y: (w0 * curve[0].y) + (w1 * curve[1].y) + (w2 * curve[2].y) + (w3 * curve[3].y),
		}
	}

	/** Liegt der Punkt `ap` (Weltkoordinaten) auf der Kurve? */
	isMouseOver(ap, p5ctx) {
		if (!this.connection.start || !this.connection.end) {
			return false
		}
		const curve = this._curvePoints()
		if (!curve) {
			return false
		}

		const tolerance = this.mouseOverWeight / 2

		// Grobe Vorprüfung über das umschließende Rechteck der vier
		// Kurvenpunkte — die Kurve liegt vollständig in deren konvexer Hülle.
		let left = curve[0].x
		let right = curve[0].x
		let top = curve[0].y
		let bottom = curve[0].y
		for (const point of curve) {
			if (point.x < left) left = point.x
			if (point.x > right) right = point.x
			if (point.y < top) top = point.y
			if (point.y > bottom) bottom = point.y
		}
		if (ap.x < (left - tolerance)) return false
		if (ap.x > (right + tolerance)) return false
		if (ap.y < (top - tolerance)) return false
		if (ap.y > (bottom + tolerance)) return false

		const points = this._samplePoints(curve)
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

	/**
	 * Berührt die Kurve den sichtbaren Ausschnitt? Geprüft wird das
	 * umschließende Rechteck der vier Kurvenpunkte — die Kurve liegt
	 * vollständig in deren konvexer Hülle, abgetastet werden muss nichts.
	 */
	_isInFrame(curve, padding, p5ctx) {
		let left = curve[0].x
		let right = curve[0].x
		let top = curve[0].y
		let bottom = curve[0].y
		for (const point of curve) {
			if (point.x < left) left = point.x
			if (point.x > right) right = point.x
			if (point.y < top) top = point.y
			if (point.y > bottom) bottom = point.y
		}

		const viewLeft = -(p5ctx.width / 2) - dragOffset.x - padding
		const viewTop = -(p5ctx.height / 2) - dragOffset.y - padding
		const viewRight = viewLeft + p5ctx.width + (2 * padding)
		const viewBottom = viewTop + p5ctx.height + (2 * padding)

		if (right < viewLeft) return false
		if (left > viewRight) return false
		if (bottom < viewTop) return false
		if (top > viewBottom) return false
		return true
	}

	/** Zeichnet die Kurve, bei Maus-über mit Hervorhebung darunter. */
	draw(tick, p5ctx) {
		const curve = this._curvePoints()
		if (!curve) {
			return
		}
		if (!this._isInFrame(curve, this.mouseOverWeight, p5ctx)) {
			return
		}

		p5ctx.push()
		p5ctx.noFill()

		if (this.mouseIsOver) {
			this._strokeMouseOver(p5ctx)
			this._strokeCurve(curve, p5ctx)
		}

		this._strokeLine(p5ctx)
		this._strokeCurve(curve, p5ctx)

		p5ctx.pop()
	}

	/** Zeichnet die Kurve mit der Bezier-Funktion von p5. */
	_strokeCurve(curve, p5ctx) {
		p5ctx.bezier(
			curve[0].x, curve[0].y,
			curve[1].x, curve[1].y,
			curve[2].x, curve[2].y,
			curve[3].x, curve[3].y
		)
	}
}
