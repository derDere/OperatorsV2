# Base Converter

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der Base Converter beantwortet eine Frage, die jede Anzeige stellt: **„Wie
lauten die einzelnen Ziffern dieser Zahl?"** Eine Ziffernanzeige kann
immer nur ein einzelnes Zeichen zeigen. Wer 137 anzeigen will, braucht
drei Anzeigen — und muss die Zahl vorher in ihre Ziffern 1, 3 und 7
zerlegen.

Genau das macht dieser Baustein, von hinten angefangen: Er trennt die
**letzte Ziffer** ab. Aus 137 kommt an `V` die 7, und `O` gibt die Zahl
ohne ihre letzte Ziffer weiter — also 13. Schickst du diese 13 in einen
zweiten Base Converter, fällt die nächste Ziffer heraus (3), übrig bleibt
1. So bekommst du eine Ziffer nach der anderen.

Mit wie vielen Ziffern gerechnet wird, bestimmst du selbst. Beim Zählen,
wie du es kennst, sind es zehn: 0 bis 9 — nach der 9 beginnt man vorn
wieder und schreibt eine Stelle davor, also 10.

Stell dir nun einen Kilometerzähler vor, dessen Rädchen nur die Ziffern 0
bis 7 tragen. Er zählt 5, 6, 7 — dann ist Schluss: Das Rädchen springt
auf 0 zurück, das nächste rückt eine Stelle weiter, im Fenster steht
`10`. Gefahren ist das Fahrzeug so weit, wie du acht nennst. Die Strecke
ist dieselbe, nur die Schreibweise ist eine andere, weil weniger Ziffern
zur Verfügung stehen. Die Anzahl der Ziffern heißt **Basis**. Zehn
Ziffern nennt man das **Zehnersystem**, und das ist hier die
Voreinstellung.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, von der die letzte Ziffer abgetrennt wird |
| `V` | Ausgang | Byte | Die letzte Ziffer (mit zehn Ziffern: 0–9) |
| `O` | Ausgang | Byte | Die Zahl ohne ihre letzte Ziffer — Futter für die nächste Stufe |

Im Properties-Fenster legt **Base** fest, mit wie vielen Ziffern gerechnet
wird: *Decimal* sind zehn Ziffern (0–9, die Voreinstellung), *Octal* sind
acht (0–7) und *Binary* nur zwei (0 und 1).

## Ausprobieren

Zwei Bausteine hintereinander zerlegen deine Zahl in Einer, Zehner und
Hunderter. Stelle links z. B. 137 ein — rechts erscheinen von oben nach
unten die Einer (7), die Zehner (3) und die Hunderter (1):

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

Die Kästchen schreiben ihre Werte als **Hex-Code**: eine Kurzschreibweise
mit 16 Ziffern, bei der es nach der 9 mit A, B, C, D, E und F weitergeht —
A steht für 10, F für 15. So passt jede Zahl bis 255 in zwei Zeichen, 255
schreibt sich als `FF`. Für die Ziffern 0 bis 9, die hier herauskommen,
sieht beides gleich aus.

## Einsatzideen

- **Zahlen sichtbar machen**: Gib jede Ziffer `V` über einen
  [Byte to 4bit decoder](byte-zu-4bit.md) und einen
  [4bit to 7 Segment decoder](4bit-zu-7segment.md) auf eine
  [Ziffernanzeige](../display/7segment-display.md) — genau so zeigt das
  Uhren-Beispiel *clock* (📚-Examples-Menü im Editor) Stunden und Minuten
  zweistellig an.
- **Zahlen als Text**: Jedes Zeichen auf einem Bildschirm hat eine feste
  Nummer. Die Ziffer `0` hat die Nummer 48, die `1` die 49, und so geht
  es weiter. Zähle mit [Add](../math/add.md) also 48 dazu, dann wird aus
  deiner Ziffer ihr Zeichen — und das kannst du auf das
  [Terminal Display](../display/terminal-display.md) schreiben.
- **Mit nur zwei Ziffern rechnen**: Stelle Base auf *Binary* und baue eine
  Kette. Dann gibt es nur noch 0 und 1, und die Bausteine liefern
  nacheinander die einzelnen Bits deiner Zahl.

## Siehe auch

[Divide](../math/divide.md) (das Teilen) und [Modulo](../math/modulo.md)
(der Rest beim Teilen) — die beiden Rechnungen, die hier zusammen in einem
Baustein stecken · [4bit to 7 Segment decoder](4bit-zu-7segment.md)
