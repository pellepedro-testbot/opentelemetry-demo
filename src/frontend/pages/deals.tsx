// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import ApiGateway from '../gateways/Api.gateway';

const Deals: NextPage = () => {
  const { data: deals = [] } = useQuery({
    queryKey: ['ads', ['deals']],
    queryFn: () => ApiGateway.listAds(['deals']),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      <Head>
        <title>Otel Demo - Deals</title>
      </Head>
      <main style={{ padding: '24px' }}>
        <h1>Deals</h1>
        <ul data-cy="deals-list">
          {deals.map(({ redirectUrl, text }) => (
            <li key={redirectUrl}>
              <Link href={redirectUrl}>{text}</Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default Deals;
