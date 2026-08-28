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
| Beschreibung ansehen | Maus über einen Eintrag halten (Tooltip) |
| Platzieren | Eintrag anklicken — der Baustein landet an der Doppelklick-Stelle |

Die Einträge sind nach **Kategorien** gruppiert (Logic, Math, Display …).
Dieselben Kategorien findest du im [Operator-Lexikon](../operatoren/index.md)
wieder.

## Ansicht bewegen

| Aktion | So geht's |
| --- | --- |
| Fläche verschieben | **Rechte Maustaste** gedrückt halten und ziehen |
| Position ablesen | Unten in der Mitte stehen die Koordinaten der Ansicht |
| Ursprung finden | Das dünne graue Achsenkreuz markiert den Nullpunkt |
| Orte merken | [Anchor](../operatoren/organisation/anchor.md)-Bausteine erscheinen im 📘-Bookmarks-Fenster und springen per Klick dorthin |

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
- Ein Ausgang darf **beliebig viele** Leitungen speisen.
- Führen **mehrere Leitungen auf denselben Eingang**, überlagern sich die
  Werte: Der Eingang ist an, sobald mindestens eine Quelle an ist
  (Details unter [Werte und Signale](werte-und-signale.md)).

## Löschen, Kopieren, Duplizieren

| Taste | Wirkung |
| --- | --- |
| **Entf** | Löscht die ausgewählten Bausteine — bzw. die Verbindung unter der Maus |
| **Strg + D** | Dupliziert die Auswahl leicht versetzt |
| **Strg + C** | Kopiert die Auswahl in die Zwischenablage |
| **Strg + V** | Fügt die Kopie in der Bildmitte ein (mehrfaches Einfügen versetzt jeweils) |

Kopiert wird immer die Auswahl **samt der Verbindungen** zwischen den
ausgewählten Bausteinen.

## Das Properties-Fenster (🛠️)

Klickst du einen Baustein an, zeigt das Properties-Fenster seine
Einstellungen — zum Beispiel den Text eines Kommentars, die Farbe einer
Lampe oder den Modus eines Logik-Gatters. Änderungen wirken sofort.
Ein kleines graues Dreieck an der oberen rechten Ecke des Bausteins zeigt,
wessen Einstellungen gerade angezeigt werden.

Bausteine mit Bedienelement (Schalter, Lampen, Anzeigen …) haben zusätzlich
die Felder `col`, `row`, `colSpan` und `rowSpan`: Sie bestimmen, in welcher
Zelle der rechten Panelfläche das Element erscheint.

## Die Panelfläche rechts

Manche Bausteine leben doppelt: als Kästchen auf der Zeichenfläche **und**
als Bedienelement auf der Panelfläche rechts — dort klickt man den echten
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
