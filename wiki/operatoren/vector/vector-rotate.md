# Vector Rotate

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Vector Rotate **dreht einen Pfeil** um den Nullpunkt. Der Drehwinkel kommt
als Byte auf `V`: 0 heißt keine Drehung, 255 einmal ganz herum — 64 ist
also eine Vierteldrehung, 128 eine halbe. Dieselbe Winkel-Schreibweise
nutzen auch [Sinus](../math/sinus.md) und [Cosinus](../math/cosinus.md).

(Was Vektoren sind, erklärt kurz die Seite [Vector Add](vector-add.md).)

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Der Vektor |
| `V` | Eingang | Byte | Der Drehwinkel: 255 ≙ volle Umdrehung |
| `CX` / `CY` | Ausgang | Byte | Der gedrehte Vektor |

Gedreht wird um den Nullpunkt (0, 0) — also die linke obere Ecke des
Koordinatenbereichs. Koordinaten, die dabei ins Negative geraten, wickeln
um und erscheinen am oberen Ende des Wertebereichs.

## Ausprobieren

Stelle A auf (100, 0) und drehe am Winkel: Bei `V` = 64 (Vierteldrehung)
wird daraus (0, 100):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Rotate", "_id": "vrot1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Uhrzeiger und Radar**: Ein fester Pfeil plus laufender Winkel (aus
  einem [Counter8](../memory/counter8.md)) — auf dem
  [Line Display](../display/line-display.md) dreht sich ein Zeiger. Das
  Beispiel *draw* im 📚-Examples-Menü des Editors zeigt Vektor-Zeichnen
  in Aktion.
- **Figuren rotieren**: Alle Eckpunkte einer Form durch dieselbe Drehung
  schicken — die ganze Figur dreht sich. Damit sie um ihren Mittelpunkt
  statt um die Ecke rotiert: vorher den Mittelpunkt per
  [Vector Subtract](vector-subtract.md) abziehen, danach per
  [Vector Add](vector-add.md) wieder draufrechnen.
- **Kreisbahnen ohne Sinus-Verdrahtung**: Statt Sinus und Cosinus einzeln
  zu bemühen, dreht man einfach einen Radius-Pfeil.

## Siehe auch

[Sinus](../math/sinus.md) · [Cosinus](../math/cosinus.md) ·
[Vector Add](vector-add.md) · [Line Display](../display/line-display.md)
