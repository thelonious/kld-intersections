/* eslint-disable prefer-rest-params */
/**
 *   AffineShapes
 *
 *   @copyright 2017-2019, Kevin Lindsey
 *   @module AffineShapes
 *   @deprecated use ShapeInfo
 */

import ShapeInfo from "./ShapeInfo.js";

/**
 * Build shapes for intersection
 */
class AffineShapes {
    /**
     *  arc
     *
     *  @deprecated use ShapeInfo.arc
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @param {number} startRadians
     *  @param {number} endRadians
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static arc(center, radiusX, radiusY, startRadians, endRadians) {
        return ShapeInfo.arc(...arguments);
    }

    /**
     *  quadraticBezier
     *
     *   @deprecated use ShapeInfo.quadraticBezier
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
     *  @deprecated use ShapeInfo.cubicBezier
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
     *  @deprecated use ShapeInfo.circle
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
     *  @deprecated use ShapeInfo.ellipse
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
     *  @deprecated use ShapeInfo.line
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
     *  @deprecated use ShapeInfo.path
     *  @param {string} pathData
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static path(pathData) {
        return ShapeInfo.path(...arguments);
    }

    /**
     *  polygon
     *
     *  @deprecated use ShapeInfo.polygon
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polygon(points) {
        return ShapeInfo.polygon(...arguments);
    }

    /**
     *  polyline
     *
     *  @deprecated use ShapeInfo.polyline
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polyline(points) {
        return ShapeInfo.polyline(...arguments);
    }

    /**
     *  rectangle
     *
     *  @deprecated use ShapeInfo.rectangle
     *  @param {module:kld-intersections.Point2D} topLeft
     *  @param {module:kld-intersections.Vector2D} size
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static rectangle(topLeft, size, rx = 0, ry = 0) {
        return ShapeInfo.rectangle(...arguments);
    }
}

export default AffineShapes;
