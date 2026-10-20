# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Recommendations, including through a product-catalog outage."""

import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from docker_stack import docker, requires_docker
from grpc_client import PRODUCT_CATALOG_ADDR, RECOMMENDATION_ADDR, grpc_call

PRODUCT = "OLJCESPC7Z"


def list_recommendations():
    return grpc_call(
        RECOMMENDATION_ADDR,
        "oteldemo.RecommendationService/ListRecommendations",
        {"userId": "u", "productIds": [PRODUCT]},
    )


def test_recommendations_exclude_the_viewed_product():
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations", params={"productIds": PRODUCT}, timeout=15
    )
    assert resp.status_code == 200
    ids = [p["id"] for p in resp.json()]
    assert ids
    assert PRODUCT not in ids


@requires_docker
def test_recommendations_survive_catalog_outage():
    warm = list_recommendations()
    assert warm.ok, warm.message
    catalog = grpc_call(PRODUCT_CATALOG_ADDR, "oteldemo.ProductCatalogService/ListProducts", {})
    seen = {p["id"] for p in catalog.body["products"]}

    docker("stop", "product-catalog", timeout=60)
    try:
        during = [list_recommendations() for _ in range(2)]
    finally:
        docker("start", "product-catalog", timeout=60)
        poll_until(
            lambda: requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=5).status_code == 200,
            "product-catalog back after the outage",
            timeout=120,
            interval=2,
        )
    for result in during:
        assert result.ok, f"{result.code}: {result.message}"
        ids = result.body.get("productIds", [])
        assert ids
        assert PRODUCT not in ids
        assert set(ids) <= seen
