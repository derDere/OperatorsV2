# Noise

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Noise ist der **sanfte Zufall**. Anders als [Random](random.md) springt er
nicht wild umher: Man kann ihn sich als unsichtbare Hügellandschaft
vorstellen — die Eingänge `A`, `B`, `C` sind Koordinaten in dieser
Landschaft, der Ausgang ist die „Höhe" an dieser Stelle. Benachbarte
Koordinaten haben ähnliche Höhen, deshalb verändert sich der Wert weich
und natürlich (das Verfahren heißt Perlin Noise und steckt hinter vielen
Wolken-, Wasser- und Gelände-Effekten in Computergrafik).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `A` | Eingang | Byte | Erste Koordinate |
| `B` | Eingang | Byte | Zweite Koordinate (optional) |
| `C` | Eingang | Byte | Dritte Koordinate (optional) |
| `S` | Eingang | Byte | Zoom: Alle Koordinaten werden durch `S` geteilt — größer = sanfter |
| `N` | Ausgang | Byte | Die „Höhe" an der Stelle (A, B, C) |

## Ausprobieren

Hier wandert ein Zähler automatisch durch die Landschaft (Koordinate `A`).
Stelle `S` z. B. auf 20 und beobachte, wie der Ausgang weich schwankt —
je größer `S`, desto träger; mit `B` springst du auf eine andere „Spur":

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tick", "_id": "tick1", "_x": -220, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt1", "_x": -60, "_y": 0 },
		{ "_#new": "Noise", "_id": "noise1", "_x": 120, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -220, "_y": 120 }
	],
	"conAll": [
		{ "s": "tick1_out_T", "e": "cnt1_in_I" },
		{ "s": "cnt1_out_B", "e": "noise1_in_A" },
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

- **Natürliches Flackern**: Kerzenlicht, Windstärke, Wackeln — überall, wo
  purer [Random](random.md) zu hektisch wäre.
- **Gelände und Muster**: Mit zwei laufenden Koordinaten (`A` und `B`)
  tastet man eine Fläche ab — Grundlage für Wolkenbilder auf dem
  [Line Display](../display/line-display.md).
- **Mehrere unabhängige Verläufe**: Gleicher `A`-Zähler, aber verschiedene
  feste `B`-Werte ergeben mehrere ähnliche, doch eigenständige Kurven.

## Siehe auch

[Random](random.md) · [Sinus](sinus.md) ·
[Counter8](../memory/counter8.md)
