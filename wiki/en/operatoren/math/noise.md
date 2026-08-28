# Noise

[Operator Reference](../index.md) · Category: **Math**

Noise is **gentle randomness**: randomness with a soft transition. The
numbers do not jump around wildly, they wander up and down at a leisurely
pace. Picture a landscape of hills that you drive along — sometimes it goes
uphill a bit, sometimes back down, but never from all the way down to all
the way up in a single step. That is what sets Noise apart from
[Random](random.md): Random lands somewhere new in every tick (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)), Noise only ever
moves a little way on from its last value.

The inputs `A`, `B` and `C` say **where in that landscape you are standing**
— the way a house number says where along a street you are standing. The
output `N` gives you the **height of the ground at that spot**, as a number
from 0 to 255. Spots close to each other have similar heights, and that is
why the value changes so softly. This technique has a name of its own —
**Perlin noise** — and it is behind many of the clouds, water and landscapes
in games and films.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `A` | Input | Byte | How far you have walked in the first direction |
| `B` | Input | Byte | How far in the second direction (you may leave it out) |
| `C` | Input | Byte | How far in the third direction (you may leave it out) |
| `S` | Input | Byte | The step size: all three figures are divided by `S` — the bigger the number, the smaller the steps and the more leisurely the ride |
| `N` | Output | Byte | The height of the ground at the spot (A, B, C) |

## Try it

Here a counter drives through the landscape by itself: it keeps counting
the input `A` up. Set `S` to 20, say, and watch the output sway softly —
the bigger `S`, the lazier. Change `B` and you hop onto a different track
through the same landscape:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tick", "_id": "tick1", "_x": -220, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt1", "_x": -60, "_y": 0 },
		{ "_#new": "Noise", "_id": "noise1", "_x": 120, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -220, "_y": 120 }
	],
	"conAll": [
		{ "s": "tick1_out_T", "e": "cnt1_in_I" },
		{ "s": "cnt1_out_B", "e": "noise1_in_A" },
		{ "s": "zero_out_V", "e": "cnt1_in_D" },
		{ "s": "zero_out_V", "e": "cnt1_in_R" },
		{ "s": "zero_out_V", "e": "cnt1_in_B" },
		{ "s": "zero_out_V", "e": "cnt1_in_L" }
	]
}
```

(The [Tick](../signal/tick.md) sets the beat, the
[Counter8](../memory/counter8.md) counts up by one on every beat, and the
Value block keeps its remaining inputs switched off.)

## Usage ideas

- **Natural flicker**: Candlelight, wind strength, a slight wobble —
  wherever pure [Random](random.md) would be too hectic.
- **Terrain and patterns**: Let two figures run at the same time (`A` and
  `B`) and you no longer drive along a line, you sweep across a whole
  surface — that is how cloud pictures on the
  [Line Display](../display/line-display.md) come about.
- **Several values wandering independently**: Give several Noise blocks the
  same `A` counter, but each of them a different fixed `B` value. Then they
  all wander just as softly, yet each one on its own.

## See also

[Random](random.md) · [Sinus](sinus.md) ·
[Counter8](../memory/counter8.md)
