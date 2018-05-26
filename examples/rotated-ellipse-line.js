#!/usr/bin/env node

const lib = require('../index');
const AffineShapes = lib.AffineShapes;
const Intersection = lib.Intersection;
const Point2D = lib.Point2D;
const Vector2D = lib.Vector2D;
const Matrix2D = lib.Matrix2D;

// define line
const line = {
    p1: new Point2D(40, 5),
    p2: new Point2D(70, 150)
};

// define ellipse
const ellipse = {
    center: new Point2D(110, 60),
    radiusX: 100,
    radiusY: 50,
    angle: 10
};

// define rotation in radians
const angle = ellipse.angle * Math.PI / 180.0;

// create matrix for rotating around center of rectangle
const rotation = Matrix2D.rotation(-angle);

const rotated_line = {
    p1: line.p1.transform(rotation),
    p2: line.p2.transform(rotation)
};

// find intersections
const result = Intersection.intersectEllipseLine(ellipse.center, ellipse.radiusX, ellipse.radiusY, rotated_line.p1, rotated_line.p2);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10,10)">
    <g transform="rotate(${ellipse.angle})">
        <g transform="translate(${ellipse.center.x}, ${ellipse.center.y})">
            <ellipse rx="${ellipse.radiusX}" ry="${ellipse.radiusY}" stroke="blue" fill="none"/>
            <circle r="2" stroke="blue" fill="none"/>
        </g>
        ${intersectionSVG}
    </g>
    <line x1="${line.p1.x}" y1="${line.p1.y}" x2="${line.p2.x}" y2="${line.p2.y}" stroke="green"/>
  </g>
</svg>`

console.log(svg);
