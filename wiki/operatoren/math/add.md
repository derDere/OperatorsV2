# Add

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Add ist das **Plus-Zeichen**: Er addiert die beiden Zahlen an `B1` und `B2`.
Da eine Leitung nur Werte bis 255 trägt (siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)), gibt es neben dem
Ergebnis einen eigenen Ausgang für den **Überlauf**.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Erste Zahl |
| `B2` | Eingang | Byte | Zweite Zahl |
| `R` | Ausgang | Byte | Das Ergebnis (nach Abzug des Überlaufs) |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis negativ wäre (beim Addieren nie) |
| `O` | Ausgang | Byte | Wie oft das Ergebnis über 255 hinausging — je Überschreitung werden 255 abgezogen |
| `ON` | Ausgang | Bit | An, wenn auch der Überlauf negativ zu lesen wäre |

## Ausprobieren

Stelle zwei Zahlen ein. Solange die Summe unter 256 bleibt, zeigt `R` sie
direkt. Gehe darüber hinaus (z. B. 200 + 100): `O` springt auf 1 und `R`
zeigt den Rest:

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
  auf `B2` macht aus Add einen „+n"-Baustein — etwa um einen Bereich von
  0–5 auf 1–6 zu heben (Stichwort Würfel, siehe
  [Random](random.md)).
- **Mehrstellig rechnen**: Der Überlauf `O` ist der **Übertrag** — er kann
  in die nächste Add-Stufe fließen. So entstehen Rechenwerke, die weit über
  255 hinaus zählen.
- **Laufende Summen**: Zusammen mit
  [Memory (1 byte)](../memory/memory-1byte.md) im Kreis geschaltet
  (Speicher → `B1`, Ergebnis zurück in den Speicher) addiert die Schaltung
  bei jedem Auslöser einen neuen Betrag auf.

## Siehe auch

[Subtract](subtract.md) · [Multiply](multiply.md) ·
[Counter8](../memory/counter8.md) (fertiges +1/−1)
