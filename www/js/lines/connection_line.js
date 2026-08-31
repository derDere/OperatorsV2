/**
 * Basisklasse für die gezeichnete Linie einer Verbindung (Connection).
 *
 * Sie hält bewusst nur das Aussehen: die Farben, die Strichstärken und das
 * Setzen der Stroke-Eigenschaften — also wie eine Linie aussieht, wenn die
 * Maus über ihr steht oder wenn sie einen Wahrheitswert führt. Die komplette
 * Geometrie (Form, Trefferprüfung, Zeichnen) ist Sache der Unterklassen
 * (Direkt, Bezier, SimpleBezier, ChipPath).
 */
class ConnectionLine {

	/** @param connection Die Verbindung, zu der diese Linie gehört. */
	constructor(connection) {
		this.connection = connection

		this.lineColor = mainP5.color(0)
		this.lineWeight = 2
		this.mouseOverWeight = 5
		this.mouseOverColor = mainP5.color(0, 255, 0, 192)
		this.mouseIsOver = false
	}

	/** Aufräumarbeiten beim Löschen; Haken für die Unterklassen. */
	kill() {
	}

	/** Pflegt den Maus-über-Zustand und die Linienfarbe nach dem geführten Wert. */
	update(tick, p5ctx) {
		if (this.isMouseOver(mousePos, p5ctx)) {
			connectionHover = this.connection
		}
		if (
			(!!this.connection.start) &&
			(!!this.connection.end)
		) {
			this.lineColor = valueColor(this.connection.value, 1, true, p5ctx)
		}
		else {
			this.lineColor = p5ctx.color(255)
		}
	}

	/** Trefferprüfung für den Punkt `ap`; die Geometrie liefern die Unterklassen. */
	isMouseOver(ap, p5ctx) {
		return false
	}

	/**
	 * Trefferradius um die Linie, in Weltkoordinaten.
	 *
	 * Gedacht ist die Toleranz in Bildpunkten. Geteilt durch den Zoom bleibt
	 * eine Linie dadurch auf jeder Maßstabsstufe gleich gut greifbar — sonst
	 * wäre sie weit herausgezoomt kaum noch zu treffen.
	 */
	get hitTolerance() {
		return (this.mouseOverWeight / 2) / zoomScale
	}

	/**
	 * Berührt das Rechteck (Weltkoordinaten) den sichtbaren Ausschnitt?
	 *
	 * @param padding Zuschlag rund um den Ausschnitt, in Bildpunkten.
	 */
	isBoxInView(left, top, right, bottom, padding, p5ctx) {
		const pad = padding / zoomScale
		const viewLeft = ((-(p5ctx.width / 2) - dragOffset.x) / zoomScale) - pad
		const viewTop = ((-(p5ctx.height / 2) - dragOffset.y) / zoomScale) - pad
		const viewRight = viewLeft + (p5ctx.width / zoomScale) + (2 * pad)
		const viewBottom = viewTop + (p5ctx.height / zoomScale) + (2 * pad)

		if (right < viewLeft) return false
		if (left > viewRight) return false
		if (bottom < viewTop) return false
		if (top > viewBottom) return false
		return true
	}

	/** Zeichnet die Linie; die Geometrie liefern die Unterklassen. */
	draw(tick, p5ctx) {
	}

	/** Setzt die Stroke-Eigenschaften der Hervorhebung bei Maus-über. */
	_strokeMouseOver(p5ctx) {
		p5ctx.stroke(this.mouseOverColor)
		p5ctx.strokeWeight(this.mouseOverWeight)
	}

	/** Setzt die Stroke-Eigenschaften der eigentlichen Linie. */
	_strokeLine(p5ctx) {
		p5ctx.stroke(this.lineColor)
		p5ctx.strokeWeight(this.lineWeight)
	}
}
