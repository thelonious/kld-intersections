/**
 *
 *  IntersectionQuery.js
 *
 *  @copyright 2017 Kevin Lindsey
 * @module IntersectionQuery
 */

import {Vector2D} from "kld-affine";

/**
 * @namespace
 */
const IntersectionQuery = {};


/**
 *  pointInCircle
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {module:kld-intersections.Point2D} center
 *  @param {number} radius
 *  @returns {boolean}
 */
IntersectionQuery.pointInCircle = function(point, center, radius) {
    const v = Vector2D.fromPoints(center, point);

    return v.length() <= radius;
};


/**
 *  pointInEllipse
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {module:kld-intersections.Point2D} center
 *  @param {number} radiusX
 *  @param {number} radiusY
 *  @returns {boolean}
 */
IntersectionQuery.pointInEllipse = function(point, center, radiusX, radiusY) {
    const len = point.subtract(center);

    return (len.x * len.x) / (radiusX * radiusX) + (len.y * len.y) / (radiusY * radiusY) <= 1;
};


/**
 *  pointInPolyline
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {Array<module:kld-intersections.Point2D>} points
 */
IntersectionQuery.pointInPolyline = function(point, points) {
    const {length: len} = points;
    let counter = 0;
    let xInter;

    let p1 = points[0];

    for (let i = 1; i <= len; i++) {
        const p2 = points[i % len];
        const minY = Math.min(p1.y, p2.y);
        const maxY = Math.max(p1.y, p2.y);
        const maxX = Math.max(p1.x, p2.x);

        if (p1.y !== p2.y && minY < point.y && point.y <= maxY && point.x <= maxX) {
            xInter = (point.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;

            if (p1.x === p2.x || point.x <= xInter) {
                counter++;
            }
        }

        p1 = p2;
    }

    return (counter % 2 === 1);
};


/**
 *  pointInPolyline
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {Array<module:kld-intersections.Point2D>} points
 */
IntersectionQuery.pointInPolygon = IntersectionQuery.pointInPolyline;


/**
 *  pointInRectangle
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {module:kld-intersections.Point2D} topLeft
 *  @param {module:kld-intersections.Point2D} bottomRight
 *  @returns {boolean}
 */
IntersectionQuery.pointInRectangle = function(point, topLeft, bottomRight) {
    return (
        topLeft.x <= point.x && point.x < bottomRight.x &&
        topLeft.y <= point.y && point.y < bottomRight.y
    );
};


export default IntersectionQuery;
