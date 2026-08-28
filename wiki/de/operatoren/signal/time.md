# Time

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Time holt die **echte Uhrzeit** in deine Schaltung — dieselbe, die auch
deine Armbanduhr oder dein Handy zeigt. Jahr, Monat, Tag, Stunde, Minute,
Sekunde und noch ein paar Angaben mehr liegen an den Ausgängen bereit, je
als Byte und in jedem Tick frisch nachgesehen.

Dazu kommt der Melde-Ausgang `T`. Links kreuzt du an, worauf er achten
soll — zum Beispiel auf die Sekunde. Ändert sich dieser Teil der Uhrzeit,
kippt `T` von an auf aus oder zurück. Du bekommst also einen **Takt**, der
sich nach der echten Uhr richtet (siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `Y`, `MO`, `D`, `H`, `MI`, `S` | Eingang | Bit | Zum Ankreuzen: Auf welche Teile der Uhrzeit der Melder `T` achten soll |
| `YH` / `YL` | Ausgang | Byte | Das Jahr in zwei Teilen, weil ein Byte nur bis 255 zählt (Jahr = YH × 256 + YL) |
| `MO` | Ausgang | Byte | Monat (1–12) |
| `D` | Ausgang | Byte | Tag im Monat (1–31) |
| `KW` | Ausgang | Byte | Die wievielte Woche des Jahres gerade läuft (Woche 1 ist die mit dem ersten Donnerstag) |
| `DW` | Ausgang | Byte | Wochentag (0 = Montag … 6 = Sonntag) |
| `H` | Ausgang | Byte | Stunde (0–23) |
| `MI` | Ausgang | Byte | Minute (0–59) |
| `S` | Ausgang | Byte | Sekunde (0–59) |
| `MSH` / `MSL` | Ausgang | Byte | Die Millisekunde (eine Tausendstelsekunde) in zwei Teilen, wie beim Jahr |
| `T` | Ausgang | Bit | Kippt um, sobald sich ein angekreuzter Teil der Uhrzeit ändert (ohne Auswahl: bei jeder Millisekunde) |

Im Properties-Fenster schaltet **IsUTC** von deiner Ortszeit auf die
Weltzeit UTC um — das ist die Uhrzeit, nach der sich alle Zeitzonen der
Erde richten.

## Ausprobieren

Rechts läuft die echte Uhr. Die Kästchen schreiben ihre Werte als
**Hex-Code**, eine Schreibweise mit 16 Ziffern: nach der 9 geht es mit A
bis F weiter. Die Sekunde `3B` bedeutet deshalb 59, denn B steht für 11
und 3 × 16 + 11 = 59. Kreuze links `S` an — der Melder `T` kippt dann im
Sekundenrhythmus:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Time", "_id": "time1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Digitaluhr bauen**: Gib die Zahlen für Stunde und Minute über
  [Base Converter](../converter/base-converter.md),
  [Byte to 4bit decoder](../converter/byte-zu-4bit.md) und
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) auf
  [Ziffernanzeigen](../display/7segment-display.md) — genau das zeigt das
  Beispiel *clock* im 📚-Examples-Menü des Editors.
- **Uhrzeit als Lichtpunkte**: Die Zeit-Bytes mit dem
  [Byte to 8bit decoder](../converter/byte-zu-8bit.md) in einzelne Bits
  zerlegen und auf [Lampen](../display/lamp.md) legen. Eine Uhr aus lauter
  An/Aus-Lichtern nennt man Binäruhr.
- **Ein echter Sekundentakt**: Kreuze `S` an und nutze `T` als
  verlässliches Klopfen im Sekundenabstand. Die [Clock](clock.md) zählt in
  Ticks der Schaltung, und die können mal schneller und mal langsamer
  kommen; Time richtet sich nach der echten Uhr.
- **Zeitschaltuhr**: Vergleiche die Stunde per
  [Equals](../math/equals.md) mit einer festen Zahl aus einem
  [Value](../fixed-input/value.md) — „um 8 Uhr an".

## Siehe auch

[Clock](clock.md) · [Base Converter](../converter/base-converter.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
