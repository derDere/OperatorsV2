# Stack Input

[Operator Reference](../index.md) · Category: **Fixed Input**

Stack Input is the **playback tape**: a hard-wired list of bytes the
circuit can retrieve one after another — like a tape that always plays
the same song in the same order. Every time the `T` input switches from
off to on — that moment is called a **rising edge** (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)) —, the block
outputs the next value.

The list itself is entered in the Properties window as comma-separated
**hex codes** (see [Bits and Bytes](../../grundlagen/bits-und-bytes.md)),
for example `48, 61, 6C, 6C, 6F` — those are the numbers for the letters
of “Hallo”. Every letter has such a fixed number, its **character code**
(more on this at [Text Input](../user-input/text-input.md)).

The block reads “ROM” — the technical term for a fixed memory that can
only be read from — and shows the number of values not yet read.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `T` | Input | Bit | Rising edge: reads the next value |
| `R` | Input | Bit | Rising edge: rewinds to the start |
| `B` | Output | Byte | The value read last |
| `T` | Output | Bit | On for one tick when a value was just read |
| `E` | Output | Bit | On when all values have been read |

## Try it

This demo carries the list `48, 61, 6C, 6C, 6F` (“Hallo”). Switch `T` on
and off several times — the codes appear on `B` one after another. At the
end `E` turns on; `R` rewinds:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack Input", "_id": "rom1", "_x": 0, "_y": 0, "Values": "48, 61, 6C, 6C, 6F" }
	],
	"conAll": []
}
```

## Usage ideas

- **Playing back text**: Store character codes and write them onto the
  [Terminal Display](../display/terminal-display.md) at
  [Clock](../signal/clock.md) pace — the circuit types by itself.
- **Melodies and patterns**: Any number sequence — blink patterns,
  positions for the [Line Display](../display/line-display.md), fixed
  setpoints — plays on demand or in rhythm. Connect `E` to `R` and the
  tape keeps rewinding itself — an endless loop.
- **Program ROM**: In the *mini_pc_sim* example (📚 Examples menu in the
  editor) the “program” of a mini computer is stored this way.
- For lists the circuit should **fill itself**, take the
  [Stack](../memory/stack.md); for content from real files the
  [File Input](../user-input/file-input.md).

## See also

[Stack](../memory/stack.md) · [Register](../memory/register.md) ·
[File Input](../user-input/file-input.md) · [Value](value.md)
