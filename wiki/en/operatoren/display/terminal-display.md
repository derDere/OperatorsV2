# Terminal Display

[Operator Reference](../index.md) · Category: **Display**

The Terminal Display is the **text screen** of the circuit: a grid of
boxes that gets written into character by character. Where the next
character lands is shown by the **cursor** — the mark that travels ahead
of you while typing into a text field. The circuit sends numbers,
because every letter is assigned a fixed number; that assignment is
called **ASCII** (see
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)). The terminal
writes the matching letter at the cursor position and moves on. The
actual screen appears on the panel area to the right of the editor,
styled like a flip display, the kind you see on departure boards at
train stations: new characters visibly flip into place. Width and height
of the grid are set in the Properties.

A few numbers act not like letters but like small commands — they are
called **control characters**: **10** jumps to the start of the next
line, **13** to the start of the current line, **9** indents like a tab
key, **0** skips a box. Three of the inputs (`W`, `S`, `G`) each trigger
on a **rising edge** — the moment the input switches from off to on
(explained in full on
[Edges and Clock](../../grundlagen/flanken-und-takt.md)).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The character code to be written |
| `W` | Input | Bit | Write — rising edge: writes the character and advances the cursor |
| `S` | Input | Bit | Set — rising edge: writes without moving the cursor |
| `X` / `Y` | Input | Byte | Target column/row for the jump |
| `G` | Input | Bit | Goto — rising edge: moves the cursor to `X`/`Y` |
| `C` | Input | Bit | Clear: wipes the screen and homes the cursor while on |
| `B` | Output | Byte | The character code under the cursor |
| `X` / `Y` | Output | Byte | The current cursor position |
| `T` | Output | Bit | On for one tick when cursor or character under it changed |
| `E` | Output | Bit | On while the whole screen is empty |

## Try it

The screen itself belongs to the editor's panel area — but the block shows
cursor position and characters live. Set `B` to 72 (the `H`) and switch
`W` on and off: “In” shows your character, the cursor moves on. With `X`,
`Y` and `G` you jump around freely:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Terminal Display", "_id": "term1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Self-writing texts**: A
  [Stack Input](../fixed-input/stack-input.md) with character codes, a
  [Clock](../signal/clock.md) as the beat on its `T` and on `W` — the
  circuit types its message character by character.
- **Keyboard echo**: [Text Input](../user-input/text-input.md) delivers
  typed characters as character codes — written straight onto the
  terminal you get a little typewriter; via the
  [network](../network/network-sender.md) even a chat.
- **Positioned output**: With `G`, `X`, `Y` you can build displays that
  update values at fixed places — tables, playing fields, status lines.
  The *mini_pc_sim* example (📚 Examples menu) uses the terminal as the
  screen of a mini computer.
- **Reading instead of writing**: The `B` output delivers the character
  under the cursor — the circuit can scan its own screen.

## See also

[Text Input](../user-input/text-input.md) ·
[Stack Input](../fixed-input/stack-input.md) · [Line Display](line-display.md)
