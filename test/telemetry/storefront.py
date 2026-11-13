# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Helpers for tests that drive the storefront API and the flagd-ui flag API
through the frontend proxy, and read the resulting traces back from Jaeger."""

import contextlib
import datetime
import json
import re
import time
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, JAEGER_URL

FLAGD_READ_URL = f"{FRONTEND_PROXY_URL}/feature/api/read"
FLAGD_WRITE_URL = f"{FRONTEND_PROXY_URL}/feature/api/write"

# Seconds flagd needs to pick up a flag file written through flagd-ui.
FLAG_RELOAD_SECONDS = 4

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zipCode": "94043",
}

PAYMENT_DECLINED_MESSAGE = (
    "Your payment could not be processed. Please check your card details and try again."
)


def read_flags():
    resp = requests.get(FLAGD_READ_URL, timeout=10)
    resp.raise_for_status()
    return resp.json()


def write_flags(body):
    resp = requests.post(FLAGD_WRITE_URL, json={"data": body}, timeout=10)
    resp.raise_for_status()


def set_default_variant(flag, variant):
    body = read_flags()
    body["flags"][flag]["defaultVariant"] = variant
    write_flags(body)


def set_product_catalog_failure(variant):
    """productCatalogFailure targets one product through its targeting rule, so
    its on/off state lives in the rule's true branch, not in defaultVariant."""
    body = read_flags()
    body["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(body)


@contextlib.contextmanager
def flag_variant(flag, variant, resting="off"):
    """Set a flag's defaultVariant for the duration of the block, then put it back."""
    set_default_variant(flag, variant)
    time.sleep(FLAG_RELOAD_SECONDS)
    try:
        yield
    finally:
        set_default_variant(flag, resting)
        time.sleep(FLAG_RELOAD_SECONDS)


@contextlib.contextmanager
def product_catalog_failure_on():
    set_product_catalog_failure("on")
    time.sleep(FLAG_RELOAD_SECONDS)
    try:
        yield
    finally:
        set_product_catalog_failure("off")
        time.sleep(FLAG_RELOAD_SECONDS)


def new_user_id():
    return str(uuid.uuid4())


def add_to_cart(user_id, product_id, quantity=1, headers=None):
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


def empty_cart(user_id, timeout=30):
    return requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=timeout)


def checkout_body(
    user_id,
    card_number="4432-8015-6152-0454",
    expiration_year=None,
    email="someone@example.com",
):
    if expiration_year is None:
        expiration_year = datetime.date.today().year + 1
    return {
        "userId": user_id,
        "userCurrency": "USD",
        "email": email,
        "address": dict(ADDRESS),
        "creditCard": {
            "creditCardNumber": card_number,
            "creditCardCvv": 672,
            "creditCardExpirationYear": expiration_year,
            "creditCardExpirationMonth": 1,
        },
    }


def place_order(body, headers=None):
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=body,
        headers=headers,
        timeout=30,
    )


def order_with_items(items, **body_args):
    """Fill a fresh cart with (product_id, quantity) pairs and check it out."""
    user_id = new_user_id()
    for product_id, quantity in items:
        add_to_cart(user_id, product_id, quantity)
    body = checkout_body(user_id, **body_args)
    return user_id, place_order(body)


def jaeger_traces(service, operation=None, lookback="10m", limit=100, tags=None):
    params = {"service": service, "lookback": lookback, "limit": limit}
    if operation:
        params["operation"] = operation
    if tags:
        params["tags"] = json.dumps(tags)
    resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces", params=params, timeout=15)
    resp.raise_for_status()
    return resp.json().get("data") or []


def span_tags(span):
    return {tag["key"]: tag["value"] for tag in span.get("tags", [])}


def spans_of(trace, service, operation=None):
    """Spans of one service in a Jaeger trace, as (operationName, tags) pairs."""
    found = []
    for span in trace.get("spans", []):
        if trace["processes"][span["processID"]]["serviceName"] != service:
            continue
        if operation and span["operationName"] != operation:
            continue
        found.append((span["operationName"], span_tags(span)))
    return found


def trace_with_tag(service, key, value, lookback="10m"):
    """The first Jaeger trace of a service holding a span tagged key=value."""
    for trace in jaeger_traces(service, lookback=lookback, tags={key: value}):
        return trace
    return None


def money_value(money):
    return money.get("units", 0) + money.get("nanos", 0) / 1e9


def opamp_agents():
    """Rows of the OpAMP admin UI agent table as {name: health}."""
    resp = requests.get(f"{FRONTEND_PROXY_URL}/opamp/", timeout=10)
    resp.raise_for_status()
    agents = {}
    for row in re.findall(r"<tr>(.*?)</tr>", resp.text, re.S):
        # Each data row is <td>name</td><td>version</td><td>health</td>...
        cells = [re.sub(r"<[^>]+>", "", cell).strip() for cell in re.findall(r"<td>(.*?)</td>", row, re.S)]
        if len(cells) >= 3:
            agents[cells[0]] = cells[2]
    return agents


def reset_flags():
    """Put every flag back to its resting 'off' variant."""
    body = read_flags()
    for flag in body["flags"].values():
        if "off" in flag.get("variants", {}):
            flag["defaultVariant"] = "off"
    body["flags"]["productCatalogFailure"]["targeting"]["if"][1] = "off"
    write_flags(body)


if __name__ == "__main__":
    reset_flags()
