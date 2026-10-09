// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package checkout

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"testing"
	"time"

	"google.golang.org/grpc/codes"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/status"

	pb "github.com/opentelemetry/opentelemetry-demo/src/product-catalog/genproto/oteldemo"
)

const wantSeededProducts = "0PUK6V6EV0|Solar System Color Imager|175|0|USD|accessories,telescopes;" +
	"1YMWWN1N4O|Eclipsmart Travel Refractor Telescope|129|950000000|USD|telescopes,travel;" +
	"2ZYFJ3GM2N|Roof Binoculars|209|950000000|USD|binoculars;" +
	"66VCHSJNUP|Starsense Explorer Refractor Telescope|349|950000000|USD|telescopes;" +
	"6E92ZMYYFZ|Solar Filter|69|950000000|USD|accessories,telescopes;" +
	"9SIQT8TOJO|Optical Tube Assembly|3599|0|USD|accessories,telescopes,assembly;" +
	"HQTGWGPNH4|The Comet Book|0|990000000|USD|books;" +
	"L9ECAV7KIM|Lens Cleaning Kit|21|950000000|USD|accessories;" +
	"LS4PSXUNUM|Red Flashlight|57|80000000|USD|accessories,flashlights;" +
	"OLJCESPC7Z|National Park Foundation Explorascope|101|960000000|USD|telescopes"

func TestGetProductSeededFields(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	records := make([]string, 0, len(seededIDs))
	for _, id := range seededIDs {
		code, p, err := getProductHTTP(ctx, id)
		if err != nil {
			t.Fatalf("GET /api/products/%s: %v", id, err)
		}
		if code != http.StatusOK {
			t.Fatalf("GET /api/products/%s status = %d, want 200", id, code)
		}
		records = append(records, fmt.Sprintf("%s|%s|%d|%d|%s|%s", p.ID, p.Name,
			p.PriceUsd.Units, p.PriceUsd.Nanos, p.PriceUsd.CurrencyCode, joinCategories(p.Categories, ",")))
	}
	got := strings.Join(records, ";")
	if got != wantSeededProducts {
		t.Errorf("seeded products =\n%s\nwant\n%s", got, wantSeededProducts)
	}
}

func TestGetProductUnknownIDNotFound(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	p, err := catalogClient(t).GetProduct(ctx, &pb.GetProductRequest{Id: "ZZZZZZZZZZ"})
	if p != nil {
		t.Errorf("GetProduct(ZZZZZZZZZZ) returned product %q, want none", p.GetId())
	}
	if code := status.Code(err); code != codes.NotFound {
		t.Errorf("GetProduct(ZZZZZZZZZZ) code = %d (%v), want 5 (NotFound); err = %v", code, code, err)
	}
}

func TestGetProductEmptyIDNotFound(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	p, err := catalogClient(t).GetProduct(ctx, &pb.GetProductRequest{Id: ""})
	if p != nil {
		t.Errorf("GetProduct('') returned product %q, want none", p.GetId())
	}
	if code := status.Code(err); code != codes.NotFound {
		t.Errorf("GetProduct('') code = %d (%v), want 5 (NotFound); err = %v", code, code, err)
	}
}

func TestHealthCheckServing(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	resp, err := healthpb.NewHealthClient(catalogConn(t)).Check(ctx, &healthpb.HealthCheckRequest{})
	if err != nil {
		t.Fatalf("Health/Check: %v", err)
	}
	if got := resp.GetStatus().String(); got != "SERVING" {
		t.Errorf("Health/Check status = %s, want SERVING", got)
	}
}
