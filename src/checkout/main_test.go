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
			if remaining <= time.Second || remaining > 3*time.Second {
				return nil, fmt.Errorf("email request timeout = %v, want more than %v and at most %v", remaining, time.Second, 3*time.Second)
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

func TestSendOrderConfirmationGivesUpOnHangingEmailService(t *testing.T) {
	release := make(chan struct{})
	emailSvc := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-release:
		case <-time.After(10 * time.Second):
		}
	}))
	defer emailSvc.Close()
	defer close(release)

	cs := &checkout{
		emailSvcAddr: emailSvc.URL,
		httpClient:   http.DefaultClient,
	}

	start := time.Now()
	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("sendOrderConfirmation() error = nil, want an error for an email service that never answers")
	}
	if elapsed > 3500*time.Millisecond {
		t.Errorf("sendOrderConfirmation() returned after %v, want at most 3.5s", elapsed)
	}
}

func shippingClientAnswering(t *testing.T, path string, status int) *http.Client {
	t.Helper()
	return &http.Client{
		Transport: roundTripperFunc(func(req *http.Request) (*http.Response, error) {
			if req.URL.Path != path {
				return nil, fmt.Errorf("unexpected request to %s, want %s", req.URL.Path, path)
			}
			return &http.Response{
				StatusCode: status,
				Body:       io.NopCloser(strings.NewReader("")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		}),
	}
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	cs := &checkout{
		shippingSvcAddr: "http://shipping.test",
		httpClient:      shippingClientAnswering(t, "/get-quote", http.StatusServiceUnavailable),
	}

	_, err := cs.quoteShipping(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "A", Quantity: 1}})
	if err == nil {
		t.Fatal("quoteShipping() error = nil, want an error for a 503 from the shipping service")
	}
	if !strings.Contains(err.Error(), "shipping service") {
		t.Errorf("quoteShipping() error = %q, want it to name the shipping service", err)
	}
	if strings.Contains(err.Error(), "email service") {
		t.Errorf("quoteShipping() error = %q, must not name the email service", err)
	}
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	cs := &checkout{
		shippingSvcAddr: "http://shipping.test",
		httpClient:      shippingClientAnswering(t, "/ship-order", http.StatusInternalServerError),
	}

	_, err := cs.shipOrder(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "A", Quantity: 1}})
	if err == nil {
		t.Fatal("shipOrder() error = nil, want an error for a 500 from the shipping service")
	}
	if !strings.Contains(err.Error(), "shipping service") {
		t.Errorf("shipOrder() error = %q, want it to name the shipping service", err)
	}
	if strings.Contains(err.Error(), "email service") {
		t.Errorf("shipOrder() error = %q, must not name the email service", err)
	}
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
