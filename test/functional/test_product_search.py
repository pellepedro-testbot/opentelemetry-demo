# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Product search through ProductCatalogService/SearchProducts, and the product listing through the storefront."""

import grpc
import pytest
import requests

from astronomy_db import psql, substring_search_ids
from demo_grpc import RPC_TIMEOUT, pb
from storefront_api import FRONTEND_PROXY_URL, HTTP_TIMEOUT

SEEDED_PRODUCTS = 10


def search_ids(product_catalog, query):
    resp = product_catalog.SearchProducts(pb.SearchProductsRequest(query=query), timeout=RPC_TIMEOUT)
    return [p.id for p in resp.results]


@pytest.fixture
def sixty_matching_products():
    psql(
        "INSERT INTO catalog.products (id,name,description,picture,price_currency_code,price_units,price_nanos,categories) "
        "SELECT 'ZZCAP'||lpad(g::text,5,'0'),'Zzcaptest item '||g,'zzcaptest item','x.jpg','USD',1,0,'test' "
        "FROM generate_series(1,60) g"
    )
    yield
    psql("DELETE FROM catalog.products WHERE id LIKE 'ZZCAP%'")


def test_search_query_is_normalized(product_catalog):
    """R2a"""
    messy = search_ids(product_catalog, "  Solar   FILTER ")
    assert "6E92ZMYYFZ" in messy
    assert messy == search_ids(product_catalog, "solar filter")


@pytest.mark.parametrize("word", ["telescope"])
def test_search_single_word_matches_name_or_description(product_catalog, word):
    """R2b, search-single-word-description-hit"""
    expected = substring_search_ids(word)
    assert {"OLJCESPC7Z", "66VCHSJNUP", "1YMWWN1N4O"} <= set(expected)
    assert search_ids(product_catalog, word) == expected


@pytest.mark.parametrize("word, product_id", [("filter", "6E92ZMYYFZ"), ("Explorer", "66VCHSJNUP")])
def test_search_single_word_mid_name(product_catalog, word, product_id):
    """R2c"""
    ids = search_ids(product_catalog, word)
    assert product_id in ids
    assert ids == substring_search_ids(word)


def test_search_single_word_name_prefix(product_catalog):
    """R2d"""
    ids = search_ids(product_catalog, "solar")
    assert {"0PUK6V6EV0", "6E92ZMYYFZ"} <= set(ids)
    assert ids == substring_search_ids("solar")


@pytest.mark.parametrize("query", ["zzcaptest", "zzcaptest item"])
def test_search_returns_at_most_50(product_catalog, sixty_matching_products, query):
    """R2e"""
    assert len(search_ids(product_catalog, query)) == 50


@pytest.mark.parametrize("query", ["", "   "])
def test_search_blank_query_returns_every_product(product_catalog, query):
    """R2f"""
    assert len(search_ids(product_catalog, query)) == SEEDED_PRODUCTS


def test_search_without_hits_returns_empty(product_catalog):
    """R2f"""
    try:
        ids = search_ids(product_catalog, "nonexistentxyz")
    except grpc.RpcError as e:
        pytest.fail(f"search failed with {e.code()}: {e.details()}")
    assert ids == []


def test_list_and_get_products_complete():
    """R2g"""
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    products = resp.json()
    assert len(products) == SEEDED_PRODUCTS
    for p in products:
        assert {"id", "name", "description", "picture", "priceUsd", "categories"} <= p.keys(), p
        assert {"currencyCode", "units", "nanos"} <= p["priceUsd"].keys(), p

    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products/66VCHSJNUP", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    product = resp.json()
    assert product["name"] == "Starsense Explorer Refractor Telescope"
    assert product["priceUsd"] == {"currencyCode": "USD", "units": 349, "nanos": 950000000}
    assert product["categories"] == ["telescopes"]
