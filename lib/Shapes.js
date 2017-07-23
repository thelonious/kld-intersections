/**
 *  Shapes
 *
 *  @copyright 2017, Kevin Lindsey
 */


if (typeof module !== "undefined") {
    var Point2D = require('kld-affine').Point2D,
        IntersectionArgs = require('./IntersectionArgs');
}


var Shapes = {};


/**
 *  quadraticBezier
 *
 *  @param {Number} p1x
 *  @param {Number} p1y
 *  @param {Number} p2x
 *  @param {Number} p2y
 *  @param {Number} p3x
 *  @param {Number} p3y
 *  @returns {IntersectionArgs}
 */
Shapes.quadraticBezier = function(p1x, p1y, p2x, p2y, p3x, p3y) {
    return new IntersectionArgs("Bezier2", [
        new Point2D(p1x, p1y),
        new Point2D(p2x, p2y),
        new Point2D(p3x, p3y)
    ]);
}


/**
 *  cubicBezier
 *
 *  @param {Number} p1x
 *  @param {Number} p1y
 *  @param {Number} p2x
 *  @param {Number} p2y
 *  @param {Number} p3x
 *  @param {Number} p3y
 *  @param {Number} p4x
 *  @param {Number} p4y
 *  @returns {IntersectionArgs}
 */
Shapes.cubicBezier = function(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
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
 *  @param {Number} centerX
 *  @param {Number} centerY
 *  @param {Number} radius
 *  @returns {IntersectionArgs}
 */
Shapes.circle = function(centerX, centerY, radius) {
    return new IntersectionArgs("Circle", [
        new Point2D(centerX, centerY),
        radius
    ]);
}


/**
 *  ellipse
 *
 *  @param {Number} centerX
 *  @param {Number} centerY
 *  @param {Number} radiusX
 *  @param {Number} radiusY
 *  @returns {IntersectionArgs}
 */
Shapes.ellipse = function(centerX, centerY, radiusX, radiusY) {
    return new IntersectionArgs("Ellipse", [
        new Point2D(centerX, centerY),
        radiusX,
        radiusY
    ]);
}


/**
 *  line
 *
 *  @param {Number} p1x
 *  @param {Number} p1y
 *  @param {Number} p2x
 *  @param {Number} p2y
 *  @returns {IntersectionArgs}
 */
Shapes.line = function(p1x, p1y, p2x, p2y) {
    return new IntersectionArgs("Line", [
        new Point2D(p1x, p1y),
        new Point2D(p2x, p2y)
    ]);
}


/**
 *  path
 *
 *  @param {Array<Shapes}> segments
 *  @returns {IntersectionArgs}
 */
Shapes.path = function(segments) {
    return new IntersectionArgs("Path", segments);
};


/**
 *  polygon
 *
 *  @param {Array<Number}> coords
 *  @returns {IntersectionArgs}
 */
Shapes.polygon = function(coords) {
    var points = [];

    for (var i = 0; i < coords.length ; i += 2) {
        points.push(new Point2D(coords[i], coords[i+1]));
    }

    return new IntersectionArgs("Polygon", [points]);
}


/**
 *  polyline
 *
 *  @param {Array<Number}> coords
 *  @returns {IntersectionArgs}
 */
Shapes.polyline = function(coords) {
    var points = [];

    for (var i = 0; i < coords.length ; i += 2) {
        points.push(new Point2D(coords[i], coords[i+1]));
    }

    return new IntersectionArgs("Polyline", [points]);
}


/**
 *  rectangle
 *
 *  @param {Number} x
 *  @param {Number} y
 *  @param {Number} width
 *  @param {Number} height
 *  @returns {IntersectionArgs}
 */
Shapes.rectangle = function(x, y, width, height) {
    return new IntersectionArgs("Rectangle", [
        new Point2D(x, y),
        new Point2D(x + width, y + height)
    ]);
}


if (typeof module !== "undefined") {
    module.exports = Shapes;
}
