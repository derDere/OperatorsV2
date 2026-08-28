# Operator Reference

Back to the [start page](../index.md).

An **operator** is a building block: a little box that does something with
values. Some calculate, some compare, some remember, some show you
something. Here you find every one of them explained in detail — with a
table of all its pins, a live demo to try out and ideas of what it is good
for.

The headings are the **categories**: the same groups the blocks are sorted
into in the editor's selection window (double-click on the canvas).

## Logic — logic gates and basic circuits

| Block | In short |
| --- | --- |
| [And](logic/and.md) | On when **both** inputs are on |
| [Or](logic/or.md) | On when **at least one** input is on |
| [Xor](logic/xor.md) | On when the inputs are **different** |
| [Not](logic/not.md) | Flips the value: on becomes off, off becomes on |
| [Pulse](logic/pulse.md) | Turns the moment of switching into a short **pulse** |
| [RS FlipFlop](logic/rs-flipflop.md) | Remembers on or off: one input switches it on, another one off again |
| [T FlipFlop](logic/t-flipflop.md) | Flips from on to off and back on every signal |
| [Select](logic/select.md) | A junction for numbers: only the number of the input that is switched on gets through |

## Math — computing with bytes

| Block | In short |
| --- | --- |
| [Add](math/add.md) | Adds two numbers together |
| [Subtract](math/subtract.md) | Takes one number away — and tells you which one is bigger |
| [Multiply](math/multiply.md) | Multiplies two numbers |
| [Divide](math/divide.md) | Divides one number by another — the result is a whole number |
| [Modulo](math/modulo.md) | What is left over from a division: the remainder |
| [Scale](math/scale.md) | Turns a number down: `B2` acts like a volume knob — at 255 the number stays whole, below that it shrinks proportionally |
| [Equals](math/equals.md) | On when both numbers are the same |
| [Sinus](math/sinus.md) | A number that gently rises and falls (sine wave) |
| [Cosinus](math/cosinus.md) | The same wave as the sine, shifted in time (cosine) |
| [Tangents](math/tangents.md) | A measure of how steeply a slope rises at a given angle (tangent) |
| [Random](math/random.md) | Rolls a fresh random number every work step (tick) |
| [Noise](math/noise.md) | Randomness that drifts gently instead of jumping (Perlin noise) |

## Memory — storing and counting

| Block | In short |
| --- | --- |
| [Memory (1 bit)](memory/memory-1bit.md) | Remembers one on/off until a signal stores a new value |
| [Memory (1 byte)](memory/memory-1byte.md) | Remembers one number until a signal stores a new one |
| [Counter4](memory/counter4.md) | Counts 0–15 and hands out the result as single bits |
| [Counter8](memory/counter8.md) | Counts 0–255 |
| [Stack](memory/stack.md) | A [stack](../grundlagen/stapel-und-warteschlange.md) for numbers: the one put down last comes back first |
| [Register](memory/register.md) | Many numbered storage slots — a small working memory |

## Converter — converting and splitting

| Block | In short |
| --- | --- |
| [4bit to byte decoder](converter/4bit-zu-byte.md) | 4 bits → one number (0–15) |
| [8bit to byte decoder](converter/8bit-zu-byte.md) | 8 bits → one byte |
| [Byte to 4bit decoder](converter/byte-zu-4bit.md) | Byte → the lower 4 bits |
| [Byte to 8bit decoder](converter/byte-zu-8bit.md) | Byte → all 8 bits |
| [Base Converter](converter/base-converter.md) | Splits the last digit off a number (for digit displays) |
| [4bit to 7 Segment decoder](converter/4bit-zu-7segment.md) | Number 0–15 → which bars of a digit display light up |

## Signal — clocks and time

| Block | In short |
| --- | --- |
| [Tick](signal/tick.md) | Alternates between on and off in every work step |
| [Clock](signal/clock.md) | Blinks to a [beat](../grundlagen/flanken-und-takt.md) that you set |
| [Repeater](signal/repeater.md) | Passes a signal on later — you set by how many ticks |
| [Time](signal/time.md) | The real time of day as numbers |

## User Input — input from you

| Block | In short |
| --- | --- |
| [Switch](user-input/switch.md) | Switch: stays on until you click again |
| [Button](user-input/button.md) | Push button: one short signal per click |
| [Slider](user-input/slider.md) | Slider for numbers from 0 to 255 |
| [Text Input](user-input/text-input.md) | Input field — hands out the text character by character |
| [File Input](user-input/file-input.md) | Reads a file from your computer byte by byte |

## Fixed Input — fixed values

| Block | In short |
| --- | --- |
| [Value](fixed-input/value.md) | A value that you set yourself and that stays put |
| [Stack Input](fixed-input/stack-input.md) | A fixed list of numbers that come out one after another |

## Display — output on screen

| Block | In short |
| --- | --- |
| [Lamp](display/lamp.md) | Lamp: lights up when its input is on |
| [Byte](display/byte.md) | Shows a number — in a notation of your choice |
| [7 Segment Display](display/7segment-display.md) | Digit display made of seven bars, like on a clock radio |
| [Terminal Display](display/terminal-display.md) | Text screen with a writing mark (cursor) |
| [Line Display](display/line-display.md) | Drawing surface: draw lines with a pen |

## User Output — output to you

| Block | In short |
| --- | --- |
| [File Output](user-output/file-output.md) | Collects bytes and offers them as a file to save |

## Network — across the server

| Block | In short |
| --- | --- |
| [Network Sender](network/network-sender.md) | Sends a number into a radio channel |
| [Network Receiver](network/network-receiver.md) | Receives numbers from a radio channel |

## Utility — helpers for wiring

| Block | In short |
| --- | --- |
| [Pipe 1 / 4 / 8](utility/pipes.md) | Passes values on unchanged — keeps the wiring tidy |
| [Portals](utility/portale.md) | Connections without a visible line, even across long distances |

## Organisation — labeling and finding your way

| Block | In short |
| --- | --- |
| [Comment](organisation/comment.md) | Sticky note on the canvas |
| [Anchor](organisation/anchor.md) | Bookmark for places on the canvas |
| [Label](organisation/label.md) | Caption on the panel area (even as a link) |

## Vector — computing with points

| Block | In short |
| --- | --- |
| [Vector Add](vector/vector-add.md) | Adds two [vectors](../grundlagen/vektoren.md) together — a vector is a pair of two numbers: x and y |
| [Vector Subtract](vector/vector-subtract.md) | Takes vectors away from one another |
| [Vector Modulo](vector/vector-modulo.md) | Keeps points inside an area: whatever runs out one side comes back in on the other |
| [Vector Scale](vector/vector-scale.md) | Turns an arrow's length down: at `V` = 255 it stays whole, below that it gets proportionally shorter |
| [Vector Multiply](vector/vector-multiply.md) | Multiplies an arrow by a number |
| [Vector Rotate](vector/vector-rotate.md) | Turns an arrow by an angle |
