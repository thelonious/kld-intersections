import assert from "assert";
import {Point2D} from "kld-affine";
import ShapeInfo from "../lib/ShapeInfo.js";
import itertools from "./Itertools.js";
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
    describe("Arc", () => {
       describe("Arc - Objects", () => {
           const centers = [
               {center: new Point2D(10, 20)},
               {center: {x: 10, y: 20}},
               {center: [10, 20]},
               {centerX: 10, centerY: 20},
               {cx: 10, cy: 20}
           ];
           const radiusXs = [
               {radiusX: 30},
               {rx: 30}
           ];
           const radiusYs = [
               {radiusY: 40},
               {ry: 40}
           ];
           const startRadians = [{startRadians: 50}];
           const endRadians = [{endRadians: 60}];
           const argProduct = new itertools.Product(centers, radiusXs, radiusYs, startRadians, endRadians);
           const expected = new ShapeInfo("Arc", [new Point2D(10, 20), 30, 40, 50, 60]);

           for (let args of argProduct) {
               const argObject = buildObject(...args);
               it(util.inspect(argObject, {breakLength: Infinity}), () => {
                    const result = new ShapeInfo.arc(argObject);

                    assert.deepStrictEqual(result, expected);
               });
           }
       });
       describe("Arc - Arrays", () => {
           const centers = [
               [new Point2D(10, 20)],
               [{x: 10, y: 20}],
               [[10, 20]],
               [10, 20]
           ];
           const radiusXs = [30];
           const radiusYs = [40];
           const startRadians = [50];
           const endRadians = [60];
           const argProduct = new itertools.Product(centers, radiusXs, radiusYs, startRadians, endRadians);
           const expected = new ShapeInfo("Arc", [new Point2D(10, 20), 30, 40, 50, 60]);

           for (let args of argProduct) {
               const flattenedArgs = args.reduce((acc, val) => acc.concat(val), []);
               it(util.inspect(flattenedArgs, {breakLength: Infinity}), () => {
                    const result = new ShapeInfo.arc(...flattenedArgs);

                    assert.deepStrictEqual(result, expected);
               });
           }
       });
    });
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
    describe("Rounded Rectangle", () => {
        it("Rounded Rectangle - Object 1", () => {
            let rr = {
                x: 10, y: 20,
                width: 30, height: 40,
                rx: 3, ry: 4
            };
            try {
                let shape = ShapeInfo.rectangle(rr);

                for (let arg of shape.args) {
                    // TODO: check segments
                }

            }
            catch (e) {
                assert.fail("Unable to parse object: " + JSON.stringify(rr));
            }
        });
        it("Rounded Rectangle - Object 2", () => {
            let rr = {
                x: 10, y: 20,
                w: 30, h: 40,
                rx: 3, ry: 4
            };
            try {
                let shape = ShapeInfo.rectangle(rr);

                for (let arg of shape.args) {
                    // TODO: check segments
                }

            }
            catch (e) {
                assert.fail("Unable to parse object: " + JSON.stringify(rr));
            }

        });
    });
});
