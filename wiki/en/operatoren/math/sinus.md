# Sinus

[Operator Reference](../index.md) · Category: **Math**

Sinus turns a steadily counting number into a **gentle up and down, always
in the same rhythm** — like a swing moving forward and back. No corners,
no jumps.

At the input `B1` you set how far along its lap the wave has already come.
Such a place on a lap is called an **angle**; a lap is usually split into
360 steps (written: 360°). This block works with a byte, so it splits the
lap into the numbers 0 to 255: 0 is the start, 64 is a quarter lap, 128 is
half a lap, 192 is three quarters. More about angles is on
[Vectors](../../grundlagen/vektoren.md).

Out come two values. `R` tells you how far the wave currently is from the
middle: 0 means right in the middle, 255 means as far away as it gets.
`RN` tells you which side of the middle it is on: off for above, on for
below. How far a wave swings out at most is called its **amplitude** —
here that is always 255.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The place on the lap: 0 = start, 255 = once all the way round |
| `R` | Output | Byte | How far the wave is from the middle (0 = middle, 255 = fully out) |
| `RN` | Output | Bit | On while the wave runs below the middle (second half of the lap) |

A few places to set up and compare:

| `B1` | corresponds to | `R` | `RN` |
| --- | --- | --- | --- |
| 0 | 0° — start | 0 | off |
| 64 | 90° — quarter lap | 255 | off |
| 128 | 180° — half a lap | ≈ 0 | flips here |
| 192 | 270° — three quarters | 255 | on |

At 128 the wave crosses the middle: there `R` is almost 0, and `RN` changes
from off to on at exactly that place.

## Try it

Here a counter turns the place on the lap onward all by itself — watch how
`R` grows softly and falls back, and how `RN` flips over on every half lap:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tick", "_id": "tick1", "_x": -220, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt1", "_x": -60, "_y": 0 },
		{ "_#new": "Sinus", "_id": "sin1", "_x": 120, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -220, "_y": 120 }
	],
	"conAll": [
		{ "s": "tick1_out_T", "e": "cnt1_in_I" },
		{ "s": "cnt1_out_B", "e": "sin1_in_B1" },
		{ "s": "zero_out_V", "e": "cnt1_in_D" },
		{ "s": "zero_out_V", "e": "cnt1_in_R" },
		{ "s": "zero_out_V", "e": "cnt1_in_B" },
		{ "s": "zero_out_V", "e": "cnt1_in_L" }
	]
}
```

(The [Tick](../signal/tick.md) sets the beat, the
[Counter8](../memory/counter8.md) counts up by one on every beat, and the
Value block keeps its remaining inputs switched off. See
[Edges and Clock](../../grundlagen/flanken-und-takt.md).)

## Usage ideas

- **Soft glowing**: A lamp that slowly gets brighter and darker again; a
  value that breathes — wherever hard on and off feels too rough.
- **Circular motion**: Where a point sits is told by two numbers — how far
  up and how far to the side. Sinus delivers the height, the
  [Cosinus](cosinus.md) with the same place on the lap the side — together
  the point travels in a circle, for example on the
  [Line Display](../display/line-display.md).
- **Pendulums and swings**: Anything that should swing back and forth gets
  its position from a sine wave.

## See also

[Cosinus](cosinus.md) · [Tangents](tangents.md) ·
[Counter8](../memory/counter8.md) · [Line Display](../display/line-display.md)
