# Vector Modulo

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Vector Modulo rechnet für beide Koordinaten den **Rest beim Teilen**:
`CX = AX mod BX`, `CY = AY mod BY`. Wie beim einfachen
[Modulo](../math/modulo.md) hält das Werte in einem festen Bereich — nur
eben gleich für ein ganzes Koordinatenpaar.

(Was Vektoren sind, erklärt kurz die Seite [Vector Add](vector-add.md).)

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Vektor A |
| `BX` / `BY` | Eingang | Byte | Die Teiler je Koordinate (0 ergibt 0) |
| `CX` / `CY` | Ausgang | Byte | Der Rest je Koordinate |

## Ausprobieren

Stelle `BX` und `BY` z. B. auf 50 und drehe A hoch — das Ergebnis bleibt
immer unterhalb von 50 und springt beim Erreichen zurück:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Modulo", "_id": "vmod1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Punkte im Spielfeld halten**: Ein ständig wachsender Ort mod
  Spielfeldgröße — wer rechts hinausläuft, kommt links wieder herein
  (der Bildschirm-„Umlauf" klassischer Arcade-Spiele).
- **Raster und Kacheln**: Position mod Kachelgröße ergibt die Lage
  innerhalb der Kachel — Grundlage für sich wiederholende Muster auf dem
  [Line Display](../display/line-display.md).
- **Zwei Ringzähler auf einmal**: Statt zweier einzelner
  [Modulo](../math/modulo.md)-Bausteine für X und Y genügt dieser eine.

## Siehe auch

[Modulo](../math/modulo.md) · [Vector Add](vector-add.md) ·
[Line Display](../display/line-display.md)
