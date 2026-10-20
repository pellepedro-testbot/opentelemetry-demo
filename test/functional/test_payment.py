# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Accepted card networks and decline messages of PaymentService/Charge."""

import grpc
import pytest

from demo_grpc import pb, stub, money
from storefront import AMEX, DISCOVER, EXPLORASCOPE, JCB, MASTERCARD, VISA, checkout, new_user, add_to_cart

ACCEPTED_NETWORKS = "Visa, Mastercard, American Express or Discover"


def charge(number, month=12, year=2030, cvv=123):
    request = pb.ChargeRequest(
        amount=money("USD", 10),
        credit_card=pb.CreditCardInfo(
            credit_card_number=number,
            credit_card_cvv=cvv,
            credit_card_expiration_year=year,
            credit_card_expiration_month=month,
        ),
    )
    return stub("payment").Charge(request, timeout=15)


def decline_message(number, **card):
    with pytest.raises(grpc.RpcError) as declined:
        charge(number, **card)
    return declined.value.details()


def checkout_with(card_number, cvv=123):
    user_id = new_user()
    add_to_cart(user_id, EXPLORASCOPE, 1)
    return checkout(user_id, card_number=card_number, cvv=cvv, month=12, year=2030)


def test_r4a_american_express_is_accepted():
    assert charge(AMEX, cvv=1234).transaction_id


def test_checkout_amex_end_to_end():
    resp = checkout_with(AMEX, cvv=1234)
    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    assert order["orderId"]
    assert [line["item"]["productId"] for line in order["items"]] == [EXPLORASCOPE]


@pytest.mark.parametrize("number", [DISCOVER, "6500000000000002"])
def test_r4b_discover_is_accepted(number):
    assert charge(number).transaction_id


@pytest.mark.parametrize("number", [VISA, MASTERCARD])
def test_r4c_visa_and_mastercard_are_still_accepted(number):
    assert charge(number).transaction_id


def test_r4c_checkout_with_visa():
    resp = checkout_with(VISA)
    assert resp.status_code == 200, resp.text[:300]
    assert resp.json()["orderId"]


@pytest.mark.parametrize("number", ["4111 1111 1111 1111", "4111-1111-1111-1111", "3782 822463 10005"])
def test_r4d_numbers_with_spaces_or_dashes_are_accepted(number):
    assert charge(number, cvv=1234).transaction_id


def test_r4e_other_network_is_told_the_accepted_networks():
    assert ACCEPTED_NETWORKS in decline_message(JCB)


def test_r4e_checkout_with_other_network_is_a_payment_failure():
    resp = checkout_with(JCB)
    assert resp.status_code == 422, resp.text[:300]
    assert resp.json()["code"] == "PAYMENT_FAILED"


def test_r4f_invalid_number_decline_names_network_and_last_four():
    message = decline_message("4111111111111112")
    assert "1112" in message
    assert "Visa" in message


def test_payment_amex_bad_checksum_declined():
    message = decline_message("378282246310006", cvv=1234)
    assert "0006" in message
    assert "American Express" in message


@pytest.mark.parametrize(
    "number,network,last_four",
    [(AMEX, "American Express", "0005"), (VISA, "Visa", "1111")],
)
def test_r4g_expired_card_decline_names_network_and_last_four(number, network, last_four):
    message = decline_message(number, month=1, year=2020)
    assert network in message
    assert last_four in message


@pytest.mark.parametrize("number", ["37828224631000", "3782822463100050"])
def test_r4h_amex_number_of_wrong_length_is_declined(number):
    with pytest.raises(grpc.RpcError):
        charge(number, cvv=1234)
