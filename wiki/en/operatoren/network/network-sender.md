# Network Sender

[Operator Reference](../index.md) · Category: **Network**

The Network Sender is the **radio for transmitting**: It sends bytes into
a named **channel** — just like a walkie-talkie, where everyone who has
tuned in to the same channel can hear each other. The channel lives on
the **server**: the computer in the background that connects every
sender and receiver to each other. Everything listening to that same
channel — a [Network Receiver](network-receiver.md) in the same circuit,
in another browser tab or on another computer — receives the value. This
is how signals leave their own canvas for the first time.

The channel name is set in the Properties (field **Channel** — any name
will do, same name = same channel). The colorful pattern on the block is
the channel's fingerprint: senders and receivers with the same pattern are
connected. The wave animation shows that the connection to the server is
up.

A channel is fleeting like radio: If several transmit at once, the bytes
are combined bitwise with **OR** — each individual bit counts as “on” as
soon as it is on for at least one sender (more on that on
[Values and Signals](../../grundlagen/werte-und-signale.md)). Without
fresh transmissions the value fades to 0 on its own after a short while.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Input | Byte | The value being sent |
| `T` | Input | Bit | [Rising edge](../../grundlagen/flanken-und-takt.md) (the switch from off to on): sends the current value |

## Try it

This sender broadcasts on the channel “wiki-demo”. Set a value on `B` and
switch `T` on and off — the receiver on the
[Network Receiver](network-receiver.md) page listens to the same channel.
Open both pages in two browser windows and watch the value cross over:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Network Sender", "_id": "send1", "_x": 0, "_y": 0, "Channel": "wiki-demo" }
	],
	"conAll": []
}
```

## Usage ideas

- **Remote control**: Switches and dials in one circuit, the displays in
  another — even on another device on the same network.
- **Avoiding cable clutter**: Within a single circuit a channel replaces
  long wires too — though for that, the local
  [portals](../utility/portale.md) work without any server.
- **Chat and games**: Send character codes from a
  [Text Input](../user-input/text-input.md), write them onto a
  [Terminal Display](../display/terminal-display.md) on the other side —
  two browsers are chatting.
- **One status word for everything**: Bundle eight reports with the
  [8bit to byte decoder](../converter/8bit-zu-byte.md) and broadcast them
  as a single byte.

## See also

[Network Receiver](network-receiver.md) · [Portals](../utility/portale.md)
