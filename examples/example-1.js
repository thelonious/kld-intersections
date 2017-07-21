#!/usr/bin/env node

let lib = require('../index'),
    Point2D = lib.Point2D,
    Intersection = lib.Intersection;

let circle = {
    center: new Point2D(0, 0),
    radius: 50,
};

let rectangle = {
    topLeft: new Point2D(0, 0),
    bottomRight: new Point2D(60, 30)
};

let result = Intersection.intersectCircleRectangle(
    circle.center, circle.radius,
    rectangle.topLeft, rectangle.bottomRight
);

console.log(result);
