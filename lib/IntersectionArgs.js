/**
 *
 *   IntersectionArgs.js
 *
 *   @copyright 2002, Kevin Lindsey
 *
 */

/**
 *  IntersectionArgs
 *
 *  @param {String} name
 *  @param {Array<Point2D} params
 *  @returns {IntersectionArgs}
 */
function IntersectionArgs(name, params) {
    this.init(name, params);
}


/**
 *  init
 *
 *  @param {String} name
 *  @param {Array<Point2D>} params
 */
IntersectionArgs.prototype.init = function(name, params) {
    this.name   = name;
    this.params = params;
};

if (typeof module !== "undefined") {
    module.exports = IntersectionArgs;
}