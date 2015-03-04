/**
 *
 *   IntersectionParams.js
 *
 *   copyright 2002, Kevin Lindsey
 *
 */

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

!function () {
    IntersectionParams.TYPE = {};
    var t = IntersectionParams.TYPE;
    var d = Object.defineProperty;

    d(t, 'LINE', { value: 'Line' });
    d(t, 'RECT', { value: 'Rectangle' });
    d(t, 'ROUNDRECT', { value: 'RoundRectangle' });
    d(t, 'CIRCLE', { value: 'Circle' });
    d(t, 'ELLIPSE', { value: 'Ellipse' });
    d(t, 'POLYGON', { value: 'Polygon' });
    d(t, 'POLYLINE', { value: 'Polyline' });
    d(t, 'PATH', { value: 'Path' });
    d(t, 'ARC', { value: 'Arc' });
    d(t, 'BEZIER2', { value: 'Bezier2' });
    d(t, 'BEZIER3', { value: 'Bezier3' });
}();

/**
 *  init
 *
 *  @param {String} name
 *  @param {Array<Point2D>} params
 */
IntersectionParams.prototype.init = function(name, params) {
    this.name   = name;
    this.params = params;
    this.meta = {};
};

if (typeof module !== "undefined") {
    module.exports = IntersectionParams;
}