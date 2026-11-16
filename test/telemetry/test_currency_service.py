# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Currency service: current RPC semantic conventions on its server spans, and
a graceful shutdown on SIGTERM and SIGINT that still exports its last log."""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from observability import (
    container_text,
    docker,
    find_span,
    has_span,
    jaeger_trace,
    opensearch_logs,
    start_container_and_wait,
    stop_container,
    wait_for_logs,
)
from storefront import new_traceparent

SUPPORTED = "oteldemo.CurrencyService/GetSupportedCurrencies"
CONVERT = "oteldemo.CurrencyService/Convert"


def currency_span_tags(path, operation):
    traceparent, trace_id = new_traceparent()
    resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", headers={"traceparent": traceparent}, timeout=20)
    assert resp.status_code == 200, resp.text
    spans = jaeger_trace(trace_id, require=has_span("currency", operation))
    return find_span(spans, "currency", operation)["tags"]


@pytest.fixture(scope="module")
def supported_currencies_span():
    return currency_span_tags("/api/currency", SUPPORTED)


@pytest.fixture(scope="module")
def convert_span():
    return currency_span_tags("/api/products?currencyCode=EUR", CONVERT)


@pytest.mark.parametrize("span_fixture, method", [("supported_currencies_span", SUPPORTED), ("convert_span", CONVERT)])
def test_currency_span_has_rpc_system_name_grpc(request, span_fixture, method):
    assert request.getfixturevalue(span_fixture).get("rpc.system.name") == "grpc"


@pytest.mark.parametrize("span_fixture, method", [("supported_currencies_span", SUPPORTED), ("convert_span", CONVERT)])
def test_currency_span_has_rpc_response_status_ok(request, span_fixture, method):
    assert request.getfixturevalue(span_fixture).get("rpc.response.status_code") == "OK"


@pytest.mark.parametrize("span_fixture, method", [("supported_currencies_span", SUPPORTED), ("convert_span", CONVERT)])
def test_currency_span_has_fully_qualified_rpc_method(request, span_fixture, method):
    assert request.getfixturevalue(span_fixture).get("rpc.method") == method


@pytest.mark.parametrize("span_fixture", ["supported_currencies_span", "convert_span"])
@pytest.mark.parametrize("legacy", ["rpc.service", "rpc.system", "rpc.grpc.status_code"])
def test_currency_span_drops_legacy_rpc_attribute(request, span_fixture, legacy):
    assert legacy not in request.getfixturevalue(span_fixture)


def wait_for_currency():
    start_container_and_wait("currency")
    poll_until(
        lambda: requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10).status_code == 200,
        "storefront answering /api/currency again",
        timeout=120,
    )


@pytest.fixture(scope="module")
def sigterm_stop():
    stopped_at = time.time()
    try:
        elapsed, exit_code = stop_container("currency")
        output = container_text("currency", stopped_at)
    finally:
        wait_for_currency()
    return {"elapsed": elapsed, "exit_code": exit_code, "output": output, "at": stopped_at}


@pytest.fixture(scope="module")
def sigint_stop(sigterm_stop):
    stopped_at = time.time()
    try:
        docker("kill", "--signal=SIGINT", "currency")
        poll_until(
            lambda: docker("inspect", "-f", "{{.State.Status}}", "currency").stdout.strip() == "exited",
            "currency to exit after SIGINT",
            timeout=20,
            interval=1,
        )
        exit_code = int(docker("inspect", "-f", "{{.State.ExitCode}}", "currency").stdout.strip())
        output = container_text("currency", stopped_at)
    finally:
        wait_for_currency()
    return {"exit_code": exit_code, "output": output}


def test_sigterm_prints_shutdown_message(sigterm_stop):
    assert "Received SIGTERM, shutting down Currency Server" in sigterm_stop["output"]


def test_sigterm_exits_with_code_zero(sigterm_stop):
    assert sigterm_stop["exit_code"] == 0


def test_docker_stop_finishes_before_kill(sigterm_stop):
    assert sigterm_stop["elapsed"] < 9, sigterm_stop["elapsed"]


def test_shutdown_log_reaches_opensearch(sigterm_stop):
    since = int(sigterm_stop["at"] * 1000)
    records = wait_for_logs(
        [
            {"match_phrase": {"resource.service.name": "currency"}},
            {"term": {"eventName": "currency.server.stopping"}},
            {"range": {"observedTimestamp": {"gte": since, "format": "epoch_millis"}}},
        ],
        "currency.server.stopping record in OpenSearch",
    )
    assert records[0]["eventName"] == "currency.server.stopping"


def test_restart_logs_server_started_event(sigterm_stop):
    since = int(sigterm_stop["at"] * 1000)
    records = wait_for_logs(
        [
            {"match_phrase": {"resource.service.name": "currency"}},
            {"match_phrase": {"body": "Currency Server started"}},
            {"range": {"observedTimestamp": {"gte": since, "format": "epoch_millis"}}},
        ],
        "'Currency Server started' record in OpenSearch after restart",
    )
    assert records[0]["eventName"] == "currency.server.started"


def test_sigint_prints_shutdown_message(sigint_stop):
    assert "Received SIGINT, shutting down Currency Server" in sigint_stop["output"]


def test_sigint_exits_with_code_zero(sigint_stop):
    assert sigint_stop["exit_code"] == 0
