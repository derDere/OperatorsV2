# Modulo

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Modulo liefert den **Rest beim Teilen**: `B1 mod B2`. Beispiel:
7 mod 3 = 1, denn 3 passt zweimal in 7 und übrig bleibt 1. Klingt
unscheinbar, ist aber einer der vielseitigsten Rechen-Bausteine überhaupt.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, die geteilt wird |
| `B2` | Eingang | Byte | Der Teiler |
| `R` | Ausgang | Byte | Der Rest der Teilung |
| `RN` | Ausgang | Bit | An bei negativem Ergebnis (hier nie) |
| `O` | Ausgang | Byte | Überlauf über 255 (hier nie) |
| `ON` | Ausgang | Bit | An, wenn der Überlauf negativ zu lesen wäre |

Modulo 0 ergibt schlicht 0.

## Ausprobieren

Stelle `B2` auf 10 und drehe `B1` langsam hoch: Der Rest läuft immer wieder
0 bis 9 durch — Modulo hält Zahlen in einem festen Bereich:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Modulo", "_id": "mod1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Gerade oder ungerade?** `B2` = 2: Der Rest ist 0 bei geraden und 1 bei
  ungeraden Zahlen — ein fertiger Gerade/Ungerade-Melder.
- **Teilbarkeit prüfen**: Rest 0 heißt „glatt teilbar". Ein
  [Equals](equals.md) gegen 0 dahinter macht daraus ein Ja/Nein-Bit.
- **Im Kreis laufen**: Ein ständig wachsender Zählerstand mod n läuft
  endlos 0 … n−1 im Kreis — perfekt für Lauflichter, Animationsphasen oder
  um einen [Counter8](../memory/counter8.md) künstlich früher „überlaufen"
  zu lassen.
- **Ziffern abspalten**: mod 10 ergibt die Einerstelle einer Zahl; das
  große Ganze dazu liefert [Divide](divide.md) — oder gleich der
  [Base Converter](../converter/base-converter.md).

## Siehe auch

[Divide](divide.md) · [Equals](equals.md) ·
[Base Converter](../converter/base-converter.md)
