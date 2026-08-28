# Divide

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Divide ist das **Geteilt-Zeichen**: Er rechnet `B1 ÷ B2` und gibt das
Ergebnis **ganzzahlig** aus — Nachkommastellen werden abgeschnitten
(7 ÷ 2 = 3). Den abgeschnittenen Rest liefert der Partner-Baustein
[Modulo](modulo.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Zahl, die geteilt wird |
| `B2` | Eingang | Byte | Der Teiler |
| `R` | Ausgang | Byte | Das ganzzahlige Ergebnis |
| `RN` | Ausgang | Bit | An bei negativem Ergebnis (hier nie) |
| `O` | Ausgang | Byte | Überlauf über 255 (beim Teilen zweier Bytes nie) |
| `ON` | Ausgang | Bit | An, wenn der Überlauf negativ zu lesen wäre |

Teilen durch 0 ergibt schlicht 0 — die Schaltung läuft ungestört weiter.

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

- **Verkleinern/Dämpfen**: Eine feste Zahl auf `B2` teilt jedes Signal
  herunter — z. B. ÷ 2, um einen Wertebereich zu halbieren.
- **Ziffern gewinnen**: `÷ 10` liefert „alles vor der Einerstelle",
  `Modulo 10` die Einerstelle selbst. Diese Zerlegung übernimmt fertig der
  [Base Converter](../converter/base-converter.md).
- **Gruppieren**: Laufende Nummern ÷ Gruppengröße ergibt die Gruppennummer
  (0, 0, 0, 1, 1, 1, 2 …) — nützlich, um z. B. alle drei Takte etwas
  weiterzuschalten.

## Siehe auch

[Modulo](modulo.md) · [Multiply](multiply.md) ·
[Base Converter](../converter/base-converter.md)
