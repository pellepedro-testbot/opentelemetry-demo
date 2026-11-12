# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""frontend-proxy routes the storefront, its tools and the OpAMP server UI."""

import pytest
import requests

from conftest import FRONTEND_PROXY_URL


@pytest.mark.parametrize("path", ["/", "/feature/", "/jaeger/ui/"])
def test_proxy_routes_storefront_and_tools(path):
    resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", timeout=15, allow_redirects=False)
    assert resp.status_code in (200, 301, 302), resp.status_code
    if resp.status_code != 200:
        assert resp.headers["location"].startswith(path.rstrip("/") or "/")


def test_proxy_redirects_opamp_to_server_ui():
    redirect = requests.get(f"{FRONTEND_PROXY_URL}/opamp", timeout=15, allow_redirects=False)
    assert redirect.status_code in (301, 302)
    assert redirect.headers["location"].endswith("/opamp/")

    ui = requests.get(f"{FRONTEND_PROXY_URL}/opamp/", timeout=15)
    assert ui.status_code == 200
    assert "text/html" in ui.headers.get("content-type", "")
    assert "<title>OpAMP Server</title>" in ui.text
