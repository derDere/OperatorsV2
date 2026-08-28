# Or

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Or ist der „Oder"-Baustein: Sein Ausgang ist an, sobald **mindestens
einer** der Eingänge an ist. Wie ein Flur mit zwei Lichtschaltern — egal
welcher gedrückt wird, das Licht geht an.

## Anschlüsse (Standard-Modus „Bit")

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I1` | Eingang | Bit | Erste Quelle |
| `I2` | Eingang | Bit | Zweite Quelle |
| `O` | Ausgang | Bit | An, sobald mindestens ein Eingang an ist |
| `!O` | Ausgang | Bit | Das Gegenteil von `O` — an nur, wenn **beide** aus sind |

## Ausprobieren

```operatorsv2
{
	"opAll": [
		{ "_#new": "Or", "_id": "or1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Modi (im Properties-Fenster)

- **Bit** (Standard): zwei Eingänge.
- **Nibble / Byte**: vier bzw. acht Eingänge. Variant „Combined": an,
  sobald irgendeiner an ist; „Channeled": unabhängige Zweier-Bausteine.
- **Bitwise**: zwei Bytes `A` und `B`, das Oder wird je Bit-Stelle
  gerechnet (siehe [Bits und Bytes](../../grundlagen/bits-und-bytes.md))
  — die Bits beider Zahlen werden also **vereinigt**.

## Einsatzideen

- **Sammel-Melder**: Mehrere Auslöser (Fenster 1 offen, Fenster 2 offen …)
  führen auf einen gemeinsamen Alarm.
- **Weder-noch-Melder**: Der Ausgang `!O` ist schon ein fertiges „weder
  das eine noch das andere" — in der Fachsprache **NOR** genannt. Er ist
  nur an, wenn **gar nichts** an ist. Praktisch als „Ruhe-Anzeige":

```operatorsv2
{
	"opAll": [
		{ "_#new": "Or", "_id": "or2", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

  Solange beide Eingänge aus sind, ist `!O` an — schalte einen an, und die
  „Ruhe" ist vorbei.

- **Bits setzen** (Modus Bitwise): Mit einer festen Zahl auf `B` schaltest
  du bestimmte Bits von `A` garantiert an, ohne die übrigen zu verändern —
  das Gegenstück zur Schablonen-Zahl (Maske) des [And](and.md).
- Übrigens: Führen mehrere Leitungen auf **denselben Eingang**, verhalten
  sie sich von selbst wie ein Or (siehe
  [Werte und Signale](../../grundlagen/werte-und-signale.md)) — ein
  explizites Or macht diese Absicht aber sichtbar und hält die Schaltung
  lesbar.

## Siehe auch

[And](and.md) · [Xor](xor.md) · [Not](not.md)
