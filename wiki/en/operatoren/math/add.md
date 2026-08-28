# Add

[Operator Reference](../index.md) · Category: **Math**

Add is the **plus sign**: It computes `B1 + B2`.

The wires here only carry the numbers 0 to 255 (see
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)). If the result gets
bigger, `R` puts out only the part that still fits, and `O` counts how
many times it went past 255 — that is called the **overflow** (see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | First number |
| `B2` | Input | Byte | Second number |
| `R` | Output | Byte | The result without the part that overflowed |
| `RN` | Output | Bit | On when the result would be below zero — never when adding |
| `O` | Output | Byte | The overflow: how many times the result went past 255 |
| `ON` | Output | Bit | On when the overflow would be below zero as well |

## Try it

Set two numbers. As long as the result stays below 256, `R` shows it
directly. Go beyond that (e.g. 200 + 100): `O` jumps to 1 and `R` shows
what is left over:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Add", "_id": "add1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Shifting values**: A fixed number via
  [Value](../fixed-input/value.md) on `B2` turns Add into an
  “always 1 more” block (or 2 more, 5 more …) — for instance to turn
  the numbers 0 to 5 into the numbers 1 to 6 (keyword dice, see
  [Random](random.md)).
- **Multi-digit arithmetic**: The overflow `O` is the little number you
  carry over when doing written addition by hand — it is also called a
  **carry**. It can flow into the next Add block. This is how arithmetic
  units are built that count far beyond 255.
- **Running totals**: Wired in a loop together with
  [Memory (1 byte)](../memory/memory-1byte.md) (memory → `B1`, result
  back into the memory), the circuit adds a new number on top every
  time it is triggered.

## See also

[Subtract](subtract.md) · [Multiply](multiply.md) ·
[Counter8](../memory/counter8.md) (ready-made +1/−1)
