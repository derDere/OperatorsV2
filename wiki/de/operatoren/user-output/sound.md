# Sound

[Operator-Lexikon](../index.md) · Kategorie: **User Output**

Sound ist der Lautsprecher der Schaltung: Er piept. Wie hoch der Ton ist,
wie laut und wie lange er klingt, bestimmen seine Eingänge — damit kann
eine Schaltung Melodien spielen, Alarm schlagen oder bei jedem Tastendruck
klicken.

Ein Ton ist zitternde Luft. Je schneller die Luft hin und her geht, desto
höher klingt es. Wie oft sie das in einer Sekunde tut, nennt man die
**Frequenz**.

## Warum die Tonhöhe eine Notennummer ist

Der Eingang `N` bekommt keine Frequenz, sondern eine **Notennummer** — so,
als wären alle Tasten eines Klaviers von links nach rechts durchgezählt:

- **+1** ist die nächste Taste, also ein **Halbton**.
- **+12** ist derselbe Ton eine Stufe höher, also eine **Oktave**.
- **69** ist der Ton, nach dem Musiker ihre Instrumente stimmen: 440-mal
  zittern je Sekunde.

Der Grund dafür: Eine Oktave höher heißt immer **doppelt so schnell
zittern**. Von 220 auf 440 ist eine Oktave — von 440 auf 880 aber auch,
obwohl das der doppelte Abstand ist. Gleiche Abstände in der Frequenz sind
also keine gleichen Abstände im Klang. Bei Notennummern dagegen ist ein
Schritt immer ein Halbton, unten wie oben. Genau deshalb kannst du eine
Melodie einfach als Liste von Zahlen aufschreiben und abspielen lassen.

Hörbar wird es etwa ab Nummer 12; über 130 wird es so hoch, dass es kaum
noch jemand wahrnimmt.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `N` | Eingang | Byte | Die Tonhöhe als Notennummer |
| `V` | Eingang | Byte | Die Lautstärke: 0 ist still, 255 ganz laut |
| `L` | Eingang | Byte | Die Länge eines ausgelösten Tons in Schritten von 10 ms — 255 sind 2,55 Sekunden |
| `W` | Eingang | Byte | Die Klangfarbe: 0 Rechteck, 1 Sinus, 2 Sägezahn, 3 Dreieck |
| `T` | Eingang | Bit | Beim Einschalten beginnt der Ton von vorn |
| `P` | Eingang | Bit | Solange an, klingt der Ton ohne Ende weiter |
| `M` | Eingang | Bit | Solange an, bleibt der Baustein still |
| `O` | Ausgang | Bit | An, solange ein Ton klingt |
| `N` | Ausgang | Byte | Die Note, die gerade klingt |
| `V` | Ausgang | Byte | Die Lautstärke, die gerade klingt |
| `W` | Ausgang | Byte | Die Klangfarbe, die gerade klingt |

Ein Eingang **ohne Leitung** benutzt seinen Standardwert. Ein frisch
gesetzter Sound-Baustein, an dem nur `T` hängt, piept deshalb sofort:
Nummer 79, volle Lautstärke, 200 ms lang, als Rechteck — der typische
Piepton eines Rechners.

## Ausprobieren

Stelle `N`, `V` und `L` ein und schalte `T` an und wieder aus. **Achtung:
Jetzt kommt wirklich Ton aus deinen Lautsprechern.**

