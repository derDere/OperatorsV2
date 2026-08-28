# Vector Add

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein **Vektor** ist ein Zahlenpaar (X, Y) — je nach Blickwinkel ein Punkt
auf einer Fläche oder ein Pfeil („gehe X nach rechts und Y nach unten").
In OperatorsV2 ist jede Koordinate ein Byte (0–255), passend zur Fläche
des [Line Displays](../display/line-display.md).

Vector Add **addiert zwei Vektoren** koordinatenweise: Der Punkt A wird um
den Pfeil B verschoben. Läuft eine Koordinate über 255 hinaus, beginnt sie
wieder bei 0 (die Fläche „wickelt um").

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Vektor A |
| `BX` / `BY` | Eingang | Byte | Vektor B |
| `CX` / `CY` | Ausgang | Byte | Das Ergebnis: A + B je Koordinate |

## Ausprobieren

Stelle Punkt A und Verschiebung B ein — z. B. A = (100, 100), B = (20, 0):
Das Ergebnis wandert 20 nach rechts:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Add", "_id": "vadd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Figuren verschieben**: Eine gespeicherte Form (Koordinaten aus einem
  [Stack Input](../fixed-input/stack-input.md)) plus ein einstellbarer
  Versatz — schon zeichnet das [Line Display](../display/line-display.md)
  dieselbe Figur an anderer Stelle. Zwei
  [Slider](../user-input/slider.md) auf `BX`/`BY` machen sie frei
  beweglich.
- **Bewegung Schritt für Schritt**: Position + Geschwindigkeit ergibt die
  nächste Position; hält man das Ergebnis in
  [Memories](../memory/memory-1byte.md) fest und führt es zurück, fliegt
  ein Punkt von allein über die Fläche.

## Siehe auch

[Vector Subtract](vector-subtract.md) · [Vector Rotate](vector-rotate.md) ·
[Line Display](../display/line-display.md)
