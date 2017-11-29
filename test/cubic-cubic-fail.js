#!/usr/bin/env node

let lib          = require('../index'),
    Point2D      = lib.Point2D,
    Vector2D     = lib.Vector2D,
    Intersection = lib.Intersection,
    Shapes       = lib.Shapes,
    PathParser   = require('kld-path-parser').PathParser,
    PathHandler  = require('../examples/PathHandler');

// parser path data
let pathData1 = "M150,150 C183.33333333333331,216.66666666666663 233.33333333333337,216.66666666666663 300,150";
let pathData2 = "M100,200 C166.66666666666663,133.33333333333337 233.33333333333337,133.33333333333337 300,200";

let parser = new PathParser();
let handler = new PathHandler();

parser.setHandler(handler);
parser.parseData(pathData1);
let path1 = Shapes.path(handler.shapes);

parser.setHandler(handler);
parser.parseData(pathData2);
let path2 = Shapes.path(handler.shapes);

// intersect
let result = Intersection.intersect(path1, path2);

// build SVG file showing the shapes, the center point, and intersection points
let intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`
}).join("\n    ");

let svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <path d="${pathData1}" stroke="blue" fill="none"/>
    <path d="${pathData2}" stroke="green" fill="none"/>
    ${intersectionSVG}
  </g>
</svg>`

console.log(svg);
