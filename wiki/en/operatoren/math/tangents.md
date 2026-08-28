# Tangents

[Operator Reference](../index.md) · Category: **Math**

Tangents answers a single question: **How steep is it?** Picture a ramp: If
you walk a bit forward, you also rise a bit upward. How much upward for how
much forward — that is the **slope**. At the input `B1` you give the tilt
as a place on the lap (just like with [Sinus](sinus.md): 0 is the start,
255 a full lap), and the output `T` gives you the slope. The technical name
for the link between tilt and slope is **tangent** — which is where the
block gets its name.

There is a catch, though. The closer the line comes to standing upright,
the further the slope shoots up: you barely move forward any more, but you
rise a long way, and the number gets huge — a byte cannot hold that. So the
block always divides the smaller of the two distances by the bigger one,
which keeps the result between 0 and 255. Whether it had to turn the
calculation around to do so, it reports on the `CO` output. The
turned-around value has a name of its own: **cotangent**.

Here is how to read `T`: 0 means “no tilt at all” — the line lies flat or
stands upright. Values close to 255 mean “exactly halfway between the two”
(45°, slanting like the line from one corner of a square to the opposite
one). Which of the two ends you are at is told by `CO`: off when the line
lies rather flat, on when it stands rather steep.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The tilt as a place on the lap: 0 = start, 255 = once all the way round |
| `T` | Output | Byte | How steep it is: 0 = flat or upright, at most 253 = exactly in between |
| `CO` | Output | Bit | Off while the line lies rather flat; on as soon as it stands rather steep (that is the cotangent then) |
| `TN` | Output | Bit | On when the line tilts the other way round: it falls where it otherwise rises |

## Try it

An eighth of a lap (45°) works out at 31.875, so between 31 and 32 — and
that is where `CO` switches over. At 32 `CO` is already on, and `T` shows
253, its highest value. Turn below that: the line gets flatter, `T` sinks
towards 0. Turn above it: the line straightens up, and `T` sinks towards 0
again:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tangents", "_id": "tan1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Ramps and slants**: A tilt becomes a number you can compute with — for
  instance to draw lines at a given slant on the
  [Line Display](../display/line-display.md).
- For waves and circular motion, [Sinus](sinus.md) and
  [Cosinus](cosinus.md) are the handier tools — Tangents is the specialist
  for “how steep?”.

## See also

[Sinus](sinus.md) · [Cosinus](cosinus.md) ·
[Vectors](../../grundlagen/vektoren.md)
