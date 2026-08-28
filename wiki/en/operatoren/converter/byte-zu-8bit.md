# Byte to 8bit decoder

[Operator Reference](../index.md) · Category: **Converter**

The big **splitter**: It takes a number from 0 to 255 and puts it onto
eight individual lines, one per bit. Each line stands for a fixed number,
and each one is worth twice as much as the one before: 1, 2, 4, 8, 16,
32, 64, 128. The block works out which of these numbers add up to your
number and switches exactly those lines on. For 100 that is 64 + 32 + 4 —
so `B6`, `B5` and `B2` turn on and all the others stay off. One single
number becomes eight separate on/off signals. The way back is handled by
the [8bit to byte decoder](8bit-zu-byte.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The number being split |
| `B0`…`B7` | Output | Bit | The eight bits with values 1, 2, 4, 8, 16, 32, 64, 128 |

## Try it

Set a number and watch which lines turn on — for 37, for example, `B5`
(32), `B2` (4) and `B0` (1), because 32 + 4 + 1 = 37:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 8bit decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **A number as a string of lights**: Eight [lamps](../display/lamp.md) on
  the outputs — then you can watch the number while it is being computed.
  A clock made purely of on/off lights works the same way; the numbers for
  hour, minute and second come from the [Time](../signal/time.md) block.
- **Tinkering with single bits**: Swap the lines along the way, turn them
  around or combine them with logic blocks, then gather them again with
  the [8bit to byte decoder](8bit-zu-byte.md) — that changes a number by
  re-plugging instead of computing.
- **Unpacking a bundled report**: One byte can carry eight yes/no reports
  together (door open, motor running, …). Here they become separate again
  — handy for a byte that has just arrived at the
  [Network Receiver](../network/network-receiver.md).

## See also

[8bit to byte decoder](8bit-zu-byte.md) ·
[Byte to 4bit decoder](byte-zu-4bit.md) ·
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)
