/**
 *  AffineShapes
 *
 *  @copyright 2017, Kevin Lindsey
 *  @module AffineShapes
 */

import IntersectionArgs from "./IntersectionArgs.js";
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
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static quadraticBezier(p1, p2, p3) {
        return new IntersectionArgs("Bezier2", [p1, p2, p3]);
    }

    /**
     *  cubicBezier
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static cubicBezier(p1, p2, p3, p4) {
        return new IntersectionArgs("Bezier3", [p1, p2, p3, p4]);
    }

    /**
     *  circle
     *
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radius
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static circle(center, radius) {
        return new IntersectionArgs("Circle", [center, radius]);
    }

    /**
     *  ellipse
     *
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static ellipse(center, radiusX, radiusY) {
        return new IntersectionArgs("Ellipse", [center, radiusX, radiusY]);
    }

    /**
     * arc
     *
     * @param {module:kld-intersections.Point2D} center
     * @param {number} radiusX
     * @param {number} radiusY
     * @param {number} startRadians
     * @param {number} endRadians
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static arc(center, radiusX, radiusY, startRadians, endRadians) {
        return new IntersectionArgs("Arc", [center, radiusX, radiusY, startRadians, endRadians]);
    }

    /**
     *  line
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static line(p1, p2) {
        return new IntersectionArgs("Line", [p1, p2]);
    }

    /**
     *  path
     *
     *  @param {Array<module:kld-intersections.AffineShapes>} segments
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
        return Shapes.pathData(pathData);
    }

    /**
     *  polygon
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static polygon(points) {
        return new IntersectionArgs("Polygon", [points]);
    }

    /**
     *  polyline
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static polyline(points) {
        return new IntersectionArgs("Polyline", [points]);
    }

    /**
     *  rectangle
     *
     *  @param {module:kld-intersections.Point2D} topLeft
     *  @param {module:kld-intersections.Vector2D} size
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    static rectangle(topLeft, size, rx = 0, ry = 0) {
        return Shapes.rectangle(topLeft.x, topLeft.y, size.x, size.y, rx, ry);
    }
}

export default AffineShapes;
