# Select

[Operator Reference](../index.md) · Category: **Logic**

Select is the **data switch**: Four byte channels are connected, and one
“enable” bit per channel decides whose number is passed to the output.
Like a mixing desk with four mute buttons.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `E1`…`E4` | Input | Bit | Enable for channel 1…4 |
| `B1`…`B4` | Input | Byte | The number of channel 1…4 |
| `B` | Output | Byte | The number of the enabled channel (0 while none is enabled) |
| `E` | Output | Bit | On while at least one channel is enabled |

If **several** channels are enabled at once, their numbers overlap bitwise
with OR (see [Values and Signals](../../grundlagen/werte-und-signale.md)) —
so cleanly separated enables are the rule.

## Try it

Set two different numbers on `B1` and `B2`, then switch `E1` or `E2` on
alternately — the output follows the enabled channel:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Select", "_id": "sel1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Switching between sources**: Manual or automatic mode? Two computation
  paths and only one should apply? The enable bits decide which number
  flows on.
- **Switching step by step**: When a circuit always runs through the same
  fixed sequence of steps (often called a **sequencer**), the state bits
  pick a different target value at each step — for example the bits from
  [flip-flops](rs-flipflop.md), or those of a
  [counter](../memory/counter4.md) whose count comes out of the block as
  individual bits.
- **Sharing one line** (technical term: **bus**): Several Selects may feed
  the same output line — like several people taking turns sharing one
  wire to speak on. Thanks to `E` you always know whether anyone is
  currently transmitting.

## See also

[And](and.md) (gate for single bits) ·
[Register](../memory/register.md) (selection by address instead of by bit)
