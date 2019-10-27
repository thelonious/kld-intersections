import assert from "assert";
import {Point2D} from "kld-affine";
import ShapeInfo from "../lib/ShapeInfo.js";
import itertools from "./itertools.js"

function buildPoints(count) {
    const result = [];
    let x = 10;
    let y = 20;

    for (var i = 1; i <= count; i++) {
        let name = `p${i}`;
        let nameX = `${name}x`;
        let nameY = `${name}y`;

        result.push([
            {[name]: new Point2D(x, y)},
            {[name]: {x, y}},
            {[name]: [x, y]},
            {[nameX]: x, [nameY]: y},
        ]);

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
    it("quadratic bezier", () => {
        const points = buildPoints(3);
        const pointsProduct = new itertools.Product(points, 0);
        const expected = new ShapeInfo("Bezier2", [
            new Point2D(10, 20),
            new Point2D(30, 40),
            new Point2D(50, 60)
        ]);

        for (let points of pointsProduct) {
            const argObject = buildObject(...points);
            const result = new ShapeInfo.quadraticBezier(argObject);

            assert.deepStrictEqual(result, expected);
        }
    });
    it("cubic bezier", () => {
        const points = buildPoints(4);
        const pointsProduct = new itertools.Product(points, 0);
        const expected = new ShapeInfo("Bezier3", [
            new Point2D(10, 20),
            new Point2D(30, 40),
            new Point2D(50, 60),
            new Point2D(70, 80)
        ])
        for (let points of pointsProduct) {
            const argObject = buildObject(...points);
            const result = new ShapeInfo.cubicBezier(argObject);

            assert.deepStrictEqual(result, expected);
        }
    });
});
