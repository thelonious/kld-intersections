/**
 *
 *  Intersection.js
 *
 *  copyright 2002, 2013 Kevin Lindsey
 * 
 *  contribution {@link http://github.com/Quazistax/kld-intersections}
 *      @copyright 2015 Robert Benko (Quazistax) <quazistax@gmail.com>
 *      @license MIT
 */

(function (global, factory) {
    //// AMD - commented out until all dependencies are wrapped in AMD compatible way
    //if (typeof define === 'function' && define.amd) {
    //    define(['kld/Point2D', 'kld/Vector2D', 'kld/Matrix2D', 'kld/Polynomial', 'kld/IntersectionParams'], factory);
    //} else
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS - Node.js assumed, for other CommonJS environments or folder structures - customize to
        // suit your needs or give proposal for more general solution
        module.exports = factory(
            require('kld-affine').Point2D,
            require('kld-affine').Vector2D,
            require('kld-affine').Matrix2D,
            require('kld-polynomial').Polynomial,
            require('./IntersectionParams')
            );
    } else {
        //classic script - populating global namespace
        global.Intersection = factory(Point2D, Vector2D, Matrix2D, Polynomial, IntersectionParams);
    }
}(this, function (Point2D, Vector2D, Matrix2D, Polynomial, IntersectionParams) {


    /**
     *  Intersection
     */
    function Intersection(status) {
        this.init(status);
    }

    /**
     *  init
     *
     *  @param {String} status
     *  @returns {Intersection}
     */
    Intersection.prototype.init = function(status) {
        this.status = status;
        this.points = [];
    };

    /**
     *  appendPoint
     *
     *  @param {Point2D} point
     */
    Intersection.prototype.appendPoint = function(point) {
        this.points.push(point);
    };

    /**
     *  appendPoints
     *
     *  @param {Array<Point2D>} points
     */
    Intersection.prototype.appendPoints = function(points) {
        this.points = this.points.concat(points);
    };

    // static methods
        
    ///////////////////////////////////////////////////////////////////
    /** 
        intersectShapes
    
        @param {IntersectionParams} shape1
        @param {IntersectionParams} shape2
        @param {Matrix2D} [m1]
        @param {Matrix2D} [m2]
        @returns {Intersection}
    */
    Intersection.intersectShapes = function (shape1, shape2, m1, m2) {
        var ip1 = shape1;
        var ip2 = shape2;
        var result;
        var IPTYPE = IntersectionParams.TYPE;

        var stat = Intersection.intersectShapes;
        if (!stat.composedShapeMethods) {
            stat.composedShapeMethods = {};
            stat.composedShapeMethods[IPTYPE.PATH] = Intersection.intersectPathShape;
            stat.composedShapeMethods[IPTYPE.POLYLINE] = Intersection.intersectLinesShape;
            stat.composedShapeMethods[IPTYPE.POLYGON] = Intersection.intersectLinesShape;
            stat.composedShapeMethods[IPTYPE.RECT] = Intersection.intersectLinesShape;
            stat.composedShapeMethods[IPTYPE.ROUNDRECT] = Intersection.intersectPathShape;
            stat.composedShapeMethods[IPTYPE.ARC] = Intersection.intersectArcShape;
        }

        if (ip1 !== null && ip2 !== null) {
            var method;

            if (method = stat.composedShapeMethods[ip1.type]) {
                result = method(ip1, ip2, m1, m2);
            }
            else if (method = stat.composedShapeMethods[ip2.type]) {
                result = method(ip2, ip1, m2, m1);
            }
            else {
                var params;

                var params1, params2, type1, type2;

                if (ip1.type === IPTYPE.CIRCLE) {
                    params1 = [ip1.params[0], ip1.params[1], ip1.params[1]];
                    type1 = IPTYPE.ELLIPSE;
                }
                else {
                    params1 = ip1.params.slice();
                    type1 = ip1.type;
                }

                if (ip2.type === IPTYPE.CIRCLE) {
                    params2 = [ip2.params[0], ip2.params[1], ip2.params[1]];
                    type2 = IPTYPE.ELLIPSE;
                }
                else {
                    params2 = ip2.params.slice();
                    type2 = ip2.type;
                }

                //var m1 = new Matrix2D(), m2 = new Matrix2D();
                var SMF = 1;
                var itm;
                var useCTM = (m1 instanceof Matrix2D && m2 instanceof Matrix2D);// && (!m1.isIdentity() || !m2.isIdentity()));
                if (useCTM) {
                    if (type1 === IPTYPE.ELLIPSE && type2 === IPTYPE.ELLIPSE) {
                        var m1_, m2_;
                        var d2;
                        var c1 = params1[0], rx1 = params1[1], ry1 = params1[2];
                        var c2 = params2[0], rx2 = params2[1], ry2 = params2[2];

                        m1 = m1.multiply(Matrix2D.IDENTITY.translate(c1.x, c1.y).scaleNonUniform(rx1 / SMF, ry1 / SMF));
                        c1 = new Point2D(0, 0);
                        rx1 = ry1 = SMF;

                        m2 = m2.multiply(Matrix2D.IDENTITY.translate(c2.x, c2.y).scaleNonUniform(rx2, ry2));
                        c2 = new Point2D(0, 0);
                        rx2 = ry2 = 1;

                        d2 = m1.inverse().multiply(m2).getDecompositionTRSR();
                        m1_ = d2.R.inverse().multiply(d2.T.inverse());
                        m2_ = d2.S;

                        rx2 = m2_.a;
                        ry2 = m2_.d;
                        c1 = c1.transform(m1_);
                        itm = m1.multiply(m1_.inverse());

                        params1[0] = c1;
                        params1[1] = rx1;
                        params1[2] = ry1;
                        params2[0] = c2;
                        params2[1] = rx2;
                        params2[2] = ry2;
                    }
                    else {
                        var transParams = function (type, params, m) {
                            var transParam = function (i) {
                                params[i] = params[i].transform(m);
                            }

                            if (type === IPTYPE.LINE) {
                                transParam(0);
                                transParam(1);
                            }
                            else if (type === IPTYPE.BEZIER2) {
                                transParam(0);
                                transParam(1);
                                transParam(2);
                            }
                            else if (type === IPTYPE.BEZIER3) {
                                transParam(0);
                                transParam(1);
                                transParam(2);
                                transParam(3);
                            }
                            else {
                                console.log('Unknown shape: ' + type);
                                throw new Error('Unknown shape: ' + type);
                            }
                        }

                        if (type2 === IPTYPE.ELLIPSE) {
                            var tmp;
                            tmp = params2; params2 = params1; params1 = tmp;
                            tmp = type2; type2 = type1; type1 = tmp;
                            tmp = m2; m2 = m1; m1 = tmp;
                        }

                        if (type1 === IPTYPE.ELLIPSE) {
                            var c1 = params1[0], rx1 = params1[1], ry1 = params1[2];

                            m1 = m1.multiply(Matrix2D.IDENTITY.translate(c1.x, c1.y).scaleNonUniform(rx1 / SMF, ry1 / SMF));
                            c1 = new Point2D(0, 0);
                            rx1 = ry1 = SMF;

                            m2_ = m1.inverse().multiply(m2);
                            transParams(type2, params2, m2_);

                            itm = m1;

                            params1[0] = c1;
                            params1[1] = rx1;
                            params1[2] = ry1;
                        }
                        else {
                            transParams(type1, params1, m1);
                            transParams(type2, params2, m2);
                            itm = Matrix2D.IDENTITY;
                        }
                    }
                }

                if (type1 < type2) {
                    method = "intersect" + type1 + type2;
                    params = params1.concat(params2);
                } else {
                    method = "intersect" + type2 + type1;
                    params = params2.concat(params1);
                }
                

                if (!(method in Intersection))
                    throw new Error("Intersection not available: " + method);

                result = Intersection[method].apply(null, params);

                if (useCTM) {
                    for (var i = 0; i < result.points.length; i++) {
                        result.points[i] = result.points[i].transform(itm);
                    }
                }
            }
        } else {
            result = new Intersection();
        }

        return result;
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        intersectPathShape
    
        @param {IntersectionParams} path
        @param {IntersectionParams} shape
        @param {Matrix2D} [m1]
        @param {Matrix2D} [m2]
        @returns {Intersection}
    */
    Intersection.intersectPathShape = function (path, shape, m1, m2) {
        var result = new Intersection();
        var pathParams = path.params[0];
        var inter0;
        var previnter;
        for (var inter, i = 0; i < pathParams.length; i++) {
            inter = Intersection.intersectShapes(pathParams[i], shape, m1, m2);
            if (!inter0)
                inter0 = inter;
            if (previnter) {
                Intersection.Utils.removeClosePoints(previnter.points, inter.points);
                result.appendPoints(previnter.points);
            }
            previnter = inter;
        }
        if (previnter) {
            result.appendPoints(previnter.points);
        }
        return result;
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        intersectLinesShape
    
        @param {IntersectionParams} lines - IntersectionParams with points as first parameter (like types RECT, POLYLINE or POLYGON)
        @param {IntersectionParams} shape - IntersectionParams of other shape
        @param {Matrix2D} [m1]
        @param {Matrix2D} [m2]
        @param {Boolean} [closed] - if set, determines if line between first and last point will be taken into callculation too. If not set, it's true for RECT and POLYGON, false for other <b>lines</b> types.
        @returns {Intersection}
    */
    Intersection.intersectLinesShape = function (lines, shape, m1, m2, closed) {
        var IPTYPE = IntersectionParams.TYPE;
        var line_points = lines.params[0];
        var ip = new IntersectionParams(IPTYPE.LINE, [0, 0]);
        var result = new Intersection();
        var inter, i;
        var intersectLine = function (i1, i2) {
            ip.params[0] = line_points[i1];
            ip.params[1] = line_points[i2];
            inter = Intersection.intersectShapes(ip, shape, m1, m2);
            Intersection.Utils.removeClosePoints(inter.points, [line_points[i2]]);
            result.appendPoints(inter.points);
        }
        for (i = 0; i < line_points.length - 1; i++) {
            intersectLine(i, i + 1);
        }
        if (typeof closed !== 'undefined' && closed || lines.type === IPTYPE.RECT || lines.type === IPTYPE.POLYGON) {
            intersectLine(line_points.length - 1, 0);
        }
        return result;
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        intersectArcShape
    
        @param {IntersectionParams} arc
        @param {IntersectionParams} shape
        @param {Matrix2D} [m1]
        @param {Matrix2D} [m2]
        @returns {Intersection}
    */
    Intersection.intersectArcShape = function (arc, shape, m1, m2) {
        m1 = m1 || Matrix2D.IDENTITY;
        m2 = m2 || Matrix2D.IDENTITY;
        var c1 = arc.params[0],
            rx1 = arc.params[1],
            ry1 = arc.params[2],
            phi1 = arc.params[3],
            th1 = arc.params[4],
            dth1 = arc.params[5];
       
        var res;
        if (m1.isIdentity() && phi1 === 0) {
            res = Intersection.intersectShapes(IntersectionParams.newEllipse(c1, rx1, ry1), shape, m1, m2);
        }
        else {
            m1 = m1.multiply(Matrix2D.IDENTITY.translate(c1.x, c1.y).rotate(phi1));
            c1 = new Point2D(0, 0);
            phi1 = 0;
            res = Intersection.intersectShapes(IntersectionParams.newEllipse(c1, rx1, ry1), shape, m1, m2);
        }
        res = Intersection.Utils.removePointsNotInArc(res, c1, rx1, ry1, phi1, th1, dth1, m1);
        return res;
    };

    /**
     *  intersectBezier2Bezier2
     *
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @param {Point2D} a3
     *  @param {Point2D} b1
     *  @param {Point2D} b2
     *  @param {Point2D} b3
     *  @returns {Intersection}
     */
    Intersection.intersectBezier2Bezier2 = function(a1, a2, a3, b1, b2, b3) {
        var a, b;
        var c12, c11, c10;
        var c22, c21, c20;
        var result = new Intersection();
        var poly;

        a = a2.multiply(-2);
        c12 = a1.add(a.add(a3));

        a = a1.multiply(-2);
        b = a2.multiply(2);
        c11 = a.add(b);

        c10 = new Point2D(a1.x, a1.y);

        a = b2.multiply(-2);
        c22 = b1.add(a.add(b3));

        a = b1.multiply(-2);
        b = b2.multiply(2);
        c21 = a.add(b);

        c20 = new Point2D(b1.x, b1.y);

        var v0, v1, v2, v3, v4, v5, v6;
        if ( c12.y === 0 ) {
            v0 = c12.x*(c10.y - c20.y);
            v1 = v0 - c11.x*c11.y;
            v2 = v0 + v1;
            v3 = c11.y*c11.y;

            poly = new Polynomial(
                c12.x*c22.y*c22.y,
                2*c12.x*c21.y*c22.y,
                c12.x*c21.y*c21.y - c22.x*v3 - c22.y*v0 - c22.y*v1,
                -c21.x*v3 - c21.y*v0 - c21.y*v1,
                (c10.x - c20.x)*v3 + (c10.y - c20.y)*v1
            );
        } else {
            v0 = c12.x*c22.y - c12.y*c22.x;
            v1 = c12.x*c21.y - c21.x*c12.y;
            v2 = c11.x*c12.y - c11.y*c12.x;
            v3 = c10.y - c20.y;
            v4 = c12.y*(c10.x - c20.x) - c12.x*v3;
            v5 = -c11.y*v2 + c12.y*v4;
            v6 = v2*v2;

            poly = new Polynomial(
                v0*v0,
                2*v0*v1,
                (-c22.y*v6 + c12.y*v1*v1 + c12.y*v0*v4 + v0*v5) / c12.y,
                (-c21.y*v6 + c12.y*v1*v4 + v1*v5) / c12.y,
                (v3*v6 + v4*v5) / c12.y
            );
        }

        var roots = poly.getRoots();
        for ( var i = 0; i < roots.length; i++ ) {
            var s = roots[i];

            if ( 0 <= s && s <= 1 ) {
                var xRoots = new Polynomial(
                    c12.x,
                    c11.x,
                    c10.x - c20.x - s*c21.x - s*s*c22.x
                ).getRoots();
                var yRoots = new Polynomial(
                    c12.y,
                    c11.y,
                    c10.y - c20.y - s*c21.y - s*s*c22.y
                ).getRoots();

                if ( xRoots.length > 0 && yRoots.length > 0 ) {
                    var TOLERANCE = 1e-4;

                    checkRoots:
                        for ( var j = 0; j < xRoots.length; j++ ) {
                            var xRoot = xRoots[j];

                            if ( 0 <= xRoot && xRoot <= 1 ) {
                                for ( var k = 0; k < yRoots.length; k++ ) {
                                    if ( Math.abs( xRoot - yRoots[k] ) < TOLERANCE ) {
                                        result.points.push( c22.multiply(s*s).add(c21.multiply(s).add(c20)) );
                                        break checkRoots;
                                    }
                                }
                            }
                        }
                }
            }
        }

        return result;
    };


    /**
     *  intersectBezier2Bezier3
     *
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @param {Point2D} a3
     *  @param {Point2D} b1
     *  @param {Point2D} b2
     *  @param {Point2D} b3
     *  @param {Point2D} b4
     *  @returns {Intersection}
     */
    Intersection.intersectBezier2Bezier3 = function(a1, a2, a3, b1, b2, b3, b4) {
        var a, b,c, d;
        var c12, c11, c10;
        var c23, c22, c21, c20;
        var result = new Intersection();

        a = a2.multiply(-2);
        c12 = a1.add(a.add(a3));

        a = a1.multiply(-2);
        b = a2.multiply(2);
        c11 = a.add(b);

        c10 = new Point2D(a1.x, a1.y);

        a = b1.multiply(-1);
        b = b2.multiply(3);
        c = b3.multiply(-3);
        d = a.add(b.add(c.add(b4)));
        c23 = new Vector2D(d.x, d.y);

        a = b1.multiply(3);
        b = b2.multiply(-6);
        c = b3.multiply(3);
        d = a.add(b.add(c));
        c22 = new Vector2D(d.x, d.y);

        a = b1.multiply(-3);
        b = b2.multiply(3);
        c = a.add(b);
        c21 = new Vector2D(c.x, c.y);

        c20 = new Vector2D(b1.x, b1.y);

        var c10x2 = c10.x*c10.x;
        var c10y2 = c10.y*c10.y;
        var c11x2 = c11.x*c11.x;
        var c11y2 = c11.y*c11.y;
        var c12x2 = c12.x*c12.x;
        var c12y2 = c12.y*c12.y;
        var c20x2 = c20.x*c20.x;
        var c20y2 = c20.y*c20.y;
        var c21x2 = c21.x*c21.x;
        var c21y2 = c21.y*c21.y;
        var c22x2 = c22.x*c22.x;
        var c22y2 = c22.y*c22.y;
        var c23x2 = c23.x*c23.x;
        var c23y2 = c23.y*c23.y;

        var poly = new Polynomial(
            -2*c12.x*c12.y*c23.x*c23.y + c12x2*c23y2 + c12y2*c23x2,
            -2*c12.x*c12.y*c22.x*c23.y - 2*c12.x*c12.y*c22.y*c23.x + 2*c12y2*c22.x*c23.x +
                2*c12x2*c22.y*c23.y,
            -2*c12.x*c21.x*c12.y*c23.y - 2*c12.x*c12.y*c21.y*c23.x - 2*c12.x*c12.y*c22.x*c22.y +
                2*c21.x*c12y2*c23.x + c12y2*c22x2 + c12x2*(2*c21.y*c23.y + c22y2),
            2*c10.x*c12.x*c12.y*c23.y + 2*c10.y*c12.x*c12.y*c23.x + c11.x*c11.y*c12.x*c23.y +
                c11.x*c11.y*c12.y*c23.x - 2*c20.x*c12.x*c12.y*c23.y - 2*c12.x*c20.y*c12.y*c23.x -
                2*c12.x*c21.x*c12.y*c22.y - 2*c12.x*c12.y*c21.y*c22.x - 2*c10.x*c12y2*c23.x -
                2*c10.y*c12x2*c23.y + 2*c20.x*c12y2*c23.x + 2*c21.x*c12y2*c22.x -
                c11y2*c12.x*c23.x - c11x2*c12.y*c23.y + c12x2*(2*c20.y*c23.y + 2*c21.y*c22.y),
            2*c10.x*c12.x*c12.y*c22.y + 2*c10.y*c12.x*c12.y*c22.x + c11.x*c11.y*c12.x*c22.y +
                c11.x*c11.y*c12.y*c22.x - 2*c20.x*c12.x*c12.y*c22.y - 2*c12.x*c20.y*c12.y*c22.x -
                2*c12.x*c21.x*c12.y*c21.y - 2*c10.x*c12y2*c22.x - 2*c10.y*c12x2*c22.y +
                2*c20.x*c12y2*c22.x - c11y2*c12.x*c22.x - c11x2*c12.y*c22.y + c21x2*c12y2 +
                c12x2*(2*c20.y*c22.y + c21y2),
            2*c10.x*c12.x*c12.y*c21.y + 2*c10.y*c12.x*c21.x*c12.y + c11.x*c11.y*c12.x*c21.y +
                c11.x*c11.y*c21.x*c12.y - 2*c20.x*c12.x*c12.y*c21.y - 2*c12.x*c20.y*c21.x*c12.y -
                2*c10.x*c21.x*c12y2 - 2*c10.y*c12x2*c21.y + 2*c20.x*c21.x*c12y2 -
                c11y2*c12.x*c21.x - c11x2*c12.y*c21.y + 2*c12x2*c20.y*c21.y,
            -2*c10.x*c10.y*c12.x*c12.y - c10.x*c11.x*c11.y*c12.y - c10.y*c11.x*c11.y*c12.x +
                2*c10.x*c12.x*c20.y*c12.y + 2*c10.y*c20.x*c12.x*c12.y + c11.x*c20.x*c11.y*c12.y +
                c11.x*c11.y*c12.x*c20.y - 2*c20.x*c12.x*c20.y*c12.y - 2*c10.x*c20.x*c12y2 +
                c10.x*c11y2*c12.x + c10.y*c11x2*c12.y - 2*c10.y*c12x2*c20.y -
                c20.x*c11y2*c12.x - c11x2*c20.y*c12.y + c10x2*c12y2 + c10y2*c12x2 +
                c20x2*c12y2 + c12x2*c20y2
        );
        var roots = poly.getRootsInInterval(0,1);
        Intersection.Utils.removeMultipleRootsIn01(roots);

        for ( var i = 0; i < roots.length; i++ ) {
            var s = roots[i];
            var xRoots = new Polynomial(
                c12.x,
                c11.x,
                c10.x - c20.x - s*c21.x - s*s*c22.x - s*s*s*c23.x
            ).getRoots();
            var yRoots = new Polynomial(
                c12.y,
                c11.y,
                c10.y - c20.y - s*c21.y - s*s*c22.y - s*s*s*c23.y
            ).getRoots();

            if ( xRoots.length > 0 && yRoots.length > 0 ) {
                var TOLERANCE = 1e-4;

                checkRoots:
                    for ( var j = 0; j < xRoots.length; j++ ) {
                        var xRoot = xRoots[j];

                        if ( 0 <= xRoot && xRoot <= 1 ) {
                            for ( var k = 0; k < yRoots.length; k++ ) {
                                if ( Math.abs( xRoot - yRoots[k] ) < TOLERANCE ) {
                                    var v = c23.multiply(s * s * s).add(c22.multiply(s * s).add(c21.multiply(s).add(c20)));
                                    result.points.push(new Point2D(v.x, v.y));
                                    break checkRoots;
                                }
                            }
                        }
                    }
            }
        }

        return result;

    };

    /**
     *  intersectBezier2Ellipse
     *
     *  @param {Point2D} p1
     *  @param {Point2D} p2
     *  @param {Point2D} p3
     *  @param {Point2D} ec
     *  @param {Number} rx
     *  @param {Number} ry
     *  @returns {Intersection}
     */
    Intersection.intersectBezier2Ellipse = function(p1, p2, p3, ec, rx, ry) {
        var a, b;       // temporary variables
        var c2, c1, c0; // coefficients of quadratic
        var result = new Intersection();

        a = p2.multiply(-2);
        c2 = p1.add(a.add(p3));

        a = p1.multiply(-2);
        b = p2.multiply(2);
        c1 = a.add(b);

        c0 = new Point2D(p1.x, p1.y);

        var rxrx  = rx*rx;
        var ryry  = ry*ry;
        var roots = new Polynomial(
            ryry*c2.x*c2.x + rxrx*c2.y*c2.y,
            2*(ryry*c2.x*c1.x + rxrx*c2.y*c1.y),
            ryry*(2*c2.x*c0.x + c1.x*c1.x) + rxrx*(2*c2.y*c0.y+c1.y*c1.y) -
                2*(ryry*ec.x*c2.x + rxrx*ec.y*c2.y),
            2*(ryry*c1.x*(c0.x-ec.x) + rxrx*c1.y*(c0.y-ec.y)),
            ryry*(c0.x*c0.x+ec.x*ec.x) + rxrx*(c0.y*c0.y + ec.y*ec.y) -
                2*(ryry*ec.x*c0.x + rxrx*ec.y*c0.y) - rxrx*ryry
        ).getRoots();

        for ( var i = 0; i < roots.length; i++ ) {
            var t = roots[i];

            if ( 0 <= t && t <= 1 )
                result.points.push( c2.multiply(t*t).add(c1.multiply(t).add(c0)) );
        }

        return result;
    };


    /**
     *  intersectBezier2Line
     *
     *  @param {Point2D} p1
     *  @param {Point2D} p2
     *  @param {Point2D} p3
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @returns {Intersection}
     */
    Intersection.intersectBezier2Line = function(p1, p2, p3, a1, a2) {
        var a, b;             // temporary variables
        var c2, c1, c0;       // coefficients of quadratic
        var cl;               // c coefficient for normal form of line
        var n;                // normal for normal form of line
        var min = a1.min(a2); // used to determine if point is on line segment
        var max = a1.max(a2); // used to determine if point is on line segment
        var result = new Intersection();

        a = p2.multiply(-2);
        c2 = p1.add(a.add(p3));

        a = p1.multiply(-2);
        b = p2.multiply(2);
        c1 = a.add(b);

        c0 = new Point2D(p1.x, p1.y);

        // Convert line to normal form: ax + by + c = 0
        // Find normal to line: negative inverse of original line's slope
        n = new Vector2D(a1.y - a2.y, a2.x - a1.x);

        // Determine new c coefficient
        cl = a1.x*a2.y - a2.x*a1.y;

        // Transform cubic coefficients to line's coordinate system and find roots
        // of cubic
        roots = new Polynomial(
            n.dot(c2),
            n.dot(c1),
            n.dot(c0) + cl
        ).getRoots();

        // Any roots in closed interval [0,1] are intersections on Bezier, but
        // might not be on the line segment.
        // Find intersections and calculate point coordinates
        for ( var i = 0; i < roots.length; i++ ) {
            var t = roots[i];

            if ( 0 <= t && t <= 1 ) {
                // We're within the Bezier curve
                // Find point on Bezier
                var p4 = p1.lerp(p2, t);
                var p5 = p2.lerp(p3, t);

                var p6 = p4.lerp(p5, t);

                // See if point is on line segment
                // Had to make special cases for vertical and horizontal lines due
                // to slight errors in calculation of p6
                if ( a1.x == a2.x ) {
                    if ( min.y <= p6.y && p6.y <= max.y ) {
                        result.appendPoint( p6 );
                    }
                } else if ( a1.y == a2.y ) {
                    if ( min.x <= p6.x && p6.x <= max.x ) {
                        result.appendPoint( p6 );
                    }
                } else if (min.x <= p6.x && p6.x <= max.x && min.y <= p6.y && p6.y <= max.y) {
                    result.appendPoint( p6 );
                }
            }
        }

        return result;
    };


    /**
     *  intersectBezier3Bezier3
     *
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @param {Point2D} a3
     *  @param {Point2D} a4
     *  @param {Point2D} b1
     *  @param {Point2D} b2
     *  @param {Point2D} b3
     *  @param {Point2D} b4
     *  @returns {Intersection}
     */
    Intersection.intersectBezier3Bezier3 = function(a1, a2, a3, a4, b1, b2, b3, b4) {
        var a, b, c, d;         // temporary variables
        var c13, c12, c11, c10; // coefficients of cubic
        var c23, c22, c21, c20; // coefficients of cubic
        var result = new Intersection();

        // Calculate the coefficients of cubic polynomial
        a = a1.multiply(-1);
        b = a2.multiply(3);
        c = a3.multiply(-3);
        d = a.add(b.add(c.add(a4)));
        c13 = new Vector2D(d.x, d.y);

        a = a1.multiply(3);
        b = a2.multiply(-6);
        c = a3.multiply(3);
        d = a.add(b.add(c));
        c12 = new Vector2D(d.x, d.y);

        a = a1.multiply(-3);
        b = a2.multiply(3);
        c = a.add(b);
        c11 = new Vector2D(c.x, c.y);

        c10 = new Vector2D(a1.x, a1.y);

        a = b1.multiply(-1);
        b = b2.multiply(3);
        c = b3.multiply(-3);
        d = a.add(b.add(c.add(b4)));
        c23 = new Vector2D(d.x, d.y);

        a = b1.multiply(3);
        b = b2.multiply(-6);
        c = b3.multiply(3);
        d = a.add(b.add(c));
        c22 = new Vector2D(d.x, d.y);

        a = b1.multiply(-3);
        b = b2.multiply(3);
        c = a.add(b);
        c21 = new Vector2D(c.x, c.y);

        c20 = new Vector2D(b1.x, b1.y);

        var c10x2 = c10.x*c10.x;
        var c10x3 = c10.x*c10.x*c10.x;
        var c10y2 = c10.y*c10.y;
        var c10y3 = c10.y*c10.y*c10.y;
        var c11x2 = c11.x*c11.x;
        var c11x3 = c11.x*c11.x*c11.x;
        var c11y2 = c11.y*c11.y;
        var c11y3 = c11.y*c11.y*c11.y;
        var c12x2 = c12.x*c12.x;
        var c12x3 = c12.x*c12.x*c12.x;
        var c12y2 = c12.y*c12.y;
        var c12y3 = c12.y*c12.y*c12.y;
        var c13x2 = c13.x*c13.x;
        var c13x3 = c13.x*c13.x*c13.x;
        var c13y2 = c13.y*c13.y;
        var c13y3 = c13.y*c13.y*c13.y;
        var c20x2 = c20.x*c20.x;
        var c20x3 = c20.x*c20.x*c20.x;
        var c20y2 = c20.y*c20.y;
        var c20y3 = c20.y*c20.y*c20.y;
        var c21x2 = c21.x*c21.x;
        var c21x3 = c21.x*c21.x*c21.x;
        var c21y2 = c21.y*c21.y;
        var c22x2 = c22.x*c22.x;
        var c22x3 = c22.x*c22.x*c22.x;
        var c22y2 = c22.y*c22.y;
        var c23x2 = c23.x*c23.x;
        var c23x3 = c23.x*c23.x*c23.x;
        var c23y2 = c23.y*c23.y;
        var c23y3 = c23.y*c23.y*c23.y;
        var poly = new Polynomial(
            -c13x3*c23y3 + c13y3*c23x3 - 3*c13.x*c13y2*c23x2*c23.y +
                3*c13x2*c13.y*c23.x*c23y2,
            -6*c13.x*c22.x*c13y2*c23.x*c23.y + 6*c13x2*c13.y*c22.y*c23.x*c23.y + 3*c22.x*c13y3*c23x2 -
                3*c13x3*c22.y*c23y2 - 3*c13.x*c13y2*c22.y*c23x2 + 3*c13x2*c22.x*c13.y*c23y2,
            -6*c21.x*c13.x*c13y2*c23.x*c23.y - 6*c13.x*c22.x*c13y2*c22.y*c23.x + 6*c13x2*c22.x*c13.y*c22.y*c23.y +
                3*c21.x*c13y3*c23x2 + 3*c22x2*c13y3*c23.x + 3*c21.x*c13x2*c13.y*c23y2 - 3*c13.x*c21.y*c13y2*c23x2 -
                3*c13.x*c22x2*c13y2*c23.y + c13x2*c13.y*c23.x*(6*c21.y*c23.y + 3*c22y2) + c13x3*(-c21.y*c23y2 -
                2*c22y2*c23.y - c23.y*(2*c21.y*c23.y + c22y2)),
            c11.x*c12.y*c13.x*c13.y*c23.x*c23.y - c11.y*c12.x*c13.x*c13.y*c23.x*c23.y + 6*c21.x*c22.x*c13y3*c23.x +
                3*c11.x*c12.x*c13.x*c13.y*c23y2 + 6*c10.x*c13.x*c13y2*c23.x*c23.y - 3*c11.x*c12.x*c13y2*c23.x*c23.y -
                3*c11.y*c12.y*c13.x*c13.y*c23x2 - 6*c10.y*c13x2*c13.y*c23.x*c23.y - 6*c20.x*c13.x*c13y2*c23.x*c23.y +
                3*c11.y*c12.y*c13x2*c23.x*c23.y - 2*c12.x*c12y2*c13.x*c23.x*c23.y - 6*c21.x*c13.x*c22.x*c13y2*c23.y -
                6*c21.x*c13.x*c13y2*c22.y*c23.x - 6*c13.x*c21.y*c22.x*c13y2*c23.x + 6*c21.x*c13x2*c13.y*c22.y*c23.y +
                2*c12x2*c12.y*c13.y*c23.x*c23.y + c22x3*c13y3 - 3*c10.x*c13y3*c23x2 + 3*c10.y*c13x3*c23y2 +
                3*c20.x*c13y3*c23x2 + c12y3*c13.x*c23x2 - c12x3*c13.y*c23y2 - 3*c10.x*c13x2*c13.y*c23y2 +
                3*c10.y*c13.x*c13y2*c23x2 - 2*c11.x*c12.y*c13x2*c23y2 + c11.x*c12.y*c13y2*c23x2 - c11.y*c12.x*c13x2*c23y2 +
                2*c11.y*c12.x*c13y2*c23x2 + 3*c20.x*c13x2*c13.y*c23y2 - c12.x*c12y2*c13.y*c23x2 -
                3*c20.y*c13.x*c13y2*c23x2 + c12x2*c12.y*c13.x*c23y2 - 3*c13.x*c22x2*c13y2*c22.y +
                c13x2*c13.y*c23.x*(6*c20.y*c23.y + 6*c21.y*c22.y) + c13x2*c22.x*c13.y*(6*c21.y*c23.y + 3*c22y2) +
                c13x3*(-2*c21.y*c22.y*c23.y - c20.y*c23y2 - c22.y*(2*c21.y*c23.y + c22y2) - c23.y*(2*c20.y*c23.y + 2*c21.y*c22.y)),
            6*c11.x*c12.x*c13.x*c13.y*c22.y*c23.y + c11.x*c12.y*c13.x*c22.x*c13.y*c23.y + c11.x*c12.y*c13.x*c13.y*c22.y*c23.x -
                c11.y*c12.x*c13.x*c22.x*c13.y*c23.y - c11.y*c12.x*c13.x*c13.y*c22.y*c23.x - 6*c11.y*c12.y*c13.x*c22.x*c13.y*c23.x -
                6*c10.x*c22.x*c13y3*c23.x + 6*c20.x*c22.x*c13y3*c23.x + 6*c10.y*c13x3*c22.y*c23.y + 2*c12y3*c13.x*c22.x*c23.x -
                2*c12x3*c13.y*c22.y*c23.y + 6*c10.x*c13.x*c22.x*c13y2*c23.y + 6*c10.x*c13.x*c13y2*c22.y*c23.x +
                6*c10.y*c13.x*c22.x*c13y2*c23.x - 3*c11.x*c12.x*c22.x*c13y2*c23.y - 3*c11.x*c12.x*c13y2*c22.y*c23.x +
                2*c11.x*c12.y*c22.x*c13y2*c23.x + 4*c11.y*c12.x*c22.x*c13y2*c23.x - 6*c10.x*c13x2*c13.y*c22.y*c23.y -
                6*c10.y*c13x2*c22.x*c13.y*c23.y - 6*c10.y*c13x2*c13.y*c22.y*c23.x - 4*c11.x*c12.y*c13x2*c22.y*c23.y -
                6*c20.x*c13.x*c22.x*c13y2*c23.y - 6*c20.x*c13.x*c13y2*c22.y*c23.x - 2*c11.y*c12.x*c13x2*c22.y*c23.y +
                3*c11.y*c12.y*c13x2*c22.x*c23.y + 3*c11.y*c12.y*c13x2*c22.y*c23.x - 2*c12.x*c12y2*c13.x*c22.x*c23.y -
                2*c12.x*c12y2*c13.x*c22.y*c23.x - 2*c12.x*c12y2*c22.x*c13.y*c23.x - 6*c20.y*c13.x*c22.x*c13y2*c23.x -
                6*c21.x*c13.x*c21.y*c13y2*c23.x - 6*c21.x*c13.x*c22.x*c13y2*c22.y + 6*c20.x*c13x2*c13.y*c22.y*c23.y +
                2*c12x2*c12.y*c13.x*c22.y*c23.y + 2*c12x2*c12.y*c22.x*c13.y*c23.y + 2*c12x2*c12.y*c13.y*c22.y*c23.x +
                3*c21.x*c22x2*c13y3 + 3*c21x2*c13y3*c23.x - 3*c13.x*c21.y*c22x2*c13y2 - 3*c21x2*c13.x*c13y2*c23.y +
                c13x2*c22.x*c13.y*(6*c20.y*c23.y + 6*c21.y*c22.y) + c13x2*c13.y*c23.x*(6*c20.y*c22.y + 3*c21y2) +
                c21.x*c13x2*c13.y*(6*c21.y*c23.y + 3*c22y2) + c13x3*(-2*c20.y*c22.y*c23.y - c23.y*(2*c20.y*c22.y + c21y2) -
                c21.y*(2*c21.y*c23.y + c22y2) - c22.y*(2*c20.y*c23.y + 2*c21.y*c22.y)),
            c11.x*c21.x*c12.y*c13.x*c13.y*c23.y + c11.x*c12.y*c13.x*c21.y*c13.y*c23.x + c11.x*c12.y*c13.x*c22.x*c13.y*c22.y -
                c11.y*c12.x*c21.x*c13.x*c13.y*c23.y - c11.y*c12.x*c13.x*c21.y*c13.y*c23.x - c11.y*c12.x*c13.x*c22.x*c13.y*c22.y -
                6*c11.y*c21.x*c12.y*c13.x*c13.y*c23.x - 6*c10.x*c21.x*c13y3*c23.x + 6*c20.x*c21.x*c13y3*c23.x +
                2*c21.x*c12y3*c13.x*c23.x + 6*c10.x*c21.x*c13.x*c13y2*c23.y + 6*c10.x*c13.x*c21.y*c13y2*c23.x +
                6*c10.x*c13.x*c22.x*c13y2*c22.y + 6*c10.y*c21.x*c13.x*c13y2*c23.x - 3*c11.x*c12.x*c21.x*c13y2*c23.y -
                3*c11.x*c12.x*c21.y*c13y2*c23.x - 3*c11.x*c12.x*c22.x*c13y2*c22.y + 2*c11.x*c21.x*c12.y*c13y2*c23.x +
                4*c11.y*c12.x*c21.x*c13y2*c23.x - 6*c10.y*c21.x*c13x2*c13.y*c23.y - 6*c10.y*c13x2*c21.y*c13.y*c23.x -
                6*c10.y*c13x2*c22.x*c13.y*c22.y - 6*c20.x*c21.x*c13.x*c13y2*c23.y - 6*c20.x*c13.x*c21.y*c13y2*c23.x -
                6*c20.x*c13.x*c22.x*c13y2*c22.y + 3*c11.y*c21.x*c12.y*c13x2*c23.y - 3*c11.y*c12.y*c13.x*c22x2*c13.y +
                3*c11.y*c12.y*c13x2*c21.y*c23.x + 3*c11.y*c12.y*c13x2*c22.x*c22.y - 2*c12.x*c21.x*c12y2*c13.x*c23.y -
                2*c12.x*c21.x*c12y2*c13.y*c23.x - 2*c12.x*c12y2*c13.x*c21.y*c23.x - 2*c12.x*c12y2*c13.x*c22.x*c22.y -
                6*c20.y*c21.x*c13.x*c13y2*c23.x - 6*c21.x*c13.x*c21.y*c22.x*c13y2 + 6*c20.y*c13x2*c21.y*c13.y*c23.x +
                2*c12x2*c21.x*c12.y*c13.y*c23.y + 2*c12x2*c12.y*c21.y*c13.y*c23.x + 2*c12x2*c12.y*c22.x*c13.y*c22.y -
                3*c10.x*c22x2*c13y3 + 3*c20.x*c22x2*c13y3 + 3*c21x2*c22.x*c13y3 + c12y3*c13.x*c22x2 +
                3*c10.y*c13.x*c22x2*c13y2 + c11.x*c12.y*c22x2*c13y2 + 2*c11.y*c12.x*c22x2*c13y2 -
                c12.x*c12y2*c22x2*c13.y - 3*c20.y*c13.x*c22x2*c13y2 - 3*c21x2*c13.x*c13y2*c22.y +
                c12x2*c12.y*c13.x*(2*c21.y*c23.y + c22y2) + c11.x*c12.x*c13.x*c13.y*(6*c21.y*c23.y + 3*c22y2) +
                c21.x*c13x2*c13.y*(6*c20.y*c23.y + 6*c21.y*c22.y) + c12x3*c13.y*(-2*c21.y*c23.y - c22y2) +
                c10.y*c13x3*(6*c21.y*c23.y + 3*c22y2) + c11.y*c12.x*c13x2*(-2*c21.y*c23.y - c22y2) +
                c11.x*c12.y*c13x2*(-4*c21.y*c23.y - 2*c22y2) + c10.x*c13x2*c13.y*(-6*c21.y*c23.y - 3*c22y2) +
                c13x2*c22.x*c13.y*(6*c20.y*c22.y + 3*c21y2) + c20.x*c13x2*c13.y*(6*c21.y*c23.y + 3*c22y2) +
                c13x3*(-2*c20.y*c21.y*c23.y - c22.y*(2*c20.y*c22.y + c21y2) - c20.y*(2*c21.y*c23.y + c22y2) -
                c21.y*(2*c20.y*c23.y + 2*c21.y*c22.y)),
            -c10.x*c11.x*c12.y*c13.x*c13.y*c23.y + c10.x*c11.y*c12.x*c13.x*c13.y*c23.y + 6*c10.x*c11.y*c12.y*c13.x*c13.y*c23.x -
                6*c10.y*c11.x*c12.x*c13.x*c13.y*c23.y - c10.y*c11.x*c12.y*c13.x*c13.y*c23.x + c10.y*c11.y*c12.x*c13.x*c13.y*c23.x +
                c11.x*c11.y*c12.x*c12.y*c13.x*c23.y - c11.x*c11.y*c12.x*c12.y*c13.y*c23.x + c11.x*c20.x*c12.y*c13.x*c13.y*c23.y +
                c11.x*c20.y*c12.y*c13.x*c13.y*c23.x + c11.x*c21.x*c12.y*c13.x*c13.y*c22.y + c11.x*c12.y*c13.x*c21.y*c22.x*c13.y -
                c20.x*c11.y*c12.x*c13.x*c13.y*c23.y - 6*c20.x*c11.y*c12.y*c13.x*c13.y*c23.x - c11.y*c12.x*c20.y*c13.x*c13.y*c23.x -
                c11.y*c12.x*c21.x*c13.x*c13.y*c22.y - c11.y*c12.x*c13.x*c21.y*c22.x*c13.y - 6*c11.y*c21.x*c12.y*c13.x*c22.x*c13.y -
                6*c10.x*c20.x*c13y3*c23.x - 6*c10.x*c21.x*c22.x*c13y3 - 2*c10.x*c12y3*c13.x*c23.x + 6*c20.x*c21.x*c22.x*c13y3 +
                2*c20.x*c12y3*c13.x*c23.x + 2*c21.x*c12y3*c13.x*c22.x + 2*c10.y*c12x3*c13.y*c23.y - 6*c10.x*c10.y*c13.x*c13y2*c23.x +
                3*c10.x*c11.x*c12.x*c13y2*c23.y - 2*c10.x*c11.x*c12.y*c13y2*c23.x - 4*c10.x*c11.y*c12.x*c13y2*c23.x +
                3*c10.y*c11.x*c12.x*c13y2*c23.x + 6*c10.x*c10.y*c13x2*c13.y*c23.y + 6*c10.x*c20.x*c13.x*c13y2*c23.y -
                3*c10.x*c11.y*c12.y*c13x2*c23.y + 2*c10.x*c12.x*c12y2*c13.x*c23.y + 2*c10.x*c12.x*c12y2*c13.y*c23.x +
                6*c10.x*c20.y*c13.x*c13y2*c23.x + 6*c10.x*c21.x*c13.x*c13y2*c22.y + 6*c10.x*c13.x*c21.y*c22.x*c13y2 +
                4*c10.y*c11.x*c12.y*c13x2*c23.y + 6*c10.y*c20.x*c13.x*c13y2*c23.x + 2*c10.y*c11.y*c12.x*c13x2*c23.y -
                3*c10.y*c11.y*c12.y*c13x2*c23.x + 2*c10.y*c12.x*c12y2*c13.x*c23.x + 6*c10.y*c21.x*c13.x*c22.x*c13y2 -
                3*c11.x*c20.x*c12.x*c13y2*c23.y + 2*c11.x*c20.x*c12.y*c13y2*c23.x + c11.x*c11.y*c12y2*c13.x*c23.x -
                3*c11.x*c12.x*c20.y*c13y2*c23.x - 3*c11.x*c12.x*c21.x*c13y2*c22.y - 3*c11.x*c12.x*c21.y*c22.x*c13y2 +
                2*c11.x*c21.x*c12.y*c22.x*c13y2 + 4*c20.x*c11.y*c12.x*c13y2*c23.x + 4*c11.y*c12.x*c21.x*c22.x*c13y2 -
                2*c10.x*c12x2*c12.y*c13.y*c23.y - 6*c10.y*c20.x*c13x2*c13.y*c23.y - 6*c10.y*c20.y*c13x2*c13.y*c23.x -
                6*c10.y*c21.x*c13x2*c13.y*c22.y - 2*c10.y*c12x2*c12.y*c13.x*c23.y - 2*c10.y*c12x2*c12.y*c13.y*c23.x -
                6*c10.y*c13x2*c21.y*c22.x*c13.y - c11.x*c11.y*c12x2*c13.y*c23.y - 2*c11.x*c11y2*c13.x*c13.y*c23.x +
                3*c20.x*c11.y*c12.y*c13x2*c23.y - 2*c20.x*c12.x*c12y2*c13.x*c23.y - 2*c20.x*c12.x*c12y2*c13.y*c23.x -
                6*c20.x*c20.y*c13.x*c13y2*c23.x - 6*c20.x*c21.x*c13.x*c13y2*c22.y - 6*c20.x*c13.x*c21.y*c22.x*c13y2 +
                3*c11.y*c20.y*c12.y*c13x2*c23.x + 3*c11.y*c21.x*c12.y*c13x2*c22.y + 3*c11.y*c12.y*c13x2*c21.y*c22.x -
                2*c12.x*c20.y*c12y2*c13.x*c23.x - 2*c12.x*c21.x*c12y2*c13.x*c22.y - 2*c12.x*c21.x*c12y2*c22.x*c13.y -
                2*c12.x*c12y2*c13.x*c21.y*c22.x - 6*c20.y*c21.x*c13.x*c22.x*c13y2 - c11y2*c12.x*c12.y*c13.x*c23.x +
                2*c20.x*c12x2*c12.y*c13.y*c23.y + 6*c20.y*c13x2*c21.y*c22.x*c13.y + 2*c11x2*c11.y*c13.x*c13.y*c23.y +
                c11x2*c12.x*c12.y*c13.y*c23.y + 2*c12x2*c20.y*c12.y*c13.y*c23.x + 2*c12x2*c21.x*c12.y*c13.y*c22.y +
                2*c12x2*c12.y*c21.y*c22.x*c13.y + c21x3*c13y3 + 3*c10x2*c13y3*c23.x - 3*c10y2*c13x3*c23.y +
                3*c20x2*c13y3*c23.x + c11y3*c13x2*c23.x - c11x3*c13y2*c23.y - c11.x*c11y2*c13x2*c23.y +
                c11x2*c11.y*c13y2*c23.x - 3*c10x2*c13.x*c13y2*c23.y + 3*c10y2*c13x2*c13.y*c23.x - c11x2*c12y2*c13.x*c23.y +
                c11y2*c12x2*c13.y*c23.x - 3*c21x2*c13.x*c21.y*c13y2 - 3*c20x2*c13.x*c13y2*c23.y + 3*c20y2*c13x2*c13.y*c23.x +
                c11.x*c12.x*c13.x*c13.y*(6*c20.y*c23.y + 6*c21.y*c22.y) + c12x3*c13.y*(-2*c20.y*c23.y - 2*c21.y*c22.y) +
                c10.y*c13x3*(6*c20.y*c23.y + 6*c21.y*c22.y) + c11.y*c12.x*c13x2*(-2*c20.y*c23.y - 2*c21.y*c22.y) +
                c12x2*c12.y*c13.x*(2*c20.y*c23.y + 2*c21.y*c22.y) + c11.x*c12.y*c13x2*(-4*c20.y*c23.y - 4*c21.y*c22.y) +
                c10.x*c13x2*c13.y*(-6*c20.y*c23.y - 6*c21.y*c22.y) + c20.x*c13x2*c13.y*(6*c20.y*c23.y + 6*c21.y*c22.y) +
                c21.x*c13x2*c13.y*(6*c20.y*c22.y + 3*c21y2) + c13x3*(-2*c20.y*c21.y*c22.y - c20y2*c23.y -
                c21.y*(2*c20.y*c22.y + c21y2) - c20.y*(2*c20.y*c23.y + 2*c21.y*c22.y)),
            -c10.x*c11.x*c12.y*c13.x*c13.y*c22.y + c10.x*c11.y*c12.x*c13.x*c13.y*c22.y + 6*c10.x*c11.y*c12.y*c13.x*c22.x*c13.y -
                6*c10.y*c11.x*c12.x*c13.x*c13.y*c22.y - c10.y*c11.x*c12.y*c13.x*c22.x*c13.y + c10.y*c11.y*c12.x*c13.x*c22.x*c13.y +
                c11.x*c11.y*c12.x*c12.y*c13.x*c22.y - c11.x*c11.y*c12.x*c12.y*c22.x*c13.y + c11.x*c20.x*c12.y*c13.x*c13.y*c22.y +
                c11.x*c20.y*c12.y*c13.x*c22.x*c13.y + c11.x*c21.x*c12.y*c13.x*c21.y*c13.y - c20.x*c11.y*c12.x*c13.x*c13.y*c22.y -
                6*c20.x*c11.y*c12.y*c13.x*c22.x*c13.y - c11.y*c12.x*c20.y*c13.x*c22.x*c13.y - c11.y*c12.x*c21.x*c13.x*c21.y*c13.y -
                6*c10.x*c20.x*c22.x*c13y3 - 2*c10.x*c12y3*c13.x*c22.x + 2*c20.x*c12y3*c13.x*c22.x + 2*c10.y*c12x3*c13.y*c22.y -
                6*c10.x*c10.y*c13.x*c22.x*c13y2 + 3*c10.x*c11.x*c12.x*c13y2*c22.y - 2*c10.x*c11.x*c12.y*c22.x*c13y2 -
                4*c10.x*c11.y*c12.x*c22.x*c13y2 + 3*c10.y*c11.x*c12.x*c22.x*c13y2 + 6*c10.x*c10.y*c13x2*c13.y*c22.y +
                6*c10.x*c20.x*c13.x*c13y2*c22.y - 3*c10.x*c11.y*c12.y*c13x2*c22.y + 2*c10.x*c12.x*c12y2*c13.x*c22.y +
                2*c10.x*c12.x*c12y2*c22.x*c13.y + 6*c10.x*c20.y*c13.x*c22.x*c13y2 + 6*c10.x*c21.x*c13.x*c21.y*c13y2 +
                4*c10.y*c11.x*c12.y*c13x2*c22.y + 6*c10.y*c20.x*c13.x*c22.x*c13y2 + 2*c10.y*c11.y*c12.x*c13x2*c22.y -
                3*c10.y*c11.y*c12.y*c13x2*c22.x + 2*c10.y*c12.x*c12y2*c13.x*c22.x - 3*c11.x*c20.x*c12.x*c13y2*c22.y +
                2*c11.x*c20.x*c12.y*c22.x*c13y2 + c11.x*c11.y*c12y2*c13.x*c22.x - 3*c11.x*c12.x*c20.y*c22.x*c13y2 -
                3*c11.x*c12.x*c21.x*c21.y*c13y2 + 4*c20.x*c11.y*c12.x*c22.x*c13y2 - 2*c10.x*c12x2*c12.y*c13.y*c22.y -
                6*c10.y*c20.x*c13x2*c13.y*c22.y - 6*c10.y*c20.y*c13x2*c22.x*c13.y - 6*c10.y*c21.x*c13x2*c21.y*c13.y -
                2*c10.y*c12x2*c12.y*c13.x*c22.y - 2*c10.y*c12x2*c12.y*c22.x*c13.y - c11.x*c11.y*c12x2*c13.y*c22.y -
                2*c11.x*c11y2*c13.x*c22.x*c13.y + 3*c20.x*c11.y*c12.y*c13x2*c22.y - 2*c20.x*c12.x*c12y2*c13.x*c22.y -
                2*c20.x*c12.x*c12y2*c22.x*c13.y - 6*c20.x*c20.y*c13.x*c22.x*c13y2 - 6*c20.x*c21.x*c13.x*c21.y*c13y2 +
                3*c11.y*c20.y*c12.y*c13x2*c22.x + 3*c11.y*c21.x*c12.y*c13x2*c21.y - 2*c12.x*c20.y*c12y2*c13.x*c22.x -
                2*c12.x*c21.x*c12y2*c13.x*c21.y - c11y2*c12.x*c12.y*c13.x*c22.x + 2*c20.x*c12x2*c12.y*c13.y*c22.y -
                3*c11.y*c21x2*c12.y*c13.x*c13.y + 6*c20.y*c21.x*c13x2*c21.y*c13.y + 2*c11x2*c11.y*c13.x*c13.y*c22.y +
                c11x2*c12.x*c12.y*c13.y*c22.y + 2*c12x2*c20.y*c12.y*c22.x*c13.y + 2*c12x2*c21.x*c12.y*c21.y*c13.y -
                3*c10.x*c21x2*c13y3 + 3*c20.x*c21x2*c13y3 + 3*c10x2*c22.x*c13y3 - 3*c10y2*c13x3*c22.y + 3*c20x2*c22.x*c13y3 +
                c21x2*c12y3*c13.x + c11y3*c13x2*c22.x - c11x3*c13y2*c22.y + 3*c10.y*c21x2*c13.x*c13y2 -
                c11.x*c11y2*c13x2*c22.y + c11.x*c21x2*c12.y*c13y2 + 2*c11.y*c12.x*c21x2*c13y2 + c11x2*c11.y*c22.x*c13y2 -
                c12.x*c21x2*c12y2*c13.y - 3*c20.y*c21x2*c13.x*c13y2 - 3*c10x2*c13.x*c13y2*c22.y + 3*c10y2*c13x2*c22.x*c13.y -
                c11x2*c12y2*c13.x*c22.y + c11y2*c12x2*c22.x*c13.y - 3*c20x2*c13.x*c13y2*c22.y + 3*c20y2*c13x2*c22.x*c13.y +
                c12x2*c12.y*c13.x*(2*c20.y*c22.y + c21y2) + c11.x*c12.x*c13.x*c13.y*(6*c20.y*c22.y + 3*c21y2) +
                c12x3*c13.y*(-2*c20.y*c22.y - c21y2) + c10.y*c13x3*(6*c20.y*c22.y + 3*c21y2) +
                c11.y*c12.x*c13x2*(-2*c20.y*c22.y - c21y2) + c11.x*c12.y*c13x2*(-4*c20.y*c22.y - 2*c21y2) +
                c10.x*c13x2*c13.y*(-6*c20.y*c22.y - 3*c21y2) + c20.x*c13x2*c13.y*(6*c20.y*c22.y + 3*c21y2) +
                c13x3*(-2*c20.y*c21y2 - c20y2*c22.y - c20.y*(2*c20.y*c22.y + c21y2)),
            -c10.x*c11.x*c12.y*c13.x*c21.y*c13.y + c10.x*c11.y*c12.x*c13.x*c21.y*c13.y + 6*c10.x*c11.y*c21.x*c12.y*c13.x*c13.y -
                6*c10.y*c11.x*c12.x*c13.x*c21.y*c13.y - c10.y*c11.x*c21.x*c12.y*c13.x*c13.y + c10.y*c11.y*c12.x*c21.x*c13.x*c13.y -
                c11.x*c11.y*c12.x*c21.x*c12.y*c13.y + c11.x*c11.y*c12.x*c12.y*c13.x*c21.y + c11.x*c20.x*c12.y*c13.x*c21.y*c13.y +
                6*c11.x*c12.x*c20.y*c13.x*c21.y*c13.y + c11.x*c20.y*c21.x*c12.y*c13.x*c13.y - c20.x*c11.y*c12.x*c13.x*c21.y*c13.y -
                6*c20.x*c11.y*c21.x*c12.y*c13.x*c13.y - c11.y*c12.x*c20.y*c21.x*c13.x*c13.y - 6*c10.x*c20.x*c21.x*c13y3 -
                2*c10.x*c21.x*c12y3*c13.x + 6*c10.y*c20.y*c13x3*c21.y + 2*c20.x*c21.x*c12y3*c13.x + 2*c10.y*c12x3*c21.y*c13.y -
                2*c12x3*c20.y*c21.y*c13.y - 6*c10.x*c10.y*c21.x*c13.x*c13y2 + 3*c10.x*c11.x*c12.x*c21.y*c13y2 -
                2*c10.x*c11.x*c21.x*c12.y*c13y2 - 4*c10.x*c11.y*c12.x*c21.x*c13y2 + 3*c10.y*c11.x*c12.x*c21.x*c13y2 +
                6*c10.x*c10.y*c13x2*c21.y*c13.y + 6*c10.x*c20.x*c13.x*c21.y*c13y2 - 3*c10.x*c11.y*c12.y*c13x2*c21.y +
                2*c10.x*c12.x*c21.x*c12y2*c13.y + 2*c10.x*c12.x*c12y2*c13.x*c21.y + 6*c10.x*c20.y*c21.x*c13.x*c13y2 +
                4*c10.y*c11.x*c12.y*c13x2*c21.y + 6*c10.y*c20.x*c21.x*c13.x*c13y2 + 2*c10.y*c11.y*c12.x*c13x2*c21.y -
                3*c10.y*c11.y*c21.x*c12.y*c13x2 + 2*c10.y*c12.x*c21.x*c12y2*c13.x - 3*c11.x*c20.x*c12.x*c21.y*c13y2 +
                2*c11.x*c20.x*c21.x*c12.y*c13y2 + c11.x*c11.y*c21.x*c12y2*c13.x - 3*c11.x*c12.x*c20.y*c21.x*c13y2 +
                4*c20.x*c11.y*c12.x*c21.x*c13y2 - 6*c10.x*c20.y*c13x2*c21.y*c13.y - 2*c10.x*c12x2*c12.y*c21.y*c13.y -
                6*c10.y*c20.x*c13x2*c21.y*c13.y - 6*c10.y*c20.y*c21.x*c13x2*c13.y - 2*c10.y*c12x2*c21.x*c12.y*c13.y -
                2*c10.y*c12x2*c12.y*c13.x*c21.y - c11.x*c11.y*c12x2*c21.y*c13.y - 4*c11.x*c20.y*c12.y*c13x2*c21.y -
                2*c11.x*c11y2*c21.x*c13.x*c13.y + 3*c20.x*c11.y*c12.y*c13x2*c21.y - 2*c20.x*c12.x*c21.x*c12y2*c13.y -
                2*c20.x*c12.x*c12y2*c13.x*c21.y - 6*c20.x*c20.y*c21.x*c13.x*c13y2 - 2*c11.y*c12.x*c20.y*c13x2*c21.y +
                3*c11.y*c20.y*c21.x*c12.y*c13x2 - 2*c12.x*c20.y*c21.x*c12y2*c13.x - c11y2*c12.x*c21.x*c12.y*c13.x +
                6*c20.x*c20.y*c13x2*c21.y*c13.y + 2*c20.x*c12x2*c12.y*c21.y*c13.y + 2*c11x2*c11.y*c13.x*c21.y*c13.y +
                c11x2*c12.x*c12.y*c21.y*c13.y + 2*c12x2*c20.y*c21.x*c12.y*c13.y + 2*c12x2*c20.y*c12.y*c13.x*c21.y +
                3*c10x2*c21.x*c13y3 - 3*c10y2*c13x3*c21.y + 3*c20x2*c21.x*c13y3 + c11y3*c21.x*c13x2 - c11x3*c21.y*c13y2 -
                3*c20y2*c13x3*c21.y - c11.x*c11y2*c13x2*c21.y + c11x2*c11.y*c21.x*c13y2 - 3*c10x2*c13.x*c21.y*c13y2 +
                3*c10y2*c21.x*c13x2*c13.y - c11x2*c12y2*c13.x*c21.y + c11y2*c12x2*c21.x*c13.y - 3*c20x2*c13.x*c21.y*c13y2 +
                3*c20y2*c21.x*c13x2*c13.y,
            c10.x*c10.y*c11.x*c12.y*c13.x*c13.y - c10.x*c10.y*c11.y*c12.x*c13.x*c13.y + c10.x*c11.x*c11.y*c12.x*c12.y*c13.y -
                c10.y*c11.x*c11.y*c12.x*c12.y*c13.x - c10.x*c11.x*c20.y*c12.y*c13.x*c13.y + 6*c10.x*c20.x*c11.y*c12.y*c13.x*c13.y +
                c10.x*c11.y*c12.x*c20.y*c13.x*c13.y - c10.y*c11.x*c20.x*c12.y*c13.x*c13.y - 6*c10.y*c11.x*c12.x*c20.y*c13.x*c13.y +
                c10.y*c20.x*c11.y*c12.x*c13.x*c13.y - c11.x*c20.x*c11.y*c12.x*c12.y*c13.y + c11.x*c11.y*c12.x*c20.y*c12.y*c13.x +
                c11.x*c20.x*c20.y*c12.y*c13.x*c13.y - c20.x*c11.y*c12.x*c20.y*c13.x*c13.y - 2*c10.x*c20.x*c12y3*c13.x +
                2*c10.y*c12x3*c20.y*c13.y - 3*c10.x*c10.y*c11.x*c12.x*c13y2 - 6*c10.x*c10.y*c20.x*c13.x*c13y2 +
                3*c10.x*c10.y*c11.y*c12.y*c13x2 - 2*c10.x*c10.y*c12.x*c12y2*c13.x - 2*c10.x*c11.x*c20.x*c12.y*c13y2 -
                c10.x*c11.x*c11.y*c12y2*c13.x + 3*c10.x*c11.x*c12.x*c20.y*c13y2 - 4*c10.x*c20.x*c11.y*c12.x*c13y2 +
                3*c10.y*c11.x*c20.x*c12.x*c13y2 + 6*c10.x*c10.y*c20.y*c13x2*c13.y + 2*c10.x*c10.y*c12x2*c12.y*c13.y +
                2*c10.x*c11.x*c11y2*c13.x*c13.y + 2*c10.x*c20.x*c12.x*c12y2*c13.y + 6*c10.x*c20.x*c20.y*c13.x*c13y2 -
                3*c10.x*c11.y*c20.y*c12.y*c13x2 + 2*c10.x*c12.x*c20.y*c12y2*c13.x + c10.x*c11y2*c12.x*c12.y*c13.x +
                c10.y*c11.x*c11.y*c12x2*c13.y + 4*c10.y*c11.x*c20.y*c12.y*c13x2 - 3*c10.y*c20.x*c11.y*c12.y*c13x2 +
                2*c10.y*c20.x*c12.x*c12y2*c13.x + 2*c10.y*c11.y*c12.x*c20.y*c13x2 + c11.x*c20.x*c11.y*c12y2*c13.x -
                3*c11.x*c20.x*c12.x*c20.y*c13y2 - 2*c10.x*c12x2*c20.y*c12.y*c13.y - 6*c10.y*c20.x*c20.y*c13x2*c13.y -
                2*c10.y*c20.x*c12x2*c12.y*c13.y - 2*c10.y*c11x2*c11.y*c13.x*c13.y - c10.y*c11x2*c12.x*c12.y*c13.y -
                2*c10.y*c12x2*c20.y*c12.y*c13.x - 2*c11.x*c20.x*c11y2*c13.x*c13.y - c11.x*c11.y*c12x2*c20.y*c13.y +
                3*c20.x*c11.y*c20.y*c12.y*c13x2 - 2*c20.x*c12.x*c20.y*c12y2*c13.x - c20.x*c11y2*c12.x*c12.y*c13.x +
                3*c10y2*c11.x*c12.x*c13.x*c13.y + 3*c11.x*c12.x*c20y2*c13.x*c13.y + 2*c20.x*c12x2*c20.y*c12.y*c13.y -
                3*c10x2*c11.y*c12.y*c13.x*c13.y + 2*c11x2*c11.y*c20.y*c13.x*c13.y + c11x2*c12.x*c20.y*c12.y*c13.y -
                3*c20x2*c11.y*c12.y*c13.x*c13.y - c10x3*c13y3 + c10y3*c13x3 + c20x3*c13y3 - c20y3*c13x3 -
                3*c10.x*c20x2*c13y3 - c10.x*c11y3*c13x2 + 3*c10x2*c20.x*c13y3 + c10.y*c11x3*c13y2 +
                3*c10.y*c20y2*c13x3 + c20.x*c11y3*c13x2 + c10x2*c12y3*c13.x - 3*c10y2*c20.y*c13x3 - c10y2*c12x3*c13.y +
                c20x2*c12y3*c13.x - c11x3*c20.y*c13y2 - c12x3*c20y2*c13.y - c10.x*c11x2*c11.y*c13y2 +
                c10.y*c11.x*c11y2*c13x2 - 3*c10.x*c10y2*c13x2*c13.y - c10.x*c11y2*c12x2*c13.y + c10.y*c11x2*c12y2*c13.x -
                c11.x*c11y2*c20.y*c13x2 + 3*c10x2*c10.y*c13.x*c13y2 + c10x2*c11.x*c12.y*c13y2 +
                2*c10x2*c11.y*c12.x*c13y2 - 2*c10y2*c11.x*c12.y*c13x2 - c10y2*c11.y*c12.x*c13x2 + c11x2*c20.x*c11.y*c13y2 -
                3*c10.x*c20y2*c13x2*c13.y + 3*c10.y*c20x2*c13.x*c13y2 + c11.x*c20x2*c12.y*c13y2 - 2*c11.x*c20y2*c12.y*c13x2 +
                c20.x*c11y2*c12x2*c13.y - c11.y*c12.x*c20y2*c13x2 - c10x2*c12.x*c12y2*c13.y - 3*c10x2*c20.y*c13.x*c13y2 +
                3*c10y2*c20.x*c13x2*c13.y + c10y2*c12x2*c12.y*c13.x - c11x2*c20.y*c12y2*c13.x + 2*c20x2*c11.y*c12.x*c13y2 +
                3*c20.x*c20y2*c13x2*c13.y - c20x2*c12.x*c12y2*c13.y - 3*c20x2*c20.y*c13.x*c13y2 + c12x2*c20y2*c12.y*c13.x
        );
        var roots = poly.getRootsInInterval(0,1);
        Intersection.Utils.removeMultipleRootsIn01(roots);

        for ( var i = 0; i < roots.length; i++ ) {
            var s = roots[i];
            var xRoots = new Polynomial(
                c13.x,
                c12.x,
                c11.x,
                c10.x - c20.x - s*c21.x - s*s*c22.x - s*s*s*c23.x
            ).getRoots();
            var yRoots = new Polynomial(
                c13.y,
                c12.y,
                c11.y,
                c10.y - c20.y - s*c21.y - s*s*c22.y - s*s*s*c23.y
            ).getRoots();

            if ( xRoots.length > 0 && yRoots.length > 0 ) {
                var TOLERANCE = 1e-4;

                checkRoots:
                    for ( var j = 0; j < xRoots.length; j++ ) {
                        var xRoot = xRoots[j];

                        if ( 0 <= xRoot && xRoot <= 1 ) {
                            for ( var k = 0; k < yRoots.length; k++ ) {
                                if ( Math.abs( xRoot - yRoots[k] ) < TOLERANCE ) {
                                    var v = c23.multiply(s * s * s).add(c22.multiply(s * s).add(c21.multiply(s).add(c20)));
                                    result.points.push(new Point2D(v.x, v.y));
                                    break checkRoots;
                                }
                            }
                        }
                    }
            }
        }

        return result;
    };

    /**
     *  intersectBezier3Ellipse
     *
     *  @param {Point2D} p1
     *  @param {Point2D} p2
     *  @param {Point2D} p3
     *  @param {Point2D} p4
     *  @param {Point2D} ec
     *  @param {Number} rx
     *  @param {Number} ry
     *  @returns {Intersection}
     */
    Intersection.intersectBezier3Ellipse = function(p1, p2, p3, p4, ec, rx, ry) {
        var a, b, c, d;       // temporary variables
        var c3, c2, c1, c0;   // coefficients of cubic
        var result = new Intersection();

        // Calculate the coefficients of cubic polynomial
        a = p1.multiply(-1);
        b = p2.multiply(3);
        c = p3.multiply(-3);
        d = a.add(b.add(c.add(p4)));
        c3 = new Vector2D(d.x, d.y);

        a = p1.multiply(3);
        b = p2.multiply(-6);
        c = p3.multiply(3);
        d = a.add(b.add(c));
        c2 = new Vector2D(d.x, d.y);

        a = p1.multiply(-3);
        b = p2.multiply(3);
        c = a.add(b);
        c1 = new Vector2D(c.x, c.y);

        c0 = new Vector2D(p1.x, p1.y);

        var rxrx  = rx*rx;
        var ryry  = ry*ry;
        var poly = new Polynomial(
            c3.x*c3.x*ryry + c3.y*c3.y*rxrx,
            2*(c3.x*c2.x*ryry + c3.y*c2.y*rxrx),
            2*(c3.x*c1.x*ryry + c3.y*c1.y*rxrx) + c2.x*c2.x*ryry + c2.y*c2.y*rxrx,
            2*c3.x*ryry*(c0.x - ec.x) + 2*c3.y*rxrx*(c0.y - ec.y) +
                2*(c2.x*c1.x*ryry + c2.y*c1.y*rxrx),
            2*c2.x*ryry*(c0.x - ec.x) + 2*c2.y*rxrx*(c0.y - ec.y) +
                c1.x*c1.x*ryry + c1.y*c1.y*rxrx,
            2*c1.x*ryry*(c0.x - ec.x) + 2*c1.y*rxrx*(c0.y - ec.y),
            c0.x*c0.x*ryry - 2*c0.y*ec.y*rxrx - 2*c0.x*ec.x*ryry +
                c0.y*c0.y*rxrx + ec.x*ec.x*ryry + ec.y*ec.y*rxrx - rxrx*ryry
        );
        var roots = poly.getRootsInInterval(0,1);
        Intersection.Utils.removeMultipleRootsIn01(roots);

        for ( var i = 0; i < roots.length; i++ ) {
            var t = roots[i];
            var v = c3.multiply(t * t * t).add(c2.multiply(t * t).add(c1.multiply(t).add(c0)));
            result.points.push(new Point2D(v.x, v.y));
        }

        return result;
    };


    /**
     *  intersectBezier3Line
     *
     *  Many thanks to Dan Sunday at SoftSurfer.com.  He gave me a very thorough
     *  sketch of the algorithm used here.  Without his help, I'm not sure when I
     *  would have figured out this intersection problem.
     *
     *  @param {Point2D} p1
     *  @param {Point2D} p2
     *  @param {Point2D} p3
     *  @param {Point2D} p4
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @returns {Intersection}
     */
    Intersection.intersectBezier3Line = function(p1, p2, p3, p4, a1, a2) {
        var a, b, c, d;       // temporary variables
        var c3, c2, c1, c0;   // coefficients of cubic
        var cl;               // c coefficient for normal form of line
        var n;                // normal for normal form of line
        var min = a1.min(a2); // used to determine if point is on line segment
        var max = a1.max(a2); // used to determine if point is on line segment
        var result = new Intersection();

        // Start with Bezier using Bernstein polynomials for weighting functions:
        //     (1-t^3)P1 + 3t(1-t)^2P2 + 3t^2(1-t)P3 + t^3P4
        //
        // Expand and collect terms to form linear combinations of original Bezier
        // controls.  This ends up with a vector cubic in t:
        //     (-P1+3P2-3P3+P4)t^3 + (3P1-6P2+3P3)t^2 + (-3P1+3P2)t + P1
        //             /\                  /\                /\       /\
        //             ||                  ||                ||       ||
        //             c3                  c2                c1       c0

        // Calculate the coefficients
        a = p1.multiply(-1);
        b = p2.multiply(3);
        c = p3.multiply(-3);
        d = a.add(b.add(c.add(p4)));
        c3 = new Vector2D(d.x, d.y);

        a = p1.multiply(3);
        b = p2.multiply(-6);
        c = p3.multiply(3);
        d = a.add(b.add(c));
        c2 = new Vector2D(d.x, d.y);

        a = p1.multiply(-3);
        b = p2.multiply(3);
        c = a.add(b);
        c1 = new Vector2D(c.x, c.y);

        c0 = new Vector2D(p1.x, p1.y);

        // Convert line to normal form: ax + by + c = 0
        // Find normal to line: negative inverse of original line's slope
        n = new Vector2D(a1.y - a2.y, a2.x - a1.x);

        // Determine new c coefficient
        cl = a1.x*a2.y - a2.x*a1.y;

        // ?Rotate each cubic coefficient using line for new coordinate system?
        // Find roots of rotated cubic
        roots = new Polynomial(
            n.dot(c3),
            n.dot(c2),
            n.dot(c1),
            n.dot(c0) + cl
        ).getRoots();

        // Any roots in closed interval [0,1] are intersections on Bezier, but
        // might not be on the line segment.
        // Find intersections and calculate point coordinates
        for ( var i = 0; i < roots.length; i++ ) {
            var t = roots[i];

            if ( 0 <= t && t <= 1 ) {
                // We're within the Bezier curve
                // Find point on Bezier
                var p5 = p1.lerp(p2, t);
                var p6 = p2.lerp(p3, t);
                var p7 = p3.lerp(p4, t);

                var p8 = p5.lerp(p6, t);
                var p9 = p6.lerp(p7, t);

                var p10 = p8.lerp(p9, t);

                // See if point is on line segment
                // Had to make special cases for vertical and horizontal lines due
                // to slight errors in calculation of p10
                if ( a1.x == a2.x ) {
                    if ( min.y <= p10.y && p10.y <= max.y ) {
                        result.appendPoint( p10 );
                    }
                } else if ( a1.y == a2.y ) {
                    if ( min.x <= p10.x && p10.x <= max.x ) {
                        result.appendPoint( p10 );
                    }
                } else if (min.x <= p10.x && p10.x <= max.x && min.y <= p10.y && p10.y <= max.y) {
                    result.appendPoint( p10 );
                }
            }
        }

        return result;
    };


    /**
     *  Finds intersection points of two ellipses. <br/>
     *   
     *  This code is based on MgcIntr2DElpElp.cpp written by David Eberly. His
     *  code along with many other excellent examples are avaiable at his site:
     *  http://www.geometrictools.com
     * 
     *  Changes - 2015 Robert Benko (Quazistax)
     *  
     *  @param {Point2D} c1
     *  @param {Number} rx1
     *  @param {Number} ry1
     *  @param {Point2D} c2
     *  @param {Number} rx2
     *  @param {Number} ry2
     *  @returns {Intersection}
     */
    Intersection.intersectEllipseEllipse = function (c1, rx1, ry1, c2, rx2, ry2) {
        var a = [
            ry1 * ry1, 0, rx1 * rx1, -2 * ry1 * ry1 * c1.x, -2 * rx1 * rx1 * c1.y,
            ry1 * ry1 * c1.x * c1.x + rx1 * rx1 * c1.y * c1.y - rx1 * rx1 * ry1 * ry1
        ];
        var b = [
            ry2 * ry2, 0, rx2 * rx2, -2 * ry2 * ry2 * c2.x, -2 * rx2 * rx2 * c2.y,
            ry2 * ry2 * c2.x * c2.x + rx2 * rx2 * c2.y * c2.y - rx2 * rx2 * ry2 * ry2
        ];

        var yPoly = Intersection.Utils.bezout (a, b);
        var yRoots = yPoly.getRoots();
        var epsilon = 1e-3;
        var norm0 = (a[0] * a[0] + 2 * a[1] * a[1] + a[2] * a[2]) * epsilon;
        var norm1 = (b[0] * b[0] + 2 * b[1] * b[1] + b[2] * b[2]) * epsilon;
        var result = new Intersection();

        var i;
        //Handling root calculation error causing not detecting intersection
        var clip = function (val, min, max) { return Math.max(min, Math.min(max, val)); };
        for (i = 0 ; i < yRoots.length; i++) {
            yRoots[i] = clip(yRoots[i], c1.y - ry1, c1.y + ry1);
            yRoots[i] = clip(yRoots[i], c2.y - ry2, c2.y + ry2);
        }

        //For detection of multiplicated intersection points
        yRoots.sort(function (a, b) { return a - b; });
        var rootPointsN = [];

        for (var y = 0; y < yRoots.length; y++) {
            var xPoly = new Polynomial(
                a[0],
                a[3] + yRoots[y] * a[1],
                a[5] + yRoots[y] * (a[4] + yRoots[y] * a[2])
            );
            var ERRF = 1e-15;
            if (Math.abs(xPoly.coefs[0]) < 10 * ERRF * Math.abs(xPoly.coefs[2]))
                xPoly.coefs[0] = 0;
            var xRoots = xPoly.getRoots();

            rootPointsN.push(0);
            for (var x = 0; x < xRoots.length; x++) {
                var test =
                    (a[0] * xRoots[x] + a[1] * yRoots[y] + a[3]) * xRoots[x] +
                    (a[2] * yRoots[y] + a[4]) * yRoots[y] + a[5];
                if (Math.abs(test) < norm0) {
                    test =
                        (b[0] * xRoots[x] + b[1] * yRoots[y] + b[3]) * xRoots[x] +
                        (b[2] * yRoots[y] + b[4]) * yRoots[y] + b[5];
                    if (Math.abs(test) < norm1) {
                        result.appendPoint(new Point2D(xRoots[x], yRoots[y]));
                        rootPointsN[y] += 1;
                    }
                }
            }
        }

        if (result.points.length <= 0)
            return result;

        //Removal of multiplicated intersection points
        var pts = result.points;
        if (pts.length == 8) {
            pts = pts.splice(0, 6);
            pts.splice(2, 2);
        }
        else if (pts.length == 7) {
            pts = pts.splice(0, 6);
            pts.splice(2, 2);
            pts.splice(rootPointsN.indexOf(1), 1);
        }
        else if (pts.length == 6) {
            pts.splice(2, 2);
            //console.log('ElEl 6pts: N: ' + rootPointsN.toString());
            if (rootPointsN.indexOf(0) > -1) {
                if (pts[0].distanceFrom(pts[1]) < pts[2].distanceFrom(pts[3])) {
                    pts.splice(0, 1);
                }
                else {
                    pts.splice(2, 1);
                }
            }
            else if (rootPointsN[0] == rootPointsN[3]) {
                pts.splice(1, 2);
            }
        }
        else if (pts.length == 4) {
            if (
                (yRoots.length == 2)
            || (yRoots.length == 4 && (rootPointsN[0] == 2 && rootPointsN[1] == 2 || rootPointsN[2] == 2 && rootPointsN[3] == 2))
            ) {
                pts.splice(2, 2);
            }
        }
        else if (pts.length == 3 || pts.length == 5) {
            i = rootPointsN.indexOf(2);
            if (i > -1) {
                if (pts.length == 3)
                    i = i % 2;
                var ii = i + (i % 2 ? -1 : 2);
                var d1, d2, d3;
                d1 = pts[i].distanceFrom(pts[i + 1]);
                d2 = pts[i].distanceFrom(pts[ii]);
                d3 = pts[i + 1].distanceFrom(pts[ii]);
                if (d1 < d2 && d1 < d3) {
                    pts.splice(i, 1);
                }
                else {
                    pts.splice(ii, 1);
                }
            }
        }

        var poly = yPoly;
        var ZEROepsilon = yPoly.zeroErrorEstimate();
        ZEROepsilon *= 100 * Math.SQRT2;
        for (i = 0; i < pts.length - 1;) {
            if (pts[i].distanceFrom(pts[i + 1]) < ZEROepsilon) {
                pts.splice(i + 1, 1);
                continue;
            }
            i++;
        }

        result.points = pts;
        return result;
    };


    /**
     *  intersectEllipseLine
     *
     *  NOTE: Rotation will need to be added to this function
     *
     *  @param {Point2D} c
     *  @param {Number} rx
     *  @param {Number} ry
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @returns {Intersection}
     */
    Intersection.intersectEllipseLine = function(c, rx, ry, a1, a2) {
        var result;
        var origin = new Vector2D(a1.x, a1.y);
        var dir    = Vector2D.fromPoints(a1, a2);
        var center = new Vector2D(c.x, c.y);
        var diff   = origin.subtract(center);
        var mDir   = new Vector2D( dir.x/(rx*rx),  dir.y/(ry*ry)  );
        var mDiff  = new Vector2D( diff.x/(rx*rx), diff.y/(ry*ry) );

        var a = dir.dot(mDir);
        var b = dir.dot(mDiff);
        var c = diff.dot(mDiff) - 1.0;
        var d = b*b - a*c;

        var ERRF = 1e-15;
        var ZEROepsilon = 10 * Math.max(Math.abs(a), Math.abs(b), Math.abs(c)) * ERRF;
        if (Math.abs(d) < ZEROepsilon) {
            d = 0;
        }

        if ( d < 0 ) {
            result = new Intersection("Outside");
        } else if ( d > 0 ) {
            var root = Math.sqrt(d);
            var t_a  = (-b - root) / a;
            var t_b  = (-b + root) / a;

            t_b = (t_b > 1) ? t_b - ERRF : (t_b < 0) ? t_b + ERRF : t_b;
            t_a = (t_a > 1) ? t_a - ERRF : (t_a < 0) ? t_a + ERRF : t_a;

            if ( (t_a < 0 || 1 < t_a) && (t_b < 0 || 1 < t_b) ) {
                if ( (t_a < 0 && t_b < 0) || (t_a > 1 && t_b > 1) )
                    result = new Intersection("Outside");
                else
                    result = new Intersection("Inside");
            } else {
                result = new Intersection();
                if ( 0 <= t_a && t_a <= 1 )
                    result.appendPoint( a1.lerp(a2, t_a) );
                if ( 0 <= t_b && t_b <= 1 )
                    result.appendPoint( a1.lerp(a2, t_b) );
            }
        } else {
            var t = -b/a;
            if ( 0 <= t && t <= 1 ) {
                result = new Intersection();
                result.appendPoint( a1.lerp(a2, t) );
            } else {
                result = new Intersection("Outside");
            }
        }

        return result;
    };


    /**
     *  intersectLineLine
     *
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @param {Point2D} b1
     *  @param {Point2D} b2
     *  @returns {Intersection}
     */
    Intersection.intersectLineLine = function(a1, a2, b1, b2) {
        var result;

        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if ( u_b !== 0 ) {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;

            if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
                result = new Intersection();
                result.points.push(
                    new Point2D(
                        a1.x + ua * (a2.x - a1.x),
                        a1.y + ua * (a2.y - a1.y)
                    )
                );
            } else {
                result = new Intersection();
            }
        } else {
            if ( ua_t === 0 || ub_t === 0 ) {
                result = new Intersection("Coincident");
            } else {
                result = new Intersection("Parallel");
            }
        }

        return result;
    };


    /**
     *  intersectRayRay
     *
     *  @param {Point2D} a1
     *  @param {Point2D} a2
     *  @param {Point2D} b1
     *  @param {Point2D} b2
     *  @returns {Intersection}
     */
    Intersection.intersectRayRay = function(a1, a2, b1, b2) {
        var result;

        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if ( u_b !== 0 ) {
            var ua = ua_t / u_b;

            result = new Intersection();
            result.points.push(
                new Point2D(
                    a1.x + ua * (a2.x - a1.x),
                    a1.y + ua * (a2.y - a1.y)
                )
            );
        } else {
            if ( ua_t === 0 || ub_t === 0 ) {
                result = new Intersection("Coincident");
            } else {
                result = new Intersection("Parallel");
            }
        }

        return result;
    };

    ///////////////////////////////////////////////////////////////////
    Intersection.Utils = {};
    ///////////////////////////////////////////////////////////////////

    /**
     *  bezout
     *
     *  This code is based on MgcIntr2DElpElp.cpp written by David Eberly.  His
     *  code along with many other excellent examples are avaiable at his site:
     *  http://www.geometrictools.com
     *
     *  @param {Array<Point2D>} e1
     *  @param {Array<Point2D>} e2
     *  @returns {Polynomial}
     */
    Intersection.Utils.bezout = function (e1, e2) {
        var AB    = e1[0]*e2[1] - e2[0]*e1[1];
        var AC    = e1[0]*e2[2] - e2[0]*e1[2];
        var AD    = e1[0]*e2[3] - e2[0]*e1[3];
        var AE    = e1[0]*e2[4] - e2[0]*e1[4];
        var AF    = e1[0]*e2[5] - e2[0]*e1[5];
        var BC    = e1[1]*e2[2] - e2[1]*e1[2];
        var BE    = e1[1]*e2[4] - e2[1]*e1[4];
        var BF    = e1[1]*e2[5] - e2[1]*e1[5];
        var CD    = e1[2]*e2[3] - e2[2]*e1[3];
        var DE    = e1[3]*e2[4] - e2[3]*e1[4];
        var DF    = e1[3]*e2[5] - e2[3]*e1[5];
        var BFpDE = BF + DE;
        var BEmCD = BE - CD;

        return new Polynomial(
            AB*BC - AC*AC,
            AB*BEmCD + AD*BC - 2*AC*AE,
            AB*BFpDE + AD*BEmCD - AE*AE - 2*AC*AF,
            AB*DF + AD*BFpDE - 2*AE*AF,
            AD*DF - AF*AF
        );
    };

    ///////////////////////////////////////////////////////////////////
    /**
        intended for removal of multiple "identical" root copies, when roots are in interval [0,1]
    
        @param {Array<Number>} roots - will be modified, almost identical root copies will be removed
    */
    Intersection.Utils.removeMultipleRootsIn01 = function (roots) {
        var ZEROepsilon = 1e-15;
        roots.sort(function (a, b) { return a - b; });
        for (var i = 1; i < roots.length;) {
            if (Math.abs(roots[i] - roots[i - 1]) < ZEROepsilon) {
                roots.splice(i, 1);
            }
            else {
                i++;
            }
        }
    };

    ///////////////////////////////////////////////////////////////////
    /** 
        Removes from intersection points those points that are not between two rays determined by arc parameters.
        Rays begin at ellipse center and go through arc startPoint/endPoint.
        
        @param {Intersection} intersection - will be modified and returned
        @param {Point2D} c - center of arc ellipse
        @param {Number} rx
        @param {Number} ry
        @param {Number} phi - in radians
        @param {Number} th1 - in radians
        @param {Number} dth - in radians
        @param {Matrix2D} [m] - arc transformation matrix
        @returns {Intersection}
    */
    Intersection.Utils.removePointsNotInArc = function (intersection, c, rx, ry, phi, th1, dth, m) {
        if (intersection.points.length === 0) return intersection;
        if (m && !m.isIdentity())
            var mp = m.inverse();
        var np = [];
        var vx = new Vector2D(1, 0);
        var pi2 = Math.PI * 2;
        var wasNeg = dth < 0;
        var wasBig = Math.abs(dth) > Math.PI;
        var m1 = new Matrix2D().scaleNonUniform(1, ry / rx).rotate(th1);
        var m2 = new Matrix2D().scaleNonUniform(1, ry / rx).rotate(th1 + dth);

        th1 = (vx.angleBetween(vx.transform(m1)) + pi2) % pi2;
        dth = vx.transform(m1).angleBetween(vx.transform(m2));
        dth = (wasBig ? pi2 - Math.abs(dth) : Math.abs(dth)) * (wasNeg ? -1 : 1);
        var m3 = new Matrix2D().rotate(phi).multiply(m1);

        for (var i = 0, p, a; i < intersection.points.length; i++) {
            p = intersection.points[i];
            a = vx.transform(m3).angleBetween(Vector2D.fromPoints(c, (mp) ? p.transform(mp) : p));
            if (dth >= 0) {
                a = (a + 2 * pi2) % pi2;
                if (a <= dth)
                    np.push(p);
            } else {
                a = (a - 2 * pi2) % pi2;
                if (a >= dth)
                    np.push(p);
            }
        }
        intersection.points = np;
        return intersection;
    };

    ///////////////////////////////////////////////////////////////////
    /**
        points1 will be modified, points close (almost identical) to any point in points2 will be removed

        @param {Array<Point2D>} points1 - will be modified, points close to any point in points2 will be removed
        @param {Array<Point2D>} points2
    */
    Intersection.Utils.removeClosePoints = function (points1, points2) {
        if (points1.length === 0 || points2.length === 0)
            return;
        var maxf = function (p, v) { if (p < v.x) p = v.x; if (p < v.y) p = v.y; return p; };
        var max = points1.reduce(maxf, 0);
        max = points2.reduce(maxf, max);
        var ERRF = 1e-15;
        var ZEROepsilon = 100 * max * ERRF * Math.SQRT2;
        var j;
        for (var i = 0; i < points1.length;) {
            for (j = 0; j < points2.length; j++) {
                if (points1[i].distanceFrom(points2[j]) <= ZEROepsilon) {
                    points1.splice(i, 1);
                    break;
                }
            }
            if (j == points2.length)
                i++;
        }
    };

    return Intersection;
}));

