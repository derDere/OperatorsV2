# Register

[Operator Reference](../index.md) · Category: **Memory**

The Register is a **chest of drawers for numbers**: 256 drawers, each
with its own number from 0 to 255 — that number is called the
**address** — and each drawer holds exactly one byte. The address input
selects the drawer, whose content appears at the output immediately.
Writing happens on command: right at the moment `W` flips from off to on
(the **rising edge**,
[Edges and Clock](../../grundlagen/flanken-und-takt.md)), the Register
puts the value of `B` into the selected drawer. That makes it a small
working memory, just like a real computer has — there it is called
**RAM**. The number on the block shows how many drawers are occupied.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `A` | Input | Byte | The address: the number of the drawer that is meant |
| `B` | Input | Byte | The value put into the drawer when writing |
| `W` | Input | Bit | On a rising edge, the value of `B` is written into drawer `A` |
| `C` | Input | Bit | On a rising edge, all drawers are emptied at once |
| `A` | Output | Byte | The currently selected address (passed through unchanged) |
| `B` | Output | Byte | The content of the selected drawer (an empty drawer shows 0) |
| `T` | Output | Bit | Flashes on once when the address or the read value changes |
| `E` | Output | Bit | On while the whole chest is empty |

## Try it

First write something in: address `A` to 1, value `B` to 42, then switch
`W` on and off again. Next, select address 2 and write 77 in. Switch `A`
back and forth between 1 and 2 — the output shows the content of the
matching drawer each time:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Register", "_id": "reg1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Playing back drawer by drawer**: A [Counter8](counter8.md) counts the
  addresses up, and the Register outputs the values stored there in that
  order — this is how melodies, patterns, or whole sequences of commands
  run step by step.
- **Lookup table**: Once filled, the Register turns every number at `A`
  into a different number at `B` — a conversion table you design
  yourself.
- **Memory for a small computer**: Together with
  [Stack Input](../fixed-input/stack-input.md), which supplies fixed
  commands, and a bit of logic, a mini computer emerges. The
  *mini_pc_sim* example in the editor's 📚 Examples menu shows such a
  machine.
- **Memory for a picture made of characters**: Address = position on the
  screen, value = which character sits there — that is exactly how you
  organize the content for a
  [Terminal Display](../display/terminal-display.md).

## See also

[Memory (1 byte)](memory-1byte.md) · [Stack](stack.md) ·
[Counter8](counter8.md) · [Stack Input](../fixed-input/stack-input.md)
