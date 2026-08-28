# Werte und Signale

Zurück zur [Startseite](../index.md).

Durch die Leitungen einer Schaltung fließen **Werte**. Diese Seite erklärt,
welche Werte es gibt, wie du sie an den Farben erkennst und in welchem Takt
sie unterwegs sind.

## Zwei Arten von Werten

**1. Der Schalter-Wert (Bit):** an oder aus, mehr nicht. Wie ein
Lichtschalter. In der Fachsprache heißt *an* auch „true" und *aus* „false".

**2. Die Zahl (Byte):** eine ganze Zahl von **0 bis 255**. Warum genau 255?
Das erklärt die Seite [Bits und Bytes](bits-und-bytes.md).

Fast jeder Anschluss verrät in seinem Tooltip, welche Art er erwartet oder
liefert.

## Die Farben

Überall im Editor und in den Wiki-Demos gilt derselbe Farbcode:

| Farbe | Bedeutung |
| --- | --- |
| **Rot** | an (true) |
| **Weiß / Schwarz** | aus (false) |
| **Blau** | eine Zahl (Byte) |

Anschluss-Kreise, Verbindungslinien und die Wert-Kästchen der Demos färben
sich entsprechend. Zahlen werden in den Kästchen als zweistelliger
**Hex-Code** angezeigt (`00` bis `FF`) — auch das erklärt
[Bits und Bytes](bits-und-bytes.md).

Probiere es aus: Dieser Durchreich-Baustein ([Pipe](../operatoren/utility/pipes.md))
gibt seinen Eingang unverändert weiter. Stelle den Regler des Eingangs auf
verschiedene Werte und beobachte die Farben:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "pipe1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Der Takt: Ticks

Die Schaltung arbeitet in winzigen Arbeitsschritten, den **Ticks** — viele
Dutzend Mal pro Sekunde, im Idealfall 60-mal. In jedem Tick passiert zweierlei:

1. Jede Verbindung trägt den Wert von ihrem Start (Ausgang) zu ihrem
   Ziel (Eingang).
2. Jeder Baustein liest seine Eingänge und setzt seine Ausgänge neu.

Ein Wert braucht also **pro Baustein einen Tick**, um weiterzukommen. Bei
kurzen Ketten merkst du davon nichts; bei langen Ketten oder Taktschaltungen
wird dieser Rhythmus wichtig.

## Flanken: der Moment des Umschaltens

Viele Bausteine reagieren nicht darauf, *dass* ein Eingang an ist, sondern
auf den **Moment des Einschaltens** — den Wechsel von aus nach an. Dieser
Moment heißt **steigende Flanke**. (Das Ausschalten heißt entsprechend
**fallende Flanke**.)

Beispiel: Der Zähler ([Counter8](../operatoren/memory/counter8.md)) zählt
nicht ständig hoch, solange sein Eingang an ist — er zählt **einmal pro
Einschalten**. In den Beschreibungen dieses Wikis steht dann „bei steigender
Flanke". Der Baustein [Pulse](../operatoren/logic/pulse.md) macht Flanken
sichtbar und nutzbar.

## Mehrere Quellen auf einem Eingang

Du darfst mehrere Ausgänge auf denselben Eingang führen. Dann überlagern
sich die Werte wie auf einem gemeinsamen Kabel:

- Sind nur Schalter-Werte beteiligt: Der Eingang ist an, sobald
  **mindestens eine** Quelle an ist (ein ODER).
- Ist eine Zahl beteiligt, werden die Werte **bitweise ODER-verknüpft**
  (was das heißt, zeigt [Bits und Bytes](bits-und-bytes.md)).

Hier laufen zwei Leitungen auf denselben Eingang eines Durchreich-Bausteins.
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
- [Operator-Lexikon](../operatoren/index.md) — alle Bausteine im Detail
