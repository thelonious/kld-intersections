#!/usr/bin/env node

let lib           = require('../index'),
    Point2D       = lib.Point2D,
    Vector2D      = lib.Vector2D,
    Intersection  = lib.Intersection,
    IntersectionArgs = lib.IntersectionArgs,
    Shapes        = lib.Shapes,
    CubicBezier2D = require('kld-contours').CubicBezier2D;

function find_parameter(path, point) {
    const {x, y} = path.getBernsteinPolynomials();
    x.coefs[0] -= point.x;

    roots = x.getRootsInInterval(0.0, 1.0);

    for (let t of roots) {
        const candidate_y = y.eval(t);

        if (Math.abs(candidate_y - point.y) < 1e-6) {
            return t;
        }
    }

    return NaN;
}

// parser path data
let b1 = new CubicBezier2D(
    new Point2D(150, 150),
    new Point2D(184, 217),
    new Point2D(233, 217),
    new Point2D(300, 150)
);
let b2 = new CubicBezier2D(
    new Point2D(100, 200),
    new Point2D(167, 133),
    new Point2D(233, 133),
    new Point2D(300, 200)
);

let path1 = new IntersectionArgs("Bezier3", [b1.p1, b1.p2, b1.p3, b1.p4]);
let path2 = new IntersectionArgs("Bezier3", [b2.p1, b2.p2, b2.p3, b2.p4]);

// intersect
let result = Intersection.intersect(path1, path2);

let param1 = find_parameter(b1, result.points[0]);
let point1 = b1.getPointAtParameter(param1);

let param2 = find_parameter(b2, result.points[0]);
let point2 = b2.getPointAtParameter(param2);

console.log();
console.log("These should all be pretty close to the same point");
console.log(`Reported intersection: ${result.points[0]}`);
console.log(`Point on first curve:  ${point1}, t=${param1}`);
console.log(`Point on second curve: ${point2}, t=${param2}`);
