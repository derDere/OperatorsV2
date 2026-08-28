# Base Converter

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der Base Converter beantwortet eine Frage, die jede Anzeige stellt: **„Wie
lauten die einzelnen Ziffern dieser Zahl?"** Er spaltet von einer Zahl die
**niedrigste Ziffer** ab — standardmäßig im Zehnersystem. Aus 137 wird:
Ziffer `V` = 7 und Rest `O` = 13. Schickt man den Rest in einen zweiten
Base Converter, kommt die nächste Ziffer heraus (3, Rest 1) — so entsteht
Ziffer für Ziffer die ganze Zahl.

Mathematisch gilt: `V` = Zahl **mod** Basis, `O` = Zahl **geteilt durch**
Basis (ganzzahlig).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, deren niedrigste Ziffer abgespalten wird |
| `V` | Ausgang | Byte | Die niedrigste Ziffer (im Zehnersystem: 0–9) |
| `O` | Ausgang | Byte | Der Rest der Zahl — Futter für die nächste Stufe |

Im Properties-Fenster stellt **Base** das Zahlensystem ein: *Decimal*
(Zehner, Standard), *Octal* (Achter) oder *Binary* (Zweier).

## Ausprobieren

Zwei Stufen in Reihe zerlegen deine Zahl in Einer, Zehner und Hunderter.
Stelle links z. B. 137 ein — rechts erscheinen von oben nach unten:
die Einer (7), die Zehner (3) und die Hunderter (1):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Base Converter", "_id": "conv1", "_x": -100, "_y": 0 },
		{ "_#new": "Base Converter", "_id": "conv2", "_x": 100, "_y": 60 }
	],
	"conAll": [
		{ "s": "conv1_out_O", "e": "conv2_in_B" }
	]
}
```

(Die Kästchen zeigen Werte als Hex-Code — hier bleiben Ziffern 0–9 zum
Glück in beiden Schreibweisen gleich.)

## Einsatzideen

- **Dezimal-Anzeige**: Je Stufe die Ziffer `V` über einen
  [Byte to 4bit decoder](byte-zu-4bit.md) und einen
  [4bit to 7 Segment decoder](4bit-zu-7segment.md) auf eine
  [Ziffernanzeige](../display/7segment-display.md) geben — genau so zeigt
  das Uhren-Beispiel *clock* (📚-Examples-Menü im Editor) Stunden und
  Minuten zweistellig an.
- **Zahlen als Text**: Ziffer + 48 ([Add](../math/add.md)) ergibt den
  Zeichencode der Ziffer (`0` hat Code 48) — damit schreibt man Zahlen auf
  das [Terminal Display](../display/terminal-display.md).
- **Zweiersystem erleben**: Base auf *Binary* stellen und eine Kette
  bauen — die Stufen liefern nacheinander die Bits der Zahl.

## Siehe auch

[Divide](../math/divide.md) und [Modulo](../math/modulo.md) (dieselbe
Rechnung einzeln) · [4bit to 7 Segment decoder](4bit-zu-7segment.md)
