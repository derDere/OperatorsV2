# Memory (1 byte)

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Die Byte-Ausgabe der „Fotokamera": Beim Einschalt-Moment am Auslöser `T`
(steigende Flanke) speichert der Baustein die **Zahl** am Eingang `B` und
gibt sie ab dann unbeirrt aus — bis zum nächsten Auslösen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, die beim Auslösen gespeichert wird |
| `T` | Eingang | Bit | Auslöser: speichert bei steigender Flanke |
| `B` | Ausgang | Byte | Die gespeicherte Zahl |

## Ausprobieren

Stelle links eine Zahl ein und löse mit `T` aus — der Ausgang übernimmt
sie. Verstelle die Zahl danach: Der Ausgang bleibt stehen, bis du erneut
auslöst:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 byte)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Würfelwurf festhalten**: Den Dauerstrom von
  [Random](../math/random.md) im richtigen Moment einfrieren — das
  klassische Duo (Demo auf der Random-Seite).
- **Sollwert übernehmen**: Ein [Slider](../user-input/slider.md) liefert
  den Wunschwert, aber erst der „Übernehmen"-
  [Button](../user-input/button.md) auf `T` macht ihn gültig.
- **Rechnen mit Rückkopplung**: Speicher-Ausgang → [Add](../math/add.md)
  → zurück in den Speicher-Eingang; jeder Auslöser addiert einen Betrag
  auf. So entstehen laufende Summen, Rampen und eigene Zähler mit
  beliebiger Schrittweite.
- **Vorher/Nachher vergleichen**: Gespeicherte Kopie gegen den Live-Wert
  per [Equals](../math/equals.md) — meldet jede Veränderung seit dem
  letzten Auslösen.

## Siehe auch

[Memory (1 bit)](memory-1bit.md) · [Register](register.md) ·
[Counter8](counter8.md)
