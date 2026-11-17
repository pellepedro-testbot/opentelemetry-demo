# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import json
import uuid

import pytest
import requests

from conftest import PROBE_PERSON, add_to_cart, money_value, place_order

# Codes of the rate table in src/currency/src/server.cpp.
RATE_TABLE_CODES = {
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
}
EUR_PER_USD = 1 / 1.1305

SHIPPING_ADDRESS = json.dumps(PROBE_PERSON["address"])


@pytest.fixture
def session():
    with requests.Session() as s:
        yield s


def _new_user():
    return f"storefront-api-{uuid.uuid4()}"


def _shipping_quote(session, frontend_url, item_list, currency="USD"):
    resp = session.get(
        f"{frontend_url}/api/shipping",
        params={
            "itemList": json.dumps(item_list),
            "currencyCode": currency,
            "address": SHIPPING_ADDRESS,
        },
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()


def _cents(money):
    return round(int(money.get("units", 0)) * 100 + int(money.get("nanos", 0)) / 1e7)


def _month_offset(months):
    today = datetime.date.today()
    index = today.year * 12 + (today.month - 1) + months
    return index % 12 + 1, index // 12


def test_usd_order_answers_order_with_enriched_items(session, frontend_url):
    user_id = _new_user()
    add_to_cart(session, user_id, "66VCHSJNUP")

    resp = place_order(session, user_id, currency="USD")

    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert order["shippingAddress"]
    assert order["shippingCost"] == {"currencyCode": "USD", "units": 8, "nanos": 990000000}
    assert len(order["items"]) == 1
    line = order["items"][0]
    assert line["cost"]
    assert line["item"]["productId"] == "66VCHSJNUP"
    assert line["item"]["quantity"] == 1
    product = line["item"]["product"]
    assert product["id"] == "66VCHSJNUP"
    assert product["name"] == "Starsense Explorer Refractor Telescope"
    assert product["picture"]
    assert product["priceUsd"]


def test_non_usd_order_shipping_cost_is_converted(session, frontend_url):
    user_id = _new_user()
    add_to_cart(session, user_id, "66VCHSJNUP")
    quote = _shipping_quote(session, frontend_url, [{"productId": "66VCHSJNUP", "quantity": 1}], "JPY")

    resp = place_order(session, user_id, currency="JPY")

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "JPY"
    assert abs(money_value(shipping) - money_value(quote)) <= 1, (shipping, quote)


@pytest.mark.parametrize("lines,expected_cents", [(29, 26071), (35, 31465)])
def test_shipping_quote_for_many_lines_is_exact(session, frontend_url, lines, expected_cents):
    item_list = [{"productId": "66VCHSJNUP", "quantity": 1}] * lines

    quote = _shipping_quote(session, frontend_url, item_list)

    assert quote["currencyCode"] == "USD"
    assert _cents(quote) == expected_cents, quote


def test_shipping_quote_counts_distinct_items(session, frontend_url):
    one_line = _shipping_quote(session, frontend_url, [{"productId": "66VCHSJNUP", "quantity": 3}])
    assert (one_line["units"], one_line["nanos"]) == (8, 990000000), one_line

    two_lines = _shipping_quote(
        session,
        frontend_url,
        [{"productId": "66VCHSJNUP", "quantity": 1}, {"productId": "OLJCESPC7Z", "quantity": 5}],
    )
    assert (two_lines["units"], two_lines["nanos"]) == (17, 980000000), two_lines


def test_card_expiring_this_month_is_accepted(session, frontend_url):
    user_id = _new_user()
    add_to_cart(session, user_id, "L9ECAV7KIM")

    resp = place_order(session, user_id, expiration=_month_offset(0))

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_card_expiring_next_month_is_accepted(session, frontend_url):
    user_id = _new_user()
    add_to_cart(session, user_id, "L9ECAV7KIM")

    resp = place_order(session, user_id, expiration=_month_offset(1))

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_currency_list_holds_every_rate_table_code(session, frontend_url):
    resp = session.get(f"{frontend_url}/api/currency", timeout=10)

    assert resp.status_code == 200
    codes = resp.json()
    assert len(codes) == len(set(codes)), codes
    assert RATE_TABLE_CODES - set(codes) == set()


def test_product_prices_convert_to_eur(session, frontend_url):
    usd = session.get(f"{frontend_url}/api/products/OLJCESPC7Z", params={"currencyCode": "USD"}, timeout=10)
    eur = session.get(f"{frontend_url}/api/products", params={"currencyCode": "EUR"}, timeout=10)

    assert usd.status_code == 200 and eur.status_code == 200
    product = next(p for p in eur.json() if p["id"] == "OLJCESPC7Z")
    assert product["priceUsd"]["currencyCode"] == "EUR"
    expected = money_value(usd.json()["priceUsd"]) * EUR_PER_USD
    assert abs(money_value(product["priceUsd"]) - expected) < 0.01


@pytest.mark.parametrize(
    "product_ids",
    [["OLJCESPC7Z"], ["OLJCESPC7Z", "66VCHSJNUP", "L9ECAV7KIM"]],
    ids=["one", "three"],
)
def test_recommendations_leave_out_requested_products(session, frontend_url, product_ids):
    for attempt in range(20):
        resp = session.get(
            f"{frontend_url}/api/recommendations",
            params={"productIds": product_ids, "sessionId": "t", "currencyCode": "USD"},
            timeout=10,
        )
        assert resp.status_code == 200
        ids = [p["id"] for p in resp.json()]
        assert set(ids).isdisjoint(product_ids), f"attempt {attempt}: {ids}"

