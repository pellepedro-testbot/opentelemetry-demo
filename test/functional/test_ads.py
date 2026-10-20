# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Ads for every category of a page, through GET /api/data."""

import requests

from storefront import FRONTEND_PROXY_URL, HTTP_TIMEOUT

BINOCULARS_AD = "/product/2ZYFJ3GM2N"
TELESCOPES_AD = "/product/66VCHSJNUP"
TRAVEL_AD = "/product/1YMWWN1N4O"
ACCESSORIES_ADS = {"/product/0PUK6V6EV0", "/product/6E92ZMYYFZ", "/product/L9ECAV7KIM"}
CATALOG_ADS = {BINOCULARS_AD, TELESCOPES_AD, TRAVEL_AD, "/product/9SIQT8TOJO"} | ACCESSORIES_ADS


def ad_urls(query):
    """The redirectUrl of every ad GET /api/data?<query> returns, in order."""
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/data?{query}", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200, resp.text[:300]
    return [ad["redirectUrl"] for ad in resp.json()]


def test_r1a_ads_come_from_every_requested_category():
    urls = ad_urls("contextKeys=binoculars,telescopes")
    assert BINOCULARS_AD in urls and TELESCOPES_AD in urls, urls


def test_r1b_each_ad_appears_once():
    urls = ad_urls("contextKeys=accessories,accessories,binoculars")
    assert len(urls) == len(set(urls)), urls


def test_r1c_a_category_gives_at_most_two_ads():
    urls = ad_urls("contextKeys=accessories")
    assert 0 < len(urls) <= 2, urls
    assert set(urls) <= ACCESSORIES_ADS, urls


def test_r1c_capped_category_does_not_crowd_out_the_next():
    urls = ad_urls("contextKeys=accessories,travel")
    assert len([u for u in urls if u in ACCESSORIES_ADS]) <= 2, urls
    assert TRAVEL_AD in urls, urls


def test_r1d_ads_keep_the_order_of_the_categories():
    telescopes_first = ad_urls("contextKeys=telescopes,binoculars")
    binoculars_first = ad_urls("contextKeys=binoculars,telescopes")
    for urls in (telescopes_first, binoculars_first):
        assert {TELESCOPES_AD, BINOCULARS_AD} <= set(urls), urls
    assert telescopes_first.index(TELESCOPES_AD) < telescopes_first.index(BINOCULARS_AD), telescopes_first
    assert binoculars_first.index(BINOCULARS_AD) < binoculars_first.index(TELESCOPES_AD), binoculars_first


def test_r1e_category_names_are_trimmed_and_case_insensitive():
    for query in ["contextKeys=%20Telescopes%20", "contextKeys=TELESCOPES"]:
        for _ in range(3):
            assert ad_urls(query) == [TELESCOPES_AD], query


def test_r1f_blank_and_repeated_categories_are_ignored():
    urls = ad_urls("contextKeys=&contextKeys=binoculars&contextKeys=BINOCULARS&contextKeys=%20")
    assert urls == [BINOCULARS_AD]


def test_r1g_category_without_ads_falls_back_to_random_ads():
    for query in ["contextKeys=books", "contextKeys=%20"]:
        urls = ad_urls(query)
        assert len(urls) == 2, (query, urls)
        assert set(urls) <= CATALOG_ADS, (query, urls)


def test_r1h_request_without_categories_gets_random_ads():
    urls = ad_urls("")
    assert len(urls) == 2, urls
    assert set(urls) <= CATALOG_ADS, urls


def test_ads_all_categories_served_in_order():
    urls = ad_urls("contextKeys=binoculars,telescopes,travel")
    assert [u for u in urls if u in (BINOCULARS_AD, TELESCOPES_AD, TRAVEL_AD)] == [
        BINOCULARS_AD, TELESCOPES_AD, TRAVEL_AD,
    ], urls
