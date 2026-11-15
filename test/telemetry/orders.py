# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Place storefront orders through the frontend proxy and find their spans in Jaeger."""

import copy
import datetime
import json
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, JAEGER_URL, PROBE_PERSON, poll_until

PAYMENT_DECLINED_MESSAGE = (
    "Your payment could not be processed. Please check your card details and try again."
)
GENERIC_FAILURE_MESSAGE = "Failed to place order."


def new_user_id(prefix="telemetry-test"):
    return f"{prefix}-{uuid.uuid4()}"


def add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    resp.raise_for_status()


def get_cart(user_id):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": "USD"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def empty_cart(user_id, timeout=10):
    return requests.delete(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id},
        timeout=timeout,
    )


def checkout_body(user_id, card_number=None, expiration_year=None, email=None):
    person = copy.deepcopy(PROBE_PERSON)
    person["userId"] = user_id
    card = person["creditCard"]
    if card_number is not None:
        card["creditCardNumber"] = card_number
    card["creditCardExpirationYear"] = (
        expiration_year if expiration_year is not None else datetime.date.today().year + 1
    )
    if email is not None:
        person["email"] = email
    return person


def checkout(user_id, headers=None, **card):
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=checkout_body(user_id, **card),
        headers=headers or {},
        timeout=30,
    )


def place_order(product_id="0PUK6V6EV0", quantity=1, headers=None, **card):
    """Fill a fresh cart and check it out. Returns (user_id, response)."""
    user_id = new_user_id()
    add_to_cart(user_id, product_id, quantity)
    return user_id, checkout(user_id, headers=headers, **card)


def money(value):
    return int(value.get("units", 0) or 0) + int(value.get("nanos", 0) or 0) / 1e9


def order_total(order):
    """Items cost times quantity plus shipping, as the order response states them."""
    items = sum(money(i["cost"]) * i["item"]["quantity"] for i in order["items"])
    return items + money(order["shippingCost"])


def _tags(span):
    return {t["key"]: t["value"] for t in span.get("tags", [])}


def find_spans(user_id, predicate=None, timeout=120):
    """Wait for the checkout trace carrying user.id and return its spans as dicts
    with service, operation, tags and the raw span."""

    def fetch():
        resp = requests.get(
            f"{JAEGER_URL}/jaeger/ui/api/traces",
            params={
                "service": "checkout",
                "tags": json.dumps({"user.id": user_id}),
                "lookback": "1h",
                "limit": 5,
            },
            timeout=15,
        )
        resp.raise_for_status()
        spans = []
        for trace in resp.json().get("data") or []:
            for span in trace["spans"]:
                spans.append(
                    {
                        "service": trace["processes"][span["processID"]]["serviceName"],
                        "operation": span["operationName"],
                        "tags": _tags(span),
                        "span": span,
                    }
                )
        if not spans:
            return None
        if predicate and not predicate(spans):
            return None
        return spans

    return poll_until(fetch, f"checkout trace for user.id={user_id} in Jaeger", timeout=timeout)


def span_of(spans, service, operation):
    """The span a service recorded for an operation (the client span of the same
    name belongs to the caller's service)."""
    matches = [s for s in spans if s["service"] == service and s["operation"] == operation]
    assert matches, (
        f"no {service} span named {operation}; spans seen: "
        f"{sorted({(s['service'], s['operation']) for s in spans})}"
    )
    return matches[0]


def has_spans(*wanted):
    """Predicate for find_spans: every (service, operation) pair is present."""

    def check(spans):
        seen = {(s["service"], s["operation"]) for s in spans}
        return all(w in seen for w in wanted)

    return check
