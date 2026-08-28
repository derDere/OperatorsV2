# Byte to 4bit decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Der kleine **Zerleger**: Er nimmt eine Zahl und legt ihre **unteren vier
Bits** auf einzelne Leitungen — „untere" heißt: die vier mit den kleinen
Werten 1, 2, 4 und 8. Die vier großen (16, 32, 64, 128) ignoriert er.
Er sieht also nur den Anteil von 0 bis 15.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Die Zahl, die zerlegt wird |
| `B0` | Ausgang | Bit | An, wenn in der Zahl eine 1 steckt |
| `B1` | Ausgang | Bit | An, wenn in der Zahl eine 2 steckt |
| `B2` | Ausgang | Bit | An, wenn in der Zahl eine 4 steckt |
| `B3` | Ausgang | Bit | An, wenn in der Zahl eine 8 steckt |

## Ausprobieren

Stelle links eine Zahl von 0 bis 15 ein und sieh, welche Bits angehen —
z. B. 9 = 8 + 1, also gehen `B3` und `B0` an:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 4bit decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Ziffernanzeigen füttern**: Eine Ziffer (0–15) in vier Bits zerlegen
  und dem [4bit to 7 Segment decoder](4bit-zu-7segment.md) übergeben —
  der Standardweg zu einer sichtbaren Ziffer. So arbeitet auch das
  Uhren-Beispiel *clock* im 📚-Examples-Menü des Editors.
- **Einzelne Bits abfragen**: `B0` verrät dir z. B., ob eine Zahl gerade
  oder ungerade ist — bei ungeraden Zahlen ist er an.
- **Vier Melde-Leuchten**: Eine Zahl von 0 bis 15 wird zu vier einzelnen
  Signalen für Lampen oder Logik-Bausteine.

## Siehe auch

[Byte to 8bit decoder](byte-zu-8bit.md) ·
[4bit to byte decoder](4bit-zu-byte.md) ·
[4bit to 7 Segment decoder](4bit-zu-7segment.md)
