// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package checkout

import (
	"context"
	"database/sql"
	"encoding/json"
	"math/rand"
	"net/http"
	"net/url"
	"strconv"
	"sync"
	"testing"
	"time"

	pb "github.com/opentelemetry/opentelemetry-demo/src/product-catalog/genproto/oteldemo"
)

func TestPoolMaxOpenUnderBurst(t *testing.T) {
	db := openDB(t)
	clientAddr := catalogClientAddr(t)
	client := catalogClient(t)
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	for _, id := range seededIDs[:3] {
		if _, _, err := getProductHTTP(ctx, id); err != nil {
			t.Fatalf("warm-up GET %s: %v", id, err)
		}
	}

	samplerCtx, stopSampler := context.WithCancel(ctx)
	samples := make(chan int, 4096)
	samplerDone := make(chan struct{})
	go func() {
		defer close(samplerDone)
		ticker := time.NewTicker(50 * time.Millisecond)
		defer ticker.Stop()
		for {
			if n, err := countCatalogBackends(samplerCtx, db, clientAddr); err == nil {
				samples <- n
			}
			select {
			case <-samplerCtx.Done():
				return
			case <-ticker.C:
			}
		}
	}()

	rng := rand.New(rand.NewSource(42))
	const workers, perWorker = 60, 5
	var wg sync.WaitGroup
	for w := 0; w < workers; w++ {
		picks := make([]string, perWorker)
		for i := range picks {
			picks[i] = seededIDs[rng.Intn(len(seededIDs))]
		}
		wg.Add(1)
		go func(w int, picks []string) {
			defer wg.Done()
			for i, id := range picks {
				switch (w + i) % 4 {
				case 0:
					client.ListProducts(ctx, &pb.Empty{})
				case 1:
					client.SearchProducts(ctx, &pb.SearchProductsRequest{Query: "telescope"})
				default:
					getProductHTTP(ctx, id)
				}
			}
		}(w, picks)
	}
	wg.Wait()
	stopSampler()
	<-samplerDone
	close(samples)

	peak, count := 0, 0
	for n := range samples {
		count++
		peak = max(peak, n)
	}
	if count == 0 {
		t.Fatalf("no pg_stat_activity samples for client %s", clientAddr)
	}
	t.Logf("%d samples, peak product-catalog backends = %d", count, peak)
	if peak != 2 {
		t.Errorf("peak product-catalog backends during burst = %d, want 2", peak)
	}
}

func TestPoolIdleConnsReusedSequential(t *testing.T) {
	db := openDB(t)
	clientAddr := catalogClientAddr(t)
	client := catalogClient(t)
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	// Warm the pool to both connections before the measured window.
	for attempt := 0; attempt < 50; attempt++ {
		var wg sync.WaitGroup
		for i := 0; i < 2; i++ {
			wg.Add(1)
			go func(i int) {
				defer wg.Done()
				client.GetProduct(ctx, &pb.GetProductRequest{Id: seededIDs[i]})
			}(i)
		}
		wg.Wait()
		if n, err := countCatalogBackends(ctx, db, clientAddr); err == nil && n >= 2 {
			break
		}
	}

	var runStart time.Time
	if err := db.QueryRowContext(ctx, "SELECT now()").Scan(&runStart); err != nil {
		t.Fatalf("read db clock: %v", err)
	}
	warmPids, err := catalogBackendPids(ctx, db, clientAddr)
	if err != nil {
		t.Fatalf("list warm backends: %v", err)
	}
	if len(warmPids) != 2 {
		t.Fatalf("product-catalog backends kept idle after warm-up = %d (pids %v), want 2", len(warmPids), warmPids)
	}

	// A backend opened for one request and closed right after it is gone by the end
	// of the run, so the sampler polls continuously and remembers every new pid it saw.
	conn, err := db.Conn(ctx)
	if err != nil {
		t.Fatalf("sampler connection: %v", err)
	}
	defer conn.Close()
	newPids := map[int]time.Time{}
	sample := func(ctx context.Context) error {
		rows, err := conn.QueryContext(ctx, `SELECT pid, backend_start FROM pg_stat_activity
			WHERE datname = 'astronomy_db' AND usename = 'astronomy_user' AND host(client_addr) = $1
			  AND backend_start > $2`, clientAddr, runStart)
		if err != nil {
			return err
		}
		defer rows.Close()
		for rows.Next() {
			var pid int
			var started time.Time
			if err := rows.Scan(&pid, &started); err != nil {
				return err
			}
			newPids[pid] = started
		}
		return rows.Err()
	}
	samplerCtx, stopSampler := context.WithCancel(ctx)
	samplerDone := make(chan error, 1)
	samples := 0
	go func() {
		for samplerCtx.Err() == nil {
			if err := sample(ctx); err != nil {
				samplerDone <- err
				return
			}
			samples++
			time.Sleep(time.Millisecond)
		}
		samplerDone <- nil
	}()

	for i := 0; i < 30; i++ {
		id := seededIDs[i%len(seededIDs)]
		code, _, err := getProductHTTP(ctx, id)
		if err != nil || code != http.StatusOK {
			stopSampler()
			<-samplerDone
			t.Fatalf("GET /api/products/%s: status %d err %v", id, code, err)
		}
		time.Sleep(200 * time.Millisecond)
	}
	stopSampler()
	if err := <-samplerDone; err != nil {
		t.Fatalf("sample pg_stat_activity: %v", err)
	}
	if err := sample(ctx); err != nil {
		t.Fatalf("final pg_stat_activity sample: %v", err)
	}
	t.Logf("%d pg_stat_activity samples during the run, new product-catalog backends: %v", samples, newPids)

	if opened := len(newPids); opened != 0 {
		t.Errorf("product-catalog backends opened during 30 sequential requests = %d (pids %v), want 0", opened, newPids)
	}
	alive, err := catalogBackendPids(ctx, db, clientAddr)
	if err != nil {
		t.Fatalf("list backends after the run: %v", err)
	}
	for pid := range warmPids {
		if !alive[pid] {
			t.Errorf("warm product-catalog backend pid %d was closed during the run; alive now: %v", pid, alive)
		}
	}
}

