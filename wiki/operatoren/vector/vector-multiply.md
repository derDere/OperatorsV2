# Vector Multiply

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Vector Multiply **vervielfacht einen Pfeil**: Beide Koordinaten werden mit
der Zahl `V` multipliziert — aus (10, 5) mal 3 wird (30, 15). Die Richtung
bleibt, die Länge wächst auf das V-Fache. Achtung: Anders als beim
[Vector Scale](vector-scale.md) wird hier richtig multipliziert — läuft
eine Koordinate über 255 hinaus, wickelt sie um und beginnt vorn.

(Was Vektoren sind, erklärt kurz die Seite [Vector Add](vector-add.md).)

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Der Vektor |
| `V` | Eingang | Byte | Der Faktor |
| `CX` / `CY` | Ausgang | Byte | Der vervielfachte Vektor |

## Ausprobieren

Stelle A klein ein (z. B. 10, 5) und drehe `V` hoch — bis zum Umwickeln:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Multiply", "_id": "vmult1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Schritte vergrößern**: Ein kleiner Richtungs-Pfeil mal Schrittzahl
  ergibt die zurückgelegte Strecke — so wandern Punkte in gleichmäßigen
  Sprüngen über das [Line Display](../display/line-display.md).
- **Raster aufziehen**: Zellenindex mal Zellengröße liefert die
  Pixelposition einer Rasterzelle.
- Für **feinfühliges** Verlängern und Verkürzen (ohne Umwickeln) ist
  [Vector Scale](vector-scale.md) die sichere Wahl.

## Siehe auch

[Vector Scale](vector-scale.md) · [Multiply](../math/multiply.md) ·
[Vector Add](vector-add.md)
