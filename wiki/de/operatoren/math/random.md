# Random

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Random ist der **Dauerwürfel**: Er würfelt ununterbrochen. In jedem
Arbeitsschritt der Schaltung — so ein Schritt heißt **Tick**, siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md) — legt er eine
frisch gewürfelte Zahl von 0 bis 254 auf seinen Ausgang, viele Dutzend Mal
pro Sekunde. Welche Zahl als Nächstes kommt, kann niemand vorhersagen; jede
dieser 255 Zahlen hat dieselbe Chance.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `R` | Ausgang | Byte | In jedem Tick eine frisch gewürfelte Zahl (0–254) |

## Ausprobieren

Das Kästchen rechts flackert ohne Pause, weil in jedem Tick eine neue Zahl
herauskommt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Random", "_id": "rnd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

**Einen Wurf festhalten.** Solange die Zahlen so schnell wechseln, kannst
du mit ihnen wenig anfangen. Nützlich werden sie erst, wenn du im richtigen
Moment **eine** davon herausgreifst und festhältst. Genau das kann
[Memory (1 byte)](../memory/memory-1byte.md) — ein Baustein, der sich eine
Zahl merkt: Schalte `T` links an, und der Speicher hält die Zahl fest, die
gerade vorbeikam. Aus, wieder an — das ist der nächste „Wurf":

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
[Modulo](modulo.md). Modulo gibt den **Rest beim Teilen** aus — teilst du
durch 6, bleibt immer ein Rest von 0 bis 5 übrig. Ein [Add](add.md), das
1 dazuzählt, macht daraus die Augenzahlen 1 bis 6. Die festen Zahlen 6 und
1 liefert je ein [Value](../fixed-input/value.md)-Baustein.

**Etwas soll nur manchmal passieren**: Vergleiche die Zufallszahl mit einer
festen Grenzzahl. Das erledigt ein [Subtract](subtract.md), dessen Ausgang
`RN` dir verrät, welche der beiden Zahlen größer ist. Wählst du die Grenze
25, liegt ungefähr jede zehnte Zufallszahl darunter — dann passiert die
Sache also ungefähr in einem von zehn Fällen.

**Flimmern**: Direkt auf eine Anzeige gegeben, erzeugt Random ein
unruhiges Bild — wie ein Fernseher ohne Empfang. Für *sanften* Zufall, der
eher wie langsam wandernde Wolken aussieht, nimm [Noise](noise.md).

## Siehe auch

[Noise](noise.md) · [Memory (1 byte)](../memory/memory-1byte.md) ·
[Modulo](modulo.md)
