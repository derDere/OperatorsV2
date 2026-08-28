# Line Display

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Das Line Display ist das **Zeichenbrett** der Schaltung: eine Fläche von
255 × 255 Punkten, auf der ein unsichtbarer **Stift** umherfährt. Die
Schaltung gibt Zielkoordinaten vor und sagt entweder „spring hin" (`G`,
ohne Spur) oder „zieh eine Linie dorthin" (`D`). So entstehen Strich für
Strich Zeichnungen — wie bei einem Plotter. Die eigentliche Zeichenfläche
erscheint auf der Panelfläche rechts im Editor; ihre Anzeigegröße stellst
du in den Properties ein.

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
  [Counter](../memory/counter8.md) die laufende X-Achse — fertig sind
  Wellen, Spiralen und Kreise.
- **Malen von Hand**: Zwei [Slider](../user-input/slider.md) auf `X`/`Y`
  und ein [Button](../user-input/button.md) auf `D` — ein Zeichengerät im
  Stil klassischer Malschieber-Spielzeuge.
- **Messwerte plotten**: Werte über die Zeit auftragen — X zählt hoch,
  Y ist der Messwert, `D` zeichnet die Kurve.

## Siehe auch

[Terminal Display](terminal-display.md) ·
[Vector Rotate](../vector/vector-rotate.md) · [Sinus](../math/sinus.md)
