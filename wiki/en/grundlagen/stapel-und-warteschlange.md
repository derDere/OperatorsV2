# Stack and Queue

Back to the [start page](../index.md).

Sometimes a circuit is not meant to hold on to a single number, but to many
of them one after another — and to hand them back later. That raises a
question: **in which order do the numbers come back out?** There are two
answers, and both have a name.

## The stack: last in, first out

Think of a stack of plates in the cupboard. You put every new plate on top,
and when you need one, you take the top one as well. So the plate you put
down last is the first one back in your hand. The bottom one has been lying
there longest and gets its turn last.

That order is called **LIFO**, short for “last in, first out”. And the
collection itself is called a **stack**.

## The queue: first in, first out

At the checkout it is the other way around. Whoever lined up first goes
first; whoever arrives later joins at the back. So new arrivals join at the
back, and it is the front that is served.

That order is called **FIFO**, short for “first in, first out”. The
collection itself is called a **queue**.

## Which order do you use for what?

Both are right, it depends on the task:

| Order | Fits when … | Example |
| --- | --- | --- |
| **LIFO** (stack) | the newest is needed first | “Undo”: the last change is the first one taken back |
| **FIFO** (queue) | everything is worked through in order | Characters of a text: the first one typed appears first |

A queue is also the balance between fast and slow: if one part of your
circuit produces values faster than another part can handle them, the queue
collects them until the slow part has time.

## Try it

The [Stack](../operatoren/memory/stack.md) can do both — it keeps numbers
and hands them back in one order or the other, as you wish. Put down 10, 20
and 30 one after another: set `V` to the value and switch `T` on and off
again. Then fetch the numbers back with `P` — they come out backwards (30,
20, 10), like the stack of plates. Put them down again and use `F` instead
— now they come out in the order you put them down, like at the checkout:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack", "_id": "stack1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Read on

- [Stack](../operatoren/memory/stack.md) — the block from the demo, with
  every pin explained
- [Stack Input](../operatoren/fixed-input/stack-input.md) — a fixed list of
  numbers that you write down yourself
- [Edges and Clock](flanken-und-takt.md) — why putting down and fetching
  happen in the moment of switching on
