# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Read and change feature flags through the flagd-ui API behind the frontend proxy."""

import contextlib
import time

import requests

from conftest import FRONTEND_PROXY_URL

FLAGD_READ_URL = f"{FRONTEND_PROXY_URL}/feature/api/read"
FLAGD_WRITE_URL = f"{FRONTEND_PROXY_URL}/feature/api/write"

# flagd watches its file and the services' providers poll or stream from flagd;
# give a change a moment to reach them before driving traffic.
FLAG_PROPAGATION_SECONDS = 4


def read_flags():
    resp = requests.get(FLAGD_READ_URL, timeout=10)
    resp.raise_for_status()
    return resp.json()


def write_flags(config):
    resp = requests.post(FLAGD_WRITE_URL, json={"data": config}, timeout=10)
    resp.raise_for_status()


def set_default_variant(flag, variant):
    config = read_flags()
    config["flags"][flag]["defaultVariant"] = variant
    write_flags(config)


def set_product_catalog_failure(variant):
    # productCatalogFailure targets one product through a targeting rule, so its
    # effective value is the rule's true branch rather than defaultVariant.
    config = read_flags()
    config["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(config)


@contextlib.contextmanager
def default_variant(flag, variant, resting="off", settle=FLAG_PROPAGATION_SECONDS):
    """Hold a flag at a variant for the duration of the block, then put it back."""
    set_default_variant(flag, variant)
    time.sleep(settle)
    try:
        yield
    finally:
        set_default_variant(flag, resting)
        time.sleep(settle)


@contextlib.contextmanager
def product_catalog_failure_on(settle=FLAG_PROPAGATION_SECONDS):
    set_product_catalog_failure("on")
    time.sleep(settle)
    try:
        yield
    finally:
        set_product_catalog_failure("off")
        time.sleep(settle)
