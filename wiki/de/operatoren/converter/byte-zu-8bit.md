# Byte to 8bit decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der große **Zerleger**: Er nimmt eine Zahl von 0 bis 255 und legt sie auf
acht einzelne Leitungen, eine je Bit. Jede Leitung steht für eine feste
Zahl, und jede ist doppelt so viel wert wie die davor: 1, 2, 4, 8, 16,
32, 64, 128. Der Baustein sucht heraus, welche dieser Zahlen zusammen
deine Zahl ergeben, und schaltet genau die Leitungen an. Bei 100 sind das
64 + 32 + 4 — es gehen also `B6`, `B5` und `B2` an, alle anderen bleiben
aus. Aus einer einzigen Zahl werden so acht getrennte An/Aus-Signale. Den
Weg zurück geht der [8bit to byte decoder](8bit-zu-byte.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, die zerlegt wird |
| `B0`…`B7` | Ausgang | Bit | Die acht Bits mit den Werten 1, 2, 4, 8, 16, 32, 64, 128 |

## Ausprobieren

Stelle eine Zahl ein und sieh zu, welche Leitungen angehen — bei 37 zum
Beispiel `B5` (32), `B2` (4) und `B0` (1), denn 32 + 4 + 1 = 37:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 8bit decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zahl als Lichterkette**: Acht [Lampen](../display/lamp.md) an die
  Ausgänge — dann kannst du der Zahl beim Rechnen zusehen. Eine Uhr aus
  lauter An/Aus-Lichtern baust du genauso; die Zahlen für Stunde, Minute
  und Sekunde liefert der [Time](../signal/time.md)-Baustein.
- **An einzelnen Bits schrauben**: Die Leitungen unterwegs vertauschen,
  umdrehen oder mit Logik-Bausteinen verrechnen und danach mit dem
  [8bit to byte decoder](8bit-zu-byte.md) wieder einsammeln — so änderst
  du eine Zahl durch Umstecken statt durch Rechnen.
- **Sammelmeldung auspacken**: In einem Byte können acht Ja/Nein-Meldungen
  gemeinsam reisen (Tür offen, Motor an, …). Hier werden sie wieder
  einzeln — praktisch für ein Byte, das gerade beim
  [Network Receiver](../network/network-receiver.md) angekommen ist.

## Siehe auch

[8bit to byte decoder](8bit-zu-byte.md) ·
[Byte to 4bit decoder](byte-zu-4bit.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
