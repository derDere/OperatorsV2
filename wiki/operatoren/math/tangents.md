# Tangents

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Tangents berechnet den **Tangens** eines Winkels — das Verhältnis von
Gegenkathete zu Ankathete, oder anschaulicher: die **Steigung** einer Linie
mit diesem Winkel. Der Eingang ist wieder ein Winkel im Byte-Format
(0 bis 255 ≙ voller Kreis).

Der Tangens hat eine Tücke: Er wächst in Richtung 90° ins Unendliche und
passt dann in kein Byte. Der Baustein löst das elegant — sobald der Tangens
über 1 hinausschösse, gibt er stattdessen den **Kotangens** aus (den
Kehrwert) und meldet das über den Ausgang `CO`. So bleibt der Wert immer
im Bereich 0–255.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Der Winkel: 255 ≙ voller Kreis |
| `T` | Ausgang | Byte | Tangens (bzw. Kotangens) × 255 |
| `CO` | Ausgang | Bit | An, wenn gerade der Kotangens ausgegeben wird |
| `TN` | Ausgang | Bit | An, wenn der Wert eigentlich negativ ist |

## Ausprobieren

Bei Winkel 32 (≙ 45°) sind Tangens und Kotangens gleich — `T` zeigt 255.
Darunter siehst du den Tangens, darüber springt `CO` an:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tangents", "_id": "tan1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Steigungen und Rampen**: Aus einem Winkel wird ein
  Steigungsverhältnis — etwa um auf dem
  [Line Display](../display/line-display.md) Linien mit definiertem Winkel
  zu konstruieren.
- Für die meisten Wellen- und Kreis-Aufgaben sind
  [Sinus](sinus.md)/[Cosinus](cosinus.md) die handlicheren Werkzeuge —
  Tangents ist der Spezialist für Verhältnisse.

## Siehe auch

[Sinus](sinus.md) · [Cosinus](cosinus.md)
