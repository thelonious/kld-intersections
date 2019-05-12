/* eslint-disable no-restricted-syntax */
/**
 *  Shapes
 *
 *  @copyright 2017, Kevin Lindsey
 *  @module Shapes
 */

import {Point2D, Matrix2D} from "kld-affine";
import {PathParser} from "kld-path-parser";
import PathHandler from "./PathHandler.js";
import IntersectionArgs from "./IntersectionArgs.js";

/**
 * Build shapes for intersection
 */
class Shapes {
    /**
     * Create shape descriptors from primitive values
     *
     * @param {module:kld-intersections.Matrix2D} [matrix]
     */
    constructor(matrix = Matrix2D.IDENTITY) {
        if (matrix instanceof Matrix2D === false) {
            throw TypeError(`Expected matrix to be a Matrix2D, but found ${matrix}`);
        }

        this.transformStack = [];
        this.currentMatrix = matrix;
        this.pathParser = new PathParser();
        this.pathHandler = new PathHandler(this);

        this.pathParser.setHandler(this.pathHandler);
    }

    /**
     * Modify the current transform by multiplying it by the specified transform. The current transform being used
     * before the call to this method is saved and can be restored with a call to popTransform.
     *
     * @param {module:kld-intersections.Matrix2D} matrix
     */
    pushTransform(matrix) {
        if (matrix instanceof Matrix2D === false) {
            throw TypeError(`Expected matrix to be a Matrix2D, but found ${matrix}`);
        }

        this.transformStack.push(this.currentMatrix);
        this.currentMatrix = this.currentMatrix.multiply(matrix);
    }

    /**
     * Restore the transform that was active before the last call to pushTransform
     */
    popTransform() {
        if (this.transformStack.length === 0) {
            throw RangeError("Tried to pop an empty transformation stack");
        }

        this.currentMatrix = this.transformStack.pop();
    }

