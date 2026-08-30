# Line Display

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Das Line Display ist das **Zeichenbrett** der Schaltung: eine Fläche von
255 × 255 Punkten, auf der ein unsichtbarer **Stift** umherfährt. Du
gibst Zielkoordinaten vor und sagst entweder „spring dorthin" (`G`, ohne
Spur) oder „zieh eine Linie dorthin" (`D`). So entsteht Strich für
Strich eine Zeichnung. `G`, `D` und `C` reagieren dabei jeweils auf eine
**steigende Flanke**: den Moment, in dem der jeweilige Eingang von aus
auf an wechselt (mehr dazu unter
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Die
eigentliche Zeichenfläche erscheint auf der Panelfläche links im
Editor; ihre Anzeigegröße stellst du in den Properties ein.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `X` / `Y` | Eingang | Byte | Die Zielkoordinaten (0–255, Ursprung links oben) |
| `G` | Eingang | Bit | Goto — steigende Flanke: Stift springt ohne zu zeichnen |
| `D` | Eingang | Bit | Drawto — steigende Flanke: zieht eine Linie vom Stift zum Ziel |
| `W` | Eingang | Byte | Die Stiftdicke |
| `C` | Eingang | Bit | Steigende Flanke: wischt die Fläche leer |
| `X` / `Y` | Ausgang | Byte | Die aktuelle Stiftposition |
| `G` / `D` | Ausgang | Bit | Ein Tick an, wenn gerade gesprungen/gezeichnet wurde |
| `W` | Ausgang | Byte | Die aktuelle Stiftdicke |
| `T` | Ausgang | Bit | Ein Tick an bei jeder Stift-Aktion |

## Ausprobieren

Die Zeichenfläche gehört zur Panelfläche des Editors — der Baustein zeigt
aber die Stiftposition live an. Stelle `X` und `Y` ein und schalte `G` an
und aus: Die Positionsanzeige folgt (Zeichnen und Wischen wirken erst auf
der echten Fläche im Editor, darum sind `D` und `C` hier ruhiggestellt):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Line Display", "_id": "line1", "_x": 0, "_y": 0 },
		{ "_#new": "Value", "_id": "aus", "_x": -180, "_y": 140 }
	],
	"conAll": [
		{ "s": "aus_out_V", "e": "line1_in_D" },
		{ "s": "aus_out_V", "e": "line1_in_C" }
	]
}
```

## Einsatzideen

- **Figuren zeichnen**: Koordinaten-Paare aus einem
  [Stack Input](../fixed-input/stack-input.md) im
  [Clock](../signal/clock.md)-Takt abspielen — die Schaltung zeichnet
  Häuser, Sterne, Schriftzüge. Das Beispiel *draw* im 📚-Examples-Menü
  des Editors führt es vor.
- **Kurven malen**: [Sinus](../math/sinus.md) und
  [Cosinus](../math/cosinus.md) liefern Kreisbahnen, ein
  [Counter](../memory/counter8.md) lässt `X` gleichmäßig hochzählen —
  fertig sind Wellen, Spiralen und Kreise.
- **Malen von Hand**: Zwei [Slider](../user-input/slider.md) auf `X`/`Y`
  und ein [Button](../user-input/button.md) auf `D` — fertig ist ein
  Zeichengerät, das du von Hand führst.
- **Messwerte plotten**: `X` zählt hoch (die Zeit), `Y` ist der Messwert,
  `D` zeichnet die Kurve — so entsteht eine Kurve, an der du den Verlauf
  ablesen kannst.

## Siehe auch

[Terminal Display](terminal-display.md) ·
[Vector Rotate](../vector/vector-rotate.md) · [Sinus](../math/sinus.md)
