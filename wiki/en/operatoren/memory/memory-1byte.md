# Memory (1 byte)

[Operator Reference](../index.md) · Category: **Memory**

The number version of [Memory (1 bit)](memory-1bit.md): this block stores
a whole **number** (a byte). Right at the moment the trigger `T` flips
from off to on — that is the **rising edge**
([Edges and Clock](../../grundlagen/flanken-und-takt.md)) — it takes a
photo of the number at `B`. If the number at the input changes
afterwards, the output stays put until you trigger again.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The number stored when triggered |
| `T` | Input | Bit | Trigger: stores on a rising edge |
| `B` | Output | Byte | The stored number |

## Try it

Set a number on the left and trigger with `T` — the output takes it over.
Change the number afterwards: the output stays put until you trigger
again:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 byte)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Capturing a dice roll**: [Random](../math/random.md) keeps delivering
  a new random number. Freeze that stream with `T` at the right moment
  and you have a single roll — the Random page shows this duo in a demo
  of its own.
- **A value only counts once you press the button**: A
  [Slider](../user-input/slider.md) keeps delivering whatever value you
  are currently setting. Only the “apply”
  [Button](../user-input/button.md) on `T` makes it binding.
- **The output feeds itself**: Route the output into an
  [Add](../math/add.md) and the result back into the input — that makes
  a loop, which is called **feedback**. Every trigger adds another amount
  on top: running totals, steadily rising number sequences (**ramps**),
  and custom counters with any step size.
- **Comparing the stored value with the current one**: Hold the copy
  against the value currently sitting at the input using
  [Equals](../math/equals.md). That tells you whether anything has
  changed since the last trigger.

## See also

[Memory (1 bit)](memory-1bit.md) · [Register](register.md) ·
[Counter8](counter8.md)
