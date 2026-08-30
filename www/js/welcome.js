// Willkommens-Meldung und geführte Tour des Editors.
//
// Beim Laden der Seite erscheint mittig eine Begrüßung mit einem Bild einer
// fertigen Schaltung, einem Knopf für die Tour, einem Wiki-Link und dem
// Ankreuzfeld „Nicht wieder anzeigen". Ein Klick daneben, auf „Nein, danke"
// oder auf das × schließt sie; gemerkt wird nur, was beim Schließen im
// Ankreuzfeld steht. Über den Menüpunkt „👋 Welcome" (js/menu.js) lässt sie
// sich jederzeit wieder öffnen.
//
// Startet der Leser die Tour, wandert dasselbe Fenster nach unten links und
// zeigt dort Schritt für Schritt Hinweise mit Zurück und Weiter. Der Rest der
// Seite bleibt dabei voll bedienbar — die Tour lässt den Leser die Schaltung
// wirklich selbst bauen.
//
// Es gibt zwei Touren: die Grundtour erklärt den Editor, die erweiterte Tour
// setzt ihn voraus und baut eine große Schaltung. Der letzte Schritt der
// Grundtour bietet die erweiterte Tour als eigenen Knopf an.
//
// Die Texte stehen in js/welcome_texts.js, die Sprache liefert js/lang.js: Sie
// folgt der Wiki-Sprachwahl, auch wenn diese im geöffneten Wiki-Fenster
// gerade umgestellt wird (storage-Ereignis).

const WELCOME_HIDDEN_STORAGE_KEY = 'operatorsv2-welcome-hidden'

const WELCOME_MARGIN = 16       // Abstand zum Fensterrand in Pixeln
const WELCOME_INTRO_WIDTH = 560 // Breite der Begrüßung (mit Bild)
const WELCOME_TOUR_WIDTH = 360  // Breite des Hinweis-Fensters der Tour

// Schlüssel der beiden Schritt-Listen in js/welcome_texts.js
const WELCOME_TOUR_BASIC = 'tour'
const WELCOME_TOUR_ADVANCED = 'tourAdvanced'

class WelcomeGuide { ////////////////////////////////////////////////////////////////////////////////////

	constructor() {
		this.box = document.getElementById('welcomeBox')
		this.backdrop = document.getElementById('welcomeBackdrop')
		this.preview = document.getElementById('welcomePreview')
		this.previewImage = document.getElementById('welcomePreviewImage')
		this.titleEle = document.getElementById('welcomeTitle')
		this.textEle = document.getElementById('welcomeText')
		this.stepEle = document.getElementById('welcomeStep')
		this.introActions = document.getElementById('welcomeIntroActions')
		this.tourActions = document.getElementById('welcomeTourActions')
		this.startButton = document.getElementById('welcomeStart')
		this.declineButton = document.getElementById('welcomeDecline')
		this.backButton = document.getElementById('welcomeBack')
		this.nextButton = document.getElementById('welcomeNext')
		this.closeButton = document.getElementById('welcomeClose')
		this.againBox = document.getElementById('welcomeAgainBox')
		this.againLabel = document.getElementById('welcomeAgainLabel')
		this.wikiLink = document.getElementById('welcomeWiki')
		this.extra = document.getElementById('welcomeExtra')
		this.advancedButton = document.getElementById('welcomeAdvanced')

		this.lang = detectLanguage()
		this.strings = WELCOME_STRINGS[this.lang]

		this.tourKey = WELCOME_TOUR_BASIC
		this.stepIndex = -1 // -1 = Begrüßung, ab 0 der jeweilige Tour-Schritt
		this.isOpen = false

		this._wireEvents()
	}

	// Zeigt die Tour gerade einen ihrer Schritte statt der Begrüßung?
	get isTour() {
		return this.stepIndex >= 0
	}

	// Schritte der gerade laufenden Tour
	get steps() {
		return this.strings[this.tourKey]
	}

	get stepCount() {
		return this.steps.length
	}

	get isLastStep() {
		return this.stepIndex >= (this.stepCount - 1)
	}

	_wireEvents() {
		this.startButton.addEventListener('click', () => this.startTour())
		this.declineButton.addEventListener('click', () => this.close())
		this.closeButton.addEventListener('click', () => this.close())
		this.backButton.addEventListener('click', () => this.goToStep(this.stepIndex - 1))
		this.nextButton.addEventListener('click', () => this._next())
		this.advancedButton.addEventListener('click', () => this.startTour(WELCOME_TOUR_ADVANCED))

		this.wikiLink.addEventListener('click', (event) => {
			event.preventDefault()
			openWikiWindow()
		})

		// Ein Klick neben das Fenster schließt die Begrüßung
		this.backdrop.addEventListener('mousedown', (event) => {
			event.stopPropagation()
			this.close()
		})

		// Die Zeichenfläche horcht auf Mausereignisse des ganzen Fensters —
		// was im Willkommens-Fenster passiert, darf sie nicht erreichen
		for (const name of ['mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu']) {
			this.box.addEventListener(name, (event) => event.stopPropagation())
			this.backdrop.addEventListener(name, (event) => event.stopPropagation())
		}

		document.addEventListener('keydown', (event) => {
			if (this.isOpen && event.key == 'Escape') {
				this.close()
			}
		})

		window.addEventListener('resize', () => {
			if (this.isOpen) {
				this._place()
			}
		})

		// Solange das Vorschaubild noch nicht da ist, faellt die Hoehe des
		// Fensters kleiner aus — danach sitzt es neu
		this.previewImage.addEventListener('load', () => {
			if (this.isOpen) {
				this._place()
			}
		})

		// Sprachwechsel im geöffneten Wiki-Fenster übernehmen
		window.addEventListener('storage', (event) => {
			if (event.key != WIKI_LANGUAGE_STORAGE_KEY) return
			this._applyLanguage(detectLanguage())
		})
	}

