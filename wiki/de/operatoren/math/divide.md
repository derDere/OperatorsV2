# Divide

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Divide ist das **Geteilt-Zeichen**: Er rechnet `B1 ÷ B2`.

Durch die Leitungen hier fließen nur ganze Zahlen. Divide rundet sein
Ergebnis deshalb immer nach unten ab: `13 ÷ 4` ergibt 3, die Kommastellen
fallen weg. Was beim Teilen übrig bleibt, zeigt der Partner-Baustein
[Modulo](modulo.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, die geteilt wird |
| `B2` | Eingang | Byte | Die Zahl, durch die geteilt wird |
| `R` | Ausgang | Byte | Das Ergebnis, abgerundet auf eine ganze Zahl |
| `RN` | Ausgang | Bit | An, wenn das Ergebnis unter null läge — beim Teilen zweier Bytes nie |
| `O` | Ausgang | Byte | Zweiter Ergebnis-Ausgang für Zahlen über 255 — hier immer 0 |
| `ON` | Ausgang | Bit | Gehört zu `O` und bleibt hier ebenfalls aus |

Teilst du durch 0, kommt einfach 0 heraus — die Schaltung läuft ganz
normal weiter, ohne Fehlermeldung.

## Ausprobieren

```operatorsv2
{
	"opAll": [
		{ "_#new": "Divide", "_id": "div1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zahlen kleiner machen**: Eine feste Zahl auf `B2` macht jedes Signal
  entsprechend kleiner — z. B. ÷ 2, um jede Zahl zu halbieren (aus 100
  wird 50, aus 51 wird 25).
- **Ziffern gewinnen**: `37 ÷ 10` ergibt 3 — alles vor der letzten
  Ziffer. Die letzte Ziffer selbst (hier: 7) liefert `37 mod 10`. Diese
  Zerlegung übernimmt fertig der
  [Base Converter](../converter/base-converter.md).
- **Gruppieren**: Zählst du 0, 1, 2, 3, 4, 5, 6, 7, 8 durch und teilst
  jede Zahl durch 3, kommt 0, 0, 0, 1, 1, 1, 2, 2, 2 heraus — die
  Gruppennummer. So lässt sich zum Beispiel alle drei Schritte etwas
  weiterschalten.

## Siehe auch

[Modulo](modulo.md) · [Multiply](multiply.md) ·
[Base Converter](../converter/base-converter.md)
