// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

const baseUrl = process.env.CYPRESS_baseUrl || `http://localhost:${process.env.FRONTEND_PORT || '8080'}`;

const read = await fetch(`${baseUrl}/feature/api/read`);
if (!read.ok) throw new Error(`reading flags failed: ${read.status}`);
const body = await read.json();

body.flags.paymentFailure.defaultVariant = 'off';
body.flags.productCatalogFailure.targeting.if[1] = 'off';

const write = await fetch(`${baseUrl}/feature/api/write`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: body }),
});
if (!write.ok) throw new Error(`writing flags failed: ${write.status}`);
