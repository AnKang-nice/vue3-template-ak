import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{ files: ['src/**/*.{js,mjs,cjs,ts,vue}'] },
	{
		files: ['src/**/*.{js,mjs,cjs,ts,vue}'],
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	{
		files: ['src/**/*.{js,mjs,cjs,ts,vue}'],
		plugins: { js },
		extends: ['js/recommended']
	},
	tseslint.configs.recommended,
	pluginVue.configs['flat/essential'],
	{
		files: ['src/**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } }
	},
	{
		files: ['src/**/*.{js,mjs,cjs,ts,vue}'],
		rules: {
			// "@/no-console": "error", // 测试
		}
	}
]);
