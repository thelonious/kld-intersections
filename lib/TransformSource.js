const source = `
def Center =
    patterns {
        { center: { x: number as x, y: number as y } },
        { center: [ number as x, number as y ] },
        { cx: number as x, cy: number as y },
        { centerX: number as x, centerY: number as y }
    } |> Point2D(x, y);

def Radii =
    patterns {
        { radii: { x: number as rx, y: number as ry } },
        { radii: [ number as rx, number as ry ] },
        { rx: number as rx, ry: number as ry },
        { radiusX: number as rx, radiusY: number as ry }
    } |> { "rx", "ry" };

def P1 =
    patterns {
        { p1: { x: number as x, y: number as y } },
        { p1: [ number as x, number as y ] },
        { p1x: number as x, p1y: number as y }
    } |> Point2D(x, y);
        
def P2 =
    patterns {
        { p1: { x: number as x, y: number as y } },
        { p1: [ number as x, number as y ] },
        { p1x: number as x, p1y: number as y }
    } |> Point2D(x, y);
        
def P3 =
    patterns {
        { p1: { x: number as x, y: number as y } },
        { p1: [ number as x, number as y ] },
        { p1x: number as x, p1y: number as y }
    } |> Point2D(x, y);
        
def P4 =
    patterns {
        { p1: { x: number as x, y: number as y } },
        { p1: [ number as x, number as y ] },
        { p1x: number as x, p1y: number as y }
    } |> Point2D(x, y);

            
def Arc = {
    let radii = Radii,

    "center": Center,
    "radiusX": radii.rx,
    "radiusY": radii.ry,
    "startRadians": =~ number,
    "endRadians": =~ number
};

def ArcArgs = {
    let elements =
        patterns {
            [ number as centerX, number as centerY, number as radiusX, number as radiusY, number as startRadians, number as endRadians ],
            [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY, number as startRadians, number as endRadians ]
        } |> { "centerX", "centerY", "radiusX", "radiusY", "startRadians", "endRadians" },
    
    "center": Point2D(elements.centerX, elements.centerY),
    "radiusX": elements.radiusX,
    "radiusY": elements.radiusY,
    "startRadians": elements.startRadians,
    "endRadians": elements.endRadians
};

def Bezier2 = {
    "p1": P1,
    "p2": P2,
    "p3": P3
};

def Bezier2Args = {
    let elements =
        patterns {
            [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y ],
            [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }]
        } |> { "p1x", "p1y", "p2x", "p2y", "p3x", "p3y" },
    
    "p1": Point2D(elements.p1x, elements.p1y),
    "p2": Point2D(elements.p2x, elements.p2y),
    "p3": Point2D(elements.p3x, elements.p3y)
};

def Bezier3 = {
    "p1": P1,
    "p2": P2,
    "p3": P3,
    "p4": P4
};

def Bezier3Args = {
    let elements =
        patterns {
            [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y, number as p4x, number as p4y ],
            [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }, { x: number as p4x, y: number as p4y }]
        } |> { "p1x", "p1y", "p2x", "p2y", "p3x", "p3y", "p4x", "p4y" },
    
    "p1": Point2D(elements.p1x, elements.p1y),
    "p2": Point2D(elements.p2x, elements.p2y),
    "p3": Point2D(elements.p3x, elements.p3y),
    "p4": Point2D(elements.p4x, elements.p4y)
};

def Circle = {
    "center": Center,
    "radius":
        patterns {
            { r: number as radius},
            { radius: number as radius }
        } |> radius
};

def CircleArgs = {
    let elements =
        patterns {
            [ number as centerX, number as centerY, number as radius ],
            [ { x: number as centerX, y: number as centerY }, number as radius ]
        } |> { "centerX", "centerY", "radius" },
    
    "center": Point2D(elements.centerX, elements.centerY),
    "radius": elements.radius
};

def Ellipse = {
    let radii = Radii,

    "center": Center,
    "radiusX": radii.rx,
    "radiusY": radii.ry
};

def EllipseArgs = {
    let elements =
       patterns {
            [ number as centerX, number as centerY, number as radiusX, number as radiusY ],
            [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY ]
        } |> { "centerX", "centerY", "radiusX", "radiusY" },
    
    "center": Point2D(elements.centerX, elements.centerY),
    "radiusX": elements.radiusX,
    "radiusY": elements.radiusY
};

def Line = {
    "p1": P1,
    "p2": P2
};

def LineArgs = {
    let elements =
        patterns {
            [ number as p1x, number as p1y, number as p2x, number as p2y ],
            [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y } ]
        } |> { "p1x", "p1y", "p2x", "p2y" },
        
    "p1": Point2D(elements.p1x, elements.p1y),
    "p2": Point2D(elements.p2x, elements.p2y)
};

def Path = {
    "segments":
        =~ { d: string as data } |> PathData(data)
};

def PathArgs = {
    "segments":
        =~ string as data |> PathData(data)
};

def Polygon = {
    "points":
        sequences {
            =~ { points: [ (number, number); 0.. as coords ] }
            |> [ map(coords, Point2D(...$)) ],

            =~ { points: [ { x: number, y: number }; 0.. ] as points }
            |> [ map(points, Point2D($.x, $.y)) ]
        }
};

def PolygonArgs = {
    "points":
        sequences {
            =~ [ (number, number); 0.. as coords ]
            |> [ map(coords, Point2D(...$)) ],

            =~ [ { x: number, y: number }; 0.. ] as points
            |> [ map(points, Point2D($.x, $.y)) ]
        }
};

def Polyline = {
    "points":
        sequences {
            =~ { points: [ (number, number); 0.. as coords ] }
            |> [ map(coords, Point2D(...$)) ],

            =~ { points: [ { x: number, y: number }; 0.. ] as points }
            |> [ map(points, Point2D($.x, $.y)) ]
        }
};

def PolylineArgs = {
    "points":
        sequences {
            =~ [ (number, number); 0.. as coords ]
            |> [ map(coords, Point2D(...$)) ],

            =~ [ { x: number, y: number }; 0.. ] as points
            |> [ map(points, Point2D($.x, $.y)) ]
        }
};

def Rectangle = {
    let topLeft =
        patterns {
            { topLeft: { x: number as x, y: number as y } },
            { topLeft: [ number as x, number as y ] },
            { x: number as x, y: number as y },
            { top: number as x, left: number as y }
        } |> { "x", "y" },

    "topLeft":
        Point2D(topLeft.x, topLeft.y),

    "bottomRight":
        sequences {
            patterns {
                { bottomRight: { x: number as x, y: number as y } },
                { bottomRight: [ number as x, number as y ] }
            } |> Point2D(x, y),
            patterns {
                { w: number as w, h: number as h },
                { width: number as w, height: number as h },
                { size: { x: number as w, y: number as h } },
                { size: [ number as w, number as h ] }
            } |> Point2D(topLeft.x + w, topLeft.y + h)
        },

    "rx":
        sequences {
            =~ { rx: number as rx } |> rx,
            =~ any |> 0
        },
    "ry":
        sequences {
            =~ { ry: number as ry } |> ry,
            =~ any |> 0
        }
};

def RectangleArgs = {
    let elements =
        patterns {
            [ number as x, number as y, number as width, number as height ],
            [ number as x, number as y, number as width, number as height, number as rx, number as ry ],
            [ { x: number as x, y: number as y }, { x: number as width, y: number as height } ],
            [ { x: number as x, y: number as y }, { x: number as width, y: number as height }, { rx: number as rx, ry: number as ry } ],
            [ { x: number as x, y: number as y }, { x: number as width, y: number as height }, { radiusX: number as rx, radiusY: number as ry } ]
        } |> { "x", "y", "width", "height", "rx", "ry" },

    "topLeft": Point2D(elements.x, elements.y),
    "bottomRight": Point2D(elements.x + elements.width, elements.y + elements.height),
    "rx": elements.rx,
    "ry": elements.ry
}
`;

export default source;
