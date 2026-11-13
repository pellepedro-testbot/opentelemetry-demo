# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Calls to the storefront API (through the frontend proxy) shared by the
order and checkout tests."""

import json
import os
import uuid
from datetime import date

import requests

from conftest import FRONTEND_PROXY_URL

QUOTE_HOST = os.environ.get("QUOTE_HOST", "quote")
QUOTE_PORT = os.environ.get("QUOTE_PORT", "8090")
QUOTE_URL = os.environ.get("QUOTE_URL", f"http://{QUOTE_HOST}:{QUOTE_PORT}")

POSTGRES_CONTAINER = os.environ.get("POSTGRES_HOST", "astronomy-db")

PRODUCT_ID = "0PUK6V6EV0"
OTHER_PRODUCT_ID = "L9ECAV7KIM"

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zipCode": "94043",
}

VALID_CARD_NUMBER = "4432801561520454"


def new_user_id():
    return f"telemetry-test-{uuid.uuid4()}"


def next_year_expiry():
    return date.today().year + 1, 1


def add_to_cart(user_id, product_id=PRODUCT_ID, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def get_cart(user_id, currency_code="USD"):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": currency_code},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def empty_cart(user_id):
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=15)


def place_order(user_id, currency_code="USD", expiry=None):
    year, month = expiry or next_year_expiry()
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency_code},
        json={
            "userId": user_id,
            "userCurrency": currency_code,
            "address": ADDRESS,
            "email": "telemetry-test@example.com",
            "creditCard": {
                "creditCardNumber": VALID_CARD_NUMBER,
                "creditCardCvv": 123,
                "creditCardExpirationYear": year,
                "creditCardExpirationMonth": month,
            },
        },
        timeout=30,
    )


def shipping_quote(items, currency_code="USD"):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency_code,
            "address": json.dumps(ADDRESS),
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def money_amount(money):
    return int(money.get("units", 0)) + int(money.get("nanos", 0)) / 1e9
