# Portals (Portal 1/4/8 Entry & Portal Exit)

[Operator Reference](../index.md) · Category: **Utility**

A portal is a **magic door for signals**: Whatever goes in at one door
comes out of the other door — with no visible cable in between, even
when the two doors sit far apart on the canvas. That is exactly what
you need when a signal has to cross a large circuit without you
covering the whole canvas in wires.

There are four blocks:

| Block | Role | Lines |
| --- | --- | --- |
| Portal 1 Entry | Entry portal | 1 |
| Portal 4 Entry | Entry portal | 4 |
| Portal 8 Entry | Entry portal | 8 |
| Portal Exit | Exit portal | adapts to the linked entry |

## How they are linked

1. Place an **Entry** — it instantly gets a short name (for example
   `A3F0`) shown right next to it. You can change that name any time in
   the Properties, field **Name**.
2. Place a **Portal Exit** and pick the desired entry from the list in
   its Properties under **Origin**.
3. Done: The exit takes on the name of its entry, turns orange and
   automatically grows as many outputs as the entry has inputs
   (`I1` → `O1`, `I2` → `O2` …).

One entry may be linked to **several** exits at the same time —
practical for handing a signal to many places at once. If an exit
shows four question marks (`????`) instead, it has lost its entry — it
was deleted, or none was chosen yet. Its outputs then stay empty.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `I1`…`I8` | Input (Entry) | Bit or Byte | Values flowing in through the entry door |
| `O1`…`O8` | Output (Exit) | Bit or Byte | The same values coming back out through the exit door |

## Try it

The entry sits on the left, the linked exit on the right — with no wire
in between at all. Change the input and watch the exit's output pin:
The small circle instantly takes on the same color and the same value
(hover over it to see the value as a tooltip):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Portal 1 Entry", "_id": "pin1", "_x": -160, "_y": 0, "Name": "DEMO" },
		{ "_#new": "Portal Exit", "_id": "pout1", "_x": 160, "_y": 0, "Origin": "pin1" }
	],
	"conAll": []
}
```

## Usage ideas

- **Untangling cable clutter**: Signals needed everywhere — say, a
  [clock](../../grundlagen/flanken-und-takt.md) signal that sets the
  rhythm, or a reset line that resets everything — travel through
  portals instead of meter-long wires across the canvas.
- **Building modules**: A circuit block gets named entry portals as
  “output sockets” — other blocks tap them via exits, with no single
  wire needed between the blocks at all.
- **Multiplying a signal**: One entry, many exits — the same source
  appears in as many places as you like, all at once.
- If signals should **leave the browser** — for another window or
  another computer —, the [network blocks](../network/network-sender.md)
  take over.

## See also

[Pipes](pipes.md) · [Network Sender](../network/network-sender.md) ·
[Editor Controls](../../grundlagen/steuerung.md)
