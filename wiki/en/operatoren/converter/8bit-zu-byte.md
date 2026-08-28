# 8bit to byte decoder

[Operator Reference](../index.md) · Category: **Converter**

The big **collector**: Eight individual bit lines are assembled into a
whole byte (0–255). Each line counts a fixed number, and each one is
worth twice as much as the one before: 1, 2, 4, 8, 16, 32, 64, 128.
Everything that is on gets added up. Explained in detail in
[Bits and Bytes](../../grundlagen/bits-und-bytes.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B0`…`B7` | Input | Bit | The eight bits with values 1, 2, 4, 8, 16, 32, 64, 128 |
| `B` | Output | Byte | All switched-on values added up |

## Try it

Build numbers from switches — for 100 you need `B6` (64) + `B5` (32) +
`B2` (4), because 64 + 32 + 4 = 100:

```operatorsv2
{
	"opAll": [
		{ "_#new": "8bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Eight switches = one input dial**: Set a complete byte by hand —
  like on very old computers that had a row of flip switches on the
  front.
- **Undoing bit tinkering**: Whoever split a byte into eight lines with
  the [Byte to 8bit decoder](byte-zu-8bit.md) and changed something
  along the way (swapped lines, switched some off) puts it back
  together into one byte here. Connect the lines in reversed order and
  you get a byte mirror, for example.
- **Bundling eight reports**: Eight independent yes/no reports (door
  open, motor running, …) fit together into a single report byte — for
  instance to ship it via
  [Network Sender](../network/network-sender.md).

## See also

[Byte to 8bit decoder](byte-zu-8bit.md) ·
[4bit to byte decoder](4bit-zu-byte.md) ·
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)