```operatorsv2
{
	"opAll": [
		{ "_#new": "Sound", "_id": "snd1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Zwei Wege, einen Ton zu starten

`T` ist der Auslöser. Er reagiert auf den Moment des Einschaltens — auf die
**steigende Flanke** (siehe [Flanken und Takt](../../grundlagen/flanken-und-takt.md)).
Ab diesem Moment läuft die Zeit, die an `L` anliegt, und danach ist der Ton
zu Ende. Löst du mitten im Ton erneut aus, beginnt die Zeit von vorn und
der Ton wird neu angeschlagen — so lassen sich auch zwei gleiche Töne
hintereinander auseinanderhalten.

`P` dagegen ist der Dauerstrom: Solange er an ist, klingt der Ton, ohne auf
`L` zu schauen.

Der Unterschied zeigt sich, wenn sich die Eingänge während des Tons ändern:

| Gestartet mit | Was klingt |
| --- | --- |
| `T` | Note, Lautstärke und Klangfarbe von dem Moment, in dem ausgelöst wurde — ein weiterlaufender Stapel verbiegt den Ton also nicht mitten im Klingen |
| `P` | Immer das, was gerade anliegt — lege einen [Sinus](../math/sinus.md) auf `N`, und fertig ist die Sirene |

## Die Klangfarbe

Dieselbe Note klingt auf einer Flöte anders als auf einer Trompete. Woran
das liegt, ist die Form der Schwingung — die **Wellenform**:

| `W` | Form | Klingt |
| --- | --- | --- |
| 0 | Rechteck | hart und piepsig, wie alte Spielkonsolen |
| 1 | Sinus | weich und rund, wie eine Flöte |
| 2 | Sägezahn | scharf und schneidend, wie eine Trompete |
| 3 | Dreieck | mild, zwischen Sinus und Rechteck |

## Was der Baustein anzeigt

Oben läuft die Schwingung als Kurve mit: Ihre Form ist die Klangfarbe, ihre
Höhe die Lautstärke, und je höher die Note, desto enger stehen die Wellen.
Darunter zeigt der Lautsprecher mit seinen Bögen die Lautstärke — leise nur
einen, laut alle drei. Solange etwas klingt, sind sie blau. Ist `M` an,
liegt ein rotes Kreuz über dem Lautsprecher. Unter dem Lautsprecher stehen
die klingende Note und die Länge des Tons; beim Dauerton steht dort *hold*.

## Mehrere Töne gleichzeitig

Ein Sound-Baustein spielt immer nur **einen** Ton. Für einen Akkord stellst
du mehrere nebeneinander und gibst jedem seine eigene Note. Sie kommen sich
dabei nicht in die Quere: Alle Töne laufen zusammen über einen Regler, der
zu laute Stellen selbsttätig dämpft.

## Eine Melodie abspielen

Ein [Stack Input](../fixed-input/stack-input.md) ist eine feste Liste von
Zahlen, die auf Knopfdruck eine nach der anderen herauskommen — also genau
ein Notenblatt. Sein Ausgang `B` gibt die Note an `N`, sein Ausgang `T`
meldet „habe eine gelesen" und löst damit den Ton aus.

Klicke unten mehrmals auf `T` des Stapels: Die ersten Takte von *Bruder
Jakob* kommen Note für Note. Mit `R` fängst du wieder von vorn an.

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack Input", "_id": "rom", "_x": -80, "_y": 0, "Values": "3C, 3E, 40, 3C, 3C, 3E, 40, 3C" },
		{ "_#new": "Sound", "_id": "snd", "_x": 80, "_y": 0 }
	],
	"conAll": [
		{ "s": "rom_out_B", "e": "snd_in_N" },
		{ "s": "rom_out_T", "e": "snd_in_T" }
	]
}
```

Im Editor hängst du statt deiner Klicks eine [Clock](../signal/clock.md) an
den `T` des Stapels — dann läuft die Melodie im Takt von selbst. Für eine
**Pause** nimmst du einen zweiten Stack Input mit den Längen und legst ihn
auf `L`: Eine 0 dort bedeutet, dass an dieser Stelle nichts klingt.

## Einsatzideen

**Rückmeldung geben**: Lege irgendein Ereignis deiner Schaltung auf `T` —
einen Tastendruck, einen Zählerstand, das Ende eines Vorgangs. Schon
bestätigt die Schaltung sich hörbar selbst.

**Alarm schlagen**: Eine Bedingung, die nicht eintreten soll, auf `P` gelegt
— und es tutet so lange, bis der Fehler weg ist.

**Töne aneinanderreihen**: Der Ausgang `O` sagt, ob gerade etwas klingt.
Über einen [Pulse](../logic/pulse.md) auf seine fallende Flanke startest du
den nächsten Ton genau dann, wenn der vorige zu Ende ist.

**Hören, was die Schaltung rechnet**: Lege einen [Counter8](../memory/counter8.md)
auf `N` — dann wird aus dem Zählen eine Tonleiter, die nach oben klettert.

## Eine ganze Oktave in Zahlen

| Note | Nummer | Note | Nummer |
| --- | --- | --- | --- |
| c′ | 60 | fis′ | 66 |
| cis′ | 61 | g′ | 67 |
| d′ | 62 | gis′ | 68 |
| dis′ | 63 | a′ | 69 |
| e′ | 64 | ais′ | 70 |
| f′ | 65 | h′ | 71 |

Die nächste Oktave beginnt bei 72, die vorige bei 48 — also immer 12 dazu
oder 12 weg.

## Siehe auch

[Stack Input](../fixed-input/stack-input.md) · [Clock](../signal/clock.md) ·
[Flanken und Takt](../../grundlagen/flanken-und-takt.md) ·
[Sinus](../math/sinus.md) · [Bits und Bytes](../../grundlagen/bits-und-bytes.md)
