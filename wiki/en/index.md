# OperatorsV2 Wiki

Welcome! **OperatorsV2** is a construction kit in your browser: You place
building blocks (“operators”) on a canvas and connect them with lines.
Values flow through the lines — like electricity through wires. That is how
circuits come to life: from a simple light switch to a digital clock or a
tiny drawing computer.

**You need no prior knowledge whatsoever.** This documentation explains
everything from the ground up — and best of all: almost every page contains
**live demos**. They are not pictures, but real, running circuits right here
in the wiki.

## How to use the live demos

A demo looks like this — go ahead and try it:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

- **To the left** of the demo canvas you find the free **inputs**, **to the
  right** the **outputs**. Every row has a small **value box**.
- The color of the box shows the value: **red with a check mark = on**,
  **white = off**, **blue with two characters = a number** (more on that
  later).
- **Click an input box**: A slider opens. All the way left means *off*, all
  the way right means *on*, and in between lie the numbers 0 to 255. Another
  click on the box jumps straight between *on* and *off*.
- Output boxes are read-only — they show what the circuit currently outputs.
- Hover over a row: a small info bubble (tooltip) explains the pin.

Set the input above to *on* — the output of the Not block turns off. That is
exactly its job: it flips every value.

## Where do I start?

| Page | What you learn there |
| --- | --- |
| [First Steps](grundlagen/erste-schritte.md) | Open the editor and build your first own circuit |
| [Editor Controls](grundlagen/steuerung.md) | All mouse and keyboard commands: placing, wiring, deleting, saving |
| [Values and Signals](grundlagen/werte-und-signale.md) | What flows through the wires: on/off, numbers, colors, the rhythm — and the moment of switching |
| [Bits and Bytes](grundlagen/bits-und-bytes.md) | How computers count with switches — explained from scratch |
| [Edges and Clock](grundlagen/flanken-und-takt.md) | Tick, clock, edge and pulse: why the moment of switching on is what counts |
| [Stack and Queue](grundlagen/stapel-und-warteschlange.md) | Keeping numbers and fetching them back in the right order (LIFO and FIFO) |
| [Vectors](grundlagen/vektoren.md) | Two numbers as a way and as a spot on the surface — including turning and angles |
| [Negative Numbers and Overflow](grundlagen/negative-zahlen-und-ueberlauf.md) | What happens when a calculation drops below 0 or grows past 255 |
| [Operator Reference](operatoren/index.md) | Every building block in detail, with demos and usage ideas |

## What is going on under the hood?

Every circuit works in tiny steps called **ticks** — dozens of them per
second. In each tick all blocks look at their inputs and set their outputs
anew. That is why everything reacts instantly and keeps running — including
the demos right here.

> Tip: You can reach the wiki from the editor at any time via the **🌐 Wiki**
> entry in the 🏠 menu. The top bar also offers a **search** that looks
> through all wiki pages, a **←** button that takes you back to the previously
> visited page, and the **language selector** (Deutsch/English) — preset
> from your browser language.
