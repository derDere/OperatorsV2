# Stapel und Warteschlange

Zurück zur [Startseite](../index.md).

Manchmal soll eine Schaltung nicht nur eine einzige Zahl festhalten,
sondern viele nacheinander — und sie später wieder herausgeben. Dann
stellt sich eine Frage: **In welcher Reihenfolge kommen die Zahlen wieder
heraus?** Dafür gibt es zwei Antworten, und beide haben einen Namen.

## Der Stapel: zuletzt hinein, zuerst heraus

Denk an einen Stapel Teller im Schrank. Du legst jeden neuen Teller oben
darauf, und wenn du einen brauchst, nimmst du ebenfalls den obersten. Der
Teller, den du zuletzt hingelegt hast, ist also der erste, den du wieder in
der Hand hast. Der unterste liegt am längsten da und kommt zuletzt an die
Reihe.

Diese Reihenfolge nennt man **LIFO**, kurz für „last in, first out" — auf
Deutsch „zuletzt rein, zuerst raus". Und die Sammlung selbst heißt
**Stapel**, auf Englisch *stack*.

## Die Warteschlange: zuerst hinein, zuerst heraus

An der Kasse ist es genau umgekehrt. Wer sich zuerst angestellt hat, ist
zuerst dran; wer später kommt, hängt sich hinten an. Neues kommt also
hinten dazu, herausgegeben wird vorn.

Diese Reihenfolge nennt man **FIFO**, kurz für „first in, first out" — auf
Deutsch „zuerst rein, zuerst raus". Die Sammlung selbst heißt
**Warteschlange**, auf Englisch *queue*.

## Wofür nimmt man welche Reihenfolge?

Beides ist richtig, es kommt auf die Aufgabe an:

| Reihenfolge | Passt, wenn … | Beispiel |
| --- | --- | --- |
| **LIFO** (Stapel) | das Neueste zuerst gebraucht wird | „Rückgängig": die letzte Änderung wird als erste zurückgenommen |
| **FIFO** (Warteschlange) | alles der Reihe nach abgearbeitet wird | Zeichen eines Textes: Das erste eingetippte erscheint zuerst |

Eine Warteschlange ist außerdem der Ausgleich zwischen schnell und
langsam: Erzeugt ein Teil deiner Schaltung Werte schneller, als ein
anderer Teil sie verarbeiten kann, sammelt die Warteschlange sie so lange,
bis der langsame Teil Zeit hat.

## Ausprobieren

Der [Stack](../operatoren/memory/stack.md) kann beides — er bewahrt Zahlen
auf und gibt sie auf Wunsch in der einen oder der anderen Reihenfolge
zurück. Lege nacheinander 10, 20 und 30 ab: Stelle dazu `V` auf den Wert
und schalte `T` an und wieder aus. Hole die Zahlen dann mit `P` zurück —
sie kommen rückwärts heraus (30, 20, 10), wie beim Tellerstapel. Lege sie
erneut ab und benutze stattdessen `F` — jetzt kommen sie in der
Reihenfolge heraus, in der du sie abgelegt hast, wie an der Kasse:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Stack", "_id": "stack1", "_x": 0, "_y": 0 }
	],
	"conAll": []
}
```

## Weiterlesen

- [Stack](../operatoren/memory/stack.md) — der Baustein aus der Demo, mit
  allen Anschlüssen erklärt
- [Stack Input](../operatoren/fixed-input/stack-input.md) — eine feste
  Liste von Zahlen, die du selbst hinterlegst
- [Flanken und Takt](flanken-und-takt.md) — warum Ablegen und Herausholen
  im Moment des Einschaltens passieren
