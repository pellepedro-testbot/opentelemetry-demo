# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Removing lines and the per-line cap of the cart, through POST /api/cart."""

from storefront import (
    CLEANING_KIT,
    EXPLORASCOPE,
    STARSENSE_TELESCOPE,
    add_to_cart,
    cart_items,
    checkout,
    new_user,
)

MAX_QUANTITY_PER_LINE = 10


def test_r6c_negative_of_the_line_quantity_drops_the_line():
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 3)
    add_to_cart(user_id, CLEANING_KIT, -3)
    assert CLEANING_KIT not in cart_items(user_id)


def test_cart_remove_drops_line():
    user_id = new_user()
    add_to_cart(user_id, EXPLORASCOPE, 3)
    add_to_cart(user_id, EXPLORASCOPE, -3)
    assert EXPLORASCOPE not in cart_items(user_id)


def test_r6d_line_never_holds_more_than_ten():
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 7)
    add_to_cart(user_id, CLEANING_KIT, 5)
    assert cart_items(user_id)[CLEANING_KIT] == MAX_QUANTITY_PER_LINE

    other = new_user()
    add_to_cart(other, CLEANING_KIT, 15)
    assert cart_items(other).get(CLEANING_KIT, 0) <= MAX_QUANTITY_PER_LINE


def test_r6f_partial_decrement_reduces_the_line():
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 5)
    add_to_cart(user_id, CLEANING_KIT, -2)
    assert cart_items(user_id)[CLEANING_KIT] == 3


def test_r6g_removing_more_than_the_line_holds_drops_it():
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 2)
    add_to_cart(user_id, CLEANING_KIT, -5)
    assert CLEANING_KIT not in cart_items(user_id)


def test_r6h_negative_quantity_for_a_new_product_creates_no_line():
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 1)
    add_to_cart(user_id, STARSENSE_TELESCOPE, -3)
    items = cart_items(user_id)
    assert STARSENSE_TELESCOPE not in items
    assert all(quantity > 0 for quantity in items.values()), items


def test_cart_negative_new_line():
    user_id = new_user()
    try:
        add_to_cart(user_id, STARSENSE_TELESCOPE, -3)
    except Exception:
        pass  # rejecting the request is fine too
    items = cart_items(user_id)
    assert STARSENSE_TELESCOPE not in items
    assert all(quantity > 0 for quantity in items.values()), items


def test_r6i_checkout_after_removing_a_line_charges_only_the_rest():
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 2)
    add_to_cart(user_id, EXPLORASCOPE, 1)
    add_to_cart(user_id, CLEANING_KIT, -2)
    resp = checkout(user_id)
    assert resp.status_code == 200, resp.text[:300]
    assert [line["item"]["productId"] for line in resp.json()["items"]] == [EXPLORASCOPE]


def test_checkout_after_remove():
    user_id = new_user()
    add_to_cart(user_id, EXPLORASCOPE, 2)
    add_to_cart(user_id, STARSENSE_TELESCOPE, 1)
    add_to_cart(user_id, EXPLORASCOPE, -2)
    resp = checkout(user_id, month=1, year=2030)
    assert resp.status_code == 200, resp.text[:300]
    assert [line["item"]["productId"] for line in resp.json()["items"]] == [STARSENSE_TELESCOPE]
