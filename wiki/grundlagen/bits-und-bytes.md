# Bits und Bytes

Zurück zur [Startseite](../index.md).

Computer kennen im Innersten nur zwei Zustände: **an** und **aus**. Wie
daraus Zahlen, Buchstaben und ganze Programme werden, verstehst du auf
dieser Seite — und kannst es direkt ausprobieren.

## Das Bit: ein einzelner Schalter

Ein **Bit** ist die kleinste Informationseinheit: ein Schalter, der an oder
aus ist. Mit einem Bit kannst du genau zwei Dinge unterscheiden: ja/nein,
hell/dunkel, 1/0.

## Das Byte: acht Schalter nebeneinander

Nimmt man **acht Bits** zusammen, entsteht ein **Byte**. Jede Kombination
der acht Schalter steht für eine andere Zahl. Der Trick: Jeder Schalter hat
einen festen **Zahlenwert**, und die Werte der eingeschalteten Schalter
werden einfach addiert.

| Schalter | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Wert | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Beispiele:

- Nur Bit 0 an → **1**
- Bit 1 und Bit 0 an → 2 + 1 = **3**
- Bit 5 und Bit 2 an → 32 + 4 = **36**
- Alle acht an → 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = **255**

Deshalb reicht ein Byte von **0** (alles aus) bis **255** (alles an) —
genau die Zahlen, die in OperatorsV2 durch die Leitungen fließen.

Probiere es aus: Dieser Baustein baut aus acht einzelnen Bits ein Byte
zusammen. Schalte Bits an und beobachte die Zahl rechts:

```operatorsv2
{
	"opAll": [
		{ "_#new": "8bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Der Hex-Code: Zahlen in Kurzschrift

Rechts in der Demo ist dir sicher aufgefallen: Die Zahl wird als **blaues
Kästchen mit zwei Zeichen** angezeigt, etwa `24` für 36. Das ist die
**Hexadezimal-Schreibweise** (kurz „Hex") — die übliche Kurzschrift für
Bytes.

Beim normalen Zählen (dezimal) gibt es zehn Ziffern (0–9). Hex benutzt
**sechzehn**: nach der 9 geht es mit Buchstaben weiter.

| Hex-Ziffer | 0…9 | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bedeutung | 0…9 | 10 | 11 | 12 | 13 | 14 | 15 |

Ein zweistelliger Hex-Code funktioniert wie unser Zehnersystem, nur dass die
linke Stelle **16** zählt statt 10:

- `24` heißt: 2 × 16 + 4 = **36**
- `1E` heißt: 1 × 16 + 14 = **30**
- `FF` heißt: 15 × 16 + 15 = **255**

Warum diese Mühe? Weil eine Hex-Ziffer genau **vier Bits** abdeckt. Die
linke Ziffer zeigt die oberen vier Schalter, die rechte die unteren vier —
Hex ist also ein direktes Fenster auf die Bits. Deshalb zeigen die blauen
Wert-Kästchen im Wiki und viele Anzeigen im Editor Bytes als Hex-Code.

## Die Gegenrichtung: ein Byte in Bits zerlegen

Natürlich geht es auch andersherum. Stelle links mit dem Regler eine Zahl
ein und sieh rechts, welche Schalter dafür an sind:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 8bit decoder", "_id": "dec2", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

Stelle zum Beispiel 5 ein: Bit 0 (Wert 1) und Bit 2 (Wert 4) gehen an.

## Und Buchstaben?

Auch Text ist nur eine Abmachung: Jedem Zeichen ist eine Zahl zugeordnet.
Nach der verbreiteten **ASCII**-Tabelle steht 65 für `A`, 66 für `B`,
97 für `a`, 48 für die Ziffer `0`. Ein Byte pro Zeichen — so speichern die
Text-Bausteine ([Text Input](../operatoren/user-input/text-input.md),
[Terminal Display](../operatoren/display/terminal-display.md)) ihre Inhalte.

## Weiterlesen

- [Werte und Signale](werte-und-signale.md) — Farben, Ticks und Flanken
- [4bit to byte decoder](../operatoren/converter/4bit-zu-byte.md) und
  Verwandte — die Bausteine zum Zerlegen und Zusammensetzen
- [Base Converter](../operatoren/converter/base-converter.md) — Bytes in
  Dezimalstellen zerlegen (für Anzeigen)
