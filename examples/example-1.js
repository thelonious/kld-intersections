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

// build SVG file showing the shapes, the center point, and intersection points
let intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`
}).join("\n    ");

let svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <circle cx="${circle.center.x}" cy="${circle.center.y}" r="${circle.radius}" stroke="blue" fill="none"/>
    <rect x="${rectangle.topLeft.x}" y="${rectangle.topLeft.y}" width="${rectangle.bottomRight.x - rectangle.topLeft.x}" height="${rectangle.bottomRight.y - rectangle.topLeft.y}" fill="none" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`

console.log(svg);
