# kld-intersections

A library of intersection algorithms covering all permutations of the following SVG shapes:

- Quadratic Bézier
- Cubic Bézier
- Circle
- Ellipse
- Line
- Polygon
- Rectangle

WARNING: Please note that the bézier intersections are not well-behaved. Unfortunately, over the past decade since I wrote this code, I have not been able to address those issues due to time constraints. I've made this code public in the hopes that someone with better math abilities than me might be able see what those issues are.

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
