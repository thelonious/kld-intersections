/* eslint-disable prefer-rest-params */
/**
 *  Shapes
 *
 *  @copyright 2017, Kevin Lindsey
 *  @module Shapes
 */

import {Point2D} from "kld-affine";
import ShapeInfo from "./ShapeInfo.js";

/**
 * Build shapes for intersection
 */
class Shapes {
    /**
     * arc
     *
     * @param {number} centerX
     * @param {number} centerY
     * @param {number} radiusX
     * @param {number} radiusY
     * @param {number} startRadians
     * @param {number} endRadians
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static arc(centerX, centerY, radiusX, radiusY, startRadians, endRadians) {
        return ShapeInfo.arc(...arguments);
    }

    /**
     *  quadraticBezier
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static quadraticBezier(p1x, p1y, p2x, p2y, p3x, p3y) {
        return ShapeInfo.quadraticBezier(...arguments);
    }

    /**
     *  cubicBezier
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @param {number} p4x
     *  @param {number} p4y
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static cubicBezier(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
        return ShapeInfo.cubicBezier(...arguments);
    }

    /**
     *  circle
     *
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radius
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static circle(centerX, centerY, radius) {
        return ShapeInfo.circle(...arguments);
    }

    /**
     *  ellipse
     *
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static ellipse(centerX, centerY, radiusX, radiusY) {
        return ShapeInfo.ellipse(...arguments);
    }

    /**
     *  line
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static line(p1x, p1y, p2x, p2y) {
        return ShapeInfo.line(...arguments);
    }

    /**
     *  path
     *
     *  @param {string} pathData
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static path(pathData) {
        return ShapeInfo.path(...arguments);
    }

    /**
     *  polygon
     *
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polygon(coords) {
        return ShapeInfo.polygon(...arguments);
    }

    /**
     *  polyline
     *
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polyline(coords) {
        return ShapeInfo.polyline(...arguments);
    }

    /**
     *  rectangle
     *
     *  @param {number} x
     *  @param {number} y
     *  @param {number} width
     *  @param {number} height
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static rectangle(x, y, width, height, rx = 0, ry = 0) {
        if (isNaN(x)) {
            throw TypeError(`Expected x to be a number, but found ${x}`);
        }
        if (isNaN(y)) {
            throw TypeError(`Expected y to be a number, but found ${y}`);
        }
        if (isNaN(width)) {
            throw TypeError(`Expected width to be a number, but found ${width}`);
        }
        if (isNaN(height)) {
            throw TypeError(`Expected height to be a number, but found ${height}`);
        }
        if (isNaN(rx)) {
            throw TypeError(`Expected rx to be a number, but found ${rx}`);
        }
        if (isNaN(ry)) {
            throw TypeError(`Expected ry to be a number, but found ${ry}`);
        }

        if (rx === 0 && ry === 0) {
            return new ShapeInfo(ShapeInfo.RECTANGLE, [
                new Point2D(x, y),
                new Point2D(x + width, y + height)
            ]);
        }

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

        const x0 = x;
        const y0 = y;
        const x1 = x + rx;
        const y1 = y + ry;
        const x2 = x + width - rx;
        const y2 = y + height - ry;
        const x3 = x + width;
        const y3 = y + height;

        const degree90 = Math.PI * 0.5;
        const segments = [];

        segments.push(Shapes.arc(x1, y1, rx, ry, 2 * degree90, 3 * degree90));
        segments.push(Shapes.line(x1, y0, x2, y0));
        segments.push(Shapes.arc(x2, y1, rx, ry, 3 * degree90, 4 * degree90));
        segments.push(Shapes.line(x3, y1, x3, y2));
        segments.push(Shapes.arc(x2, y2, rx, ry, 0, degree90));
        segments.push(Shapes.line(x2, y3, x1, y3));
        segments.push(Shapes.arc(x1, y2, rx, ry, degree90, 2 * degree90));
        segments.push(Shapes.line(x0, y2, x0, y1));

        return ShapeInfo(ShapeInfo.PATH, segments);
    }
}

export default Shapes;
