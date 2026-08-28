# 8bit to byte decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der große **Sammler**: Acht einzelne Bit-Leitungen werden zu einem ganzen
Byte (0–255) zusammengesetzt. Jede Leitung zählt eine feste Zahl, und
jede ist doppelt so viel wert wie die davor: 1, 2, 4, 8, 16, 32, 64, 128.
Alles, was an ist, wird zusammengezählt. Ausführlich erklärt in
[Bits und Bytes](../../grundlagen/bits-und-bytes.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B0`…`B7` | Eingang | Bit | Die acht Bits mit den Werten 1, 2, 4, 8, 16, 32, 64, 128 |
| `B` | Ausgang | Byte | Alle eingeschalteten Werte zusammengezählt |

## Ausprobieren

Baue Zahlen aus Schaltern — für 100 brauchst du z. B. `B6` (64) + `B5`
(32) + `B2` (4), denn 64 + 32 + 4 = 100:

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
  setzen — wie an ganz alten Computern, die vorne eine Reihe
  Kippschalter hatten.
- **Bit-Bastelei rückgängig machen**: Wer ein Byte mit dem
  [Byte to 8bit decoder](byte-zu-8bit.md) in acht Leitungen zerlegt und
  unterwegs etwas verändert hat (Leitungen vertauscht, einzelne
  ausgeknipst), setzt es hier wieder zu einem Byte zusammen. Schließt du
  die Leitungen in umgekehrter Reihenfolge an, entsteht z. B. ein
  Byte-Spiegler.
- **Acht Meldungen bündeln**: Acht unabhängige Ja/Nein-Meldungen (Tür
  offen, Motor an, …) passen zusammen in ein einziges Melde-Byte — etwa
  um es per [Network Sender](../network/network-sender.md) zu
  verschicken.

## Siehe auch

[Byte to 8bit decoder](byte-zu-8bit.md) ·
[4bit to byte decoder](4bit-zu-byte.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
