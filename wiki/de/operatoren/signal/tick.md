# Tick

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Die Schaltung rechnet sich viele Male pro Sekunde einmal komplett durch,
ungefähr 60 Mal. Einen solchen Durchgang nennt man einen **Tick** (mehr
dazu unter [Flanken und Takt](../../grundlagen/flanken-und-takt.md)).

Tick ist der **schnellste Taktgeber**, den es hier gibt: Bei jedem
Durchgang wechselt sein Ausgang zwischen an und aus. Keine Einstellungen,
kein Eingang — er tickt einfach.

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
  soll — etwa ein [Counter8](../memory/counter8.md), der damit
  [Sinus](../math/sinus.md)-Wellen antreibt, oder ein
  [Stack](../memory/stack.md), der im Eiltempo leergelesen wird.
- **Tempo-Anzeige**: `T` ist jeden zweiten Tick an, das ist das
  schnellstmögliche Blinken. Daran siehst du, wie flott die Schaltung
  gerade läuft.
- **Wenn es langsamer sein soll**: Für einstellbare Geschwindigkeiten ist
  die [Clock](clock.md) zuständig.

## Siehe auch

[Clock](clock.md) · [Flanken und Takt](../../grundlagen/flanken-und-takt.md)
· [Werte und Signale](../../grundlagen/werte-und-signale.md)
