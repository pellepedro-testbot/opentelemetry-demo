# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Helpers for tests that drive the shop through the frontend proxy and then
read what it produced: HTTP answers, feature flags, Jaeger traces, OpenSearch
log records, Prometheus series and container state."""

import contextlib
import datetime
import json
import os
import secrets
import shutil
import subprocess
import time
import uuid

import pytest
import requests

from conftest import (
    FRONTEND_PROXY_URL,
    JAEGER_URL,
    OPENSEARCH_URL,
    PROMETHEUS_URL,
    poll_until,
)

COLLECTOR_HTTP_URL = os.environ.get(
    "OTEL_COLLECTOR_HTTP_URL",
    "http://{}:{}".format(
        os.environ.get("OTEL_COLLECTOR_HOST", "otel-collector"),
        os.environ.get("OTEL_COLLECTOR_PORT_HTTP", "4318"),
    ),
)
AD_METRICS_URL = os.environ.get(
    "AD_METRICS_URL", "http://ad:{}".format(os.environ.get("AD_PROMETHEUS_PORT", "9465"))
)

RED_FLASHLIGHT = "LS4PSXUNUM"
TARGETED_PRODUCT = "OLJCESPC7Z"
OTHER_PRODUCT = "66VCHSJNUP"
VISA = "4432-8015-6152-0454"

US_ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zipCode": "94043",
}
FR_ADDRESS = {
    "streetAddress": "1 Rue de Rivoli",
    "city": "Paris",
    "state": "IDF",
    "country": "FR",
    "zipCode": "75001",
}


def url(path):
    return f"{FRONTEND_PROXY_URL}{path}"


def traceparent():
    """A fresh trace id and a traceparent header that starts that trace, so a
    request's spans and log records can be found by trace id."""
    trace_id = secrets.token_hex(16)
    return trace_id, {"traceparent": f"00-{trace_id}-{secrets.token_hex(8)}-01"}


def new_user():
    return str(uuid.uuid4())


# --- cart and checkout -------------------------------------------------------


def add_to_cart(user_id, product_id=RED_FLASHLIGHT, quantity=1, headers=None):
    resp = requests.post(
        url("/api/cart"),
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        headers=headers,
        timeout=15,
    )
    resp.raise_for_status()
    return resp


def get_cart(user_id, currency="USD"):
    resp = requests.get(
        url("/api/cart"), params={"sessionId": user_id, "currencyCode": currency}, timeout=15
    )
    resp.raise_for_status()
    return resp.json()


def empty_cart(user_id):
    return requests.delete(url("/api/cart"), json={"userId": user_id}, timeout=15)


def cart_quantities(user_id):
    return {i["productId"]: i["quantity"] for i in get_cart(user_id).get("items", [])}


def checkout_body(user_id, card_number=VISA, year=None, email="probe@example.com",
                  address=None, currency="USD"):
    return {
        "userId": user_id,
        "userCurrency": currency,
        "email": email,
        "address": dict(address or US_ADDRESS),
        "creditCard": {
            "creditCardNumber": card_number,
            "creditCardCvv": 672,
            "creditCardExpirationYear": year or datetime.date.today().year + 1,
            "creditCardExpirationMonth": 1,
        },
    }


def checkout(user_id, currency="USD", headers=None, timeout=30, **body_kwargs):
    return requests.post(
        url(f"/api/checkout?currencyCode={currency}"),
        json=checkout_body(user_id, currency=currency, **body_kwargs),
        headers=headers,
        timeout=timeout,
    )


def place_order(product_id=RED_FLASHLIGHT, quantity=1, headers=None, **kwargs):
    """Fill a fresh cart and check it out; returns (user_id, response)."""
    user_id = new_user()
    add_to_cart(user_id, product_id, quantity)
    return user_id, checkout(user_id, headers=headers, **kwargs)


def money(m):
    return m["units"] + m["nanos"] / 1e9


# --- feature flags -------------------------------------------------------------


def read_flags():
    resp = requests.get(url("/feature/api/read"), timeout=10)
    resp.raise_for_status()
    return resp.json()


def write_flags(doc):
    resp = requests.post(url("/feature/api/write"), json={"data": doc}, timeout=10)
    resp.raise_for_status()


def _update_flags(mutate, settle):
    doc = read_flags()
    mutate(doc["flags"])
    write_flags(doc)
    time.sleep(settle)


@contextlib.contextmanager
def flag(name, variant, settle=3):
    """Set a flag's defaultVariant for the duration of the block, then put it back to 'off'."""
    _update_flags(lambda f: f[name].__setitem__("defaultVariant", variant), settle)
    try:
        yield
    finally:
        _update_flags(lambda f: f[name].__setitem__("defaultVariant", "off"), settle)


@contextlib.contextmanager
def product_catalog_failure(settle=3):
    """productCatalogFailure is switched by its targeting rule's match branch."""
    _update_flags(lambda f: f["productCatalogFailure"]["targeting"]["if"].__setitem__(1, "on"), settle)
    try:
        yield
    finally:
        _update_flags(
            lambda f: f["productCatalogFailure"]["targeting"]["if"].__setitem__(1, "off"), settle
        )


def resolve_flag(kind, key, context=None):
    """kind is Boolean, Float, Int, String or Object."""
    return requests.post(
        url(f"/flagservice/flagd.evaluation.v1.Service/Resolve{kind}"),
        json={"flagKey": key, "context": context or {}},
        timeout=10,
    )


# --- Jaeger ---------------------------------------------------------------------


