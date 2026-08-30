# Erste Schritte

Zurück zur [Startseite](../index.md).

Ein Lichtschalter an der Wand, eine Lampe an der Decke, ein Kabel
dazwischen — genau das baust du auf dieser Seite nach, nur auf dem
Bildschirm: einen Schalter, eine Lampe und eine Linie dazwischen, durch
die das Signal von einem zum anderen läuft. So ein Gebilde aus Bausteinen
und Linien nennt man **Schaltung**.

Die Bausteine tragen englische Namen: Der Schalter heißt **Switch**, die
Lampe heißt **Lamp**.

## Den Editor öffnen

Der Editor ist die Bau-Seite von OperatorsV2 — die Startseite der Anwendung
(die Adresse ohne `/wiki.html` am Ende). Du siehst dort:

- rechts eine große **Zeichenfläche** mit Karo-Raster — hier entsteht die
  Schaltung,
- links eine helle **Panelfläche** — hier erscheint alles zum Bedienen und
  Ablesen: Schalter, Lampen, Anzeigen,
- am Rand kleine aufklappbare Fenster: **🏠 Menu** (Speichern & Laden) und
  **🛠️ Properties** — dort stehen die Einstellungen des Bausteins, den du
  angeklickt hast.

## Schritt 1: Einen Schalter platzieren

Mache einen **Doppelklick** — also zweimal schnell hintereinander klicken —
auf eine freie Stelle der Zeichenfläche. Es öffnet sich ein Auswahlfenster
mit allen Bausteinen, sortiert in Gruppen; diese Gruppen heißen
**Kategorien**. Unten im Fenster sitzt das Suchfeld; es ist gleich aktiv,
du kannst also sofort lostippen. Klicke auf **Switch** (Kategorie
*User Input* — dort stehen die Bausteine, die du selbst bedienst). Der
Schalter liegt damit auf der Fläche.

## Schritt 2: Eine Lampe platzieren

Noch ein Doppelklick, etwas weiter rechts. Wähle diesmal **Lamp**
(Kategorie *Display* — das sind die Anzeigen).

## Schritt 3: Verbinden

Jeder Baustein hat kleine **Kreise** an den Seiten — das sind seine
**Anschlüsse**, die Andockstellen für die Linien. Links sitzen die
**Eingänge**: Dort kommt etwas herein. Rechts sitzen die **Ausgänge**: Dort
gibt der Baustein etwas heraus.

Drücke die linke Maustaste auf dem Ausgang `O` des Switch, halte sie
gedrückt, ziehe die Linie zum Eingang `I` der Lamp und lasse dort los.
Fertig ist die Verbindung.

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

Das Kästchen rechts neben der Demo gehört zum zweiten Ausgang des Switch.
Er heißt `!O` und zeigt immer das Gegenteil von `O`: Ist der Schalter an,
ist `!O` aus. In dieser Schaltung führt keine Linie von ihm weg.

## Schritt 4: Ein Baustein dazwischen

Ein Baustein darf auch *zwischen* Schalter und Lampe sitzen und den Wert
unterwegs verändern. Setze per Doppelklick ein **Not** (Kategorie *Logic*)
dazwischen. „Not" ist englisch für „nicht", und genau das tut der Baustein:
Er dreht jeden Wert um — was an ist, kommt als aus heraus, und umgekehrt.

Verbinde dann den Ausgang `O` des Switch mit dem Eingang `A` des Not und den
Ausgang `!A` des Not mit dem Eingang `I` der Lamp. Die Lampe leuchtet
dadurch genau dann, wenn der Schalter **aus** ist:

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

Öffne das **🏠 Menu** und wähle **💾 Save As** („speichern unter"): Deine
Schaltung wandert als Datei auf deinen Rechner. Mit **📂 Open File** holst
du sie später wieder auf die Fläche. Unter **📚 Examples** liegen fertige
Beispiel-Schaltungen zum Anschauen — Achtung, beim Laden verschwindet, was
gerade auf der Fläche liegt.

## Wie geht es weiter?

- Alle Maus- und Tastaturbefehle des Editors: [Steuerung](steuerung.md)
- Was genau durch die Leitungen fließt: [Werte und Signale](werte-und-signale.md)
- In welchem Rhythmus die Schaltung arbeitet:
  [Flanken und Takt](flanken-und-takt.md)
- Alle Bausteine im Detail: [Operator-Lexikon](../operatoren/index.md)
