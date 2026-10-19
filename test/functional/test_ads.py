# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Targeted ads for the categories of a page, through GET /api/data on the frontend proxy."""

import pytest
import requests

from storefront_api import FRONTEND_PROXY_URL, HTTP_TIMEOUT

BINOCULARS = "/product/2ZYFJ3GM2N"
TELESCOPES = "/product/66VCHSJNUP"
ACCESSORIES = ["/product/0PUK6V6EV0", "/product/6E92ZMYYFZ", "/product/L9ECAV7KIM"]
CATALOG_ADS = {BINOCULARS, TELESCOPES, *ACCESSORIES, "/product/9SIQT8TOJO", "/product/1YMWWN1N4O"}


def ad_urls(query):
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/data{query}", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200, resp.text
    urls = [ad["redirectUrl"] for ad in resp.json()]
    assert len(urls) == len(set(urls)), f"duplicate ads in {urls}"
    return urls


def test_ads_for_two_categories_come_from_both():
    """R1a"""
    assert set(ad_urls("?contextKeys=telescopes,binoculars")) == {TELESCOPES, BINOCULARS}


def test_ads_at_most_two_from_one_category():
    """R1b"""
    assert ad_urls("?contextKeys=accessories") == ACCESSORIES[:2]


def test_ads_crowded_category_does_not_crowd_out_others():
    """R1c"""
    assert ad_urls("?contextKeys=accessories,telescopes") == [*ACCESSORIES[:2], TELESCOPES]


@pytest.mark.parametrize(
    "keys, expected",
    [
        ("binoculars,telescopes", [BINOCULARS, TELESCOPES]),
        ("telescopes,binoculars", [TELESCOPES, BINOCULARS]),
    ],
)
def test_ads_keep_requested_category_order(keys, expected):
    """R1d"""
    assert ad_urls(f"?contextKeys={keys}") == expected


def test_ads_each_ad_once_for_repeated_categories():
    """R1e"""
    assert ad_urls("?contextKeys=telescopes,Telescopes,TELESCOPES") == [TELESCOPES]


@pytest.mark.parametrize(
    "keys, expected",
    [("%20Telescopes%20", [TELESCOPES]), ("BINOCULARS", [BINOCULARS])],
)
def test_ads_category_trimmed_and_case_insensitive(keys, expected):
    """R1f"""
    assert ad_urls(f"?contextKeys={keys}") == expected


def test_ads_blank_and_repeated_categories_ignored():
    """R1g"""
    assert ad_urls("?contextKeys=,telescopes,,%20,telescopes") == [TELESCOPES]


def test_ads_blank_category_between_two_served_categories():
    """R1g"""
    assert ad_urls("?contextKeys=,telescopes,%20,binoculars") == [TELESCOPES, BINOCULARS]


@pytest.mark.parametrize("query", ["?contextKeys=books", "?contextKeys=%20", ""])
def test_ads_fall_back_to_random_ads(query):
    """R1h"""
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/data{query}", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    urls = [ad["redirectUrl"] for ad in resp.json()]
    assert len(urls) == 2
    assert set(urls) <= CATALOG_ADS


def test_ads_binoculars_then_accessories_both_served():
    """ads-two-categories-both-served"""
    assert ad_urls("?contextKeys=binoculars,accessories") == [BINOCULARS, *ACCESSORIES[:2]]
