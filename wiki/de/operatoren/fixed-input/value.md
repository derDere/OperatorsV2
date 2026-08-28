# Value

[Operator-Lexikon](../index.md) · Kategorie: **Fixed Input**

Value ist ein Baustein für **einen einzigen, festen Wert** — wie eine
Hausnummer an der Tür: Sie steht fest und ändert sich nicht von selbst.
So einen unveränderlichen Wert nennt man eine **Konstante**. Eingestellt
wird der Wert einmal im Properties-Fenster, danach liefert der Baustein
ihn bei jedem Tick erneut: entweder als an/aus-Wert (Einstellung
**binary** an) oder als Zahl 0–255 (**binary** aus, Zahl im Feld
**value**).

Der Baustein zeigt seinen Wert gut lesbar an: groß die Zahl, darunter die
Kurzform (ON/OFF bzw. Hex-Code) und das zugehörige Zeichen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `V` | Ausgang | Bit oder Byte | Der eingestellte Wert — Art je nach binary-Einstellung |

## Ausprobieren

Zwei Values mit verschiedenen Einstellungen — links ein fester
an/aus-Wert, rechts eine feste Zahl (die Kästchen rechts zeigen beide
Ausgänge):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Value", "_id": "valBit", "_x": -100, "_y": 0, "binary": true, "value": 1 },
		{ "_#new": "Value", "_id": "valByte", "_x": 100, "_y": 0, "binary": false, "value": 42 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Feste Vergleichs- und Rechenwerte**: Die 6 für den Würfel
  ([Modulo](../math/modulo.md)), die 48, um aus einer Ziffer ihren
  Zeichencode zu machen ([Add](../math/add.md), siehe
  [Text Input](../user-input/text-input.md)), der Sollwert für
  [Equals](../math/equals.md).
- **Dauerhaft an**: Ein binary-Value auf an ist der „Immer-Strom" — z. B.
  für den Power-Eingang einer [Clock](../signal/clock.md), die nie
  stehen bleiben soll.
- **Ruhe stiften**: Ein Value auf aus/0 hält unbenutzte Eingänge definiert
  ruhig — viele Demos in diesem Wiki nutzen genau diesen Trick.
- Soll der Wert **verstellbar** sein, greif zum
  [Slider](../user-input/slider.md) oder [Switch](../user-input/switch.md).

## Siehe auch

[Stack Input](stack-input.md) · [Slider](../user-input/slider.md) ·
[Switch](../user-input/switch.md)
