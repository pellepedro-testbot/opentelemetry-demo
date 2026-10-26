// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as S from '../styles/Error.styled';

// Kept free of data-fetching components (Layout/Header) on purpose: Next.js
// may render this page on both the client and server, and it should not
// depend on anything that could itself fail.
const NotFoundPage: NextPage = () => {
  const { asPath, isReady } = useRouter();
  // The page is pre-rendered without a path, so the requested path is read once mounted.
  const [path, setPath] = useState('');
  useEffect(() => {
    if (isReady) setPath(asPath);
  }, [asPath, isReady]);

  return (
    <>
      <Head>
        <title>Otel Demo - Page Not Found</title>
      </Head>
      <S.Container>
        <S.Code>404</S.Code>
        <S.Message>This page could not be found.</S.Message>
        {path && <S.Message data-cy="not-found-path">{path}</S.Message>}
        <S.HomeLink href="/">Go to homepage</S.HomeLink>
      </S.Container>
    </>
  );
};

export default NotFoundPage;
