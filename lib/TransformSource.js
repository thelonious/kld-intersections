const source = `
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
            
type Arc = {
    // collect some values so we don't have to repeat queries
    radii = transform Radii;
    
    center: transform Center,
    radiusX: radii.rx,
    radiusY: radii.ry,
    startRadians: transform Number,
    endRadians: transform Number
}

type ArcArgs = {
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

type Bezier2 = {
    p1: transform P1,
    p2: transform P2,
    p3: transform P3
}

type Bezier2Args = {
    elements =
        _ <=
                [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y ]
            |   [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }];
    
    p1: Point2D(elements.p1x, elements.p1y),
    p2: Point2D(elements.p2x, elements.p2y),
    p3: Point2D(elements.p3x, elements.p3y)
}

type Bezier3 = {
    p1: transform P1,
    p2: transform P2,
    p3: transform P3,
    p4: transform P4
}

type Bezier3Args = {
    elements =
        _ <=
                [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y, number as p4x, number as p4y ]
            |   [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }, { x: number as p4x, y: number as p4y }];
    
    p1: Point2D(elements.p1x, elements.p1y),
    p2: Point2D(elements.p2x, elements.p2y),
    p3: Point2D(elements.p3x, elements.p3y),
    p4: Point2D(elements.p4x, elements.p4y)
}

type Circle = {
    center: transform Center,
    radius: radius <=
            { r: number as radius}
        |   { radius: number as radius }
}

type CircleArgs = {
    elements =
        _ <=
                [ number as centerX, number as centerY, number as radius ]
            |   [ { x: number as centerX, y: number as centerY }, number as radius ];
    
    center: Point2D(elements.centerX, elements.centerY),
    radius: elements.radius
}

type Ellipse = {
    // collect some values so we don't have to repeat queries
    radii = transform Radii;
    
    center: transform Center,
    radiusX: radii.rx,
    radiusY: radii.ry
}

type EllipseArgs = {
    elements =
        _ <=
                [ number as centerX, number as centerY, number as radiusX, number as radiusY ]
            |   [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY ];
    
    center: Point2D(elements.centerX, elements.centerY),
    radiusX: elements.radiusX,
    radiusY: elements.radiusY
}

type Line = {
    p1: transform P1,
    p2: transform P2
}

type LineArgs = {
    elements =
        _ <=
                [ number as p1x, number as p1y, number as p2x, number as p2y ]
            |   [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y } ];
        
    p1: Point2D(elements.p1x, elements.p1y),
    p2: Point2D(elements.p2x, elements.p2y)
}

type Path = {
    segments:
        PathData(data) <= { d: string as data }
}

type PathArgs = {
    segments: PathData(data) <= string as data
}

type Polygon = {
    points:
        ListOfCoords(coords) <= { points: [ (number, number); 0..] as coords };
        ListOfPoints(points) <= { points: [ { x: number, y: number }; 0.. ] as points }
}

type PolygonArgs = {
    points:
         [ ListOfCoords(coords) ] <= [ (number, number); 0..] as coords;
         [ ListOfPoints(points) ] <= [ { x: number, y: number }; 0.. ] as points
}

type Polyline = {
    points:
        ListOfCoords(coords) <= { points: [ (number, number); 0..] as coords };
        ListOfPoints(points) <= { points: [ { x: number, y: number }; 0.. ] as points }
}

type PolylineArgs = {
    points:
         [ ListOfCoords(coords) ] <= [ (number, number); 0..] as coords;
         [ ListOfPoints(points) ] <= [ { x: number, y: number }; 0.. ] as points
}

type Rectangle = {
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

type RectangleArgs = {
    elements =
        { x, y, width, height, rx, ry } <=
                [ number as x, number as y, number as width, number as height ]
            |   [ number as x, number as y, number as width, number as height, number as rx, number as ry ]
            |   [ { x: number as x, y: number as y }, { x: number as width, y: number as height } ]
            |   [ { x: number as x, y: number as y }, { x: number as width, y: number as height }, { rx: number as rx, ry: number as ry } ]
            |   [ { x: number as x, y: number as y }, { x: number as width, y: number as height }, { radiusX: number as rx, radiusY: number as ry } ];

    topLeft: Point2D(elements.x, elements.y),
    bottomRight: Point2D(elements.x + elements.width, elements.y + elements.height),
    rx: elements.rx,
    ry: elements.ry
}
`;

export default source;
