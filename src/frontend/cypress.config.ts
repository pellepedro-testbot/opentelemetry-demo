// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'cypress';
import dotEnv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { spawnSync } from 'child_process';
import { resolve } from 'path';

const myEnv = dotEnv.config({
  path: resolve(__dirname, '../../.env'),
});
dotenvExpand.expand(myEnv);

const { FRONTEND_ADDR = '', NODE_ENV, FRONTEND_PORT = '8080' } = process.env;

const baseUrl = NODE_ENV === 'production' ? `http://${FRONTEND_ADDR}` : `http://localhost:${FRONTEND_PORT}`;

export default defineConfig({
  env: {
    baseUrl,
  },
  e2e: {
    baseUrl,
    setupNodeEvents(on) {
      const docker = (args: string[]) => {
        const { stdout, stderr } = spawnSync('docker', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
        return `${stdout ?? ''}${stderr ?? ''}`;
      };

      on('task', {
        containerLogs: ({ container, since }: { container: string; since: string }) =>
          docker(['logs', '--since', since, container]),
        accountingQuery: (sql: string) =>
          docker(['exec', 'astronomy-db', 'psql', '-U', 'astronomy_user', '-d', 'astronomy_db', '-tAc', sql]),
        catalogQuery: (sql: string) =>
          docker(['exec', 'astronomy-db', 'psql', '-U', 'postgres', '-d', 'astronomy_db', '-tAc', sql]),
      });
    },
    supportFile: false,
  },
});
