import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import {terser} from "rollup-plugin-terser";

/**
 * @external RollupConfig
 * @type {PlainObject}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {PlainObject} config
 * @param {boolean} config.minifying
 * @param {string} [config.format="umd"} = {}]
 * @returns {external:RollupConfig}
 */
function getRollupObject({minifying, format = "umd"} = {}) {
    const nonMinified = {
        input: "index.js",
        output: {
            format,
            sourcemap: minifying,
            file: `dist/index-${format}${minifying ? ".min" : ""}.js`,
            name: "KldIntersections"
        },
        plugins: [
            babel({
                babelrc: false,
                presets: [
                    ["@babel/env", {modules: false}]
                ]
            }),
            resolve(),
            commonjs()
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    getRollupObject({minifying: true, format: "umd"}),
    getRollupObject({minifying: false, format: "umd"}),
    getRollupObject({minifying: true, format: "esm"}),
    getRollupObject({minifying: false, format: "esm"})
];
