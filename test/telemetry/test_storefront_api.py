# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import json
import os
import uuid

import requests

from conftest import (
    FRONTEND_PROXY_URL,
    PROBE_PERSON,
    add_to_cart,
    empty_cart,
    get_cart,
    place_order,
)

SHIPPING_URL = f"http://shipping:{os.environ.get('SHIPPING_PORT', '50050')}"
QUOTE_URL = f"http://quote:{os.environ.get('QUOTE_PORT', '8090')}"

PRODUCT_ID = "OLJCESPC7Z"
OTHER_PRODUCT_IDS = ["66VCHSJNUP", "0PUK6V6EV0", "1YMWWN1N4O", "2ZYFJ3GM2N"]

# Every currency the currency service has a rate for (src/currency/src/server.cpp).
RATED_CURRENCIES = {
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
}
USD_PER_EUR = 1.1305


def _user():
    return f"telemetry-api-{uuid.uuid4()}"


def _cents(money):
    return round(int(money.get("units", 0)) * 100 + int(money.get("nanos", 0)) / 10_000_000)


def _shipping_estimate(items, currency_code):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency_code,
            "address": json.dumps(PROBE_PERSON["address"]),
        },
        timeout=10,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()


def _month_offset(months):
    today = datetime.date.today()
    index = today.year * 12 + (today.month - 1) + months
    return {"creditCardExpirationYear": index // 12, "creditCardExpirationMonth": index % 12 + 1}


def test_storefront_serves_home_and_product_list():
    home = requests.get(f"{FRONTEND_PROXY_URL}/", timeout=10)
    assert home.status_code == 200

    products = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=10)
    assert products.status_code == 200
    ids = [p["id"] for p in products.json()]
    assert PRODUCT_ID in ids
    assert len(ids) >= 10


def test_removed_product_review_routes_answer_404():
    for path in (
        f"/api/product-reviews/{PRODUCT_ID}",
        f"/api/product-reviews-avg-score/{PRODUCT_ID}",
        f"/api/product-ask-ai-assistant/{PRODUCT_ID}",
    ):
        resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", timeout=10)
        assert resp.status_code == 404, f"{path} answered {resp.status_code}"


def test_usd_order_shipping_cost_matches_usd_quote():
    user = _user()
    try:
        add_to_cart(user, PRODUCT_ID)
        estimate = _shipping_estimate([{"productId": PRODUCT_ID, "quantity": 1}], "USD")

        resp = place_order(user, "USD")
        assert resp.status_code == 200, resp.text
        shipping_cost = resp.json()["shippingCost"]
        assert shipping_cost["currencyCode"] == "USD"
        assert _cents(shipping_cost) == _cents(estimate)
    finally:
        empty_cart(user)


def test_eur_order_shipping_cost_is_the_converted_quote():
    user = _user()
    try:
        add_to_cart(user, PRODUCT_ID)
        eur_estimate = _shipping_estimate([{"productId": PRODUCT_ID, "quantity": 1}], "EUR")

        resp = place_order(user, "EUR")
        assert resp.status_code == 200, resp.text
        shipping_cost = resp.json()["shippingCost"]
        assert shipping_cost["currencyCode"] == "EUR"
        assert abs(_cents(shipping_cost) - _cents(eur_estimate)) <= 1, (
            f"order shipping {shipping_cost} vs EUR estimate {eur_estimate}"
        )
    finally:
        empty_cart(user)


def test_shipping_quote_counts_every_unit():
    one_line_of_five = _shipping_estimate([{"productId": PRODUCT_ID, "quantity": 5}], "USD")
    five_lines_of_one = _shipping_estimate(
        [{"productId": pid, "quantity": 1} for pid in [PRODUCT_ID] + OTHER_PRODUCT_IDS], "USD"
    )
    one_unit = _shipping_estimate([{"productId": PRODUCT_ID, "quantity": 1}], "USD")

    assert _cents(one_line_of_five) == _cents(five_lines_of_one)
    assert _cents(one_line_of_five) > _cents(one_unit)


def test_shipping_quote_nanos_carry_the_quoted_cents():
    for count in range(1, 11):
        price = float(
            requests.post(f"{QUOTE_URL}/getquote", json={"numberOfItems": count}, timeout=10).text
        )
        resp = requests.post(
            f"{SHIPPING_URL}/get-quote",
            json={
                "address": None,
                "items": [{"product_id": f"P{i}", "quantity": 1} for i in range(count)],
            },
            timeout=10,
        )
        assert resp.status_code == 200, resp.text
        cost = resp.json()["cost_usd"]
        cents = round(price * 100)
        assert cost["units"] == cents // 100, f"{count} items: quote {price}, cost {cost}"
        assert cost["nanos"] == (cents % 100) * 10_000_000, f"{count} items: quote {price}, cost {cost}"


def test_card_expiring_this_month_is_accepted():
    user = _user()
    try:
        add_to_cart(user, PRODUCT_ID)

        resp = place_order(user, "USD", credit_card=_month_offset(0))
        assert resp.status_code == 200, resp.text
        assert resp.json()["orderId"]
        assert get_cart(user).json()["items"] == []
    finally:
        empty_cart(user)


def test_currency_list_has_every_rated_currency():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    assert resp.status_code == 200
    codes = resp.json()
    assert "EUR" in codes
    assert "USD" in codes
    assert set(codes) == RATED_CURRENCIES
    assert len(codes) == 33


def test_products_are_priced_in_eur():
    usd = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=10)
    eur = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "EUR"}, timeout=10)
    assert usd.status_code == 200
    assert eur.status_code == 200

    eur_prices = {p["id"]: p["priceUsd"] for p in eur.json()}
    assert eur_prices
    assert all(price["currencyCode"] == "EUR" for price in eur_prices.values())

    usd_price = next(p["priceUsd"] for p in usd.json() if p["id"] == PRODUCT_ID)
    expected_eur_cents = _cents(usd_price) / USD_PER_EUR
    assert abs(_cents(eur_prices[PRODUCT_ID]) - expected_eur_cents) <= 1


def test_recommendations_never_list_the_requested_product():
    for _ in range(20):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": PRODUCT_ID, "currencyCode": "USD"},
            timeout=10,
        )
        assert resp.status_code == 200
        recommended = [p["id"] for p in resp.json()]
        assert PRODUCT_ID not in recommended, recommended


def test_recommendations_for_all_but_one_product_return_only_that_product():
    catalog = [p["id"] for p in requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=10).json()]
    remaining = "66VCHSJNUP"
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations",
        params={"productIds": [pid for pid in catalog if pid != remaining], "currencyCode": "USD"},
        timeout=10,
    )
    assert resp.status_code == 200
    assert [p["id"] for p in resp.json()] == [remaining]


def test_cart_add_get_and_empty():
    user = _user()
    product_id = "66VCHSJNUP"
    try:
        add_to_cart(user, product_id, quantity=2)
        resp = get_cart(user)
        assert resp.status_code == 200
        assert [(i["productId"], i["quantity"]) for i in resp.json()["items"]] == [(product_id, 2)]

        assert empty_cart(user).status_code == 204
        resp = get_cart(user)
        assert resp.status_code == 200
        assert resp.json()["items"] == []
    finally:
        empty_cart(user)
