# Cosinus

[Operator Reference](../index.md) · Category: **Math**

Cosinus is the twin of [Sinus](sinus.md): the same gentle up and down in
the same rhythm, only a quarter lap earlier. While Sinus starts in the
middle and only slowly swings out, Cosinus is already fully out at the
start and comes back towards the middle.

The input `B1` is again the **place on the lap**: 0 is the start, 64 a
quarter lap, 128 half a lap, 192 three quarters, and at 255 one full lap is
done. Why a lap has 255 steps here and what an angle is, the
[Sinus](sinus.md) page explains.

The outputs read just the same way: `R` tells you how far the wave is from
the middle (0 = middle, 255 = fully out), and `RN` tells you which side of
the middle it is on right now.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The place on the lap: 0 = start, 255 = once all the way round |
| `R` | Output | Byte | How far the wave is from the middle (0 = middle, 255 = fully out) |
| `RN` | Output | Bit | On while the wave runs below the middle |

A few places to set up and compare:

| `B1` | corresponds to | `R` | `RN` |
| --- | --- | --- | --- |
| 0 | 0° — start | 255 | off |
| 64 | 90° — quarter lap | ≈ 0 | flips here |
| 128 | 180° — half a lap | 255 | on |
| 192 | 270° — three quarters | ≈ 0 | flips here |

Twice per lap the wave crosses the middle — there `R` is almost 0, and `RN`
changes sides.

## Try it

Set the place on the lap by hand and compare with the table:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Cosinus", "_id": "cos1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **A round trip**: Where a point sits is told by two numbers — how far to
  the side and how far up. Cosinus delivers the side, [Sinus](sinus.md)
  with the same place on the lap the height — together the point describes
  a clean circle, for instance on the
  [Line Display](../display/line-display.md). Such pairs of numbers are
  called **vectors** (see [Vectors](../../grundlagen/vektoren.md)).
- **Offset waves**: Two lamps breathing alternately? One gets the sine, the
  other the cosine of the same place on the lap.
- If you just want to turn a point by an angle, there is the ready-made
  [Vector Rotate](../vector/vector-rotate.md) for that.

## See also

[Sinus](sinus.md) · [Tangents](tangents.md) ·
[Vector Rotate](../vector/vector-rotate.md)
