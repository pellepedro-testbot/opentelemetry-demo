// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

package productcatalog

import (
	"encoding/json"
	"os/exec"
	"sort"
	"strings"
	"testing"
	"time"
)

// R2a
func TestListProductsReturnsFullCatalog(t *testing.T) {
	r := get("/api/products?currencyCode=USD", 10*time.Second)
	if r.Err != nil {
		t.Fatalf("GET /api/products: %v", r.Err)
	}
	if r.Status != 200 {
		t.Fatalf("GET /api/products status = %d, want 200", r.Status)
	}
	ps := decodeProducts(t, r)
	want := psqlInt(t, "SELECT count(*) FROM catalog.products")
	if len(ps) != want {
		t.Errorf("GET /api/products returned %d products, catalog.products has %d", len(ps), want)
	}
	for _, p := range ps {
		if p.ID == "" || p.Name == "" || p.PriceUsd == nil {
			t.Errorf("product missing id/name/priceUsd: %+v", p)
		}
	}
}

// R2b
func TestGetKnownProduct(t *testing.T) {
	r := get("/api/products/"+knownProductID+"?currencyCode=USD", 10*time.Second)
	if r.Err != nil {
		t.Fatalf("GET /api/products/%s: %v", knownProductID, r.Err)
	}
	if r.Status != 200 {
		t.Fatalf("status = %d, want 200", r.Status)
	}
	p := decodeProduct(t, r)
	if p.ID != knownProductID {
		t.Errorf("id = %q, want %q", p.ID, knownProductID)
	}
	if p.Name == "" {
		t.Error("name is empty")
	}
	if p.PriceUsd == nil || p.PriceUsd.CurrencyCode != "USD" {
		t.Errorf("priceUsd.currencyCode = %+v, want USD", p.PriceUsd)
	}
}

// R2c
func TestUnknownProductIsErrorAndReleasesPoolSlot(t *testing.T) {
	first := get("/api/products/DOESNOTEXIST", 5*time.Second)
	if first.Err != nil {
		t.Fatalf("GET /api/products/DOESNOTEXIST did not answer within 5s: %v", first.Err)
	}
	if first.Status >= 200 && first.Status < 300 {
		t.Fatalf("GET /api/products/DOESNOTEXIST status = %d, want non-2xx", first.Status)
	}
	for i := 0; i < 10; i++ {
		r := get("/api/products/DOESNOTEXIST", 5*time.Second)
		if r.Err != nil {
			t.Fatalf("sequential unknown request %d did not answer within 5s: %v", i, r.Err)
		}
		if r.Status >= 200 && r.Status < 300 {
			t.Fatalf("sequential unknown request %d status = %d, want non-2xx", i, r.Status)
		}
	}
	r := get("/api/products/"+knownProductID, 5*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("known product after unknown lookups: status=%d err=%v, want 200", r.Status, r.Err)
	}
}

// unknown-product-does-not-leak-conn
func TestConcurrentUnknownProductsDoNotLeakConnections(t *testing.T) {
	rs := burst(repeat("/api/products/DOESNOTEXIST", 20), 5*time.Second)
	for i, r := range rs {
		if r.Err != nil {
			t.Errorf("unknown request %d did not answer within 5s: %v", i, r.Err)
			continue
		}
		if r.Status >= 200 && r.Status < 300 {
			t.Errorf("unknown request %d status = %d, want non-2xx", i, r.Status)
		}
	}
	r := get("/api/products/"+knownProductID, 5*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("known product after 20 concurrent unknown lookups: status=%d err=%v, want 200 within 5s", r.Status, r.Err)
	}
}

// grpcurl renders int64 price units as strings, so only the fields the search case checks are decoded.
type searchResult struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type searchResponse struct {
	Results []searchResult `json:"results"`
}

func searchProducts(t *testing.T, query string) []searchResult {
	t.Helper()
	payload, _ := json.Marshal(map[string]string{"query": query})
	cmd := exec.Command("docker", "run", "--rm", "--network", "opentelemetry-demo", "fullstorydev/grpcurl",
		"-plaintext", "-max-time", "10", "-d", string(payload), "product-catalog:3550", "oteldemo.ProductCatalogService/SearchProducts")
	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("SearchProducts %q: %v: %s", query, err, out)
	}
	var sr searchResponse
	if err := json.Unmarshal(out, &sr); err != nil {
		t.Fatalf("decode SearchProducts %q: %v: %s", query, err, out)
	}
	return sr.Results
}

func ids(ps []searchResult) []string {
	out := make([]string, 0, len(ps))
	for _, p := range ps {
		out = append(out, p.ID)
	}
	sort.Strings(out)
	return out
}

// R2d
func TestSearchProductsGRPC(t *testing.T) {
	lower := searchProducts(t, "telescope")
	if len(lower) == 0 {
		t.Fatal("SearchProducts telescope returned no results")
	}
	for _, p := range lower {
		text := strings.ToLower(p.Name + " " + p.Description)
		if !strings.Contains(text, "telescope") {
			t.Errorf("result %s does not mention telescope", p.ID)
		}
	}
	upper := searchProducts(t, "TELESCOPE")
	if strings.Join(ids(upper), ",") != strings.Join(ids(lower), ",") {
		t.Errorf("TELESCOPE ids %v differ from telescope ids %v", ids(upper), ids(lower))
	}
	if none := searchProducts(t, "zzzznomatch"); len(none) != 0 {
		t.Errorf("zzzznomatch returned %d results, want 0", len(none))
	}
}
