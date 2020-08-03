module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "no-duplicate-imports": "error",
    "no-var": "warn",
    "prefer-const": "warn",
    "no-console": "off"
  }
}