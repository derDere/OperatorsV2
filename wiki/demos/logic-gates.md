# Logik-Gatter

Zurück zur [Startseite](../index.md).

## And

Das And-Gatter schaltet seinen Ausgang `O` genau dann auf *true*, wenn beide
Eingänge *true* sind. Beide Eingänge links auf true stellen — der Ausgang
rechts folgt (Tooltip auf den Zeilen zeigt die Pin-Beschreibung):

```operatorsv2
{
	"opAll": [
		{ "_#new": "And", "_id": "and1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Or und Not verdrahtet

Demos dürfen aus mehreren Bausteinen bestehen — die Verbindungen laufen live.
Hier entsteht aus Or und Not ein **NOR**: der Ausgang des Not ist nur *true*,
wenn beide Eingänge des Or *false* sind. Rechts stehen die frei gebliebenen
Ausgänge beider Bausteine, darum tragen sie den Operatornamen in der
Beschriftung:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Or", "_id": "or1", "_x": -100, "_y": 0 },
		{ "_#new": "Not", "_id": "not1", "_x": 100, "_y": 0 }
	],
	"conAll": [
		{ "s": "or1_out_O", "e": "not1_in_I1" }
	]
}
```

Weiter zu den [Signalen](signals.md).
