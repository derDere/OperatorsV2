/**
 * Wegfindung für Verbindungslinien im Leiterbahn-Stil (Leitungsführung).
 *
 * Jeder Weg besteht ausschließlich aus waagerechten, senkrechten und
 * 45°-diagonalen Segmenten und wird mit einer A*-Suche auf einem feinen Raster
 * gefunden. Das Bild entsteht über die Kostenfunktion: lange gerade Läufe sind
 * billig, Knicke kosten, das Laufen auf einer fremden Linie ist sehr teuer,
 * das Queren mäßig teuer — und parallele Linien halten einen Sollabstand:
 * zu dichtes Nebeneinander kostet. So laufen Stränge mit gleichmäßigem
 * Abstand, ohne sich in eine bestehende Lücke zu quetschen.
 */

// ---------------------------------------------------------------------------
// Stellschrauben
// ---------------------------------------------------------------------------

/** Kantenlänge einer Rasterzelle in Pixeln — die Feinheit der Wegführung. */
const ROUTE_GRID_SIZE = 5

/** Sollabstand zwischen zwei parallel laufenden Linien in Pixeln. */
const ROUTE_LANE_SPACING = 15

/** Zusätzlich noch als sauber geltender Abstand in Rasterzellen. */
const ROUTE_LANE_SLACK = 1

/** Gerades Stück, das ein Weg aus dem Pin heraus läuft, bevor der erste Knick kommt. */
const ROUTE_ESCAPE_LENGTH = 10

/** Zusätzliche Absprunglänge je weiterer Linie am selben Operator. */
const ROUTE_ESCAPE_STAGGER = 5

/** Anzahl der Staffelstufen; danach beginnt die Staffelung wieder bei null. */
const ROUTE_ESCAPE_SLOTS = 4

/**
 * Luftlinie, bis zu der ein Weg schnurgerade von Pin zu Pin läuft — ohne
 * Absprung, ohne Knick und ohne Suche. Auf so kurzer Strecke ist die Gerade
 * das klarste Bild; jeder Umweg um Abstände oder Übersprünge würde mehr
 * auffallen als er einbringt.
 */
const ROUTE_DIRECT_DISTANCE = 100

/** Sicherheitsabstand, den ein Weg um einen Operator herum hält. */
const ROUTE_OBSTACLE_MARGIN = 5

/** Grundkosten je Rasterschritt, gerade und diagonal (Verhältnis ≈ √2). */
const ROUTE_COST_STRAIGHT = 10
const ROUTE_COST_DIAGONAL = 14

/**
 * Aufschlag je 45° Richtungsänderung — hält die Läufe lang und gerade.
 * Er liegt bewusst über dem Grundaufschlag eines Übersprungs: eine Linie
 * schneidet lieber gerade durch ein ganzes Bündel hindurch, als jede
 * Nachbarlinie einzeln in Treppenstufen zu übersteigen.
 */
const ROUTE_COST_TURN = 12

/**
 * Zuschlagsfaktor für einen Knick abseits der Wegmitte: ganz außen kostet er
 * das (1 + Faktor)-fache, mittig nur den Grundaufschlag. Versätze sammeln
 * sich dadurch in der Mitte, wo auch die Übersprünge hingehören.
 */
const ROUTE_COST_TURN_OFF_CENTER = 3

/**
 * Aufschlag für eine Zelle ohne Nachbarlinie im Sollabstand. Werte über null
 * ziehen Linien zu engen Strängen zusammen, machen aber jeden Schritt im
 * freien Feld teurer als die Kostenschätzung der Suche ansetzen darf — und
 * diese Lücke muss A* mit Suchbreite ausgleichen, was die Wegfindung um
 * Größenordnungen verlangsamt. Bei null bleibt die Suche schmal und schnell;
 * parallele Stränge entstehen trotzdem, weil benachbarte Anschlüsse
 * gleichlaufende kürzeste Wege haben.
 */
const ROUTE_COST_LONELY = 0

/** Aufschlag je Parallelklasse, um die eine Nachbarlinie den Sollabstand unterschreitet. */
const ROUTE_COST_CROWDING = 5

/** Aufschlag für das Laufen auf einer fremden Linie. */
const ROUTE_COST_OVERLAP = 300

/** Grundaufschlag für das Überspringen einer fremden Linie. */
const ROUTE_COST_CROSS = 25

/**
 * Aufschlag für einen Übersprung abseits der Wegmitte. Gemessen wird die
 * Luftlinie vom Übersprungpunkt zum Mittelpunkt der Linie, geteilt durch deren
 * halbe Luftlinie: mittig 0 %, am Ende 100 %. Dieser Anteil mal dem Wert hier
 * kommt auf den Grundaufschlag obendrauf — je größer der Wert, desto
 * entschiedener rutschen die Übersprünge zur Mitte.
 */
const ROUTE_COST_CROSS_OFF_CENTER = 100

/**
 * Umkreis um die eigene Start- und Zielzelle in Rasterzellen, in dem
 * Abstands- und Überlagerungskosten entfallen und ein Übersprung nur den
 * Grundaufschlag kostet. Dicht am Pin ist Enge konstruktionsbedingt —
 * Anschlüsse liegen nur einen Rasterschritt auseinander, Zusammenläufe auf
 * denselben Pin sind erzwungen. Unvermeidbare Aufschläge verbessern dort
 * nichts, sie zwingen die Suche nur, das ganze Fenster nach Alternativen
 * abzugrasen.
 */
const ROUTE_PIN_FUNNEL_CELLS = 8

/** Aufschlag für eine Zelle im Operator samt Sicherheitsabstand. */
const ROUTE_COST_OBSTACLE = 400

/** Rand um Start und Ziel, in dem die Suche ausweichen darf (Pixel). */
const ROUTE_SEARCH_MARGIN = 140

/** Umkreis eines bewegten Operators, in dem Linien mitgerechnet werden (Pixel). */
const ROUTE_MOVE_INFLUENCE = 200

/**
 * Knotenbudget je Weg, gemessen an der Größe des Suchfensters: so viele
 * untersuchte Knoten je Zelle darf die Suche verbrauchen. Reicht das nicht,
 * greift der Ersatzweg — und der kennt weder Belegung noch Abstände.
 */
const ROUTE_EXPANSIONS_PER_CELL = 3

/** Untergrenze des Knotenbudgets, damit auch kleine Suchfenster Luft haben. */
const ROUTE_MIN_EXPANSIONS = 5000

/** Harte Obergrenze des Knotenbudgets. */
const ROUTE_MAX_EXPANSIONS = 400000

/**
 * Stärke der Zielführung. Bei 1.0 liefert die Suche den billigsten Weg,
 * muss dafür aber jeden denkbaren Umweg widerlegen — teuer, sobald ein Weg
 * um unvermeidbare Aufschläge (Übersprünge, Gedränge) herumprobiert. Werte
 * knapp über 1.0 kappen diese Widerlegungs-Breite und bleiben dabei nah am
 * Optimum: der gefundene Weg ist höchstens um diesen Faktor teurer.
 */
