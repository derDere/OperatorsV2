# Terminal Display

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Das Terminal Display ist der **Text-Bildschirm** der Schaltung: ein Raster
aus Zeichen-Zellen mit einem **Cursor** (der aktuellen Schreibposition).
Die Schaltung schickt Zeichencodes (ein Byte pro Zeichen, siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)) — das Terminal
schreibt sie an die Cursor-Stelle und rückt weiter. Der eigentliche
Bildschirm erscheint auf der Panelfläche rechts im Editor, im Look einer
alten Fallblatt-Anzeige: Neue Zeichen „blättern" sichtbar ein. Breite und
Höhe des Rasters stellst du in den Properties ein.

Ein paar Zeichencodes wirken als Steuerzeichen: **10** springt an den
Anfang der nächsten Zeile, **13** an den Anfang der aktuellen Zeile,
**9** rückt wie eine Tab-Taste ein, **0** überspringt eine Zelle.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Der Zeichencode, der geschrieben werden soll |
| `W` | Eingang | Bit | Write — steigende Flanke: schreibt das Zeichen und rückt den Cursor weiter |
| `S` | Eingang | Bit | Set — steigende Flanke: schreibt, ohne den Cursor zu bewegen |
| `X` / `Y` | Eingang | Byte | Zielspalte/-zeile für den Sprung |
| `G` | Eingang | Bit | Goto — steigende Flanke: springt mit dem Cursor nach `X`/`Y` |
| `C` | Eingang | Bit | Clear: wischt den Bildschirm und setzt den Cursor nach links oben, solange an |
| `B` | Ausgang | Byte | Der Zeichencode unter dem Cursor |
| `X` / `Y` | Ausgang | Byte | Die aktuelle Cursor-Position |
| `T` | Ausgang | Bit | Ein Tick an, wenn sich Cursor oder Zeichen darunter geändert haben |
| `E` | Ausgang | Bit | An, solange der ganze Bildschirm leer ist |

## Ausprobieren

Der Bildschirm selbst gehört zur Panelfläche des Editors — der Baustein
zeigt aber Cursor-Position und Zeichen live an. Stelle `B` auf 72 (das
`H`) und schalte `W` an und aus: „In" zeigt dein Zeichen, der Cursor rückt
weiter. Mit `X`, `Y` und `G` springst du frei umher:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Terminal Display", "_id": "term1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Selbstschreibende Texte**: Ein
  [Stack Input](../fixed-input/stack-input.md) mit Zeichencodes, eine
  [Clock](../signal/clock.md) als Takt auf beide `T`/`W` — die Schaltung
  tippt ihre Botschaft Zeichen für Zeichen.
- **Tastatur-Echo**: [Text Input](../user-input/text-input.md) liefert
  Getipptes als Codes — direkt aufs Terminal geschrieben entsteht eine
  kleine Schreibmaschine; übers
  [Netzwerk](../network/network-sender.md) sogar ein Chat.
- **Positionierte Ausgaben**: Mit `G`, `X`, `Y` werden Anzeigen möglich,
  die Werte an festen Stellen aktualisieren — Tabellen, Spielfelder,
  Statuszeilen. Das Beispiel *mini_pc_sim* (📚-Examples-Menü) nutzt das
  Terminal als Bildschirm eines Mini-Rechners.
- **Lesen statt Schreiben**: Der `B`-Ausgang liefert das Zeichen unter dem
  Cursor — die Schaltung kann ihren eigenen Bildschirm abtasten.

## Siehe auch

[Text Input](../user-input/text-input.md) ·
[Stack Input](../fixed-input/stack-input.md) · [Line Display](line-display.md)
