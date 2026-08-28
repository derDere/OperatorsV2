# Divide

[Operator Reference](../index.md) · Category: **Math**

Divide is the **division sign**: It computes `B1 ÷ B2`.

The wires here only carry whole numbers. So Divide always rounds its
result down: `13 ÷ 4` gives 3, the decimal places drop away. What is left
over from the division is shown by the partner block [Modulo](modulo.md).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The number being divided |
| `B2` | Input | Byte | The number it is divided by |
| `R` | Output | Byte | The result, rounded down to a whole number |
| `RN` | Output | Bit | On when the result would be below zero — never when dividing two bytes |
| `O` | Output | Byte | Second result output for numbers above 255 — always 0 here |
| `ON` | Output | Bit | Belongs to `O` and also stays off here |

Dividing by 0 simply gives 0 — the circuit keeps running completely
normally, with no error message.

## Try it

```operatorsv2
{
	"opAll": [
		{ "_#new": "Divide", "_id": "div1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Making numbers smaller**: A fixed number on `B2` shrinks every
  signal by the same amount — e.g. ÷ 2 to halve every number (100
  becomes 50, 51 becomes 25).
- **Pulling out digits**: `37 ÷ 10` gives 3 — everything before the
  last digit. The last digit itself (here: 7) comes from `37 mod 10`.
  This split is done ready-made by the
  [Base Converter](../converter/base-converter.md).
- **Grouping**: Count 0, 1, 2, 3, 4, 5, 6, 7, 8 and divide each number
  by 3, and you get 0, 0, 0, 1, 1, 1, 2, 2, 2 — the group number. That
  lets you, for example, advance something every three steps.

## See also

[Modulo](modulo.md) · [Multiply](multiply.md) ·
[Base Converter](../converter/base-converter.md)
