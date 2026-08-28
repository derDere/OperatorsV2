# Vector Add

[Operator Reference](../index.md) · Category: **Vector**

A pair of two numbers — `X` for the steps sideways, `Y` for the steps
down — describes a way from one point to the next; such a pair is called
a **vector** (in full on [Vectors](../../grundlagen/vektoren.md)).

Vector Add joins two such ways together: first walk the way A, then from
there the way B. To do that the block adds the two sideways numbers
together and the two downwards numbers together. An example: 3 to the
right and 2 down, then another 1 to the right and 4 down — that makes 4
to the right and 6 down altogether.

Each of these numbers is a byte, so it can be 0 to 255 (see
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)) — exactly the size of
the drawing surface of the [Line Display](../display/line-display.md). If a
number grows past 255 it starts again at 0; that is called an
**overflow** (see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
On the surface it means: whoever walks out on the right comes back in on
the left.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `AX` / `AY` | Input | Byte | Way A: steps to the right / downwards |
| `BX` / `BY` | Input | Byte | Way B: the way joined onto A |
| `CX` / `CY` | Output | Byte | Where you end up — A and B added together |

## Try it

Set the two ways — for example A to 100 to the right and 100 down, B to 20
to the right and 0 down. The result moves 20 to the right and thus sits at
120 and 100:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Add", "_id": "vadd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Shifting figures**: A stored shape is nothing but a list of points —
  from a [Stack Input](../fixed-input/stack-input.md), for example. Join
  the same extra way onto every one of those points and the
  [Line Display](../display/line-display.md) draws the same figure
  somewhere else. Two sliding controls
  ([Slider](../user-input/slider.md)) on `BX`/`BY` make it freely movable.
- **Motion step by step**: The place where something currently is, plus
  the way it travels per step, gives the next place. Let a memory
  ([Memory](../memory/memory-1byte.md)) remember the result and send it
  back to the input, and a point travels across the surface on its own.

## See also

[Vector Subtract](vector-subtract.md) · [Vector Rotate](vector-rotate.md) ·
[Line Display](../display/line-display.md)
