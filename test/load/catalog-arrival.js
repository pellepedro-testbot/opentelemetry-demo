// Catalog read ramp for the load fixtures (O1, O5 and other catalog contention).
//
// Steps a fixed arrival rate up against GET /api/products/{id}. A serialized catalog
// (one mutex, or a pool of 2 connections) keeps up at low rates and falls behind at
// high ones: p99 climbs stage by stage and k6 reports dropped_iterations once it
// cannot start requests on time. The pass rule compares builds (base, PR, fix);
// the thresholds below only make k6 report each stage and catch outright errors.
//
// Env: BASE (default http://frontend-proxy:8080), RATES (default 20,50,200,400 per s),
//      STAGE (seconds per stage, default 120), RAMP (seconds between stages, default 15).
import http from "k6/http";
import { check } from "k6";
import exec from "k6/execution";

const BASE = __ENV.BASE || "http://frontend-proxy:8080";
const RATES = (__ENV.RATES || "20,50,200,400").split(",").map(Number);
const STAGE = Number(__ENV.STAGE || 120);
const RAMP = Number(__ENV.RAMP || 15);

// The ten products the demo seeds (src/postgresql/init.sql).
const IDS = ["0PUK6V6EV0", "1YMWWN1N4O", "2ZYFJ3GM2N", "66VCHSJNUP", "6E92ZMYYFZ",
  "9SIQT8TOJO", "L9ECAV7KIM", "LS4PSXUNUM", "OLJCESPC7Z", "HQTGWGPNH4"];

// Each rate is reached by a short ramp and then held, so every stage has a steady part.
const stages = [];
for (const r of RATES) {
  stages.push({ target: r, duration: `${RAMP}s` });
  stages.push({ target: r, duration: `${STAGE}s` });
}

const thresholds = { "http_req_failed{ep:product}": ["rate<0.01"] };
RATES.forEach((_, i) => {
  // Lenient on purpose: they exist so the summary breaks p95/p99 down per stage.
  thresholds[`http_req_duration{stage:${i}}`] = ["p(99)<10000"];
});

export const options = {
  scenarios: {
    catalog: {
      executor: "ramping-arrival-rate",
      startRate: RATES[0],
      timeUnit: "1s",
      stages,
      preAllocatedVUs: 50,
      maxVUs: 1000,
    },
  },
  thresholds,
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
};

// Which stage a request belongs to, from the scenario's elapsed time.
function stageIndex() {
  const t = exec.instance.currentTestRunDuration / 1000;
  return Math.min(Math.floor(t / (RAMP + STAGE)), RATES.length - 1);
}

export default function () {
  const id = IDS[Math.floor(Math.random() * IDS.length)];
  const res = http.get(`${BASE}/api/products/${id}?currencyCode=USD`, {
    tags: { ep: "product", stage: String(stageIndex()), name: "GET /api/products/{id}" },
  });
  check(res, {
    "status 200": (r) => r.status === 200,
    "right product": (r) => r.status === 200 && r.json("id") === id,
  });
}
