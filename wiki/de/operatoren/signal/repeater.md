# Repeater

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Der Repeater ist das **Echo**: Was vorne hineingeht, kommt hinten
unverändert wieder heraus — nur eine Weile später. Dieses Später-Ankommen
nennt man **Verzögerung**.

Wie lange gewartet wird, stellst du mit `D` ein. Gezählt wird in Ticks —
so heißt ein kompletter Rechendurchgang der Schaltung, ungefähr 60 davon
passen in eine Sekunde (siehe
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Innen arbeitet
ein Förderband: Jeder Tick legt den aktuellen Wert vom Eingang vorne auf
das Band, und was vor `D` Ticks aufgelegt wurde, fällt hinten herunter.
Das Band ist auf dem Baustein als kleine Wellenlinie zu sehen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `D` | Eingang | Byte | Wie lange gewartet wird, gezählt in Ticks (60 Ticks sind etwa 1 Sekunde) |
| `S` | Eingang | Bit | Das Signal, das später ankommen soll |
| `L` | Eingang | Bit | Lock, die Bremse: Solange `L` an ist, steht das Band still und der Eingang wird nicht beachtet |
| `O` | Ausgang | Bit | Dasselbe Signal, nur eben später |

## Ausprobieren

Stelle `D` auf etwa 60 (also rund 1 Sekunde) und schalte `S` an und aus —
der Ausgang macht alles nach, nur später. Auf dem Baustein siehst du dein
Signal über das Band wandern:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Repeater", "_id": "rpt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Später anspringen**: Das Licht soll erst kurz nach dem Schalter
  angehen — oder eine zweite Lampe immer eine Sekunde nach der ersten.
- **Lauflicht**: Mehrere Repeater hintereinander, jeder mit derselben
  kleinen Verzögerung, dazwischen je eine [Lampe](../display/lamp.md).
  Ein einzelnes Signal wandert dann sichtbar die Kette entlang, wie bei
  einer Lichterkette, die nacheinander aufleuchtet.
- **Alles anhalten**: `L` stoppt das Band. Was gerade darauf unterwegs
  ist, bleibt liegen und wartet, bis du `L` wieder ausschaltest.
- **Kurze Impulse erzeugen**: Vergleiche ein Signal, das gleichmäßig an-
  und ausgeht, mit seiner eigenen verzögerten Kopie per
  [Xor](../logic/xor.md). Xor ist an, sobald beide Seiten verschieden
  sind — und verschieden sind sie nur in den `D` Ticks direkt nach jedem
  Umschalten. Bei jedem Wechsel kommt also ein kurzer **Impuls** heraus,
  und über `D` bestimmst du, wie lang er ist.

## Siehe auch

[Memory (1 bit)](../memory/memory-1bit.md) · [Clock](clock.md) ·
[Pulse](../logic/pulse.md) ·
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)
