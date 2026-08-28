# Comment

[Operator-Lexikon](../index.md) · Kategorie: **Organisation**

Der Comment ist der **Notizzettel** der Zeichenfläche: ein gelber
Kasten mit Text, den du frei wählst. Er berechnet nichts und hat keine
Anschlüsse — die Schaltung läuft genau gleich, ob der Zettel da ist
oder nicht. Er ist für die Menschen da, die die Schaltung lesen. Den
Text schreibst du im Properties-Fenster ins Feld **Comment**; `\n`
erzeugt darin einen Zeilenumbruch, und die Schriftgröße lässt sich
einstellen. Der Zettel passt seine Größe automatisch an den Text an.

## Anschlüsse

Keine — ein Comment erklärt nur; er hat nichts zu berechnen.

## Ausprobieren

```operatorsv2
{
	"opAll": [
		{ "_#new": "Comment", "_id": "note1", "_x": 0, "_y": 0, "Comment": "Merke:\\nGelbe Zettel erklären\\ndie Schaltung!", "Font Size": 14 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Schaltungsteile beschriften**: „Hier wird die Sekunde gezählt",
  „Eingabe-Bereich", „Baustelle!" — wer die Schaltung nach Wochen wieder
  öffnet oder sie weitergibt, findet sich damit sofort zurecht.
- **Bedienungsanleitungen**: Direkt neben Schalter und Regler notieren,
  was sie tun.
- **Werte-Spickzettel**: Zeichencodes (welche Zahl für welches Zeichen
  steht), Kanalnamen oder welche Zahl im
  [Register](../memory/register.md) wofür steht — alles, was man beim
  Bauen ständig nachschlagen würde.

## Siehe auch

[Label](label.md) (Beschriftung für die Panelfläche) ·
[Anchor](anchor.md) (Orte wiederfinden)
