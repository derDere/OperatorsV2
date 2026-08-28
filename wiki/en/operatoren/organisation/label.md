# Label

[Operator Reference](../index.md) · Category: **Organisation**

The Label is the **caption for the panel area**: While the
[Comment](comment.md) sticks to the canvas, the Label appears as text
between the switches and dials on the right — for example as a heading
above a group of controls, as a unit next to a number (say “cm” or
“°C”), or simply as a divider line between two areas. You choose the
font, size and colors freely; add a link in the **Href** field as well,
and the text becomes clickable — a click opens that link in a new tab.

On the canvas itself the Label deliberately appears pale — it computes
nothing, it only shows text.

## Pins

None — the Label only shows text. Like all panel blocks its position is
set via `col`/`row` in the Properties (see
[Editor Controls](../../grundlagen/steuerung.md)).

## Try it

```operatorsv2
{
	"opAll": [
		{ "_#new": "Label", "_id": "label1", "_x": 0, "_y": 0, "Text": "Control desk" }
	],
	"conAll": []
}
```

(The formatted text itself appears on the editor's panel area — the block
here shows a preview of the caption.)

## Usage ideas

- **Labeling control desks**: Above every group of
  [switches](../user-input/switch.md), [sliders](../user-input/slider.md)
  and [lamps](../display/lamp.md) a label says what it does.
- **Display decoration**: In the *clock* example (📚 Examples menu in
  the editor) the blinking colon between the digits is simply a Label
  set to a large font size.
- **Embedding links**: Via **Href** a label can point to the matching wiki
  page of your circuit or a project page.

## See also

[Comment](comment.md) · [Byte](../display/byte.md) ·
[Editor Controls](../../grundlagen/steuerung.md)
