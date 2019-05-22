/**
 *  PathHandler.js
 *
 *  @copyright 2017 Kevin Lindsey
 */

import {Point2D, Vector2D} from "kld-affine";

const TWO_PI = 2.0 * Math.PI;

/**
 * normalizeAngle
 *
 * @param {number} radians
 * @returns {number}
 */
function normalizeAngle(radians) {
    const normal = radians % TWO_PI;

    return normal < 0.0 ? normal + TWO_PI : normal;
}

/**
 * Based on the SVG 1.1 specification, Appendix F: Implementation Requirements,
 * Section F.6 "Elliptical arc implementation notes"
 * {@see https://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes}
 *
 * @param {module:kld-affine.Point2D} startPoint
 * @param {module:kld-affine.Point2D} endPoint
 * @param {number} rx
 * @param {number} ry
 * @param {number} angle
 * @param {boolean} arcFlag
 * @param {boolean} sweepFlag
 * @returns {Array}
 */
function getArcParameters(startPoint, endPoint, rx, ry, angle, arcFlag, sweepFlag) {
    angle = angle * Math.PI / 180;

    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const TOLERANCE = 1e-6;

    // Section (F.6.5.1)
    const halfDiff = startPoint.subtract(endPoint).multiply(0.5);
    const x1p = halfDiff.x * c + halfDiff.y * s;
    const y1p = halfDiff.x * -s + halfDiff.y * c;

    // Section (F.6.6.1)
    rx = Math.abs(rx);
    ry = Math.abs(ry);

    // Section (F.6.6.2)
    const x1px1p = x1p * x1p;
    const y1py1p = y1p * y1p;
    const lambda = (x1px1p / (rx * rx)) + (y1py1p / (ry * ry));

    // Section (F.6.6.3)
    if (lambda > 1) {
        const factor = Math.sqrt(lambda);

        rx *= factor;
        ry *= factor;
    }

    // Section (F.6.5.2)
    const rxrx = rx * rx;
    const ryry = ry * ry;
    const rxy1 = rxrx * y1py1p;
    const ryx1 = ryry * x1px1p;

    let factor = (rxrx * ryry - rxy1 - ryx1) / (rxy1 + ryx1);

    if (Math.abs(factor) < TOLERANCE) {
        factor = 0;
    }

    let sq = Math.sqrt(factor);

    if (arcFlag === sweepFlag) {
        sq = -sq;
    }

    // Section (F.6.5.3)
    const mid = startPoint.add(endPoint).multiply(0.5);
    const cxp = sq * rx * y1p / ry;
    const cyp = sq * -ry * x1p / rx;

    // Section (F.6.5.5 - F.6.5.6)
    const xcr1 = (x1p - cxp) / rx;
    const xcr2 = (x1p + cxp) / rx;
    const ycr1 = (y1p - cyp) / ry;
    const ycr2 = (y1p + cyp) / ry;

    const theta1 = new Vector2D(1, 0).angleBetween(new Vector2D(xcr1, ycr1));
    let deltaTheta = normalizeAngle(new Vector2D(xcr1, ycr1).angleBetween(new Vector2D(-xcr2, -ycr2)));

    if (sweepFlag === false) {
        deltaTheta -= TWO_PI;
    }

    return [
        cxp * c - cyp * s + mid.x,
        cxp * s + cyp * c + mid.y,
        rx,
        ry,
        theta1,
        theta1 + deltaTheta
    ];
}

/**
 *  PathHandler
 */
class PathHandler {
    /**
     * PathHandler
     *
     * @param {ShapeInfo} shapeCreator
     */
    constructor(shapeCreator) {
        this.shapeCreator = shapeCreator;
        this.shapes = [];
        this.firstX = null;
        this.firstY = null;
        this.lastX = null;
        this.lastY = null;
        this.lastCommand = null;
    }

    /**
     * beginParse
     */
    beginParse() {
        // zero out the sub-path array
        this.shapes = [];

        // clear firstX, firstY, lastX, and lastY
        this.firstX = null;
        this.firstY = null;
        this.lastX = null;
        this.lastY = null;

        // need to remember last command type to determine how to handle the
        // relative Bezier commands
        this.lastCommand = null;
    }

    /**
     *  addShape
     *
     *  @param {ShapeInfo} shape
     */
    addShape(shape) {
        this.shapes.push(shape);
    }

