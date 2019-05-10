/**
 *  Shapes
 *
 *  @copyright 2017, Kevin Lindsey
 *  @module Shapes
 */

import {Point2D} from "kld-affine";
import {PathParser} from "kld-path-parser";
import PathHandler from "./PathHandler.js";
import IntersectionArgs from "./IntersectionArgs.js";

/**
 * Build shapes for intersection
 */
class Shapes {
    /**
     *  quadraticBezier
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static quadraticBezier(p1x, p1y, p2x, p2y, p3x, p3y) {
        return new IntersectionArgs("Bezier2", [
            new Point2D(p1x, p1y),
            new Point2D(p2x, p2y),
            new Point2D(p3x, p3y)
        ]);
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
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static cubicBezier(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
        return new IntersectionArgs("Bezier3", [
            new Point2D(p1x, p1y),
            new Point2D(p2x, p2y),
            new Point2D(p3x, p3y),
            new Point2D(p4x, p4y)
        ]);
    }

    /**
     *  circle
     *
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radius
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static circle(centerX, centerY, radius) {
        return new IntersectionArgs("Circle", [
            new Point2D(centerX, centerY),
            radius
        ]);
    }

    /**
     *  ellipse
     *
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static ellipse(centerX, centerY, radiusX, radiusY) {
        return new IntersectionArgs("Ellipse", [
            new Point2D(centerX, centerY),
            radiusX,
            radiusY
        ]);
    }

    /**
     * arc
     *
     * @param {number} centerX
     * @param {number} centerY
     * @param {number} radiusX
     * @param {number} radiusY
     * @param {number} startRadians
     * @param {number} endRadians
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static arc(centerX, centerY, radiusX, radiusY, startRadians, endRadians) {
        return new IntersectionArgs("Arc", [
            new Point2D(centerX, centerY),
            radiusX,
            radiusY,
            startRadians,
            endRadians
        ]);
    }

    /**
     *  line
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static line(p1x, p1y, p2x, p2y) {
        return new IntersectionArgs("Line", [
            new Point2D(p1x, p1y),
            new Point2D(p2x, p2y)
        ]);
    }

    /**
     *  path
     *
     *  @param {Array<module:kld-intersections.Shapes>} segments
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static path(segments) {
        return new IntersectionArgs("Path", segments);
    }

    /**
     *  pathData
     *
     *  @param {string} pathData
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static pathData(pathData) {
        // TODO: cache parser and handler
        const parser = new PathParser();
        const handler = new PathHandler();

        parser.setHandler(handler);
        parser.parseData(pathData);

        return Shapes.path(handler.shapes);
    }

    /**
     *  polygon
     *
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static polygon(coords) {
        const points = [];

        for (let i = 0; i < coords.length; i += 2) {
            points.push(new Point2D(coords[i], coords[i + 1]));
        }

        return new IntersectionArgs("Polygon", [points]);
    }

    /**
     *  polyline
     *
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static polyline(coords) {
        const points = [];

        for (let i = 0; i < coords.length; i += 2) {
            points.push(new Point2D(coords[i], coords[i + 1]));
        }

        return new IntersectionArgs("Polyline", [points]);
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
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static rectangle(x, y, width, height, rx = 0, ry = 0) {
        if (rx === 0 && ry === 0) {
            return new IntersectionArgs("Rectangle", [
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

        return Shapes.path(segments);
    }
}

export default Shapes;
