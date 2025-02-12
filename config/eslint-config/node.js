/** @typedef {import('eslint').Linter.BaseConfig} EslintConfig */

/** @type {EslintConfig} */
const config = {
  extends: ["@rocketseat/eslint-config/node"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
  },
};

export default config;
