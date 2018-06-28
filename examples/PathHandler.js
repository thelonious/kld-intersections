/**
 *  PathHandler.js
 *
 *  @copyright 2017 Kevin Lindsey
 */

if (typeof module !== "undefine") {
    var Shapes = require('../index').Shapes;
}

/**
 *  PathHandler
 *
 *  @constructor
 */
function PathHandler() {
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
PathHandler.prototype.beginParse = function() {
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
};

/**
 *  addShape
 *
 *  @param {IntersectionArgs} shape
 */
PathHandler.prototype.addShape = function(shape) {
    this.shapes.push(shape);
};

/**
 *  arcAbs - A
 *
 *  @param {Number} rx
 *  @param {Number} ry
 *  @param {Number} xAxisRotation
 *  @param {Boolean} largeArcFlag
 *  @param {Boolean} sweepFlag
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.arcAbs = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    // TODO: implement once we support arcs
    this.lastCommand = "A";
};

/**
 *  arcRel - a
 *
 *  @param {Number} rx
 *  @param {Number} ry
 *  @param {Number} xAxisRotation
 *  @param {Boolean} largeArcFlag
 *  @param {Boolean} sweepFlag
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.arcRel = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    // TODO: implement once we support arcs
    this.lastCommand = "a";
};

/**
 *  curvetoCubicAbs - C
 *
 *  @param {Number} x1
 *  @param {Number} y1
 *  @param {Number} x2
 *  @param {Number} y2
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoCubicAbs = function(x1, y1, x2, y2, x, y) {
    this.addShape(Shapes.cubicBezier(
        this.lastX, this.lastY,
        x1, y1,
        x2, y2,
        x, y
    ));

    this.lastX = x;
    this.lastY = y;
    this.lastCommand = "C";
};

/**
 *  curvetoCubicRel - c
 *
 *  @param {Number} x1
 *  @param {Number} y1
 *  @param {Number} x2
 *  @param {Number} y2
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoCubicRel = function(x1, y1, x2, y2, x, y) {
    this.addShape(Shapes.cubicBezier(
        this.lastX, this.lastY,
        this.lastX + x1, this.lastY + y1,
        this.lastX + x2, this.lastY + y2,
        this.lastX + x, this.lastY + y
    ));

    this.lastX += x;
    this.lastY += y;
    this.lastCommand = "c";
};

/**
 *  linetoHorizontalAbs - H
 *
 *  @param {Number} x
 */
PathHandler.prototype.linetoHorizontalAbs = function(x) {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        x, this.lastY
    ));

    this.lastX = x;
    this.lastCommand = "H";
};

/**
 *  linetoHorizontalRel - h
 *
 *  @param {Number} x
 */
PathHandler.prototype.linetoHorizontalRel = function(x) {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        this.lastX + x, this.lastY
    ));

    this.lastX += x;
    this.lastCommand = "h";
};

/**
 *  linetoAbs - L
 *
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.linetoAbs = function(x, y) {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        x, y
    ));

    this.lastX = x;
    this.lastY = y;
    this.lastCommand = "L";
};

/**
 *  linetoRel - l
 *
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.linetoRel = function(x, y) {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        this.lastX + x, this.lastY + y
    ));

    this.lastX += x;
    this.lastY += y;
    this.lastCommand = "l";
};

/**
 *  movetoAbs - M
 *
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.movetoAbs = function(x, y) {
    this.firstX = x;
    this.firstY = y;
    this.lastX = x;
    this.lastY = y;
    this.lastCommand = "M";
};

/**
 *  movetoRel - m
 *
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.movetoRel = function(x, y) {
    this.firstX += x;
    this.firstY += y;
    this.lastX += x;
    this.lastY += y;
    this.lastCommand = "m";
};

/**
 *  curvetoQuadraticAbs - Q
 *
 *  @param {Number} x1
 *  @param {Number} y1
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoQuadraticAbs = function(x1, y1, x, y) {
    this.addShape(Shapes.quadraticBezier(
        this.lastX, this.lastY,
        x1, y1,
        x, y
    ));

    this.lastX = x;
    this.lastY = y;
    this.lastCommand = "Q";
};

/**
 *  curvetoQuadraticRel - q
 *
 *  @param {Number} x1
 *  @param {Number} y1
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoQuadraticRel = function(x1, y1, x, y) {
    this.addShape(Shapes.quadraticBezier(
        this.lastX, this.lastY,
        this.lastX + x1, this.lastY + y1,
        this.lastX + x, this.lastY + y
    ));

    this.lastX += x;
    this.lastY += y;
    this.lastCommand = "q";
};

/**
 *  curvetoCubicSmoothAbs - S
 *
 *  @param {Number} x2
 *  @param {Number} y2
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoCubicSmoothAbs = function(x2, y2, x, y) {
    var controlX, controlY;
    
    if ( this.lastCommand.match(/^[SsCc]$/) ) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[2];

        controlX = 2 * this.lastX - secondToLast.x,
        controlY = 2 * this.lastX - secondToLast.y
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
};

/**
 *  curvetoCubicSmoothRel - s
 *
 *  @param {Number} x2
 *  @param {Number} y2
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoCubicSmoothRel = function(x2, y2, x, y) {
    var controlX, controlY;
    
    if ( this.lastCommand.match(/^[SsCc]$/) ) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[2];

        controlX = 2 * this.lastX - secondToLast.x,
        controlY = 2 * this.lastY - secondToLast.y
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
};

/**
 *  curvetoQuadraticSmoothAbs - T
 *
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoQuadraticSmoothAbs = function(x, y) {
    var controlX, controlY;
    
    if ( this.lastCommand.match(/^[QqTt]$/) ) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[1];

        controlX = 2 * this.lastX - secondToLast.x,
        controlY = 2 * this.lastY - secondToLast.y
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
};

/**
 *  curvetoQuadraticSmoothRel - t
 *
 *  @param {Number} x
 *  @param {Number} y
 */
PathHandler.prototype.curvetoQuadraticSmoothRel = function(x, y) {
    var controlX, controlY;
    
    if ( this.lastCommand.match(/^[QqTt]$/) ) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[1];

        controlX = 2 * this.lastX - secondToLast.x,
        controlY = 2 * this.lastY - secondToLast.y
    }
    else {
        controlX = this.lastX;
        controlY = this.lastY;
    }

    this.addShape(Shapes.quadraticBezier(
        controlX, controlY,
        this.lastX + x, this,lastY + y
    ));

    this.lastX += x;
    this.lastY += y;
    this.lastCommand = "t";
};

/**
 *  linetoVerticalAbs - V
 *
 *  @param {Number} y
 */
PathHandler.prototype.linetoVerticalAbs = function(y) {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        this.lastX, y
    ));

    this.lastY = y;

    this.lastCommand = "V";
};

/**
 *  linetoVerticalRel - v
 *
 *  @param {Number} y
 */
PathHandler.prototype.linetoVerticalRel = function(y) {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        this.lastX, this.lastY + y
    ));

    this.lastY += y;

    this.lastCommand = "v";
};

/**
 *  closePath - z or Z
 */
PathHandler.prototype.closePath = function() {
    this.addShape(Shapes.line(
        this.lastX, this.lastY,
        this.firstX, this.firstY
    ));

    this.lastX = this.firstX,
    this.lastY = this.firstY;
    this.lastCommand = "z";
};

if (typeof module !== "undefine") {
    module.exports = PathHandler;
}
