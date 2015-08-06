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
 
var Point2D = require('kld-affine').Point2D;
var Vector2D = require('kld-affine').Vector2D;
var Matrix2D = require('kld-affine').Matrix2D;
var Polynomial = require('kld-polynomial').Polynomial;
var IntersectionParams = require('./IntersectionParams');
var Intersection = require('./Intersection');

var IPTYPE = IntersectionParams.TYPE;


module.exports = function() {
    var argLength = arguments.length;
    if(argLength === 0) {
        throw new Error("The intersect module expects intersection functions to be provided for dependency injection");
    }

    var intersectionFunctions;

    for(var i = 0; i < argLength; i++) {
        var arg = arguments[i];
        for(var key in arg) {
            if(arg.hasOwnProperty(key)) {
                intersectionFunctions[key] = arg[key];
            }
        }
    }

    var composedShapeMethods = {};
    composedShapeMethods[IPTYPE.PATH] = intersectionFunctions.intersectPathShape;
    composedShapeMethods[IPTYPE.POLYLINE] = intersectionFunctions.intersectLinesShape;
    composedShapeMethods[IPTYPE.POLYGON] = intersectionFunctions.intersectLinesShape;
    composedShapeMethods[IPTYPE.RECT] = intersectionFunctions.intersectLinesShape;
    composedShapeMethods[IPTYPE.ROUNDRECT] = intersectionFunctions.intersectPathShape;
    composedShapeMethods[IPTYPE.ARC] = intersectionFunctions.intersectArcShape;


    return function intersect(shape1, shape2, m1, m2) {
        var ip1 = shape1;
        var ip2 = shape2;
        var result;

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

                result = intersectionFunctions[method].apply(null, params);

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
    }

}