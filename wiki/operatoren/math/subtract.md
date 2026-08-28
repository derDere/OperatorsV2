# Subtract

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Subtract ist das **Minus-Zeichen**: Er rechnet `B1 − B2`. Wird das Ergebnis
negativ, gibt er den **Betrag** aus und meldet das Minus über den eigenen
Ausgang `RN` — und genau dieser Ausgang macht Subtract nebenbei zum
**Größer/Kleiner-Vergleicher**.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, von der abgezogen wird |
| `B2` | Eingang | Byte | Die Zahl, die abgezogen wird |
| `R` | Ausgang | Byte | Das Ergebnis — bei negativem Ergebnis dessen Betrag |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis negativ ist (also `B2` größer als `B1`) |
| `O` | Ausgang | Byte | Überlauf über 255 (beim Subtrahieren zweier Bytes nie) |
| `ON` | Ausgang | Bit | An, wenn der Überlauf negativ zu lesen wäre |

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

**Größer, kleiner oder gleich?** Subtract beantwortet alle drei Fragen auf
einmal:

| Ablesen | Bedeutung |
| --- | --- |
| `RN` an | `B2` ist größer als `B1` |
| `RN` aus und `R` > 0 | `B1` ist größer als `B2` |
| `R` = 0 | Beide sind gleich |

Ein „ist größer als"-Vergleicher ist also einfach ein Subtract, von dem man
nur `RN` benutzt. Für reines „gleich/ungleich" gibt es auch den
[Equals](equals.md).

**Abstand messen**: `R` ist immer der Betrag der Differenz — also der
**Abstand** zwischen zwei Zahlen, egal welche größer ist. Praktisch für
„Istwert weicht mehr als n vom Sollwert ab"-Prüfungen (Abstand ausrechnen,
dann mit einem zweiten Subtract gegen die Toleranz vergleichen).

**Herunterzählen**: Eine feste Zahl auf `B2` macht aus Subtract einen
„−n"-Baustein, z. B. in Rückkopplung mit einem
[Memory (1 byte)](../memory/memory-1byte.md).

## Siehe auch

[Add](add.md) · [Equals](equals.md) ·
[Werte und Signale](../../grundlagen/werte-und-signale.md)
