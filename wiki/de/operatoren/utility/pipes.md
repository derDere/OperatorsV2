# Pipe 1 / Pipe 4 / Pipe 8

[Operator-Lexikon](../index.md) · Kategorie: **Utility**

Ein Pipe-Baustein ist ein **Durchreicher**: Was vorne hineinfließt,
kommt hinten unverändert wieder heraus — so wie ein Rohr, durch das
Wasser läuft, ohne sich dabei zu verändern. Stellst du den Eingang auf
die Zahl 7, zeigt der Ausgang ebenfalls eine 7; schaltest du ihn an,
geht der Ausgang genauso an.

Es gibt drei Größen: Pipe 1 für einen einzelnen Wert, Pipe 4 für vier
Werte auf einmal und Pipe 8 für acht Werte auf einmal. Die Anschlüsse
tragen keine eigene Beschriftung; sie gehören der Reihe nach zusammen —
der oberste Eingang zum obersten Ausgang, der zweite zum zweiten und so
weiter.

Klingt nutzlos? Ist es nicht: Pipes helfen dabei, viele Leitungen
ordentlich zu verlegen, statt die Zeichenfläche mit einem Kabelgewirr
zu überziehen.

## Anschlüsse

| Baustein | Eingänge | Ausgänge | Bedeutung |
| --- | --- | --- | --- |
| Pipe 1 | 1 | 1 | Reicht einen Wert durch |
| Pipe 4 | 4 | 4 | Reicht vier Werte durch |
| Pipe 8 | 8 | 8 | Reicht acht Werte durch |

Alle Anschlüsse nehmen Bits wie Bytes.

## Ausprobieren

Was links hineingeht, kommt rechts heraus — an oder aus, Zahl oder nicht:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "pipe1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Leitungen bündeln und führen**: Statt acht einzelne Kabel quer über
  die ganze Fläche zu ziehen, führst du sie gebündelt durch eine Pipe 8
  an einer Stelle, die du selbst festlegst — die Schaltung bleibt
  lesbar.
- **Verteiler-Punkt**: Soll ein Signal gleichzeitig an viele Stellen
  gelangen, läuft es zuerst in eine Pipe. Von deren Ausgang gehen dann
  alle Leitungen weiter. Willst du die Quelle später austauschen, musst
  du nur **eine** einzige Leitung umstecken.
- **Gezielte Verzögerung**: Jeder Baustein braucht einen **Tick** — einen
  Rechenschritt der Schaltung —, um einen Wert weiterzugeben (mehr dazu
  unter [Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Eine
  Pipe verzögert also um genau einen Tick. Sollen zwei Leitungen, die
  unterschiedlich viele Bausteine durchlaufen, am Ende trotzdem
  gleichzeitig ankommen, gleichst du das mit zusätzlichen Pipes auf der
  kürzeren Leitung aus. (Für frei einstellbare Wartezeiten gibt es den
  [Repeater](../signal/repeater.md).)
- **Über weite Strecken** sind die [Portale](portale.md) die
  praktischere Wahl: eine Art Zaubertür, die zwei Stellen verbindet,
  ganz ohne sichtbare Leitung dazwischen.

## Siehe auch

[Portale](portale.md) · [Repeater](../signal/repeater.md)
