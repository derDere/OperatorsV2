# Cosinus

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Cosinus ist der Zwilling des [Sinus](sinus.md): dieselbe sanfte Welle, nur
um eine Viertel-Runde versetzt — er startet bei seinem **Maximum** statt
bei null. Der Eingang ist wieder ein Winkel im Byte-Format
(0 bis 255 ≙ einmal rund um den Kreis).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Der Winkel: 255 ≙ voller Kreis |
| `R` | Ausgang | Byte | Der Betrag des Cosinus, gestreckt auf 0–255 |
| `RN` | Ausgang | Bit | An, solange der Cosinus eigentlich negativ ist |

Stützpunkte:

| `B1` | entspricht | `R` | `RN` |
| --- | --- | --- | --- |
| 0 | 0° | 255 | aus |
| 64 | 90° | ≈ 0 | — |
| 128 | 180° | 255 | an |
| 192 | 270° | ≈ 0 | — |

## Ausprobieren

Stelle den Winkel von Hand ein und vergleiche mit der Tabelle:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Cosinus", "_id": "cos1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Kreisbewegung komplett**: Cosinus liefert die X-Koordinate,
  [Sinus](sinus.md) mit demselben Winkel die Y-Koordinate — zusammen
  beschreibt ein Punkt einen sauberen Kreis, etwa auf dem
  [Line Display](../display/line-display.md).
- **Versetzte Wellen**: Zwei Lampen, die abwechselnd atmen? Eine bekommt
  Sinus, die andere Cosinus desselben Winkels.
- Für reine Drehungen von Punkten gibt es auch fertig den
  [Vector Rotate](../vector/vector-rotate.md).

## Siehe auch

[Sinus](sinus.md) · [Tangents](tangents.md) ·
[Vector Rotate](../vector/vector-rotate.md)
