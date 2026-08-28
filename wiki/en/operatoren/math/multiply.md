# Multiply

[Operator Reference](../index.md) · Category: **Math**

Multiply is the **times sign**: It computes `B1 × B2`.

Multiplying makes numbers grow huge fast — up to 255 × 255 = 65,025. The
wires here, though, only carry the numbers 0 to 255. So `R` puts out only
the part that fits, and `O` counts how many times the result went past
255 — that is called the **overflow** (see
[Negative Numbers and Overflow](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
With this block `O` therefore matters a lot.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | First number |
| `B2` | Input | Byte | Second number |
| `R` | Output | Byte | The result without the part that overflowed |
| `RN` | Output | Bit | On when the result would be below zero — never when multiplying two bytes |
| `O` | Output | Byte | The overflow: how many times the result went past 255 |
| `ON` | Output | Bit | On when the overflow would be below zero as well |

## Try it

Start small first (e.g. 12 × 5), then try something big (e.g. 100 ×
100) and watch `O` grow right along with it:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Multiply", "_id": "mult1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Amplifying**: A fixed number on `B2` doubles, triples, or further
  enlarges every signal — for instance to make small counter values
  clearly visible on a display.
- **Areas and grids**: Row number × row length gives you where a row
  starts in a grid — the basic calculation when you want to address
  the [Terminal Display](../display/terminal-display.md) or the
  [Register](../memory/register.md) field by field, like a table.
- **Taking only part of a number** is what [Scale](scale.md) does: It
  divides straight back by 255, so nothing overflows.

## See also

[Divide](divide.md) · [Scale](scale.md) · [Add](add.md)