    /**
     *  quadraticBezier
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    quadraticBezier(p1x, p1y, p2x, p2y, p3x, p3y) {
        if (isNaN(p1x)) {
            throw TypeError(`Expected p1x to be a number, but found ${p1x}`);
        }
        if (isNaN(p1y)) {
            throw TypeError(`Expected p1y to be a number, but found ${p1y}`);
        }
        if (isNaN(p2x)) {
            throw TypeError(`Expected p2x to be a number, but found ${p2x}`);
        }
        if (isNaN(p2y)) {
            throw TypeError(`Expected p2y to be a number, but found ${p2y}`);
        }
        if (isNaN(p3x)) {
            throw TypeError(`Expected p3x to be a number, but found ${p3x}`);
        }
        if (isNaN(p3y)) {
            throw TypeError(`Expected p3y to be a number, but found ${p3y}`);
        }

        return new IntersectionArgs("Bezier2", [
            new Point2D(p1x, p1y).transform(this.currentMatrix),
            new Point2D(p2x, p2y).transform(this.currentMatrix),
            new Point2D(p3x, p3y).transform(this.currentMatrix)
        ]);
    }

    /**
     *  cubicBezier
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @param {number} p4x
     *  @param {number} p4y
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    cubicBezier(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
        if (isNaN(p1x)) {
            throw TypeError(`Expected p1x to be a number, but found ${p1x}`);
        }
        if (isNaN(p1y)) {
            throw TypeError(`Expected p1y to be a number, but found ${p1y}`);
        }
        if (isNaN(p2x)) {
            throw TypeError(`Expected p2x to be a number, but found ${p2x}`);
        }
        if (isNaN(p2y)) {
            throw TypeError(`Expected p2y to be a number, but found ${p2y}`);
        }
        if (isNaN(p3x)) {
            throw TypeError(`Expected p3x to be a number, but found ${p3x}`);
        }
        if (isNaN(p3y)) {
            throw TypeError(`Expected p3y to be a number, but found ${p3y}`);
        }
        if (isNaN(p4x)) {
            throw TypeError(`Expected p4x to be a number, but found ${p4x}`);
        }
        if (isNaN(p4y)) {
            throw TypeError(`Expected p4y to be a number, but found ${p4y}`);
        }

        return new IntersectionArgs("Bezier3", [
            new Point2D(p1x, p1y).transform(this.currentMatrix),
            new Point2D(p2x, p2y).transform(this.currentMatrix),
            new Point2D(p3x, p3y).transform(this.currentMatrix),
            new Point2D(p4x, p4y).transform(this.currentMatrix)
        ]);
    }

    /**
     *  circle
     *
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radius
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    circle(centerX, centerY, radius) {
        if (isNaN(centerX)) {
            throw TypeError(`Expected centerX to be a number, but found ${centerX}`);
        }
        if (isNaN(centerY)) {
            throw TypeError(`Expected centerY to be a number, but found ${centerY}`);
        }
        if (isNaN(radius)) {
            throw TypeError(`Expected radius to be a number, but found ${radius}`);
        }

        return new IntersectionArgs("Circle", [
            new Point2D(centerX, centerY),
            radius
        ]);
    }

    /**
     *  ellipse
     *
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    ellipse(centerX, centerY, radiusX, radiusY) {
        if (isNaN(centerX)) {
            throw TypeError(`Expected centerX to be a number, but found ${centerX}`);
        }
        if (isNaN(centerY)) {
            throw TypeError(`Expected centerY to be a number, but found ${centerY}`);
        }
        if (isNaN(radiusX)) {
            throw TypeError(`Expected radiusX to be a number, but found ${radiusX}`);
        }
        if (isNaN(radiusY)) {
            throw TypeError(`Expected radiusY to be a number, but found ${radiusY}`);
        }

        return new IntersectionArgs("Ellipse", [
            new Point2D(centerX, centerY),
            radiusX,
            radiusY
        ]);
    }

    /**
     * arc
     *
     * @param {number} centerX
     * @param {number} centerY
     * @param {number} radiusX
     * @param {number} radiusY
     * @param {number} startRadians
     * @param {number} endRadians
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    arc(centerX, centerY, radiusX, radiusY, startRadians, endRadians) {
        if (isNaN(centerX)) {
            throw TypeError(`Expected centerX to be a number, but found ${centerX}`);
        }
        if (isNaN(centerY)) {
            throw TypeError(`Expected centerY to be a number, but found ${centerY}`);
        }
        if (isNaN(radiusX)) {
            throw TypeError(`Expected radiusX to be a number, but found ${radiusX}`);
        }
        if (isNaN(radiusY)) {
            throw TypeError(`Expected radiusY to be a number, but found ${radiusY}`);
        }
        if (isNaN(startRadians)) {
            throw TypeError(`Expected startRadians to be a number, but found ${startRadians}`);
        }
        if (isNaN(endRadians)) {
            throw TypeError(`Expected endRadians to be a number, but found ${endRadians}`);
        }

        return new IntersectionArgs("Arc", [
            new Point2D(centerX, centerY),
            radiusX,
            radiusY,
            startRadians,
            endRadians
        ]);
    }

    /**
     *  line
     *
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    line(p1x, p1y, p2x, p2y) {
        if (isNaN(p1x)) {
            throw TypeError(`Expected p1x to be a number, but found ${p1x}`);
        }
        if (isNaN(p1y)) {
            throw TypeError(`Expected p1y to be a number, but found ${p1y}`);
        }
        if (isNaN(p2x)) {
            throw TypeError(`Expected p2x to be a number, but found ${p2x}`);
        }
        if (isNaN(p2y)) {
            throw TypeError(`Expected p2y to be a number, but found ${p2y}`);
        }

        return new IntersectionArgs("Line", [
            new Point2D(p1x, p1y).transform(this.currentMatrix),
            new Point2D(p2x, p2y).transform(this.currentMatrix)
        ]);
    }

    /**
     *  path
     *
     *  @param {string} pathData
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    path(pathData) {
        if (typeof pathData !== "string") {
            throw TypeError(`Expected pathData to be a string, but found ${pathData}`);
        }

        this.pathParser.parseData(pathData);

        return new IntersectionArgs("Path", this.pathHandler.shapes);
    }

    /**
     *  polygon
     *
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    polygon(coords) {
        /* eslint-disable-next-line compat/compat */
        if (Array.isArray(coords) === false) {
            throw TypeError(`Expected points to be an Array, but found ${coords}`);
        }
        if (coords.some(c => isNaN(c))) {
            throw TypeError("Expected all members of coords to be numbers");
        }

