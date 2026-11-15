# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checkout error answers while a failure feature flag is on. Flags are set
through the flagd UI API behind the frontend proxy and restored afterwards."""

import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import add_to_cart, checkout, new_user_id

FLAGD_API_URL = f"{FRONTEND_PROXY_URL}/feature/api"


def _update_flags(change):
    flags = requests.get(f"{FLAGD_API_URL}/read", timeout=10)
    flags.raise_for_status()
    body = flags.json()
    change(body["flags"])
    requests.post(f"{FLAGD_API_URL}/write", json={"data": body}, timeout=10).raise_for_status()


def _set_payment_failure(variant):
    _update_flags(lambda flags: flags["paymentFailure"].update(defaultVariant=variant))


def _set_product_catalog_failure(variant):
    _update_flags(lambda flags: flags["productCatalogFailure"]["targeting"]["if"].__setitem__(1, variant))


def _first_failed_checkout(product_id, turn_flag_on):
    """Turns the flag on and places orders until one fails. flagd can miss a
    write of its flag file, so the flag is written again before each order."""

    def attempt():
        turn_flag_on()
        user_id = new_user_id("telemetry-flag")
        add_to_cart(user_id, product_id)
        resp = checkout(user_id)
        if resp.status_code == 200:
            return None
        requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)
        return [resp]

    [resp] = poll_until(attempt, f"a failed checkout of {product_id} with the flag on", timeout=90, interval=3)
    return resp


def test_payment_failure_answers_json_error():
    try:
        resp = _first_failed_checkout("0PUK6V6EV0", lambda: _set_payment_failure("100%"))
    finally:
        _set_payment_failure("off")

    assert resp.headers.get("content-type", "").startswith("application/json"), resp.text[:300]
    error = resp.json().get("error")
    assert isinstance(error, str) and error, resp.text[:300]


def test_catalog_failure_answers_500_without_code():
    try:
        resp = _first_failed_checkout("OLJCESPC7Z", lambda: _set_product_catalog_failure("on"))
    finally:
        _set_product_catalog_failure("off")

    body = resp.json()
    assert resp.status_code == 500, resp.text[:300]
    assert "code" not in body
    assert isinstance(body.get("error"), str) and body["error"]
