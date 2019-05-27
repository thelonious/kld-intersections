"use strict";

module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["ash-nazg/sauron-node"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "settings": {
        "polyfills": [
            "console",
            "JSON",
            "Array.isArray"
        ]
    },
    "overrides": [
        {
            files: "docs/jsdoc-config.js",
            globals: {
                "module": "readonly"
            },
            rules: {
                strict: "off",
                "import/unambiguous": "off",
                "import/no-commonjs": "off"
            }
        },
        {
            files: ["**/*.md"],
            settings: {
              polyfills: [
                "console",
                "document.querySelector"
              ]
            },
            rules: {
                "eol-last": "off",
                "no-console": "off",
                "no-undef": "off",
                "padded-blocks": "off",
                "import/unambiguous": "off",
                "import/no-unresolved": "off",
                "node/no-missing-import": "off",
                "import/no-commonjs": "off",
                "no-multi-spaces": "off",
                "no-unused-vars": ["error", {
                    "varsIgnorePattern": "Point2D|ShapeInfo|Intersection|result|centers|radii|arcs|points|beziers|circles|ellipses|lines|paths|polylines|polygons|rectangles"
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
        "no-multiple-empty-lines": "off",
        "max-len": "off",
        "node/exports-style": "off",
        "unicorn/no-zero-fractions": "off",
        "require-unicode-regexp": "off",
        "yoda": "off",
        "valid-jsdoc": 0
    }
};
