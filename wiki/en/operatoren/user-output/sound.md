# Sound

[Operator Reference](../index.md) · Category: **User Output**

Sound is the loudspeaker of a circuit: It beeps. How high the tone is, how
loud and how long it sounds, is set by its inputs — so a circuit can play
melodies, raise an alarm, or click at every key press.

A tone is trembling air. The faster the air moves back and forth, the higher
it sounds. How often it does so in one second is called the **frequency**.

## Why the pitch is a note number

The input `N` does not take a frequency but a **note number** — as if all
the keys of a piano were counted through from left to right:

- **+1** is the next key, that is one **semitone**.
- **+12** is the same tone one step higher, that is one **octave**.
- **69** is the tone musicians tune their instruments to: 440 trembles per
  second.

The reason: One octave up always means **trembling twice as fast**. From 220
to 440 is one octave — but from 440 to 880 is one octave too, even though
that is twice the distance. Equal distances in frequency are therefore not
equal distances in sound. With note numbers, one step is always a semitone,
low or high. That is exactly why you can write down a melody as a plain list
of numbers and have it played.

You start hearing something around number 12; above 130 it gets so high that
hardly anyone notices it.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `N` | Input | Byte | The pitch as a note number |
| `V` | Input | Byte | The volume: 0 is silent, 255 fully loud |
| `L` | Input | Byte | The length of a triggered tone in steps of 10ms — 255 is 2.55 seconds |
| `W` | Input | Byte | The timbre: 0 square, 1 sine, 2 sawtooth, 3 triangle |
| `T` | Input | Bit | Switching it on starts the tone over |
| `P` | Input | Bit | While on, the tone keeps sounding without an end |
| `M` | Input | Bit | While on, the block stays silent |
| `O` | Output | Bit | On while a tone is sounding |
| `N` | Output | Byte | The note that is sounding right now |
| `V` | Output | Byte | The volume that is sounding right now |
| `W` | Output | Byte | The timbre that is sounding right now |

An input **without a wire** uses its default value. A freshly placed Sound
block with nothing but `T` connected therefore beeps right away: number 79,
full volume, 200ms long, as a square — the typical beep of a computer.

## Try it

Set `N`, `V` and `L`, then switch `T` on and off again. **Careful: real
sound comes out of your speakers now.**

```operatorsv2
{
	"opAll": [
		{ "_#new": "Sound", "_id": "snd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Two ways to start a tone

`T` is the trigger. It reacts to the moment of switching on — to the
**rising edge** (see [Edges and Clock](../../grundlagen/flanken-und-takt.md)).
From that moment the time at `L` runs, and afterwards the tone is over. If
you trigger again in the middle of a tone, the time starts over and the tone
is struck anew — that also keeps two identical tones in a row apart.

`P` on the other hand is constant power: While it is on, the tone sounds
without looking at `L` at all.

The difference shows when the inputs change during a tone:

| Started with | What sounds |
| --- | --- |
| `T` | Note, volume and timbre from the moment of the trigger — a stack that moves on does not bend the tone while it sounds |
| `P` | Always whatever is present right now — put a [Sinus](../math/sinus.md) on `N` and you have a siren |

## The timbre

The same note sounds different on a flute than on a trumpet. What makes the
difference is the shape of the trembling — the **waveform**:

| `W` | Shape | Sounds |
| --- | --- | --- |
| 0 | Square | hard and beepy, like old game consoles |
| 1 | Sine | soft and round, like a flute |
| 2 | Sawtooth | sharp and cutting, like a trumpet |
| 3 | Triangle | mild, between sine and square |

## What the block shows

At the top the trembling runs along as a curve: its shape is the timbre, its
height the volume, and the higher the note, the closer the waves stand.
Below it the speaker shows the volume through its arcs — one when quiet, all
three when loud. While something sounds, they turn blue. If `M` is on, a red
cross lies over the speaker. Underneath stand the sounding note and the
length of the tone; for a held tone it says *hold*.

## Several tones at once

One Sound block plays exactly **one** tone. For a chord you place several
next to each other and give every one its own note. They do not get in each
other's way: All tones run together through one control that damps overly
loud spots by itself.

## Playing a melody

A [Stack Input](../fixed-input/stack-input.md) is a fixed list of numbers
that come out one after another on demand — in other words, a sheet of
music. Its output `B` hands the note to `N`, its output `T` reports "read
one" and thereby triggers the tone.

Click the stack's `T` below several times: the opening bars of *Frère
Jacques* arrive note by note. With `R` you start over.

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack Input", "_id": "rom", "_x": -80, "_y": 0, "Values": "3C, 3E, 40, 3C, 3C, 3E, 40, 3C" },
		{ "_#new": "Sound", "_id": "snd", "_x": 80, "_y": 0 }
	],
	"conAll": [
		{ "s": "rom_out_B", "e": "snd_in_N" },
		{ "s": "rom_out_T", "e": "snd_in_T" }
	]
}
```

In the editor you hang a [Clock](../signal/clock.md) on the stack's `T`
instead of your clicks — then the melody runs by itself in time. For a
**rest** you take a second Stack Input holding the lengths and put it on
`L`: a 0 there means that nothing sounds at that spot.

## Usage ideas

**Giving feedback**: Put any event of your circuit on `T` — a key press, a
counter reading, the end of a process. Now the circuit confirms itself
audibly.

**Raising an alarm**: A condition that must not occur, put on `P` — and it
honks until the fault is gone.

**Chaining tones**: The output `O` tells whether something is sounding right
now. Through a [Pulse](../logic/pulse.md) on its falling edge you start the
next tone exactly when the previous one has ended.

**Hearing what the circuit computes**: Put a [Counter8](../memory/counter8.md)
on `N` — counting turns into a scale climbing upwards.

## A whole octave in numbers

| Note | Number | Note | Number |
| --- | --- | --- | --- |
| C4 | 60 | F#4 | 66 |
| C#4 | 61 | G4 | 67 |
| D4 | 62 | G#4 | 68 |
| D#4 | 63 | A4 | 69 |
| E4 | 64 | A#4 | 70 |
| F4 | 65 | B4 | 71 |

The next octave starts at 72, the previous one at 48 — always 12 more or 12
less.

## See also

[Stack Input](../fixed-input/stack-input.md) · [Clock](../signal/clock.md) ·
[Edges and Clock](../../grundlagen/flanken-und-takt.md) ·
[Sinus](../math/sinus.md) · [Bits and Bytes](../../grundlagen/bits-und-bytes.md)
