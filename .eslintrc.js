module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "ash-nazg/sauron-node",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "overrides": [
        {
          files: ["**/*.md"],
          rules: {
            "eol-last": "off",
            "no-console": "off",
            "no-undef": "off",
            "padded-blocks": "off",
            "import/unambiguous": "off",
            "import/no-unresolved": "off",
            "node/no-missing-import": "off",
            "no-unused-vars": "warn",
            "no-unused-vars": ["error", {
              "varsIgnorePattern": "Point2D"
            }],
            "node/no-missing-require": ["error", {
              "allowModules": ["kld-intersections"]
            }]
          }
        }
    ],
    "rules": {
      "indent": ["error", 4, {"SwitchCase": 1}],
      "quotes": ["error", "double"],
      "no-console": "off",
      "space-before-function-paren": ["error", "never"],
      "no-multiple-empty-lines": "off",
      "arrow-parens": "off",
      "max-len": "off",
      "no-multi-spaces": "off",
      "node/exports-style": "off",
      "space-infix-ops": "off",
      "unicorn/no-zero-fractions": "off",
      "require-unicode-regexp": "off",
      "yoda": "off",
      "valid-jsdoc": 0,
      "import/unambiguous": 0,
      "global-require": 0,
      "import/no-commonjs": 0
    }
};
