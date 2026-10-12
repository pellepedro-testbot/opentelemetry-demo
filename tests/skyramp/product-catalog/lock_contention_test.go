// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

package productcatalog

import (
	"encoding/json"
	"os/exec"
	"path/filepath"
	"testing"
	"time"
)

const lockHeldQuery = "select count(*) from pg_locks l join pg_class c on c.oid = l.relation join pg_namespace n on n.oid = c.relnamespace " +
	"where n.nspname = 'catalog' and c.relname = 'products' and l.mode = 'AccessExclusiveLock' and l.granted"

func readFlags(t *testing.T) map[string]any {
	t.Helper()
	r := get("/feature/api/read", 10*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("GET /feature/api/read: status=%d err=%v", r.Status, r.Err)
	}
	var doc map[string]any
	if err := json.Unmarshal(r.Body, &doc); err != nil {
		t.Fatalf("decode flags: %v", err)
	}
	return doc
}

func writeFlags(t *testing.T, doc map[string]any) {
	t.Helper()
	r := do("POST", "/feature/api/write", map[string]any{"data": doc}, 10*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("POST /feature/api/write: status=%d err=%v", r.Status, r.Err)
	}
}

// enableLockContention turns productCatalogLockContention on and registers a cleanup that restores the original flags.
func enableLockContention(t *testing.T) {
	t.Helper()
	original := readFlags(t)
	raw, _ := json.Marshal(original)
	var modified map[string]any
	_ = json.Unmarshal(raw, &modified)
	flag, ok := modified["flags"].(map[string]any)["productCatalogLockContention"].(map[string]any)
	if !ok {
		t.Fatal("productCatalogLockContention flag not found")
	}
	flag["defaultVariant"] = "on"
	t.Cleanup(func() {
		disableLockContention(t, original)
		waitForLockReleased(t, 60*time.Second)
	})
	writeFlags(t, modified)
}

func disableLockContention(t *testing.T, original map[string]any) {
	t.Helper()
	writeFlags(t, original)
	// flagd-ui rewrites the mounted file without $schema, so restore the checked-in version.
	repoFile, _ := filepath.Abs("../../../src/flagd/demo.flagd.json")
	if out, err := exec.Command("git", "checkout", "--", repoFile).CombinedOutput(); err != nil {
		t.Logf("git checkout demo.flagd.json: %v: %s", err, out)
	}
}

func waitForLockHeld(t *testing.T, within time.Duration) {
	t.Helper()
	deadline := time.Now().Add(within)
	for time.Now().Before(deadline) {
		if psqlInt(t, lockHeldQuery) > 0 {
			return
		}
		time.Sleep(250 * time.Millisecond)
	}
	t.Fatalf("AccessExclusiveLock on catalog.products not granted within %s", within)
}

func waitForLockReleased(t *testing.T, within time.Duration) time.Time {
	t.Helper()
	deadline := time.Now().Add(within)
	for time.Now().Before(deadline) {
		if psqlInt(t, lockHeldQuery) == 0 {
			return time.Now()
		}
		time.Sleep(250 * time.Millisecond)
	}
	t.Fatalf("AccessExclusiveLock on catalog.products still held after %s", within)
	return time.Time{}
}

// R3c
func TestLockContentionRequestsCompleteAndServiceRecovers(t *testing.T) {
	original := readFlags(t)
	enableLockContention(t)
	waitForLockHeld(t, 25*time.Second)

	results := make(chan []response, 1)
	go func() { results <- burst(repeat("/api/products", 10), 60*time.Second) }()

	time.Sleep(2 * time.Second)
	disableLockContention(t, original)
	released := waitForLockReleased(t, 45*time.Second)

	rs := <-results
	for i, r := range rs {
		if r.Done.After(released.Add(10 * time.Second)) {
			t.Errorf("request %d was still pending %s after the lock was released", i, r.Done.Sub(released))
		}
		if r.Err != nil {
			t.Errorf("request %d did not complete: %v", i, r.Err)
			continue
		}
		t.Logf("request %d during lock: status=%d elapsed=%s", i, r.Status, r.Elapsed)
	}

	r := get("/api/products", 2*time.Second)
	if r.Err != nil || r.Status != 200 {
		t.Fatalf("GET /api/products after the flag was turned off: status=%d err=%v, want 200 within 2s", r.Status, r.Err)
	}
}

// lock-contention-multiple-waiters (defect F1)
func TestLockContentionReachesPostgresAsMultipleWaiters(t *testing.T) {
	enableLockContention(t)
	waitForLockHeld(t, 25*time.Second)

	done := make(chan []response, 1)
	go func() { done <- burst(repeat("/api/products", 10), 60*time.Second) }()

	time.Sleep(3 * time.Second)
	waiters := psqlInt(t, "select count(*) from pg_stat_activity where usename='astronomy_user' and wait_event_type='Lock'")
	if waiters <= 1 {
		t.Errorf("%d product-catalog backend(s) waiting on the catalog.products lock while 10 requests were in flight, want more than 1", waiters)
	}
	<-done
}
