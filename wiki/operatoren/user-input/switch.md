# Switch

[Operator-Lexikon](../index.md) · Kategorie: **User Input**

Der Switch ist der **Lichtschalter** der Schaltung: Ein Klick schaltet ihn
an, der nächste wieder aus. Er ist die einfachste Art, von Hand ein
an/aus-Signal zu erzeugen.

Der Switch lebt doppelt: als klickbarer Baustein auf der Zeichenfläche
**und** als richtiger Kippschalter auf der Panelfläche rechts im Editor
(Position dort über `col`/`row` in den Properties — siehe
[Steuerung](../../grundlagen/steuerung.md)).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `O` | Ausgang | Bit | An, solange der Schalter an ist |
| `!O` | Ausgang | Bit | An, solange der Schalter aus ist |

## Ausprobieren

Klicke auf den runden Knopf des Schalters:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Switch", "_id": "sw1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Der Klassiker**: Switch → [Lamp](../display/lamp.md) — die erste
  Schaltung überhaupt (Schritt für Schritt in
  [Erste Schritte](../../grundlagen/erste-schritte.md)).
- **Freigaben**: Auf den Power-Eingang einer [Clock](../signal/clock.md)
  oder ein [And](../logic/and.md)-Tor gelegt, wird der Switch zum
  Hauptschalter ganzer Schaltungsteile.
- **Feste Bits setzen**: Vier Switches auf einen
  [4bit to byte decoder](../converter/4bit-zu-byte.md) — schon lässt sich
  eine Zahl von Hand „steckern".
- **Impulse statt Zustand** liefert der [Button](button.md) — er ist die
  Klingel, der Switch der Lichtschalter.

## Siehe auch

[Button](button.md) · [Slider](slider.md) ·
[Value](../fixed-input/value.md) (fester Wert statt Handschalter)
