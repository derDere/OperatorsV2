# Subtract

[Operator Reference](../index.md) · Category: **Math**

Subtract is the minus sign: It computes `B1 − B2`.

If `B2` is bigger than `B1`, the result would be below zero — it would be
a **negative number**. The wires here, though, only carry the numbers 0 to
255. So the block puts out the distance between the two numbers, that is
the result without the minus in front of it — that is called the
**absolute value** — and reports through the output `RN` that it went
below zero.

That very output makes Subtract double as a **comparator**: It tells you
which of two numbers is the bigger one.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The number taken away from |
| `B2` | Input | Byte | The number being taken away |
| `R` | Output | Byte | The distance between the two numbers |
| `RN` | Output | Bit | On when `B2` is bigger than `B1` |
| `O` | Output | Byte | Second result output for numbers above 255 — always 0 when subtracting |
| `ON` | Output | Bit | Belongs to `O` and also stays off when subtracting |

## Try it

Set `B1` and `B2` and watch `R` and `RN`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Subtract", "_id": "sub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

**Who has more?** Subtract answers three questions at once:

| Reading | Meaning |
| --- | --- |
| `RN` on | `B2` is bigger than `B1` |
| `RN` off and `R` bigger than 0 | `B1` is bigger than `B2` |
| `R` = 0 | Both are the same |

An “is bigger than” checker is therefore simply a Subtract of which you
only use `RN`. For the pure question “same or not?” there is
[Equals](equals.md).

**Measuring distance**: `R` tells you how far apart two numbers are — no
matter which of them is bigger. 9 and 6 are 3 apart, and so are 6 and 9.
You can use that to check whether a number is close enough to a target
number: first work out the distance with one Subtract, then use a second
Subtract to see whether that distance is small enough.

**Counting down**: Put a fixed number on `B2` and Subtract becomes an
“always 1 less” block (or 2 less, 5 less …). Together with a
[Memory (1 byte)](../memory/memory-1byte.md) this makes a countdown: the
memory remembers the number, Subtract takes some away, and the result
travels back into the memory.

## See also

[Add](add.md) · [Equals](equals.md) ·
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md) ·
[Values and Signals](../../grundlagen/werte-und-signale.md)
