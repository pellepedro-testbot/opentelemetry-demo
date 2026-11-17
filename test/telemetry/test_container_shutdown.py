# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Graceful shutdown of the services on SIGTERM / SIGINT while the demo keeps
running its load generator. Each test starts the container it stopped again.
"""

import re
import time

import pytest

from demo_stack import agent_page, agent_row, container_logs, docker, utc_now, wait_for_logs, wait_healthy


def _stop(container):
    """docker stop; returns (seconds taken, exit code)."""
    start = time.monotonic()
    docker("stop", container, timeout=60)
    elapsed = time.monotonic() - start
    exit_code = int(docker("inspect", "-f", "{{.State.ExitCode}}", container).stdout.strip())
    return elapsed, exit_code


def _restart_after(container, action):
    try:
        return action()
    finally:
        docker("start", container)
        wait_healthy(container)


def test_checkout_stops_cleanly():
    elapsed, exit_code = _restart_after("checkout", lambda: _stop("checkout"))
    assert exit_code == 0
    assert elapsed < 8


def test_checkout_stops_cleanly_under_load_repeatedly():
    results = [_restart_after("checkout", lambda: _stop("checkout")) for _ in range(3)]
    assert [code for _, code in results] == [0, 0, 0], results
    assert all(elapsed < 10 for elapsed, _ in results), results


def test_product_catalog_stops_cleanly():
    elapsed, exit_code = _restart_after("product-catalog", lambda: _stop("product-catalog"))
    assert exit_code == 0
    assert elapsed < 8


def test_product_catalog_registers_again_after_restart():
    restarted_at = utc_now()
    _restart_after("product-catalog", lambda: _stop("product-catalog"))

    def registered():
        row = agent_row("product-catalog")
        page = re.sub(r"<[^>]+>", " ", agent_page(row["instance_id"]))
        since = re.search(r"Up since:\s*(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d)", page)
        return row["health"] == "Up" and since and since.group(1) >= restarted_at.strftime("%Y-%m-%d %H:%M:%S")

    deadline = time.time() + 30
    while time.time() < deadline and not registered():
        time.sleep(2)
    assert registered()


def test_accounting_closes_consumer_on_stop():
    since = utc_now()
    _restart_after("accounting", lambda: _stop("accounting"))
    assert "Closing consumer" in container_logs("accounting", since)


@pytest.fixture(scope="module")
def currency_sigterm():
    since = utc_now()
    elapsed, exit_code = _restart_after("currency", lambda: _stop("currency"))
    return {"elapsed": elapsed, "exit_code": exit_code, "logs": container_logs("currency", since)}


def test_currency_logs_sigterm(currency_sigterm):
    assert "Received SIGTERM, shutting down Currency Server" in currency_sigterm["logs"]


def test_currency_exits_zero_on_sigterm(currency_sigterm):
    assert currency_sigterm["exit_code"] == 0


def test_currency_stops_before_docker_kill(currency_sigterm):
    assert currency_sigterm["elapsed"] < 9


def test_currency_shutdown_log_reaches_opensearch(currency_sigterm):
    # Currency records carry no timestamp, so they are matched by body only.
    records = wait_for_logs("Received SIGTERM, shutting down Currency Server", service="currency")
    assert "currency.server.stopping" in {r.get("eventName") for r in records}


@pytest.fixture(scope="module")
def currency_sigint():
    since = utc_now()

    def interrupt():
        docker("kill", "-s", "INT", "currency")
        deadline = time.time() + 15
        while time.time() < deadline:
            if docker("inspect", "-f", "{{.State.Running}}", "currency").stdout.strip() == "false":
                break
            time.sleep(0.5)
        return int(docker("inspect", "-f", "{{.State.ExitCode}}", "currency").stdout.strip())

    exit_code = _restart_after("currency", interrupt)
    return {"exit_code": exit_code, "logs": container_logs("currency", since)}


def test_currency_logs_sigint(currency_sigint):
    assert "Received SIGINT, shutting down Currency Server" in currency_sigint["logs"]


def test_currency_exits_zero_on_sigint(currency_sigint):
    assert currency_sigint["exit_code"] == 0
