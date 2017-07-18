#!/usr/bin/env node

let lib = require('../index'),
    Intersection = lib.Intersection,
    Point2D = lib.Point2D
    Matrix2D = lib.Matrix2D;

// define line
let line = {
    p1: new Point2D(40, 0),
    p2: new Point2D(70, 130)
};

// define rectangle
let rect = {
    x: 10,
    y: 10,
    width: 100,
    height: 100
};

// convert rectangle corners to polygon (list of points)
let poly = [
    new Point2D(rect.x,              rect.y),
    new Point2D(rect.x + rect.width, rect.y),
    new Point2D(rect.x + rect.width, rect.y + rect.height),
    new Point2D(rect.x,              rect.y + rect.height)
];

// find center point of rectangle
let center = new Point2D(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5);

// define rotation in radians
let angle = 45.0 * Math.PI / 180.0;

// create matrix for rotating around center of rectangle
let matrix = new Matrix2D();
let rotation = matrix
    .translate(center.x, center.y)
    .rotate(angle)
    .translate(-center.x, -center.y);

// create new rotated polygon
rotatedPoly = poly.map(p => p.transform(rotation));

// find intersections
let result = Intersection.intersectLinePolygon(line.p1, line.p2, rotatedPoly);

let intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x}" cy="${p.y}" r="2" stroke="red" fill="none"/>`
}).join("\n    ");

let svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(50,50)">
    <polygon points="${rotatedPoly.map(p => p.x.toFixed(3) + "," + p.y.toFixed(3)).join(" ")}" fill="none" stroke="blue"/>
    <line x1="${line.p1.x}" y1="${line.p1.y}" x2="${line.p2.x}" y2="${line.p2.y}" stroke="green"/>
    <circle cx="${center.x}" cy="${center.y}" r="2" stroke="blue" fill="none"/>
    ${intersectionSVG}
  </g>
</svg>`

console.log(svg);
