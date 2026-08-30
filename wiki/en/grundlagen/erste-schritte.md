# First Steps

Back to the [start page](../index.md).

A light switch on the wall, a lamp on the ceiling, a cable in between —
that is exactly what you rebuild on this page, only on the screen: a
switch, a lamp and a line between them that carries the signal from one to
the other. Such an arrangement of blocks and lines is called a **circuit**.

The two blocks you need are called **Switch** and **Lamp** — those are the
names to look for in the editor.

## Opening the editor

The editor is the building page of OperatorsV2 — the start page of the
application (the address without `/wiki.html` at the end). There you see:

- on the right a large **canvas** with a grid pattern — this is where the
  circuit is built,
- on the left a bright **panel area** — everything for operating and
  reading appears here: switches, lamps, displays,
- small collapsible windows at the edges: **🏠 Menu** (saving & loading) and
  **🛠️ Properties** — the settings of the block you clicked show up there.

## Step 1: Place a switch

**Double-click** — that is, click twice quickly in a row — on an empty spot
of the canvas. A selection window opens with all building blocks, sorted
into groups; these groups are called **categories**. The search field sits at
the bottom of the window and is active right away, so you can start typing
immediately. Click **Switch** (category *User Input* — that is where the
blocks you operate yourself live). The switch then sits on the canvas.

## Step 2: Place a lamp

Another double-click, a bit further to the right. This time pick **Lamp**
(category *Display* — those are the blocks that show you something).

## Step 3: Wiring

Every block has small **circles** on its sides — those are its **pins**, the
docking points for the lines. The **inputs** sit on the left: that is where
something comes in. The **outputs** sit on the right: that is where the
block hands something out.

Press the left mouse button on the output `O` of the Switch, keep it
pressed, drag the line to the input `I` of the Lamp and release there. The
connection is done.

Now click the switch (the round knob in its middle): The lamp turns on.
You can try this exact circuit right here — click the switch:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Switch", "_id": "sw1", "_x": -100, "_y": 0 },
		{ "_#new": "Lamp", "_id": "lamp1", "_x": 100, "_y": 0 }
	],
	"conAll": [
		{ "s": "sw1_out_O", "e": "lamp1_in_I" }
	]
}
```

The box to the right of the demo belongs to the second output of the Switch.
It is called `!O` and always shows the opposite of `O`: when the switch is
on, `!O` is off. In this circuit no line leads away from it.

## Step 4: A block in between

A block may also sit *between* switch and lamp and change the value along
the way. Double-click to place a **Not** (category *Logic*) in between. A
Not does what its name says: it flips every value — what is on comes out as
off, and the other way round.

Then connect the output `O` of the Switch to the input `A` of the Not, and
the output `!A` of the Not to the input `I` of the Lamp. That makes the lamp
light up exactly when the switch is **off**:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Switch", "_id": "sw2", "_x": -180, "_y": 0 },
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 },
		{ "_#new": "Lamp", "_id": "lamp2", "_x": 180, "_y": 0 }
	],
	"conAll": [
		{ "s": "sw2_out_O", "e": "not1_in_A" },
		{ "s": "not1_out_!A", "e": "lamp2_in_I" }
	]
}
```

## Step 5: Saving

Open the **🏠 Menu** and choose **💾 Save As**: your circuit travels onto
your computer as a file. With **📂 Open File** you fetch it back onto the
canvas later. Under **📚 Examples** you find ready-made example circuits to
look at — careful, loading makes whatever is on the canvas disappear.

## Where to go next

- All mouse and keyboard commands of the editor: [Editor Controls](steuerung.md)
- What exactly flows through the wires: [Values and Signals](werte-und-signale.md)
- The rhythm the circuit works to: [Ticks and Edges](flanken-und-takt.md)
- All building blocks in detail: [Operator Reference](../operatoren/index.md)
