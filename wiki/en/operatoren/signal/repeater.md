# Repeater

[Operator Reference](../index.md) · Category: **Signal**

The Repeater is the **echo**: What goes in at the front comes back out at
the end unchanged — just a while later. This later arriving is called a
**delay**.

How long the waiting lasts is set with `D`. It is counted in ticks — that
is the name for one complete pass of the circuit, and about 60 of them
fit into one second (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)). Inside runs a
conveyor belt: every tick lays the current value from the input onto the
front of the belt, and whatever was laid on `D` ticks ago drops off the
back. The belt is visible on the block as a small waveform.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `D` | Input | Byte | How long the waiting lasts, counted in ticks (60 ticks are about 1 second) |
| `S` | Input | Bit | The signal that should arrive later |
| `L` | Input | Bit | Lock, the brake: while `L` is on, the belt stands still and the input is left alone |
| `O` | Output | Bit | The same signal, just later |

## Try it

Set `D` to about 60 (so roughly 1 second) and switch `S` on and off — the
output copies everything, just later. On the block you can watch your
signal travel along the belt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Repeater", "_id": "rpt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Coming on later**: The light should come on shortly after the switch —
  or a second lamp always one second after the first.
- **Running light**: Several Repeaters one behind the other, each with the
  same small delay, a [lamp](../display/lamp.md) between each. A single
  signal then visibly travels down the chain, like a string of lights that
  comes on one bulb at a time.
- **Holding everything still**: `L` stops the belt. Whatever is travelling
  on it right now stays where it is and waits until you switch `L` off
  again.
- **Making short impulses**: Compare a signal that goes evenly on and off
  with its own delayed copy via [Xor](../logic/xor.md). Xor is on as soon
  as the two sides differ — and they only differ during the `D` ticks
  right after each switch-over. So every change produces one short
  **impulse**, and `D` decides how long it is.

## See also

[Memory (1 bit)](../memory/memory-1bit.md) · [Clock](clock.md) ·
[Pulse](../logic/pulse.md) ·
[Edges and Clock](../../grundlagen/flanken-und-takt.md)
