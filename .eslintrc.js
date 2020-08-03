module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "quotes": ["error", "single"],
    "no-duplicate-imports": "error",
    "no-var": "warn",
    "prefer-const": "warn",
    "no-console": "off"
  },
  overrides: [
    {
      files: [
        "src/scripts/*.ts",
        "src/index.ts"
      ],
    }
  ]
}