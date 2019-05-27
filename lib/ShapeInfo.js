/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

import {Point2D} from "kld-affine";
import {Transformer, FAILURE_VALUE} from "gp-data-transformer";
import {PathParser} from "kld-path-parser";
import PathHandler from "./PathHandler.js";
import transformSource from "./TransformSource.js";

const degree90 = Math.PI * 0.5;

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

    static arc(...args) {
        return create(ShapeInfo.ARC, args, ["center", "radiusX", "radiusY", "startRadians", "endRadians"]);
    }

    static quadraticBezier(...args) {
        return create(ShapeInfo.QUADRATIC_BEZIER, args, ["p1", "p2", "p3"]);
    }

    static cubicBezier(...args) {
        return create(ShapeInfo.CUBIC_BEZIER, args, ["p1", "p2", "p3", "p4"]);
    }

    static circle(...args) {
        return create(ShapeInfo.CIRCLE, args, ["center", "radius"]);
    }

    static ellipse(...args) {
        return create(ShapeInfo.ELLIPSE, args, ["center", "radiusX", "radiusY"]);
    }

    static line(...args) {
        return create(ShapeInfo.LINE, args, ["p1", "p2"]);
    }

    static path(...args) {
        return create(ShapeInfo.PATH, args, ["segments"]);
    }

    static polygon(...args) {
        return create(ShapeInfo.POLYGON, args, ["points"]);
    }

    static polyline(...args) {
        return create(ShapeInfo.POLYLINE, args, ["points"]);
    }

    static rectangle(...args) {
        const result = create(ShapeInfo.RECTANGLE, args, ["topLeft", "bottomRight", "rx", "ry"]);

        let ry = result.args.pop();
        let rx = result.args.pop();

        rx = rx === undefined ? 0 : rx;
        ry = ry === undefined ? 0 : ry;

        if (rx === 0 && ry === 0) {
            return result;
        }

        const {x: p1x, y: p1y} = result.args[0];
        const {x: p2x, y: p2y} = result.args[1];
        const width = p2x - p1x;
        const height = p2y - p1y;

        if (rx === 0) {
            rx = ry;
        }
        if (ry === 0) {
            ry = rx;
        }
        if (rx > width * 0.5) {
            rx = width * 0.5;
        }
        if (ry > height * 0.5) {
            ry = height * 0.5;
        }

        const x0 = p1x;
        const y0 = p1y;
        const x1 = p1x + rx;
        const y1 = p1y + ry;
        const x2 = p2x - rx;
        const y2 = p2y - ry;
        const x3 = p2x;
        const y3 = p2y;

        const segments = [
            ShapeInfo.arc(x1, y1, rx, ry, 2 * degree90, 3 * degree90),
            ShapeInfo.line(x1, y0, x2, y0),
            ShapeInfo.arc(x2, y1, rx, ry, 3 * degree90, 4 * degree90),
            ShapeInfo.line(x3, y1, x3, y2),
            ShapeInfo.arc(x2, y2, rx, ry, 0, degree90),
            ShapeInfo.line(x2, y3, x1, y3),
            ShapeInfo.arc(x1, y2, rx, ry, degree90, 2 * degree90),
            ShapeInfo.line(x0, y2, x0, y1)
        ];

        return new ShapeInfo(ShapeInfo.PATH, segments);
    }
}

/**
 * Create a shape
 *
 * @param {string} type
 * @param {Object} object
 * @param {Array<string>} properties
 * @returns {ShapeInfo}
 */
function create(type, object, properties) {
    let transformType;

    if (object.length === 1) {
        object = object[0];

        transformType = Array.isArray(object) || typeof object === "string"
            ? type + "Args"
            : type;
    }
    else {
        transformType = type + "Args";
    }

    // normalize the data
    const data = transformer.execute(transformType, object);

    if (data === FAILURE_VALUE) {
        // for (const message of transformer.messages) {
        //     console.log(message);
        // }

        throw new TypeError(`${type} is not in a recognizable format: ${JSON.stringify(object)}`);
    }

    // pull out the arguments
    const args = properties.length === 1
        ? data[properties[0]]
        : properties.map(name => data[name]);

    // return a new ShapeInfo
    return new ShapeInfo(type, args);
}

// define shape name constants
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

// create shape argument normalizer
const transformer = new Transformer();
transformer.execute(transformSource);

// attach custom generators
transformer.addFunction("Point2D", (x, y) => new Point2D(x, y));
transformer.addFunction("PathData", pathData => {
    const parser = new PathParser();
    const handler = new PathHandler(ShapeInfo);

    parser.setHandler(handler);
    parser.parseData(pathData);

    return handler.shapes;
});
