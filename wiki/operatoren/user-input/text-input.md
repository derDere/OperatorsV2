# Text Input

[Operator-Lexikon](../index.md) · Kategorie: **User Input**

Text Input ist die **Tastatur** der Schaltung: Auf der Panelfläche rechts
im Editor gehört zu ihm ein echtes Eingabefeld. Was du dort tippst, wird —
sobald `P` (Power) an ist — Zeichen für Zeichen eingesammelt und als
Zeichencodes (ein Byte pro Zeichen, siehe
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)) auf einem internen
Stapel geparkt. Die Schaltung holt sich die Zeichen dann in ihrem eigenen
Tempo ab: Jede steigende Flanke an `F` (Flush) gibt das älteste Zeichen
auf `B` aus.

Die Zahl auf dem Baustein zeigt, wie viele Zeichen gerade auf dem Stapel
warten.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `P` | Eingang | Bit | Power: Solange an, wandert pro Tick ein getipptes Zeichen vom Feld auf den Stapel |
| `F` | Eingang | Bit | Flush — steigende Flanke: gibt das älteste Zeichen auf `B` aus |
| `C` | Eingang | Bit | Leert den Stapel, solange an |
| `B` | Ausgang | Byte | Der Zeichencode des zuletzt ausgegebenen Zeichens |
| `T` | Ausgang | Bit | Ein Tick an, wenn gerade ein Zeichen ausgegeben wurde |
| `N` | Ausgang | Bit | Ein Tick an, wenn im Eingabefeld Enter gedrückt wurde |
| `W` | Ausgang | Bit | An, solange noch ungelesener Text im Eingabefeld steht |
| `E` | Ausgang | Bit | An, solange der Zeichen-Stapel leer ist |

## Ausprobieren

So sieht der Baustein aus. Das Eingabefeld selbst gehört zur Panelfläche
des Editors — dort tippen, hier in der Demo bleibt der Stapel deshalb leer:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Text Input", "_id": "txt1", "_x": 0, "_y": 0 },
		{ "_#new": "Value", "_id": "aus", "_x": -160, "_y": 100 }
	],
	"conAll": [
		{ "s": "aus_out_V", "e": "txt1_in_P" }
	]
}
```

(Der VALUE-Baustein hält den Power-Eingang definiert aus.)

## Einsatzideen

- **Schreibmaschine**: `B` und `T` direkt auf die Eingänge `B` und `W` des
  [Terminal Displays](../display/terminal-display.md), eine
  [Clock](../signal/clock.md) auf `F` — der getippte Text erscheint
  Zeichen für Zeichen auf dem Bildschirm.
- **Kommandos erkennen**: Zeichencodes per [Equals](../math/equals.md)
  vergleichen — „wenn ein `A` (Code 65) kommt, schalte die Lampe an".
  Enter erkennt man bequem am `N`-Ausgang.
- **Chat übers Netzwerk**: Getippte Zeichen per
  [Network Sender](../network/network-sender.md) verschicken und in einer
  anderen Browser-Sitzung aufs Terminal schreiben.
- **Tipp**: In den Properties lässt sich ein Starttext hinterlegen — die
  Schaltung hat dann direkt nach dem Laden „Getipptes" zum Abarbeiten.

## Siehe auch

[Terminal Display](../display/terminal-display.md) ·
[Stack](../memory/stack.md) · [File Input](file-input.md)
