// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

package productcatalog

import (
	"encoding/json"
	"fmt"
	"testing"
	"time"
)

func mixedPaths(lists, gets, recs int) []string {
	paths := append(repeat("/api/products", lists), repeat("/api/products/"+knownProductID, gets)...)
	return append(paths, repeat("/api/recommendations?productIds="+knownProductID+"&sessionId=pool-burst&currencyCode=USD", recs)...)
}

// burstWithBackendPeak fires paths concurrently while sampling product-catalog's PostgreSQL backends every 100ms.
func burstWithBackendPeak(t *testing.T, ip string, paths []string, timeout time.Duration) ([]response, int) {
	t.Helper()
	stop := make(chan struct{})
	peak := pollMax(100*time.Millisecond, stop, func() int { return psqlIntOrZero(catalogBackendsQuery(ip)) })
	rs := burst(paths, timeout)
	time.Sleep(300 * time.Millisecond)
	close(stop)
	return rs, <-peak
}

// R1a
func TestBurstDoesNotExceedPoolCap(t *testing.T) {
	ip := productCatalogIP(t)
	_, peak := burstWithBackendPeak(t, ip, mixedPaths(50, 50, 0), 30*time.Second)
	if peak > poolCap {
		t.Errorf("product-catalog opened %d PostgreSQL backends during the burst, cap is %d", peak, poolCap)
	}
	if after := catalogBackends(t, ip); after > poolCap {
		t.Errorf("product-catalog holds %d PostgreSQL backends after the burst, cap is %d", after, poolCap)
	}
}

// R1b
func TestIdleConnectionsRetainedWithoutGrowth(t *testing.T) {
	ip := productCatalogIP(t)
	burst(mixedPaths(50, 50, 0), 30*time.Second)
	first := catalogBackends(t, ip)
	if first < 1 || first > poolCap {
		t.Errorf("after first burst product-catalog holds %d backends, want 1..%d", first, poolCap)
	}
	burst(mixedPaths(50, 50, 0), 30*time.Second)
	second := catalogBackends(t, ip)
	if second < 1 || second > poolCap {
		t.Errorf("after second burst product-catalog holds %d backends, want 1..%d", second, poolCap)
	}
}

// R2e
func TestConcurrentCatalogRequestsSucceed(t *testing.T) {
	want := psqlInt(t, "SELECT count(*) FROM catalog.products")
	rs := burst(mixedPaths(50, 50, 0), 15*time.Second)
	var slowest time.Duration
	for i, r := range rs {
		if r.Elapsed > slowest {
			slowest = r.Elapsed
		}
		if r.Err != nil {
			t.Errorf("request %d failed: %v", i, r.Err)
			continue
		}
		if r.Status != 200 {
			t.Errorf("request %d status = %d, want 200", i, r.Status)
			continue
		}
		if r.Elapsed > 10*time.Second {
			t.Errorf("request %d took %s, want <= 10s", i, r.Elapsed)
		}
		if i < 50 {
			if n := len(decodeProducts(t, r)); n != want {
				t.Errorf("list request %d returned %d products, want %d", i, n, want)
			}
		} else if p := decodeProduct(t, r); p.ID != knownProductID {
			t.Errorf("get request %d returned id %q, want %q", i, p.ID, knownProductID)
		}
	}
	t.Logf("slowest of 100 concurrent catalog requests: %s", slowest)
}

// burst-pool-cap-holds
func TestLargeMixedBurstHoldsCapAndSucceeds(t *testing.T) {
	ip := productCatalogIP(t)
	rs, peak := burstWithBackendPeak(t, ip, mixedPaths(80, 80, 40), 15*time.Second)
	if peak > poolCap {
		t.Errorf("product-catalog opened %d PostgreSQL backends during the 200-request burst, cap is %d", peak, poolCap)
	}
	var slowest time.Duration
	failed := 0
	for i, r := range rs {
		if r.Elapsed > slowest {
			slowest = r.Elapsed
		}
		if r.Err != nil || r.Status != 200 || r.Elapsed > 10*time.Second {
			failed++
			if failed <= 5 {
				t.Errorf("request %d (%s): status=%d err=%v elapsed=%s, want 200 within 10s", i, mixedPaths(80, 80, 40)[i], r.Status, r.Err, r.Elapsed)
			}
		}
	}
	if failed > 0 {
		t.Errorf("%d of %d requests did not return 200 within 10s", failed, len(rs))
	}
	t.Logf("peak backends %d, slowest request %s", peak, slowest)
}

// R3a
func TestRecommendationsReturnProducts(t *testing.T) {
	r := get("/api/recommendations?productIds="+knownProductID+"&sessionId=x&currencyCode=USD", 15*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("GET /api/recommendations: status=%d err=%v, want 200", r.Status, r.Err)
	}
	ps := decodeProducts(t, r)
	if len(ps) == 0 {
		t.Fatal("recommendations returned no products")
	}
	for _, p := range ps {
		if p.ID == "" {
			t.Errorf("recommendation without id: %+v", p)
		}
	}
}

// R3b
func TestCheckoutWithFiveDistinctItems(t *testing.T) {
	list := get("/api/products", 15*time.Second)
	if list.Err != nil || list.Status != 200 {
		t.Fatalf("GET /api/products: status=%d err=%v", list.Status, list.Err)
	}
	ps := decodeProducts(t, list)
	if len(ps) < 5 {
		t.Fatalf("catalog has only %d products", len(ps))
	}
	userID := fmt.Sprintf("pool-checkout-%d", time.Now().UnixNano())
	added := map[string]bool{}
	for _, p := range ps[:5] {
		r := do("POST", "/api/cart?currencyCode=USD", map[string]any{
			"userId": userID,
			"item":   map[string]any{"productId": p.ID, "quantity": 1},
		}, 15*time.Second)
		if r.Err != nil || r.Status != 200 {
			t.Fatalf("POST /api/cart %s: status=%d err=%v", p.ID, r.Status, r.Err)
		}
		added[p.ID] = true
	}
	r := do("POST", "/api/checkout?currencyCode=USD", map[string]any{
		"userId":       userID,
		"email":        "pool-checkout@example.com",
		"userCurrency": "USD",
		"address": map[string]any{
			"streetAddress": "1600 Amphitheatre Parkway", "state": "CA", "country": "United States",
			"city": "Mountain View", "zipCode": "94043",
		},
		"creditCard": map[string]any{
			"creditCardCvv": 672, "creditCardExpirationMonth": 1, "creditCardExpirationYear": 2030,
			"creditCardNumber": "4432-8015-6152-0454",
		},
	}, 60*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("POST /api/checkout: status=%d err=%v body=%.300s", r.Status, r.Err, r.Body)
	}
	var order struct {
		OrderID string `json:"orderId"`
		Items   []struct {
			Item struct {
				ProductID string `json:"productId"`
			} `json:"item"`
		} `json:"items"`
	}
	if err := json.Unmarshal(r.Body, &order); err != nil {
		t.Fatalf("decode order: %v", err)
	}
	if order.OrderID == "" {
		t.Error("order has no orderId")
	}
	got := map[string]bool{}
	for _, it := range order.Items {
		got[it.Item.ProductID] = true
	}
	for id := range added {
		if !got[id] {
			t.Errorf("order is missing item %s", id)
		}
	}
	if len(order.Items) != 5 {
		t.Errorf("order has %d items, want 5", len(order.Items))
	}
}
