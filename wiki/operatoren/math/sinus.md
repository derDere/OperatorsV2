# Sinus

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Sinus verwandelt eine gleichmäßig wachsende Zahl in eine **sanfte Welle**:
rauf, runter, rauf, runter — ohne Ecken. Der Eingang ist ein Winkel im
Byte-Format: 0 bis 255 entspricht einmal rund um den Kreis (360°).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Der Winkel: 255 ≙ voller Kreis |
| `R` | Ausgang | Byte | Der Betrag des Sinus, gestreckt auf 0–255 |
| `RN` | Ausgang | Bit | An, solange der Sinus eigentlich negativ ist (zweite Wellenhälfte) |

Ein paar Stützpunkte zum Nachstellen:

| `B1` | entspricht | `R` | `RN` |
| --- | --- | --- | --- |
| 0 | 0° | 0 | aus |
| 64 | 90° | 255 | aus |
| 128 | 180° | ≈ 0 | — |
| 192 | 270° | 255 | an |

## Ausprobieren

Hier dreht ein Zähler den Winkel automatisch immer weiter — beobachte, wie
`R` weich an- und abschwillt und `RN` jede halbe Runde umschaltet:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tick", "_id": "tick1", "_x": -220, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt1", "_x": -60, "_y": 0 },
		{ "_#new": "Sinus", "_id": "sin1", "_x": 120, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -220, "_y": 120 }
	],
	"conAll": [
		{ "s": "tick1_out_T", "e": "cnt1_in_I" },
		{ "s": "cnt1_out_B", "e": "sin1_in_B1" },
		{ "s": "zero_out_V", "e": "cnt1_in_D" },
		{ "s": "zero_out_V", "e": "cnt1_in_R" },
		{ "s": "zero_out_V", "e": "cnt1_in_B" },
		{ "s": "zero_out_V", "e": "cnt1_in_L" }
	]
}
```

(Der [Tick](../signal/tick.md) treibt den [Counter8](../memory/counter8.md)
an, der VALUE-Baustein hält dessen übrige Eingänge ruhig.)

## Einsatzideen

- **Pulsieren statt Blinken**: Eine Lampe, die weich auf- und abglüht; ein
  Wert, der atmet — überall dort, wo hartes An/Aus zu ruppig wirkt.
- **Kreisbewegungen**: Sinus liefert die Y-Koordinate, der
  [Cosinus](cosinus.md) mit demselben Winkel die X-Koordinate — zusammen
  wandert ein Punkt im Kreis, z. B. auf dem
  [Line Display](../display/line-display.md).
- **Pendel-Animationen**: Alles, was hin- und herschwingen soll, bekommt
  seinen Ort aus einer Sinus-Welle.

## Siehe auch

[Cosinus](cosinus.md) · [Tangents](tangents.md) ·
[Counter8](../memory/counter8.md) · [Line Display](../display/line-display.md)
