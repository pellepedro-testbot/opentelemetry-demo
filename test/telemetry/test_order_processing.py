# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Functional checks of what happens around an order: the accounting rows it
leaves in PostgreSQL, the services' log lines and checkout's shutdown. These
read the demo's containers through the docker CLI."""

import subprocess
import time
import uuid

import pytest
import requests

from storefront import (
    STOREFRONT_URL,
    add_to_cart,
    container_logs,
    delete_accounting_order,
    empty_cart,
    new_user_id,
    place_order,
    psql,
)


def _poll(fn, timeout=30, interval=1):
    deadline = time.monotonic() + timeout
    while True:
        result = fn()
        if result or time.monotonic() >= deadline:
            return result
        time.sleep(interval)


@pytest.fixture
def order():
    user_id = new_user_id("accounting")
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    resp = place_order(user_id)
    assert resp.status_code == 200, resp.text[:300]
    placed = resp.json()
    yield placed
    delete_accounting_order(placed["orderId"])


def _shipping_rows(order_id):
    return psql(
        "SELECT shipping_cost_currency_code, shipping_cost_units, shipping_cost_nanos "
        f"FROM accounting.shipping WHERE order_id = '{order_id}'"
    )


def test_order_is_consumed_by_accounting(order):
    rows = _poll(lambda: psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id = '{order['orderId']}'"))
    assert rows == [[order["orderId"]]]


def test_accounting_stores_shipping_cost_with_its_nanos(order):
    shipping = order["shippingCost"]
    assert shipping["nanos"] != 0, f"order shipping has no cents to check: {shipping}"

    rows = _poll(lambda: _shipping_rows(order["orderId"]))
    assert rows, "accounting stored no shipping row for the order"
    assert rows[0] == [shipping["currencyCode"], str(shipping["units"]), str(shipping["nanos"])]


def test_fraud_detection_logs_the_consumed_order_id(order):
    line = f"Consumed record with orderId: {order['orderId']}"
    found = _poll(lambda: line in container_logs("fraud-detection", since="2m"))
    assert found, f"no fraud-detection log line '{line}'"


def test_cart_add_item_log_records_user_and_product_in_their_own_fields():
    user_id = f"log-user-{uuid.uuid4()}"
    add_to_cart(user_id, "6E92ZMYYFZ", 1)
    try:
        expected = f"AddItemAsync called with userId={user_id}, productId=6E92ZMYYFZ, quantity=1"
        logs = _poll(lambda: [line for line in container_logs("cart", since="1m").splitlines() if user_id in line])
        assert any(expected in line for line in logs), f"AddItemAsync log lines for the user: {logs}"
    finally:
        empty_cart(user_id)


def _checkout_ready():
    user_id = new_user_id("after-restart")
    try:
        add_to_cart(user_id, "0PUK6V6EV0", 1)
        resp = place_order(user_id)
    except requests.RequestException:
        return None
    if resp.status_code != 200:
        empty_cart(user_id)
        return None
    return resp.json()


def test_checkout_stops_gracefully_on_sigterm():
    started = time.monotonic()
    subprocess.run(["docker", "stop", "-t", "10", "checkout"], check=True, capture_output=True, timeout=60)
    stop_seconds = time.monotonic() - started
    exit_code = subprocess.run(
        ["docker", "inspect", "-f", "{{.State.ExitCode}}", "checkout"],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    ).stdout.strip()
    subprocess.run(["docker", "start", "checkout"], check=True, capture_output=True, timeout=60)

    placed = _poll(_checkout_ready, timeout=90, interval=3)
    if placed:
        delete_accounting_order(placed["orderId"])

    assert exit_code == "0", f"checkout exited with {exit_code} after {stop_seconds:.1f}s"
    assert stop_seconds < 10, f"checkout took {stop_seconds:.1f}s to stop"
    assert placed, f"no order could be placed through {STOREFRONT_URL} after checkout restarted"
