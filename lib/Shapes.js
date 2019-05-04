/**
 *  Shapes
 *
 *  @copyright 2017, Kevin Lindsey
 */

let Point2D, IntersectionArgs;
if (typeof module !== "undefined") {
    ({Point2D} = require("kld-affine"));
    IntersectionArgs = require("./IntersectionArgs");
}


const Shapes = {};


/**
 *  quadraticBezier
 *
 *  @param {number} p1x
 *  @param {number} p1y
 *  @param {number} p2x
 *  @param {number} p2y
 *  @param {number} p3x
 *  @param {number} p3y
 *  @returns {IntersectionArgs}
 */
Shapes.quadraticBezier = function(p1x, p1y, p2x, p2y, p3x, p3y) {
    return new IntersectionArgs("Bezier2", [
        new Point2D(p1x, p1y),
        new Point2D(p2x, p2y),
        new Point2D(p3x, p3y)
    ]);
};


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
 *  @returns {IntersectionArgs}
 */
Shapes.cubicBezier = function(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    return new IntersectionArgs("Bezier3", [
        new Point2D(p1x, p1y),
        new Point2D(p2x, p2y),
        new Point2D(p3x, p3y),
        new Point2D(p4x, p4y)
    ]);
};


/**
 *  circle
 *
 *  @param {number} centerX
 *  @param {number} centerY
 *  @param {number} radius
 *  @returns {IntersectionArgs}
 */
Shapes.circle = function(centerX, centerY, radius) {
    return new IntersectionArgs("Circle", [
        new Point2D(centerX, centerY),
        radius
    ]);
};


/**
 *  ellipse
 *
 *  @param {number} centerX
 *  @param {number} centerY
 *  @param {number} radiusX
 *  @param {number} radiusY
 *  @returns {IntersectionArgs}
 */
Shapes.ellipse = function(centerX, centerY, radiusX, radiusY) {
    return new IntersectionArgs("Ellipse", [
        new Point2D(centerX, centerY),
        radiusX,
        radiusY
    ]);
};


/**
 *  line
 *
 *  @param {number} p1x
 *  @param {number} p1y
 *  @param {number} p2x
 *  @param {number} p2y
 *  @returns {IntersectionArgs}
 */
Shapes.line = function(p1x, p1y, p2x, p2y) {
    return new IntersectionArgs("Line", [
        new Point2D(p1x, p1y),
        new Point2D(p2x, p2y)
    ]);
};


/**
 *  path
 *
 *  @param {Array<Shapes>} segments
 *  @returns {IntersectionArgs}
 */
Shapes.path = function(segments) {
    return new IntersectionArgs("Path", segments);
};


/**
 *  polygon
 *
 *  @param {Array<number>} coords
 *  @returns {IntersectionArgs}
 */
Shapes.polygon = function(coords) {
    const points = [];

    for (let i = 0; i < coords.length; i += 2) {
        points.push(new Point2D(coords[i], coords[i+1]));
    }

    return new IntersectionArgs("Polygon", [points]);
};


/**
 *  polyline
 *
 *  @param {Array<number>} coords
 *  @returns {IntersectionArgs}
 */
Shapes.polyline = function(coords) {
    const points = [];

    for (let i = 0; i < coords.length; i += 2) {
        points.push(new Point2D(coords[i], coords[i+1]));
    }

    return new IntersectionArgs("Polyline", [points]);
};


/**
 *  rectangle
 *
 *  @param {number} x
 *  @param {number} y
 *  @param {number} width
 *  @param {number} height
 *  @returns {IntersectionArgs}
 */
Shapes.rectangle = function(x, y, width, height) {
    return new IntersectionArgs("Rectangle", [
        new Point2D(x, y),
        new Point2D(x + width, y + height)
    ]);
};


if (typeof module !== "undefined") {
    module.exports = Shapes;
}
