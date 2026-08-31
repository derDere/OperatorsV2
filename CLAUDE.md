# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

OperatorsV2 ist ein visueller Logik-/Datenfluss-Editor im Browser: Operatoren (Logikgatter,
Anzeigen, Eingabeelemente, Portale …) werden auf einer p5.js-Zeichenfläche platziert und über
Verbindungslinien verdrahtet; Werte (Booleans oder Bytes) fließen pro Frame durch die Verbindungen.

## Struktur & Ausführen

- `www/` — das statische Frontend (die eigentliche Anwendung).
- `wiki/` — die Dokumentation als Markdown-Dateistruktur (siehe Abschnitt Wiki).
- `dev/` — Arbeitsmaterial, das nicht ausgeliefert wird: Schaltungen im Speicherformat, die
  hinter einem Bild oder einer Doku-Stelle stehen und für eine Neuauflage wieder ladbar sein
  müssen. `welcome-preview-circuit.json` ist die Schaltung auf `www/gfx/welcome-preview.png`,
  `Funkschaltung.json` das fertige Ergebnis der erweiterten Willkommens-Tour.
- `server/` — schlanker Node-Webserver, der `www/` ausliefert. Zentrale Verteilstelle ist
  `handleRequest` in `server/server.js`: weitere Routen klinken sich dort über ihr Pfad-Präfix
  ein — so machen es die Wiki-Route (`server/wiki.js`, Präfix `/wiki/`) und die Such-Route
  (`server/search.js`, Präfix `/pagefind/`), eine spätere API macht es genauso. WebSockets nimmt
  derselbe `http.Server` über sein `upgrade`-Ereignis an — dahinter liegen die Funk-Kanäle in
  `server/websocket.js` (RFC 6455 ohne Abhängigkeiten implementiert). npm-Abhängigkeiten sind
  `marked` (Markdown → HTML) und `pagefind` (Suchindex, `server/package.json`); installiert
  werden sie beim Docker-Build per `npm ci`, für lokale Läufe per `npm --prefix server install`.
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

### Ansicht: Verschieben und Zoomen (www/js/sketch.js)

Die Ansicht steckt in zwei Globals: `dragOffset` (in **Bildpunkten**, deshalb bleibt
Rechtsklick-Ziehen 1:1) und `zoomScale`. `setCanvasPosition` setzt sie in dieser Reihenfolge um:
`translate(Mitte)` → `translate(dragOffset)` → `scale(zoomScale)`. Welt → Bildschirm ist damit
`welt * zoomScale + mitte + dragOffset`, Bildschirm → Welt die Umkehrung — nach dieser Formel
rechnen `mousePos`, `Control.isInFrame`, der `DatBlocker` (www/js/properties.js), die
Ausschnitts- und Trefferprüfung der Linien (`isBoxInView` / `hitTolerance` in
`lines/connection_line.js`, von allen Linienarten benutzt), `Anchor.goto` und das mittige
Einfügen (`addJsonDataCentered`).

Das Mausrad ruft `zoomAt(screenX, screenY, factor, p5ctx)`: Der Faktor multipliziert den Maßstab
(gleicher prozentualer Schritt auf jeder Stufe), danach zieht `dragOffset` so nach, dass der
Weltpunkt unter dem Ankerpunkt stehen bleibt. Die Grenzen und die Schrittweite stehen als
`ZOOM_MIN` / `ZOOM_MAX` / `ZOOM_STEP` am Dateianfang; Strg+0 ruft dieselbe Funktion mit der
Bildmitte als Anker. Über den dat.GUI-Panels und bei offenem Bausteindialog bleibt das Rad
wirkungslos (p5 horcht am `window`, deshalb prüft `mouseWheel` das Ereignisziel).

Faustregel beim Zeichnen: Bausteine und Verbindungen skalieren mit — sie sind Inhalt. Reine
Hilfslinien (Nullpunkt-Kreuz, Auswahlrechteck, Schnittlinie) bekommen `strokeWeight(x / zoomScale)`
und bleiben dadurch bildschirm-dünn.

Das Hintergrundraster baut `updateGridBackground` als Inline-SVG (data-URI, `GRID_*`-Konstanten).
Die Zellweite ist eine der Stufen aus `GRID_STEPS` (10/20/40/80 Welt-Einheiten) — genommen wird die
feinste, deren Zelle noch mindestens `GRID_MIN_CELL` Bildpunkte misst, sodass das Raster auf jeder
Zoomstufe lesbar bleibt statt zu verschwinden. Die Linien bleiben einen Bildpunkt dünn, weil die
SVG-Fläche unskaliert gezeichnet wird; neu gebaut wird das SVG nur bei einer echten Änderung der
Zellweite. Die Linien liegen auf `GRID_LINE_ORIGIN` (Weltkoordinate im Abstand der Zellweite) —
dort sitzen auch die Ränder eingerasteter Bausteine.

