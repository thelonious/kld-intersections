#!/usr/bin/env node -r esm

import {ShapeInfo, Intersection} from "../index.js";

// create geometry
const path = "M80,80 a20,20 0 0,0 0,40 h50 a20,20 0 0,0 0,-40 a10,10 0 0,0 -15,-10 a15,15 0 0,0 -35,10z"
const line = [-105, -45, 245, 230]
const [x1, y1, x2, y2] = line

// create shapes
const shape1 = ShapeInfo.path(path);
const shape2 = ShapeInfo.line(line)

// intersect
const result = Intersection.intersect(shape1, shape2);

// build SVG file showing the shapes and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <path d="${path}" stroke="blue" fill="none"/>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="green" fill="none"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
