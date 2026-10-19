# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Adding, capping and removing cart lines through /api/cart."""

from storefront_api import add_to_cart, cart_items, new_user_id

EXPLORASCOPE = "OLJCESPC7Z"
TELESCOPE = "66VCHSJNUP"


def test_negative_of_quantity_drops_line():
    """R5a, cart-remove-drops-line"""
    user = new_user_id()
    add_to_cart(user, EXPLORASCOPE, 3)
    add_to_cart(user, EXPLORASCOPE, -3)
    assert EXPLORASCOPE not in cart_items(user)


def test_removing_one_line_keeps_others():
    """R5b"""
    user = new_user_id()
    add_to_cart(user, EXPLORASCOPE, 2)
    add_to_cart(user, TELESCOPE, 1)
    add_to_cart(user, EXPLORASCOPE, -2)
    assert cart_items(user) == {TELESCOPE: 1}


def test_adding_to_line_capped_at_10():
    """R5c"""
    user = new_user_id()
    add_to_cart(user, EXPLORASCOPE, 8)
    add_to_cart(user, EXPLORASCOPE, 5)
    assert cart_items(user)[EXPLORASCOPE] == 10


def test_new_line_capped_at_10():
    """R5d"""
    user = new_user_id()
    resp = add_to_cart(user, EXPLORASCOPE, 15)
    items = cart_items(user)
    if resp.status_code == 200:
        assert items[EXPLORASCOPE] == 10
    else:
        assert items.get(EXPLORASCOPE, 0) <= 10


def test_add_sums_separate_lines_and_partial_negative_reduces():
    """R5e"""
    user = new_user_id()
    add_to_cart(user, EXPLORASCOPE, 2)
    add_to_cart(user, EXPLORASCOPE, 3)
    assert cart_items(user) == {EXPLORASCOPE: 5}
    add_to_cart(user, TELESCOPE, 1)
    assert cart_items(user) == {EXPLORASCOPE: 5, TELESCOPE: 1}
    add_to_cart(user, EXPLORASCOPE, -2)
    assert cart_items(user) == {EXPLORASCOPE: 3, TELESCOPE: 1}


def test_negative_quantity_for_absent_product_adds_no_line():
    """cart-negative-absent-line-no-negative"""
    user = new_user_id()
    add_to_cart(user, TELESCOPE, 1)
    add_to_cart(user, EXPLORASCOPE, -2)
    items = cart_items(user)
    assert EXPLORASCOPE not in items
    assert all(q > 0 for q in items.values()), items
