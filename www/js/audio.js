/**
 * Klangerzeugung für die Sound-Bausteine (js/operators/sound.js).
 *
 * Alle Stimmen hängen an einer gemeinsamen Summenschiene: einem Kompressor
 * vor dem Ausgang. Dadurch übersteuern gleichzeitig klingende Töne einander
 * nicht, egal wie viele Sound-Bausteine auf der Fläche liegen.
 *
 * Die Klangtechnik entsteht erst, wenn zum ersten Mal wirklich ein Ton
 * gebraucht wird. Das ist wichtig, weil der Bausteindialog jede
 * Operator-Klasse zur Vorschau einmal anlegt und sofort wieder wegwirft —
 * und weil Browser Klang ohnehin erst zulassen, nachdem jemand die Seite
 * angefasst hat.
 */

// Reserve gegen Übersteuern: eine einzelne Stimme geht nie auf volle
// Aussteuerung, damit mehrere Stimmen zusammen noch Luft haben
const AUDIO_HEADROOM = 0.25

// Ein- und Ausblenden jedes Tons, in Sekunden. Ohne diese kurzen Rampen
// springt die Schwingung hart auf ihren Wert und man hört ein Knacken.
const AUDIO_ATTACK = 0.005
const AUDIO_RELEASE = 0.015

// Lücke beim Neuanschlag eines schon klingenden Tons. Ohne sie gingen zwei
// gleiche Töne hintereinander als ein einziger langer Ton durch.
const AUDIO_RESTART_GAP = 0.004

// Die Wellenformen in der Reihenfolge, in der sie am W-Eingang stehen
const AUDIO_WAVEFORMS = ['square', 'sine', 'sawtooth', 'triangle']

// Notennummer des Kammertons a' und seine Frequenz — der Bezugspunkt, an
// dem die ganze Tonleiter hängt
const AUDIO_REFERENCE_NOTE = 69
const AUDIO_REFERENCE_HZ = 440

var audioContext = null
var audioBus = null

/**
 * Weckt den Klang, sobald jemand die Seite anfasst.
 *
 * Browser starten einen frisch angelegten AudioContext angehalten und
 * lassen ihn erst nach einer Eingabe des Benutzers laufen.
 */
function unlockAudio() {
	if (!!audioContext && audioContext.state === 'suspended') {
		audioContext.resume()
	}
}

window.addEventListener('pointerdown', unlockAudio)
window.addEventListener('keydown', unlockAudio)

/**
 * Liefert die gemeinsame Summenschiene und legt sie beim ersten Aufruf an.
 * @return Der Knoten, an den sich Stimmen hängen — oder null, wenn der
 *         Browser kein Web Audio kann; dann bleibt alles still.
 */
function getAudioBus() {
	if (!!audioBus) {
		return audioBus
	}

	let Ctor = window.AudioContext || window.webkitAudioContext
	if (!Ctor) {
		return null
	}

	audioContext = new Ctor()
	audioBus = audioContext.createDynamicsCompressor()
	audioBus.connect(audioContext.destination)
	unlockAudio()

	return audioBus
}

/**
 * Rechnet eine Notennummer in ihre Frequenz um.
 *
 * Gezählt wird wie im MIDI-Standard: ein Schritt ist ein Halbton, zwölf
 * Schritte sind eine Oktave, und die 69 ist der Kammerton a' mit 440 Hz.
 * Gleiche Schritte ergeben dadurch gleiche musikalische Abstände — genau
 * das braucht eine Melodie, und genau das leistet eine gerade Hertz-Skala
 * nicht.
 *
 * @param note Notennummer (0–255).
 * @return Frequenz in Hertz.
 */
function noteToFrequency(note) {
	return AUDIO_REFERENCE_HZ * Math.pow(2, (note - AUDIO_REFERENCE_NOTE) / 12)
}

/**
 * Rechnet eine Lautstärke in den Pegel der Stimme um.
 *
 * Das Ohr hört Lautstärke nicht gerade: Die halbe Auslenkung klingt nicht
 * halb so laut. Die quadratische Kurve gleicht das grob aus, sodass der
 * Regelweg über seine ganze Länge gleichmäßig wirkt.
 *
 * @param loudness Lautstärke von 0 bis 1.
 * @return Pegel für den Lautstärkeregler der Stimme.
 */
