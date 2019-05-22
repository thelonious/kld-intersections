/**
 * @module kld-intersections
 */

export {default as Intersection} from "./lib/Intersection.js";

/**
 * @deprecated Use ShapeInfo instead
 */
export {default as IntersectionArgs} from "./lib/ShapeInfo.js";

/**
 * @namespace ShapeInfo
 * @implements {module:Shapes~ShapeInfo}
 */
export {default as ShapeInfo} from "./lib/ShapeInfo.js";

/**
 * @namespace Shapes
 * @implements {module:Shapes~Shapes}
 */
export {default as Shapes} from "./lib/Shapes.js";

/**
 * @namespace AffineShapes
 * @implements {module:AffineShapes~AffineShapes}
 */
export {default as AffineShapes} from "./lib/AffineShapes.js";

/**
 * @namespace SvgShapes
 * @implements {module:SvgShapes~SvgShapes}
 */
export {default as SvgShapes} from "./lib/SvgShapes.js";

/**
 * @namespace IntersectionQuery
 * @implements {module:IntersectionQuery~IntersectionQuery}
 */
export {default as IntersectionQuery} from "./lib/IntersectionQuery.js";

// Expose affine module classes

/**
* @external Point2D
*/

/**
* @external Vector2D
*/

/**
* @external Matrix2D
*/

/**
 * @class Point2D
 * @memberof module:kld-intersections
 * @implements {external:Point2D}
 */
export {Point2D} from "kld-affine";

/**
 * @class Vector2D
 * @memberof module:kld-intersections
 * @implements {external:Vector2D}
 */
export {Vector2D} from "kld-affine";

/**
 * @class Matrix2D
 * @memberof module:kld-intersections
 * @implements {external:Matrix2D}
 */
export {Matrix2D} from "kld-affine";


/**
* @external Polynomial
*/
