/**
 *  AffineShapes
 *
 *  @copyright 2017, Kevin Lindsey
 *  @module AffineShapes
 */

import {PathParser} from "kld-path-parser";
import IntersectionArgs from "./IntersectionArgs.js";
import PathHandler from "./PathHandler.js";

/**
 * @namespace
 */
const AffineShapes = {};

/**
 *  quadraticBezier
 *  @param {module:kld-intersections.Point2D} p1
 *  @param {module:kld-intersections.Point2D} p2
 *  @param {module:kld-intersections.Point2D} p3
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.quadraticBezier = function(p1, p2, p3) {
    return new IntersectionArgs("Bezier2", [p1, p2, p3]);
};

/**
 *  cubicBezier
 *
 *  @param {module:kld-intersections.Point2D} p1
 *  @param {module:kld-intersections.Point2D} p2
 *  @param {module:kld-intersections.Point2D} p3
 *  @param {module:kld-intersections.Point2D} p4
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.cubicBezier = function(p1, p2, p3, p4) {
    return new IntersectionArgs("Bezier3", [p1, p2, p3, p4]);
};

/**
 *  circle
 *
 *  @param {module:kld-intersections.Point2D} center
 *  @param {number} radius
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.circle = function(center, radius) {
    return new IntersectionArgs("Circle", [center, radius]);
};

/**
 *  ellipse
 *
 *  @param {module:kld-intersections.Point2D} center
 *  @param {number} radiusX
 *  @param {number} radiusY
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.ellipse = function(center, radiusX, radiusY) {
    return new IntersectionArgs("Ellipse", [center, radiusX, radiusY]);
};

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
AffineShapes.arc = function(center, radiusX, radiusY, startRadians, endRadians) {
    return new IntersectionArgs("Arc", [center, radiusX, radiusY, startRadians, endRadians]);
};

/**
 *  line
 *
 *  @param {module:kld-intersections.Point2D} p1
 *  @param {module:kld-intersections.Point2D} p2
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.line = function(p1, p2) {
    return new IntersectionArgs("Line", [p1, p2]);
};

/**
 *  path
 *
 *  @param {Array<module:kld-intersections.AffineShapes>} segments
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.path = function(segments) {
    return new IntersectionArgs("Path", segments);
};

/**
 *  pathData
 *
 *  @param {string} pathData
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.pathData = function(pathData) {
    // TODO: cache parser and handler
    const parser = new PathParser();
    const handler = new PathHandler();

    parser.setHandler(handler);
    parser.parseData(pathData);

    return AffineShapes.path(handler.shapes);
};

/**
 *  polygon
 *
 *  @param {Array<module:kld-intersections.Point2D>} points
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.polygon = function(points) {
    return new IntersectionArgs("Polygon", [points]);
};

/**
 *  polyline
 *
 *  @param {Array<module:kld-intersections.Point2D>} points
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.polyline = function(points) {
    return new IntersectionArgs("Polyline", [points]);
};

/**
 *  rectangle
 *
 *  @param {module:kld-intersections.Point2D} topLeft
 *  @param {module:kld-intersections.Vector2D} size
 *  @returns {module:kld-intersections.IntersectionArgs}
 */
AffineShapes.rectangle = function(topLeft, size) {
    return new IntersectionArgs("Rectangle", [topLeft, topLeft.add(size)]);
};

export default AffineShapes;
