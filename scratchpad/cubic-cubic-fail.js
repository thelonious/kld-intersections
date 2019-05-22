#!/usr/bin/env node -r esm

import {Shapes, Intersection} from "../index.js";

// define path data
const pathData1 = "M150,150 C183.33333333333331,216.66666666666663 233.33333333333337,216.66666666666663 300,150";
const pathData2 = "M100,200 C166.66666666666663,133.33333333333337 233.33333333333337,133.33333333333337 300,200";

// create pathS
const path1 = Shapes.path(pathData1);
const path2 = Shapes.path(pathData2);

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
