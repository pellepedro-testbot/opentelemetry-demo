# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Helpers for driving the storefront HTTP API, the flagd-ui flag API and the
demo's containers from the functional tests."""

import contextlib
import datetime
import json
import os
import subprocess
import time
import uuid

import requests


STOREFRONT_URL = os.environ.get(
    "SKYRAMP_TEST_SERVICE_URL_STOREFRONT",
    os.environ.get("FRONTEND_PROXY_URL", "http://localhost:8080"),
)
FLAGD_UI_URL = os.environ.get("SKYRAMP_TEST_SERVICE_URL_FLAGD_UI", STOREFRONT_URL) + "/feature"
SHIPPING_URL = os.environ.get("SKYRAMP_TEST_SERVICE_URL_SHIPPING_HTTP", "http://localhost:50050")

REQUEST_TIMEOUT = 30

# Seconds flagd and the services' flag providers need to pick up a flag change.
FLAG_PROPAGATION_SECONDS = 5

CHECKOUT_ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zipCode": "94043",
}

VISA_CARD_NUMBER = "4432801561520454"


def new_user_id(prefix):
    return f"{prefix}-{uuid.uuid4()}"


def read_flags():
    resp = requests.get(f"{FLAGD_UI_URL}/api/read", timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    return resp.json()


def write_flags(data):
    resp = requests.post(f"{FLAGD_UI_URL}/api/write", json={"data": data}, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    return resp


def set_default_variant(flag, variant):
    data = read_flags()
    data["flags"][flag]["defaultVariant"] = variant
    write_flags(data)


def set_product_catalog_failure(variant):
    # productCatalogFailure targets one product through its targeting rule, so
    # the rule's true branch is what turns it on and off.
    data = read_flags()
    data["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(data)


@contextlib.contextmanager
def flag_variant(flag, variant, default="off"):
    set_default_variant(flag, variant)
    time.sleep(FLAG_PROPAGATION_SECONDS)
    try:
        yield
    finally:
        set_default_variant(flag, default)
        time.sleep(FLAG_PROPAGATION_SECONDS)


@contextlib.contextmanager
def product_catalog_failure():
    set_product_catalog_failure("on")
    time.sleep(FLAG_PROPAGATION_SECONDS)
    try:
        yield
    finally:
        set_product_catalog_failure("off")
        time.sleep(FLAG_PROPAGATION_SECONDS)


def add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{STOREFRONT_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()


def get_cart(user_id, currency_code="USD"):
    return requests.get(
        f"{STOREFRONT_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": currency_code},
        timeout=REQUEST_TIMEOUT,
    )


def empty_cart(user_id):
    return requests.delete(f"{STOREFRONT_URL}/api/cart", json={"userId": user_id}, timeout=REQUEST_TIMEOUT)


def card(expiration_month=1, expiration_year=None, cvv=123, number=VISA_CARD_NUMBER):
    if expiration_year is None:
        expiration_year = datetime.date.today().year + 1
    return {
        "creditCardNumber": number,
        "creditCardCvv": cvv,
        "creditCardExpirationYear": expiration_year,
        "creditCardExpirationMonth": expiration_month,
    }


def place_order(user_id, currency_code="USD", credit_card=None):
    return requests.post(
        f"{STOREFRONT_URL}/api/checkout",
        params={"currencyCode": currency_code},
        json={
            "userId": user_id,
            "userCurrency": currency_code,
            "address": CHECKOUT_ADDRESS,
            "email": "functional-test@example.com",
            "creditCard": credit_card or card(),
        },
        timeout=REQUEST_TIMEOUT,
    )


def shipping_quote(items, currency_code="USD"):
    resp = requests.get(
        f"{STOREFRONT_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency_code,
            "address": json.dumps(CHECKOUT_ADDRESS),
        },
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()


def money_cents(money):
    return int(money.get("units", 0)) * 100 + round(int(money.get("nanos", 0)) / 10_000_000)


def psql(sql):
    """Run one SQL statement in the demo's PostgreSQL container and return its rows."""
    out = subprocess.run(
        ["docker", "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", sql],
        check=True,
        capture_output=True,
        text=True,
        timeout=60,
    )
    return [line.split("|") for line in out.stdout.splitlines() if line]


def delete_accounting_order(order_id):
    psql(f"DELETE FROM accounting.\"order\" WHERE order_id = '{order_id}'")


def container_logs(container, since="5m"):
    out = subprocess.run(
        ["docker", "logs", container, "--since", since],
        check=True,
        capture_output=True,
        text=True,
        timeout=60,
    )
    return out.stdout + out.stderr
