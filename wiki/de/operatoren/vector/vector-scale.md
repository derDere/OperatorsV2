# Vector Scale

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein Paar aus zwei Zahlen — Schritte zur Seite und Schritte nach unten —
beschreibt einen Weg; so ein Paar nennt man einen **Vektor**
(ausführlich unter [Vektoren](../../grundlagen/vektoren.md)).

Vector Scale ist der **Regler für die Länge eines Weges**: Die Richtung
bleibt genau dieselbe, nur die Strecke wird kürzer, so als bliebest du
auf halber Strecke stehen. Wie viel vom Weg gegangen wird, sagt der
Eingang `V`: 255 heißt „den ganzen Weg", 128 „ungefähr den halben", 0
„gar keinen Schritt".

Gerechnet wird jede der beiden Zahlen mal `V` geteilt durch 255. Weil
`V` höchstens 255 sein kann, ist dieser Anteil höchstens 1 — der Weg
wird also **nie länger** als er war, sondern nur kürzer oder bleibt
gleich. Ein Beispiel: Der Weg geht 200 nach rechts und 100 nach unten.
Bei `V` = 128 werden daraus ungefähr 100 nach rechts und 50 nach unten.
Beide Zahlen schrumpfen gleich stark — deshalb zeigt der Weg immer noch
genau dorthin wie vorher, er ist nur halb so lang. Und weil er nur
kürzer wird, kann keine Zahl über 255 hinauswachsen und umspringen. Das
Gegenstück für eine einzelne Zahl ist [Scale](../math/scale.md); länger
wird ein Weg mit [Vector Multiply](vector-multiply.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Der Weg: Schritte nach rechts / nach unten |
| `V` | Eingang | Byte | Wie viel vom Weg: 0 = nichts, 128 = ungefähr die Hälfte, 255 = alles |
| `CX` / `CY` | Ausgang | Byte | Der gekürzte Weg — gleiche Richtung, kürzere Strecke |

## Ausprobieren

Stelle A auf 200 nach rechts und 100 nach unten und spiele mit `V` — bei
128 kommen etwa 100 und 50 heraus, die beiden Zahlen bleiben immer im
gleichen Verhältnis zueinander:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Scale", "_id": "vscale1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Figuren kleiner machen**: Schicke alle Punkte einer Figur durch
  denselben Vector Scale — dann schrumpft die ganze Figur gleichmäßig. Mit
  einem Schieberegler ([Slider](../user-input/slider.md)) auf `V` ziehst du
  sie von Hand klein und wieder auf volle Größe.
- **Sanft ausfahren**: Ein Zähler ([Counter](../memory/counter8.md)), der
  langsam hochzählt, auf `V` gelegt — der Weg wächst weich von ganz kurz
  bis zur vollen Länge.
- **Atmende Formen**: [Sinus](../math/sinus.md) liefert Zahlen, die sanft
  auf und ab wandern wie eine Welle. Auf `V` gelegt, wird die Figur immer
  abwechselnd kleiner und wieder größer — sie atmet.

## Siehe auch

[Scale](../math/scale.md) · [Vector Multiply](vector-multiply.md) ·
[Vector Rotate](vector-rotate.md)
