# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Metrics the demo reports to Prometheus: container metrics from the collector,
the renamed recommendation counter and the OpenTelemetry SDK self-observability
metrics of the instrumented services.
"""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_stack import prom_query, wait_for_series


def test_checkout_container_uptime_series():
    assert wait_for_series('{__name__=~"container_uptime.*",container_name="checkout"}')


def test_recommendation_metric_has_no_unit_suffix():
    assert prom_query("demo_recommendation_requests_recommendations_total") == []


def test_recommendation_requests_counter_exists():
    assert wait_for_series('demo_recommendation_requests_total{service_name="recommendation"}')


def _recommendation_total():
    result = prom_query("sum(demo_recommendation_requests_total)")
    return float(result[0]["value"][1]) if result else 0.0


def test_recommendation_requests_counter_grows():
    before = _recommendation_total()
    for _ in range(5):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": "OLJCESPC7Z", "sessionId": "telemetry-test", "currencyCode": "USD"},
            timeout=30,
        )
        assert resp.status_code == 200
    time.sleep(70)
    assert _recommendation_total() > before


@pytest.mark.parametrize(
    "service,metric",
    [
        ("checkout", "otel_sdk_span_started_total"),
        ("checkout", "otel_sdk_processor_span_processed_total"),
        ("checkout", "otel_sdk_exporter_span_exported_total"),
        ("recommendation", "otel_sdk_span_started_total"),
        ("recommendation", "otel_sdk_processor_span_processed_total"),
        ("load-generator", "otel_sdk_processor_span_processed_total"),
        ("load-generator", "otel_sdk_log_created_total"),
        ("product-catalog", "otel_sdk_span_started_total"),
        ("product-catalog", "otel_sdk_processor_span_processed_total"),
        ("product-catalog", "otel_sdk_exporter_span_exported_total"),
        ("ad", "otel_sdk_span_started_total"),
        ("fraud-detection", "otel_sdk_span_started_total"),
    ],
)
def test_sdk_self_metric_reported(service, metric):
    assert wait_for_series(f'{metric}{{service_name="{service}"}}')
