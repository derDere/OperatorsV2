# Repeater

[Operator-Lexikon](../index.md) · Kategorie: **Signal**

Der Repeater ist das **Echo**: Er gibt sein Eingangssignal unverändert
wieder aus — nur um `D` Ticks **verspätet**. Innen arbeitet ein Förderband:
Jeder Tick schiebt den aktuellen Eingangswert hinein, und was vor `D` Ticks
hineingeschoben wurde, fällt hinten heraus. Das Band ist auf dem Baustein
sogar als kleine Wellenlinie zu sehen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `D` | Eingang | Byte | Die Verzögerung in Ticks |
| `S` | Eingang | Bit | Das Signal, das verzögert werden soll |
| `L` | Eingang | Bit | Lock: Solange an, friert das Förderband ein und ignoriert den Eingang |
| `O` | Ausgang | Bit | Das verzögerte Signal |

## Ausprobieren

Stelle `D` auf etwa 60 (≈ 1 Sekunde) und schalte `S` an und aus — der
Ausgang macht alles nach, nur später. Auf dem Baustein siehst du dein
Signal durchs Band wandern:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Repeater", "_id": "rpt1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Nachlauf**: Das Licht soll erst kurz nach dem Schalter angehen — oder
  eine zweite Lampe immer eine Sekunde nach der ersten.
- **Lauflicht**: Mehrere Repeater in Reihe, jeder mit derselben kleinen
  Verzögerung, dazwischen je eine [Lampe](../display/lamp.md) — ein Impuls
  wandert sichtbar die Kette entlang.
- **Signal einfrieren**: `L` hält das Band an — der aktuelle „Inhalt" der
  Verzögerungsstrecke bleibt stehen, bis es weitergeht.
- **Takt gegen Takt**: Ein Taktsignal mit seiner eigenen verzögerten Kopie
  per [Xor](../logic/xor.md) vergleichen ergibt kurze Impulse an jeder
  Signalkante — einstellbar breit über `D`.

## Siehe auch

[Memory (1 bit)](../memory/memory-1bit.md) · [Clock](clock.md) ·
[Pulse](../logic/pulse.md)
