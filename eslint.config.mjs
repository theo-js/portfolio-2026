import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // Base JS rules (eslint:recommended)
  js.configs.recommended,

  // Next.js
  ...nextVitals,
  ...nextTs,

  // TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
    },
  },

  // Prettier (must be last)
  prettier,

  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "import/no-default-export": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "error",
    },
    // Overrides
    overrides: [
      {
        files: ["src/pages/**/*", "orval.config.ts"],
        rules: {
          "import/no-default-export": "off",
        },
      },
    ],
  },

  // Ignore patterns
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
