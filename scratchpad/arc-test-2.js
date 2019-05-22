#!/usr/bin/env node -r esm

import {Shapes, Intersection} from "../index.js";

const pathData = "M100,50 A50 50 0 0 1 0,50";
const path = Shapes.path(pathData);

const x1 = 0;
const y1 = 100;
const x2 = 100;
const y2 = 0;
const line = Shapes.line(x1, y1, x2, y2);

// intersect
const result = Intersection.intersect(path, line);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(25,25)">
    <path d="${pathData}" stroke="blue" fill="none"/>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
