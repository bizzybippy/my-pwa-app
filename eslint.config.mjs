import js from '@eslint/js';
import ts from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**'
    ]
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: ts,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly',
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ]
    },
    settings: {
      react: {
        version: 'detect',
        pragma: 'React', // ระบุว่า React เป็น global สำหรับ JSX
        fragment: 'Fragment' // ระบุว่า Fragment เป็น global
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  }
];

export default config;