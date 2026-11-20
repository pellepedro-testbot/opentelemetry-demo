# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Shipping, quote, ad and recommendation behaviour seen through the storefront
and the telemetry each service emits for it."""

import json
import re
import time

import pytest
import requests

import shop
from conftest import poll_until
from shop import traceparent

CART_PRODUCT = "OLJCESPC7Z"


def shipping_quote(quantity, headers=None):
    return requests.get(
        shop.url("/api/shipping"),
        params={
            "itemList": json.dumps([{"productId": CART_PRODUCT, "quantity": quantity}]),
            "currencyCode": "USD",
            "address": json.dumps(shop.US_ADDRESS),
        },
        headers=headers,
        timeout=20,
    )


def ads(context_keys=None, headers=None):
    params = {"contextKeys": context_keys} if context_keys else {}
    resp = requests.get(shop.url("/api/data"), params=params, headers=headers, timeout=20)
    resp.raise_for_status()
    return resp


def recommendations(headers=None):
    resp = requests.get(
        shop.url("/api/recommendations"),
        params={"productIds": CART_PRODUCT, "sessionId": shop.new_user(), "currencyCode": "USD"},
        headers=headers,
        timeout=20,
    )
    resp.raise_for_status()
    return resp.json()


def wait_trace_span(trace_id, service, name, timeout=90):
    """Wait until the trace holds the named span of a service; returns (trace, span)."""

    def find():
        trace = shop.jaeger_trace(trace_id)
        if trace and shop.spans(trace, service, name):
            return trace
        return None

    poll_until(find, f"{service} span {name} in trace {trace_id}", timeout=timeout)
    time.sleep(5)
    trace = shop.jaeger_trace(trace_id)
    return trace, shop.spans(trace, service, name)[0]


def all_events(trace, service):
    return [ev for s in shop.spans(trace, service) for ev in shop.events_of(s)]


def logs_of_trace(trace_id, event_name, timeout=90):
    return shop.os_wait(
        shop.bool_must(shop.term("eventName", event_name), shop.term("traceId", trace_id)),
        description=f"{event_name} log record of trace {trace_id}",
        timeout=timeout,
    )


def ad_served(category):
    text = requests.get(f"{shop.AD_METRICS_URL}/metrics", timeout=10).text
    m = re.search(r'^demo_ad_served_total\{category="%s"\} ([0-9.eE+]+)$' % category, text, re.M)
    assert m, f"no demo_ad_served_total series for category {category} in ad /metrics"
    return float(m.group(1))


# --- shipping cost ------------------------------------------------------------


@pytest.mark.parametrize(
    "quantity,units,nanos",
    [
        (1, 8, 990000000),
        (2, 17, 980000000),
        (4, 35, 960000000),
        (5, 44, 950000000),
        (8, 71, 920000000),
        (10, 89, 900000000),
    ],
)
def test_shipping_quote_is_8_99_per_item(quantity, units, nanos):
    resp = shipping_quote(quantity)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["currencyCode"] == "USD"
    assert (body["units"], body["nanos"]) == (units, nanos)


def test_shipping_quote_for_three_items_rounds_to_26_97():
    resp = shipping_quote(3)
    assert resp.status_code == 200, resp.text
    assert round(shop.money(resp.json()), 2) == 26.97


def test_checkout_shipping_cost_matches_shipping_quote():
    quote = shipping_quote(1).json()
    user_id, resp = shop.place_order(shop.RED_FLASHLIGHT, 1)
    assert resp.status_code == 200, resp.text
    cost = resp.json()["shippingCost"]
    assert (cost["units"], cost["nanos"]) == (quote["units"], quote["nanos"]) == (8, 990000000)


# --- recommendation -------------------------------------------------------------


def test_recommendation_metric_name_has_no_unit_suffix():
    recommendations()
    assert shop.prom("demo_recommendation_requests_recommendations_total") == []


def test_recommendation_requests_counted_in_demo_metric():
    recommendations()
    shop.prom_wait("demo_recommendation_requests_total")


def test_recommendation_request_counter_grows():
    before = shop.prom_value("sum(demo_recommendation_requests_total)")
    for _ in range(3):
        recommendations()

    poll_until(
        lambda: shop.prom_value("sum(demo_recommendation_requests_total)") > before,
        "demo_recommendation_requests_total to grow",
        timeout=150,
    )


def test_list_recommendations_span_counts_recommended_products():
    trace_id, headers = traceparent()
    recommendations(headers)
    trace = poll_until(
        lambda: (lambda t: t if t and [
            s for s in shop.spans(t, "recommendation")
            if s["operationName"].lstrip("/") == "oteldemo.RecommendationService/ListRecommendations"
        ] else None)(shop.jaeger_trace(trace_id)),
        "recommendation ListRecommendations span",
        timeout=90,
    )
    span = [
        s for s in shop.spans(trace, "recommendation")
        if s["operationName"].lstrip("/") == "oteldemo.RecommendationService/ListRecommendations"
    ][0]
    tags = shop.tags_of(span)
    assert tags.get("demo.product.recommended.count") == 5
    assert "app.products_recommended.count" not in tags


def test_product_list_span_carries_demo_attributes_with_cache_flag_off():
    trace_id, headers = traceparent()
    returned = [p["id"] for p in recommendations(headers)]
    _, span = wait_trace_span(trace_id, "recommendation", "get_product_list")
    tags = shop.tags_of(span)
    assert tags.get("demo.feature_flag.recommendation_cache") is False
    assert isinstance(tags.get("demo.product.count"), int)
    assert isinstance(tags.get("demo.product.filtered.count"), int)
    assert [k for k in tags if k.startswith("app.")] == []
    assert "app.filtered_products.list" not in tags
    filtered = json.loads(tags["demo.product.filtered.list"])
    assert CART_PRODUCT not in filtered
    assert set(returned) <= set(filtered)


def test_product_list_span_reports_cache_hit_with_cache_flag_on():
    with shop.flag("recommendationCacheFailure", "on"):
        trace_id, headers = traceparent()
        recommendations(headers)
        _, span = wait_trace_span(trace_id, "recommendation", "get_product_list")
    tags = shop.tags_of(span)
    assert tags.get("demo.feature_flag.recommendation_cache") is True
    assert isinstance(tags.get("demo.recommendation.cache_hit"), bool)
    assert "app.cache_hit" not in tags


# --- shipping and quote telemetry ----------------------------------------------------


def test_shipping_prints_quote_lines_on_stdout():
    since = shop.utc_now()
    time.sleep(1)
    assert shipping_quote(1).status_code == 200
    time.sleep(2)
    lines = shop.container_log_lines("shipping", since)
    assert any("Sending Quote" in line for line in lines), lines[-10:]
    assert any("Requesting quote" in line for line in lines), lines[-10:]


def test_sending_quote_log_record_has_dollars_and_cents():
    trace_id, headers = traceparent()
    assert shipping_quote(1, headers).status_code == 200
    doc = logs_of_trace(trace_id, "shipping.quote.sent")[0]
    assert doc["body"] == "Sending Quote"
    assert shop.attr(doc, "dollars") == 8
    assert shop.attr(doc, "cents") == 99
    assert shop.attr(doc, "quote.dollars") is None
    assert shop.attr(doc, "quote.cents") is None
    assert shop.attr(doc, "name") is None


def test_requesting_quote_log_record_has_quote_service_address():
    trace_id, headers = traceparent()
    assert shipping_quote(1, headers).status_code == 200
    doc = logs_of_trace(trace_id, "shipping.quote.requested")[0]
    assert doc["body"] == "Requesting quote"
    assert shop.attr(doc, "quote_service_addr")


def test_tracking_id_log_record_matches_checkout_answer():
    _, resp = shop.place_order(shop.RED_FLASHLIGHT, 1)
    assert resp.status_code == 200, resp.text
    tracking_id = resp.json()["shippingTrackingId"]
    docs = shop.os_wait(
        shop.bool_must(
            shop.term("eventName", "shipping.tracking_id.created"),
            shop.match_phrase("attributes.tracking_id", tracking_id),
        ),
        predicate=lambda d: shop.attr(d, "tracking_id") == tracking_id,
        description=f"Tracking ID Created record for {tracking_id}",
        timeout=90,
    )
    assert docs[0]["body"] == "Tracking ID Created"
    assert shop.resource_service(docs[0]) == "shipping"


def test_shipping_start_up_log_record_has_listen_address():
    docs = shop.os_wait(
        shop.term("eventName", "shipping.server.started"),
        description="shipping.server.started record",
    )
    doc = docs[0]
    assert doc["body"] == "Shipping service is running"
    assert str(shop.attr(doc, "addr")).endswith(":50050")


def test_get_quote_span_carries_cost_total_attribute_and_event():
    trace_id, headers = traceparent()
    assert shipping_quote(1, headers).status_code == 200
    trace, span = wait_trace_span(trace_id, "shipping", "POST /get-quote")
    tags = shop.tags_of(span)
    assert tags.get("demo.shipping.cost.total") == "8.99"
    assert "app.shipping.cost.total" not in tags
    events = dict(shop.events_of(span))
    assert "shipping.quote.received" in events, events
    assert events["shipping.quote.received"].get("demo.shipping.cost.total") == "8.99"
    assert "Received Quote" not in [name for name, _ in all_events(trace, "shipping")]


def test_get_quote_cost_total_keeps_two_cent_digits():
    trace_id, headers = traceparent()
    assert shipping_quote(10, headers).status_code == 200
    _, span = wait_trace_span(trace_id, "shipping", "POST /get-quote")
    assert shop.tags_of(span).get("demo.shipping.cost.total") == "89.90"


def test_shipping_container_is_healthy_by_its_healthcheck_binary():
    test = json.loads(shop.inspect("shipping", "{{json .Config.Healthcheck.Test}}"))
    assert "/app/healthcheck" in " ".join(test)
    shop.wait_healthy("shipping", timeout=120)


def test_calculate_quote_span_carries_demo_quote_attributes():
    trace_id, headers = traceparent()
    assert shipping_quote(3, headers).status_code == 200
    _, span = wait_trace_span(trace_id, "quote", "calculate-quote")
    tags = shop.tags_of(span)
    assert tags.get("demo.shipping.quote.items_count") == 3
    assert tags.get("demo.shipping.quote.cost.total") == 26.97
    assert [k for k in tags if k.startswith("app.quote")] == []


def test_quote_processed_event_carries_demo_cost_total():
    trace_id, headers = traceparent()
    assert shipping_quote(1, headers).status_code == 200
    trace, _ = wait_trace_span(trace_id, "quote", "POST /getquote")
    events = [f for name, f in all_events(trace, "quote") if name == "Quote processed, response sent back"]
    assert events, "no 'Quote processed, response sent back' event on the quote spans"
    assert events[0].get("demo.shipping.quote.cost.total") == 8.99
    assert "app.quote.cost.total" not in events[0]


# --- international shipping slowdown -------------------------------------------------------


def place_order_to(address):
    user_id = shop.new_user()
    shop.add_to_cart(user_id, shop.RED_FLASHLIGHT, 1)
    trace_id, headers = traceparent()
    start = time.time()
    resp = shop.checkout(user_id, address=address, headers=headers, timeout=60)
    return trace_id, resp, time.time() - start


@pytest.fixture(scope="module")
def intl_slowdown_orders():
    with shop.flag("intlShippingSlowdown", "5sec"):
        fr = place_order_to(shop.FR_ADDRESS)
        us = place_order_to(dict(shop.US_ADDRESS, country="US"))
        united_states = place_order_to(shop.US_ADDRESS)
    return {"FR": fr, "US": us, "United States": united_states}


def test_international_order_is_delayed_with_slowdown_flag(intl_slowdown_orders):
    trace_id, resp, elapsed = intl_slowdown_orders["FR"]
    assert resp.status_code == 200, resp.text
    assert elapsed >= 5, f"FR checkout answered in {elapsed:.2f}s"
    _, span = wait_trace_span(trace_id, "shipping", "POST /ship-order")
    assert span["duration"] >= 5_000_000, f"/ship-order lasted {span['duration']}us"


@pytest.mark.parametrize("country", ["US", "United States"])
def test_domestic_order_is_not_delayed_with_slowdown_flag(intl_slowdown_orders, country):
    _, resp, elapsed = intl_slowdown_orders[country]
    assert resp.status_code == 200, resp.text
    assert elapsed < 4, f"{country} checkout took {elapsed:.2f}s"


def test_international_slowdown_is_logged(intl_slowdown_orders):
    trace_id, _, _ = intl_slowdown_orders["FR"]
    doc = logs_of_trace(trace_id, "shipping.international.slowdown")[0]
    assert doc["body"] == "Delaying international shipment due to intlShippingSlowdown feature flag"
    assert shop.attr(doc, "delay_secs") == 5


def test_international_order_logs_flag_evaluation_at_default():
    trace_id, resp, _ = place_order_to(shop.FR_ADDRESS)
    assert resp.status_code == 200, resp.text
    doc = logs_of_trace(trace_id, "shipping.feature_flag.evaluated")[0]
    assert shop.attr(doc, "feature_flag_key") == "intlShippingSlowdown"
    assert shop.attr(doc, "feature_flag_provider_name") == "flagd"
    assert shop.attr(doc, "feature_flag_variant") == "off"


# --- ad service ------------------------------------------------------------------------


def test_targeted_get_ads_span_carries_demo_ad_attributes():
    trace_id, headers = traceparent()
    ads("accessories", headers)
    trace, span = wait_trace_span(trace_id, "ad", "oteldemo.AdService/GetAds")
    tags = shop.tags_of(span)
    assert tags.get("demo.ad.context_keys") == "[accessories]"
    assert tags.get("demo.ad.context_keys.count") == 1
    assert tags.get("demo.ad.count") == 3
    assert tags.get("demo.ad.request_type") == "TARGETED"
    assert tags.get("demo.ad.response_type") == "TARGETED"
    ad_keys = [k for s in shop.spans(trace, "ad") for k in shop.tags_of(s) if k.startswith("app.ads")]
    assert ad_keys == []


def test_untargeted_get_ads_span_is_random_with_two_ads():
    trace_id, headers = traceparent()
    ads(None, headers)
    trace, span = wait_trace_span(trace_id, "ad", "oteldemo.AdService/GetAds")
    tags = shop.tags_of(span)
    assert tags.get("demo.ad.request_type") == "NOT_TARGETED"
    assert tags.get("demo.ad.response_type") == "RANDOM"
    random_spans = shop.spans(trace, "ad", "getRandomAds")
    assert random_spans, "no getRandomAds span"
    assert shop.tags_of(random_spans[0]).get("demo.ad.count") == 2


def test_ads_by_category_span_carries_demo_category():
    trace_id, headers = traceparent()
    ads("accessories", headers)
    _, span = wait_trace_span(trace_id, "ad", "getAdsByCategory")
    tags = shop.tags_of(span)
    assert tags.get("demo.ad.category") == "accessories"
    assert tags.get("demo.ad.count") == 3
    assert "app.ads.category" not in tags


def test_get_ads_span_carries_enduser_id_from_baggage():
    trace_id, headers = traceparent()
    headers["baggage"] = "session.id=s1,enduser.id=u1"
    ads("accessories", headers)
    _, span = wait_trace_span(trace_id, "ad", "oteldemo.AdService/GetAds")
    assert shop.tags_of(span).get("enduser.id") == "u1"


def test_ad_requests_counted_by_request_and_response_type():
    ads("accessories")
    shop.prom_wait(
        'demo_ad_requests_total{demo_ad_request_type="TARGETED",demo_ad_response_type="TARGETED"}'
    )
    assert shop.prom("app_ads_ad_requests_total") == []


def test_ad_service_logs_prometheus_endpoint_start():
    lines = shop.docker("logs", "ad").stdout + shop.docker("logs", "ad").stderr
    assert "Prometheus metrics endpoint started, listening on 9465/metrics" in lines


# --- counters read with the load generator paused ---------------------------------------------


def loadgen_user_count():
    stats = requests.get(shop.url("/loadgen/stats/requests"), timeout=10).json()
    return stats.get("state"), stats.get("user_count") or 0


@pytest.fixture(scope="module")
def quiet_shop():
    """Stop the load generator so ad and shipping counters move only by this test's requests."""
    state, users = loadgen_user_count()
    requests.get(shop.url("/loadgen/stop"), timeout=10)
    time.sleep(70)
    yield
    if state in ("running", "spawning") and users:
        requests.post(
            shop.url("/loadgen/swarm"),
            data={"user_count": users, "spawn_rate": users, "host": ""},
            timeout=10,
        )


def test_targeted_ad_request_grows_served_counter_by_three(quiet_shop):
    before = ad_served("accessories")
    ads("accessories")
    assert ad_served("accessories") - before == 3


def test_untargeted_ad_request_grows_random_served_counter_by_two(quiet_shop):
    before = ad_served("random")
    ads(None)
    assert ad_served("random") - before == 2


def test_shipped_items_counter_grows_by_quote_item_count(quiet_shop):
    assert shop.prom("app_shipping_items_count_total") == []
    expr = 'sum(demo_shipping_items_shipped_total{service_name="shipping"})'
    shop.prom_wait(expr)
    before = shop.prom_value(expr)
    assert shipping_quote(7).status_code == 200
    after = poll_until(
        lambda: (lambda v: v if v != before else None)(shop.prom_value(expr)),
        "demo_shipping_items_shipped_total to change",
        timeout=150,
    )
    assert after - before == 7
