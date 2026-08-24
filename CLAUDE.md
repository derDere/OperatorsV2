# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

OperatorsV2 ist ein visueller Logik-/Datenfluss-Editor im Browser: Operatoren (Logikgatter,
Anzeigen, Eingabeelemente, Portale …) werden auf einer p5.js-Zeichenfläche platziert und über
Verbindungslinien verdrahtet; Werte (Booleans oder Bytes) fließen pro Frame durch die Verbindungen.

## Ausführen

Es gibt **kein Build-System, keinen Paketmanager, keine Tests, keinen Linter**. Die Anwendung ist
eine rein statische Seite:

- `index.html` direkt im Browser öffnen (kein Server nötig, es werden keine Assets nachgeladen).
- Unter `dev/` liegen eigenständige Testseiten für Teilstücke (dat.gui-Fork, Bezier-Beispiele),
  die ebenfalls direkt geöffnet werden.

**Klassische Scripts, keine Module:** Alle JS-Dateien werden in `index.html` per `<script>`-Tag
in Abhängigkeitsreihenfolge geladen und kommunizieren über Globals. Eine neue Datei muss dort an
der richtigen Stelle eingetragen werden (Basisklassen vor Unterklassen — z. B. `operator.js` vor
`js/operators/*`, `lines/connection_line.js` vor den Linienarten).

## Architektur

### Frame-Loop (js/sketch.js)

Eine p5-Instanz (`mainP5`, Instanzmodus) treibt alles: `main_draw` läuft jeden Frame und ruft erst
die Update-Phase (`updateConnections`, `updateControls` — inkl. Maus-Hit-Testing und Events), dann
die Draw-Phase auf. Alles wird jeden Frame komplett neu gezeichnet (Immediate Mode).
Weltkoordinaten haben ihren Ursprung in der Canvas-Mitte plus `dragOffset` (Rechtsklick-Drag
verschiebt die Fläche); das Global `mousePos` ist bereits in Weltkoordinaten.

### Klassenhierarchie

- **`Control`** (js/control.js) — Basis aller Canvas-Elemente: `id` (UUID), `pos`,
  Parent/Children-Baum, Rect- oder Circle-Bounds, `zIndex`, Ereignissystem
  (`onMouseDown/Up/Move/Click/Enter/Exit`). Globale Register: `AllControls`, `ControlMap`.
  Unterklassen überschreiben die virtuellen Hooks **`doUpdate(tick, p5ctx)`** und
  **`doDraw(tick, p5ctx)`**; beim Zeichnen ist der Ursprung schon auf die Control-Mitte
  verschoben (rectMode CENTER).
- **`Movable`** (js/movable.js) — macht ein Control per Linksklick ziehbar und rastet es beim
  Loslassen auf das 20-px-Raster (`fixPlacement`).
- **`Operator`** (js/operator.js) — Movable mit IO-Pins (`IOControl`-Kreise, angelegt über
  `newInput(name)` / `newOutput(name)`; leerer Name = unbeschriftet), Mehrfachauswahl
  (`selectedOperators`) und Serialisierung. Register: `AllOperators`.
- **`Placeable`** (js/operators/placeable.js) — Operator, der zusätzlich ein HTML-Element in die
  rechte Panelfläche einhängt (Hooks `createElement()` / `updateElement()`); Position dort über
  `col`/`row`/`colSpan`/`rowSpan` in einer gemeinsam berechneten Tabelle.

### Datenfluss

`Connection` (js/connection.js) kopiert jeden Frame `start.value` → `end.value`. Operator-Logik
gehört in `doUpdate`: Input-Werte lesen, Output-Werte setzen (siehe `base_Simple` in
js/operators/simple.js als Minimalbeispiel). Farbcodierung über `valueColor()`: `true` = rot,
`false` = weiß/schwarz, Zahlenwerte = blau.

### Neue Operatoren registrieren

`register(name, category, description, class)` in einer Datei unter `js/operators/` — die
Kategorie gruppiert den Eintrag im Dialog, der per Doppelklick auf die Fläche erscheint. Achtung:
Der Dialog erzeugt für die Vorschau jede Operator-Klasse einmal in einer Wegwerf-p5-Instanz und
`kill()`t sie wieder — Konstruktoren laufen also auch außerhalb der echten Platzierung und müssen
das (samt sauberem `kill()`) vertragen.

### Serialisierung & Properties-Panel

Beides läuft über dasselbe Paar **`getConfig()` / `setConfig(conf, loaded)`** pro Operator:

- Das Properties-Panel (js/properties.js) zeigt `getConfig()` per `dgui.edit(...)` an; jede
  Änderung ruft `setConfig(currentSettings)` auf. Ein Feld ist also genau dann editierbar, wenn
  es in `getConfig` auftaucht und in `setConfig` übernommen wird. Schlüssel mit führendem `_`
  bleiben im Panel unsichtbar; `PropertyDefinitions` ordnet bekannten Schlüsseln Steuerelemente
  (Slider, Farbe, Select …) zu.
- `loaded = true` gilt nur beim Datei-Laden — nur dann werden `_id`, `_x`, `_y` u. Ä. übernommen.
- Speichern/Laden (js/menu.js → `allOperatorsToJson` / `loadJsonToAll`) schreibt eine JSON-Datei:
  je Operator die Config (der Registry-Name steht unter `CONSTRUCTOR_KEY` `"_#new"`), je
  Verbindung ein IO-ID-Paar. IO-IDs haben die Form `<opId>_in_<name>` / `<opId>_out_<name>` —
  **das Umbenennen von IOs oder Registry-Namen bricht bestehende Speicherdateien.**

### Verbindungslinien & Router

`Connection.lineType` ist austauschbar; die Linienarten sind Unterklassen von `ConnectionLine`
(js/lines/): `Direkt`, `Bezier`, `SimpleBezier` (Standard), `SimpleBezierFan`, `ChipPath`. Nur
`ChipPath` nutzt den A*-Leiterbahn-Router in js/router.js; dessen Verhalten wird über die
`ROUTE_*`-Konstanten am Dateianfang eingestellt (dort ausführlich dokumentiert).

### GUI-Schicht

- **libs/dat.gui.js ist ein im Projekt gepflegter Fork** von dat.gui 0.7.x — erweitert um
  `gui.edit(object, definitions)`, `title`, Positionen, Open/Close/Resize-Events und `bounds`.
  Die vollständige API-Doku steht im Kopfkommentar der Datei; Testseite: `dev/dat-gui-test.html`.
- `DatBlocker` (js/properties.js) legt ein unsichtbares Control über jedes dat.GUI-Panel, damit
  die Canvas darunter keine Mausereignisse bekommt.
- Splitscreen (js/splitscreen.js): links die Canvas, rechts das `appgui`-Panel mit der
  Placeable-Tabelle, dazwischen ein ziehbarer Splitter.

## Stil

Tabs zur Einrückung (Anzeige-Breite 2), keine Semikolons, englische Bezeichner mit deutschen
Kommentaren.
