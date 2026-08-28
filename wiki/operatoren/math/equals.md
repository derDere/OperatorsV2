# Equals

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Equals ist der **Gleichheits-Prüfer** für zwei Zahlen: `O` ist an, wenn
`B1` und `B2` exakt gleich sind, `!O` ist an, wenn nicht. Obendrauf zeigt
der Byte-Ausgang `B` als „Unterschieds-Landkarte", **welche** Bits der
beiden Zahlen sich unterscheiden (das ist ein bitweises
[Xor](../logic/xor.md)).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Erste Zahl |
| `B2` | Eingang | Byte | Zweite Zahl |
| `B` | Ausgang | Byte | Unterschiedsmaske: gesetzte Bits markieren abweichende Stellen (`00` = identisch) |
| `O` | Ausgang | Bit | An, wenn beide Zahlen gleich sind |
| `!O` | Ausgang | Bit | An, wenn sie sich unterscheiden |

## Ausprobieren

Stelle beide Regler auf dieselbe Zahl — `O` geht an und `B` wird `00`.
Verstelle dann einen Regler minimal und sieh, welche Bits in `B`
aufleuchten:

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
  [Value](../fixed-input/value.md) auf `B2` — und `O` meldet „der Zähler
  hat 100 erreicht" oder „das eingetippte Zeichen ist ein Enter (Code 13)".
- **Codeschloss**: Eingegebene Zahl gleich Geheimzahl? `O` öffnet — z. B.
  ein [RS FlipFlop](../logic/rs-flipflop.md) setzt die „Tür auf"-Lampe.
- **Änderungs-Wächter**: Vergleiche einen Wert mit seiner gespeicherten
  Kopie ([Memory (1 byte)](../memory/memory-1byte.md)) — `!O` meldet, dass
  sich etwas geändert hat.
- **Größer/kleiner** beantwortet Equals nicht — dafür nimmst du den
  [Subtract](subtract.md) mit seinem `RN`-Ausgang.

## Siehe auch

[Subtract](subtract.md) · [Xor](../logic/xor.md)
