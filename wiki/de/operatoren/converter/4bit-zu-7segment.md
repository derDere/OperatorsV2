# 4bit to 7 Segment decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Die eckigen Ziffern auf einem Wecker oder einer Mikrowelle sind aus
sieben einzelnen Leuchtbalken zusammengesetzt, die für sich an- und
ausgehen: Leuchten alle bis auf den mittleren, siehst du eine 0;
leuchten nur die beiden rechten, eine 1. Eine solche
[7-Segment-Anzeige](../display/7segment-display.md) versteht selbst keine
Zahlen — sie kennt nur ihre sieben Balken.

Dieser Decoder ist der **Übersetzer** dazwischen: Er bekommt eine Zahl von
0 bis 15, und zwar als vier Bits mit den Werten 1, 2, 4 und 8, und
schaltet genau die Balken an, die diese Ziffer formen. Über die 9 hinaus
gibt es keine einzelnen Ziffern mehr, deshalb zeigt er ab 10 die
Buchstaben A, B, C, D, E und F — A steht dann für 10, F für 15. Diese
Schreibweise mit 16 Ziffern heißt Hex-Code (siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B0`…`B3` | Eingang | Bit | Die Ziffer als vier Bits (Werte 1, 2, 4, 8) |
| `D` | Eingang | Bit | Der Punkt neben der Ziffer — er wird einfach durchgereicht |
| `S1`…`S7` | Ausgang | Bit | Die sieben Leuchtbalken (oben, oben links, oben rechts, Mitte, unten links, unten rechts, unten) |
| `D` | Ausgang | Bit | Der Punkt, so wie er hereinkam |

## Ausprobieren

Hier hängt der Decoder fertig verdrahtet an einer Anzeige. Stelle mit den
Bits eine Ziffer ein — z. B. `B0` (1) und `B2` (4) für die 5, denn
1 + 4 = 5:

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

- **Zähler zum Zusehen**: [Counter4](../memory/counter4.md) → Decoder →
  Anzeige. Die vier Bit-Ausgänge des Zählers passen genau auf die vier
  Bit-Eingänge, und die Anzeige zählt sichtbar mit.
- **Zahlen mit mehreren Ziffern**: Für jede Ziffer brauchst du einen
  [Base Converter](base-converter.md), einen
  [Byte to 4bit decoder](byte-zu-4bit.md), einen Segment-Decoder und eine
  Anzeige. Das Uhren-Beispiel *clock* (📚-Examples-Menü im Editor) führt
  diese Kette komplett vor.
- **Ein ganzes Byte anzeigen**: Zwei Decoder und zwei Anzeigen zeigen jede
  Zahl von 0 bis 255 als zwei Hex-Zeichen. Zerlege das Byte dafür mit dem
  [Byte to 8bit decoder](byte-zu-8bit.md): Die vier Bits mit den kleinen
  Werten (`B0`–`B3`, also 1, 2, 4, 8) gehen auf die rechte Ziffer, die
  vier mit den großen Werten (`B4`–`B7`, also 16, 32, 64, 128) auf die
  Eingänge `B0`–`B3` der linken Ziffer.

## Siehe auch

[7 Segment Display](../display/7segment-display.md) ·
[Base Converter](base-converter.md) · [Counter4](../memory/counter4.md)
