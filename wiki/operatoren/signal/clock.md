# Clock

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Die Clock ist das **Metronom** der Schaltung: Sie kippt ihren Ausgang in
einem einstellbaren Rhythmus um — alle `B` Ticks einmal. Und sie hat einen
Hauptschalter: Nur solange `P` (Power) an ist, läuft sie überhaupt.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Das Intervall: Nach so vielen Ticks kippt der Ausgang um |
| `P` | Eingang | Bit | Power: Die Clock zählt und kippt nur, solange an |
| `C` | Ausgang | Bit | Das Taktsignal (Rechteckwelle) |
| `!C` | Ausgang | Bit | Das Gegenteil des Taktsignals |

Zur Einordnung: Bei ca. 60 Ticks pro Sekunde ergibt `B` = 30 ungefähr
einen Wechsel pro halbe Sekunde — also ein Blinken im Sekundenrhythmus
(an + aus = 60 Ticks).

## Ausprobieren

Stelle das Intervall `B` auf etwa 30 und schalte `P` an — der Ausgang
blinkt. Kleineres `B` = schneller, größeres = langsamer:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Blinker**: Direkt auf eine [Lampe](../display/lamp.md) — fertig ist
  das Blinklicht.
- **Herzschlag für Abläufe**: Zähler antreiben
  ([Counter8](../memory/counter8.md)), Werte im Takt aus einem
  [Stack Input](../fixed-input/stack-input.md) abspielen, das
  [Terminal Display](../display/terminal-display.md) Zeichen für Zeichen
  beschreiben — fast jede automatische Schaltung beginnt mit einer Clock.
- **Start/Stopp**: Der `P`-Eingang ist die eingebaute Pausentaste — ein
  [Switch](../user-input/switch.md) oder ein
  [RS FlipFlop](../logic/rs-flipflop.md) daran startet und stoppt den
  ganzen Ablauf.
- **Mehrere Tempi**: Eine schnelle Clock plus
  [T FlipFlops](../logic/t-flipflop.md) zum Halbieren — oder einfach
  mehrere Clocks mit verschiedenen Intervallen.

## Siehe auch

[Tick](tick.md) · [Repeater](repeater.md) ·
[Counter8](../memory/counter8.md)
