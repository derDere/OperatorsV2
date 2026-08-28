# Counter4

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Counter4 ist der kleine Bruder des [Counter8](counter8.md): Er zählt nur
von 0 bis 15 — dafür spricht er **Bit für Bit**. Seinen Stand zeigt er
über vier einzelne Bit-Ausgänge (`B0`…`B3`), und geladen wird er ebenso
über vier einzelne Bits. Das passt zu Bausteinen, die mit einzelnen
Leitungen arbeiten, etwa dem
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md).

Gezählt wird wie beim Counter8 nur in dem Moment, in dem ein Zähl-Eingang
von aus auf an springt — das ist die **steigende Flanke**
([Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Auch die
Grenzen sind dieselben, nur eben schon bei 15: Über 15 hinaus beginnt der
Stand wieder bei 0 (**Überlauf**, gemeldet über `O`), unter 0 springt er
auf 15 (**Unterlauf**, gemeldet über `U`) — siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I` | Eingang | Bit | Zählt bei steigender Flanke eins hoch (+1) |
| `D` | Eingang | Bit | Zählt bei steigender Flanke eins runter (−1) |
| `R` | Eingang | Bit | Reset: hält den Stand auf 0, solange dieser Eingang an ist |
| `B0`…`B3` | Eingang | Bit | Die vier Bits des Startwerts fürs Laden (die Bits zählen 1, 2, 4, 8) |
| `L` | Eingang | Bit | Übernimmt bei steigender Flanke die vier Bits von `B0`…`B3` als neuen Stand |
| `U` | Ausgang | Bit | Blitzt einmal an, wenn unter 0 gezählt wurde (Unterlauf, Stand springt auf 15) |
| `B0`…`B3` | Ausgang | Bit | Der Zählerstand als vier einzelne Bits |
| `O` | Ausgang | Bit | Blitzt einmal an, wenn über 15 gezählt wurde (Überlauf, Stand springt auf 0) |

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
- **Schritt-für-Schritt-Abläufe**: 16 Schritte reichen für eine
  Ampelschaltung oder eine kleine Lichtershow. Mit
  [And](../logic/and.md) und [Not](../logic/not.md) kombinierst du die
  vier Bit-Ausgänge so, dass ein Signal genau bei einer bestimmten Zahl
  angeht — „wir sind gerade bei Schritt 5".
- **Zwei Zähler hintereinanderschalten**: Der Überlauf-Ausgang `O` treibt
  den nächsten Counter4 an — zusammen zählen sie wie ein Counter8 von 0
  bis 255, nur als zwei getrennte 4-Bit-Ziffern. Das passt zu Anzeigen,
  die Zahlen als zweistelligen Hex-Code zeigen (siehe
  [Bits und Bytes](../../grundlagen/bits-und-bytes.md)), denn eine
  Hex-Ziffer ist genau 4 Bit breit.

## Siehe auch

[Counter8](counter8.md) ·
[4bit to byte decoder](../converter/4bit-zu-byte.md) ·
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md)
