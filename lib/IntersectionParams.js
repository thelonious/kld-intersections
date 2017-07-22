/**
 *
 *   IntersectionParams.js
 *
 *   copyright 2002, Kevin Lindsey
 *
 */

var Point2D = require('kld-affine').Point2D;

/**
 *  IntersectionParams
 *
 *  @param {String} name
 *  @param {Array<Point2D} params
 *  @returns {IntersectionParams}
 */
function IntersectionParams(name, params) {
    this.init(name, params);
}


/**
 *  init
 *
 *  @param {String} name
 *  @param {Array<Point2D>} params
 */
IntersectionParams.prototype.init = function(name, params) {
    this.name   = name;
    this.params = params;
};


/**
 *  quadraticBezier
 *
 *  @param {Number} p1x
 *  @param {Number} p1y
 *  @param {Number} p2x
 *  @param {Number} p2y
 *  @param {Number} p3x
 *  @param {Number} p3y
 *  @returns {IntersectionParams}
 */
IntersectionParams.quadraticBezier = function(p1x, p1y, p2x, p2y, p3x, p3y) {
    return new IntersectionParams("Bezier2", [
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
 *  @returns {IntersectionParams}
 */
IntersectionParams.cubicBezier = function(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    return new IntersectionParams("Bezier3", [
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
 *  @returns {IntersectionParams}
 */
IntersectionParams.circle = function(centerX, centerY, radius) {
    return new IntersectionParams("Circle", [
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
 *  @returns {IntersectionParams}
 */
IntersectionParams.ellipse = function(centerX, centerY, radiusX, radiusY) {
    return new IntersectionParams("Ellipse", [
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
 *  @returns {IntersectionParams}
 */
IntersectionParams.line = function(p1x, p1y, p2x, p2y) {
    return new IntersectionParams("Line", [
        new Point2D(p1x, p1y),
        new Point2D(p2x, p2y)
    ]);
}


/**
 *  path
 *
 *  @param {Array<IntersectionParams}> segments
 *  @returns {IntersectionParams}
 */
IntersectionParams.path = function(segments) {
    return new IntersectionParams("Path", [segments]);
};


/**
 *  polygon
 *
 *  @param {Array<Point2D}> points
 *  @returns {IntersectionParams}
 */
IntersectionParams.polygon = function(points) {
    return new IntersectionParams("Polygon", [points]);
}


/**
 *  polyline
 *
 *  @param {Array<Point2D}> points
 *  @returns {IntersectionParams}
 */
IntersectionParams.polyline = function(points) {
    return new IntersectionParams("Polyline", [points]);
}


/**
 *  rectangle
 *
 *  @param {Number} x
 *  @param {Number} y
 *  @param {Number} width
 *  @param {Number} height
 *  @returns {IntersectionParams}
 */
IntersectionParams.rectangle = function(x, y, width, height) {
    return new IntersectionParams("Rectangle", [new Point2D(x, y), new Point2D(x + width, y + height)]);
}


if (typeof module !== "undefined") {
    module.exports = IntersectionParams;
}