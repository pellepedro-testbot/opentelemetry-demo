# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The collector's traces pipeline masks sensitive span attributes before export.
Spans are sent as OTLP/JSON through the frontend proxy's /otlp-http route and
read back from Jaeger.
"""

import hashlib
import time

import pytest
import requests

from demo_stack import OTLP_HTTP_TRACES_URL, new_trace_id, trace_spans

ORIGIN = "http://localhost:8080"


def _send_span(attributes):
    trace_id = new_trace_id()
    now = time.time_ns()
    payload = {
        "resourceSpans": [
            {
                "resource": {"attributes": [{"key": "service.name", "value": {"stringValue": "probe-redaction"}}]},
                "scopeSpans": [
                    {
                        "scope": {"name": "redaction-probe"},
                        "spans": [
                            {
                                "traceId": trace_id,
                                "spanId": trace_id[:16],
                                "name": "redaction-probe",
                                "kind": 1,
                                "startTimeUnixNano": str(now - 1_000_000),
                                "endTimeUnixNano": str(now),
                                "attributes": [
                                    {"key": key, "value": {"stringValue": value}}
                                    for key, value in attributes.items()
                                ],
                            }
                        ],
                    }
                ],
            }
        ]
    }
    resp = requests.post(OTLP_HTTP_TRACES_URL, json=payload, timeout=10)
    assert resp.status_code == 200, resp.text[:300]
    return trace_spans(trace_id)[0]["tags"]


@pytest.mark.parametrize(
    "key,value",
    [
        ("password", "hunter2"),
        ("db.secret.key", "abc"),
        ("demo.payment.card_pin", "1234"),
        ("user_password", "x"),
    ],
)
def test_sensitive_key_is_masked(key, value):
    assert _send_span({key: value})[key] == "****"


@pytest.mark.parametrize(
    "key,value",
    [
        ("demo.order.id", "1234567812345678"),
        ("note", "4111 1111 1111 1111"),
        ("demo.keep", "keepme"),
    ],
)
def test_unrelated_key_passes_unchanged(key, value):
    assert _send_span({key: value})[key] == value


def test_email_is_replaced_by_its_hash():
    tags = _send_span({"user.email": "a@b.co"})
    assert "user.email" not in tags
    assert tags["user.hash"] == hashlib.sha256(b"a@b.co").hexdigest()


def test_card_number_counts_as_ignored_key():
    tags = _send_span({"demo.payment.card_number": "4432-8015-6152-0454"})
    assert tags["redaction.ignored.count"] == 1


def test_card_number_keeps_last_four_digits():
    tags = _send_span({"demo.payment.card_number": "4432-8015-6152-0454"})
    assert tags["demo.payment.card_number"] == "****-****-****-0454"


def test_undashed_card_number_is_not_exported_in_full():
    tags = _send_span({"demo.payment.card_number": "4432801561520454"})
    assert "4432801561520454" not in str(tags.get("demo.payment.card_number", ""))


def test_span_without_sensitive_keys_has_no_masked_count():
    tags = _send_span({"demo.safe": "x", "http.method": "GET"})
    assert "redaction.masked.count" not in tags


@pytest.fixture(scope="module")
def masked_span():
    return _send_span(
        {
            "password": "p",
            "db.secret.key": "s",
            "demo.payment.card_pin": "1234",
            "user_password": "u",
            "demo.keep": "k",
            "http.method": "GET",
        }
    )


def test_masked_count_equals_masked_attributes(masked_span):
    assert masked_span["redaction.masked.count"] == 4


def test_redaction_summary_is_counts_only(masked_span):
    assert "redaction.masked.keys" not in masked_span
    assert "redaction.ignored.keys" not in masked_span


# --- browser OTLP CORS ------------------------------------------------------


def _preflight(request_headers):
    return requests.options(
        OTLP_HTTP_TRACES_URL,
        headers={
            "Origin": ORIGIN,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": request_headers,
        },
        timeout=10,
    )


def _allowed_headers(resp):
    return [h.strip().lower() for h in resp.headers.get("Access-Control-Allow-Headers", "").split(",")]


def test_preflight_allows_traceparent():
    resp = _preflight("traceparent")
    assert "traceparent" in _allowed_headers(resp)


@pytest.mark.parametrize("request_headers", ["baggage", "baggage,content-type,traceparent"])
def test_preflight_allows_baggage(request_headers):
    resp = _preflight(request_headers)
    assert "baggage" in _allowed_headers(resp)

