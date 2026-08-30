# Slider

[Operator Reference](../index.md) · Category: **User Input**

The Slider is the **slide control** for numbers — like the volume slider
on a stereo that you push back and forth. It delivers a hand-adjustable
value from 0 to 255. In the editor it is operated via the real slider on
the panel area to the left; the block on the canvas shows the current
position.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `V` | Output | Byte | The current slider position (0–255) |
| `T` | Output | Bit | On for one tick when the position changed |

## Try it

This is what the block looks like (the operable slider belongs to the
editor's panel area — here the demo shows the last saved position):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Slider", "_id": "sld1", "_x": 0, "_y": 0, "value": 128 }
	],
	"conAll": []
}
```

## Usage ideas

- **Everything gradual**: The blink speed of a [Clock](../signal/clock.md),
  the fraction of a [Scale](../math/scale.md), the zoom of a
  [Noise](../math/noise.md) — wherever a number is needed that you like to
  “feel out” while experimenting, the Slider is first choice.
- **Committing a value on demand**: Slider →
  [Memory (1 byte)](../memory/memory-1byte.md), triggered by a
  [Button](button.md) — adjust in peace, then apply.
- **Counting changes**: The `T` output fires on every movement — wired to
  a [Counter8](../memory/counter8.md) it counts the adjustments.
- For **fixed** numbers nobody should fiddle with, take the
  [Value](../fixed-input/value.md).

## See also

[Value](../fixed-input/value.md) · [Switch](switch.md) ·
[Scale](../math/scale.md)
