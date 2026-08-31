# Operator-Lexikon

Zurück zur [Startseite](../index.md).

Ein **Operator** ist ein Baustein: ein Kästchen, das etwas mit Werten
anstellt. Manche rechnen, manche vergleichen, manche merken sich etwas,
manche zeigen etwas an. Hier findest du jeden von ihnen ausführlich
erklärt — mit einer Tabelle aller Anschlüsse, einer Live-Demo zum
Ausprobieren und Ideen, wofür er sich einsetzen lässt.

Die Überschriften sind die **Kategorien**: dieselben Gruppen, in denen die
Bausteine auch im Auswahlfenster des Editors stehen (Doppelklick auf die
Zeichenfläche).

## Logic — Logik-Gatter und Grundschaltungen

| Baustein | Kurz gesagt |
| --- | --- |
| [And](logic/and.md) | An, wenn **beide** Eingänge an sind |
| [Or](logic/or.md) | An, wenn **mindestens ein** Eingang an ist |
| [Xor](logic/xor.md) | An, wenn die Eingänge **verschieden** sind |
| [Not](logic/not.md) | Dreht den Wert um: an wird aus, aus wird an |
| [Pulse](logic/pulse.md) | Macht aus dem Moment des Umschaltens einen kurzen **Impuls** |
| [RS FlipFlop](logic/rs-flipflop.md) | Merkt sich an oder aus: ein Eingang schaltet ein, ein anderer wieder aus |
| [T FlipFlop](logic/t-flipflop.md) | Kippt bei jedem Signal von an auf aus und zurück |
| [Select](logic/select.md) | Weiche für Zahlen: durchgelassen wird die Zahl des Eingangs, der eingeschaltet ist |

## Math — Rechnen mit Bytes

| Baustein | Kurz gesagt |
| --- | --- |
| [Add](math/add.md) | Zählt zwei Zahlen zusammen |
| [Subtract](math/subtract.md) | Zieht ab — und verrät dabei, welche Zahl größer ist |
| [Multiply](math/multiply.md) | Nimmt zwei Zahlen mal |
| [Divide](math/divide.md) | Teilt eine Zahl durch eine andere — heraus kommt eine ganze Zahl |
| [Modulo](math/modulo.md) | Was beim Teilen übrig bleibt: der Rest |
| [Scale](math/scale.md) | Regelt eine Zahl herunter: `B2` wirkt wie ein Lautstärkeregler — bei 255 bleibt die Zahl ganz, darunter wird sie anteilig kleiner |
| [Equals](math/equals.md) | An, wenn beide Zahlen gleich sind |
| [Sinus](math/sinus.md) | Eine Zahl, die sanft auf und ab wogt (Sinus-Welle) |
| [Cosinus](math/cosinus.md) | Dieselbe Welle wie beim Sinus, zeitlich versetzt (Cosinus) |
| [Tangents](math/tangents.md) | Ein Maß dafür, wie steil eine Schräge unter einem Winkel ansteigt (Tangens) |
| [Random](math/random.md) | Würfelt in jedem Arbeitsschritt (Tick) eine neue Zufallszahl |
| [Noise](math/noise.md) | Zufall, der sanft wandert statt zu springen (Perlin Noise) |

## Memory — Speichern und Zählen

| Baustein | Kurz gesagt |
| --- | --- |
| [Memory (1 bit)](memory/memory-1bit.md) | Merkt sich ein an/aus, bis ein Signal einen neuen Wert speichert |
| [Memory (1 byte)](memory/memory-1byte.md) | Merkt sich eine Zahl, bis ein Signal eine neue speichert |
| [Counter4](memory/counter4.md) | Zählt 0–15 und gibt das Ergebnis als einzelne Bits aus |
| [Counter8](memory/counter8.md) | Zählt 0–255 |
| [Stack](memory/stack.md) | Ein [Stapel](../grundlagen/stapel-und-warteschlange.md) für Zahlen: Die zuletzt abgelegte kommt zuerst zurück |
| [Register](memory/register.md) | Viele nummerierte Speicherplätze — ein kleiner Arbeitsspeicher |

## Converter — Umwandeln und Zerlegen

| Baustein | Kurz gesagt |
| --- | --- |
| [4bit to byte decoder](converter/4bit-zu-byte.md) | 4 Bits → eine Zahl (0–15) |
| [8bit to byte decoder](converter/8bit-zu-byte.md) | 8 Bits → ein Byte |
| [Byte to 4bit decoder](converter/byte-zu-4bit.md) | Byte → die unteren 4 Bits |
| [Byte to 8bit decoder](converter/byte-zu-8bit.md) | Byte → alle 8 Bits |
| [Base Converter](converter/base-converter.md) | Spaltet die letzte Ziffer einer Zahl ab (für Ziffernanzeigen) |
| [4bit to 7 Segment decoder](converter/4bit-zu-7segment.md) | Zahl 0–15 → welche Striche einer Ziffernanzeige leuchten |

