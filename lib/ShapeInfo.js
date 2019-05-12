/**
 *
 *   ShapeInfo.js  @copyright 2002, 2017 Kevin Lindsey
 *
 */

/**
 *  ShapeInfo
 * @memberof module:kld-intersections
 */
class ShapeInfo {
    /**
     *  @param {string} name
     *  @param {Array<module:kld-intersections.Point2D>} args
     *  @returns {module:kld-intersections.ShapeInfo}
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

export default ShapeInfo;
