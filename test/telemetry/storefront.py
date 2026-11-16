# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Calls to the storefront API (through the frontend proxy) and to the flag
editor, shared by the behaviour tests."""

import datetime
import json
import secrets
import time
import uuid
from contextlib import contextmanager

import requests

from conftest import FRONTEND_PROXY_URL

FLAG_PROPAGATION_SECONDS = 6

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zipCode": "94043",
}
VALID_CARD = "4432-8015-6152-0454"
ORDER_EMAIL = "someone@example.com"
PAYMENT_DECLINED_MESSAGE = (
    "Your payment could not be processed. Please check your card details and try again."
)


def new_user_id():
    return f"telemetry-test-{uuid.uuid4()}"


def new_traceparent():
    """A W3C traceparent the frontend continues, and the trace id it carries."""
    trace_id = secrets.token_hex(16)
    return f"00-{trace_id}-{secrets.token_hex(8)}-01", trace_id


def checkout_body(user_id, card_number=VALID_CARD, currency="USD", expiration_year=None):
    return {
        "userId": user_id,
        "userCurrency": currency,
        "email": ORDER_EMAIL,
        "address": dict(ADDRESS),
        "creditCard": {
            "creditCardNumber": card_number,
            "creditCardCvv": 672,
            "creditCardExpirationYear": expiration_year
            or datetime.date.today().year + 1,
            "creditCardExpirationMonth": 1,
        },
    }


def add_to_cart(user_id, product_id="OLJCESPC7Z", quantity=1, headers=None):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        headers=headers,
        timeout=15,
    )
    resp.raise_for_status()
    return resp


def get_cart(user_id, currency="USD"):
    return requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": currency},
        timeout=15,
    )


def empty_cart(user_id):
    return requests.delete(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id},
        json={"userId": user_id},
        timeout=15,
    )


def checkout(body, currency="USD", headers=None, timeout=30):
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=body,
        headers=headers,
        timeout=timeout,
    )


def place_order(product_id="OLJCESPC7Z", card_number=VALID_CARD, currency="USD",
                expiration_year=None, traced=True):
    """Add one product to a fresh cart and check out. Returns the user id, the
    response and the trace id of the checkout request."""
    user_id = new_user_id()
    add_to_cart(user_id, product_id)
    traceparent, trace_id = new_traceparent()
    resp = checkout(
        checkout_body(user_id, card_number, currency, expiration_year),
        currency=currency,
        headers={"traceparent": traceparent} if traced else None,
    )
    return user_id, resp, trace_id


def cart_product_quantities(user_id):
    resp = get_cart(user_id)
    resp.raise_for_status()
    return {item["productId"]: item["quantity"] for item in resp.json().get("items", [])}


def read_flags():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10)
    resp.raise_for_status()
    return resp.json()


def write_flags(config):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": config}, timeout=10
    )
    resp.raise_for_status()


def set_flag(name, variant, wait=FLAG_PROPAGATION_SECONDS):
    config = read_flags()
    config["flags"][name]["defaultVariant"] = variant
    write_flags(config)
    time.sleep(wait)


def set_product_catalog_failure(variant, wait=FLAG_PROPAGATION_SECONDS):
    """productCatalogFailure targets OLJCESPC7Z through its targeting rule, which
    is what the flag UI flips."""
    config = read_flags()
    config["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(config)
    time.sleep(wait)


@contextmanager
def flag_variant(name, variant):
    set_flag(name, variant)
    try:
        yield
    finally:
        set_flag(name, "off")


def resolve_boolean_flag(flag_key):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/flagservice/flagd.evaluation.v1.Service/ResolveBoolean",
        json={"flagKey": flag_key, "context": {}},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def shipping_quote(quantity, product_id="OLJCESPC7Z", headers=None):
    return requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "currencyCode": "USD",
            "itemList": json.dumps([{"productId": product_id, "quantity": quantity}]),
            "address": json.dumps(ADDRESS),
        },
        headers=headers,
        timeout=20,
    )
