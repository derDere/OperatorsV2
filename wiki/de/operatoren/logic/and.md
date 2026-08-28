# And

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

And ist der „beides zusammen"-Baustein: Sein Ausgang ist genau dann an,
wenn **beide** Eingänge an sind. Wie eine Tür mit zwei Schlössern — sie
öffnet nur, wenn beide Schlüssel gedreht werden. Bausteine wie diesen,
die aus an/aus-Eingängen einen neuen an/aus-Wert machen, nennt man
**Logikgatter** — kurz: Gatter.

## Anschlüsse (Standard-Modus „Bit")

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I1` | Eingang | Bit | Erste Bedingung |
| `I2` | Eingang | Bit | Zweite Bedingung |
| `O` | Ausgang | Bit | An, wenn beide Eingänge an sind |
| `!O` | Ausgang | Bit | Das Gegenteil von `O` (praktisch, spart ein Not) |

## Ausprobieren

Schalte die Eingänge einzeln und gemeinsam an — nur bei beiden zusammen
geht `O` an:

```operatorsv2
{
	"opAll": [
		{ "_#new": "And", "_id": "and1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modi (im Properties-Fenster)

Über die Einstellung **Mode** wächst das Gatter mit:

- **Bit** (Standard): zwei Eingänge, ein Ergebnis.
- **Nibble / Byte**: vier bzw. acht Eingänge. Mit **Variant**
  „Combined" wirkt das Und über **alle** Eingänge (nur an, wenn wirklich
  alle an sind); „Channeled" macht daraus unabhängige Zweier-Gatter
  (`A1`+`B1`→`O1`, `A2`+`B2`→`O2` …).
- **Bitwise**: zwei **Byte**-Eingänge `A` und `B`. Das Und wird für jede
  der acht Bit-Stellen einzeln gerechnet (siehe
  [Bits und Bytes](../../grundlagen/bits-und-bytes.md)).

Achtung: Ein Modus-Wechsel tauscht die Anschlüsse aus — bestehende
Verbindungen an wegfallenden Anschlüssen werden getrennt.

## Einsatzideen

- **Sicherheits-Bedingung**: Etwas darf nur passieren, wenn mehrere
  Voraussetzungen gleichzeitig erfüllt sind — Zündschlüssel **und**
  Bremse gedrückt.
- **Tor für Signale**: Lege auf `I1` etwas, das ständig an- und ausgeht
  (zum Beispiel das Blinken einer Clock), und auf `I2` eine „Erlaubnis" —
  das Blinken kommt nur durch, solange die Erlaubnis an ist. So lassen
  sich ganze Teile der Schaltung stumm schalten.
- **Bit-Maske** (Modus Bitwise): Eine feste Zahl auf `B` wirkt wie eine
  Schablone — nur die Bits von `A`, bei denen die Schablone „Löcher" hat
  (also an ist), kommen durch, alle anderen werden 0. So eine
  Schablonen-Zahl nennt man **Maske**. Beispiel: die Maske 15, in der
  Kurzschreibweise der Wert-Kästchen `0F` (siehe
  [Bits und Bytes](../../grundlagen/bits-und-bytes.md)) — nur die unteren
  vier Bits von `A` bleiben übrig. Probiere es aus:

```operatorsv2
{
	"opAll": [
		{ "_#new": "And", "_id": "and2", "_x": 0, "_y": 0, "Mode": "bitwise" }
	],
	"conAll": []
}
```

Stelle `A` auf irgendeine Zahl und `B` auf `0F` — der Ausgang behält nur
die unteren vier Bits.

## Siehe auch

[Or](or.md) · [Xor](xor.md) · [Not](not.md) ·
[Werte und Signale](../../grundlagen/werte-und-signale.md)
