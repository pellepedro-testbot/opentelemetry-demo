# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Charge span attributes and events in Jaeger, and the 'Transaction complete.' log line."""

import re
import time

import grpc
import pytest

from backends import poll_until
from containers import json_logs_since
from demo_grpc import money, new_trace, pb, stub
from storefront import AMEX, DISCOVER, JCB, MASTERCARD, VISA
from traces import attribute_values, event_names, span_named, trace_spans

SERVER_SPAN = "oteldemo.PaymentService/Charge"


def charge(number, amount=None, month=12, year=2030, cvv=123):
    """Charge a card in a trace of its own; returns (trace id, transaction id or None)."""
    trace_id, metadata = new_trace()
    request = pb.ChargeRequest(
        amount=amount or money("USD", 10),
        credit_card=pb.CreditCardInfo(
            credit_card_number=number,
            credit_card_cvv=cvv,
            credit_card_expiration_year=year,
            credit_card_expiration_month=month,
        ),
    )
    try:
        transaction_id = stub("payment").Charge(request, metadata=metadata, timeout=15).transaction_id
    except grpc.RpcError:
        transaction_id = None
    return trace_id, transaction_id


def charge_spans(jaeger_url, trace_id):
    return trace_spans(jaeger_url, "payment", trace_id, SERVER_SPAN)


def payment_attributes(jaeger_url, trace_id):
    """The demo.payment.* attributes of every payment span in the trace, merged."""
    merged = {}
    for span in charge_spans(jaeger_url, trace_id):
        merged.update(attribute_values(span))
    return merged


def server_attributes(jaeger_url, trace_id):
    return attribute_values(span_named(charge_spans(jaeger_url, trace_id), SERVER_SPAN))


@pytest.mark.parametrize("units,nanos,expected", [(10, 500000000, "10.50")])
def test_r5a_amount_is_a_two_place_decimal(jaeger_url, units, nanos, expected):
    trace_id, _ = charge(VISA, amount=money("USD", units, nanos))
    assert server_attributes(jaeger_url, trace_id)["demo.payment.amount"] == expected


def test_payment_amount_small_nanos(jaeger_url):
    trace_id, _ = charge(VISA, amount=money("USD", 489, 20000000))
    assert server_attributes(jaeger_url, trace_id)["demo.payment.amount"] == "489.02"


def test_r5b_currency_is_the_charge_currency(jaeger_url):
    trace_id, transaction_id = charge(VISA, amount=money("EUR", 10))
    assert transaction_id
    assert server_attributes(jaeger_url, trace_id)["demo.payment.currency"] == "EUR"


@pytest.mark.parametrize(
    "number,network",
    [(AMEX, "amex"), (DISCOVER, "discover"), (VISA, "visa"), (MASTERCARD, "mastercard"), (JCB, "unknown")],
)
def test_r5c_card_network_is_identified(jaeger_url, number, network):
    trace_id, _ = charge(number, cvv=1234)
    assert payment_attributes(jaeger_url, trace_id)["demo.payment.card_network"] == network


@pytest.mark.parametrize("number,outcome", [(VISA, "approved"), (JCB, "declined")])
def test_r5d_outcome_is_recorded(jaeger_url, number, outcome):
    trace_id, _ = charge(number)
    assert server_attributes(jaeger_url, trace_id)["demo.payment.outcome"] == outcome


def test_r5e_events_of_an_approved_charge(jaeger_url):
    trace_id, transaction_id = charge(VISA)
    assert transaction_id
    events = event_names(charge_spans(jaeger_url, trace_id))
    assert {"charge.received", "card.identified", "card.validated", "charge.approved"} <= events, events


def test_r5e_events_of_a_declined_charge(jaeger_url):
    trace_id, transaction_id = charge(JCB)
    assert transaction_id is None
    events = event_names(charge_spans(jaeger_url, trace_id))
    assert {"charge.received", "card.identified", "charge.declined"} <= events, events
    assert not events & {"card.validated", "charge.approved"}, events


def test_r5f_card_hash_is_a_fingerprint_and_never_the_pan(jaeger_url):
    visa_trace, _ = charge(VISA)
    mastercard_trace, _ = charge(MASTERCARD)
    visa = payment_attributes(jaeger_url, visa_trace)
    mastercard = payment_attributes(jaeger_url, mastercard_trace)
    assert re.fullmatch(r"[0-9a-f]{64}", visa["demo.payment.card_hash"])
    assert visa["demo.payment.card_hash"] != mastercard["demo.payment.card_hash"]
    for span in charge_spans(jaeger_url, visa_trace):
        for key, value in attribute_values(span).items():
            assert VISA not in str(value), key


def test_r5f_same_card_with_spaces_has_the_same_hash(jaeger_url):
    plain, _ = charge(VISA)
    spaced, _ = charge("4111 1111 1111 1111")
    assert (
        payment_attributes(jaeger_url, plain)["demo.payment.card_hash"]
        == payment_attributes(jaeger_url, spaced)["demo.payment.card_hash"]
    )


def test_payment_hash_format_independent(jaeger_url):
    plain, _ = charge(VISA)
    mixed, _ = charge("4111 1111-1111 1111")
    assert (
        payment_attributes(jaeger_url, plain)["demo.payment.card_hash"]
        == payment_attributes(jaeger_url, mixed)["demo.payment.card_hash"]
    )


def test_r5g_transaction_log_carries_the_fingerprint_not_the_pan(jaeger_url):
    since = time.time()
    trace_id, transaction_id = charge(VISA)
    assert transaction_id

    def logged():
        return next(
            (r for r in json_logs_since("payment", since)
             if r.get("msg") == "Transaction complete." and r.get("transactionId") == transaction_id),
            None,
        )

    record = poll_until(logged, f"'Transaction complete.' log of {transaction_id}", timeout=30, interval=2)
    assert record["cardHash"] == payment_attributes(jaeger_url, trace_id)["demo.payment.card_hash"]
    assert record["cardNetwork"] == "visa"
    assert record["lastFourDigits"] == "1111"
    assert VISA not in str(record)
