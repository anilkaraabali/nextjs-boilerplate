# Next.js Boilerplate

A boilerplate template for building modern web applications using Next.js, React, TypeScript, and more.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/anilkaraabali/nextjs-boilerplate.git
cd nextjs-boilerplate
pnpm install
```

Then, start the development server:

```bash
pnpm dev
```

## Starting Storybook

If you want to run Storybook for component development and testing, you can start it with the following command:

```bash
pnpm storybook
```

## Running Tests

This project uses Jest for running unit and integration tests.

To run the tests, use the following command:

```bash
pnpm test
```

This will run all the tests in the project and output the results in the terminal.

### Running Tests in Watch Mode

If you want to run the tests continuously as you make changes, you can use the following command:

```bash
pnpm test:watch
```

This will watch for changes to your test files and automatically rerun the tests.

### Running Tests with Coverage

To run the tests with coverage reports, use:

```bash
pnpm test:coverage
```

This will generate a code coverage report that shows how much of your code is covered by tests.

## TypeScript Validation

To check for TypeScript errors in your project, you can run:

```bash
pnpm validate-types
```

This will use the TypeScript compiler to validate your types and show any errors or warnings related to type issues in your code.

## Tech stack

- Next.js - React framework for building server-rendered and statically generated web applications
- TypeScript - A strongly typed superset of JavaScript
- React - JavaScript library for building user interfaces
- Jest - JavaScript testing framework for running unit and integration tests
- React Testing Library - Library for testing React components in a user-centric way
- ESLint - Linting tool for identifying and fixing problems in JavaScript and TypeScript code
- Prettier - Code formatter for consistent code style
- Stylelint - Linter for stylesheets
- Storybook - UI component explorer for React
