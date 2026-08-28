# Modulo

[Operator Reference](../index.md) · Category: **Math**

Modulo tells you the **remainder of a division**: `B1 mod B2`. So
`13 mod 4` gives 1 — exactly the part that [Divide](divide.md) drops when
it rounds down.

That keeps numbers inside a fixed circle: just like the hand of a clock,
which starts over at 1 after 12. If you keep counting up with `B2` = 5
(0, 1, 2, 3, 4, 5, 6, 7 …), `R` keeps starting over from the front:
0, 1, 2, 3, 4, 0, 1, 2 …

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B1` | Input | Byte | The number being divided |
| `B2` | Input | Byte | The number it is divided by |
| `R` | Output | Byte | The remainder left over from the division |
| `RN` | Output | Bit | On when the result would be below zero — never when dividing two bytes |
| `O` | Output | Byte | Second result output for numbers above 255 — always 0 here |
| `ON` | Output | Bit | Belongs to `O` and also stays off here |

The remainder of dividing by 0 is simply 0.

## Try it

Set `B2` to 10 and slowly turn `B1` up: The remainder keeps cycling
through 0 to 9 — just like the clock, again:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Modulo", "_id": "mod1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Even or odd?** `B2` = 2: The remainder is 0 for even numbers and 1
  for odd ones (4 mod 2 = 0, but 5 mod 2 = 1) — a ready-made even/odd
  detector.
- **Does it divide evenly?** If the remainder is 0, the division came
  out with nothing left over. An [Equals](equals.md) checking against
  0 turns that into a yes/no bit.
- **Running in circles**: An ever-growing count mod n cycles endlessly
  through 0 to n−1 — for chasing lights, for animations, or to make a
  [Counter8](../memory/counter8.md) start back at 0 earlier than it
  normally would.
- **Splitting off digits**: `37 mod 10` gives 7, the last digit of 37.
  Everything before it comes from [Divide](divide.md) — or straight
  from the [Base Converter](../converter/base-converter.md).

## See also

[Divide](divide.md) · [Equals](equals.md) ·
[Base Converter](../converter/base-converter.md)
