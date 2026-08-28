# And

[Operator Reference](../index.md) · Category: **Logic**

And is the “both together” block: Its output is on exactly when **both**
inputs are on. Like a door with two locks — it only opens when both keys
are turned. Blocks like this, which turn on/off inputs into a new on/off
value, are called **logic gates** — gates for short.

## Pins (default mode “Bit”)

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I1` | Input | Bit | First condition |
| `I2` | Input | Bit | Second condition |
| `O` | Output | Bit | On when both inputs are on |
| `!O` | Output | Bit | The opposite of `O` (handy, saves a Not) |

## Try it

Switch the inputs on individually and together — only both at once turn
`O` on:

```operatorsv2
{
	"opAll": [
		{ "_#new": "And", "_id": "and1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modes (in the Properties window)

The **Mode** setting lets the gate grow:

- **Bit** (default): two inputs, one result.
- **Nibble / Byte**: four or eight inputs. With **Variant**
  “Combined” the And spans **all** inputs (on only when really all are on);
  “Channeled” turns it into independent two-input gates
  (`A1`+`B1`→`O1`, `A2`+`B2`→`O2` …).
- **Bitwise**: two **byte** inputs `A` and `B`. The And is computed for
  each of the eight bit positions individually (see
  [Bits and Bytes](../../grundlagen/bits-und-bytes.md)).

Careful: Switching modes swaps the pins — connections on pins that
disappear are cut.

## Usage ideas

- **Safety condition**: Something may only happen when several requirements
  are met at the same time — ignition key **and** brake pedal pressed.
- **Gate for signals**: Put something that keeps switching on and off on
  `I1` (for example the blinking of a Clock) and a “permission” on `I2` —
  the blinking only passes while the permission is on. Whole sections of
  a circuit can be muted this way.
- **Bit mask** (Bitwise mode): A fixed number on `B` acts like a
  stencil — only the bits of `A` where the stencil has “holes” (is on)
  come through, all others become 0. Such a stencil number is called a
  **mask**. Example: the mask 15, written `0F` in the short notation of
  the value boxes (see
  [Bits and Bytes](../../grundlagen/bits-und-bytes.md)) — only the lower
  four bits of `A` survive. Try it:

```operatorsv2
{
	"opAll": [
		{ "_#new": "And", "_id": "and2", "_x": 0, "_y": 0, "Mode": "bitwise" }
	],
	"conAll": []
}
```

Set `A` to any number and `B` to `0F` — the output keeps only the lower
four bits.

## See also

[Or](or.md) · [Xor](xor.md) · [Not](not.md) ·
[Values and Signals](../../grundlagen/werte-und-signale.md)