**`snapZoom` ist Bedingung, nicht Kosmetik:** Der Maßstab rastet so ein, dass eine Rasterzelle
genau eine ganze Zahl von Bildpunkten breit ist. Der Browser legt die Kachelweite eines
Hintergrundbildes in Bruchteilen eines Bildpunktes ab und rundet dabei; bei krummer Weite läuft
dieser Rest über die Kacheln auf — weit weg von der Bildmitte liegt das Raster dann sichtbar neben
den Bausteinen, und benachbarte Kacheln runden auf dieselbe Pixelspalte, wodurch einzelne Linien
ausfallen. Aus demselben Grund hält `zoomAt` `dragOffset` auf ganzen Bildpunkten (der Ankerpunkt
wandert dafür um höchstens einen halben), und `setCanvasPosition` holt die Kachelposition per
Modulo in die Nähe des Bildrands, statt sie beim weit entfernten Nullpunkt zu lassen.

Der Zoomstand steht neben `doff` in der Speicherdatei (Schlüssel `zoom`); Dateien ohne den Wert
laden im Maßstab 1:1, ein gespeicherter Wert läuft beim Laden durch `snapZoom`. Die Wiki-Demos
(www/js/op_demo.js) halten `zoomScale` fest auf 1.

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

Der Kanal wird unter einem frei wählbaren Namen eingestellt: Dieser Name steht in der Config
(`Channel`) und ist damit das, was das Properties-Panel zeigt und was gespeichert wird. Auf die
Leitung geht nur seine Kennung — `channelGuid()` gibt eine als GUID geschriebene Eingabe
unverändert weiter und bildet jede andere per `generateStringGuid()` stabil auf eine GUID ab.
Aus derselben Kennung zeichnet `channelDisplay()` den 4×4-Farbabdruck auf dem Baustein.

### Klang (Sound-Operator)

Der Operator „Sound" (www/js/operators/sound.js) piept; die Klangtechnik dahinter steckt in
www/js/audio.js (reines Web Audio, **nicht** p5.sound). Der Aufbau entspricht dem Paar
`ws.js` / `network.js`: eine Klasse `BeepVoice` (ein dauerhaft laufender Oszillator plus eigener
Lautstärkeregler) und darüber der Operator, der Bytes in Klang übersetzt. Alle Stimmen hängen an
einer gemeinsamen Summenschiene mit Kompressor — gleichzeitige Töne übersteuern einander dadurch
nicht. Je Sound-Baustein gibt es genau eine Stimme; mehrstimmig wird es über mehrere Bausteine.

- **Alles ist Eingang:** `N` Note, `V` Lautstärke, `L` Länge (× 10 ms), `W` Wellenform, `T`
  Trigger, `P` Dauerton, `M` Stumm. Die Ausgänge `O`/`N`/`V`/`W` melden, was gerade klingt.
- **Die Tonhöhe ist eine Notennummer** (MIDI-Zählung, `noteToFrequency`), keine Frequenz: Gleiche
  Schritte ergeben gleiche musikalische Abstände, was eine gerade Hertz-Skala nicht leistet und
  ohne das keine Melodie baubar wäre.
- **Ein Eingang ohne Leitung meldet `false`** und benutzt dann seinen Standardwert
  (`SOUND_DEFAULT_*`); zusammen ergeben sie den Piepton eines Rechners ohne weitere Angaben.
- **Trigger-Ton gegen Dauerton:** Bei einer steigenden Flanke an `T` werden Note, Lautstärke und
  Wellenform festgehalten (ein weiterlaufender Stapel verbiegt den Ton also nicht mitten im
  Klingen), der `P`-Dauerton folgt den Eingängen dagegen live. Die Länge zählt echte Zeit
  (`performance.now()`), weil die Fläche mit der Bildwiederholrate läuft und ein Tick kein Zeitmaß
  ist.
- **Lazy und aufräumbar:** Oszillator und AudioContext entstehen erst beim ersten Ton, `kill()`
  blendet aus und trennt die Knoten. Beides ist Bedingung, weil der Bausteindialog jede
  Operator-Klasse zur Vorschau einmal anlegt und sofort wieder wegwirft — und weil Browser Klang
  erst nach einer Eingabe des Benutzers zulassen (`unlockAudio`).

### Wiki (Doku mit Live-Demos)

