# Erste Schritte

Zurück zur [Startseite](../index.md).

Auf dieser Seite baust du deine erste eigene Schaltung: einen Lichtschalter.
Ein **Switch** (Schalter) soll eine **Lamp** (Lampe) an- und ausknipsen.

## Den Editor öffnen

Der Editor ist die Startseite der Anwendung (die Adresse ohne `/wiki.html`
am Ende). Du siehst dort:

- links eine große **Zeichenfläche** mit Karo-Raster — hier entsteht die Schaltung,
- rechts eine helle **Panelfläche** — hier erscheinen später Bedienelemente
  wie Schalter, Lampen und Anzeigen,
- am Rand kleine aufklappbare Fenster: **🏠 Menu** (Speichern & Laden) und
  **🛠️ Properties** (Einstellungen des angeklickten Bausteins).

## Schritt 1: Einen Schalter platzieren

Mache einen **Doppelklick** auf eine freie Stelle der Zeichenfläche. Es
öffnet sich ein Auswahlfenster mit allen Bausteinen, sortiert nach
Kategorien. Oben kannst du tippen, um zu suchen. Klicke auf **Switch**
(Kategorie *User Input*) — der Schalter liegt jetzt auf der Fläche.

## Schritt 2: Eine Lampe platzieren

Noch ein Doppelklick, etwas weiter rechts. Wähle diesmal **Lamp**
(Kategorie *Display*).

## Schritt 3: Verbinden

Jeder Baustein hat kleine **Kreise** an den Seiten — das sind seine
Anschlüsse: **Eingänge links, Ausgänge rechts**. Drücke die linke Maustaste
auf dem Ausgang `O` des Switch, halte sie gedrückt, ziehe die Linie zum
Eingang `I` der Lamp und lasse dort los. Fertig ist die Verbindung.

Klicke jetzt auf den Schalter (auf den runden Knopf in seiner Mitte): Die
Lampe geht an. Genau diese Schaltung kannst du hier live ausprobieren —
klicke auf den Schalter:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Switch", "_id": "sw1", "_x": -100, "_y": 0 },
		{ "_#new": "Lamp", "_id": "lamp1", "_x": 100, "_y": 0 }
	],
	"conAll": [
		{ "s": "sw1_out_O", "e": "lamp1_in_I" }
	]
}
```

Das Kästchen rechts gehört zum zweiten Ausgang des Switch (`!O`, das
Gegenteil) — er ist in dieser Schaltung einfach nicht angeschlossen.

## Schritt 4: Ein Baustein dazwischen

Das eigentliche Vergnügen beginnt, wenn Bausteine *zwischen* Eingabe und
Anzeige sitzen und den Wert unterwegs verändern. Setze per Doppelklick ein
**Not** (Kategorie *Logic*) zwischen Schalter und Lampe und verdrahte:
Switch `O` → Not `A`, Not `!A` → Lamp `I`. Jetzt ist die Lampe genau dann
an, wenn der Schalter **aus** ist:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Switch", "_id": "sw2", "_x": -180, "_y": 0 },
		{ "_#new": "Not", "_id": "not1", "_x": 0, "_y": 0 },
		{ "_#new": "Lamp", "_id": "lamp2", "_x": 180, "_y": 0 }
	],
	"conAll": [
		{ "s": "sw2_out_O", "e": "not1_in_A" },
		{ "s": "not1_out_!A", "e": "lamp2_in_I" }
	]
}
```

## Schritt 5: Speichern

Öffne das **🏠 Menu** und wähle **💾 Save As** — die Schaltung wird als
Datei heruntergeladen. Mit **📂 Open File** lädst du sie später wieder.
Unter **📚 Examples** findest du außerdem fertige Beispiel-Schaltungen
zum Reinschnuppern (Achtung: Laden ersetzt die aktuelle Schaltung).

## Wie geht es weiter?

- Alle Maus- und Tastaturbefehle des Editors: [Steuerung](steuerung.md)
- Was genau durch die Leitungen fließt: [Werte und Signale](werte-und-signale.md)
- Alle Bausteine im Detail: [Operator-Lexikon](../operatoren/index.md)
