import {Intersection, Shapes} from "../index.js";

const circle = Shapes.circle(0, 0, 50);
const rectangle = Shapes.rectangle(0, 0, 60, 30);
const result = Intersection.intersect(circle, rectangle);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <circle cx="0" cy="0" r="50" stroke="blue" fill="none"/>
    <rect x="0" y="0" width="60" height="30" fill="none" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
