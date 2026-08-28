# Xor

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Das Xor-Gatter (sprich: „Exklusiv-Oder") ist der **Unterschieds-Melder**:
Sein Ausgang ist genau dann an, wenn die beiden Eingänge **verschieden**
sind — einer an, der andere aus. Sind beide gleich (beide an oder beide
aus), bleibt er aus.

## Anschlüsse (Standard-Modus „Bit")

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I1` | Eingang | Bit | Erster Wert |
| `I2` | Eingang | Bit | Zweiter Wert |
| `O` | Ausgang | Bit | An, wenn die Eingänge **verschieden** sind |
| `!O` | Ausgang | Bit | An, wenn die Eingänge **gleich** sind |

## Ausprobieren

```operatorsv2
{
	"opAll": [
		{ "_#new": "Xor", "_id": "xor1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modi (im Properties-Fenster)

- **Bit** (Standard): zwei Eingänge.
- **Nibble / Byte**: vier bzw. acht Eingänge. Variant „Combined" macht
  daraus einen **Paritäts-Prüfer**: an, wenn eine *ungerade* Anzahl von
  Eingängen an ist. „Channeled": unabhängige Zweier-Gatter.
- **Bitwise**: zwei Bytes `A` und `B`, das Xor wird je Bit-Stelle gerechnet.

## Einsatzideen

**Zwei Bits auf Gleichheit vergleichen.** Das ist der Klassiker: `!O` ist
genau dann an, wenn beide Eingänge gleich sind. Ein Xor ist also gleichzeitig
ein Gleichheits-Prüfer (`!O`) und ein Unterschieds-Melder (`O`) — ganz ohne
weitere Bausteine.

**Zwei Bytes vergleichen** (Modus Bitwise): Der Ausgang `O` zeigt als
„Unterschieds-Landkarte", **welche** Bits sich unterscheiden. Sind beide
Zahlen gleich, ist `O` = 0 (`00`) und `!O` = 255 (`FF`). Stelle zweimal
dieselbe Zahl ein und beobachte den Ausgang:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Xor", "_id": "xor2", "_x": 0, "_y": 0, "Mode": "bitwise" }
	],
	"conAll": []
}
```

(Für ein einzelnes „gleich/ungleich"-Bit aus zwei Bytes gibt es fertig den
[Equals](../math/equals.md)-Baustein — innen steckt genau dieses Xor.)

**Kontrolliertes Umdrehen**: Xor mit einem Steuer-Bit auf `I2` reicht den
Wert von `I1` durch, solange `I2` aus ist — und **invertiert** ihn, solange
`I2` an ist. Ein Not mit Ein-/Ausschalter. Im Modus Bitwise kippst du so
mit einer Masken-Zahl gezielt einzelne Bits eines Bytes um.

**Rechnen: der Halbaddierer.** Xor ist die Einer-Stelle beim Addieren
zweier Bits, And der Übertrag — zusammen ergeben sie einen Halbaddierer,
die kleinste Rechenmaschine der Welt. Die beiden Kästchen links sind die
Bits A und B (jedes speist über eine kleine Weiche gleichzeitig das Xor
und das And). Rechts zeigt „Xor · Output" die Einer-Stelle und
„And · Output" den Übertrag — schalte beide Bits an, um den Übertrag zu
sehen:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "bitA", "_x": -180, "_y": -50 },
		{ "_#new": "Pipe 1", "_id": "bitB", "_x": -180, "_y": 50 },
		{ "_#new": "Xor", "_id": "xorSum", "_x": 20, "_y": -50 },
		{ "_#new": "And", "_id": "andCarry", "_x": 20, "_y": 50 }
	],
	"conAll": [
		{ "s": "bitA_out_OUT0", "e": "xorSum_in_I1" },
		{ "s": "bitA_out_OUT0", "e": "andCarry_in_I1" },
		{ "s": "bitB_out_OUT0", "e": "xorSum_in_I2" },
		{ "s": "bitB_out_OUT0", "e": "andCarry_in_I2" }
	]
}
```

A + B = 0, 1 oder 2 — und genau das zeigen die Ausgänge: beide aus = 0,
nur Einer-Stelle an = 1, nur Übertrag an = 2 (binär `10`).

## Siehe auch

[Equals](../math/equals.md) · [And](and.md) · [Or](or.md) · [Not](not.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
