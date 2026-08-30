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
					'Über <b>👋 Welcome</b> im 🏠-Menü kommst du jederzeit hierher zurück.'
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
					'<b>👋 Welcome</b> in the 🏠 menu brings you back here at any time.'
			}
		]
	}

}
