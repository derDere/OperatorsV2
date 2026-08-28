# Werte und Signale

Zurück zur [Startseite](../index.md).

Eine Linie zwischen zwei Bausteinen ist wie ein Kabel: Sie trägt etwas vom
einen zum anderen. Dieses Etwas heißt **Wert**. Mal ist es nur ein „an"
oder „aus" wie bei einem Lichtschalter, mal eine Zahl wie die Anzeige auf
einer Waage. Diese Seite zeigt dir, welche Werte es gibt, wie du sie an
ihrer Farbe erkennst und in welchem Rhythmus sie unterwegs sind.

## Zwei Arten von Werten

**1. Der Schalter-Wert (Bit):** an oder aus, mehr nicht — wie ein
Lichtschalter, der nur oben oder unten steht und nichts dazwischen kennt.
In der Fachsprache heißt *an* auch „true" (englisch für „wahr") und *aus*
„false" („falsch").

**2. Die Zahl (Byte):** eine ganze Zahl von **0 bis 255** — also 0, 1, 2
und so weiter bis 255, ohne Komma und ohne Minus davor. Warum die Reihe
ausgerechnet bei 255 endet, erklärt die Seite
[Bits und Bytes](bits-und-bytes.md). Was geschieht, wenn eine Rechnung
über 255 hinausläuft oder unter null fiele, steht unter
[Negative Zahlen und Überlauf](negative-zahlen-und-ueberlauf.md).

Fast jeder Anschluss verrät, welche Art er erwartet oder liefert: Halte die
Maus darüber, dann erscheint ein kleines Hinweis-Fenster (Tooltip).

## Die Farben

Überall im Editor und in den Wiki-Demos gilt derselbe Farbcode:

| Farbe | Bedeutung |
| --- | --- |
| **Rot** | an (true) |
| **Weiß / Schwarz** | aus (false) |
| **Blau** | eine Zahl (Byte) |

Anschluss-Kreise, Verbindungslinien und die Wert-Kästchen der Demos färben
sich entsprechend. Zahlen stehen in den Kästchen als zwei Zeichen, etwa
`00`, `24` oder `FF`. Das ist eine Kurzschreibweise für Zahlen, der
**Hex-Code** — auch den erklärt [Bits und Bytes](bits-und-bytes.md).

Probiere es aus: Der Baustein [Pipe](../operatoren/utility/pipes.md) reicht
weiter, was bei ihm ankommt, ohne es zu verändern. Stelle den Regler des
Eingangs auf verschiedene Werte und beobachte die Farben:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "pipe1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Der Takt: Ticks

Die Schaltung arbeitet nicht in einem Rutsch, sondern in winzigen
Arbeitsschritten — im Idealfall 60-mal pro Sekunde. So ein Arbeitsschritt
heißt **Tick**. In jedem Tick passiert zweierlei:

1. Jede Verbindung trägt den Wert von ihrem Start (einem Ausgang) zu ihrem
   Ziel (einem Eingang).
2. Jeder Baustein liest seine Eingänge und setzt seine Ausgänge neu.

Ein Wert kommt also **pro Tick um einen Baustein weiter**. Bei kurzen
Ketten merkst du davon nichts. Bei langen Ketten und bei Schaltungen, die
einem festen Takt folgen, wird dieser Rhythmus wichtig.

## Flanken: der Moment des Umschaltens

Bei einer Türklingel zählt der Moment, in dem du drückst — nicht, wie lange
dein Finger auf dem Knopf liegen bleibt. Vielen Bausteinen geht es genauso.
Sie achten nicht darauf, *dass* ein Eingang an ist, sondern auf den
**Wechsel von aus nach an**. Diesen Moment des Einschaltens nennt man
**steigende Flanke**; den umgekehrten Moment, das Ausschalten, nennt man
**fallende Flanke**.

Beispiel: Der Zähler ([Counter8](../operatoren/memory/counter8.md)) zählt
nicht ständig hoch, solange sein Eingang an ist — er zählt **einmal pro
Einschalten**. In den Beschreibungen dieses Wikis steht dann „bei steigender
Flanke". Der Baustein [Pulse](../operatoren/logic/pulse.md) macht solche
Momente sichtbar und nutzbar; ausführlich behandelt sie
[Flanken und Takt](flanken-und-takt.md).

## Mehrere Quellen auf einem Eingang

Du darfst mehrere Ausgänge auf denselben Eingang führen. Dann überlagern
sich die Werte wie auf einem gemeinsamen Kabel:

- Sind nur Schalter-Werte beteiligt, ist der Eingang an, sobald
  **mindestens eine** Quelle an ist — wie eine Alarmanlage, die schon
  losgeht, wenn eine einzige Tür offen steht. Diese Regel heißt **ODER**.
- Ist eine Zahl beteiligt, gilt dieselbe ODER-Regel für jeden der acht
  Schalter einzeln, aus denen eine Zahl zusammengesetzt ist. Das nennt man
  **bitweise**; was dahintersteckt, zeigt
  [Bits und Bytes](bits-und-bytes.md).

Hier laufen zwei Leitungen auf denselben Eingang eines Pipe-Bausteins.
Schalte mal die eine, mal die andere, mal beide Quellen an — oder gib zwei
Zahlen hinein:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "quelleA", "_x": -140, "_y": -40 },
		{ "_#new": "Pipe 1", "_id": "quelleB", "_x": -140, "_y": 40 },
		{ "_#new": "Pipe 1", "_id": "sammel", "_x": 60, "_y": 0 }
	],
	"conAll": [
		{ "s": "quelleA_out_OUT0", "e": "sammel_in_IN0" },
		{ "s": "quelleB_out_OUT0", "e": "sammel_in_IN0" }
	]
}
```

(Die beiden Kästchen links sind die zwei Quellen, das Kästchen rechts zeigt
das Ergebnis auf dem gemeinsamen Eingang.)

## Weiterlesen

- [Bits und Bytes](bits-und-bytes.md) — warum 255, und was Hex-Codes bedeuten
- [Flanken und Takt](flanken-und-takt.md) — Ticks, Takt, Flanken und Impulse
- [Operator-Lexikon](../operatoren/index.md) — alle Bausteine im Detail
