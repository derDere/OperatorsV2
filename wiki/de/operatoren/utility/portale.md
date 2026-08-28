# Portale (Portal 1/4/8 Entry & Portal Exit)

[Operator-Lexikon](../index.md) · Kategorie: **Utility**

Ein Portal ist eine **Zaubertür für Signale**: Was vorn in die eine
Tür hineingeht, kommt aus der anderen Tür wieder heraus — ganz ohne
sichtbares Kabel dazwischen, selbst wenn die beiden Türen weit
auseinander auf der Zeichenfläche liegen. Genau das brauchst du, wenn
ein Signal quer über eine große Schaltung soll, ohne dass du die ganze
Fläche mit Leitungen überziehst.

Es gibt vier Bausteine:

| Baustein | Rolle | Leitungen |
| --- | --- | --- |
| Portal 1 Entry | Eingangs-Portal | 1 |
| Portal 4 Entry | Eingangs-Portal | 4 |
| Portal 8 Entry | Eingangs-Portal | 8 |
| Portal Exit | Ausgangs-Portal | passt sich dem verknüpften Entry an |

## So werden sie verbunden

1. Ein **Entry** platzieren — es bekommt sofort einen kurzen Namen
   (zum Beispiel `A3F0`), der direkt daneben steht. Diesen Namen kannst
   du im Properties-Fenster im Feld **Name** jederzeit ändern.
2. Einen **Portal Exit** platzieren und im Properties-Fenster unter
   **Origin** das gewünschte Entry aus der Liste auswählen.
3. Fertig: Das Exit übernimmt den Namen seines Entrys, färbt sich
   orange und bekommt automatisch genauso viele Ausgänge, wie das
   Entry Eingänge hat (`I1` → `O1`, `I2` → `O2` …).

Ein Entry darf mit **mehreren** Exits gleichzeitig verknüpft sein —
praktisch, um ein Signal an viele Orte zu verteilen. Zeigt ein Exit
stattdessen vier Fragezeichen (`????`), hat es sein Entry verloren — es
wurde gelöscht oder noch keins ausgewählt. Seine Ausgänge bleiben dann
leer.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I1`…`I8` | Eingang (Entry) | Bit oder Byte | Werte, die durch die Eingangs-Tür hineinfließen |
| `O1`…`O8` | Ausgang (Exit) | Bit oder Byte | Dieselben Werte, die an der Ausgangs-Tür wieder herauskommen |

## Ausprobieren

Links steht das Entry, rechts das verknüpfte Exit — ganz ohne Leitung
dazwischen. Stelle den Eingang um und beobachte den Ausgangs-Anschluss
des Exits: Der kleine Kreis übernimmt sofort dieselbe Farbe und
denselben Wert (halte die Maus darüber, um ihn als Tooltip zu sehen):

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

- **Kabelsalat auflösen**: Signale, die überall gebraucht werden — zum
  Beispiel ein [Takt](../../grundlagen/flanken-und-takt.md), der den
  Rhythmus vorgibt, oder eine Reset-Leitung, die alles zurücksetzt —
  wandern durch Portale statt durch meterlange Leitungen quer über die
  Fläche.
- **Module bauen**: Ein Schaltungsblock bekommt benannte Entry-Portale
  als „Ausgangsbuchsen" — andere Bausteine greifen sie per Exit ab,
  ganz ohne dass zwischen den Blöcken eine einzige Leitung nötig ist.
- **Signal vervielfachen**: Ein Entry, viele Exits — dieselbe Quelle
  erscheint gleichzeitig an beliebig vielen Orten.
- Sollen Signale **den Browser verlassen** — zu einem anderen Fenster
  oder einem anderen Rechner —, übernehmen das die
  [Network-Bausteine](../network/network-sender.md).

## Siehe auch

[Pipes](pipes.md) · [Network Sender](../network/network-sender.md) ·
[Steuerung](../../grundlagen/steuerung.md)
