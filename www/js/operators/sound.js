// Millisekunden je Zählschritt am Längen-Eingang: 255 ergibt damit 2550 ms
const SOUND_LENGTH_STEP = 10

// Standardwerte der unverdrahteten Eingänge. Zusammen ergeben sie den
// Piepton eines Rechners ohne weitere Angaben: kurz, laut, rechteckig.
const SOUND_DEFAULT_NOTE = 79 // rund 800 Hz
const SOUND_DEFAULT_VOLUME = 255
const SOUND_DEFAULT_LENGTH = 20 // 200 ms
const SOUND_DEFAULT_WAVE = 0 // Rechteck

// Lautsprecher: Gehäuse und Membran, die Schallwellen still und klingend
const SOUND_BODY_COLOR = [68, 68, 68]
const SOUND_WAVE_IDLE = [187, 187, 187]
const SOUND_WAVE_PLAYING = [0, 128, 255]
const SOUND_MUTE_COLOR = [224, 48, 48]

// Wie viele Schallwellen-Bögen der Lautsprecher hat und wie viel
// Lautstärke jeder von ihnen zum Erscheinen braucht
const SOUND_WAVE_COUNT = 3
const SOUND_WAVE_PER_STEP = 255 / SOUND_WAVE_COUNT

/**
 * Wert einer Schwingung an der Stelle `phase` — von -1 bis 1.
 *
 * @param phase Stelle innerhalb einer Welle, von 0 bis 1.
 * @param waveIndex Wellenform als Platz in AUDIO_WAVEFORMS.
 */
function soundWaveSample(phase, waveIndex) {
	switch (waveIndex) {
		case 1: // Sinus
			return Math.sin(phase * Math.PI * 2)
		case 2: // Sägezahn
			return 1 - (2 * phase)
		case 3: // Dreieck
			return (phase < 0.5) ? ((4 * phase) - 1) : (3 - (4 * phase))
		default: // Rechteck
			return (phase < 0.5) ? 1 : -1
	}
}

