#!/usr/bin/env node -r esm

import {CubicBezier2D} from "kld-contours";
import {Point2D, Intersection, IntersectionArgs} from "../index.js";

/**
 *
 * @param {CubicBezier2D} path
 * @param {Point2D} point
 * @returns {number}
 */
function findParameter(path, point) {
    const {x, y} = path.getBernsteinPolynomials();

    x.coefs[0] -= point.x;

    const roots = x.getRootsInInterval(0.0, 1.0);

    for (const t of roots) {
        const candidateY = y.eval(t);

        if (Math.abs(candidateY - point.y) < 1e-6) {
            return t;
        }
    }

    return NaN;
}

// parser path data
const b1 = new CubicBezier2D(
    new Point2D(150, 150),
    new Point2D(184, 217),
    new Point2D(233, 217),
    new Point2D(300, 150)
);
const b2 = new CubicBezier2D(
    new Point2D(100, 200),
    new Point2D(167, 133),
    new Point2D(233, 133),
    new Point2D(300, 200)
);

const path1 = new IntersectionArgs("Bezier3", [b1.p1, b1.p2, b1.p3, b1.p4]);
const path2 = new IntersectionArgs("Bezier3", [b2.p1, b2.p2, b2.p3, b2.p4]);

// intersect
const result = Intersection.intersect(path1, path2);

// find bezier parametric values from first intersection point
const param1 = findParameter(b1, result.points[0]);
const param2 = findParameter(b2, result.points[0]);

// calculate points on curves from their parametric values
const point1 = b1.getPointAtParameter(param1);
const point2 = b2.getPointAtParameter(param2);

// compare the results
console.log();
console.log("These should all be pretty close to the same point");
console.log(`Reported intersection: ${result.points[0]}`);
console.log(`Point on first curve:  ${point1}, t=${param1}`);
console.log(`Point on second curve: ${point2}, t=${param2}`);
