# Pipe 1 / Pipe 4 / Pipe 8

[Operator Reference](../index.md) · Category: **Utility**

A Pipe block is a **pass-through**: Whatever flows in at the front
comes out unchanged at the back — just like a pipe that water runs
through without changing along the way. Set the input to the number 7
and the output shows 7 as well; switch it on and the output turns on
just the same.

There are three sizes: Pipe 1 for a single value, Pipe 4 for four
values at once, and Pipe 8 for eight values at once. The pins carry no
label of their own; they belong together in order — the topmost input
to the topmost output, the second to the second, and so on.

Sounds useless? It is not: pipes help you route many wires neatly,
instead of covering the canvas in a tangle of cables.

## Pins

| Block | Inputs | Outputs | Meaning |
| --- | --- | --- | --- |
| Pipe 1 | 1 | 1 | Passes one value through |
| Pipe 4 | 4 | 4 | Passes four values through |
| Pipe 8 | 8 | 8 | Passes eight values through |

All pins accept bits as well as bytes.

## Try it

What goes in on the left comes out on the right — on or off, number or
not:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "pipe1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Bundling and routing lines**: Instead of dragging eight individual
  cables across the whole canvas, you route them together through a
  Pipe 8 at one spot you choose — the circuit stays readable.
- **Distribution point**: When a signal needs to reach many places at
  once, send it into a pipe first. From its output, every wire then
  fans out. If you swap the source later, you only have to move **one**
  single wire.
- **Deliberate delay**: Every block needs one **tick** — one calculation
  step of the circuit — to pass a value on (more on that on
  [Edges and Clock](../../grundlagen/flanken-und-takt.md)). A pipe
  therefore delays by exactly one tick. If two wires that pass through
  different numbers of blocks still need to arrive at the same time, you
  even out the difference by adding extra pipes on the shorter wire.
  (For freely adjustable waits, there is the
  [Repeater](../signal/repeater.md).)
- **Across long distances** the [portals](portale.md) are the more
  practical choice: a kind of magic door that links two spots with no
  visible wire in between.

## See also

[Portals](portale.md) · [Repeater](../signal/repeater.md)
