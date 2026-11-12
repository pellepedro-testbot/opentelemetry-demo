# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Services stop cleanly on SIGTERM, currency starts without VERSION, and checkout
does not wait on an unavailable email service.

These tests drive the demo's containers through the Docker Engine API, so the test
container needs the Docker socket mounted (-v /var/run/docker.sock:/var/run/docker.sock).
"""

import http.client
import json
import os
import socket
import time
import urllib.parse

import pytest

from demo_shop import add_to_cart, empty_cart, new_user_id, place_order

DOCKER_SOCKET = os.environ.get("DOCKER_SOCKET", "/var/run/docker.sock")
DOCKER_NETWORK = os.environ.get("DOCKER_NETWORK", "opentelemetry-demo")
STOP_TIMEOUT = 10
NO_VERSION_CONTAINER = "currency-without-version-test"


class _UnixConnection(http.client.HTTPConnection):
    def __init__(self, path):
        super().__init__("localhost", timeout=120)
        self._path = path

    def connect(self):
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.sock.settimeout(120)
        self.sock.connect(self._path)


def docker(method, path, body=None, params=None):
    if params:
        path = f"{path}?{urllib.parse.urlencode(params)}"
    conn = _UnixConnection(DOCKER_SOCKET)
    try:
        payload = json.dumps(body) if body is not None else None
        conn.request(method, path, body=payload, headers={"Content-Type": "application/json"})
        resp = conn.getresponse()
        data = resp.read()
    finally:
        conn.close()
    if resp.status >= 400 and resp.status != 304:
        raise RuntimeError(f"docker {method} {path}: {resp.status} {data[:300]!r}")
    return json.loads(data) if data else None


def inspect(container):
    return docker("GET", f"/containers/{container}/json")


def wait_healthy(container, timeout=120):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        state = inspect(container)["State"]
        if state.get("Health", {}).get("Status", "healthy") == "healthy" and state["Running"]:
            return
        time.sleep(2)
    raise AssertionError(f"{container} not healthy after {timeout}s")


def stop_and_time(container):
    start = time.monotonic()
    docker("POST", f"/containers/{container}/stop", params={"t": STOP_TIMEOUT})
    return time.monotonic() - start, inspect(container)["State"]


@pytest.fixture
def restart(request):
    container = request.param
    yield container
    if not inspect(container)["State"]["Running"]:
        docker("POST", f"/containers/{container}/start")
    wait_healthy(container)


@pytest.mark.parametrize("restart", ["checkout", "currency"], indirect=True)
def test_service_stops_gracefully_on_sigterm(restart):
    wait_healthy(restart)
    elapsed, state = stop_and_time(restart)

    assert not state["Running"]
    assert elapsed < STOP_TIMEOUT - 2, f"{restart} took {elapsed:.1f}s to stop"
    assert state["ExitCode"] == 0, f"{restart} exited with {state['ExitCode']}"


@pytest.fixture
def currency_without_version():
    image = inspect("currency")["Config"]["Image"]
    env = [e for e in inspect("currency")["Config"]["Env"] if not e.startswith("VERSION=")]
    if _exists():
        docker("DELETE", f"/containers/{NO_VERSION_CONTAINER}", params={"force": "true"})
    docker(
        "POST",
        "/containers/create",
        params={"name": NO_VERSION_CONTAINER},
        body={"Image": image, "Env": env, "HostConfig": {"NetworkMode": DOCKER_NETWORK}},
    )
    docker("POST", f"/containers/{NO_VERSION_CONTAINER}/start")
    yield NO_VERSION_CONTAINER
    docker("DELETE", f"/containers/{NO_VERSION_CONTAINER}", params={"force": "true"})


def _exists():
    containers = docker("GET", "/containers/json", params={"all": "true", "filters": json.dumps({"name": [NO_VERSION_CONTAINER]})})
    return any(f"/{NO_VERSION_CONTAINER}" in c["Names"] for c in containers)


def test_currency_starts_without_version_env(currency_without_version):
    port = next(e.split("=", 1)[1] for e in inspect("currency")["Config"]["Env"] if e.startswith("CURRENCY_PORT="))
    time.sleep(5)

    state = inspect(currency_without_version)["State"]
    assert state["Running"], f"exited with {state['ExitCode']}"
    with socket.create_connection((NO_VERSION_CONTAINER, int(port)), timeout=5):
        pass


@pytest.fixture
def email_paused():
    docker("POST", "/containers/email/pause")
    yield
    docker("POST", "/containers/email/unpause")


def test_order_completes_promptly_while_email_hangs(email_paused):
    user_id = new_user_id("email-paused")
    try:
        add_to_cart(user_id)
        start = time.monotonic()
        resp = place_order(user_id, timeout=30)
        elapsed = time.monotonic() - start
    finally:
        empty_cart(user_id)

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]
    assert elapsed < 5, f"checkout took {elapsed:.1f}s"
