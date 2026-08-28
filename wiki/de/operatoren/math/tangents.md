# Tangents

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Tangents beantwortet eine einzige Frage: **Wie steil ist es?** Stell dir
eine Rampe vor: Gehst du ein Stück nach vorn, geht es dabei auch ein Stück
nach oben. Wie viel nach oben auf wie viel nach vorn — das ist die
**Steigung**. Am Eingang `B1` gibst du die Schräglage als Stelle auf der
Runde an (genau wie beim [Sinus](sinus.md): 0 ist der Start, 255 ein voller
Umlauf), am Ausgang `T` kommt die Steigung heraus. Der Fachname für den
Zusammenhang zwischen Schräglage und Steigung ist **Tangens** — daher der
Name des Bausteins.

Dabei gibt es eine Tücke: Je näher die Linie am Senkrechten steht, desto
weiter schießt die Steigung in die Höhe. Es geht kaum noch nach vorn, aber
sehr weit nach oben, und die Zahl wird riesig — in ein Byte passt so etwas
nicht. Der Baustein teilt deshalb immer den kleineren der beiden Wege durch
den größeren, dann bleibt das Ergebnis zwischen 0 und 255. Ob er die
Rechnung dazu herumdrehen musste, meldet er über den Ausgang `CO`. Der
herumgedrehte Wert hat einen eigenen Namen: **Kotangens**.

So liest du `T`: 0 heißt „gar keine Schräge" — die Linie liegt flach oder
steht senkrecht. Werte nahe 255 heißen „genau in der Mitte zwischen beidem"
(45°, also schräg von einer Ecke eines Quadrats zur gegenüberliegenden).
Welches der beiden Enden gerade gemeint ist, verrät dir `CO`: aus, wenn die
Linie eher flach liegt, an, wenn sie eher steil steht.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Schräglage als Stelle auf der Runde: 0 = Start, 255 = einmal rundherum |
| `T` | Ausgang | Byte | Wie steil es ist: 0 = flach oder senkrecht, höchstens 253 = genau dazwischen |
| `CO` | Ausgang | Bit | Aus, solange die Linie eher flach liegt; an, sobald sie eher steil steht (das ist dann der Kotangens) |
| `TN` | Ausgang | Bit | An, wenn die Linie andersherum kippt: Sie fällt dort, wo sie sonst steigt |

## Ausprobieren

Die Achtel-Runde (45°) liegt rechnerisch bei 31,875, also zwischen 31 und
32 — dort schaltet `CO` um. Bei 32 ist `CO` bereits an, und `T` zeigt mit
253 seinen höchsten Wert. Drehe darunter: Die Linie wird flacher, `T` sinkt
Richtung 0. Drehe darüber: Die Linie richtet sich auf, und `T` sinkt wieder
Richtung 0:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Tangents", "_id": "tan1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Rampen und Schrägen**: Aus einer Schräglage wird eine Zahl, mit der du
  rechnen kannst — etwa um auf dem
  [Line Display](../display/line-display.md) Linien mit einer bestimmten
  Schräge zu ziehen.
- Für Wellen und Kreisbewegungen sind [Sinus](sinus.md) und
  [Cosinus](cosinus.md) die handlicheren Werkzeuge — Tangents ist der
  Fachmann für „wie steil?".

## Siehe auch

[Sinus](sinus.md) · [Cosinus](cosinus.md) ·
[Vektoren](../../grundlagen/vektoren.md)
