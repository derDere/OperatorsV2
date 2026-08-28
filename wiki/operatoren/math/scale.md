# Scale

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Scale ist der **Prozentregler**: Er rechnet `B1 × (B2 ÷ 255)`. Die zweite
Zahl wirkt also nicht als Faktor, sondern als **Anteil** — 255 heißt
„100 %", 128 ungefähr „50 %", 0 heißt „nichts". Wie ein Lautstärkeregler
für Zahlen: Das Ergebnis bleibt immer im Byte-Bereich, ein Überlauf ist
unmöglich.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, die skaliert wird |
| `B2` | Eingang | Byte | Der Anteil: 0 = 0 %, 255 = 100 % |
| `R` | Ausgang | Byte | Das skalierte Ergebnis (gerundet) |
| `RN` | Ausgang | Bit | An bei negativem Ergebnis (hier nie) |
| `O` | Ausgang | Byte | Überlauf über 255 (hier nie) |
| `ON` | Ausgang | Bit | An, wenn der Überlauf negativ zu lesen wäre |

## Ausprobieren

Stelle `B1` auf 200 und spiele mit `B2`: Bei 128 kommt etwa die Hälfte
heraus, bei 255 die vollen 200:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Scale", "_id": "scale1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Lautstärke/Helligkeit**: Ein [Slider](../user-input/slider.md) auf `B2`
  regelt jedes Signal stufenlos von 0 bis 100 % — z. B. die Amplitude einer
  [Sinus](sinus.md)-Welle.
- **Sanft einblenden**: Ein langsam hochzählender
  [Counter8](../memory/counter8.md) auf `B2` lässt einen Wert weich von
  0 auf voll anwachsen.
- **Bereiche anpassen**: Ein Messwert 0–255 soll nur noch 0–100 umfassen?
  `B2` fest auf 100 — fertig ist die Bereichs-Umrechnung.

## Siehe auch

[Multiply](multiply.md) · [Divide](divide.md) ·
[Slider](../user-input/slider.md)
