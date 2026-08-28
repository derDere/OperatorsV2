# Slider

[Operator-Lexikon](../index.md) · Kategorie: **User Input**

Der Slider ist der **Drehregler** für Zahlen: Er liefert einen von Hand
einstellbaren Wert von 0 bis 255. Bedient wird er im Editor über den
echten Schieberegler auf der Panelfläche rechts; der Baustein auf der
Zeichenfläche zeigt die aktuelle Stellung an.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `V` | Ausgang | Byte | Die aktuelle Reglerstellung (0–255) |
| `T` | Ausgang | Bit | Ein Tick an, wenn sich die Stellung geändert hat |

## Ausprobieren

So sieht der Baustein aus (der bedienbare Regler gehört zur Panelfläche
des Editors — hier zeigt die Demo den zuletzt gespeicherten Stand):

```operatorsv2
{
	"opAll": [
		{ "_#new": "Slider", "_id": "sld1", "_x": 0, "_y": 0, "value": 128 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Alles Stufenlose**: Blinktempo einer [Clock](../signal/clock.md),
  Anteil eines [Scale](../math/scale.md), Zoomfaktor eines
  [Noise](../math/noise.md) — wo eine Zahl gebraucht wird, die man beim
  Ausprobieren gern „fühlt", ist der Slider erste Wahl.
- **Wert erst auf Kommando übernehmen**: Slider → 
  [Memory (1 byte)](../memory/memory-1byte.md), ausgelöst per
  [Button](button.md) — so stellt man in Ruhe ein und übernimmt dann.
- **Änderungen zählen**: Der `T`-Ausgang feuert bei jeder Bewegung — an
  einen [Counter8](../memory/counter8.md) gelegt, zählt er die
  Verstellungen mit.
- Für **feste** Zahlen, die niemand verstellen soll, nimm den
  [Value](../fixed-input/value.md).

## Siehe auch

[Value](../fixed-input/value.md) · [Switch](switch.md) ·
[Scale](../math/scale.md)
