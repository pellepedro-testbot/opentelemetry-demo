# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Targeted ads for the categories of a page, through GET /api/data."""

import pytest
import requests

from conftest import FRONTEND_PROXY_URL

BINOCULARS_AD = "/product/2ZYFJ3GM2N"
TELESCOPES_AD = "/product/66VCHSJNUP"
ACCESSORIES_ADS = {"/product/0PUK6V6EV0", "/product/6E92ZMYYFZ", "/product/L9ECAV7KIM"}
CATALOG_ADS = ACCESSORIES_ADS | {
    BINOCULARS_AD,
    TELESCOPES_AD,
    "/product/9SIQT8TOJO",
    "/product/1YMWWN1N4O",
}


def ads(query=""):
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/data{query}", timeout=10)
    assert resp.status_code == 200, resp.text
    return resp.json()


def redirects(query=""):
    return [ad["redirectUrl"] for ad in ads(query)]


@pytest.mark.parametrize(
    "query",
    ["?contextKeys=binoculars,telescopes", "?contextKeys=binoculars&contextKeys=telescopes"],
)
def test_several_categories_get_ads_of_every_category(query):
    assert redirects(query) == [BINOCULARS_AD, TELESCOPES_AD]


def test_repeated_category_gives_each_ad_once():
    assert redirects("?contextKeys=binoculars,binoculars,BINOCULARS") == [BINOCULARS_AD]


def test_no_ad_appears_twice_across_categories():
    urls = redirects("?contextKeys=accessories,telescopes,accessories")
    assert len(urls) == len(set(urls)), urls


def test_at_most_two_ads_from_one_category():
    urls = redirects("?contextKeys=accessories")
    assert len(urls) == 2
    assert set(urls) <= ACCESSORIES_ADS


def test_capped_category_leaves_room_for_the_next():
    urls = redirects("?contextKeys=accessories,binoculars")
    assert len(urls) == 3
    assert set(urls[:2]) <= ACCESSORIES_ADS
    assert urls[2] == BINOCULARS_AD


def test_ads_keep_the_order_of_the_categories():
    assert redirects("?contextKeys=telescopes,binoculars") == [TELESCOPES_AD, BINOCULARS_AD]
    assert redirects("?contextKeys=binoculars,telescopes") == [BINOCULARS_AD, TELESCOPES_AD]


@pytest.mark.parametrize("query", ["?contextKeys=%20Telescopes%20", "?contextKeys=TELESCOPES"])
def test_category_is_trimmed_and_case_insensitive(query):
    for _ in range(3):
        assert redirects(query) == [TELESCOPES_AD]


def test_blank_categories_are_ignored():
    assert redirects("?contextKeys=,binoculars,%20") == [BINOCULARS_AD]


def test_only_blank_categories_fall_back_to_random_ads():
    urls = redirects("?contextKeys=%20,%20")
    assert len(urls) == 2
    assert set(urls) <= CATALOG_ADS


@pytest.mark.parametrize("query", ["?contextKeys=books", ""])
def test_category_without_ads_or_no_category_gets_random_ads(query):
    urls = redirects(query)
    assert len(urls) == 2
    assert set(urls) <= CATALOG_ADS


@pytest.mark.parametrize(
    "category,expected",
    [
        ("binoculars", [("Roof Binoculars for sale. 50% off.", BINOCULARS_AD)]),
        ("telescopes", [("Starsense Explorer Refractor Telescope for sale. 20% off.", TELESCOPES_AD)]),
        ("assembly", [("Optical Tube Assembly for sale. 10% off.", "/product/9SIQT8TOJO")]),
        (
            "travel",
            [(
                "Eclipsmart Travel Refractor Telescope for sale. Buy one, get second kit for free",
                "/product/1YMWWN1N4O",
            )],
        ),
        (
            "accessories",
            [
                ("Solar System Color Imager for sale. 30% off.", "/product/0PUK6V6EV0"),
                ("Solar Filter for sale. Buy two, get third one for free", "/product/6E92ZMYYFZ"),
            ],
        ),
    ],
)
def test_every_category_serves_its_catalog_ads(category, expected):
    got = [(ad["text"], ad["redirectUrl"]) for ad in ads(f"?contextKeys={category}")]
    assert got == expected
