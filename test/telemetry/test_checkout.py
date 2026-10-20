# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Placing orders: card networks end to end, the order total, publishing and storing orders."""

import time
import uuid

import pytest

from conftest import find_trace, merged_attributes, otlp_attributes, poll_until
from docker_stack import container_logs, docker, psql, requires_docker
from storefront import (
    AMEX,
    JCB,
    VISA,
    add_to_cart,
    checkout,
    checkout_request,
    format_amount,
    money_to_nanos,
    new_user,
)

PRODUCT = "OLJCESPC7Z"
OTHER_PRODUCT = "66VCHSJNUP"


def place_order(card, items, currency="USD", address=None):
    user = new_user()
    for product, quantity in items:
        resp = add_to_cart(user, product, quantity)
        assert resp.status_code == 200, resp.text
    body = checkout_request(user, card, currency)
    if address:
        body["address"] = address
    return checkout(body, currency)


def stored_rows(order_id):
    return {
        "order": int(psql(f"SELECT count(*) FROM accounting.\"order\" WHERE order_id='{order_id}'")),
        "items": psql(
            "SELECT product_id, quantity, item_cost_units, item_cost_nanos FROM accounting.orderitem"
            f" WHERE order_id='{order_id}' ORDER BY product_id"
        ).splitlines(),
        "shipping": psql(
            f"SELECT shipping_tracking_id FROM accounting.shipping WHERE order_id='{order_id}'"
        ).splitlines(),
    }


def wait_until_stored(order_id):
    return poll_until(
        lambda: (rows := stored_rows(order_id))["order"] == 1 and rows,
        f"order {order_id} in the accounting database",
        timeout=60,
        interval=2,
    )


def charged_amount(jaeger_url, order_id):
    """The demo.payment.amount and currency of the charge in the order's checkout trace."""
    spans = poll_until(
        lambda: find_trace(
            jaeger_url,
            "checkout",
            lambda span: otlp_attributes(span.get("attributes")).get("demo.order.id") == order_id,
            num_traces=100,
        ),
        f"checkout trace for order {order_id}",
        timeout=60,
    )
    attrs = merged_attributes(spans)
    return attrs.get("demo.payment.amount"), attrs.get("demo.payment.currency")


def expected_total(order):
    nanos = money_to_nanos(order["shippingCost"])
    for item in order["items"]:
        nanos += money_to_nanos(item["cost"]) * item["item"]["quantity"]
    return format_amount(nanos)


def test_american_express_checkout_succeeds():
    resp = place_order(AMEX, [(PRODUCT, 1)])
    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_other_network_checkout_is_payment_failed():
    resp = place_order(JCB, [(PRODUCT, 1)])
    assert resp.status_code == 422, resp.text
    assert resp.json()["code"] == "PAYMENT_FAILED"


@requires_docker
def test_american_express_order_is_stored():
    resp = place_order(AMEX, [(PRODUCT, 1), (OTHER_PRODUCT, 2)])
    assert resp.status_code == 200, resp.text
    rows = wait_until_stored(resp.json()["orderId"])
    assert len(rows["items"]) == 2
    assert len(rows["shipping"]) == 1


def test_charged_total_is_shipping_plus_price_times_quantity(jaeger_url):
    resp = place_order(VISA, [(PRODUCT, 3)])
    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["items"][0]["cost"]["nanos"] != 0
    time.sleep(10)
    assert charged_amount(jaeger_url, order["orderId"]) == (expected_total(order), "USD")


def test_charged_total_carries_nanos_for_large_quantities(jaeger_url):
    resp = place_order(VISA, [(PRODUCT, 10), (OTHER_PRODUCT, 10)])
    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert [i["item"]["quantity"] for i in order["items"]] == [10, 10]
    time.sleep(10)
    assert charged_amount(jaeger_url, order["orderId"]) == (expected_total(order), "USD")


def test_order_in_euros(jaeger_url):
    resp = place_order(VISA, [(PRODUCT, 1)], currency="EUR")
    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["shippingCost"]["currencyCode"] == "EUR"
    assert {i["cost"]["currencyCode"] for i in order["items"]} == {"EUR"}
    time.sleep(10)
    assert charged_amount(jaeger_url, order["orderId"]) == (expected_total(order), "EUR")


@requires_docker
def test_placed_order_reaches_accounting():
    resp = place_order(VISA, [(PRODUCT, 1)])
    assert resp.status_code == 200, resp.text
    assert wait_until_stored(resp.json()["orderId"])["order"] == 1


@requires_docker
class TestOrderStorage:
    street = f"{uuid.uuid4().hex[:8]} Accounting Test Street"

    @pytest.fixture(scope="class")
    def order(self):
        address = {
            "streetAddress": self.street,
            "city": "Mountain View",
            "state": "CA",
            "country": "US",
            "zipCode": "94043",
        }
        resp = place_order(VISA, [(PRODUCT, 2), (OTHER_PRODUCT, 1)], address=address)
        assert resp.status_code == 200, resp.text
        return resp.json()

    def test_order_items_and_shipping_are_stored(self, order):
        rows = wait_until_stored(order["orderId"])
        expected_items = sorted(
            f"{i['item']['productId']}|{i['item']['quantity']}|{i['cost']['units']}|{i['cost']['nanos']}"
            for i in order["items"]
        )
        assert rows["items"] == expected_items
        assert rows["shipping"] == [order["shippingTrackingId"]]

    def test_log_lines_name_order_and_item_count(self, order):
        order_id = order["orderId"]
        wait_until_stored(order_id)
        logs = poll_until(
            lambda: (text := container_logs("accounting")) and f"Order {order_id} stored" in text and text,
            "accounting stored log line",
            timeout=30,
        )
        assert f"Order {order_id} received with 2 items." in logs
        assert f"Order {order_id} stored with 2 items." in logs
        assert self.street not in logs


@requires_docker
def test_checkout_does_not_wait_on_kafka():
    docker("pause", "kafka")
    try:
        started = time.monotonic()
        resp = place_order(VISA, [(PRODUCT, 1)])
        elapsed = time.monotonic() - started
    finally:
        docker("unpause", "kafka")
    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]
    assert elapsed < 5, elapsed
