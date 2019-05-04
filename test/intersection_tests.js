"use strict";

const assert = require("assert");

const {Intersection, Point2D} = require("../index");

describe("Intersections", () => {
    describe("Line-Line Intersection", () => {
        it("should intersect", () => {
            const a1 = new Point2D(10, 10);
            const a2 = new Point2D(110, 110);
            const b1 = new Point2D(110, 10);
            const b2 = new Point2D(10, 110);
            const result = Intersection.intersectLineLine(a1, a2, b1, b2);

            assert.strictEqual("Intersection", result.status);
            assert.strictEqual(1, result.points.length);
            assert.strictEqual(result.points[0].equals(new Point2D(60, 60)), true);
        });
    });
});
