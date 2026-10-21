// Access to the running demo stack (docker compose) for the backend tests.
import { execFileSync } from 'node:child_process';
import { randomBytes, randomUUID } from 'node:crypto';
import { mkdtempSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const REPO_ROOT = path.resolve(__dirname, '../..');
export const PROXY_URL = process.env.BASE_URL ?? 'http://localhost:8080';
export const ENVOY_ADMIN_URL = process.env.ENVOY_ADMIN_URL ?? 'http://localhost:10000';

const COMPOSE_FILES = ['compose.yaml', 'compose.full.yaml', 'compose.observability.yaml'];

export function docker(args: string[], timeoutMs = 60_000): string {
  return execFileSync('docker', args, { encoding: 'utf8', timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 });
}

/** Runs docker and returns its exit status instead of throwing. */
export function dockerStatus(args: string[], timeoutMs = 60_000): number {
  try {
    execFileSync('docker', args, { stdio: 'ignore', timeout: timeoutMs });
    return 0;
  } catch (e) {
    return (e as { status?: number }).status ?? 1;
  }
}

/** `docker compose` with the files and env files the stack was started with; extra files are added last. */
export function compose(args: string[], extraFiles: string[] = [], timeoutMs = 300_000): string {
  const files = [...COMPOSE_FILES.map(f => path.join(REPO_ROOT, f)), ...extraFiles].flatMap(f => ['-f', f]);
  const envFiles = ['.env', '.env.override'].flatMap(f => ['--env-file', path.join(REPO_ROOT, f)]);
  return execFileSync('docker', ['compose', '--project-directory', REPO_ROOT, ...envFiles, ...files, ...args], {
    encoding: 'utf8',
    timeout: timeoutMs,
    env: { ...process.env, LOCUST_AUTOSTART: 'false' },
  });
}

/**
 * Recreates one service from its built image, with extra environment variables
 * when given, or with its compose configuration alone when not.
 */
export function recreateService(service: string, env: Record<string, string> = {}): void {
  const extra: string[] = [];
  if (Object.keys(env).length > 0) {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'testbot-compose-'));
    const file = path.join(dir, 'override.yaml');
    const lines = Object.entries(env).map(([k, v]) => `      - ${JSON.stringify(`${k}=${v}`)}`);
    writeFileSync(file, `services:\n  ${service}:\n    environment:\n${lines.join('\n')}\n`);
    extra.push(file);
  }
  compose(['up', '-d', '--no-build', '--no-deps', '--force-recreate', service], extra);
}

/** host:port the container's port is published on. */
export function hostAddress(container: string, port: number): string {
  const line = docker(['port', container, String(port)]).split('\n').find(l => l.startsWith('0.0.0.0:'));
  if (!line) throw new Error(`${container}:${port} is not published`);
  return `localhost:${line.split(':')[1]}`;
}

export function containerIp(container: string): string {
  return docker(['inspect', '-f', '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}', container]).trim();
}

/** Container logs (stdout and stderr) written since the given time. */
export function logsSince(container: string, since: Date): string {
  return execFileSync('sh', ['-c', 'docker logs --since "$1" "$2" 2>&1', 'sh', since.toISOString(), container], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

/** Runs SQL in the astronomy database and returns rows as arrays of fields. */
export function psql(sql: string): string[][] {
  const out = docker(['exec', 'astronomy-db', 'psql', '-U', 'postgres', '-d', 'astronomy_db', '-At', '-F', '\t', '-c', sql]);
  return out
    .split('\n')
    .filter(l => l.length > 0)
    .map(l => l.split('\t'));
}

export function newTraceId(): string {
  return randomBytes(16).toString('hex');
}

export function traceparent(traceId: string): string {
  return `00-${traceId}-${randomBytes(8).toString('hex')}-01`;
}

export function uniqueId(prefix: string): string {
  return `${prefix}-${randomUUID()}`;
}

export async function sleep(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/** Polls fn until it returns a value that is not undefined, or the timeout passes. */
export async function pollUntil<T>(fn: () => Promise<T | undefined> | T | undefined, timeoutMs: number, intervalMs = 1000): Promise<T | undefined> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      const value = await fn();
      if (value !== undefined) return value;
    } catch {
      // keep polling until the deadline
    }
    if (Date.now() >= deadline) return undefined;
    await sleep(intervalMs);
  }
}
