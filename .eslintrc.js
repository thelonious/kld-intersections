module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
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
    }
};
