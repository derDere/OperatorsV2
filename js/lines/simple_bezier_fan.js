/** Schrittweite s zwischen zwei benachbarten Strängen eines Bündels (Pixel). */
const SIMPLE_BEZIER_FAN_SPACING = 8

/** Mindestlänge, die ein waagerechter Absprung nach dem Versatz behalten muss (Pixel). */
const SIMPLE_BEZIER_MIN_STUB = 2

/** Ersatz für „unbegrenzt" bei einseitigen Versatz-Budgets (Pixel). */
const SIMPLE_BEZIER_FAN_OPEN = 1000000

/** Alle lebenden SimpleBezier-Linien; gepflegt von Konstruktor und kill(). */
const AllSimpleBezierLines = []

/**
 * Auffächern exakt übereinanderliegender Senkrechten (siehe
 * dev/simplebezier_offset_example.html).
 *
 * Senkrechte Teilstücke mehrerer SimpleBezier-Linien, die auf derselben
 * x-Position liegen und sich im y-Bereich kettenweise überlappen, bilden ein
 * Bündel. Jedes Bündel wird mit fester Schrittweite symmetrisch um die
 * ursprüngliche Lage aufgefächert: Versatz der i-ten Linie = (i − (N−1)/2)·s.
 * Die Reihenfolge folgt der Richtungsregel — bei abwärts laufenden Linien
 * liegt die insgesamt höhere Linie rechts, bei aufwärts laufenden links —
 * sodass das Bild parallel versetzter echter Bezierkurven entsteht. Reicht
 * das Versatz-Budget eines Strangs nicht (ein Absprung oder eine Diagonale
 * würde zu kurz), rückt das ganze Bündel enger zusammen.
 *
 * Zur Performance: der Abgleich läuft höchstens einmal je Bild und rechnet
 * die Bündel nur neu, wenn sich seit dem letzten Mal eine Linien-Grundform
 * geändert hat oder Linien dazugekommen bzw. verschwunden sind. Im
 * Ruhezustand kostet er je Linie nur den Endlagen-Vergleich ihres
 * Zwischenspeichers.
 */

/** Bild, für das der Abgleich zuletzt gelaufen ist. */
var simpleBezierFanFrame = -1

/** Zählt Hinzufügen und Entfernen von Linien. */
var simpleBezierFanRevision = 0

/** Stand von simpleBezierFanRevision beim letzten Bündeln. */
var simpleBezierFanGroupedRevision = -1

/** Meldet eine hinzugefügte oder entfernte Linie an. */
function simpleBezierFanInvalidate() {
	simpleBezierFanRevision += 1
}

/**
 * Frame-Einstieg: bringt die Grundformen aller Linien auf Stand und bündelt
 * neu, sobald sich irgendetwas geändert hat. Läuft höchstens einmal je Bild.
 */
function simpleBezierFanSync() {
	if (simpleBezierFanFrame === mainP5.frameCount) {
		return
	}
	simpleBezierFanFrame = mainP5.frameCount

	let changed = (simpleBezierFanGroupedRevision !== simpleBezierFanRevision)
	for (const line of AllSimpleBezierLines) {
		if (line._updateBase()) {
			changed = true
		}
	}
	if (!changed) {
		return
	}
	simpleBezierFanGroupedRevision = simpleBezierFanRevision
	simpleBezierFanRegroup()
}

/**
 * Bündelt alle Senkrechten neu und verteilt die Versätze. Linien, deren
 * Versatz sich dabei ändert, werden zum Neuaufbau ihres Wegs markiert.
 */
function simpleBezierFanRegroup() {
	// Senkrechte nach x-Lage eintüten (auf halbe Pixel gerundet); dabei alle
	// Versätze zurücksetzen, damit aufgelöste Bündel wieder mittig laufen.
	const buckets = new Map()
	for (const line of AllSimpleBezierLines) {
		for (const vertical of line._verticals) {
			vertical.shift = 0
			const key = Math.round(vertical.x * 2)
			let list = buckets.get(key)
			if (!list) {
				list = []
				buckets.set(key, list)
			}
			list.push(vertical)
		}
	}

	// Je x-Lage: kettenweise überlappende y-Bereiche bilden ein Bündel.
	for (const list of buckets.values()) {
		if (list.length < 2) {
			continue
		}
		list.sort((p, q) => p.y0 - q.y0)

		let chainStart = 0
		let chainBottom = list[0].y1
		for (let i = 1; i <= list.length; i++) {
			if ((i < list.length) && (list[i].y0 <= (chainBottom + 0.5))) {
				if (list[i].y1 > chainBottom) {
					chainBottom = list[i].y1
				}
				continue
			}
			if ((i - chainStart) >= 2) {
				simpleBezierFanSpread(list.slice(chainStart, i))
			}
			if (i < list.length) {
				chainStart = i
				chainBottom = list[i].y1
			}
		}
	}

	// Geänderte Versätze anwenden lassen.
	for (const line of AllSimpleBezierLines) {
		for (const vertical of line._verticals) {
			if (vertical.shift !== vertical.applied) {
				line._finalDirty = true
				break
			}
		}
	}
}

/**
 * Verteilt ein Bündel auf Plätze mit fester Schrittweite, symmetrisch um die
 * ursprüngliche Lage. Sortiert wird nach dem Ordnungsschlüssel der
 * Senkrechten (Richtungsregel); reicht ein Budget nicht, schrumpft die
 * Schrittweite des ganzen Bündels, damit alle Stränge getrennt bleiben.
 */
function simpleBezierFanSpread(group) {
	group.sort((p, q) => p.order - q.order)

	const half = (group.length - 1) / 2
	let spacing = SIMPLE_BEZIER_FAN_SPACING
	for (let i = 0; i < group.length; i++) {
		const slot = i - half
		if (slot > 0) {
			spacing = Math.min(spacing, group[i].hi / slot)
		}
		else if (slot < 0) {
			spacing = Math.min(spacing, group[i].lo / slot)
		}
	}
	if (spacing < 0) {
		spacing = 0
	}

	for (let i = 0; i < group.length; i++) {
		group[i].shift = (i - half) * spacing
	}
}
