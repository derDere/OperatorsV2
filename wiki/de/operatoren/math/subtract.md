# Subtract

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Subtract ist das Minus-Zeichen: Er rechnet `B1 − B2`.

Ist `B2` größer als `B1`, läge das Ergebnis unter null — es wäre eine
**negative Zahl**. Durch die Leitungen hier fließen aber nur die Zahlen 0
bis 255. Der Baustein gibt deshalb den Abstand der beiden Zahlen aus, also
das Ergebnis ohne das Minus davor — das nennt man den **absoluten Wert** —
und meldet über den Ausgang `RN`, dass es unter null ging.

Genau dieser Ausgang macht Subtract nebenbei zum **Vergleicher**: Er
verrät dir, welche von zwei Zahlen die größere ist.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, von der abgezogen wird |
| `B2` | Eingang | Byte | Die Zahl, die abgezogen wird |
| `R` | Ausgang | Byte | Der Abstand der beiden Zahlen |
| `RN` | Ausgang | Bit | An, wenn `B2` größer ist als `B1` |
| `O` | Ausgang | Byte | Zweiter Ergebnis-Ausgang für Zahlen über 255 — beim Abziehen immer 0 |
| `ON` | Ausgang | Bit | Gehört zu `O` und bleibt beim Abziehen ebenfalls aus |

## Ausprobieren

Stelle `B1` und `B2` ein und beobachte `R` und `RN`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Subtract", "_id": "sub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

**Wer hat mehr?** Subtract beantwortet gleich drei Fragen auf einmal:

| Ablesen | Bedeutung |
| --- | --- |
| `RN` an | `B2` ist größer als `B1` |
| `RN` aus und `R` größer als 0 | `B1` ist größer als `B2` |
| `R` = 0 | Beide sind gleich groß |

Ein „ist größer als"-Prüfer ist also einfach ein Subtract, von dem man nur
`RN` benutzt. Für die reine Frage „gleich oder nicht?" gibt es den
[Equals](equals.md).

**Abstand messen**: `R` sagt dir, wie weit zwei Zahlen auseinanderliegen —
egal, welche von beiden die größere ist. 9 und 6 liegen 3 auseinander, und
6 und 9 genauso. Damit kannst du prüfen, ob eine Zahl nah genug an einer
Wunschzahl liegt: erst mit einem Subtract den Abstand ausrechnen, dann mit
einem zweiten Subtract schauen, ob der Abstand klein genug ist.

**Herunterzählen**: Legst du auf `B2` eine feste Zahl, wird Subtract zu
einem „immer 1 weniger"-Baustein (oder 2 weniger, 5 weniger …). Zusammen
mit einem [Memory (1 byte)](../memory/memory-1byte.md) entsteht daraus ein
Rückwärtszähler: Der Speicher merkt sich die Zahl, Subtract zieht etwas
ab, und das Ergebnis wandert zurück in den Speicher.

## Siehe auch

[Add](add.md) · [Equals](equals.md) ·
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md) ·
[Werte und Signale](../../grundlagen/werte-und-signale.md)
