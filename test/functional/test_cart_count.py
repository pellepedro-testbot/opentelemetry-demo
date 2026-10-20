# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The x-cart-count header and demo.cart.count span attribute of CartService/GetCart."""

import requests

from containers import docker
from demo_grpc import new_trace, pb, stub
from storefront import CLEANING_KIT, FRONTEND_PROXY_URL, HTTP_TIMEOUT, add_to_cart, empty_cart, new_user
from traces import attribute_values, trace_spans

GET_CART_SPAN = "POST /oteldemo.CartService/GetCart"


def get_cart(user_id, metadata=()):
    """(cart, x-cart-count header or None) of one GetCart call."""
    cart, call = stub("cart").GetCart.with_call(pb.GetCartRequest(user_id=user_id), metadata=metadata, timeout=10)
    header = dict(call.initial_metadata()).get("x-cart-count")
    return cart, header


def cart_count():
    _, header = get_cart(new_user())
    assert header is not None, "GetCart returned no x-cart-count header"
    return int(header)


def add_item(user_id):
    stub("cart").AddItem(
        pb.AddItemRequest(user_id=user_id, item=pb.CartItem(product_id=CLEANING_KIT, quantity=1)), timeout=10,
    )


def valkey_carts():
    """Keys in the cart store, without the connectivity probe key 'cart'."""
    keys = docker("exec", "valkey-cart", "valkey-cli", "--scan").stdout.split()
    return len([k for k in keys if k != "cart"])


def test_r7a_cart_count_is_the_number_of_carts_in_the_store():
    before = cart_count()
    assert before == valkey_carts()
    for _ in range(3):
        add_item(new_user())
    after = cart_count()
    assert after == before + 3
    assert after == valkey_carts()


def test_cart_count_excludes_emptied():
    c0 = cart_count()
    user_id = new_user()
    add_to_cart(user_id, CLEANING_KIT, 1)
    c1 = cart_count()
    empty_cart(user_id)
    c2 = cart_count()
    assert c1 == c0 + 1
    assert c2 == c0


def test_r7b_cart_count_is_on_the_get_cart_span(jaeger_url):
    trace_id, metadata = new_trace()
    _, header = get_cart(new_user(), metadata=metadata)
    spans = trace_spans(jaeger_url, "cart", trace_id, GET_CART_SPAN)
    span = next(s for s in spans if s["name"] == GET_CART_SPAN)
    assert str(attribute_values(span)["demo.cart.count"]) == header


def test_r7c_new_user_gets_an_empty_cart_and_the_header():
    cart, header = get_cart(new_user())
    assert list(cart.items) == []
    assert header is not None and header.isdigit()
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/cart", params={"sessionId": new_user()}, timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    assert resp.json()["items"] == []
