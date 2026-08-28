# Clock

[Operator Reference](../index.md) · Category: **Signal**

The Clock is the **rhythm keeper** of the circuit: It switches its output
on and off evenly, on and on. Musicians have a small device for this, the
metronome — it knocks at equal intervals so that everyone stays at the
same speed. This steady rhythm is called the **beat**, and it drives
everything in your circuit that should happen one step after another.

How fast the knocking goes is set with `B`. It is counted in **ticks** —
that is the name for one complete pass of the circuit, and about 60 of
them fit into one second (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)). After `B` ticks
the output flips over: from on to off, then from off to on. A small `B`
gives fast knocking, a big one slow knocking. And `P` is the master
switch: the Clock only runs at all while `P` is on.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The gap between two knocks: after this many ticks the output flips |
| `P` | Input | Bit | Power, the master switch: the Clock counts and flips only while `P` is on |
| `C` | Output | Bit | The beat itself: on, off, on, off … every stretch the same length |
| `!C` | Output | Bit | The opposite — on exactly when `C` is off |

An example to give you a feel for it: at 60 ticks per second, `B` = 30
makes the output flip twice per second. A lamp on it lights up for half a
second and is dark for half a second. How often something happens per
second is called the **frequency**.

## Try it

Set the gap `B` to about 30 and switch `P` on — the output blinks. A
smaller `B` means faster, a bigger one slower:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Blinking light**: Put the output straight onto a
  [lamp](../display/lamp.md) — the blinking is done.
- **Drive for workflows**: Making a counter count up
  ([Counter8](../memory/counter8.md)), fetching stored values one after
  another from a [Stack Input](../fixed-input/stack-input.md), writing the
  [Terminal Display](../display/terminal-display.md) character by
  character — almost every circuit that runs by itself starts with a
  Clock.
- **Start and stop**: The `P` input is the built-in pause button. A
  [Switch](../user-input/switch.md) or an
  [RS FlipFlop](../logic/rs-flipflop.md) on it holds the whole process
  still and lets it carry on again.
- **Several tempos**: Several Clocks with different gaps run side by side
  without trouble. Or you take one fast Clock and hang
  [T flip-flops](../logic/t-flipflop.md) behind it — each of them reacts
  only to every second knock and so halves the speed.

## See also

[Tick](tick.md) · [Repeater](repeater.md) ·
[Edges and Clock](../../grundlagen/flanken-und-takt.md) ·
[Counter8](../memory/counter8.md)