        const points = [];

        for (let i = 0; i < coords.length; i += 2) {
            points.push(new Point2D(coords[i], coords[i + 1]).transform(this.currentMatrix));
        }

        return new IntersectionArgs("Polygon", [points]);
    }

    /**
     *  polyline
     *
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    polyline(coords) {
        /* eslint-disable-next-line compat/compat */
        if (Array.isArray(coords) === false) {
            throw TypeError(`Expected points to be an Array, but found ${coords}`);
        }
        if (coords.some(c => isNaN(c))) {
            throw TypeError("Expected all members of coords to be numbers");
        }

        const points = [];

        for (let i = 0; i < coords.length; i += 2) {
            points.push(new Point2D(coords[i], coords[i + 1]).transform(this.currentMatrix));
        }

        return new IntersectionArgs("Polyline", [points]);
    }

    /**
     *  rectangle
     *
     *  @param {number} x
     *  @param {number} y
     *  @param {number} width
     *  @param {number} height
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    rectangle(x, y, width, height, rx = 0, ry = 0) {
        if (isNaN(x)) {
            throw TypeError(`Expected x to be a number, but found ${x}`);
        }
        if (isNaN(y)) {
            throw TypeError(`Expected y to be a number, but found ${y}`);
        }
        if (isNaN(width)) {
            throw TypeError(`Expected width to be a number, but found ${width}`);
        }
        if (isNaN(height)) {
            throw TypeError(`Expected height to be a number, but found ${height}`);
        }
        if (isNaN(rx)) {
            throw TypeError(`Expected rx to be a number, but found ${rx}`);
        }
        if (isNaN(ry)) {
            throw TypeError(`Expected ry to be a number, but found ${ry}`);
        }

        if (rx === 0 && ry === 0) {
            return new IntersectionArgs("Rectangle", [
                new Point2D(x, y),
                new Point2D(x + width, y + height)
            ]);
        }

        if (rx === 0) {
            rx = ry;
        }
        if (ry === 0) {
            ry = rx;
        }
        if (rx > width * 0.5) {
            rx = width * 0.5;
        }
        if (ry > height * 0.5) {
            ry = height * 0.5;
        }

        const x0 = x;
        const y0 = y;
        const x1 = x + rx;
        const y1 = y + ry;
        const x2 = x + width - rx;
        const y2 = y + height - ry;
        const x3 = x + width;
        const y3 = y + height;

        const degree90 = Math.PI * 0.5;
        const segments = [];

        segments.push(Shapes.arc(x1, y1, rx, ry, 2 * degree90, 3 * degree90));
        segments.push(Shapes.line(x1, y0, x2, y0));
        segments.push(Shapes.arc(x2, y1, rx, ry, 3 * degree90, 4 * degree90));
        segments.push(Shapes.line(x3, y1, x3, y2));
        segments.push(Shapes.arc(x2, y2, rx, ry, 0, degree90));
        segments.push(Shapes.line(x2, y3, x1, y3));
        segments.push(Shapes.arc(x1, y2, rx, ry, degree90, 2 * degree90));
        segments.push(Shapes.line(x0, y2, x0, y1));

        return Shapes.path(segments);
    }
}

export default Shapes;
