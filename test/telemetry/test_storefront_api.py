# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import time

import pytest
import requests

import demo_flags
from conftest import FRONTEND_PROXY_URL
from storefront import (
    AMEX_CARD_NUMBER,
    FAILING_PRODUCT_ID,
    TELESCOPE_ID,
    add_to_cart,
    amount,
    credit_card,
    empty_cart,
    get_cart,
    new_user_id,
    place_order,
    previous_month,
    shipping_quote,
)


@pytest.fixture
def payment_failure_on():
    demo_flags.set_default_variant("paymentFailure", "100%")
    yield
    demo_flags.set_default_variant("paymentFailure", "off")


@pytest.fixture
def product_catalog_failure_on():
    demo_flags.set_product_catalog_failure("on")
    yield
    demo_flags.set_product_catalog_failure("off")


def _cart_product_ids(user_id):
    return [item["productId"] for item in get_cart(user_id)["items"]]


def test_checkout_answers_payment_failure_with_422(payment_failure_on):
    user_id = new_user_id("api-payment-failure")
    add_to_cart(user_id)

    resp = place_order(user_id)

    assert resp.status_code == 422, resp.text
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]


def test_checkout_answers_unrelated_failure_with_generic_500(product_catalog_failure_on):
    user_id = new_user_id("api-catalog-failure")
    add_to_cart(user_id, FAILING_PRODUCT_ID)

    resp = place_order(user_id)

    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert "code" not in body
    assert isinstance(body.get("error"), str) and body["error"]


def test_checkout_answers_successful_order_with_200():
    user_id = new_user_id("api-order")
    add_to_cart(user_id)

    resp = place_order(user_id)

    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert order["shippingCost"]["currencyCode"] == "USD"
    assert [item["item"]["productId"] for item in order["items"]] == [TELESCOPE_ID]
    item = order["items"][0]
    assert item["item"]["product"]["id"] == TELESCOPE_ID
    assert item["cost"]["currencyCode"] == "USD"
    assert amount(item["cost"]) > 0


@pytest.mark.parametrize(
    "card",
    [
        pytest.param(credit_card(AMEX_CARD_NUMBER), id="amex"),
        pytest.param(credit_card(month=previous_month()[0], year=previous_month()[1]), id="expired"),
    ],
)
def test_checkout_answers_declined_card_with_422(card):
    user_id = new_user_id("api-declined-card")
    add_to_cart(user_id)

    resp = place_order(user_id, card=card)

    assert resp.status_code == 422, resp.text
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]
    assert _cart_product_ids(user_id) == [TELESCOPE_ID]


def test_order_in_eur_carries_converted_shipping_cost():
    user_id = new_user_id("api-eur-order")
    add_to_cart(user_id)
    items = [{"productId": TELESCOPE_ID, "quantity": 1}]
    quote_eur = shipping_quote(items, "EUR")
    quote_usd = shipping_quote(items, "USD")
    assert (quote_eur["units"], quote_eur["nanos"]) != (quote_usd["units"], quote_usd["nanos"])

    resp = place_order(user_id, currency="EUR")

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "EUR"
    assert (shipping["units"], shipping["nanos"]) == (quote_eur["units"], quote_eur["nanos"])


def test_order_in_usd_carries_usd_shipping_quote():
    user_id = new_user_id("api-usd-order")
    add_to_cart(user_id)
    quote_usd = shipping_quote([{"productId": TELESCOPE_ID, "quantity": 1}], "USD")

    resp = place_order(user_id)

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "USD"
    assert (shipping["units"], shipping["nanos"]) == (quote_usd["units"], quote_usd["nanos"])


def test_card_expiring_this_month_is_accepted():
    today = datetime.date.today()
    user_id = new_user_id("api-card-this-month")
    add_to_cart(user_id)

    resp = place_order(user_id, card=credit_card(month=today.month, year=today.year))

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_card_expired_last_month_is_rejected():
    month, year = previous_month()
    user_id = new_user_id("api-card-expired")
    add_to_cart(user_id)

    resp = place_order(user_id, card=credit_card(month=month, year=year))

    assert resp.status_code != 200, resp.text
    assert "orderId" not in resp.json()


