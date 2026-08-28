# Negative Numbers and Overflow

Back to the [start page](../index.md).

Through the wires in OperatorsV2 flow only the whole numbers **0 to 255** —
no decimal point, no minus in front. Why 255 of all numbers is the limit is
explained on [Bits and Bytes](bits-und-bytes.md). You may still calculate
freely, and a result quickly lands outside that row: below 0 or above 255.
This page shows what happens then.

## Below zero: negative numbers

Take 5 away from 3 and the result lies below zero. You know such numbers
from the thermometer in winter: −2 degrees sits below the zero. They are
called **negative numbers**, written with a minus in front.

A number like that does not fit into a wire. So the block does two things:

- It outputs the result **without the minus in front**, here 2. That number
  is called the **absolute value**. It only tells you **how far** the
  result is away from zero, no longer on which side.
- It reports through a pin of its own that the result went below zero. On
  [Subtract](../operatoren/math/subtract.md) that pin is called `RN`.

So nothing is lost, the information simply sits in two pins instead of one.
And because `RN` turns on exactly when the second number was larger than
the first, you can use it to compare two numbers.

## Past 255: the overflow

Add 200 and 100 together and out comes 300 — more than a wire can carry.
Picture a cup that is full: whatever comes on top runs into a second cup
next to it. That is exactly how [Add](../operatoren/math/add.md) works. The
excess is called the **overflow**.

Output `R` shows what stays in the first cup, output `O` counts how often
it ran over. With 200 + 100, `O` therefore reads 1 and `R` reads 45.

Counting blocks do it differently: they tip nothing into a second cup, but
start again at 0 — like the odometer of a car that jumps to zero after the
highest number and keeps counting. The
[Counter8](../operatoren/memory/counter8.md) reports that through a pin of
its own too.

## The carry: calculating on with the overflow

When you do arithmetic on paper, you write a small note under the next
place and count it in there. That note is called the **carry** — and the
overflow pin `O` is exactly that.

Feed `O` into a second Add block and it counts the note in. That is how
arithmetic units are built that count far past 255, even though every
single wire ends at 255.

## Try it

Subtract calculates `B1 − B2`. Set `B1` to 3 and `B2` to 5: the result
would lie below zero, so `R` shows the absolute value 2 and `RN` turns on.
Turn it around — `B1` to 5 and `B2` to 3 — and `R` shows 2 again, but `RN`
stays off:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Subtract", "_id": "sub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Read on

- [Bits and Bytes](bits-und-bytes.md) — why it stops at 0 and 255
- [Subtract](../operatoren/math/subtract.md) — the block from the demo
- [Add](../operatoren/math/add.md) — overflow and carry when adding up
- [Counter8](../operatoren/memory/counter8.md) — the counting unit that
  starts over at 255
