/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

import {Point2D} from "kld-affine";
import {Transformer} from "kld-data-transformer";

/**
 *  ShapeInfo
 *  @memberof module:kld-intersections
 */
export default class ShapeInfo {
    /**
     *  @param {string} name
     *  @param {Array} args
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }

    static arc(...args) {
        return create(ShapeInfo.ARC, args, ["center", "radiusX", "radiusY", "startRadians", "endRadians"]);
    }

    static quadraticBezier(...args) {
        return create(ShapeInfo.QUADRATIC_BEZIER, args, ["p1", "p2", "p3"]);
    }

    static cubicBezier(...args) {
        return create(ShapeInfo.CUBIC_BEZIER, args, ["p1", "p2", "p3", "p4"]);
    }

    static circle(...args) {
        return create(ShapeInfo.CIRCLE, args, ["center", "radius"]);
    }

    static ellipse(...args) {
        return create(ShapeInfo.ELLIPSE, args, ["center", "radiusX", "radiusY"]);
    }

    static line(...args) {
        return create(ShapeInfo.LINE, args, ["p1", "p2"]);
    }

    static path(...args) {
        return create(ShapeInfo.PATH, args, ["segments"]);
    }

    static polygon(...args) {
        return create(ShapeInfo.POLYGON, args, ["points"]);
    }

    static polyline(...args) {
        return create(ShapeInfo.POLYLINE, args, ["point"]);
    }

    static rectangle(...args) {
        return create(ShapeInfo.RECTANGLE, args, ["topLeft", "bottomRight"]);
    }
}

/**
 * Create a shape
 *
 * @param {string} type
 * @param {Object} object
 * @param {Array<string>} properties
 * @returns {ShapeInfo}
 */
function create(type, object, properties) {
    let transformType;

    if (object.length === 1) {
        object = object[0];
        transformType = type;
    }
    else {
        transformType = type + "Array";
    }

    // normalize the data
    const data = transformer.execute(`type ${transformType}`, object);

    if (data === undefined) {
        throw new TypeError(`${type} is not in a recognizable format: ${JSON.stringify(object)}`);
    }

    // pull out the arguments
    const args = properties.map(name => data[name]);

    // return a new ShapeInfo
    return new ShapeInfo(type, args);
}


ShapeInfo.ARC = "Arc";
ShapeInfo.QUADRATIC_BEZIER = "Bezier2";
ShapeInfo.CUBIC_BEZIER = "Bezier3";
ShapeInfo.CIRCLE = "Circle";
ShapeInfo.ELLIPSE = "Ellipse";
ShapeInfo.LINE = "Line";
ShapeInfo.PATH = "Path";
ShapeInfo.POLYGON = "Polygon";
ShapeInfo.POLYLINE = "Polyline";
ShapeInfo.RECTANGLE = "Rectangle";

const transformer = Transformer.fromSource(`
transform Center =
    Point2D(x, y) <=
            { center: { x: number as x, y: number as y } }
        |   { center: [ number as x, number as y ] }
        |   { cx: number as x, cy: number as y }
        |   { centerX: number as x, centerY: number as y }

transform Radii =
    // the generator could also be _, but I like being explicit
    { rx, ry } <=
            { radii: { x: number as rx, y: number as ry } }
        |   { radii: [ number as rx, number as ry ] }
        |   { rx: number as rx, ry: number as ry }
        |   { radiusX: number as rx, radiusY: number as ry }
        
transform P1 =
    Point2D(x, y) <=
            { p1: { x: number as x, y: number as y } }
        |   { p1: [ number as x, number as y ] }
        
transform P2 =
    Point2D(x, y) <=
            { p2: { x: number as x, y: number as y } }
        |   { p2: [ number as x, number as y ] }
        |   { p2x: number as x, p2y: number as y }
        
transform P3 =
    Point2D(x, y) <=
            { p3: { x: number as x, y: number as y } }
        |   { p3: [ number as x, number as y ] }
        |   { p3x: number as x, p3y: number as y }
        
transform P4 =
    Point2D(x, y) <=
            { p4: { x: number as x, y: number as y } }
        |   { p4: [ number as x, number as y ] }
        |   { p4x: number as x, p4y: number as y }

transform Number =
    _ <= number
            
type ${ShapeInfo.ARC} = {
    // collect some values so we don't have to repeat queries
    radii = transform Radii;
    
    center: transform Center,
    radiusX: radii.rx,
    radiusY: radii.ry,
    startRadians: transform Number,
    endRadians: transform Number
}

type ${ShapeInfo.ARC}Array = {
    elements =
        _ <= [
            number as centerX,
            number as centerY,
            number as radiusX,
            number as radiusY,
            number as startRadians,
            number as endRadians
        ];
    
    center: Point2D(elements.centerX, elements.centerY),
    radiusX: elements.radiusX,
    radiusY: elements.radiusY,
    startRadians: elements.startRadians,
    endRadians: elements.endRadians
}

type ${ShapeInfo.QUADRATIC_BEZIER} = {
    p1: transform P1,
    p2: transform P2,
    p3: transform P3
}

type ${ShapeInfo.CUBIC_BEZIER} = {
    p1: transform P1,
    p2: transform P2,
    p3: transform P3,
    p4: transform P4
}

type ${ShapeInfo.CIRCLE} = {
    center: transform Center,
    radius: radius <=
            { r: number as radius}
        |   { radius: number as radius }
}

type ${ShapeInfo.CIRCLE}Array = {
    elements =
        _ <=
                [ number as centerX, number as centerY, number as radius ]
            |   [ { x: number as centerX, y: number as centerY }, number as radius ];
    
    center: Point2D(elements.centerX, elements.centerY),
    radius: elements.radius
}

type ${ShapeInfo.ELLIPSE} = {
    // collect some values so we don't have to repeat queries
    radii = transform Radii;
    
    center: transform Center,
    radiusX: radii.rx,
    radiusY: radii.ry
}

type ${ShapeInfo.ELLIPSE}Array = {
    elements =
        _ <=
                [ number as centerX, number as centerY, number as radiusX, number as radiusY ]
            |   [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY ];
    
    center: Point2D(elements.centerX, elements.centerY),
    radiusX: elements.radiusX,
    radiusY: elements.radiusY
}

type ${ShapeInfo.LINE} = {
    p1: transform P1,
    p2: transform P2
}

type ${ShapeInfo.LINE}Array = {
    elements =
        _ <=
                [ number as p1x, number as p1y, number as p2x, number as p2y ]
            |   [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y } ];
        
    p1: Point2D(elements.p1x, elements.p1y),
    p2: Point2D(elements.p2x, elements.p2y)
}

type ${ShapeInfo.PATH} = {
    segments:
        PathData(data) <= { d: string as data }
}

type ${ShapeInfo.POLYGON} = {
    points:
        ListOfCoords(coords) <= { points: [ (number, number); 0..] as coords };
        ListOfPoints(points) <= { points: [ { x: number, y: number }; 0.. ] as points }
}

type ${ShapeInfo.POLYGON}Array = {
    elements =
        ListOfCoords(coords) <=
                [ (number, number); 0..] as coords;
        
    points: elements
}

type ${ShapeInfo.POLYLINE} = {
    points:
        ListOfCoords(coords) <= { points: [ (number, number); 0..] as coords };
        ListOfPoints(points) <= { points: [ { x: number, y: number }; 0.. ] as points }
}

type ${ShapeInfo.POLYLINE}Array = {
    elements =
        ListOfCoords(coords) <=
                [ (number, number); 0..] as coords;
        
    points: elements
}

type ${ShapeInfo.RECTANGLE} = {
    // collect top-left point in case we need to do math with it for
    // bottom-right
    topLeft =
        // could also be _
        { x, y } <=
                { topLeft: { x: number as x, y: number as y } }
            |   { topLeft: [ number as x, number as y ] }
            |   { x: number as x, y: number as y }
            |   { top: number as x, left: number as y };

    topLeft:
        Point2D(topLeft.x, topLeft.y),

    bottomRight:
        Point2D(x, y) <=
                { bottomRight: { x: number as x, y: number as y } }
            |   { bottomRight: [ number as x, number as y ] };
        Point2D(topLeft.x + w, topLeft.y + h) <=
                { w: number as w, h: number as h }
            |   { width: number as w, height: number as h }
            |   { size: { x: number as w, y: number as h } }
            |   { size: [ number as w, number as h ] }
}

type ${ShapeInfo.RECTANGLE}Array = {
    elements =
        _ <=
                [ number as x, number as y, number as width, number as height ]
            |   [ { x: number as x, y: number as y }, { x: number as width, y: number as height } ];
    
    topLeft: Point2D(elements.x, elements.y),
    bottomRight: Point2D(elements.x + elements.width, elements.y + elements.height)
}
`);

// console.log(util.inspect(normalizer.types.Circle, { depth: Infinity, colors: true }));

transformer.typeCreators.Point2D = (x, y) => new Point2D(x, y);
transformer.typeCreators.ListOfCoords = ps => {
    const result = [];

    for (let i = 0; i < ps.length; i += 2) {
        const x = ps[i];
        const y = ps[i + 1];

        result.push(new Point2D(x, y));
    }

    return result;
};
transformer.typeCreators.ListOfPoints = ps => ps.map(p => {
    return new Point2D(p.x, p.y);
});
