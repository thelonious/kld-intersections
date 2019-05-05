/**
 *
 *   IntersectionArgs.js
 *
 *   @copyright 2002, 2017 Kevin Lindsey
 *
 */

/**
 *  IntersectionArgs
 * @memberof module:kld-intersections
 */
class IntersectionArgs {
    /**
     *  @param {string} name
     *  @param {Array<module:kld-intersections.Point2D>} args
     *  @returns {module:kld-intersections.IntersectionArgs}
     */
    constructor(name, args) {
        this.init(name, args);
    }
    /**
     *  init
     *
     *  @param {string} name
     *  @param {Array<module:kld-intersections.Point2D>} args
     */
    init(name, args) {
        this.name = name;
        this.args = args;
    }
}

export default IntersectionArgs;
