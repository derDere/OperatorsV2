# Network Sender

[Operator-Lexikon](../index.md) · Kategorie: **Network**

Der Network Sender ist das **Funkgerät zum Senden**: Er schickt Bytes in
einen benannten **Funk-Kanal** auf dem Server. Alles, was irgendwo auf
denselben Kanal hört — ein [Network Receiver](network-receiver.md) in
derselben Schaltung, in einem anderen Browser-Tab oder auf einem anderen
Rechner — bekommt den Wert. So verlassen Signale erstmals die eigene
Zeichenfläche.

Der Kanalname wird in den Properties eingestellt (Feld **Channel** — ein
beliebiger Name genügt, gleicher Name = gleicher Kanal). Das bunte Muster
auf dem Baustein ist der Fingerabdruck des Kanals: Sender und Empfänger
mit demselben Muster sind verbunden. Die Wellen-Animation zeigt, dass die
Verbindung zum Server steht.

Ein Kanal ist bewusst flüchtig wie Funk: Senden mehrere gleichzeitig,
überlagern sich die Bytes bitweise per Oder — und ohne neue Sendungen
verklingt der Wert nach kurzer Zeit auf 0.

## Anschlüsse

| Anschluss | Art | Wert | Bedeutung |
| --- | --- | --- | --- |
| `B` | Eingang | Byte | Der Wert, der gesendet wird |
| `T` | Eingang | Bit | Steigende Flanke: sendet den aktuellen Wert |

## Ausprobieren

Dieser Sender funkt auf dem Kanal „wiki-demo". Stelle auf `B` einen Wert
ein und schalte `T` an und aus — der Empfänger auf der Seite
[Network Receiver](network-receiver.md) hört auf denselben Kanal. Öffne
beide Seiten in zwei Browser-Fenstern und sieh den Wert hinüberwandern:

```operatorsv2
{
	"opAll": [
		{ "_#new": "Network Sender", "_id": "send1", "_x": 0, "_y": 0, "Channel": "wiki-demo" }
	],
	"conAll": []
}
```

## Einsatzideen

- **Fernbedienung**: Schalter und Regler in einer Schaltung, die Anzeigen
  in einer anderen — sogar auf einem anderen Gerät im selben Netz.
- **Kabelsalat vermeiden**: Auch innerhalb einer Schaltung ersetzt ein
  Kanal lange Leitungen — wobei es dafür lokal auch die
  [Portale](../utility/portale.md) gibt, ganz ohne Server.
- **Chat und Spiele**: Zeichencodes aus einem
  [Text Input](../user-input/text-input.md) senden, drüben auf ein
  [Terminal Display](../display/terminal-display.md) schreiben — schon
  chatten zwei Browser miteinander.
- **Ein Statuswort für alles**: Acht Meldungen per
  [8bit to byte decoder](../converter/8bit-zu-byte.md) bündeln und als
  einzelnes Byte funken.

## Siehe auch

[Network Receiver](network-receiver.md) · [Portale](../utility/portale.md)
