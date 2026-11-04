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

func newUnavailableShippingCheckout(t *testing.T) *checkout {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusServiceUnavailable)
	}))
	t.Cleanup(srv.Close)
	return &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}
}

func assertNamesShippingService(t *testing.T, err error) {
	t.Helper()
	if err == nil {
		t.Fatal("expected an error from a shipping service answering 503, got nil")
	}
	want := "failed POST to shipping service: expected 200, got 503"
	if !strings.Contains(err.Error(), want) {
		t.Errorf("error = %q, want it to contain %q", err.Error(), want)
	}
	if strings.Contains(err.Error(), "email service") {
		t.Errorf("error = %q names the email service for a shipping call", err.Error())
	}
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	cs := newUnavailableShippingCheckout(t)
	_, err := cs.quoteShipping(context.Background(),
		&pb.Address{StreetAddress: "1600 Amphitheatre Parkway", City: "Mountain View", State: "CA", Country: "USA", ZipCode: "94043"},
		[]*pb.CartItem{{ProductId: "66VCHSJNUP", Quantity: 1}})
	assertNamesShippingService(t, err)
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	cs := newUnavailableShippingCheckout(t)
	_, err := cs.shipOrder(context.Background(),
		&pb.Address{StreetAddress: "1600 Amphitheatre Parkway", City: "Mountain View", State: "CA", Country: "USA", ZipCode: "94043"},
		[]*pb.CartItem{{ProductId: "66VCHSJNUP", Quantity: 1}})
	assertNamesShippingService(t, err)
}

func TestSendOrderConfirmationGivesUpOnHangingEmailService(t *testing.T) {
	release := make(chan struct{})
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(5 * time.Second):
		case <-release:
		}
		w.WriteHeader(http.StatusOK)
	}))
	defer srv.Close()
	defer close(release)

	cs := &checkout{emailSvcAddr: srv.URL, httpClient: srv.Client()}

	start := time.Now()
	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("sendOrderConfirmation() returned nil for an email service that never answered")
	}
	if elapsed > 1500*time.Millisecond {
		t.Errorf("sendOrderConfirmation() took %v against a hanging email service, want at most ~1s", elapsed)
	}
}
