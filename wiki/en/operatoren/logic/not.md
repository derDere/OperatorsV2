# Not

[Operator Reference](../index.md) · Category: **Logic**

Not is the **flipper**: It turns an on into an off — and an off into an
on. The simplest block of all — and one of the most useful.

## Pins (default mode “Bit”)

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `A` | Input | Bit | The value that gets flipped |
| `!A` | Output | Bit | The opposite of the input |

## Try it

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modes (in the Properties window)

- **Bit** (default): one input, one output.
- **Nibble / Byte**: four or eight independent flippers in one block
  (`A1`→`!A1`, `A2`→`!A2` …) — saves space when many lines need flipping.
- **Bitwise**: one **byte** input; all eight bits are flipped at once. The
  result is called the **complement**: the number x becomes 255 − x.

## Usage ideas

- **Reversing a condition**: “door open” becomes “door closed” — often you
  need exactly the opposite of a detector.
- **Often not needed at all**: Many blocks already offer their opposite as
  a separate output (`!O`, `!Q`, `!C` …). A glance at the pins sometimes
  saves the Not.
- **“Mirroring” a number** (Bitwise mode): 255 − x in a single step. Set
  the input to 0 → output `FF` (255); to 255 → `00`. Handy for turning a
  rising ramp into a falling one:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not2", "_x": 0, "_y": 0, "Mode": "bitwise" }
	],
	"conAll": []
}
```

- **Building a blinker**: A Not whose output feeds back into its own input
  flips on every calculation step — the fastest blinking light in the
  world. A value that runs in a circle back to itself like this is called
  **feedback**. How short such a step is — it is called a **tick** — is
  covered in [Edges and Clock](../../grundlagen/flanken-und-takt.md); for
  a more leisurely pace there is the [Clock](../signal/clock.md).

## See also

[And](and.md) · [Or](or.md) · [Xor](xor.md) ·
[Clock](../signal/clock.md)