const ROUTE_HEURISTIC_STRENGTH = 1.02

/** Winzige Bevorzugung zielnaher Knoten; löst Gleichstände auf und spart Suchaufwand. */
const ROUTE_TIE_BREAK = 1.002

/** Kantenlänge der 45°-Abschrägung im Ersatzweg. */
const ROUTE_CHAMFER = 20

// ---------------------------------------------------------------------------
// Richtungen, Orientierungen und Zellschlüssel
// ---------------------------------------------------------------------------

/** Die acht erlaubten Laufrichtungen, im Uhrzeigersinn ab Ost. */
const ROUTE_DIRECTIONS = [
	{ dx: 1, dy: 0 },   // 0 Ost
	{ dx: 1, dy: 1 },   // 1 Südost
	{ dx: 0, dy: 1 },   // 2 Süd
	{ dx: -1, dy: 1 },  // 3 Südwest
	{ dx: -1, dy: 0 },  // 4 West
	{ dx: -1, dy: -1 }, // 5 Nordwest
	{ dx: 0, dy: -1 },  // 6 Nord
	{ dx: 1, dy: -1 },  // 7 Nordost
]

const DIR_EAST = 0
const DIR_WEST = 4

/** Zustand ohne Vorgeschichte: der erste Schritt kostet keinen Knick. */
const DIR_NONE = 8

/**
 * Die vier Orientierungen einer Strecke (Richtung und Gegenrichtung fallen
 * zusammen): 0 waagerecht, 1 Diagonale ↘, 2 senkrecht, 3 Diagonale ↗.
 */
const ORIENTATION_COUNT = 4

/**
 * Senkrechter Abstand zweier benachbarter Parallelklassen je Orientierung in
 * Pixeln. Neben einer Waagerechten oder Senkrechten liegt die nächste
 * parallele Linie eine ganze Zelle weiter; neben einer Diagonalen nur eine
 * halbe Diagonale (Zelle/√2), weil sich dort beide Gitter-Paritäten abwechseln.
 */
const ROUTE_LANE_UNIT = [
	ROUTE_GRID_SIZE,
	ROUTE_GRID_SIZE * Math.SQRT1_2,
	ROUTE_GRID_SIZE,
	ROUTE_GRID_SIZE * Math.SQRT1_2,
]

/** Sollabstand je Orientierung, gemessen in Parallelklassen. */
const ROUTE_LANE_CELLS = ROUTE_LANE_UNIT.map((unit) => {
	return Math.max(1, Math.round(ROUTE_LANE_SPACING / unit))
})

/**
 * Zellversatz der d-ten Parallelklasse neben einer Linie der gegebenen
 * Orientierung, je Seite (+1/-1). Waagerechte und senkrechte Linien wandern
 * gerade nach außen; neben Diagonalen wechseln sich die beiden
 * Gitter-Paritäten ab, sodass jede parallele Nachbarlinie — auch die mit
 * ungeradem Versatz — einen Abstandswert erhält.
 */
function routePerpOffset(orientation, side, distance) {
	const near = Math.ceil(distance / 2) * side
	const far = Math.floor(distance / 2) * side
	switch (orientation) {
		case 0: return [0, distance * side]
		case 2: return [distance * side, 0]
		case 1: return [near, -far]
		default: return [near, far]
	}
}

/** Nibble-Wert für „keine Nachbarlinie in Reichweite". */
const ROUTE_DISTANCE_NONE = 0xF

/** Startwert einer unberührten Zelle: alle vier Orientierungen ohne Nachbarn. */
const ROUTE_DISTANCE_EMPTY = 0xFFFF

/**
 * Halber Schlüsselbereich. Deckt Weltkoordinaten von rund ±80.000 px ab und
 * hält den Schlüssel klein genug, dass er als einfache Ganzzahl gilt — das
 * beschleunigt die Nachschlagetabellen im heißen Pfad deutlich.
 */
const ROUTE_KEY_RANGE = 16384

/** Verdichtet eine Rasterzelle zu einer eindeutigen Zahl. */
function routeCellKey(gx, gy) {
	return ((gx + ROUTE_KEY_RANGE) * (ROUTE_KEY_RANGE * 2)) + (gy + ROUTE_KEY_RANGE)
}

/** Liefert die Orientierung einer Schrittrichtung. */
function routeOrientationOf(dx, dy) {
	const sx = Math.sign(dx)
	const sy = Math.sign(dy)
	if (sy === 0) return 0
	if (sx === 0) return 2
	return (sx === sy) ? 1 : 3
}

/** Kosten für den Wechsel von einer Laufrichtung in die nächste. */
function routeTurnCost(fromDir, toDir) {
	if ((fromDir === DIR_NONE) || (fromDir < 0) || (toDir < 0)) {
		return 0
	}
	let diff = Math.abs(fromDir - toDir)
	if (diff > (ROUTE_DIRECTIONS.length / 2)) {
		diff = ROUTE_DIRECTIONS.length - diff
	}
	return diff * ROUTE_COST_TURN
}

/**
 * Das Mittenmaß einer Linie: der Mittelpunkt ihrer Luftlinie und deren halbe
 * Länge. Die halbe Länge ist zugleich die Entfernung des Mittelpunkts zu
 * beiden Enden und damit der Maßstab, an dem jede Stelle gemessen wird.
 */
function routeSpanOf(from, to) {
	return {
		midX: (from.x + to.x) / 2,
		midY: (from.y + to.y) / 2,
		half: Math.hypot(to.x - from.x, to.y - from.y) / 2,
	}
}

/** Wie weit ein Punkt von der Mitte weg liegt: 0 mittig, 1 am Ende oder weiter. */
function routeOffCenter(span, x, y) {
	if (!span || (span.half <= 0)) {
		return 0
	}
	const dx = x - span.midX
	const dy = y - span.midY
	return Math.min(1, Math.sqrt((dx * dx) + (dy * dy)) / span.half)
}

// ---------------------------------------------------------------------------
// Geometrie-Helfer
// ---------------------------------------------------------------------------

/** Entfernt Doppelpunkte und Stützpunkte, die mitten auf einer Geraden liegen. */
function compressPolyline(points) {
	const cleaned = []
	for (const point of points) {
		const last = cleaned[cleaned.length - 1]
		if (!!last && (Math.abs(last.x - point.x) < 0.001) && (Math.abs(last.y - point.y) < 0.001)) {
			continue
		}
		cleaned.push({ x: point.x, y: point.y })
	}
	if (cleaned.length < 3) {
		return cleaned
	}

	const result = [cleaned[0]]
	for (let i = 1; i < cleaned.length - 1; i++) {
		const prev = result[result.length - 1]
		const current = cleaned[i]
		const next = cleaned[i + 1]
		const cross = ((current.x - prev.x) * (next.y - current.y)) - ((current.y - prev.y) * (next.x - current.x))
		if (Math.abs(cross) > 0.001) {
			result.push(current)
		}
	}
	result.push(cleaned[cleaned.length - 1])
	return result
}

