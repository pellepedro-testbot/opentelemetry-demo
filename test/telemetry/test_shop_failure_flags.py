# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront API behaviour while the demo's failure flags are switched on.

Run as a script to switch the flags these tests touch back off."""

import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON

FLAGD_READ_URL = f"{FRONTEND_PROXY_URL}/feature/api/read"
FLAGD_WRITE_URL = f"{FRONTEND_PROXY_URL}/feature/api/write"
# Services pick a flag change up from flagd a moment after it is written.
FLAG_SYNC_SECONDS = 5


def _set_flag(flag_name, default_variant):
    flags = requests.get(FLAGD_READ_URL, timeout=10)
    flags.raise_for_status()
    body = flags.json()
    body["flags"][flag_name]["defaultVariant"] = default_variant
    resp = requests.post(FLAGD_WRITE_URL, json={"data": body}, timeout=10)
    resp.raise_for_status()
    time.sleep(FLAG_SYNC_SECONDS)


def _set_product_catalog_failure(variant):
    # productCatalogFailure targets OLJCESPC7Z through a targeting rule, so the rule's
    # true-branch is switched rather than the defaultVariant.
    flags = requests.get(FLAGD_READ_URL, timeout=10)
    flags.raise_for_status()
    body = flags.json()
    body["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    resp = requests.post(FLAGD_WRITE_URL, json={"data": body}, timeout=10)
    resp.raise_for_status()
    time.sleep(FLAG_SYNC_SECONDS)


def restore_flags():
    _set_flag("paymentFailure", "off")
    _set_flag("cartFailure", "off")
    _set_product_catalog_failure("off")


@pytest.fixture
def flag(request):
    flag_name, variant = request.param
    _set_flag(flag_name, variant)
    yield
    _set_flag(flag_name, "off")


def _add_to_cart(user_id, product_id="0PUK6V6EV0"):
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": 1}},
        timeout=60,
    )


@pytest.mark.parametrize("flag", [("paymentFailure", "100%")], indirect=True)
def test_payment_decline_answers_with_the_checkout_error_format(flag):
    user_id = str(uuid.uuid4())
    assert _add_to_cart(user_id).status_code == 200

    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=dict(PROBE_PERSON, userId=user_id),
        timeout=30,
    )

    assert resp.status_code >= 400
    assert resp.headers["content-type"].startswith("application/json")
    error = resp.json().get("error")
    assert isinstance(error, str) and error


@pytest.fixture
def product_catalog_failure():
    _set_product_catalog_failure("on")
    yield
    _set_product_catalog_failure("off")


def test_internal_checkout_failure_answers_with_the_generic_500(product_catalog_failure):
    user_id = str(uuid.uuid4())
    assert _add_to_cart(user_id, "OLJCESPC7Z").status_code == 200

    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=dict(PROBE_PERSON, userId=user_id),
        timeout=30,
    )

    assert resp.status_code == 500
    assert resp.headers["content-type"].startswith("application/json")
    assert resp.json() == {"error": "Failed to place order."}


@pytest.mark.parametrize("flag", [("cartFailure", "100%")], indirect=True)
def test_cart_failure_never_answers_with_a_silently_empty_cart(flag):
    user_id = str(uuid.uuid4())
    added = _add_to_cart(user_id)

    cart = requests.get(f"{FRONTEND_PROXY_URL}/api/cart", params={"sessionId": user_id, "currencyCode": "USD"}, timeout=60)
    if cart.status_code == 200:
        assert added.status_code == 200
        assert [item["productId"] for item in cart.json()["items"]] == ["0PUK6V6EV0"], (
            "the cart answered OK without the item that was added"
        )

    _set_flag("cartFailure", "off")
    if added.status_code == 200:
        cart = requests.get(
            f"{FRONTEND_PROXY_URL}/api/cart", params={"sessionId": user_id, "currencyCode": "USD"}, timeout=10
        )
        assert cart.status_code == 200
        assert [item["productId"] for item in cart.json()["items"]] == ["0PUK6V6EV0"]


if __name__ == "__main__":
    restore_flags()
