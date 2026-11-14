# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import json
import os
import subprocess
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, OPENSEARCH_URL, PROBE_PERSON, poll_until


SHIPPING_HOST = os.environ.get("SHIPPING_HOST", "shipping")
SHIPPING_PORT = os.environ.get("SHIPPING_PORT", "50050")
SHIPPING_URL = os.environ.get("SHIPPING_URL", f"http://{SHIPPING_HOST}:{SHIPPING_PORT}")

POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "astronomy-db")

PRODUCT_ID = "OLJCESPC7Z"

SHIPPING_ADDRESS = {
    "street_address": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zip_code": "94043",
}

# Codes of the rate table in src/currency/src/server.cpp.
RATE_TABLE_CODES = {
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
}
USD_PER_EUR = 1.1305


def _money(m):
    return m.get("units", 0) + m.get("nanos", 0) / 1e9


def _add_to_cart(user_id, product_id=PRODUCT_ID, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    assert resp.status_code == 200, resp.text


def _checkout(user_id, currency="USD", expiration_year=None, expiration_month=1):
    person = json.loads(json.dumps(PROBE_PERSON))
    person["userId"] = user_id
    person["userCurrency"] = currency
    person["creditCard"]["creditCardNumber"] = "4432801561520454"
    person["creditCard"]["creditCardExpirationYear"] = (
        expiration_year or datetime.datetime.now(datetime.timezone.utc).year + 1
    )
    person["creditCard"]["creditCardExpirationMonth"] = expiration_month
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=person,
        timeout=30,
    )


def _place_order(currency="USD", quantity=1):
    user_id = f"storefront-orders-{uuid.uuid4()}"
    _add_to_cart(user_id, quantity=quantity)
    resp = _checkout(user_id, currency)
    assert resp.status_code == 200, resp.text
    return user_id, resp.json()


def _get_quote(items):
    resp = requests.post(
        f"{SHIPPING_URL}/get-quote",
        json={"items": items, "address": SHIPPING_ADDRESS},
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()["cost_usd"]


def _distinct_items(count):
    return [{"product_id": f"P{i}", "quantity": 1} for i in range(count)]


def _opensearch_logs(where, fields="attributes, body"):
    ppl = f"source=otel-logs-* | where {where} | fields {fields}"
    resp = requests.post(
        f"{OPENSEARCH_URL}/_plugins/_ppl",
        json={"query": ppl},
        headers={"Content-Type": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json().get("datarows", [])


def _psql(sql):
    out = subprocess.run(
        ["docker", "exec", POSTGRES_HOST, "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", sql],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    return [line.split("|") for line in out.stdout.strip().splitlines() if line]


@pytest.fixture
def cart_user():
    user_id = f"storefront-orders-{uuid.uuid4()}"
    yield user_id
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


def test_products_listed_and_found_by_id():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=10)
    assert resp.status_code == 200
    products = resp.json()
    assert len(products) > 0
    for product in products:
        for field in ("id", "name", "picture", "priceUsd"):
            assert product.get(field), f"{product.get('id')} has no {field}"

    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products/{PRODUCT_ID}", params={"currencyCode": "USD"}, timeout=10)
    assert resp.status_code == 200
    assert resp.json()["id"] == PRODUCT_ID


def test_emit_raw_pii_flag_defaults_off_and_orders_succeed():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10)
    assert resp.status_code == 200
    assert resp.json()["flags"]["emitRawPii"]["defaultVariant"] == "off"

    _, order = _place_order()
    assert order["orderId"]


def test_order_placed_through_storefront_empties_cart():
    user_id, order = _place_order()
    for field in ("orderId", "shippingTrackingId", "shippingCost", "items"):
        assert order.get(field), f"order has no {field}"
    assert order["items"][0]["item"]["productId"] == PRODUCT_ID

    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart", params={"sessionId": user_id, "currencyCode": "USD"}, timeout=10
    )
    assert resp.status_code == 200
    assert resp.json().get("items", []) == []


def test_eur_order_shipping_is_converted_like_the_cart_quote():
    user_id = f"storefront-orders-{uuid.uuid4()}"
    _add_to_cart(user_id)
    quote = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps([{"productId": PRODUCT_ID, "quantity": 1}]),
            "currencyCode": "EUR",
            "address": json.dumps(PROBE_PERSON["address"]),
        },
        timeout=10,
    )
    assert quote.status_code == 200, quote.text
    quoted = quote.json()
    assert quoted["currencyCode"] == "EUR"

    resp = _checkout(user_id, "EUR")
    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "EUR"
    assert round(_money(shipping), 2) == round(_money(quoted), 2)


def test_usd_order_reports_the_shipping_quote_unchanged():
    _, order = _place_order("USD")
    assert order["shippingCost"] == {"currencyCode": "USD", "units": 8, "nanos": 990000000}


@pytest.mark.parametrize(
    "count,units,nanos",
    [(1, 8, 990000000), (29, 260, 710000000), (35, 314, 650000000), (58, 521, 420000000)],
    ids=["1-item", "29-items", "35-items", "58-items"],
)
def test_quote_is_rounded_to_cents(count, units, nanos):
    assert _get_quote(_distinct_items(count)) == {"currency_code": "USD", "units": units, "nanos": nanos}


