# Stack

[Operator Reference](../index.md) · Category: **Memory**

The Stack is a **pile for numbers** — like a stack of plates: you put
values on top and take them off again later. Its specialty: you can pull
them back off in **two directions**. Take the most recently added value
first and that is called **LIFO** (“last in, first out”). Take the oldest
one first, like in a queue, and that is called **FIFO** (“first in, first
out”). Both are explained in
[Stack and Queue](../../grundlagen/stapel-und-warteschlange.md).

Each action is triggered at the moment the matching input flips from off
to on — that is the **rising edge**
([Edges and Clock](../../grundlagen/flanken-und-takt.md)). The number on
the block shows how many values are currently on the pile.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `V` | Input | Byte | The value placed on the pile |
| `T` | Input | Bit | On a rising edge, the Stack puts the value of `V` on top of the pile |
| `F` | Input | Bit | Flush: on a rising edge, the **oldest** value comes out (like a queue) |
| `P` | Input | Bit | Pop: on a rising edge, the **newest** value comes out (like a plate stack) |
| `C` | Input | Bit | On a rising edge, the Stack drops all values — it is empty afterwards |
| `K` | Input | Bit | Keep: while on, reading removes nothing — an invisible reading marker moves along instead |
| `R` | Input | Bit | On a rising edge, the reading marker (in keep mode) jumps back to the start |
| `B` | Output | Byte | The value fetched last |
| `T` | Output | Bit | Flashes on once when a value was just fetched |
| `E` | Output | Bit | On when the pile is empty — in keep mode: when everything has been read once |

## Try it

Deposit 10, 20, 30 one after another (set the value on `V`, then switch
`T` on and off again). Fetch them back with `P` — they come out backwards
(30, 20, 10). Deposit them again and use `F` — then they come out in the
order you deposited them:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack", "_id": "stack1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Queue**: Collect events and work through them in order with `F`
  afterwards — characters from a
  [Text Input](../user-input/text-input.md), say, until you have time to
  process them.
- **Undo memory**: With `P`, the most recently deposited value comes back
  first — exactly the principle behind the “undo” feature of many
  programs.
- **Replaying repeatedly**: In keep mode (`K` on) the content survives
  reading; `R` rewinds the reading marker to the start. That lets you
  replay the same content from the start as often as you like — like a
  tape you rewind without erasing it. For a **fixed**, always-the-same
  list, the [Stack Input](../fixed-input/stack-input.md) is more
  convenient.
- **Buffering messages**: Does one part of your circuit produce values
  faster than another can process them? The Stack evens that out; `E`
  reports when nothing is left.

## See also

[Stack Input](../fixed-input/stack-input.md) · [Register](register.md) ·
[File Input](../user-input/file-input.md)
