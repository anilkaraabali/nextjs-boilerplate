// @ts-check

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended',
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:testing-library/react',
    'plugin:jest-formatting/recommended',
    'plugin:jest-dom/recommended',
    'plugin:jest/recommended',
  ],
  globals: {
    JSX: true,
    React: true,
  },
  ignorePatterns: ['node_modules', 'dist', '!/.storybook'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    {
      extends: ['plugin:testing-library/react'],
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      rules: {
        'jest-formatting/padding-around-expect-groups': 2,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'perfectionist',
    'jsx-a11y',
    'jest',
    'jest-dom',
    'jest-formatting',
    'testing-library',
  ],
  root: true,
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_.*?$',
        ignoreRestSiblings: false,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'import/newline-after-import': 'error',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'max-params': 'error',
    'no-console': 'warn',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'testing-library/no-node-access': [
      'error',
      { allowContainerFirstChild: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
