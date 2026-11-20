# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Feature flags (flagd-ui read API, flag evaluation, dashboard and scheduler
pages) and the spans and logs the load generator emits."""

import html
import json
import re
import time
import uuid

import pytest
import requests

from conftest import poll_until
from shop import (
    jaeger_traces,
    match_phrase,
    os_wait,
    product_catalog_failure,
    read_flags,
    resolve_flag,
    resource_service,
    spans,
    tags_of,
    url,
    write_flags,
    flag,
)

AGENT_PROMPTS = {
    "Show all available products in the store.",
    "What currencies are supported by the Astronomy Shop?",
    "What current promotions are available on binoculars?",
}


def page(path):
    resp = requests.get(url(path), timeout=15)
    assert resp.status_code == 200, f"GET {path} answered {resp.status_code}"
    return resp.text


def dashboard_cards(text):
    """Map flag name -> HTML of its card on the /feature/ dashboard."""
    cards = {}
    for chunk in text.split('<p class="mb-4 text-lg font-semibold">')[1:]:
        name = chunk.split("</p>", 1)[0].strip()
        cards[name] = chunk
    return cards


def scheduler_flags(text):
    """Flags offered on the scheduler page, by their variant checkbox names."""
    return set(re.findall(r'name="variants\[([^\]]+)\]\[\]"', text))


def nav_tabs(text):
    """(href, text, has LiveView link attribute) of the flagd-ui nav tabs."""
    tabs = []
    # Matches each <a ...>text</a> whose href starts with /feature, capturing the tag and its inner text.
    for m in re.finditer(r'(<a [^>]*href="(/feature[^"]*)"[^>]*>)(.*?)</a>', text, re.S):
        label = re.sub(r"<[^>]+>", "", m.group(3)).strip()
        if label in ("Basic", "Advanced", "Scheduler"):
            tabs.append((m.group(2), label, 'data-phx-link="redirect"' in m.group(1)))
    return tabs


# --- flag definitions -------------------------------------------------------------


def flag_def(name):
    flags = read_flags()["flags"]
    assert name in flags, f"{name} missing from /feature/api/read"
    return flags[name]


@pytest.mark.parametrize(
    "name",
    ["aiRunawayAgent", "emitRawPii", "aiSlowResponse", "productCatalogLockContention",
     "intlShippingSlowdown", "cartFailure"],
)
def test_new_flag_is_listed_enabled_with_default_off(name):
    spec = flag_def(name)
    assert spec["state"] == "ENABLED"
    assert spec["defaultVariant"] == "off"


def test_ai_runaway_agent_variants():
    assert flag_def("aiRunawayAgent")["variants"] == {"off": 0, "on": 20}


def test_emit_raw_pii_variants():
    assert flag_def("emitRawPii")["variants"] == {"off": False, "on": True}


def test_ai_slow_response_variants():
    assert flag_def("aiSlowResponse")["variants"] == {"off": 0, "5sec": 5000, "10sec": 10000}


def test_product_catalog_lock_contention_variants():
    assert flag_def("productCatalogLockContention")["variants"] == {"off": False, "on": True}


def test_cart_failure_has_numeric_percentage_variants():
    assert flag_def("cartFailure")["variants"] == {
        "off": 0, "10%": 0.1, "25%": 0.25, "50%": 0.5, "75%": 0.75, "90%": 0.9, "100%": 1,
    }


def test_intl_shipping_slowdown_variants():
    assert flag_def("intlShippingSlowdown")["variants"] == {"off": 0, "5sec": 5, "10sec": 10}


def test_llm_flags_are_removed():
    flags = read_flags()["flags"]
    assert "llmInaccurateResponse" not in flags
    assert "llmRateLimitError" not in flags


def test_product_catalog_failure_targets_one_product():
    assert flag_def("productCatalogFailure")["targeting"] == {
        "if": [{"==": [{"var": "product_id"}, "OLJCESPC7Z"]}, "off", "off"]
    }


# --- flag evaluation ---------------------------------------------------------------


@pytest.mark.parametrize("name", ["emitRawPii", "productCatalogLockContention"])
def test_boolean_flag_resolves_false_by_default(name):
    resp = resolve_flag("Boolean", name)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["value"] is False
    assert body["variant"] == "off"


def test_cart_failure_resolves_to_zero_by_default():
    resp = resolve_flag("Float", "cartFailure")
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["value"] == 0
    assert body["variant"] == "off"


@pytest.mark.parametrize("name", ["llmRateLimitError", "llmInaccurateResponse"])
def test_removed_llm_flag_resolves_not_found(name):
    resp = resolve_flag("Boolean", name)
    assert resp.status_code == 404, resp.text
    body = resp.json()
    assert body.get("code") == "not_found"
    assert "value" not in body


def test_product_catalog_failure_matches_target_with_off_by_default():
    resp = resolve_flag("Boolean", "productCatalogFailure", {"product_id": "OLJCESPC7Z"})
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["value"] is False
    assert body["variant"] == "off"
    assert body["reason"] == "TARGETING_MATCH"


def test_product_catalog_failure_on_resolves_true_only_for_target():
    with product_catalog_failure():
        stored = flag_def("productCatalogFailure")
        assert stored["targeting"]["if"][1] == "on"
        assert stored["defaultVariant"] == "off"

        def resolved(product_id):
            resp = resolve_flag("Boolean", "productCatalogFailure", {"product_id": product_id})
            resp.raise_for_status()
            return resp.json()["value"]

        poll_until(lambda: resolved("OLJCESPC7Z") is True,
                   "productCatalogFailure true for OLJCESPC7Z", timeout=30, interval=2)
        assert resolved("66VCHSJNUP") is False


# --- dashboard ------------------------------------------------------------------------


@pytest.mark.parametrize(
    "name", ["aiRunawayAgent", "emitRawPii", "aiSlowResponse", "productCatalogLockContention"]
)
def test_dashboard_lists_flag(name):
    cards = dashboard_cards(page("/feature/"))
    assert name in cards
    assert f'<select name="{name}"' in cards[name]


def test_dashboard_marks_only_targeted_flag():
    cards = dashboard_cards(page("/feature/"))
    marked = [n for n, c in cards.items() if "This flag has targeting rules." in c]
    assert marked == ["productCatalogFailure"]


def test_dashboard_renders_each_description_in_small_paragraph():
    text = page("/feature/")
    rendered = {
        html.unescape(p.strip())
        for p in re.findall(r'<p class="mb-4 text-sm">(.*?)</p>', text, re.S)
    }
    flags = read_flags()["flags"]
    missing = [n for n, s in flags.items() if s.get("description") and s["description"] not in rendered]
    assert not missing, f"descriptions not in <p class=\"mb-4 text-sm\">: {missing}"


@pytest.mark.parametrize("path", ["/feature/", "/feature/advanced", "/feature/scheduler"])
def test_nav_has_scheduler_as_third_tab(path):
    tabs = nav_tabs(page(path))
    labels = [label for _, label, _ in tabs]
    assert labels[:3] == ["Basic", "Advanced", "Scheduler"], tabs
    assert tabs[2][0] == "/feature/scheduler"


# --- scheduler page ---------------------------------------------------------------------


def test_scheduler_page_is_served():
    text = page("/feature/scheduler")
    assert "Scheduler" in text
    assert scheduler_flags(text), "no flag variant checkboxes on the scheduler page"


def test_scheduler_does_not_offer_emit_raw_pii():
    assert "emitRawPii" not in scheduler_flags(page("/feature/scheduler"))


@pytest.mark.parametrize(
    "name", ["aiSlowResponse", "aiRunawayAgent", "productCatalogLockContention"]
)
def test_scheduler_offers_flag(name):
    assert name in scheduler_flags(page("/feature/scheduler"))


def test_flag_without_metadata_is_schedulable():
    assert "metadata" not in flag_def("adFailure")
    assert "adFailure" in scheduler_flags(page("/feature/scheduler"))


def test_schedulable_false_metadata_removes_flag_from_scheduler():
    doc = read_flags()
    doc["flags"]["adFailure"]["metadata"] = {"schedulable": False}
    write_flags(doc)
    try:
        poll_until(lambda: "adFailure" not in scheduler_flags(page("/feature/scheduler")),
                   "adFailure gone from the scheduler page", timeout=20, interval=2)
    finally:
        doc = read_flags()
        doc["flags"]["adFailure"].pop("metadata", None)
        write_flags(doc)
    poll_until(lambda: "adFailure" in scheduler_flags(page("/feature/scheduler")),
               "adFailure back on the scheduler page", timeout=20, interval=2)


# --- load generator spans and logs ----------------------------------------------------


def loadgen_span(operation, lookback="15m", predicate=lambda trace, span: True, timeout=120):
    """A (trace, span) for a load generator span with this operation name."""

    def find():
        for trace in jaeger_traces("load-generator", operation=operation, lookback=lookback, limit=20):
            for span in spans(trace, "load-generator", operation):
                if predicate(trace, span):
                    return trace, span
        return None

    return poll_until(find, f"load-generator span {operation}", timeout=timeout)


def children(trace, span):
    return [
        s for s in trace["spans"]
        if any(r.get("refType") == "CHILD_OF" and r["spanID"] == span["spanID"]
               for r in s.get("references", []))
    ]


def test_loadgen_emits_user_ask_agent_spans():
    resp = requests.get(
        url("/jaeger/ui/api/operations"), params={"service": "load-generator"}, timeout=15
    )
    resp.raise_for_status()
    assert "user_ask_agent" in {o["name"] for o in resp.json()["data"]}
    loadgen_span("user_ask_agent")


def ask_agent_messages():
    _, span = loadgen_span("user_ask_agent")
    return json.loads(tags_of(span)["gen_ai.input.messages"])


def test_user_ask_agent_has_one_user_message():
    messages = ask_agent_messages()
    assert isinstance(messages, list)
    assert len(messages) == 1
    assert messages[0]["role"] == "user"


def test_user_ask_agent_prompt_is_one_of_the_three():
    message = ask_agent_messages()[0]
    texts = [p.get("content") for p in message.get("parts", []) if p.get("type") == "text"]
    assert len(texts) == 1
    assert texts[0] in AGENT_PROMPTS


def test_user_ask_agent_posts_to_agent_prompt():
    trace, span = loadgen_span("user_ask_agent")
    posts = [
        tags_of(c) for c in children(trace, span)
        if c["operationName"].startswith("POST")
    ]
    urls = [t.get("http.url") or t.get("url.full") for t in posts]
    assert "http://agent:8010/prompt" in urls, posts


def test_loadgen_logs_user_asking_agent():
    docs = os_wait(
        match_phrase("body", "User asking agent:"),
        lambda d: resource_service(d) == "load-generator"
        and d["body"].startswith("User asking agent: "),
        "load-generator 'User asking agent' log record",
        timeout=90,
    )
    assert docs[0]["body"][len("User asking agent: "):] in AGENT_PROMPTS


@pytest.mark.parametrize("operation", ["user_browse_product", "user_get_recommendations"])
def test_loadgen_product_spans_use_demo_product_id(operation):
    _, span = loadgen_span(operation)
    tags = tags_of(span)
    assert tags.get("demo.product.id")
    assert "product.id" not in tags


def test_loadgen_add_to_cart_span_uses_demo_attributes():
    _, span = loadgen_span("user_add_to_cart")
    tags = tags_of(span)
    assert tags.get("demo.product.id")
    assert isinstance(tags.get("demo.product.quantity"), int)
    assert "product.id" not in tags
    assert "quantity" not in tags


def test_loadgen_get_ads_span_uses_demo_ad_category():
    _, span = loadgen_span("user_get_ads")
    tags = tags_of(span)
    assert tags.get("demo.ad.category")
    assert "category" not in tags


def test_loadgen_checkout_multi_span_uses_demo_cart_items_count():
    _, span = loadgen_span("user_checkout_multi", timeout=180)
    tags = tags_of(span)
    assert tags.get("demo.cart.items.count") in (2, 3, 4)
    assert "item.count" not in tags


def test_loadgen_flood_home_span_uses_demo_request_flood_count():
    started = time.time()
    with flag("loadGeneratorFloodHomepage", "on"):
        _, span = loadgen_span(
            "user_flood_home",
            lookback="5m",
            predicate=lambda t, s: s["startTime"] / 1e6 >= started,
            timeout=180,
        )
    tags = tags_of(span)
    assert tags.get("demo.request.flood.count") == 100
    assert "flood.count" not in tags


def restart_swarm():
    state = requests.get(url("/loadgen/stats/requests"), timeout=15).json()
    users = state.get("user_count") or 5
    requests.get(url("/loadgen/stop"), timeout=15).raise_for_status()
    time.sleep(3)
    requests.post(
        url("/loadgen/swarm"), data={"user_count": users, "spawn_rate": users}, timeout=15
    ).raise_for_status()


def test_loadgen_session_starts_with_index_and_home_page_request():
    started = time.time()
    restart_swarm()

    def session_ok(trace, span):
        if span["startTime"] / 1e6 < started:
            return False
        for index in children(trace, span):
            if index["operationName"] != "user_index":
                continue
            for get in children(trace, index):
                t = tags_of(get)
                target = t.get("http.url") or t.get("url.full") or ""
                if get["operationName"].startswith("GET") and re.match(r"^https?://[^/]+/$", target):
                    return True
        return False

    loadgen_span("user_session_start", lookback="5m", predicate=session_ok, timeout=120)


def test_loadgen_sends_no_review_or_product_ai_requests():
    stats = requests.get(url("/loadgen/stats/requests"), timeout=15).json()["stats"]
    names = [s["name"] for s in stats]
    assert not [n for n in names if "/api/product-reviews" in n or "/api/product-ask-ai-assistant" in n]
    resp = requests.get(
        url("/jaeger/ui/api/operations"), params={"service": "load-generator"}, timeout=15
    )
    resp.raise_for_status()
    ops = {o["name"] for o in resp.json()["data"]}
    assert "user_get_product_reviews" not in ops
    assert "user_ask_product_ai_assistant" not in ops


def downstream_span(trace, service, name):
    found = spans(trace, service, name)
    return found[0] if found else None


def test_loadgen_ads_carry_session_id_to_ad_service():
    trace, _ = loadgen_span(
        "user_get_ads",
        predicate=lambda t, s: downstream_span(t, "ad", "oteldemo.AdService/GetAds") is not None,
    )
    tags = tags_of(downstream_span(trace, "ad", "oteldemo.AdService/GetAds"))
    session_id = tags.get("session.id")
    assert session_id
    uuid.UUID(session_id)


def checkout_single_trace():
    trace, _ = loadgen_span(
        "user_checkout_single",
        predicate=lambda t, s: downstream_span(t, "payment", "charge") is not None
        and downstream_span(t, "checkout", "oteldemo.CheckoutService/PlaceOrder") is not None,
        timeout=240,
    )
    return trace


def test_loadgen_checkout_is_marked_synthetic_in_checkout():
    trace = checkout_single_trace()
    tags = tags_of(downstream_span(trace, "checkout", "oteldemo.CheckoutService/PlaceOrder"))
    assert tags.get("user_agent.synthetic.type") == "test"


def test_loadgen_checkout_is_not_charged_in_payment():
    trace = checkout_single_trace()
    tags = tags_of(downstream_span(trace, "payment", "charge"))
    assert tags.get("demo.payment.charged") is False
    assert tags.get("user_agent.synthetic.type") == "test"
