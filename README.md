# CS312 Spring 2020 Assignment 1 Solution

This directory contains the solution to Assignment 1 implemented as a [npm module](https://docs.npmjs.com/getting-started/creating-node-modules).

## Creating the module

The module is created with `npm init`. We integrated unit testing with [Jest](https://facebook.github.io/jest/) and the [ESLint](https://eslint.org) [linter][lint] as development dependencies.

```
npm install --save-dev jest eslint
npm install --save-dev husky lint-staged prettier eslint-config-prettier
```

To prevent ESLint from trying to analyze the files you created as part of any coverage analysis you will want to also add an `.eslintignore` file with the following list of directories (or files) to be ignored:

```
# testing
/coverage
```

Similar to testing, we added a `package.json` script entry point to run the linter.

We added the necessary entries in the `package.json` file to run prettier automatically on commit (following the CRA [instructions](https://create-react-app.dev/docs/setting-up-your-editor/#formatting-code-automatically)).

## Running tests

We place the unit tests in `index.test.js` (that is same file name but with `test.js` extensions). We run those tests with `npm test`. This invokes the test script specified in the `package.json` file. That script is equivalent to `npx jest`.

## Running the linter

We run the linter with `npm run lint`, invoking the lint script specified in the `package.json` file. That script is equivalent to `npx eslint .`. ESLint can fix many of the errors automatically by running `npm run lint -- --fix .`.

## Travis CI

The solutions repository is also configured for Travis CI (with a `.travis.yml` file).

[lint]: https://en.wikipedia.org/wiki/Lint_(software)
