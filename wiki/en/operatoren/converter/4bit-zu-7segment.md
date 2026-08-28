# 4bit to 7 Segment decoder

[Operator Reference](../index.md) · Category: **Converter**

The square-looking digits on an alarm clock or a microwave are put
together from seven separate light bars that switch on and off on their
own: when all of them light up except the middle one, you see a 0; when
only the two on the right light up, a 1. Such a
[7 segment display](../display/7segment-display.md) does not understand
numbers at all — it only knows its seven bars.

This decoder is the **translator** in between: It receives a number from
0 to 15, namely as four bits with the values 1, 2, 4 and 8, and switches
on exactly the bars that form that digit. Beyond 9 there are no single
digits left, so from 10 upwards it shows the letters A, B, C, D, E and F —
A then stands for 10, F for 15. This notation with 16 digits is called hex
code (see [Bits and Bytes](../../grundlagen/bits-und-bytes.md)).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B0`…`B3` | Input | Bit | The digit as four bits (values 1, 2, 4, 8) |
| `D` | Input | Bit | The dot next to the digit — it is simply passed through |
| `S1`…`S7` | Output | Bit | The seven light bars (top, top left, top right, middle, bottom left, bottom right, bottom) |
| `D` | Output | Bit | The dot, just as it came in |

## Try it

Here the decoder hangs fully wired on a display. Compose a digit with the
bits — e.g. `B0` (1) and `B2` (4) for the 5, because 1 + 4 = 5:

```operatorsv2
{
	"opAll": [
		{ "_#new": "4bit to 7 Segment decoder", "_id": "dec1", "_x": -120, "_y": 0 },
		{ "_#new": "7 Segment Display", "_id": "seg1", "_x": 80, "_y": 0 }
	],
	"conAll": [
		{ "s": "dec1_out_S1", "e": "seg1_in_S1" },
		{ "s": "dec1_out_S2", "e": "seg1_in_S2" },
		{ "s": "dec1_out_S3", "e": "seg1_in_S3" },
		{ "s": "dec1_out_S4", "e": "seg1_in_S4" },
		{ "s": "dec1_out_S5", "e": "seg1_in_S5" },
		{ "s": "dec1_out_S6", "e": "seg1_in_S6" },
		{ "s": "dec1_out_S7", "e": "seg1_in_S7" },
		{ "s": "dec1_out_D", "e": "seg1_in_D" }
	]
}
```

## Usage ideas

- **A counter you can watch**: [Counter4](../memory/counter4.md) →
  decoder → display. The counter's four bit outputs fit exactly onto the
  four bit inputs, and the display counts along visibly.
- **Numbers with several digits**: For every digit you need one
  [Base Converter](base-converter.md), one
  [Byte to 4bit decoder](byte-zu-4bit.md), one segment decoder and one
  display. The *clock* example (📚 Examples menu in the editor)
  demonstrates this whole chain.
- **Showing a whole byte**: Two decoders and two displays show every
  number from 0 to 255 as two hex characters. Split the byte for that with
  the [Byte to 8bit decoder](byte-zu-8bit.md): the four bits with the
  small values (`B0`–`B3`, so 1, 2, 4, 8) go to the right-hand digit, the
  four with the big values (`B4`–`B7`, so 16, 32, 64, 128) go onto inputs
  `B0`–`B3` of the left-hand digit.

## See also

[7 Segment Display](../display/7segment-display.md) ·
[Base Converter](base-converter.md) · [Counter4](../memory/counter4.md)
