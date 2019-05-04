"use strict";

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["ash-nazg/sauron-node", "plugin:node/recommended-script"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "overrides": {
      files: ["**/*.md"],
      rules: {
        "eol-last": "off",
        "no-console": "off",
        "no-undef": "off",
        "no-unused-vars": ["warn"],
        "padded-blocks": "off",
        "import/unambiguous": "off",
        "import/no-unresolved": "off",
        "node/no-missing-import": "off"
      }
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
                "no-unused-vars": ["warn"],
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
        "indent": [
            "error",
            4,
            {"SwitchCase": 1}
        ],
        "quotes": [
            "error",
            "double"
        ],
        "space-before-function-paren": [
            "error",
            "never"
        ],
        "brace-style": [
            "error",
            "stroustrup"
        ],
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "no-console": "off",
        "no-multiple-empty-lines": "off",
        "max-len": "off",
        "node/exports-style": "off",
        "unicorn/no-zero-fractions": "off",
        "require-unicode-regexp": "off",
        "yoda": "off",
        "valid-jsdoc": 0,
        "import/unambiguous": 0,
        "global-require": 0,
        "import/no-commonjs": 0
    }
};
