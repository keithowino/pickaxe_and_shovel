import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

import unusedImports from "eslint-plugin-unused-imports";
import react from "eslint-plugin-react";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{js,jsx}"],
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			react.configs.flat["jsx-runtime"],
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		plugins: {
			"unused-imports": unusedImports,
			react: react,
		},
		rules: {
			"no-unused-vars": "off",
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			"sort-imports": [
				"error",
				{
					ignoreDeclarationSort: true,
				},
			],
		},
	},
]);
