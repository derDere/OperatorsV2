# Random

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Random ist der **Dauerwürfel**: In jedem Tick liefert er eine neue
Zufallszahl zwischen 0 und 255 — viele Dutzend Mal pro Sekunde.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `R` | Ausgang | Byte | Jede Tick-Runde eine frische Zufallszahl (0–255) |

## Ausprobieren

Das Kästchen rechts flackert im Takt der Zufallszahlen:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Random", "_id": "rnd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

**Einen Würfelwurf festhalten.** Der Dauerstrom an Zufall wird erst
nützlich, wenn man im richtigen Moment **eine** Zahl herausgreift. Genau
das kann [Memory (1 byte)](../memory/memory-1byte.md): Schalte `T` links
an — der Speicher friert die aktuelle Zufallszahl ein. Aus, wieder an —
der nächste „Wurf":

```operatorsv2
{
	"opAll": [
		{ "_#new": "Random", "_id": "rnd2", "_x": -140, "_y": 0 },
		{ "_#new": "Memory (1 byte)", "_id": "mem1", "_x": 60, "_y": 0 }
	],
	"conAll": [
		{ "s": "rnd2_out_R", "e": "mem1_in_B" }
	]
}
```

**Ein echter Würfel (1–6)**: Schicke die festgehaltene Zahl durch
[Modulo](modulo.md) mit Teiler 6 (Ergebnis 0–5) und dann durch
[Add](add.md) mit fester 1 — fertig ist der Würfel mit Augenzahlen 1 bis 6.
Die festen Zahlen 6 und 1 liefert je ein
[Value](../fixed-input/value.md)-Baustein.

**Zufalls-Ereignisse**: Vergleiche die Zufallszahl per
[Subtract](subtract.md) mit einer Schwelle — „mit 10 % Wahrscheinlichkeit
pro Auslöser passiert etwas".

**Rauschen und Flackern**: Direkt auf eine Anzeige gegeben, erzeugt Random
Störbild-Effekte. Für *sanften* Zufall (wandernde Wolken statt Flackern)
nimm [Noise](noise.md).

## Siehe auch

[Noise](noise.md) · [Memory (1 byte)](../memory/memory-1byte.md) ·
[Modulo](modulo.md)
