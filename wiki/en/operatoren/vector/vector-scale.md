# Vector Scale

[Operator Reference](../index.md) · Category: **Vector**

A pair of two numbers — steps sideways and steps down — describes a way;
such a pair is called a **vector** (in full on
[Vectors](../../grundlagen/vektoren.md)).

Vector Scale is the **knob for the length of a way**: the direction stays
exactly the same, only the distance gets shorter, as if you stopped
halfway. How much of the way is walked is set by the input `V`: 255 means
“the whole way”, 128 “roughly half of it”, 0 “not a single step”.

Each of the two numbers is taken times `V` divided by 255. Since `V` can
be 255 at most, that share is 1 at most — so the way **never gets
longer** than it was, only shorter or the same. An example: the way goes
200 to the right and 100 down. At `V` = 128 that becomes roughly 100 to
the right and 50 down. Both numbers shrink by the same amount — which is
why the way still points exactly where it did before, it is just half as
long. And because it only gets shorter, no number can grow past 255 and
flip over. The counterpart for a single number is
[Scale](../math/scale.md); a way is made longer with
[Vector Multiply](vector-multiply.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `AX` / `AY` | Input | Byte | The way: steps to the right / downwards |
| `V` | Input | Byte | How much of the way: 0 = none, 128 = roughly half, 255 = all of it |
| `CX` / `CY` | Output | Byte | The shortened way — same direction, shorter distance |

## Try it

Set A to 200 to the right and 100 down and play with `V` — at 128 you get
roughly 100 and 50, and the two numbers always keep the same relation to
each other:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Scale", "_id": "vscale1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Making figures smaller**: Send all points of a figure through the same
  Vector Scale — then the whole figure shrinks evenly. With a sliding
  control ([Slider](../user-input/slider.md)) on `V` you pull it small by
  hand and back up to full size.
- **Extending gently**: A counter ([Counter](../memory/counter8.md)) that
  slowly counts up, put on `V` — the way grows smoothly from very short to
  its full length.
- **Breathing shapes**: [Sinus](../math/sinus.md) delivers numbers that
  gently wander up and down like a wave. Put on `V`, the figure keeps
  getting smaller and bigger again — it breathes.

## See also

[Scale](../math/scale.md) · [Vector Multiply](vector-multiply.md) ·
[Vector Rotate](vector-rotate.md)
