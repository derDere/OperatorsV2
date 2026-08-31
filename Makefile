# ==========================================================================
# Projekt-Makefile -- einziger Einstiegspunkt fuer alle Projektbefehle.
#
# Die Logik liegt in tools/*.py (Python ist ueberall vorhanden), damit jedes
# Target unter Windows-make, Linux und WSL identisch laeuft. Triviale Docker-
# Aufrufe stehen direkt im Target.
# ==========================================================================

.DEFAULT_GOAL := help

# Per Aufruf ueberschreibbar, z. B. `make wait TIMEOUT=300` oder `make logs SERVICE=web`.
TAIL ?= 200
TIMEOUT ?= 180

# Der Interpreter heisst nicht ueberall gleich: unter Windows und in vielen
# WSL-Umgebungen `python`, auf einem nackten Ubuntu/Debian nur `python3`. Ohne
# diese Erkennung scheitern die Targets auf einem Server, der kein `python`
# kennt. Ueberschreibbar: `make help PYTHON=/pfad/zu/python`.
PYTHON ?= $(shell command -v python 2>/dev/null || command -v python3 2>/dev/null)

# Container, den `server_refresh` anspricht. Im Betrieb laeuft der Dienst unter
# diesem Namen; lokal ggf. anders, dann: `make server_refresh CONTAINER=<name>`.
CONTAINER ?= operatorsv2

.PHONY: help start stop wait open logs server_refresh

help: ## Diese Befehlsuebersicht anzeigen
	$(PYTHON) tools/make_help.py

start: ## Stack hochfahren: .env sicherstellen, Image bauen, Container starten
	$(PYTHON) tools/ensure_env.py
	docker compose up -d --build

stop: ## Stack herunterfahren
	docker compose down

wait: ## Blockieren, bis alle Services betriebsbereit (gesund) sind
	$(PYTHON) tools/wait.py --timeout $(TIMEOUT)

open: ## Die laufende Anwendung im Browser oeffnen
	$(PYTHON) tools/open_app.py

logs: ## Service-Logs live mitverfolgen (SERVICE=<name> grenzt auf einen Service ein)
	docker compose logs -f --tail=$(TAIL) $(SERVICE)

server_refresh: ## Wiki-Suchindex des laufenden Servers neu aufbauen (ohne Neustart)
	$(PYTHON) tools/server_refresh.py --container $(CONTAINER) --timeout $(TIMEOUT)
