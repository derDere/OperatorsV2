# Vector Rotate

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein Paar aus zwei Zahlen — Schritte zur Seite und Schritte nach unten —
beschreibt einen Weg; so ein Paar nennt man einen **Vektor**
(ausführlich unter [Vektoren](../../grundlagen/vektoren.md)).

Vector Rotate **schwenkt so einen Weg um seinen Startpunkt herum**, wie
der Zeiger einer Uhr, dessen eines Ende in der Mitte steckt, während das
andere im Kreis wandert — und zwar in dieselbe Richtung, in die auch die
Uhrzeiger laufen. Die Länge des Weges bleibt dabei gleich, nur die
Richtung ändert sich.

Wie weit geschwenkt wird, sagt der Eingang `V`. Einmal ganz herum sind
hier 255 Schritte. Damit heißt 0 „gar nicht schwenken", 64 ist eine
Vierteldrehung (wie von der 12 zur 3), 128 eine halbe Drehung (von der 12
zur 6) und 191 eine Dreivierteldrehung. Wie weit etwas gedreht ist, nennt
man den **Winkel**. Dieselbe Art, einen Winkel als Zahl aufzuschreiben,
benutzen auch [Sinus](../math/sinus.md) und [Cosinus](../math/cosinus.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Der Weg, der geschwenkt wird |
| `V` | Eingang | Byte | Wie weit geschwenkt wird: 64 = Vierteldrehung, 255 = einmal ganz herum |
| `CX` / `CY` | Ausgang | Byte | Der geschwenkte Weg |

Geschwenkt wird immer um die Stelle, an der beide Zahlen 0 sind — auf der
Zeichenfläche ist das die linke obere Ecke. Dort steckt sozusagen die
Nadel, auf der der Zeiger sitzt. Rutscht eine Zahl beim Schwenken unter 0,
fängt sie am oberen Ende wieder an: Aus 2 minus 5 wird 253 (siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).

## Ausprobieren

Stelle A auf 100 nach rechts und 0 nach unten — der Pfeil zeigt damit nach
rechts, wie der Zeiger auf der 3. Drehe dann am Winkel: Bei `V` = 64, also
einer Vierteldrehung, zeigt er nach unten, und heraus kommen ungefähr 0
nach rechts und 100 nach unten:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Rotate", "_id": "vrot1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Uhrzeiger und Radar**: Ein Weg mit fester Länge plus ein Winkel, der
  immer weiterzählt (aus einem [Counter8](../memory/counter8.md)) — auf
  dem [Line Display](../display/line-display.md) kreist ein Zeiger wie der
  wandernde Strahl auf einem Radarschirm. Das Beispiel *draw* im
  📚-Examples-Menü des Editors zeigt das Zeichnen mit Wegen in Aktion.
- **Figuren drehen**: Schicke alle Eckpunkte einer Form durch dieselbe
  Drehung, dann dreht sich die ganze Figur. Damit sie sich um ihre eigene
  Mitte dreht und nicht um die Ecke der Fläche: vorher die Mitte mit
  [Vector Subtract](vector-subtract.md) abziehen und hinterher mit
  [Vector Add](vector-add.md) wieder dazurechnen.
- **Im Kreis laufen**: Ein Weg mit fester Länge, dessen Winkel Schritt für
  Schritt weiterzählt, zeichnet von allein einen Kreis — dafür genügt
  dieser eine Baustein.

## Siehe auch

[Sinus](../math/sinus.md) · [Cosinus](../math/cosinus.md) ·
[Vector Add](vector-add.md) · [Line Display](../display/line-display.md)
