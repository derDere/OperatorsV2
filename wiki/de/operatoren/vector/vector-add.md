# Vector Add

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein Paar aus zwei Zahlen — `X` für die Schritte zur Seite, `Y` für die
Schritte nach unten — beschreibt einen Weg von einem Punkt zum nächsten;
so ein Paar nennt man einen **Vektor** (ausführlich unter
[Vektoren](../../grundlagen/vektoren.md)).

Vector Add hängt zwei solche Wege aneinander: erst Weg A gehen, dann von
dort aus Weg B. Dafür zählt der Baustein die beiden Seitwärts-Zahlen
zusammen und die beiden Nach-unten-Zahlen zusammen. Ein Beispiel: 3 nach
rechts und 2 nach unten, danach noch 1 nach rechts und 4 nach unten —
macht zusammen 4 nach rechts und 6 nach unten.

Jede dieser Zahlen ist ein Byte, kann also 0 bis 255 groß sein (siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)) — genau so groß ist
auch die Zeichenfläche des [Line Displays](../display/line-display.md).
Wird eine Zahl größer als 255, fängt sie wieder bei 0 an; das nennt man
einen **Überlauf** (siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
Auf der Fläche heißt das: Wer rechts hinausläuft, kommt links wieder
herein.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Weg A: Schritte nach rechts / nach unten |
| `BX` / `BY` | Eingang | Byte | Weg B: der Weg, der an A angehängt wird |
| `CX` / `CY` | Ausgang | Byte | Wo du am Ende stehst — A und B zusammengezählt |

## Ausprobieren

Stelle die beiden Wege ein — zum Beispiel A auf 100 nach rechts und 100
nach unten, B auf 20 nach rechts und 0 nach unten. Das Ergebnis wandert
20 nach rechts, steht also bei 120 und 100:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Add", "_id": "vadd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Figuren verschieben**: Eine gespeicherte Form ist nichts anderes als
  eine Liste von Punkten — zum Beispiel aus einem
  [Stack Input](../fixed-input/stack-input.md). Hängst du an jeden dieser
  Punkte denselben Zusatzweg an, zeichnet das
  [Line Display](../display/line-display.md) dieselbe Figur an einer
  anderen Stelle. Zwei Schieberegler
  ([Slider](../user-input/slider.md)) auf `BX`/`BY` machen sie frei
  beweglich.
- **Bewegung Schritt für Schritt**: Der Ort, an dem etwas gerade ist,
  plus der Weg, den es pro Schritt zurücklegt, ergibt den nächsten Ort.
  Merkt sich ein Speicher ([Memory](../memory/memory-1byte.md)) das
  Ergebnis und schickt es zurück an den Eingang, wandert ein Punkt von
  allein über die Fläche.

## Siehe auch

[Vector Subtract](vector-subtract.md) · [Vector Rotate](vector-rotate.md) ·
[Line Display](../display/line-display.md)