def test_shipping_is_priced_on_total_item_quantity():
    three_of_one = shipping_quote([{"productId": TELESCOPE_ID, "quantity": 3}])
    three_lines = shipping_quote(
        [
            {"productId": TELESCOPE_ID, "quantity": 1},
            {"productId": FAILING_PRODUCT_ID, "quantity": 1},
            {"productId": "66VCHSJNUP", "quantity": 1},
        ]
    )

    assert three_of_one["currencyCode"] == "USD"
    assert abs(amount(three_of_one) - 26.97) < 0.01, three_of_one
    assert (three_of_one["units"], three_of_one["nanos"]) == (three_lines["units"], three_lines["nanos"])


def test_single_item_shipping_in_usd_is_8_99():
    quote = shipping_quote([{"productId": TELESCOPE_ID, "quantity": 1}])

    assert quote["currencyCode"] == "USD"
    assert (quote["units"], quote["nanos"]) == (8, 990000000)


def test_supported_currencies_include_eur():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)

    assert resp.status_code == 200
    currencies = resp.json()
    for code in ("EUR", "USD", "CAD", "JPY", "GBP", "TRY"):
        assert code in currencies, f"{code} missing from {currencies}"


def test_products_convert_to_eur():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "EUR"}, timeout=10)

    assert resp.status_code == 200
    products = resp.json()
    assert products
    for product in products:
        assert product["priceUsd"]["currencyCode"] == "EUR"
        assert amount(product["priceUsd"]) > 0


def test_recommendations_exclude_the_requested_product():
    returned = set()
    for _ in range(30):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": FAILING_PRODUCT_ID, "sessionId": "recommendation-test", "currencyCode": "USD"},
            timeout=10,
        )
        assert resp.status_code == 200
        ids = [product["id"] for product in resp.json()]
        assert ids
        returned.update(ids)

    assert FAILING_PRODUCT_ID not in returned


def test_cart_reads_and_empties_succeed_while_cart_failure_is_off():
    assert demo_flags.read_flags()["flags"]["cartFailure"]["defaultVariant"] == "off"
    user_id = new_user_id("api-cart")
    add_to_cart(user_id)

    statuses = []
    for _ in range(20):
        statuses.append(
            requests.get(f"{FRONTEND_PROXY_URL}/api/cart", params={"sessionId": user_id}, timeout=10).status_code
        )
        statuses.append(empty_cart(user_id).status_code)

    assert all(200 <= status < 300 for status in statuses), statuses
    assert get_cart(user_id)["items"] == []


def test_catalog_lists_and_gets_products():
    listed = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=10)
    single = requests.get(f"{FRONTEND_PROXY_URL}/api/products/{FAILING_PRODUCT_ID}", timeout=10)

    assert listed.status_code == 200
    assert len(listed.json()) == 10
    assert single.status_code == 200
    assert single.json()["id"] == FAILING_PRODUCT_ID


def test_catalog_lock_contention_is_off_and_catalog_answers_promptly():
    flag = demo_flags.read_flags()["flags"]["productCatalogLockContention"]
    assert flag["defaultVariant"] == "off"

    slowest = 0.0
    deadline = time.time() + 30
    while time.time() < deadline:
        resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=10)
        assert resp.status_code == 200
        slowest = max(slowest, resp.elapsed.total_seconds())
        time.sleep(1)

    assert slowest < 2, f"slowest catalog answer took {slowest:.2f}s"


def test_flag_file_defines_new_fault_flags_off_and_drops_removed_ones():
    flags = demo_flags.read_flags()["flags"]

    for name in ("emitRawPii", "productCatalogLockContention", "aiSlowResponse", "aiRunawayAgent"):
        assert name in flags, f"{name} missing"
        assert flags[name]["defaultVariant"] == "off", f"{name} is {flags[name]['defaultVariant']}"
    for name in ("loadGeneratorTraffic", "loadGeneratorVUs", "llmInaccurateResponse", "llmRateLimitError"):
        assert name not in flags, f"{name} still defined"


def test_load_generator_serves_locust_ui():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/loadgen/", timeout=10)

    assert resp.status_code == 200
    assert "locust" in resp.text.lower()
