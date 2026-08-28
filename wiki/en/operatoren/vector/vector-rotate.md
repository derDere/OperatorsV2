# Vector Rotate

[Operator Reference](../index.md) · Category: **Vector**

A pair of two numbers — steps sideways and steps down — describes a way;
such a pair is called a **vector** (in full on
[Vectors](../../grundlagen/vektoren.md)).

Vector Rotate **swings such a way around its starting point**, like the
hand of a clock with one end stuck in the middle while the other travels
around in a circle — in the same direction the clock hands go. The length
of the way stays the same, only the direction changes.

How far it swings is set by the input `V`. Once fully around is 255 steps
here. So 0 means “do not swing at all”, 64 is a quarter turn (like going
from 12 to 3), 128 a half turn (from 12 to 6) and 191 a three-quarter
turn. How far something is turned is called the **angle**. The same way
of writing an angle as a number is used by [Sinus](../math/sinus.md) and
[Cosinus](../math/cosinus.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `AX` / `AY` | Input | Byte | The way that is swung around |
| `V` | Input | Byte | How far it swings: 64 = quarter turn, 255 = once fully around |
| `CX` / `CY` | Output | Byte | The swung way |

The swinging always happens around the spot where both numbers are 0 — on
the drawing surface that is the top left corner. That corner is, so to
speak, the pin the clock hand sits on. If a number slips below 0 while
swinging, it starts again at the upper end: 2 minus 5 becomes 253 (see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).

## Try it

Set A to 100 to the right and 0 down — the arrow then points to the right,
like the hand at 3. Now turn the angle: at `V` = 64, a quarter turn, it
points downwards and out come roughly 0 to the right and 100 down:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Rotate", "_id": "vrot1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Clock hands and radar**: A way of fixed length plus an angle that
  keeps counting up (from a [Counter8](../memory/counter8.md)) — on the
  [Line Display](../display/line-display.md) a hand circles around like
  the travelling beam on a radar screen. The *draw* example in the
  editor's 📚 Examples menu shows drawing with ways in action.
- **Turning figures**: Send all corner points of a shape through the same
  rotation and the whole figure turns. To make it turn around its own
  middle rather than around the corner of the surface: take the middle
  away first with [Vector Subtract](vector-subtract.md) and add it back
  afterwards with [Vector Add](vector-add.md).
- **Running in circles**: A way of fixed length whose angle counts up step
  by step draws a circle all by itself — this single block is enough for
  that.

## See also

[Sinus](../math/sinus.md) · [Cosinus](../math/cosinus.md) ·
[Vector Add](vector-add.md) · [Line Display](../display/line-display.md)
