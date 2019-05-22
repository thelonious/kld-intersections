import assert from "assert";
import {Point2D, Vector2D} from "kld-affine";
import AffineShapes from "../lib/AffineShapes.js";
import ShapeInfo from "../lib/ShapeInfo.js";


describe("Shapes API", () => {
    it("arc", () => {
        const result = AffineShapes.arc(new Point2D(10, 20), 30, 40, 0, 1.57);
        const expected = new ShapeInfo("Arc", [new Point2D(10, 20), 30, 40, 0, 1.57]);

        assert.deepStrictEqual(result, expected);
    });
    it("quadratic bezier", () => {
        const result = AffineShapes.quadraticBezier(new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60));
        const expected = new ShapeInfo("Bezier2", [new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60)]);

        assert.deepStrictEqual(result, expected);
    });
    it("cubic bezier", () => {
        const result = AffineShapes.cubicBezier(new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60), new Point2D(70, 80));
        const expected = new ShapeInfo("Bezier3", [new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60), new Point2D(70, 80)]);

        assert.deepStrictEqual(result, expected);
    });
    it("circle", () => {
        const result = AffineShapes.circle(new Point2D(10, 20), 30);
        const expected = new ShapeInfo("Circle", [new Point2D(10, 20), 30]);

        assert.deepStrictEqual(result, expected);
    });
    it("ellipse", () => {
        const result = AffineShapes.ellipse(new Point2D(10, 20), 30, 40);
        const expected = new ShapeInfo("Ellipse", [new Point2D(10, 20), 30, 40]);

        assert.deepStrictEqual(result, expected);
    });
    it("line", () => {
        const result = AffineShapes.line(new Point2D(10, 20), new Point2D(30, 40));
        const expected = new ShapeInfo("Line", [new Point2D(10, 20), new Point2D(30, 40)]);

        assert.deepStrictEqual(result, expected);
    });
    it("path", () => {
        const result = AffineShapes.path("M0, 10 L100, 110");
        const expected = new ShapeInfo("Path", [
            AffineShapes.line(new Point2D(0, 10), new Point2D(100, 110))
        ]);

        assert.deepStrictEqual(result, expected);
    });
    it("polygon", () => {
        const result = AffineShapes.polygon(new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60));
        const expected = new ShapeInfo("Polygon", [
            [
                new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60)
            ]
        ]);

        assert.deepStrictEqual(result, expected);
    });
    it("polyline", () => {
        const result = AffineShapes.polyline(new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60));
        const expected = new ShapeInfo("Polyline", [
            [
                new Point2D(10, 20), new Point2D(30, 40), new Point2D(50, 60)
            ]
        ]);

        assert.deepStrictEqual(result, expected);
    });
    it("rectangle", () => {
        const result = AffineShapes.rectangle(new Point2D(10, 20), new Vector2D(30, 40));
        const expected = new ShapeInfo("Rectangle", [new Point2D(10, 20), new Point2D(40, 60)]);

        assert.deepStrictEqual(result, expected);
    });
});
