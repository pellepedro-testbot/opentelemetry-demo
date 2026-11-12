# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import json
import os
import subprocess
import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until


ACCOUNTING_DB_CONTAINER = os.environ.get("ACCOUNTING_DB_CONTAINER", "astronomy-db")
FRAUD_DETECTION_CONTAINER = os.environ.get("FRAUD_DETECTION_CONTAINER", "fraud-detection")
ORDER_POLL_TIMEOUT = 30

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zipCode": "94043",
}
EMAIL = "shop-api-test@example.com"
RATED_CURRENCIES = (
    "EUR USD JPY BGN CZK DKK GBP HUF PLN RON SEK CHF ISK NOK HRK RUB TRY "
    "AUD BRL CAD CNY HKD IDR ILS INR KRW MXN MYR NZD PHP SGD THB ZAR"
).split()
CARD_NUMBER = "4432801561520454"


def _expiry(months_from_now):
    today = datetime.date.today()
    index = today.year * 12 + (today.month - 1) + months_from_now
    return index // 12, index % 12 + 1


def _add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    assert resp.status_code == 200, resp.text


def _get_cart(user_id, timeout=10):
    return requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": "USD"},
        timeout=timeout,
    )


def _empty_cart(user_id, timeout=10):
    return requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=timeout)


def _checkout(user_id, currency="USD", expiry=None):
    year, month = expiry or _expiry(12)
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json={
            "userId": user_id,
            "email": EMAIL,
            "address": ADDRESS,
            "userCurrency": currency,
            "creditCard": {
                "creditCardNumber": CARD_NUMBER,
                "creditCardCvv": 672,
                "creditCardExpirationYear": year,
                "creditCardExpirationMonth": month,
            },
        },
        timeout=30,
    )


def _shipping_quote(items, currency):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency,
            "address": json.dumps(ADDRESS),
        },
        timeout=10,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()


def _set_flag(name, variant):
    resp = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10)
    resp.raise_for_status()
    body = resp.json()
    body["flags"][name]["defaultVariant"] = variant
    requests.post(f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": body}, timeout=10).raise_for_status()


@pytest.fixture
def user_id():
    uid = f"shop-api-test-{uuid.uuid4()}"
    yield uid
    _empty_cart(uid)


@pytest.mark.parametrize(
    "currency,product_ids",
    [
        ("JPY", ["0PUK6V6EV0"]),
        ("EUR", ["0PUK6V6EV0"]),
        ("CAD", ["0PUK6V6EV0", "66VCHSJNUP"]),
    ],
)
def test_checkout_shipping_cost_is_usd_quote_converted_to_order_currency(user_id, currency, product_ids):
    for product_id in product_ids:
        _add_to_cart(user_id, product_id)

    expected = _shipping_quote([{"productId": p, "quantity": 1} for p in product_ids], currency)
    resp = _checkout(user_id, currency)

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == currency
    assert int(shipping.get("units", 0)) == int(expected.get("units", 0)), (shipping, expected)
    assert abs(int(shipping.get("nanos", 0)) - int(expected.get("nanos", 0))) < 1000, (shipping, expected)


def test_checkout_usd_shipping_cost_is_usd_quote(user_id):
    _add_to_cart(user_id, "0PUK6V6EV0")

    resp = _checkout(user_id, "USD")

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "USD"
    assert int(shipping["units"]) == 8
    assert int(shipping["nanos"]) == 990000000


def test_checkout_places_order_with_enriched_items(user_id):
    _add_to_cart(user_id, "0PUK6V6EV0")

    resp = _checkout(user_id, "USD")

    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert len(order["items"]) == 1
    item = order["items"][0]["item"]
    assert item["productId"] == "0PUK6V6EV0"
    assert item["quantity"] == 1
    assert item["product"]["name"]

    cart = _get_cart(user_id)
    assert cart.status_code == 200, cart.text
    assert cart.json()["items"] == []


def test_card_expiring_this_month_is_accepted(user_id):
    _add_to_cart(user_id, "0PUK6V6EV0")

    resp = _checkout(user_id, "USD", expiry=_expiry(0))

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]




