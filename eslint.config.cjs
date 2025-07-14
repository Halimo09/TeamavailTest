const { FlatCompat } = require("@eslint/eslintrc");
const { configs } = require("@eslint/js");
const globals = require("globals");

// Use process.cwd() directly without declaring __dirname
const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: configs.recommended,
});

module.exports = [
  // Bring in eslint:recommended and prettier/recommended
  ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),

  // Global settings
  {
    ignores: ["output/**"],
  },

  // ESLint config files
  {
    files: ["*.config.cjs"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.node,
        __dirname: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-undef": "off", // Disable no-undef for config files
    },
  },

  // Browser environment (public scripts)
  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script", // <-- change from 'module' to 'script'
      globals: {
        ...globals.browser,
        alert: "readonly",
        fetch: "readonly",
        module: "readonly", // <-- add this
        require: "readonly", // <-- and this, just in case
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // suppress 'module is not defined' if it appears
    },
  },

  // Node.js environment (server-side files)
  {
    files: ["**/server.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.node,
        __dirname: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-console": "off", // Allow console in server code
      "no-unused-vars": "warn",
    },
  },

  // Test environment
  {
    files: ["test/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.node,
        ...globals.browser, // ✅ add this line
        ...globals.jest,
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        require: "readonly",
        afterAll: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
    },
  },

  // Default rules for other JS files
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
];