/** Ersetzt jede rechtwinklige Ecke durch eine 45°-Abschrägung. */
function chamferCorners(points, size) {
	if (points.length < 3) {
		return points.map((point) => ({ x: point.x, y: point.y }))
	}

	const result = [{ x: points[0].x, y: points[0].y }]
	for (let i = 1; i < points.length - 1; i++) {
		const prev = points[i - 1]
		const corner = points[i]
		const next = points[i + 1]

		const inLength = Math.hypot(corner.x - prev.x, corner.y - prev.y)
		const outLength = Math.hypot(next.x - corner.x, next.y - corner.y)
		if ((inLength < 0.001) || (outLength < 0.001)) {
			continue
		}

		const cut = Math.min(size, inLength / 2, outLength / 2)
		result.push({
			x: corner.x - ((corner.x - prev.x) / inLength * cut),
			y: corner.y - ((corner.y - prev.y) / inLength * cut),
		})
		result.push({
			x: corner.x + ((next.x - corner.x) / outLength * cut),
			y: corner.y + ((next.y - corner.y) / outLength * cut),
		})
	}
	result.push({ x: points[points.length - 1].x, y: points[points.length - 1].y })
	return result
}

/** Umschließendes Rechteck einer Punktfolge. */
function boundingBoxOf(points) {
	const box = {
		left: points[0].x,
		right: points[0].x,
		top: points[0].y,
		bottom: points[0].y,
	}
	for (const point of points) {
		if (point.x < box.left) box.left = point.x
		if (point.x > box.right) box.right = point.x
		if (point.y < box.top) box.top = point.y
		if (point.y > box.bottom) box.bottom = point.y
	}
	return box
}

/** Überschneiden sich zwei Rechtecke? */
function boxesOverlap(a, b) {
	if (a.right < b.left) return false
	if (a.left > b.right) return false
	if (a.bottom < b.top) return false
	if (a.top > b.bottom) return false
	return true
}

// ---------------------------------------------------------------------------
// Belegung durch bereits verlegte Linien
// ---------------------------------------------------------------------------

/**
 * Hält je Rasterzelle fest, wie weit die nächste gleich orientierte Linie
 * entfernt ist, und wie weit die dort verlaufende Linie an dieser Stelle von
 * ihrer eigenen Mitte weg ist.
 *
 * Der Abstand steckt als Halbbyte je Orientierung in einer Zahl: 0 heißt
 * „Linie läuft genau hier", 1 bis 14 den Abstand in Rasterzellen, 15 heißt
 * „keine Linie in Reichweite". Daraus speisen sich Überlagerung, Übersprung
 * und Gedränge. Vor jeder Suche werden die Werte in fensterlokale Felder
 * übertragen, sodass im heißen Pfad ein Feldzugriff je Zelle genügt.
 */
class OccupancyGrid {

	constructor() {
		this._distances = new Map()
		this._offCenters = new Map()
	}

	clear() {
		this._distances.clear()
		this._offCenters.clear()
	}

	/** Trägt einen fertigen Weg (Weltkoordinaten) in die Belegung ein. */
	markPath(points) {
		if (!points || (points.length < 2)) {
			return
		}

		const span = routeSpanOf(points[0], points[points.length - 1])
		for (const cell of this._rasterize(points)) {
			this._stampLine(cell.gx, cell.gy, cell.orientation)
			this._stampOffCenter(
				cell.gx,
				cell.gy,
				routeOffCenter(span, cell.gx * ROUTE_GRID_SIZE, cell.gy * ROUTE_GRID_SIZE)
			)
		}
	}

	/**
	 * Überträgt Abstände und Mittenmaße in die fensterlokalen Felder der Suche.
	 * Beide Felder decken das Rechteck `bounds` ab, zeilenweise abgelegt.
	 */
	fillWindow(bounds, width, height, distances, offCenters) {
		const size = width * height
		distances.fill(ROUTE_DISTANCE_EMPTY, 0, size)
		offCenters.fill(0, 0, size)

		for (const [key, packed] of this._distances) {
			const gx = Math.floor(key / (ROUTE_KEY_RANGE * 2)) - ROUTE_KEY_RANGE
			const gy = (key % (ROUTE_KEY_RANGE * 2)) - ROUTE_KEY_RANGE
			if ((gx < bounds.gxFrom) || (gx > bounds.gxTo) || (gy < bounds.gyFrom) || (gy > bounds.gyTo)) {
				continue
			}
			distances[((gy - bounds.gyFrom) * width) + (gx - bounds.gxFrom)] = packed
		}

		for (const [key, offCenter] of this._offCenters) {
			const gx = Math.floor(key / (ROUTE_KEY_RANGE * 2)) - ROUTE_KEY_RANGE
			const gy = (key % (ROUTE_KEY_RANGE * 2)) - ROUTE_KEY_RANGE
			if ((gx < bounds.gxFrom) || (gx > bounds.gxTo) || (gy < bounds.gyFrom) || (gy > bounds.gyTo)) {
				continue
			}
			offCenters[((gy - bounds.gyFrom) * width) + (gx - bounds.gxFrom)] = offCenter
		}
	}

	/** Zerlegt eine Punktfolge in die von ihr berührten Zellen samt Orientierung. */
	_rasterize(points) {
		const cells = []
		const append = (gx, gy, orientation) => {
			const last = cells[cells.length - 1]
			if (!!last && (last.gx === gx) && (last.gy === gy)) {
				return
			}
			cells.push({ gx, gy, orientation })
		}

		let from = this._toCell(points[0])
		for (let i = 1; i < points.length; i++) {
			const to = this._toCell(points[i])
			const dx = to.gx - from.gx
			const dy = to.gy - from.gy
			const orientation = routeOrientationOf(dx, dy)
			const steps = Math.max(Math.abs(dx), Math.abs(dy))
			if (steps === 0) {
				append(from.gx, from.gy, orientation)
			}
			for (let step = 0; step <= steps; step++) {
				append(
					Math.round(from.gx + ((dx * step) / steps)),
					Math.round(from.gy + ((dy * step) / steps)),
					orientation
				)
			}
			from = to
		}
		return cells
	}

	_toCell(point) {
		return {
			gx: Math.round(point.x / ROUTE_GRID_SIZE),
			gy: Math.round(point.y / ROUTE_GRID_SIZE),
		}
	}

