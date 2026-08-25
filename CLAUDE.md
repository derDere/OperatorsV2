# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

OperatorsV2 ist ein visueller Logik-/Datenfluss-Editor im Browser: Operatoren (Logikgatter,
Anzeigen, Eingabeelemente, Portale …) werden auf einer p5.js-Zeichenfläche platziert und über
Verbindungslinien verdrahtet; Werte (Booleans oder Bytes) fließen pro Frame durch die Verbindungen.

## Struktur & Ausführen

- `www/` — das statische Frontend (die eigentliche Anwendung).
- `wiki/` — die Dokumentation als Markdown-Dateistruktur (siehe Abschnitt Wiki).
- `server/` — schlanker Node-Webserver, der `www/` ausliefert. Zentrale Verteilstelle ist
  `handleRequest` in `server/server.js`: weitere Routen klinken sich dort über ihr Pfad-Präfix
  ein — so macht es die Wiki-Route (`server/wiki.js`, Präfix `/wiki/`), eine spätere API macht
  es genauso. WebSockets nimmt derselbe `http.Server` über sein `upgrade`-Ereignis an — dahinter
  liegen die Funk-Kanäle in `server/websocket.js` (RFC 6455 ohne Abhängigkeiten implementiert).
  Einzige npm-Abhängigkeit ist `marked` (Markdown → HTML, `server/package.json`); installiert
  wird sie beim Docker-Build per `npm ci`, für lokale Läufe per `npm --prefix server install`.
- Betrieb über Docker Compose (Service `web`; `www/` und `wiki/` werden read-only gemountet),
  gesteuert **ausschließlich über das Makefile** — Docker Desktop muss bereits laufen:
  `make start` (legt `.env` aus `env.example` an, falls sie fehlt), `make wait`, `make open`,
  `make logs`, `make stop`; bloßes `make` zeigt die Befehlsübersicht.
- Es gibt **kein Build-System, keine Tests, keinen Linter**; das Frontend kommt ohne
  Paketmanager aus. `www/index.html` funktioniert auch direkt im Browser geöffnet (es werden
  keine Assets per Skript nachgeladen); `www/wiki.html` braucht den laufenden Server.
- Unter `www/dev/` liegen eigenständige Testseiten für Teilstücke (dat.gui-Fork,
  Bezier-Beispiele), die direkt geöffnet werden.

**Klassische Scripts, keine Module:** Alle JS-Dateien werden in `www/index.html` per `<script>`-Tag
in Abhängigkeitsreihenfolge geladen und kommunizieren über Globals. Eine neue Datei muss dort an
der richtigen Stelle eingetragen werden (Basisklassen vor Unterklassen — z. B. `operator.js` vor
`www/js/operators/*`, `lines/connection_line.js` vor den Linienarten).

## Architektur

### Frame-Loop (www/js/sketch.js)

Eine p5-Instanz (`mainP5`, Instanzmodus) treibt alles: `main_draw` läuft jeden Frame und ruft erst
die Update-Phase (`updateConnections`, `updateControls` — inkl. Maus-Hit-Testing und Events), dann
die Draw-Phase auf. Alles wird jeden Frame komplett neu gezeichnet (Immediate Mode).
Weltkoordinaten haben ihren Ursprung in der Canvas-Mitte plus `dragOffset` (Rechtsklick-Drag
verschiebt die Fläche); das Global `mousePos` ist bereits in Weltkoordinaten.

### Klassenhierarchie

- **`Control`** (www/js/control.js) — Basis aller Canvas-Elemente: `id` (UUID), `pos`,
  Parent/Children-Baum, Rect- oder Circle-Bounds, `zIndex`, Ereignissystem
  (`onMouseDown/Up/Move/Click/Enter/Exit`). Globale Register: `AllControls`, `ControlMap`.
  Unterklassen überschreiben die virtuellen Hooks **`doUpdate(tick, p5ctx)`** und
  **`doDraw(tick, p5ctx)`**; beim Zeichnen ist der Ursprung schon auf die Control-Mitte
  verschoben (rectMode CENTER).
- **`Movable`** (www/js/movable.js) — macht ein Control per Linksklick ziehbar und rastet es beim
  Loslassen auf das 20-px-Raster (`fixPlacement`).
- **`Operator`** (www/js/operator.js) — Movable mit IO-Pins (`IOControl`-Kreise, angelegt über
  `newInput(name)` / `newOutput(name)`; leerer Name = unbeschriftet), Mehrfachauswahl
  (`selectedOperators`) und Serialisierung. Register: `AllOperators`.
- **`Placeable`** (www/js/operators/placeable.js) — Operator, der zusätzlich ein HTML-Element in die
  rechte Panelfläche einhängt (Hooks `createElement()` / `updateElement()`); Position dort über
  `col`/`row`/`colSpan`/`rowSpan` in einer gemeinsam berechneten Tabelle.

### Datenfluss

`Connection` (www/js/connection.js) kopiert jeden Frame `start.value` → `end.value`. Operator-Logik
gehört in `doUpdate`: Input-Werte lesen, Output-Werte setzen (siehe `base_Simple` in
www/js/operators/simple.js als Minimalbeispiel). Farbcodierung über `valueColor()`: `true` = rot,
`false` = weiß/schwarz, Zahlenwerte = blau.

### Neue Operatoren registrieren

`register(name, category, description, class)` in einer Datei unter `www/js/operators/` — die
Kategorie gruppiert den Eintrag im Dialog, der per Doppelklick auf die Fläche erscheint. Achtung:
Der Dialog erzeugt für die Vorschau jede Operator-Klasse einmal in einer Wegwerf-p5-Instanz und
`kill()`t sie wieder — Konstruktoren laufen also auch außerhalb der echten Platzierung und müssen
das (samt sauberem `kill()`) vertragen.

