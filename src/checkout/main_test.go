// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package main

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
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

func statusTransport(status int) *http.Client {
	return &http.Client{
		Transport: roundTripperFunc(func(req *http.Request) (*http.Response, error) {
			return &http.Response{
				StatusCode: status,
				Body:       io.NopCloser(strings.NewReader("")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		}),
	}
}

func assertNamesService(t *testing.T, err error, service string, status int) {
	t.Helper()
	if err == nil {
		t.Fatalf("expected an error for a %d answer, got nil", status)
	}
	msg := err.Error()
	if !strings.Contains(msg, service) || !strings.Contains(msg, fmt.Sprint(status)) {
		t.Errorf("error = %q, want it to name %q and status %d", msg, service, status)
	}
	for _, other := range []string{"email service", "shipping service"} {
		if other != service && strings.Contains(msg, other) {
			t.Errorf("error = %q names %q, the call went to the %s", msg, other, service)
		}
	}
}

func TestQuoteShippingErrorNamesShippingService(t *testing.T) {
	cs := &checkout{shippingSvcAddr: "http://shipping.test", httpClient: statusTransport(http.StatusServiceUnavailable)}

	_, err := cs.quoteShipping(context.Background(), &pb.Address{}, nil)

	assertNamesService(t, err, "shipping service", http.StatusServiceUnavailable)
}

func TestShipOrderErrorNamesShippingService(t *testing.T) {
	cs := &checkout{shippingSvcAddr: "http://shipping.test", httpClient: statusTransport(http.StatusInternalServerError)}

	_, err := cs.shipOrder(context.Background(), &pb.Address{}, nil)

	assertNamesService(t, err, "shipping service", http.StatusInternalServerError)
}

func TestSendOrderConfirmationErrorNamesEmailService(t *testing.T) {
	cs := &checkout{emailSvcAddr: "http://email.test", httpClient: statusTransport(http.StatusInternalServerError)}

	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})

	assertNamesService(t, err, "email service", http.StatusInternalServerError)
}

func TestSendOrderConfirmationWaitsForSlowMailServer(t *testing.T) {
	client := &http.Client{
		Transport: roundTripperFunc(func(req *http.Request) (*http.Response, error) {
			select {
			case <-time.After(1500 * time.Millisecond):
			case <-req.Context().Done():
				return nil, req.Context().Err()
			}
			return &http.Response{
				StatusCode: http.StatusOK,
				Body:       io.NopCloser(strings.NewReader("")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		}),
	}
	cs := &checkout{emailSvcAddr: "http://email.test", httpClient: client}

	if err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{}); err != nil {
		t.Fatalf("sendOrderConfirmation() error = %v, want the 1.5s answer to be accepted", err)
	}
}

func TestSendOrderConfirmationGivesUpOnSilentMailServer(t *testing.T) {
	client := &http.Client{
		Transport: roundTripperFunc(func(req *http.Request) (*http.Response, error) {
			<-req.Context().Done()
			return nil, req.Context().Err()
		}),
	}
	cs := &checkout{emailSvcAddr: "http://email.test", httpClient: client}

	start := time.Now()
	err := cs.sendOrderConfirmation(context.Background(), "test@example.com", &pb.OrderResult{})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("sendOrderConfirmation() returned nil for a mail server that never answers")
	}
	if elapsed >= 4*time.Second {
		t.Errorf("sendOrderConfirmation() took %v, want it to give up within the 3s bound", elapsed)
	}
}
