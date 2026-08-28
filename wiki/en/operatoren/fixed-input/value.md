# Value

[Operator Reference](../index.md) · Category: **Fixed Input**

Value is a block for **a single, fixed value** — like a house number on
a door: it stays put and never changes by itself. Such an unchanging
value is called a **constant**. It is set once in the Properties window,
and from then on the block delivers it again on every tick: either as an
on/off value (setting **binary** on) or as a number 0–255 (**binary**
off, number in the **value** field).

The block displays its value clearly: the number large, below it the short
form (ON/OFF or hex code) and the corresponding character.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `V` | Output | Bit or Byte | The configured value — kind depends on the binary setting |

## Try it

Two Values with different settings — a fixed on/off value on the left, a
fixed number on the right (the boxes on the right show both outputs):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Value", "_id": "valBit", "_x": -100, "_y": 0, "binary": true, "value": 1 },
		{ "_#new": "Value", "_id": "valByte", "_x": 100, "_y": 0, "binary": false, "value": 42 }
	],
	"conAll": []
}
```

## Usage ideas

- **Fixed comparison and computation values**: The 6 for the die
  ([Modulo](../math/modulo.md)), the 48 to turn a digit into its
  character code ([Add](../math/add.md), see
  [Text Input](../user-input/text-input.md)), the setpoint for
  [Equals](../math/equals.md).
- **Permanently on**: A binary Value set to on is the “always powered”
  line — e.g. for the power input of a [Clock](../signal/clock.md) that
  should never stop.
- **Keeping things quiet**: A Value set to off/0 keeps unused inputs
  firmly at rest — many demos in this wiki use exactly this trick.
- If the value should be **adjustable**, reach for the
  [Slider](../user-input/slider.md) or [Switch](../user-input/switch.md).

## See also

[Stack Input](stack-input.md) · [Slider](../user-input/slider.md) ·
[Switch](../user-input/switch.md)
