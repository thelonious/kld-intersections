/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

import {Point2D} from "kld-affine";
import {Transformer} from "kld-data-transformer";
import {PathParser} from "kld-path-parser";
import PathHandler from "./PathHandler.js";

const degree90 = Math.PI * 0.5;

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
        return create(ShapeInfo.POLYLINE, args, ["points"]);
    }

    static rectangle(...args) {
        const result = create(ShapeInfo.RECTANGLE, args, ["topLeft", "bottomRight", "rx", "ry"]);

        let ry = result.args.pop();
        let rx = result.args.pop();

        rx = rx === undefined ? 0 : rx;
        ry = ry === undefined ? 0 : ry;

        if (rx === 0 && ry === 0) {
            return result;
        }

        const {p1x, p1y} = result.args[0];
        const {p2x, p2y} = result.args[1];
        const width = p2x - p1x;
        const height = p2y - p1y;

        if (rx === 0) {
            rx = ry;
        }
        if (ry === 0) {
            ry = rx;
        }
        if (rx > width * 0.5) {
            rx = width * 0.5;
        }
        if (ry > height * 0.5) {
            ry = height * 0.5;
        }

        const x0 = p1x;
        const y0 = p1y;
        const x1 = p1x + rx;
        const y1 = p1y + ry;
        const x2 = p2x - rx;
        const y2 = p2y - ry;
        const x3 = p2x;
        const y3 = p2y;

        const segments = [
            ShapeInfo.arc(x1, y1, rx, ry, 2 * degree90, 3 * degree90),
            ShapeInfo.line(x1, y0, x2, y0),
            ShapeInfo.arc(x2, y1, rx, ry, 3 * degree90, 4 * degree90),
            ShapeInfo.line(x3, y1, x3, y2),
            ShapeInfo.arc(x2, y2, rx, ry, 0, degree90),
            ShapeInfo.line(x2, y3, x1, y3),
            ShapeInfo.arc(x1, y2, rx, ry, degree90, 2 * degree90),
            ShapeInfo.line(x0, y2, x0, y1)
        ];

        return ShapeInfo(ShapeInfo.PATH, segments);
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

        transformType = Array.isArray(object) || typeof object === "string"
            ? type + "Args"
            : type;
    }
    else {
        transformType = type + "Args";
    }

    // normalize the data
    const data = transformer.execute(`type ${transformType}`, object);

    if (data === undefined) {
        throw new TypeError(`${type} is not in a recognizable format: ${JSON.stringify(object)}`);
    }

    // pull out the arguments
    const args = properties.length === 1
        ? data[properties[0]]
        : properties.map(name => data[name]);

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

type ${ShapeInfo.ARC}Args = {
    elements =
        _ <=
                [ number as centerX, number as centerY, number as radiusX, number as radiusY, number as startRadians, number as endRadians ]
            |   [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY, number as startRadians, number as endRadians ];
    
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

type ${ShapeInfo.QUADRATIC_BEZIER}Args = {
    elements =
        _ <=
                [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y ]
            |   [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }];
    
    p1: Point2D(elements.p1x, elements.p1y),
    p2: Point2D(elements.p2x, elements.p2y),
    p3: Point2D(elements.p3x, elements.p3y)
}

type ${ShapeInfo.CUBIC_BEZIER} = {
    p1: transform P1,
    p2: transform P2,
    p3: transform P3,
    p4: transform P4
}

type ${ShapeInfo.CUBIC_BEZIER}Args = {
    elements =
        _ <=
                [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y, number as p4x, number as p4y ]
            |   [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }, { x: number as p4x, y: number as p4y }];
    
    p1: Point2D(elements.p1x, elements.p1y),
    p2: Point2D(elements.p2x, elements.p2y),
    p3: Point2D(elements.p3x, elements.p3y),
    p4: Point2D(elements.p4x, elements.p4y)
}

type ${ShapeInfo.CIRCLE} = {
    center: transform Center,
    radius: radius <=
            { r: number as radius}
        |   { radius: number as radius }
}

type ${ShapeInfo.CIRCLE}Args = {
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

type ${ShapeInfo.ELLIPSE}Args = {
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

type ${ShapeInfo.LINE}Args = {
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

type ${ShapeInfo.PATH}Args = {
    segments: PathData(data) <= string as data
}

type ${ShapeInfo.POLYGON} = {
    points:
        ListOfCoords(coords) <= { points: [ (number, number); 0..] as coords };
        ListOfPoints(points) <= { points: [ { x: number, y: number }; 0.. ] as points }
}

type ${ShapeInfo.POLYGON}Args = {
    points:
         [ ListOfCoords(coords) ] <= [ (number, number); 0..] as coords;
         [ ListOfPoints(points) ] <= [ { x: number, y: number }; 0.. ] as points
}

type ${ShapeInfo.POLYLINE} = {
    points:
        ListOfCoords(coords) <= { points: [ (number, number); 0..] as coords };
        ListOfPoints(points) <= { points: [ { x: number, y: number }; 0.. ] as points }
}

type ${ShapeInfo.POLYLINE}Args = {
    points:
         [ ListOfCoords(coords) ] <= [ (number, number); 0..] as coords;
         [ ListOfPoints(points) ] <= [ { x: number, y: number }; 0.. ] as points
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
            |   { size: [ number as w, number as h ] },
    rx:
        rx <=
                { rx: number as rx }
            |   { radiusX: number as rx };
        0 <= any,
    ry:
        ry <=
                { ry: number as ry }
            |   { radiusY: number as ry };
        0 <= any
}

type ${ShapeInfo.RECTANGLE}Args = {
    elements =
        _ <=
                [ number as x, number as y, number as width, number as height ]
            |   [ { x: number as x, y: number as y }, { x: number as width, y: number as height } ];
    
    topLeft: Point2D(elements.x, elements.y),
    bottomRight: Point2D(elements.x + elements.width, elements.y + elements.height),
    rx:
        rx <=
                { rx: number as rx }
            |   { radiusX: number as rx };
        0,
    ry:
        ry <=
                { ry: number as ry }
            |   { radiusY: number as ry };
        0
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
transformer.typeCreators.PathData = pathData => {
    const parser = new PathParser();
    const handler = new PathHandler(ShapeInfo);

    parser.setHandler(handler);
    parser.parseData(pathData);

    return handler.shapes;
};
