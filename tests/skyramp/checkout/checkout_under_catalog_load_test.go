// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package checkout

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"testing"
	"time"
)

func TestCheckoutUnderCatalogLoad(t *testing.T) {
	loadCtx, stopLoad := context.WithCancel(context.Background())
	var load sync.WaitGroup
	for w := 0; w < 50; w++ {
		load.Add(1)
		go func(w int) {
			defer load.Done()
			for i := 0; loadCtx.Err() == nil; i++ {
				getProductHTTP(loadCtx, seededIDs[(w+i)%len(seededIDs)])
			}
		}(w)
	}
	defer func() { stopLoad(); load.Wait() }()
	time.Sleep(time.Second)

	ctx, cancel := context.WithTimeout(context.Background(), 90*time.Second)
	defer cancel()
	userID := fmt.Sprintf("skyramp-checkout-%d", time.Now().UnixNano())

	for _, id := range []string{"L9ECAV7KIM", "66VCHSJNUP", "2ZYFJ3GM2N"} {
		code, body, err := postJSON(ctx, frontendURL()+"/api/cart?currencyCode=USD", map[string]any{
			"item":   map[string]any{"productId": id, "quantity": 1},
			"userId": userID,
		})
		if err != nil || code != http.StatusOK {
			t.Fatalf("POST /api/cart %s: status %d err %v body %s", id, code, err, body)
		}
	}

	// The body the storefront sends on Place Order (test/load/checkout.js).
	code, body, err := postJSON(ctx, frontendURL()+"/api/checkout?currencyCode=USD", map[string]any{
		"userId": userID,
		"email":  "someone@example.com",
		"address": map[string]any{
			"streetAddress": "1600 Amphitheatre Parkway", "state": "CA", "country": "United States",
			"city": "Mountain View", "zipCode": "94043",
		},
		"userCurrency": "USD",
		"creditCard": map[string]any{
			"creditCardCvv": 672, "creditCardExpirationMonth": 1, "creditCardExpirationYear": 2030,
			"creditCardNumber": "4432-8015-6152-0454",
		},
	})
	if err != nil {
		t.Fatalf("POST /api/checkout: %v", err)
	}
	if code != http.StatusOK {
		t.Fatalf("POST /api/checkout status = %d, want 200; body %s", code, body)
	}
	var order struct {
		OrderID string `json:"orderId"`
		Items   []struct {
			Item struct {
				ProductID string `json:"productId"`
			} `json:"item"`
		} `json:"items"`
	}
	if err := json.Unmarshal(body, &order); err != nil {
		t.Fatalf("decode checkout response: %v", err)
	}
	if order.OrderID == "" {
		t.Errorf("checkout response has no orderId: %s", body)
	}
	if len(order.Items) != 3 {
		t.Errorf("checkout items = %d, want 3", len(order.Items))
	}
}
