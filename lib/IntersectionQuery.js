/**
 *
 *  IntersectionQuery.js
 *
 *  @copyright 2017 Kevin Lindsey
 *
 */

 if (typeof module !== "undefined") {
    var Vector2D = require('kld-affine').Vector2D;
}

/**
 *
 */
var IntersectionQuery = {};


/**
 *  pointInCircle
 *
 *  @param {Point2D} point
 *  @param {Point2D} center
 *  @param {Number} radius
 *  @return {Boolean}
 */
IntersectionQuery.pointInCircle = function(point, center, radius) {
    var v = Vector2D.fromPoints(center, point);

    return v.length() <= radius;
};


/**
 *  pointInEllipse
 *
 *  @param {Point2D} point
 *  @param {Point2D} center
 *  @param {Number} radiusX
 *  @param {Number} radiusY
 *  @return {Boolean}
 */
IntersectionQuery.pointInEllipse = function(point, center, radiusX, radiusY) {
    var len = point.subtract(center);

    return ( len.x * len.x ) / ( radiusX * radiusX ) + ( len.y * len.y ) / ( radiusY * radiusY ) <= 1;
};


/**
 *  pointInPolyline
 *
 *  @param {Point2D} point
 *  @param {Array<Point2D>} points
 */
IntersectionQuery.pointInPolyline = function(point, points) {
    var length  = points.length;
    var counter = 0;
    var x_inter;

    var p1 = points[0];

    for ( var i = 1; i <= length; i++ ) {
        var p2 = points[i%length];
        var minY = Math.min(p1.y, p2.y);
        var maxY = Math.max(p1.y, p2.y);
        var maxX = Math.max(p1.x, p2.x);

        if ( p1.y != p2.y && minY < point.y && point.y <= maxY && point.x <= maxX ) {
            x_inter = (point.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;

            if ( p1.x == p2.x || point.x <= x_inter ) {
                counter++;
            }
        }

        p1 = p2;
    }

    return ( counter % 2 == 1 );
};


/**
 *  pointInPolyline
 *
 *  @param {Point2D} point
 *  @param {Array<Point2D>} points
 */
IntersectionQuery.pointInPolygon = IntersectionQuery.pointInPolyline;


/**
 *  pointInRectangle
 *
 *  @param {Point2D} point
 *  @param {Point2D} topLeft
 *  @param {Point2D} bottomRight
 *  @return {Boolean}
 */
IntersectionQuery.pointInRectangle = function(point, topLeft, bottomRight) {
    return (
        topLeft.x <= point.x && point.x < bottomRight.x &&
        topLeft.y <= point.y && point.y < bottomRight.y
    );
};


if (typeof module !== "undefined") {
    module.exports = IntersectionQuery;
}
