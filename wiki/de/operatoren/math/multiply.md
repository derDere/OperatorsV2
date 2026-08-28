# Multiply

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Multiply ist das **Mal-Zeichen**: Er rechnet `B1 × B2`.

Beim Malnehmen werden Zahlen schnell riesig — bis zu 255 × 255 = 65 025.
Durch die Leitungen hier fließen aber nur die Zahlen 0 bis 255. `R` gibt
deshalb nur den Teil aus, der hineinpasst, und `O` zählt, wie oft das
Ergebnis über 255 hinausging — das nennt man den **Überlauf** (siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
Bei diesem Baustein ist `O` deshalb besonders wichtig.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Erste Zahl |
| `B2` | Eingang | Byte | Zweite Zahl |
| `R` | Ausgang | Byte | Das Ergebnis ohne den übergelaufenen Teil |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis unter null läge — beim Malnehmen zweier Bytes nie |
| `O` | Ausgang | Byte | Der Überlauf: wie oft das Ergebnis über 255 hinausging |
| `ON` | Ausgang | Bit | An, wenn auch der Überlauf unter null läge |

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

- **Verstärken**: Eine feste Zahl auf `B2` macht jedes Signal doppelt,
  dreifach oder noch größer — etwa um kleine Zählerstände auf einer
  Anzeige deutlicher sichtbar zu machen.
- **Flächen und Raster**: Zeilennummer × Zeilenlänge ergibt, wo eine
  Zeile im Raster beginnt — die Grundrechnung, wenn du z. B. das
  [Terminal Display](../display/terminal-display.md) oder das
  [Register](../memory/register.md) wie eine Tabelle Feld für Feld
  ansprechen willst.
- **Nur einen Teil einer Zahl nehmen** kann [Scale](scale.md): Er teilt
  gleich wieder durch 255, da läuft nichts über.

## Siehe auch

[Divide](divide.md) · [Scale](scale.md) · [Add](add.md)
