import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
    {
        ignores: ["dist", "node_modules", "*.d.ts"],
    },
    {
        files: ["src/**/*.{ts,tsx}"],
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
            "@typescript-eslint": tsPlugin,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "react/prop-types": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    prettierConfig,
];
