// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsparser from '@typescript-eslint/parser';
import process from 'process';
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      // '*.feature.spec.js'
    ],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      }
    },
    rules: {
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { checkThenables: false }],
      indent: [2, 2, { 'SwitchCase': 1 }],
      quotes: [2, 'single'],
      semi: [2, 'always'],
      'object-curly-spacing': [2, 'always'],
      'no-prototype-builtins': 0,
      'space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        },
      ],
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
      'keyword-spacing': 1,
      'no-async-promise-executor': 'off',
      'no-unused-vars': 1
    }
  }

);