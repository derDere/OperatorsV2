# Vector Modulo

[Operator Reference](../index.md) · Category: **Vector**

A pair of two numbers — steps sideways and steps down — describes a way;
such a pair is called a **vector** (in full on
[Vectors](../../grundlagen/vektoren.md)).

Vector Modulo works out the remainder of a division, separately for both
numbers: `CX` is the remainder of `AX` divided by `BX`, `CY` the
remainder of `AY` divided by `BY`.

The handy part: a remainder can never get as big as the number you divide
by. Divide by 50 every time and only numbers from 0 to 49 come out — at 50
the result jumps back to 0, at 51 to 1, and round it goes. That keeps a
point inside a field no matter how far it walks. The plain
[Modulo](../math/modulo.md) does this for a single number; this block
handles both at once.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `AX` / `AY` | Input | Byte | The two numbers that are divided |
| `BX` / `BY` | Input | Byte | What they are divided by, one per number (0 gives 0) |
| `CX` / `CY` | Output | Byte | What is left over: the remainder per number |

## Try it

Set `BX` and `BY` to 50, for example, and slowly crank up A — the result
always stays below 50 and jumps back to 0 at 50:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Modulo", "_id": "vmod1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Keeping points on the playing field**: Take a place that keeps growing
  and divide it by the size of the playing field — whoever walks out on
  the right comes back in on the left. Many old arcade games do it that
  way: the spaceship disappears at the right edge and reappears at the
  left one.
- **Patterns and tiles**: Picture the surface as a tiled floor — lots of
  equally sized tiles side by side. The place divided by the tile size
  tells you where inside a tile you currently are. That is the basis for
  patterns that repeat over and over on the
  [Line Display](../display/line-display.md).
- **Two in one go**: For the sideways and the downwards number separately
  you would need two [Modulo](../math/modulo.md) blocks — this single one
  handles both.

## See also

[Modulo](../math/modulo.md) · [Vector Add](vector-add.md) ·
[Line Display](../display/line-display.md)
