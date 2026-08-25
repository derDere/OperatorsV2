# Signale

Zurück zur [Startseite](../index.md), oder zu den [Logik-Gattern](logic-gates.md).

## Clock

Die Clock kippt ihren Ausgang alle `B` Ticks, solange `P` (Power) an ist.
Das Interval per Regler als Bytewert setzen (z. B. `1E` = 30 Ticks), dann
Power auf true — der Clock-Ausgang rechts blinkt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Counter

Der Counter8 zählt bei jeder steigenden Flanke auf `I` hoch — das
Increment-Quadrat einfach zwischen true und false umschalten. Der Zählerstand
erscheint rechts als Bytewert `B` (blau, Hex); `U` und `O` pulsieren bei
Unter- bzw. Überlauf:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Counter8", "_id": "counter1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```