- **Zielgruppe und Schreibstandard:** Das Wiki ist der Lehrteil des Projekts. Es richtet
  sich an Leser ab etwa zehn Jahren (weiterführende Schule) ohne Vorwissen in Technik,
  Elektronik und Programmierung. **Schulrechnen wird vorausgesetzt** — Plus, Minus, Mal,
  Geteilt, Rest, Prozent, Kommazahlen werden nie erklärt und bekommen keine Alltagsbilder.
  Fachliches dagegen wird kurz in Alltagsworten erklärt und **danach beim Namen genannt**
  („… das nennt man den **absoluten Wert**"), damit der Leser den Begriff mitnimmt; die
  Erklärung selbst bleibt frei von Fachwörtern („ohne das Minus davor" statt „ohne
  Vorzeichen"). Alltagsbilder kommen nur dort zum Einsatz, wo ein Konzept wirklich fremd
  ist, und bleiben erwachsen (Lichtschalter, Metronom, Kilometerzähler, Tellerstapel).
  Wiederkehrende Konzepte haben eigene Grundlagenseiten — `flanken-und-takt`,
  `stapel-und-warteschlange`, `vektoren`, `negative-zahlen-und-ueberlauf` —, auf die die
  Operator-Seiten mit einem Satz verweisen, statt sie jedes Mal herzuleiten. Ton: gutes
  Schulbuch, knapp. Maßstab ist `wiki/de/operatoren/math/subtract.md`.
- Inhalte liegen als Markdown unter `wiki/`, **zweisprachig in je einem Baum pro Sprache**
  (`wiki/de/**`, `wiki/en/**`) mit **identischen Datei-Pfaden** — nur die Inhalte sind
  übersetzt. Die Route `/wiki/<seite>` (`server/wiki.js`) wandelt sie per `marked` in
  HTML-Fragmente um, andere Dateien (Bilder …) liefert sie roh aus. Beim Umwandeln werden
  relative `.md`-Links zu Hash-Links (`#sprache/ordner/seite`) und andere relative Pfade zu
  `/wiki/<pfad>` umgeschrieben — relative Links bleiben dadurch automatisch im Sprachbaum.
- `www/wiki.html` ist der Wrapper: `www/js/wiki.js` lädt die Fragmente anhand des URL-Hashs
  dynamisch nach (Navigation/Zurück über `hashchange`), `www/css/wiki.css` formatiert das
  Markdown. In der Kopfleiste sitzen ein Zurück-Knopf (`history.back()` — das Wiki-Fenster
  öffnet oft ohne Browser-Menüleiste), die Volltextsuche und die Sprachwahl.
- Sprachwahl: Das erste Hash-Segment ist die Sprache; Hashes ohne Sprachsegment bekommen die
  erkannte Sprache vorangestellt (`detectLanguage` in `www/js/lang.js`, das Wiki und Editor
  gemeinsam laden: gemerkte Dropdown-Wahl aus localStorage, sonst Browsersprache, Fallback
  en). `wiki.js` hält das `lang`-Attribut der Seite auf der
  angezeigten Sprache und übersetzt die Wrapper-Texte (`WIKI_STRINGS`); das Dropdown wechselt
  auf denselben Seitenpfad im anderen Sprachbaum — deshalb müssen beide Bäume dieselben
  Datei-Pfade tragen.
- Die Suche basiert auf Pagefind: `server/search.js` rendert beim Serverstart alle
  Wiki-Seiten über `renderMarkdown` (Export von `server/wiki.js`) und baut daraus per
  Pagefind-Node-API einen Index **im Speicher**, ausgeliefert unter `/pagefind/` (die Mounts
  bleiben read-only, ein Build-Schritt entfällt; Wiki-Änderungen erscheinen in der Suche nach
  einem Server-Neustart). Das erste Pfadsegment jeder Seite bestimmt ihr `lang`-Attribut —
  Pagefind baut daraus **je Sprache einen eigenen Teilindex** samt passender
  Wortstamm-Erkennung. `www/js/wiki_search.js` lädt `/pagefind/pagefind.js` bei der ersten
  Eingabe, wählt den Sprachindex über das `lang`-Attribut der Seite (bei einem Sprachwechsel
  zieht es per `pagefind.destroy()`/`init()` um — gefunden wird immer nur die gerade gelesene
  Sprache) und übersetzt Treffer-URLs in Hash-Links. Demo-Codeblöcke tragen
  `data-pagefind-ignore` und bleiben dadurch aus dem Index.
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

### Willkommen & Tour

- Beim Laden des Editors erscheint mittig eine Begrüßung (`www/js/welcome.js`): Vorschaubild
  einer fertigen Schaltung, Knopf für die Tour, Wiki-Link und das Ankreuzfeld „Nicht wieder
  anzeigen". Ein Klick daneben, auf „Nein, danke" oder auf das × schließt sie; gemerkt wird
  (localStorage `operatorsv2-welcome-hidden`) allein der Stand des Ankreuzfeldes **beim
  Schließen** — er lässt sich dort auch wieder aufheben. Der Menüpunkt **👋 Welcome** öffnet
  die Begrüßung jederzeit erneut.
- Die Tour lässt dasselbe Fenster nach unten links wandern. Das Fenster ist ein reines
  DOM-Overlay, die Seite darunter bleibt voll bedienbar — seine Mausereignisse stoppt es, damit
  die Zeichenfläche sie nicht ebenfalls auswertet (die p5-Handler horchen am `window`).
- Es gibt **zwei Touren**, in `welcome_texts.js` die Listen `tour` und `tourAdvanced`:
  - Die **Grundtour** (elf Schritte) erklärt den Editor; dabei baut der Leser einen Zähler aus
    Switch, Slider, Clock, Counter8 und Byte-Anzeige.
  - Die **erweiterte Tour** (siebzehn Schritte) setzt das voraus und baut eine Funkstation:
    Text Input → Funkkanal → Fernschreiber (Terminal Display), dazu ein Sichtgerät auf dem Line
    Display, verteilt über Portale. Ergebnis: `dev/Funkschaltung.json`. Vier Stellen darin sind
    keine Willkür, sondern Bedingung:
    - Der **Enter-Riegel**: `P` des Text Input hängt nicht am Dauerstrom, sondern an einem RS
      FlipFlop, das `N` (Enter) setzt und `Not(W)` wieder löscht. Nur so bleibt der getippte
      Text bis zum Absenden veränderbar, statt Zeichen für Zeichen sofort in der Warteschlange
      zu verschwinden.
    - Das **Kennbit**: T FlipFlop + Select + 128, per ODER auf denselben Sender-Eingang wie das
      Zeichen gelegt. Es hält aufeinanderfolgende gleiche Zeichen unterscheidbar, weil der
      Funkkanal nur Wertänderungen meldet.
    - Die **Nullsperre**: Ein `Equals` (Byte gegen den offenen, also 0 zählenden zweiten
      Eingang) gibt über `!O` ein „ist nicht 0" aus, das ein `And` vor den Schreib-Auslöser des
      Terminals legt. Ohne sie schreibt jede 0 auf dem Kanal ein leeres Zeichen — und eine 0
      kommt regelmäßig: beim Verklingen des Signals und bei zwei Stationen auch mitten in der
      Überlagerung, wenn nur noch das Kennbit übrig bleibt.
    - Zwei **`Pipe 1`** gleichen die Tick-Zahl von Auslöser und Byte an, damit beide zusammen am
      Terminal ankommen — je einer hinter dem Portal-Auslöser und hinter dem `Modulo`.
  - Angeboten wird die erweiterte Tour über einen eigenen Knopf, den nur der letzte Schritt der
    Grundtour einblendet.
- Alle Texte stehen zweisprachig in `www/js/welcome_texts.js`, beide Sprachen mit gleich vielen
  Schritten je Tour. Der Editor hat bewusst **keine eigene Sprachwahl**: Er folgt über
  `www/js/lang.js` der Wiki-Sprache und stellt sich per `storage`-Ereignis sofort um, wenn sie
  im geöffneten Wiki-Fenster gewechselt wird. Seine übrige Oberfläche bleibt englisch.
- Das Vorschaubild `www/gfx/welcome-preview.png` ist ein Bildschirmfoto des Editors; die darauf
  laufende Schaltung liegt als `dev/welcome-preview-circuit.json` zum Nachladen bereit.

### GUI-Schicht

- **www/libs/dat.gui.js ist ein im Projekt gepflegter Fork** von dat.gui 0.7.x — erweitert um
  `gui.edit(object, definitions)`, `title`, Positionen, Open/Close/Resize-Events und `bounds`.
  Die vollständige API-Doku steht im Kopfkommentar der Datei; Testseite: `www/dev/dat-gui-test.html`.
- `DatBlocker` (www/js/properties.js) legt ein unsichtbares Control über jedes dat.GUI-Panel, damit
  die Canvas darunter keine Mausereignisse bekommt.
- Splitscreen (www/js/splitscreen.js): links das `appgui`-Panel mit der Placeable-Tabelle,
  rechts die Canvas, dazwischen ein ziehbarer Splitter.

## Stil

Tabs zur Einrückung (Anzeige-Breite 2), keine Semikolons, englische Bezeichner mit deutschen
Kommentaren.