### Serialisierung & Properties-Panel

Beides läuft über dasselbe Paar **`getConfig()` / `setConfig(conf, loaded)`** pro Operator:

- Das Properties-Panel (www/js/properties.js) zeigt `getConfig()` per `dgui.edit(...)` an; jede
  Änderung ruft `setConfig(currentSettings)` auf. Ein Feld ist also genau dann editierbar, wenn
  es in `getConfig` auftaucht und in `setConfig` übernommen wird. Schlüssel mit führendem `_`
  bleiben im Panel unsichtbar; `PropertyDefinitions` ordnet bekannten Schlüsseln Steuerelemente
  (Slider, Farbe, Select …) zu.
- `loaded = true` gilt nur beim Datei-Laden — nur dann werden `_id`, `_x`, `_y` u. Ä. übernommen.
- Speichern/Laden (www/js/menu.js → `allOperatorsToJson` / `loadJsonToAll`) schreibt eine JSON-Datei:
  je Operator die Config (der Registry-Name steht unter `CONSTRUCTOR_KEY` `"_#new"`), je
  Verbindung ein IO-ID-Paar. IO-IDs haben die Form `<opId>_in_<name>` / `<opId>_out_<name>` —
  **das Umbenennen von IOs oder Registry-Namen bricht bestehende Speicherdateien.**

### Verbindungslinien & Router

`Connection.lineType` ist austauschbar; die Linienarten sind Unterklassen von `ConnectionLine`
(www/js/lines/): `Direkt`, `Bezier`, `SimpleBezier` (Standard), `SimpleBezierFan`, `ChipPath`. Nur
`ChipPath` nutzt den A*-Leiterbahn-Router in www/js/router.js; dessen Verhalten wird über die
`ROUTE_*`-Konstanten am Dateianfang eingestellt (dort ausführlich dokumentiert).

### Funk-Kanäle (Network-Operatoren)

Die Operatoren „Network Sender/Receiver" (www/js/operators/network.js) tauschen Bytewerte über
WebSocket-Kanäle des Servers aus (`/ws?channel=<name>&role=listen|send`); Verbindung samt
Auto-Reconnect und Kanalwechsel kapselt die Klasse `ChannelSocket` (www/js/ws.js). Der Server
(`server/websocket.js`) hält je Kanal einen flüchtigen Bytewert nur im Speicher: Ein Kanal
existiert nur, solange mindestens ein Horcher verbunden ist; Sendungen werden in einem festen
Takt verrechnet (gleichzeitige Sender überlagern sich per bitweisem ODER); Wertänderungen gehen
an alle Horcher; ohne Sendungen verklingt das Signal auf 0. Die Stellschrauben (`TICK_RATE`,
`DECAY_TICKS`) stehen am Dateianfang.

### Wiki (Doku mit Live-Demos)

- Inhalte liegen als Markdown unter `wiki/`; die Route `/wiki/<seite>` (`server/wiki.js`)
  wandelt sie per `marked` in HTML-Fragmente um, andere Dateien (Bilder …) liefert sie roh aus.
  Beim Umwandeln werden relative `.md`-Links zu Hash-Links (`#ordner/seite`) und andere relative
  Pfade zu `/wiki/<pfad>` umgeschrieben.
- `www/wiki.html` ist der Wrapper: `www/js/wiki.js` lädt die Fragmente anhand des URL-Hashs
  dynamisch nach (Navigation/Zurück über `hashchange`), `www/css/wiki.css` formatiert das
  Markdown.
- Codeblöcke der Sprache `operatorsv2` enthalten einen gespeicherten Aufbau als JSON (Format wie
  beim Editor-Speichern) und werden zu Live-Demos: `OperatorDemo` (`www/js/op_demo.js`) lädt das
  JSON in ein eigenes kleines p5-Canvas, die Logik läuft echt. Unverdrahtete IOs erscheinen als
  Bedienfelder daneben — Eingänge links (stellbar), Ausgänge rechts (nur lesend), je Pin ein
  Wert-Quadrat in den Statusfarben (Displayname als Beschriftung, Beschreibung als Tooltip).
  In Demo-Aufbauten übernehmen diese Quadrate die Rolle von Switch/Button/Lamp/Byte — solche
  Operatoren gehören nur in Demos, die sie selbst zeigen.
- wiki.html lädt die Operator-Klassen ohne sketch.js/properties.js; deren Seiten-Globals stellt
  op_demo.js bereit. Jede Demo setzt die geteilten Globals am Frame-Anfang auf ihren Stand und
  sichert ihn am Ende zurück; `updateControls`/`drawControls` nehmen dafür optional einen
  eigenen Control-Satz entgegen. Demos sind nicht editierbar (kein Verschieben, kein Verdrahten).

### GUI-Schicht

- **www/libs/dat.gui.js ist ein im Projekt gepflegter Fork** von dat.gui 0.7.x — erweitert um
  `gui.edit(object, definitions)`, `title`, Positionen, Open/Close/Resize-Events und `bounds`.
  Die vollständige API-Doku steht im Kopfkommentar der Datei; Testseite: `www/dev/dat-gui-test.html`.
- `DatBlocker` (www/js/properties.js) legt ein unsichtbares Control über jedes dat.GUI-Panel, damit
  die Canvas darunter keine Mausereignisse bekommt.
- Splitscreen (www/js/splitscreen.js): links die Canvas, rechts das `appgui`-Panel mit der
  Placeable-Tabelle, dazwischen ein ziehbarer Splitter.

## Stil

Tabs zur Einrückung (Anzeige-Breite 2), keine Semikolons, englische Bezeichner mit deutschen
Kommentaren.
