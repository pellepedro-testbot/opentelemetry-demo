// Instant queries against the stack's Prometheus.
const PROMETHEUS_URL = process.env.PROMETHEUS_URL ?? 'http://localhost:9090';

/** The value of a query returning one series, or undefined when it returns none. */
export async function promQuery(query: string): Promise<number | undefined> {
  const res = await fetch(`${PROMETHEUS_URL}/api/v1/query?query=${encodeURIComponent(query)}`);
  if (!res.ok) return undefined;
  const body = (await res.json()) as { data?: { result?: { value: [number, string] }[] } };
  const first = body.data?.result?.[0];
  return first ? Number(first.value[1]) : undefined;
}
