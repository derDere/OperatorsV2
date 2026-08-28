# Vector Subtract

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Vector Subtract **zieht zwei Vektoren voneinander ab** — koordinatenweise
A − B. Anschaulich beantwortet das die Frage: „Welcher Pfeil führt von B
nach A?" Unterschreitet eine Koordinate die 0, läuft sie rundum und kommt
von 255 wieder herein.

(Was Vektoren sind, erklärt kurz die Seite [Vector Add](vector-add.md).)

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Vektor A |
| `BX` / `BY` | Eingang | Byte | Vektor B, der abgezogen wird |
| `CX` / `CY` | Ausgang | Byte | Das Ergebnis: A − B je Koordinate |

## Ausprobieren

Stelle zwei Punkte ein — das Ergebnis ist der Verbindungspfeil von B
nach A:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Subtract", "_id": "vsub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Richtungen bestimmen**: Zielpunkt minus eigene Position ergibt den
  Pfeil zum Ziel — die Grundlage für alles, was etwas „verfolgen" soll.
- **Relativ zeichnen**: Formen, die um einen Mittelpunkt herum definiert
  sind, rechnet man mit Subtract/Add zwischen Welt- und
  Mittelpunkt-Koordinaten um.
- **Abstände je Achse**: Die Ergebnis-Koordinaten zeigen, wie weit zwei
  Punkte horizontal und vertikal auseinanderliegen (fürs Vorzeichen
  bzw. saubere Beträge einzelner Zahlen: [Subtract](../math/subtract.md)).

## Siehe auch

[Vector Add](vector-add.md) · [Subtract](../math/subtract.md) ·
[Line Display](../display/line-display.md)
