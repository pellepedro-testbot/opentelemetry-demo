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

func TestSendOrderConfirmationAllowsSlowEmailServer(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(2 * time.Second)
		w.WriteHeader(http.StatusOK)
	}))
	defer srv.Close()

	cs := &checkout{emailSvcAddr: srv.URL, httpClient: srv.Client()}

	if err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{}); err != nil {
		t.Fatalf("sendOrderConfirmation() with a 2s email server error = %v, want nil", err)
	}
}

func TestSendOrderConfirmationErrorNamesEmailService(t *testing.T) {
	client := &http.Client{
		Transport: roundTripperFunc(func(req *http.Request) (*http.Response, error) {
			return &http.Response{
				StatusCode: http.StatusInternalServerError,
				Body:       io.NopCloser(strings.NewReader("")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		}),
	}
	cs := &checkout{emailSvcAddr: "http://email.test", httpClient: client}

	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	if err == nil {
		t.Fatal("sendOrderConfirmation() error = nil, want an error for a 500 answer")
	}
	if !strings.Contains(err.Error(), "email service") {
		t.Errorf("sendOrderConfirmation() error = %q, want it to name the email service", err)
	}
}

func newFailingShippingServer(t *testing.T) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	t.Cleanup(srv.Close)
	return srv
}

func assertNamesShippingService(t *testing.T, call string, err error) {
	t.Helper()
	if err == nil {
		t.Fatalf("%s error = nil, want an error for a 500 answer", call)
	}
	msg := err.Error()
	if !strings.Contains(msg, "shipping service") || !strings.Contains(msg, "500") {
		t.Errorf("%s error = %q, want it to name the shipping service and status 500", call, msg)
	}
	if strings.Contains(msg, "email service") {
		t.Errorf("%s error = %q, must not name the email service", call, msg)
	}
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	srv := newFailingShippingServer(t)
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.quoteShipping(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "x", Quantity: 1}})
	assertNamesShippingService(t, "quoteShipping()", err)
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	srv := newFailingShippingServer(t)
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.shipOrder(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "x", Quantity: 1}})
	assertNamesShippingService(t, "shipOrder()", err)
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
