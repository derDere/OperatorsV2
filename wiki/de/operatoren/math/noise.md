# Noise

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Noise ist der **sanfte Zufall**: Zufall mit weichem Übergang. Die Zahlen
springen nicht wild herum, sondern wandern gemächlich auf und ab. Stell dir
eine Hügellandschaft vor, an der du entlangfährst — mal geht es ein Stück
bergauf, mal wieder hinunter, aber niemals von einem Schritt auf den
nächsten von ganz unten nach ganz oben. Darin unterscheidet sich Noise von
[Random](random.md): Random landet in jedem Tick (siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)) irgendwo neu,
Noise rückt von seinem letzten Wert immer nur ein Stückchen weiter.

Die Eingänge `A`, `B` und `C` sagen, **wo in dieser Landschaft du gerade
stehst** — so wie eine Hausnummer sagt, wo an einer Straße du stehst. Der
Ausgang `N` gibt die **Höhe des Geländes an dieser Stelle** aus, als Zahl
von 0 bis 255. Nahe beieinander liegende Stellen haben ähnliche Höhen,
deshalb verändert sich der Wert so weich. Dieses Verfahren hat einen
eigenen Namen — **Perlin Noise** — und steckt hinter vielen Wolken-,
Wasser- und Landschaftsbildern in Spielen und Filmen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `A` | Eingang | Byte | Wie weit du in die erste Richtung gegangen bist |
| `B` | Eingang | Byte | Wie weit in die zweite Richtung (kannst du weglassen) |
| `C` | Eingang | Byte | Wie weit in die dritte Richtung (kannst du weglassen) |
| `S` | Eingang | Byte | Die Schrittweite: Alle drei Angaben werden durch `S` geteilt — je größer die Zahl, desto kleiner die Schritte und desto gemächlicher die Fahrt |
| `N` | Ausgang | Byte | Die Höhe des Geländes an der Stelle (A, B, C) |

## Ausprobieren

Hier fährt ein Zähler von allein durch die Landschaft: Er zählt den
Eingang `A` immer weiter hoch. Stelle `S` zum Beispiel auf 20 und beobachte,
wie der Ausgang weich schwankt — je größer `S`, desto träger. Änderst du
`B`, springst du auf eine andere Spur durch dieselbe Landschaft:

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

(Der [Tick](../signal/tick.md) gibt den Takt vor, der
[Counter8](../memory/counter8.md) zählt bei jedem Takt eins hoch, und der
Value-Baustein hält dessen übrige Eingänge ausgeschaltet.)

## Einsatzideen

- **Natürliches Flackern**: Kerzenlicht, Windstärke, ein leichtes Wackeln —
  überall, wo purer [Random](random.md) zu hektisch wäre.
- **Gelände und Muster**: Lässt du zwei Angaben gleichzeitig laufen (`A`
  und `B`), fährst du nicht mehr auf einer Linie, sondern tastest eine
  ganze Fläche ab — so entstehen Wolkenbilder auf dem
  [Line Display](../display/line-display.md).
- **Mehrere Werte, die unabhängig wandern**: Gib mehreren Noise-Bausteinen
  denselben `A`-Zähler, aber jedem einen anderen festen `B`-Wert. Dann
  wandern alle gleich sanft, aber jeder für sich.

## Siehe auch

[Random](random.md) · [Sinus](sinus.md) ·
[Counter8](../memory/counter8.md)
