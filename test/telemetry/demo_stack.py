# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Helpers for tests that drive the running demo through its public entrypoint
(the frontend proxy) and read the result back from the telemetry backends,
the feature-flag API and the containers themselves.
"""

import contextlib
import copy
import datetime
import html
import json
import re
import os
import secrets
import subprocess
import time
import uuid
from urllib.parse import urljoin

import requests

from conftest import (
    FRONTEND_PROXY_URL,
    JAEGER_URL,
    OPENSEARCH_URL,
    PROMETHEUS_URL,
    poll_until,
)

FLAGD_READ_URL = f"{FRONTEND_PROXY_URL}/feature/api/read"
FLAGD_WRITE_URL = f"{FRONTEND_PROXY_URL}/feature/api/write"
FLAGSERVICE_URL = f"{FRONTEND_PROXY_URL}/flagservice/flagd.evaluation.v1.Service"
OTLP_HTTP_TRACES_URL = f"{FRONTEND_PROXY_URL}/otlp-http/v1/traces"
OPAMP_URL = f"{FRONTEND_PROXY_URL}/opamp/"

VALID_CARD = "4432-8015-6152-0454"

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zipCode": "94043",
}

COMPOSE_FILES = [
    "-f", "compose.yaml",
    "-f", "compose.full.yaml",
    "-f", "compose.observability.yaml",
    "-f", "compose.extras.yaml",
]


def repo_root():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def new_trace_id():
    return secrets.token_hex(16)


def traceparent(trace_id):
    return f"00-{trace_id}-{secrets.token_hex(8)}-01"


def new_user_id(prefix="telemetry-test"):
    return f"{prefix}-{uuid.uuid4()}"


def utc_now():
    return datetime.datetime.now(datetime.timezone.utc)


# --- storefront API ---------------------------------------------------------


def add_to_cart(user_id, product_id="OLJCESPC7Z", quantity=1, headers=None):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        headers=headers or {},
        timeout=30,
    )
    return resp


def get_cart(user_id, currency="USD", timeout=30):
    return requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": currency},
        timeout=timeout,
    )


def empty_cart(user_id, timeout=30):
    return requests.delete(
        f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=timeout
    )


def checkout_body(user_id, card_number=VALID_CARD, expiration_year=None, currency="USD", email=None):
    return {
        "userId": user_id,
        "userCurrency": currency,
        "email": email or f"{user_id}@example.com",
        "address": dict(ADDRESS),
        "creditCard": {
            "creditCardNumber": card_number,
            "creditCardCvv": 672,
            "creditCardExpirationYear": expiration_year or utc_now().year + 1,
            "creditCardExpirationMonth": 1,
        },
    }


def post_checkout(body, trace_id=None, currency="USD", baggage=None, timeout=60):
    trace_id = trace_id or new_trace_id()
    headers = {"traceparent": traceparent(trace_id)}
    if baggage is not None:
        headers["baggage"] = baggage
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=body,
        headers=headers,
        timeout=timeout,
    )
    return resp, trace_id


def place_order(user_id=None, product_id="OLJCESPC7Z", quantity=1, currency="USD", baggage=None, **body_overrides):
    """Fill a fresh cart and check it out. Returns (response, trace_id, user_id, body)."""
    user_id = user_id or new_user_id()
    cart = add_to_cart(user_id, product_id, quantity)
    assert cart.status_code == 200, f"POST /api/cart answered {cart.status_code}: {cart.text[:300]}"
    body = checkout_body(user_id, currency=currency, **body_overrides)
    resp, trace_id = post_checkout(body, currency=currency, baggage=baggage)
    return resp, trace_id, user_id, body


def money_value(money):
    return int(money.get("units", 0)) + int(money.get("nanos", 0)) / 1e9


# --- feature flags ----------------------------------------------------------


def read_flags():
    resp = requests.get(FLAGD_READ_URL, timeout=10)
    resp.raise_for_status()
    return resp.json()


def write_flags(document):
    resp = requests.post(FLAGD_WRITE_URL, json={"data": document}, timeout=10)
    resp.raise_for_status()


def set_flag(name, variant, settle=2):
    doc = read_flags()
    doc["flags"][name]["defaultVariant"] = variant
    write_flags(doc)
    time.sleep(settle)


def set_product_catalog_failure(variant, settle=2):
    """productCatalogFailure targets one product through its targeting rule, so the
    /feature UI flips the rule's true-branch rather than defaultVariant."""
    doc = read_flags()
    doc["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(doc)
    time.sleep(settle)


@contextlib.contextmanager
def flag(name, variant, resting="off"):
    set_flag(name, variant)
    try:
        yield
    finally:
        set_flag(name, resting)


@contextlib.contextmanager
def product_catalog_failure():
    set_product_catalog_failure("on")
    try:
        yield
    finally:
        set_product_catalog_failure("off")


@contextlib.contextmanager
def flag_document_restored():
    """Restore the whole flag document after a test that edits more than a variant."""
    original = copy.deepcopy(read_flags())
    try:
        yield original
    finally:
        write_flags(original)


def shipped_flag_document():
    """The flag document as committed, which the stack starts from."""
    result = subprocess.run(
        ["git", "show", "HEAD:src/flagd/demo.flagd.json"], capture_output=True, text=True, cwd=repo_root(), check=True
    )
    return json.loads(result.stdout)


def resolve_flag(kind, flag_key):
    resp = requests.post(
        f"{FLAGSERVICE_URL}/Resolve{kind}",
        json={"flagKey": flag_key, "context": {}},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


# --- Jaeger -----------------------------------------------------------------


def _flatten_trace(trace):
    processes = trace.get("processes", {})
    spans = []
    for span in trace.get("spans", []):
        process = processes.get(span["processID"], {})
        parent = next(
            (r["spanID"] for r in span.get("references", []) if r.get("refType") == "CHILD_OF"),
            None,
        )
        spans.append(
            {
                "service": process.get("serviceName"),
                "process_tags": {t["key"]: t["value"] for t in process.get("tags", [])},
                "name": span["operationName"],
                "span_id": span["spanID"],
                "trace_id": span["traceID"],
                "parent": parent,
                "tags": {t["key"]: t["value"] for t in span.get("tags", [])},
                "events": [
                    {f["key"]: f["value"] for f in log.get("fields", [])}
                    for log in span.get("logs", [])
                ],
            }
        )
    return spans


def trace_spans(trace_id, until=None, timeout=40):
    """Spans of one trace, polled until `until(spans)` holds (default: any span)."""

    def check():
        resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces/{trace_id}", timeout=10)
        if resp.status_code != 200:
            return None
        data = resp.json().get("data") or []
        if not data:
            return None
        spans = _flatten_trace(data[0])
        if until is None or until(spans):
            return spans
        return None

    return poll_until(check, f"trace {trace_id} in Jaeger", timeout=timeout, interval=3)


def find_spans(spans, service=None, name=None):
    return [
        s for s in spans
        if (service is None or s["service"] == service) and (name is None or s["name"] == name)
    ]


def has_span(service, name):
    return lambda spans: bool(find_spans(spans, service, name))


def search_spans(service, operation=None, lookback="30m", limit=20, tags=None):
    params = {"service": service, "lookback": lookback, "limit": limit}
    if operation:
        params["operation"] = operation
    if tags:
        params["tags"] = json.dumps(tags)
    resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces", params=params, timeout=30)
    resp.raise_for_status()
    spans = []
    for trace in resp.json().get("data") or []:
        spans.extend(_flatten_trace(trace))
    return spans


# --- OpenSearch -------------------------------------------------------------


def _flatten(value, prefix=""):
    flat = {}
    if isinstance(value, dict):
        for key, inner in value.items():
            flat.update(_flatten(inner, f"{prefix}{key}."))
    else:
        flat[prefix[:-1]] = value
    return flat


def log_record(source):
    """An OpenSearch log document with attributes and resource flattened to dotted keys."""
    record = dict(source)
    record["attributes"] = _flatten(source.get("attributes") or {})
    record["resource"] = _flatten(source.get("resource") or {})
    return record


def search_logs(body_phrase, trace_id=None, service=None, size=50, extra=None):
    must = [{"match_phrase": {"body": body_phrase}}]
    if trace_id:
        must.append({"term": {"traceId": trace_id}})
    if service:
        must.append({"term": {"resource.service.name.keyword": service}})
    must.extend(extra or [])
    resp = requests.post(
        f"{OPENSEARCH_URL}/otel-logs-*/_search",
        json={"size": size, "query": {"bool": {"must": must}}},
        timeout=15,
    )
    resp.raise_for_status()
    return [log_record(hit["_source"]) for hit in resp.json()["hits"]["hits"]]


def wait_for_logs(body_phrase, match=lambda record: True, timeout=60, **kwargs):
    def check():
        records = [r for r in search_logs(body_phrase, **kwargs) if match(r)]
        return records or None

    return poll_until(check, f"log '{body_phrase}' in OpenSearch", timeout=timeout, interval=3)


def confirmation_sent_records(order_id, timeout=60):
    """checkout's "order confirmation email sent" records for one order (they carry no trace id)."""
    return wait_for_logs(
        "order confirmation email sent",
        service="checkout",
        extra=[{"match_phrase": {"attributes.demo.order.id": order_id}}],
        timeout=timeout,
    )


# --- Prometheus -------------------------------------------------------------


def prom_query(expr):
    resp = requests.get(f"{PROMETHEUS_URL}/api/v1/query", params={"query": expr}, timeout=15)
    resp.raise_for_status()
    return resp.json()["data"]["result"]


def wait_for_series(expr, timeout=120):
    return poll_until(lambda: prom_query(expr), f"Prometheus series for {expr}", timeout=timeout)


# --- OpAMP server UI ---------------------------------------------------------


def agent_rows():
    resp = requests.get(OPAMP_URL, timeout=15)
    assert resp.status_code == 200
    rows = []
    for row in re.findall(r"<tr>(.*?)</tr>", resp.text, re.S):
        cells = re.findall(r"<td>(.*?)</td>", row, re.S)
        if len(cells) < 5:
            continue
        link = re.search(r'href="([^"]+)"[^>]*>([^<]+)</a>', cells[4])
        rows.append(
            {
                "name": cells[0].strip(),
                "health": cells[2].strip(),
                "href": link.group(1),
                "instance_id": link.group(2).strip(),
            }
        )
    return rows


def agent_row(name):
    rows = [r for r in agent_rows() if r["name"] == name]
    assert rows, f"no agent named {name} on /opamp/"
    return rows[0]


def agent_page(instance_id):
    resp = requests.get(urljoin(OPAMP_URL, f"agent?instanceid={instance_id}"), timeout=15)
    assert resp.status_code == 200
    return html.unescape(resp.text)


def attribute(page, key):
    match = re.search(r"<td>" + re.escape(key) + r'</td>\s*<td>string_value:"([^"]*)"</td>', page)
    return match.group(1) if match else None


# --- containers -------------------------------------------------------------


def docker(*args, timeout=120, check=True):
    result = subprocess.run(
        ["docker", *args], capture_output=True, text=True, timeout=timeout
    )
    if check and result.returncode != 0:
        raise AssertionError(f"docker {' '.join(args)} failed: {result.stderr.strip()}")
    return result


def container_logs(container, since):
    """stdout and stderr of a container since a datetime."""
    result = docker("logs", "--since", since.strftime("%Y-%m-%dT%H:%M:%S.%fZ"), container)
    return result.stdout + result.stderr


def container_json_lines(container, since, trace_id=None):
    lines = []
    for line in container_logs(container, since).splitlines():
        try:
            entry = json.loads(line)
        except ValueError:
            continue
        if isinstance(entry, dict) and (trace_id is None or entry.get("trace_id") == trace_id):
            lines.append(entry)
    return lines


def frontend_lines(since, trace_id, settle=2):
    time.sleep(settle)
    return container_json_lines("frontend", since, trace_id)


def wait_healthy(container, timeout=180):
    def check():
        state = docker(
            "inspect", "-f", "{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}", container
        ).stdout.split()
        return state and state[0] == "running" and (len(state) == 1 or state[1] == "healthy")

    poll_until(check, f"container {container} running and healthy", timeout=timeout, interval=2)


def _compose_base_env():
    """Only what docker itself needs: any other variable of the caller's shell would
    override the stack's .env when compose interpolates its files."""
    keep = ("PATH", "HOME", "DOCKER_HOST", "DOCKER_CONFIG", "DOCKER_CONTEXT", "XDG_RUNTIME_DIR")
    return {k: v for k, v in os.environ.items() if k in keep}


def compose(*args, env=None, timeout=600):
    result = subprocess.run(
        ["docker", "compose", "--env-file", ".env", "--env-file", ".env.override", *COMPOSE_FILES, *args],
        capture_output=True,
        text=True,
        timeout=timeout,
        cwd=repo_root(),
        env={**_compose_base_env(), **(env or {})},
    )
    if result.returncode != 0:
        raise AssertionError(f"docker compose {' '.join(args)} failed: {result.stderr.strip()[-2000:]}")
    return result