	// Öffnet die Begrüßung. Der Haken zeigt dabei den gemerkten Stand, sodass
	// ein erneutes Öffnen über das Menü ihn auch wieder aufheben kann.
	open() {
		this.tourKey = WELCOME_TOUR_BASIC
		this.stepIndex = -1
		this.againBox.checked = this._readHidden()
		this.isOpen = true
		this.box.hidden = false
		this.backdrop.hidden = false
		this._render()
	}

	// Zeigt die Begrüßung nur, solange „Nicht wieder anzeigen" nicht gesetzt ist
	autoShow() {
		if (this._readHidden()) return
		this.open()
	}

	// Beginnt eine der beiden Touren bei ihrem ersten Schritt
	startTour(tourKey = WELCOME_TOUR_BASIC) {
		this.tourKey = tourKey
		this.goToStep(0)
	}

	// Wechselt auf einen Tour-Schritt; die Begrüßung verschwindet dabei und das
	// Fenster wandert nach unten links
	goToStep(index) {
		if (index < 0) {
			index = 0
		}
		if (index >= this.stepCount) {
			index = this.stepCount - 1
		}
		this.stepIndex = index
		this.backdrop.hidden = true
		this._render()
	}

	// Übernimmt den Stand des Ankreuzfeldes und schließt das Fenster
	close() {
		this._writeHidden(this.againBox.checked)
		this.isOpen = false
		this.box.hidden = true
		this.backdrop.hidden = true
	}

	_next() {
		if (this.isLastStep) {
			this.close()
			return
		}
		this.goToStep(this.stepIndex + 1)
	}

	// Schreibt alle Texte und blendet die Bedienelemente der jeweiligen Ansicht
	// ein; danach sitzt das Fenster an seinem Platz
	_render() {
		let strings = this.strings

		this.box.lang = this.lang

		this.closeButton.title = strings.close
		this.closeButton.setAttribute('aria-label', strings.close)
		this.startButton.innerText = strings.start
		this.declineButton.innerText = strings.decline
		this.backButton.innerText = strings.back
		this.wikiLink.innerText = strings.wiki
		this.againLabel.innerText = strings.again
		this.previewImage.alt = strings.previewAlt
		this.advancedButton.innerText = strings.advanced

		if (this.isTour) {
			let step = this.steps[this.stepIndex]
			this.titleEle.innerText = step.title
			this.textEle.innerHTML = step.text
			this.stepEle.innerText = strings.step(this.stepIndex + 1, this.stepCount)
			this.nextButton.innerText = this.isLastStep ? strings.finish : strings.next
			this.backButton.disabled = (this.stepIndex <= 0)
		}
		else {
			this.titleEle.innerText = strings.title
			this.textEle.innerHTML = strings.intro
		}

		// Am Ende der Grundtour steht die erweiterte Tour als Angebot bereit und
		// nimmt dort die Hauptrolle unter den Knöpfen ein
		let offersAdvanced = this.isTour && this.isLastStep && (this.tourKey == WELCOME_TOUR_BASIC)
		this.extra.hidden = !offersAdvanced
		this.nextButton.classList.toggle('welcome-primary', !offersAdvanced)

		this.preview.hidden = this.isTour
		this.stepEle.hidden = !this.isTour
		this.introActions.hidden = this.isTour
		this.tourActions.hidden = !this.isTour

		this._place()
	}

	// Begrüßung mittig, Tour unten links — beide über dieselben beiden
	// Angaben, damit der Wechsel eine weiche Bewegung wird
	_place() {
		let width = this.isTour ? WELCOME_TOUR_WIDTH : WELCOME_INTRO_WIDTH
		this.box.style.width = Math.min(width, window.innerWidth - (2 * WELCOME_MARGIN)) + 'px'

		let left = WELCOME_MARGIN
		let bottom = WELCOME_MARGIN
		if (!this.isTour) {
			left = Math.round((window.innerWidth - this.box.offsetWidth) / 2)
			bottom = Math.round((window.innerHeight - this.box.offsetHeight) / 2)
		}

		this.box.style.left = Math.max(WELCOME_MARGIN, left) + 'px'
		this.box.style.bottom = Math.max(WELCOME_MARGIN, bottom) + 'px'
	}

	// Stellt Texte und Schrittzahl auf eine andere Sprache um. Der angezeigte
	// Schritt bleibt erhalten, weil beide Sprachen gleich viele Schritte haben.
	_applyLanguage(lang) {
		if (!(lang in WELCOME_STRINGS)) return
		if (lang == this.lang) return
		this.lang = lang
		this.strings = WELCOME_STRINGS[lang]
		if (this.stepIndex >= this.stepCount) {
			this.stepIndex = this.stepCount - 1
		}
		if (this.isOpen) {
			this._render()
		}
	}

	_readHidden() {
		try {
			return localStorage.getItem(WELCOME_HIDDEN_STORAGE_KEY) == '1'
		}
		catch {
			return false
		}
	}

	_writeHidden(hidden) {
		try {
			if (hidden) {
				localStorage.setItem(WELCOME_HIDDEN_STORAGE_KEY, '1')
			}
			else {
				localStorage.removeItem(WELCOME_HIDDEN_STORAGE_KEY)
			}
		}
		catch { }
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////

var welcomeGuide = null

function initWelcome() {
	welcomeGuide = new WelcomeGuide()
	welcomeGuide.autoShow()
}

// Vom Menüpunkt „👋 Welcome" aufgerufen
function showWelcome() {
	welcomeGuide.open()
}