    /**
     *  arcAbs - A
     *
     *  @param {number} rx
     *  @param {number} ry
     *  @param {number} xAxisRotation
     *  @param {boolean} arcFlag
     *  @param {boolean} sweepFlag
     *  @param {number} x
     *  @param {number} y
     */
    arcAbs(rx, ry, xAxisRotation, arcFlag, sweepFlag, x, y) {
        if (rx === 0 || ry === 0) {
            this.addShape(this.shapeCreator.line(
                this.lastX, this.lastY,
                x, y
            ));
        }
        else {
            const arcParameters = getArcParameters(
                new Point2D(this.lastX, this.lastY),
                new Point2D(x, y),
                rx, ry,
                xAxisRotation,
                arcFlag, sweepFlag
            );

            this.addShape(this.shapeCreator.arc(...arcParameters));
        }

        this.lastCommand = "A";
        this.lastX = x;
        this.lastY = y;
    }

    /**
     *  arcRel - a
     *
     *  @param {number} rx
     *  @param {number} ry
     *  @param {number} xAxisRotation
     *  @param {boolean} arcFlag
     *  @param {boolean} sweepFlag
     *  @param {number} x
     *  @param {number} y
     */
    arcRel(rx, ry, xAxisRotation, arcFlag, sweepFlag, x, y) {
        if (rx === 0 || ry === 0) {
            this.addShape(this.shapeCreator.line(
                this.lastX, this.lastY,
                this.lastX + x, this.lastY + y
            ));
        }
        else {
            const arcParameters = getArcParameters(
                new Point2D(this.lastX, this.lastY),
                new Point2D(this.lastX + x, this.lastY + y),
                rx, ry,
                xAxisRotation,
                arcFlag, sweepFlag
            );

            this.addShape(this.shapeCreator.arc(...arcParameters));
        }

        this.lastCommand = "a";
        this.lastX += x;
        this.lastY += y;
    }

    /**
     *  curvetoCubicAbs - C
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */
    curvetoCubicAbs(x1, y1, x2, y2, x, y) {
        this.addShape(this.shapeCreator.cubicBezier(
            this.lastX, this.lastY,
            x1, y1,
            x2, y2,
            x, y
        ));

        this.lastX = x;
        this.lastY = y;
        this.lastCommand = "C";
    }

    /**
     *  curvetoCubicRel - c
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */
    curvetoCubicRel(x1, y1, x2, y2, x, y) {
        this.addShape(this.shapeCreator.cubicBezier(
            this.lastX, this.lastY,
            this.lastX + x1, this.lastY + y1,
            this.lastX + x2, this.lastY + y2,
            this.lastX + x, this.lastY + y
        ));

        this.lastX += x;
        this.lastY += y;
        this.lastCommand = "c";
    }

