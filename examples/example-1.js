#!/usr/bin/env node

let lib = require('../index'),
    Point2D = lib.Point2D,
    Intersection = lib.Intersection;

let circle = {
    cx: new Point2D(0, 0),
    r: 50,
};

let rectangle = {
    p1: new Point2D(0, 0),
    p2: new Point2D(60, 30)
};

let result = Intersection.intersectCircleRectangle(
    circle.cx, circle.r,
    rectangle.p1, rectangle.p2
);

console.log(result);
