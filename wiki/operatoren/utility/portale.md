# Portale (Portal 1/4/8 Entry & Portal Exit)

[Operator-Lexikon](../index.md) · Kategorie: **Utility**

Portale sind **unsichtbare Leitungen**: Was in ein Eingangs-Portal
hineinfließt, kommt aus dem verknüpften Ausgangs-Portal wieder heraus —
ganz ohne sichtbare Verbindung dazwischen. Ideal, wenn Signale einmal quer
über eine große Schaltung müssen, ohne alles mit Linien zu überziehen.

Es gibt vier Bausteine:

| Baustein | Rolle | Leitungen |
| --- | --- | --- |
| Portal 1 Entry | Eingangs-Portal | 1 |
| Portal 4 Entry | Eingangs-Portal | 4 |
| Portal 8 Entry | Eingangs-Portal | 8 |
| Portal Exit | Ausgangs-Portal | passt sich dem verknüpften Entry an |

## So werden sie verbunden

1. Ein **Entry** platzieren. Es bekommt automatisch einen kurzen Namen
   (z. B. `A3F0`), der daneben steht — in den Properties (Feld **Name**)
   frei änderbar.
2. Ein **Portal Exit** platzieren und in dessen Properties unter
   **Origin** das gewünschte Entry aus der Liste wählen.
3. Fertig: Das Exit zeigt den Namen seines Entrys, färbt sich orange und
   bekommt automatisch so viele Ausgänge, wie das Entry Eingänge hat
   (`I1` → `O1`, `I2` → `O2` …).

Ein Entry darf von **mehreren** Exits angezapft werden — praktisch, um ein
Signal an viele Orte zu verteilen. Zeigt ein Exit `????`, findet es sein
Entry nicht (gelöscht oder noch nicht gewählt); seine Ausgänge sind dann leer.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I1`…`I8` | Eingang (Entry) | Bit oder Byte | Werte, die ins Portal hineinfließen |
| `O1`…`O8` | Ausgang (Exit) | Bit oder Byte | Dieselben Werte am anderen Ende |

## Ausprobieren

Links das Entry, rechts das verknüpfte Exit — ohne Leitung dazwischen.
Stelle den Eingang um und beobachte den Ausgangs-Anschluss des Exits: Der
kleine Kreis übernimmt Farbe und Wert (Maus darüber halten zeigt ihn als
Tooltip):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Portal 1 Entry", "_id": "pin1", "_x": -160, "_y": 0, "Name": "DEMO" },
		{ "_#new": "Portal Exit", "_id": "pout1", "_x": 160, "_y": 0, "Origin": "pin1" }
	],
	"conAll": []
}
```

## Einsatzideen

- **Kabelsalat auflösen**: Taktsignale, Reset-Leitungen oder Statuswerte,
  die überall gebraucht werden, wandern durch Portale statt durch
  meterlange Linien.
- **Module bauen**: Ein Schaltungsblock bekommt benannte Entry-Portale als
  „Ausgangsbuchsen" — andere Blöcke greifen sie per Exit ab, ohne dass man
  die Blöcke verdrahten muss.
- **Signal vervielfachen**: Ein Entry, viele Exits — dieselbe Quelle
  erscheint an beliebig vielen Orten.
- Sollen Signale **den Browser verlassen** (anderes Fenster, anderer
  Rechner), übernehmen die
  [Network-Bausteine](../network/network-sender.md).

## Siehe auch

[Pipes](pipes.md) · [Network Sender](../network/network-sender.md) ·
[Steuerung](../../grundlagen/steuerung.md)
