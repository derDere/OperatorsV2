# Select

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Select ist die **Datenweiche**: Vier Byte-Kanäle liegen an, und je ein
„Enable"-Bit pro Kanal bestimmt, wessen Zahl zum Ausgang durchgestellt
wird. Wie ein Mischpult mit vier Stummschalt-Tasten.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `E1`…`E4` | Eingang | Bit | Freigabe für Kanal 1…4 |
| `B1`…`B4` | Eingang | Byte | Die Zahl von Kanal 1…4 |
| `B` | Ausgang | Byte | Die Zahl des freigegebenen Kanals (0, wenn keiner frei ist) |
| `E` | Ausgang | Bit | An, solange mindestens ein Kanal freigegeben ist |

Sind **mehrere** Kanäle gleichzeitig freigegeben, überlagern sich ihre
Zahlen bitweise per Oder (siehe
[Werte und Signale](../../grundlagen/werte-und-signale.md)) — sauber
getrennte Freigaben sind also die Regel.

## Ausprobieren

Stelle auf `B1` und `B2` zwei verschiedene Zahlen ein und schalte dann
wechselweise `E1` oder `E2` an — der Ausgang folgt dem freigegebenen Kanal:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Select", "_id": "sel1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Umschalten zwischen Quellen**: Handbetrieb oder Automatik? Zwei
  Rechenwege, einer soll gelten? Die Freigabe-Bits entscheiden, welche
  Zahl weiterfließt.
- **Schrittketten**: Die Zustands-Bits einer Steuerung (z. B. aus
  [FlipFlops](rs-flipflop.md) oder einem dekodierten
  [Counter](../memory/counter4.md)) wählen je Schritt einen anderen
  Sollwert aus.
- **Busse bauen**: Mehrere Selects können auf dieselbe Ausgangsleitung
  speisen — dank `E` weiß man immer, ob gerade überhaupt jemand sendet.

## Siehe auch

[And](and.md) (Tor für einzelne Bits) ·
[Register](../memory/register.md) (Auswahl per Adresse statt per Bit)
