# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Payment after the move to the operator autoinstrumentation image: pino JSON
on stdout, log records in OpenSearch from instrumentation-pino, and traces."""

import time

import pytest

from conftest import poll_until
from observability import (
    container_json_lines,
    find_span,
    has_span,
    jaeger_trace,
    opensearch_logs,
    service_body_query,
    wait_for_logs,
)
from storefront import place_order


@pytest.fixture(scope="module")
def charged_order():
    started = time.time()
    _, resp, trace_id = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text

    def transaction_line():
        return [
            line
            for line in container_json_lines("payment", started)
            if line.get("trace_id") == trace_id and line.get("msg") == "Transaction complete."
        ]

    lines = poll_until(transaction_line, "payment 'Transaction complete.' stdout line", timeout=30, interval=2)
    return {"trace_id": trace_id, "line": lines[0]}


def test_payment_writes_transaction_complete_json_line(charged_order):
    line = charged_order["line"]
    assert (line["service.name"], line["msg"]) == ("payment", "Transaction complete.")


def test_transaction_line_has_last_four_digits_only(charged_order):
    line = charged_order["line"]
    assert line["lastFourDigits"] == "0454"
    raw = str(line)
    assert "4432801561520454" not in raw
    assert "4432-8015-6152-0454" not in raw


def test_transaction_complete_reaches_opensearch(charged_order):
    records = wait_for_logs(
        service_body_query("payment", "Transaction complete.")
        + [{"term": {"traceId": charged_order["trace_id"]}}],
        "payment 'Transaction complete.' record in OpenSearch",
    )
    assert records[0]["resource"]["service.name"] == "payment"


def test_payment_log_records_come_from_pino_instrumentation(charged_order):
    records = wait_for_logs(
        [{"match_phrase": {"resource.service.name": "payment"}}, {"term": {"traceId": charged_order["trace_id"]}}],
        "payment records of the order in OpenSearch",
    )
    assert {r["instrumentationScope"]["name"] for r in records} == {"@opentelemetry/instrumentation-pino"}


def test_one_transaction_complete_record_per_charge(charged_order):
    transaction_id = charged_order["line"]["transactionId"]
    query = service_body_query("payment", "Transaction complete.") + [
        {"match_phrase": {"attributes.transactionId": transaction_id}}
    ]
    wait_for_logs(query, f"'Transaction complete.' for transaction {transaction_id}")
    time.sleep(30)
    assert len(opensearch_logs(query)) == 1


def test_checkout_trace_holds_payment_charge_server_span(charged_order):
    spans = jaeger_trace(
        charged_order["trace_id"], require=has_span("payment", "oteldemo.PaymentService/Charge")
    )
    span = find_span(spans, "payment", "oteldemo.PaymentService/Charge")
    assert span["tags"].get("span.kind") == "server"
