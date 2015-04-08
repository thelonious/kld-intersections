/**
 *
 *   IntersectionParams.js
 *
 *   copyright 2002, Kevin Lindsey
 * 
 *   contribution {@link http://github.com/Quazistax/kld-polynomial}
 *       @copyright 2015 Robert Benko (Quazistax) <quazistax@gmail.com>
 *       @license MIT
 */

(function (global, factory) {
    //// AMD - commented out until all dependencies are wrapped in AMD compatible way
    //if (typeof define === 'function' && define.amd) {
    //    define(factory);
    //} else
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        //classic script - populating global namespace
        global.IntersectionParams = factory();
    }
}(this, function () {


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
     *  @param {String} type
     *  @param {Array<Point2D>} params
     */
    IntersectionParams.prototype.init = function (type, params) {
        this.type = type;
        this.params = params;
        this.meta = {};
    };
       
    IntersectionParams.TYPE = {};
    var IPTYPE = IntersectionParams.TYPE;
    !function () {
        var d = Object.defineProperty;
        d(IPTYPE, 'LINE', { value: 'Line' });
        d(IPTYPE, 'RECT', { value: 'Rectangle' });
        d(IPTYPE, 'ROUNDRECT', { value: 'RoundRectangle' });
        d(IPTYPE, 'CIRCLE', { value: 'Circle' });
        d(IPTYPE, 'ELLIPSE', { value: 'Ellipse' });
        d(IPTYPE, 'POLYGON', { value: 'Polygon' });
        d(IPTYPE, 'POLYLINE', { value: 'Polyline' });
        d(IPTYPE, 'PATH', { value: 'Path' });
        d(IPTYPE, 'ARC', { value: 'Arc' });
        d(IPTYPE, 'BEZIER2', { value: 'Bezier2' });
        d(IPTYPE, 'BEZIER3', { value: 'Bezier3' });
    }();

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for arc.
    
        @param {Point2D} startPoint - arc start point
        @param {Point2D} endPoint - arc end point
        @param {Number} rx - arc ellipse x radius
        @param {Number} ry - arc ellipse y radius
        @param {Number} angle - arc ellipse rotation in degrees
        @param {Boolean} largeArcFlag
        @param {Boolean} sweepFlag
        @returns {IntersectionParams}
    */
    IntersectionParams.newArc = function (startPoint, endPoint, rx, ry, angle, largeArcFlag, sweepFlag) {
        var p = IntersectionParams.Utils.getArcParamaters(startPoint, endPoint, rx, ry, angle, largeArcFlag, sweepFlag);
        return new IntersectionParams(IPTYPE.ARC, [p.center, p.rx, p.ry, (angle * Math.PI / 180), p.theta1, p.deltaTheta]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for bezier2.
    
        @param {Point2D} p1
        @param {Point2D} p2
        @param {Point2D} p3
        @returns {IntersectionParams}
    */
    IntersectionParams.newBezier2 = function (p1, p2, p3) {
        return new IntersectionParams(IPTYPE.BEZIER2, [p1, p2, p3]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for bezier3.
    
        @param {Point2D} p1
        @param {Point2D} p2
        @param {Point2D} p3
        @param {Point2D} p4
        @returns {IntersectionParams}
    */
    IntersectionParams.newBezier3 = function (p1, p2, p3, p4) {
        return new IntersectionParams(IPTYPE.BEZIER3, [p1, p2, p3, p4]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for circle.
    
        @param {Point2D} c
        @param {Number} r
        @returns {IntersectionParams}
    */
    IntersectionParams.newCircle = function (c, r) {
        return new IntersectionParams(IPTYPE.CIRCLE, [c, r]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for ellipse.
    
        @param {Point2D} c
        @param {Number} rx
        @param {Number} ry
        @returns {IntersectionParams}
    */
    IntersectionParams.newEllipse = function (c, rx, ry) {
        return new IntersectionParams(IPTYPE.ELLIPSE, [c, rx, ry]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for line.
    
        @param {Point2D} a1
        @param {Point2D} a2
        @returns {IntersectionParams}
    */
    IntersectionParams.newLine = function (a1, a2) {
        return new IntersectionParams(IPTYPE.LINE, [a1, a2]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for polygon.
    
        @param {Array<Point2D>} points
        @returns {IntersectionParams}
    */
    IntersectionParams.newPolygon = function (points) {
        return new IntersectionParams(IPTYPE.POLYGON, [points]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for polyline.
    
         @param {Array<Point2D>} points
        @returns {IntersectionParams}
    */
    IntersectionParams.newPolyline = function (points) {
        return new IntersectionParams(IPTYPE.POLYLINE, [points]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for path.
    
        @param {Array<IntersectionParams>} segments
        @returns {IntersectionParams}
    */
    IntersectionParams.newPath = function (segments) {
        return new IntersectionParams(IPTYPE.PATH, [segments]);
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for rectangle.
    
        @param {Number} x
        @param {Number} y
        @param {Number} width
        @param {Number} height
        @returns {IntersectionParams}
    */
    IntersectionParams.newRect = function (x, y, width, height) {
        var points = [];
        points.push(new Point2D(x, y));
        points.push(new Point2D(x + width, y));
        points.push(new Point2D(x + width, y + height));
        points.push(new Point2D(x, y + height));
        return new IntersectionParams(IPTYPE.RECT, [points]);
    };

    var degreesToRadians = function (angle) {
        return angle * Math.PI / 180;
    };
    ///////////////////////////////////////////////////////////////////
    /** 
        Creates IntersectionParams for round rectangle, or for rectangle if rx and ry are 0.
    
        @param {Number} x
        @param {Number} y
        @param {Number} width
        @param {Number} height
        @param {Number} rx
        @param {Number} ry
        @returns {IntersectionParams}
    */
    IntersectionParams.newRoundRect = function (x, y, width, height, rx, ry) {
        if (rx === 0 && ry === 0)
            return IntersectionParams.newRect(x, y, width, height);
        if (rx === 0)
            rx = ry;
        if (ry === 0)
            ry = rx;
        if (rx > width / 2)
            rx = width / 2;
        if (ry > height / 2)
            rx = height / 2;
        var shape = [];
        var x0 = x, x1 = x + rx, x2 = x + width - rx, x3 = x + width;
        var y0 = y, y1 = y + ry, y2 = y + height - ry, y3 = y + height;
        shape.push(new IntersectionParams(IPTYPE.ARC, [new Point2D(x1, y1), rx, ry, 0, degreesToRadians(180), degreesToRadians(90)]));
        shape.push(new IntersectionParams(IPTYPE.LINE, [new Point2D(x1, y0), new Point2D(x2, y0)]));
        shape.push(new IntersectionParams(IPTYPE.ARC, [new Point2D(x2, y1), rx, ry, 0, degreesToRadians(-90), degreesToRadians(90)]));
        shape.push(new IntersectionParams(IPTYPE.LINE, [new Point2D(x3, y1), new Point2D(x3, y2)]));
        shape.push(new IntersectionParams(IPTYPE.ARC, [new Point2D(x2, y2), rx, ry, 0, degreesToRadians(0), degreesToRadians(90)]));
        shape.push(new IntersectionParams(IPTYPE.LINE, [new Point2D(x2, y3), new Point2D(x1, y3)]));
        shape.push(new IntersectionParams(IPTYPE.ARC, [new Point2D(x1, y2), rx, ry, 0, degreesToRadians(90), degreesToRadians(90)]));
        shape.push(new IntersectionParams(IPTYPE.LINE, [new Point2D(x0, y2), new Point2D(x0, y1)]));
        shape[shape.length - 1].meta.closePath = true;
        return new IntersectionParams(IPTYPE.ROUNDRECT, [shape]);
    };

    ///////////////////////////////////////////////////////////////////
    IntersectionParams.Utils = {};
    ///////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    /** 
        getArcParamaters
    
        @param {Point2D} startPoint
        @param {Point2D} endPoint
        @param {Number} rx
        @param {Number} ry
        @param {Number} angle - in degrees
        @param {Boolean} arcFlag
        @param {Boolean} sweepFlag
        @returns {{ center: Point2D, rx: Number, ry: Number, theta1: Number, deltaTheta: Number }}
    */
    IntersectionParams.Utils.getArcParamaters = function (startPoint, endPoint, rx, ry, angle, arcFlag, sweepFlag) {
        function radian(ux, uy, vx, vy) {
            var dot = ux * vx + uy * vy;
            var mod = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
            var rad = Math.acos(dot / mod);
            if (ux * vy - uy * vx < 0.0) rad = -rad;
            return rad;
        }
        angle = angle * Math.PI / 180;
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var TOLERANCE = 1e-6;
        var halfDiff = startPoint.subtract(endPoint).divide(2);
        var x1p = halfDiff.x * c + halfDiff.y * s;
        var y1p = halfDiff.x * -s + halfDiff.y * c;
        var x1px1p = x1p * x1p;
        var y1py1p = y1p * y1p;
        var lambda = (x1px1p / (rx * rx)) + (y1py1p / (ry * ry));
        var factor;
        if (lambda > 1) {
            factor = Math.sqrt(lambda);
            rx *= factor;
            ry *= factor;
        }
        var rxrx = rx * rx;
        var ryry = ry * ry;
        var rxy1 = rxrx * y1py1p;
        var ryx1 = ryry * x1px1p;
        factor = (rxrx * ryry - rxy1 - ryx1) / (rxy1 + ryx1);
        if (Math.abs(factor) < TOLERANCE) factor = 0;
        var sq = Math.sqrt(factor);
        if (arcFlag == sweepFlag) sq = -sq;
        var mid = startPoint.add(endPoint).divide(2);
        var cxp = sq * rx * y1p / ry;
        var cyp = sq * -ry * x1p / rx;
        //return new Point2D(cxp * c - cyp * s + mid.x, cxp * s + cyp * c + mid.y);

        var xcr1 = (x1p - cxp) / rx;
        var xcr2 = (x1p + cxp) / rx;
        var ycr1 = (y1p - cyp) / ry;
        var ycr2 = (y1p + cyp) / ry;

        var vcr1 = new Vector2D(1, 0);
        var theta1 = radian(1.0, 0.0, xcr1, ycr1);

        var deltaTheta = radian(xcr1, ycr1, -xcr2, -ycr2);
        var PIx2 = Math.PI * 2.0;
        while (deltaTheta > PIx2) deltaTheta -= PIx2;
        while (deltaTheta < 0.0) deltaTheta += PIx2;
        if (sweepFlag == false) deltaTheta -= PIx2;

        return {
            center: new Point2D(cxp * c - cyp * s + mid.x, cxp * s + cyp * c + mid.y),
            rx: rx,
            ry: ry,
            theta1: theta1,
            deltaTheta: deltaTheta
        };
    };

    return IntersectionParams;
}));