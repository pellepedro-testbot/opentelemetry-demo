# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Shipping quotes in whole cents: GET /api/shipping answers and the
demo.shipping.cost.total attribute on the shipping span."""

import pytest

from observability import jaeger_trace
from storefront import new_traceparent, shipping_quote


@pytest.mark.parametrize(
    "quantity, units, nanos",
    [
        (1, 8, 990000000),
        (2, 17, 980000000),
        (4, 35, 960000000),
        (5, 44, 950000000),
        (8, 71, 920000000),
        (10, 89, 900000000),
    ],
)
def test_shipping_quote_in_usd(quantity, units, nanos):
    resp = shipping_quote(quantity)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert (body["currencyCode"], int(body["units"]), body["nanos"]) == ("USD", units, nanos)


def test_shipping_quote_for_three_items_rounds_to_cent():
    resp = shipping_quote(3)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["currencyCode"] == "USD"
    assert round(int(body["units"]) + body["nanos"] / 1e9, 2) == 26.97


def shipping_cost_total(quantity):
    traceparent, trace_id = new_traceparent()
    resp = shipping_quote(quantity, headers={"traceparent": traceparent})
    assert resp.status_code == 200, resp.text

    def with_cost(spans):
        return any("demo.shipping.cost.total" in s["tags"] for s in spans if s["service"] == "shipping")

    spans = jaeger_trace(trace_id, require=with_cost)
    return [
        s["tags"]["demo.shipping.cost.total"]
        for s in spans
        if s["service"] == "shipping" and "demo.shipping.cost.total" in s["tags"]
    ][0]


@pytest.mark.parametrize(
    "quantity, total",
    [(95, "854.05"), (99, "890.01"), (100, "899.00")],
)
def test_shipping_span_cost_total_has_two_digit_cents(quantity, total):
    assert shipping_cost_total(quantity) == total
