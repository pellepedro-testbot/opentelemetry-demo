# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""SearchProducts on the product catalog."""

import pytest

from containers import psql
from demo_grpc import pb, stub
from storefront import SOLAR_FILTER


def search(query):
    return [p.id for p in stub("product-catalog").SearchProducts(pb.SearchProductsRequest(query=query), timeout=10).results]


def catalog():
    return list(stub("product-catalog").ListProducts(pb.Empty(), timeout=10).products)


def containing(word):
    """Ids of the products whose name or description contains the word, ignoring case."""
    return {p.id for p in catalog() if word in p.name.lower() or word in p.description.lower()}


def test_r2a_query_is_trimmed_lowercased_and_spaces_collapsed():
    messy = search("  SOLAR   Filter ")
    assert SOLAR_FILTER in messy
    assert set(messy) == set(search("solar filter"))


@pytest.mark.parametrize("word", ["telescope", "solar", "kit"])
def test_r2b_single_word_finds_name_or_description_matches(word):
    assert set(search(word)) == containing(word)


def test_single_word_matching_only_descriptions_is_found():
    word = "telescope"
    assert not any(p.name.lower().startswith(word) for p in catalog())
    expected = containing(word)
    assert expected
    assert set(search(word)) == expected


def test_r2c_search_returns_at_most_50_products():
    psql(
        "INSERT INTO catalog.products (id, name, description, picture, price_currency_code,"
        " price_units, price_nanos, categories)"
        " SELECT 'ZZCAP' || n, 'Zzcap Probe ' || n, 'zzcap probe', 'x.jpg', 'USD', 1, 0, 'test'"
        " FROM generate_series(1, 60) AS n"
    )
    try:
        assert len(search("zzcap")) == 50
        assert len(search("zzcap probe")) == 50
    finally:
        psql("DELETE FROM catalog.products WHERE id LIKE 'ZZCAP%'")


@pytest.mark.parametrize("query", ["", "   "])
def test_r2e_blank_search_returns_the_catalog(query):
    expected = {p.id for p in catalog()}
    assert len(expected) <= 50
    assert set(search(query)) == expected