	/** Setzt die Zelle selbst auf Abstand 0 und stempelt den Umkreis quer dazu. */
	_stampLine(gx, gy, orientation) {
		this._stampDistance(gx, gy, orientation, 0)

		const reach = ROUTE_LANE_CELLS[orientation] + ROUTE_LANE_SLACK
		for (let side = -1; side <= 1; side += 2) {
			for (let step = 1; step <= reach; step++) {
				const [ox, oy] = routePerpOffset(orientation, side, step)
				this._stampDistance(gx + ox, gy + oy, orientation, step)
			}
		}
	}

	_stampDistance(gx, gy, orientation, distance) {
		const key = routeCellKey(gx, gy)
		const packed = this._distances.get(key)
		const value = (packed === undefined) ? ROUTE_DISTANCE_EMPTY : packed
		const shift = orientation * 4
		if (((value >> shift) & 0xF) <= distance) {
			return
		}
		this._distances.set(key, (value & ~(0xF << shift)) | (distance << shift))
	}

	/** Bei mehreren Linien in einer Zelle zählt die außermittigste. */
	_stampOffCenter(gx, gy, offCenter) {
		const key = routeCellKey(gx, gy)
		if ((this._offCenters.get(key) || 0) >= offCenter) {
			return
		}
		this._offCenters.set(key, offCenter)
	}
}

// ---------------------------------------------------------------------------
// Hindernisse
// ---------------------------------------------------------------------------

/**
 * Sammelt die Flächen aller Operatoren samt Sicherheitsabstand als Rechtecke
 * in Weltkoordinaten und rastert sie auf Anfrage in das fensterlokale
 * Hindernisfeld einer Suche.
 */
class ObstacleIndex {

	constructor() {
		this._boxes = []
	}

	/** Sammelt die Flächen neu ein — nur Rechtecke, keine Rasterarbeit. */
	rebuild() {
		this._boxes.length = 0
		for (const control of AllControls) {
			if (!!control._parent) {
				continue
			}
			if (!control.hasRectBounds) {
				continue
			}
			this._boxes.push(obstacleBoxOf(control))
		}
	}

	/** Trägt die Flächen in ein fensterlokales Feld ein: 1 = gesperrte Zelle. */
	fillWindow(bounds, width, height, out) {
		out.fill(0, 0, width * height)
		for (const box of this._boxes) {
			const gxFrom = Math.max(bounds.gxFrom, Math.floor(box.left / ROUTE_GRID_SIZE))
			const gxTo = Math.min(bounds.gxTo, Math.ceil(box.right / ROUTE_GRID_SIZE))
			const gyFrom = Math.max(bounds.gyFrom, Math.floor(box.top / ROUTE_GRID_SIZE))
			const gyTo = Math.min(bounds.gyTo, Math.ceil(box.bottom / ROUTE_GRID_SIZE))

			for (let gy = gyFrom; gy <= gyTo; gy++) {
				const row = (gy - bounds.gyFrom) * width
				for (let gx = gxFrom; gx <= gxTo; gx++) {
					out[row + (gx - bounds.gxFrom)] = 1
				}
			}
		}
	}
}

/** Fläche eines Controls samt Sicherheitsabstand in Weltkoordinaten. */
function obstacleBoxOf(control) {
	const pos = control.actualPos
	return {
		left: pos.x - (control.width / 2) - ROUTE_OBSTACLE_MARGIN,
		right: pos.x + (control.width / 2) + ROUTE_OBSTACLE_MARGIN,
		top: pos.y - (control.height / 2) - ROUTE_OBSTACLE_MARGIN,
		bottom: pos.y + (control.height / 2) + ROUTE_OBSTACLE_MARGIN,
	}
}

// ---------------------------------------------------------------------------
// Wegsuche
// ---------------------------------------------------------------------------

/**
 * A*-Suche über acht Richtungen, geführt von der Kostenfunktion oben.
 *
 * Der Suchraum ist auf das Umfeld von Start und Ziel begrenzt. Jeder
 * Suchzustand — Zelle samt Anmarschrichtung — ist eine Zahl in
 * wiederverwendeten typisierten Feldern; eine Generationsnummer macht das
 * Leeren zwischen zwei Suchen überflüssig. Das hält die Suche schnell genug,
 * um beim Ziehen eines Operators in jedem Bild neu zu rechnen.
 */
class OctilinearPathFinder {

	constructor(occupancy, obstacles) {
		this._occupancy = occupancy
		this._obstacles = obstacles

		this._span = null
		this._generation = 0
		this._capacity = 0
		this._costs = new Float64Array(0)
		this._parents = new Int32Array(0)
		this._known = new Int32Array(0)
		this._closed = new Int32Array(0)

		// Fensterlokale Abbilder von Belegung und Hindernissen, einmal je Suche
		// gefüllt — der heiße Pfad kommt so ohne Nachschlagetabellen aus.
		this._cellCapacity = 0
		this._cellDistances = new Uint16Array(0)
		this._cellOffCenters = new Float32Array(0)
		this._cellObstacles = new Uint8Array(0)
		this._cellSpanOff = new Float32Array(0)
		this._cellSpanSeen = new Int32Array(0)
		this._gxFrom = 0
		this._gyFrom = 0
		this._width = 0
		this._startGx = 0
		this._startGy = 0
		this._goalGx = 0
		this._goalGy = 0

		this._heapValues = new Int32Array(4096)
		this._heapPriorities = new Float64Array(4096)
		this._heapSize = 0

		/** Untersuchte Knoten der letzten Suche — Kennzahl zum Abstimmen der Kosten. */
		this.lastExpansions = 0
	}

