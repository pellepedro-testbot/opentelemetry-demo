# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Collector-side redaction of span attributes: spans posted straight to the
collector's OTLP/HTTP receiver are read back from Jaeger after export."""

import hashlib
import os
import secrets
import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from observability import jaeger_trace

OTLP_HTTP_URL = os.environ.get("OTLP_HTTP_URL", f"{FRONTEND_PROXY_URL}/otlp-http")


def exported_span_tags(attributes):
    """Send one span with the given string attributes and return the tags
    Jaeger stored for it."""
    trace_id = secrets.token_hex(16)
    now = time.time_ns()
    payload = {
        "resourceSpans": [
            {
                "resource": {
                    "attributes": [
                        {
                            "key": "service.name",
                            "value": {"stringValue": f"testbot-redaction-{uuid.uuid4()}"},
                        }
                    ]
                },
                "scopeSpans": [
                    {
                        "scope": {"name": "telemetry-tests"},
                        "spans": [
                            {
                                "traceId": trace_id,
                                "spanId": secrets.token_hex(8),
                                "name": "redaction-check",
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
    resp = requests.post(f"{OTLP_HTTP_URL}/v1/traces", json=payload, timeout=10)
    resp.raise_for_status()
    spans = jaeger_trace(trace_id)
    return spans[0]["tags"]


def test_password_attribute_is_masked():
    assert exported_span_tags({"password": "hunter2"}).get("password") == "****"


def test_key_containing_secret_is_masked():
    assert exported_span_tags({"db.secret.key": "abc"}).get("db.secret.key") == "****"


def test_numeric_order_id_passes_unchanged():
    tags = exported_span_tags({"demo.order.id": "1234567812345678"})
    assert tags.get("demo.order.id") == "1234567812345678"


def test_card_like_value_under_unrelated_key_passes_unchanged():
    tags = exported_span_tags({"note": "4111 1111 1111 1111"})
    assert tags.get("note") == "4111 1111 1111 1111"


def test_user_email_replaced_by_its_sha256_hash():
    tags = exported_span_tags({"user.email": "a@example.com"})
    assert "user.email" not in tags
    assert tags.get("user.hash") == hashlib.sha256(b"a@example.com").hexdigest()


def test_card_number_span_counts_one_ignored_key():
    tags = exported_span_tags({"demo.payment.card_number": "4432-8015-6152-0454"})
    assert tags.get("redaction.ignored.count") == 1


def test_span_without_sensitive_attributes_has_no_masked_count():
    tags = exported_span_tags({"demo.keep": "x"})
    assert "redaction.masked.count" not in tags


def test_card_pin_attribute_is_masked():
    tags = exported_span_tags({"demo.payment.card_pin": "1234"})
    assert tags.get("demo.payment.card_pin") == "****"


def test_key_containing_password_is_masked():
    assert exported_span_tags({"user_password": "pw"}).get("user_password") == "****"


def test_unrelated_attribute_passes_unchanged():
    assert exported_span_tags({"demo.keep": "keep-me"}).get("demo.keep") == "keep-me"


def test_card_number_masked_to_last_four():
    tags = exported_span_tags({"demo.payment.card_number": "4432-8015-6152-0454"})
    assert tags.get("demo.payment.card_number") == "****-****-****-0454"


@pytest.fixture(scope="module")
def three_masked_one_kept():
    return exported_span_tags(
        {"password": "a", "user_password": "b", "db.secret.key": "c", "demo.keep": "d"}
    )


def test_masked_count_equals_number_of_masked_attributes(three_masked_one_kept):
    assert three_masked_one_kept.get("redaction.masked.count") == 3


def test_three_sensitive_keys_masked_and_others_kept(three_masked_one_kept):
    tags = three_masked_one_kept
    assert (tags.get("password"), tags.get("user_password"), tags.get("db.secret.key")) == (
        "****", "****", "****",
    )
    assert tags.get("demo.keep") == "d"
    assert tags.get("redaction.masked.count") == 3


def test_redaction_summary_holds_counts_only():
    tags = exported_span_tags(
        {"password": "a", "demo.payment.card_number": "4432-8015-6152-0454"}
    )
    assert "redaction.masked.count" in tags
    assert "redaction.masked.keys" not in tags
    assert "redaction.ignored.keys" not in tags
