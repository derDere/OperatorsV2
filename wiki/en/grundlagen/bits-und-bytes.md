# Bits and Bytes

Back to the [start page](../index.md).

Deep inside, a computer is made of nothing but tiny switches. Every single
one of them can do just two things: **on** or **off**. So how do you get
from there to numbers, letters and whole programs? With one simple trick,
which you learn on this page — and can try out right here.

## The bit: a single switch

A **bit** is the smallest thing a computer can hold on to: a single switch
that is on or off. With one bit you can tell exactly two things apart — yes
or no, bright or dark, 1 or 0. For a number like 36 one switch is not
enough. That takes several of them.

## The byte: eight switches side by side

Put **eight bits** together and you get a **byte**. For that group of eight
to stand for numbers, there is an agreement: **every switch is given a
fixed number value.**

The first switch is worth 1. The next one is worth twice as much, so 2. The
one after that is again worth twice as much, so 4. And on it goes, always
doubling:

1 → 2 → 4 → 8 → 16 → 32 → 64 → 128

That is eight numbers, one for each switch. To find out which number a byte
currently stands for, add up the values of all switches that are **on**.
The switched-off ones do not count.

The switches are numbered from right to left, starting at zero:

| Switch | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Let us work through one pattern: bit 5 and bit 2 are on, all the others are
off. Bit 5 is worth 32, bit 2 is worth 4 — together 32 + 4 = **36**. So
this byte stands for the number 36.

More examples:

- Only bit 0 on → **1**
- Bit 1 and bit 0 on → 2 + 1 = **3**
- Bit 4, bit 3 and bit 1 on → 16 + 8 + 2 = **26**
- All eight on → 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = **255**

That last line answers a question that comes up all over this wiki: **why
does it stop at 255?** Because there is nothing more to add. With all eight
switches on, all eight values have been counted — and there is no ninth
switch. At the other end it stops at **0**: all switches off. So a byte
covers exactly the numbers 0 to 255 — exactly the numbers that flow through
the wires in OperatorsV2. What happens to a calculation that runs past this
limit or would drop below zero is shown on
[Negative Numbers and Overflow](negative-zahlen-und-ueberlauf.md).

Counting with nothing but on-and-off switches has a name of its own, by the
way: it is called **binary**, because there are only two possibilities per
switch.

Try it: This block assembles a byte from eight individual bits. Switch on
bit 5 and bit 2, for example — the 36 appears on the right, shown as `24`.
What that notation means is cleared up in the next section:

```operatorsv2
{
	"opAll": [
		{ "_#new": "8bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## The hex code: numbers in shorthand

You surely noticed on the right of the demo: the number sits in a **blue box
with two characters**, for instance `24` for 36. That is a shorthand for
bytes. It is called **hexadecimal** notation, **hex** for short.

In the counting you are used to, you have ten digits available: 0, 1, 2 and
so on up to 9. Once the 9 is used up, you start a second place and write 10.
That way of counting is called **decimal**. Hex works just the same, but has
**sixteen** digits: after the 9 it continues with letters.

| Hex digit | 0…9 | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Meaning | 0…9 | 10 | 11 | 12 | 13 | 14 | 15 |

In a two-digit number like 36, the left place always counts ten: three tens
and six ones. In a two-digit hex code, the left place counts **sixteen**:

- `24` means: two times 16 plus 4 — that makes **36**
- `1E` means: one time 16 plus 14 (that is the `E`) — that makes **30**
- `FF` means: fifteen times 16 plus 15 — that makes **255**

Why the effort? Because one hex digit covers exactly **four switches**:
with four switches (values 8, 4, 2 and 1) you reach the numbers 0 to 15 —
and that is exactly how many digits hex has. The left digit therefore shows
the upper four switches of a byte, the right one the lower four. Hex is a
direct window onto the bits. For that reason the blue value boxes in the
wiki and many displays in the editor show bytes as hex codes.

## The other direction: splitting a byte into bits

Of course it also works the other way around: the eight switches can be
recovered from a number. Set a number with the slider on the left and see
on the right which bits are on for it:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 8bit decoder", "_id": "dec2", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

Set 5, for example: bit 0 (value 1) and bit 2 (value 4) turn on — because
1 + 4 = 5.

## And letters?

Text is just an agreement too: every character is given a number. For all
devices to mean the same thing by it, there has to be a list everybody
sticks to. The most widespread one is called **ASCII**. In it, 65 stands
for `A`, 66 for `B`, 97 for `a` and 48 for the digit `0`. One byte per
character — that is how the text blocks
([Text Input](../operatoren/user-input/text-input.md),
[Terminal Display](../operatoren/display/terminal-display.md)) store their
content.

## Read on

- [Values and Signals](werte-und-signale.md) — colors, ticks and edges
- [Negative Numbers and Overflow](negative-zahlen-und-ueberlauf.md) — what
  happens above and below the row of numbers
- [4bit to byte decoder](../operatoren/converter/4bit-zu-byte.md) and
  relatives — the blocks for splitting and assembling
- [Base Converter](../operatoren/converter/base-converter.md) — splitting a
  number into its single digits (for digit displays)
