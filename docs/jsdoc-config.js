"use strict";

module.exports = {
    plugins: [],
    recurseDepth: 10,
    source: {
        exclude: [
            "node_modules",
            "dist",
            "scratchpad",
            "test"
        ],
        excludePattern: "rollup*"
    },
    sourceType: "module",
    tags: {
        allowUnknownTags: false
    },
    templates: {
        cleverLinks: true,
        monospaceLinks: false
    },
    opts: {
        recurse: true,
        verbose: true,
        destination: "docs/jsdoc"
    }
};
