# Byte to 4bit decoder

[Operator Reference](../index.md) · Category: **Converter**

The small **splitter**: It takes a number and puts its **lower four
bits** onto individual lines — “lower” means: the four with the small
values 1, 2, 4 and 8. It ignores the four big ones (16, 32, 64, 128).
So it only sees the part from 0 to 15.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The number being split |
| `B0` | Output | Bit | On when there is a 1 inside the number |
| `B1` | Output | Bit | On when there is a 2 inside the number |
| `B2` | Output | Bit | On when there is a 4 inside the number |
| `B3` | Output | Bit | On when there is an 8 inside the number |

## Try it

Set a number from 0 to 15 on the left and see which bits turn on —
e.g. 9 = 8 + 1, so `B3` and `B0` turn on:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 4bit decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Feeding digit displays**: Split a digit (0–15) into four bits and
  hand them to the [4bit to 7 Segment decoder](4bit-zu-7segment.md) —
  the standard route to a visible digit. The *clock* example in the
  editor's 📚 Examples menu works exactly like this.
- **Querying single bits**: `B0` tells you, for instance, whether a
  number is even or odd — for odd numbers it is on.
- **Four indicator lights**: A number from 0 to 15 becomes four
  individual signals for lamps or logic blocks.

## See also

[Byte to 8bit decoder](byte-zu-8bit.md) ·
[4bit to byte decoder](4bit-zu-byte.md) ·
[4bit to 7 Segment decoder](4bit-zu-7segment.md)
