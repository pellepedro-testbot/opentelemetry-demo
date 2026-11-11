# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Functional checks of the flagd-ui flag API and of the fault-injection flags
the services evaluate (cartFailure, productCatalogLockContention)."""

import time

import requests

from storefront import (
    FLAGD_UI_URL,
    REQUEST_TIMEOUT,
    STOREFRONT_URL,
    add_to_cart,
    empty_cart,
    flag_variant,
    get_cart,
    new_user_id,
    read_flags,
    write_flags,
)


def test_invalid_json_flag_write_is_refused_and_leaves_flags_unchanged():
    before = read_flags()
    resp = requests.post(
        f"{FLAGD_UI_URL}/api/write",
        data="{not json",
        headers={"Content-Type": "application/json"},
        timeout=REQUEST_TIMEOUT,
    )
    assert resp.status_code == 400, f"expected 400, got {resp.status_code}"
    assert read_flags() == before


def test_valid_flag_write_reads_back_unchanged():
    saved = read_flags()
    try:
        write_flags(saved)
        assert read_flags() == saved
    finally:
        write_flags(saved)


def test_cart_failure_at_100_percent_always_fails_empty_cart_but_keeps_serving_the_cart():
    user_id = new_user_id("cart-failure-100")
    add_to_cart(user_id, "0PUK6V6EV0", 1)

    empty_statuses = []
    get_results = []
    with flag_variant("cartFailure", "100%"):
        for _ in range(5):
            empty = empty_cart(user_id)
            empty_statuses.append(empty.status_code)
            if empty.status_code == 204:
                # The add answers with the cart it read back; GetCart's own result is checked below.
                requests.post(
                    f"{STOREFRONT_URL}/api/cart",
                    json={"userId": user_id, "item": {"productId": "0PUK6V6EV0", "quantity": 1}},
                    timeout=REQUEST_TIMEOUT,
                )
            cart = get_cart(user_id)
            get_results.append(
                (cart.status_code, [i["productId"] for i in cart.json()["items"]] if cart.status_code == 200 else None)
            )
    empty_cart(user_id)

    assert all(status >= 500 for status in empty_statuses), f"EmptyCart statuses at 100%: {empty_statuses}"
    assert all(result == (200, ["0PUK6V6EV0"]) for result in get_results), f"GetCart results at 100%: {get_results}"


def test_cart_failure_at_50_percent_fails_about_half_of_empty_cart_calls():
    user_id = new_user_id("cart-failure-50")
    failures = 0
    with flag_variant("cartFailure", "50%"):
        for _ in range(40):
            if empty_cart(user_id).status_code >= 500:
                failures += 1
    assert 8 <= failures <= 32, f"{failures} of 40 EmptyCart calls failed at 50%"


def _time_products_request():
    start = time.monotonic()
    resp = requests.get(f"{STOREFRONT_URL}/api/products", params={"currencyCode": "USD"}, timeout=60)
    return time.monotonic() - start, resp.status_code


def test_lock_contention_blocks_catalog_reads_only_while_on():
    slowest = 0.0
    with flag_variant("productCatalogLockContention", "on"):
        deadline = time.monotonic() + 15
        while time.monotonic() < deadline and slowest <= 3:
            elapsed, _ = _time_products_request()
            slowest = max(slowest, elapsed)
            time.sleep(0.5)
    assert slowest > 3, f"slowest catalog read with the flag on took {slowest:.2f}s"

    # Let the 30s lock window of the last activation run out.
    time.sleep(35)
    elapsed, status = _time_products_request()
    assert status == 200
    assert elapsed < 1, f"catalog read with the flag off took {elapsed:.2f}s"
