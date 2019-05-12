/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

/**
 *  ShapeInfo
 *  @memberof module:kld-intersections
 */
export default class ShapeInfo {
    /**
     *  @param {string} name
     *  @param {Array} args
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    constructor(name, args) {
        if (NAMES.has(name) === false) {
            throw new TypeError(`Unrecognized shape type: '${name}'`);
        }
        if (ARG_COUNTS[name] !== -1 && ARG_COUNTS[name] !== args.length) {
            throw new RangeError(`expected ${ARG_COUNTS[name]} arguments, found ${args.length}`);
        }

        this.name = name;
        this.args = args;
    }
}

// Build map of shape name to internal name
const SHAPE_MAP = {
    ARC: {name: "Arc", argCount: 5},
    QUADRATIC_BEZIER: {name: "Bezier2", argCount: 3},
    CUBIC_BEZIER: {name: "Bezier3", argCount: 4},
    CIRCLE: {name: "Circle", argCount: 2},
    ELLIPSE: {name: "Ellipse", argCount: 3},
    LINE: {name: "Line", argCount: 2},
    PATH: {name: "Path", argCount: -1},
    POLYGON: {name: "Polygon", argCount: -1},
    POLYLINE: {name: "Polyline", argCount: -1},
    RECTANGLE: {name: "Rectangle", argCount: 2}
};
const ARG_COUNTS = {};
/* eslint-disable-next-line compat/compat */
const NAMES = new Set();

/* eslint-disable-next-line guard-for-in */
for (const name in SHAPE_MAP) {
    const info = SHAPE_MAP[name];

    // attach shape names as constants
    ShapeInfo[name] = info.name;

    // make argument count list for args sanity check in constructor
    ARG_COUNTS[info.name] = info.argCount;

    // make name list for runtime validation of names passed into constructor
    NAMES.add(info.name);
}
