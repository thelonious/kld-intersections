/**
 *  AffineShapes
 *
 *  @copyright 2017, Kevin Lindsey
 */

if (typeof module !== "undefined") {
    var Point2D = require('kld-affine').Point2D,
        IntersectionArgs = require('./IntersectionArgs');
}


var AffineShapes = {};


/**
 *  quadraticBezier
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @returns {IntersectionArgs}
 */
AffineShapes.quadraticBezier = function(p1, p2, p3) {
    return new IntersectionArgs("Bezier2", [p1, p2, p3]);
}


/**
 *  cubicBezier
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p4
 *  @returns {IntersectionArgs}
 */
AffineShapes.cubicBezier = function(p1, p2, p3, p4) {
    return new IntersectionArgs("Bezier3", [p1, p2, p3, p4]);
}


/**
 *  circle
 *
 *  @param {Point2D} center
 *  @param {Number} radius
 *  @returns {IntersectionArgs}
 */
AffineShapes.circle = function(center, radius) {
    return new IntersectionArgs("Circle", [center, radius]);
}


/**
 *  ellipse
 *
 *  @param {Point2D} center
 *  @param {Number} radiusX
 *  @param {Number} radiusY
 *  @returns {IntersectionArgs}
 */
AffineShapes.ellipse = function(center, radiusX, radiusY) {
    return new IntersectionArgs("Ellipse", [center, radiusX, radiusY]);
}


/**
 *  line
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @returns {IntersectionArgs}
 */
AffineShapes.line = function(p1, p2) {
    return new IntersectionArgs("Line", [p1, p2]);
}


/**
 *  path
 *
 *  @param {Array<AffineShapes}> segments
 *  @returns {IntersectionArgs}
 */
AffineShapes.path = function(segments) {
    return new IntersectionArgs("Path", [segments]);
};


/**
 *  polygon
 *
 *  @param {Array<Point2D}> points
 *  @returns {IntersectionArgs}
 */
AffineShapes.polygon = function(points) {
    return new IntersectionArgs("Polygon", [points]);
}


/**
 *  polyline
 *
 *  @param {Array<Point2D}> points
 *  @returns {IntersectionArgs}
 */
AffineShapes.polyline = function(points) {
    return new IntersectionArgs("Polyline", [points]);
}


/**
 *  rectangle
 *
 *  @param {Point2D} topLeft
 *  @param {Vector2D} size
 *  @returns {IntersectionArgs}
 */
AffineShapes.rectangle = function(topLeft, size) {
    return new IntersectionArgs("Rectangle", [topLeft, topLeft.add(size)]);
}


if (typeof module !== "undefined") {
    module.exports = AffineShapes;
}
