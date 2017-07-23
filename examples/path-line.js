#!/usr/bin/env node

let lib          = require('../index'),
    Point2D      = lib.Point2D,
    Vector2D     = lib.Vector2D,
    Intersection = lib.Intersection,
    Shapes       = lib.Shapes,
    PathParser   = require('kld-path-parser').PathParser,
    PathHandler  = require('./PathHandler');

// parser path data
let pathData = "M0,0 C100,0 100,100 0,100z m20,0 c100,0 100,100 0,100z";
// let pathData = "M0,0 Q100,50 0,100z m10,0 q100,50 0,100z";
// let pathData = "M0,0 H100 V100 H0z m5,5 h100 v100 h-100z";
let parser = new PathParser();
let handler = new PathHandler();

parser.setHandler(handler);
parser.parseData(pathData);

// create path
// console.error(JSON.stringify(handler.shapes, null, 2));
let path = Shapes.path(handler.shapes);

// create line
let line = Shapes.line(0, -10, 110, 110);

// intersect
let result = Intersection.intersect(path, line);

// build SVG file showing the shapes, the center point, and intersection points
let intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`
}).join("\n    ");

let svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <path d="${pathData}" stroke="blue" fill="none"/>
    <line x1="0" y1="-10" x2="110" y2="110" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`

console.log(svg);
