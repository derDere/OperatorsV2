# T FlipFlop

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Das T-FlipFlop (Toggle-FlipFlop) ist der **Kippschalter**: Bei jedem
Einschalt-Moment am Eingang `T` (steigende Flanke) kippt der gespeicherte
Zustand um — an, aus, an, aus … Wie ein Kugelschreiber: Jeder Klick
wechselt den Zustand.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `T` | Eingang | Bit | Jede steigende Flanke kippt den Zustand um |
| `Q` | Ausgang | Bit | Der gespeicherte Zustand |
| `!Q` | Ausgang | Bit | Das Gegenteil des Zustands |

## Ausprobieren

Schalte `T` mehrmals an und aus — nur der Moment des **Einschaltens** kippt
`Q`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "T FlipFlop", "_id": "tff1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Lichtschalter mit Taster**: Ein [Button](../user-input/button.md) auf
  `T` — erster Klick an, nächster Klick aus. So wird aus einem Impuls-Geber
  ein Umschalter.
- **Frequenz halbieren**: `Q` wechselt nur bei jeder *zweiten* Flanke des
  Eingangssignals — das T-FlipFlop halbiert also jedes Taktsignal. Und wer
  Takte fortlaufend halbiert, **zählt binär**: Genau so entstehen Zähler.

Hier hängt eine [Clock](../signal/clock.md) an einer Kette aus zwei
T-FlipFlops. Stelle das Intervall (oberes Kästchen) auf etwa 30 und schalte
Power an: Das obere „State"-Kästchen rechts blinkt halb so schnell wie der
Takt, das untere noch einmal halb so schnell:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": -200, "_y": 0 },
		{ "_#new": "T FlipFlop", "_id": "tff2", "_x": 0, "_y": 0 },
		{ "_#new": "T FlipFlop", "_id": "tff3", "_x": 200, "_y": 0 }
	],
	"conAll": [
		{ "s": "clock1_out_C", "e": "tff2_in_T" },
		{ "s": "tff2_out_!Q", "e": "tff3_in_T" }
	]
}
```

Liest man die beiden Zustände als Bits, zählt die Kette fortlaufend
0, 1, 2, 3 — mit mehr Stufen entsprechend weiter. Für fertiges Zählen gibt
es bequemer den [Counter4](../memory/counter4.md) bzw.
[Counter8](../memory/counter8.md).

## Siehe auch

[RS FlipFlop](rs-flipflop.md) · [Pulse](pulse.md) ·
[Clock](../signal/clock.md) · [Counter8](../memory/counter8.md)
