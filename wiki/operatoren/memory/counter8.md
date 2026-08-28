# Counter8

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Counter8 ist das **Zählwerk**: Er merkt sich eine Zahl von 0 bis 255 und
zählt auf Kommando hoch oder runter — wie ein Kilometerzähler mit
Plus- und Minus-Knopf. Der aktuelle Stand steht groß auf dem Baustein und
liegt als Byte am Ausgang an.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I` | Eingang | Bit | Steigende Flanke: +1 |
| `D` | Eingang | Bit | Steigende Flanke: −1 |
| `R` | Eingang | Bit | Reset: hält den Stand auf 0, solange an |
| `B` | Eingang | Byte | Startwert für das Laden |
| `L` | Eingang | Bit | Steigende Flanke: übernimmt `B` als neuen Stand |
| `U` | Ausgang | Bit | Ein Tick an, wenn unter 0 gezählt wurde (springt auf 255) |
| `B` | Ausgang | Byte | Der aktuelle Zählerstand |
| `O` | Ausgang | Bit | Ein Tick an, wenn über 255 gezählt wurde (springt auf 0) |

## Ausprobieren

Schalte `I` an, aus, an, aus … — jeder Einschalt-Moment zählt eins hoch
(`D` entsprechend runter). Mit `B` und `L` setzt du einen Startwert, `R`
löscht:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Counter8", "_id": "cnt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Automatisch zählen

Am häufigsten zählt nicht der Mensch, sondern ein Takt: Hier hängt eine
[Clock](../signal/clock.md) am Zähleingang. Stelle das Intervall (oberes
Kästchen) z. B. auf 30 und schalte Power an — der Stand läuft von allein:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": -180, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt2", "_x": 20, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -180, "_y": 120 }
	],
	"conAll": [
		{ "s": "clock1_out_C", "e": "cnt2_in_I" },
		{ "s": "zero_out_V", "e": "cnt2_in_D" },
		{ "s": "zero_out_V", "e": "cnt2_in_R" },
		{ "s": "zero_out_V", "e": "cnt2_in_B" },
		{ "s": "zero_out_V", "e": "cnt2_in_L" }
	]
}
```

(Der VALUE-Baustein hält die unbenutzten Zähler-Eingänge ruhig.)

## Einsatzideen

- **Ereignisse zählen**: Klicks, Impulse, Runden — alles, was Flanken
  liefert, lässt sich zählen.
- **Zeit messen**: Clock + Counter = Stoppuhr. Der Überlauf `O` kann den
  nächsten Zähler antreiben — so entstehen Minuten aus Sekunden
  (Ketten-Zählwerk wie beim Kilometerzähler).
- **Adressen erzeugen**: Ein laufender Zähler auf dem Adress-Eingang eines
  [Registers](register.md) klappert dessen Speicherplätze der Reihe nach
  ab — die Grundidee jedes Sequenzers.
- **Rampen fahren**: Der Stand als Byte ist eine gleichmäßig wachsende
  Zahl — Futter für [Sinus](../math/sinus.md)-Wellen oder Positionen auf
  dem [Line Display](../display/line-display.md).
- **Früher umbrechen**: [Modulo](../math/modulo.md) hinter dem Ausgang
  lässt den Zähler scheinbar bei jeder Wunschgrenze wieder von vorn
  beginnen.

## Siehe auch

[Counter4](counter4.md) · [Clock](../signal/clock.md) ·
[Register](register.md) · [T FlipFlop](../logic/t-flipflop.md)
