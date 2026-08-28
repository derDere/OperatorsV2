# RS FlipFlop

[Operator Reference](../index.md) · Category: **Logic**

The RS flip-flop is the simplest **memory**: `S` (Set) turns the stored
**state** on, `R` (Reset) turns it off — and in between it **stays put on
its own**, even when both inputs are long off again. Like a light switch
with two buttons: one for on, one for off, and in between the switch
keeps its position.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `S` | Input | Bit | Set: the state turns on while `S` is on |
| `R` | Input | Bit | Reset: the state turns off while `R` is on |
| `Q` | Output | Bit | The stored state |
| `!Q` | Output | Bit | The opposite of the state |

If `S` and `R` are on at the same time, `S` wins.

## Try it

Tap `S` on and off again — `Q` stays on. Only `R` clears it:

```operatorsv2
{
	"opAll": [
		{ "_#new": "RS FlipFlop", "_id": "rs1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **An alarm that remembers**: A short trigger on `S` — a motion detector,
  say, or the impulse a [counter](../memory/counter8.md) gives off when it
  jumps from 255 back to 0 (that is called an **overflow**, see
  [Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
  The alarm lamp on `Q` stays on until someone switches it off with `R`.
- **On/off with two push buttons**: One [Button](../user-input/button.md)
  on `S` (“start”), a second on `R` (“stop”) — the classic motor control.
  The motor keeps running even once the start button is released.
- **Holding an operating state**: The `Q` output tells you whether “the
  machine is running” — other circuit parts can use that to switch
  themselves on, for example through an [And](and.md).

## See also

[T FlipFlop](t-flipflop.md) · [Memory (1 bit)](../memory/memory-1bit.md) ·
[Pulse](pulse.md)
