# Equals

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Equals ist der **Gleichheits-Prüfer**: Er vergleicht `B1` und `B2`. Sind
beide Zahlen gleich groß, geht der Ausgang `O` an; sind sie
unterschiedlich, geht stattdessen `!O` an.

Der Ausgang `B` zeigt zusätzlich, an welchen Stellen genau sich zwei
ungleiche Zahlen unterscheiden. Denk an die acht Schalter einer Zahl
(siehe [Bits und Bytes](../../grundlagen/bits-und-bytes.md)): Überall
dort, wo `B1` und `B2` einen unterschiedlichen Schalter haben, leuchtet
in `B` das passende Bit auf. Sind beide Zahlen gleich, bleibt `B`
komplett aus (`00`). Dieser Bit-für-Bit-Vergleich heißt bitweises
[Xor](../logic/xor.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Erste Zahl |
| `B2` | Eingang | Byte | Zweite Zahl |
| `B` | Ausgang | Byte | Zeigt, an welchen Bit-Stellen sich die beiden Zahlen unterscheiden (`00` = beide gleich) |
| `O` | Ausgang | Bit | An, wenn beide Zahlen gleich sind |
| `!O` | Ausgang | Bit | An, wenn sie sich unterscheiden |

## Ausprobieren

Stelle beide Regler auf dieselbe Zahl — `O` geht an und `B` wird `00`.
Verstelle dann einen Regler nur ein kleines bisschen und sieh, welche
Bits in `B` aufleuchten:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Equals", "_id": "eq1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zielwert erkennen**: Ein fester Vergleichswert per
  [Value](../fixed-input/value.md) auf `B2` — und `O` meldet „der
  Zähler hat 100 erreicht" oder „das eingetippte Zeichen ist ein
  Leerzeichen". Ob beim [Text Input](../user-input/text-input.md) die
  Enter-Taste gedrückt wurde, musst du so nicht prüfen: Dafür hat er
  seinen eigenen Ausgang `N`.
- **Codeschloss**: Eingegebene Zahl gleich Geheimzahl? Dann geht `O`
  an — zum Beispiel setzt ein [RS FlipFlop](../logic/rs-flipflop.md)
  damit die „Tür auf"-Lampe.
- **Änderungs-Wächter**: Vergleiche einen Wert mit einer gespeicherten
  Kopie von sich selbst ([Memory (1 byte)](../memory/memory-1byte.md))
  — `!O` meldet dir, dass sich seitdem etwas geändert hat.
- **Größer oder kleiner** kann Equals nicht sagen — nur „gleich" oder
  „ungleich". Für „größer als" nimmst du den [Subtract](subtract.md)
  mit seinem `RN`-Ausgang.

## Siehe auch

[Subtract](subtract.md) · [Xor](../logic/xor.md)
