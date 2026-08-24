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

.PHONY: help start stop wait open logs

help: ## Diese Befehlsuebersicht anzeigen
	python tools/make_help.py

start: ## Stack hochfahren: .env sicherstellen, Image bauen, Container starten
	python tools/ensure_env.py
	docker compose up -d --build

stop: ## Stack herunterfahren
	docker compose down

wait: ## Blockieren, bis alle Services betriebsbereit (gesund) sind
	python tools/wait.py --timeout $(TIMEOUT)

open: ## Die laufende Anwendung im Browser oeffnen
	python tools/open_app.py

logs: ## Service-Logs live mitverfolgen (SERVICE=<name> grenzt auf einen Service ein)
	docker compose logs -f --tail=$(TAIL) $(SERVICE)
