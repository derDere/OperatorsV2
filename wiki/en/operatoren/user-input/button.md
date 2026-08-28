# Button

[Operator Reference](../index.md) · Category: **User Input**

The Button is the **doorbell** of the circuit: A click gives a signal for
just a brief moment — **one tick** long, then it is gone again, even if
you keep holding the mouse button down. Such a short “now!” is called an
**impulse**. The [Switch](switch.md), by contrast, stays in its position
like a light switch.

An impulse is exactly what inputs need when they only wait for the moment
of switching on — that moment is called a **rising edge** (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)). Such inputs are
often named `T`, short for **trigger**.

Like all input blocks, the Button additionally appears as a real push
button on the panel area to the right of the editor; its caption can be
changed in the Properties.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `O` | Output | Bit | On for one tick per click |
| `!O` | Output | Bit | The opposite (on almost all the time) |

## Try it

A single tick is barely visible to the eye — so a
[T FlipFlop](../logic/t-flipflop.md) hangs behind it here, flipping on
every impulse. Click the button block and watch the “State” box on the
right:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Button", "_id": "btn1", "_x": -120, "_y": 0 },
		{ "_#new": "T FlipFlop", "_id": "tff1", "_x": 80, "_y": 0 }
	],
	"conAll": [
		{ "s": "btn1_out_O", "e": "tff1_in_T" }
	]
}
```

## Usage ideas

- **Triggering**: Committing values into a
  [Memory](../memory/memory-1byte.md), advancing a
  [counter](../memory/counter8.md), fetching the next value from a
  [Stack Input](../fixed-input/stack-input.md) — wherever a trigger input
  waits, the Button fits.
- **Start/stop buttons**: Two Buttons on `S` and `R` of an
  [RS FlipFlop](../logic/rs-flipflop.md) — the classic control panel.
- **Toggle button**: Button + [T FlipFlop](../logic/t-flipflop.md) (as in
  the demo) turns the impulse into an on/off toggler.

## See also

[Switch](switch.md) · [Pulse](../logic/pulse.md) ·
[T FlipFlop](../logic/t-flipflop.md) ·
[Edges and Clock](../../grundlagen/flanken-und-takt.md)
