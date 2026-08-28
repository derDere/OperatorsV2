# Scale

[Operator Reference](../index.md) · Category: **Math**

Scale is the **volume knob for numbers**: It passes on only a part of the
number at `B1`. How big that part is, you decide with `B2`. The
calculation is `B1 × (B2 ÷ 255)`: 255 means all of it, 128 means roughly
half, 0 means none of it.

So Scale can only make things smaller — the result never grows bigger
than `B1` itself. It therefore always stays below 256, and the second
pair of outputs, `O`/`ON`, stays at 0 and off here.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The number a part is taken from |
| `B2` | Input | Byte | The share: 0 = none, 128 = roughly half, 255 = all of it |
| `R` | Output | Byte | The result (rounded) |
| `RN` | Output | Bit | On when the result would be below zero — never here |
| `O` | Output | Byte | Second result output for numbers above 255 — always 0 here |
| `ON` | Output | Bit | Belongs to `O` and also stays off here |

## Try it

Set `B1` to 200 and play with `B2`: At 128 roughly half comes out
(so around 100), at 255 the full 200:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Scale", "_id": "scale1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Volume/brightness**: A [Slider](../user-input/slider.md) on `B2`
  lets you dial a signal smoothly from none to all — for instance how
  loud a tone is or how bright a lamp shines, say for a
  [Sinus](sinus.md) wave.
- **Fading in gently**: A slowly rising
  [Counter8](../memory/counter8.md) on `B2` lets a value grow softly
  from 0 up to full.
- **Converting ranges**: Want a reading of 0 to 255 to show only 0 to
  100? Fix `B2` at 100. Scale then takes about 39 hundredths of every
  number, and 255 turns into 100.

## See also

[Multiply](multiply.md) · [Divide](divide.md) ·
[Slider](../user-input/slider.md)
