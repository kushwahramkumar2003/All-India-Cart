// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  // Ignore the apps directory as per your requirement
  ignorePatterns: ["apps/**"],

  // Make sure the extends path is correct and accessible from the root.
  extends: ["@repo/eslint-config"],

  // TypeScript parser for ESLint
  parser: "@typescript-eslint/parser",

  parserOptions: {
    // Ensures ESLint can find the tsconfig.json at the root level.
    project: "./tsconfig.json",
    sourceType: "module",
  },

  // Ensure these settings are correctly pointing to your project files
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
