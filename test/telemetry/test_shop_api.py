# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Functional checks of the storefront HTTP API behind the frontend proxy."""

import datetime
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON, PROBE_PRODUCTS

# Every currency the currency service has a conversion rate for
# (currency_conversion in src/currency/src/server.cpp), EUR being the base.
RATED_CURRENCIES = {
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
}


def _amount(money):
    return money.get("units", 0) + money.get("nanos", 0) / 1e9


def _add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    assert resp.status_code == 200, f"POST /api/cart answered {resp.status_code}: {resp.text[:300]}"


def _checkout(user_id, currency="USD", expiration=None):
    person = dict(PROBE_PERSON, userId=user_id, userCurrency=currency)
    if expiration is not None:
        year, month = expiration
        person["creditCard"] = dict(
            PROBE_PERSON["creditCard"],
            creditCardExpirationYear=year,
            creditCardExpirationMonth=month,
        )
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=person,
        timeout=30,
    )


def _place_order(product_id, currency="USD"):
    user_id = str(uuid.uuid4())
    _add_to_cart(user_id, product_id)
    resp = _checkout(user_id, currency)
    assert resp.status_code == 200, f"checkout in {currency} answered {resp.status_code}: {resp.text[:300]}"
    return resp.json()


def _shipping_ratio_check(currency):
    usd_order = _place_order("0PUK6V6EV0", "USD")
    local_order = _place_order("0PUK6V6EV0", currency)

    usd_shipping = usd_order["shippingCost"]
    local_shipping = local_order["shippingCost"]
    assert usd_shipping["currencyCode"] == "USD"
    assert local_shipping["currencyCode"] == currency

    # The item cost in the same response is the catalog USD price converted by
    # the currency service, so it gives the exchange rate the order used.
    rate = _amount(local_order["items"][0]["cost"]) / _amount(usd_order["items"][0]["cost"])
    expected = _amount(usd_shipping) * rate
    assert abs(_amount(local_shipping) - expected) <= max(1.0, expected * 0.001), (
        f"{currency} shipping {local_shipping} is not the USD quote {usd_shipping} "
        f"converted at {rate:.4f} (expected about {expected:.2f})"
    )
    return usd_order, local_order


def test_checkout_answers_with_the_placed_order():
    user_id = str(uuid.uuid4())
    _add_to_cart(user_id, "0PUK6V6EV0")
    next_year = datetime.date.today().year + 1

    resp = _checkout(user_id, expiration=(next_year, 1))

    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert order["shippingCost"]["currencyCode"] == "USD"
    assert len(order["items"]) == 1
    item = order["items"][0]
    assert item["item"]["productId"] == "0PUK6V6EV0"
    assert item["item"]["quantity"] == 1
    assert item["item"]["product"]["name"] == "Solar System Color Imager"
    assert _amount(item["cost"]) == 175.0


def test_jpy_order_shipping_is_the_converted_usd_quote():
    usd_order, jpy_order = _shipping_ratio_check("JPY")
    assert (jpy_order["shippingCost"]["units"], jpy_order["shippingCost"]["nanos"]) != (
        usd_order["shippingCost"]["units"],
        usd_order["shippingCost"]["nanos"],
    ), "JPY shipping carries the USD quote's numbers relabeled as JPY"


def test_cad_order_shipping_is_the_converted_usd_quote():
    usd_order, _ = _shipping_ratio_check("CAD")

    # In USD the shipping charged is the quote the storefront shows for the same cart.
    quote = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": '[{"productId":"0PUK6V6EV0","quantity":1}]',
            "currencyCode": "USD",
            "address": '{"streetAddress":"1600 Amphitheatre Parkway","city":"Mountain View",'
            '"state":"CA","country":"United States","zipCode":"94043"}',
        },
        timeout=10,
    )
    assert quote.status_code == 200, quote.text[:300]
    assert abs(_amount(quote.json()) - _amount(usd_order["shippingCost"])) < 0.005


def test_card_expiring_this_month_is_accepted():
    today = datetime.date.today()
    user_id = str(uuid.uuid4())
    _add_to_cart(user_id, "0PUK6V6EV0")

    resp = _checkout(user_id, expiration=(today.year, today.month))

    assert resp.status_code == 200, (
        f"a card expiring {today.month}/{today.year} was refused: "
        f"{resp.status_code} {resp.text[:300]}"
    )
    assert resp.json()["orderId"]


def test_supported_currencies_include_every_rated_currency():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)

    assert resp.status_code == 200
    codes = set(resp.json())
    assert "EUR" in codes
    assert RATED_CURRENCIES <= codes, f"missing currencies: {sorted(RATED_CURRENCIES - codes)}"


def test_recommendations_leave_out_the_requested_products():
    requested = PROBE_PRODUCTS[:6]
    for _ in range(20):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": requested, "sessionId": str(uuid.uuid4()), "currencyCode": "USD"},
            timeout=10,
        )
        assert resp.status_code == 200, resp.text[:300]
        returned = {product["id"] for product in resp.json()}
        assert not returned & set(requested), (
            f"recommended {sorted(returned & set(requested))}, which were in the request"
        )

