# Modulo

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Modulo verrät dir den **Rest beim Teilen**: `B1 mod B2`. `13 mod 4` ergibt
also 1 — genau den Teil, den [Divide](divide.md) beim Abrunden wegfallen
lässt.

Damit hält Modulo Zahlen in einem festen Kreis: wie der Zeiger einer Uhr,
der nach der 12 wieder bei 1 anfängt. Zählst du bei `B2` = 5 immer weiter
(0, 1, 2, 3, 4, 5, 6, 7 …), zeigt `R` immer wieder von vorn: 0, 1, 2, 3,
4, 0, 1, 2 …

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, die geteilt wird |
| `B2` | Eingang | Byte | Die Zahl, durch die geteilt wird |
| `R` | Ausgang | Byte | Der Rest, der beim Teilen übrig bleibt |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis unter null läge — beim Teilen zweier Bytes nie |
| `O` | Ausgang | Byte | Zweiter Ergebnis-Ausgang für Zahlen über 255 — hier immer 0 |
| `ON` | Ausgang | Bit | Gehört zu `O` und bleibt hier ebenfalls aus |

Der Rest beim Teilen durch 0 ist einfach 0.

## Ausprobieren

Stelle `B2` auf 10 und drehe `B1` langsam hoch: Der Rest zählt immer
wieder 0 bis 9 durch — genau wie eben bei der Uhr:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Modulo", "_id": "mod1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Gerade oder ungerade?** `B2` = 2: Der Rest ist 0 bei geraden Zahlen
  und 1 bei ungeraden (4 mod 2 = 0, aber 5 mod 2 = 1) — ein fertiger
  Gerade/Ungerade-Melder.
- **Teilt es glatt auf?** Ist der Rest 0, ging die Teilung ohne Rest
  auf. Ein [Equals](equals.md), der gegen 0 prüft, macht daraus ein
  Ja/Nein-Bit.
- **Im Kreis laufen**: Ein ständig wachsender Zählerstand mod n läuft
  endlos 0 bis n−1 im Kreis — für Lauflichter, für Animationen, oder um
  einen [Counter8](../memory/counter8.md) künstlich früher wieder bei 0
  anfangen zu lassen.
- **Ziffern abspalten**: `37 mod 10` ergibt 7, die letzte Ziffer von 37.
  Alles davor liefert [Divide](divide.md) — oder gleich der
  [Base Converter](../converter/base-converter.md).

## Siehe auch

[Divide](divide.md) · [Equals](equals.md) ·
[Base Converter](../converter/base-converter.md)
