// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "extends": ["eslint:recommended"],

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "experimentalObjectRestSpread": true
    }
  },

  "env": {
    "browser": true,
    "node": false,
    "amd": true,
    "es6": true,
    "mocha": true
  },

  "globals": {
    "define": true
  },

  "rules": {
    "strict": ["warn", "global"],
    "no-unused-vars": ["warn", { "vars": "all", "args": "all", "caughtErrors": "none" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "camelcase": ["warn", { "properties": "always" }],
    "consistent-return": "warn",
    "arrow-spacing": "warn",
    "arrow-parens": ["warn", "always"],
    "arrow-body-style": ["warn", "as-needed"],
    "semi": ["warn", "always"],
    "no-confusing-arrow": ["warn", { "allowParens": false }],
    "no-constant-condition": "warn",
    "no-labels": "warn",
    "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
    "func-style": "off",
  }
};