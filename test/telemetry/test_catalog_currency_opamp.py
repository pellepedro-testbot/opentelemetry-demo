# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Product catalog (lock contention, OpAMP, telemetry), currency (rpc
semconv, shutdown, logs, metrics) and the OpAMP server UI."""

import html
import re
import time
import uuid

import pytest
import requests

import shop
from conftest import poll_until

OPAMP_COLLECTOR_ID = "00000000-0000-7000-8000-000000000001"


# --- psql -----------------------------------------------------------------------


def psql(sql):
    return shop.docker(
        "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", sql
    ).stdout.strip()


LOCK_HOLDERS_SQL = (
    "SELECT a.usename FROM pg_locks l "
    "JOIN pg_class c ON c.oid = l.relation "
    "JOIN pg_namespace n ON n.oid = c.relnamespace "
    "LEFT JOIN pg_stat_activity a ON a.pid = l.pid "
    "WHERE n.nspname = 'catalog' AND c.relname = 'products' "
    "AND l.mode = 'AccessExclusiveLock' AND l.granted"
)


def lock_holders():
    out = psql(LOCK_HOLDERS_SQL)
    return [line for line in out.splitlines() if line.strip()]


def get_product_in_own_trace(product_id=shop.OTHER_PRODUCT):
    """GET a product under a trace id of our own; returns (trace, product-catalog GetProduct span)."""
    trace_id = uuid.uuid4().hex
    requests.get(
        shop.url(f"/api/products/{product_id}"),
        headers={"traceparent": f"00-{trace_id}-{uuid.uuid4().hex[:16]}-01"},
        timeout=15,
    ).raise_for_status()

    def find():
        trace = shop.jaeger_trace(trace_id)
        if not trace:
            return None
        found = [s for s in shop.spans(trace, "product-catalog", "oteldemo.ProductCatalogService/GetProduct")
                 if shop.tags_of(s).get("demo.product.id") == product_id]
        return (trace, found[0]) if found else None

    return poll_until(find, f"product-catalog GetProduct span for {product_id}", timeout=90)


def timed_get(path, timeout=40, **kwargs):
    start = time.monotonic()
    try:
        resp = requests.get(shop.url(path), timeout=timeout, **kwargs)
        return resp.status_code, time.monotonic() - start
    except requests.Timeout:
        return None, time.monotonic() - start


@pytest.fixture(scope="module")
def lock_contention():
    """Turn productCatalogLockContention on, observe the lock and the shop,
    then turn it off and observe the lock going away."""
    seen = {"holders_before": lock_holders(), "since": shop.utc_now()}
    empty_user = shop.new_user()
    with shop.flag("productCatalogLockContention", "on", settle=0):
        on_at = time.monotonic()
        try:
            seen["holders_on"] = poll_until(lock_holders, "ACCESS EXCLUSIVE lock on catalog.products",
                                            timeout=25, interval=1)
            seen["lock_after"] = time.monotonic() - on_at
        except AssertionError:
            seen["holders_on"] = []
            seen["lock_after"] = None
        seen["currency"] = timed_get("/api/currency")
        seen["cart"] = timed_get("/api/cart", params={"sessionId": empty_user, "currencyCode": "USD"})
        seen["product"] = timed_get(f"/api/products/{shop.TARGETED_PRODUCT}")
    off_at = time.monotonic()
    try:
        poll_until(lambda: not lock_holders(), "lock on catalog.products released",
                   timeout=60, interval=2)
        seen["released_after"] = time.monotonic() - off_at
    except AssertionError:
        seen["released_after"] = None
    seen["product_after"] = timed_get(f"/api/products/{shop.TARGETED_PRODUCT}")
    return seen


def test_no_exclusive_lock_on_products_while_lock_contention_off(lock_contention):
    assert lock_contention["holders_before"] == []


def test_lock_contention_takes_exclusive_lock_within_25_seconds(lock_contention):
    assert lock_contention["lock_after"] is not None, "no ACCESS EXCLUSIVE lock within 25 s"
    assert lock_contention["lock_after"] <= 25


def test_lock_is_held_by_astronomy_user(lock_contention):
    assert lock_contention["holders_on"], "no lock seen"
    assert set(lock_contention["holders_on"]) == {"astronomy_user"}


def test_currency_answers_quickly_while_lock_held(lock_contention):
    status, elapsed = lock_contention["currency"]
    assert status == 200
    assert elapsed < 1.0


def test_empty_cart_answers_quickly_while_lock_held(lock_contention):
    status, elapsed = lock_contention["cart"]
    assert status == 200
    assert elapsed < 1.0


def test_product_lookup_does_not_answer_normally_while_lock_held(lock_contention):
    status, elapsed = lock_contention["product"]
    # 504 from the proxy after ~15 s, or a request stalled until the lock ends.
    assert status == 504 or elapsed >= 10, f"answered {status} after {elapsed:.1f}s"
    if status == 504:
        assert elapsed >= 10


def test_lock_released_and_products_fast_after_lock_contention_off(lock_contention):
    assert lock_contention["released_after"] is not None, "lock still held 60 s after flag off"
    status, elapsed = lock_contention["product_after"]
    assert status == 200
    assert elapsed < 1.0


def test_lock_contention_log_reaches_opensearch(lock_contention):
    msg = "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products"
    docs = shop.os_wait(
        shop.match_phrase("body", msg),
        predicate=lambda d: d["body"] == msg and shop.resource_service(d) == "product-catalog"
        and d["observedTimestamp"] >= lock_contention["since"],
        description="product-catalog lock contention log in OpenSearch",
    )
    assert docs


def test_astronomy_user_can_update_products():
    assert psql("SELECT has_table_privilege('astronomy_user', 'catalog.products', 'UPDATE')") == "t"


def test_astronomy_user_cannot_delete_products():
    assert psql("SELECT has_table_privilege('astronomy_user', 'catalog.products', 'DELETE')") == "f"


def test_reviews_schema_removed_and_catalog_remains():
    assert psql("SELECT to_regclass('reviews.productreviews') IS NULL") == "t"
    assert psql("SELECT count(*) FROM pg_namespace WHERE nspname = 'reviews'") == "0"
    assert psql("SELECT to_regclass('catalog.products') IS NOT NULL") == "t"


# --- OpAMP -----------------------------------------------------------------------


def opamp_page(path="/opamp/"):
    resp = requests.get(shop.url(path), timeout=15)
    resp.raise_for_status()
    return resp.text


def agent_rows(page):
    rows = []
    for tr in re.findall(r"<tr>(.*?)</tr>", page, re.S):
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<td>(.*?)</td>", tr, re.S)]
        if len(cells) == 5:
            rows.append(dict(zip(["name", "version", "health", "last_seen", "instance_id"], cells)))
    return rows


def agent_named(name):
    rows = [r for r in agent_rows(opamp_page()) if r["name"] == name]
    assert rows, f"no OpAMP agent named {name}"
    return rows[0]


def agent_page(instance_id):
    return html.unescape(opamp_page(f"/opamp/agent?instanceid={instance_id}"))


def attribute(page, key):
    """Agent attribute rows render as 'key string_value:"value"'."""
    m = re.search(re.escape(key) + r'\s*</td>\s*<td>\s*string_value:"([^"]*)"', page)
    if m:
        return m.group(1)
    text = re.sub(r"<[^>]+>", " ", page)
    m = re.search(re.escape(key) + r'\s+string_value:"([^"]*)"', text)
    return m.group(1) if m else None


def test_opamp_lists_product_catalog_agent():
    assert agent_named("product-catalog")


def test_opamp_product_catalog_health_up():
    assert agent_named("product-catalog")["health"] == "Up"


def test_opamp_product_catalog_service_name():
    page = agent_page(agent_named("product-catalog")["instance_id"])
    assert attribute(page, "service.name") == "product-catalog"


def test_opamp_product_catalog_sdk_language_go():
    page = agent_page(agent_named("product-catalog")["instance_id"])
    assert attribute(page, "telemetry.sdk.language") == "go"


def test_opamp_product_catalog_client_certificate_section():
    page = agent_page(agent_named("product-catalog")["instance_id"])
    assert "Client Certificate" in page
    assert "Client did not supply a certificate." in page


def test_product_catalog_span_instance_id_matches_opamp_id():
    opamp_id = agent_named("product-catalog")["instance_id"]
    trace, span = get_product_in_own_trace()
    assert shop.process_tags(trace, span)["service.instance.id"] == opamp_id.replace("-", "")


def test_product_catalog_reports_health_capability():
    opamp_id = agent_named("product-catalog")["instance_id"].replace("-", "")
    lines = [
        line for line in shop.container_log_lines("opamp-server", "24h")
        if f"AgentToServer: InstanceUid={opamp_id}" in line and "Capabilities=[" in line
    ]
    assert lines, "no AgentToServer line for product-catalog"
    caps = set()
    for line in lines:
        caps.update(re.search(r"Capabilities=\[([^\]]*)\]", line).group(1).split("|"))
    assert "ReportsHealth" in caps


def test_opamp_agent_page_back_link_leads_to_agents_list():
    page = opamp_page(f"/opamp/agent?instanceid={agent_named('product-catalog')['instance_id']}")
    m = re.search(r'<a href="([^"]*)">\s*Back to Agents List\s*</a>', page)
    assert m, "no Back to Agents List link"
    assert m.group(1) == "/opamp/"
    back = requests.get(shop.url(m.group(1)), timeout=15)
    assert back.status_code == 200
    assert "<h2>Agents</h2>" in back.text
    assert agent_rows(back.text)


def test_opamp_agent_page_has_no_configuration_form():
    page = agent_page(agent_named("product-catalog")["instance_id"])
    assert "Additional Configuration" not in page
    assert "Save and Send to Agent" not in page


def test_opamp_agent_page_has_no_connection_settings_or_custom_messages():
    page = agent_page(agent_named("product-catalog")["instance_id"])
    for gone in ("OpAMP Connection Settings", "Rotate Client Certificate",
                 "Accept and Offer Client Certificate", "Custom Messages"):
        assert gone not in page


def test_opamp_index_heading_and_agents_table_columns():
    page = opamp_page()
    assert re.search(r"<h1>\s*OpAMP Server\s*</h1>", page)
    assert re.search(r"<h2>\s*Agents\s*</h2>", page)
    headers = [h.strip() for h in re.findall(r"<th>(.*?)</th>", page, re.S)]
    assert headers == ["Name", "Version", "Health", "Last seen", "Instance ID"]


def test_opamp_server_container_healthy():
    shop.wait_healthy("opamp-server", timeout=120)


@pytest.fixture(scope="module")
def product_catalog_restart():
    before = shop.utc_now()
    start = time.monotonic()
    shop.docker("stop", "product-catalog", timeout=60)
    stop_secs = time.monotonic() - start
    exit_code = shop.inspect("product-catalog", "{{.State.ExitCode}}")
    restarted_at = shop.utc_now()
    shop.docker("start", "product-catalog")
    shop.wait_healthy("product-catalog")
    shop.wait_storefront()
    return {"before": before, "stop_secs": stop_secs, "exit_code": exit_code,
            "restarted_at": restarted_at}


def test_product_catalog_stops_cleanly_on_sigterm(product_catalog_restart):
    assert product_catalog_restart["exit_code"] == "0"
    assert product_catalog_restart["stop_secs"] < 9


def test_product_catalog_registers_with_opamp_after_restart(product_catalog_restart):
    def registered():
        opamp_id = agent_named("product-catalog")["instance_id"].replace("-", "")
        return [
            line for line in shop.container_log_lines("opamp-server", product_catalog_restart["restarted_at"])
            if f"AgentToServer: InstanceUid={opamp_id}" in line
        ]

    assert poll_until(registered, "product-catalog AgentToServer after restart", timeout=90)
    assert agent_named("product-catalog")["health"] == "Up"


# --- product-catalog telemetry -------------------------------------------------------


@pytest.fixture(scope="module")
def get_product_span():
    return get_product_in_own_trace()


def test_get_product_span_has_demo_product_attributes(get_product_span):
    _, span = get_product_span
    tags = shop.tags_of(span)
    assert tags["demo.product.id"] == shop.OTHER_PRODUCT
    name = requests.get(shop.url(f"/api/products/{shop.OTHER_PRODUCT}"), timeout=15).json()["name"]
    assert tags["demo.product.name"] == name
    assert "app.product.id" not in tags
    assert "app.product.name" not in tags


def test_get_product_span_has_product_catalog_failure_flag_event(get_product_span):
    _, span = get_product_span
    evals = [f for name, f in shop.events_of(span)
             if name == "feature_flag.evaluation" and f.get("feature_flag.key") == "productCatalogFailure"]
    assert evals, "no feature_flag.evaluation event for productCatalogFailure"
    assert evals[0]["feature_flag.result.value"] is False


def test_list_products_span_counts_returned_products():
    products = requests.get(shop.url("/api/products"), timeout=15).json()
    trace, span = shop.wait_for_span(
        "product-catalog", None, "product-catalog", "oteldemo.ProductCatalogService/ListProducts",
        operation="oteldemo.ProductCatalogService/ListProducts", lookback="5m", settle=0,
    )
    tags = shop.tags_of(span)
    assert tags["demo.product.count"] == len(products)
    assert "app.products.count" not in tags


def test_product_found_log_has_demo_product_attributes():
    requests.get(shop.url(f"/api/products/{shop.OTHER_PRODUCT}"), timeout=15).raise_for_status()
    docs = shop.os_wait(
        shop.bool_must(shop.match_phrase("body", "Product Found"),
                       shop.match_phrase("attributes.demo.product.id", shop.OTHER_PRODUCT)),
        predicate=lambda d: shop.resource_service(d) == "product-catalog",
        description="product-catalog Product Found log for 66VCHSJNUP",
    )
    doc = docs[0]
    assert shop.attr(doc, "demo.product.id") == shop.OTHER_PRODUCT
    assert shop.attr(doc, "demo.product.name")
    assert shop.attr(doc, "app.product.id") is None
    assert shop.attr(doc, "app.product.name") is None


def test_catalog_query_carries_traceparent_of_request_trace():
    trace_id = None
    for _ in range(10):
        candidate = uuid.uuid4().hex
        requests.get(
            shop.url(f"/api/products/{shop.OTHER_PRODUCT}"),
            headers={"traceparent": f"00-{candidate}-{uuid.uuid4().hex[:16]}-01"},
            timeout=15,
        ).raise_for_status()
        rows = psql("SELECT query FROM pg_stat_activity WHERE usename = 'astronomy_user'")
        if f"traceparent='00-{candidate}-" in rows and "catalog.products" in rows:
            trace_id = candidate
            break
        time.sleep(1)
    assert trace_id, "no catalog.products query with this request's traceparent in pg_stat_activity"
    trace = poll_until(lambda: shop.jaeger_trace(trace_id), f"trace {trace_id} in Jaeger", timeout=60)
    assert shop.spans(trace, "product-catalog", "oteldemo.ProductCatalogService/GetProduct")


def test_product_catalog_container_healthy_via_grpc_probe():
    test = shop.inspect("product-catalog", "{{json .Config.Healthcheck.Test}}")
    assert "/bin/grpc_health_probe" in test
    shop.wait_healthy("product-catalog", timeout=120)


# --- currency ------------------------------------------------------------------------


@pytest.fixture(scope="module")
def currency_spans():
    requests.get(shop.url("/api/currency"), timeout=15).raise_for_status()
    requests.get(shop.url("/api/products?currencyCode=EUR"), timeout=15).raise_for_status()
    _, supported = shop.wait_for_span(
        "currency", None, "currency", "oteldemo.CurrencyService/GetSupportedCurrencies",
        operation="oteldemo.CurrencyService/GetSupportedCurrencies", lookback="5m", settle=0,
    )
    _, convert = shop.wait_for_span(
        "currency", {"demo.exchange.to": "EUR"}, "currency", "oteldemo.CurrencyService/Convert",
        operation="oteldemo.CurrencyService/Convert", lookback="5m", settle=0,
    )
    return {"GetSupportedCurrencies": shop.tags_of(supported), "Convert": shop.tags_of(convert)}


@pytest.mark.parametrize("rpc", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_rpc_system_name_grpc(currency_spans, rpc):
    assert currency_spans[rpc]["rpc.system.name"] == "grpc"


@pytest.mark.parametrize("rpc", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_rpc_response_status_ok(currency_spans, rpc):
    assert currency_spans[rpc]["rpc.response.status_code"] == "OK"


@pytest.mark.parametrize("rpc", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_rpc_method_fully_qualified(currency_spans, rpc):
    assert currency_spans[rpc]["rpc.method"] == f"oteldemo.CurrencyService/{rpc}"


@pytest.mark.parametrize("rpc", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_has_no_rpc_service(currency_spans, rpc):
    assert "rpc.service" not in currency_spans[rpc]


@pytest.mark.parametrize("rpc", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_has_no_rpc_system(currency_spans, rpc):
    assert "rpc.system" not in currency_spans[rpc]


@pytest.mark.parametrize("rpc", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_has_no_rpc_grpc_status_code(currency_spans, rpc):
    assert "rpc.grpc.status_code" not in currency_spans[rpc]


def test_convert_span_has_demo_exchange_attributes(currency_spans):
    tags = currency_spans["Convert"]
    assert tags["demo.exchange.from"] == "USD"
    assert tags["demo.exchange.to"] == "EUR"
    assert "app.currency.conversion.from" not in tags
    assert "app.currency.conversion.to" not in tags


def test_exchange_conversions_counter_in_prometheus(currency_spans):
    series = shop.prom_wait('demo_exchange_conversions_counter_total{demo_exchange_to="EUR"}')
    assert all("currency_code" not in s["metric"] for s in series)
    assert shop.prom("app_currency_counter_total") == []


def test_conversion_log_has_currency_attributes(currency_spans):
    docs = shop.os_wait(
        shop.bool_must(shop.term("eventName", "currency.conversion"),
                       shop.match_phrase("attributes.currency.to", "EUR")),
        description="currency.conversion log record to EUR",
    )
    doc = docs[0]
    assert doc["body"] == "conversion successful"
    assert shop.attr(doc, "currency.from") == "USD"
    assert shop.attr(doc, "currency.to") == "EUR"


def test_get_supported_currencies_log(currency_spans):
    docs = shop.os_wait(shop.term("eventName", "currency.get_supported_currencies"),
                        description="currency.get_supported_currencies log record")
    assert docs[0]["body"] == "GetSupportedCurrencies successful"


@pytest.fixture(scope="module")
def currency_shutdowns():
    out = {}
    for signal in ("TERM", "INT"):
        since = shop.utc_now()
        start = time.monotonic()
        if signal == "TERM":
            shop.docker("stop", "currency", timeout=60)
        else:
            shop.docker("kill", "-s", "INT", "currency")
            poll_until(lambda: shop.inspect("currency", "{{.State.Running}}") == "false",
                       "currency exited after SIGINT", timeout=15, interval=0.5)
        elapsed = time.monotonic() - start
        out[signal] = {
            "since": since,
            "elapsed": elapsed,
            "exit_code": shop.inspect("currency", "{{.State.ExitCode}}"),
            "logs": "\n".join(shop.container_log_lines("currency", since)),
        }
        out[signal]["restarted_at"] = shop.utc_now()
        shop.docker("start", "currency")
        shop.wait_healthy("currency")
    shop.wait_storefront()
    return out


def test_currency_logs_sigterm_shutdown(currency_shutdowns):
    assert "Received SIGTERM, shutting down Currency Server" in currency_shutdowns["TERM"]["logs"]


def test_currency_exits_zero_on_sigterm(currency_shutdowns):
    assert currency_shutdowns["TERM"]["exit_code"] == "0"


def test_currency_docker_stop_within_9_seconds(currency_shutdowns):
    assert currency_shutdowns["TERM"]["elapsed"] < 9


def test_currency_logs_sigint_shutdown(currency_shutdowns):
    assert "Received SIGINT, shutting down Currency Server" in currency_shutdowns["INT"]["logs"]


def test_currency_exits_zero_on_sigint(currency_shutdowns):
    assert currency_shutdowns["INT"]["exit_code"] == "0"


def test_currency_shutdown_log_reaches_opensearch(currency_shutdowns):
    since = currency_shutdowns["TERM"]["since"]
    docs = shop.os_wait(
        shop.term("eventName", "currency.server.stopping"),
        predicate=lambda d: d["observedTimestamp"] >= since,
        description="currency.server.stopping log after docker stop",
    )
    assert docs[0]["body"].startswith("Received SIG")


def test_currency_logs_server_started(currency_shutdowns):
    since = currency_shutdowns["INT"]["restarted_at"]
    docs = shop.os_wait(
        shop.term("eventName", "currency.server.started"),
        predicate=lambda d: d["observedTimestamp"] >= since,
        description="currency.server.started log after restart",
    )
    assert docs[0]["body"] == "Currency Server started"


def test_currency_started_log_has_server_address(currency_shutdowns):
    since = currency_shutdowns["INT"]["restarted_at"]
    docs = shop.os_wait(
        shop.term("eventName", "currency.server.started"),
        predicate=lambda d: d["observedTimestamp"] >= since,
        description="currency.server.started log after restart",
    )
    assert shop.attr(docs[0], "server.address") == "0.0.0.0:7001"
