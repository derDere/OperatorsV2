# Not

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Das Not-Gatter ist der **Umdreher**: aus an wird aus, aus aus wird an.
Der einfachste Baustein überhaupt — und einer der nützlichsten.

## Anschlüsse (Standard-Modus „Bit")

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `A` | Eingang | Bit | Der Wert, der umgedreht wird |
| `!A` | Ausgang | Bit | Das Gegenteil des Eingangs |

## Ausprobieren

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modi (im Properties-Fenster)

- **Bit** (Standard): ein Eingang, ein Ausgang.
- **Nibble / Byte**: vier bzw. acht unabhängige Umdreher in einem Baustein
  (`A1`→`!A1`, `A2`→`!A2` …) — spart Platz, wenn viele Leitungen invertiert
  werden sollen.
- **Bitwise**: ein **Byte**-Eingang; alle acht Bits werden gleichzeitig
  gekippt. Das Ergebnis heißt **Komplement**: aus der Zahl x wird 255 − x.

## Einsatzideen

- **Bedingung umkehren**: „Tür offen" wird zu „Tür zu" — oft braucht man
  genau das Gegenteil eines Melders.
- **Oft gar nicht nötig**: Viele Bausteine haben ihr Gegenteil schon als
  eigenen Ausgang (`!O`, `!Q`, `!C` …). Ein Blick auf die Anschlüsse spart
  manchmal das Not.
- **Zahl „spiegeln"** (Modus Bitwise): 255 − x in einem Schritt. Stelle den
  Eingang z. B. auf 0 → Ausgang `FF` (255); auf 255 → `00`. Praktisch, um
  eine ansteigende Rampe in eine absteigende zu verwandeln:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not2", "_x": 0, "_y": 0, "Mode": "bitwise" }
	],
	"conAll": []
}
```

- **Blinker bauen**: Ein Not, dessen Ausgang wieder auf den eigenen Eingang
  führt, kippt jeden Tick um — das schnellste Blinklicht der Welt. (Für ein
  gemächlicheres Tempo gibt es die [Clock](../signal/clock.md).)

## Siehe auch

[And](and.md) · [Or](or.md) · [Xor](xor.md) ·
[Clock](../signal/clock.md)
