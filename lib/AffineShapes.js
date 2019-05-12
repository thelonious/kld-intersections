/* eslint-disable no-restricted-syntax */
/**
 *  AffineShapes
 *
 *  @copyright 2017-2019, Kevin Lindsey
 *  @module AffineShapes
 */

import {Point2D, Vector2D} from "kld-affine";
import ShapeInfo from "./ShapeInfo.js";
import Shapes from "./Shapes.js";

/**
 * Build shapes for intersection
 */
class AffineShapes {
    /**
     *  quadraticBezier
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static quadraticBezier(p1, p2, p3) {
        if (p1 instanceof Point2D === false) {
            throw TypeError(`Expected p1 to be a Point2D, but found ${p1}`);
        }
        if (p2 instanceof Point2D === false) {
            throw TypeError(`Expected p2 to be a Point2D, but found ${p2}`);
        }
        if (p3 instanceof Point2D === false) {
            throw TypeError(`Expected p3 to be a Point2D, but found ${p3}`);
        }

        return new ShapeInfo("Bezier2", [p1, p2, p3]);
    }

    /**
     *  cubicBezier
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static cubicBezier(p1, p2, p3, p4) {
        if (p1 instanceof Point2D === false) {
            throw TypeError(`Expected p1 to be a Point2D, but found ${p1}`);
        }
        if (p2 instanceof Point2D === false) {
            throw TypeError(`Expected p2 to be a Point2D, but found ${p2}`);
        }
        if (p3 instanceof Point2D === false) {
            throw TypeError(`Expected p3 to be a Point2D, but found ${p3}`);
        }
        if (p4 instanceof Point2D === false) {
            throw TypeError(`Expected p4 to be a Point2D, but found ${p4}`);
        }

        return new ShapeInfo("Bezier3", [p1, p2, p3, p4]);
    }

    /**
     *  circle
     *
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radius
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static circle(center, radius) {
        if (center instanceof Point2D === false) {
            throw TypeError(`Expected center to be a Point2D, but found ${center}`);
        }
        if (isNaN(radius)) {
            throw TypeError(`Expected radius to be a number, but found ${radius}`);
        }

        return new ShapeInfo("Circle", [center, radius]);
    }

    /**
     *  ellipse
     *
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static ellipse(center, radiusX, radiusY) {
        if (center instanceof Point2D === false) {
            throw TypeError(`Expected center to be a Point2D, but found ${center}`);
        }
        if (isNaN(radiusX)) {
            throw TypeError(`Expected radiusX to be a number, but found ${radiusX}`);
        }
        if (isNaN(radiusY)) {
            throw TypeError(`Expected radiusY to be a number, but found ${radiusY}`);
        }

        return new ShapeInfo("Ellipse", [center, radiusX, radiusY]);
    }

    /**
     * arc
     *
     * @param {module:kld-intersections.Point2D} center
     * @param {number} radiusX
     * @param {number} radiusY
     * @param {number} startRadians
     * @param {number} endRadians
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static arc(center, radiusX, radiusY, startRadians, endRadians) {
        if (center instanceof Point2D === false) {
            throw TypeError(`Expected center to be a Point2D, but found ${center}`);
        }
        if (isNaN(radiusX)) {
            throw TypeError(`Expected radiusX to be a number, but found ${radiusX}`);
        }
        if (isNaN(radiusY)) {
            throw TypeError(`Expected radiusY to be a number, but found ${radiusY}`);
        }
        if (isNaN(startRadians)) {
            throw TypeError(`Expected startRadians to be a number, but found ${startRadians}`);
        }
        if (isNaN(endRadians)) {
            throw TypeError(`Expected endRadians to be a number, but found ${endRadians}`);
        }

        return new ShapeInfo("Arc", [center, radiusX, radiusY, startRadians, endRadians]);
    }

    /**
     *  line
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static line(p1, p2) {
        if (p1 instanceof Point2D === false) {
            throw TypeError(`Expected p1 to be a Point2D, but found ${p1}`);
        }
        if (p2 instanceof Point2D === false) {
            throw TypeError(`Expected p2 to be a Point2D, but found ${p2}`);
        }

        return new ShapeInfo("Line", [p1, p2]);
    }

    /**
     *  path
     *
     *  @param {Array<module:kld-intersections.AffineShapes>} segments
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static path(segments) {
        return new ShapeInfo("Path", segments);
    }

    /**
     *  pathData
     *
     *  @param {string} pathData
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static pathData(pathData) {
        return Shapes.pathData(pathData);
    }

    /**
     *  polygon
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polygon(points) {
        /* eslint-disable-next-line compat/compat */
        if (Array.isArray(points) === false) {
            throw TypeError(`Expected points to be an Array, but found ${points}`);
        }
        if (points.some(p => p instanceof Point2D === false)) {
            throw TypeError("Expected all members of points to be Point2Ds");
        }

        return new ShapeInfo("Polygon", [points]);
    }

    /**
     *  polyline
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polyline(points) {
        if (points.some(p => p instanceof Point2D === false)) {
            throw TypeError("Expected all members of points to be Point2Ds");
        }

        return new ShapeInfo("Polyline", [points]);
    }

    /**
     *  rectangle
     *
     *  @param {module:kld-intersections.Point2D} topLeft
     *  @param {module:kld-intersections.Vector2D} size
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static rectangle(topLeft, size, rx = 0, ry = 0) {
        if (topLeft instanceof Point2D === false) {
            throw TypeError(`Expected topLeft to be a Point2D, but found ${topLeft}`);
        }
        if (size instanceof Vector2D === false) {
            throw TypeError(`Expected size to be a Vector2D, but found ${size}`);
        }
        if (isNaN(rx)) {
            throw TypeError(`Expected rx to be a number, but found ${rx}`);
        }
        if (isNaN(ry)) {
            throw TypeError(`Expected ry to be a number, but found ${ry}`);
        }

        return Shapes.rectangle(topLeft.x, topLeft.y, size.x, size.y, rx, ry);
    }
}

export default AffineShapes;