def test_currency_list_has_every_rated_currency_including_eur():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)

    assert resp.status_code == 200, resp.text
    codes = resp.json()
    assert set(RATED_CURRENCIES) <= set(codes), sorted(set(RATED_CURRENCIES) - set(codes))


def _recommendations(product_id):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations",
        params={"productIds": product_id, "sessionId": str(uuid.uuid4()), "currencyCode": "USD"},
        timeout=10,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()


def test_recommendations_exclude_requested_product():
    for _ in range(20):
        ids = [p["id"] for p in _recommendations("0PUK6V6EV0")]
        assert "0PUK6V6EV0" not in ids, ids


def test_shipping_quote_counts_distinct_items():
    for _ in range(5):
        quote = _shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 10}], "USD")
        assert quote["currencyCode"] == "USD"
        assert (int(quote["units"]), int(quote["nanos"])) == (8, 990000000), quote

    quote = _shipping_quote(
        [{"productId": "0PUK6V6EV0", "quantity": 1}, {"productId": "66VCHSJNUP", "quantity": 1}], "USD"
    )
    assert (int(quote["units"]), int(quote["nanos"])) == (17, 980000000), quote


def test_shipping_quote_nanos_are_whole_cents():
    quote = _shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 1}], "USD")

    nanos = int(quote.get("nanos", 0))
    assert 0 <= nanos < 1_000_000_000
    assert nanos % 10_000_000 == 0, quote


def test_cart_failure_flag_fails_a_cart_call_without_losing_data(user_id):
    _add_to_cart(user_id, "0PUK6V6EV0")

    _set_flag("cartFailure", "100%")
    try:
        time.sleep(5)
        get_status = _get_cart(user_id, timeout=30).status_code
        delete_status = _empty_cart(user_id, timeout=30).status_code
    finally:
        _set_flag("cartFailure", "off")

    assert get_status >= 500 or delete_status >= 500, (get_status, delete_status)
    cart = poll_until(
        lambda: (lambda r: r if r.status_code == 200 else None)(_get_cart(user_id, timeout=30)),
        "cart readable again after cartFailure is off",
        timeout=60,
    )
    remaining = [i["productId"] for i in cart.json()["items"]]
    if 200 <= delete_status < 300:
        assert remaining == [], (delete_status, remaining)
    else:
        assert remaining == ["0PUK6V6EV0"], (delete_status, remaining)


def _place_usd_order(user_id):
    _add_to_cart(user_id, "0PUK6V6EV0")
    resp = _checkout(user_id, "USD")
    assert resp.status_code == 200, resp.text
    return resp.json()


def test_accounting_stores_full_shipping_cost(user_id):
    order = _place_usd_order(user_id)
    shipping = order["shippingCost"]
    assert int(shipping.get("nanos", 0)) != 0, shipping

    query = (
        "select shipping_cost_units, shipping_cost_nanos from accounting.shipping "
        f"where order_id='{order['orderId']}'"
    )

    def stored_row():
        out = subprocess.run(
            ["docker", "exec", ACCOUNTING_DB_CONTAINER, "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", query],
            capture_output=True,
            text=True,
            check=True,
        ).stdout.strip()
        return out or None

    row = poll_until(stored_row, f"accounting.shipping row for order {order['orderId']}", timeout=ORDER_POLL_TIMEOUT)
    units, nanos = (int(v) for v in row.split("|"))
    assert (units, nanos) == (int(shipping["units"]), int(shipping["nanos"]))


def test_fraud_detection_logs_consumed_order_id(user_id):
    order = _place_usd_order(user_id)
    expected = f"Consumed record with orderId: {order['orderId']}"

    def logged():
        out = subprocess.run(
            ["docker", "logs", "--since", "5m", FRAUD_DETECTION_CONTAINER],
            capture_output=True,
            text=True,
            check=True,
        )
        return expected in out.stdout + out.stderr

    poll_until(logged, f"fraud-detection log line '{expected}'", timeout=ORDER_POLL_TIMEOUT)
