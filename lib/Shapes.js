/* eslint-disable prefer-rest-params */
/**
 *  Shapes
 *
 *   @copyright 2017, Kevin Lindsey
 *   @module Shapes
 *   @deprecated use ShapeInfo
 */

import ShapeInfo from "./ShapeInfo.js";

/**
 * Build shapes for intersection
 */
class Shapes {
    /**
     *  arc
     *
     *  @deprecated use ShapeInfo.arc
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @param {number} startRadians
     *  @param {number} endRadians
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static arc(centerX, centerY, radiusX, radiusY, startRadians, endRadians) {
        return ShapeInfo.arc(...arguments);
    }

    /**
     *  quadraticBezier
     *
     *  @deprecated use ShapeInfo.quadraticBezier
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
     *  @deprecated use ShapeInfo.cubicBezier
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
     *  @deprecated use ShapeInfo.circle
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
     *  @deprecated use ShapeInfo.ellipse
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
     *  @deprecated use ShapeInfo.line
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
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polygon(coords) {
        return ShapeInfo.polygon(...arguments);
    }

    /**
     *  polyline
     *
     *  @deprecated use ShapeInfo.polyline
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static polyline(coords) {
        return ShapeInfo.polyline(...arguments);
    }

    /**
     *  rectangle
     *
     *  @deprecated use ShapeInfo.rectangle
     *  @param {number} x
     *  @param {number} y
     *  @param {number} width
     *  @param {number} height
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    static rectangle(x, y, width, height, rx = 0, ry = 0) {
        return ShapeInfo.rectangle(...arguments);
    }
}

export default Shapes;
