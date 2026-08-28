# Clock

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Die Clock ist der **Taktgeber** der Schaltung: Sie schaltet ihren Ausgang
gleichmäßig an und aus, immer weiter. Musiker haben dafür ein kleines
Gerät, das Metronom — es klopft in gleichen Abständen, damit alle im
selben Tempo bleiben. Diesen gleichmäßigen Rhythmus nennt man **Takt**,
und er treibt alles an, was in deiner Schaltung nacheinander passieren
soll.

Wie schnell geklopft wird, stellst du mit `B` ein. Gezählt wird in
**Ticks** — so heißt ein kompletter Rechendurchgang der Schaltung,
ungefähr 60 davon passen in eine Sekunde (siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Nach `B` Ticks
kippt der Ausgang um: von an auf aus, dann von aus auf an. Ein kleines
`B` ergibt schnelles Klopfen, ein großes langsames. Und `P` ist der
Hauptschalter: Nur solange `P` an ist, läuft die Clock überhaupt.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Der Abstand zwischen zwei Klopfern: Nach so vielen Ticks kippt der Ausgang um |
| `P` | Eingang | Bit | Power, der Hauptschalter: Nur solange `P` an ist, zählt und kippt die Clock |
| `C` | Ausgang | Bit | Der Takt selbst: an, aus, an, aus … alle Abschnitte gleich lang |
| `!C` | Ausgang | Bit | Das Gegenteil — genau dann an, wenn `C` aus ist |

Ein Beispiel zum Einordnen: Bei 60 Ticks pro Sekunde kippt der Ausgang
mit `B` = 30 zweimal in der Sekunde. Eine Lampe daran leuchtet also eine
halbe Sekunde und ist eine halbe Sekunde dunkel. Wie oft etwas pro
Sekunde passiert, nennt man die **Frequenz**.

## Ausprobieren

Stelle den Abstand `B` auf etwa 30 und schalte `P` an — der Ausgang
blinkt. Kleineres `B` heißt schneller, größeres langsamer:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Blinklicht**: Den Ausgang direkt auf eine
  [Lampe](../display/lamp.md) legen — fertig ist das Blinken.
- **Antrieb für Abläufe**: Einen Zähler hochzählen lassen
  ([Counter8](../memory/counter8.md)), gespeicherte Werte der Reihe nach
  aus einem [Stack Input](../fixed-input/stack-input.md) abrufen, das
  [Terminal Display](../display/terminal-display.md) Zeichen für Zeichen
  beschreiben — fast jede Schaltung, die von selbst läuft, beginnt mit
  einer Clock.
- **Start und Stopp**: Der Eingang `P` ist die eingebaute Pausentaste. Ein
  [Switch](../user-input/switch.md) oder ein
  [RS FlipFlop](../logic/rs-flipflop.md) daran hält den ganzen Ablauf an
  und lässt ihn wieder weiterlaufen.
- **Verschiedene Tempi**: Mehrere Clocks mit verschiedenen Abständen
  laufen problemlos nebeneinander. Oder du nimmst eine schnelle Clock und
  hängst [T FlipFlops](../logic/t-flipflop.md) dahinter — jeder davon
  reagiert nur auf jeden zweiten Klopfer und halbiert damit das Tempo.

## Siehe auch

[Tick](tick.md) · [Repeater](repeater.md) ·
[Flanken und Takt](../../grundlagen/flanken-und-takt.md) ·
[Counter8](../memory/counter8.md)
