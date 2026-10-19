# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Accepted card networks and decline messages of PaymentService/Charge."""

import grpc
import pytest

from demo_grpc import RPC_TIMEOUT, charge_request
from storefront_api import add_to_cart, checkout, new_user_id

ACCEPTED_NETWORKS = "Visa, Mastercard, American Express or Discover"


def charge(payment, card_number, **kwargs):
    return payment.Charge(charge_request(card_number, **kwargs), timeout=RPC_TIMEOUT)


def decline_message(payment, card_number, **kwargs):
    with pytest.raises(grpc.RpcError) as declined:
        charge(payment, card_number, **kwargs)
    return declined.value.details()


@pytest.mark.parametrize("card_number", ["4111111111111111", "5555555555554444"])
def test_visa_and_mastercard_approved(payment, card_number):
    """R3a"""
    assert charge(payment, card_number).transaction_id


@pytest.mark.parametrize("card_number", ["2221000000000009", "2720990000000007"])
def test_mastercard_2_series_approved(payment, card_number):
    """R3a, payment-mastercard-2series-approved"""
    assert charge(payment, card_number).transaction_id


@pytest.mark.parametrize("card_number", ["378282246310005", "371449635398431"])
def test_american_express_approved(payment, card_number):
    """R3b"""
    assert charge(payment, card_number).transaction_id


@pytest.mark.parametrize("card_number", ["6011111111111117", "6011000990139424", "6500000000000002"])
def test_discover_approved(payment, card_number):
    """R3c"""
    assert charge(payment, card_number).transaction_id


def test_discover_644_approved(payment):
    """R3c, payment-discover-644-approved"""
    assert charge(payment, "6440000000000005").transaction_id


@pytest.mark.parametrize("card_number", ["4111 1111 1111 1111", "4111-1111-1111-1111", "3782 822463 10005"])
def test_card_number_with_spaces_or_dashes_approved(payment, card_number):
    """R3d"""
    assert charge(payment, card_number).transaction_id


@pytest.mark.parametrize("card_number", ["3530111333300000", "30569309025904"])
def test_other_network_declined_with_accepted_networks(payment, card_number):
    """R3e"""
    assert ACCEPTED_NETWORKS in decline_message(payment, card_number)


@pytest.mark.parametrize(
    "card_number, network, last_four",
    [("4111111111111111", "Visa", "1111"), ("378282246310005", "American Express", "0005")],
)
def test_expired_card_message_names_network_and_last_four(payment, card_number, network, last_four):
    """R3f"""
    message = decline_message(payment, card_number, year=2020, month=1)
    assert "expired" in message
    assert network in message
    assert last_four in message


def test_invalid_number_message_names_last_four(payment):
    """R3g"""
    assert "1112" in decline_message(payment, "4111111111111112")


def test_invalid_number_message_names_network(payment):
    """R3g, payment-invalid-number-message-names-network"""
    assert "Visa" in decline_message(payment, "4111111111111112")


def test_amex_bad_checksum_declined(payment):
    """R3h, payment-amex-bad-checksum-declined"""
    with pytest.raises(grpc.RpcError):
        charge(payment, "378282246310006")


def test_amex_wrong_length_declined(payment):
    """R3h"""
    with pytest.raises(grpc.RpcError):
        charge(payment, "37828224631000")


def test_checkout_with_american_express_places_order():
    """R3i"""
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    resp = checkout(user_id, "378282246310005")
    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_checkout_with_unaccepted_network_fails():
    """R3i"""
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    resp = checkout(user_id, "3530111333300000")
    assert resp.status_code == 422, resp.text
    assert resp.json()["code"] == "PAYMENT_FAILED"
