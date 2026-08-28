# Cosinus

[Operator-Lexikon](../index.md) · Kategorie: **Math**

Cosinus ist der Zwilling des [Sinus](sinus.md): dasselbe sanfte Auf und Ab
im gleichen Takt, nur eine Viertel-Runde früher. Während Sinus in der Mitte
startet und erst langsam ausschlägt, ist Cosinus am Anfang schon ganz außen
und kommt zur Mitte hin zurück.

Am Eingang `B1` steht wieder die **Stelle auf der Runde**: 0 ist der Start,
64 eine Viertel-Runde, 128 die halbe, 192 die Dreiviertel-Runde, und bei
255 ist ein voller Umlauf herum. Warum eine Runde hier 255 Schritte hat und
was ein Winkel ist, erklärt die Seite [Sinus](sinus.md).

Auch die Ausgänge lesen sich genauso: `R` sagt, wie weit die Welle von der
Mitte weg ist (0 = Mitte, 255 = ganz außen), und `RN` sagt, auf welcher
Seite der Mitte sie gerade ist.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B1` | Eingang | Byte | Die Stelle auf der Runde: 0 = Start, 255 = einmal rundherum |
| `R` | Ausgang | Byte | Wie weit die Welle von der Mitte weg ist (0 = Mitte, 255 = ganz außen) |
| `RN` | Ausgang | Bit | An, solange die Welle unter der Mitte läuft |

Ein paar Stellen zum Nachstellen und Vergleichen:

| `B1` | entspricht | `R` | `RN` |
| --- | --- | --- | --- |
| 0 | 0° — Start | 255 | aus |
| 64 | 90° — Viertel-Runde | ≈ 0 | kippt hier um |
| 128 | 180° — halbe Runde | 255 | an |
| 192 | 270° — Dreiviertel-Runde | ≈ 0 | kippt hier um |

Zweimal pro Runde kreuzt die Welle die Mitte — dort ist `R` fast 0, und
`RN` wechselt die Seite.

## Ausprobieren

Stelle die Stelle auf der Runde von Hand ein und vergleiche mit der
Tabelle:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Cosinus", "_id": "cos1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Eine runde Sache**: Wo ein Punkt sitzt, sagen zwei Zahlen — wie weit
  zur Seite und wie weit oben. Cosinus liefert die Seite, [Sinus](sinus.md)
  mit derselben Stelle auf der Runde die Höhe — zusammen beschreibt der
  Punkt einen sauberen Kreis, etwa auf dem
  [Line Display](../display/line-display.md). Solche Zahlenpaare heißen
  **Vektoren** (siehe [Vektoren](../../grundlagen/vektoren.md)).
- **Versetzte Wellen**: Zwei Lampen, die abwechselnd atmen? Die eine
  bekommt den Sinus, die andere den Cosinus derselben Stelle auf der Runde.
- Willst du einen Punkt einfach nur um einen Winkel drehen, gibt es dafür
  den fertigen [Vector Rotate](../vector/vector-rotate.md).

## Siehe auch

[Sinus](sinus.md) · [Tangents](tangents.md) ·
[Vector Rotate](../vector/vector-rotate.md)
