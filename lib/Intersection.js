/* eslint-disable camelcase, eqeqeq, no-labels, space-infix-ops */
/**
 *
 *  Intersection.js
 *
 *  copyright 2002, 2013 Kevin Lindsey
 *
 */

import {Point2D, Vector2D} from "kld-affine";
import {Polynomial} from "kld-polynomial";

/**
 *
 * @param {*} o
 * @returns {boolean}
 */
function isNullish(o) {
    return o === null || o === undefined;
}

/**
 *  closePolygon
 *
 *  @param {Array<Point2D>} points
 *  @returns {Array<Point2D>}
 */
function closePolygon(points) {
    const copy = points.slice();

    copy.push(points[0]);

    return copy;
}


/**
 *  Intersection
 */
class Intersection {
    /**
     *  @param {string} status
     */
    constructor(status) {
        this.init(status);
    }


    /**
     *  init
     *
     *  @param {string} status
     *  @returns {Intersection}
     */
    init(status) {
        this.status = status;
        this.points = [];
    }


    /**
     *  appendPoint
     *
     *  @param {Point2D} point
     */
    appendPoint(point) {
        this.points.push(point);
    }


    /**
     *  appendPoints
     *
     *  @param {Array<Point2D>} points
     */
    appendPoints(points) {
        this.points = this.points.concat(points);
    }
}

// static methods

/**
 *  intersect
 *
 *  @param {IntersectionArgs} shape1
 *  @param {IntersectionArgs} shape2
 *  @returns {Intersection}
 */
Intersection.intersect = function(shape1, shape2) {
    let result;

    if (!isNullish(shape1) && !isNullish(shape2)) {
        if (shape1.name === "Path") {
            result = Intersection.intersectPathShape(shape1, shape2);
        }
        else if (shape2.name === "Path") {
            result = Intersection.intersectPathShape(shape2, shape1);
        }
        else {
            let method;
            let args;

            if (shape1.name < shape2.name) {
                method = "intersect" + shape1.name + shape2.name;
                args = shape1.args.concat(shape2.args);
            }
            else {
                method = "intersect" + shape2.name + shape1.name;
                args = shape2.args.concat(shape1.args);
            }

            if (!(method in Intersection)) {
                throw new Error("Intersection not available: " + method);
            }

            result = Intersection[method].apply(null, args);
        }
    }
    else {
        result = new Intersection("No Intersection");
    }

    return result;
};


/**
 *  intersectPathShape
 *
 *  @param {IntersectionArgs} path
 *  @param {IntersectionArgs} shape
 *  @returns {Intersection}
 */
