# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import time
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, add_to_cart, empty_cart, get_cart, poll_until

FLAGD_UI_URL = f"{FRONTEND_PROXY_URL}/feature"
FLAG_PROPAGATION_SECONDS = 15
FAILING_CALL_TIMEOUT = 60
PRODUCT_ID = "66VCHSJNUP"


def set_cart_failure(variant):
    flags = requests.get(f"{FLAGD_UI_URL}/api/read", timeout=10)
    flags.raise_for_status()
    body = flags.json()
    body["flags"]["cartFailure"]["defaultVariant"] = variant
    requests.post(f"{FLAGD_UI_URL}/api/write", json={"data": body}, timeout=10).raise_for_status()


def _items(resp):
    return [(i["productId"], i["quantity"]) for i in resp.json()["items"]]


def test_cart_failure_never_reports_success_with_a_different_cart():
    user = f"telemetry-cart-failure-{uuid.uuid4()}"
    add_to_cart(user, PRODUCT_ID)
    try:
        set_cart_failure("100%")
        time.sleep(FLAG_PROPAGATION_SECONDS)

        read = get_cart(user, timeout=FAILING_CALL_TIMEOUT)
        if read.ok:
            assert _items(read) == [(PRODUCT_ID, 1)], "GetCart answered success with another cart"
        else:
            assert read.status_code >= 500

        emptied = empty_cart(user, timeout=FAILING_CALL_TIMEOUT)
    finally:
        set_cart_failure("off")
        time.sleep(FLAG_PROPAGATION_SECONDS)

    after = poll_until(
        lambda: (resp := get_cart(user, timeout=FAILING_CALL_TIMEOUT)).ok and resp,
        "cart service answering again with cartFailure off",
        timeout=180,
    )
    if emptied.ok:
        assert _items(after) == [], "EmptyCart answered success but the cart still holds items"
    else:
        assert emptied.status_code >= 500
    empty_cart(user)


if __name__ == "__main__":
    set_cart_failure("off")
