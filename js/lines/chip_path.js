/**
 * Linienart im Leiterbahn-Stil eines Computerchips.
 *
 * Den Weg bestimmt der WireRouter (router.js) mit seiner A*-Suche und legt
 * ihn als Stützpunktliste in `connection.path` ab. Diese Klasse zeichnet
 * genau diesen Weg; solange keiner verlegt ist, gilt die direkte Verbindung
 * der beiden Enden.
 */
class ChipPath extends ConnectionLine {

	/** Der zu zeichnende Weg; ohne verlegten Weg die direkte Verbindung. */
	get points() {
		const path = this.connection.path
		if (!!path && (path.length >= 2)) {
			return path
		}

		let startPos = null
		let endPos = null
		if (!!this.connection.start) {
			startPos = this.connection.start.actualPos
		}
		if (!!this.connection.end) {
			endPos = this.connection.end.actualPos
		}
		if (!startPos && !endPos) {
			return []
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

	/** Berührt der Weg den sichtbaren Ausschnitt? */
	isInFrame(points, padding, p5ctx) {
		if (points.length < 2) {
			return false
		}

		let left = points[0].x
		let right = points[0].x
		let top = points[0].y
		let bottom = points[0].y
		for (const point of points) {
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

	/** Liegt der Punkt `ap` (Weltkoordinaten) auf dem Weg? */
	isMouseOver(ap, p5ctx) {
		if (!this.connection.start || !this.connection.end) {
			return false
		}

		const points = this.points
		if (points.length < 2) {
			return false
		}

		const tolerance = this.mouseOverWeight / 2
		if (!this.isInFrame(points, tolerance, p5ctx)) {
			return false
		}

		for (let i = 1; i < points.length; i++) {
			if (this._distanceToSegment(ap, points[i - 1], points[i]) <= tolerance) {
				return true
			}
		}
		return false
	}

	/** Kürzester Abstand eines Punktes zu einem Wegabschnitt. */
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

	/** Zeichnet den Weg, bei Maus-über mit Hervorhebung darunter. */
	draw(tick, p5ctx) {
		const points = this.points
		if (points.length < 2) {
			return false
		}
		if (!this.isInFrame(points, this.mouseOverWeight, p5ctx)) {
			return false
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
