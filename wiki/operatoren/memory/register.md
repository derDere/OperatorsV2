# Register

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Das Register ist ein **Schubladenschrank für Zahlen**: 256 Fächer, jedes
mit einer Nummer (der **Adresse**) von 0 bis 255, und in jedes Fach passt
ein Byte. Der Adress-Eingang wählt das Fach, dessen Inhalt liegt sofort am
Ausgang — geschrieben wird auf Kommando. Damit ist das Register nichts
anderes als ein kleiner **Arbeitsspeicher (RAM)**. Die Zahl auf dem
Baustein zeigt, wie viele Fächer belegt sind.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `A` | Eingang | Byte | Die Adresse: welches Fach gemeint ist |
| `B` | Eingang | Byte | Der Wert, der beim Schreiben ins Fach gelegt wird |
| `W` | Eingang | Bit | Steigende Flanke: schreibt `B` in Fach `A` |
| `C` | Eingang | Bit | Steigende Flanke: leert den ganzen Schrank |
| `A` | Ausgang | Byte | Die aktuell gewählte Adresse (durchgereicht) |
| `B` | Ausgang | Byte | Der Inhalt des gewählten Fachs (leer = 0) |
| `T` | Ausgang | Bit | Ein Tick an, wenn Adresse oder gelesener Wert sich ändern |
| `E` | Ausgang | Bit | An, solange der Schrank komplett leer ist |

## Ausprobieren

Schreibe etwas: Adresse `A` = 1, Wert `B` = 42, dann `W` an/aus. Wähle nun
Adresse 2 und schreibe 77. Wechsle mit `A` zwischen 1 und 2 — der Ausgang
zeigt jeweils den passenden Fach-Inhalt:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Register", "_id": "reg1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Sequenzer**: Ein [Counter8](counter8.md) klappert die Adressen der
  Reihe nach ab — das Register spielt die dort abgelegten Werte ab:
  Melodien, Muster, Befehlsfolgen.
- **Nachschlagetabelle**: Einmal befüllt, verwandelt das Register jeden
  Eingabewert (als Adresse) in einen zugehörigen Ausgabewert — eine
  frei definierbare Umrechnungstabelle.
- **Kleiner Computer-Speicher**: Zusammen mit
  [Stack Input](../fixed-input/stack-input.md) als Programm-ROM und etwas
  Logik entsteht ein echter Mini-Rechner — das Beispiel
  *mini_pc_sim* im 📚-Examples-Menü des Editors zeigt so eine Maschine.
- **Bildspeicher**: Adresse = Position, Wert = Zeicheninhalt — so
  organisiert man Inhalte für das
  [Terminal Display](../display/terminal-display.md).

## Siehe auch

[Memory (1 byte)](memory-1byte.md) · [Stack](stack.md) ·
[Counter8](counter8.md) · [Stack Input](../fixed-input/stack-input.md)