	/**
	 * Sucht den Weg zwischen zwei Rasterzellen.
	 *
	 * @param startDir Richtung, mit der der Weg im Startfeld ankommt (Absprung).
	 * @param goalDir  Richtung, mit der er das Zielfeld verlässt, oder -1.
	 * @param span     Mittenmaß der Linie, gegen das Knicke und Übersprünge
	 *                 gemessen werden.
	 * @returns Liste von Rasterzellen oder null, wenn kein Weg gefunden wurde.
	 */
	find(start, goal, startDir, goalDir, span) {
		this.lastExpansions = 0
		if ((start.gx === goal.gx) && (start.gy === goal.gy)) {
			return [{ gx: start.gx, gy: start.gy }]
		}

		this._span = span
		const bounds = this._boundsFor(start, goal)
		const width = (bounds.gxTo - bounds.gxFrom) + 1
		const height = (bounds.gyTo - bounds.gyFrom) + 1
		const states = ROUTE_DIRECTIONS.length + 1

		const budget = Math.min(
			ROUTE_MAX_EXPANSIONS,
			Math.max(ROUTE_MIN_EXPANSIONS, width * height * ROUTE_EXPANSIONS_PER_CELL)
		)

		const generation = this._prepare(width, height)
		this._gxFrom = bounds.gxFrom
		this._gyFrom = bounds.gyFrom
		this._width = width
		this._startGx = start.gx
		this._startGy = start.gy
		this._goalGx = goal.gx
		this._goalGy = goal.gy
		this._obstacles.fillWindow(bounds, width, height, this._cellObstacles)
		this._occupancy.fillWindow(bounds, width, height, this._cellDistances, this._cellOffCenters)

		const costs = this._costs
		const parents = this._parents
		const known = this._known
		const closed = this._closed
		this._heapSize = 0

		const startIndex = (((start.gy - bounds.gyFrom) * width) + (start.gx - bounds.gxFrom)) * states
			+ ((startDir < 0) ? DIR_NONE : startDir)
		known[startIndex] = generation
		costs[startIndex] = 0
		parents[startIndex] = -1
		this._heapPush(startIndex, this._heuristic(start.gx, start.gy, goal))

		let expansions = 0
		while (this._heapSize > 0) {
			const index = this._heapPop()
			if (closed[index] === generation) {
				continue // veralteter Eintrag, inzwischen wurde ein billigerer bearbeitet
			}
			closed[index] = generation

			const fromDir = index % states
			const cell = (index - fromDir) / states
			const localX = cell % width
			const fromGx = bounds.gxFrom + localX
			const fromGy = bounds.gyFrom + ((cell - localX) / width)

			if ((fromGx === goal.gx) && (fromGy === goal.gy)) {
				this.lastExpansions = expansions
				return this._reconstruct(index, bounds, width, states)
			}

			expansions += 1
			if (expansions > budget) {
				this.lastExpansions = expansions
				return null
			}

			const fromCost = costs[index]
			for (let dir = 0; dir < ROUTE_DIRECTIONS.length; dir++) {
				const step = ROUTE_DIRECTIONS[dir]
				const gx = fromGx + step.dx
				const gy = fromGy + step.dy
				if ((gx < bounds.gxFrom) || (gx > bounds.gxTo) || (gy < bounds.gyFrom) || (gy > bounds.gyTo)) {
					continue
				}

				const local = ((gy - bounds.gyFrom) * width) + (gx - bounds.gxFrom)
				const next = (local * states) + dir
				const isGoal = (gx === goal.gx) && (gy === goal.gy)
				const cost = fromCost + this._stepCost(fromDir, fromGx, fromGy, dir, gx, gy, isGoal, goalDir, local)
				if ((known[next] === generation) && (costs[next] <= cost)) {
					continue
				}

				known[next] = generation
				costs[next] = cost
				parents[next] = index
				// Ein bereits abgehakter Zustand kommt zurück ins Rennen, wenn sich ein
				// billigerer Weg zu ihm zeigt. Null steht für „offen", die Generationen
				// beginnen bei eins.
				closed[next] = 0
				this._heapPush(next, cost + this._heuristic(gx, gy, goal))
			}
		}
		this.lastExpansions = expansions
		return null
	}

	/** Stellt Felder für die nächste Suche bereit und liefert deren Generation. */
	_prepare(width, height) {
		this._generation += 1

		const cells = width * height
		if (cells > this._cellCapacity) {
			this._cellCapacity = Math.max(cells, 4096)
			this._cellDistances = new Uint16Array(this._cellCapacity)
			this._cellOffCenters = new Float32Array(this._cellCapacity)
			this._cellObstacles = new Uint8Array(this._cellCapacity)
			this._cellSpanOff = new Float32Array(this._cellCapacity)
			this._cellSpanSeen = new Int32Array(this._cellCapacity)
		}

		const size = cells * (ROUTE_DIRECTIONS.length + 1)
		if (size > this._capacity) {
			this._capacity = Math.max(size, 4096)
			this._costs = new Float64Array(this._capacity)
			this._parents = new Int32Array(this._capacity)
			this._known = new Int32Array(this._capacity)
			this._closed = new Int32Array(this._capacity)
		}
		return this._generation
	}

	_heapPush(value, priority) {
		if (this._heapSize >= this._heapValues.length) {
			const values = new Int32Array(this._heapValues.length * 2)
			const priorities = new Float64Array(this._heapPriorities.length * 2)
			values.set(this._heapValues)
			priorities.set(this._heapPriorities)
			this._heapValues = values
			this._heapPriorities = priorities
		}

		const values = this._heapValues
		const priorities = this._heapPriorities
		let index = this._heapSize
		this._heapSize += 1
		values[index] = value
		priorities[index] = priority

		while (index > 0) {
			const parent = (index - 1) >> 1
			if (priorities[parent] <= priorities[index]) {
				break
			}
			const tmpValue = values[parent]
			const tmpPriority = priorities[parent]
			values[parent] = values[index]
			priorities[parent] = priorities[index]
			values[index] = tmpValue
			priorities[index] = tmpPriority
			index = parent
		}
	}

	_heapPop() {
		const values = this._heapValues
		const priorities = this._heapPriorities
		const top = values[0]

		this._heapSize -= 1
		const size = this._heapSize
		if (size > 0) {
			values[0] = values[size]
			priorities[0] = priorities[size]
			let index = 0
			for (; ;) {
				const left = (index * 2) + 1
				if (left >= size) {
					break
				}
				const right = left + 1
				const smallest = ((right < size) && (priorities[right] < priorities[left])) ? right : left
				if (priorities[smallest] >= priorities[index]) {
					break
				}
				const tmpValue = values[smallest]
				const tmpPriority = priorities[smallest]
				values[smallest] = values[index]
				priorities[smallest] = priorities[index]
				values[index] = tmpValue
				priorities[index] = tmpPriority
				index = smallest
			}
		}
		return top
	}

	_boundsFor(start, goal) {
		const margin = Math.ceil(ROUTE_SEARCH_MARGIN / ROUTE_GRID_SIZE)
		return {
			gxFrom: Math.min(start.gx, goal.gx) - margin,
			gxTo: Math.max(start.gx, goal.gx) + margin,
			gyFrom: Math.min(start.gy, goal.gy) - margin,
			gyTo: Math.max(start.gy, goal.gy) + margin,
		}
	}

	/**
	 * Schätzt die Restkosten bis zum Ziel aus den reinen Grundkosten je Schritt.
	 * Billiger als seine Grundkosten kann kein Schritt werden, die Schätzung
	 * liegt also nie zu hoch — die Voraussetzung dafür, dass A* den billigsten
	 * Weg findet statt des zuerst erreichten.
	 */
	_heuristic(gx, gy, goal) {
		const dx = Math.abs(gx - goal.gx)
		const dy = Math.abs(gy - goal.gy)
		const straight = ROUTE_COST_STRAIGHT
		const diagonal = ROUTE_COST_DIAGONAL
		const estimate = (straight * (dx + dy)) + ((diagonal - (2 * straight)) * Math.min(dx, dy))
		return estimate * ROUTE_HEURISTIC_STRENGTH * ROUTE_TIE_BREAK
	}

