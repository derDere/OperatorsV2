# Vector Multiply

[Operator Reference](../index.md) · Category: **Vector**

A pair of two numbers — steps sideways and steps down — describes a way;
such a pair is called a **vector** (in full on
[Vectors](../../grundlagen/vektoren.md)).

Vector Multiply walks **the same way several times in a row**. How often
is set by the input `V`. An example: the way goes 10 to the right and 5
down. Take it three times and you end up 30 to the right and 15 down — the
same direction as before, just three times as far.

[Vector Scale](vector-scale.md) makes a way shorter; Vector Multiply makes
it longer. A number can grow past 255 while doing so — then it starts
again at 0; that is called an **overflow** (see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
So 100 times 3 gives you not 300 but 44, because after 255 the counting
begins anew.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `AX` / `AY` | Input | Byte | The way: steps to the right / downwards |
| `V` | Input | Byte | How often the way is walked |
| `CX` / `CY` | Output | Byte | The multiplied way |

## Try it

Set A small — 10 to the right and 5 down, for example — and slowly crank
up `V` until the numbers shoot past 255 and start again at 0:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Multiply", "_id": "vmult1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Wide jumps**: A small way times the number of steps gives the distance
  covered altogether. That is how points travel across the
  [Line Display](../display/line-display.md) in even jumps.
- **Laying out a grid**: Number the squares of a grid (the first, the
  second, the third …) and take that number times the size of one square —
  out comes where this square sits on the surface.
- If a way should only get a bit shorter, without a number shooting past
  255, [Vector Scale](vector-scale.md) is the safe choice.

## See also

[Vector Scale](vector-scale.md) · [Multiply](../math/multiply.md) ·
[Vector Add](vector-add.md)
