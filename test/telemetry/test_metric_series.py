# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Metric series the change renames or adds: the recommendation counter unit,
SDK self-observability metrics and error.type on failed RPC durations."""

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import flag_variant, order_with_items


def _series(prometheus_url, query):
    resp = requests.get(f"{prometheus_url}/api/v1/query", params={"query": query}, timeout=10)
    resp.raise_for_status()
    return resp.json().get("data", {}).get("result", [])


def test_recommendation_requests_counter_uses_recommendation_unit(prometheus_url):
    """The counter keeps the name the demo dashboard queries, without a unit suffix."""
    for _ in range(3):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": "0PUK6V6EV0", "currencyCode": "USD"},
            timeout=15,
        )
        assert resp.status_code == 200

    poll_until(
        lambda: _series(prometheus_url, "demo_recommendation_requests_total"),
        "demo_recommendation_requests_total in Prometheus",
    )
    assert _series(prometheus_url, "demo_recommendation_requests_recommendations_total") == []


@pytest.mark.parametrize("service", ["checkout", "product-catalog", "recommendation"])
def test_sdk_self_observability_metrics(prometheus_url, service):
    """Go and Python SDKs export their otel_sdk_* self-observability metrics."""
    poll_until(
        lambda: _series(prometheus_url, f'{{__name__=~"otel_sdk_.*", service_name="{service}"}}'),
        f"otel_sdk_* metrics for '{service}' in Prometheus",
    )


def test_failed_place_order_records_error_type(prometheus_url):
    """A declined PlaceOrder leaves an error_type label on checkout's RPC server duration."""
    with flag_variant("paymentFailure", "100%"):
        _, resp = order_with_items([("0PUK6V6EV0", 1)])
    assert resp.status_code == 422, resp.text

    poll_until(
        lambda: _series(
            prometheus_url,
            'rpc_server_call_duration_seconds_count{service_name="checkout", rpc_method="oteldemo.CheckoutService/PlaceOrder", error_type!=""}',
        ),
        "checkout rpc_server_call_duration with an error_type label in Prometheus",
    )
