# Operator-Lexikon

Zurück zur [Startseite](../index.md).

Hier findest du jeden Baustein ausführlich erklärt — mit Anschluss-Tabelle,
Live-Demo und Einsatzideen. Die Kategorien entsprechen genau den Gruppen im
Auswahlfenster des Editors (Doppelklick auf die Zeichenfläche).

## Logic — Logik-Gatter und Grundschaltungen

| Baustein | Kurz gesagt |
| --- | --- |
| [And](logic/and.md) | An, wenn **beide** Eingänge an sind |
| [Or](logic/or.md) | An, wenn **mindestens ein** Eingang an ist |
| [Xor](logic/xor.md) | An, wenn die Eingänge **verschieden** sind |
| [Not](logic/not.md) | Dreht den Wert um |
| [Pulse](logic/pulse.md) | Macht aus einem Umschalt-Moment einen kurzen Impuls |
| [RS FlipFlop](logic/rs-flipflop.md) | Merkt sich an/aus: Setzen und Zurücksetzen |
| [T FlipFlop](logic/t-flipflop.md) | Kippt bei jedem Impuls um |
| [Select](logic/select.md) | Datenweiche: gibt das Byte des aktivierten Kanals aus |

## Math — Rechnen mit Bytes

| Baustein | Kurz gesagt |
| --- | --- |
| [Add](math/add.md) | Addiert zwei Bytes |
| [Subtract](math/subtract.md) | Zieht ab — und vergleicht damit auch größer/kleiner |
| [Multiply](math/multiply.md) | Multipliziert zwei Bytes |
| [Divide](math/divide.md) | Teilt (ganzzahlig) |
| [Modulo](math/modulo.md) | Der Rest beim Teilen |
| [Scale](math/scale.md) | Skaliert prozentual (B2 wie ein Lautstärkeregler) |
| [Equals](math/equals.md) | Prüft zwei Bytes auf Gleichheit |
| [Sinus](math/sinus.md) | Sinus-Welle als Byte |
| [Cosinus](math/cosinus.md) | Cosinus-Welle als Byte |
| [Tangents](math/tangents.md) | Tangens (bzw. Kotangens) als Byte |
| [Random](math/random.md) | Würfelt in jedem Tick eine neue Zufallszahl |
| [Noise](math/noise.md) | Sanfter, „wolkiger" Zufall (Perlin Noise) |

## Memory — Speichern und Zählen

| Baustein | Kurz gesagt |
| --- | --- |
| [Memory (1 bit)](memory/memory-1bit.md) | Merkt sich ein Bit auf Kommando |
| [Memory (1 byte)](memory/memory-1byte.md) | Merkt sich ein Byte auf Kommando |
| [Counter4](memory/counter4.md) | Zählt 0–15, mit Bit-Anschlüssen |
| [Counter8](memory/counter8.md) | Zählt 0–255 |
| [Stack](memory/stack.md) | Stapelt Bytes und gibt sie wieder her |
| [Register](memory/register.md) | Speicher mit Adressen — ein Mini-RAM |

## Converter — Umwandeln und Zerlegen

| Baustein | Kurz gesagt |
| --- | --- |
| [4bit to byte decoder](converter/4bit-zu-byte.md) | 4 Bits → eine Zahl (0–15) |
| [8bit to byte decoder](converter/8bit-zu-byte.md) | 8 Bits → ein Byte |
| [Byte to 4bit decoder](converter/byte-zu-4bit.md) | Byte → die unteren 4 Bits |
| [Byte to 8bit decoder](converter/byte-zu-8bit.md) | Byte → alle 8 Bits |
| [Base Converter](converter/base-converter.md) | Spaltet die niedrigste Ziffer ab (z. B. für Dezimal-Anzeigen) |
| [4bit to 7 Segment decoder](converter/4bit-zu-7segment.md) | Zahl 0–15 → Segmente einer Ziffernanzeige |

## Signal — Takte und Zeit

| Baustein | Kurz gesagt |
| --- | --- |
| [Tick](signal/tick.md) | Wechselt jeden Tick zwischen an und aus |
| [Clock](signal/clock.md) | Einstellbarer Taktgeber |
| [Repeater](signal/repeater.md) | Verzögert ein Signal um einstellbar viele Ticks |
| [Time](signal/time.md) | Die echte Uhrzeit als Bytes |

## User Input — Eingaben von dir

| Baustein | Kurz gesagt |
| --- | --- |
| [Switch](user-input/switch.md) | Schalter: an/aus per Klick |
| [Button](user-input/button.md) | Taster: ein kurzer Impuls pro Klick |
| [Slider](user-input/slider.md) | Schieberegler 0–255 |
| [Text Input](user-input/text-input.md) | Eingabefeld — liefert Text Zeichen für Zeichen |
| [File Input](user-input/file-input.md) | Liest eine hochgeladene Datei Byte für Byte |

## Fixed Input — feste Werte

| Baustein | Kurz gesagt |
| --- | --- |
| [Value](fixed-input/value.md) | Ein fest eingestellter Wert |
| [Stack Input](fixed-input/stack-input.md) | Eine feste Byte-Liste zum Abspielen (Mini-ROM) |

## Display — Anzeigen

| Baustein | Kurz gesagt |
| --- | --- |
| [Lamp](display/lamp.md) | Lampe: leuchtet bei an |
| [Byte](display/byte.md) | Zeigt ein Byte in wählbaren Schreibweisen |
| [7 Segment Display](display/7segment-display.md) | Klassische Ziffernanzeige |
| [Terminal Display](display/terminal-display.md) | Text-Bildschirm mit Cursor |
| [Line Display](display/line-display.md) | Zeichenfläche: Linien mit einem Stift ziehen |

## User Output — Ausgaben an dich

| Baustein | Kurz gesagt |
| --- | --- |
| [File Output](user-output/file-output.md) | Sammelt Bytes und bietet sie als Datei-Download an |

## Network — über den Server hinweg

| Baustein | Kurz gesagt |
| --- | --- |
| [Network Sender](network/network-sender.md) | Sendet ein Byte in einen Funk-Kanal |
| [Network Receiver](network/network-receiver.md) | Empfängt Bytes aus einem Funk-Kanal |

## Utility — Helfer für die Verdrahtung

| Baustein | Kurz gesagt |
| --- | --- |
| [Pipe 1 / 4 / 8](utility/pipes.md) | Durchreichen — für Ordnung in den Leitungen |
| [Portale](utility/portale.md) | Unsichtbare Verbindungen über weite Strecken |

## Organisation — Beschriften und Zurechtfinden

| Baustein | Kurz gesagt |
| --- | --- |
| [Comment](organisation/comment.md) | Notizzettel auf der Fläche |
| [Anchor](organisation/anchor.md) | Lesezeichen für Orte auf der Fläche |
| [Label](organisation/label.md) | Beschriftung (auch als Link) auf der Panelfläche |

## Vector — Rechnen mit Punkten

| Baustein | Kurz gesagt |
| --- | --- |
| [Vector Add](vector/vector-add.md) | Zwei Punkte/Pfeile addieren |
| [Vector Subtract](vector/vector-subtract.md) | Punkte/Pfeile subtrahieren |
| [Vector Modulo](vector/vector-modulo.md) | Rest je Koordinate — hält Punkte in einem Bereich |
| [Vector Scale](vector/vector-scale.md) | Pfeil prozentual verlängern/verkürzen |
| [Vector Multiply](vector/vector-multiply.md) | Pfeil mit einer Zahl multiplizieren |
| [Vector Rotate](vector/vector-rotate.md) | Pfeil um einen Winkel drehen |
