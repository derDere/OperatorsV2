# Edges and Clock

Back to the [start page](../index.md).

A circuit never stands still: it works in tiny steps, some of it runs to a
fixed rhythm, and many blocks do not watch whether an input *is* on at all,
only for the moment it turns on. This page explains the four words used for
that all over this wiki: tick, clock, edge and pulse.

## The tick: one work step

The circuit does not compute in one go, but step by step. Such a work step
is called a **tick**. In every tick each connection first carries its value
from an output to an input, and after that every block reads its inputs and
sets its outputs anew.

Ticks are fast: about **60 per second**. You never see a single one of
them, everything looks instant. Still, the tick matters in two places.
First, a value travels only **one block per tick** — along a long chain it
needs several ticks to reach the end. Second, there are signals that are on
for exactly one tick: invisible to the eye, but plain to see for the
circuit.

## The clock: an even rhythm

A **clock** is an on and off at always the same spacing: on, off, on, off,
and onward. Musicians have a small device for that, the metronome — it taps
at even spacing so everybody keeps the same tempo. In OperatorsV2 it is the
[Clock](../operatoren/signal/clock.md) that taps, and you set for yourself
how far apart the taps are.

A clock is the drive for everything meant to run on its own: counters
counting up, values fetched one after another, characters appearing on a
display one by one. Several blocks on the same clock move on together and
stay in step.

## Edges: the moment of switching

“Is on” and “is turning on right now” are two different things. With a
doorbell, what counts is the moment you press — not how long your finger
stays on the button. The blocks make exactly that distinction too.

The moment a value jumps from off to on is called a **rising edge**. The
opposite moment, switching off, is called a **falling edge**.

Why do so many blocks listen to the edge instead of the lasting state?
Because otherwise they would trigger again in every tick. A counter that
listens to “is on” counts on 60 times per second while the switch stays up
— useless. A counter that listens to the rising edge counts exactly once
per switch-on. In the descriptions of this wiki you will read “on a rising
edge” for that.

## The pulse: a very short on

A **pulse** is a single, very short on — usually exactly one tick long, and
off again right after. Pulses are the usual triggers: they say “now” and
hold on to nothing.

The [Pulse](../operatoren/logic/pulse.md) block turns every edge into such
a pulse, and the [Button](../operatoren/user-input/button.md) delivers one
by itself on every press.

## Try it

The 1-bit memory remembers the value of `B1` as soon as the trigger `T`
turns on. Set `B1` to on and leave `T` off — nothing happens at output `B`.
Then switch `T` on: in exactly that moment `B` takes over the value. Leave
`T` on and change `B1` — `B` stays as it is. Only when you switch `T` off
and on again is there a new rising edge:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 bit)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Read on

- [Values and Signals](werte-und-signale.md) — what flows through the wires
  and which color stands for what
- [Clock](../operatoren/signal/clock.md) — the beat giver of the circuit
- [Pulse](../operatoren/logic/pulse.md) — making edges visible and usable
- [Memory (1 bit)](../operatoren/memory/memory-1bit.md) — the block from the
  demo above
