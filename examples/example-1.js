import {Point2D, Intersection} from "../index.js";

const circle = {
    center: new Point2D(0, 0),
    radius: 50
};

const rectangle = {
    topLeft: new Point2D(0, 0),
    bottomRight: new Point2D(60, 30)
};

const result = Intersection.intersectCircleRectangle(
    circle.center, circle.radius,
    rectangle.topLeft, rectangle.bottomRight
);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(75,75)">
    <circle cx="${circle.center.x}" cy="${circle.center.y}" r="${circle.radius}" stroke="blue" fill="none"/>
    <rect x="${rectangle.topLeft.x}" y="${rectangle.topLeft.y}" width="${rectangle.bottomRight.x - rectangle.topLeft.x}" height="${rectangle.bottomRight.y - rectangle.topLeft.y}" fill="none" stroke="green"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