Intersection.intersectPathShape = function(path, shape) {
    const result = new Intersection("No Intersection");

    for (const segment of path.args) {
        const inter = Intersection.intersect(segment, shape);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
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
    let a, b;
    const result = new Intersection("No Intersection");

    a = a2.multiply(-2);
    const c12 = a1.add(a.add(a3));

    a = a1.multiply(-2);
    b = a2.multiply(2);
    const c11 = a.add(b);

    const c10 = new Point2D(a1.x, a1.y);

    a = b2.multiply(-2);
    const c22 = b1.add(a.add(b3));

    a = b1.multiply(-2);
    b = b2.multiply(2);
    const c21 = a.add(b);

    const c20 = new Point2D(b1.x, b1.y);

    // bezout
    a = c12.x*c11.y - c11.x*c12.y;
    b = c22.x*c11.y - c11.x*c22.y;
    const c = c21.x*c11.y - c11.x*c21.y;
    const d = c11.x*(c10.y - c20.y) + c11.y*(-c10.x + c20.x);
    const e = c22.x*c12.y - c12.x*c22.y;
    const f = c21.x*c12.y - c12.x*c21.y;
    const g = c12.x*(c10.y - c20.y) + c12.y*(-c10.x + c20.x);

    // determinant
    const poly = new Polynomial(
        -e*e,
        -2*e*f,
        a*b - f*f - 2*e*g,
        a*c - 2*f*g,
        a*d - g*g
    );

    const roots = poly.getRoots();

    for (const s of roots) {
        if (0 <= s && s <= 1) {
            const xp = new Polynomial(
                c12.x,
                c11.x,
                c10.x - c20.x - s*c21.x - s*s*c22.x
            );
            xp.simplify();
            const xRoots = xp.getRoots();
            const yp = new Polynomial(
                c12.y,
                c11.y,
                c10.y - c20.y - s*c21.y - s*s*c22.y
            );
            yp.simplify();
            const yRoots = yp.getRoots();

            if (xRoots.length > 0 && yRoots.length > 0) {
                const TOLERANCE = 1e-4;

                checkRoots:
                for (const xRoot of xRoots) {
                    if (0 <= xRoot && xRoot <= 1) {
                        for (let k = 0; k < yRoots.length; k++) {
                            if (Math.abs(xRoot - yRoots[k]) < TOLERANCE) {
                                result.points.push(c22.multiply(s*s).add(c21.multiply(s).add(c20)));
                                break checkRoots;
                            }
                        }
                    }
                }
            }
        }
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
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
    let a, b, c, d;
    const result = new Intersection("No Intersection");

    a = a2.multiply(-2);
    const c12 = a1.add(a.add(a3));

    a = a1.multiply(-2);
    b = a2.multiply(2);
    const c11 = a.add(b);

    const c10 = new Point2D(a1.x, a1.y);

    a = b1.multiply(-1);
    b = b2.multiply(3);
    c = b3.multiply(-3);
    d = a.add(b.add(c.add(b4)));
    const c23 = new Vector2D(d.x, d.y);

    a = b1.multiply(3);
    b = b2.multiply(-6);
    c = b3.multiply(3);
    d = a.add(b.add(c));
    const c22 = new Vector2D(d.x, d.y);

    a = b1.multiply(-3);
    b = b2.multiply(3);
    c = a.add(b);
    const c21 = new Vector2D(c.x, c.y);

    const c20 = new Vector2D(b1.x, b1.y);

    const c10x2 = c10.x*c10.x;
    const c10y2 = c10.y*c10.y;
    const c11x2 = c11.x*c11.x;
    const c11y2 = c11.y*c11.y;
    const c12x2 = c12.x*c12.x;
    const c12y2 = c12.y*c12.y;
    const c20x2 = c20.x*c20.x;
    const c20y2 = c20.y*c20.y;
    const c21x2 = c21.x*c21.x;
    const c21y2 = c21.y*c21.y;
    const c22x2 = c22.x*c22.x;
    const c22y2 = c22.y*c22.y;
    const c23x2 = c23.x*c23.x;
    const c23y2 = c23.y*c23.y;

    const poly = new Polynomial(
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
    const roots = poly.getRootsInInterval(0, 1);

    for (const s of roots) {
        const xRoots = new Polynomial(
            c12.x,
            c11.x,
            c10.x - c20.x - s*c21.x - s*s*c22.x - s*s*s*c23.x
        ).getRoots();
        const yRoots = new Polynomial(
            c12.y,
            c11.y,
            c10.y - c20.y - s*c21.y - s*s*c22.y - s*s*s*c23.y
        ).getRoots();

        if (xRoots.length > 0 && yRoots.length > 0) {
            const TOLERANCE = 1e-4;

            checkRoots:
            for (const xRoot of xRoots) {
                if (0 <= xRoot && xRoot <= 1) {
                    for (let k = 0; k < yRoots.length; k++) {
                        if (Math.abs(xRoot - yRoots[k]) < TOLERANCE) {
                            result.points.push(
                                c23.multiply(s*s*s).add(c22.multiply(s*s).add(c21.multiply(s).add(c20)))
                            );
                            break checkRoots;
                        }
                    }
                }
            }
        }
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectBezier2Circle
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} c
 *  @param {number} r
 *  @returns {Intersection}
 */
Intersection.intersectBezier2Circle = function(p1, p2, p3, c, r) {
    return Intersection.intersectBezier2Ellipse(p1, p2, p3, c, r, r);
};


/**
 *  intersectBezier2Ellipse
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} ec
 *  @param {number} rx
 *  @param {number} ry
 *  @returns {Intersection}
 */
Intersection.intersectBezier2Ellipse = function(p1, p2, p3, ec, rx, ry) {
    let a; // temporary variables
    // c2, c1, c0; // coefficients of quadratic
    const result = new Intersection("No Intersection");

    a = p2.multiply(-2);
    const c2 = p1.add(a.add(p3));

    a = p1.multiply(-2);
    const b = p2.multiply(2);
    const c1 = a.add(b);

    const c0 = new Point2D(p1.x, p1.y);

    const rxrx = rx*rx;
    const ryry = ry*ry;
    const roots = new Polynomial(
        ryry*c2.x*c2.x + rxrx*c2.y*c2.y,
        2*(ryry*c2.x*c1.x + rxrx*c2.y*c1.y),
        ryry*(2*c2.x*c0.x + c1.x*c1.x) + rxrx*(2*c2.y*c0.y+c1.y*c1.y) -
            2*(ryry*ec.x*c2.x + rxrx*ec.y*c2.y),
        2*(ryry*c1.x*(c0.x-ec.x) + rxrx*c1.y*(c0.y-ec.y)),
        ryry*(c0.x*c0.x+ec.x*ec.x) + rxrx*(c0.y*c0.y + ec.y*ec.y) -
            2*(ryry*ec.x*c0.x + rxrx*ec.y*c0.y) - rxrx*ryry
    ).getRoots();

    for (const t of roots) {
        if (0 <= t && t <= 1) {
            result.points.push(c2.multiply(t*t).add(c1.multiply(t).add(c0)));
        }
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
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
    let a; // temporary variables
    // let c2, c1, c0; // coefficients of quadratic
    // cl; // c coefficient for normal form of line
    // n; // normal for normal form of line
    const min = a1.min(a2); // used to determine if point is on line segment
    const max = a1.max(a2); // used to determine if point is on line segment
    const result = new Intersection("No Intersection");

    a = p2.multiply(-2);
    const c2 = p1.add(a.add(p3));

    a = p1.multiply(-2);
    const b = p2.multiply(2);
    const c1 = a.add(b);

    const c0 = new Point2D(p1.x, p1.y);

    // Convert line to normal form: ax + by + c = 0
    // Find normal to line: negative inverse of original line's slope
    const n = new Vector2D(a1.y - a2.y, a2.x - a1.x);

    // Determine new c coefficient
    const cl = a1.x*a2.y - a2.x*a1.y;

    // Transform cubic coefficients to line's coordinate system and find roots
    // of cubic
    const roots = new Polynomial(
        n.dot(c2),
        n.dot(c1),
        n.dot(c0) + cl
    ).getRoots();

    // Any roots in closed interval [0,1] are intersections on Bezier, but
    // might not be on the line segment.
    // Find intersections and calculate point coordinates
    for (const t of roots) {
        if (0 <= t && t <= 1) {
            // We're within the Bezier curve
            // Find point on Bezier
            const p4 = p1.lerp(p2, t);
            const p5 = p2.lerp(p3, t);

            const p6 = p4.lerp(p5, t);

            // See if point is on line segment
            // Had to make special cases for vertical and horizontal lines due
            // to slight errors in calculation of p6
            if (a1.x == a2.x) {
                if (min.y <= p6.y && p6.y <= max.y) {
                    result.status = "Intersection";
                    result.appendPoint(p6);
                }
            }
            else if (a1.y == a2.y) {
                if (min.x <= p6.x && p6.x <= max.x) {
                    result.status = "Intersection";
                    result.appendPoint(p6);
                }
            }
            else if (min.x <= p6.x && p6.x <= max.x && min.y <= p6.y && p6.y <= max.y) {
                result.status = "Intersection";
                result.appendPoint(p6);
            }
        }
    }

    return result;
};


/**
 *  intersectBezier2Polygon
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectBezier2Polygon = function(p1, p2, p3, points) {
    return Intersection.intersectBezier2Polyline(p1, p2, p3, closePolygon(points));
};


/**
 *  intersectBezier2Polyline
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectBezier2Polyline = function(p1, p2, p3, points) {
    const result = new Intersection("No Intersection");
    const {length: len} = points;

    for (let i = 0; i < len - 1; i++) {
        const a1 = points[i];
        const a2 = points[i + 1];
        const inter = Intersection.intersectBezier2Line(p1, p2, p3, a1, a2);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectBezier2Rectangle
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectBezier2Rectangle = function(p1, p2, p3, r1, r2) {
    const min = r1.min(r2);
    const max = r1.max(r2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectBezier2Line(p1, p2, p3, min, topRight);
    const inter2 = Intersection.intersectBezier2Line(p1, p2, p3, topRight, max);
    const inter3 = Intersection.intersectBezier2Line(p1, p2, p3, max, bottomLeft);
    const inter4 = Intersection.intersectBezier2Line(p1, p2, p3, bottomLeft, min);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
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
    let a, b, c, d; // temporary variables
    // c13, c12, c11, c10; // coefficients of cubic
    // c23, c22, c21, c20; // coefficients of cubic
    const result = new Intersection("No Intersection");

    // Calculate the coefficients of cubic polynomial
    a = a1.multiply(-1);
    b = a2.multiply(3);
    c = a3.multiply(-3);
    d = a.add(b.add(c.add(a4)));
    const c13 = new Vector2D(d.x, d.y);

    a = a1.multiply(3);
    b = a2.multiply(-6);
    c = a3.multiply(3);
    d = a.add(b.add(c));
    const c12 = new Vector2D(d.x, d.y);

    a = a1.multiply(-3);
    b = a2.multiply(3);
    c = a.add(b);
    const c11 = new Vector2D(c.x, c.y);

    const c10 = new Vector2D(a1.x, a1.y);

    a = b1.multiply(-1);
    b = b2.multiply(3);
    c = b3.multiply(-3);
    d = a.add(b.add(c.add(b4)));
    const c23 = new Vector2D(d.x, d.y);

    a = b1.multiply(3);
    b = b2.multiply(-6);
    c = b3.multiply(3);
    d = a.add(b.add(c));
    const c22 = new Vector2D(d.x, d.y);

    a = b1.multiply(-3);
    b = b2.multiply(3);
    c = a.add(b);
    const c21 = new Vector2D(c.x, c.y);

    const c20 = new Vector2D(b1.x, b1.y);

    // bezout
    a = c13.x * c12.y - c12.x * c13.y;
    b = c13.x * c11.y - c11.x * c13.y;
    const c0 = c13.x * c10.y - c10.x * c13.y + c20.x * c13.y - c13.x * c20.y;
    const c1 = c21.x * c13.y - c13.x * c21.y;
    const c2 = c22.x * c13.y - c13.x * c22.y;
    const c3 = c23.x * c13.y - c13.x * c23.y;
    d = c13.x * c11.y - c11.x * c13.y;
    const e0 = c13.x * c10.y + c12.x * c11.y - c11.x * c12.y - c10.x * c13.y + c20.x * c13.y - c13.x * c20.y;
    const e1 = c21.x * c13.y - c13.x * c21.y;
    const e2 = c22.x * c13.y - c13.x * c22.y;
    const e3 = c23.x * c13.y - c13.x * c23.y;
    const f0 = c12.x * c10.y - c10.x * c12.y + c20.x * c12.y - c12.x * c20.y;
    const f1 = c21.x * c12.y - c12.x * c21.y;
    const f2 = c22.x * c12.y - c12.x * c22.y;
    const f3 = c23.x * c12.y - c12.x * c23.y;
    const g0 = c13.x * c10.y - c10.x * c13.y + c20.x * c13.y - c13.x * c20.y;
    const g1 = c21.x * c13.y - c13.x * c21.y;
    const g2 = c22.x * c13.y - c13.x * c22.y;
    const g3 = c23.x * c13.y - c13.x * c23.y;
    const h0 = c12.x * c10.y - c10.x * c12.y + c20.x * c12.y - c12.x * c20.y;
    const h1 = c21.x * c12.y - c12.x * c21.y;
    const h2 = c22.x * c12.y - c12.x * c22.y;
    const h3 = c23.x * c12.y - c12.x * c23.y;
    const i0 = c11.x * c10.y - c10.x * c11.y + c20.x * c11.y - c11.x * c20.y;
    const i1 = c21.x * c11.y - c11.x * c21.y;
    const i2 = c22.x * c11.y - c11.x * c22.y;
    const i3 = c23.x * c11.y - c11.x * c23.y;

    // determinant
    const poly = new Polynomial(
        -c3 * e3 * g3,
        -c3 * e3 * g2 - c3 * e2 * g3 - c2 * e3 * g3,
        -c3 * e3 * g1 - c3 * e2 * g2 - c2 * e3 * g2 - c3 * e1 * g3 - c2 * e2 * g3 - c1 * e3 * g3,
        -c3 * e3 * g0 - c3 * e2 * g1 - c2 * e3 * g1 - c3 * e1 * g2 - c2 * e2 * g2 - c1 * e3 * g2 - c3 * e0 * g3 - c2 * e1 * g3 - c1 * e2 * g3 - c0 * e3 * g3 + b * f3 * g3 + c3 * d * h3 - a * f3 * h3 + a * e3 * i3,
        -c3 * e2 * g0 - c2 * e3 * g0 - c3 * e1 * g1 - c2 * e2 * g1 - c1 * e3 * g1 - c3 * e0 * g2 - c2 * e1 * g2 - c1 * e2 * g2 - c0 * e3 * g2 + b * f3 * g2 - c2 * e0 * g3 - c1 * e1 * g3 - c0 * e2 * g3 + b * f2 * g3 + c3 * d * h2 - a * f3 * h2 + c2 * d * h3 - a * f2 * h3 + a * e3 * i2 + a * e2 * i3,
        -c3 * e1 * g0 - c2 * e2 * g0 - c1 * e3 * g0 - c3 * e0 * g1 - c2 * e1 * g1 - c1 * e2 * g1 - c0 * e3 * g1 + b * f3 * g1 - c2 * e0 * g2 - c1 * e1 * g2 - c0 * e2 * g2 + b * f2 * g2 - c1 * e0 * g3 - c0 * e1 * g3 + b * f1 * g3 + c3 * d * h1 - a * f3 * h1 + c2 * d * h2 - a * f2 * h2 + c1 * d * h3 - a * f1 * h3 + a * e3 * i1 + a * e2 * i2 + a * e1 * i3,
        -c3 * e0 * g0 - c2 * e1 * g0 - c1 * e2 * g0 - c0 * e3 * g0 + b * f3 * g0 - c2 * e0 * g1 - c1 * e1 * g1 - c0 * e2 * g1 + b * f2 * g1 - c1 * e0 * g2 - c0 * e1 * g2 + b * f1 * g2 - c0 * e0 * g3 + b * f0 * g3 + c3 * d * h0 - a * f3 * h0 + c2 * d * h1 - a * f2 * h1 + c1 * d * h2 - a * f1 * h2 + c0 * d * h3 - a * f0 * h3 + a * e3 * i0 + a * e2 * i1 + a * e1 * i2 - b * d * i3 + a * e0 * i3,
        -c2 * e0 * g0 - c1 * e1 * g0 - c0 * e2 * g0 + b * f2 * g0 - c1 * e0 * g1 - c0 * e1 * g1 + b * f1 * g1 - c0 * e0 * g2 + b * f0 * g2 + c2 * d * h0 - a * f2 * h0 + c1 * d * h1 - a * f1 * h1 + c0 * d * h2 - a * f0 * h2 + a * e2 * i0 + a * e1 * i1 - b * d * i2 + a * e0 * i2,
        -c1 * e0 * g0 - c0 * e1 * g0 + b * f1 * g0 - c0 * e0 * g1 + b * f0 * g1 + c1 * d * h0 - a * f1 * h0 + c0 * d * h1 - a * f0 * h1 + a * e1 * i0 - b * d * i1 + a * e0 * i1,
        -c0 * e0 * g0 + b * f0 * g0 + c0 * d * h0 - a * f0 * h0 - b * d * i0 + a * e0 * i0
    );
    poly.simplify();
    const roots = poly.getRootsInInterval(0, 1);

    for (const s of roots) {
        const xp = new Polynomial(
            c13.x,
            c12.x,
            c11.x,
            c10.x - c20.x - s*c21.x - s*s*c22.x - s*s*s*c23.x
        );
        xp.simplify();
        const xRoots = xp.getRoots();
        const yp = new Polynomial(
            c13.y,
            c12.y,
            c11.y,
            c10.y - c20.y - s*c21.y - s*s*c22.y - s*s*s*c23.y
        );
        yp.simplify();
        const yRoots = yp.getRoots();

        if (xRoots.length > 0 && yRoots.length > 0) {
            const TOLERANCE = 1e-4;

            checkRoots:
            for (const xRoot of xRoots) {
                if (0 <= xRoot && xRoot <= 1) {
                    for (let k = 0; k < yRoots.length; k++) {
                        if (Math.abs(xRoot - yRoots[k]) < TOLERANCE) {
                            result.points.push(
                                c23.multiply(s*s*s).add(c22.multiply(s*s).add(c21.multiply(s).add(c20)))
                            );
                            break checkRoots;
                        }
                    }
                }
            }
        }
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectBezier3Circle
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p4
 *  @param {Point2D} c
 *  @param {number} r
 *  @returns {Intersection}
 */
Intersection.intersectBezier3Circle = function(p1, p2, p3, p4, c, r) {
    return Intersection.intersectBezier3Ellipse(p1, p2, p3, p4, c, r, r);
};


/**
 *  intersectBezier3Ellipse
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p4
 *  @param {Point2D} ec
 *  @param {number} rx
 *  @param {number} ry
 *  @returns {Intersection}
 */
Intersection.intersectBezier3Ellipse = function(p1, p2, p3, p4, ec, rx, ry) {
    let a, b, c, d; // temporary variables
    // c3, c2, c1, c0; // coefficients of cubic
    const result = new Intersection("No Intersection");

    // Calculate the coefficients of cubic polynomial
    a = p1.multiply(-1);
    b = p2.multiply(3);
    c = p3.multiply(-3);
    d = a.add(b.add(c.add(p4)));
    const c3 = new Vector2D(d.x, d.y);

    a = p1.multiply(3);
    b = p2.multiply(-6);
    c = p3.multiply(3);
    d = a.add(b.add(c));
    const c2 = new Vector2D(d.x, d.y);

    a = p1.multiply(-3);
    b = p2.multiply(3);
    c = a.add(b);
    const c1 = new Vector2D(c.x, c.y);

    const c0 = new Vector2D(p1.x, p1.y);

    const rxrx = rx*rx;
    const ryry = ry*ry;
    const poly = new Polynomial(
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
    const roots = poly.getRootsInInterval(0, 1);

    for (const t of roots) {
        result.points.push(
            c3.multiply(t*t*t).add(c2.multiply(t*t).add(c1.multiply(t).add(c0)))
        );
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
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
    let a, b, c, d; // temporary variables
    // c3, c2, c1, c0; // coefficients of cubic
    // cl; // c coefficient for normal form of line
    // n; // normal for normal form of line
    const min = a1.min(a2); // used to determine if point is on line segment
    const max = a1.max(a2); // used to determine if point is on line segment
    const result = new Intersection("No Intersection");

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
    const c3 = new Vector2D(d.x, d.y);

    a = p1.multiply(3);
    b = p2.multiply(-6);
    c = p3.multiply(3);
    d = a.add(b.add(c));
    const c2 = new Vector2D(d.x, d.y);

    a = p1.multiply(-3);
    b = p2.multiply(3);
    c = a.add(b);
    const c1 = new Vector2D(c.x, c.y);

    const c0 = new Vector2D(p1.x, p1.y);

    // Convert line to normal form: ax + by + c = 0
    // Find normal to line: negative inverse of original line's slope
    const n = new Vector2D(a1.y - a2.y, a2.x - a1.x);

    // Determine new c coefficient
    const cl = a1.x*a2.y - a2.x*a1.y;

    // ?Rotate each cubic coefficient using line for new coordinate system?
    // Find roots of rotated cubic
    const roots = new Polynomial(
        n.dot(c3),
        n.dot(c2),
        n.dot(c1),
        n.dot(c0) + cl
    ).getRoots();

    // Any roots in closed interval [0,1] are intersections on Bezier, but
    // might not be on the line segment.
    // Find intersections and calculate point coordinates
    for (const t of roots) {
        if (0 <= t && t <= 1) {
            // We're within the Bezier curve
            // Find point on Bezier
            const p5 = p1.lerp(p2, t);
            const p6 = p2.lerp(p3, t);
            const p7 = p3.lerp(p4, t);

            const p8 = p5.lerp(p6, t);
            const p9 = p6.lerp(p7, t);

            const p10 = p8.lerp(p9, t);

            // See if point is on line segment
            // Had to make special cases for vertical and horizontal lines due
            // to slight errors in calculation of p10
            if (a1.x == a2.x) {
                if (min.y <= p10.y && p10.y <= max.y) {
                    result.status = "Intersection";
                    result.appendPoint(p10);
                }
            }
            else if (a1.y == a2.y) {
                if (min.x <= p10.x && p10.x <= max.x) {
                    result.status = "Intersection";
                    result.appendPoint(p10);
                }
            }
            else if (min.x <= p10.x && p10.x <= max.x && min.y <= p10.y && p10.y <= max.y) {
                result.status = "Intersection";
                result.appendPoint(p10);
            }
        }
    }

    return result;
};


/**
 *  intersectBezier3Polygon
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p4
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectBezier3Polygon = function(p1, p2, p3, p4, points) {
    return this.intersectBezier3Polyline(p1, p2, p3, p4, closePolygon(points));
};


/**
 *  intersectBezier3Polyline
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p4
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectBezier3Polyline = function(p1, p2, p3, p4, points) {
    const result = new Intersection("No Intersection");
    const {length: len} = points;

    for (let i = 0; i < len - 1; i++) {
        const a1 = points[i];
        const a2 = points[i + 1];
        const inter = Intersection.intersectBezier3Line(p1, p2, p3, p4, a1, a2);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectBezier3Rectangle
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p4
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectBezier3Rectangle = function(p1, p2, p3, p4, r1, r2) {
    const min = r1.min(r2);
    const max = r1.max(r2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectBezier3Line(p1, p2, p3, p4, min, topRight);
    const inter2 = Intersection.intersectBezier3Line(p1, p2, p3, p4, topRight, max);
    const inter3 = Intersection.intersectBezier3Line(p1, p2, p3, p4, max, bottomLeft);
    const inter4 = Intersection.intersectBezier3Line(p1, p2, p3, p4, bottomLeft, min);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectCircleCircle
 *
 *  @param {Point2D} c1
 *  @param {number} r1
 *  @param {Point2D} c2
 *  @param {number} r2
 *  @returns {Intersection}
 */
Intersection.intersectCircleCircle = function(c1, r1, c2, r2) {
    let result;

    // Determine minimum and maximum radii where circles can intersect
    const r_max = r1 + r2;
    const r_min = Math.abs(r1 - r2);

    // Determine actual distance between circle circles
    const c_dist = c1.distanceFrom(c2);

    if (c_dist > r_max) {
        result = new Intersection("Outside");
    }
    else if (c_dist < r_min) {
        result = new Intersection("Inside");
    }
    else {
        result = new Intersection("Intersection");

        const a = (r1*r1 - r2*r2 + c_dist*c_dist) / (2*c_dist);
        const h = Math.sqrt(r1*r1 - a*a);
        const p = c1.lerp(c2, a/c_dist);
        const b = h / c_dist;

        result.points.push(
            new Point2D(
                p.x - b * (c2.y - c1.y),
                p.y + b * (c2.x - c1.x)
            )
        );
        result.points.push(
            new Point2D(
                p.x + b * (c2.y - c1.y),
                p.y - b * (c2.x - c1.x)
            )
        );
    }

    return result;
};


/**
 *  intersectCircleEllipse
 *
 *  @param {Point2D} cc
 *  @param {number} r
 *  @param {Point2D} ec
 *  @param {number} rx
 *  @param {number} ry
 *  @returns {Intersection}
 */
Intersection.intersectCircleEllipse = function(cc, r, ec, rx, ry) {
    return Intersection.intersectEllipseEllipse(cc, r, r, ec, rx, ry);
};


/**
 *  intersectCircleLine
 *
 *  @param {Point2D} c
 *  @param {number} r
 *  @param {Point2D} a1
 *  @param {Point2D} a2
 *  @returns {Intersection}
 */
Intersection.intersectCircleLine = function(c, r, a1, a2) {
    let result;
    const a = (a2.x - a1.x) * (a2.x - a1.x) +
             (a2.y - a1.y) * (a2.y - a1.y);
    const b = 2 * ((a2.x - a1.x) * (a1.x - c.x) +
                   (a2.y - a1.y) * (a1.y - c.y));
    const cc = c.x*c.x + c.y*c.y + a1.x*a1.x + a1.y*a1.y -
             2 * (c.x * a1.x + c.y * a1.y) - r*r;
    const deter = b*b - 4*a*cc;

    if (deter < 0) {
        result = new Intersection("Outside");
    }
    else if (deter == 0) {
        result = new Intersection("Tangent");
        // NOTE: should calculate this point
    }
    else {
        const e = Math.sqrt(deter);
        const u1 = (-b + e) / (2*a);
        const u2 = (-b - e) / (2*a);

        if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
            if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                result = new Intersection("Outside");
            }
            else {
                result = new Intersection("Inside");
            }
        }
        else {
            result = new Intersection("Intersection");

            if (0 <= u1 && u1 <= 1) {
                result.points.push(a1.lerp(a2, u1));
            }

            if (0 <= u2 && u2 <= 1) {
                result.points.push(a1.lerp(a2, u2));
            }
        }
    }

    return result;
};


/**
 *  intersectCirclePolygon
 *
 *  @param {Point2D} c
 *  @param {number} r
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectCirclePolygon = function(c, r, points) {
    return this.intersectCirclePolyline(c, r, closePolygon(points));
};


/**
 *  intersectCirclePolyline
 *
 *  @param {Point2D} c
 *  @param {number} r
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectCirclePolyline = function(c, r, points) {
    const result = new Intersection("No Intersection");
    const {length: len} = points;
    let inter;

    for (let i = 0; i < len - 1; i++) {
        const a1 = points[i];
        const a2 = points[i + 1];

        inter = Intersection.intersectCircleLine(c, r, a1, a2);
        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }
    else {
        result.status = inter.status;
    }

    return result;
};


/**
 *  intersectCircleRectangle
 *
 *  @param {Point2D} c
 *  @param {number} r
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectCircleRectangle = function(c, r, r1, r2) {
    const min = r1.min(r2);
    const max = r1.max(r2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectCircleLine(c, r, min, topRight);
    const inter2 = Intersection.intersectCircleLine(c, r, topRight, max);
    const inter3 = Intersection.intersectCircleLine(c, r, max, bottomLeft);
    const inter4 = Intersection.intersectCircleLine(c, r, bottomLeft, min);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
    }
    else {
        result.status = inter1.status;
    }

    return result;
};


/**
 *  intersectEllipseEllipse
 *
 *  This code is based on MgcIntr2DElpElp.cpp written by David Eberly.  His
 *  code along with many other excellent examples are avaiable at his site:
 *  http://www.magic-software.com
 *
 *  NOTE: Rotation will need to be added to this function
 *
 *  @param {Point2D} c1
 *  @param {number} rx1
 *  @param {number} ry1
 *  @param {Point2D} c2
 *  @param {number} rx2
 *  @param {number} ry2
 *  @returns {Intersection}
 */
Intersection.intersectEllipseEllipse = function(c1, rx1, ry1, c2, rx2, ry2) {
    const a = [
        ry1*ry1, 0, rx1*rx1, -2*ry1*ry1*c1.x, -2*rx1*rx1*c1.y,
        ry1*ry1*c1.x*c1.x + rx1*rx1*c1.y*c1.y - rx1*rx1*ry1*ry1
    ];
    const b = [
        ry2*ry2, 0, rx2*rx2, -2*ry2*ry2*c2.x, -2*rx2*rx2*c2.y,
        ry2*ry2*c2.x*c2.x + rx2*rx2*c2.y*c2.y - rx2*rx2*ry2*ry2
    ];

    const yPoly = Intersection.bezout(a, b);
    const yRoots = yPoly.getRoots();
    const epsilon = 1e-3;
    const norm0 = (a[0]*a[0] + 2*a[1]*a[1] + a[2]*a[2]) * epsilon;
    const norm1 = (b[0]*b[0] + 2*b[1]*b[1] + b[2]*b[2]) * epsilon;
    const result = new Intersection("No Intersection");

    for (let y = 0; y < yRoots.length; y++) {
        const xPoly = new Polynomial(
            a[0],
            a[3] + yRoots[y] * a[1],
            a[5] + yRoots[y] * (a[4] + yRoots[y]*a[2])
        );
        const xRoots = xPoly.getRoots();

        for (let x = 0; x < xRoots.length; x++) {
            let tst =
                (a[0]*xRoots[x] + a[1]*yRoots[y] + a[3]) * xRoots[x] +
                (a[2]*yRoots[y] + a[4]) * yRoots[y] + a[5];
            if (Math.abs(tst) < norm0) {
                tst =
                    (b[0]*xRoots[x] + b[1]*yRoots[y] + b[3]) * xRoots[x] +
                    (b[2]*yRoots[y] + b[4]) * yRoots[y] + b[5];
                if (Math.abs(tst) < norm1) {
                    result.appendPoint(new Point2D(xRoots[x], yRoots[y]));
                }
            }
        }
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectEllipseLine
 *
 *  NOTE: Rotation will need to be added to this function
 *
 *  @param {Point2D} c
 *  @param {number} rx
 *  @param {number} ry
 *  @param {Point2D} a1
 *  @param {Point2D} a2
 *  @returns {Intersection}
 */
Intersection.intersectEllipseLine = function(c, rx, ry, a1, a2) {
    let result;
    const orign = new Vector2D(a1.x, a1.y);
    const dir = Vector2D.fromPoints(a1, a2);
    const center = new Vector2D(c.x, c.y);
    const diff = orign.subtract(center);
    const mDir = new Vector2D(dir.x/(rx*rx), dir.y/(ry*ry));
    const mDiff = new Vector2D(diff.x/(rx*rx), diff.y/(ry*ry));

    const a = dir.dot(mDir);
    const b = dir.dot(mDiff);
    c = diff.dot(mDiff) - 1.0;
    const d = b*b - a*c;

    if (d < 0) {
        result = new Intersection("Outside");
    }
    else if (d > 0) {
        const root = Math.sqrt(d); // eslint-disable-line no-shadow
        const t_a = (-b - root) / a;
        const t_b = (-b + root) / a;

        if ((t_a < 0 || 1 < t_a) && (t_b < 0 || 1 < t_b)) {
            if ((t_a < 0 && t_b < 0) || (t_a > 1 && t_b > 1)) {
                result = new Intersection("Outside");
            }
            else {
                result = new Intersection("Inside");
            }
        }
        else {
            result = new Intersection("Intersection");
            if (0 <= t_a && t_a <= 1) {
                result.appendPoint(a1.lerp(a2, t_a));
            }
            if (0 <= t_b && t_b <= 1) {
                result.appendPoint(a1.lerp(a2, t_b));
            }
        }
    }
    else {
        const t = -b/a;

        if (0 <= t && t <= 1) {
            result = new Intersection("Intersection");
            result.appendPoint(a1.lerp(a2, t));
        }
        else {
            result = new Intersection("Outside");
        }
    }

    return result;
};


/**
 *  intersectEllipsePolygon
 *
 *  @param {Point2D} c
 *  @param {number} rx
 *  @param {number} ry
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectEllipsePolygon = function(c, rx, ry, points) {
    return this.intersectEllipsePolyline(c, rx, ry, closePolygon(points));
};


/**
 *  intersectEllipsePolyline
 *
 *  @param {Point2D} c
 *  @param {number} rx
 *  @param {number} ry
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectEllipsePolyline = function(c, rx, ry, points) {
    const result = new Intersection("No Intersection");
    const {length: len} = points;

    for (let i = 0; i < len - 1; i++) {
        const b1 = points[i];
        const b2 = points[i + 1];
        const inter = Intersection.intersectEllipseLine(c, rx, ry, b1, b2);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectEllipseRectangle
 *
 *  @param {Point2D} c
 *  @param {number} rx
 *  @param {number} ry
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectEllipseRectangle = function(c, rx, ry, r1, r2) {
    const min = r1.min(r2);
    const max = r1.max(r2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectEllipseLine(c, rx, ry, min, topRight);
    const inter2 = Intersection.intersectEllipseLine(c, rx, ry, topRight, max);
    const inter3 = Intersection.intersectEllipseLine(c, rx, ry, max, bottomLeft);
    const inter4 = Intersection.intersectEllipseLine(c, rx, ry, bottomLeft, min);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
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
    let result;

    const ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    const ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    const u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if (u_b != 0) {
        const ua = ua_t / u_b;
        const ub = ub_t / u_b;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            result = new Intersection("Intersection");
            result.points.push(
                new Point2D(
                    a1.x + ua * (a2.x - a1.x),
                    a1.y + ua * (a2.y - a1.y)
                )
            );
        }
        else {
            result = new Intersection("No Intersection");
        }
    }
    else if (ua_t == 0 || ub_t == 0) {
        result = new Intersection("Coincident");
    }
    else {
        result = new Intersection("Parallel");
    }

    return result;
};


/**
 *  intersectLinePolygon
 *
 *  @param {Point2D} a1
 *  @param {Point2D} a2
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectLinePolygon = function(a1, a2, points) {
    return this.intersectLinePolyline(a1, a2, closePolygon(points));
};


/**
 *  intersectLinePolyline
 *
 *  @param {Point2D} a1
 *  @param {Point2D} a2
 *  @param {Array<Point2D>} points
 *  @returns {Intersection}
 */
Intersection.intersectLinePolyline = function(a1, a2, points) {
    const result = new Intersection("No Intersection");
    const {length: len} = points;

    for (let i = 0; i < len - 1; i++) {
        const b1 = points[i];
        const b2 = points[i + 1];
        const inter = Intersection.intersectLineLine(a1, a2, b1, b2);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectLineRectangle
 *
 *  @param {Point2D} a1
 *  @param {Point2D} a2
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectLineRectangle = function(a1, a2, r1, r2) {
    const min = r1.min(r2);
    const max = r1.max(r2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectLineLine(min, topRight, a1, a2);
    const inter2 = Intersection.intersectLineLine(topRight, max, a1, a2);
    const inter3 = Intersection.intersectLineLine(max, bottomLeft, a1, a2);
    const inter4 = Intersection.intersectLineLine(bottomLeft, min, a1, a2);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectPolygonPolygon
 *
 *  @param {Array<Point2D>} points1
 *  @param {Array<Point2D>} points2
 *  @returns {Intersection}
 */
Intersection.intersectPolygonPolygon = function(points1, points2) {
    return this.intersectPolylinePolyline(closePolygon(points1), closePolygon(points2));
};


/**
 *  intersectPolygonPolyline
 *
 *  @param {Array<Point2D>} points1
 *  @param {Array<Point2D>} points2
 *  @returns {Intersection}
 */
Intersection.intersectPolygonPolyline = function(points1, points2) {
    return this.intersectPolylinePolyline(closePolygon(points1), points2);
};


/**
 *  intersectPolygonRectangle
 *
 *  @param {Array<Point2D>} points
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectPolygonRectangle = function(points, r1, r2) {
    return this.intersectPolylineRectangle(closePolygon(points), r1, r2);
};


/**
 *  intersectPolylinePolyline
 *
 *  @param {Array<Point2D>} points1
 *  @param {Array<Point2D>} points2
 *  @returns {Intersection}
 */
Intersection.intersectPolylinePolyline = function(points1, points2) {
    const result = new Intersection("No Intersection");
    const {length: len} = points1;

    for (let i = 0; i < len - 1; i++) {
        const a1 = points1[i];
        const a2 = points1[i + 1];
        const inter = Intersection.intersectLinePolyline(a1, a2, points2);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectPolylineRectangle
 *
 *  @param {Array<Point2D>} points
 *  @param {Point2D} r1
 *  @param {Point2D} r2
 *  @returns {Intersection}
 */
Intersection.intersectPolylineRectangle = function(points, r1, r2) {
    const min = r1.min(r2);
    const max = r1.max(r2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectLinePolyline(min, topRight, points);
    const inter2 = Intersection.intersectLinePolyline(topRight, max, points);
    const inter3 = Intersection.intersectLinePolyline(max, bottomLeft, points);
    const inter4 = Intersection.intersectLinePolyline(bottomLeft, min, points);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
    }

    return result;
};


/**
 *  intersectRectangleRectangle
 *
 *  @param {Point2D} a1
 *  @param {Point2D} a2
 *  @param {Point2D} b1
 *  @param {Point2D} b2
 *  @returns {Intersection}
 */
Intersection.intersectRectangleRectangle = function(a1, a2, b1, b2) {
    const min = a1.min(a2);
    const max = a1.max(a2);
    const topRight = new Point2D(max.x, min.y);
    const bottomLeft = new Point2D(min.x, max.y);

    const inter1 = Intersection.intersectLineRectangle(min, topRight, b1, b2);
    const inter2 = Intersection.intersectLineRectangle(topRight, max, b1, b2);
    const inter3 = Intersection.intersectLineRectangle(max, bottomLeft, b1, b2);
    const inter4 = Intersection.intersectLineRectangle(bottomLeft, min, b1, b2);

    const result = new Intersection("No Intersection");

    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);

    if (result.points.length > 0) {
        result.status = "Intersection";
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
    let result;

    const ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    const ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    const u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if (u_b != 0) {
        const ua = ua_t / u_b;

        result = new Intersection("Intersection");
        result.points.push(
            new Point2D(
                a1.x + ua * (a2.x - a1.x),
                a1.y + ua * (a2.y - a1.y)
            )
        );
    }
    else if (ua_t == 0 || ub_t == 0) {
        result = new Intersection("Coincident");
    }
    else {
        result = new Intersection("Parallel");
    }

    return result;
};


/**
 *  bezout
 *
 *  This code is based on MgcIntr2DElpElp.cpp written by David Eberly.  His
 *  code along with many other excellent examples are avaiable at his site:
 *  http://www.magic-software.com
 *
 *  @param {Array<Point2D>} e1
 *  @param {Array<Point2D>} e2
 *  @returns {Polynomial}
 */
Intersection.bezout = function(e1, e2) {
    const AB = e1[0]*e2[1] - e2[0]*e1[1];
    const AC = e1[0]*e2[2] - e2[0]*e1[2];
    const AD = e1[0]*e2[3] - e2[0]*e1[3];
    const AE = e1[0]*e2[4] - e2[0]*e1[4];
    const AF = e1[0]*e2[5] - e2[0]*e1[5];
    const BC = e1[1]*e2[2] - e2[1]*e1[2];
    const BE = e1[1]*e2[4] - e2[1]*e1[4];
    const BF = e1[1]*e2[5] - e2[1]*e1[5];
    const CD = e1[2]*e2[3] - e2[2]*e1[3];
    const DE = e1[3]*e2[4] - e2[3]*e1[4];
    const DF = e1[3]*e2[5] - e2[3]*e1[5];
    const BFpDE = BF + DE;
    const BEmCD = BE - CD;

    return new Polynomial(
        AB*BC - AC*AC,
        AB*BEmCD + AD*BC - 2*AC*AE,
        AB*BFpDE + AD*BEmCD - AE*AE - 2*AC*AF,
        AB*DF + AD*BFpDE - 2*AE*AF,
        AD*DF - AF*AF
    );
};

export default Intersection;
