// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'cypress';
import dotEnv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

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
      // Specs that check a container's log or restart one reach Docker through the docker CLI.
      on('task', {
        dockerLogs({ container, since }: { container: string; since: string }) {
          const run = spawnSync('docker', ['logs', '--since', since, container], { encoding: 'utf8' });
          if (run.error) throw run.error;
          return `${run.stdout}${run.stderr}`;
        },
        dockerRestart(container: string) {
          const run = spawnSync('docker', ['restart', container], { encoding: 'utf8' });
          if (run.error) throw run.error;
          if (run.status !== 0) throw new Error(run.stderr);
          return null;
        },
      });
    },
    supportFile: false,
  },
});
