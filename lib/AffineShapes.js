/* eslint-disable prefer-rest-params */
/**
 *  AffineShapes
 *
 *  @copyright 2017-2019, Kevin Lindsey
 *  @module AffineShapes
 */

import ShapeInfo from "./ShapeInfo.js";

/**
 * Build shapes for intersection
 */
class AffineShapes {
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
        return ShapeInfo.arc(...arguments);
    }

    /**
     *  quadraticBezier
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static quadraticBezier(p1, p2, p3) {
        return ShapeInfo.quadraticBezier(...arguments);
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
        return ShapeInfo.cubicBezier(...arguments);
    }

    /**
     *  circle
     *
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radius
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static circle(center, radius) {
        return ShapeInfo.circle(...arguments);
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
        return ShapeInfo.ellipse(...arguments);
    }

    /**
     *  line
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static line(p1, p2) {
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
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polygon(points) {
        return ShapeInfo.polygon(...arguments);
    }

    /**
     *  polyline
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polyline(points) {
        return ShapeInfo.polyline(...arguments);
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
        return ShapeInfo.rectangle(topLeft.x, topLeft.y, size.x, size.y);
    }
}

export default AffineShapes;
