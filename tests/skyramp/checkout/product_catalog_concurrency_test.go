// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package checkout

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	pb "github.com/opentelemetry/opentelemetry-demo/src/product-catalog/genproto/oteldemo"
)

func TestGetProductConcurrentAllCorrect(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	const total, concurrency = 200, 50
	var bad atomic.Int64
	var mu sync.Mutex
	var failures []string
	jobs := make(chan int)
	var wg sync.WaitGroup
	for w := 0; w < concurrency; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for i := range jobs {
				id := seededIDs[i%len(seededIDs)]
				code, p, err := getProductHTTP(ctx, id)
				if err != nil || code != http.StatusOK || p == nil || p.ID != id {
					bad.Add(1)
					got := ""
					if p != nil {
						got = p.ID
					}
					mu.Lock()
					failures = append(failures, fmt.Sprintf("%s: status=%d id=%q err=%v", id, code, got, err))
					mu.Unlock()
				}
			}
		}()
	}
	for i := 0; i < total; i++ {
		jobs <- i
	}
	close(jobs)
	wg.Wait()

	if n := bad.Load(); n != 0 {
		t.Errorf("bad responses = %d of %d, want 0; first: %v", n, total, failures[:min(5, len(failures))])
	}
}

const wantListSerialization = "0PUK6V6EV0=accessories/telescopes,1YMWWN1N4O=telescopes/travel," +
	"2ZYFJ3GM2N=binoculars,66VCHSJNUP=telescopes,6E92ZMYYFZ=accessories/telescopes," +
	"9SIQT8TOJO=accessories/telescopes/assembly,HQTGWGPNH4=books,L9ECAV7KIM=accessories," +
	"LS4PSXUNUM=accessories/flashlights,OLJCESPC7Z=telescopes"

func TestListProductsConcurrentOrdered(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()
	client := catalogClient(t)

	const calls = 20
	results := make([]string, calls)
	var wg sync.WaitGroup
	for i := 0; i < calls; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			resp, err := client.ListProducts(ctx, &pb.Empty{})
			if err != nil {
				results[i] = "ERROR: " + err.Error()
				return
			}
			parts := make([]string, 0, len(resp.GetProducts()))
			for _, p := range resp.GetProducts() {
				parts = append(parts, p.GetId()+"="+strings.Join(p.GetCategories(), "/"))
			}
			results[i] = strings.Join(parts, ",")
		}(i)
	}
	wg.Wait()

	distinct := map[string]bool{}
	for _, r := range results {
		distinct[r] = true
	}
	got := "<MIXED>"
	if len(distinct) == 1 {
		got = results[0]
	} else {
		keys := make([]string, 0, len(distinct))
		for k := range distinct {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		t.Logf("distinct ListProducts serializations: %q", keys)
	}
	if got != wantListSerialization {
		t.Errorf("ListProducts x%d serialization = %q, want %q", calls, got, wantListSerialization)
	}
}

// startCatalogLoad keeps n workers calling ListProducts/GetProduct until the returned stop is called.
func startCatalogLoad(t *testing.T, client pb.ProductCatalogServiceClient, n int) (stop func()) {
	t.Helper()
	ctx, cancel := context.WithCancel(context.Background())
	var wg sync.WaitGroup
	for w := 0; w < n; w++ {
		wg.Add(1)
		go func(w int) {
			defer wg.Done()
			for i := 0; ctx.Err() == nil; i++ {
				if (w+i)%2 == 0 {
					client.ListProducts(ctx, &pb.Empty{})
				} else {
					client.GetProduct(ctx, &pb.GetProductRequest{Id: seededIDs[(w+i)%len(seededIDs)]})
				}
			}
		}(w)
	}
	return func() { cancel(); wg.Wait() }
}

