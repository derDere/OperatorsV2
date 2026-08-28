# Vector Subtract

[Operator Reference](../index.md) · Category: **Vector**

A pair of two numbers — steps sideways and steps down — describes a way;
such a pair is called a **vector** (in full on
[Vectors](../../grundlagen/vektoren.md)).

Vector Subtract takes two points, A and B, and gives you the way from B
to A. To do that it takes the numbers of B away from the numbers of A,
one at a time. An example: A sits at 9 to the right and 7 down, B at 4 to
the right and 2 down — so from B it is another 5 to the right and 5 down.

If more is taken away than there is, the result would be below zero — it
would be a **negative number**. But only the numbers 0 to 255 flow
through these wires, so the number starts again at the upper end: 2 minus
5 becomes 253. That is called an **overflow** (see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
On the surface it means: whoever walks out on the left comes back in on
the right.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `AX` / `AY` | Input | Byte | Point A — this is where the way leads to |
| `BX` / `BY` | Input | Byte | Point B — where the way starts; B is taken away |
| `CX` / `CY` | Output | Byte | The way from B to A: A minus B, each number on its own |

## Try it

Set two points — out comes the way that leads from B to A:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Subtract", "_id": "vsub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Finding the direction to a target**: Target minus own place gives the
  way to the target. That is the basis of everything that should follow
  somebody — a guard running after you, or a pointer that always points at
  one spot.
- **Working from the middle**: Some figures are described from their
  middle outwards (“from the middle 3 to the right, 2 down”). With Vector
  Subtract you take the middle away and learn where a point sits in
  relation to it; with [Vector Add](vector-add.md) you put it back onto the
  surface. This back and forth is needed for turning figures, for example
  (see [Vector Rotate](vector-rotate.md)).
- **How far is it still?**: The result tells you separately how far apart
  the two points are sideways and how far downwards. If you also want to
  know which side it goes to for a single number, use
  [Subtract](../math/subtract.md) for that: it switches its output `RN` on
  when the number taken away was the bigger one.

## See also

[Vector Add](vector-add.md) · [Subtract](../math/subtract.md) ·
[Line Display](../display/line-display.md)
