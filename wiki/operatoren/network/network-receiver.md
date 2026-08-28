# Network Receiver

[Operator-Lexikon](../index.md) · Kategorie: **Network**

Der Network Receiver ist das **Funkgerät zum Hören**: Er lauscht auf einen
benannten **Funk-Kanal** des Servers und gibt aus, was dort zuletzt
gesendet wurde — egal, ob der Sender in derselben Schaltung, einem anderen
Browser-Tab oder auf einem anderen Rechner steht.

Der Kanalname steht in den Properties (Feld **Channel**); das bunte Muster
auf dem Baustein ist der Fingerabdruck des Kanals — es muss zum Muster des
Senders passen. Ohne frische Sendungen verklingt der Kanalwert nach kurzer
Zeit auf 0, wie ein Funksignal, das verstummt.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Ausgang | Byte | Der zuletzt empfangene Wert |
| `T` | Ausgang | Bit | Ein Tick an, wenn sich der empfangene Wert ändert |

## Ausprobieren

Hier stehen Sender und Empfänger nebeneinander — verbunden sind sie
**nicht** durch eine Leitung, sondern nur über den Funk-Kanal „wiki-demo"
des Servers. Stelle links einen Wert ein und schalte `T` an: Rechts kommt
er an — und verklingt nach kurzer Zeit wieder auf 0:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Network Sender", "_id": "send1", "_x": -140, "_y": 0, "Channel": "wiki-demo" },
		{ "_#new": "Network Receiver", "_id": "recv1", "_x": 140, "_y": 0, "Channel": "wiki-demo" }
	],
	"conAll": []
}
```

Noch spannender: Öffne diese Seite in einem zweiten Browser-Fenster —
beide Demos hängen am selben Kanal, gesendet in einem Fenster, empfangen
in beiden. Auch die Demo auf der [Network Sender](network-sender.md)-Seite
funkt hier herein.

## Einsatzideen

- **Anzeigetafel**: Eine Schaltung misst und sendet, eine andere zeigt
  an — auf jedem Gerät, das die Seite geöffnet hat.
- **Gemeinsame Schaltungen**: Mehrere Personen bauen je einen Teil; die
  Kanäle sind die Schnittstellen dazwischen.
- **Werte kurz „anfunken"**: Da der Kanal von selbst auf 0 zurückfällt,
  eignet er sich gut für Impuls-Botschaften; wer den Wert dauerhaft
  braucht, hält ihn drüben mit
  [Memory (1 byte)](../memory/memory-1byte.md) fest (der `T`-Ausgang
  liefert den passenden Auslöser).

## Siehe auch

[Network Sender](network-sender.md) · [Portale](../utility/portale.md) ·
[Memory (1 byte)](../memory/memory-1byte.md)
