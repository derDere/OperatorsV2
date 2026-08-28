# Network Receiver

[Operator Reference](../index.md) · Category: **Network**

The Network Receiver is the **radio for listening**: It tunes into a
named **channel** — just like a walkie-talkie, where you tune in to the
same channel as everyone else. The channel lives on the **server**: the
computer in the background that connects every sender and receiver to
each other. The Network Receiver outputs whatever was last transmitted
there — whether the sender sits in the same circuit, another browser tab
or on another computer.

The channel name lives in the Properties (field **Channel**); the colorful
pattern on the block is the channel's fingerprint — it must match the
sender's pattern. Without fresh transmissions the channel value fades to 0
on its own after a short while.

## Pins

| Pin | Type | Value | Meaning |
| --- | --- | --- | --- |
| `B` | Output | Byte | The value received last from the channel |
| `T` | Output | Bit | On for one [tick](../../grundlagen/flanken-und-takt.md) when the received value changes |

## Try it

Here sender and receiver stand side by side — connected **not** by a wire
but only through the server's channel “wiki-demo”. Set a value on the
left and switch `T` on: It arrives on the right — and fades back to 0
after a short while:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Network Sender", "_id": "send1", "_x": -140, "_y": 0, "Channel": "wiki-demo" },
		{ "_#new": "Network Receiver", "_id": "recv1", "_x": 140, "_y": 0, "Channel": "wiki-demo" }
	],
	"conAll": []
}
```

Even more fun: Open this page in a second browser window — both demos hang
on the same channel; transmit in one window, receive in both. The demo on
the [Network Sender](network-sender.md) page broadcasts into here as well.

## Usage ideas

- **Scoreboard**: One circuit measures and transmits, another displays —
  on every device that has the page open.
- **Shared circuits**: Several people each build one part; the channels
  connect the parts to each other.
- **Briefly “beaming” values**: Since the channel falls back to 0 on its
  own, it suits brief messages that should not stay on permanently; if
  the value is needed permanently after all, hold it on the other side
  with [Memory (1 byte)](../memory/memory-1byte.md) (the `T` output
  provides the matching trigger).

## See also

[Network Sender](network-sender.md) · [Portals](../utility/portale.md) ·
[Memory (1 byte)](../memory/memory-1byte.md)
