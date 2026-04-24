import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "lambda/**/dist/**",
      "lambda/site-ui/handler.cjs",
      "lambda/site-ui/site-ui-auth.cjs",
      "lambda/site-ui/*.test.cjs",
      "scripts/**/*.cjs",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
