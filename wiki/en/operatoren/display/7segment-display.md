# 7 Segment Display

[Operator Reference](../index.md) · Category: **Display**

The 7 segment display is the classic **digit display** you know from
alarm clocks or microwaves: blocky digits made up of seven individual
light bars — the **segments** — plus a dot for the decimal point. Every
segment has its own input. The display works nothing out on its own, it
lights up exactly where you tell it to. Which segments must light up for
which digit is worked out by the
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md).

On the panel area to the left of the editor the display appears large, in
retro style.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `S1` | Input | Bit | Top bar |
| `S2` | Input | Bit | Top left bar |
| `S3` | Input | Bit | Top right bar |
| `S4` | Input | Bit | Middle bar |
| `S5` | Input | Bit | Bottom left bar |
| `S6` | Input | Bit | Bottom right bar |
| `S7` | Input | Bit | Bottom bar |
| `D` | Input | Bit | The dot |

## Try it

Paint digits yourself: For a 7 you need `S1`, `S3` and `S6` — for a 4 the
segments `S2`, `S4`, `S3` and `S6`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "7 Segment Display", "_id": "seg1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Showing numbers**: Almost always the
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) sits in
  front — it automatically turns four bits into the right digit (0–9 and
  A–F).
- **Multi-digit readouts**: One display plus decoder per digit; the
  individual digits come from the
  [Base Converter](../converter/base-converter.md). The *clock* example
  (📚 Examples menu in the editor) builds a complete four-digit digital
  clock this way.
- **Custom symbols**: Since every segment is individually controllable,
  letter approximations and gimmicks work too — a rotating bar as a
  “loading indicator” only needs a [counter](../memory/counter4.md) and a
  bit of logic.

## See also

[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) ·
[Byte](byte.md) · [Lamp](lamp.md)
