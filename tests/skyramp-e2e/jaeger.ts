// Reads traces back from Jaeger (through the frontend proxy) for the telemetry checks.
import { PROXY_URL, pollUntil } from './stack';

export interface SpanEvent {
  name: string;
  timestamp: number;
  fields: Record<string, unknown>;
}

export interface TraceSpan {
  service: string;
  operationName: string;
  startTime: number;
  tags: Record<string, unknown>;
  events: SpanEvent[];
}

interface RawKeyValue {
  key: string;
  value: unknown;
}

function toRecord(kvs: RawKeyValue[] = []): Record<string, unknown> {
  return Object.fromEntries(kvs.map(kv => [kv.key, kv.value]));
}

async function fetchTrace(traceId: string): Promise<TraceSpan[]> {
  const res = await fetch(`${PROXY_URL}/jaeger/ui/api/traces/${traceId}`);
  if (!res.ok) return [];
  const body = (await res.json()) as { data?: any[] }; // eslint-disable-line @typescript-eslint/no-explicit-any
  const trace = body.data?.[0];
  if (!trace) return [];
  return trace.spans.map((s: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const fields = (s.logs ?? []).map((l: { timestamp: number; fields: RawKeyValue[] }) => ({ timestamp: l.timestamp, fields: toRecord(l.fields) }));
    return {
      service: trace.processes[s.processID]?.serviceName ?? '',
      operationName: s.operationName,
      startTime: s.startTime,
      tags: toRecord(s.tags),
      events: fields.map((f: { timestamp: number; fields: Record<string, unknown> }) => ({
        name: String(f.fields.event ?? ''),
        timestamp: f.timestamp,
        fields: f.fields,
      })),
    };
  });
}

/**
 * Waits until Jaeger holds spans of the trace from the given service for which
 * `ready` is true, and returns the trace's spans of that service.
 */
export async function waitForServiceSpans(
  traceId: string,
  service: string,
  timeoutMs = 30_000,
  ready: (spans: TraceSpan[]) => boolean = spans => spans.length > 0
): Promise<TraceSpan[]> {
  const spans = await pollUntil(async () => {
    const all = (await fetchTrace(traceId)).filter(s => s.service === service);
    return ready(all) ? all : undefined;
  }, timeoutMs, 1000);
  return spans ?? [];
}

/** The first span of the list carrying the attribute. */
export function spanWithTag(spans: TraceSpan[], key: string): TraceSpan | undefined {
  return spans.find(s => key in s.tags);
}

/** The events of all spans, ordered by time. */
export function eventsInOrder(spans: TraceSpan[]): SpanEvent[] {
  return spans.flatMap(s => s.events).sort((a, b) => a.timestamp - b.timestamp);
}

export interface SearchedSpan {
  name: string;
  status: { code?: number; message?: string };
  events: string[];
}

/** Spans of one operation of a service started since the given time (Jaeger v3 search API). */
export async function searchSpans(service: string, operation: string, since: Date): Promise<SearchedSpan[]> {
  const params = new URLSearchParams({
    'query.service_name': service,
    'query.operation_name': operation,
    'query.start_time_min': since.toISOString(),
    'query.start_time_max': new Date(Date.now() + 60_000).toISOString(),
    'query.num_traces': '100',
  });
  const res = await fetch(`${PROXY_URL}/jaeger/ui/api/v3/traces?${params}`);
  if (!res.ok) return [];
  const body = (await res.json()) as { result?: { resourceSpans?: any[] } }; // eslint-disable-line @typescript-eslint/no-explicit-any
  return (body.result?.resourceSpans ?? []).flatMap(rs =>
    rs.scopeSpans.flatMap((ss: { spans: any[] }) => // eslint-disable-line @typescript-eslint/no-explicit-any
      ss.spans
        .filter(s => s.name === operation)
        .map(s => ({ name: s.name, status: s.status ?? {}, events: (s.events ?? []).map((e: { name: string }) => e.name) }))
    )
  );
}
