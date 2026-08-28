# 4bit to byte decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Dieser Baustein ist der **Sammler**: Er nimmt vier einzelne Bit-Leitungen
und setzt daraus eine Zahl von 0 bis 15 zusammen. Jeder Eingang hat dabei
seinen festen Zahlenwert — das Prinzip erklärt
[Bits und Bytes](../../grundlagen/bits-und-bytes.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B0` | Eingang | Bit | Zählt 1 |
| `B1` | Eingang | Bit | Zählt 2 |
| `B2` | Eingang | Bit | Zählt 4 |
| `B3` | Eingang | Bit | Zählt 8 |
| `B` | Ausgang | Byte | Die Summe der eingeschalteten Bits (0–15) |

## Ausprobieren

Schalte Kombinationen an — z. B. `B0` und `B2` für 1 + 4 = 5:

```operatorsv2
{
	"opAll": [
		{ "_#new": "4bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Schalterbank → Zahl**: Vier Schalter ergeben zusammen eine
  einstellbare Zahl 0–15 — etwa als Sollwert oder Kanalwahl.
- **Counter4 anschließen**: Die Bit-Ausgänge des
  [Counter4](../memory/counter4.md) werden hier wieder zur Zahl — z. B.
  für einen Vergleich per [Equals](../math/equals.md).
- **Halbes Byte (Nibble)**: Eine Hex-Ziffer ist genau 4 Bit — dieser
  Baustein baut also die „rechte Hälfte" eines Hex-Codes. Für alle acht
  Bits gibt es den [8bit to byte decoder](8bit-zu-byte.md).

## Siehe auch

[8bit to byte decoder](8bit-zu-byte.md) ·
[Byte to 4bit decoder](byte-zu-4bit.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
