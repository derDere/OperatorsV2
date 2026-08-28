# Editor Controls

Back to the [start page](../index.md).

This page is the reference for all mouse and keyboard commands of the
editor. The most important moves are also shown as a cheat sheet in the top
left corner of the canvas.

## Placing blocks

| Action | How |
| --- | --- |
| Add a block | **Double-click** an empty spot on the canvas |
| Search the selection window | Just start typing — the list filters instantly |
| Read a description | Hover over an entry — a small info bubble (tooltip) appears |
| Place | Click an entry — the block lands at the double-click position |

The entries are grouped into **categories** (Logic, Math, Display …). You
find the same categories in the [Operator Reference](../operatoren/index.md).

## Moving the view

| Action | How |
| --- | --- |
| Pan the canvas | Hold the **right mouse button** and drag |
| Read the position | Two numbers at the bottom center show where you are — such location numbers are called coordinates |
| Find the zero point | Two thin gray lines cross exactly where both location numbers are 0 |
| Bookmark places | [Anchor](../operatoren/organisation/anchor.md) blocks appear in the 📘 bookmarks window and jump there on click |

## Moving and selecting blocks

| Action | How |
| --- | --- |
| Move | Drag a block with the **left mouse button** — on release it snaps to the grid |
| Select | Click a block (blue frame) — its settings appear in the 🛠️ Properties window |
| Select several | **Shift + click** adds, **Ctrl + click** adds or removes again |
| Rectangle selection | Drag a rectangle on empty canvas with the left mouse button held |
| Move the selection | Drag any selected block — all of them move along |

## Connections

| Action | How |
| --- | --- |
| Connect | Press the left mouse button on a pin circle, drag to the counterpart, release |
| Read a value | Hover over a line or a pin — the tooltip shows the current value |
| Delete one connection | Hover over the line and press **Del** |
| Cut many connections | **Ctrl + drag** on empty canvas: everything crossing the red cutting line is disconnected |

Rules for connecting:

- A connection always links **an output with an input** — never two of the
  same kind.
- **Any number** of lines may leave one output.
- If **several lines lead to the same input**, the values overlap: the input
  is on as soon as at least one source is on
  (details in [Values and Signals](werte-und-signale.md)).

## Deleting, copying, duplicating

| Key | Effect |
| --- | --- |
| **Del** | Deletes the selected blocks — or the connection under the mouse |
| **Ctrl + D** | Doubles the selection — the copy appears right next to it, slightly offset |
| **Ctrl + C** | Copies the selection to the clipboard |
| **Ctrl + V** | Pastes the copy at the view center (pasting again offsets each time) |

Copying always includes the selection **plus the connections** between the
selected blocks.

## The Properties window (🛠️)

When you click a block, the Properties window shows its settings — for
example the text of a comment, the color of a lamp or how a logic block
does its job. Changes take effect immediately. A small gray triangle at the
top right corner of a block shows whose settings are currently displayed.

Blocks with a panel control (switches, lamps, displays …) additionally have
the fields `col`, `row`, `colSpan` and `rowSpan`: `col` is the column,
`row` the row — they determine in which field of the right panel area the
control appears. With `colSpan` and `rowSpan` it may grow several fields
wide or tall.

## The panel area on the right

Some blocks live twice: as a box on the canvas **and** as a control on the
panel area to the right — that is where you click the real switch, watch the
real lamp or read the display. The panel area is laid out like a table;
position and size of each control are set via the Properties. The divider
between canvas and panel area can be dragged with the mouse.

## The menu (🏠)

| Entry | Effect |
| --- | --- |
| 📄 New | Clears the whole circuit (asks first) |
| 💾 Save As | Saves the circuit as a file (download) |
| 📂 Open File | Loads a saved file — replaces the current circuit |
| 📤 Export | Saves only the selection (without a selection: everything) |
| 📥 Import | Adds a saved file into the running circuit, centered |
| 🌐 Wiki | Opens this documentation |
| 📚 Examples | Ready-made example circuits from the server — loading replaces the current circuit |

If you leave the page and the last save was a while ago, the browser plays
it safe and asks first.

## Read on

- [First Steps](erste-schritte.md) — the first circuit, step by step
- [Values and Signals](werte-und-signale.md) — what flows through the wires
- [Operator Reference](../operatoren/index.md) — all building blocks in detail
