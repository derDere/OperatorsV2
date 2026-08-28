# Vector Subtract

[Operator-Lexikon](../index.md) · Kategorie: **Vector**

Ein Paar aus zwei Zahlen — Schritte zur Seite und Schritte nach unten —
beschreibt einen Weg; so ein Paar nennt man einen **Vektor**
(ausführlich unter [Vektoren](../../grundlagen/vektoren.md)).

Vector Subtract bekommt zwei Punkte, A und B, und gibt den Weg von B
nach A aus. Dafür zieht er die Zahlen von B einzeln von den Zahlen von A
ab. Ein Beispiel: A steht bei 9 nach rechts und 7 nach unten, B bei 4
nach rechts und 2 nach unten — von B aus sind es also noch 5 nach rechts
und 5 nach unten.

Wird mehr abgezogen, als da ist, läge das Ergebnis unter null — es wäre
eine **negative Zahl**. Durch die Leitungen hier fließen aber nur die
Zahlen 0 bis 255, deshalb fängt die Zahl am oberen Ende wieder an: Aus 2
minus 5 wird 253. Das nennt man einen **Überlauf** (siehe
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md)).
Auf der Fläche heißt das: Wer links hinausläuft, kommt rechts wieder
herein.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `AX` / `AY` | Eingang | Byte | Punkt A — dorthin soll der Weg führen |
| `BX` / `BY` | Eingang | Byte | Punkt B — dort beginnt der Weg; B wird abgezogen |
| `CX` / `CY` | Ausgang | Byte | Der Weg von B nach A: A minus B, jede Zahl für sich |

## Ausprobieren

Stelle zwei Punkte ein — heraus kommt der Weg, der von B nach A führt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Vector Subtract", "_id": "vsub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Die Richtung zum Ziel finden**: Ziel minus eigener Ort ergibt den Weg
  zum Ziel. Das ist die Grundlage für alles, was jemandem folgen soll —
  ein Wächter, der hinter dir herläuft, oder ein Zeiger, der immer auf
  einen Punkt deutet.
- **Von der Mitte aus rechnen**: Manche Figuren sind von ihrer Mitte aus
  beschrieben („von der Mitte 3 nach rechts, 2 nach unten"). Mit Vector
  Subtract ziehst du die Mitte ab und erfährst, wo ein Punkt im Verhältnis
  zu ihr liegt; mit [Vector Add](vector-add.md) rechnest du ihn wieder auf
  die Fläche zurück. Dieses Hin und Her braucht man zum Beispiel beim
  Drehen von Figuren (siehe [Vector Rotate](vector-rotate.md)).
- **Wie weit ist es noch?**: Das Ergebnis sagt dir getrennt, wie weit die
  beiden Punkte zur Seite auseinanderliegen und wie weit nach unten.
  Möchtest du bei einer einzelnen Zahl auch wissen, nach welcher Seite es
  geht, nimm dafür [Subtract](../math/subtract.md): Der schaltet seinen
  Ausgang `RN` an, wenn die abgezogene Zahl die größere war.

## Siehe auch

[Vector Add](vector-add.md) · [Subtract](../math/subtract.md) ·
[Line Display](../display/line-display.md)
