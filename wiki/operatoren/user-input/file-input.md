# File Input

[Operator-Lexikon](../index.md) · Kategorie: **User Input**

File Input öffnet der Schaltung die Tür zu **echten Dateien**: Auf der
Panelfläche rechts im Editor gehört zu ihm ein „Datei auswählen"-Feld.
Die hochgeladene Datei liegt dann als lange Byte-Kette bereit — denn jede
Datei ist am Ende nichts anderes als eine Folge von Bytes (siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)). Jede steigende
Flanke an `T` liest das nächste Byte.

Die Zahl auf dem Baustein zeigt, wie viele Bytes noch ungelesen sind.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `T` | Eingang | Bit | Steigende Flanke: liest das nächste Byte |
| `R` | Eingang | Bit | Steigende Flanke: springt zurück an den Dateianfang |
| `C` | Eingang | Bit | Steigende Flanke: wirft die Datei weg |
| `B` | Ausgang | Byte | Das zuletzt gelesene Byte |
| `T` | Ausgang | Bit | Ein Tick an, wenn gerade ein Byte gelesen wurde |
| `E` | Ausgang | Bit | An, wenn alle Bytes gelesen sind (oder keine Datei da ist) |
| `N` | Ausgang | Bit | Ein Tick an, wenn eine neue Datei hochgeladen wurde |

## Ausprobieren

So sieht der Baustein aus. Das Upload-Feld gehört zur Panelfläche des
Editors — ohne Datei bleibt hier `E` dauerhaft an:

```operatorsv2
{
	"opAll": [
		{ "_#new": "File Input", "_id": "file1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Datei anschauen**: Eine [Clock](../signal/clock.md) auf `T`, die Bytes
  auf ein [Byte](../display/byte.md)-Display oder als Zeichen auf das
  [Terminal Display](../display/terminal-display.md) — die Schaltung
  „liest" die Datei sichtbar vor. Das Beispiel *mini_pc_sim* im
  📚-Examples-Menü des Editors treibt so sogar einen kleinen Rechner an.
- **Datei kopieren**: File Input Byte für Byte in einen
  [File Output](../user-output/file-output.md) pumpen (`T`-Ausgang hier an
  `T`-Eingang dort) — am Ende steht dieselbe Datei zum Download bereit.
  Wer mag, verrechnet die Bytes unterwegs — etwa mit
  [Xor](../logic/xor.md) im Bitwise-Modus als simple Verschlüsselung.
- **Daten als Programm**: Eigene Dateien als Abspiel-Listen, Melodien oder
  Befehlsfolgen — die Datei wird zum ROM der Schaltung, `R` spult zurück.

## Siehe auch

[File Output](../user-output/file-output.md) ·
[Stack Input](../fixed-input/stack-input.md) ·
[Terminal Display](../display/terminal-display.md)
