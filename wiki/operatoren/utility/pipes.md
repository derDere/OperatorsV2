# Pipe 1 / Pipe 4 / Pipe 8

[Operator-Lexikon](../index.md) · Kategorie: **Utility**

Pipes sind **Durchreicher**: Jeder Eingang wird unverändert an seinen
Ausgang weitergegeben — mehr nicht. Es gibt sie in drei Größen mit 1, 4
oder 8 Leitungen. Die Anschlüsse tragen keine Beschriftung; sie gehören
paarweise zusammen (oberster Eingang → oberster Ausgang usw.).

Klingt nutzlos? Ist es nicht — Pipes sind das Ordnungswerkzeug für
Leitungen.

## Anschlüsse

| Baustein | Eingänge | Ausgänge | Bedeutung |
| --- | --- | --- | --- |
| Pipe 1 | 1 | 1 | Reicht einen Wert durch |
| Pipe 4 | 4 | 4 | Reicht vier Werte durch |
| Pipe 8 | 8 | 8 | Reicht acht Werte durch |

Alle Anschlüsse nehmen Bits wie Bytes.

## Ausprobieren

Was links hineingeht, kommt rechts heraus — an oder aus, Zahl oder nicht:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Pipe 1", "_id": "pipe1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Leitungen bündeln und führen**: Statt acht einzelne Kabel quer über
  die ganze Fläche zu ziehen, laufen sie durch eine Pipe 8 an definierten
  „Wegpunkten" entlang — die Schaltung bleibt lesbar.
- **Verteiler-Punkt**: Ein Signal, das an viele Stellen soll, läuft erst
  in eine Pipe; von deren Ausgang gehen die Verbindungen sternförmig
  weiter. Soll die Quelle später getauscht werden, hängt nur **eine**
  Leitung an ihr.
- **Gezielte Verzögerung**: Jeder Baustein braucht einen
  [Tick](../../grundlagen/werte-und-signale.md) zum Durchreichen — eine
  Pipe verzögert also um genau einen Tick. Das nutzt man, um parallele
  Signalwege im Gleichschritt zu halten. (Für einstellbare Verzögerungen:
  [Repeater](../signal/repeater.md).)
- **Über weite Strecken** sind die [Portale](portale.md) die elegantere
  Alternative — ganz ohne sichtbare Leitung.

## Siehe auch

[Portale](portale.md) · [Repeater](../signal/repeater.md)
