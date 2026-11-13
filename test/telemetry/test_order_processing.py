# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Follows a placed order into checkout's logs and the Kafka consumers
(accounting's PostgreSQL tables, fraud-detection's logs)."""

import subprocess

import pytest
import requests

from conftest import poll_until
from storefront_api import (
    POSTGRES_CONTAINER,
    add_to_cart,
    empty_cart,
    new_user_id,
    place_order,
)

ORDER_TIMEOUT = 90


@pytest.fixture(scope="module")
def order():
    user_id = new_user_id()
    try:
        add_to_cart(user_id)
        resp = place_order(user_id)
        assert resp.status_code == 200, resp.text
        yield resp.json()
    finally:
        empty_cart(user_id)


def ppl(opensearch_url, query):
    resp = requests.post(
        f"{opensearch_url}/_plugins/_ppl",
        json={"query": query},
        headers={"Content-Type": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json().get("datarows", [])


def psql(query):
    out = subprocess.run(
        ["docker", "exec", POSTGRES_CONTAINER, "psql", "-U", "postgres", "-d", "astronomy_db", "-tA", "-F", "|", "-c", query],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    )
    return [line.split("|") for line in out.stdout.splitlines() if line]


def test_order_confirmation_log_carries_the_order_id(opensearch_url, order):
    order_id = order["orderId"]
    query = (
        "source=otel-logs-* | where resource.service.name = 'checkout' "
        f"and `attributes.demo.order.id` = '{order_id}' | fields body"
    )

    rows = poll_until(lambda: ppl(opensearch_url, query), f"checkout logs for order {order_id}", timeout=ORDER_TIMEOUT)

    assert ["order confirmation email sent"] in rows


def test_accounting_stores_the_shipping_cost_without_loss(order):
    order_id = order["orderId"]
    shipping = order["shippingCost"]
    assert int(shipping.get("nanos", 0)) != 0, "the order needs a shipping cost with cents"

    rows = poll_until(
        lambda: psql(
            "select shipping_cost_currency_code, shipping_cost_units, shipping_cost_nanos "
            f"from accounting.shipping where order_id = '{order_id}'"
        ),
        f"accounting.shipping row for order {order_id}",
        timeout=ORDER_TIMEOUT,
    )

    assert rows == [[shipping["currencyCode"], str(shipping["units"]), str(shipping["nanos"])]]


def test_accounting_stores_the_order_items_with_their_cost(order):
    order_id = order["orderId"]
    expected = sorted(
        [
            item["item"]["productId"],
            str(item["item"]["quantity"]),
            item["cost"]["currencyCode"],
            str(item["cost"]["units"]),
            str(item["cost"].get("nanos", 0)),
        ]
        for item in order["items"]
    )

    rows = poll_until(
        lambda: psql(
            "select product_id, quantity, item_cost_currency_code, item_cost_units, item_cost_nanos "
            f"from accounting.orderitem where order_id = '{order_id}'"
        ),
        f"accounting.orderitem rows for order {order_id}",
        timeout=ORDER_TIMEOUT,
    )

    assert sorted(rows) == expected


def test_fraud_detection_logs_the_consumed_order_id(opensearch_url, order):
    order_id = order["orderId"]
    query = (
        "source=otel-logs-* | where resource.service.name = 'fraud-detection' "
        f"and like(body, 'Consumed record with orderId: {order_id}%') | fields body"
    )

    poll_until(lambda: ppl(opensearch_url, query), f"fraud-detection log naming order {order_id}", timeout=ORDER_TIMEOUT)
