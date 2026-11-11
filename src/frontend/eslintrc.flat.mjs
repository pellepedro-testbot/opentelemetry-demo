import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';

// Flat-config translation of src/frontend/.eslintrc (extends + rules), which eslint 9 cannot load.
export default [
  ...nextCoreWebVitals,
  { rules: reactPlugin.configs.flat.recommended.rules },
  ...tsPlugin.configs['flat/recommended'].map(({ plugins, languageOptions, ...rest }) => rest),
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'max-len': ['error', { code: 150, ignoreComments: true, ignoreTrailingComments: true, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    },
  },
];
