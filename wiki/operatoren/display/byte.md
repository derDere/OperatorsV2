# Byte

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Das Byte-Display ist die **Zahlenanzeige**: Es zeigt den Wert an seinem
Eingang in beliebigen Schreibweisen — als Binärmuster, Oktal-, Dezimal-
oder Hex-Zahl und sogar als Zeichen. Auf der Panelfläche rechts im Editor
erscheint der Wert groß und formatierbar (Schriftart, Größe, Farben);
welche Schreibweisen gezeigt werden, stellst du in den Properties per
Häkchen ein — auch mehrere gleichzeitig.

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
| Show Bin | `0b01000001` |
| Show Oct | `0o101` |
| Show Dec | `0d065` |
| Show Hex | `0x41` |
| Show Char | `'A'c` |

Die Vorsilben (`0b`, `0x` …) und führenden Nullen lassen sich abschalten
(„Advanced Display" bzw. „Show Leading Zeros"), das Trennzeichen zwischen
mehreren Schreibweisen ist frei wählbar.

## Einsatzideen

- **Debug-Anzeige**: Beim Bauen an jede interessante Byte-Leitung ein
  Byte-Display hängen — man sieht sofort, was wirklich fließt.
- **Lern-Werkzeug**: Bin, Dec und Hex gleichzeitig einblenden und live
  sehen, wie dieselbe Zahl in allen Systemen aussieht — die praktische
  Ergänzung zu [Bits und Bytes](../../grundlagen/bits-und-bytes.md).
- **Schöne Anzeigen**: Mit Schriftgröße und Farben wird aus dem
  Debug-Helfer eine gestaltete Anzeige auf der Panelfläche — im
  Uhren-Beispiel *clock* (📚-Examples-Menü) zeigt so ein Display die
  Sekunden.

## Siehe auch

[Lamp](lamp.md) · [7 Segment Display](7segment-display.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
