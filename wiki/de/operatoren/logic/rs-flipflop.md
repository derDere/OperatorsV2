# RS FlipFlop

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Das RS-FlipFlop ist das einfachste **Gedächtnis**: `S` (Set, englisch für
„setzen") schaltet den gespeicherten **Zustand** an, `R` (Reset, englisch
für „zurücksetzen") schaltet ihn aus — und dazwischen **bleibt er von
allein**, auch wenn beide Eingänge längst wieder aus sind. Wie ein
Lichtschalter mit zwei Knöpfen: einer für an, einer für aus, und
dazwischen behält der Schalter seinen Stand.

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

- **Alarm, der sich merkt**: Ein kurzer Auslöser auf `S` — ein
  Bewegungsmelder etwa, oder der Impuls, den ein
  [Counter](../memory/counter8.md) beim Sprung von 255 zurück auf 0
  abgibt (das nennt man einen **Überlauf**, siehe
  [Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
  Die Alarmlampe an `Q` bleibt an, bis jemand sie mit `R` ausschaltet.
- **Ein/Aus mit zwei Tastern**: Ein [Button](../user-input/button.md) auf
  `S` („Start"), ein zweiter auf `R` („Stopp") — die klassische
  Motorsteuerung. Der Motor läuft weiter, auch wenn der Start-Taster
  längst wieder losgelassen ist.
- **Betriebszustand halten**: Am `Q`-Ausgang liest du ab, ob „die Anlage
  läuft" — andere Schaltungsteile lassen sich darüber, zum Beispiel über
  ein [And](and.md), gezielt freischalten.

## Siehe auch

[T FlipFlop](t-flipflop.md) · [Memory (1 bit)](../memory/memory-1bit.md) ·
[Pulse](pulse.md)
