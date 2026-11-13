// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as rules1 from './rules1.ts';
import * as rules2 from './rules2.ts';
import * as rules3 from './rules3.ts';

const rulesDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(rulesDir, '..');
const ruleModules = { rules1, rules2, rules3 };
const ruleFiles = Object.keys(ruleModules).map(name => join(rulesDir, name));

const allRules = Object.entries(ruleModules).flatMap(([file, mod]) =>
  Object.entries(mod).map(([name, fn]) => ({ id: `${file}.${name}`, fn }))
);

const sourceFiles = dir =>
  readdirSync(dir).flatMap(entry => {
    const path = join(dir, entry);
    if (entry === 'node_modules' || path === rulesDir) return [];
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(path) ? [path] : [];
  });

test('the pricing rules are not imported anywhere in the mobile app', () => {
  // Captures the module specifier of `import ... from '<x>'`, `import('<x>')`, `require('<x>')` and `export ... from '<x>'`.
  const specifierPattern = /(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)['"]([^'"]+)['"]/g;
  const importers = [];
  for (const file of sourceFiles(appDir)) {
    const source = readFileSync(file, 'utf8');
    for (const [, specifier] of source.matchAll(specifierPattern)) {
      const target = specifier.startsWith('@/') ? join(appDir, specifier.slice(2)) : resolve(dirname(file), specifier);
      const withoutExtension = target.replace(/\.(ts|tsx|js)$/, '');
      if (ruleFiles.includes(withoutExtension) || ruleFiles.includes(join(withoutExtension, 'index'))) {
        importers.push(`${relative(appDir, file)} -> ${specifier}`);
      }
    }
  }
  assert.deepEqual(importers, []);
});

test('the rule modules export the 1137 pricing rules', () => {
  assert.equal(allRules.length, 1137);
  for (const { id, fn } of allRules) assert.equal(typeof fn, 'function', id);
});

test('every pricing rule rejects a negative item count or negative units', () => {
  for (const { id, fn } of allRules) {
    assert.throws(() => fn(-1, 0), { message: /negative input$/ }, `${id}(-1, 0)`);
    assert.throws(() => fn(0, -1), { message: /negative input$/ }, `${id}(0, -1)`);
  }
});

test('every pricing rule scores 0 items as 0 and never returns a negative score', () => {
  for (const { id, fn } of allRules) {
    assert.equal(fn(0, 1000), 0, `${id}(0, 1000)`);
    for (const [items, units] of [
      [1, 0],
      [5, 100],
      [1000000, 1000000],
    ]) {
      const score = fn(items, units);
      assert.ok(Number.isFinite(score) && score >= 0, `${id}(${items}, ${units}) returned ${score}`);
    }
  }
});
