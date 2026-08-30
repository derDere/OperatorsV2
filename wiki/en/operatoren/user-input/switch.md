# Switch

[Operator Reference](../index.md) · Category: **User Input**

The Switch is the **light switch** of the circuit: One click turns it on,
the next one off again. It is the simplest way to produce an on/off signal
by hand.

The Switch lives twice: as a clickable block on the canvas **and** as a
proper toggle on the panel area to the left of the editor (positioned
there via `col`/`row` in the Properties — see
[Editor Controls](../../grundlagen/steuerung.md)).

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `O` | Output | Bit | On while the switch is on |
| `!O` | Output | Bit | On while the switch is off |

## Try it

Click the round knob of the switch:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Switch", "_id": "sw1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **The classic**: Switch → [Lamp](../display/lamp.md) — the very first
  circuit (step by step in
  [First Steps](../../grundlagen/erste-schritte.md)).
- **Enables**: Placed on the power input of a [Clock](../signal/clock.md)
  or an [And](../logic/and.md) gate, the Switch becomes the master switch
  of whole circuit sections.
- **Setting fixed bits**: Four Switches on a
  [4bit to byte decoder](../converter/4bit-zu-byte.md) — and a number can
  be “plugged” by hand.
- **Short signals instead of a state** come from the
  [Button](button.md) — it is the doorbell, the Switch is the light
  switch.

## See also

[Button](button.md) · [Slider](slider.md) ·
[Value](../fixed-input/value.md) (fixed value instead of a hand switch)
