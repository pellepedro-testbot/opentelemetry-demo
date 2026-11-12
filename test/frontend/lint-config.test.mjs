// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const frontendDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../src/frontend",
);

const run = (...args) =>
  spawnSync("npx", args, {
    cwd: frontendDir,
    encoding: "utf8",
    timeout: 300000,
  });

const printRules = (file) => {
  const { status, stdout, stderr } = run("eslint", "--print-config", file);
  assert.equal(status, 0, stderr);
  return JSON.parse(stdout).rules;
};

const severity = (entry) => (Array.isArray(entry) ? entry[0] : entry);

test("npm run lint runs eslint on the frontend with the flat config and reports no errors", () => {
  const { scripts } = JSON.parse(
    readFileSync(join(frontendDir, "package.json"), "utf8"),
  );
  assert.equal(scripts.lint, "eslint .");
  assert.ok(existsSync(join(frontendDir, "eslint.config.mjs")));
  assert.ok(!existsSync(join(frontendDir, ".eslintrc")));

  const { status, stdout, stderr } = spawnSync("npm", ["run", "lint"], {
    cwd: frontendDir,
    encoding: "utf8",
    timeout: 300000,
  });
  assert.doesNotMatch(`${stdout}\n${stderr}`, /ESLint couldn't find/);
  assert.equal(
    status,
    0,
    `npm run lint exited ${status}:\n${stdout}\n${stderr}`,
  );
});

test("the flat config keeps the rules of the former .eslintrc", () => {
  const rules = printRules("pages/index.tsx");
  assert.ok(
    [0, "off"].includes(
      severity(rules["@typescript-eslint/no-non-null-assertion"]),
    ),
  );
  assert.ok(
    [1, "warn"].includes(severity(rules["react-hooks/exhaustive-deps"])),
  );
  assert.ok([0, "off"].includes(severity(rules["no-unused-vars"])));
  assert.ok(
    [2, "error"].includes(severity(rules["@typescript-eslint/no-unused-vars"])),
  );
  assert.ok(
    ![0, "off"].includes(
      severity(rules["@typescript-eslint/no-unused-expressions"]),
    ),
  );
  assert.deepEqual(rules["max-len"], [
    2,
    {
      code: 150,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    },
  ]);

  const cypressRules = printRules("cypress/e2e/Home.cy.ts");
  assert.ok(
    [0, "off"].includes(
      severity(cypressRules["@typescript-eslint/no-unused-expressions"]),
    ),
  );
});
