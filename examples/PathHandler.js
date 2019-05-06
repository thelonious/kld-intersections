/**
 *  PathHandler.js
 *
 *  @copyright 2017 Kevin Lindsey
 */

import {Shapes} from "../index.js";

/**
 *  PathHandler
 */
class PathHandler {
    constructor() {
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
     *  @param {IntersectionArgs} shape
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
     *  @param {boolean} largeArcFlag
     *  @param {boolean} sweepFlag
     *  @param {number} x
     *  @param {number} y
     */
    arcAbs(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        // TODO: implement once we support arcs
        this.lastCommand = "A";
        throw new Error("Not yet supported!");
    }

    /**
     *  arcRel - a
     *
     *  @param {number} rx
     *  @param {number} ry
     *  @param {number} xAxisRotation
     *  @param {boolean} largeArcFlag
     *  @param {boolean} sweepFlag
     *  @param {number} x
     *  @param {number} y
     */
    arcRel(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        // TODO: implement once we support arcs
        this.lastCommand = "a";
        throw new Error("Not yet supported!");
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
        this.addShape(Shapes.cubicBezier(
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
        this.addShape(Shapes.cubicBezier(
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
        this.addShape(Shapes.line(
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
        this.addShape(Shapes.line(
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
        this.addShape(Shapes.line(
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
        this.addShape(Shapes.line(
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
        this.addShape(Shapes.quadraticBezier(
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
        this.addShape(Shapes.quadraticBezier(
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
            controlY = 2 * this.lastX - secondToLast.y;
        }
        else {
            controlX = this.lastX;
            controlY = this.lastY;
        }

        this.addShape(Shapes.cubicBezier(
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

        this.addShape(Shapes.cubicBezier(
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

        this.addShape(Shapes.quadraticBezier(
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

        this.addShape(Shapes.quadraticBezier(
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
        this.addShape(Shapes.line(
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
        this.addShape(Shapes.line(
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
        this.addShape(Shapes.line(
            this.lastX, this.lastY,
            this.firstX, this.firstY
        ));

        this.lastX = this.firstX;
        this.lastY = this.firstY;
        this.lastCommand = "z";
    }
}

export default PathHandler;
