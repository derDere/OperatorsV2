# OperatorsV2 Wiki

Willkommen! **OperatorsV2** ist ein Baukasten im Browser: Du legst Bausteine
(„Operatoren") auf eine Fläche und verbindest sie mit Linien. Durch die Linien
fließen Werte — wie Strom durch Kabel. So entstehen Schaltungen: vom simplen
Lichtschalter über eine Digitaluhr bis zum kleinen Zeichencomputer.

**Du brauchst keinerlei Vorkenntnisse.** Diese Doku erklärt alles von Grund
auf — und das Beste: Fast jede Seite enthält **Live-Demos**. Das sind keine
Bilder, sondern echte, laufende Schaltungen direkt hier im Wiki.

## So bedienst du die Live-Demos

Eine Demo sieht so aus — probiere es gleich aus:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

- **Links** neben der Demo-Fläche stehen die freien **Eingänge**, **rechts**
  die **Ausgänge**. Jede Zeile hat ein kleines **Wert-Kästchen**.
- Die Farbe des Kästchens zeigt den Wert: **rot mit Haken = an**,
  **weiß = aus**, **blau mit zwei Zeichen = eine Zahl** (dazu später mehr).
- **Klicke auf ein Eingangs-Kästchen**: Es öffnet sich ein Schieberegler.
  Ganz links heißt *aus*, ganz rechts *an*, dazwischen liegen die Zahlen
  0 bis 255. Ein weiterer Klick auf das Kästchen springt direkt zwischen
  *an* und *aus* hin und her.
- Ausgangs-Kästchen kannst du nur ablesen — sie zeigen, was die Schaltung
  gerade ausgibt.
- Fahre mit der Maus über eine Zeile: Ein kleines Hinweis-Fenster
  (Tooltip) erklärt den Anschluss.

Stelle oben den Eingang auf *an* — der Ausgang des Not-Bausteins geht aus.
Genau das ist seine Aufgabe: Er dreht jeden Wert um.

## Wo fange ich an?

| Seite | Das lernst du dort |
| --- | --- |
| [Erste Schritte](grundlagen/erste-schritte.md) | Den Editor öffnen und die erste eigene Schaltung bauen |
| [Steuerung des Editors](grundlagen/steuerung.md) | Alle Maus- und Tastaturbefehle: platzieren, verbinden, löschen, speichern |
| [Werte und Signale](grundlagen/werte-und-signale.md) | Was durch die Leitungen fließt: an/aus, Zahlen, Farben, der Takt — und der Moment des Umschaltens |
| [Bits und Bytes](grundlagen/bits-und-bytes.md) | Wie Computer mit Schaltern zählen — verständlich erklärt |
| [Flanken und Takt](grundlagen/flanken-und-takt.md) | Tick, Takt, Flanke und Impuls: warum der Moment des Einschaltens zählt |
| [Stapel und Warteschlange](grundlagen/stapel-und-warteschlange.md) | Zahlen aufbewahren und in der passenden Reihenfolge zurückholen (LIFO und FIFO) |
| [Vektoren](grundlagen/vektoren.md) | Zwei Zahlen als Weg und als Stelle auf der Fläche — samt Drehen und Winkel |
| [Negative Zahlen und Überlauf](grundlagen/negative-zahlen-und-ueberlauf.md) | Was passiert, wenn eine Rechnung unter 0 rutscht oder über 255 hinausgeht |
| [Operator-Lexikon](operatoren/index.md) | Jeder Baustein ausführlich erklärt, mit Demos und Einsatzideen |

## Was steckt dahinter?

Jede Schaltung arbeitet in winzigen Arbeitsschritten, den **Ticks** — viele
Dutzend pro Sekunde. In jedem Tick schauen alle Bausteine auf ihre Eingänge
und setzen ihre Ausgänge neu. Deshalb reagiert alles sofort und läuft
ständig weiter, auch hier in den Demos.

> Tipp: Das Wiki erreichst du aus dem Editor jederzeit über den Menüpunkt
> **🌐 Wiki** im 🏠-Menü. Oben in der Leiste findest du außerdem eine
> **Suche**, die alle Wiki-Seiten durchstöbert, einen **←**-Knopf, der zur zuvor
> besuchten Seite zurückführt, und die **Sprachwahl** (Deutsch/English) —
> vorbelegt aus deiner Browsersprache.
