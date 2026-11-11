// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { execFileSync } from 'child_process';
import { defineConfig } from 'cypress';
import dotEnv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
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
      on('task', {
        // Runs one SQL statement in the demo's PostgreSQL container, for specs that seed catalog data.
        astronomyDbSql(sql: string) {
          return execFileSync(
            'docker',
            ['exec', 'astronomy-db', 'psql', '-U', 'postgres', '-d', 'astronomy_db', '-c', sql],
            {
              encoding: 'utf8',
            }
          );
        },
      });
    },
    supportFile: false,
  },
});
