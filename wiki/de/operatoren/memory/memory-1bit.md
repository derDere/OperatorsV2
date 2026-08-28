# Memory (1 bit)

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Dieser Baustein macht ein Foto vom Wert an `B1` — an oder aus — und hält
es fest, egal wie sich `B1` danach verändert. Ausgelöst wird er über den
Eingang `T`: genau in dem Moment, in dem `T` von aus auf an springt.
Diesen Sprung nennt man **steigende Flanke**
([Flanken und Takt](../../grundlagen/flanken-und-takt.md)).

Beim [RS FlipFlop](../logic/rs-flipflop.md) schalten die Eingänge selbst
auf an oder aus. Hier löst `T` nur das Merken aus — **welchen** Wert der
Baustein festhält, bestimmt allein `B1`.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Bit | Der Wert, der beim Auslösen gespeichert wird |
| `T` | Eingang | Bit | Auslöser: speichert bei steigender Flanke |
| `B` | Ausgang | Bit | Der gespeicherte Wert |
| `!B` | Ausgang | Bit | Das Gegenteil des gespeicherten Werts |

## Ausprobieren

Stelle `B1` an oder aus und löse dann mit `T` aus — erst dadurch
übernimmt `B` den Wert. Ändere `B1` danach beliebig: `B` bleibt stehen,
bis du erneut auslöst:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 bit)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Einen Moment festhalten**: „Wie stand der Schalter, als der
  Startknopf gedrückt wurde?" Der Baustein hält genau diesen einen
  Zeitpunkt fest — man sagt: er friert den **Zustand** ein.
- **Werte weiterreichen**: Mehrere 1-Bit-Speicher hintereinander, alle
  vom selben **Takt** ausgelöst — dann wandert ein Bit bei jedem Tick
  eine Station weiter. So eine Kette heißt **Schieberegister** und
  steckt hinter jedem Lauflicht
  ([Flanken und Takt](../../grundlagen/flanken-und-takt.md)).
- **Zappeln beruhigen**: Ein Wert, der ständig hin und her springt, wird
  nur zu festen Zeitpunkten übernommen. Dahinter arbeitet die Schaltung
  mit einem ruhigen Signal.

## Siehe auch

[Memory (1 byte)](memory-1byte.md) · [RS FlipFlop](../logic/rs-flipflop.md) ·
[Repeater](../signal/repeater.md)
