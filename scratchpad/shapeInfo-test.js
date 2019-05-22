#!/usr/bin/env node -r esm

import util from "util";
import ShapeInfo from "../lib/ShapeInfo.js";
import {Point2D, Vector2D} from "kld-affine";

const circle = ShapeInfo.circle({
    center: new Point2D(80, 60),
    radius: 40
});
const circle2 = ShapeInfo.circle(80, 60, 40);
const circle3 = ShapeInfo.circle(new Point2D(80, 60), 40);

const ellipse = ShapeInfo.ellipse({
    center: new Point2D(80, 60),
    radiusX: 30,
    radiusY: 40
});
const ellipse2 = ShapeInfo.ellipse(80, 60, 30, 40);
const ellipse3 = ShapeInfo.ellipse(new Point2D(80, 60), 30, 40);

const line = ShapeInfo.line({
    p1: new Point2D(10, 20),
    p2: new Point2D(110, 120)
});
const line2 = ShapeInfo.line(10, 20, 110, 120);
const line3 = ShapeInfo.line(new Point2D(10, 20), new Point2D(110, 120));

const path = ShapeInfo.path({ d: "M0 10 L100 110"});
const path2 = ShapeInfo.path("M0 10 L100 110");
// const path3 = ShapeInfo.path({
//     segments: [
//         ShapeInfo.line({p1: new Point2D(10, 10), p2: new Point2D(110, 110)})
//     ]
// });

const polygon = ShapeInfo.polygon({
    points: [
        new Point2D(10, 20),
        new Point2D(60, 20),
        new Point2D(60, 100),
        new Point2D(10, 100)
    ]
});
const polygon2 = ShapeInfo.polygon([10, 20, 60, 20, 60, 100, 10, 100]);
const polygon3 = ShapeInfo.polygon([new Point2D(10, 20), new Point2D(60, 20), new Point2D(60, 100), new Point2D(10, 100)]);

const rectangle = ShapeInfo.rectangle({
    topLeft: new Point2D(35, 25),
    bottomRight: new Point2D(80, 100)
});
const rectangle2 = ShapeInfo.rectangle(35, 25, 80, 100);
const rectangle3 = ShapeInfo.rectangle(new Point2D(35, 25), new Vector2D(80, 100));

const shapes = [
    circle, circle2, circle3,
    ellipse, ellipse2, ellipse3,
    line, line2, line3,
    path, path2, /*path3,*/
    polygon, polygon2, polygon3,
    rectangle, rectangle2, rectangle3
];

shapes.forEach(shape => console.log(util.inspect(shape, {depth: 4})));
