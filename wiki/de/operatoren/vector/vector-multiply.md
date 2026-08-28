# Vector Multiply

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein Paar aus zwei Zahlen — Schritte zur Seite und Schritte nach unten —
beschreibt einen Weg; so ein Paar nennt man einen **Vektor**
(ausführlich unter [Vektoren](../../grundlagen/vektoren.md)).

Vector Multiply geht **denselben Weg mehrmals hintereinander**. Wie oft,
das sagt der Eingang `V`. Ein Beispiel: Der Weg geht 10 nach rechts und 5
nach unten. Nimmst du ihn dreimal, stehst du am Ende 30 nach rechts und 15
nach unten — dieselbe Richtung wie vorher, nur dreimal so weit.

[Vector Scale](vector-scale.md) kürzt einen Weg; Vector Multiply
verlängert ihn. Dabei kann eine Zahl über 255 hinauswachsen — dann fängt
sie wieder bei 0 an; das nennt man einen **Überlauf** (siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
Aus 100 mal 3 werden so nicht 300, sondern 44, denn nach 255 beginnt die
Zählung von vorn.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Der Weg: Schritte nach rechts / nach unten |
| `V` | Eingang | Byte | Wie oft der Weg gegangen wird |
| `CX` / `CY` | Ausgang | Byte | Der vervielfachte Weg |

## Ausprobieren

Stelle A klein ein — zum Beispiel 10 nach rechts und 5 nach unten — und
drehe `V` langsam hoch, bis die Zahlen über 255 hinausschießen und wieder
bei 0 anfangen:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Multiply", "_id": "vmult1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Weite Sprünge**: Ein kleiner Weg mal die Anzahl der Schritte ergibt
  die Strecke, die insgesamt zurückgelegt wurde. So wandern Punkte in
  gleichmäßigen Sprüngen über das
  [Line Display](../display/line-display.md).
- **Ein Gitter aufziehen**: Nummeriere die Kästchen eines Gitters durch
  (das erste, das zweite, das dritte …) und nimm die Nummer mal die Größe
  eines Kästchens — heraus kommt, wo dieses Kästchen auf der Fläche liegt.
- Soll ein Weg nur ein Stück kürzer werden, ohne dass eine Zahl über 255
  hinausschießt, ist [Vector Scale](vector-scale.md) die sichere Wahl.

## Siehe auch

[Vector Scale](vector-scale.md) · [Multiply](../math/multiply.md) ·
[Vector Add](vector-add.md)
