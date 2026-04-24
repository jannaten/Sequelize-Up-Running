'use strict';

const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  // Ignored paths (replaces top-level ignorePatterns)
  {
    ignores: ['dist/**', 'node_modules/**', 'jest.config.ts', 'migrations/**', 'seeders/**'],
  },

  // @typescript-eslint recommended for all TS files
  ...tseslint.configs.recommended,

  // Base custom rules
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // Type-aware rules for src/ only
  {
    files: ['src/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'warn',
    },
  },

  // Relax rules for tests
  {
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
    },
  },

  // Prettier must be last — disables formatting rules that conflict
  prettierConfig,
);