const Op_Sound = register(
	"Sound",
	"User Output",
	"Beeps a tone. N is the note (69 = A4 = 440 Hz), V the volume, L the length in 10ms steps, W the waveform. T restarts the tone, P holds it, M mutes it. Unwired inputs fall back to a plain 800Hz beep",
	class extends Operator {

		constructor(x = 0, y = 0) {
			super(x, y)

			// etwas breiter als der Standardbaustein: Lautsprecher, Kurve und
			// Werte brauchen Platz zwischen den beiden Anschlussreihen. Die
			// Breite muss vor dem ersten Anschluss stehen, weil sie in die
			// Anordnung der Anschlusskreise eingeht.
			this.width = 100

			// der Ton, der gerade klingt — beim Trigger festgehalten, beim
			// Dauerton den Eingängen folgend
			this.note = SOUND_DEFAULT_NOTE
			this.volume = SOUND_DEFAULT_VOLUME
			this.wave = SOUND_DEFAULT_WAVE
			this.lengthMs = SOUND_DEFAULT_LENGTH * SOUND_LENGTH_STEP

			this.playing = false
			this.holding = false
			this.muted = false

			this.lastTrigger = false
			this.until = 0 // Zeitpunkt, an dem der ausgelöste Ton endet

			this.voice = new BeepVoice()

			this.in_n = this.newInput("N", "Note", "Pitch as a note number: one step is a semitone, twelve steps an octave, 69 is A4 at 440Hz")
			this.in_v = this.newInput("V", "Volume", "How loud the tone is, from 0 to 255")
			this.in_l = this.newInput("L", "Length", "How long a triggered tone lasts, in steps of 10ms")
			this.in_w = this.newInput("W", "Waveform", "Timbre of the tone: 0 square, 1 sine, 2 sawtooth, 3 triangle")
			this.in_t = this.newInput("T", "Trigger", "A rising edge starts the tone over and restarts its length")
			this.in_p = this.newInput("P", "Power", "While true the tone keeps sounding without an end")
			this.in_m = this.newInput("M", "Mute", "While true the operator stays silent")

			this.out_playing = this.newOutput("O", "Playing", "True while a tone is sounding")
			this.out_n = this.newOutput("N", "Playing Note", "The note that is sounding right now")
			this.out_v = this.newOutput("V", "Playing Volume", "The volume that is sounding right now")
			this.out_w = this.newOutput("W", "Playing Waveform", "The waveform that is sounding right now")
		}

		kill() {
			super.kill()
			this.voice.kill()
		}

		/**
		 * Liest einen Byte-Eingang. Ein Eingang ohne Leitung meldet false —
		 * dann gilt sein Standardwert, damit ein frisch gesetzter Baustein
		 * sofort einen fertigen Ton hat.
		 */
		_readByte(io, fallback) {
			if (io.value === false) {
				return fallback
			}
			return io.value & 255
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let note = this._readByte(this.in_n, SOUND_DEFAULT_NOTE)
			let volume = this._readByte(this.in_v, SOUND_DEFAULT_VOLUME)
			let length = this._readByte(this.in_l, SOUND_DEFAULT_LENGTH)
			let wave = this._readByte(this.in_w, SOUND_DEFAULT_WAVE) % AUDIO_WAVEFORMS.length
			let trigger = !!(this.in_t.value)
			let power = !!(this.in_p.value)

			this.muted = !!(this.in_m.value)

			// Die Fläche läuft so schnell wie der Bildschirm, ein Tick ist
			// also kein Zeitmaß — die Länge eines Tons zählt echte Zeit
			let now = performance.now()

			// Steigende Flanke am Trigger: die Werte werden festgehalten und
			// die Restzeit beginnt von vorn
			let restart = trigger && !this.lastTrigger
			if (restart) {
				this.note = note
				this.volume = volume
				this.wave = wave
				this.lengthMs = length * SOUND_LENGTH_STEP
				this.until = now + this.lengthMs
			}
			this.lastTrigger = trigger

			let triggerRuns = (now < this.until)

			// Der Dauerton folgt den Eingängen live — so wird ein Sinus auf N
			// zur Sirene. Der ausgelöste Ton bleibt bei dem, was beim
			// Auslösen anlag, damit ein weiterlaufender Stack ihn nicht
			// mitten im Klingen verbiegt.
			this.holding = power && !triggerRuns
			if (this.holding) {
				this.note = note
				this.volume = volume
				this.wave = wave
			}

			this.playing = power || triggerRuns

			this.out_playing.value = this.playing
			this.out_n.value = this.note
			this.out_v.value = this.volume
			this.out_w.value = this.wave

			this.voice.update(
				this.playing && !this.muted,
				noteToFrequency(this.note),
				loudnessToGain(this.volume / 255),
				this.wave,
				restart
			)
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			this._drawWaveGraph(p5ctx)
			this._drawSpeaker(p5ctx)

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.CENTER)
			p5ctx.textSize(11)
			p5ctx.text('SOUND', 0, 42)
			p5ctx.textSize(9)
			p5ctx.text(this.note + ' · ' + (this.holding ? 'hold' : (this.lengthMs + 'ms')), 0, 55)

			p5ctx.pop()
		}

		/**
		 * Zeichnet die klingende Schwingung über dem Lautsprecher — dieselbe
		 * Idee wie die Signalspur des Repeaters. Die Form kommt von der
		 * Wellenform, die Zahl der Wellenberge von der Note und die Höhe von
		 * der Lautstärke.
		 */
		_drawWaveGraph(p5ctx) {
			const GRAPH_WIDTH = 56
			const GRAPH_HEIGHT = 11
			const GRAPH_Y = -48
			const GRAPH_STEP = 0.5

			// eine Wellenlänge je zwei Oktaven — die Kurve wird also enger,
			// je höher der Ton liegt, bleibt aber ablesbar
			let cycles = p5ctx.constrain(p5ctx.round(this.note / 24), 1, 6)
			let amplitude = (this.volume / 255) * GRAPH_HEIGHT
			let color = this.playing ? SOUND_WAVE_PLAYING : SOUND_WAVE_IDLE

			p5ctx.push()
			p5ctx.noFill()
			p5ctx.strokeWeight(1.5)
			p5ctx.stroke(color[0], color[1], color[2])

			p5ctx.beginShape()
			for (let x = 0; x <= GRAPH_WIDTH; x += GRAPH_STEP) {
				let phase = ((x / GRAPH_WIDTH) * cycles) % 1
				let y = -soundWaveSample(phase, this.wave) * amplitude
				p5ctx.vertex(x - (GRAPH_WIDTH / 2), GRAPH_Y + y)
			}
			p5ctx.endShape()

			p5ctx.pop()
		}

		/**
		 * Zeichnet den Lautsprecher: Gehäuse als Rechteck, Membran und drei
		 * Schallwellen als Bögen. Wie viele Wellen zu sehen sind, hängt an
		 * der Lautstärke; blau werden sie, solange der Ton klingt. Ist der
		 * Baustein stumm, liegt ein Kreuz darüber.
		 */
		_drawSpeaker(p5ctx) {
			// Alles steht auf einer Achse: Das Gehäuse sitzt links, aus seiner
			// rechten Kante öffnet sich der Trichter als Keil nach vorn, und
			// davor stehen die Schallwellen als Bögen um dieselbe Spitze.
			const AXIS_X = -20
			const BODY_WIDTH = 18
			const BODY_HEIGHT = 16
			const BODY_INSET = 10 // wie weit der Kasten in den Trichter hineingeschoben ist
			const CONE_RADIUS = 26
			const CONE_ANGLE = p5ctx.PI / 4 // halber Öffnungswinkel des Trichters
			const WAVE_ANGLE = p5ctx.PI * 0.22 // halber Öffnungswinkel der Wellen
			const WAVE_FIRST = 32
			const WAVE_GROWTH = 9
			const MUTE_REACH = 30

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(SOUND_BODY_COLOR[0], SOUND_BODY_COLOR[1], SOUND_BODY_COLOR[2])
			// Ohne BODY_INSET läge die rechte Kante des Gehäuses genau dort,
			// wo der Keil schon ebenso hoch ist — beide gingen dann ohne
			// dünne Stelle ineinander über. Der Versatz schiebt den Kasten
			// weiter in den Trichter, sodass er hinten kürzer heraussteht.
			p5ctx.rect(
				AXIS_X + (BODY_HEIGHT / 2) - (BODY_WIDTH / 2) + BODY_INSET, 0,
				BODY_WIDTH, BODY_HEIGHT
			)
			p5ctx.arc(AXIS_X, 0, CONE_RADIUS * 2, CONE_RADIUS * 2, -CONE_ANGLE, CONE_ANGLE, p5ctx.PIE)

			let color = this.playing ? SOUND_WAVE_PLAYING : SOUND_WAVE_IDLE

			p5ctx.noFill()
			p5ctx.strokeWeight(2.5)
			for (let i = 0; i < SOUND_WAVE_COUNT; i++) {
				let strength = p5ctx.constrain((this.volume - (i * SOUND_WAVE_PER_STEP)) / SOUND_WAVE_PER_STEP, 0, 1)
				if (strength <= 0) {
					continue
				}
				let radius = WAVE_FIRST + (i * WAVE_GROWTH)
				p5ctx.stroke(color[0], color[1], color[2], 255 * strength)
				p5ctx.arc(AXIS_X, 0, radius * 2, radius * 2, -WAVE_ANGLE, WAVE_ANGLE)
			}

			if (this.muted) {
				p5ctx.stroke(SOUND_MUTE_COLOR[0], SOUND_MUTE_COLOR[1], SOUND_MUTE_COLOR[2])
				p5ctx.strokeWeight(3)
				p5ctx.line(-MUTE_REACH, -MUTE_REACH, MUTE_REACH, MUTE_REACH)
				p5ctx.line(-MUTE_REACH, MUTE_REACH, MUTE_REACH, -MUTE_REACH)
			}

			p5ctx.pop()
		}
	}
)
