import assert from "assert";
import {Point2D} from "kld-affine";
import ShapeInfo from "../lib/ShapeInfo.js";
import itertools from "./itertools.js";
import util from "util";

function buildPoints(count, useProperties = true) {
    const result = [];
    let x = 10;
    let y = 20;

    for (let i = 1; i <= count; i++) {
        if (useProperties) {
            let name = `p${i}`;
            let nameX = `${name}x`;
            let nameY = `${name}y`;

            result.push([
                {[name]: new Point2D(x, y)},
                {[name]: {x, y}},
                {[name]: [x, y]},
                {[nameX]: x, [nameY]: y}
            ]);
        }
        else {
            result.push([
                [new Point2D(x, y)],
                [{x, y}],
                [[x, y]],
                [x, y]
            ]);
        }

        x += 20;
        y += 20;
    }

    return result;
}

function buildObject(...parts) {
    let argObject = {};

    for (let part of parts) {
        argObject = Object.assign(argObject, part)
    }

    return argObject;
}


describe("Shapes API", () => {
    describe("Quadratic Bezier", () => {
        describe("Quadratic Bezier - Objects", () => {
            const points = buildPoints(3);
            const pointsProduct = new itertools.Product(...points);
            const expected = new ShapeInfo("Bezier2", [
                new Point2D(10, 20),
                new Point2D(30, 40),
                new Point2D(50, 60)
            ]);

            for (let points of pointsProduct) {
                const argObject = buildObject(...points);
                it(util.inspect(argObject, {breakLength: Infinity}), () => {
                    const result = new ShapeInfo.quadraticBezier(argObject);

                    assert.deepStrictEqual(result, expected);
                });
            }
        });
        describe("Quadratic Bezier - Arrays", () => {
            const points = buildPoints(3, false);
            const pointsProduct = new itertools.Product(...points);
            const expected = new ShapeInfo("Bezier2", [
                new Point2D(10, 20),
                new Point2D(30, 40),
                new Point2D(50, 60)
            ]);

            for (let points of pointsProduct) {
                const flattenedPoints = points.reduce((acc, val) => acc.concat(val), []);
                it(util.inspect(flattenedPoints, {breakLength: Infinity}), () => {
                    const result = new ShapeInfo.quadraticBezier(...flattenedPoints);

                    assert.deepStrictEqual(result, expected);
                });
            }
        });
    });
    describe("Cubic Bezier", () => {
        describe("Cubic Bezier - Objects", () => {
            const points = buildPoints(4);
            const pointsProduct = new itertools.Product(...points);
            const expected = new ShapeInfo("Bezier3", [
                new Point2D(10, 20),
                new Point2D(30, 40),
                new Point2D(50, 60),
                new Point2D(70, 80)
            ]);

            for (let points of pointsProduct) {
                const argObject = buildObject(...points);
                it(util.inspect(argObject, {breakLength: Infinity}), () => {
                    const result = new ShapeInfo.cubicBezier(argObject);

                    assert.deepStrictEqual(result, expected);
                });
            }
        });
        describe("Cubic Bezier - Arrays", () => {
            const points = buildPoints(4, false);
            const pointsProduct = new itertools.Product(...points);
            const expected = new ShapeInfo("Bezier3", [
                new Point2D(10, 20),
                new Point2D(30, 40),
                new Point2D(50, 60),
                new Point2D(70, 80)
            ]);

            for (let points of pointsProduct) {
                const flattenedPoints = points.reduce((acc, val) => acc.concat(val), []);
                it(util.inspect(flattenedPoints, {breakLength: Infinity}), () => {
                    const result = new ShapeInfo.cubicBezier(...flattenedPoints);

                    assert.deepStrictEqual(result, expected);
                });
            }
        });
    });
});
