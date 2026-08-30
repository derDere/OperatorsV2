# Text Input

[Operator-Lexikon](../index.md) · Kategorie: **User Input**

Text Input ist die **Tastatur** der Schaltung: Auf der Panelfläche
links im Editor gehört zu ihm ein echtes Eingabefeld. Was du dort
tippst, wird sofort in Zahlen übersetzt: Jedem Buchstaben ist eine feste
Nummer zugeordnet, das große A ist zum Beispiel die 65. Diese Nummer
nennt man den **Zeichencode** eines Zeichens, die ganze Liste dahinter
**ASCII** (mehr dazu unter
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)).

Sobald `P` (Power) an ist, stellt der Baustein die Zeichencodes — einen
pro Tick — der Reihe nach in eine **Warteschlange**: Heraus kommt immer
zuerst, was am längsten wartet, wie an der Kasse (siehe
[Stapel und Warteschlange](../../grundlagen/stapel-und-warteschlange.md)).
Die Schaltung holt sich die Zeichen in ihrem eigenen Tempo ab: Wechselt
`F` (Flush) von aus auf an — diesen Moment nennt man eine **steigende
Flanke** (siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)) —, erscheint
das nächste wartende Zeichen auf `B`.

Die Zahl auf dem Baustein zeigt, wie viele Zeichen noch warten.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `P` | Eingang | Bit | Power: Solange an, wandert pro Tick ein getipptes Zeichen vom Feld in die Warteschlange |
| `F` | Eingang | Bit | Flush — steigende Flanke: gibt das älteste Zeichen auf `B` aus |
| `C` | Eingang | Bit | Leert die Warteschlange, solange an |
| `B` | Ausgang | Byte | Der Zeichencode des zuletzt ausgegebenen Zeichens |
| `T` | Ausgang | Bit | Ein Tick an, wenn gerade ein Zeichen ausgegeben wurde |
| `N` | Ausgang | Bit | Ein Tick an, wenn im Eingabefeld Enter gedrückt wurde |
| `W` | Ausgang | Bit | An, solange noch ungelesener Text im Eingabefeld steht |
| `E` | Ausgang | Bit | An, solange die Warteschlange leer ist |

## Ausprobieren

So sieht der Baustein aus. Das Eingabefeld selbst gehört zur Panelfläche
des Editors — dort tippen, hier in der Demo bleibt die Warteschlange
deshalb leer:

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
[Stack](../memory/stack.md) · [File Input](file-input.md) ·
[Stapel und Warteschlange](../../grundlagen/stapel-und-warteschlange.md)
