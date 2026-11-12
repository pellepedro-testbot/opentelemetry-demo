# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront API, feature flag and Jaeger helpers shared by the shop API tests."""

import contextlib
import copy
import datetime
import json
import time
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, JAEGER_URL, poll_until

FLAG_READ_URL = f"{FRONTEND_PROXY_URL}/feature/api/read"
FLAG_WRITE_URL = f"{FRONTEND_PROXY_URL}/feature/api/write"

# flagd re-reads its file on change; give the services a moment to see a new value.
FLAG_PROPAGATION_SECONDS = 3

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zipCode": "94043",
}

VALID_CARD = "4432-8015-6152-0454"


def read_flags():
    resp = requests.get(FLAG_READ_URL, timeout=10)
    resp.raise_for_status()
    return resp.json()


def write_flags(data):
    resp = requests.post(FLAG_WRITE_URL, json={"data": data}, timeout=10)
    resp.raise_for_status()


def set_flag(name, variant):
    data = read_flags()
    data["flags"][name]["defaultVariant"] = variant
    write_flags(data)
    time.sleep(FLAG_PROPAGATION_SECONDS)


def set_product_catalog_failure(variant):
    """productCatalogFailure is toggled through its targeting rule, as the /feature UI does."""
    data = read_flags()
    data["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(data)
    time.sleep(FLAG_PROPAGATION_SECONDS)


@contextlib.contextmanager
def flag(name, variant):
    """Hold a flag at a variant for the duration of the block, then turn it off."""
    set_flag(name, variant)
    try:
        yield
    finally:
        set_flag(name, "off")


def new_user_id(prefix="telemetry-test"):
    return f"{prefix}-{uuid.uuid4()}"


def add_to_cart(user_id, product_id="0PUK6V6EV0", quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def get_cart(user_id):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": "USD"},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def cart_items(user_id):
    """The (productId, quantity) pairs in a user's cart."""
    return [(i["productId"], i["quantity"]) for i in get_cart(user_id).get("items", [])]


def empty_cart(user_id):
    return requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=15)


def order_body(user_id, email="telemetry-test@example.com", card_number=VALID_CARD,
               expiration_year=None, cvv=123):
    if expiration_year is None:
        expiration_year = datetime.date.today().year + 1
    return {
        "userId": user_id,
        "userCurrency": "USD",
        "address": dict(ADDRESS),
        "email": email,
        "creditCard": {
            "creditCardNumber": card_number,
            "creditCardCvv": cvv,
            "creditCardExpirationYear": expiration_year,
            "creditCardExpirationMonth": 1,
        },
    }


def place_order(user_id, headers=None, timeout=30, **body_args):
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=order_body(user_id, **body_args),
        headers=headers,
        timeout=timeout,
    )


def money_value(money):
    return money.get("units", 0) + money.get("nanos", 0) / 1e9


def find_order_trace(order_id, want_services=("checkout", "payment")):
    """Return the Jaeger trace holding the PlaceOrder span of order_id, once the
    spans of every service in want_services have arrived."""

    def fetch():
        resp = requests.get(
            f"{JAEGER_URL}/jaeger/ui/api/traces",
            params={
                "service": "checkout",
                "tags": json.dumps({"demo.order.id": order_id}),
                "lookback": "1h",
                "limit": 5,
            },
            timeout=15,
        )
        resp.raise_for_status()
        for found in resp.json().get("data") or []:
            full = requests.get(
                f"{JAEGER_URL}/jaeger/ui/api/traces/{found['traceID']}", timeout=15
            )
            full.raise_for_status()
            trace = (full.json().get("data") or [None])[0]
            if trace and set(want_services) <= {s["serviceName"] for s in trace["processes"].values()}:
                return trace
        return None

    return poll_until(fetch, f"trace of order {order_id} with spans from {want_services}", timeout=90)


def find_trace_by_user(user_id, want_services=("checkout", "payment")):
    """Return the Jaeger trace whose checkout PlaceOrder span carries user.id (for orders that failed)."""

    def fetch():
        resp = requests.get(
            f"{JAEGER_URL}/jaeger/ui/api/traces",
            params={
                "service": "checkout",
                "operation": "oteldemo.CheckoutService/PlaceOrder",
                "tags": json.dumps({"user.id": user_id}),
                "lookback": "1h",
                "limit": 5,
            },
            timeout=15,
        )
        resp.raise_for_status()
        for trace in resp.json().get("data") or []:
            if set(want_services) <= {s["serviceName"] for s in trace["processes"].values()}:
                return trace
        return None

    return poll_until(fetch, f"checkout trace of user {user_id}", timeout=90)


def spans(trace, service, operation):
    """The spans of one service and operation in a Jaeger trace, each with its tags as a dict."""
    found = []
    for span in trace["spans"]:
        if trace["processes"][span["processID"]]["serviceName"] != service:
            continue
        if span["operationName"] != operation:
            continue
        span = copy.copy(span)
        span["tagmap"] = {t["key"]: t["value"] for t in span["tags"]}
        found.append(span)
    return found


def one_span(trace, service, operation):
    found = spans(trace, service, operation)
    assert len(found) == 1, f"expected one {service} '{operation}' span, found {len(found)}"
    return found[0]
