# Label

[Operator-Lexikon](../index.md) · Kategorie: **Organisation**

Das Label ist die **Beschriftung für die Panelfläche**: Während der
[Comment](comment.md) auf der Zeichenfläche klebt, erscheint das Label
als Text zwischen den Schaltern und Reglern rechts — zum Beispiel als
Überschrift über einer Gruppe von Reglern, als Einheit neben einer Zahl
(etwa „cm" oder „°C") oder einfach als Trennlinie zwischen zwei
Bereichen. Schriftart, Größe und Farben wählst du frei; trägst du
zusätzlich einen Link ins Feld **Href** ein, wird der Text anklickbar
und ein Klick öffnet diesen Link in einem neuen Tab.

Auf der Zeichenfläche selbst zeigt sich das Label bewusst blass — es
rechnet nichts, es zeigt nur Text.

## Anschlüsse

Keine — das Label zeigt nur Text. Wie alle Panel-Bausteine wird seine
Position über `col`/`row` in den Properties bestimmt (siehe
[Steuerung](../../grundlagen/steuerung.md)).

## Ausprobieren

```operatorsv2
{
	"opAll": [
		{ "_#new": "Label", "_id": "label1", "_x": 0, "_y": 0, "Text": "Bedienpult" }
	],
	"conAll": []
}
```

(Der formatierte Text selbst erscheint auf der Panelfläche des Editors —
der Baustein hier zeigt eine Vorschau der Aufschrift.)

## Einsatzideen

- **Bedienpulte beschriften**: Über jeder Gruppe aus
  [Switches](../user-input/switch.md), [Slidern](../user-input/slider.md)
  und [Lampen](../display/lamp.md) sagt ein Label, was sie tut.
- **Anzeige-Deko**: Im Uhren-Beispiel *clock* (📚-Examples-Menü im
  Editor) ist der blinkende Doppelpunkt zwischen den Ziffern schlicht
  ein Label mit großer Schrift.
- **Links einbauen**: Per **Href** verweist ein Label z. B. auf die
  passende Wiki-Seite der eigenen Schaltung oder eine Projektseite.

## Siehe auch

[Comment](comment.md) · [Byte](../display/byte.md) ·
[Steuerung](../../grundlagen/steuerung.md)
