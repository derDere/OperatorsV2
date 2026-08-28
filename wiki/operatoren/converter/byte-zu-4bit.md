# Byte to 4bit decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der kleine **Zerleger**: Er nimmt eine Zahl und legt ihre **unteren vier
Bits** (die Werte 1, 2, 4 und 8) auf einzelne Leitungen. Die oberen vier
Bits ignoriert er — er sieht also nur den Anteil 0–15.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, die zerlegt wird |
| `B0` | Ausgang | Bit | An, wenn der 1er-Anteil steckt |
| `B1` | Ausgang | Bit | An, wenn der 2er-Anteil steckt |
| `B2` | Ausgang | Bit | An, wenn der 4er-Anteil steckt |
| `B3` | Ausgang | Bit | An, wenn der 8er-Anteil steckt |

## Ausprobieren

Stelle links eine Zahl von 0 bis 15 ein und sieh, welche Bits angehen —
z. B. 9 = 8 + 1:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 4bit decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Ziffernanzeigen füttern**: Eine Ziffer (0–15) in vier Bits zerlegen und
  dem [4bit to 7 Segment decoder](4bit-zu-7segment.md) übergeben — der
  Standardweg zu einer sichtbaren Ziffer. So arbeitet auch das
  Uhren-Beispiel *clock* im 📚-Examples-Menü des Editors.
- **Einzelne Bits abfragen**: `B0` ist z. B. der fertige
  Gerade/Ungerade-Melder einer Zahl.
- **Vier Melde-Leuchten**: Ein kompakter Zustandswert 0–15 wird zu vier
  einzelnen Signalen für Lampen oder Logik.

## Siehe auch

[Byte to 8bit decoder](byte-zu-8bit.md) ·
[4bit to byte decoder](4bit-zu-byte.md) ·
[4bit to 7 Segment decoder](4bit-zu-7segment.md)
