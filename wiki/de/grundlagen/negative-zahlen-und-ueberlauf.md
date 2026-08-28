# Negative Zahlen und Überlauf

Zurück zur [Startseite](../index.md).

Durch die Leitungen in OperatorsV2 fließen nur die ganzen Zahlen **0 bis
255** — kein Komma, kein Minus davor. Warum ausgerechnet 255 die Grenze
ist, erklärt [Bits und Bytes](bits-und-bytes.md). Rechnen darfst du
trotzdem frei, und dabei landet ein Ergebnis schnell einmal außerhalb
dieser Reihe: unter 0 oder über 255. Diese Seite zeigt, was dann passiert.

## Unter null: negative Zahlen

Ziehst du von 3 die Zahl 5 ab, liegt das Ergebnis unter null. Solche Zahlen
kennst du vom Thermometer im Winter: −2 Grad steht unterhalb der Null. Man
nennt sie **negative Zahlen**, geschrieben mit einem Minus davor.

Eine solche Zahl passt nicht in eine Leitung. Der Baustein macht deshalb
zweierlei:

- Er gibt das Ergebnis **ohne das Minus davor** aus, hier also 2. Diese
  Zahl heißt der **absolute Wert**. Sie sagt nur noch, **wie weit** das
  Ergebnis von der Null entfernt ist, aber nicht mehr, auf welcher Seite.
- Er meldet über einen eigenen Ausgang, dass es unter null ging. Beim
  [Subtract](../operatoren/math/subtract.md) heißt dieser Ausgang `RN`.

Die Angabe geht also nicht verloren, sie steckt nur in zwei Anschlüssen
statt in einem. Und weil `RN` genau dann angeht, wenn die zweite Zahl
größer war als die erste, kannst du damit zwei Zahlen vergleichen.

## Über 255 hinaus: der Überlauf

Zählst du 200 und 100 zusammen, kommt 300 heraus — mehr, als eine Leitung
tragen kann. Stell dir einen Becher vor, der voll ist: Was noch dazukommt,
läuft in einen zweiten Becher daneben. Genau so arbeitet der
[Add](../operatoren/math/add.md). Das Zuviel nennt man **Überlauf**.

Der Ausgang `R` zeigt, was im ersten Becher bleibt, der Ausgang `O` zählt,
wie oft übergelaufen ist. Bei 200 + 100 steht deshalb `O` auf 1 und `R` auf
45.

Zählende Bausteine machen es anders: Sie kippen nichts in einen zweiten
Becher, sondern fangen wieder bei 0 an — wie der Kilometerzähler eines
Autos, der nach der höchsten Zahl auf null springt und weiterzählt. Der
[Counter8](../operatoren/memory/counter8.md) meldet auch das über einen
eigenen Ausgang.

## Der Übertrag: weiterrechnen mit dem Überlauf

Beim schriftlichen Rechnen schreibst du eine kleine Merkzahl unter die
nächste Stelle und rechnest sie dort mit. Diese Merkzahl nennt man
**Übertrag** — und der Überlauf-Ausgang `O` ist genau das.

Führst du `O` in einen zweiten Add-Baustein, rechnet der die Merkzahl
weiter. Auf diese Weise entstehen Rechenwerke, die weit über 255 hinaus
zählen, obwohl jede einzelne Leitung bei 255 endet.

## Ausprobieren

Subtract rechnet `B1 − B2`. Stelle `B1` auf 3 und `B2` auf 5: Das Ergebnis
läge unter null, deshalb zeigt `R` den absoluten Wert 2, und `RN` geht an.
Drehe es um — `B1` auf 5 und `B2` auf 3 — und `R` zeigt wieder 2, aber `RN`
bleibt aus:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Subtract", "_id": "sub1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Weiterlesen

- [Bits und Bytes](bits-und-bytes.md) — warum bei 0 und 255 Schluss ist
- [Subtract](../operatoren/math/subtract.md) — der Baustein aus der Demo
- [Add](../operatoren/math/add.md) — Überlauf und Übertrag beim
  Zusammenzählen
- [Counter8](../operatoren/memory/counter8.md) — das Zählwerk, das bei 255
  wieder von vorn beginnt
