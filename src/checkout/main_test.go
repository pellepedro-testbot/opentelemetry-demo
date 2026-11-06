// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package main

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"

	pb "github.com/open-telemetry/opentelemetry-demo/src/checkout/genproto/oteldemo"
)

type roundTripperFunc func(*http.Request) (*http.Response, error)

func (fn roundTripperFunc) RoundTrip(req *http.Request) (*http.Response, error) {
	return fn(req)
}

func TestSendOrderConfirmationHasBoundedTimeout(t *testing.T) {
	client := &http.Client{
		Transport: roundTripperFunc(func(req *http.Request) (*http.Response, error) {
			deadline, ok := req.Context().Deadline()
			if !ok {
				return nil, fmt.Errorf("email request context has no deadline")
			}

			remaining := time.Until(deadline)
			if remaining <= 0 || remaining > 3*time.Second {
				return nil, fmt.Errorf("email request timeout = %v, want at most %v", remaining, 3*time.Second)
			}

			return &http.Response{
				StatusCode: http.StatusOK,
				Body:       io.NopCloser(strings.NewReader("")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		}),
	}
	cs := &checkout{
		emailSvcAddr: "http://email.test",
		httpClient:   client,
	}

	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	if err != nil {
		t.Fatalf("sendOrderConfirmation() error = %v", err)
	}
}

func TestSendOrderConfirmationGivesUpOnSlowEmailServer(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(5 * time.Second):
			w.WriteHeader(http.StatusOK)
		case <-r.Context().Done():
		}
	}))
	defer srv.Close()

	cs := &checkout{emailSvcAddr: srv.URL, httpClient: srv.Client()}

	start := time.Now()
	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("sendOrderConfirmation() error = nil, want an error from a server slower than the deadline")
	}
	if elapsed >= 4*time.Second {
		t.Errorf("sendOrderConfirmation() returned after %v, want under 4s", elapsed)
	}
}

func shippingServiceAnswering(t *testing.T, path string, status int) *checkout {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != path {
			t.Errorf("request path = %q, want %q", r.URL.Path, path)
		}
		w.WriteHeader(status)
	}))
	t.Cleanup(srv.Close)
	return &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}
}

func assertNamesShippingService(t *testing.T, err error, status int) {
	t.Helper()
	if err == nil {
		t.Fatalf("error = nil, want an error for status %d", status)
	}
	msg := err.Error()
	if !strings.Contains(msg, "shipping service") || strings.Contains(msg, "email service") {
		t.Errorf("error = %q, want it to name the shipping service", msg)
	}
	if !strings.Contains(msg, fmt.Sprint(status)) {
		t.Errorf("error = %q, want it to carry status %d", msg, status)
	}
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	cs := shippingServiceAnswering(t, "/get-quote", http.StatusInternalServerError)
	_, err := cs.quoteShipping(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "x", Quantity: 1}})
	assertNamesShippingService(t, err, http.StatusInternalServerError)
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	cs := shippingServiceAnswering(t, "/ship-order", http.StatusServiceUnavailable)
	_, err := cs.shipOrder(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "x", Quantity: 1}})
	assertNamesShippingService(t, err, http.StatusServiceUnavailable)
}

func TestHealthCheck(t *testing.T) {
	cs := &checkout{}
	resp, err := cs.Check(context.Background(), &healthpb.HealthCheckRequest{})
	if err != nil {
		t.Fatalf("unexpected error from Check: %v", err)
	}
	if resp.GetStatus() != healthpb.HealthCheckResponse_SERVING {
		t.Errorf("expected SERVING status, got %v", resp.GetStatus())
	}
}

func TestServerStartupAndGracefulStop(t *testing.T) {
	lis, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("failed to listen on ephemeral port: %v", err)
	}

	srv := grpc.NewServer()
	svc := &checkout{}
	pb.RegisterCheckoutServiceServer(srv, svc)

	healthcheck := health.NewServer()
	healthpb.RegisterHealthServer(srv, healthcheck)

	serverErrCh := make(chan error, 1)
	go func() {
		serverErrCh <- srv.Serve(lis)
	}()

	conn, err := grpc.NewClient(lis.Addr().String(), grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		t.Fatalf("failed to connect to test server: %v", err)
	}
	defer conn.Close()

	client := healthpb.NewHealthClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	resp, err := client.Check(ctx, &healthpb.HealthCheckRequest{})
	if err != nil {
		t.Fatalf("health check failed on test server: %v", err)
	}
	if resp.GetStatus() != healthpb.HealthCheckResponse_SERVING {
		t.Errorf("expected SERVING, got %v", resp.GetStatus())
	}

	stoppedCh := make(chan struct{})
	go func() {
		srv.GracefulStop()
		close(stoppedCh)
	}()

	select {
	case <-stoppedCh:
		// Graceful stop completed
	case <-time.After(5 * time.Second):
		t.Fatal("GracefulStop timed out")
	}

	select {
	case err := <-serverErrCh:
		if err != nil && err != grpc.ErrServerStopped {
			t.Errorf("unexpected server exit error: %v", err)
		}
	case <-time.After(2 * time.Second):
		t.Fatal("server did not exit after GracefulStop")
	}
}
