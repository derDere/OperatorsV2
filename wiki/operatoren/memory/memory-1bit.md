# Memory (1 bit)

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Dieser Baustein ist die kleinste **Fotokamera für Werte**: Beim
Einschalt-Moment am Auslöser `T` (steigende Flanke) macht er ein „Foto"
des Bits am Eingang `B1` und hält es fest — egal, wie sich der Eingang
danach verändert.

Der Unterschied zum [RS FlipFlop](../logic/rs-flipflop.md): Dort sagen die
Eingänge direkt „an!" oder „aus!" — hier sagt der Auslöser nur „jetzt
merken!", und **was** gemerkt wird, bestimmt der Werte-Eingang.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Bit | Der Wert, der beim Auslösen gespeichert wird |
| `T` | Eingang | Bit | Auslöser: speichert bei steigender Flanke |
| `B` | Ausgang | Bit | Der gespeicherte Wert |
| `!B` | Ausgang | Bit | Das Gegenteil des gespeicherten Werts |

## Ausprobieren

Stelle `B1` an oder aus und drücke dann den Auslöser (schalte `T` an) —
erst jetzt übernimmt `B` den Wert. Ändere `B1` danach beliebig: `B` bleibt,
bis du wieder auslöst:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 bit)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zustand einfrieren**: „Wie stand der Schalter, als der Startknopf
  gedrückt wurde?" — Momentaufnahmen zu einem definierten Zeitpunkt.
- **Taktgesteuerte Ketten**: Mehrere 1-bit-Speicher hintereinander, alle
  mit demselben Takt auf `T`, reichen ein Bit pro Takt eine Station
  weiter — ein Schieberegister, die Grundlage von Lauflichtern.
- **Entkoppeln**: Ein wild zappelnder Wert wird nur zu festen Zeitpunkten
  übernommen — dahinter arbeitet die Schaltung mit einem ruhigen Signal.

## Siehe auch

[Memory (1 byte)](memory-1byte.md) · [RS FlipFlop](../logic/rs-flipflop.md) ·
[Repeater](../signal/repeater.md)
