# Counter4

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Counter4 ist der kleine Bruder des [Counter8](counter8.md): Er zählt nur
von 0 bis 15 — dafür spricht er **Bit für Bit**. Statt eines Byte-Ausgangs
hat er vier einzelne Bit-Ausgänge (`B0`…`B3`), und auch geladen wird über
vier einzelne Bits. Das passt perfekt zu Bausteinen, die mit einzelnen
Leitungen arbeiten, etwa dem
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I` | Eingang | Bit | Steigende Flanke: +1 |
| `D` | Eingang | Bit | Steigende Flanke: −1 |
| `R` | Eingang | Bit | Reset: hält den Stand auf 0, solange an |
| `B0`…`B3` | Eingang | Bit | Startwert-Bits für das Laden (Wert 1, 2, 4, 8) |
| `L` | Eingang | Bit | Steigende Flanke: übernimmt die Startwert-Bits |
| `U` | Ausgang | Bit | Ein Tick an beim Unterlauf (springt auf 15) |
| `B0`…`B3` | Ausgang | Bit | Der Zählerstand als vier einzelne Bits |
| `O` | Ausgang | Bit | Ein Tick an beim Überlauf (springt auf 0) |

## Ausprobieren

Zähle mit `I` hoch und lies den Stand an den vier Bit-Ausgängen ab — wie
das Zusammenzählen funktioniert, zeigt
[Bits und Bytes](../../grundlagen/bits-und-bytes.md):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Counter4", "_id": "cnt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Ziffernanzeige antreiben**: `B0`…`B3` passen direkt auf den
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) — Zähler,
  Decoder, [Anzeige](../display/7segment-display.md), fertig ist das
  sichtbare Zählwerk.
- **Schrittketten**: 16 Schritte reichen für viele Abläufe; die
  Bit-Ausgänge lassen sich mit [And](../logic/and.md)/[Not](../logic/not.md)
  zu „wir sind in Schritt n"-Signalen kombinieren.
- **Kettenzählen**: Der Überlauf `O` treibt den nächsten Counter4 — zwei
  Stück ergeben zusammen 0–255 in zwei getrennten Ziffern (ideal für
  Hex-Anzeigen, denn eine Hex-Ziffer ist genau 4 Bit).

## Siehe auch

[Counter8](counter8.md) ·
[4bit to byte decoder](../converter/4bit-zu-byte.md) ·
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md)
