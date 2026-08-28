# Pulse

[Operator Reference](../index.md) · Category: **Logic**

Pulse makes **moments** visible: It watches its input and fires an
**impulse** — an “on” that lasts a single calculation step — whenever the
input switches: on `U` when it turns on, on `D` when it turns off. The
moment of switching on is called the **rising edge**, the moment of
switching off the **falling edge**; how long a calculation step is (a
**tick**) is explained in
[Values and Signals](../../grundlagen/werte-und-signale.md) and
[Edges and Clock](../../grundlagen/flanken-und-takt.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I` | Input | Bit | The observed value |
| `U` | Output | Bit | On for one tick when `I` just switched **on** |
| `D` | Output | Bit | On for one tick when `I` just switched **off** |

## Try it

A single tick is too fast for the eye — so two
[Counter8](../memory/counter8.md) count the impulses here: The upper one
counts the switch-on moments (`U`), the lower one the switch-off moments
(`D`). Switch the input on and off several times — on the right each
counter has three boxes, the blue one (“Counter8 · Byte”) is the respective
count:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pulse", "_id": "pulse1", "_x": -200, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cntUp", "_x": 40, "_y": -70 },
		{ "_#new": "Counter8", "_id": "cntDown", "_x": 40, "_y": 70 },
		{ "_#new": "Value", "_id": "zero", "_x": -200, "_y": 160 }
	],
	"conAll": [
		{ "s": "pulse1_out_U", "e": "cntUp_in_I" },
		{ "s": "pulse1_out_D", "e": "cntDown_in_I" },
		{ "s": "zero_out_V", "e": "cntUp_in_D" },
		{ "s": "zero_out_V", "e": "cntUp_in_R" },
		{ "s": "zero_out_V", "e": "cntUp_in_B" },
		{ "s": "zero_out_V", "e": "cntUp_in_L" },
		{ "s": "zero_out_V", "e": "cntDown_in_D" },
		{ "s": "zero_out_V", "e": "cntDown_in_R" },
		{ "s": "zero_out_V", "e": "cntDown_in_B" },
		{ "s": "zero_out_V", "e": "cntDown_in_L" }
	]
}
```

(The little VALUE block only supplies a resting zero for the remaining
counter inputs so they don't get in the way here.)

## Usage ideas

- **“Only once per switch-on”**: An input that simply stays on would
  trigger some actions non-stop. Pulse turns that ongoing “on” into a
  single short nudge — perfect in front of the trigger inputs of
  [Stack](../memory/stack.md), [Memory](../memory/memory-1byte.md) & co.
  (Though many of these blocks already react only to the rising edge
  themselves — the input's tooltip tells you.)
- **Detecting release**: `D` fires exactly on switch-off — e.g. to react
  when a key is **released** instead of pressed.
- **Change detector**: `U` and `D` together into an [Or](or.md) yields
  “the value has changed” — in whichever direction.

## See also

[Button](../user-input/button.md) (delivers 1-tick impulses out of the box) ·
[T FlipFlop](t-flipflop.md) · [Counter8](../memory/counter8.md)
