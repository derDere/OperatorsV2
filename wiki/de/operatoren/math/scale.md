# Scale

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Scale ist der **Lautstärkeregler für Zahlen**: Er gibt von der Zahl an
`B1` nur einen Teil weiter. Wie groß dieser Teil ist, bestimmst du mit
`B2`. Gerechnet wird `B1 × (B2 ÷ 255)`: 255 heißt ganz, 128 heißt
ungefähr die Hälfte, 0 heißt nichts.

Scale kann damit nur verkleinern — das Ergebnis wird nie größer als `B1`
selbst. Es bleibt deshalb immer unter 256, und das zweite Ausgangspaar
`O`/`ON` bleibt hier auf 0 bzw. aus.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, von der ein Teil genommen wird |
| `B2` | Eingang | Byte | Der Anteil: 0 = nichts, 128 = ungefähr die Hälfte, 255 = ganz |
| `R` | Ausgang | Byte | Das Ergebnis (gerundet) |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis unter null läge — hier nie |
| `O` | Ausgang | Byte | Zweiter Ergebnis-Ausgang für Zahlen über 255 — hier immer 0 |
| `ON` | Ausgang | Bit | Gehört zu `O` und bleibt hier ebenfalls aus |

## Ausprobieren

Stelle `B1` auf 200 und spiele mit `B2`: Bei 128 kommt etwa die Hälfte
heraus (also ungefähr 100), bei 255 die vollen 200:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Scale", "_id": "scale1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Lautstärke/Helligkeit**: Ein [Slider](../user-input/slider.md) auf
  `B2` lässt dich ein Signal stufenlos von nichts bis ganz einstellen —
  zum Beispiel wie laut ein Ton ist oder wie hell eine Lampe leuchtet,
  etwa bei einer [Sinus](sinus.md)-Welle.
- **Sanft einblenden**: Ein langsam hochzählender
  [Counter8](../memory/counter8.md) auf `B2` lässt einen Wert weich
  von 0 auf voll anwachsen.
- **Werte umrechnen**: Soll eine Anzeige mit Werten von 0 bis 255 nur
  Zahlen von 0 bis 100 zeigen? Stelle `B2` fest auf 100. Scale nimmt
  dann von jeder Zahl rund 39 Hundertstel, und aus 255 wird 100.

## Siehe auch

[Multiply](multiply.md) · [Divide](divide.md) ·
[Slider](../user-input/slider.md)
