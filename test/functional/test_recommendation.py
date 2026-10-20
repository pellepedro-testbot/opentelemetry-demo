# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Recommendations through short product catalog outages."""

import grpc
import pytest
import requests

from backends import poll_until
from containers import psql, start, stop
from demo_grpc import pb, stub
from storefront import COMET_BOOK, EXPLORASCOPE, FRONTEND_PROXY_URL, HTTP_TIMEOUT


# The first call after the catalog goes away waits out gRPC's ~20s connect timeout.
OUTAGE_DEADLINE = 45


def recommend(product_id=EXPLORASCOPE, timeout=10):
    request = pb.ListRecommendationsRequest(user_id="functional-test", product_ids=[product_id])
    return list(stub("recommendation").ListRecommendations(request, timeout=timeout).product_ids)


def catalog_ids():
    return {p.id for p in stub("product-catalog").ListProducts(pb.Empty(), timeout=10).products}


def recommendation_answers():
    try:
        return recommend() is not None
    except grpc.RpcError:
        return False


def test_r14a_recommendations_while_the_catalog_is_up():
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations", params={"productIds": EXPLORASCOPE}, timeout=HTTP_TIMEOUT,
    )
    assert resp.status_code == 200, resp.text[:300]
    ids = [p["id"] for p in resp.json()]
    assert 0 < len(ids) <= 4
    assert EXPLORASCOPE not in ids


@pytest.mark.timeout(240)
def test_r14b_recommendations_survive_a_catalog_outage():
    known = catalog_ids()
    assert recommend()
    stop("product-catalog")
    try:
        during_outage = recommend(timeout=OUTAGE_DEADLINE)
        assert during_outage
        assert set(during_outage) <= known
    finally:
        start("product-catalog")


@pytest.mark.timeout(300)
def test_r14c_fresh_process_fails_while_the_catalog_is_down():
    stop("product-catalog")
    try:
        stop("recommendation")
        start("recommendation")
        with pytest.raises(grpc.RpcError) as failed:
            recommend(timeout=OUTAGE_DEADLINE)
        assert failed.value.code() != grpc.StatusCode.DEADLINE_EXCEEDED
    finally:
        start("product-catalog")
        poll_until(recommendation_answers, "recommendations after the catalog is back", timeout=60, interval=3)


def test_recommendation_drops_removed_product():
    """Covers R14d and recommendation-drops-removed-product."""
    for _ in range(5):
        recommend()
    saved = psql(f"SELECT * FROM catalog.products WHERE id = '{COMET_BOOK}'")
    assert saved
    psql(f"DELETE FROM catalog.products WHERE id = '{COMET_BOOK}'")
    try:
        assert COMET_BOOK not in catalog_ids()
        seen = set()
        for _ in range(50):
            seen.update(recommend())
        assert COMET_BOOK not in seen
    finally:
        psql(
            "INSERT INTO catalog.products (id, name, description, picture, price_currency_code,"
            " price_units, price_nanos, categories) VALUES ("
            + ", ".join("'" + value.replace("'", "''") + "'" for value in saved[0])
            + ")"
        )
