module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-standard-scss",
    "stylelint-prettier/recommended"
  ],
  "plugins": [
    "stylelint-scss",
    "stylelint-prettier"
  ],
  rules: {
    "unit-no-unknown": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "declaration-block-no-duplicate-properties": [true, { "severity": "warning" }],
    "declaration-block-no-shorthand-property-overrides": [true, { "severity": "warning" }],
    "block-no-empty": [true, { "severity": "warning" }],
    "no-duplicate-selectors": [true, { "severity": "warning" }],
    "prettier/prettier": true,
  }
}