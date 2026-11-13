// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	pb "github.com/open-telemetry/opentelemetry-demo/src/checkout/genproto/oteldemo"
)

func statusServer(t *testing.T, path string, status int) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != path {
			http.NotFound(w, r)
			return
		}
		w.WriteHeader(status)
	}))
	t.Cleanup(srv.Close)
	return srv
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	srv := statusServer(t, "/get-quote", http.StatusInternalServerError)
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.quoteShipping(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "A", Quantity: 1}})
	if err == nil {
		t.Fatal("quoteShipping() error = nil, want an error for HTTP 500")
	}
	want := "failed POST to shipping service: expected 200, got 500"
	if !strings.Contains(err.Error(), want) {
		t.Errorf("quoteShipping() error = %q, want it to contain %q", err.Error(), want)
	}
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	srv := statusServer(t, "/ship-order", http.StatusServiceUnavailable)
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.shipOrder(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "A", Quantity: 1}})
	if err == nil {
		t.Fatal("shipOrder() error = nil, want an error for HTTP 503")
	}
	want := "failed POST to shipping service: expected 200, got 503"
	if !strings.Contains(err.Error(), want) {
		t.Errorf("shipOrder() error = %q, want it to contain %q", err.Error(), want)
	}
}

func slowEmailServer(t *testing.T, delay time.Duration) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(delay):
			w.WriteHeader(http.StatusOK)
		case <-r.Context().Done():
		}
	}))
	t.Cleanup(srv.Close)
	return srv
}

func TestSendOrderConfirmationGivesUpOnUnresponsiveEmailService(t *testing.T) {
	srv := slowEmailServer(t, 10*time.Second)
	cs := &checkout{emailSvcAddr: srv.URL, httpClient: &http.Client{}}

	start := time.Now()
	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("sendOrderConfirmation() error = nil, want a timeout error")
	}
	if elapsed >= 4*time.Second {
		t.Errorf("sendOrderConfirmation() returned after %v, want under 4s", elapsed)
	}
}

func TestSendOrderConfirmationWaitsForSlowEmailService(t *testing.T) {
	srv := slowEmailServer(t, 2*time.Second)
	cs := &checkout{emailSvcAddr: srv.URL, httpClient: &http.Client{}}

	if err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{}); err != nil {
		t.Fatalf("sendOrderConfirmation() error = %v, want nil for a reply after 2s", err)
	}
}
