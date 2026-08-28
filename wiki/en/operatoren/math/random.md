# Random

[Operator Reference](../index.md) · Category: **Math**

Random is the **perpetual die**: it rolls without stopping. In every work
step of the circuit — such a step is called a **tick**, see
[Edges and Clock](../../grundlagen/flanken-und-takt.md) — it puts a freshly
rolled number from 0 to 254 on its output, many dozen times per second.
Nobody can predict which number comes next; each of those 255 numbers has
the same chance.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `R` | Output | Byte | A freshly rolled number (0–254) in every tick |

## Try it

The box on the right flickers without pause, because a new number comes out
in every tick:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Random", "_id": "rnd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

**Holding on to one roll.** As long as the numbers change that fast, there
is little you can do with them. They only become useful once you pick out
**one** of them at the right moment and hold on to it. That is exactly what
[Memory (1 byte)](../memory/memory-1byte.md) can do — a block that
remembers a number: switch `T` on the left, and the memory holds the number
that just came past. Off, on again — that is the next “roll”:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Random", "_id": "rnd2", "_x": -140, "_y": 0 },
		{ "_#new": "Memory (1 byte)", "_id": "mem1", "_x": 60, "_y": 0 }
	],
	"conAll": [
		{ "s": "rnd2_out_R", "e": "mem1_in_B" }
	]
}
```

**A real die (1–6)**: Send the number you held on to through
[Modulo](modulo.md). Modulo gives you the **remainder of a division** — if
you divide by 6, a remainder of 0 to 5 is always left over. An
[Add](add.md) that adds 1 turns that into the faces 1 to 6. The fixed
numbers 6 and 1 come from a [Value](../fixed-input/value.md) block each.

**Something should only happen now and then**: Compare the random number
with a fixed limit number. A [Subtract](subtract.md) does that for you —
its output `RN` tells you which of the two numbers is bigger. Pick the
limit 25 and roughly every tenth random number falls below it — so the
thing happens in roughly one out of ten cases.

**Flickering**: Fed straight into a display, Random creates a restless
picture — like a television with no reception. For *gentle* randomness that
looks more like slowly drifting clouds, take [Noise](noise.md).

## See also

[Noise](noise.md) · [Memory (1 byte)](../memory/memory-1byte.md) ·
[Modulo](modulo.md)
