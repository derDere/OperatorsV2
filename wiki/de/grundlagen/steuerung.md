# Steuerung des Editors

Zurück zur [Startseite](../index.md).

Diese Seite ist das Nachschlagewerk für alle Maus- und Tastaturbefehle des
Editors. Die wichtigsten Handgriffe stehen auch oben links auf der
Zeichenfläche als Spickzettel.

## Bausteine platzieren

| Aktion | So geht's |
| --- | --- |
| Baustein hinzufügen | **Doppelklick** auf eine freie Stelle der Fläche |
| Im Auswahlfenster suchen | Einfach lostippen — die Liste filtert sofort |
| Beschreibung ansehen | Maus über einen Eintrag halten — ein kleines Hinweis-Fenster (Tooltip) erscheint |
| Platzieren | Eintrag anklicken — der Baustein landet an der Doppelklick-Stelle |

Die Einträge sind nach **Kategorien** gruppiert (Logic, Math, Display …).
Dieselben Kategorien findest du im [Operator-Lexikon](../operatoren/index.md)
wieder.

## Ansicht bewegen

| Aktion | So geht's |
| --- | --- |
| Fläche verschieben | **Rechte Maustaste** gedrückt halten und ziehen |
| Näher heran und wieder weg | Am **Mausrad** drehen — vergrößert wird immer auf den Mauszeiger zu |
| Maßstab zurücksetzen | **Strg + 0** stellt wieder die Normalgröße her; der Bildausschnitt bleibt, wo er ist |
| Position ablesen | Unten in der Mitte zeigen zwei Zahlen, wo du gerade bist — solche Orts-Zahlen nennt man Koordinaten |
| Den Nullpunkt finden | Zwei dünne graue Linien kreuzen sich dort, wo beide Orts-Zahlen 0 sind |
| Orte merken | [Anchor](../operatoren/organisation/anchor.md)-Bausteine erscheinen im 📘-Bookmarks-Fenster und springen per Klick dorthin |

Wie groß gerade alles dargestellt wird, steht oben links als **Zoom** in
Prozent: 100 % ist die Normalgröße, 400 % das Vierfache, 12,5 % ein Achtel
— weiter als bis zu diesen beiden Werten geht es nicht.

Das Raster im Hintergrund wächst nicht einfach mit, sondern **wechselt
seinen Abstand**, damit die Linien nie zu Rauschen verschmelzen: Bei
Normalgröße liegt eine Linie alle 20 Schritte, weiter weg alle 40 oder 80,
ganz nah heran alle 10. Eingerastet werden die Bausteine dabei immer auf 20
Schritte — beim gröberen Raster sitzt also jeder zweite Baustein zwischen
zwei Linien.

## Bausteine bewegen und auswählen

| Aktion | So geht's |
| --- | --- |
| Verschieben | Baustein mit der **linken Maustaste** ziehen — beim Loslassen rastet er auf das Raster ein |
| Auswählen | Baustein anklicken (blauer Rahmen) — seine Einstellungen erscheinen im 🛠️-Properties-Fenster |
| Mehrere auswählen | **Shift + Klick** fügt hinzu, **Strg + Klick** fügt hinzu bzw. entfernt wieder |
| Rechteck-Auswahl | Mit gedrückter linker Maustaste auf freier Fläche ein Rechteck aufziehen |
| Auswahl verschieben | Einen der ausgewählten Bausteine ziehen — alle wandern mit |

## Verbindungen

| Aktion | So geht's |
| --- | --- |
| Verbinden | Linke Maustaste auf einem Anschluss-Kreis drücken, zur Gegenseite ziehen, loslassen |
| Wert ablesen | Maus über eine Linie oder einen Anschluss halten — der Tooltip zeigt den aktuellen Wert |
| Eine Verbindung löschen | Maus über die Linie halten und **Entf** drücken |
| Viele Verbindungen kappen | **Strg + Ziehen** auf freier Fläche: Alles, was die rote Schnittlinie kreuzt, wird getrennt |

Regeln beim Verbinden:

- Verbunden wird immer **ein Ausgang mit einem Eingang** — nie zwei gleiche Seiten.
- Von einem Ausgang dürfen **beliebig viele** Leitungen abgehen.
- Führen **mehrere Leitungen auf denselben Eingang**, überlagern sich die
  Werte: Der Eingang ist an, sobald mindestens eine Quelle an ist
  (Details unter [Werte und Signale](werte-und-signale.md)).

## Löschen, Kopieren, Duplizieren

| Taste | Wirkung |
| --- | --- |
| **Entf** | Löscht die ausgewählten Bausteine — bzw. die Verbindung unter der Maus |
| **Strg + D** | Verdoppelt die Auswahl — die Kopie erscheint leicht versetzt daneben |
| **Strg + C** | Kopiert die Auswahl in die Zwischenablage |
| **Strg + V** | Fügt die Kopie in der Bildmitte ein (mehrfaches Einfügen versetzt jeweils) |

Kopiert wird immer die Auswahl **samt der Verbindungen** zwischen den
ausgewählten Bausteinen.

## Das Properties-Fenster (🛠️)

Klickst du einen Baustein an, zeigt das Properties-Fenster seine
Einstellungen — zum Beispiel den Text eines Kommentars, die Farbe einer
Lampe oder die Arbeitsweise eines Logik-Bausteins. Änderungen wirken sofort.
Ein kleines graues Dreieck an der oberen rechten Ecke des Bausteins zeigt,
wessen Einstellungen gerade angezeigt werden.

Bausteine mit Bedienelement (Schalter, Lampen, Anzeigen …) haben zusätzlich
die Felder `col`, `row`, `colSpan` und `rowSpan`: `col` ist die Spalte,
`row` die Zeile — sie bestimmen, in welchem Feld der linken Panelfläche das
Element erscheint. Mit `colSpan` und `rowSpan` darf es mehrere Felder breit
oder hoch werden.

## Die Panelfläche links

Manche Bausteine leben doppelt: als Kästchen auf der Zeichenfläche **und**
als Bedienelement auf der Panelfläche links — dort klickt man den echten
Schalter, sieht die echte Lampe oder die Anzeige. Die Panelfläche ist wie
eine Tabelle aufgebaut; Position und Größe je Element stellst du über die
Properties ein. Den Trennbalken zwischen Zeichen- und Panelfläche kannst du
mit der Maus verschieben.

## Das Menü (🏠)

| Eintrag | Wirkung |
| --- | --- |
| 📄 New | Leert die komplette Schaltung (mit Rückfrage) |
| 💾 Save As | Speichert die Schaltung als Datei (Download) |
| 📂 Open File | Lädt eine gespeicherte Datei — ersetzt die aktuelle Schaltung |
| 📤 Export | Speichert nur die Auswahl (ohne Auswahl: alles) |
| 📥 Import | Fügt eine gespeicherte Datei mittig in die laufende Schaltung ein |
| 🌐 Wiki | Öffnet diese Dokumentation |
| 📚 Examples | Fertige Beispiel-Schaltungen vom Server — Laden ersetzt die aktuelle Schaltung |

Verlässt du die Seite, obwohl die letzte Speicherung eine Weile her ist,
fragt der Browser sicherheitshalber nach.

## Weiterlesen

- [Erste Schritte](erste-schritte.md) — die erste Schaltung Schritt für Schritt
- [Werte und Signale](werte-und-signale.md) — was durch die Leitungen fließt
- [Operator-Lexikon](../operatoren/index.md) — alle Bausteine im Detail
