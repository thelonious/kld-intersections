import {CubicBezier2D} from "kld-contours";
import {Intersection, Point2D} from "../index.js";

// create beziers
const b1 = new CubicBezier2D(
    new Point2D(203, 140),
    new Point2D(206, 359),
    new Point2D(245, 6),
    new Point2D(248, 212)
);
const b2 = new CubicBezier2D(
    new Point2D(177, 204),
    new Point2D(441, 204),
    new Point2D(8, 149),
    new Point2D(265, 154)
);

// create polylines
const p1 = b1.toPolygon2D();
const p2 = b2.toPolygon2D();

// find intersections
const result = Intersection.intersectPolylinePolyline(p1.points, p2.points);

// build SVG file showing beziers, polylines, and intersection points
const intersectionSVG = result.points.map(p => {
    return `<circle cx="${p.x.toFixed(3)}" cy="${p.y.toFixed(3)}" r="2" stroke="red" fill="none"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(150,150) scale(2) translate(-150,-150)">
    <path d="${b1.toString()}" fill="none" stroke="blue" stroke-width="3"/>
    <path d="${b2.toString()}" fill="none" stroke="green" stroke-width="3"/>
    <polyline points="${p1.toString()}" fill="none" stroke="white"/>
    <polyline points="${p2.toString()}" fill="none" stroke="white"/>
    ${intersectionSVG}
  </g>
</svg>`;

console.log(svg);
