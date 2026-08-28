# RS FlipFlop

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Das RS-FlipFlop ist das einfachste **Gedächtnis**: Es merkt sich einen
an/aus-Zustand. `S` (Set) schaltet den gespeicherten Zustand an, `R`
(Reset) schaltet ihn aus — und dazwischen **bleibt er von allein**, auch
wenn beide Eingänge längst wieder aus sind. Wie eine Rastschaltung: einmal
gedrückt, bleibt gedrückt.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `S` | Eingang | Bit | Setzen: Zustand wird an, solange `S` an ist |
| `R` | Eingang | Bit | Zurücksetzen: Zustand wird aus, solange `R` an ist |
| `Q` | Ausgang | Bit | Der gespeicherte Zustand |
| `!Q` | Ausgang | Bit | Das Gegenteil des Zustands |

Sind `S` und `R` gleichzeitig an, gewinnt `S`.

## Ausprobieren

Tippe `S` kurz an und wieder aus — `Q` bleibt an. Erst `R` löscht wieder:

```operatorsv2
{
	"opAll": [
		{ "_#new": "RS FlipFlop", "_id": "rs1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Alarm, der sich merkt**: Ein kurzer Auslöser (Bewegungsmelder,
  Überlauf-Impuls eines [Counters](../memory/counter8.md) …) auf `S` — die
  Alarmlampe an `Q` bleibt an, bis jemand mit `R` quittiert.
- **Ein/Aus mit zwei Tastern**: Ein [Button](../user-input/button.md) auf
  `S` („Start"), ein zweiter auf `R` („Stopp") — fertig ist die klassische
  Motorsteuerung mit Selbsthaltung.
- **Betriebszustand halten**: Der `Q`-Ausgang eignet sich als „Anlage
  läuft"-Signal, das andere Schaltungsteile über ein [And](and.md)
  freischaltet.

## Siehe auch

[T FlipFlop](t-flipflop.md) · [Memory (1 bit)](../memory/memory-1bit.md) ·
[Pulse](pulse.md)