	_stepCost(fromDir, fromGx, fromGy, dir, gx, gy, isGoal, goalDir, local) {
		const step = ROUTE_DIRECTIONS[dir]
		const isDiagonal = (step.dx !== 0) && (step.dy !== 0)
		let cost = isDiagonal ? ROUTE_COST_DIAGONAL : ROUTE_COST_STRAIGHT

		const nearPin = this._isNearPin(gx, gy)

		const turn = routeTurnCost(fromDir, dir)
		if (turn > 0) {
			cost += nearPin
				? turn
				: turn * (1 + (ROUTE_COST_TURN_OFF_CENTER * this._offCenter(gx, gy, local)))
		}
		if (isGoal && (goalDir >= 0)) {
			cost += routeTurnCost(dir, goalDir)
		}

		const orientation = dir % ORIENTATION_COUNT
		const packed = this._cellDistances[local]
		if (nearPin) {
			// Im Pin-Trichter zählen Knicke und Übersprünge nur den Grundwert.
			cost += this._crossingsIn(packed, orientation) * ROUTE_COST_CROSS
		}
		else {
			cost += this._spacingCost(packed, orientation)
			cost += this._crossingCost(packed, orientation, gx, gy, local)
		}

		if (this._cellObstacles[local] !== 0) {
			cost += ROUTE_COST_OBSTACLE
		}
		else if (isDiagonal) {
			// Diagonal zwischen zwei Hindernisecken hindurchzuschlüpfen ist keine Lücke.
			const cornerA = ((fromGy - this._gyFrom) * this._width) + (gx - this._gxFrom)
			const cornerB = ((gy - this._gyFrom) * this._width) + (fromGx - this._gxFrom)
			if ((this._cellObstacles[cornerA] !== 0) && (this._cellObstacles[cornerB] !== 0)) {
				cost += ROUTE_COST_OBSTACLE
			}
		}

		return cost
	}

	/** Bewertet den Abstand zur nächsten gleich laufenden Linie. */
	_spacingCost(packed, orientation) {
		const distance = (packed >> (orientation * 4)) & 0xF
		const lane = ROUTE_LANE_CELLS[orientation]

		if (distance === 0) {
			return ROUTE_COST_OVERLAP
		}
		if (distance < lane) {
			return (lane - distance) * ROUTE_COST_CROWDING
		}
		if (distance <= (lane + ROUTE_LANE_SLACK)) {
			return 0 // sauberer Spurabstand
		}
		return ROUTE_COST_LONELY
	}

	/**
	 * Bewertet das Überspringen fremder Linien. Zum Grundaufschlag kommt ein
	 * Anteil, der mit der Entfernung von der Mitte wächst — gemessen an der
	 * eigenen Linie wie an der übersprungenen, es zählt die außermittigere.
	 */
	_crossingCost(packed, orientation, gx, gy, local) {
		const crosses = this._crossingsIn(packed, orientation)
		if (crosses === 0) {
			return 0
		}

		const offCenter = Math.max(this._offCenter(gx, gy, local), this._cellOffCenters[local])
		return crosses * (ROUTE_COST_CROSS + (ROUTE_COST_CROSS_OFF_CENTER * offCenter))
	}

	/** Wie viele fremde Linien anderer Orientierung genau durch diese Zelle laufen. */
	_crossingsIn(packed, orientation) {
		let crosses = 0
		for (let other = 0; other < ORIENTATION_COUNT; other++) {
			if (other === orientation) {
				continue
			}
			if (((packed >> (other * 4)) & 0xF) === 0) {
				crosses += 1
			}
		}
		return crosses
	}

	/** Liegt die Zelle im Trichter um die eigene Start- oder Zielzelle? */
	_isNearPin(gx, gy) {
		if (
			(Math.abs(gx - this._startGx) <= ROUTE_PIN_FUNNEL_CELLS) &&
			(Math.abs(gy - this._startGy) <= ROUTE_PIN_FUNNEL_CELLS)
		) {
			return true
		}
		return (
			(Math.abs(gx - this._goalGx) <= ROUTE_PIN_FUNNEL_CELLS) &&
			(Math.abs(gy - this._goalGy) <= ROUTE_PIN_FUNNEL_CELLS)
		)
	}

	/**
	 * Wie weit eine Rasterzelle von der Mitte des gesuchten Wegs entfernt
	 * liegt. Der Wert je Zelle ist über die Suche konstant und wird beim
	 * ersten Zugriff im fensterlokalen Feld abgelegt — die Wurzel darin ist
	 * zu teuer, um sie je Nachbarschritt neu zu ziehen.
	 */
	_offCenter(gx, gy, local) {
		if (this._cellSpanSeen[local] === this._generation) {
			return this._cellSpanOff[local]
		}
		const offCenter = routeOffCenter(this._span, gx * ROUTE_GRID_SIZE, gy * ROUTE_GRID_SIZE)
		this._cellSpanSeen[local] = this._generation
		this._cellSpanOff[local] = offCenter
		return offCenter
	}

	/** Setzt den Weg aus den Vorgänger-Verweisen zusammen. */
	_reconstruct(index, bounds, width, states) {
		const cells = []
		let current = index
		while (current >= 0) {
			const dir = current % states
			const cell = (current - dir) / states
			const localX = cell % width
			cells.push({
				gx: bounds.gxFrom + localX,
				gy: bounds.gyFrom + ((cell - localX) / width),
			})
			current = this._parents[current]
		}
		cells.reverse()
		return cells
	}
}

// ---------------------------------------------------------------------------
// Vergabe der Wege an die Linien
// ---------------------------------------------------------------------------

/**
 * Hält Belegung und Hindernisse aktuell und verteilt die Wege an alle Linien.
 * Die Linien werden in fester Reihenfolge nacheinander verlegt; jede sieht
 * dabei die bereits verlegten und weicht ihnen aus oder legt sich daneben.
 *
 * Wird ein Operator bewegt, rechnen alle Linien mit, die durch den betroffenen
 * Bereich laufen — beim Ziehen wie beim Loslassen nach demselben Verfahren,
 * damit das Loslassen kein neues Bild wirft.
 */
class WireRouter {

	constructor() {
		this._occupancy = new OccupancyGrid()
		this._obstacles = new ObstacleIndex()
		this._pathFinder = new OctilinearPathFinder(this._occupancy, this._obstacles)
		this._geometry = null
		this._topology = null
		this._movedControl = null
		this._movedFromBox = null
		this._movedGeometry = null
		this._previewKey = null
		this._previewPath = null
		this._reportedFallbacks = 0

		/** Ob der zuletzt verlegte Weg aus dem Ersatzweg stammt. */
		this.usedFallback = false
	}

