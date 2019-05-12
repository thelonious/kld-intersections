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
     *  @param {Array<module:kld-intersections.Point2D>} args
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    constructor(name, args) {
        if (NAMES.has(name) === false) {
            throw new TypeError(`Unrecognized shape type: '${name}'`);
        }

        this.name = name;
        this.args = args;
    }
}

// Build map of shape name to internal name
const SHAPE_MAP = {
    ARC: "Arc",
    QUADRATIC_BEZIER: "Bezier2",
    CUBIC_BEZIER: "Bezier3",
    CIRCLE: "Circle",
    ELLIPSE: "Ellipse",
    LINE: "Line",
    PATH: "Path",
    POLYGON: "Polygon",
    POLYLINE: "Polyline",
    RECTANGLE: "Rectangle"
};

/* eslint-disable-next-line compat/compat */
const NAMES = new Set(Object.values(SHAPE_MAP));

// attach shape names as constants
/* eslint-disable-next-line guard-for-in */
for (const name in SHAPE_MAP) {
    ShapeInfo[name] = SHAPE_MAP[name];
}
