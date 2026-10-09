"""Print the k6 results of a stack-smoke run and apply its pass rules.

Usage: python3 report.py checkout <k6-summary.json> <orders written>
       python3 report.py catalog <k6-summary.json> <prometheus base url> <start> <end>

checkout: fails if cart adds failed or PostgreSQL holds fewer orders than k6 placed.
catalog: prints p95/p99 and product-catalog pool waits per stage (env RATES, STAGE,
RAMP as in the run). It fails only on request errors: latency and pool waits are
compared across builds (base, PR, fix), not judged in one run.
"""
import json
import os
import sys
import urllib.parse
import urllib.request


def checkout(summary, written):
    m = json.load(open(summary))["metrics"]
    placed = m["checkout_succeeded"]["passes"]
    attempts = placed + m["checkout_succeeded"]["fails"]
    d = m["http_req_duration{ep:checkout}"]
    cart_failed = m["http_req_failed{ep:cart}"]["value"]
    print(f"checkouts={attempts} placed={placed} orders_in_postgres={written} "
          f"cart_failed={cart_failed:.2%} checkout p95={d['p(95)']:.0f}ms p99={d['p(99)']:.0f}ms")
    if cart_failed >= 0.01:
        sys.exit("cart adds failed")
    if not placed or written < placed:
        sys.exit(f"expected {placed} new orders in accounting.order, found {written}")


def series(prom, query, start, end):
    q = urllib.parse.urlencode({"query": query, "start": start, "end": end, "step": 10})
    res = json.load(urllib.request.urlopen(f"{prom}/api/v1/query_range?{q}"))["data"]["result"]
    return [(float(t), float(v)) for t, v in res[0]["values"]] if res else []


def at(s, t):
    """Last sample at or before t."""
    v = [val for ts, val in s if ts <= t]
    return v[-1] if v else (s[0][1] if s else 0.0)


def catalog(summary, prom, start, end):
    rates = [int(r) for r in os.environ["RATES"].split(",")]
    stage, ramp = int(os.environ["STAGE"]), int(os.environ["RAMP"])
    m = json.load(open(summary))["metrics"]
    sel = '{service_name="product-catalog"}'
    wait = series(prom, f"sum(db_sql_connection_wait_total{sel})", start, end)
    waitms = series(prom, f"sum(db_sql_connection_wait_duration_milliseconds_total{sel})", start, end)
    opened = series(prom, f"max(db_sql_connection_open{sel})", start, end)
    if not wait:
        print("no db_sql_connection_wait_total samples for product-catalog; pool waits read as 0")
    print(f"{'rate/s':>6} {'p50 ms':>8} {'p95 ms':>8} {'p99 ms':>8} {'pool waits':>11} {'wait ms':>9} {'open max':>9}")
    for i, r in enumerate(rates):
        d = m.get(f"http_req_duration{{stage:{i}}}", {})
        t0, t1 = start + i * (stage + ramp), start + (i + 1) * (stage + ramp)
        om = max([v for ts, v in opened if t0 <= ts <= t1] or [0])
        print(f"{r:>6} {d.get('med', 0):>8.1f} {d.get('p(95)', 0):>8.1f} {d.get('p(99)', 0):>8.1f} "
              f"{at(wait, t1) - at(wait, t0):>11.0f} {at(waitms, t1) - at(waitms, t0):>9.0f} {om:>9.0f}")
    failed = m["http_req_failed"]["value"]
    dropped = m.get("dropped_iterations", {}).get("count", 0)
    print(f"requests={m['http_reqs']['count']} failed={failed:.2%} dropped_iterations={dropped}")
    if failed >= 0.01:
        sys.exit("catalog requests failed")


if __name__ == "__main__":
    if sys.argv[1] == "checkout":
        checkout(sys.argv[2], int(sys.argv[3]))
    else:
        catalog(sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5]))
