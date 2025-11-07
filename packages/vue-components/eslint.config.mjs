import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
    {
        ignores: [
            "dist",
            "node_modules",
            "**/*.d.ts",
            "**/*.vue",
            "**/*.stories.ts",
            "**/*.spec.ts",
        ],
    },
    {
        files: ["src/**/*.ts", "!**/*.stories.ts", "!**/*.spec.ts"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    prettierConfig,
];
