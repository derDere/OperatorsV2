# Bits und Bytes

Zurück zur [Startseite](../index.md).

Ein Computer besteht im Innersten aus lauter winzigen Schaltern. Jeder
einzelne von ihnen kann nur zweierlei: **an** oder **aus**. Wie kommt man
davon zu Zahlen, Buchstaben und ganzen Programmen? Mit einem einfachen
Trick, den du auf dieser Seite kennenlernst — und gleich hier ausprobieren
kannst.

## Das Bit: ein einzelner Schalter

Ein **Bit** ist das Kleinste, was ein Computer festhalten kann: ein
einzelner Schalter, der an oder aus ist. Mit einem Bit lassen sich genau
zwei Dinge auseinanderhalten — ja oder nein, hell oder dunkel, 1 oder 0.
Für eine Zahl wie 36 reicht ein Schalter also nicht. Dafür braucht es
mehrere.

## Das Byte: acht Schalter nebeneinander

Nimmt man **acht Bits** zusammen, entsteht ein **Byte**. Damit diese
Achtergruppe Zahlen darstellen kann, gibt es eine Abmachung: **Jeder
Schalter bekommt einen festen Zahlenwert.**

Der erste Schalter ist 1 wert. Der nächste ist doppelt so viel wert, also
2. Der übernächste wieder doppelt so viel, also 4. So geht es weiter, immer
verdoppeln:

1 → 2 → 4 → 8 → 16 → 32 → 64 → 128

Das sind acht Zahlen, für jeden Schalter eine. Welche Zahl ein Byte gerade
darstellt, findest du so heraus: Zähle die Werte aller Schalter zusammen,
die **an** sind. Die ausgeschalteten zählen nicht mit.

Durchnummeriert werden die Schalter von rechts nach links, angefangen bei
null:

| Schalter | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Wert | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Rechnen wir ein Muster vor: Bit 5 und Bit 2 sind an, alle anderen sind aus.
Bit 5 ist 32 wert, Bit 2 ist 4 wert — zusammen 32 + 4 = **36**. Dieses Byte
steht also für die Zahl 36.

Weitere Beispiele:

- Nur Bit 0 an → **1**
- Bit 1 und Bit 0 an → 2 + 1 = **3**
- Bit 4, Bit 3 und Bit 1 an → 16 + 8 + 2 = **26**
- Alle acht an → 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = **255**

Die letzte Zeile beantwortet eine Frage, die im ganzen Wiki auftaucht:
**Warum ist bei 255 Schluss?** Weil mehr nicht zusammenkommt. Sind alle
acht Schalter an, sind alle acht Werte aufgezählt — einen neunten Schalter
gibt es nicht. Nach unten ist bei **0** Schluss: alle Schalter aus. Ein
Byte deckt also genau die Zahlen 0 bis 255 ab — genau die Zahlen, die in
OperatorsV2 durch die Leitungen fließen. Was mit einer Rechnung geschieht,
die über diese Grenze hinausläuft oder unter null fiele, zeigt
[Negative Zahlen und Überlauf](negative-zahlen-und-ueberlauf.md).

Das Zählen mit lauter An-und-aus-Schaltern hat übrigens einen eigenen
Namen: Man nennt es **binär**, weil es pro Schalter nur zwei Möglichkeiten
gibt.

Probiere es aus: Dieser Baustein baut aus acht einzelnen Bits ein Byte
zusammen. Schalte zum Beispiel Bit 5 und Bit 2 an — rechts erscheint die
36, angezeigt als `24`. Was diese Schreibweise bedeutet, klärt der nächste
Abschnitt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "8bit to byte decoder", "_id": "dec1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Der Hex-Code: Zahlen in Kurzschrift

Rechts in der Demo ist dir sicher aufgefallen: Die Zahl steht in einem
**blauen Kästchen mit zwei Zeichen**, etwa `24` für 36. Das ist eine
Kurzschreibweise für Bytes. Sie heißt **Hexadezimal-Schreibweise**, kurz
**Hex**.

Beim gewohnten Zählen hast du zehn Ziffern zur Verfügung: 0, 1, 2 und so
weiter bis 9. Ist die 9 aufgebraucht, fängst du eine zweite Stelle an und
schreibst 10. Diese Art zu zählen heißt **dezimal**. Hex funktioniert
genauso, hat aber **sechzehn** Ziffern: Nach der 9 geht es mit Buchstaben
weiter.

| Hex-Ziffer | 0…9 | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bedeutung | 0…9 | 10 | 11 | 12 | 13 | 14 | 15 |

Bei einer zweistelligen Zahl wie 36 zählt die linke Stelle immer zehn: drei
Zehner und sechs Einer. Bei einem zweistelligen Hex-Code zählt die linke
Stelle **sechzehn**:

- `24` heißt: zweimal 16 plus 4 — macht **36**
- `1E` heißt: einmal 16 plus 14 (das ist das `E`) — macht **30**
- `FF` heißt: fünfzehnmal 16 plus 15 — macht **255**

Warum diese Mühe? Weil eine Hex-Ziffer genau **vier Schalter** abdeckt: Mit
vier Schaltern (Werte 8, 4, 2 und 1) kommst du auf die Zahlen 0 bis 15 —
und genau so viele Ziffern hat Hex. Die linke Ziffer zeigt deshalb die
oberen vier Schalter eines Bytes, die rechte die unteren vier. Hex ist also
ein direktes Fenster auf die Bits. Aus diesem Grund zeigen die blauen
Wert-Kästchen im Wiki und viele Anzeigen im Editor Bytes als Hex-Code.

## Die Gegenrichtung: ein Byte in Bits zerlegen

Natürlich geht es auch andersherum: Aus einer Zahl lassen sich die acht
Schalter zurückgewinnen. Stelle links mit dem Schieberegler eine Zahl ein
und sieh rechts, welche Bits dafür an sind:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Byte to 8bit decoder", "_id": "dec2", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

Stelle zum Beispiel 5 ein: Bit 0 (Wert 1) und Bit 2 (Wert 4) gehen an —
denn 1 + 4 = 5.

## Und Buchstaben?

Auch Text ist nur eine Abmachung: Jedem Zeichen wird eine Zahl zugeteilt.
Damit alle Geräte dasselbe darunter verstehen, braucht es eine Liste, an
die sich alle halten. Die verbreitetste heißt **ASCII**. In ihr steht 65
für `A`, 66 für `B`, 97 für `a` und 48 für die Ziffer `0`. Ein Byte pro
Zeichen — so speichern die Text-Bausteine
([Text Input](../operatoren/user-input/text-input.md),
[Terminal Display](../operatoren/display/terminal-display.md)) ihre Inhalte.

## Weiterlesen

- [Werte und Signale](werte-und-signale.md) — Farben, Ticks und Flanken
- [Negative Zahlen und Überlauf](negative-zahlen-und-ueberlauf.md) — was
  ober- und unterhalb der Zahlenreihe passiert
- [4bit to byte decoder](../operatoren/converter/4bit-zu-byte.md) und
  Verwandte — die Bausteine zum Zerlegen und Zusammensetzen
- [Base Converter](../operatoren/converter/base-converter.md) — eine Zahl
  in ihre einzelnen Ziffern zerlegen (für Ziffernanzeigen)
