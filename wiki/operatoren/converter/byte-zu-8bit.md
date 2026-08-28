# Byte to 8bit decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der große **Zerleger**: Er legt alle acht Bits einer Zahl auf einzelne
Leitungen — das genaue Gegenstück zum
[8bit to byte decoder](8bit-zu-byte.md). Aus einer kompakten Zahl werden
acht unabhängige an/aus-Signale.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, die zerlegt wird |
| `B0`…`B7` | Ausgang | Bit | Die acht Bits mit den Werten 1, 2, 4, 8, 16, 32, 64, 128 |

## Ausprobieren

Stelle eine Zahl ein und lies ihr Bitmuster ab — z. B. 100 = 64 + 32 + 4:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 8bit decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Binär-Anzeige**: Acht [Lampen](../display/lamp.md) an die Ausgänge —
  fertig ist die klassische Bitmuster-Anzeige, z. B. für eine Binäruhr
  (Zeit-Bytes liefert der [Time](../signal/time.md)-Baustein).
- **Bit-Chirurgie**: Einzelne Leitungen unterwegs vertauschen, spiegeln
  oder mit Logik-Gattern verrechnen und danach mit dem
  [8bit to byte decoder](8bit-zu-byte.md) wieder einsammeln — so lassen
  sich beliebige Bit-Tricks stecken statt rechnen.
- **Statuswort auspacken**: Ein empfangenes Byte (etwa vom
  [Network Receiver](../network/network-receiver.md)) in seine acht
  Einzelmeldungen auffächern.

## Siehe auch

[8bit to byte decoder](8bit-zu-byte.md) ·
[Byte to 4bit decoder](byte-zu-4bit.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