	/** Frame-Einstieg: hält die Wege aller vollständig verbundenen Linien aktuell. */
	updateRoutes(lines) {
		const moving = this._findMovingControl()
		if (!!moving) {
			this._beginMove(moving)
			const geometry = this._geometrySignature()
			if (geometry === this._movedGeometry) {
				return // gefasst, aber seit dem letzten Bild nicht bewegt
			}
			this._movedGeometry = geometry
			this._routeAround(lines, moving)
			this._previewKey = null
			return
		}

		if (!!this._movedControl) {
			// Das Loslassen rechnet nach demselben Verfahren wie das Ziehen und
			// wirft deshalb kein neues Bild.
			this._routeAround(lines, this._movedControl)
			this._endMove(lines)
			return
		}

		const geometry = this._geometrySignature()
		if (geometry !== this._geometry) {
			this._geometry = geometry
			this._topology = this._topologySignature(lines)
			this._previewKey = null
			this._routeSequence(lines, null)
			return
		}

		const topology = this._topologySignature(lines)
		if (topology !== this._topology) {
			this._topology = topology
			this._previewKey = null
			// Nur die neuen Linien suchen sich einen Weg, das bestehende Bild bleibt stehen.
			this._routeSequence(lines, this._withoutPath(lines))
		}
	}

	/**
	 * Weg für die Vorschaulinie am Mauszeiger. Das lose Ende bekommt keinen
	 * Absprung, und der Weg wird nicht in die Belegung eingetragen.
	 */
	previewRoute(line, mousePoint) {
		if (!line) {
			return null
		}
		const pin = line.start || line.end
		if (!pin || (!!line.start && !!line.end)) {
			return null
		}

		const gx = Math.round(mousePoint.x / ROUTE_GRID_SIZE)
		const gy = Math.round(mousePoint.y / ROUTE_GRID_SIZE)
		const key = `${this._geometry}|${this._topology}|${pin.zIndex}|${gx}|${gy}`
		if (key === this._previewKey) {
			return this._previewPath
		}
		this._previewKey = key

		const pinPos = pin.actualPos
		this._previewPath = this.routePath(
			{
				x: pinPos.x,
				y: pinPos.y,
				dir: pin.isOutput ? 1 : -1,
				escape: ROUTE_ESCAPE_LENGTH,
			},
			{
				x: mousePoint.x,
				y: mousePoint.y,
				dir: 0,
				escape: 0,
			}
		)
		return this._previewPath
	}

	/**
	 * Verlegt einen einzelnen Weg zwischen zwei Endpunkten.
	 * Ein Endpunkt ist `{ x, y, dir, escape }`; `dir` ist +1 für einen Absprung
	 * nach rechts, -1 nach links und 0 für ein loses Ende ohne Absprung.
	 */
	routePath(from, to) {
		if (Math.hypot(to.x - from.x, to.y - from.y) < ROUTE_DIRECT_DISTANCE) {
			this.usedFallback = false
			return compressPolyline([{ x: from.x, y: from.y }, { x: to.x, y: to.y }])
		}

		const startCell = this._escapeCell(from)
		const goalCell = this._escapeCell(to)

		const startDir = (from.dir > 0) ? DIR_EAST : ((from.dir < 0) ? DIR_WEST : -1)
		const goalDir = (to.dir > 0) ? DIR_WEST : ((to.dir < 0) ? DIR_EAST : -1)

		// Das Mittenmaß spannt sich zwischen den Pins, nicht zwischen den Absprungpunkten.
		const span = routeSpanOf(from, to)
		const cells = this._pathFinder.find(startCell, goalCell, startDir, goalDir, span)

		this.usedFallback = !cells
		const middle = !!cells
			? cells.map((cell) => this._cellToWorld(cell))
			: this._fallbackWaypoints(
				this._cellToWorld(startCell),
				this._cellToWorld(goalCell),
				(from.escape - ROUTE_ESCAPE_LENGTH) * 3
			)

		const points = [{ x: from.x, y: from.y }]
		for (const point of middle) {
			points.push(point)
		}
		points.push({ x: to.x, y: to.y })
		return compressPolyline(points)
	}

	/**
	 * Baut die Belegung von Grund auf neu und verlegt dabei die betroffenen
	 * Linien neu; alle übrigen behalten ihren Weg und bleiben Teil der Belegung.
	 * Mit einem Umfeld fließen nur Wege in die Belegung ein, die es berühren —
	 * weiter entfernte kann keine der Suchen zu Gesicht bekommen.
	 *
	 * @param affected Menge der neu zu verlegenden Linien, oder null für alle.
	 * @param region   Rechteck, das sämtliche Suchfenster enthält, oder null.
	 */
	_routeSequence(lines, affected, region = null) {
		const slots = new Map()
		this._obstacles.rebuild()
		this._occupancy.clear()

		let routed = 0
		let fallbacks = 0

		for (const line of lines) {
			if (!line.start || !line.end) {
				continue
			}

			// Die Absprungstufen werden für jede Linie vergeben, damit eine einzeln
			// neu verlegte Linie dieselbe Stufe behält wie im vollen Durchlauf.
			const startEscape = this._takeEscape(slots, line.start)
			const endEscape = this._takeEscape(slots, line.end)

			if (!affected || affected.has(line)) {
				const startPos = line.start.actualPos
				const endPos = line.end.actualPos
				line.path = this.routePath(
					{
						x: startPos.x,
						y: startPos.y,
						dir: line.start.isOutput ? 1 : -1,
						escape: startEscape,
					},
					{
						x: endPos.x,
						y: endPos.y,
						dir: line.end.isOutput ? 1 : -1,
						escape: endEscape,
					}
				)
				routed += 1
				if (this.usedFallback) {
					fallbacks += 1
				}
			}
			else if (!!region) {
				if (!line.path || (line.path.length < 2)) {
					continue
				}
				if (!boxesOverlap(boundingBoxOf(line.path), region)) {
					continue
				}
			}

			this._occupancy.markPath(line.path)
		}

		this._reportFallbacks(routed, fallbacks)
	}

	/**
	 * Meldet, wenn Wege im Ersatzweg gelandet sind. Die kennen weder Belegung
	 * noch Abstände, sehen aber wie gültige Wege aus — ohne Hinweis lässt sich
	 * das im Bild nicht auseinanderhalten. Gemeldet wird nur bei Änderung,
	 * damit das Ziehen eines Operators die Ausgabe nicht flutet.
	 */
	_reportFallbacks(routed, fallbacks) {
		if (!DEBUG || (fallbacks === this._reportedFallbacks)) {
			return
		}
		this._reportedFallbacks = fallbacks
		if (fallbacks > 0) {
			console.warn(
				`Leitungsführung: ${fallbacks} von ${routed} Wegen über den Ersatzweg — `
				+ 'Knotenbudget erschöpft, diese Wege ignorieren Belegung und Abstände.'
			)
		}
	}

