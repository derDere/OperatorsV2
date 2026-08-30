# Line Display

[Operator Reference](../index.md) · Category: **Display**

The Line Display is the **drawing board** of the circuit: a surface of
255 × 255 points on which an invisible **pen** travels. You give target
coordinates and say either “jump there” (`G`, without a trace) or “draw a
line there” (`D`). Stroke by stroke, a drawing emerges. `G`, `D` and `C`
each trigger on a **rising edge**: the moment the respective input
switches from off to on (more on that on
[Edges and Clock](../../grundlagen/flanken-und-takt.md)). The actual
drawing surface appears on the panel area to the left of the editor; its
display size is set in the Properties.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `X` / `Y` | Input | Byte | The target coordinates (0–255, origin top left) |
| `G` | Input | Bit | Goto — rising edge: the pen jumps without drawing |
| `D` | Input | Bit | Drawto — rising edge: draws a line from the pen to the target |
| `W` | Input | Byte | The pen thickness |
| `C` | Input | Bit | Rising edge: wipes the surface |
| `X` / `Y` | Output | Byte | The current pen position |
| `G` / `D` | Output | Bit | On for one tick when just jumped/drawn |
| `W` | Output | Byte | The current pen thickness |
| `T` | Output | Bit | On for one tick on every pen action |

## Try it

The drawing surface belongs to the editor's panel area — but the block
shows the pen position live. Set `X` and `Y` and switch `G` on and off:
The position readout follows (drawing and wiping only take effect on the
real surface in the editor, which is why `D` and `C` are kept quiet here):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Line Display", "_id": "line1", "_x": 0, "_y": 0 },
		{ "_#new": "Value", "_id": "aus", "_x": -180, "_y": 140 }
	],
	"conAll": [
		{ "s": "aus_out_V", "e": "line1_in_D" },
		{ "s": "aus_out_V", "e": "line1_in_C" }
	]
}
```

## Usage ideas

- **Drawing figures**: Play coordinate pairs from a
  [Stack Input](../fixed-input/stack-input.md) at
  [Clock](../signal/clock.md) pace — the circuit draws houses, stars,
  lettering. The *draw* example in the editor's 📚 Examples menu shows it
  in action.
- **Painting curves**: [Sinus](../math/sinus.md) and
  [Cosinus](../math/cosinus.md) deliver circular paths, a
  [counter](../memory/counter8.md) lets `X` count up steadily — waves,
  spirals and circles are done.
- **Painting by hand**: Two [sliders](../user-input/slider.md) on `X`/`Y`
  and a [Button](../user-input/button.md) on `D` — that gives you a
  drawing device you steer by hand.
- **Plotting measurements**: `X` counts up (time), `Y` is the reading,
  `D` draws the curve — out comes a curve you can read the course from.

## See also

[Terminal Display](terminal-display.md) ·
[Vector Rotate](../vector/vector-rotate.md) · [Sinus](../math/sinus.md)