def jaeger_traces(service, tags=None, operation=None, lookback="1h", limit=20):
    params = {"service": service, "lookback": lookback, "limit": limit}
    if tags:
        params["tags"] = json.dumps(tags)
    if operation:
        params["operation"] = operation
    resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces", params=params, timeout=20)
    resp.raise_for_status()
    return resp.json().get("data") or []


def jaeger_trace(trace_id):
    resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces/{trace_id}", timeout=20)
    if resp.status_code == 404:
        return None
    resp.raise_for_status()
    data = resp.json().get("data") or []
    return data[0] if data else None


def tags_of(span):
    return {t["key"]: t["value"] for t in span.get("tags", [])}


def service_of(trace, span):
    return trace["processes"][span["processID"]]["serviceName"]


def process_tags(trace, span):
    return {t["key"]: t["value"] for t in trace["processes"][span["processID"]].get("tags", [])}


def spans(trace, service=None, name=None):
    return [
        s
        for s in trace["spans"]
        if (service is None or service_of(trace, s) == service)
        and (name is None or s["operationName"] == name)
    ]


def events_of(span):
    """Span events as a list of (name, {field: value})."""
    out = []
    for log in span.get("logs", []):
        fields = {f["key"]: f["value"] for f in log.get("fields", [])}
        out.append((fields.get("event"), fields))
    return out


def wait_for_span(service, tags, span_service, span_name, operation=None, lookback="1h",
                  timeout=90, settle=5):
    """Find a trace by tags and wait until it holds the named span; returns (trace, span)."""

    def find():
        for t in jaeger_traces(service, tags=tags, operation=operation, lookback=lookback):
            found = spans(t, span_service, span_name)
            if found:
                return t["traceID"]
        return None

    trace_id = poll_until(find, f"{span_service} span {span_name} for {service} {tags}",
                          timeout=timeout)
    time.sleep(settle)
    trace = jaeger_trace(trace_id)
    return trace, spans(trace, span_service, span_name)[0]


def wait_for_order_trace(order_id, timeout=90):
    """The whole trace of an order placed through checkout, re-read once the
    slower services have exported their spans."""
    trace, _ = wait_for_span("checkout", {"demo.order.id": order_id}, "checkout",
                             "oteldemo.CheckoutService/PlaceOrder", timeout=timeout, settle=10)
    return trace


# --- OpenSearch ------------------------------------------------------------------


def os_search(query, size=50, sort_desc=True):
    body = {"query": query, "size": size}
    if sort_desc:
        body["sort"] = [{"observedTimestamp": {"order": "desc", "unmapped_type": "date"}}]
    resp = requests.post(f"{OPENSEARCH_URL}/otel-logs*/_search", json=body, timeout=20)
    resp.raise_for_status()
    return [h["_source"] for h in resp.json()["hits"]["hits"]]


def os_wait(query, predicate=lambda doc: True, description="log record", timeout=60, size=50):
    """Poll OpenSearch until a record matching the query and predicate is indexed."""

    def find():
        return [d for d in os_search(query, size=size) if predicate(d)]

    return poll_until(find, description, timeout=timeout)


def term(field, value):
    return {"term": {field: value}}


def match_phrase(field, value):
    return {"match_phrase": {field: value}}


def bool_must(*clauses):
    return {"bool": {"must": list(clauses)}}


def attr(doc, key):
    """Read a log attribute whose dotted key may be stored flat or nested."""
    attrs = doc.get("attributes") or {}
    if key in attrs:
        return attrs[key]
    node = attrs
    for part in key.split("."):
        if not isinstance(node, dict) or part not in node:
            return None
        node = node[part]
    return node


def resource_service(doc):
    res = doc.get("resource") or {}
    if "service.name" in res:
        return res["service.name"]
    return (res.get("service") or {}).get("name")


# --- Prometheus --------------------------------------------------------------------


def prom(expr):
    resp = requests.get(f"{PROMETHEUS_URL}/api/v1/query", params={"query": expr}, timeout=20)
    resp.raise_for_status()
    return resp.json()["data"]["result"]


def prom_value(expr):
    result = prom(expr)
    return float(result[0]["value"][1]) if result else 0.0


def prom_wait(expr, timeout=150):
    return poll_until(lambda: prom(expr), f"Prometheus series for {expr}", timeout=timeout)


# --- containers ---------------------------------------------------------------------


def docker(*args, check=True, timeout=120):
    if shutil.which("docker") is None:
        pytest.skip("docker CLI not available to this test runner")
    proc = subprocess.run(["docker", *args], capture_output=True, text=True, timeout=timeout)
    if check and proc.returncode != 0:
        raise AssertionError(f"docker {' '.join(args)} failed: {proc.stderr.strip()}")
    return proc


def inspect(container, fmt):
    return docker("inspect", container, "--format", fmt).stdout.strip()


def utc_now():
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def container_log_lines(container, since):
    proc = docker("logs", "--since", since, container)
    return (proc.stdout + proc.stderr).splitlines()


def container_json_logs(container, since):
    out = []
    for line in container_log_lines(container, since):
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            out.append(json.loads(line))
        except ValueError:
            continue
    return out


def wait_healthy(container, timeout=180):
    return poll_until(
        lambda: inspect(container, "{{.State.Health.Status}}") == "healthy",
        f"{container} healthy",
        timeout=timeout,
    )


def wait_storefront(timeout=180):
    def ok():
        try:
            return requests.get(url("/api/products"), timeout=5).status_code == 200
        except requests.RequestException:
            return False

    poll_until(ok, "storefront answering /api/products", timeout=timeout)

