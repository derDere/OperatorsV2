# Stack Input

[Operator-Lexikon](../index.md) · Kategorie: **Fixed Input**

Stack Input ist das **Abspielband**: eine fest einprogrammierte Liste
von Bytes, die die Schaltung der Reihe nach abrufen kann — wie ein Band,
das immer denselben Song in derselben Reihenfolge abspielt. Jedes Mal,
wenn der Eingang `T` von aus auf an wechselt — diesen Moment nennt man
eine **steigende Flanke** (siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)) —, gibt der
Baustein den nächsten Wert aus.

Die Liste selbst steht im Properties-Fenster als kommagetrennte
**Hex-Codes** (siehe [Bits und Bytes](../../grundlagen/bits-und-bytes.md)),
zum Beispiel `48, 61, 6C, 6C, 6F` — das sind die Nummern der Buchstaben
von „Hallo". Jeder Buchstabe hat so eine feste Nummer, seinen
**Zeichencode** (mehr dazu bei
[Text Input](../user-input/text-input.md)).

Auf dem Baustein steht „ROM" — der Fachbegriff für einen festen
Speicher, aus dem sich nur lesen lässt — und die Zahl der noch
ungelesenen Werte.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `T` | Eingang | Bit | Steigende Flanke: liest den nächsten Wert |
| `R` | Eingang | Bit | Steigende Flanke: springt zurück an den Anfang |
| `B` | Ausgang | Byte | Der zuletzt gelesene Wert |
| `T` | Ausgang | Bit | Ein Tick an, wenn gerade ein Wert gelesen wurde |
| `E` | Ausgang | Bit | An, wenn alle Werte gelesen sind |

## Ausprobieren

Diese Demo trägt die Liste `48, 61, 6C, 6C, 6F` („Hallo"). Schalte `T`
mehrmals an und aus — die Codes erscheinen nacheinander auf `B`. Am Ende
geht `E` an; `R` spult zurück:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack Input", "_id": "rom1", "_x": 0, "_y": 0, "Values": "48, 61, 6C, 6C, 6F" }
	],
	"conAll": []
}
```

## Einsatzideen

- **Texte abspielen**: Zeichencodes hinterlegen und per
  [Clock](../signal/clock.md) auf das
  [Terminal Display](../display/terminal-display.md) schreiben — die
  Schaltung tippt von selbst.
- **Melodien und Muster**: Jede Zahlenfolge — Blinkmuster, Positionen
  für das [Line Display](../display/line-display.md), feste
  Vorgabewerte — läuft auf Knopfdruck oder im Takt ab. Verbindest du `E`
  mit `R`, spult das Band immer wieder von selbst zurück — eine
  Endlosschleife.
- **Programm-ROM**: Im Beispiel *mini_pc_sim* (📚-Examples-Menü im Editor)
  liegt so das „Programm" eines Mini-Rechners fest.
- Für Listen, die die Schaltung **selbst befüllen** soll, nimm den
  [Stack](../memory/stack.md); für Inhalte aus echten Dateien den
  [File Input](../user-input/file-input.md).

## Siehe auch

[Stack](../memory/stack.md) · [Register](../memory/register.md) ·
[File Input](../user-input/file-input.md) · [Value](value.md)
