#!/usr/bin/env node -r esm

import {Intersection, Shapes, Point2D} from "../index.js";

function toCartesian(centerX, centerY, radiusX, radiusY, angleRadians) {
    return new Point2D(
        centerX + (radiusX * Math.cos(angleRadians)),
        centerY + (radiusY * Math.sin(angleRadians))
    );
}

const centerX = 50;
const centerY = 50;
const radiusX = 50;
const radiusY = 50;
const startRadians = 0;
const endRadians = Math.PI;
const arc = Shapes.arc(centerX, centerY, radiusX, radiusY, startRadians, endRadians);

const x1 = 0;
const y1 = 100;
const x2 = 100;
const y2 = 0;
const line = Shapes.line(x1, y1, x2, y2);

// console.log(arc);
// console.log(line);

const startPoint = toCartesian(centerX, centerY, radiusX, radiusY, startRadians);
const endPoint = toCartesian(centerX, centerY, radiusX, radiusY, endRadians);
const flagA = (endRadians - startRadians) > Math.PI ? 1 : 0;
const flagS = (endRadians - startRadians) > 0 ? 1 : 0;

// intersect
const result = Intersection.intersect(arc, line);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(25,25)">
    <path d="M${startPoint.x},${startPoint.y} A${radiusX} ${radiusY} 0 ${flagA} ${flagS} ${endPoint.x},${endPoint.y}" stroke="blue" fill="none"/>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
