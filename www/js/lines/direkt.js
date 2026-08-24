/**
 * Die einfachste Linienart: eine schnurgerade Strecke von A nach B —
 * keine Kurven, keine Wegführung, nur die direkte Verbindung.
 */
class Direkt extends ConnectionLine {

	/**
	 * Die beiden Endpunkte der Strecke. Ein fehlendes Ende folgt dem
	 * Mauszeiger; ohne beide Enden gibt es keine Strecke (null).
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

	/** Liegt der Punkt `ap` (Weltkoordinaten) auf der Strecke? */
	isMouseOver(ap, p5ctx) {
		if (!this.connection.start || !this.connection.end) {
			return false
		}
		const ends = this._endPoints()
		if (!ends) {
			return false
		}
		return this._distanceToSegment(ap, ends[0], ends[1]) <= (this.mouseOverWeight / 2)
	}

	/** Kürzester Abstand eines Punktes zur Strecke. */
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

	/** Berührt die Strecke den sichtbaren Ausschnitt? */
	_isInFrame(from, to, padding, p5ctx) {
		const viewLeft = -(p5ctx.width / 2) - dragOffset.x - padding
		const viewTop = -(p5ctx.height / 2) - dragOffset.y - padding
		const viewRight = viewLeft + p5ctx.width + (2 * padding)
		const viewBottom = viewTop + p5ctx.height + (2 * padding)

		if (Math.max(from.x, to.x) < viewLeft) return false
		if (Math.min(from.x, to.x) > viewRight) return false
		if (Math.max(from.y, to.y) < viewTop) return false
		if (Math.min(from.y, to.y) > viewBottom) return false
		return true
	}

	/** Zeichnet die Strecke, bei Maus-über mit Hervorhebung darunter. */
	draw(tick, p5ctx) {
		const ends = this._endPoints()
		if (!ends) {
			return
		}
		if (!this._isInFrame(ends[0], ends[1], this.mouseOverWeight, p5ctx)) {
			return
		}

		p5ctx.push()

		if (this.mouseIsOver) {
			this._strokeMouseOver(p5ctx)
			p5ctx.line(ends[0].x, ends[0].y, ends[1].x, ends[1].y)
		}

		this._strokeLine(p5ctx)
		p5ctx.line(ends[0].x, ends[0].y, ends[1].x, ends[1].y)

		p5ctx.pop()
	}
}
