# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checks that drive the demo's containers and database through the docker
CLI, so they run where the demo's docker daemon is reachable."""

import subprocess
import time

import pytest

from conftest import poll_until
from storefront import TELESCOPE_ID, add_to_cart, new_user_id, place_order

STOP_GRACE_SECONDS = 10


def _docker(*args, check=True):
    return subprocess.run(["docker", *args], capture_output=True, text=True, timeout=120, check=check)


def _health(container):
    return _docker("inspect", "-f", "{{.State.Health.Status}}", container).stdout.strip()


def _wait_healthy(container):
    poll_until(lambda: _health(container) == "healthy", f"{container} healthy", timeout=180)


def _restart(container):
    """Start a stopped container again and wait until orders go through, since
    the frontend and checkout reconnect to the new container on their own time."""
    _docker("start", container)
    _wait_healthy(container)
    poll_until(lambda: _place_order().status_code == 200, f"orders placed after restarting {container}", timeout=180)


def _psql(sql):
    return _docker(
        "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tA", "-F", "|", "-c", sql
    ).stdout.strip()


def _place_order():
    user_id = new_user_id("containers")
    add_to_cart(user_id)
    return place_order(user_id)


def _stop_and_time(container):
    started = time.monotonic()
    _docker("stop", "-t", str(STOP_GRACE_SECONDS), container)
    elapsed = time.monotonic() - started
    exit_code = int(_docker("inspect", "-f", "{{.State.ExitCode}}", container).stdout.strip())
    return elapsed, exit_code


@pytest.fixture
def email_stopped():
    _docker("stop", "email")
    yield
    _restart("email")


def test_order_completes_while_email_service_is_down(email_stopped):
    resp = _place_order()

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_checkout_stops_gracefully_on_sigterm():
    since = str(int(time.time()))
    try:
        elapsed, exit_code = _stop_and_time("checkout")
    finally:
        _restart("checkout")
    output = _docker("logs", "--since", since, "checkout")
    logs = output.stdout + output.stderr

    assert exit_code == 0, f"checkout exited with {exit_code} after {elapsed:.1f}s\n{logs[-2000:]}"
    assert elapsed < STOP_GRACE_SECONDS - 1, f"checkout took {elapsed:.1f}s to stop"


def test_currency_stops_gracefully_on_sigterm():
    since = str(int(time.time()))
    try:
        elapsed, exit_code = _stop_and_time("currency")
        output = _docker("logs", "--since", since, "currency")
        logs = output.stdout + output.stderr
    finally:
        _restart("currency")

    assert exit_code == 0, f"currency exited with {exit_code} after {elapsed:.1f}s"
    assert elapsed < STOP_GRACE_SECONDS - 1, f"currency took {elapsed:.1f}s to stop"
    assert "Received SIGTERM, shutting down Currency Server" in logs


def test_payment_is_healthy_and_charges_orders():
    assert _health("payment") == "healthy"

    resp = _place_order()

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_placed_order_is_written_to_accounting_tables():
    resp = _place_order()
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]

    poll_until(
        lambda: _psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id = '{order_id}'") == order_id,
        f"order {order_id} in accounting.order",
        timeout=60,
    )
    items = _psql(f"SELECT product_id, quantity FROM accounting.orderitem WHERE order_id = '{order_id}'")

    assert items == f"{TELESCOPE_ID}|1"


def test_accounting_keeps_shipping_cost_nanos():
    resp = _place_order()
    assert resp.status_code == 200, resp.text
    order = resp.json()
    order_id = order["orderId"]
    shipping_cost = order["shippingCost"]
    assert shipping_cost["nanos"] != 0

    row = poll_until(
        lambda: _psql(
            "SELECT shipping_cost_currency_code, shipping_cost_units, shipping_cost_nanos "
            f"FROM accounting.shipping WHERE order_id = '{order_id}'"
        ),
        f"shipping row for order {order_id}",
        timeout=60,
    )

    assert row == f"{shipping_cost['currencyCode']}|{shipping_cost['units']}|{shipping_cost['nanos']}"
