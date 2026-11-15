# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Log records the order path writes to OpenSearch, checked for the order,
user and product they are about."""

import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import add_to_cart, new_user_id, place_order

PRODUCT_ID = "6E92ZMYYFZ"


def _ppl_rows(opensearch_url, query):
    resp = requests.post(
        f"{opensearch_url}/_plugins/_ppl",
        json={"query": query},
        headers={"Content-Type": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json().get("datarows", [])


def _placed_order():
    resp = place_order(PRODUCT_ID)
    assert resp.status_code == 200, resp.text[:300]
    return resp.json()


def test_order_confirmation_log_carries_order_id(opensearch_url):
    order_id = _placed_order()["orderId"]

    rows = poll_until(
        lambda: _ppl_rows(
            opensearch_url,
            "source=otel-logs-* | where `resource.service.name` = 'checkout'"
            f" and body = 'order confirmation email sent' and `attributes.demo.order.id` = '{order_id}'"
            " | fields body",
        ),
        f"checkout log 'order confirmation email sent' with demo.order.id {order_id}",
    )

    assert rows[0][0] == "order confirmation email sent"


def test_cart_add_item_log_fields_hold_user_and_product(opensearch_url):
    user_id = new_user_id("telemetry-log")
    add_to_cart(user_id, PRODUCT_ID)
    try:
        rows = poll_until(
            lambda: _ppl_rows(
                opensearch_url,
                "source=otel-logs-* | where eventName = 'cart.add_item'"
                f" and (`attributes.userId` = '{user_id}' or `attributes.productId` = '{user_id}')"
                " | fields `attributes.userId`, `attributes.productId`, `attributes.quantity`",
            ),
            f"cart.add_item log record for user {user_id}",
        )
    finally:
        requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)

    assert rows[0] == [user_id, PRODUCT_ID, 1]


def test_fraud_detection_logs_consumed_order_id(opensearch_url):
    order = _placed_order()
    order_id, tracking_id = order["orderId"], order["shippingTrackingId"]

    rows = poll_until(
        lambda: _ppl_rows(
            opensearch_url,
            "source=otel-logs-* | where `resource.service.name` = 'fraud-detection'"
            f" and (like(body, '%{order_id}%') or like(body, '%{tracking_id}%')) | fields body",
        ),
        f"fraud-detection log for order {order_id}",
    )

    assert rows[0][0].startswith(f"Consumed record with orderId: {order_id}, "), rows[0][0]
