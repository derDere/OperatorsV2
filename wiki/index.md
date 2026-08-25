# OperatorsV2 Wiki

Willkommen in der Dokumentation von **OperatorsV2** — dem visuellen Logik- und
Datenfluss-Editor. Diese Seiten werden als Markdown geschrieben und vom Server
als HTML ausgeliefert; das Besondere sind die **Live-Demos**: lauffähige
Operator-Aufbauten direkt in der Doku.

> Die Demos sind echte Schaltungen — die Werte fließen pro Frame durch die
> Verbindungen, genau wie im Editor.

## Erste Demo

Ein Not-Gatter. Unverdrahtete Eingänge stehen **links**, unverdrahtete
Ausgänge **rechts** neben dem Canvas — jeweils als kleines Wert-Quadrat in den
Statusfarben (rot = true, weiß = false, blau = Bytewert als Hex). Ein Klick
auf ein Eingangs-Quadrat öffnet einen Regler von −1 (false) bis 256 (true),
ein weiterer Klick schaltet direkt zwischen true und false um:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Seiten

| Seite | Inhalt |
| --- | --- |
| [Logik-Gatter](demos/logic-gates.md) | And, Or, Not — Eingänge stellen, Ausgänge ablesen |
| [Signale](demos/signals.md) | Clock und Counter — getaktete Demos mit Bytewerten |

## So entsteht eine Demo

Ein Codeblock mit dem Typ `operatorsv2` enthält einen gespeicherten Aufbau als
JSON (dasselbe Format wie *Save* im Editor). Unverdrahtete Eingänge erscheinen
automatisch links, unverdrahtete Ausgänge rechts neben dem Canvas — mit dem
Displaynamen als Beschriftung und der Pin-Beschreibung als Tooltip; die
Ausgangs-Quadrate sind nur lesend.
