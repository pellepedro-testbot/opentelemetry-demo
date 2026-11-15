# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Read and write the demo's feature flags through the flagd-ui API.

Standard library only, so it can also be run on its own to put the flags the
tests touch back to their resting variants:

    python3 test/telemetry/demo_flags.py http://localhost:8080
"""

import json
import os
import sys
import time
import urllib.request

ENVOY_PORT = os.environ.get("ENVOY_PORT", "8080")
FRONTEND_PROXY_HOST = os.environ.get("FRONTEND_PROXY_HOST", "frontend-proxy")
FRONTEND_PROXY_URL = os.environ.get(
    "FRONTEND_PROXY_URL", f"http://{FRONTEND_PROXY_HOST}:{ENVOY_PORT}"
)

# flagd watches the flag file and pushes changes to the services' providers;
# give that a moment before relying on the new value.
FLAG_PROPAGATION_SECONDS = 5

RESTING_DEFAULT_VARIANTS = {
    "paymentFailure": "off",
    "emitRawPii": "off",
}


def read_flags(base_url=FRONTEND_PROXY_URL):
    with urllib.request.urlopen(f"{base_url}/feature/api/read", timeout=10) as resp:
        return json.load(resp)


def write_flags(flags, base_url=FRONTEND_PROXY_URL):
    req = urllib.request.Request(
        f"{base_url}/feature/api/write",
        data=json.dumps({"data": flags}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        resp.read()
    time.sleep(FLAG_PROPAGATION_SECONDS)


def set_default_variant(flag, variant, base_url=FRONTEND_PROXY_URL):
    flags = read_flags(base_url)
    flags["flags"][flag]["defaultVariant"] = variant
    write_flags(flags, base_url)


def set_product_catalog_failure(variant, base_url=FRONTEND_PROXY_URL):
    """productCatalogFailure targets one product through a targeting rule, so it
    is switched by the rule's true branch, as the /feature UI does."""
    flags = read_flags(base_url)
    flags["flags"]["productCatalogFailure"]["targeting"]["if"][1] = variant
    write_flags(flags, base_url)


def reset(base_url=FRONTEND_PROXY_URL):
    flags = read_flags(base_url)
    for flag, variant in RESTING_DEFAULT_VARIANTS.items():
        flags["flags"][flag]["defaultVariant"] = variant
    flags["flags"]["productCatalogFailure"]["targeting"]["if"][1] = "off"
    write_flags(flags, base_url)


if __name__ == "__main__":
    reset(sys.argv[1] if len(sys.argv) > 1 else FRONTEND_PROXY_URL)
