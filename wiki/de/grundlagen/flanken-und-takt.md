# Flanken und Takt

Zurück zur [Startseite](../index.md).

Eine Schaltung steht nie still: Sie arbeitet in winzigen Schritten,
manches läuft dabei in einem festen Rhythmus, und viele Bausteine achten
gar nicht darauf, *dass* ein Eingang an ist, sondern nur auf den Moment, in
dem er angeht. Diese Seite erklärt die vier Wörter, die dafür im ganzen
Wiki auftauchen: Tick, Takt, Flanke und Impuls.

## Der Tick: ein Arbeitsschritt

Die Schaltung rechnet nicht in einem Rutsch, sondern Schritt für Schritt.
So ein Arbeitsschritt heißt **Tick**. In jedem Tick trägt zuerst jede
Verbindung ihren Wert vom Ausgang zum Eingang, danach liest jeder Baustein
seine Eingänge und setzt seine Ausgänge neu.

Ticks laufen schnell: ungefähr **60 pro Sekunde**. Einzeln siehst du sie
deshalb nicht, alles wirkt sofort. Wichtig wird der Tick trotzdem an zwei
Stellen. Erstens kommt ein Wert pro Tick nur **um einen Baustein weiter** —
bei langen Ketten braucht er also mehrere Ticks bis ans Ende. Zweitens
gibt es Signale, die genau einen Tick lang an sind: für das Auge
unsichtbar, für die Schaltung aber deutlich zu erkennen.

## Der Takt: ein gleichmäßiger Rhythmus

Ein **Takt** ist ein An und Aus in immer gleichen Abständen: an, aus, an,
aus, immer weiter. Musiker haben dafür ein kleines Gerät, das Metronom —
es klopft in gleichen Abständen, damit alle im selben Tempo bleiben. In
OperatorsV2 klopft die [Clock](../operatoren/signal/clock.md), und wie weit
die Klopfer auseinanderliegen, stellst du selbst ein.

Ein Takt ist der Antrieb für alles, was von allein ablaufen soll: Zähler,
die hochzählen, Werte, die der Reihe nach abgerufen werden, Zeichen, die
nacheinander auf einer Anzeige erscheinen. Hängen mehrere Bausteine am
selben Takt, schalten sie gemeinsam weiter und bleiben im Gleichschritt.

## Flanken: der Moment des Umschaltens

„Ist an" und „geht gerade an" sind zwei verschiedene Dinge. Bei einer
Türklingel zählt der Moment, in dem du drückst — nicht, wie lange dein
Finger auf dem Knopf liegen bleibt. Genau diesen Unterschied machen die
Bausteine auch.

Den Moment, in dem ein Wert von aus auf an springt, nennt man **steigende
Flanke**. Den umgekehrten Moment, das Ausschalten, nennt man **fallende
Flanke**.

Warum hören so viele Bausteine auf die Flanke statt auf den Dauerzustand?
Weil sie sonst in jedem Tick erneut auslösen würden. Ein Zähler, der auf
„ist an" hört, zählt 60-mal pro Sekunde weiter, solange der Schalter oben
steht — unbrauchbar. Ein Zähler, der auf die steigende Flanke hört, zählt
genau einmal pro Einschalten. In den Beschreibungen dieses Wikis steht
dafür „bei steigender Flanke".

## Der Impuls: ein ganz kurzes An

Ein **Impuls** ist ein einzelnes, sehr kurzes An — meist genau einen Tick
lang, danach sofort wieder aus. Impulse sind die üblichen Auslöser: Sie
sagen „jetzt" und halten nichts fest.

Der Baustein [Pulse](../operatoren/logic/pulse.md) macht aus jeder Flanke
einen solchen Impuls, und der [Button](../operatoren/user-input/button.md)
liefert bei jedem Druck von sich aus einen.

## Ausprobieren

Der 1-Bit-Speicher merkt sich den Wert von `B1`, sobald der Auslöser `T`
angeht. Stelle `B1` an und lass `T` aus — am Ausgang `B` passiert nichts.
Schalte dann `T` an: In genau diesem Moment übernimmt `B` den Wert. Lass
`T` an und ändere `B1` — `B` bleibt, wie es ist. Erst wenn du `T` aus- und
wieder anschaltest, gibt es eine neue steigende Flanke:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Memory (1 bit)", "_id": "mem1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Weiterlesen

- [Werte und Signale](werte-und-signale.md) — was durch die Leitungen
  fließt und welche Farbe wofür steht
- [Clock](../operatoren/signal/clock.md) — der Taktgeber der Schaltung
- [Pulse](../operatoren/logic/pulse.md) — Flanken sichtbar und nutzbar
  machen
- [Memory (1 bit)](../operatoren/memory/memory-1bit.md) — der Baustein aus
  der Demo oben
