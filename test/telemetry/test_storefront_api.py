# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Functional checks of the storefront HTTP API (served through frontend-proxy):
checkout, currencies, shipping quotes, payment and recommendations."""

import datetime

import pytest
import requests

from storefront import (
    REQUEST_TIMEOUT,
    SHIPPING_URL,
    STOREFRONT_URL,
    add_to_cart,
    card,
    container_logs,
    delete_accounting_order,
    empty_cart,
    flag_variant,
    get_cart,
    money_cents,
    new_user_id,
    place_order,
    product_catalog_failure,
    shipping_quote,
)


@pytest.fixture
def placed_orders():
    """Order ids placed by a test; their accounting rows are removed afterwards."""
    order_ids = []
    yield order_ids
    for order_id in order_ids:
        try:
            delete_accounting_order(order_id)
        except Exception as e:  # accounting may not have stored it yet
            print(f"could not remove accounting order {order_id}: {e}")


def test_payment_decline_is_answered_with_422_payment_failed():
    user_id = new_user_id("payment-failure")
    with flag_variant("paymentFailure", "100%"):
        add_to_cart(user_id, "0PUK6V6EV0", 1)
        resp = place_order(user_id)
    empty_cart(user_id)

    assert resp.status_code == 422, f"expected 422, got {resp.status_code}: {resp.text[:300]}"
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]


def test_unrelated_checkout_failure_is_answered_with_generic_500():
    user_id = new_user_id("catalog-failure")
    with product_catalog_failure():
        add_to_cart(user_id, "OLJCESPC7Z", 1)
        resp = place_order(user_id)
    empty_cart(user_id)

    assert resp.status_code == 500, f"expected 500, got {resp.status_code}: {resp.text[:300]}"
    body = resp.json()
    assert "code" not in body
    assert isinstance(body.get("error"), str) and body["error"]


def test_successful_checkout_returns_the_order_and_empties_the_cart(placed_orders):
    user_id = new_user_id("checkout-ok")
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    add_to_cart(user_id, "66VCHSJNUP", 2)

    resp = place_order(user_id)
    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    placed_orders.append(order["orderId"])

    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert "shippingCost" in order
    assert len(order["items"]) == 2
    by_product = {i["item"]["productId"]: i for i in order["items"]}
    assert set(by_product) == {"0PUK6V6EV0", "66VCHSJNUP"}
    for item in order["items"]:
        assert item["item"]["product"]["name"]
        assert "cost" in item
    assert by_product["66VCHSJNUP"]["item"]["quantity"] == 2

    cart = get_cart(user_id)
    assert cart.status_code == 200
    assert cart.json()["items"] == []


def test_supported_currencies_list_every_rate_including_eur():
    resp = requests.get(f"{STOREFRONT_URL}/api/currency", timeout=REQUEST_TIMEOUT)
    assert resp.status_code == 200
    codes = resp.json()

    assert len(codes) == len(set(codes)), f"duplicate currency codes: {codes}"
    for code in ("EUR", "USD", "JPY", "GBP"):
        assert code in codes, f"{code} missing from {sorted(codes)}"

    unconvertible = []
    for code in codes:
        product = requests.get(
            f"{STOREFRONT_URL}/api/products/0PUK6V6EV0",
            params={"currencyCode": code},
            timeout=REQUEST_TIMEOUT,
        )
        if product.status_code != 200 or product.json()["priceUsd"]["currencyCode"] != code:
            unconvertible.append(code)
    assert unconvertible == [], f"listed currencies that do not convert: {unconvertible}"


@pytest.mark.parametrize("currency_code", ["EUR", "USD"])
def test_checkout_shipping_cost_is_the_quote_in_the_shopper_currency(currency_code, placed_orders):
    user_id = new_user_id(f"shipping-{currency_code.lower()}")
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    expected = shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 1}], currency_code)

    resp = place_order(user_id, currency_code=currency_code)
    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    placed_orders.append(order["orderId"])

    shipping = order["shippingCost"]
    assert shipping["currencyCode"] == currency_code
    assert abs(money_cents(shipping) - money_cents(expected)) <= 1, (
        f"order shipping {shipping} != /api/shipping quote {expected}"
    )


def test_shipping_quote_counts_the_quantity_of_every_item():
    one_line_of_three = shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 3}])
    assert (one_line_of_three["units"], one_line_of_three["nanos"]) == (26, 970000000)

    direct = requests.post(
        f"{SHIPPING_URL}/get-quote",
        json={
            "items": [{"product_id": "0PUK6V6EV0", "quantity": 3}],
            "address": {
                "street_address": "1600 Amphitheatre Parkway",
                "city": "Mountain View",
                "state": "CA",
                "country": "USA",
                "zip_code": "94043",
            },
        },
        timeout=REQUEST_TIMEOUT,
    )
    assert direct.status_code == 200
    cost = direct.json()["cost_usd"]
    assert (cost["units"], cost["nanos"]) == (26, 970000000)


def test_shipping_quote_for_one_item_keeps_its_cents():
    quote = shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 1}])
    assert quote["currencyCode"] == "USD"
    assert (quote["units"], quote["nanos"]) == (8, 990000000)


def test_card_expiring_this_month_is_charged(placed_orders):
    today = datetime.date.today()
    user_id = new_user_id("card-this-month")
    add_to_cart(user_id, "0PUK6V6EV0", 1)

    resp = place_order(
        user_id,
        credit_card=card(expiration_month=today.month, expiration_year=today.year, cvv=672),
    )
    if resp.status_code != 200:
        empty_cart(user_id)
    assert resp.status_code == 200, f"card valid through {today.month}/{today.year} refused: {resp.text[:300]}"
    order = resp.json()
    placed_orders.append(order["orderId"])
    assert order["orderId"]


def test_card_expired_last_month_is_rejected():
    today = datetime.date.today()
    month, year = (12, today.year - 1) if today.month == 1 else (today.month - 1, today.year)
    user_id = new_user_id("card-last-month")
    add_to_cart(user_id, "0PUK6V6EV0", 1)

    resp = place_order(user_id, credit_card=card(expiration_month=month, expiration_year=year, cvv=672))
    empty_cart(user_id)

    assert resp.status_code != 200, f"expired card was charged: {resp.text[:300]}"
    assert f"The credit card (ending 0454) expired on {month}/{year}." in container_logs("payment", since="2m")


def test_recommendations_never_include_the_requested_product():
    product_id = "0PUK6V6EV0"
    seen = []
    for _ in range(30):
        resp = requests.get(
            f"{STOREFRONT_URL}/api/recommendations",
            params={"productIds": product_id, "sessionId": new_user_id("reco"), "currencyCode": "USD"},
            timeout=REQUEST_TIMEOUT,
        )
        assert resp.status_code == 200
        seen.append([p["id"] for p in resp.json()])
    assert all(product_id not in ids for ids in seen), f"{product_id} recommended for itself: {seen}"


def test_storefront_lists_the_catalog():
    resp = requests.get(f"{STOREFRONT_URL}/api/products", params={"currencyCode": "USD"}, timeout=REQUEST_TIMEOUT)
    assert resp.status_code == 200
    products = resp.json()
    assert len(products) == 10
    assert all(p["priceUsd"]["currencyCode"] == "USD" for p in products)


def test_cart_adds_up_quantities_and_empties():
    user_id = new_user_id("cart")
    add_to_cart(user_id, "66VCHSJNUP", 2)
    add_to_cart(user_id, "66VCHSJNUP", 2)

    cart = get_cart(user_id)
    assert cart.status_code == 200
    items = cart.json()["items"]
    assert [(i["productId"], i["quantity"]) for i in items] == [("66VCHSJNUP", 4)]

    assert empty_cart(user_id).status_code == 204
    after = get_cart(user_id)
    assert after.status_code == 200
    assert after.json()["items"] == []
