# Text Input

[Operator Reference](../index.md) · Category: **User Input**

Text Input is the **keyboard** of the circuit: On the panel area to the
left of the editor it comes with a real input field. Whatever you type
there is instantly translated into numbers: every letter has a fixed
number — the capital A, for example, is 65. That number for one
character is called its **character code**, and the whole numbered list
behind it is called **ASCII** (more on this under
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)).

As soon as `P` (power) is on, the block puts the character codes — one
per tick — in order into a **queue**: what comes out first is always
whatever has been waiting longest, as in a line at the checkout (see
[Stack and Queue](../../grundlagen/stapel-und-warteschlange.md)). The
circuit then fetches the characters at its own pace: whenever `F` (flush)
switches from off to on — that moment is called a **rising edge** (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)) —, the next
waiting character appears on `B`.

The number on the block shows how many characters are still waiting.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `P` | Input | Bit | Power: while on, one typed character per tick moves from the field into the queue |
| `F` | Input | Bit | Flush — rising edge: outputs the oldest character on `B` |
| `C` | Input | Bit | Empties the queue while on |
| `B` | Output | Byte | The character code of the last output character |
| `T` | Output | Bit | On for one tick when a character was just output |
| `N` | Output | Bit | On for one tick when Enter was pressed in the input field |
| `W` | Output | Bit | On while unread text is still waiting in the input field |
| `E` | Output | Bit | On while the queue is empty |

## Try it

This is what the block looks like. The input field itself belongs to the
editor's panel area — type there; in this demo the queue therefore stays
empty:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Text Input", "_id": "txt1", "_x": 0, "_y": 0 },
		{ "_#new": "Value", "_id": "aus", "_x": -160, "_y": 100 }
	],
	"conAll": [
		{ "s": "aus_out_V", "e": "txt1_in_P" }
	]
}
```

(The VALUE block keeps the power input firmly off.)

## Usage ideas

- **Typewriter**: `B` and `T` straight onto the `B` and `W` inputs of the
  [Terminal Display](../display/terminal-display.md), a
  [Clock](../signal/clock.md) on `F` — the typed text appears on the
  screen character by character.
- **Recognizing commands**: Compare character codes with
  [Equals](../math/equals.md) — “when an `A` (code 65) arrives, switch the
  lamp on”. Enter is conveniently detected on the `N` output.
- **Chat over the network**: Send typed characters via
  [Network Sender](../network/network-sender.md) and write them onto a
  terminal in another browser session.
- **Tip**: A start text can be stored in the Properties — the circuit then
  has “typed input” to process right after loading.

## See also

[Terminal Display](../display/terminal-display.md) ·
[Stack](../memory/stack.md) · [File Input](file-input.md) ·
[Stack and Queue](../../grundlagen/stapel-und-warteschlange.md)
