// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

package productcatalog

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync"
	"testing"
	"time"
)

const (
	knownProductID = "OLJCESPC7Z"
	poolCap        = 2
)

func baseURL() string {
	if u := os.Getenv("SUT_BASE_URL"); u != "" {
		return strings.TrimRight(u, "/")
	}
	return "http://localhost:8080"
}

type money struct {
	CurrencyCode string `json:"currencyCode"`
	Units        int64  `json:"units"`
	Nanos        int64  `json:"nanos"`
}

type product struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	PriceUsd    *money   `json:"priceUsd"`
	Categories  []string `json:"categories"`
}

type response struct {
	Status  int
	Body    []byte
	Elapsed time.Duration
	Done    time.Time
	Err     error
}

func do(method, path string, body any, timeout time.Duration) response {
	var reader io.Reader
	if body != nil {
		b, _ := json.Marshal(body)
		reader = bytes.NewReader(b)
	}
	req, err := http.NewRequest(method, baseURL()+path, reader)
	if err != nil {
		return response{Err: err}
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	client := &http.Client{Timeout: timeout}
	start := time.Now()
	resp, err := client.Do(req)
	if err != nil {
		return response{Err: err, Elapsed: time.Since(start), Done: time.Now()}
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	return response{Status: resp.StatusCode, Body: b, Elapsed: time.Since(start), Done: time.Now(), Err: err}
}

func get(path string, timeout time.Duration) response {
	return do(http.MethodGet, path, nil, timeout)
}

func burst(paths []string, timeout time.Duration) []response {
	out := make([]response, len(paths))
	var wg sync.WaitGroup
	for i, p := range paths {
		wg.Add(1)
		go func(i int, p string) {
			defer wg.Done()
			out[i] = get(p, timeout)
		}(i, p)
	}
	wg.Wait()
	return out
}

func repeat(path string, n int) []string {
	out := make([]string, n)
	for i := range out {
		out[i] = path
	}
	return out
}

func psql(t *testing.T, query string) string {
	t.Helper()
	out, err := exec.Command("docker", "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", query).CombinedOutput()
	if err != nil {
		t.Fatalf("psql %q: %v: %s", query, err, out)
	}
	return strings.TrimSpace(string(out))
}

func psqlInt(t *testing.T, query string) int {
	t.Helper()
	s := psql(t, query)
	n, err := strconv.Atoi(s)
	if err != nil {
		t.Fatalf("psql %q returned non-integer %q", query, s)
	}
	return n
}

// psqlIntOrZero is psqlInt for background goroutines, which must not call t.Fatal.
func psqlIntOrZero(query string) int {
	out, err := exec.Command("docker", "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", query).Output()
	if err != nil {
		return 0
	}
	n, _ := strconv.Atoi(strings.TrimSpace(string(out)))
	return n
}

func productCatalogIP(t *testing.T) string {
	t.Helper()
	out, err := exec.Command("docker", "inspect", "-f", "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}", "product-catalog").Output()
	if err != nil {
		t.Fatalf("docker inspect product-catalog: %v", err)
	}
	ip := strings.TrimSpace(string(out))
	if ip == "" {
		t.Fatal("product-catalog container has no IP")
	}
	return ip
}

func catalogBackendsQuery(ip string) string {
	return fmt.Sprintf("select count(*) from pg_stat_activity where usename='astronomy_user' and client_addr='%s'", ip)
}

func catalogBackends(t *testing.T, ip string) int {
	t.Helper()
	return psqlInt(t, catalogBackendsQuery(ip))
}

// pollMax samples f every interval until stop is closed and returns the largest value seen.
func pollMax(interval time.Duration, stop <-chan struct{}, f func() int) <-chan int {
	result := make(chan int, 1)
	go func() {
		maxSeen := 0
		for {
			if v := f(); v > maxSeen {
				maxSeen = v
			}
			select {
			case <-stop:
				result <- maxSeen
				return
			case <-time.After(interval):
			}
		}
	}()
	return result
}

func decodeProducts(t *testing.T, r response) []product {
	t.Helper()
	var ps []product
	if err := json.Unmarshal(r.Body, &ps); err != nil {
		t.Fatalf("decode products: %v: %.200s", err, r.Body)
	}
	return ps
}

func decodeProduct(t *testing.T, r response) product {
	t.Helper()
	var p product
	if err := json.Unmarshal(r.Body, &p); err != nil {
		t.Fatalf("decode product: %v: %.200s", err, r.Body)
	}
	return p
}
