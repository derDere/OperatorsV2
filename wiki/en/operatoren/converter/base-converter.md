# Base Converter

[Operator Reference](../index.md) · Category: **Converter**

The Base Converter answers a question every display asks: **“What are the
individual digits of this number?”** A digit display can only ever show
one single character. Anyone who wants to show 137 needs three displays —
and has to split the number into its digits 1, 3 and 7 first.

That is exactly what this block does, starting from the back: it
separates off the **last digit**. From 137, `V` gives you the 7, and `O`
passes on the number without its last digit — so 13. Send that 13 into a
second Base Converter and the next digit drops out (3), leaving 1. That
way you get one digit after another.

How many digits are used is up to you. In counting as you know it there
are ten: 0 to 9 — after the 9 you start over at the front and write
another place in front of it, so 10.

Now picture an odometer whose wheels only carry the digits 0 to 7. It
counts 5, 6, 7 — and then it is over: the wheel snaps back to 0, the next
one moves along a place, and the window reads `10`. The vehicle has
travelled as far as you would call eight. The distance is the same, only
the notation is different, because fewer digits are available. The number
of digits is called the **base**. Ten digits are called the **decimal
system**, and that is the default here.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The number whose last digit is separated off |
| `V` | Output | Byte | The last digit (with ten digits: 0–9) |
| `O` | Output | Byte | The number without its last digit — fuel for the next stage |

In the Properties window, **Base** sets how many digits are used:
*Decimal* means ten digits (0–9, the default), *Octal* means eight (0–7)
and *Binary* only two (0 and 1).

## Try it

Two blocks one after the other split your number into ones, tens and
hundreds. Set 137 on the left, for example — on the right appear, top to
bottom, the ones (7), the tens (3) and the hundreds (1):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Base Converter", "_id": "conv1", "_x": -100, "_y": 0 },
		{ "_#new": "Base Converter", "_id": "conv2", "_x": 100, "_y": 60 }
	],
	"conAll": [
		{ "s": "conv1_out_O", "e": "conv2_in_B" }
	]
}
```

The boxes write their values as **hex code**: a shorthand with 16 digits
where, after the 9, it continues with A, B, C, D, E and F — A stands for
10, F for 15. That way every number up to 255 fits into two characters,
and 255 is written as `FF`. For the digits 0 to 9 that come out here,
both notations look the same.

## Usage ideas

- **Making numbers visible**: Route every digit `V` through a
  [Byte to 4bit decoder](byte-zu-4bit.md) and a
  [4bit to 7 Segment decoder](4bit-zu-7segment.md) onto a
  [digit display](../display/7segment-display.md) — exactly how the
  *clock* example (📚 Examples menu in the editor) shows hours and minutes
  with two digits each.
- **Numbers as text**: Every character on a screen has a fixed number.
  The digit `0` has the number 48, the `1` has 49, and so it continues.
  So add 48 with [Add](../math/add.md) and your digit turns into its
  character — which you can then write onto the
  [Terminal Display](../display/terminal-display.md).
- **Counting with only two digits**: Set Base to *Binary* and build a
  chain. Then only 0 and 1 are left, and the blocks deliver the single
  bits of your number one after another.

## See also

[Divide](../math/divide.md) (the dividing) and
[Modulo](../math/modulo.md) (the remainder left over from dividing) — the
two computations that sit together in this one block ·
[4bit to 7 Segment decoder](4bit-zu-7segment.md)
