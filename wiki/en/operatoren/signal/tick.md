# Tick

[Operator Reference](../index.md) · Category: **Signal**

The circuit works itself through completely many times per second, about
60 times. One such pass is called a **tick** (more on this under
[Edges and Clock](../../grundlagen/flanken-und-takt.md)).

Tick is the **fastest rhythm keeper** there is here: on every pass its
output switches between on and off. No settings, no input — it just
ticks.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `T` | Output | Bit | Alternates between on and off every tick |
| `!T` | Output | Bit | The opposite — always exactly inverted |

## Try it

The boxes flicker as fast as the circuit runs:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tick", "_id": "tick1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Full speed**: Anything that should be nudged exactly once per tick —
  such as a [Counter8](../memory/counter8.md) driving
  [Sinus](../math/sinus.md) waves, or a [Stack](../memory/stack.md) being
  drained at top speed.
- **Speed gauge**: `T` is on every other tick, which is the fastest
  possible blinking. It shows you how briskly the circuit is currently
  running.
- **If it should be slower**: For adjustable speeds the
  [Clock](clock.md) is in charge.

## See also

[Clock](clock.md) · [Edges and Clock](../../grundlagen/flanken-und-takt.md)
· [Values and Signals](../../grundlagen/werte-und-signale.md)
