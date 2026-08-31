"""Baut den Wiki-Suchindex des laufenden Servers neu auf.

Warum es das braucht: ``wiki/`` und ``www/`` sind Mounts. Aendert sich dort nur
Inhalt (auf dem Server zieht ein woechentliches Update das Repo per git pull),
sind die Seiten sofort abrufbar -- der Suchindex aber nicht. Er entsteht beim
Serverstart im Speicher, und weil sich am Image nichts geaendert hat, wird der
Container auch nicht ersetzt. Der Index bliebe also veraltet.

Dieses Werkzeug ruft darum die Route ``/admin/reindex`` des laufenden Servers
auf. Die ist absichtlich nur von INNERHALB des Containers ueber Loopback
erreichbar, deshalb der Weg ueber ``docker exec`` statt ueber einen Host-Port:
so braucht dieses Skript keine Kenntnis davon, wie der Container nach aussen
veroeffentlicht ist, und die Route bleibt von aussen verschlossen.

Es wird nicht nur ausgeloest, sondern auch nachgewiesen: die Antwort nennt die
Zahl der indexierten Seiten, und die wird gegen die Zahl der Markdown-Dateien
auf der Platte geprueft. Erst wenn beides zusammenpasst, gilt der Aufruf als
erfolgreich -- ein stiller Teilaufbau faellt damit auf.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
WIKI_DIR = REPO_ROOT / "wiki"
ADMIN_ROUTE = "/admin/reindex"


def _run(args: list[str], timeout: int | None = None) -> subprocess.CompletedProcess[str]:
    """Fuehrt ein Kommando aus, ohne bei Fehlercode zu werfen."""
    return subprocess.run(args, capture_output=True, text=True, timeout=timeout)


def container_running(container: str) -> bool:
    """Prueft, ob der Container existiert und laeuft."""
    result = _run(["docker", "inspect", "--format", "{{.State.Status}}", container])
    return result.returncode == 0 and result.stdout.strip() == "running"


def container_port(container: str, fallback: int = 8080) -> int:
    """Liest den Port aus der Umgebung des Containers (PORT), sonst fallback."""
    result = _run(["docker", "inspect", "--format", "{{json .Config.Env}}", container])
    if result.returncode != 0:
        return fallback
    try:
        for entry in json.loads(result.stdout):
            name, _, value = entry.partition("=")
            if name == "PORT" and value.isdigit():
                return int(value)
    except (ValueError, TypeError):
        pass
    return fallback


def markdown_page_count() -> int:
    """Zaehlt die Wiki-Seiten auf der Platte -- eine .md-Datei ist eine Seite."""
    if not WIKI_DIR.is_dir():
        return 0
    return sum(1 for _ in WIKI_DIR.rglob("*.md"))


def trigger_reindex(container: str, port: int, timeout: int) -> tuple[int, str]:
    """Ruft /admin/reindex im Container auf. Liefert (Exitcode, Ausgabe)."""
    url = f"http://127.0.0.1:{port}{ADMIN_ROUTE}"
    # Node bringt fetch mit; ein zusaetzliches Werkzeug im Image braucht es nicht.
    script = (
        f"fetch({url!r}, {{ method: 'POST' }})"
        ".then(async r => { console.log(await r.text());"
        " process.exit(r.ok ? 0 : 1) })"
        ".catch(e => { console.error(String(e)); process.exit(2) })"
    )
    try:
        result = _run(["docker", "exec", container, "node", "-e", script], timeout=timeout)
    except subprocess.TimeoutExpired:
        return 124, f"Zeitgrenze von {timeout}s ueberschritten."
    return result.returncode, (result.stdout + result.stderr).strip()


def refresh(container: str, timeout: int) -> int:
    """Loest den Neuaufbau aus und prueft das Ergebnis. 0 = erfolgreich."""
    if not container_running(container):
        print(
            f"Container '{container}' laeuft nicht -- kein Neuaufbau moeglich.\n"
            "Anderer Name? Dann: make server_refresh CONTAINER=<name>",
            file=sys.stderr,
        )
        return 1

    expected = markdown_page_count()
    port = container_port(container)
    code, output = trigger_reindex(container, port, timeout)

    if code != 0:
        print(f"Neuaufbau fehlgeschlagen (Exit {code}): {output}", file=sys.stderr)
        return 1

    try:
        answer = json.loads(output.splitlines()[-1])
    except (ValueError, IndexError):
        print(f"Unerwartete Antwort des Servers: {output!r}", file=sys.stderr)
        return 1

    if not answer.get("ok"):
        print(f"Server meldet Misserfolg: {answer.get('reason', output)}", file=sys.stderr)
        return 1

    pages = answer.get("pages")
    if expected and pages != expected:
        print(
            f"Index umfasst {pages} Seiten, auf der Platte liegen {expected}."
            " Der Aufbau ist unvollstaendig.",
            file=sys.stderr,
        )
        return 1

    print(f"Suchindex neu aufgebaut: {pages} Wiki-Seiten, {answer.get('files')} Indexdateien.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Baut den Wiki-Suchindex des laufenden Servers neu auf."
    )
    parser.add_argument(
        "--container",
        default="operatorsv2",
        help="Name des laufenden Containers (Vorgabe: operatorsv2).",
    )
    parser.add_argument(
        "--timeout", type=int, default=180, help="Maximale Wartezeit in Sekunden."
    )
    args = parser.parse_args()
    return refresh(args.container, args.timeout)


if __name__ == "__main__":
    raise SystemExit(main())
