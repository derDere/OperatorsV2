# Memory (1 byte)

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Die Zahlen-Version von [Memory (1 bit)](memory-1bit.md): Dieser Baustein
speichert eine ganze **Zahl** (ein Byte). Genau in dem Moment, in dem der
Auslöser `T` von aus auf an springt — das ist die **steigende Flanke**
([Flanken und Takt](../../grundlagen/flanken-und-takt.md)) —, macht er
ein Foto von der Zahl an `B`. Ändert sich die Zahl am Eingang danach,
bleibt der Ausgang stehen, bis du erneut auslöst.

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

- **Würfelwurf festhalten**: [Random](../math/random.md) liefert ständig
  eine neue Zufallszahl. Frierst du diesen Strom mit `T` im richtigen
  Moment ein, hast du einen einzelnen Wurf — die Random-Seite zeigt
  dieses Duo in einer eigenen Demo.
- **Erst auf Knopfdruck gilt der Wert**: Ein
  [Slider](../user-input/slider.md) liefert laufend den Wert, den du
  gerade einstellst. Erst der „Übernehmen"-
  [Button](../user-input/button.md) an `T` macht ihn verbindlich.
- **Der Ausgang füttert sich selbst**: Leite den Ausgang in ein
  [Add](../math/add.md) und das Ergebnis zurück in den Eingang — so
  entsteht ein Kreis, den man **Rückkopplung** nennt. Bei jedem Auslösen
  kommt eine Zahl oben drauf: laufende Summen, gleichmäßig ansteigende
  Zahlenreihen (**Rampen**) und eigene Zähler mit beliebiger
  Schrittweite.
- **Gespeicherten Wert mit dem aktuellen vergleichen**: Halte die Kopie
  per [Equals](../math/equals.md) gegen den Wert, der gerade am Eingang
  anliegt. So erfährst du, ob sich seit dem letzten Auslösen etwas
  verändert hat.

## Siehe auch

[Memory (1 bit)](memory-1bit.md) · [Register](register.md) ·
[Counter8](counter8.md)
