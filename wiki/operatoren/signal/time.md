# Time

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Time holt die **echte Uhrzeit** in die Schaltung: Jahr, Monat, Tag,
Stunde, Minute, Sekunde und mehr — alles als Bytes, jeden Tick frisch.
Zusätzlich gibt es einen Melde-Ausgang `T`, der umkippt, sobald sich ein
von dir gewählter Zeitteil ändert.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `Y`, `MO`, `D`, `H`, `MI`, `S` | Eingang | Bit | Auswahl: Welche Zeitteile der Melder `T` beobachten soll |
| `YH` / `YL` | Ausgang | Byte | Jahr, oberes/unteres Byte (Jahr = YH × 256 + YL) |
| `MO` | Ausgang | Byte | Monat (1–12) |
| `D` | Ausgang | Byte | Tag im Monat (1–31) |
| `KW` | Ausgang | Byte | Kalenderwoche (nach ISO: Woche 1 enthält den ersten Donnerstag des Jahres) |
| `DW` | Ausgang | Byte | Wochentag (0 = Montag … 6 = Sonntag) |
| `H` | Ausgang | Byte | Stunde (0–23) |
| `MI` | Ausgang | Byte | Minute (0–59) |
| `S` | Ausgang | Byte | Sekunde (0–59) |
| `MSH` / `MSL` | Ausgang | Byte | Millisekunde, oberes/unteres Byte |
| `T` | Ausgang | Bit | Kippt um, wenn sich ein ausgewählter Zeitteil ändert (ohne Auswahl: bei jeder Millisekunde) |

Im Properties-Fenster schaltet **IsUTC** auf Weltzeit (UTC) statt Ortszeit um.

## Ausprobieren

Rechts läuft die echte Uhr (Werte als Hex-Code — die Sekunde `3B` ist
dezimal 59). Schalte links `S` an: Der Melder `T` kippt nun im
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

- **Digitaluhr bauen**: Stunden- und Minuten-Byte über
  [Base Converter](../converter/base-converter.md),
  [Byte to 4bit decoder](../converter/byte-zu-4bit.md) und
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) auf
  [Ziffernanzeigen](../display/7segment-display.md) geben — genau das
  zeigt das Beispiel *clock* im 📚-Examples-Menü des Editors.
- **Binäruhr**: Die Zeit-Bytes mit
  [Byte to 8bit decoder](../converter/byte-zu-8bit.md) zerlegen und auf
  [Lampen](../display/lamp.md) legen.
- **Sekunden-Takt**: `S` auswählen und `T` als gemächlichen, echten
  1-Sekunden-Takt nutzen — die [Clock](clock.md) tickt nur in
  Schaltungs-Ticks, Time in echter Zeit.
- **Zeitschaltuhr**: Stunde per [Equals](../math/equals.md) mit einem
  festen [Value](../fixed-input/value.md) vergleichen — „um 8 Uhr an".

## Siehe auch

[Clock](clock.md) · [Base Converter](../converter/base-converter.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
