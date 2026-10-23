// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package main

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net"
	"net/http"
	"strings"
	"testing"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/status"

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
			if remaining <= 0 || remaining > time.Second {
				return nil, fmt.Errorf("email request timeout = %v, want at most %v", remaining, time.Second)
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

func validPlaceOrderRequest() *pb.PlaceOrderRequest {
	return &pb.PlaceOrderRequest{
		UserId:       "user-1",
		UserCurrency: "USD",
		Email:        "a@b.com",
		Address: &pb.Address{
			StreetAddress: "1600 Amphitheatre Parkway",
			City:          "Mountain View",
			State:         "CA",
			Country:       "United States",
			ZipCode:       "94043",
		},
		CreditCard: &pb.CreditCardInfo{
			CreditCardNumber:          "4432-8015-6152-0454",
			CreditCardCvv:             672,
			CreditCardExpirationYear:  2030,
			CreditCardExpirationMonth: 1,
		},
	}
}

// placeOrderValidationError calls PlaceOrder on a checkout without any downstream
// clients: requests that fail validation return before a client is used, and a
// request that passes validation panics on the nil cart client, which is reported
// as passing validation.
func placeOrderValidationError(t *testing.T, req *pb.PlaceOrderRequest) (err error, passedValidation bool) {
	t.Helper()
	logger = slog.New(slog.DiscardHandler)
	defer func() {
		if recover() != nil {
			passedValidation = true
		}
	}()
	_, err = (&checkout{}).PlaceOrder(context.Background(), req)
	return err, false
}

func assertInvalidArgument(t *testing.T, req *pb.PlaceOrderRequest, wantMessage string) {
	t.Helper()
	err, passed := placeOrderValidationError(t, req)
	if passed {
		t.Fatalf("PlaceOrder passed validation, want INVALID_ARGUMENT")
	}
	st, _ := status.FromError(err)
	if st.Code() != codes.InvalidArgument {
		t.Fatalf("PlaceOrder code = %v (%v), want InvalidArgument", st.Code(), err)
	}
	if wantMessage != "" && st.Message() != wantMessage {
		t.Errorf("PlaceOrder message = %q, want %q", st.Message(), wantMessage)
	}
}

func TestPlaceOrderRejectsEmptyUserID(t *testing.T) {
	req := validPlaceOrderRequest()
	req.UserId = ""
	assertInvalidArgument(t, req, "")
}

func TestPlaceOrderRejectsNonFiveDigitUSZipCode(t *testing.T) {
	for _, zip := range []string{"9404", "940431", "9404a", ""} {
		t.Run(zip, func(t *testing.T) {
			req := validPlaceOrderRequest()
			req.Address.ZipCode = zip
			assertInvalidArgument(t, req, "Invalid zip code")
		})
	}
}

func TestPlaceOrderDoesNotApplyUSZipRuleToCanada(t *testing.T) {
	req := validPlaceOrderRequest()
	req.Address.Country = "Canada"
	req.Address.ZipCode = "K1A 0B1"
	err, passed := placeOrderValidationError(t, req)
	if !passed && status.Convert(err).Message() == "Invalid zip code" {
		t.Fatalf("PlaceOrder rejected Canadian zip code: %v", err)
	}
}

func TestPlaceOrderRejectsEmailWithoutAt(t *testing.T) {
	for _, email := range []string{"ab.com", ""} {
		t.Run(email, func(t *testing.T) {
			req := validPlaceOrderRequest()
			req.Email = email
			assertInvalidArgument(t, req, "")
		})
	}
	err, passed := placeOrderValidationError(t, validPlaceOrderRequest())
	if !passed {
		t.Errorf("PlaceOrder rejected a@b.com: %v", err)
	}
}

func TestPlaceOrderRejectsUnsupportedCountry(t *testing.T) {
	for _, country := range []string{"Mexico", "usa", ""} {
		t.Run(country, func(t *testing.T) {
			req := validPlaceOrderRequest()
			req.Address.Country = country
			assertInvalidArgument(t, req, "We do not ship to "+country)
		})
	}
}

func TestPlaceOrderRejectsMissingCreditCard(t *testing.T) {
	req := validPlaceOrderRequest()
	req.CreditCard = nil
	assertInvalidArgument(t, req, "")
}

func TestPlaceOrderRejectsMalformedUserCurrency(t *testing.T) {
	for _, currency := range []string{"usd", "US", "USDD", "U1D", ""} {
		t.Run(currency, func(t *testing.T) {
			req := validPlaceOrderRequest()
			req.UserCurrency = currency
			assertInvalidArgument(t, req, "")
		})
	}
	err, passed := placeOrderValidationError(t, validPlaceOrderRequest())
	if !passed {
		t.Errorf("PlaceOrder rejected USD: %v", err)
	}
}

func TestPlaceOrderRejectsBlankStreetAddress(t *testing.T) {
	for _, street := range []string{"", "   "} {
		t.Run(street, func(t *testing.T) {
			req := validPlaceOrderRequest()
			req.Address.StreetAddress = street
			assertInvalidArgument(t, req, "Street address is required")
		})
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
