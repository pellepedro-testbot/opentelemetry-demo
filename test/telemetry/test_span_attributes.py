# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Span attributes the checkout, payment and currency services record for
requests driven through the storefront API."""

import datetime

import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import (
    add_to_cart,
    checkout_body,
    jaeger_traces,
    money_value,
    new_user_id,
    order_with_items,
    place_order,
    span_tags,
    spans_of,
    trace_with_tag,
)

PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"


def _order_trace(order_id):
    def find():
        trace = trace_with_tag("checkout", "demo.order.id", order_id)
        if trace and spans_of(trace, "payment", "charge"):
            return trace
        return None

    return poll_until(find, f"checkout trace of order {order_id} with a payment charge span")


def _user_trace(user_id):
    def find():
        trace = trace_with_tag("checkout", "user.id", user_id)
        if trace and spans_of(trace, "payment", "charge"):
            return trace
        return None

    return poll_until(find, f"checkout trace of user {user_id} with a payment charge span")


def _synthetic_order(headers):
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1, headers=headers)
    resp = place_order(checkout_body(user_id), headers=headers)
    assert resp.status_code == 200, resp.text
    return _order_trace(resp.json()["orderId"])


def test_synthetic_order_is_annotated_and_not_charged():
    trace = _synthetic_order({"baggage": "synthetic_request=true"})
    [(_, place_order_tags)] = spans_of(trace, "checkout", PLACE_ORDER)
    [(_, charge_tags)] = spans_of(trace, "payment", "charge")
    assert place_order_tags.get("user_agent.synthetic.type") == "test"
    assert charge_tags.get("user_agent.synthetic.type") == "test"
    assert charge_tags.get("demo.payment.charged") is False


def test_regular_order_is_not_annotated_and_is_charged():
    trace = _synthetic_order(None)
    [(_, place_order_tags)] = spans_of(trace, "checkout", PLACE_ORDER)
    [(_, charge_tags)] = spans_of(trace, "payment", "charge")
    assert "user_agent.synthetic.type" not in place_order_tags
    assert "user_agent.synthetic.type" not in charge_tags
    assert charge_tags.get("demo.payment.charged") is True


def test_declined_charge_records_error_type():
    user_id, resp = order_with_items(
        [("0PUK6V6EV0", 1)], expiration_year=datetime.date.today().year - 1
    )
    assert resp.status_code == 422, resp.text
    trace = _user_trace(user_id)
    [(_, charge_tags)] = spans_of(trace, "payment", "charge")
    [(_, server_tags)] = spans_of(trace, "payment", "oteldemo.PaymentService/Charge")
    assert charge_tags.get("error.type") == "Error"
    assert charge_tags.get("otel.status_code") == "ERROR"
    assert server_tags.get("error.type") == "Error"
    assert server_tags.get("otel.status_code") == "ERROR"


def test_charged_amount_attribute_matches_order_total():
    _, resp = order_with_items([("0PUK6V6EV0", 1)])
    assert resp.status_code == 200, resp.text
    order = resp.json()
    total = money_value(order["shippingCost"]) + sum(
        money_value(line["cost"]) * line["item"]["quantity"] for line in order["items"]
    )
    trace = _order_trace(order["orderId"])
    [(_, server_tags)] = spans_of(trace, "payment", "oteldemo.PaymentService/Charge")
    assert str(server_tags.get("demo.payment.amount")) == f"{total:.2f}"


def _currency_span(original_name):
    def find():
        for trace in jaeger_traces("currency", lookback="5m", limit=20):
            for span in trace["spans"]:
                tags = span_tags(span)
                if original_name in (span["operationName"], tags.get("original_span_name")):
                    return tags
        return None

    return poll_until(find, f"currency span {original_name}")


def test_currency_spans_use_current_rpc_conventions():
    assert requests.get(
        f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "EUR"}, timeout=15
    ).status_code == 200
    assert requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=15).status_code == 200
    for name, method in (
        ("Currency/Convert", "oteldemo.CurrencyService/Convert"),
        ("Currency/GetSupportedCurrencies", "oteldemo.CurrencyService/GetSupportedCurrencies"),
    ):
        tags = _currency_span(name)
        assert tags.get("rpc.system.name") == "grpc", name
        assert tags.get("rpc.method") == method, name
        assert tags.get("rpc.response.status_code") == "OK", name
        for legacy in ("rpc.system", "rpc.service", "rpc.grpc.status_code"):
            assert legacy not in tags, f"{name} still has {legacy}"
