# Vector Scale

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Vector Scale ist der **Prozentregler für Pfeile**: Beide Koordinaten
werden mit dem Anteil `V ÷ 255` multipliziert — 255 heißt „volle Länge",
128 „ungefähr halbe Länge", 0 „nichts". Der Pfeil behält seine Richtung
und ändert nur seine Länge; ein Überlauf ist ausgeschlossen. Das
Vektor-Gegenstück zum einfachen [Scale](../math/scale.md).

(Was Vektoren sind, erklärt kurz die Seite [Vector Add](vector-add.md).)

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Der Vektor |
| `V` | Eingang | Byte | Der Anteil: 0 = 0 %, 255 = 100 % |
| `CX` / `CY` | Ausgang | Byte | Der verkürzte/gestreckte Vektor |

## Ausprobieren

Stelle A auf (200, 100) und spiele mit `V` — bei 128 wird daraus etwa
(100, 50), das Verhältnis der Koordinaten bleibt erhalten:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Scale", "_id": "vscale1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zoomen**: Eine Figur, deren Punkte alle durch denselben Scale laufen,
  wächst und schrumpft am [Slider](../user-input/slider.md).
- **Sanfte Bewegungen**: Ein langsam steigender
  [Counter](../memory/counter8.md) auf `V` lässt einen Pfeil weich
  ausfahren.
- **Pulsierende Formen**: [Sinus](../math/sinus.md) auf `V` — die Figur
  atmet im Wellenrhythmus.

## Siehe auch

[Scale](../math/scale.md) · [Vector Multiply](vector-multiply.md) ·
[Vector Rotate](vector-rotate.md)
