# 4bit to byte decoder

[Operator Reference](../index.md) · Category: **Converter**

This block is the **collector**: It takes four individual bit lines and
builds a number from 0 to 15 out of them. Each line counts a fixed
number — the first one counts 1, and after that it always doubles: 2, 4,
8. Everything that is on gets added up. Why this works so well is
explained in [Bits and Bytes](../../grundlagen/bits-und-bytes.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B0` | Input | Bit | Counts 1 |
| `B1` | Input | Bit | Counts 2 |
| `B2` | Input | Bit | Counts 4 |
| `B3` | Input | Bit | Counts 8 |
| `B` | Output | Byte | All switched-on values added up (0–15) |

## Try it

Switch on a few inputs — e.g. `B0` and `B2`: that makes 1 + 4 = 5:

```operatorsv2
{
	"opAll": [
		{ "_#new": "4bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Switch bank → number**: Four switches together give you a number
  from 0 to 15 that is easy to set — for example as a target number for
  a comparison or a guessing game.
- **Connecting a Counter4**: The bit outputs of the
  [Counter4](../memory/counter4.md) become a number again here — e.g. to
  compare it with a target number via [Equals](../math/equals.md).
- **Half a byte (nibble)**: Four bits are half a byte — that is called a
  **nibble**. The editor writes byte values with two characters in
  **hex code** (16 digits: 0–9 and A–F), and each of those characters
  stands for four bits. This block builds the right half of it; for all
  eight bits there is the [8bit to byte decoder](8bit-zu-byte.md).

## See also

[8bit to byte decoder](8bit-zu-byte.md) ·
[Byte to 4bit decoder](byte-zu-4bit.md) ·
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)
