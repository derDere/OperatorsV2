# Multiply

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Multiply ist das **Mal-Zeichen**: Er rechnet `B1 × B2`. Produkte werden
schnell groß (bis 255 × 255 = 65 025) — deshalb ist hier der
Überlauf-Ausgang `O` besonders wichtig.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Erster Faktor |
| `B2` | Eingang | Byte | Zweiter Faktor |
| `R` | Ausgang | Byte | Das Ergebnis (nach Abzug des Überlaufs) |
| `RN` | Ausgang | Bit | An bei negativem Ergebnis (beim Multiplizieren zweier Bytes nie) |
| `O` | Ausgang | Byte | Wie oft das Ergebnis über 255 hinausging — je Überschreitung werden 255 abgezogen |
| `ON` | Ausgang | Bit | An, wenn der Überlauf negativ zu lesen wäre |

## Ausprobieren

Bleibe erst klein (z. B. 12 × 5), dann probiere Großes (z. B. 100 × 100)
und sieh, wie `O` mitwächst:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Multiply", "_id": "mult1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Verstärken**: Eine feste Zahl auf `B2` macht aus jedem Signal das
  n-Fache — etwa um kleine Zählerstände auf einer Anzeige zu spreizen.
- **Flächen und Raster**: Zeile × Spaltenbreite ergibt die laufende
  Position in einem Raster — die Grundrechnung, wenn man z. B. das
  [Terminal Display](../display/terminal-display.md) oder das
  [Register](../memory/register.md) wie eine Tabelle adressieren will.
- **Proportional skalieren** ohne Überlauf-Sorgen erledigt übrigens
  [Scale](scale.md) — er teilt gleich wieder durch 255.

## Siehe auch

[Divide](divide.md) · [Scale](scale.md) · [Add](add.md)
