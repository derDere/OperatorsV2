# Xor

[Operator Reference](../index.md) · Category: **Logic**

Xor (“exclusive or”) is the **difference detector**: Its output is on
exactly when the two inputs are **different** — one on, the other off.
If both are the same (both on or both off), it stays off. Like a
staircase light controlled by two switches, one at the top and one at
the bottom: The light is on only when the two switches are in different
positions.

“Exclusive” here means “just one of the two, never both together” —
exactly what this block checks.

## Pins (default mode “Bit”)

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I1` | Input | Bit | First value |
| `I2` | Input | Bit | Second value |
| `O` | Output | Bit | On when the inputs are **different** |
| `!O` | Output | Bit | On when the inputs are **equal** |

## Try it

```operatorsv2
{
	"opAll": [
		{ "_#new": "Xor", "_id": "xor1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modes (in the Properties window)

- **Bit** (default): two inputs.
- **Nibble / Byte**: four or eight inputs. Variant “Combined” turns it
  into a **parity checker**: on when an *odd* number of inputs is on.
  “Channeled”: independent two-input blocks.
- **Bitwise**: two bytes `A` and `B`, the Xor is computed per bit position.

## Usage ideas

**Comparing two bits for equality.** This is the classic: `!O` is on
exactly when both inputs are equal. An Xor is therefore an equality checker
(`!O`) and a difference detector (`O`) at the same time — with no extra
blocks at all.

**Comparing two bytes** (Bitwise mode): The output `O` acts as a
“difference map” showing **which** bits differ. If both numbers are equal,
`O` = 0 (`00`) and `!O` = 255 (`FF`). Set the same number twice and watch
the output:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Xor", "_id": "xor2", "_x": 0, "_y": 0, "Mode": "bitwise" }
	],
	"conAll": []
}
```

(For a single “equal/unequal” bit from two bytes there is the ready-made
[Equals](../math/equals.md) block — inside sits exactly this Xor.)

**Controlled flipping**: An Xor with a control bit on `I2` passes the value
of `I1` through while `I2` is off — and **flips it** (technically:
**inverts** it) while `I2` is on. A Not with an on/off switch. In Bitwise
mode you put a number on `B` whose switched-on bits say which bits of `A`
get flipped — such a selection number is called a **mask**.

**Arithmetic: the half adder.** Xor is the ones digit when adding two
bits, And is the **carry** — the digit you write into the next column
when adding on paper (more on that in
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
Together, Xor and And form a half adder, the
smallest calculator in the world. The two boxes on the left are the bits
A and B (each feeds the Xor and the And at the same time through a small
junction). On the right, “Xor · Output” shows the ones digit and
“And · Output” the carry — switch both bits on to see the carry:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "bitA", "_x": -180, "_y": -50 },
		{ "_#new": "Pipe 1", "_id": "bitB", "_x": -180, "_y": 50 },
		{ "_#new": "Xor", "_id": "xorSum", "_x": 20, "_y": -50 },
		{ "_#new": "And", "_id": "andCarry", "_x": 20, "_y": 50 }
	],
	"conAll": [
		{ "s": "bitA_out_OUT0", "e": "xorSum_in_I1" },
		{ "s": "bitA_out_OUT0", "e": "andCarry_in_I1" },
		{ "s": "bitB_out_OUT0", "e": "xorSum_in_I2" },
		{ "s": "bitB_out_OUT0", "e": "andCarry_in_I2" }
	]
}
```

A + B = 0, 1 or 2 — and that is exactly what the outputs show: both off = 0,
only the ones digit on = 1, only the carry on = 2. Writing carry and ones
digit next to each other, the 2 reads as the pattern `10` — two bits, read
the way [Bits and Bytes](../../grundlagen/bits-und-bytes.md) describes.

## See also

[Equals](../math/equals.md) · [And](and.md) · [Or](or.md) · [Not](not.md) ·
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)
