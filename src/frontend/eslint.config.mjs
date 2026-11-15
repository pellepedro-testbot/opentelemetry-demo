// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import nextVitals from 'eslint-config-next/core-web-vitals';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const tsRecommendedRules = Object.assign({}, ...tsPlugin.configs['flat/recommended'].map(c => c.rules ?? {}));

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'protos/**', 'genproto/**', 'next-env.d.ts'],
  },
  ...nextVitals,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...tsRecommendedRules,
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      'max-len': [
        'error',
        {
          code: 150,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
  {
    files: ['cypress/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];

export default config;
