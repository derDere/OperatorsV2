# Counter8

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Counter8 ist das **Zählwerk**: Er merkt sich eine Zahl von 0 bis 255 und
zählt auf Kommando hoch oder runter — wie ein Kilometerzähler mit Plus-
und Minus-Knopf. Der Stand steht groß auf dem Baustein und liegt als Byte
am Ausgang an.

„Auf Kommando" heißt: gezählt wird nur in dem Moment, in dem ein
Zähl-Eingang von aus auf an springt. Diesen Sprung nennt man **steigende
Flanke** ([Flanken und Takt](../../grundlagen/flanken-und-takt.md));
bleibt der Eingang an, passiert danach nichts weiter.

Ein Kilometerzähler springt nach seiner höchsten Zahl wieder auf 0 — genau
das macht Counter8 hinter der 255. Diesen Sprung nennt man **Überlauf**,
gemeldet über `O`. Unter 0 geht es andersherum: Der Stand springt auf
255, das ist der **Unterlauf**, gemeldet über `U`. Mehr dazu in
[Negative Zahlen und Überlauf](../../grundlagen/negative-zahlen-und-ueberlauf.md).

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `I` | Eingang | Bit | Zählt bei steigender Flanke eins hoch (+1) |
| `D` | Eingang | Bit | Zählt bei steigender Flanke eins runter (−1) |
| `R` | Eingang | Bit | Reset: hält den Stand auf 0, solange dieser Eingang an ist |
| `B` | Eingang | Byte | Die Zahl, die beim Laden übernommen wird |
| `L` | Eingang | Bit | Übernimmt bei steigender Flanke die Zahl von `B` als neuen Stand |
| `U` | Ausgang | Bit | Blitzt einmal an, wenn unter 0 gezählt wurde (Unterlauf, Stand springt auf 255) |
| `B` | Ausgang | Byte | Der aktuelle Zählerstand |
| `O` | Ausgang | Bit | Blitzt einmal an, wenn über 255 gezählt wurde (Überlauf, Stand springt auf 0) |

## Ausprobieren

Schalte `I` an, aus, an, aus … — jeder Einschalt-Moment zählt eins hoch
(`D` entsprechend eins runter). Mit `B` und `L` legst du einen Startwert
fest, `R` setzt den Stand auf 0 zurück:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Counter8", "_id": "cnt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Automatisch zählen

Meistens zählt kein Mensch von Hand, sondern ein gleichmäßiger Rhythmus
zählt mit — den nennt man **Takt**, und genau den liefert eine
[Clock](../signal/clock.md): Sie schaltet ihren Ausgang von allein immer
wieder an und aus, wie ein Metronom. Hier hängt eine Clock am
Zähleingang. Stelle das Intervall (oberes Kästchen) auf 30 und schalte
Power an — der Stand läuft von allein hoch:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Clock", "_id": "clock1", "_x": -180, "_y": 0 },
		{ "_#new": "Counter8", "_id": "cnt2", "_x": 20, "_y": 0 },
		{ "_#new": "Value", "_id": "zero", "_x": -180, "_y": 120 }
	],
	"conAll": [
		{ "s": "clock1_out_C", "e": "cnt2_in_I" },
		{ "s": "zero_out_V", "e": "cnt2_in_D" },
		{ "s": "zero_out_V", "e": "cnt2_in_R" },
		{ "s": "zero_out_V", "e": "cnt2_in_B" },
		{ "s": "zero_out_V", "e": "cnt2_in_L" }
	]
}
```

(Der Value-Baustein hält die nicht benutzten Zähler-Eingänge auf 0,
damit sie ruhig bleiben.)

## Einsatzideen

- **Ereignisse zählen**: Klicks, Blinksignale, Runden — alles, was einen
  Sprung von aus auf an liefert, lässt sich zählen.
- **Zeit messen**: Eine Clock plus ein Counter ergeben eine Stoppuhr. Der
  Überlauf-Ausgang `O` treibt den nächsten Counter an — so werden aus
  Sekunden Minuten, wie bei einer Uhr, deren Minutenzeiger nach 60
  Sekunden einen Schritt weiterrückt.
- **Speicherplätze der Reihe nach abklappern**: Ein
  [Register](register.md) hat viele nummerierte Fächer; die Nummer eines
  Fachs heißt **Adresse**. Verbinde den Zählerausgang mit dem
  Adress-Eingang, und die Schaltung geht Fach für Fach durch — so spielt
  man eine Melodie oder eine Befehlsfolge nacheinander ab.
- **Gleichmäßig wachsende Zahl nutzen**: Der Stand wächst Schritt für
  Schritt immer gleich weiter — gutes Futter für
  [Sinus](../math/sinus.md)-Wellen oder für eine wandernde Position auf
  dem [Line Display](../display/line-display.md).
- **Bei einer anderen Zahl neu anfangen**: Ein
  [Modulo](../math/modulo.md) hinter dem Ausgang lässt den Zähler schon
  bei einer kleineren Zahl deiner Wahl wieder bei 0 beginnen.

## Siehe auch

[Counter4](counter4.md) · [Clock](../signal/clock.md) ·
[Register](register.md) · [T FlipFlop](../logic/t-flipflop.md)
