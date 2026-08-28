# Or

[Operator Reference](../index.md) · Category: **Logic**

Or is the “or” block: Its output is on as soon as **at least one** of
the inputs is on. Like a hallway with two light switches — no matter
which one is pressed, the light turns on.

## Pins (default mode “Bit”)

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I1` | Input | Bit | First source |
| `I2` | Input | Bit | Second source |
| `O` | Output | Bit | On as soon as at least one input is on |
| `!O` | Output | Bit | The opposite of `O` — on only when **both** are off |

## Try it

```operatorsv2
{
	"opAll": [
		{ "_#new": "Or", "_id": "or1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modes (in the Properties window)

- **Bit** (default): two inputs.
- **Nibble / Byte**: four or eight inputs. Variant “Combined”: on as soon
  as any input is on; “Channeled”: independent two-input blocks.
- **Bitwise**: two bytes `A` and `B`, the Or is computed per bit
  position (see [Bits and Bytes](../../grundlagen/bits-und-bytes.md)) —
  the bits of both numbers are **merged**.

## Usage ideas

- **Collector alarm**: Several triggers (window 1 open, window 2 open …)
  feed one shared alarm.
- **Neither-nor detector**: The `!O` output is already a ready-made
  “neither one nor the other” — called a **NOR** in technical terms. It
  is on only when **nothing at all** is on. Handy as an “all quiet”
  indicator:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Or", "_id": "or2", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

  As long as both inputs are off, `!O` is on — switch one on and the
  “quiet” is over.

- **Setting bits** (Bitwise mode): With a fixed number on `B` you force
  certain bits of `A` on without touching the rest — the counterpart to
  the stencil number (mask) from [And](and.md).
- By the way: If several lines lead to **the same input**, they behave
  like an Or on their own (see
  [Values and Signals](../../grundlagen/werte-und-signale.md)) — an
  explicit Or makes that intention visible and keeps the circuit
  readable.

## See also

[And](and.md) · [Xor](xor.md) · [Not](not.md)
