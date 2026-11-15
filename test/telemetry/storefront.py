# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Calls to the storefront HTTP API (through the frontend proxy) shared by the
tests that place orders."""

import copy
import json
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON

SHIPPING_ADDRESS = PROBE_PERSON["address"]


def new_user_id(prefix="telemetry-test"):
    return f"{prefix}-{uuid.uuid4()}"


def add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    resp.raise_for_status()
    return resp


def checkout(user_id, currency="USD", credit_card=None):
    """POST /api/checkout for the user's cart; returns the raw response."""
    body = copy.deepcopy(PROBE_PERSON)
    body["userId"] = user_id
    body["userCurrency"] = currency
    if credit_card:
        body["creditCard"].update(credit_card)
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=body,
        timeout=30,
    )


def place_order(product_id, quantity=1, currency="USD", credit_card=None, prefix="telemetry-test"):
    """Fill a fresh cart with one product and check it out; returns the response."""
    user_id = new_user_id(prefix)
    add_to_cart(user_id, product_id, quantity)
    return checkout(user_id, currency, credit_card)


def shipping_quote(items, currency):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency,
            "address": json.dumps(SHIPPING_ADDRESS),
        },
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def money_amount(money):
    return int(money.get("units", 0)) + int(money.get("nanos", 0)) / 1e9
