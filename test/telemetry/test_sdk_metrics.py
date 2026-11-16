# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Metrics the services report to Prometheus: SDK self-observability, the
recommendation request counter and payment transactions."""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from observability import prometheus_query, prometheus_sum
from storefront import place_order

METRIC_TIMEOUT = 120


def wait_for_series(query):
    return poll_until(
        lambda: prometheus_query(query), f"Prometheus series for {query}", timeout=METRIC_TIMEOUT
    )


def recommendations(count):
    for _ in range(count):
        requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": "OLJCESPC7Z"},
            timeout=10,
        ).raise_for_status()


@pytest.fixture(scope="module")
def checkout_order():
    _, resp, _ = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text


def test_recommendation_counter_has_no_unit_suffix():
    recommendations(3)
    wait_for_series("demo_recommendation_requests_total")
    assert prometheus_query("demo_recommendation_requests_recommendations_total") == []


def test_recommendation_requests_counted():
    recommendations(3)
    assert wait_for_series("demo_recommendation_requests_total")


def test_recommendation_counter_grows():
    query = 'demo_recommendation_requests_total{service_name="recommendation"}'
    wait_for_series(query)
    before = prometheus_sum(query)
    recommendations(10)
    poll_until(lambda: prometheus_sum(query) > before, f"{query} to grow past {before}", timeout=METRIC_TIMEOUT)


@pytest.mark.parametrize(
    "metric",
    [
        "otel_sdk_span_started_total",
        "otel_sdk_processor_span_processed_total",
        "otel_sdk_exporter_span_exported_total",
    ],
)
def test_checkout_reports_sdk_span_metrics(checkout_order, metric):
    assert wait_for_series(f'{metric}{{service_name="checkout"}}')


@pytest.mark.parametrize(
    "metric",
    [
        "otel_sdk_span_started_total",
        "otel_sdk_processor_span_processed_total",
        "otel_sdk_exporter_span_exported_total",
    ],
)
def test_product_catalog_reports_sdk_span_metrics(metric):
    assert wait_for_series(f'{metric}{{service_name="product-catalog"}}')


@pytest.mark.parametrize(
    "metric", ["otel_sdk_span_started_total", "otel_sdk_processor_span_processed_total"]
)
def test_recommendation_reports_sdk_span_metrics(metric):
    recommendations(2)
    assert wait_for_series(f'{metric}{{service_name="recommendation"}}')


@pytest.mark.parametrize(
    "metric", ["otel_sdk_processor_span_processed_total", "otel_sdk_log_created_total"]
)
def test_load_generator_reports_sdk_metrics(metric):
    assert wait_for_series(f'{metric}{{service_name="load-generator"}}')


def test_spans_processed_successfully_query_returns_data():
    assert wait_for_series('sum(rate(otel_sdk_processor_span_processed_total{service_name=~".*",error_type=""}[5m]))')


def test_payment_transactions_grow_after_order():
    query = 'demo_payment_transactions_total{service_name="payment"}'
    before = prometheus_sum(query)
    _, resp, _ = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text
    time.sleep(1)
    poll_until(lambda: prometheus_sum(query) > before, f"{query} to grow past {before}", timeout=METRIC_TIMEOUT)
