# Values and Signals

Back to the [start page](../index.md).

A line between two blocks is like a cable: it carries something from one to
the other. That something is called a **value**. Sometimes it is just an
“on” or “off” like on a light switch, sometimes a number like the reading
on a kitchen scale. This page shows you which values exist, how to
recognize them by their color and at what rhythm they travel.

## Two kinds of values

**1. The switch value (bit):** on or off, nothing else — like a light
switch that is either up or down and knows nothing in between. In technical
terms *on* is also called “true” and *off* “false”.

**2. The number (byte):** a whole number from **0 to 255** — so 0, 1, 2 and
onward up to 255, with no decimal point and no minus in front. Why that row
stops at 255 of all numbers is explained on
[Bits and Bytes](bits-und-bytes.md). What happens when a calculation runs
past 255 or would drop below zero is covered by
[Negative Numbers and Overflow](negative-zahlen-und-ueberlauf.md).

Almost every pin tells you which kind it expects or delivers: hold the mouse
over it and a small info bubble (tooltip) appears.

## The colors

The same color code applies everywhere in the editor and in the wiki demos:

| Color | Meaning |
| --- | --- |
| **Red** | on (true) |
| **White / black** | off (false) |
| **Blue** | a number (byte) |

Pin circles, connection lines and the value boxes of the demos are colored
accordingly. Numbers appear in the boxes as two characters, for instance
`00`, `24` or `FF`. That is a shorthand for numbers, the **hex code** —
that too is explained on [Bits and Bytes](bits-und-bytes.md).

Try it: The [Pipe](../operatoren/utility/pipes.md) block passes on whatever
arrives at it, without changing anything. Set the input slider to different
values and watch the colors:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "pipe1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## The rhythm: ticks

The circuit does not work in one go, but in tiny steps — ideally 60 times
per second. Such a step is called a **tick**. In every tick two things
happen:

1. Every connection carries the value from its start (an output) to its
   destination (an input).
2. Every block reads its inputs and sets its outputs anew.

So a value **moves on by one block per tick**. With short chains you never
notice. With long chains and with circuits that follow a steady beat, this
rhythm starts to matter.

## Edges: the moment of switching

With a doorbell, what counts is the moment you press — not how long your
finger stays on the button. Many blocks work the same way. They do not watch
whether an input *is* on, but watch for the **change from off to on**. That
moment of switching on is called a **rising edge**; the opposite moment,
switching off, is called a **falling edge**.

Example: The counter ([Counter8](../operatoren/memory/counter8.md)) does not
count continuously while its input is on — it counts **once per switch-on**.
In the descriptions of this wiki you will read “on a rising edge”. The
[Pulse](../operatoren/logic/pulse.md) block makes such moments visible and
usable; they are covered in full on
[Ticks and Edges](flanken-und-takt.md).

## Several sources on one input

You may route several outputs to the same input. The values then overlap as
if on a shared cable:

- If only switch values are involved, the input is on as soon as **at least
  one** source is on — like a burglar alarm that goes off as soon as a
  single door stands open. That rule is called **OR**.
- If a number is involved, the same OR rule applies to each of the eight
  switches a number is made of, one by one. That is called **bitwise**; what
  lies behind it is shown on [Bits and Bytes](bits-und-bytes.md).

Here two lines feed the same input of a Pipe block. Switch on one source,
the other, or both — or feed in two numbers:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "quelleA", "_x": -140, "_y": -40 },
		{ "_#new": "Pipe 1", "_id": "quelleB", "_x": -140, "_y": 40 },
		{ "_#new": "Pipe 1", "_id": "sammel", "_x": 60, "_y": 0 }
	],
	"conAll": [
		{ "s": "quelleA_out_OUT0", "e": "sammel_in_IN0" },
		{ "s": "quelleB_out_OUT0", "e": "sammel_in_IN0" }
	]
}
```

(The two boxes on the left are the two sources, the box on the right shows
the result on the shared input.)

## Read on

- [Bits and Bytes](bits-und-bytes.md) — why 255, and what hex codes mean
- [Ticks and Edges](flanken-und-takt.md) — ticks, beat, edges and pulses
- [Operator Reference](../operatoren/index.md) — all building blocks in detail
