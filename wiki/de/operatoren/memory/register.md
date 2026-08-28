# Register

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Das Register ist ein **Schubladenschrank für Zahlen**: 256 Fächer, jedes
mit einer eigenen Nummer von 0 bis 255 — diese Nummer nennt man
**Adresse** —, und in jedes Fach passt genau ein Byte. Der Adress-Eingang
wählt das Fach, dessen Inhalt sofort am Ausgang anliegt. Geschrieben wird
auf Kommando: genau in dem Moment, in dem `W` von aus auf an springt (die
**steigende Flanke**,
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)), legt das
Register den Wert von `B` in das gewählte Fach. Damit ist es ein kleiner
Arbeitsspeicher, wie ihn auch ein echter Computer hat — dort **RAM**
genannt. Die Zahl auf dem Baustein zeigt, wie viele Fächer belegt sind.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `A` | Eingang | Byte | Die Adresse: die Nummer des Fachs, das gemeint ist |
| `B` | Eingang | Byte | Der Wert, der beim Schreiben in das Fach gelegt wird |
| `W` | Eingang | Bit | Bei steigender Flanke wird der Wert von `B` in Fach `A` geschrieben |
| `C` | Eingang | Bit | Bei steigender Flanke werden alle Fächer auf einmal geleert |
| `A` | Ausgang | Byte | Die gerade gewählte Adresse (unverändert durchgereicht) |
| `B` | Ausgang | Byte | Der Inhalt des gewählten Fachs (ein leeres Fach zeigt 0) |
| `T` | Ausgang | Bit | Blitzt einmal an, wenn sich die Adresse oder der gelesene Wert ändert |
| `E` | Ausgang | Bit | An, solange der ganze Schrank leer ist |

## Ausprobieren

Schreibe zuerst etwas hinein: Adresse `A` auf 1, Wert `B` auf 42, dann
`W` an- und wieder ausschalten. Wähle anschließend Adresse 2 und schreibe
77 hinein. Wechsle mit `A` zwischen 1 und 2 hin und her — der Ausgang
zeigt jeweils den Inhalt des passenden Fachs:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Register", "_id": "reg1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Fach für Fach abspielen**: Ein [Counter8](counter8.md) zählt die
  Adressen hoch, das Register gibt die dort abgelegten Werte der Reihe
  nach aus — so laufen Melodien, Muster oder ganze Befehlsfolgen Schritt
  für Schritt ab.
- **Nachschlagetabelle**: Einmal befüllt, verwandelt das Register jede
  Zahl an `A` in eine andere Zahl an `B` — eine Umrechnungstabelle, die
  du dir selbst ausdenkst.
- **Speicher für einen kleinen Computer**: Zusammen mit
  [Stack Input](../fixed-input/stack-input.md), der feste Befehle
  liefert, und etwas Logik entsteht ein Mini-Rechner. Das Beispiel
  *mini_pc_sim* im 📚-Examples-Menü des Editors zeigt so eine Maschine.
- **Speicher für ein Bild aus Zeichen**: Adresse = Position auf dem
  Bildschirm, Wert = welches Zeichen dort steht — genau so organisierst
  du die Inhalte für ein
  [Terminal Display](../display/terminal-display.md).

## Siehe auch

[Memory (1 byte)](memory-1byte.md) · [Stack](stack.md) ·
[Counter8](counter8.md) · [Stack Input](../fixed-input/stack-input.md)
