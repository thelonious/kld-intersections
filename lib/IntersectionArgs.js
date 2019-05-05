/**
 *
 *   IntersectionArgs.js
 *
 *   @copyright 2002, 2017 Kevin Lindsey
 *
 */

"use strict";

/**
 *  IntersectionArgs
 *
 *  @param {string} name
 *  @param {Array<Point2D>} args
 *  @returns {IntersectionArgs}
 */
function IntersectionArgs(name, args) {
    this.init(name, args);
}

/**
 *  init
 *
 *  @param {string} name
 *  @param {Array<Point2D>} args
 */
IntersectionArgs.prototype.init = function(name, args) {
    this.name = name;
    this.args = args;
};

if (typeof module !== "undefined") {
    module.exports = IntersectionArgs;
}
