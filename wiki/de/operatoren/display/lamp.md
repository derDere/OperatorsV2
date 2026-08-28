# Lamp

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Die Lamp ist die **Glühbirne** der Schaltung: Sie leuchtet, solange ihr
Eingang an ist. Auf der Panelfläche rechts im Editor erscheint sie
zusätzlich als Leuchte mit Schein; die Farbe stellst du in den Properties
ein — dem Einstellungs-Fenster, das sich öffnet, wenn du den Baustein
anklickst.

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

- **Sehen, was los ist**: Häng an jede wichtige Leitung eine Lampe — so
  siehst du beim Bauen sofort, wo ein Signal an ist und wo nicht.
- **Licht-Muster für Zahlen**: Acht Lampen hinter einem
  [Byte to 8bit decoder](../converter/byte-zu-8bit.md) zeigen ein ganzes
  Byte als Muster aus An und Aus — der erste Schritt zu einer Uhr, die
  die Zeit als Lichtmuster zeigt (die Zeit liefert
  [Time](../signal/time.md)).
- **Ampeln und Warnlichter**: Mit mehreren, unterschiedlich gefärbten
  Lampen und etwas [Logik](../logic/and.md) baust du Ampelphasen,
  Warnblinker oder eine „Gerät läuft“-Anzeige.
- Für Zahlen statt an/aus gibt es das [Byte](byte.md)-Display, für
  Ziffern die [7-Segment-Anzeige](7segment-display.md) — die eckigen
  Ziffern wie auf einem Wecker.

## Siehe auch

[Byte](byte.md) · [7 Segment Display](7segment-display.md) ·
[Switch](../user-input/switch.md)
