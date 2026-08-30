# Byte

[Operator Reference](../index.md) · Category: **Display**

The Byte display is the **number readout** of the circuit: It shows the
number at its input — in whichever notation you pick. One and the same
number can be written down in several ways: as our usual number, as a
plain string of zeros and ones, as a short **hex code** made of digits
and letters (explained in full on
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)) — and even as a
character, because every letter has a fixed number; that assignment is
called **ASCII**. On the panel area to the left of the editor the value
appears large and can be styled (font, size, colors); which notations are
shown at once is picked in the Properties with checkboxes.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The value being displayed |

## Try it

Set a number on the left — the block shows it as a hex code and below as a
character (try 65, the `A`):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte", "_id": "byte1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## The notations

| Setting | Example for value 65 |
| --- | --- |
| Show Bin — binary, only zeros and ones | `0b01000001` |
| Show Oct — octal, counts only up to 7 before a new digit starts | `0o101` |
| Show Dec — decimal, our usual number | `0d065` |
| Show Hex — the hex code from above | `0x41` |
| Show Char — the ASCII character from above | `'A'c` |

The prefixes (`0b`, `0x` …) and leading zeros can be turned off (“Advanced
Display” and “Show Leading Zeros”), the separator between several notations
is freely selectable.

## Usage ideas

- **Seeing what actually flows**: While building, hang a Byte display on
  every interesting byte line — you instantly see the number passing
  through.
- **Learning tool**: Show Bin, Dec and Hex at the same time and watch live
  how the same number looks in every notation — the hands-on companion to
  [Bits and Bytes](../../grundlagen/bits-und-bytes.md).
- **Polished readouts**: With font size and colors this turns into a
  designed display on the panel area — in the *clock* example
  (📚 Examples menu) such a display shows the seconds.

## See also

[Lamp](lamp.md) · [7 Segment Display](7segment-display.md) ·
[Bits and Bytes](../../grundlagen/bits-und-bytes.md)
