# Tick

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Tick ist der **schnellste Taktgeber** der Welt von OperatorsV2: Er wechselt
in jedem einzelnen Arbeitsschritt der Schaltung (jedem
[Tick](../../grundlagen/werte-und-signale.md)) zwischen an und aus. Keine
Einstellungen, kein Eingang — er tickt einfach.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `T` | Ausgang | Bit | Wechselt jeden Tick zwischen an und aus |
| `!T` | Ausgang | Bit | Das Gegenteil — immer genau andersherum |

## Ausprobieren

Die Kästchen flimmern so schnell, wie die Schaltung arbeitet:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tick", "_id": "tick1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Höchstes Tempo**: Alles, was pro Tick genau einmal angestoßen werden
  soll — etwa ein [Counter8](../memory/counter8.md), der als schnelle
  Rampe für [Sinus](../math/sinus.md)-Wellen dient, oder ein
  [Stack](../memory/stack.md), der im Eiltempo leergelesen wird.
- **Tempo-Referenz**: Da `T` mit jedem zweiten Tick an ist, entsteht das
  schnellstmögliche Blinksignal — praktisch, um zu sehen, wie flott die
  Schaltung gerade läuft.
- **Wenn es langsamer sein soll**: Für einstellbare Geschwindigkeiten ist
  die [Clock](clock.md) zuständig.

## Siehe auch

[Clock](clock.md) · [Werte und Signale](../../grundlagen/werte-und-signale.md)
