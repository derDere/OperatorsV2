# Comment

[Operator-Lexikon](../index.md) · Kategorie: **Organisation**

Der Comment ist der **Notizzettel** der Zeichenfläche: ein gelber Kasten
mit frei wählbarem Text, der nichts berechnet und keine Anschlüsse hat —
er erklärt. Der Text steht im Properties-Fenster (Feld **Comment**);
`\n` erzeugt darin einen Zeilenumbruch, die Schriftgröße ist einstellbar.
Der Zettel passt seine Größe automatisch dem Text an.

## Anschlüsse

Keine — ein Comment ist reine Dokumentation.

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
  „Eingabe-Bereich", „Baustelle!" — wer eine Schaltung nach Wochen wieder
  öffnet (oder sie teilt), wird jeden Zettel lieben.
- **Bedienungsanleitungen**: Direkt neben Schalter und Regler notieren,
  was sie tun.
- **Werte-Spickzettel**: Zeichencodes, Kanalnamen, Adress-Belegungen des
  [Registers](../memory/register.md) — alles, was man beim Bauen ständig
  nachschlagen würde.

## Siehe auch

[Label](label.md) (Beschriftung für die Panelfläche) ·
[Anchor](anchor.md) (Orte wiederfinden)
