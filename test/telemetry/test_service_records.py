# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""What the services record about an order: their log lines and the accounting
database. Reads the containers through the docker CLI, so it runs on the host
that runs the demo."""

import os
import subprocess
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON, poll_until

POSTGRES_CONTAINER = os.environ.get("POSTGRES_HOST", "astronomy-db")
POSTGRES_DB = os.environ.get("POSTGRES_DB", "astronomy_db")
POSTGRES_USER = os.environ.get("POSTGRES_ASTRONOMY_USER", "astronomy_user")


def _container_logs(container, since):
    result = subprocess.run(
        ["docker", "logs", "--since", since, container],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    return result.stdout + result.stderr


def _add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    assert resp.status_code == 200, resp.text[:300]


def _checkout(user_id, credit_card=None):
    person = dict(PROBE_PERSON, userId=user_id)
    if credit_card:
        person["creditCard"] = dict(PROBE_PERSON["creditCard"], **credit_card)
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=person,
        timeout=30,
    )


def test_cart_add_item_log_names_user_and_product():
    user_id = f"records-{uuid.uuid4()}"

    _add_to_cart(user_id, "L9ECAV7KIM")

    expected = f"AddItemAsync called with userId={user_id}, productId=L9ECAV7KIM, quantity=1"
    poll_until(
        lambda: expected in _container_logs("cart", "120s"),
        f"cart log line '{expected}'",
        timeout=30,
        interval=2,
    )


def test_accounting_stores_the_order_shipping_cost_with_its_cents():
    user_id = f"records-{uuid.uuid4()}"
    _add_to_cart(user_id, "0PUK6V6EV0", 2)
    _add_to_cart(user_id, "66VCHSJNUP", 1)
    resp = _checkout(user_id)
    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    shipping = order["shippingCost"]
    assert shipping.get("nanos", 0) != 0, f"pick a cart whose shipping has cents, got {shipping}"

    def stored_row():
        result = subprocess.run(
            [
                "docker", "exec", POSTGRES_CONTAINER,
                "psql", "-U", POSTGRES_USER, "-d", POSTGRES_DB, "-At", "-F", ",",
                "-c",
                "SELECT shipping_cost_units, shipping_cost_nanos FROM accounting.shipping "
                f"WHERE order_id = '{order['orderId']}'",
            ],
            capture_output=True,
            text=True,
            timeout=30,
            check=True,
        )
        return result.stdout.strip()

    row = poll_until(stored_row, f"accounting.shipping row for order {order['orderId']}", timeout=60, interval=2)
    units, nanos = (int(value) for value in row.split(","))
    assert (units, nanos) == (shipping["units"], shipping.get("nanos", 0))


def test_fraud_detection_logs_the_consumed_order_id():
    user_id = f"records-{uuid.uuid4()}"
    _add_to_cart(user_id, "0PUK6V6EV0")
    resp = _checkout(user_id)
    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()

    expected = f"Consumed record with orderId: {order['orderId']},"
    poll_until(
        lambda: expected in _container_logs("fraud-detection", "120s"),
        f"fraud-detection log line '{expected}' (shippingTrackingId {order['shippingTrackingId']})",
        timeout=60,
        interval=2,
    )