func TestSearchProductsUnderLoad(t *testing.T) {
	client := catalogClient(t)
	stop := startCatalogLoad(t, client, 20)
	defer stop()
	time.Sleep(500 * time.Millisecond)

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	t.Run("case-insensitive name or description", func(t *testing.T) {
		resp, err := client.SearchProducts(ctx, &pb.SearchProductsRequest{Query: "SOLAR"})
		if err != nil {
			t.Fatalf("SearchProducts(SOLAR): %v", err)
		}
		ids := make([]string, 0, len(resp.GetResults()))
		for _, p := range resp.GetResults() {
			ids = append(ids, p.GetId())
		}
		if got := strings.Join(ids, ","); got != "0PUK6V6EV0,1YMWWN1N4O,6E92ZMYYFZ" {
			t.Errorf("SearchProducts(SOLAR) ids = %q, want %q", got, "0PUK6V6EV0,1YMWWN1N4O,6E92ZMYYFZ")
		}
	})

	t.Run("no match is empty", func(t *testing.T) {
		resp, err := client.SearchProducts(ctx, &pb.SearchProductsRequest{Query: "qzxnomatchqzx"})
		if err != nil {
			t.Fatalf("SearchProducts(qzxnomatchqzx): %v", err)
		}
		if n := len(resp.GetResults()); n != 0 {
			t.Errorf("SearchProducts(qzxnomatchqzx) results = %d, want 0", n)
		}
	})
}

// TestCatalogRampNoErrors runs test/load/catalog-arrival.js through k6 (5 minutes).
// K6_CMD overrides the command; by default k6 runs in the grafana/k6 image on the demo network.
func TestCatalogRampNoErrors(t *testing.T) {
	if testing.Short() {
		t.Skip("five-minute k6 ramp")
	}
	script, err := filepath.Abs(env("CATALOG_ARRIVAL_SCRIPT", "../../../test/load/catalog-arrival.js"))
	if err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(script); err != nil {
		t.Fatalf("catalog-arrival.js: %v", err)
	}
	out := t.TempDir()
	if err := os.Chmod(out, 0o777); err != nil {
		t.Fatal(err)
	}
	vars := []string{"RATES=20,50,100,200", "STAGE=60", "RAMP=15", "BASE=" + env("K6_BASE", frontendURL())}

	var cmd *exec.Cmd
	if k6 := os.Getenv("K6_CMD"); k6 != "" {
		cmd = exec.Command(k6, "run", "-q", "--summary-export", filepath.Join(out, "summary.json"), script)
		cmd.Env = append(os.Environ(), vars...)
	} else {
		args := []string{"run", "--rm", "--network", env("DOCKER_NETWORK", "opentelemetry-demo"),
			"-v", filepath.Dir(script) + ":/load:ro", "-v", out + ":/out"}
		for _, v := range vars {
			args = append(args, "-e", v)
		}
		args = append(args, env("K6_IMAGE", "grafana/k6:1.3.0"), "run", "-q",
			"--summary-export", "/out/summary.json", "/load/"+filepath.Base(script))
		cmd = exec.Command("docker", args...)
	}
	output, runErr := cmd.CombinedOutput()
	t.Logf("k6 output (tail): %s", tail(string(output), 2000))

	raw, err := os.ReadFile(filepath.Join(out, "summary.json"))
	if err != nil {
		t.Fatalf("k6 summary not written (run error %v): %v", runErr, err)
	}
	var summary struct {
		Metrics map[string]map[string]any `json:"metrics"`
	}
	if err := json.Unmarshal(raw, &summary); err != nil {
		t.Fatalf("decode k6 summary: %v", err)
	}
	m, ok := summary.Metrics["http_req_failed{ep:product}"]
	if !ok {
		t.Fatalf("summary has no http_req_failed{ep:product}")
	}
	value, ok := m["value"].(float64)
	if !ok {
		t.Fatalf("http_req_failed{ep:product} has no numeric value: %v", m)
	}
	if value != 0 {
		t.Errorf("http_req_failed{ep:product} = %v (passes=%v), want 0", value, m["passes"])
	}
}

func tail(s string, n int) string {
	if len(s) <= n {
		return s
	}
	return s[len(s)-n:]
}
