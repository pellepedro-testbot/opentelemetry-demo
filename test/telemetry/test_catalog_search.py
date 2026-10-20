# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Product search and the product queries of the product-catalog service."""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, find_trace, otlp_attributes, poll_until
from docker_stack import psql, requires_docker
from grpc_client import PRODUCT_CATALOG_ADDR, grpc_call

pytestmark = requires_docker

SEARCH = "oteldemo.ProductCatalogService/SearchProducts"
LIST = "oteldemo.ProductCatalogService/ListProducts"
MAX_SEARCH_RESULTS = 50


def search(query):
    result = grpc_call(PRODUCT_CATALOG_ADDR, SEARCH, {"query": query})
    assert result.ok, f"{result.code}: {result.message}"
    return result.body.get("results", [])


def search_ids(query):
    return [p["id"] for p in search(query)]


def all_products():
    result = grpc_call(PRODUCT_CATALOG_ADDR, LIST, {})
    assert result.ok, f"{result.code}: {result.message}"
    return result.body["products"]


def expected_matches(word):
    word = word.lower()
    return sorted(
        p["id"]
        for p in all_products()
        if word in p["name"].lower() or word in p.get("description", "").lower()
    )


def test_search_text_is_normalised():
    ids = search_ids("  SOLAR   Filter ")
    assert ids == search_ids("solar filter")
    assert "6E92ZMYYFZ" in ids


@pytest.mark.parametrize("word", ["Telescope", "lens"])
def test_single_word_search_results_are_unchanged(word):
    assert search_ids(word) == expected_matches(word)


def test_single_word_found_only_in_descriptions_is_still_found():
    products = all_products()
    word = "velcro"
    in_descriptions = [p["id"] for p in products if word in p.get("description", "").lower()]
    in_names = [p["id"] for p in products if word in p["name"].lower()]
    assert in_descriptions and not in_names
    assert search_ids(word) == sorted(in_descriptions)


@pytest.mark.parametrize("query", ["", "   "])
def test_empty_search_returns_at_most_fifty(query):
    ids = search_ids(query)
    assert len(ids) == min(len(all_products()), MAX_SEARCH_RESULTS)


def test_search_is_capped_at_fifty_products():
    psql(
        "INSERT INTO catalog.products (id, name, description, picture, price_currency_code,"
        " price_units, price_nanos, categories)"
        " SELECT 'TESTSRCH' || lpad(g::text, 2, '0'), 'zzsearchcap ' || g, '', '', 'USD', 1, 0, 'books'"
        " FROM generate_series(1, 60) g"
    )
    try:
        assert len(search_ids("zzsearchcap")) == MAX_SEARCH_RESULTS
    finally:
        psql("DELETE FROM catalog.products WHERE id LIKE 'TESTSRCH%'")


def test_search_without_match_returns_empty_list():
    assert search_ids("qwertyzzz") == []


def test_list_and_detail_return_every_field():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=10)
    assert resp.status_code == 200
    products = resp.json()
    assert products
    for product in products:
        for field in ("id", "name", "description", "picture", "priceUsd", "categories"):
            assert field in product, (product["id"], field)
        assert {"currencyCode", "units", "nanos"} <= product["priceUsd"].keys()
        assert product["categories"]
    for product in products[:3]:
        detail = requests.get(f"{FRONTEND_PROXY_URL}/api/products/{product['id']}", timeout=10)
        assert detail.status_code == 200
        assert detail.json() == product


def _db_statements(spans):
    statements = []
    for span in spans:
        attrs = otlp_attributes(span.get("attributes"))
        text = attrs.get("db.query.text") or attrs.get("db.statement")
        if text:
            statements.append(text)
    return statements


def _search_trace(jaeger_url, query):
    return find_trace(
        jaeger_url,
        "product-catalog",
        lambda span: otlp_attributes(span.get("attributes")).get("demo.product.search.query") == query
        and _db_statements([span]) == [],
        num_traces=100,
    )


def test_single_word_search_uses_name_prefix_query(jaeger_url):
    assert search_ids("telescope") == expected_matches("telescope")
    search_ids("solar filter")
    time.sleep(10)

    single = poll_until(lambda: _search_trace(jaeger_url, "telescope"), "single-word search trace", timeout=60)
    multi = poll_until(lambda: _search_trace(jaeger_url, "solar filter"), "multi-word search trace", timeout=60)
    single_sql = [s for s in _db_statements(single) if "catalog.products" in s]
    multi_sql = [s for s in _db_statements(multi) if "catalog.products" in s]
    assert single_sql and multi_sql
    assert all("p.description" not in s for s in single_sql), single_sql
    assert single_sql != multi_sql
