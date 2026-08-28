# Lamp

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Die Lamp ist die **Glühbirne** der Schaltung: Sie leuchtet, solange ihr
Eingang an ist. Auf der Panelfläche rechts im Editor erscheint sie
zusätzlich als hübsche Leuchte mit Schein; die Farbe stellst du in den
Properties ein.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I` | Eingang | Bit | Die Lampe leuchtet, solange dieser Eingang an ist |

## Ausprobieren

Schalte den Eingang an:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Lamp", "_id": "lamp1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zustände sichtbar machen**: Jede wichtige Leitung bekommt ihre Lampe —
  beim Bauen und Fehlersuchen unbezahlbar.
- **Binär-Anzeigen**: Acht Lampen hinter einem
  [Byte to 8bit decoder](../converter/byte-zu-8bit.md) zeigen ein ganzes
  Byte als Lichtmuster — die Vorstufe zur Binäruhr (Zeit liefert
  [Time](../signal/time.md)).
- **Ampeln und Statusleuchten**: Mit mehreren, unterschiedlich gefärbten
  Lampen und etwas [Logik](../logic/and.md) entstehen Ampelphasen,
  Warnleuchten, Betriebsanzeigen.
- Für Zahlen statt an/aus gibt es das [Byte](byte.md)-Display, für
  Ziffern die [7-Segment-Anzeige](7segment-display.md).

## Siehe auch

[Byte](byte.md) · [7 Segment Display](7segment-display.md) ·
[Switch](../user-input/switch.md)
