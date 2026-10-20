# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Card networks, charge telemetry and the card fingerprint of the payment service."""

import hashlib
import hmac
import random
import re
import time

import pytest

from conftest import (
    event_attributes,
    event_names,
    find_trace,
    merged_attributes,
    otlp_attributes,
    poll_until,
)
from docker_stack import container_logs, requires_docker, restart_count
from grpc_client import PAYMENT_ADDR, grpc_call
from storefront import AMEX, FUTURE_YEAR, JCB, VISA, add_to_cart, checkout, checkout_request, new_user

pytestmark = requires_docker

CHARGE = "oteldemo.PaymentService/Charge"
MASTERCARD = "5555555555554444"
CARD_HASH_SALT = "skyramp-test-salt"
ACCEPTED_NAMES = ("Visa", "Mastercard", "American Express", "Discover")
# Matches a lowercase hex string.
HEX = re.compile(r"^[0-9a-f]+$")


def luhn_complete(partial):
    """The partial number with the Luhn check digit appended."""
    total = 0
    for i, ch in enumerate(reversed(partial)):
        digit = int(ch)
        if i % 2 == 0:
            digit *= 2
            if digit > 9:
                digit -= 9
        total += digit
    return partial + str((10 - total % 10) % 10)


def charge(number, units=10, nanos=500000000, currency="USD", year=FUTURE_YEAR, month=1):
    amount = {"currencyCode": currency, "units": units}
    if nanos:
        amount["nanos"] = nanos
    return grpc_call(PAYMENT_ADDR, CHARGE, {
        "amount": amount,
        "creditCard": {
            "creditCardNumber": number,
            "creditCardCvv": 123,
            "creditCardExpirationYear": year,
            "creditCardExpirationMonth": month,
        },
    })


def assert_approved(number):
    result = charge(number)
    assert result.ok, f"{number}: {result.code} {result.message}"
    assert re.fullmatch(r"[0-9a-f-]{36}", result.body["transactionId"])


def unique_units():
    return random.randint(100000, 999999)


def approved_trace(jaeger_url, transaction_id):
    def has_transaction(span):
        return any(
            otlp_attributes(e.get("attributes")).get("demo.payment.transaction.id") == transaction_id
            for e in span.get("events", [])
        )
    return poll_until(
        lambda: find_trace(jaeger_url, "payment", has_transaction),
        f"payment trace for transaction {transaction_id}",
        timeout=60,
    )


def trace_with_amount(jaeger_url, amount):
    return poll_until(
        lambda: find_trace(
            jaeger_url,
            "payment",
            lambda span: otlp_attributes(span.get("attributes")).get("demo.payment.amount") == amount,
        ),
        f"payment trace for amount {amount}",
        timeout=60,
    )


def card_hash_of(jaeger_url, number):
    result = charge(number)
    assert result.ok, result.message
    return merged_attributes(approved_trace(jaeger_url, result.body["transactionId"]))["demo.payment.card_hash"]


def wait_for_payment():
    poll_until(lambda: charge(VISA).ok, "payment service to accept charges again", timeout=90, interval=3)


@pytest.mark.parametrize("number", [VISA, "4222222222222"])
def test_visa_is_approved(number):
    assert_approved(number)


@pytest.mark.parametrize("number", [MASTERCARD, "2223003122003222"])
def test_mastercard_is_approved(number):
    assert_approved(number)


@pytest.mark.parametrize("number", [AMEX, "371449635398431"])
def test_american_express_is_approved(number):
    assert_approved(number)


@pytest.mark.parametrize(
    "number", ["6011111111111117", luhn_complete("650000000000000"), luhn_complete("644000000000000")]
)
def test_discover_is_approved(number):
    assert_approved(number)


@pytest.mark.parametrize("number", ["4111 1111 1111 1111", "4111-1111-1111-1111", "3782-822463-10005"])
def test_card_number_may_contain_spaces_or_dashes(number):
    assert_approved(number)


@pytest.mark.parametrize("number", [JCB, "30569309025904"])
def test_other_network_is_told_which_networks_are_accepted(number):
    result = charge(number)
    assert not result.ok
    for name in ACCEPTED_NAMES:
        assert name in result.message, result.message


@pytest.mark.parametrize(
    "number,network,last_four",
    [("4111111111111112", "Visa", "1112"), ("378282246310006", "American Express", "0006")],
)
def test_luhn_invalid_card_names_network_and_last_four(number, network, last_four):
    result = charge(number)
    assert not result.ok
    assert network in result.message and last_four in result.message, result.message


def test_expired_card_names_network_and_last_four():
    result = charge(AMEX, year=2020, month=1)
    assert not result.ok
    for part in ("American Express", "0005", "1/2020"):
        assert part in result.message, result.message


@pytest.mark.parametrize("number", ["411111111111111", "37828224631000"])
def test_length_not_in_table_is_declined(number):
    assert not charge(number).ok


