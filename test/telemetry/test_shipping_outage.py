# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checkout's error when the shipping service cannot quote. Stops the quote
container through the docker CLI, so it runs on the host that runs the demo.

Run as a script to start the quote container again."""

import subprocess
import time
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON


def _docker(*args):
    return subprocess.run(["docker", *args], capture_output=True, text=True, timeout=120, check=True)


def start_quote():
    _docker("start", "quote")


def test_checkout_error_names_the_shipping_service_when_quoting_fails():
    user_id = str(uuid.uuid4())
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": "0PUK6V6EV0", "quantity": 1}},
        timeout=10,
    )
    assert resp.status_code == 200, resp.text[:300]

    since = f"{int(time.time()) - 1}"
    _docker("stop", "quote")
    try:
        resp = requests.post(
            f"{FRONTEND_PROXY_URL}/api/checkout",
            params={"currencyCode": "USD"},
            json=dict(PROBE_PERSON, userId=user_id),
            timeout=60,
        )
    finally:
        start_quote()

    assert resp.status_code == 500
    logs = _docker("logs", "--since", since, "frontend")
    failures = [
        line
        for line in (logs.stdout + logs.stderr).splitlines()
        if "Checkout failed to place order" in line and "shipping quote failure" in line
    ]
    assert failures, "the frontend logged no shipping quote failure for the checkout"
    assert "failed POST to shipping service" in failures[-1]
    assert "email service" not in failures[-1]


if __name__ == "__main__":
    start_quote()
