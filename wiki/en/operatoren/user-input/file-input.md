# File Input

[Operator Reference](../index.md) · Category: **User Input**

File Input opens the circuit's door to **real files**: On the panel area
to the left of the editor it comes with a “choose file” field. The
uploaded file then sits ready as a long chain of bytes — because in the
end, every file is nothing but a sequence of bytes (see
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)). Every time `T`
switches from off to on — that moment is called a **rising edge** (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)) —, the block
reads the next byte.

The number on the block shows how many bytes are still unread.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `T` | Input | Bit | Rising edge: reads the next byte of the file |
| `R` | Input | Bit | Rising edge: jumps back to the start of the file |
| `C` | Input | Bit | Rising edge: discards the file |
| `B` | Output | Byte | The byte read last |
| `T` | Output | Bit | On for one tick when a byte was just read |
| `E` | Output | Bit | On when all bytes are read (or no file is present) |
| `N` | Output | Bit | On for one tick when a new file was uploaded |

## Try it

This is what the block looks like. The upload field belongs to the
editor's panel area — without a file, `E` stays permanently on here:

```operatorsv2
{
	"opAll": [
		{ "_#new": "File Input", "_id": "file1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Inspecting a file**: A [Clock](../signal/clock.md) on `T`, the bytes
  onto a [Byte](../display/byte.md) display or as characters onto the
  [Terminal Display](../display/terminal-display.md) — the circuit
  visibly “reads the file aloud”. The *mini_pc_sim* example in the
  editor's 📚 Examples menu even drives a little computer this way.
- **Copying a file**: Pump File Input byte by byte into a
  [File Output](../user-output/file-output.md) (`T` output here to `T`
  input there) — in the end the same file is ready for download. If you
  like, transform the bytes along the way — say with
  [Xor](../logic/xor.md) in bitwise mode as a simple cipher.
- **Data as a program**: Your own files as playlists, melodies or
  command sequences — the file then acts like a **ROM**: a fixed
  memory the circuit can only read from. `R` rewinds to the start.

## See also

[File Output](../user-output/file-output.md) ·
[Stack Input](../fixed-input/stack-input.md) ·
[Terminal Display](../display/terminal-display.md)
