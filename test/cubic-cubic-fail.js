"use strict";

const {PathParser} = require("kld-path-parser");
const PathHandler = require("../examples/PathHandler");

const {Intersection, Shapes} = require("../index");

// parser path data
const pathData1 = "M150,150 C183.33333333333331,216.66666666666663 233.33333333333337,216.66666666666663 300,150";
const pathData2 = "M100,200 C166.66666666666663,133.33333333333337 233.33333333333337,133.33333333333337 300,200";

const parser = new PathParser();
const handler = new PathHandler();

parser.setHandler(handler);
parser.parseData(pathData1);
const path1 = Shapes.path(handler.shapes);

parser.setHandler(handler);
parser.parseData(pathData2);
const path2 = Shapes.path(handler.shapes);

// intersect
const result = Intersection.intersect(path1, path2);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <path d="${pathData1}" stroke="blue" fill="none"/>
    <path d="${pathData2}" stroke="green" fill="none"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
