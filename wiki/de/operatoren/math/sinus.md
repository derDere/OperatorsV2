# Sinus

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Sinus macht aus einer gleichmäßig hochzählenden Zahl ein **sanftes Auf und
Ab, immer im gleichen Takt** — wie eine Schaukel, die vor und zurück
schwingt. Keine Ecken, keine Sprünge.

Am Eingang `B1` stellst du ein, wie weit die Welle auf ihrer Runde schon
gekommen ist. So eine Stelle auf einer Runde nennt man einen **Winkel**;
üblich sind 360 Schritte je Umlauf (geschrieben: 360°). Dieser Baustein
rechnet mit einem Byte und teilt den Umlauf deshalb in die Zahlen 0 bis
255 auf: 0 ist der Start, 64 eine Viertel-Runde, 128 die halbe, 192 die
Dreiviertel-Runde. Mehr zu Winkeln steht unter
[Vektoren](../../grundlagen/vektoren.md).

Heraus kommen zwei Werte. `R` sagt, wie weit die Welle gerade von der
Mitte weg ist: 0 heißt genau in der Mitte, 255 heißt so weit weg wie
möglich. `RN` sagt, auf welcher Seite der Mitte sie dabei ist: aus für
oben, an für unten. Wie weit eine Welle höchstens ausschlägt, nennt man
ihre **Amplitude** — hier sind das immer 255.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Stelle auf der Runde: 0 = Start, 255 = einmal rundherum |
| `R` | Ausgang | Byte | Wie weit die Welle von der Mitte weg ist (0 = Mitte, 255 = ganz außen) |
| `RN` | Ausgang | Bit | An, solange die Welle unter der Mitte läuft (zweite Hälfte der Runde) |

Ein paar Stellen zum Nachstellen und Vergleichen:

| `B1` | entspricht | `R` | `RN` |
| --- | --- | --- | --- |
| 0 | 0° — Start | 0 | aus |
| 64 | 90° — Viertel-Runde | 255 | aus |
| 128 | 180° — halbe Runde | ≈ 0 | kippt hier um |
| 192 | 270° — Dreiviertel-Runde | 255 | an |

Bei 128 kreuzt die Welle die Mitte: Dort ist `R` fast 0, und `RN` wechselt
genau an dieser Stelle von aus auf an.

## Ausprobieren

Hier dreht ein Zähler die Stelle auf der Runde ganz von allein immer
weiter — schau zu, wie `R` weich anwächst und wieder abfällt und wie `RN`
bei jeder halben Runde umschaltet:

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

(Der [Tick](../signal/tick.md) gibt den Takt vor, der
[Counter8](../memory/counter8.md) zählt bei jedem Takt eins hoch, und der
Value-Baustein hält dessen übrige Eingänge ausgeschaltet. Siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md).)

## Einsatzideen

- **Weiches Glühen**: Eine Lampe, die langsam heller und wieder dunkler
  wird; ein Wert, der atmet — überall dort, wo hartes An und Aus zu ruppig
  wirkt.
- **Kreisbewegungen**: Wo ein Punkt sitzt, sagen zwei Zahlen — wie weit
  oben und wie weit zur Seite. Sinus liefert die Höhe, der
  [Cosinus](cosinus.md) mit derselben Stelle auf der Runde die Seite —
  zusammen wandert der Punkt im Kreis, zum Beispiel auf dem
  [Line Display](../display/line-display.md).
- **Pendel und Schwingungen**: Alles, was hin- und herschwingen soll, holt
  sich seinen Ort aus einer Sinus-Welle.

## Siehe auch

[Cosinus](cosinus.md) · [Tangents](tangents.md) ·
[Counter8](../memory/counter8.md) · [Line Display](../display/line-display.md)
