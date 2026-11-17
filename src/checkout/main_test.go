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

func newStatusServer(t *testing.T, statusByPath map[string]int) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		status, ok := statusByPath[r.URL.Path]
		if !ok {
			status = http.StatusNotFound
		}
		w.WriteHeader(status)
	}))
	t.Cleanup(srv.Close)
	return srv
}

func assertErrorNames(t *testing.T, err error, service string, status string, otherService string) {
	t.Helper()
	if err == nil {
		t.Fatalf("expected an error naming %q and status %s, got nil", service, status)
	}
	msg := err.Error()
	if !strings.Contains(msg, service) {
		t.Errorf("error %q does not name %q", msg, service)
	}
	if !strings.Contains(msg, status) {
		t.Errorf("error %q does not carry status %s", msg, status)
	}
	if strings.Contains(msg, otherService) {
		t.Errorf("error %q names %q", msg, otherService)
	}
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	srv := newStatusServer(t, map[string]int{"/get-quote": http.StatusInternalServerError})
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.quoteShipping(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "x", Quantity: 1}})
	assertErrorNames(t, err, "shipping service", "500", "email service")
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	srv := newStatusServer(t, map[string]int{"/ship-order": http.StatusServiceUnavailable})
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.shipOrder(context.Background(), &pb.Address{}, []*pb.CartItem{{ProductId: "x", Quantity: 1}})
	assertErrorNames(t, err, "shipping service", "503", "email service")
}

func TestSendOrderConfirmationErrorNamesEmailService(t *testing.T) {
	srv := newStatusServer(t, map[string]int{"/send_order_confirmation": http.StatusInternalServerError})
	cs := &checkout{emailSvcAddr: srv.URL, httpClient: srv.Client()}

	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	assertErrorNames(t, err, "email service", "500", "shipping service")
}

func TestSendOrderConfirmationGivesUpOnHangingEmailService(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(10 * time.Second):
		case <-r.Context().Done():
		}
	}))
	t.Cleanup(srv.Close)
	cs := &checkout{emailSvcAddr: srv.URL, httpClient: srv.Client()}

	start := time.Now()
	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("expected an error from a hanging email service, got nil")
	}
	if elapsed < 2500*time.Millisecond || elapsed > 4*time.Second {
		t.Errorf("sendOrderConfirmation returned after %v, want between 2.5s and 4s", elapsed)
	}
}
