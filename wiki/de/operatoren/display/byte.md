# Byte

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Das Byte-Display ist die **Zahlenanzeige** der Schaltung: Es zeigt die
Zahl an seinem Eingang — in der Schreibweise, die du dir aussuchst. Ein
und dieselbe Zahl lässt sich nämlich verschieden aufschreiben: als
gewohnte Zahl, als reine Kette aus Nullen und Einsen, als kurzen
**Hex-Code** aus Ziffern und Buchstaben (ausführlich erklärt in
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)) — und sogar als
Zeichen, denn jeder Buchstabe hat eine feste Zahl; diese Zuordnung heißt
**ASCII**. Auf der Panelfläche rechts im Editor erscheint der Wert groß
und lässt sich gestalten (Schriftart, Größe, Farben); welche
Schreibweisen gleichzeitig zu sehen sind, wählst du in den Properties
per Häkchen aus.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Der Wert, der angezeigt wird |

## Ausprobieren

Stelle links eine Zahl ein — der Baustein zeigt sie als Hex-Code und
darunter als Zeichen (probiere z. B. 65, das `A`):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte", "_id": "byte1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Die Schreibweisen

| Einstellung | Beispiel für den Wert 65 |
| --- | --- |
| Show Bin — Binär, nur Nullen und Einsen | `0b01000001` |
| Show Oct — Oktal, zählt nur bis 7, bevor eine neue Stelle beginnt | `0o101` |
| Show Dec — Dezimal, unsere gewohnte Zahl | `0d065` |
| Show Hex — der Hex-Code von oben | `0x41` |
| Show Char — das ASCII-Zeichen von oben | `'A'c` |

Die Vorsilben (`0b`, `0x` …) und führenden Nullen lassen sich abschalten
(„Advanced Display" bzw. „Show Leading Zeros"), das Trennzeichen zwischen
mehreren Schreibweisen ist frei wählbar.

## Einsatzideen

- **Sehen, was wirklich fließt**: Häng beim Bauen an jede interessante
  Byte-Leitung ein Byte-Display — schon siehst du die Zahl, die gerade
  durchläuft.
- **Lern-Werkzeug**: Zeig Bin, Dec und Hex gleichzeitig an und beobachte
  live, wie dieselbe Zahl in jeder Schreibweise aussieht — die
  praktische Ergänzung zu
  [Bits und Bytes](../../grundlagen/bits-und-bytes.md).
- **Schöne Anzeigen**: Mit Schriftgröße und Farben wird daraus eine
  gestaltete Anzeige auf der Panelfläche — im Uhren-Beispiel *clock*
  (📚-Examples-Menü) zeigt so ein Display die Sekunden.

## Siehe auch

[Lamp](lamp.md) · [7 Segment Display](7segment-display.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
