#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose --env-file .env --env-file .env.override -f compose.yaml -f compose.extras.yaml down --volumes --remove-orphans
