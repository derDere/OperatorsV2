# T FlipFlop

[Operator Reference](../index.md) · Category: **Logic**

The T flip-flop (toggle flip-flop) is the **toggle switch**: On every
switch-on moment at the input `T` — the **rising edge**, see
[Edges and Clock](../../grundlagen/flanken-und-takt.md) — the stored state
flips over: on, off, on, off … Like a ballpoint pen where every click
changes the state.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `T` | Input | Bit | Every rising edge flips the state |
| `Q` | Output | Bit | The stored state |
| `!Q` | Output | Bit | The opposite of the state |

## Try it

Switch `T` on and off several times — only the moment of **switching on**
flips `Q`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "T FlipFlop", "_id": "tff1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Light switch from a push button**: A [Button](../user-input/button.md)
  on `T` — first click on, next click off. This turns an impulse source
  into a toggle.
- **Halving the pace**: `Q` only changes on every *second* rising edge at
  the input — so a T flip-flop passes a clock on at half its pace. (How
  many beats a clock makes per second is called its **frequency**; see
  [Edges and Clock](../../grundlagen/flanken-und-takt.md).) Chain several
  of them and every stage halves again — and the states of the stages
  together form the bits of a number. Counting with nothing but on/off
  switches is called counting in **binary** (see
  [Bits and Bytes](../../grundlagen/bits-und-bytes.md)); this is exactly
  how counters are born.

Here a [Clock](../signal/clock.md) drives a chain of two T flip-flops. Set
the interval (top box) to about 30 and switch power on: The upper “State”
box on the right blinks at half the clock speed, the lower one at half of
that again:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": -200, "_y": 0 },
		{ "_#new": "T FlipFlop", "_id": "tff2", "_x": 0, "_y": 0 },
		{ "_#new": "T FlipFlop", "_id": "tff3", "_x": 200, "_y": 0 }
	],
	"conAll": [
		{ "s": "clock1_out_C", "e": "tff2_in_T" },
		{ "s": "tff2_out_!Q", "e": "tff3_in_T" }
	]
}
```

Reading the two states as bits, the chain counts 0, 1, 2, 3 over and over —
with more stages it counts further. For ready-made counting there are the
more convenient [Counter4](../memory/counter4.md) and
[Counter8](../memory/counter8.md).

## See also

[RS FlipFlop](rs-flipflop.md) · [Pulse](pulse.md) ·
[Clock](../signal/clock.md) · [Counter8](../memory/counter8.md)
