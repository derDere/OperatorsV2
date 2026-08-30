# Lamp

[Operator Reference](../index.md) · Category: **Display**

The Lamp is the **light bulb** of the circuit: It lights up while its input
is on. On the panel area to the left of the editor it additionally appears
as a bulb with a glow; you pick the color in the Properties — the settings
window that opens when you click the block.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I` | Input | Bit | The lamp lights up while this input is on |

## Try it

Switch the input on:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Lamp", "_id": "lamp1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Usage ideas

- **Seeing what is going on**: Hang a lamp on every important wire — while
  building you instantly see where a signal is on and where it is off.
- **Light patterns for numbers**: Eight lamps behind a
  [Byte to 8bit decoder](../converter/byte-zu-8bit.md) show a whole byte
  as a pattern of on and off — the first step towards a clock that shows
  the time as a light pattern (the time comes from
  [Time](../signal/time.md)).
- **Traffic lights and warning lights**: With several differently colored
  lamps and a bit of [logic](../logic/and.md) you can build traffic light
  phases, warning blinkers or a “device is running” light.
- For numbers instead of on/off there is the [Byte](byte.md) display, for
  digits the [7 segment display](7segment-display.md) — the blocky digits
  you know from an alarm clock.

## See also

[Byte](byte.md) · [7 Segment Display](7segment-display.md) ·
[Switch](../user-input/switch.md)
