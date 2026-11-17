# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The currency service started with a changed environment: IPv6 listening and
no VERSION. Each test runs the currency image as a probe container on the
demo network, with the running currency container's environment as its base,
and removes the probe afterwards.
"""

import json
import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from demo_stack import docker, wait_for_logs, wait_healthy

NETWORK = "opentelemetry-demo"


def _currency_env():
    return json.loads(docker("inspect", "-f", "{{json .Config.Env}}", "currency").stdout)


def _currency_image():
    return docker("inspect", "-f", "{{.Config.Image}}", "currency").stdout.strip()


def _run_probe(name, env, aliases=()):
    docker("rm", "-f", name, check=False)
    args = ["run", "-d", "--name", name, "--network", NETWORK]
    for alias in aliases:
        args += ["--network-alias", alias]
    for entry in env:
        args += ["-e", entry]
    docker(*args, _currency_image())


def test_ipv6_listening_is_logged():
    name = "currency-ipv6-probe"
    service = f"currency-ipv6-probe-{int(time.time())}"
    env = [e for e in _currency_env() if not e.startswith(("IPV6_ENABLED=", "OTEL_SERVICE_NAME="))]
    env += ["IPV6_ENABLED=true", f"OTEL_SERVICE_NAME={service}"]
    _run_probe(name, env)
    try:
        records = wait_for_logs("Overwriting Localhost IP", service=service, timeout=90)
        assert records[0]["eventName"] == "currency.server.ip_overwrite"
        assert records[0]["attributes"]["server.address"] == "[::]"
    finally:
        docker("rm", "-f", name, check=False)


@pytest.fixture
def currency_without_version():
    name = "currency-noversion-probe"
    env = [e for e in _currency_env() if not e.startswith("VERSION=")]
    docker("stop", "currency")
    try:
        _run_probe(name, env, aliases=("currency",))
        yield name
    finally:
        docker("rm", "-f", name, check=False)
        docker("start", "currency")
        wait_healthy("currency")


def test_currency_starts_without_version(currency_without_version):
    def answers():
        return requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10).status_code == 200

    poll_until(answers, "GET /api/currency answered by the probe", timeout=60, interval=2)
    assert docker("inspect", "-f", "{{.State.Running}}", currency_without_version).stdout.strip() == "true"
    assert "VERSION=" not in " ".join(
        e for e in json.loads(docker("inspect", "-f", "{{json .Config.Env}}", currency_without_version).stdout)
        if e.startswith("VERSION=")
    )