def test_quote_counts_distinct_items_not_quantity():
    one = _get_quote([{"product_id": PRODUCT_ID, "quantity": 1}])
    five = _get_quote([{"product_id": PRODUCT_ID, "quantity": 5}])
    two = _get_quote([{"product_id": PRODUCT_ID, "quantity": 1}, {"product_id": "66VCHSJNUP", "quantity": 1}])
    assert one == {"currency_code": "USD", "units": 8, "nanos": 990000000}
    assert five == one
    assert two == {"currency_code": "USD", "units": 17, "nanos": 980000000}


def test_card_expiring_this_month_is_accepted():
    now = datetime.datetime.now(datetime.timezone.utc)
    user_id = f"storefront-orders-{uuid.uuid4()}"
    _add_to_cart(user_id)
    try:
        resp = _checkout(user_id, expiration_year=now.year, expiration_month=now.month)
        assert resp.status_code == 200, resp.text
        assert resp.json()["orderId"]
    finally:
        requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


def test_supported_currencies_include_every_rate():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    assert resp.status_code == 200
    codes = set(resp.json())
    assert "EUR" in codes
    assert RATE_TABLE_CODES - codes == set()


def test_usd_price_converts_to_eur():
    usd = requests.get(f"{FRONTEND_PROXY_URL}/api/products/{PRODUCT_ID}", params={"currencyCode": "USD"}, timeout=10)
    eur = requests.get(f"{FRONTEND_PROXY_URL}/api/products/{PRODUCT_ID}", params={"currencyCode": "EUR"}, timeout=10)
    assert usd.status_code == 200 and eur.status_code == 200
    price_eur = eur.json()["priceUsd"]
    assert price_eur["currencyCode"] == "EUR"
    assert round(_money(price_eur), 2) == round(_money(usd.json()["priceUsd"]) / USD_PER_EUR, 2)


def test_recommendations_exclude_requested_products():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=10)
    ids = [p["id"] for p in resp.json()]
    requested, remaining = ids[:-1], ids[-1]

    for _ in range(5):
        recs = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": ",".join(requested), "sessionId": "storefront-orders", "currencyCode": "USD"},
            timeout=10,
        )
        assert recs.status_code == 200
        assert [p["id"] for p in recs.json()] == [remaining]

    for _ in range(10):
        recs = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": PRODUCT_ID, "sessionId": "storefront-orders", "currencyCode": "USD"},
            timeout=10,
        )
        assert recs.status_code == 200
        assert PRODUCT_ID not in [p["id"] for p in recs.json()]


def test_order_confirmation_log_carries_order_id():
    _, order = _place_order()
    order_id = order["orderId"]
    rows = poll_until(
        lambda: _opensearch_logs(
            f"resource.service.name = 'checkout' and attributes.demo.order.id = '{order_id}'", "body"
        ),
        f"checkout log with demo.order.id {order_id}",
        timeout=120,
    )
    assert ["order confirmation email sent"] in rows


def test_cart_add_item_log_records_user_and_product(cart_user):
    _add_to_cart(cart_user)
    rows = poll_until(
        lambda: _opensearch_logs(
            "resource.service.name = 'cart' and like(body, 'AddItemAsync%') "
            f"and (attributes.userId = '{cart_user}' or attributes.productId = '{cart_user}')",
            "attributes",
        ),
        f"cart AddItemAsync log for {cart_user}",
        timeout=120,
    )
    attributes = rows[0][0]
    assert attributes["userId"] == cart_user
    assert attributes["productId"] == PRODUCT_ID


def test_fraud_detection_logs_the_order_id():
    _, order = _place_order()
    order_id = order["orderId"]
    expected_prefix = f"Consumed record with orderId: {order_id}, and updated total count to: "
    rows = poll_until(
        lambda: _opensearch_logs(
            f"resource.service.name = 'fraud-detection' and (like(body, '%{order_id}%') "
            f"or like(body, '%{order['shippingTrackingId']}%'))",
            "body",
        ),
        f"fraud-detection log for order {order_id}",
        timeout=120,
    )
    assert rows[0][0].startswith(expected_prefix), rows[0][0]


def _stored_shipping(order_id):
    return poll_until(
        lambda: _psql(
            "SELECT shipping_tracking_id, shipping_cost_currency_code, shipping_cost_units, shipping_cost_nanos "
            f"FROM accounting.shipping WHERE order_id = '{order_id}'"
        ),
        f"accounting shipping row for {order_id}",
        timeout=120,
    )


def test_accounting_stores_order_items_and_shipping():
    _, order = _place_order()
    order_id = order["orderId"]
    _stored_shipping(order_id)

    assert _psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id = '{order_id}'") == [[order_id]]

    items = _psql(
        "SELECT product_id, quantity, item_cost_currency_code, item_cost_units, item_cost_nanos "
        f"FROM accounting.orderitem WHERE order_id = '{order_id}'"
    )
    cost = order["items"][0]["cost"]
    assert items == [[PRODUCT_ID, "1", cost["currencyCode"], str(cost["units"]), str(cost["nanos"])]]

    tracking_id, currency, units, _ = _stored_shipping(order_id)[0]
    assert tracking_id == order["shippingTrackingId"]
    assert currency == order["shippingCost"]["currencyCode"]
    assert int(units) == order["shippingCost"]["units"]


def test_accounting_keeps_shipping_cents():
    _, order = _place_order("USD")
    shipping = order["shippingCost"]
    _, _, units, nanos = _stored_shipping(order["orderId"])[0]
    assert int(nanos) != 0
    assert int(units) + int(nanos) / 1e9 == pytest.approx(_money(shipping))