    /**
     *  linetoHorizontalAbs - H
     *
     *  @param {number} x
     */
    linetoHorizontalAbs(x) {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            x, this.lastY
        ));

        this.lastX = x;
        this.lastCommand = "H";
    }

    /**
     *  linetoHorizontalRel - h
     *
     *  @param {number} x
     */
    linetoHorizontalRel(x) {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            this.lastX + x, this.lastY
        ));

        this.lastX += x;
        this.lastCommand = "h";
    }

    /**
     *  linetoAbs - L
     *
     *  @param {number} x
     *  @param {number} y
     */
    linetoAbs(x, y) {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            x, y
        ));

        this.lastX = x;
        this.lastY = y;
        this.lastCommand = "L";
    }

    /**
     *  linetoRel - l
     *
     *  @param {number} x
     *  @param {number} y
     */
    linetoRel(x, y) {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            this.lastX + x, this.lastY + y
        ));

        this.lastX += x;
        this.lastY += y;
        this.lastCommand = "l";
    }

    /**
     *  movetoAbs - M
     *
     *  @param {number} x
     *  @param {number} y
     */
    movetoAbs(x, y) {
        this.firstX = x;
        this.firstY = y;
        this.lastX = x;
        this.lastY = y;
        this.lastCommand = "M";
    }

    /**
     *  movetoRel - m
     *
     *  @param {number} x
     *  @param {number} y
     */
    movetoRel(x, y) {
        this.firstX += x;
        this.firstY += y;
        this.lastX += x;
        this.lastY += y;
        this.lastCommand = "m";
    }

    /**
     *  curvetoQuadraticAbs - Q
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticAbs(x1, y1, x, y) {
        this.addShape(this.shapeCreator.quadraticBezier(
            this.lastX, this.lastY,
            x1, y1,
            x, y
        ));

        this.lastX = x;
        this.lastY = y;
        this.lastCommand = "Q";
    }

    /**
     *  curvetoQuadraticRel - q
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticRel(x1, y1, x, y) {
        this.addShape(this.shapeCreator.quadraticBezier(
            this.lastX, this.lastY,
            this.lastX + x1, this.lastY + y1,
            this.lastX + x, this.lastY + y
        ));

        this.lastX += x;
        this.lastY += y;
        this.lastCommand = "q";
    }

    /**
     *  curvetoCubicSmoothAbs - S
     *
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */
    curvetoCubicSmoothAbs(x2, y2, x, y) {
        let controlX, controlY;

        if (this.lastCommand.match(/^[SsCc]$/)) {
            const secondToLast = this.shapes[this.shapes.length - 1].args[2];

            controlX = 2 * this.lastX - secondToLast.x;
            controlY = 2 * this.lastY - secondToLast.y;
        }
        else {
            controlX = this.lastX;
            controlY = this.lastY;
        }

        this.addShape(this.shapeCreator.cubicBezier(
            this.lastX, this.lastY,
            controlX, controlY,
            x2, y2,
            x, y
        ));

        this.lastX = x;
        this.lastY = y;
        this.lastCommand = "S";
    }

    /**
     *  curvetoCubicSmoothRel - s
     *
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */
    curvetoCubicSmoothRel(x2, y2, x, y) {
        let controlX, controlY;

        if (this.lastCommand.match(/^[SsCc]$/)) {
            const secondToLast = this.shapes[this.shapes.length - 1].args[2];

            controlX = 2 * this.lastX - secondToLast.x;
            controlY = 2 * this.lastY - secondToLast.y;
        }
        else {
            controlX = this.lastX;
            controlY = this.lastY;
        }

        this.addShape(this.shapeCreator.cubicBezier(
            this.lastX, this.lastY,
            controlX, controlY,
            this.lastX + x2, this.lastY + y2,
            this.lastX + x, this.lastY + y
        ));

        this.lastX += x;
        this.lastY += y;
        this.lastCommand = "s";
    }

    /**
     *  curvetoQuadraticSmoothAbs - T
     *
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticSmoothAbs(x, y) {
        let controlX, controlY;

        if (this.lastCommand.match(/^[QqTt]$/)) {
            const secondToLast = this.shapes[this.shapes.length - 1].args[1];

            controlX = 2 * this.lastX - secondToLast.x;
            controlY = 2 * this.lastY - secondToLast.y;
        }
        else {
            controlX = this.lastX;
            controlY = this.lastY;
        }

        this.addShape(this.shapeCreator.quadraticBezier(
            this.lastX, this.lastY,
            controlX, controlY,
            x, y
        ));

        this.lastX = x;
        this.lastY = y;
        this.lastCommand = "T";
    }

    /**
     *  curvetoQuadraticSmoothRel - t
     *
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticSmoothRel(x, y) {
        let controlX, controlY;

        if (this.lastCommand.match(/^[QqTt]$/)) {
            const secondToLast = this.shapes[this.shapes.length - 1].args[1];

            controlX = 2 * this.lastX - secondToLast.x;
            controlY = 2 * this.lastY - secondToLast.y;
        }
        else {
            controlX = this.lastX;
            controlY = this.lastY;
        }

        this.addShape(this.shapeCreator.quadraticBezier(
            this.lastX, this.lastY,
            controlX, controlY,
            this.lastX + x, this.lastY + y
        ));

        this.lastX += x;
        this.lastY += y;
        this.lastCommand = "t";
    }

    /**
     *  linetoVerticalAbs - V
     *
     *  @param {number} y
     */
    linetoVerticalAbs(y) {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            this.lastX, y
        ));

        this.lastY = y;

        this.lastCommand = "V";
    }

    /**
     *  linetoVerticalRel - v
     *
     *  @param {number} y
     */
    linetoVerticalRel(y) {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            this.lastX, this.lastY + y
        ));

        this.lastY += y;

        this.lastCommand = "v";
    }

    /**
     *  closePath - z or Z
     */
    closePath() {
        this.addShape(this.shapeCreator.line(
            this.lastX, this.lastY,
            this.firstX, this.firstY
        ));

        this.lastX = this.firstX;
        this.lastY = this.firstY;
        this.lastCommand = "z";
    }
}

export default PathHandler;
