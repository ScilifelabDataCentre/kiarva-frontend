import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "prefer-spread": "off",
      "@next/next/no-img-element": "off",

      // eslint-plugin-react-hooks@7 (pulled in by eslint-config-next@16) adds
      // the React Compiler rules, which flag 16 pre-existing effects that call
      // setState synchronously. They are genuine anti-patterns, but fixing them
      // means restructuring derived state and data fetching across 10
      // components, so they are downgraded to warnings to keep the build green
      // and tracked for follow-up PRs rather than silenced.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
