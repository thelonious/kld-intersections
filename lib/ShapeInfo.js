/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

// import util from "util";
import {Point2D, Vector2D} from "kld-affine";
import {Normalizer} from "kld-data-normalizer";

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
        this.name = name;
        this.args = args;
    }

    static arc(object) {
        return create(ShapeInfo.ARC, object, ["center", "radiusX", "radiusY", "startRadians", "endRadians"]);
    }

    static quadraticBezier(object) {
        return create(ShapeInfo.QUADRATIC_BEZIER, object, ["p1", "p2", "p3"]);
    }

    static cubicBezier(object) {
        return create(ShapeInfo.CUBIC_BEZIER, object, ["p1", "p2", "p3", "p4"]);
    }

    static circle(object) {
        return create(ShapeInfo.CIRCLE, object, ["center", "radius"]);
    }

    static ellipse(object) {
        return create(ShapeInfo.ELLIPSE, object, ["center", "radiusX", "radiusY"]);
    }

    static line(object) {
        return create(ShapeInfo.LINE, object, ["p1", "p2"]);
    }

    static path(object) {
        return create(ShapeInfo.PATH, object, ["segments"]);
    }

    static polygon(object) {
        return create(ShapeInfo.POLYGON, object, ["points"]);
    }

    static polyline(object) {
        return create(ShapeInfo.POLYLINE, object, ["point"]);
    }

    static rectangle(object) {
        return create(ShapeInfo.RECTANGLE, object, ["topLeft", "bottomRight"]);
    }
}

function create(type, object, properties) {
    const data = normalizer.normalize(object, type);

    if (data === undefined) {
        throw new TypeError(`${type} is not in a recognizable format: ${JSON.stringify(object)}`);
    }

    const args = properties.map(name => data[name]);

    return new ShapeInfo(type, args);
}

ShapeInfo.ARC = "Arc";
ShapeInfo.QUADRATIC_BEZIER = "Bezier2";
ShapeInfo.CUBIC_BEZIER = "Bezier3";
ShapeInfo.CIRCLE = "Circle";
ShapeInfo.ELLIPSE = "Ellipse";
ShapeInfo.LINE = "Line";
ShapeInfo.PATH = "Path";
ShapeInfo.POLYGON = "Polygon";
ShapeInfo.POLYLINE = "Polyline";
ShapeInfo.RECTANGLE = "Rectangle";

const normalizer = Normalizer.fromSource(`
type ${ShapeInfo.ARC} = {
    center <= Point2D(x, y) {
        center: { x: number, y: number }
        center: [ number as x, number as y ]
        group {
            cx: number as x
            cy: number as y
        }
        group {
            centerX: number as x
            centerY: number as y
        }
    }
    radiusX {
        rx: number
        radiusX: number
    }
    radiusY {
        ry: number
        radiusY: number
    }
    startRadians: number
    endRadians: number
}
type ${ShapeInfo.QUADRATIC_BEZIER} = {
    p1 <= Point2D(x, y) {
        p1: { x: number, y: number }
        p1: [ number as x, number as y ]
        group {
            p1x: number as x
            p1y: number as y
        }
    }
    p2 <= Point2D(x, y) {
        p2: { x: number, y: number }
        p2: [ number as x, number as y ]
        group {
            p2x: number as x
            p2y: number as y
        }
    }
    p3 <= Point2D(x, y) {
        p3: { x: number, y: number }
        p3: [ number as x, number as y ]
        group {
            p3x: number as x
            p3y: number as y
        }
    }
}
type ${ShapeInfo.CUBIC_BEZIER} = {
    p1 <= Point2D(x, y) {
        p1: { x: number, y: number }
        p1: [ number as x, number as y ]
        group {
            p1x: number as x
            p1y: number as y
        }
    }
    p2 <= Point2D(x, y) {
        p2: { x: number, y: number }
        p2: [ number as x, number as y ]
        group {
            p2x: number as x
            p2y: number as y
        }
    }
    p3 <= Point2D(x, y) {
        p3: { x: number, y: number }
        p3: [ number as x, number as y ]
        group {
            p3x: number as x
            p3y: number as y
        }
    }
    p4 <= Point2D(x, y) {
        p4: { x: number, y: number }
        p4: [ number as x, number as y ]
        group {
            p4x: number as x
            p4y: number as y
        }
    }
}
type ${ShapeInfo.CIRCLE} = {
    center <= Point2D(x, y) {
        center: { x: number, y: number }
        center: [ number as x, number as y ]
        group {
            cx: number as x
            cy: number as y
        }
        group {
            centerX: number as x
            centerY: number as y
        }
    }
    radius {
        r: number
        radius: number
    }
}
type ${ShapeInfo.ELLIPSE} = {
    center <= Point2D(x, y) {
        center: { x: number, y: number }
        center: [ number as x, number as y ]
        group {
            cx: number as x
            cy: number as y
        }
        group {
            centerX: number as x
            centerY: number as y
        }
    }
    radiusX {
        rx: number
        radiusX: number
    }
    radiusY {
        ry: number
        radiusY: number
    }
}
type ${ShapeInfo.LINE} = {
    p1 <= Point2D(x, y) {
        p1: { x: number, y: number }
        p1: [ number as x, number as y]
        group {
            p1x: number as x
            p1y: number as y
        }
    }
    p2 <= Point2D(x, y) {
        p2: { x: number, y: number }
        p2: [ number as x, number as y]
        group {
            p2x: number as x
            p2y: number as y
        }
    }
}
// type ${ShapeInfo.PATH} = {}
type ${ShapeInfo.POLYGON} = {}
type ${ShapeInfo.POLYLINE} = {}
type ${ShapeInfo.RECTANGLE} = {
    topLeft <= Point2D(x, y) {
        topLeft: { x: number, y: number }
        topLeft: [ number as x, number as y]
        group {
            x: number
            y: number
        }
    }
    bottomRight <= Vector2D(x, y) {
        bottomRight: { x: number, y: number }
        bottomRight: [ number as x, number as y]
        group {
            width: number
            height: number
        }
    }
}
`);

// console.log(util.inspect(normalizer.types.Circle, { depth: Infinity, colors: true }));

normalizer.typeCreators.Point2D = (type, args) => new Point2D(args[0], args[1]);
normalizer.typeCreators.Vector2D = (type, args) => new Vector2D(args[0], args[1]);
