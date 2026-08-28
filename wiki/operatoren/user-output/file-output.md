# File Output

[Operator-Lexikon](../index.md) · Kategorie: **User Output**

File Output ist der **Datei-Schreiber**: Er sammelt Byte für Byte ein, was
die Schaltung ihm übergibt — und bietet das Gesammelte auf der Panelfläche
rechts im Editor als **Download-Link** an. Dateiname und Dateityp lassen
sich in den Properties einstellen; der Link ist ausgegraut, solange nichts
gesammelt wurde oder gerade noch geschrieben wird.

Die Zahl auf dem Baustein zeigt, wie viele Bytes schon gesammelt sind.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `V` | Eingang | Byte | Der Wert, der angehängt wird |
| `T` | Eingang | Bit | Steigende Flanke: hängt `V` an die Datei an |
| `C` | Eingang | Bit | Steigende Flanke: verwirft alles Gesammelte |

## Ausprobieren

Stelle auf `V` einen Wert ein und schalte `T` an und aus — der Zähler auf
dem Baustein wächst mit jedem Einschalt-Moment (der Download-Link gehört
zur Panelfläche des Editors):

```operatorsv2
{
	"opAll": [
		{ "_#new": "File Output", "_id": "file1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Ergebnisse mitschreiben**: Messwerte, Zählerstände oder erzeugte
  Muster landen als echte Datei auf deinem Rechner.
- **Text erzeugen**: Zeichencodes sammeln (ein Byte pro Zeichen, siehe
  [Bits und Bytes](../../grundlagen/bits-und-bytes.md)), als Dateinamen
  etwas mit `.txt` einstellen — fertig ist die selbstgeschriebene
  Textdatei.
- **Dateien umbauen**: [File Input](../user-input/file-input.md) liest,
  die Schaltung verändert jedes Byte (z. B.
  [Xor](../logic/xor.md)-Verschlüsselung, Filter, Umsortieren), File
  Output schreibt das Ergebnis — eine komplette
  Datei-Verarbeitungsmaschine ohne eine Zeile Programmcode.

## Siehe auch

[File Input](../user-input/file-input.md) · [Stack](../memory/stack.md) ·
[Byte](../display/byte.md)
