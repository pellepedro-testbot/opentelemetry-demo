// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse<{ status: string }>) => {
  return res.status(200).json({ status: 'ok' });
};

export default handler;
