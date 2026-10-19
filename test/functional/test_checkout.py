# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checkout totals and the accounting service's storage of placed orders."""

import subprocess
import time

import pytest

from astronomy_db import psql
from collector_spans import CollectorLog, trace_spans
from storefront_api import CHECKOUT_ADDRESS, add_to_cart, checkout, money_value, new_user_id

TELESCOPE = "66VCHSJNUP"
EXPLORASCOPE = "OLJCESPC7Z"
VISA = "4111111111111111"
ORDER_ATTEMPTS = 3


def place_order(currency, lines):
    user = new_user_id()
    for product_id, quantity in lines.items():
        assert add_to_cart(user, product_id, quantity).status_code == 200
    resp = checkout(user, VISA, currency=currency)
    assert resp.status_code == 200, resp.text
    return resp.json()


def expected_total(order, lines):
    total = money_value(order["shippingCost"])
    for item in order["items"]:
        total += money_value(item["cost"]) * lines[item["item"]["productId"]]
    return total


def traced_order(currency, lines):
    """An order and the spans of its checkout trace; the order is placed again when the
    collector log lost the trace's spans while rotating."""
    for _ in range(ORDER_ATTEMPTS):
        with CollectorLog() as log:
            order = place_order(currency, lines)
            place = log.wait_for_spans(
                lambda s: s.attributes.get("demo.order.id") == order["orderId"] and "demo.order.amount" in s.attributes
            )
            if not place:
                continue
            trace_id = place[0].trace_id
            if log.wait_for_spans(lambda s: s.trace_id == trace_id and "demo.payment.currency" in s.attributes, timeout=20):
                return order, place[0], trace_spans(log, trace_id)
    pytest.fail(f"no complete checkout trace was exported in {ORDER_ATTEMPTS} attempts")


@pytest.mark.parametrize("currency", ["USD", "EUR"])
def test_checkout_total_is_shipping_plus_items(currency):
    """R6a, R6b"""
    lines = {TELESCOPE: 3, EXPLORASCOPE: 2}
    order, place, spans = traced_order(currency, lines)
    assert order["shippingCost"]["currencyCode"] == currency
    assert float(place.attributes["demo.order.amount"]) == pytest.approx(expected_total(order, lines), abs=0.01)
    assert {s.attributes["demo.payment.currency"] for s in spans if "demo.payment.currency" in s.attributes} == {currency}


@pytest.fixture(scope="module")
def stored_order():
    lines = {TELESCOPE: 3, EXPLORASCOPE: 2}
    order = place_order("USD", lines)
    order_id = order["orderId"]
    deadline = time.time() + 30
    while time.time() < deadline:
        if psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id='{order_id}'"):
            break
        time.sleep(2)
    return order, lines


def test_order_stored_with_items_and_shipping(stored_order):
    """R7a"""
    order, lines = stored_order
    order_id = order["orderId"]
    assert psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id='{order_id}'") == [[order_id]]

    items = psql(
        "SELECT product_id, quantity, item_cost_currency_code, item_cost_units, item_cost_nanos "
        f"FROM accounting.orderitem WHERE order_id='{order_id}' ORDER BY product_id"
    )
    costs = {i["item"]["productId"]: i["cost"] for i in order["items"]}
    assert [row[:2] for row in items] == sorted([pid, str(q)] for pid, q in lines.items())
    for product_id, _, code, units, nanos in items:
        assert [code, int(units), int(nanos)] == [
            costs[product_id]["currencyCode"],
            int(costs[product_id]["units"]),
            int(costs[product_id]["nanos"]),
        ]

    shipping = psql(
        "SELECT shipping_tracking_id, street_address, city, state, country, zip_code "
        f"FROM accounting.shipping WHERE order_id='{order_id}'"
    )
    assert shipping == [
        [
            order["shippingTrackingId"],
            CHECKOUT_ADDRESS["streetAddress"],
            CHECKOUT_ADDRESS["city"],
            CHECKOUT_ADDRESS["state"],
            CHECKOUT_ADDRESS["country"],
            CHECKOUT_ADDRESS["zipCode"],
        ]
    ]


def test_accounting_logs_order_id_and_item_count(stored_order):
    """R7b"""
    order, _ = stored_order
    order_id = order["orderId"]
    logs = subprocess.run(
        ["docker", "logs", "--since", "5m", "accounting"], capture_output=True, text=True, timeout=30
    )
    text = logs.stdout + logs.stderr
    assert f"Order {order_id} received with 2 items." in text
    assert f"Order {order_id} stored with 2 items." in text
    order_lines = [line for line in text.splitlines() if order_id in line]
    assert not any(CHECKOUT_ADDRESS["streetAddress"] in line or TELESCOPE in line for line in order_lines), order_lines
