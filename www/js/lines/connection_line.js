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
