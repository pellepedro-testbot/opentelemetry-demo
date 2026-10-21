// Searches the log records the collector indexes in OpenSearch.
import { hostAddress, pollUntil } from './stack';

export interface LogRecord {
  body: string;
  attributes: Record<string, unknown>;
  resource: Record<string, unknown>;
}

async function search(query: object): Promise<LogRecord[]> {
  const res = await fetch(`http://${hostAddress('opensearch', 9200)}/otel-logs*/_search`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ size: 50, query }),
  });
  if (!res.ok) return [];
  const body = (await res.json()) as { hits?: { hits?: { _source: LogRecord }[] } };
  return (body.hits?.hits ?? []).map(h => h._source);
}

/** Waits for log records whose body contains the phrase, optionally of one service. */
export async function waitForLogs(phrase: string, service?: string, timeoutMs = 60_000): Promise<LogRecord[]> {
  const records = await pollUntil(async () => {
    const found = (await search({ match_phrase: { body: phrase } })).filter(
      r => r.body.includes(phrase) && (!service || r.resource['service.name'] === service)
    );
    return found.length > 0 ? found : undefined;
  }, timeoutMs, 2000);
  return records ?? [];
}

/** Waits for log records carrying an attribute with the given value. */
export async function waitForLogsWithAttribute(key: string, value: string, timeoutMs = 60_000): Promise<LogRecord[]> {
  const records = await pollUntil(async () => {
    const found = (await search({ match_phrase: { [`attributes.${key}`]: value } })).filter(r => r.attributes[key] === value);
    return found.length > 0 ? found : undefined;
  }, timeoutMs, 2000);
  return records ?? [];
}
