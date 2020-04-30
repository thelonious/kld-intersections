/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

import {Point2D} from "kld-affine";
import {PathParser} from "kld-path-parser";
import PathHandler from "./PathHandler.js";

const degree90 = Math.PI * 0.5;
const parser = new PathParser();


/**
 * getValues
 *
 * @param {Array} types
 * @param {Array} args
 * @returns {Array}
 */
export function getValues(types, args) {
    const result = [];

    for (const [names, type] of types) {
        let value = null;

        if (type === "Point2D") {
            value = parsePoint(names, args);
        }
        else if (type === "Number") {
            value = parseNumber(names, args);
        }
        else if (type === "Array<Point2D>" || type === "Point2D[]") {
            const values = [];

            while (args.length > 0) {
                values.push(parsePoint(names, args));
            }

            if (values.length > 0) {
                value = values;
            }
        }
        else if (type === "Optional<Number>" || type === "Number?") {
            value = parseNumber(names, args);

            if (value === null) {
                value = undefined;
            }
        }
        else {
            throw new TypeError(`Unrecognized value type: ${type}`);
        }

        if (value !== null) {
            result.push(value);
        }
        else {
            throw new TypeError(`Unable to extract value for ${names}`);
        }
    }

    return result;
}

/**
 * parseNumber
 *
 * @param {Array} names
 * @param {Array} args
 * @returns {number}
 */
export function parseNumber(names, args) {
    let result = null;

    if (args.length > 0) {
        const item = args[0];
        const itemType = typeof item;

        if (itemType === "number") {
            return args.shift();
        }
        else if (itemType === "object") {
            for (const prop of names) {
                if (prop in item && typeof item[prop] === "number") {
                    result = item[prop];
                    break;
                }
            }
        }
    }

    return result;
}

/**
 * parsePoint
 *
 * @param {Array} names
 * @param {Array} args
 * @returns {Array}
 */
export function parsePoint(names, args) {
    let result = null;

    if (args.length > 0) {
        const item = args[0];
        const itemType = typeof item;

        if (itemType === "number") {
            if (args.length > 1) {
                const x = args.shift();
                const y = args.shift();

                result = new Point2D(x, y);
            }
        }
        else if (Array.isArray(item) && item.length > 1) {
            if (item.length === 2) {
                const [x, y] = args.shift();

                result = new Point2D(x, y);
            }
            else {
                throw new TypeError(`Unhandled array of length ${item.length}`);
            }
        }
        else if (itemType === "object") {
            if ("x" in item && "y" in item) {
                result = new Point2D(item.x, item.y);
                args.shift();
            }
            else {
                for (const props of names) {
                    if (Array.isArray(props)) {
                        if (props.every(p => p in item)) {
                            result = new Point2D(item[props[0]], item[props[1]]);
                            break;
                        }
                    }
                    else if (props in item) {
                        result = parsePoint([], [item[props]]);
                        break;
                    }
                }
            }
        }
    }

    return result;
}

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
        const types = [
            [["center", ["centerX", "centerY"], ["cx", "cy"]], "Point2D"],
            [["radiusX", "rx"], "Number"],
            [["radiusY", "ry"], "Number"],
            [["startRadians"], "Number"],
            [["endRadians"], "Number"]
        ];
        const values = getValues(types, args);

        return new ShapeInfo(ShapeInfo.ARC, values);
    }

    static quadraticBezier(...args) {
        const types = [
            [["p1", ["p1x", "p1y"]], "Point2D"],
            [["p2", ["p2x", "p2y"]], "Point2D"],
            [["p3", ["p3x", "p3y"]], "Point2D"]
        ];
        const values = getValues(types, args);

        return new ShapeInfo(ShapeInfo.QUADRATIC_BEZIER, values);
    }

    static cubicBezier(...args) {
        const types = [
            [["p1", ["p1x", "p1y"]], "Point2D"],
            [["p2", ["p2x", "p2y"]], "Point2D"],
            [["p3", ["p3x", "p3y"]], "Point2D"],
            [["p4", ["p4x", "p4y"]], "Point2D"]
        ];
        const values = getValues(types, args);

        return new ShapeInfo(ShapeInfo.CUBIC_BEZIER, values);
    }

    static circle(...args) {
        const types = [
            [["center", ["centerX", "centerY"], ["cx", "cy"]], "Point2D"],
            [["radius", "r"], "Number"]
        ];
        const values = getValues(types, args);

        return new ShapeInfo(ShapeInfo.CIRCLE, values);
    }

    static ellipse(...args) {
        const types = [
            [["center", ["centerX", "centerY"], ["cx", "cy"]], "Point2D"],
            [["radiusX", "rx"], "Number"],
            [["radiusY", "ry"], "Number"]
        ];
        const values = getValues(types, args);

        return new ShapeInfo(ShapeInfo.ELLIPSE, values);
    }

    static line(...args) {
        const types = [
            [["p1", ["p1x", "p1y"], ["x1", "y1"]], "Point2D"],
            [["p2", ["p2x", "p2y"], ["x2", "y2"]], "Point2D"]
        ];
        const values = getValues(types, args);

        return new ShapeInfo(ShapeInfo.LINE, values);
    }

    static path(...args) {
        parser.parseData(args[0]);

        return new ShapeInfo(ShapeInfo.PATH, handler.shapes);
    }

    static polygon(...args) {
        const types = [
            [[], "Array<Point2D>"]
        ];
        const values = getValues(
            types,
            args.length === 1 && Array.isArray(args[0]) ? args[0] : args
        );

        return new ShapeInfo(ShapeInfo.POLYGON, values);
    }

    static polyline(...args) {
        const types = [
            [[], "Array<Point2D>"]
        ];
        const values = getValues(
            types,
            args.length === 1 && Array.isArray(args[0]) ? args[0] : args
        );

        return new ShapeInfo(ShapeInfo.POLYLINE, values);
    }

    static rectangle(...args) {
        const types = [
            [["topLeft", ["x", "y"], ["left", "top"]], "Point2D"],
            [["size", ["width", "height"], ["w", "h"]], "Point2D"],
            [["radiusX", "rx"], "Optional<Number>"],
            [["radiusY", "ry"], "Optional<Number>"]
        ];
        const values = getValues(types, args);

        // fix up bottom-right point
        const p1 = values[0];
        const p2 = values[1];
        values[1] = new Point2D(p1.x + p2.x, p1.y + p2.y);

        // create shape info
        const result = new ShapeInfo(ShapeInfo.RECTANGLE, values);

        // handle possible rounded rectangle values
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

// setup path parser handler after ShapeInfo has been defined
const handler = new PathHandler(ShapeInfo);

parser.setHandler(handler);