## Signal — Takte und Zeit

| Baustein | Kurz gesagt |
| --- | --- |
| [Tick](signal/tick.md) | Wechselt in jedem Arbeitsschritt zwischen an und aus |
| [Clock](signal/clock.md) | Blinkt in einem [Takt](../grundlagen/flanken-und-takt.md), den du einstellst |
| [Repeater](signal/repeater.md) | Gibt ein Signal später weiter — um wie viele Ticks, stellst du ein |
| [Time](signal/time.md) | Die echte Uhrzeit als Zahlen |

## User Input — Eingaben von dir

| Baustein | Kurz gesagt |
| --- | --- |
| [Switch](user-input/switch.md) | Schalter: bleibt an, bis du wieder klickst |
| [Button](user-input/button.md) | Knopf: gibt je Klick ein kurzes Signal |
| [Slider](user-input/slider.md) | Schieberegler für Zahlen von 0 bis 255 |
| [Text Input](user-input/text-input.md) | Eingabefeld — gibt den Text Zeichen für Zeichen aus |
| [File Input](user-input/file-input.md) | Liest eine Datei von deinem Rechner Byte für Byte ein |

## Fixed Input — feste Werte

| Baustein | Kurz gesagt |
| --- | --- |
| [Value](fixed-input/value.md) | Ein Wert, den du selbst einstellst und der so bleibt |
| [Stack Input](fixed-input/stack-input.md) | Eine feste Liste von Zahlen, die nacheinander herauskommen |

## Display — Anzeigen

| Baustein | Kurz gesagt |
| --- | --- |
| [Lamp](display/lamp.md) | Lampe: leuchtet, wenn ihr Eingang an ist |
| [Byte](display/byte.md) | Zeigt eine Zahl an — in mehreren Schreibweisen zur Wahl |
| [7 Segment Display](display/7segment-display.md) | Ziffernanzeige aus sieben Strichen, wie am Radiowecker |
| [Terminal Display](display/terminal-display.md) | Text-Bildschirm mit Schreibmarke (Cursor) |
| [Line Display](display/line-display.md) | Zeichenfläche: Linien mit einem Stift ziehen |

## User Output — Ausgaben an dich

| Baustein | Kurz gesagt |
| --- | --- |
| [Sound](user-output/sound.md) | Lautsprecher: spielt einen Ton, dessen Höhe, Länge und Klangfarbe die Schaltung bestimmt |
| [File Output](user-output/file-output.md) | Sammelt Bytes und bietet sie als Datei zum Speichern an |

## Network — über den Server hinweg

| Baustein | Kurz gesagt |
| --- | --- |
| [Network Sender](network/network-sender.md) | Sendet eine Zahl in einen Funk-Kanal |
| [Network Receiver](network/network-receiver.md) | Empfängt Zahlen aus einem Funk-Kanal |

## Utility — Helfer für die Verdrahtung

| Baustein | Kurz gesagt |
| --- | --- |
| [Pipe 1 / 4 / 8](utility/pipes.md) | Reicht Werte unverändert weiter — für Ordnung in den Leitungen |
| [Portale](utility/portale.md) | Verbindungen ohne sichtbare Linie, auch über weite Strecken |

## Organisation — Beschriften und Zurechtfinden

| Baustein | Kurz gesagt |
| --- | --- |
| [Comment](organisation/comment.md) | Notizzettel auf der Fläche |
| [Anchor](organisation/anchor.md) | Lesezeichen für Orte auf der Fläche |
| [Label](organisation/label.md) | Beschriftung auf der Panelfläche (auch als Link) |

## Vector — Rechnen mit Punkten

| Baustein | Kurz gesagt |
| --- | --- |
| [Vector Add](vector/vector-add.md) | Zählt zwei [Vektoren](../grundlagen/vektoren.md) zusammen — ein Vektor ist ein Paar aus zwei Zahlen: x und y |
| [Vector Subtract](vector/vector-subtract.md) | Zieht Vektoren voneinander ab |
| [Vector Modulo](vector/vector-modulo.md) | Hält Punkte in einem Bereich: Wer hinausläuft, taucht auf der anderen Seite wieder auf |
| [Vector Scale](vector/vector-scale.md) | Regelt die Länge eines Pfeils herunter: bei `V` = 255 bleibt er ganz, darunter wird er anteilig kürzer |
| [Vector Multiply](vector/vector-multiply.md) | Nimmt einen Pfeil mit einer Zahl mal |
| [Vector Rotate](vector/vector-rotate.md) | Dreht einen Pfeil um einen Winkel |
