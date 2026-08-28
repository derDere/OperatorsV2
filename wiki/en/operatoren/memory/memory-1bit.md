# Memory (1 bit)

[Operator Reference](../index.md) · Category: **Memory**

This block takes a photo of the value at `B1` — on or off — and holds on
to it, no matter how `B1` changes afterwards. It is triggered through the
input `T`: right at the moment `T` flips from off to on. That flip is
called a **rising edge**
([Edges and Clock](../../grundlagen/flanken-und-takt.md)).

On the [RS FlipFlop](../logic/rs-flipflop.md) the inputs themselves
switch to on or off. Here `T` only triggers the remembering — **which**
value the block holds on to is decided by `B1` alone.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Bit | The value stored when triggered |
| `T` | Input | Bit | Trigger: stores on a rising edge |
| `B` | Output | Bit | The stored value |
| `!B` | Output | Bit | The opposite of the stored value |

## Try it

Set `B1` on or off, then trigger with `T` — only that makes `B` take
over the value. Change `B1` afterwards as you like: `B` stays put until
you trigger again:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 bit)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Capturing a moment**: “How was the switch set when the start button
  was pressed?” The block holds on to exactly that one moment in time —
  it freezes the **state**, as engineers say.
- **Passing values along**: Several 1-bit memories in a row, all
  triggered by the same **clock** — then a bit travels one station
  further with every tick. A chain like that is called a **shift
  register**, and it sits behind every running light
  ([Edges and Clock](../../grundlagen/flanken-und-takt.md)).
- **Calming down jitter**: A value that keeps jumping back and forth is
  only taken over at fixed moments. Behind that point the circuit works
  with a calm signal.

## See also

[Memory (1 byte)](memory-1byte.md) · [RS FlipFlop](../logic/rs-flipflop.md) ·
[Repeater](../signal/repeater.md)
