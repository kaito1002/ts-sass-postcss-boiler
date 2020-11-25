module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    quotes: "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/quotes": [
      2,
      "backtick",
      {
        avoidEscape: true,
      },
    ],
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-console": "off"
  }
}