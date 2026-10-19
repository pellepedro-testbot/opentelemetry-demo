# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import os

import pytest

from demo_grpc import stub

PRODUCT_CATALOG_ADDR = os.environ.get("PRODUCT_CATALOG_ADDR", "localhost:3550")
PAYMENT_ADDR = os.environ.get("PAYMENT_ADDR", "localhost:50051")
CURRENCY_ADDR = os.environ.get("CURRENCY_ADDR", "localhost:7001")


@pytest.fixture(scope="session")
def product_catalog():
    return stub("ProductCatalogService", PRODUCT_CATALOG_ADDR)


@pytest.fixture(scope="session")
def payment():
    return stub("PaymentService", PAYMENT_ADDR)


@pytest.fixture(scope="session")
def currency():
    return stub("CurrencyService", CURRENCY_ADDR)
