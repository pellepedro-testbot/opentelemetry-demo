# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Currency's server spans use the current RPC semantic conventions."""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, JAEGER_URL, poll_until

CASES = [
    ("oteldemo.CurrencyService/Convert", "/api/products", {"currencyCode": "EUR"}),
    ("oteldemo.CurrencyService/GetSupportedCurrencies", "/api/currency", {}),
]


def currency_spans_since(operation, start_us):
    def fetch():
        resp = requests.get(
            f"{JAEGER_URL}/jaeger/ui/api/traces",
            params={"service": "currency", "operation": operation, "start": start_us, "limit": 3, "lookback": "1h"},
            timeout=15,
        )
        resp.raise_for_status()
        found = []
        for trace in resp.json().get("data") or []:
            for span in trace["spans"]:
                service = trace["processes"][span["processID"]]["serviceName"]
                if service == "currency" and span["operationName"] == operation and span["startTime"] >= start_us:
                    found.append({t["key"]: t["value"] for t in span["tags"]})
        return found

    return poll_until(fetch, f"currency '{operation}' span in Jaeger", timeout=90)


@pytest.mark.parametrize("operation,path,params", CASES, ids=["Convert", "GetSupportedCurrencies"])
def test_currency_span_uses_current_rpc_semconv(operation, path, params):
    start_us = int(time.time() * 1_000_000)
    resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", params=params, timeout=15)
    assert resp.status_code == 200

    for tags in currency_spans_since(operation, start_us):
        assert tags.get("rpc.system.name") == "grpc"
        assert tags.get("rpc.method") == operation
        assert tags.get("rpc.response.status_code") == "OK"
        assert "rpc.service" not in tags
        assert "rpc.grpc.status_code" not in tags
