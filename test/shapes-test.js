import assert from "assert";
import {Point2D} from "kld-affine";
import Shapes from "../lib/Shapes.js";
import ShapeInfo from "../lib/ShapeInfo.js";


describe("Shapes API", () => {
    it("arc", () => {
        const result = Shapes.arc(10, 20, 30, 40, 0, 1.57);
        const expected = new ShapeInfo("Arc", [new Point2D(10, 20), 30, 40, 0, 1.57]);

        assert.deepStrictEqual(result, expected);
    });
    it("quadratic bezier", () => {
        const result = Shapes.quadraticBezier(10, 20, 30, 40, 50, 60);
        const expected = new ShapeInfo("Bezier2", [new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60)]);

        assert.deepStrictEqual(result, expected);
    });
    it("cubic bezier", () => {
        const result = Shapes.cubicBezier(10, 20, 30, 40, 50, 60, 70, 80);
        const expected = new ShapeInfo("Bezier3", [new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60), new Point2D(70, 80)]);

        assert.deepStrictEqual(result, expected);
    });
    it("circle", () => {
        const result = Shapes.circle(10, 20, 30);
        const expected = new ShapeInfo("Circle", [new Point2D(10, 20), 30]);

        assert.deepStrictEqual(result, expected);
    });
    it("ellipse", () => {
        const result = Shapes.ellipse(10, 20, 30, 40);
        const expected = new ShapeInfo("Ellipse", [new Point2D(10, 20), 30, 40]);

        assert.deepStrictEqual(result, expected);
    });
    it("line", () => {
        const result = Shapes.line(10, 20, 30, 40);
        const expected = new ShapeInfo("Line", [new Point2D(10, 20), new Point2D(30, 40)]);

        assert.deepStrictEqual(result, expected);
    });
    it("path", () => {
        const result = Shapes.path("M0, 10 L100, 110");
        const expected = new ShapeInfo("Path", [
            Shapes.line(0, 10, 100, 110)
        ]);

        assert.deepStrictEqual(result, expected);
    });
    it("polygon", () => {
        const result = Shapes.polygon(10, 20, 30, 40, 50, 60);
        const expected = new ShapeInfo("Polygon", [
            [
                new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60)
            ]
        ]);

        assert.deepStrictEqual(result, expected);
    });
    it("polyline", () => {
        const result = Shapes.polyline(10, 20, 30, 40, 50, 60);
        const expected = new ShapeInfo("Polyline", [
            [
                new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60)
            ]
        ]);

        assert.deepStrictEqual(result, expected);
    });
    it("rectangle", () => {
        const result = Shapes.rectangle(10, 20, 30, 40);
        const expected = new ShapeInfo("Rectangle", [new Point2D(10, 20), new Point2D(40, 60)]);

        assert.deepStrictEqual(result, expected);
    });
});