	_beginMove(control) {
		if (this._movedControl === control) {
			return
		}
		this._movedControl = control
		this._movedFromBox = obstacleBoxOf(control)
		this._movedGeometry = null
	}

	_endMove(lines) {
		this._movedControl = null
		this._movedFromBox = null
		this._movedGeometry = null
		this._geometry = this._geometrySignature()
		this._topology = this._topologySignature(lines)
		this._previewKey = null
	}

	/**
	 * Verlegt alle Linien im Umfeld eines bewegten Operators neu. Belegung und
	 * Hindernisse werden dabei nur für das Rechteck aufgebaut, das sämtliche
	 * Suchfenster der betroffenen Linien enthält — die übrige Welt bleibt außen
	 * vor, damit das Ziehen nicht mit der Zahl der Operatoren teurer wird.
	 */
	_routeAround(lines, control) {
		const influence = this._influenceRegion(control)
		const affected = this._affectedByMove(lines, control, influence)
		const region = this._regionFor(affected, influence)
		this._routeSequence(lines, affected, region)
	}

	/** Erweitert ein Umfeld um die Suchfenster aller neu zu verlegenden Linien. */
	_regionFor(affected, base) {
		const margin = ROUTE_SEARCH_MARGIN + ROUTE_ESCAPE_LENGTH
			+ (ROUTE_ESCAPE_SLOTS * ROUTE_ESCAPE_STAGGER) + ROUTE_LANE_SPACING
		const region = { left: base.left, right: base.right, top: base.top, bottom: base.bottom }
		for (const line of affected) {
			const startPos = line.start.actualPos
			const endPos = line.end.actualPos
			region.left = Math.min(region.left, Math.min(startPos.x, endPos.x) - margin)
			region.right = Math.max(region.right, Math.max(startPos.x, endPos.x) + margin)
			region.top = Math.min(region.top, Math.min(startPos.y, endPos.y) - margin)
			region.bottom = Math.max(region.bottom, Math.max(startPos.y, endPos.y) + margin)
		}
		return region
	}

	/** Alle Linien, die am bewegten Operator hängen oder durch sein Umfeld laufen. */
	_affectedByMove(lines, control, region) {
		const affected = new Set()
		for (const line of lines) {
			if (!line.start || !line.end) {
				continue
			}
			if (!line.path || (line.path.length < 2)) {
				affected.add(line)
				continue
			}
			if (this._isAttached(line, control)) {
				affected.add(line)
				continue
			}
			if (boxesOverlap(boundingBoxOf(line.path), region)) {
				affected.add(line)
			}
		}
		return affected
	}

	/** Umfeld des bewegten Operators, von seiner Ausgangs- bis zur jetzigen Lage. */
	_influenceRegion(control) {
		const now = obstacleBoxOf(control)
		const from = this._movedFromBox || now
		return {
			left: Math.min(now.left, from.left) - ROUTE_MOVE_INFLUENCE,
			right: Math.max(now.right, from.right) + ROUTE_MOVE_INFLUENCE,
			top: Math.min(now.top, from.top) - ROUTE_MOVE_INFLUENCE,
			bottom: Math.max(now.bottom, from.bottom) + ROUTE_MOVE_INFLUENCE,
		}
	}

	_withoutPath(lines) {
		const pending = new Set()
		for (const line of lines) {
			if (!line.start || !line.end) {
				continue
			}
			if (!line.path || (line.path.length < 2)) {
				pending.add(line)
			}
		}
		return pending
	}

	_takeEscape(slots, pin) {
		const owner = pin._parent || pin
		const used = slots.get(owner) || 0
		slots.set(owner, used + 1)
		return ROUTE_ESCAPE_LENGTH + ((used % ROUTE_ESCAPE_SLOTS) * ROUTE_ESCAPE_STAGGER)
	}

	_escapeCell(endPoint) {
		return {
			gx: Math.round((endPoint.x + (endPoint.dir * endPoint.escape)) / ROUTE_GRID_SIZE),
			gy: Math.round(endPoint.y / ROUTE_GRID_SIZE),
		}
	}

	_cellToWorld(cell) {
		return {
			x: cell.gx * ROUTE_GRID_SIZE,
			y: cell.gy * ROUTE_GRID_SIZE,
		}
	}

	/**
	 * Ersatzweg, wenn die Suche ihr Knotenbudget aufbraucht: abgeschrägtes Z
	 * bzw. C. Der Mittelbalken wird je Absprungstufe seitlich versetzt, damit
	 * mehrere Ersatzwege nicht auf derselben Spur übereinanderliegen.
	 */
	_fallbackWaypoints(start, goal, offset) {
		const corners = [start]
		if ((goal.x - start.x) >= (ROUTE_GRID_SIZE * 2)) {
			const midX = Math.round((((start.x + goal.x) / 2) + offset) / ROUTE_GRID_SIZE) * ROUTE_GRID_SIZE
			corners.push({ x: midX, y: start.y })
			corners.push({ x: midX, y: goal.y })
		}
		else {
			const midY = Math.round((((start.y + goal.y) / 2) + offset) / ROUTE_GRID_SIZE) * ROUTE_GRID_SIZE
			corners.push({ x: start.x, y: midY })
			corners.push({ x: goal.x, y: midY })
		}
		corners.push(goal)
		return chamferCorners(corners, ROUTE_CHAMFER)
	}

	_findMovingControl() {
		for (const control of AllControls) {
			if (control.isMoving === true) {
				return control
			}
		}
		return null
	}

	_isAttached(line, control) {
		return this._belongsTo(line.start, control) || this._belongsTo(line.end, control)
	}

	_belongsTo(pin, control) {
		let node = pin
		while (!!node) {
			if (node === control) {
				return true
			}
			node = node._parent
		}
		return false
	}

	/** Kennzahl über Lage und Größe aller Operatoren samt ihrer Anschlüsse. */
	_geometrySignature() {
		let hash = 2166136261
		for (const control of AllControls) {
			if (!!control.hasCircleBounds) {
				hash = Math.imul(hash ^ (control.pos.y | 0), 16777619)
				continue
			}
			if (!!control._parent) {
				continue
			}
			hash = Math.imul(hash ^ (control.pos.x | 0), 16777619)
			hash = Math.imul(hash ^ (control.pos.y | 0), 16777619)
			hash = Math.imul(hash ^ (control.width | 0), 16777619)
			hash = Math.imul(hash ^ (control.height | 0), 16777619)
		}
		return hash
	}

	/** Kennzahl darüber, welche Anschlüsse miteinander verbunden sind. */
	_topologySignature(lines) {
		let hash = 2166136261
		for (const line of lines) {
			if (!line.start || !line.end) {
				continue
			}
			hash = Math.imul(hash ^ (line.start.zIndex | 0), 16777619)
			hash = Math.imul(hash ^ (line.end.zIndex | 0), 16777619)
		}
		return hash
	}
}

const wireRouter = new WireRouter()
