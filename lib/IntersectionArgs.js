/**
 *
 *   IntersectionArgs.js
 *
 *   @copyright 2002, 2017 Kevin Lindsey
 *
 */

/**
 *  IntersectionArgs
 *
 */
class IntersectionArgs {
    /**
     *  @param {string} name
     *  @param {Array<Point2D>} args
     *  @returns {IntersectionArgs}
     */
    constructor(name, args) {
        this.init(name, args);
    }
    /**
     *  init
     *
     *  @param {string} name
     *  @param {Array<Point2D>} args
     */
    init(name, args) {
        this.name = name;
        this.args = args;
    }
}

export default IntersectionArgs;
