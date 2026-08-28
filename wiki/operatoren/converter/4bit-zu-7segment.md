# 4bit to 7 Segment decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Eine [7-Segment-Anzeige](../display/7segment-display.md) versteht keine
Zahlen — sie hat nur sieben Leuchtbalken, die einzeln an- und ausgeschaltet
werden. Dieser Decoder ist der **Übersetzer**: Er bekommt eine Zahl von
0 bis 15 (als vier Bits) und schaltet genau die Segmente an, die diese
Ziffer formen. Ab 10 zeigt er die Hex-Ziffern A bis F (siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B0`…`B3` | Eingang | Bit | Die Ziffer als vier Bits (Werte 1, 2, 4, 8) |
| `D` | Eingang | Bit | Der Punkt — wird unverändert durchgereicht |
| `S1`…`S7` | Ausgang | Bit | Die sieben Segmente (oben, oben links, oben rechts, Mitte, unten links, unten rechts, unten) |
| `D` | Ausgang | Bit | Der Punkt |

## Ausprobieren

Hier hängt der Decoder fertig verdrahtet an einer Anzeige. Stelle mit den
Bits eine Ziffer ein — z. B. `B0` + `B2` für die 5:

```operatorsv2
{
	"opAll": [
		{ "_#new": "4bit to 7 Segment decoder", "_id": "dec1", "_x": -120, "_y": 0 },
		{ "_#new": "7 Segment Display", "_id": "seg1", "_x": 80, "_y": 0 }
	],
	"conAll": [
		{ "s": "dec1_out_S1", "e": "seg1_in_S1" },
		{ "s": "dec1_out_S2", "e": "seg1_in_S2" },
		{ "s": "dec1_out_S3", "e": "seg1_in_S3" },
		{ "s": "dec1_out_S4", "e": "seg1_in_S4" },
		{ "s": "dec1_out_S5", "e": "seg1_in_S5" },
		{ "s": "dec1_out_S6", "e": "seg1_in_S6" },
		{ "s": "dec1_out_S7", "e": "seg1_in_S7" },
		{ "s": "dec1_out_D", "e": "seg1_in_D" }
	]
}
```

## Einsatzideen

- **Sichtbares Zählwerk**: [Counter4](../memory/counter4.md) → Decoder →
  Anzeige; die Bit-Ausgänge des Zählers passen direkt auf die Bit-Eingänge.
- **Mehrstellige Zahlen**: Je Stelle ein
  [Base Converter](base-converter.md), ein
  [Byte to 4bit decoder](byte-zu-4bit.md), ein Segment-Decoder und eine
  Anzeige — das Uhren-Beispiel *clock* (📚-Examples-Menü im Editor) führt
  die komplette Kette vor.
- **Hex-Anzeige**: Zwei Decoder zeigen die beiden Hälften eines Bytes als
  Hex-Code — die untere Hälfte direkt, die obere über einen
  [Byte to 8bit decoder](byte-zu-8bit.md) (Bits `B4`–`B7` auf `B0`–`B3`
  der zweiten Stelle).

## Siehe auch

[7 Segment Display](../display/7segment-display.md) ·
[Base Converter](base-converter.md) · [Counter4](../memory/counter4.md)