function loudnessToGain(loudness) {
	let l = Math.min(1, Math.max(0, loudness))
	return l * l * AUDIO_HEADROOM
}

/**
 * Eine Stimme: ein dauerhaft schwingender Oszillator, den ein eigener
 * Lautstärkeregler auf- und zublendet.
 *
 * Dass der Oszillator durchläuft statt je Ton neu zu entstehen, ist Absicht
 * — so gibt es weder Knacken beim Anlegen noch Abfall, der sich mit der
 * Zeit anhäuft. Je Sound-Baustein gibt es genau eine Stimme; mehrstimmig
 * wird es durch mehrere Bausteine.
 */
class BeepVoice {

	constructor() {
		this.osc = null
		this.gain = null

		// zuletzt gesetzte Werte — nur echte Änderungen werden an die
		// Klangtechnik weitergereicht, denn update() läuft in jedem Frame
		this.lastLevel = -1
		this.lastFrequency = -1
		this.lastWaveIndex = -1
	}

	/**
	 * Legt Oszillator und Regler an, sobald sie gebraucht werden.
	 * @return true, wenn die Stimme spielbereit ist.
	 */
	_build() {
		if (!!this.osc) {
			return true
		}

		let bus = getAudioBus()
		if (!bus) {
			return false
		}

		this.gain = audioContext.createGain()
		this.gain.gain.value = 0
		this.gain.connect(bus)

		this.osc = audioContext.createOscillator()
		this.osc.type = AUDIO_WAVEFORMS[0]
		this.osc.connect(this.gain)
		this.osc.start()

		return true
	}

	/**
	 * Bringt die Stimme auf den gewünschten Stand. Wird in jedem Frame
	 * aufgerufen und tut nur dann etwas, wenn sich wirklich etwas ändert.
	 *
	 * @param on Soll die Stimme klingen?
	 * @param frequency Tonhöhe in Hertz.
	 * @param level Pegel von 0 bis AUDIO_HEADROOM (siehe loudnessToGain).
	 * @param waveIndex Wellenform als Platz in AUDIO_WAVEFORMS.
	 * @param restart Neuanschlag: kurz absetzen und wieder anschlagen.
	 */
	update(on, frequency, level, waveIndex, restart = false) {
		if (!on && !this.osc) {
			return // solange nie etwas klang, braucht es auch keine Klangtechnik
		}
		if (!this._build()) {
			return
		}

		let now = audioContext.currentTime

		if (waveIndex !== this.lastWaveIndex) {
			this.lastWaveIndex = waveIndex
			this.osc.type = AUDIO_WAVEFORMS[waveIndex] || AUDIO_WAVEFORMS[0]
		}
		if (frequency !== this.lastFrequency) {
			this.lastFrequency = frequency
			this.osc.frequency.setValueAtTime(frequency, now)
		}

		let target = on ? level : 0
		let restarting = restart && on

		if (!restarting && (target === this.lastLevel)) {
			return
		}
		this.lastLevel = target

		let gain = this.gain.gain
		gain.cancelScheduledValues(now)
		gain.setValueAtTime(gain.value, now)

		if (restarting) {
			gain.linearRampToValueAtTime(0, now + AUDIO_RESTART_GAP)
			gain.linearRampToValueAtTime(target, now + AUDIO_RESTART_GAP + AUDIO_ATTACK)
		}
		else if (target > 0) {
			gain.linearRampToValueAtTime(target, now + AUDIO_ATTACK)
		}
		else {
			gain.linearRampToValueAtTime(0, now + AUDIO_RELEASE)
		}
	}

	/** Blendet die Stimme aus und räumt sie ab. */
	kill() {
		if (!this.osc) {
			return
		}

		let osc = this.osc
		let gain = this.gain
		let now = audioContext.currentTime

		gain.gain.cancelScheduledValues(now)
		gain.gain.setValueAtTime(gain.gain.value, now)
		gain.gain.linearRampToValueAtTime(0, now + AUDIO_RELEASE)

		osc.onended = () => {
			osc.disconnect()
			gain.disconnect()
		}
		osc.stop(now + AUDIO_RELEASE + 0.01)

		this.osc = null
		this.gain = null
	}
}
