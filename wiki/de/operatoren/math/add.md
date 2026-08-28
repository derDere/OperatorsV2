# Add

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Add ist das **Plus-Zeichen**: Er rechnet `B1 + B2`.

Durch die Leitungen hier fließen nur die Zahlen 0 bis 255 (siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)). Wird das Ergebnis
größer, gibt `R` nur den Teil aus, der noch hineinpasst, und `O` zählt,
wie oft es über 255 hinausging — das nennt man den **Überlauf** (siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Erste Zahl |
| `B2` | Eingang | Byte | Zweite Zahl |
| `R` | Ausgang | Byte | Das Ergebnis ohne den übergelaufenen Teil |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis unter null läge — beim Zusammenzählen nie |
| `O` | Ausgang | Byte | Der Überlauf: wie oft das Ergebnis über 255 hinausging |
| `ON` | Ausgang | Bit | An, wenn auch der Überlauf unter null läge |

## Ausprobieren

Stelle zwei Zahlen ein. Solange das Ergebnis unter 256 bleibt, zeigt `R`
es direkt. Gehe darüber hinaus (z. B. 200 + 100): `O` springt auf 1 und
`R` zeigt, was übrig bleibt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Add", "_id": "add1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Werte verschieben**: Eine feste Zahl per [Value](../fixed-input/value.md)
  auf `B2` macht aus Add einen „immer 1 mehr"-Baustein (oder 2 mehr,
  5 mehr …) — etwa um aus den Zahlen 0 bis 5 die Zahlen 1 bis 6 zu machen
  (Stichwort Würfel, siehe [Random](random.md)).
- **Mehrstellig rechnen**: Der Überlauf `O` ist die kleine Merkzahl beim
  schriftlichen Rechnen — man nennt ihn auch **Übertrag**. Er kann in den
  nächsten Add-Baustein fließen. So entstehen Rechenwerke, die weit über
  255 hinaus zählen.
- **Laufende Summen**: Zusammen mit
  [Memory (1 byte)](../memory/memory-1byte.md) im Kreis geschaltet
  (Speicher → `B1`, Ergebnis zurück in den Speicher) zählt die Schaltung
  bei jedem Auslöser eine neue Zahl oben drauf.

## Siehe auch

[Subtract](subtract.md) · [Multiply](multiply.md) ·
[Counter8](../memory/counter8.md) (fertiges +1/−1)
