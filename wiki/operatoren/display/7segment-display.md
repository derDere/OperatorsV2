# 7 Segment Display

[Operator-Lexikon](../index.md) · Kategorie: **Display**

Die klassische **Ziffernanzeige**, wie man sie von Weckern und
Taschenrechnern kennt: sieben Leuchtbalken (Segmente) plus ein Punkt.
Jedes Segment hat seinen eigenen Eingang — die Anzeige selbst ist bewusst
„dumm" und leuchtet einfach, was man ihr sagt. Die Übersetzung von Zahlen
in Segmente übernimmt der
[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md).

Auf der Panelfläche rechts im Editor erscheint die Anzeige groß im
Retro-Look.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `S1` | Eingang | Bit | Balken oben |
| `S2` | Eingang | Bit | Balken oben links |
| `S3` | Eingang | Bit | Balken oben rechts |
| `S4` | Eingang | Bit | Balken Mitte |
| `S5` | Eingang | Bit | Balken unten links |
| `S6` | Eingang | Bit | Balken unten rechts |
| `S7` | Eingang | Bit | Balken unten |
| `D` | Eingang | Bit | Der Punkt |

## Ausprobieren

Male selbst Ziffern: Für eine 7 brauchst du `S1`, `S3` und `S6` — für eine
4 die Segmente `S2`, `S4`, `S3` und `S6`:

```operatorsv2
{
	"opAll": [
		{ "_#new": "7 Segment Display", "_id": "seg1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Zahlen anzeigen**: Fast immer sitzt davor der
  [4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) — er
  formt aus vier Bits automatisch die richtige Ziffer (0–9 und A–F).
- **Mehrstellige Anzeigen**: Pro Stelle eine Anzeige samt Decoder; die
  Ziffern liefert der [Base Converter](../converter/base-converter.md).
  Das Uhren-Beispiel *clock* (📚-Examples-Menü im Editor) baut so eine
  komplette Digitaluhr mit vier Stellen.
- **Eigene Symbole**: Da jedes Segment einzeln ansteuerbar ist, gehen
  auch Buchstaben-Näherungen und Spielereien — ein rotierender Balken als
  „Lade-Anzeige" braucht nur einen [Counter](../memory/counter4.md) und
  etwas Logik.

## Siehe auch

[4bit to 7 Segment decoder](../converter/4bit-zu-7segment.md) ·
[Byte](byte.md) · [Lamp](lamp.md)
