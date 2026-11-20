# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Cart, accounting and fraud-detection behaviour driven through the
storefront, read back from the cart API, Jaeger, Prometheus, OpenSearch, the
OpAMP server and the containers themselves."""

import html
import re
import time

import pytest
import requests

import shop
from conftest import poll_until

KAFKA_IMAGE_FALLBACK = "ghcr.io/open-telemetry/demo:latest-kafka"
DEMO_NETWORK = "opentelemetry-demo"


def _cart_log(event_name, user_id, description, timeout=90):
    return shop.os_wait(
        shop.bool_must(shop.term("eventName", event_name),
                       shop.match_phrase("attributes.userId", user_id)),
        predicate=lambda d: shop.resource_service(d) == "cart",
        description=description,
        timeout=timeout,
    )[0]


def _kafka_groups(*args, check=True):
    image = shop.inspect("kafka", "{{.Config.Image}}") or KAFKA_IMAGE_FALLBACK
    return shop.docker(
        "run", "--rm", "--network", DEMO_NETWORK, "-e", "KAFKA_OPTS=",
        "--entrypoint", "/opt/kafka/bin/kafka-consumer-groups.sh", image,
        "--bootstrap-server", "kafka:9092", *args,
        check=check, timeout=180,
    )


def _wait_group_empty(group):
    def empty():
        out = _kafka_groups("--describe", "--group", group, "--state", check=False).stdout
        return "Empty" in out or "Dead" in out

    poll_until(empty, f"consumer group {group} to be Empty", timeout=120, interval=10)


def _start_and_wait(container):
    shop.docker("start", container)
    poll_until(lambda: shop.inspect(container, "{{.State.Running}}") == "true",
               f"{container} running", timeout=60)


# --- cart API ------------------------------------------------------------------


@pytest.fixture(scope="module")
def cart_flow():
    user = shop.new_user()
    first = requests.get(shop.url("/api/cart"),
                         params={"sessionId": user, "currencyCode": "USD"}, timeout=15)
    flow = {"user": user, "first_status": first.status_code, "first": first.json()}
    shop.add_to_cart(user, shop.TARGETED_PRODUCT, 2)
    shop.add_to_cart(user, shop.TARGETED_PRODUCT, 3)
    flow["after_same"] = shop.get_cart(user)["items"]
    shop.add_to_cart(user, shop.OTHER_PRODUCT, 4)
    flow["after_new"] = shop.get_cart(user)["items"]
    flow["delete_status"] = shop.empty_cart(user).status_code
    flow["after_delete"] = shop.get_cart(user)["items"]
    yield flow
    shop.empty_cart(user)


def test_cart_of_new_user_is_empty(cart_flow):
    assert cart_flow["first_status"] == 200
    assert cart_flow["first"]["items"] == []


def test_adding_same_product_again_adds_to_quantity(cart_flow):
    lines = [i for i in cart_flow["after_same"] if i["productId"] == shop.TARGETED_PRODUCT]
    assert len(lines) == 1, cart_flow["after_same"]
    assert lines[0]["quantity"] == 5


def test_adding_new_product_stores_given_quantity(cart_flow):
    quantities = {i["productId"]: i["quantity"] for i in cart_flow["after_new"]}
    assert quantities == {shop.TARGETED_PRODUCT: 5, shop.OTHER_PRODUCT: 4}


def test_delete_cart_empties_it(cart_flow):
    assert cart_flow["after_delete"] == []


# --- cart spans, metrics and logs -------------------------------------------------


@pytest.fixture(scope="module")
def span_flow():
    user = shop.new_user()
    shop.add_to_cart(user, shop.TARGETED_PRODUCT, 2)
    shop.get_cart(user)
    shop.empty_cart(user)
    return user


def _cart_server_span(user, method):
    _, span = shop.wait_for_span(
        "cart", {"user.id": user}, "cart", f"POST /oteldemo.CartService/{method}",
        operation=f"POST /oteldemo.CartService/{method}", lookback="15m")
    return shop.tags_of(span)


def test_cart_add_item_span_uses_demo_attributes(span_flow):
    tags = _cart_server_span(span_flow, "AddItem")
    assert tags["user.id"] == span_flow
    assert tags["demo.product.id"] == shop.TARGETED_PRODUCT
    assert tags["demo.product.quantity"] == 2
    for old in ("app.user.id", "app.product.id", "app.product.quantity"):
        assert old not in tags


def test_cart_get_cart_span_counts_items(span_flow):
    tags = _cart_server_span(span_flow, "GetCart")
    assert tags["user.id"] == span_flow
    assert tags["demo.cart.items.count"] == 2
    assert "app.user.id" not in tags
    assert "app.cart.items.count" not in tags


def test_cart_empty_cart_span_carries_user_id(span_flow):
    tags = _cart_server_span(span_flow, "EmptyCart")
    assert tags["user.id"] == span_flow
    assert "app.user.id" not in tags


def test_add_item_latency_histogram_renamed(span_flow):
    shop.prom_wait('demo_cart_add_item_latency_seconds_bucket{service_name="cart"}')
    assert shop.prom('{__name__=~"app_cart_add_item_latency_seconds.*"}') == []


def test_get_cart_latency_histogram_renamed(span_flow):
    shop.prom_wait('demo_cart_get_cart_latency_seconds_bucket{service_name="cart"}')
    assert shop.prom('{__name__=~"app_cart_get_cart_latency_seconds.*"}') == []


def test_add_item_log_record(span_flow):
    doc = _cart_log("cart.add_item", span_flow, "cart.add_item record for the user")
    assert shop.attr(doc, "userId") == span_flow
    assert shop.attr(doc, "productId") == shop.TARGETED_PRODUCT
    assert shop.attr(doc, "quantity") == 2


def test_get_cart_log_record(span_flow):
    doc = _cart_log("cart.get", span_flow, "cart.get record for the user")
    assert shop.attr(doc, "userId") == span_flow


def test_empty_cart_log_record(span_flow):
    doc = _cart_log("cart.empty", span_flow, "cart.empty record for the user")
    assert shop.attr(doc, "userId") == span_flow


def test_redis_connected_logged_at_startup():
    docs = shop.os_wait(shop.term("eventName", "cart.redis.connected"),
                        predicate=lambda d: shop.resource_service(d) == "cart",
                        description="cart.redis.connected record")
    assert docs[0]["body"] == "Successfully connected to Redis"


def test_cart_failure_flag_makes_empty_cart_fail():
    user = shop.new_user()
    shop.add_to_cart(user, shop.TARGETED_PRODUCT, 1)
    try:
        with shop.flag("cartFailure", "100%"):
            status = shop.empty_cart(user).status_code
        assert status != 204
        assert status >= 400
        assert shop.cart_quantities(user) == {shop.TARGETED_PRODUCT: 1}
    finally:
        shop.empty_cart(user)


def test_redis_connection_lost_and_restored_logged():
    since = shop.utc_now()
    user = shop.new_user()
    try:
        shop.docker("stop", "valkey-cart")
        try:
            requests.post(shop.url("/api/cart"),
                          json={"userId": user, "item": {"productId": shop.TARGETED_PRODUCT,
                                                         "quantity": 1}},
                          timeout=30)
        except requests.RequestException:
            pass
    finally:
        shop.docker("start", "valkey-cart")
    shop.wait_healthy("valkey-cart")
    time.sleep(20)

    def add_ok():
        try:
            shop.add_to_cart(user, shop.TARGETED_PRODUCT, 1)
            return True
        except requests.RequestException:
            return False

    poll_until(add_ok, "cart accepting items again", timeout=90)
    shop.empty_cart(user)

    text = "\n".join(shop.container_log_lines("cart", since))
    assert "Connection failed. Disposing the object" in text
    assert "Connection to redis was restored successfully." in text

    def recent(event):
        return shop.os_wait(
            shop.term("eventName", event),
            predicate=lambda d: shop.resource_service(d) == "cart" and d["observedTimestamp"] >= since,
            description=f"{event} record after {since}",
        )[0]

    assert recent("cart.redis.connection_lost")["body"] == "Connection failed. Disposing the object"
    assert (recent("cart.redis.connection_restored")["body"]
            == "Connection to redis was restored successfully.")


def _probe_cart():
    return shop.docker("exec", "cart", "/bin/grpc_health_probe", "-addr=localhost:7070", check=False)


def test_cart_image_ships_grpc_health_probe():
    proc = _probe_cart()
    assert proc.returncode == 0, proc.stderr
    assert "status: SERVING" in proc.stdout + proc.stderr


def test_failed_readiness_probe_flag_reports_not_serving():
    with shop.flag("failedReadinessProbe", "on"):
        proc = poll_until(
            lambda: (lambda p: p if p.returncode != 0 else None)(_probe_cart()),
            "cart health probe failing", timeout=60)
        assert "NOT_SERVING" in proc.stdout + proc.stderr
    poll_until(lambda: _probe_cart().returncode == 0, "cart serving again", timeout=60)


def _health_check_records(since):
    return shop.os_wait(
        shop.term("eventName", "cart.health_check.request"),
        predicate=lambda d: shop.resource_service(d) == "cart" and d["observedTimestamp"] >= since,
        description="cart.health_check.request record in OpenSearch",
        timeout=60,
    )


def test_health_check_request_logged():
    since = shop.utc_now()
    assert _probe_cart().returncode == 0
    time.sleep(15)
    lines = shop.container_log_lines("cart", since)
    assert any("Received health check request for service: " in line for line in lines)
    doc = _health_check_records(since)[0]
    assert doc["body"].startswith("Received health check request for service: ")


def test_health_check_log_record_reaches_opensearch():
    since = shop.utc_now()
    assert _probe_cart().returncode == 0
    time.sleep(20)
    doc = _health_check_records(since)[0]
    assert doc["eventName"] == "cart.health_check.request"
    assert doc["body"].startswith("Received health check request for service: ")


# --- cart on the OpAMP server ------------------------------------------------------


def _attribute_rows(page):
    rows = re.findall(r"<td>([^<]+)</td><td>string_value:([^<]*)</td>", page)
    return {k: html.unescape(v).strip('"') for k, v in rows}


def _opamp_agents():
    index = requests.get(shop.url("/opamp/"), timeout=10)
    index.raise_for_status()
    return dict(re.findall(r"<tr>\s*<td>([^<]+)</td>.*?instanceid=([0-9a-fA-F-]+)", index.text, re.S))


@pytest.fixture(scope="module")
def cart_agent_page():
    instance = _opamp_agents().get("cart")
    assert instance, "no agent named cart on /opamp/"
    page = requests.get(shop.url("/opamp/agent"), params={"instanceid": instance}, timeout=10)
    page.raise_for_status()
    return page.text


def test_opamp_lists_cart_agent():
    assert "cart" in _opamp_agents()


def test_opamp_cart_agent_identity_matches_spans(cart_agent_page):
    attrs = _attribute_rows(cart_agent_page)
    assert attrs["service.name"] == "cart"
    traces = shop.jaeger_traces("cart", lookback="10m", limit=5)
    assert traces, "no cart traces in Jaeger"
    trace = traces[0]
    cart_span = shop.spans(trace, "cart")[0]
    assert attrs["service.instance.id"] == shop.process_tags(trace, cart_span)["service.instance.id"]


def test_opamp_cart_agent_reports_criticality(cart_agent_page):
    attrs = _attribute_rows(cart_agent_page)
    assert attrs.get("service.criticality") == "high"


# --- accounting and fraud detection ------------------------------------------------


def test_accounting_logs_received_order():
    _, resp = shop.place_order()
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]
    doc = shop.os_wait(
        shop.term("eventName", "accounting.order.received"),
        predicate=lambda d: order_id in str(d.get("attributes")),
        description=f"accounting.order.received for {order_id}",
        timeout=90,
    )[0]
    assert doc["body"].startswith("Order details:")
    assert shop.resource_service(doc) == "accounting"


def test_accounting_logs_kafka_connection():
    lines = shop.container_log_lines("accounting", "2000-01-01T00:00:00Z")
    assert any("Connecting to Kafka: kafka:9092" in line for line in lines)
    doc = shop.os_wait(shop.term("eventName", "accounting.kafka.connecting"),
                       predicate=lambda d: shop.resource_service(d) == "accounting",
                       description="accounting.kafka.connecting record")[0]
    assert doc["body"].startswith("Connecting to Kafka:")


def test_accounting_skips_redelivered_orders():
    for _ in range(2):
        _, resp = shop.place_order()
        assert resp.status_code == 200, resp.text
    time.sleep(15)
    try:
        shop.docker("stop", "accounting")
        _wait_group_empty("accounting")
        _kafka_groups("--group", "accounting", "--reset-offsets", "--to-earliest",
                      "--topic", "orders", "--execute")
    finally:
        since = shop.utc_now()
        _start_and_wait("accounting")
    time.sleep(45)
    text = "\n".join(shop.container_log_lines("accounting", since))
    assert "Duplicate order received, skipping." in text
    assert "Order parsing failed:" not in text
    shop.os_wait(
        shop.term("eventName", "accounting.order.duplicate_skipped"),
        predicate=lambda d: d["observedTimestamp"] >= since,
        description="accounting.order.duplicate_skipped record",
    )


def test_accounting_stops_cleanly():
    since = shop.utc_now()
    started = time.time()
    try:
        shop.docker("stop", "accounting")
        elapsed = time.time() - started
        exit_code = shop.inspect("accounting", "{{.State.ExitCode}}")
        text = "\n".join(shop.container_log_lines("accounting", since))
    finally:
        _start_and_wait("accounting")
    assert exit_code == "0"
    assert elapsed < 9
    assert "Closing consumer" in text


def test_fraud_detection_consumes_orders_placed_before_start():
    try:
        shop.docker("stop", "fraud-detection")
        _, resp = shop.place_order()
        assert resp.status_code == 200, resp.text
        order_id = resp.json()["orderId"]
        _wait_group_empty("fraud-detection")
        _kafka_groups("--delete", "--group", "fraud-detection")
    finally:
        since = shop.utc_now()
        _start_and_wait("fraud-detection")

    poll_until(
        lambda: any(f"Consumed record with orderId: {order_id}" in line
                    for line in shop.container_log_lines("fraud-detection", since)),
        f"fraud-detection consuming order {order_id}",
        timeout=120,
        interval=10,
    )
