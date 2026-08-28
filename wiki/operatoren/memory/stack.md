# Stack

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Der Stack ist ein **Stapel für Zahlen** — wie ein Stapel Teller: Man legt
oben Werte drauf und nimmt sie später wieder herunter. Das Besondere: Er
kann in **zwei Richtungen** ausgeben — den zuletzt abgelegten Wert zuerst
(Teller-Prinzip, LIFO) oder den ältesten zuerst (Warteschlange, FIFO).
Die Zahl auf dem Baustein zeigt, wie viele Werte gerade auf dem Stapel liegen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `V` | Eingang | Byte | Der Wert, der abgelegt wird |
| `T` | Eingang | Bit | Steigende Flanke: legt `V` auf den Stapel |
| `F` | Eingang | Bit | Flush — steigende Flanke: gibt den **ältesten** Wert aus (Warteschlange) |
| `P` | Eingang | Bit | Pop — steigende Flanke: gibt den **neuesten** Wert aus (Tellerstapel) |
| `C` | Eingang | Bit | Steigende Flanke: leert den Stapel |
| `K` | Eingang | Bit | Keep: solange an, wird beim Lesen nichts entfernt — ein Lesezeiger wandert stattdessen |
| `R` | Eingang | Bit | Steigende Flanke: setzt den Lesezeiger (Keep-Modus) an den Anfang |
| `B` | Ausgang | Byte | Der zuletzt gelesene Wert |
| `T` | Ausgang | Bit | Ein Tick an, wenn gerade ein Wert gelesen wurde |
| `E` | Ausgang | Bit | An, wenn der Stapel leer ist — bzw. im Keep-Modus alles gelesen wurde |

## Ausprobieren

Lege nacheinander z. B. 10, 20, 30 ab (Wert auf `V` einstellen, dann `T`
an/aus schalten). Hole sie mit `P` zurück — sie kommen rückwärts
(30, 20, 10). Lege sie erneut ab und benutze stattdessen `F` — jetzt kommen
sie in Originalreihenfolge:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack", "_id": "stack1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Warteschlange**: Ereignisse sammeln und in Ruhe der Reihe nach
  abarbeiten (`F`) — z. B. Zeichen aus einem
  [Text Input](../user-input/text-input.md) puffern.
- **Rückgängig-Gedächtnis**: Mit `P` kommt immer das Neueste zuerst
  zurück — das Prinzip hinter jedem „Undo".
- **Mehrfach abspielen**: Im Keep-Modus (`K` an) bleibt der Inhalt
  erhalten; `R` spult an den Anfang zurück. So wird der Stack zum
  wiederverwendbaren Datenband — für **feste** Abspiel-Listen ist der
  [Stack Input](../fixed-input/stack-input.md) der bequemere Baustein.
- **Nachrichten zwischenspeichern**: Ein Schaltungsteil produziert Werte
  schneller, als der andere sie verbraucht? Der Stack gleicht das aus;
  `E` meldet „nichts mehr da".

## Siehe auch

[Stack Input](../fixed-input/stack-input.md) · [Register](register.md) ·
[File Input](../user-input/file-input.md)
