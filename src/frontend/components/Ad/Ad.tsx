// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from '../../utils/enums/CypressFields';
import { useAd } from '../../providers/Ad.provider';
import * as S from './Ad.styled';

const Ad = () => {
  const { adList } = useAd();
  if (!adList.length) return null;

  const { text, redirectUrl } = adList[Math.floor(Math.random() * adList.length)];

  return (
    <S.Ad data-cy={CypressFields.Ad}>
      <S.Label>Advertisement</S.Label>
      <S.Link href={redirectUrl}>
        <p>{text}</p>
      </S.Link>
    </S.Ad>
  );
};

export default Ad;
