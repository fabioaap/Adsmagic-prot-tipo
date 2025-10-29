import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import * as eslintMdxParser from "eslint-mdx";
import * as eslintPluginMdx from "eslint-plugin-mdx";
import globals from "globals";

export default [
  {
    ignores: ["dist", "node_modules", "storybook-static"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.mdx"],
    plugins: {
      mdx: eslintPluginMdx,
    },
    languageOptions: {
      parser: eslintMdxParser,
    },
    processor: eslintPluginMdx.processors.remark,
    rules: {
      "mdx/remark": "warn",
      "no-unused-expressions": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
];
