# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""SDK self-observability metrics, container healthchecks and hardening from
the compose files, and the services the stack no longer runs."""

import json

import pytest

import shop


@pytest.fixture(scope="module")
def orders_placed():
    """Checkouts make checkout and fraud-detection emit spans."""
    for _ in range(2):
        _, resp = shop.place_order()
        resp.raise_for_status()


@pytest.mark.parametrize(
    "metric,service",
    [
        ("otel_sdk_span_started_total", "checkout"),
        ("otel_sdk_processor_span_processed_total", "checkout"),
        ("otel_sdk_exporter_span_exported_total", "checkout"),
        ("otel_sdk_span_started_total", "recommendation"),
        ("otel_sdk_processor_span_processed_total", "load-generator"),
        ("otel_sdk_span_started_total", "product-catalog"),
        ("otel_sdk_processor_span_processed_total", "product-catalog"),
        ("otel_sdk_exporter_span_exported_total", "product-catalog"),
        ("otel_sdk_processor_span_processed_total", "recommendation"),
        ("otel_sdk_log_created_total", "load-generator"),
        ("otel_sdk_span_started_total", "ad"),
        ("otel_sdk_span_started_total", "fraud-detection"),
    ],
)
def test_service_reports_sdk_self_observability_metric(orders_placed, metric, service):
    shop.prom_wait(f'{metric}{{service_name="{service}"}}')


@pytest.mark.parametrize(
    "container,probe",
    [
        ("ad", "/dev/tcp/localhost/9555"),
        ("currency", "nc -z localhost 7001"),
        ("email", "TCPSocket.new('localhost', 6060)"),
        ("frontend", "require('net').connect(8080"),
        ("frontend-proxy", "/dev/tcp/localhost/8080"),
        ("image-provider", "http://localhost:8081/status"),
        ("load-generator", "socket.create_connection(('localhost',8089)"),
        ("quote", "fsockopen('localhost', 8090)"),
        ("recommendation", "nc -z localhost 9001"),
        ("flagd-ui", "/dev/tcp/localhost/4000"),
        ("telemetry-docs", "http://localhost:8000/"),
        ("astronomy-db", "pg_isready"),
        ("valkey-cart", "valkey-cli ping"),
    ],
)
def test_container_healthcheck_reports_healthy(container, probe):
    test = json.loads(shop.inspect(container, "{{json .Config.Healthcheck.Test}}") or "null")
    assert test, f"{container} has no healthcheck"
    assert probe in " ".join(test), test
    shop.wait_healthy(container, timeout=120)


@pytest.mark.parametrize("container", ["checkout", "product-catalog", "shipping"])
def test_container_runs_with_read_only_root_and_tmp_tmpfs(container):
    assert shop.inspect(container, "{{.HostConfig.ReadonlyRootfs}}") == "true"
    tmpfs = json.loads(shop.inspect(container, "{{json .HostConfig.Tmpfs}}") or "null") or {}
    assert "/tmp" in tmpfs, tmpfs
    assert "ro" not in tmpfs["/tmp"].split(","), tmpfs
    assert shop.inspect(container, "{{.State.Running}}") == "true"
    assert shop.inspect(container, "{{.State.Restarting}}") == "false"


@pytest.mark.parametrize("name", ["product-reviews", "llm"])
def test_stack_runs_no_removed_container(name):
    names = shop.docker("ps", "-a", "--format", "{{.Names}}").stdout.split()
    assert name not in names
