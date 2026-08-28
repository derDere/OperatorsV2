# Comment

[Operator Reference](../index.md) · Category: **Organisation**

The Comment is the **sticky note** of the canvas: a yellow box with
text you choose freely. It computes nothing and has no pins — the
circuit runs exactly the same whether the note is there or not. It
exists for the people who read the circuit. You write the text in the
Properties window, field **Comment**; `\n` inserts a line break there,
and the font size can be adjusted. The note automatically resizes
itself to fit the text.

## Pins

None — a Comment only explains; it has nothing to compute.

## Try it

```operatorsv2
{
	"opAll": [
		{ "_#new": "Comment", "_id": "note1", "_x": 0, "_y": 0, "Comment": "Remember:\\nYellow notes explain\\nthe circuit!", "Font Size": 14 }
	],
	"conAll": []
}
```

## Usage ideas

- **Labeling circuit sections**: “Seconds are counted here”, “input area”,
  “under construction!” — whoever reopens the circuit after weeks or passes
  it on finds their way at once.
- **Operating instructions**: Note right next to switches and dials what
  they do.
- **Value cheat sheets**: Character codes (which number stands for
  which character), channel names, or which number in the
  [Register](../memory/register.md) means what — everything you would
  otherwise look up constantly while building.

## See also

[Label](label.md) (caption for the panel area) ·
[Anchor](anchor.md) (finding places again)
