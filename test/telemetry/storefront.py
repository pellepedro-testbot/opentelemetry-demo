# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront API calls shared by the order and checkout tests."""

import datetime
import json
import secrets
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON

VISA_CARD_NUMBER = "4432-8015-6152-0454"
AMEX_CARD_NUMBER = "378282246310005"
TELESCOPE_ID = "0PUK6V6EV0"
FAILING_PRODUCT_ID = "OLJCESPC7Z"


def new_user_id(prefix):
    return f"{prefix}-{uuid.uuid4()}"


def credit_card(number=VISA_CARD_NUMBER, month=None, year=None, cvv=672):
    if month is None or year is None:
        month, year = 1, datetime.date.today().year + 1
    return {
        "creditCardNumber": number,
        "creditCardExpirationMonth": month,
        "creditCardExpirationYear": year,
        "creditCardCvv": cvv,
    }


def previous_month():
    today = datetime.date.today()
    if today.month == 1:
        return 12, today.year - 1
    return today.month - 1, today.year


def trace_headers(**extra):
    """Headers that start a sampled trace whose id the caller knows, so the
    trace of one request can be fetched from Jaeger directly."""
    trace_id = secrets.token_hex(16)
    headers = {"traceparent": f"00-{trace_id}-{secrets.token_hex(8)}-01", **extra}
    return trace_id, headers


def add_to_cart(user_id, product_id=TELESCOPE_ID, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    resp.raise_for_status()
    return resp


def get_cart(user_id, currency="USD"):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": currency},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def empty_cart(user_id):
    return requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


def place_order(user_id, currency="USD", card=None, headers=None, email=None):
    body = dict(
        PROBE_PERSON,
        userId=user_id,
        userCurrency=currency,
        creditCard=card or credit_card(),
    )
    if email is not None:
        body["email"] = email
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=body,
        headers=headers or {},
        timeout=30,
    )


def shipping_quote(items, currency="USD"):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency,
            "address": json.dumps(PROBE_PERSON["address"]),
        },
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def amount(money):
    return money.get("units", 0) + money.get("nanos", 0) / 1e9
