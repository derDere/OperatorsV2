# Vector Modulo

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein Paar aus zwei Zahlen — Schritte zur Seite und Schritte nach unten —
beschreibt einen Weg; so ein Paar nennt man einen **Vektor**
(ausführlich unter [Vektoren](../../grundlagen/vektoren.md)).

Vector Modulo rechnet den Rest beim Teilen aus, und zwar für beide
Zahlen getrennt: `CX` ist der Rest von `AX` geteilt durch `BX`, `CY` der
Rest von `AY` geteilt durch `BY`.

Das Praktische daran: Ein Rest kann nie so groß werden wie die Zahl, durch
die geteilt wird. Teilst du immer durch 50, kommen nur Zahlen von 0 bis 49
heraus — bei 50 springt das Ergebnis zurück auf 0, bei 51 auf 1, und so
geht es im Kreis weiter. Damit bleibt ein Punkt immer innerhalb eines
Feldes, egal wie weit er läuft. Der einfache
[Modulo](../math/modulo.md) macht das für eine einzelne Zahl; dieser
Baustein erledigt beide auf einmal.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Die beiden Zahlen, die geteilt werden |
| `BX` / `BY` | Eingang | Byte | Wodurch geteilt wird, je Zahl einzeln (bei 0 kommt 0 heraus) |
| `CX` / `CY` | Ausgang | Byte | Was übrig bleibt: der Rest je Zahl |

## Ausprobieren

Stelle `BX` und `BY` zum Beispiel auf 50 und drehe A langsam hoch — das
Ergebnis bleibt immer unter 50 und springt bei 50 zurück auf 0:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Modulo", "_id": "vmod1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Punkte im Spielfeld halten**: Nimm einen Ort, der immer weiter wächst,
  und teile ihn durch die Größe des Spielfelds — wer rechts hinausläuft,
  kommt links wieder herein. So machen es viele alte Spielhallen-Spiele:
  Das Raumschiff verschwindet am rechten Rand und taucht am linken wieder
  auf.
- **Muster und Kacheln**: Stell dir die Fläche wie einen gefliesten Boden
  vor — lauter gleich große Kacheln nebeneinander. Der Ort geteilt durch
  die Kachelgröße verrät, an welcher Stelle innerhalb einer Kachel du
  gerade bist. Das ist die Grundlage für Muster, die sich auf dem
  [Line Display](../display/line-display.md) immer wiederholen.
- **Zwei auf einen Streich**: Für die Seitwärts- und die
  Nach-unten-Zahl einzeln bräuchtest du zwei
  [Modulo](../math/modulo.md)-Bausteine — dieser eine erledigt beide.

## Siehe auch

[Modulo](../math/modulo.md) · [Vector Add](vector-add.md) ·
[Line Display](../display/line-display.md)
