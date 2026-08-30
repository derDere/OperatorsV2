// Alle Texte der Willkommens-Meldung und der Tour, je Sprache.
//
// Die Sprache kommt aus js/lang.js und folgt damit der Wiki-Sprachwahl. Beide
// Sprachbäume tragen dieselben Schlüssel und gleich viele Tour-Schritte, damit
// ein Sprachwechsel mitten in der Tour beim selben Schritt bleibt.
//
// Die Tour begleitet den Leser beim Bau einer eigenen kleinen Schaltung:
// ein Zähler, den ein Schalter startet und ein Regler im Tempo bestimmt.
// `text` darf einfaches HTML enthalten (<b>, <code>, <br>).

const WELCOME_STRINGS = {

	de: {
		title: 'Willkommen bei OperatorsV2!',
		intro:
			'<b>OperatorsV2</b> ist ein Baukasten im Browser: Du legst Bausteine auf eine ' +
			'Fläche und verbindest sie mit Linien. Durch die Linien fließen Werte — wie Strom ' +
			'durch Kabel. So entstehen Schaltungen: vom Lichtschalter bis zur Digitaluhr.' +
			'<br><br>' +
			'Die Tour zeigt dir in elf kurzen Schritten, wie der Editor funktioniert, und baut ' +
			'dabei mit dir einen laufenden Zähler.',
		previewAlt: 'Ein Rosetten-Zeichner aus Operatoren: zwei kreisende Vektoren zeichnen ein Blütenmuster',
		start: '▶ Tour starten',
		decline: 'Nein, danke',
		wiki: '🌐 Wiki öffnen',
		again: 'Nicht wieder anzeigen',
		back: '← Zurück',
		next: 'Weiter →',
		finish: '✓ Fertig',
		close: 'Schließen',
		advanced: '🚀 Erweiterte Tour starten',
		step: (nr, count) => 'Schritt ' + nr + ' von ' + count,

		tour: [
			{
				title: 'Die Bau-Fläche',
				text:
					'Rechts liegt das Karo-Raster: die <b>Zeichenfläche</b>. Dort entsteht deine ' +
					'Schaltung.<br><br>' +
					'Links die helle <b>Panelfläche</b>. Dort erscheint alles zum Bedienen und ' +
					'Ablesen — Schalter, Regler, Anzeigen. Die graue Leiste dazwischen kannst du ' +
					'ziehen, um beide Bereiche größer oder kleiner zu machen.<br><br>' +
					'Halte die <b>rechte Maustaste</b> gedrückt und ziehe: Die Zeichenfläche ' +
					'wandert mit. So erreichst du auch Bausteine, die gerade außerhalb des Bildes ' +
					'liegen.'
			},
			{
				title: 'Einen Schalter einsetzen',
				text:
					'Mache einen <b>Doppelklick</b> auf eine freie Stelle der Zeichenfläche. Es ' +
					'öffnet sich die Liste aller Bausteine, sortiert in Gruppen. Unten im Fenster ' +
					'sitzt das Suchfeld; es ist gleich aktiv, du kannst also sofort lostippen.<br><br>' +
					'Tippe <b>Switch</b> — das ist englisch für Schalter — und klicke den Baustein ' +
					'an. Er liegt jetzt auf der Fläche.'
			},
			{
				title: 'Verbinden',
				text:
					'Setze auf dieselbe Weise einen <b>Clock</b> daneben. Das ist der Taktgeber: ' +
					'Er schaltet seinen Ausgang immer wieder an und aus, wie ein Metronom.<br><br>' +
					'Jeder Baustein hat kleine Kreise an den Seiten — seine <b>Anschlüsse</b>. ' +
					'Links sitzen die <b>Eingänge</b>, rechts die <b>Ausgänge</b>.<br><br>' +
					'Drücke die linke Maustaste auf dem Ausgang <code>O</code> des Switch, halte ' +
					'sie gedrückt, ziehe zum Eingang <code>P</code> des Clock und lasse los. ' +
					'<code>P</code> steht für Power: Der Takt läuft nur, solange dort <i>an</i> ' +
					'ankommt.'
			},
			{
				title: 'Das Tempo einstellen',
				text:
					'Setze einen <b>Slider</b> ein — einen Schieberegler — und verbinde seinen ' +
					'Ausgang <code>V</code> mit dem Eingang <code>B</code> des Clock.<br><br>' +
					'<code>B</code> ist der Abstand zwischen zwei Takt-Wechseln. Je größer die ' +
					'Zahl, desto langsamer tickt es.'
			},
			{
				title: 'Zählen',
				text:
					'Jetzt kommt der <b>Counter8</b> dazu. Er zählt eine Zahl hoch, von 0 bis 255, ' +
					'und fängt danach wieder bei 0 an.<br><br>' +
					'Verbinde den Ausgang <code>C</code> des Clock mit dem Eingang <code>I</code> ' +
					'des Counter8. Jedes Mal, wenn der Takt von aus auf an springt, zählt der ' +
					'Counter eins weiter.'
			},
			{
				title: 'Anzeigen',
				text:
					'Es fehlt die Anzeige. Setze eine <b>Byte</b>-Anzeige ein und verbinde den ' +
					'Ausgang <code>B</code> des Counter8 — das ist der mittlere der drei rechts — ' +
					'mit ihrem Eingang <code>B</code>.<br><br>' +
					'Fertig ist die Schaltung: Schalter, Regler, Takt, Zähler, Anzeige.'
			},
			{
				title: 'Anschalten',
				text:
					'Schau nach links auf die Panelfläche: Schalter, Regler und Anzeige sind dort ' +
					'aufgetaucht. Jeder Baustein, den man bedient oder abliest, meldet sich dort.' +
					'<br><br>' +
					'Lege den Schalter um — der Zähler läuft los. Mit dem Regler bestimmst du das ' +
					'Tempo: ganz links rast er, weiter rechts wird er ruhig.<br><br>' +
					'Der Schalter lässt sich auch auf der Zeichenfläche umlegen: Klick auf den ' +
					'runden Knopf in seiner Mitte.'
			},
			{
				title: 'Einstellungen',
				text:
					'Klicke die Byte-Anzeige einmal an. Oben rechts im Fenster ' +
					'<b>🛠️ Properties</b> stehen ihre Einstellungen.<br><br>' +
					'Setze dort den Haken bei <b>Show Dec</b>: Die Zahl erscheint zusätzlich als ' +
					'gewohnte Dezimalzahl. Jeder Baustein hat solche Einstellungen — Farben, ' +
					'Größen, Zahlensysteme.'
			},
			{
				title: 'Aufräumen',
				text:
					'<b>Verschieben:</b> Baustein mit gedrückter linker Maustaste ziehen.<br>' +
					'<b>Auswählen:</b> auf freier Fläche ein Rechteck aufziehen.<br>' +
					'<b>Entf</b> löscht den ausgewählten Baustein oder die Linie unter dem ' +
					'Mauszeiger.<br>' +
					'<b>Strg + Ziehen</b> auf freier Fläche durchtrennt jede Linie, die der Strich ' +
					'kreuzt.<br>' +
					'<b>Strg+C</b> und <b>Strg+V</b> kopieren und fügen ein, <b>Strg+D</b> ' +
					'verdoppelt die Auswahl.'
			},
			{
				title: 'Sichern und stöbern',
				text:
					'Oben rechts im <b>🏠 Menu</b>: <b>💾 Save As</b> legt deine Schaltung als ' +
					'Datei auf deinem Rechner ab, <b>📂 Open File</b> holt sie zurück.<br><br>' +
					'Unter <b>📚 Examples</b> warten fertige Schaltungen — von der Digitaluhr bis ' +
					'zum kleinen Zeichencomputer. Achtung: Beim Laden verschwindet, was gerade auf ' +
					'der Fläche liegt.'
			},
			{
				title: 'Geschafft!',
				text:
					'Das war die Runde durch den Editor. Alles Weitere steht im <b>Wiki</b>: jeder ' +
					'Baustein einzeln erklärt, dazu Grundlagen und Live-Demos zum Ausprobieren.' +
					'<br><br>' +
					'Wenn du Lust auf mehr hast: Die <b>erweiterte Tour</b> baut mit dir eine ' +
					'Funkstation mit Fernschreiber und Sichtgerät. Sie zeigt nicht mehr, wie der ' +
					'Editor geht, sondern was man mit ihm anstellen kann.<br><br>' +
					'Über <b>👋 Welcome</b> im 🏠-Menü kommst du jederzeit hierher zurück.'
			}
		],

		tourAdvanced: [
			{
				title: 'Die Funkstation',
				text:
					'Du weißt, wie der Editor funktioniert. Jetzt bauen wir etwas, das man kaum ' +
					'noch für einen Browser hält: eine <b>Funkstation</b>.<br><br>' +
					'Du tippst eine Nachricht. Sie geht Zeichen für Zeichen über einen echten ' +
					'Funkkanal des Servers hinaus, kommt zurück und rollt über einen ' +
					'<b>Fernschreiber</b> mit Klappanzeige. Daneben zeichnet ein <b>Sichtgerät</b> ' +
					'den Funkverkehr als Kurve mit.<br><br>' +
					'Rund zwei Dutzend Bausteine. Zieh die Fläche unterwegs mit der rechten ' +
					'Maustaste weiter — es wird breit.'
			},
			{
				title: 'Der Geber',
				text:
					'Setze einen <b>Value</b> und stell ihn in den Eigenschaften auf <b>binary</b> ' +
					'mit dem Wert 1 — das ist unser Dauerstrom, ein <i>an</i>, das nie ausgeht.' +
					'<br><br>' +
					'Daneben ein <b>Text Input</b>. Sein Eingabefeld erscheint links im Panel. Was ' +
					'du dort tippst, bleibt vorerst einfach stehen — der Baustein rührt sich erst, ' +
					'wenn sein Eingang <code>P</code> Strom bekommt. Und den geben wir ihm gleich ' +
					'ganz gezielt.'
			},
			{
				title: 'Der Enter-Riegel',
				text:
					'Läge an <code>P</code> Dauerstrom, würde der Text Input jedes Zeichen sofort ' +
					'verschlucken — tippen ginge, aber nichts mehr verbessern. Also machen wir ihn ' +
					'nur auf Kommando scharf.<br><br>' +
					'Setze ein <b>RS FlipFlop</b> und ein <b>Not</b> und verdrahte drei Wege:' +
					'<br><br>' +
					'• <code>N</code> des Text Input — der Impuls, wenn du <b>Enter</b> drückst — ' +
					'auf <code>S</code><br>' +
					'• <code>W</code> des Text Input — an, solange Text im Feld steht — auf ' +
					'<code>A</code> des Not, und <code>!A</code> des Not auf <code>R</code><br>' +
					'• <code>Q</code> des FlipFlop zurück auf <code>P</code> des Text Input' +
					'<br><br>' +
					'Jetzt kannst du in Ruhe tippen und verbessern. <b>Enter</b> legt den Riegel um: ' +
					'Das Feld läuft Zeichen für Zeichen in die Warteschlange. Ist es leer, geht ' +
					'<code>W</code> aus, das Not macht ein <code>R</code> daraus — und der Riegel ' +
					'fällt von selbst wieder zu.'
			},
			{
				title: 'Der Sendetakt',
				text:
					'Ein <b>Clock</b> gibt den Takt vor, in dem gesendet wird. Verbinde den Value ' +
					'mit seinem <code>P</code> und setze einen <b>Slider</b>, dessen ' +
					'<code>V</code> auf <code>B</code> des Clock geht.<br><br>' +
					'Der Ausgang <code>C</code> des Clock geht auf <code>F</code> des Text Input. ' +
					'<code>F</code> steht für Flush: Bei jedem Takt rückt das älteste Zeichen aus ' +
					'der Warteschlange auf den Ausgang <code>B</code> — begleitet von einem ' +
					'Impuls auf <code>T</code>.<br><br>' +
					'Stell den Regler auf etwa 30. Zu schnell, und die Zeichen überholen sich ' +
					'später im Funkkanal.'
			},
			{
				title: 'Der Sender',
				text:
					'Jetzt der <b>Network Sender</b>. Klick ihn an und trag in den Eigenschaften ' +
					'unter <b>Channel</b> das Wort <code>funkstation</code> ein. Der Kanalname ist ' +
					'die Frequenz: Wer denselben Namen einträgt, hört dasselbe.<br><br>' +
					'Verbinde <code>B</code> des Text Input mit <code>B</code> des Senders und ' +
					'<code>T</code> mit <code>T</code>. Der Sender feuert genau in dem Moment, in ' +
					'dem ein Zeichen auf der Leitung steht.<br><br>' +
					'Die Schüssel funkt, sobald sie mit dem Server verbunden ist — das zeigt sie ' +
					'mit ihren Wellen.'
			},
			{
				title: 'Das Kennbit',
				text:
					'Ein Haken: Der Funkkanal meldet nur <b>Änderungen</b>. Zwei gleiche Buchstaben ' +
					'hintereinander — das Doppel-L in „HALLO" — wären keine Änderung. Das zweite L ' +
					'ginge verloren.<br><br>' +
					'Also geben wir jedem zweiten Zeichen ein Erkennungszeichen mit. Setze ein ' +
					'<b>T FlipFlop</b> und führe <code>T</code> des Text Input darauf: Es kippt bei ' +
					'jedem Zeichen um.<br><br>' +
					'Dann ein <b>Select</b> und ein <b>Value</b> mit dem Wert 128 (nicht binary). ' +
					'<code>Q</code> des FlipFlop geht auf <code>E1</code>, der Value auf ' +
					'<code>B1</code>. Am Ausgang <code>B</code> liegt damit abwechselnd 128 und 0.'
			},
			{
				title: 'Zwei Leitungen, ein Eingang',
				text:
					'Verbinde jetzt <code>B</code> des Select mit demselben Eingang <code>B</code> ' +
					'des Senders, auf dem schon das Zeichen liegt.<br><br>' +
					'Das ist erlaubt: <b>Mehrere Leitungen auf einen Eingang überlagern sich</b> — ' +
					'Bit für Bit, wie mehrere Sender auf einer Frequenz. Aus dem Zeichen und der ' +
					'128 wird eine einzige Zahl, und jedes zweite Zeichen reist mit gesetztem ' +
					'oberstem Bit.<br><br>' +
					'Damit ist jede Sendung anders als die vorige — auch das zweite L.'
			},
			{
				title: 'Der Empfänger',
				text:
					'Setze einen <b>Network Receiver</b> und trag bei ihm denselben Kanalnamen ' +
					'<code>funkstation</code> ein.<br><br>' +
					'Er gibt an <code>B</code> aus, was gerade auf der Frequenz liegt, und an ' +
					'<code>T</code> einen Impuls, sobald sich das ändert. Sender und Empfänger ' +
					'stehen auf derselben Fläche — die Nachricht läuft trotzdem über den Server ' +
					'hinaus und wieder zurück.'
			},
			{
				title: 'Das Portal',
				text:
					'Der Empfang wird gleich an zwei weit entfernten Stellen gebraucht. Statt ' +
					'langer Leitungen quer über die Fläche nehmen wir ein <b>Portal 4 Entry</b>. ' +
					'Gib ihm in den Eigenschaften den Namen <code>FUNK</code>.<br><br>' +
					'Auf <code>I1</code> kommt <code>B</code> des Receivers, auf <code>I2</code> ' +
					'sein <code>T</code>, auf <code>I3</code> noch einmal der Dauerstrom vom Value.' +
					'<br><br>' +
					'Setze zwei <b>Portal Exit</b> an zwei entfernte Stellen und wähle bei beiden ' +
					'in den Eigenschaften unter <b>Origin</b> das Portal <code>FUNK</code>. Sie ' +
					'tragen jetzt dieselben vier Werte — ganz ohne Leitung.'
			},
			{
				title: 'Der Fernschreiber',
				text:
					'Am ersten Ausgangsportal: ein <b>Modulo</b> und ein <b>Value</b> mit 128. ' +
					'<code>O1</code> des Portals auf <code>B1</code>, der Value auf <code>B2</code>. ' +
					'Der Rest der Teilung durch 128 lässt genau das Kennbit fallen — übrig bleibt ' +
					'das reine Zeichen.<br><br>' +
					'Daneben ein <b>Pipe 1</b>, in das <code>O2</code> des Portals läuft. Es tut ' +
					'nichts, außer einen Tick zu kosten — und genau darum geht es: <b>Jeder ' +
					'Baustein kostet einen Tick.</b> Wert und Auslöser müssen gleich viele ' +
					'Stationen durchlaufen, sonst kommt der Auslöser vor dem Zeichen an.'
			},
			{
				title: 'Die Klappanzeige',
				text:
					'Setze ein <b>Terminal Display</b>. Stell in den Eigenschaften <b>Terminal ' +
					'Width</b> auf 22 und <b>Terminal Height</b> auf 6.<br><br>' +
					'<code>R</code> des Modulo geht auf <code>B</code>, der Ausgang des Pipe auf ' +
					'<code>W</code>. <code>W</code> steht für Write: Bei jedem Impuls schreibt es ' +
					'das Zeichen an die Schreibmarke und rückt eine Stelle weiter.<br><br>' +
					'Jetzt der erste Probelauf: Tippe links im Panel etwas in das Feld des Text ' +
					'Input und drück <b>Enter</b>. Sieh zu, wie die Zeichen sich auf der Anzeige ' +
					'durchdrehen — wie die Klappanzeige am Bahnhof.'
			},
			{
				title: 'Das Sichtgerät',
				text:
					'Funk kann man auch sehen. Am zweiten Ausgangsportal bauen wir einen Schreiber, ' +
					'der von links nach rechts über einen Schirm läuft.<br><br>' +
					'Ein <b>Clock</b> (<code>P</code> ← <code>O3</code> des Portals, <code>B</code> ' +
					'← ein <b>Value</b> mit 3) treibt einen <b>Counter8</b>. Der Zähler ist die ' +
					'Stelle auf dem Schirm.<br><br>' +
					'Setze ein <b>Line Display</b> (Screen Width und Screen Height je 255): ' +
					'<code>B</code> des Counters auf <code>X</code>, <code>C</code> des Clock auf ' +
					'<code>D</code> — bei jedem Takt zieht der Stift einen Strich weiter. Und ' +
					'<code>O</code> des Counters, sein Überlauf, auf <code>C</code>: Am rechten ' +
					'Rand wischt der Schirm sich selbst sauber.'
			},
			{
				title: 'Die Kurve',
				text:
					'Fehlt die Höhe. Setze ein <b>Subtract</b> und einen <b>Value</b> mit 250: ' +
					'Value auf <code>B1</code>, <code>O1</code> des Portals auf <code>B2</code>, ' +
					'und <code>R</code> auf <code>Y</code> des Line Display.<br><br>' +
					'250 minus dem Wert dreht die Kurve um — die Ruhelinie liegt unten, die ' +
					'Ausschläge gehen nach oben.<br><br>' +
					'Schick jetzt eine längere Nachricht ab: Der Schirm zeigt ein sauberes ' +
					'Rechtecksignal, das zwischen zwei Bändern springt. Das obere Band sind die ' +
					'Zeichen mit gesetztem Kennbit — du siehst deiner eigenen Übertragung beim ' +
					'Arbeiten zu.'
			},
			{
				title: 'Der Zähler',
				text:
					'Noch ein Blickfang fürs Panel: ein <b>Counter8</b>, dessen <code>I</code> an ' +
					'<code>O2</code> des Portals hängt — er zählt jede Sendung, die ankommt.' +
					'<br><br>' +
					'Sein <code>B</code> geht auf eine <b>Byte</b>-Anzeige. Stell sie in den ' +
					'Eigenschaften auf <b>Show Dec</b>, Schriftart <code>digital-7</code> und eine ' +
					'große Schriftgröße — dann sieht sie aus wie ein echtes Zählwerk.'
			},
			{
				title: 'Zwei Stationen',
				text:
					'Und jetzt das Beste. Speichere die Schaltung über <b>💾 Save As</b>. Öffne ' +
					'den Editor in einem <b>zweiten Browserfenster</b> und lade die Datei dort mit ' +
					'<b>📂 Open File</b>.<br><br>' +
					'Tippe in einem Fenster, drück Enter — und lies im anderen mit. Beide Stationen ' +
					'hängen auf ' +
					'derselben Frequenz. Trag bei beiden einen anderen Kanalnamen ein, und ihr seid ' +
					'allein auf einem eigenen Band.<br><br>' +
					'Der Server merkt sich dabei nichts: Ein Kanal lebt nur, solange jemand horcht, ' +
					'und ohne Sendung verklingt das Signal nach einer Sekunde auf 0.'
			},
			{
				title: 'Weitergebaut',
				text:
					'Was aus der Station noch werden kann:<br><br>' +
					'• Ein <b>zweiter Kanal</b> für die Gegenrichtung — und ihr habt eine ' +
					'Gegensprechanlage.<br>' +
					'• Ein <b>Stack</b> hinter dem Empfänger, der eintreffende Nachrichten ' +
					'aufbewahrt, bis du sie abrufst.<br>' +
					'• Eine <b>Lamp</b> am <code>T</code> des Receivers als Empfangslicht.<br>' +
					'• Ein <b>File Output</b> statt des Fernschreibers: Dann tropft die Sendung als ' +
					'Datei aus der Leitung.<br><br>' +
					'Jeder einzelne Baustein steht mit Live-Demos im <b>Wiki</b>. Viel Spaß!'
			}
		]
	},

	en: {
		title: 'Welcome to OperatorsV2!',
		intro:
			'<b>OperatorsV2</b> is a construction kit in your browser: you place blocks on a ' +
			'canvas and join them with lines. Values flow through those lines like electricity ' +
			'through cables. That is how circuits are built — from a light switch to a digital ' +
			'clock.' +
			'<br><br>' +
			'The tour walks you through the editor in eleven short steps and builds a running ' +
			'counter with you along the way.',
		previewAlt: 'A rosette plotter built from operators: two circling vectors draw a flower pattern',
		start: '▶ Start tour',
		decline: 'No thanks',
		wiki: '🌐 Open wiki',
		again: 'Do not show again',
		back: '← Back',
		next: 'Next →',
		finish: '✓ Done',
		close: 'Close',
		advanced: '🚀 Start the advanced tour',
		step: (nr, count) => 'Step ' + nr + ' of ' + count,

		tour: [
			{
				title: 'The building area',
				text:
					'On the right lies the squared grid: the <b>canvas</b>. Your circuit is built ' +
					'there.<br><br>' +
					'On the left is the bright <b>panel</b>. Everything you operate or read off ' +
					'shows up there — switches, sliders, displays. Drag the grey bar between them ' +
					'to make either side bigger or smaller.<br><br>' +
					'Hold the <b>right mouse button</b> and drag: the canvas moves along. That is ' +
					'how you reach blocks that currently sit outside the picture.'
			},
			{
				title: 'Placing a switch',
				text:
					'<b>Double-click</b> an empty spot on the canvas. The list of all blocks opens, ' +
					'sorted into groups. The search field sits at the bottom of the window and is ' +
					'active right away, so you can start typing immediately.<br><br>' +
					'Type <b>Switch</b> and click the block. It is now sitting on the canvas.'
			},
			{
				title: 'Connecting',
				text:
					'Place a <b>Clock</b> next to it the same way. The clock is the beat keeper: it ' +
					'turns its output on and off over and over, like a metronome.<br><br>' +
					'Every block has small circles along its sides — its <b>ports</b>. The ' +
					'<b>inputs</b> sit on the left, the <b>outputs</b> on the right.<br><br>' +
					'Press the left mouse button on output <code>O</code> of the Switch, keep it ' +
					'held down, drag over to input <code>P</code> of the Clock and let go. ' +
					'<code>P</code> stands for power: the clock only runs while <i>on</i> arrives ' +
					'there.'
			},
			{
				title: 'Setting the pace',
				text:
					'Place a <b>Slider</b> and connect its output <code>V</code> to input ' +
					'<code>B</code> of the Clock.<br><br>' +
					'<code>B</code> is the gap between two beats. The bigger the number, the slower ' +
					'it ticks.'
			},
			{
				title: 'Counting',
				text:
					'Now add the <b>Counter8</b>. It counts a number up from 0 to 255 and starts ' +
					'over at 0 afterwards.<br><br>' +
					'Connect output <code>C</code> of the Clock to input <code>I</code> of the ' +
					'Counter8. Every time the beat jumps from off to on, the counter moves one ' +
					'step further.'
			},
			{
				title: 'Showing the number',
				text:
					'The display is still missing. Place a <b>Byte</b> display and connect output ' +
					'<code>B</code> of the Counter8 — the middle one of the three on its right — to ' +
					'its input <code>B</code>.<br><br>' +
					'That completes the circuit: switch, slider, beat, counter, display.'
			},
			{
				title: 'Switching it on',
				text:
					'Look at the panel on the left: the switch, the slider and the display have ' +
					'appeared there. Every block you operate or read off reports in there.<br><br>' +
					'Flip the switch — the counter starts running. The slider sets the pace: far ' +
					'left it races, further right it calms down.<br><br>' +
					'The switch can also be flipped on the canvas: click the round knob in its ' +
					'middle.'
			},
			{
				title: 'Settings',
				text:
					'Click the Byte display once. Its settings appear in the <b>🛠️ Properties</b> ' +
					'window in the top right corner.<br><br>' +
					'Tick <b>Show Dec</b> there: the number additionally shows up as the familiar ' +
					'decimal number. Every block has settings like these — colours, sizes, number ' +
					'systems.'
			},
			{
				title: 'Tidying up',
				text:
					'<b>Move:</b> drag a block with the left mouse button held down.<br>' +
					'<b>Select:</b> pull open a rectangle on empty canvas.<br>' +
					'<b>Del</b> removes the selected block or the line under the mouse pointer.<br>' +
					'<b>Ctrl + drag</b> on empty canvas cuts every line the stroke crosses.<br>' +
					'<b>Ctrl+C</b> and <b>Ctrl+V</b> copy and paste, <b>Ctrl+D</b> duplicates the ' +
					'selection.'
			},
			{
				title: 'Saving and browsing',
				text:
					'In the <b>🏠 Menu</b> in the top right corner: <b>💾 Save As</b> puts your ' +
					'circuit onto your computer as a file, <b>📂 Open File</b> brings it back.' +
					'<br><br>' +
					'Under <b>📚 Examples</b> finished circuits are waiting — from a digital clock ' +
					'to a small drawing computer. Careful: loading one clears whatever is on the ' +
					'canvas right now.'
			},
			{
				title: 'All done!',
				text:
					'That was the tour through the editor. Everything else lives in the <b>wiki</b>: ' +
					'every block explained one by one, plus the basics and live demos to play with.' +
					'<br><br>' +
					'If you are up for more: the <b>advanced tour</b> builds a radio station with a ' +
					'teleprinter and a scope together with you. It no longer shows how the editor ' +
					'works, but what you can pull off with it.<br><br>' +
					'<b>👋 Welcome</b> in the 🏠 menu brings you back here at any time.'
			}
		],

		tourAdvanced: [
			{
				title: 'The radio station',
				text:
					'You know your way around the editor. Now we build something you would hardly ' +
					'believe is running in a browser: a <b>radio station</b>.<br><br>' +
					'You type a message. It goes out character by character over a real radio ' +
					'channel on the server, comes back, and rolls across a <b>teleprinter</b> with ' +
					'a flap display. Next to it a <b>scope</b> plots the traffic as a curve.<br><br>' +
					'Around two dozen blocks. Drag the canvas along with the right mouse button as ' +
					'you go — this one gets wide.'
			},
			{
				title: 'The sender desk',
				text:
					'Place a <b>Value</b> and set it to <b>binary</b> with value 1 in its ' +
					'properties — that is our permanent power, an <i>on</i> that never goes off.' +
					'<br><br>' +
					'Next to it a <b>Text Input</b>. Its typing field turns up in the panel on the ' +
					'left. Whatever you write there simply stays put for now — the block does not ' +
					'stir until its input <code>P</code> gets power. And we are about to give it ' +
					'that very deliberately.'
			},
			{
				title: 'The enter latch',
				text:
					'With permanent power on <code>P</code> the Text Input would swallow every ' +
					'character the moment you type it — you could write, but never correct. So we ' +
					'only arm it on command.<br><br>' +
					'Place an <b>RS FlipFlop</b> and a <b>Not</b>, and wire three paths:<br><br>' +
					'• <code>N</code> of the Text Input — the pulse when you press <b>Enter</b> — ' +
					'to <code>S</code><br>' +
					'• <code>W</code> of the Text Input — on while text is waiting in the field — ' +
					'to <code>A</code> of the Not, and <code>!A</code> of the Not to <code>R</code>' +
					'<br>' +
					'• <code>Q</code> of the flipflop back to <code>P</code> of the Text Input' +
					'<br><br>' +
					'Now you can type and correct at your leisure. <b>Enter</b> throws the latch: ' +
					'the field runs into the queue character by character. Once it is empty ' +
					'<code>W</code> goes off, the Not turns that into an <code>R</code> — and the ' +
					'latch falls shut on its own.'
			},
			{
				title: 'The sending beat',
				text:
					'A <b>Clock</b> sets the pace of the transmission. Connect the Value to its ' +
					'<code>P</code> and place a <b>Slider</b> whose <code>V</code> goes to ' +
					'<code>B</code> of the Clock.<br><br>' +
					'Output <code>C</code> of the Clock goes to <code>F</code> of the Text Input. ' +
					'<code>F</code> stands for flush: on every beat the oldest character moves out ' +
					'of the queue onto output <code>B</code>, together with a pulse on ' +
					'<code>T</code>.<br><br>' +
					'Set the slider to about 30. Any faster and the characters will overtake each ' +
					'other in the radio channel later on.'
			},
			{
				title: 'The transmitter',
				text:
					'Now the <b>Network Sender</b>. Click it and type the word ' +
					'<code>funkstation</code> into <b>Channel</b> in its properties. The channel ' +
					'name is the frequency: whoever enters the same name hears the same thing.' +
					'<br><br>' +
					'Connect <code>B</code> of the Text Input to <code>B</code> of the sender and ' +
					'<code>T</code> to <code>T</code>. The sender fires at exactly the moment a ' +
					'character is standing on the wire.<br><br>' +
					'The dish transmits as soon as it is connected to the server — it shows that ' +
					'with its waves.'
			},
			{
				title: 'The marker bit',
				text:
					'One catch: the radio channel only reports <b>changes</b>. Two identical ' +
					'letters in a row — the double L in "HELLO" — would not be a change. The second ' +
					'L would be lost.<br><br>' +
					'So we give every other character a marker. Place a <b>T FlipFlop</b> and lead ' +
					'<code>T</code> of the Text Input into it: it flips over with every character.' +
					'<br><br>' +
					'Then a <b>Select</b> and a <b>Value</b> holding 128 (not binary). ' +
					'<code>Q</code> of the flipflop goes to <code>E1</code>, the Value to ' +
					'<code>B1</code>. Output <code>B</code> now alternates between 128 and 0.'
			},
			{
				title: 'Two wires, one input',
				text:
					'Now connect <code>B</code> of the Select to the very same input <code>B</code> ' +
					'of the sender that already carries the character.<br><br>' +
					'That is allowed: <b>several wires into one input overlay each other</b> — bit ' +
					'by bit, like several transmitters on one frequency. The character and the 128 ' +
					'become a single number, and every other character travels with its top bit ' +
					'set.<br><br>' +
					'Every transmission now differs from the one before — the second L included.'
			},
			{
				title: 'The receiver',
				text:
					'Place a <b>Network Receiver</b> and give it the same channel name, ' +
					'<code>funkstation</code>.<br><br>' +
					'It puts whatever is on the frequency onto <code>B</code>, and a pulse onto ' +
					'<code>T</code> whenever that changes. Sender and receiver sit on the same ' +
					'canvas — the message still travels out to the server and back.'
			},
			{
				title: 'The portal',
				text:
					'What comes in is needed in two far apart places. Instead of long wires across ' +
					'the whole canvas we use a <b>Portal 4 Entry</b>. Give it the name ' +
					'<code>FUNK</code> in its properties.<br><br>' +
					'<code>I1</code> takes <code>B</code> of the receiver, <code>I2</code> its ' +
					'<code>T</code>, and <code>I3</code> the permanent power from the Value once ' +
					'more.<br><br>' +
					'Place two <b>Portal Exit</b> blocks far away and pick the portal ' +
					'<code>FUNK</code> under <b>Origin</b> in the properties of both. They now ' +
					'carry the same four values — without a single wire.'
			},
			{
				title: 'The teleprinter',
				text:
					'At the first exit portal: a <b>Modulo</b> and a <b>Value</b> of 128. ' +
					'<code>O1</code> of the portal goes to <code>B1</code>, the Value to ' +
					'<code>B2</code>. The remainder of a division by 128 drops exactly the marker ' +
					'bit — what is left is the plain character.<br><br>' +
					'Next to it a <b>Pipe 1</b> fed by <code>O2</code> of the portal. It does ' +
					'nothing except cost one tick — and that is the point: <b>every block costs one ' +
					'tick</b>. Value and trigger have to pass through the same number of stations, ' +
					'or the trigger arrives before the character does.'
			},
			{
				title: 'The flap display',
				text:
					'Place a <b>Terminal Display</b>. In its properties set <b>Terminal Width</b> ' +
					'to 22 and <b>Terminal Height</b> to 6.<br><br>' +
					'<code>R</code> of the Modulo goes to <code>B</code>, the output of the Pipe to ' +
					'<code>W</code>. <code>W</code> stands for write: on every pulse it writes the ' +
					'character at the cursor and moves one place on.<br><br>' +
					'Time for the first trial run: type something into the Text Input field on the ' +
					'left and press <b>Enter</b>. Watch the characters roll into place — like the ' +
					'flap board at a railway station.'
			},
			{
				title: 'The scope',
				text:
					'Radio can be seen as well. At the second exit portal we build a pen that ' +
					'sweeps across a screen from left to right.<br><br>' +
					'A <b>Clock</b> (<code>P</code> ← <code>O3</code> of the portal, <code>B</code> ' +
					'← a <b>Value</b> of 3) drives a <b>Counter8</b>. The counter is the position ' +
					'on the screen.<br><br>' +
					'Place a <b>Line Display</b> (Screen Width and Screen Height 255 each): ' +
					'<code>B</code> of the counter to <code>X</code>, <code>C</code> of the clock ' +
					'to <code>D</code> — every beat drags the pen one step further. And ' +
					'<code>O</code> of the counter, its overflow, to <code>C</code>: at the right ' +
					'edge the screen wipes itself clean.'
			},
			{
				title: 'The curve',
				text:
					'The height is still missing. Place a <b>Subtract</b> and a <b>Value</b> of ' +
					'250: the Value to <code>B1</code>, <code>O1</code> of the portal to ' +
					'<code>B2</code>, and <code>R</code> to <code>Y</code> of the Line Display.' +
					'<br><br>' +
					'250 minus the value turns the curve upside down — the resting line sits at ' +
					'the bottom and the peaks point up.<br><br>' +
					'Now send a longer message: the screen shows a clean square wave jumping ' +
					'between two bands. The upper band is the characters carrying the marker bit — ' +
					'you are watching your own transmission at work.'
			},
			{
				title: 'The counter',
				text:
					'One more eye-catcher for the panel: a <b>Counter8</b> whose <code>I</code> ' +
					'hangs on <code>O2</code> of the portal — it counts every transmission that ' +
					'arrives.<br><br>' +
					'Its <code>B</code> goes to a <b>Byte</b> display. Set it to <b>Show Dec</b> in ' +
					'the properties, font <code>digital-7</code> and a large font size — then it ' +
					'looks like a real mechanical counter.'
			},
			{
				title: 'Two stations',
				text:
					'And now the best part. Save the circuit with <b>💾 Save As</b>. Open the ' +
					'editor in a <b>second browser window</b> and load the file there with ' +
					'<b>📂 Open File</b>.<br><br>' +
					'Type in one window, press Enter — and read along in the other. Both stations are ' +
					'tuned to ' +
					'the same frequency. Enter a different channel name in both and you have a band ' +
					'to yourselves.<br><br>' +
					'The server remembers nothing along the way: a channel only lives while someone ' +
					'is listening, and with nothing being sent the signal fades to 0 after a second.'
			},
			{
				title: 'Where to go from here',
				text:
					'What this station could still become:<br><br>' +
					'• A <b>second channel</b> for the opposite direction — and you have an ' +
					'intercom.<br>' +
					'• A <b>Stack</b> behind the receiver that keeps incoming messages until you ' +
					'call them up.<br>' +
					'• A <b>Lamp</b> on <code>T</code> of the receiver as a reception light.<br>' +
					'• A <b>File Output</b> instead of the teleprinter: then the transmission drips ' +
					'out of the wire as a file.<br><br>' +
					'Every single block is documented with live demos in the <b>wiki</b>. Have fun!'
			}
		]
	}

}
