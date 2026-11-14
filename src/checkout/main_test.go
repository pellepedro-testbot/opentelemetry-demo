// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package main

import (
	"context"
	"fmt"
	"go/parser"
	"go/token"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"strconv"
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

func failingServer(t *testing.T, status int) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(status)
	}))
	t.Cleanup(srv.Close)
	return srv
}

func testAddress() *pb.Address {
	return &pb.Address{StreetAddress: "1600 Amphitheatre Parkway", City: "Mountain View", State: "CA", Country: "United States", ZipCode: "94043"}
}

func testItems() []*pb.CartItem {
	return []*pb.CartItem{{ProductId: "OLJCESPC7Z", Quantity: 1}}
}

func assertNamesShippingService(t *testing.T, call string, err error) {
	t.Helper()
	if err == nil {
		t.Fatalf("%s() error = nil, want an error", call)
	}
	msg := err.Error()
	if !strings.Contains(msg, "shipping service") || !strings.Contains(msg, "got 503") {
		t.Errorf("%s() error = %q, want it to name the shipping service and the 503", call, msg)
	}
	if strings.Contains(msg, "email service") {
		t.Errorf("%s() error = %q names the email service", call, msg)
	}
}

func TestQuoteShippingFailureNamesShippingService(t *testing.T) {
	srv := failingServer(t, http.StatusServiceUnavailable)
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.quoteShipping(context.Background(), testAddress(), testItems())
	assertNamesShippingService(t, "quoteShipping", err)
}

func TestShipOrderFailureNamesShippingService(t *testing.T) {
	srv := failingServer(t, http.StatusServiceUnavailable)
	cs := &checkout{shippingSvcAddr: srv.URL, httpClient: srv.Client()}

	_, err := cs.shipOrder(context.Background(), testAddress(), testItems())
	assertNamesShippingService(t, "shipOrder", err)
}

func TestSendOrderConfirmationFailureNamesEmailService(t *testing.T) {
	srv := failingServer(t, http.StatusInternalServerError)
	cs := &checkout{emailSvcAddr: srv.URL, httpClient: srv.Client()}

	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	want := "failed POST to email service: expected 200, got " + strconv.Itoa(http.StatusInternalServerError)
	if err == nil || err.Error() != want {
		t.Errorf("sendOrderConfirmation() error = %v, want %q", err, want)
	}
}

func TestSendOrderConfirmationWaitsForSlowEmailService(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(1500 * time.Millisecond)
		w.WriteHeader(http.StatusOK)
	}))
	t.Cleanup(srv.Close)
	cs := &checkout{emailSvcAddr: srv.URL, httpClient: &http.Client{}}

	if err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{}); err != nil {
		t.Errorf("sendOrderConfirmation() against a 1.5 s email service error = %v, want nil", err)
	}
}

func TestCheckoutDoesNotImportPricingRules(t *testing.T) {
	file, err := parser.ParseFile(token.NewFileSet(), "main.go", nil, parser.ImportsOnly)
	if err != nil {
		t.Fatalf("parse main.go: %v", err)
	}
	for _, imp := range file.Imports {
		if strings.HasSuffix(strings.Trim(imp.Path.Value, `"`), "/checkout/rules") {
			t.Errorf("main.go imports %s", imp.Path.Value)
		}
	}
}
