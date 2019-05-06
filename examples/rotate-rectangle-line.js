import {Intersection, Point2D, Matrix2D} from "../index.js";

// define line
const line = {
    p1: new Point2D(40, 0),
    p2: new Point2D(70, 130)
};

// define rectangle
const rect = {
    topLeft: new Point2D(10, 10),
    bottomRight: new Point2D(110, 110)
};

// convert rectangle corners to polygon (list of points)
const poly = [
    rect.topLeft,
    new Point2D(rect.bottomRight.x, rect.topLeft.y),
    rect.bottomRight,
    new Point2D(rect.topLeft.x, rect.bottomRight.y)
];

// find center point of rectangle
const center = rect.topLeft.lerp(rect.bottomRight, 0.5);

// define rotation in radians
const angle = 45.0 * Math.PI / 180.0;

// create matrix for rotating around center of rectangle
const rotation = Matrix2D.rotationAt(angle, center);

// create new rotated polygon
const rotatedPoly = poly.map(p => p.transform(rotation));

// find intersections
const result = Intersection.intersectLinePolygon(line.p1, line.p2, rotatedPoly);

// build SVG file showing the shapes, the center point, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(50,50)">
    <polygon points="${rotatedPoly.map(p => p.x.toFixed(3) + "," + p.y.toFixed(3)).join(" ")}" fill="none" stroke="blue"/>
    <line x1="${line.p1.x}" y1="${line.p1.y}" x2="${line.p2.x}" y2="${line.p2.y}" stroke="green"/>
    <circle cx="${center.x}" cy="${center.y}" r="2" stroke="blue" fill="none"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
