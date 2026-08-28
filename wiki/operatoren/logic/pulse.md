# Pulse

[Operator-Lexikon](../index.md) · Kategorie: **Logic**

Pulse macht **Momente** sichtbar: Er beobachtet seinen Eingang und feuert
einen **ein Tick kurzen Impuls**, sobald der Eingang umschaltet — auf `U`
beim Einschalten (steigende Flanke), auf `D` beim Ausschalten (fallende
Flanke). Was Flanken sind, erklärt
[Werte und Signale](../../grundlagen/werte-und-signale.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I` | Eingang | Bit | Das beobachtete Signal |
| `U` | Ausgang | Bit | Ein Tick an, wenn `I` gerade **eingeschaltet** wurde |
| `D` | Ausgang | Bit | Ein Tick an, wenn `I` gerade **ausgeschaltet** wurde |

## Ausprobieren

Ein einzelner Tick ist zu schnell fürs Auge — darum zählen hier zwei
[Counter8](../memory/counter8.md) die Impulse mit: Der obere zählt die
Einschalt-Momente (`U`), der untere die Ausschalt-Momente (`D`). Schalte
den Eingang links mehrmals an und aus — rechts gehören zu jedem Zähler
drei Kästchen, das blaue („Counter8 · Byte") ist der jeweilige
Zählerstand:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pulse", "_id": "pulse1", "_x": -200, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cntUp", "_x": 40, "_y": -70 },
		{ "_#new": "Counter8", "_id": "cntDown", "_x": 40, "_y": 70 },
		{ "_#new": "Value", "_id": "zero", "_x": -200, "_y": 160 }
	],
	"conAll": [
		{ "s": "pulse1_out_U", "e": "cntUp_in_I" },
		{ "s": "pulse1_out_D", "e": "cntDown_in_I" },
		{ "s": "zero_out_V", "e": "cntUp_in_D" },
		{ "s": "zero_out_V", "e": "cntUp_in_R" },
		{ "s": "zero_out_V", "e": "cntUp_in_B" },
		{ "s": "zero_out_V", "e": "cntUp_in_L" },
		{ "s": "zero_out_V", "e": "cntDown_in_D" },
		{ "s": "zero_out_V", "e": "cntDown_in_R" },
		{ "s": "zero_out_V", "e": "cntDown_in_B" },
		{ "s": "zero_out_V", "e": "cntDown_in_L" }
	]
}
```

(Der kleine VALUE-Baustein liefert nur eine ruhende Null für die übrigen
Zähler-Eingänge, damit sie hier nicht stören.)

## Einsatzideen

- **„Nur einmal pro Einschalten"**: Ein Dauersignal würde manche Aktionen
  ununterbrochen auslösen. Pulse verwandelt es in einen einzelnen Anstoß —
  perfekt vor Trigger-Eingängen von [Stack](../memory/stack.md),
  [Memory](../memory/memory-1byte.md) & Co. (Viele dieser Bausteine
  reagieren allerdings schon selbst nur auf die steigende Flanke — der
  Tooltip des Eingangs verrät es.)
- **Loslassen erkennen**: `D` feuert genau beim Ausschalten — z. B. um zu
  reagieren, wenn eine Taste **losgelassen** wird statt beim Drücken.
- **Umschalt-Melder**: `U` und `D` zusammen auf ein [Or](or.md) ergeben
  „der Wert hat sich geändert" — egal in welche Richtung.

## Siehe auch

[Button](../user-input/button.md) (liefert von Haus aus 1-Tick-Impulse) ·
[T FlipFlop](t-flipflop.md) · [Counter8](../memory/counter8.md)
