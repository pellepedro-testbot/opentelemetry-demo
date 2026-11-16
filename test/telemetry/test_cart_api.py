# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Cart API through the storefront: an empty cart, adding products and
emptying the cart, read back with GET /api/cart."""

from storefront import add_to_cart, empty_cart, get_cart, new_user_id


def test_new_user_cart_is_empty():
    resp = get_cart(new_user_id())
    assert resp.status_code == 200, resp.text
    assert resp.json()["items"] == []


def test_adding_same_product_again_adds_quantities():
    user_id = new_user_id()
    try:
        add_to_cart(user_id, "OLJCESPC7Z", 2)
        add_to_cart(user_id, "OLJCESPC7Z", 3)
        items = get_cart(user_id).json()["items"]
        assert [(item["productId"], item["quantity"]) for item in items] == [("OLJCESPC7Z", 5)]
    finally:
        empty_cart(user_id)


def test_adding_new_product_stores_given_quantity():
    user_id = new_user_id()
    try:
        add_to_cart(user_id, "66VCHSJNUP", 4)
        items = get_cart(user_id).json()["items"]
        assert [(item["productId"], item["quantity"]) for item in items] == [("66VCHSJNUP", 4)]
    finally:
        empty_cart(user_id)


def test_delete_cart_empties_it():
    user_id = new_user_id()
    add_to_cart(user_id, "OLJCESPC7Z", 1)
    resp = empty_cart(user_id)
    assert resp.ok, resp.text
    assert get_cart(user_id).json()["items"] == []
