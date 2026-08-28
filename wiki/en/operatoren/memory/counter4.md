# Counter4

[Operator Reference](../index.md) · Category: **Memory**

Counter4 is the little brother of [Counter8](counter8.md): it only counts
from 0 to 15 — but it speaks **bit by bit**. It shows its count through
four individual bit outputs (`B0`…`B3`), and loading works through four
individual bits as well. That fits blocks working on single lines, such
as the [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md).

Counting works as on the Counter8, only at the moment a count input flips
from off to on — that is the **rising edge**
([Edges and Clock](../../grundlagen/flanken-und-takt.md)). The limits are
the same too, just already at 15: past 15 the count starts over at 0
(**overflow**, reported on `O`), below 0 it jumps to 15 (**underflow**,
reported on `U`) — see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I` | Input | Bit | Counts up by one (+1) on a rising edge |
| `D` | Input | Bit | Counts down by one (−1) on a rising edge |
| `R` | Input | Bit | Reset: holds the count at 0 while this input is on |
| `B0`…`B3` | Input | Bit | The four bits of the start value for loading (the bits count 1, 2, 4, 8) |
| `L` | Input | Bit | Takes over the four bits from `B0`…`B3` as the new count on a rising edge |
| `U` | Output | Bit | Flashes on once when counting below 0 (underflow, count wraps to 15) |
| `B0`…`B3` | Output | Bit | The count as four individual bits |
| `O` | Output | Bit | Flashes on once when counting above 15 (overflow, count wraps to 0) |

## Try it

Count up with `I` and read the count on the four bit outputs — how the
adding-up works is shown in
[Bits and Bytes](../../grundlagen/bits-und-bytes.md):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Counter4", "_id": "cnt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Driving a digit display**: `B0`…`B3` plug straight into the
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) —
  counter, decoder, [display](../display/7segment-display.md), and the
  visible counting mechanism is done.
- **Step-by-step sequences**: 16 steps are enough for a traffic light or
  a little light show. With [And](../logic/and.md) and
  [Not](../logic/not.md) you combine the four bit outputs so a signal
  turns on at one particular number — “we are currently at step 5”.
- **Chaining two counters**: The overflow output `O` drives the next
  Counter4 — together they count like a Counter8 from 0 to 255, just as
  two separate 4-bit digits. That fits displays showing numbers as a
  two-digit hex code (see
  [Bits and Bytes](../../grundlagen/bits-und-bytes.md)), since one hex
  digit is exactly 4 bits wide.

## See also

[Counter8](counter8.md) ·
[4bit to byte decoder](../converter/4bit-zu-byte.md) ·
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md)
