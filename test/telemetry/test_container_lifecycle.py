# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Service lifecycle and database checks that need the Docker CLI and socket:
graceful SIGTERM shutdown, accounting's stored orders, the lock contention
scenario and the containers the demo runs."""

import datetime
import shutil
import subprocess
import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import flag_variant, order_with_items

pytestmark = pytest.mark.skipif(
    shutil.which("docker") is None, reason="needs the Docker CLI and socket"
)


def docker(*args, timeout=120):
    return subprocess.run(
        ["docker", *args], capture_output=True, text=True, timeout=timeout, check=False
    )


def psql(sql):
    result = docker(
        "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", sql
    )
    assert result.returncode == 0, result.stderr
    return result.stdout.strip()


def wait_until_running(container):
    def ready():
        state = docker(
            "inspect", container, "--format",
            "{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}",
        ).stdout.split()
        return state and state[0] == "running" and state[1] in ("healthy", "none")

    poll_until(ready, f"{container} running and healthy", timeout=180)


def stop_and_restart(container, stop_timeout):
    """docker stop the container, then start it again. Returns (exit code, logs)."""
    since = docker("inspect", container, "--format", "{{.State.StartedAt}}").stdout.strip()
    started = time.monotonic()
    stopped = docker("stop", "-t", str(stop_timeout), container, timeout=stop_timeout + 60)
    elapsed = time.monotonic() - started
    try:
        assert stopped.returncode == 0, stopped.stderr
        exit_code = int(docker("inspect", container, "--format", "{{.State.ExitCode}}").stdout.strip())
        logs = docker("logs", "--since", since, container)
        return exit_code, logs.stdout + logs.stderr, elapsed
    finally:
        docker("start", container)
        wait_until_running(container)


def _checkout_stopped_logs(opensearch_url, since):
    query = {
        "query": {
            "bool": {
                "must": [
                    {"term": {"resource.service.name.keyword": "checkout"}},
                    {"match_phrase": {"body": "Checkout gRPC server stopped"}},
                    {"range": {"@timestamp": {"gte": since}}},
                ]
            }
        }
    }
    resp = requests.post(f"{opensearch_url}/otel-logs-*/_count", json=query, timeout=10)
    resp.raise_for_status()
    return resp.json()["count"]


def test_checkout_shuts_down_gracefully_on_sigterm(opensearch_url):
    since = datetime.datetime.now(datetime.timezone.utc).isoformat()
    exit_code, logs, elapsed = stop_and_restart("checkout", 10)
    assert exit_code == 0, logs[-2000:]
    assert elapsed < 10
    # checkout writes its logs over OTLP only, so the shutdown log is read from OpenSearch.
    poll_until(
        lambda: _checkout_stopped_logs(opensearch_url, since) > 0,
        "checkout log 'Checkout gRPC server stopped' in OpenSearch",
    )

    def order_placed():
        _, resp = order_with_items([("0PUK6V6EV0", 1)])
        return resp.status_code == 200

    poll_until(order_placed, "an order placed after checkout restarted", timeout=120)


def test_currency_shuts_down_gracefully_on_sigterm():
    exit_code, logs, elapsed = stop_and_restart("currency", 15)
    assert exit_code == 0, logs[-2000:]
    assert elapsed < 15
    assert "Received SIGTERM, shutting down Currency Server" in logs
    poll_until(
        lambda: requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10).status_code == 200,
        "GET /api/currency answers 200 after currency restarted",
        timeout=120,
    )


def test_accounting_closes_its_consumer_on_sigterm():
    exit_code, logs, elapsed = stop_and_restart("accounting", 15)
    assert exit_code == 0, logs[-2000:]
    assert elapsed < 15
    assert "Closing consumer" in logs


def test_accounting_stores_placed_orders():
    _, resp = order_with_items([("0PUK6V6EV0", 1)])
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]
    poll_until(
        lambda: psql(f"select count(*) from accounting.\"order\" where order_id='{order_id}'") == "1",
        f"accounting row for order {order_id}",
        timeout=30,
        interval=2,
    )


def test_payment_is_healthy_and_charges_orders():
    health = docker("inspect", "payment", "--format", "{{.State.Health.Status}}").stdout.strip()
    assert health == "healthy"
    _, resp = order_with_items([("0PUK6V6EV0", 1)])
    assert resp.status_code == 200, resp.text


def _products():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=30)
    assert resp.status_code == 200, resp.text
    return sorted(product["id"] for product in resp.json())


def _products_lock_count():
    return psql(
        "select count(*) from pg_locks l join pg_class c on c.oid = l.relation "
        "where c.relname = 'products' and l.mode = 'AccessExclusiveLock' and l.granted"
    )


def test_lock_contention_flag_locks_and_releases_products_table():
    before = _products()
    with flag_variant("productCatalogLockContention", "on"):
        poll_until(lambda: _products_lock_count() == "1", "AccessExclusiveLock on products", timeout=15, interval=1)
    poll_until(lambda: _products_lock_count() == "0", "products lock released", timeout=35, interval=1)

    started = time.monotonic()
    after = _products()
    assert time.monotonic() - started < 2
    assert after == before


def test_removed_components_are_not_running():
    names = docker("ps", "-a", "--format", "{{.Names}}").stdout.split()
    assert names, "docker ps listed no containers"
    for removed in ("product-reviews", "llm", "tracetest", "tracetest-server"):
        assert removed not in names
