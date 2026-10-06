#!/usr/bin/env bash
# Starts the OpenTelemetry Demo (Astronomy Shop) for Skyramp Testbot.
#
# Same service set as `make start-minimal-no-o11y`: compose.yaml + compose.extras.yaml,
# no Jaeger/Grafana/Prometheus/OpenSearch. Upstream images are pulled from ghcr.io;
# only services whose src/<service>/ the PR changes are rebuilt from source, so the
# running app reflects the PR without a full multi-language build.
#
# The built-in Locust load generator is started but does not autostart load, so it
# does not skew test results. Its UI is at http://localhost:8080/loadgen/.
set -euo pipefail
cd "$(dirname "$0")/.."

COMPOSE=(docker compose --env-file .env --env-file .env.override -f compose.yaml -f compose.extras.yaml)
export LOCUST_AUTOSTART=false

base_ref="origin/${GITHUB_BASE_REF:-main}"
changed=()
if git rev-parse --verify -q "$base_ref" >/dev/null; then
  services=$("${COMPOSE[@]}" config --services)
  # A change under pb/ (the shared protobufs) can affect every service.
  if git diff --name-only "$base_ref"...HEAD | grep -q '^pb/'; then
    while read -r s; do changed+=("$s"); done <<<"$services"
  else
    while read -r dir; do
      grep -qx "$dir" <<<"$services" && changed+=("$dir")
    done < <(git diff --name-only "$base_ref"...HEAD | awk -F/ '$1=="src"{print $2}' | sort -u)
  fi
fi

# Every service declares both image: and build:, so pull the published images
# explicitly; otherwise `up` builds all of them from source.
"${COMPOSE[@]}" pull --quiet
if ((${#changed[@]})); then
  echo "Building changed services from source: ${changed[*]}"
  "${COMPOSE[@]}" build "${changed[@]}"
fi
"${COMPOSE[@]}" up -d --no-build --force-recreate --remove-orphans

deadline=$(( $(date +%s) + 600 ))
until curl -sf http://localhost:8080/api/products >/dev/null; do
  if [[ $(date +%s) -ge $deadline ]]; then
    echo "ERROR: http://localhost:8080/api/products not ready after 600s" >&2
    "${COMPOSE[@]}" ps >&2
    exit 1
  fi
  sleep 5
done
echo "OpenTelemetry Demo is ready at http://localhost:8080"
