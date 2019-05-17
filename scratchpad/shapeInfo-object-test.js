#!/usr/bin/env node -r esm

import {Intersection, ShapeInfo} from "../index.js";
import {Point2D} from "kld-affine";

const circle = ShapeInfo.object({
    type: ShapeInfo.CIRCLE,
    center: new Point2D(80, 80),
    radius: 40
});
const ellipse = ShapeInfo.object({
    type: ShapeInfo.ELLIPSE,
    center: new Point2D(80, 80),
    radiusX: 30,
    radiusY: 40
});
const line = ShapeInfo.object({
    type: ShapeInfo.LINE,
    p1: new Point2D(10, 10),
    p2: new Point2D(110, 110)
});
// NOTE: path covers arc, bezier2, and bezier3. These will probably never be created directly. Instead
// PathParser/PathHandler will most likely be used either directly or indirectly.
const path = ShapeInfo.object({
    type: ShapeInfo.PATH,
    segments: [
        ShapeInfo.object({type: ShapeInfo.LINE, p1: new Point2D(10, 10), p2: new Point2D(110, 110)})
    ]
});
const polygon = ShapeInfo.object({
    type: ShapeInfo.POLYGON,
    points: [
        new Point2D(10, 20),
        new Point2D(60, 20),
        new Point2D(60, 100),
        new Point2D(10, 100)
    ]
});
const rectangle = ShapeInfo.object({
    type: ShapeInfo.RECTANGLE,
    topLeft: new Point2D(35, 25),
    bottomRight: new Point2D(80, 100)
});

// intersect
//const result = Intersection.intersect(shape1, shape2);
//console.log(result);

const shapes = [circle, ellipse, line, path, polygon, rectangle];

shapes.forEach(shape => console.log(JSON.stringify(shape, null, 2)));