func catalogBackendPids(ctx context.Context, db *sql.DB, clientAddr string) (map[int]bool, error) {
	rows, err := db.QueryContext(ctx, `SELECT pid FROM pg_stat_activity
		WHERE datname = 'astronomy_db' AND usename = 'astronomy_user' AND host(client_addr) = $1`, clientAddr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	pids := map[int]bool{}
	for rows.Next() {
		var pid int
		if err := rows.Scan(&pid); err != nil {
			return nil, err
		}
		pids[pid] = true
	}
	return pids, rows.Err()
}

func TestPoolDBStatsMaxOpenIs2(t *testing.T) {
	q := url.Values{"query": {`db_sql_connection_max_open{service_name="product-catalog"}`}}
	resp, err := httpClient.Get(prometheusURL() + "/api/v1/query?" + q.Encode())
	if err != nil {
		t.Fatalf("query prometheus: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("prometheus status = %d", resp.StatusCode)
	}
	var body struct {
		Status string `json:"status"`
		Data   struct {
			Result []struct {
				Metric map[string]string `json:"metric"`
				Value  [2]any            `json:"value"`
			} `json:"result"`
		} `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("decode prometheus: %v", err)
	}
	if len(body.Data.Result) == 0 {
		t.Fatalf("no db_sql_connection_max_open series for product-catalog")
	}
	for _, r := range body.Data.Result {
		s, _ := r.Value[1].(string)
		v, err := strconv.ParseFloat(s, 64)
		if err != nil {
			t.Fatalf("series %v value %v: %v", r.Metric, r.Value, err)
		}
		if v != 2 {
			t.Errorf("db_sql_connection_max_open{service_name=\"product-catalog\", instance=%q} = %v, want 2", r.Metric["instance"], v)
		}
	}
}

const catalogLockHeldSQL = `SELECT count(*) FROM pg_locks l JOIN pg_stat_activity a ON a.pid = l.pid
	WHERE l.relation = 'catalog.products'::regclass AND l.mode = 'AccessExclusiveLock' AND l.granted
	  AND host(a.client_addr) = $1`

func catalogLockHeld(ctx context.Context, db *sql.DB, clientAddr string) (bool, error) {
	var n int
	err := db.QueryRowContext(ctx, catalogLockHeldSQL, clientAddr).Scan(&n)
	return n > 0, err
}

func TestPoolLockContentionRecovery(t *testing.T) {
	db := openDB(t)
	clientAddr := catalogClientAddr(t)
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Minute)
	defer cancel()

	restore := setFlagDefaultVariant(t, "productCatalogLockContention", "on")
	defer restore()

	// product-catalog checks the flag every 10s and then holds the lock for 30s.
	deadline := time.Now().Add(40 * time.Second)
	for {
		held, err := catalogLockHeld(ctx, db, clientAddr)
		if err != nil {
			t.Fatalf("query pg_locks: %v", err)
		}
		if held {
			break
		}
		if time.Now().After(deadline) {
			t.Fatalf("product-catalog never took the ACCESS EXCLUSIVE lock on catalog.products")
		}
		time.Sleep(100 * time.Millisecond)
	}
	restore()

	backlogCtx, stopBacklog := context.WithCancel(ctx)
	defer stopBacklog()
	var backlog sync.WaitGroup
	for i := 0; i < 30; i++ {
		backlog.Add(1)
		go func(i int) {
			defer backlog.Done()
			getProductHTTP(backlogCtx, seededIDs[i%len(seededIDs)])
		}(i)
	}

	for {
		held, err := catalogLockHeld(ctx, db, clientAddr)
		if err != nil {
			t.Fatalf("query pg_locks: %v", err)
		}
		if !held {
			break
		}
		time.Sleep(50 * time.Millisecond)
	}
	released := time.Now()

	var recoveredMs int64 = -1
	for time.Since(released) < 30*time.Second {
		reqCtx, reqCancel := context.WithTimeout(ctx, 30*time.Second)
		code, p, err := getProductHTTP(reqCtx, "1YMWWN1N4O")
		reqCancel()
		if err == nil && code == http.StatusOK && p != nil && p.ID == "1YMWWN1N4O" {
			recoveredMs = time.Since(released).Milliseconds()
			break
		}
		time.Sleep(50 * time.Millisecond)
	}
	stopBacklog()
	backlog.Wait()

	if recoveredMs < 0 {
		t.Fatalf("GET /api/products/1YMWWN1N4O did not return 200 within 30s of the lock release")
	}
	t.Logf("recovered %dms after lock release", recoveredMs)
	if recoveredMs >= 5000 {
		t.Errorf("ms from lock release until GET /api/products/1YMWWN1N4O returned 200 = %d, want < 5000", recoveredMs)
	}
}
