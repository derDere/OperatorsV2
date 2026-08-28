# Stack

[Operator-Lexikon](../index.md) · Kategorie: **Memory**

Der Stack ist ein **Stapel für Zahlen** — wie ein Stapel Teller: Du legst
Werte oben drauf und nimmst sie später wieder herunter. Das Besondere: Du
kannst sie in **zwei Richtungen** zurückholen. Nimmst du den zuletzt
abgelegten Wert zuerst, heißt das **LIFO** („last in, first out"). Nimmst
du den ältesten zuerst, wie in einer Warteschlange, heißt das **FIFO**
(„first in, first out"). Beides erklärt
[Stapel und Warteschlange](../../grundlagen/stapel-und-warteschlange.md).

Ausgelöst wird jeweils in dem Moment, in dem der passende Eingang von aus
auf an springt — das ist die **steigende Flanke**
([Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Die Zahl auf
dem Baustein zeigt, wie viele Werte gerade auf dem Stapel liegen.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `V` | Eingang | Byte | Der Wert, der auf den Stapel gelegt wird |
| `T` | Eingang | Bit | Bei steigender Flanke legt der Stack den Wert von `V` oben auf den Stapel |
| `F` | Eingang | Bit | Flush: bei steigender Flanke kommt der **älteste** Wert heraus (wie bei einer Warteschlange) |
| `P` | Eingang | Bit | Pop: bei steigender Flanke kommt der **neueste** Wert heraus (wie beim Tellerstapel) |
| `C` | Eingang | Bit | Bei steigender Flanke wirft der Stack alle Werte herunter — er ist danach leer |
| `K` | Eingang | Bit | Keep: solange an, wird beim Lesen nichts entfernt — ein unsichtbarer Lesezeiger wandert stattdessen weiter |
| `R` | Eingang | Bit | Bei steigender Flanke springt der Lesezeiger (im Keep-Modus) zurück an den Anfang |
| `B` | Ausgang | Byte | Der zuletzt herausgeholte Wert |
| `T` | Ausgang | Bit | Blitzt einmal an, wenn gerade ein Wert herausgeholt wurde |
| `E` | Ausgang | Bit | An, wenn der Stapel leer ist — im Keep-Modus: wenn alles einmal gelesen wurde |

## Ausprobieren

Lege nacheinander 10, 20, 30 ab (Wert auf `V` einstellen, dann `T` an-
und wieder ausschalten). Hole sie mit `P` zurück — sie kommen rückwärts
heraus (30, 20, 10). Lege sie erneut ab und benutze `F` — dann kommen sie
in der Reihenfolge heraus, in der du sie abgelegt hast:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack", "_id": "stack1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Einsatzideen

- **Warteschlange**: Sammle Ereignisse und arbeite sie danach mit `F` der
  Reihe nach ab — etwa Zeichen aus einem
  [Text Input](../user-input/text-input.md), bis du Zeit hast, sie zu
  verarbeiten.
- **Rückgängig-Speicher**: Mit `P` kommt der zuletzt abgelegte Wert
  zuerst zurück — genau das Prinzip hinter der „Rückgängig"-Funktion
  vieler Programme.
- **Mehrfach abspielen**: Im Keep-Modus (`K` an) bleibt der Inhalt auch
  nach dem Lesen erhalten; `R` spult den Lesezeiger an den Anfang zurück.
  So spielst du denselben Inhalt beliebig oft von vorn ab — wie ein
  Tonband, das du zurückspulst, ohne es zu löschen. Für eine **feste**,
  immer gleiche Liste ist der
  [Stack Input](../fixed-input/stack-input.md) bequemer.
- **Nachrichten zwischenspeichern**: Erzeugt ein Teil deiner Schaltung
  Werte schneller, als ein anderer sie verarbeiten kann? Der Stack
  gleicht das aus; `E` meldet, wenn nichts mehr da ist.

## Siehe auch

[Stack Input](../fixed-input/stack-input.md) · [Register](register.md) ·
[File Input](../user-input/file-input.md)
