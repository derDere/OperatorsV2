# File Output

[Operator Reference](../index.md) · Category: **User Output**

File Output is the **file writer**: It collects byte by byte whatever
the circuit hands it — and offers the collection as a **download link**
on the panel area to the left of the editor. Every time `T` switches
from off to on — that moment is called a **rising edge** (see
[Edges and Clock](../../grundlagen/flanken-und-takt.md)) —, the block
appends the current value of `V` to the file. File name and file type
are set in the Properties; the link is grayed out while nothing has
been collected or writing is still in progress.

The number on the block shows how many bytes have been collected so far.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `V` | Input | Byte | The value being appended |
| `T` | Input | Bit | Rising edge: appends `V` to the file |
| `C` | Input | Bit | Rising edge: discards everything collected |

## Try it

Set a value on `V` and switch `T` on and off — the counter on the block
grows with every switch-on moment (the download link belongs to the
editor's panel area):

```operatorsv2
{
	"opAll": [
		{ "_#new": "File Output", "_id": "file1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Logging results**: Measurements, counts or generated patterns end up
  as a real file on your computer.
- **Producing text**: Collect character codes (every letter has such a
  fixed number, more on this at
  [Text Input](../user-input/text-input.md)), set a file name ending
  in `.txt`: done is the self-written text file.
- **Transforming files**: [File Input](../user-input/file-input.md) reads,
  the circuit changes every byte (e.g. [Xor](../logic/xor.md) encryption,
  filters, reordering), File Output writes the result — a complete file
  processing machine without a single line of program code.

## See also

[File Input](../user-input/file-input.md) · [Stack](../memory/stack.md) ·
[Byte](../display/byte.md)
