# Time

[Operator Reference](../index.md) · Category: **Signal**

Time brings the **real time of day** into your circuit — the same one your
wristwatch or your phone shows. Year, month, day, hour, minute, second and
a few more entries wait at the outputs, each as a byte and looked up anew
on every tick.

On top of that comes the notification output `T`. On the left you tick off
what it should watch — the second, for example. When that part of the time
changes, `T` flips from on to off or back. So you get a **beat** that
follows the real clock (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `Y`, `MO`, `D`, `H`, `MI`, `S` | Input | Bit | To tick off: which parts of the time the notifier `T` should watch |
| `YH` / `YL` | Output | Byte | The year in two parts, because one byte only counts to 255 (year = YH × 256 + YL) |
| `MO` | Output | Byte | The current month (1–12) |
| `D` | Output | Byte | The current day of the month (1–31) |
| `KW` | Output | Byte | Which week of the year is currently running (week 1 is the one with the first Thursday) |
| `DW` | Output | Byte | Day of the week (0 = Monday … 6 = Sunday) |
| `H` | Output | Byte | The current hour (0–23) |
| `MI` | Output | Byte | The current minute (0–59) |
| `S` | Output | Byte | The current second (0–59) |
| `MSH` / `MSL` | Output | Byte | The millisecond (a thousandth of a second) in two parts, as with the year |
| `T` | Output | Bit | Flips as soon as a ticked-off part of the time changes (with no selection: on every millisecond) |

In the Properties window, **IsUTC** switches from your local time to
universal time UTC — that is the time all the time zones on Earth are
lined up against.

## Try it

The real clock runs on the right. The boxes write their values as **hex
code**, a notation with 16 digits: after the 9 it continues with A up to
F. The second `3B` therefore means 59, because B stands for 11 and
3 × 16 + 11 = 59. Tick off `S` on the left — the notifier `T` then flips
at a one-second rhythm:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Time", "_id": "time1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Building a digital clock**: Route the numbers for hour and minute
  through [Base Converter](../converter/base-converter.md),
  [Byte to 4bit decoder](../converter/byte-zu-4bit.md) and
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) onto
  [digit displays](../display/7segment-display.md) — exactly what the
  *clock* example in the editor's 📚 Examples menu shows.
- **The time as points of light**: Split the time bytes into single bits
  with the [Byte to 8bit decoder](../converter/byte-zu-8bit.md) and put
  them on [lamps](../display/lamp.md). A clock made purely of on/off
  lights is called a binary clock.
- **A true one-second beat**: Tick off `S` and use `T` as a dependable
  knock once per second. The [Clock](clock.md) counts in ticks of the
  circuit, and those can come faster at some moments and slower at others;
  Time follows the real clock.
- **Timer switch**: Compare the hour via [Equals](../math/equals.md) with
  a fixed number from a [Value](../fixed-input/value.md) — “on at
  8 o'clock”.

## See also

[Clock](clock.md) · [Base Converter](../converter/base-converter.md) ·
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)
