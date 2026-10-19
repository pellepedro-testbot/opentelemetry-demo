# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Span attributes and events of a charge, read from the collector's debug output."""

import random

import grpc
import pytest

from collector_spans import CollectorLog, event_names, trace_spans
from demo_grpc import RPC_TIMEOUT, charge_request, money

CHARGE_ATTEMPTS = 3


def charge_spans(payment, card_number, nanos=0, currency="USD", **kwargs):
    """The units charged and the spans of that charge's trace.

    Each attempt charges a unique amount so its span can be told apart; a charge
    is repeated when the collector log lost its spans while rotating.
    """
    for _ in range(CHARGE_ATTEMPTS):
        units = random.randint(100000, 999999)
        with CollectorLog() as log:
            try:
                payment.Charge(charge_request(card_number, amount=money(currency, units, nanos), **kwargs), timeout=RPC_TIMEOUT)
            except grpc.RpcError:
                pass
            server = log.wait_for_spans(
                lambda s: s.name == "oteldemo.PaymentService/Charge"
                and s.attributes.get("demo.payment.currency") == currency
                and s.attributes.get("demo.payment.amount", "").startswith(f"{units}.")
            )
            if not server:
                continue
            if log.wait_for_spans(lambda s: s.trace_id == server[0].trace_id and s.name == "charge", timeout=15):
                return units, trace_spans(log, server[0].trace_id)
    pytest.fail(f"no complete charge trace was exported in {CHARGE_ATTEMPTS} attempts")


def attribute(spans, key):
    values = {s.attributes[key] for s in spans if key in s.attributes}
    assert len(values) == 1, f"{key} recorded as {values}"
    return values.pop()


@pytest.mark.parametrize("nanos, decimals", [(20000000, "02"), (70000000, "07"), (0, "00")])
def test_amount_is_two_place_decimal(payment, nanos, decimals):
    """R4a, payment-amount-small-nanos-format"""
    units, spans = charge_spans(payment, "4111111111111111", nanos)
    assert attribute(spans, "demo.payment.amount") == f"{units}.{decimals}"


def test_currency_recorded(payment):
    """R4b"""
    _, spans = charge_spans(payment, "4111111111111111", currency="EUR")
    assert attribute(spans, "demo.payment.currency") == "EUR"


@pytest.mark.parametrize(
    "card_number, network",
    [("378282246310005", "amex"), ("6011111111111117", "discover"), ("3530111333300000", "unknown")],
)
def test_card_network_recorded(payment, card_number, network):
    """R4c"""
    _, spans = charge_spans(payment, card_number)
    assert attribute(spans, "demo.payment.card_network") == network


@pytest.mark.parametrize("year, outcome", [(2030, "approved"), (2020, "declined")])
def test_outcome_recorded(payment, year, outcome):
    """R4d"""
    _, spans = charge_spans(payment, "4111111111111111", year=year)
    assert attribute(spans, "demo.payment.outcome") == outcome


def test_approved_charge_events(payment):
    """R4e"""
    _, spans = charge_spans(payment, "4111111111111111")
    events = event_names(spans)
    for name in ["charge.received", "card.identified", "card.validated", "charge.approved"]:
        assert name in events, events


def test_declined_charge_events(payment):
    """R4e"""
    _, spans = charge_spans(payment, "4111111111111111", year=2020)
    events = event_names(spans)
    for name in ["charge.received", "card.identified", "charge.declined"]:
        assert name in events, events
    assert "charge.approved" not in events
