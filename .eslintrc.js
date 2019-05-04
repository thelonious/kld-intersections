module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "ash-nazg/sauron-node",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "overrides": [
        {
            "env": {"mocha": true},
            "files": ["test/**/*.js", "examples/**/*.js"],
            "rules": {
                "no-console": 0
            }
        }
    ],
    "rules": {
      "indent": ["error", 4],
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
