# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Cart quantities, removal and the active-cart count of the cart service."""

import time

import pytest

from conftest import find_trace, otlp_attributes, poll_until
from docker_stack import requires_docker
from grpc_client import CART_ADDR, grpc_call
from storefront import add_to_cart, cart_lines, get_cart, new_user

PRODUCT = "OLJCESPC7Z"
OTHER_PRODUCT = "66VCHSJNUP"


def add(user, quantity, product=PRODUCT):
    resp = add_to_cart(user, product, quantity)
    assert resp.status_code == 200, resp.text


def test_minus_line_quantity_drops_the_line():
    user = new_user()
    add(user, 3)
    add(user, -3)
    assert PRODUCT not in cart_lines(user)


def test_negative_larger_than_line_drops_the_line():
    user = new_user()
    add(user, 2)
    add(user, -5)
    assert PRODUCT not in cart_lines(user)


def test_partial_negative_reduces_the_line():
    user = new_user()
    add(user, 5)
    add(user, -2)
    assert cart_lines(user)[PRODUCT] == 3


def test_adding_to_a_line_never_exceeds_ten():
    user = new_user()
    add(user, 7)
    add(user, 5)
    assert cart_lines(user)[PRODUCT] == 10


def test_new_line_over_ten_holds_ten():
    user = new_user()
    add(user, 15)
    assert cart_lines(user)[PRODUCT] == 10


def test_ten_is_kept_and_cap_does_not_stick():
    user = new_user()
    add(user, 10)
    assert cart_lines(user)[PRODUCT] == 10
    add(user, -1)
    assert cart_lines(user)[PRODUCT] == 9


@pytest.mark.parametrize("product,quantity", [(PRODUCT, -2), (OTHER_PRODUCT, 0)])
def test_non_positive_quantity_never_creates_a_line(product, quantity):
    user = new_user()
    add_to_cart(user, product, quantity)
    for item in get_cart(user).get("items", []):
        assert item["quantity"] > 0, item


def test_cart_read_returns_the_items():
    user = new_user()
    add(user, 2)
    cart = get_cart(user)
    assert cart["userId"] == user
    assert [(i["productId"], i["quantity"]) for i in cart["items"]] == [(PRODUCT, 2)]


@requires_docker
class TestCartCount:
    @staticmethod
    def get_cart(user):
        result = grpc_call(CART_ADDR, "oteldemo.CartService/GetCart", {"userId": user}, verbose=True)
        assert result.ok, result.message
        return result

    def count(self, user="probe"):
        value = self.get_cart(user).headers.get("x-cart-count")
        assert value is not None and value.isdigit(), value
        return int(value)

    @staticmethod
    def add_item(user, quantity, product=PRODUCT):
        result = grpc_call(
            CART_ADDR,
            "oteldemo.CartService/AddItem",
            {"userId": user, "item": {"productId": product, "quantity": quantity}},
        )
        assert result.ok, result.message

    def test_get_cart_returns_count_of_carts_with_items(self):
        before = self.count()
        self.add_item(new_user(), 1)
        self.add_item(new_user(), 1)
        assert self.count() == before + 2

    def test_emptied_or_removed_carts_leave_the_count(self):
        first, second = new_user(), new_user()
        self.add_item(first, 1)
        self.add_item(second, 2)
        start = self.count()

        result = grpc_call(CART_ADDR, "oteldemo.CartService/EmptyCart", {"userId": first})
        assert result.ok, result.message
        assert self.count() == start - 1

        self.add_item(second, -2)
        assert self.count() == start - 2

        self.count(new_user())
        assert self.count() == start - 2

    def test_get_cart_body_is_unchanged(self):
        user = new_user()
        self.add_item(user, 3)
        body = self.get_cart(user).body
        assert body == {"userId": user, "items": [{"productId": PRODUCT, "quantity": 3}]}

    def test_negative_quantity_for_new_product_is_not_an_active_cart(self):
        before = self.count()
        self.add_item(new_user(), -1)
        assert self.count() == before

    def test_get_cart_span_carries_cart_count(self, jaeger_url):
        user = new_user()
        self.add_item(user, 1)
        header = self.get_cart(user).headers["x-cart-count"]
        time.sleep(10)

        def get_cart_span(span):
            attrs = otlp_attributes(span.get("attributes"))
            return attrs.get("user.id") == user and "demo.cart.count" in attrs

        spans = poll_until(
            lambda: find_trace(jaeger_url, "cart", get_cart_span, num_traces=100),
            f"GetCart span for {user}",
            timeout=60,
        )
        counts = [
            otlp_attributes(s.get("attributes"))["demo.cart.count"] for s in spans if get_cart_span(s)
        ]
        assert counts[-1] == int(header)
