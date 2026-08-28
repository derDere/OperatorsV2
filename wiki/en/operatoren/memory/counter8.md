# Counter8

[Operator Reference](../index.md) · Category: **Memory**

Counter8 is the **counting mechanism**: it remembers a number from 0 to
255 and counts up or down on command — like an odometer with plus and
minus buttons. The count is written large on the block and available as a
byte on the output.

“On command” means: counting happens only at the moment a count input
flips from off to on. That flip is called a **rising edge**
([Edges and Clock](../../grundlagen/flanken-und-takt.md)); if the input
stays on, nothing further happens.

An odometer wraps back to 0 after its highest number — that is exactly
what Counter8 does past 255. That jump is called an **overflow**,
reported on `O`. Below 0 it works the other way round: the count jumps to
255, and that is the **underflow**, reported on `U`. More on this in
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I` | Input | Bit | Counts up by one (+1) on a rising edge |
| `D` | Input | Bit | Counts down by one (−1) on a rising edge |
| `R` | Input | Bit | Reset: holds the count at 0 while this input is on |
| `B` | Input | Byte | The number taken over when loading |
| `L` | Input | Bit | Takes over the number from `B` as the new count on a rising edge |
| `U` | Output | Bit | Flashes on once when counting below 0 (underflow, count wraps to 255) |
| `B` | Output | Byte | The current count |
| `O` | Output | Bit | Flashes on once when counting above 255 (overflow, count wraps to 0) |

## Try it

Switch `I` on, off, on, off … — every switch-on moment adds one (`D`
subtracts one accordingly). With `B` and `L` you set a start value, `R`
resets the count to 0:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Counter8", "_id": "cnt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Counting automatically

Most of the time it is not a human counting by hand but a steady rhythm
counting along — that rhythm is called a **clock**, and a
[Clock](../signal/clock.md) delivers exactly that: it switches its output
on and off by itself, over and over, like a metronome. Here a Clock hangs
on the count input. Set the interval (top box) to 30 and switch power on
— the count runs up by itself:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": -180, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt2", "_x": 20, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -180, "_y": 120 }
	],
	"conAll": [
		{ "s": "clock1_out_C", "e": "cnt2_in_I" },
		{ "s": "zero_out_V", "e": "cnt2_in_D" },
		{ "s": "zero_out_V", "e": "cnt2_in_R" },
		{ "s": "zero_out_V", "e": "cnt2_in_B" },
		{ "s": "zero_out_V", "e": "cnt2_in_L" }
	]
}
```

(The Value block holds the unused counter inputs at 0, so they stay
quiet.)

## Usage ideas

- **Counting events**: Clicks, blinking signals, laps — anything that
  delivers a jump from off to on can be counted.
- **Measuring time**: A clock plus a counter make a stopwatch. The
  overflow output `O` drives the next counter — that is how seconds turn
  into minutes, like a clock whose minute hand moves one step forward
  after 60 seconds.
- **Stepping through memory slots**: A [Register](register.md) has many
  numbered slots; the number of a slot is called its **address**. Connect
  the counter output to the address input and the circuit steps through
  the slots one by one — that is how a melody or a sequence of commands
  is played back.
- **Using a steadily rising number**: The count rises one step at a time,
  always by the same amount — good material for
  [Sinus](../math/sinus.md) waves or a moving position on the
  [Line Display](../display/line-display.md).
- **Restarting at a different number**: A [Modulo](../math/modulo.md)
  behind the output makes the counter restart at 0 already at a smaller
  number of your choice.

## See also

[Counter4](counter4.md) · [Clock](../signal/clock.md) ·
[Register](register.md) · [T FlipFlop](../logic/t-flipflop.md)
