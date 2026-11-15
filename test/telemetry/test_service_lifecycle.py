# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Service lifecycle on the running compose stack: shutdown on SIGTERM, startup
without VERSION, order consumption by accounting, and catalog lock contention.

These drive containers through the docker CLI, so they run from a host that
controls the demo's compose project rather than from the telemetry-tests image.
"""

import datetime
import shutil
import socket
import subprocess
import time
from pathlib import Path

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from flags import default_variant
from orders import place_order

pytestmark = pytest.mark.skipif(
    shutil.which("docker") is None, reason="needs the docker CLI of the host running the demo"
)

REPO_ROOT = Path(__file__).resolve().parents[2]
COMPOSE = [
    "docker", "compose",
    "--env-file", ".env", "--env-file", ".env.override",
    "-f", "compose.yaml", "-f", "compose.full.yaml",
    "-f", "compose.observability.yaml", "-f", "compose.extras.yaml",
]
NO_VERSION_CONTAINER = "currency-no-version-test"


def _run(args, check=True, timeout=120):
    return subprocess.run(
        args, cwd=REPO_ROOT, capture_output=True, text=True, check=check, timeout=timeout
    )


def _inspect(container, fmt):
    return _run(["docker", "inspect", "-f", fmt, container]).stdout.strip()


def _wait_running(container, timeout=180):
    def ready():
        state = _inspect(container, "{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}")
        return state in ("running", "running healthy")

    poll_until(ready, f"{container} running and healthy", timeout=timeout, interval=2)


def _stop_and_restart(service, timeout_seconds):
    """Stop a compose service with a kill timeout, then bring it back.
    Returns (elapsed seconds, exit code, logs since the stop)."""
    since = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    started = time.monotonic()
    try:
        _run(COMPOSE + ["stop", "-t", str(timeout_seconds), service], timeout=timeout_seconds + 60)
        elapsed = time.monotonic() - started
        exit_code = int(_inspect(service, "{{.State.ExitCode}}"))
        logs = _run(["docker", "logs", "--since", since, service]).stdout
        logs += _run(["docker", "logs", "--since", since, service]).stderr
    finally:
        _run(COMPOSE + ["start", service])
        _wait_running(service)
    return elapsed, exit_code, logs


def _opensearch_has_log(opensearch_url, service, body, since_iso):
    def find():
        r = requests.post(
            f"{opensearch_url}/otel-logs*/_search",
            json={
                "size": 1,
                "query": {
                    "bool": {
                        "must": [
                            {"match_phrase": {"resource.service.name": service}},
                            {"match_phrase": {"body": body}},
                            {"range": {"observedTimestamp": {"gte": since_iso}}},
                        ]
                    }
                },
            },
            timeout=15,
        )
        r.raise_for_status()
        return r.json()["hits"]["hits"]

    return poll_until(find, f"{service} log '{body}' in OpenSearch", timeout=90)


def test_checkout_stops_gracefully_on_sigterm(opensearch_url):
    since_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    elapsed, exit_code, _ = _stop_and_restart("checkout", 10)
    assert exit_code == 0, f"checkout exited {exit_code} after {elapsed:.1f}s (137 = SIGKILLed)"
    assert elapsed < 10, f"checkout took {elapsed:.1f}s to stop"
    _opensearch_has_log(opensearch_url, "checkout", "Checkout gRPC server stopped", since_iso)


def test_currency_stops_gracefully_on_sigterm():
    elapsed, exit_code, logs = _stop_and_restart("currency", 15)
    assert exit_code == 0, f"currency exited {exit_code} after {elapsed:.1f}s"
    assert elapsed < 15, f"currency took {elapsed:.1f}s to stop"
    assert "Received SIGTERM, shutting down Currency Server" in logs, logs[-2000:]


def test_accounting_stops_cleanly_on_sigterm():
    elapsed, exit_code, logs = _stop_and_restart("accounting", 10)
    assert exit_code == 0, f"accounting exited {exit_code} after {elapsed:.1f}s"
    assert elapsed < 10, f"accounting took {elapsed:.1f}s to stop"
    assert "Closing consumer" in logs, logs[-2000:]


def test_currency_starts_without_version_env():
    image = _inspect("currency", "{{.Config.Image}}")
    _run(["docker", "rm", "-f", NO_VERSION_CONTAINER], check=False)
    _run([
        "docker", "run", "-d", "--name", NO_VERSION_CONTAINER,
        "--network", "opentelemetry-demo",
        "-p", "127.0.0.1::7001",
        "-e", "CURRENCY_PORT=7001",
        "-e", "OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317",
        "-e", "OTEL_SERVICE_NAME=currency-no-version-test",
        image,
    ])
    try:
        time.sleep(10)
        state = _inspect(NO_VERSION_CONTAINER, "{{.State.Status}} {{.State.ExitCode}}")
        logs = _run(["docker", "logs", NO_VERSION_CONTAINER], check=False)
        assert state == "running 0", f"{state}: {logs.stdout[-1000:]}{logs.stderr[-1000:]}"

        port = _run(["docker", "port", NO_VERSION_CONTAINER, "7001/tcp"]).stdout.split()[0]
        host, _, number = port.rpartition(":")
        with socket.create_connection((host, int(number)), timeout=5):
            pass
    finally:
        _run(["docker", "rm", "-f", NO_VERSION_CONTAINER], check=False)


def test_placed_order_reaches_accounting_database():
    _, resp = place_order()
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]

    def stored():
        out = _run([
            "docker", "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db",
            "-tAc", f"select count(*) from accounting.\"order\" where order_id = '{order_id}'",
        ]).stdout.strip()
        return out == "1"

    poll_until(stored, f"order {order_id} in accounting.order", timeout=60, interval=2)


def _product_latency(timeout=40):
    started = time.monotonic()
    try:
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/products/OLJCESPC7Z",
            params={"currencyCode": "USD"},
            timeout=timeout,
        )
        return time.monotonic() - started, resp.status_code
    except requests.Timeout:
        return time.monotonic() - started, None


def test_lock_contention_holds_catalog_reads_and_recovers():
    baseline = max(_product_latency()[0] for _ in range(5))

    with default_variant("productCatalogLockContention", "on", settle=0):
        held = []
        deadline = time.monotonic() + 45
        while time.monotonic() < deadline:
            held.append(_product_latency())
            time.sleep(1)

    slowest = max(latency for latency, _ in held)
    assert slowest > max(2.0, baseline * 5), (
        f"no catalog read was held up while the lock was on (baseline {baseline:.2f}s, "
        f"slowest {slowest:.2f}s)"
    )

    # The loop only takes the lock every 10s and holds it for 30s.
    time.sleep(40)
    after = [_product_latency() for _ in range(5)]
    assert all(status == 200 for _, status in after), after
    assert max(latency for latency, _ in after) < max(2.0, baseline * 5), after
