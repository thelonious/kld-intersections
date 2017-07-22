#!/usr/bin/env node

let lib          = require('../index'),
    Point2D      = lib.Point2D,
    Vector2D     = lib.Vector2D,
    Intersection = lib.Intersection,
    AffineShapes = lib.AffineShapes;


let circle    = AffineShapes.circle(new Point2D(0, 0), 50);
let rectangle = AffineShapes.rectangle(new Point2D(0, 0), new Vector2D(60, 30));
let result    = Intersection.intersect(circle, rectangle);

// build SVG file showing the shapes, the center point, and intersection points
let intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`
}).join("\n    ");

let svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <circle cx="0" cy="0" r="50" stroke="blue" fill="none"/>
    <rect x="0" y="0" width="60" height="30" fill="none" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`

console.log(svg);
