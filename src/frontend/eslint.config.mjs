// ESLint 9 flat config. Next.js 16 removed `next lint`, so `npm run lint` runs eslint directly.
// Same rules as the former .eslintrc: react recommended, typescript-eslint recommended, next/core-web-vitals.
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import react from "eslint-plugin-react";

const config = [
  // Order as in .eslintrc: react recommended first, so next's config overrides it (react-in-jsx-scope off).
  { rules: react.configs.recommended.rules },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "max-len": [
        "error",
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
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "protos/**", "next-env.d.ts"],
  },
];

export default config;
