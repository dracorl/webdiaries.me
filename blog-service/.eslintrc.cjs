module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "import/extensions": ["error", "ignorePackages"],
    semi: ["error", "never"],
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "no-console": ["error", {allow: ["log", "warn", "error"]}],
    "global-require": "off",
    "consistent-return": "off",
    "allow-void": 0,
    "no-underscore-dangle": "off"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"]
      }
    }
  }
}
