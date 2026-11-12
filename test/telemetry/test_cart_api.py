# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""DELETE /api/cart (cart EmptyCart) under the cartFailure flag, which is a failure rate."""

import pytest

from demo_shop import add_to_cart, cart_items, empty_cart, flag, new_user_id, set_flag


@pytest.fixture
def user_id():
    user = new_user_id("cart-api")
    yield user
    set_flag("cartFailure", "off")
    empty_cart(user)


def test_empty_cart_succeeds_with_cart_failure_off(user_id):
    set_flag("cartFailure", "off")
    add_to_cart(user_id, "0PUK6V6EV0", 2)
    assert cart_items(user_id) == [("0PUK6V6EV0", 2)]

    resp = empty_cart(user_id)

    assert 200 <= resp.status_code < 300, resp.text
    assert cart_items(user_id) == []


def test_every_empty_cart_fails_at_cart_failure_100_percent(user_id):
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    with flag("cartFailure", "100%"):
        statuses = [empty_cart(user_id).status_code for _ in range(3)]
    assert all(status >= 500 for status in statuses), statuses

    resp = empty_cart(user_id)
    assert 200 <= resp.status_code < 300, resp.text
    assert cart_items(user_id) == []


def test_some_empty_cart_calls_fail_at_cart_failure_50_percent(user_id):
    statuses = []
    with flag("cartFailure", "50%"):
        for _ in range(20):
            add_to_cart(user_id, "0PUK6V6EV0", 1)
            statuses.append(empty_cart(user_id).status_code)
    failures = sum(1 for status in statuses if status >= 500)
    assert 0 < failures < 20, statuses
