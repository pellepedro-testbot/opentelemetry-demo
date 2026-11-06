// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { execFile } from 'child_process';
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
        docker(args: string[]) {
          return new Promise<string>((resolvePromise, reject) =>
            execFile('docker', args, { maxBuffer: 256 * 1024 * 1024 }, (error, stdout, stderr) =>
              error
                ? reject(new Error(`docker ${args[0]} failed: ${stderr || error.message}`))
                : resolvePromise(stdout + stderr)
            )
          );
        },
      });
    },
    supportFile: false,
  },
});
