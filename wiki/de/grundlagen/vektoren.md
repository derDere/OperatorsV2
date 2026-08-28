# Vektoren

Zurück zur [Startseite](../index.md).

Eine einzelne Zahl reicht für vieles: Helligkeit, Lautstärke, ein
Zählerstand. Sobald es aber um eine **Stelle auf einer Fläche** geht, sind
zwei Zahlen nötig — eine für die Seite, eine für oben und unten. Diese
Seite zeigt, wie ein solches Zahlenpaar gemeint ist und was man damit
anstellt.

## Zwei Zahlen, ein Weg

Auf einer Schatzkarte steht der Weg zum Schatz als kurze Anweisung: „6
Schritte nach rechts, 4 Schritte nach unten." Zwei Zahlen genügen, und
jeder findet die Stelle. Ein solches Zahlenpaar nennt man **Vektor**.

Die erste Zahl heißt hier immer `X` und zählt **nach rechts**. Die zweite
heißt `Y` und zählt **nach unten**. Gezählt wird ab der **linken oberen
Ecke** der Fläche: Dort sind beide Zahlen 0, und je größer `Y` wird, desto
weiter unten liegt die Stelle.

Zusammen beschreiben die beiden Zahlen einen Weg — und weil er immer an
derselben Ecke beginnt, beschreibt derselbe Weg zugleich eine Stelle auf
der Fläche. Beides ist dasselbe Zahlenpaar, nur anders gelesen.

Jede der beiden Zahlen ist eine ganz normale Zahl von 0 bis 255 (siehe
[Bits und Bytes](bits-und-bytes.md)) — und genau so groß ist auch die
Zeichenfläche des
[Line Displays](../operatoren/display/line-display.md).

## Wege aneinanderhängen

Zwei Wege lassen sich hintereinanderhängen: erst den einen gehen, dann von
dort aus den anderen. Dafür zählt man die beiden `X`-Zahlen zusammen und
die beiden `Y`-Zahlen zusammen. Ein Beispiel: 3 nach rechts und 2 nach
unten, danach 1 nach rechts und 4 nach unten — macht 4 nach rechts und 6
nach unten. Genau das erledigt
[Vector Add](../operatoren/vector/vector-add.md).

So bewegt man Dinge: Der Ort, an dem etwas gerade ist, plus der Weg, den es
pro Schritt zurücklegt, ergibt den nächsten Ort.

## Verlängern und verkürzen

Man kann denselben Weg auch nur zur Hälfte gehen oder ihn strecken. Dafür
werden **beide** Zahlen gleich stark verändert — dann zeigt der Weg immer
noch genau dorthin wie vorher, er ist nur kürzer oder länger. Ändert man
nur eine der beiden Zahlen, ändert sich auch die Richtung.
[Vector Scale](../operatoren/vector/vector-scale.md) ist der Regler dafür.

## Drehen und Winkel

Stell dir den Zeiger einer Uhr vor: Ein Ende steckt fest, das andere
wandert im Kreis. Genauso lässt sich ein Weg um seinen Startpunkt schwenken
— die Länge bleibt, nur die Richtung ändert sich. Wie weit etwas gedreht
ist, nennt man den **Winkel**.

Hier wird der Winkel als Zahl von 0 bis 255 angegeben: Eine volle
Umdrehung sind **255 Schritte**. Damit gilt:

| Winkel | Drehung | Zeiger steht auf |
| --- | --- | --- |
| 0 | gar keine | 12 |
| 64 | eine Vierteldrehung | 3 |
| 128 | eine halbe Drehung | 6 |
| 191 | eine Dreivierteldrehung | 9 |

Gedreht wird von [Vector Rotate](../operatoren/vector/vector-rotate.md).
Dieselbe Art, einen Winkel aufzuschreiben, benutzen auch
[Sinus](../operatoren/math/sinus.md) und
[Cosinus](../operatoren/math/cosinus.md).

## Ausprobieren

Vector Add hängt zwei Wege aneinander: `AX`/`AY` ist der erste, `BX`/`BY`
der zweite, `CX`/`CY` zeigt, wo du am Ende stehst. Stelle A auf 100 nach
rechts und 100 nach unten. Drehe dann an `BX` — der Punkt wandert nach
rechts. Drehe an `BY` — er wandert nach unten:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Add", "_id": "vadd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Weiterlesen

- [Vector Add](../operatoren/vector/vector-add.md) — der Baustein aus der
  Demo
- [Vector Rotate](../operatoren/vector/vector-rotate.md) — schwenken und
  Winkel
- [Line Display](../operatoren/display/line-display.md) — die Fläche, auf
  der Wege sichtbar werden