def test_approved_charge_span_attributes(jaeger_url):
    result = charge(AMEX, units=10, nanos=500000000)
    assert result.ok, result.message
    attrs = merged_attributes(approved_trace(jaeger_url, result.body["transactionId"]))
    assert attrs.get("demo.payment.amount") == "10.50"
    assert attrs.get("demo.payment.currency") == "USD"
    assert attrs.get("demo.payment.card_network") == "amex"
    assert attrs.get("demo.payment.outcome") == "approved"


def test_whole_amount_has_two_decimals(jaeger_url):
    result = charge(VISA, units=7, nanos=0, currency="EUR")
    assert result.ok, result.message
    attrs = merged_attributes(approved_trace(jaeger_url, result.body["transactionId"]))
    assert attrs.get("demo.payment.amount") == "7.00"
    assert attrs.get("demo.payment.currency") == "EUR"


def test_declined_charge_records_outcome_and_event(jaeger_url):
    units = unique_units()
    assert not charge(JCB, units=units, nanos=0).ok
    spans = trace_with_amount(jaeger_url, f"{units}.00")
    attrs = merged_attributes(spans)
    assert attrs.get("demo.payment.outcome") == "declined"
    assert attrs.get("demo.payment.card_network") == "unknown"
    names = event_names(spans)
    assert "charge.declined" in names
    assert "charge.approved" not in names


def test_approved_charge_has_step_events(jaeger_url):
    result = charge(VISA)
    assert result.ok, result.message
    spans = approved_trace(jaeger_url, result.body["transactionId"])
    assert {"charge.received", "card.identified", "card.validated", "charge.approved"} <= event_names(spans)
    identified = event_attributes(spans, "card.identified")
    assert identified and identified[0].get("demo.payment.card_network") == "visa"


def test_invalid_card_has_no_validated_event(jaeger_url):
    units = unique_units()
    assert not charge("4111111111111112", units=units, nanos=0).ok
    names = event_names(trace_with_amount(jaeger_url, f"{units}.00"))
    assert {"charge.received", "card.identified", "charge.declined"} <= names
    assert "card.validated" not in names


def test_same_card_same_fingerprint(jaeger_url):
    first = card_hash_of(jaeger_url, VISA)
    spaced = card_hash_of(jaeger_url, "4111 1111 1111 1111")
    other = card_hash_of(jaeger_url, MASTERCARD)
    assert first == spaced
    assert first != other


def test_card_number_is_never_stored(jaeger_url):
    result = charge(VISA)
    assert result.ok, result.message
    transaction_id = result.body["transactionId"]
    attrs = merged_attributes(approved_trace(jaeger_url, transaction_id))
    assert VISA not in attrs["demo.payment.card_hash"]
    assert VISA not in [str(v) for v in attrs.values()]

    lines = [line for line in container_logs("payment").splitlines() if transaction_id in line]
    complete = [line for line in lines if "Transaction complete." in line]
    assert complete, lines
    assert '"cardHash"' in complete[0] and '"lastFourDigits":"1111"' in complete[0]
    assert VISA not in complete[0]


def test_card_hash_is_full_pbkdf2_sha512_derivation(jaeger_url):
    card_hash = card_hash_of(jaeger_url, VISA)
    assert HEX.match(card_hash)
    assert len(card_hash) == 128


def test_card_hash_is_not_hmac_sha256(jaeger_url):
    card_hash = card_hash_of(jaeger_url, VISA)
    hmac_sha256 = hmac.new(CARD_HASH_SALT.encode(), VISA.encode(), hashlib.sha256).hexdigest()
    sha256 = hashlib.sha256(VISA.encode()).hexdigest()
    assert HEX.match(card_hash) and VISA not in card_hash
    assert card_hash != hmac_sha256
    assert card_hash != sha256


@pytest.mark.parametrize("number", ["", "   ", "--"])
def test_blank_card_number_is_declined_and_service_keeps_serving(number):
    try:
        blank = charge(number, units=1, nanos=0)
        follow_up = charge(VISA)
        assert not blank.ok
        assert blank.code not in ("Unavailable", "TRANSPORT_FAILURE"), blank
        assert follow_up.ok, follow_up
    finally:
        wait_for_payment()


def test_blank_card_number_checkout_is_declined():
    try:
        user = new_user()
        assert add_to_cart(user, "OLJCESPC7Z", 1).status_code == 200
        resp = checkout(checkout_request(user, "   "))
        assert 400 <= resp.status_code < 500, (resp.status_code, resp.text)

        user = new_user()
        assert add_to_cart(user, "OLJCESPC7Z", 1).status_code == 200
        resp = checkout(checkout_request(user, VISA))
        assert resp.status_code == 200, resp.text
    finally:
        wait_for_payment()


def test_blank_card_number_does_not_restart_payment():
    before = restart_count("payment")
    try:
        for number in ("   ", "--"):
            blank = charge(number, units=1, nanos=0)
            assert blank.code not in ("OK", "Unavailable", "TRANSPORT_FAILURE"), blank
            time.sleep(2)
            assert charge(VISA).ok
        assert restart_count("payment") == before
    finally:
        wait_for_payment()
