# Vectors

Back to the [start page](../index.md).

A single number is enough for many things: brightness, volume, a counter
reading. But as soon as it is about a **spot on a surface**, two numbers are
needed — one for sideways, one for up and down. This page shows how such a
pair of numbers is meant and what you do with it.

## Two numbers, one way

On a treasure map the way to the treasure is a short instruction: “6 steps
to the right, 4 steps down.” Two numbers are enough and anybody finds the
spot. Such a pair of numbers is called a **vector**.

The first number is always called `X` here and counts **to the right**. The
second one is called `Y` and counts **downwards**. Counting starts at the
**top left corner** of the surface: there both numbers are 0, and the
larger `Y` grows, the further down the spot lies.

Together the two numbers describe a way — and because it always starts at
the same corner, that same way also describes a spot on the surface. Both
are the same pair of numbers, only read differently.

Each of the two numbers is an ordinary number from 0 to 255 (see
[Bits and Bytes](bits-und-bytes.md)) — and that is exactly the size of the
drawing surface of the
[Line Display](../operatoren/display/line-display.md).

## Joining ways together

Two ways can be joined one after the other: first walk the one, then from
there the other. To do that you add the two `X` numbers together and the
two `Y` numbers together. An example: 3 to the right and 2 down, then 1 to
the right and 4 down — that makes 4 to the right and 6 down. That is
exactly what [Vector Add](../operatoren/vector/vector-add.md) does.

This is how things are moved: the place where something currently is, plus
the way it travels per step, gives the next place.

## Lengthening and shortening

You can also walk the same way only halfway, or stretch it. For that
**both** numbers are changed by the same amount — then the way still points
exactly where it did before, it is only shorter or longer. Change just one
of the two numbers and the direction changes too.
[Vector Scale](../operatoren/vector/vector-scale.md) is the control for
that.

## Turning and angles

Picture the hand of a clock: one end is fixed, the other travels in a
circle. In the same way a way can be swung around its starting point — the
length stays, only the direction changes. How far something is turned is
called the **angle**.

Here the angle is given as a number from 0 to 255: one full turn is **255
steps**. So:

| Angle | Turn | Hand points at |
| --- | --- | --- |
| 0 | none at all | 12 |
| 64 | a quarter turn | 3 |
| 128 | half a turn | 6 |
| 191 | three quarters of a turn | 9 |

The turning is done by
[Vector Rotate](../operatoren/vector/vector-rotate.md). The same way of
writing down an angle is used by
[Sinus](../operatoren/math/sinus.md) and
[Cosinus](../operatoren/math/cosinus.md) too.

## Try it

Vector Add joins two ways together: `AX`/`AY` is the first one, `BX`/`BY`
the second, and `CX`/`CY` shows where you end up. Set A to 100 to the right
and 100 down. Then turn `BX` — the point travels to the right. Turn `BY` —
it travels downwards:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Add", "_id": "vadd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Read on

- [Vector Add](../operatoren/vector/vector-add.md) — the block from the
  demo
- [Vector Rotate](../operatoren/vector/vector-rotate.md) — swinging and
  angles
- [Line Display](../operatoren/display/line-display.md) — the surface where
  ways become visible
