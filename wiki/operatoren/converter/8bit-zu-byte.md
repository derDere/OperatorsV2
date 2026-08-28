# 8bit to byte decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der große **Sammler**: Acht einzelne Bit-Leitungen werden zu einem
vollständigen Byte (0–255) zusammengesetzt. Jeder Eingang steuert seinen
festen Zahlenwert bei (1, 2, 4, 8, 16, 32, 64, 128) — die eingeschalteten
Werte werden addiert. Ausführlich erklärt in
[Bits und Bytes](../../grundlagen/bits-und-bytes.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B0`…`B7` | Eingang | Bit | Die acht Bits mit den Werten 1, 2, 4, 8, 16, 32, 64, 128 |
| `B` | Ausgang | Byte | Die Summe der eingeschalteten Bits |

## Ausprobieren

Baue Zahlen aus Schaltern — für 100 brauchst du z. B. `B6` (64) + `B5`
(32) + `B2` (4):

```operatorsv2
{
	"opAll": [
		{ "_#new": "8bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Acht Schalter = ein Eingaberegler**: Ein komplettes Byte von Hand
  setzen, klassisch wie an alten Rechner-Frontplatten.
- **Bit-Bastelei rückgängig machen**: Wer ein Byte mit dem
  [Byte to 8bit decoder](byte-zu-8bit.md) zerlegt und einzelne Leitungen
  manipuliert hat (tauschen, spiegeln, maskieren), setzt es hier wieder
  zusammen. Bits vertauscht anschließen ergibt z. B. einen Byte-Spiegler.
- **Statuswort bauen**: Acht unabhängige Meldungen (Tür offen, Motor an, …)
  in einem einzigen Byte bündeln — etwa um es per
  [Network Sender](../network/network-sender.md) zu verschicken.

## Siehe auch

[Byte to 8bit decoder](byte-zu-8bit.md) ·
[4bit to byte decoder](4bit-zu-byte.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
