# kld-intersections

A library of intersection algorithms covering all permutations of the following SVG shapes:

- Quadratic Bézier
- Cubic Bézier
- Circle
- Ellipse
- Line
- Polygon
- Polyline
- Rectangle

WARNING: Please note that the bézier-bézier intersections are not well-behaved. There is work being done to make these more stable, but no eta is available at this time. As a workaround, bézier shapes can be approximated using polylines and then intersected with an appropriate polyline intersection method. See [tessellate-cubic-beziers.js](examples/tessellate-cubic-beziers.js) as an example of how you might do this.

## Install

    npm install kld-intersections

## Usage Example

**Example:**

```javascript
let lib = require('kld-intersections'),
    Point2D = lib.Point2D,
    Intersection = lib.Intersection;

let circle = {
    cx: new Point2D(0, 0),
    r: 50,
};

let rectangle = {
    p1: new Point2D(0, 0),
    p2: new Point2D(60, 30)
};

let result = Intersection.intersectCircleRectangle(
    circle.cx, circle.r,
    rectangle.p1, rectangle.p2
);

console.log(result);
```

results:

![Example image 1](./images/usage-example-1.png)

```
Intersection {
  status: 'Intersection',
  points: 
   [ Point2D { x: 50, y: 0 },
     Point2D { x: 40.00000000000001, y: 30.000000000000004 } ] }
```

*x* and *y* of second point are not exactly 40 and 30 due to floating point imprecision.

## Links

- A test page can be found at [http://www.quazistax.com](http://www.quazistax.com/testIntersection.html)
