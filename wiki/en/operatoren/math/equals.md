# Equals

[Operator Reference](../index.md) · Category: **Math**

Equals is the **equality checker**: It compares `B1` and `B2`. If both
numbers are the same, the output `O` turns on; if they differ, `!O` turns
on instead.

On top, the output `B` shows you exactly where two unequal numbers
differ. Think of the eight switches that make up a number (see
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)): Wherever `B1`
and `B2` have a different switch, the matching bit lights up in `B`.
If both numbers are equal, `B` stays completely off (`00`). This
bit-by-bit comparison is called a bitwise [Xor](../logic/xor.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | First number |
| `B2` | Input | Byte | Second number |
| `B` | Output | Byte | Shows which bit positions the two numbers differ in (`00` = both equal) |
| `O` | Output | Bit | On when both numbers are equal |
| `!O` | Output | Bit | On when they differ |

## Try it

Set both sliders to the same number — `O` turns on and `B` becomes
`00`. Then nudge one slider just a little and watch which bits light
up in `B`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Equals", "_id": "eq1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Detecting a target value**: A fixed comparison value via
  [Value](../fixed-input/value.md) on `B2` — and `O` reports “the
  counter reached 100” or “the typed character is a space”. Whether the
  Enter key was pressed on the
  [Text Input](../user-input/text-input.md) you do not have to check
  this way: it has its own output `N` for that.
- **Code lock**: Entered number equals the secret number? Then `O`
  turns on — for instance an [RS FlipFlop](../logic/rs-flipflop.md)
  uses that to light up the “door open” lamp.
- **Change watchdog**: Compare a value with a stored copy of itself
  ([Memory (1 byte)](../memory/memory-1byte.md)) — `!O` tells you that
  something has changed since then.
- **Greater or smaller** is not something Equals can tell you — only
  “equal” or “not equal”. For “greater than”, use the
  [Subtract](subtract.md) with its `RN` output.

## See also

[Subtract](subtract.md) · [Xor](../logic/xor.md)
