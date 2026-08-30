# Button

[Operator-Lexikon](../index.md) · Kategorie: **User Input**

Der Button ist die **Klingel** der Schaltung — auf Deutsch auch
**Taster** genannt. Ein Klick gibt für einen ganz kurzen Moment ein
Signal: nur **einen Tick** lang, dann ist es vorbei — auch wenn du die
Maustaste länger gedrückt hältst. So ein kurzes „Jetzt!" nennt man einen
**Impuls**. Der [Switch](switch.md) bleibt dagegen in seiner Stellung
stehen wie ein Lichtschalter.

Ein Impuls passt genau zu Eingängen, die nur auf den Moment des
Einschaltens warten — diesen Moment nennt man eine **steigende Flanke**
(siehe [Flanken und Takt](../../grundlagen/flanken-und-takt.md)). Solche
Eingänge heißen oft `T`, kurz für **Trigger** (Auslöser).

Wie alle Eingabe-Bausteine erscheint der Button im Editor zusätzlich als
echte Schaltfläche auf der Panelfläche links; die Aufschrift lässt sich
in den Properties ändern.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `O` | Ausgang | Bit | Ein Tick an pro Klick |
| `!O` | Ausgang | Bit | Das Gegenteil (fast immer an) |

## Ausprobieren

Ein einzelner Tick ist fürs Auge kaum sichtbar — darum hängt hier ein
[T FlipFlop](../logic/t-flipflop.md) dahinter, das bei jedem Impuls
umkippt. Klicke auf den Button-Baustein und beobachte das
„State"-Kästchen rechts:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Button", "_id": "btn1", "_x": -120, "_y": 0 },
		{ "_#new": "T FlipFlop", "_id": "tff1", "_x": 80, "_y": 0 }
	],
	"conAll": [
		{ "s": "btn1_out_O", "e": "tff1_in_T" }
	]
}
```

## Einsatzideen

- **Auslösen**: Werte in ein [Memory](../memory/memory-1byte.md)
  übernehmen, einen [Counter](../memory/counter8.md) weiterzählen, den
  nächsten Wert aus einem [Stack Input](../fixed-input/stack-input.md)
  holen — überall, wo ein Trigger-Eingang wartet, passt der Button.
- **Start/Stopp-Taster**: Zwei Buttons auf `S` und `R` eines
  [RS FlipFlops](../logic/rs-flipflop.md) — die klassische
  Steuerungs-Bedienung.
- **Umschalt-Taster**: Button + [T FlipFlop](../logic/t-flipflop.md)
  (wie in der Demo) macht aus dem Impuls einen an/aus-Wechsler.

## Siehe auch

[Switch](switch.md) · [Pulse](../logic/pulse.md) ·
[T FlipFlop](../logic/t-flipflop.md) ·
[Flanken und Takt](../../grundlagen/flanken-und-takt.md)
