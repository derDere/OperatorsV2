# 4bit to byte decoder

[Operator-Lexikon](../index.md) · Kategorie: **Converter**

Dieser Baustein ist der **Sammler**: Er nimmt vier einzelne Bit-Leitungen
und baut daraus eine Zahl von 0 bis 15. Jede Leitung zählt dabei eine
feste Zahl — die erste 1, und danach immer das Doppelte: 2, 4, 8. Alles,
was an ist, wird zusammengezählt. Warum das so gut funktioniert, erklärt
[Bits und Bytes](../../grundlagen/bits-und-bytes.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B0` | Eingang | Bit | Zählt 1 |
| `B1` | Eingang | Bit | Zählt 2 |
| `B2` | Eingang | Bit | Zählt 4 |
| `B3` | Eingang | Bit | Zählt 8 |
| `B` | Ausgang | Byte | Alle eingeschalteten Werte zusammengezählt (0–15) |

## Ausprobieren

Schalte ein paar Eingänge an — z. B. `B0` und `B2`: das macht 1 + 4 = 5:

```operatorsv2
{
	"opAll": [
		{ "_#new": "4bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Schalterbank → Zahl**: Vier Schalter ergeben zusammen eine Zahl von
  0 bis 15, die du bequem einstellen kannst — zum Beispiel als Wunschzahl
  für einen Vergleich oder ein Ratespiel.
- **Counter4 anschließen**: Die Bit-Ausgänge des
  [Counter4](../memory/counter4.md) werden hier wieder zur Zahl — z. B.
  um sie per [Equals](../math/equals.md) mit einer Wunschzahl zu
  vergleichen.
- **Halbes Byte (Nibble)**: Vier Bits sind ein halbes Byte — das nennt
  man **Nibble**. Der Editor schreibt Byte-Werte mit zwei Zeichen im
  **Hex-Code** (16 Ziffern: 0–9 und A–F), und jedes dieser Zeichen steht
  für vier Bits. Dieser Baustein baut die rechte Hälfte davon; für alle
  acht Bits gibt es den [8bit to byte decoder](8bit-zu-byte.md).

## Siehe auch

[8bit to byte decoder](8bit-zu-byte.md) ·
[Byte to 4bit decoder](byte-zu-4bit.md) ·
[Bits und Bytes](../../grundlagen/bits-und-bytes.md)
