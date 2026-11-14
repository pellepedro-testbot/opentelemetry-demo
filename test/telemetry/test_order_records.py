# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import os
import uuid

import pg8000.native
import pytest
import requests

from conftest import OPENSEARCH_URL, add_to_cart, empty_cart, place_order, poll_until

PRODUCT_ID = "OLJCESPC7Z"
RECORD_TIMEOUT = 120


def opensearch_logs(query, size=20):
    resp = requests.post(
        f"{OPENSEARCH_URL}/otel-logs-*/_search",
        json={"size": size, "query": query},
        timeout=10,
    )
    resp.raise_for_status()
    return [hit["_source"] for hit in resp.json()["hits"]["hits"]]


def _service(name):
    return {"match_phrase": {"resource.service.name": name}}


def _phrase(field, text):
    return {"match_phrase": {field: text}}


@pytest.fixture(scope="module")
def order():
    user = f"telemetry-order-{uuid.uuid4()}"
    add_to_cart(user, PRODUCT_ID)
    resp = place_order(user, "USD")
    empty_cart(user)
    assert resp.status_code == 200, resp.text
    return resp.json()


def test_order_confirmation_log_carries_the_order_id(order):
    def find():
        return opensearch_logs({
            "bool": {
                "must": [
                    _service("checkout"),
                    _phrase("body", "order confirmation email sent"),
                    _phrase("attributes.demo.order.id", order["orderId"]),
                ]
            }
        })

    records = poll_until(find, f"checkout 'order confirmation email sent' log for {order['orderId']}", RECORD_TIMEOUT)
    assert records[0]["attributes"]["demo.order.id"] == order["orderId"]


def test_cart_add_item_log_fields_hold_user_and_product():
    user = f"telemetry-cart-log-{uuid.uuid4()}"
    add_to_cart(user, PRODUCT_ID)
    empty_cart(user)

    def find():
        return opensearch_logs({
            "bool": {
                "must": [_service("cart"), _phrase("eventName", "cart.add_item")],
                "should": [_phrase("attributes.userId", user), _phrase("attributes.productId", user)],
                "minimum_should_match": 1,
            }
        })

    records = poll_until(find, f"cart.add_item log for {user}", RECORD_TIMEOUT)
    assert records[0]["attributes"]["userId"] == user
    assert records[0]["attributes"]["productId"] == PRODUCT_ID


def test_accounting_stores_the_full_shipping_cost(order):
    shipping_cost = order["shippingCost"]
    assert shipping_cost["nanos"] != 0

    conn = pg8000.native.Connection(
        user="postgres",
        password=os.environ["POSTGRES_PASSWORD"],
        host=os.environ.get("POSTGRES_HOST", "astronomy-db"),
        port=int(os.environ.get("POSTGRES_PORT", "5432")),
        database="astronomy_db",
    )
    try:
        def find():
            return conn.run(
                "SELECT shipping_cost_currency_code, shipping_cost_units, shipping_cost_nanos "
                "FROM accounting.shipping WHERE order_id = :order_id",
                order_id=order["orderId"],
            )

        rows = poll_until(find, f"accounting.shipping row for {order['orderId']}", RECORD_TIMEOUT)
    finally:
        conn.close()

    assert rows == [[shipping_cost["currencyCode"], int(shipping_cost["units"]), int(shipping_cost["nanos"])]]


def test_fraud_detection_logs_the_consumed_order_id(order):
    def find():
        return opensearch_logs({
            "bool": {
                "must": [_service("fraud-detection"), _phrase("body", "Consumed record with orderId")],
                "should": [
                    _phrase("body", order["orderId"]),
                    _phrase("body", order["shippingTrackingId"]),
                ],
                "minimum_should_match": 1,
            }
        })

    records = poll_until(find, f"fraud-detection record for order {order['orderId']}", RECORD_TIMEOUT)
    assert records[0]["body"].startswith(f"Consumed record with orderId: {order['orderId']},")
