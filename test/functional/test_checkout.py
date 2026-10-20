# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The checkout order total, and publishing the order event off the request path."""

import time
from decimal import Decimal

import pytest
import requests

from backends import poll_until
from containers import json_logs_since, psql
from storefront import CLEANING_KIT, EXPLORASCOPE, as_decimal, order_total, place_order


def charged_amount(since):
    """The amount of the one charge payment logged since a timestamp."""
    def logged():
        records = [r for r in json_logs_since("payment", since) if r.get("msg") == "Transaction complete."]
        return records[-1] if records else None

    return poll_until(logged, "payment 'Transaction complete.' log", timeout=30, interval=2)["amount"]


def test_r8a_total_is_shipping_plus_price_times_quantity():
    since = time.time()
    order = place_order({CLEANING_KIT: 3, EXPLORASCOPE: 2}, currency="USD")
    amount = charged_amount(since)
    assert amount["currencyCode"] == "USD"
    assert as_decimal(amount) == order_total(order)


def test_r8c_multiply_carries_nanos_into_units():
    since = time.time()
    order = place_order({CLEANING_KIT: 10}, currency="USD")
    [line] = order["items"]
    assert line["item"]["quantity"] == 10
    amount = charged_amount(since)
    assert 0 <= int(amount["nanos"]) < 10**9
    assert as_decimal(amount) == as_decimal(order["shippingCost"]) + 10 * as_decimal(line["cost"])


def test_r8d_total_in_a_non_usd_currency():
    since = time.time()
    place_order({EXPLORASCOPE: 1}, currency="EUR")
    assert charged_amount(since)["currencyCode"] == "EUR"


def test_r9a_order_event_still_reaches_accounting():
    order = place_order({EXPLORASCOPE: 1})
    order_id = order["orderId"]
    poll_until(
        lambda: psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id = '{order_id}'"),
        f"accounting row for order {order_id}",
        timeout=30,
        interval=2,
    )


def checkout_goroutines(prometheus_url):
    resp = requests.get(
        f"{prometheus_url}/api/v1/query",
        params={"query": 'go_goroutine_count{service_name="checkout"}'},
        timeout=10,
    )
    resp.raise_for_status()
    return int(Decimal(resp.json()["data"]["result"][0]["value"][1]))


def sample_after(prometheus_url, since):
    """The checkout goroutine count from a Prometheus sample taken after `since`."""
    def fresh():
        resp = requests.get(
            f"{prometheus_url}/api/v1/query",
            params={"query": 'timestamp(go_goroutine_count{service_name="checkout"})'},
            timeout=10,
        )
        resp.raise_for_status()
        sampled_at = float(resp.json()["data"]["result"][0]["value"][1])
        return sampled_at > since and checkout_goroutines(prometheus_url)

    return poll_until(fresh, "a fresh checkout goroutine sample", timeout=120, interval=5)


@pytest.mark.timeout(400)
def test_background_publish_leaves_no_goroutine_per_order(prometheus_url):
    """Covers R9b and checkout-no-goroutine-leak."""
    baseline = sample_after(prometheus_url, time.time())
    for _ in range(30):
        place_order({EXPLORASCOPE: 1})
    time.sleep(60)
    after = sample_after(prometheus_url, time.time())
    assert after - baseline < 5, f"goroutines went from {baseline} to {after} after 30 orders"
