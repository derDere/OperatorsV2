const Op_FileInput = register(
	"File Input",
	"User Input",
	"Upload a file and read its bytes like a stack. Trigger reads the next byte, Reset restarts, Clear drops the file, N pulses on upload, E = end",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.bytes = new Uint8Array(0)
			this.output = 0
			this.readPos = 0 // Lesezeiger

			this._newFile = false

			this.lastT = false
			this.lastR = false
			this.lastC = false

			this.in_t = this.newInput("T", "Trigger", "A rising edge reads the next byte of the file")
			this.in_r = this.newInput("R", "Reset", "A rising edge restarts reading at the first byte")
			this.in_c = this.newInput("C", "Clear", "A rising edge drops the loaded file")

			this.out_b = this.newOutput("B", "Byte", "The byte read last")
			this.out_t = this.newOutput("T", "Trigger", "True for one tick when a byte was read")
			this.out_e = this.newOutput("E", "End", "True when all bytes have been read")
			this.out_n = this.newOutput("N", "New File", "True for one tick when a new file was uploaded")
		}

		createElement() {
			let ele = document.createElement('input')
			ele.type = 'file'
			ele.addEventListener('change', () => {
				let file = ele.files[0]
				if (!file) {
					return
				}
				file.arrayBuffer().then((buffer) => {
					this.bytes = new Uint8Array(buffer)
					this.readPos = 0
					this._newFile = true
				})
			})
			return ele
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let t = !!(this.in_t.value)
			let r = !!(this.in_r.value)
			let c = !!(this.in_c.value)

			let trigger = false
			let reset = false
			let clear = false
			let outT = false

			if (t != this.lastT && t) {
				trigger = true
			}
			if (r != this.lastR && r) {
				reset = true
			}
			if (c != this.lastC && c) {
				clear = true
			}

			this.lastT = t
			this.lastR = r
			this.lastC = c

			if (clear) {
				this.bytes = new Uint8Array(0)
				this.readPos = 0
				if (this.ele) {
					this.ele.value = '' // dieselbe Datei kann danach erneut gewählt werden
				}
			}

			if (reset) {
				this.readPos = 0
			}

			if (trigger && this.readPos < this.bytes.length) {
				this.output = this.bytes[this.readPos]
				this.readPos++
				outT = true
			}
			else if (this.bytes.length <= 0) {
				this.output = 0
			}

			this.out_b.value = this.output & 255
			this.out_t.value = outT
			this.out_e.value = (this.readPos >= this.bytes.length)
			this.out_n.value = this._newFile
			this._newFile = false
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.bytes.length - this.readPos, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('FILE IN', 0, 5)

			p5ctx.pop()
		}
	}
)

const Op_FileOutput = register(
	"File Output",
	"User Output",
	"Collects bytes like a stack and offers them as a file download. Trigger pushes V, Clear empties the stack",
	class extends Placeable {

		constructor(x = 0, y = 0) {
			super(x, y)

			this.bytes = []
			this.fileName = 'output.bin'
			this.mimeType = 'application/octet-stream'
			this.linkText = 'Download'

			this.lastT = false
			this.lastC = false

			this._blobUrl = null

			this.in_v = this.newInput("V", "Value", "Byte value that is appended to the file on a trigger")
			this.in_t = this.newInput("T", "Trigger", "A rising edge appends the current value to the file")
			this.in_c = this.newInput("C", "Clear", "A rising edge empties the collected bytes")
		}

		kill() {
			super.kill()
			if (this._blobUrl) {
				URL.revokeObjectURL(this._blobUrl)
			}
		}

		getConfig() {
			return {
				...super.getConfig(),
				Filename: this.fileName,
				Mimetype: this.mimeType,
				"Link Text": this.linkText
			}
		}

		setConfig(conf, loaded = false) {
			super.setConfig(conf, loaded)
			if ('Filename' in conf) {
				this.fileName = conf.Filename
			}
			if ('Mimetype' in conf) {
				this.mimeType = conf.Mimetype
			}
			if ('Link Text' in conf) {
				this.linkText = conf['Link Text']
			}
		}

		createElement() {
			let ele = document.createElement('a')
			ele.innerText = this.linkText
			ele.href = '#'
			// Blob erst beim Klick bauen — der Download enthält so immer den aktuellen Stapelinhalt
			ele.addEventListener('click', () => {
				let blob = new Blob([Uint8Array.from(this.bytes)], { type: this.mimeType })
				if (this._blobUrl) {
					URL.revokeObjectURL(this._blobUrl)
				}
				this._blobUrl = URL.createObjectURL(blob)
				ele.href = this._blobUrl
				ele.download = this.fileName
			})
			return ele
		}

		updateElement(ele) {
			ele.innerText = this.linkText
		}

		doUpdate(tick, p5ctx) {
			super.doUpdate(tick, p5ctx)

			let v = (this.in_v.value) & 255
			let t = !!(this.in_t.value)
			let c = !!(this.in_c.value)

			let push = false
			let clear = false

			if (t != this.lastT && t) {
				push = true
			}
			if (c != this.lastC && c) {
				clear = true
			}

			this.lastT = t
			this.lastC = c

			if (push) {
				this.bytes.push(v)
			}

			if (clear) {
				this.bytes = []
			}
		}

		doDraw(tick, p5ctx) {
			super.doDraw(tick, p5ctx)

			p5ctx.push()

			p5ctx.noStroke()
			p5ctx.fill(0)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.BOTTOM)
			p5ctx.textSize(18)
			p5ctx.text(this.bytes.length, 0, 5)
			p5ctx.textAlign(p5ctx.CENTER, p5ctx.TOP)
			p5ctx.textSize(10)
			p5ctx.text('FILE OUT', 0, 5)

			p5ctx.pop()
		}
	}
)
