# kld-intersections

- [Installation](#installation)
- [Importing](#importing)
- [Usage](#usage)
- [Queries](#queries)
- [Known Issues](#known-issues)
- [Links and Related Projects](#links-and-related-projects)

---

A library of intersection algorithms covering all permutations for any two of the following SVG shapes:

- Arcs
- Quadratic Bézier
- Cubic Bézier
- Circle
- Ellipse
- Line
- Paths
- Polygon
- Polyline
- Rectangle

# Installation

```
npm install kld-intersections
```

# Importing

The following sections indicate how you can import the code for use in various environments.

## Node

```javascript
const {ShapeInfo, Intersection} = require("kld-intersections");
```

## Browsers

```html
<script src="./node_modules/kld-intersections/dist/index-umd.js"></script>
<script>
  var ShapeInfo = KldIntersections.ShapeInfo;
  var Intersection = KldIntersections.Intersection;
</script>
```

## Modern Browsers (ESM)

```javascript
import {ShapeInfo, Intersection} from "./node_modules/kld-intersections/dist/index-esm.js";
```

## Bundlers

```javascript
import {ShapeInfo, Intersection} from "kld-intersections";
```

## Usage

In order to perform an intersection, you need to create descriptions of each shape to intersect. This is done using ShapeInfo.

Once you have created your ShapeInfos, pass them into `Intersection.intersect` and you will get back an `Intersection` object. Intersection objects contain the intersections, an array of Point2D instances, in their `points` property.

The following example creates a path (from SVG path data) and a line. The two shapes are passed into `Intersection.intersect` and the results are displayed in the console.

```javascript
const {ShapeInfo, Intersection} = require("kld-intersections");

const path = ShapeInfo.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
const line = ShapeInfo.line([15, 75], [355, 140]);
const intersections = Intersection.intersect(path, line);

intersections.points.forEach(console.log);
```

Each of the shape constructors in ShapeInfo supports a wide variety of formats. Be sure to look at the examples in the ![ShapeInfo](./docs/ShapeInfo.md) docs to get an idea of how you can define shapes.

Note that there are some older APIs that have been deprecated. If you need to work with those APIs or wish to use the Intersection methods directly, you can read about those in [Shapes API](#docs/ShapesApi.md).

# Queries

In the original intersection code written for kevlindev.com, there were some functions that allowed one to determine if a point was contained within a given shape. That code has been extracted into a separate class named `IntersectionQuery`. Those methods are currently limited to the following list:

* IntersectionQuery.pointInCircle(**point** : Point2D, **center** : Point2D, **radius** : number)
* IntersectionQuery.pointInEllipse(**point** : Point2D, **center** : Point2D, **radiusX** : number, **radiusY** : number)
* IntersectionQuery.pointInPolyline(**point** : Point2D, **points** : Array<Point2D>)
* IntersectionQuery.pointInPolygon(**point** : Point2D, **points** : Array<Point2D>)
* IntersectionQuery.pointInRectangle(**point** : Point2D, **topLeft** : Point2D, **bottomRight** : Point2D)

The first argument is the point you wish to test. The remaining parameters describe the shape to test against. All methods return a boolean value indicating whether or not the given point is contained within the shape.

Note that currently bézier curves are not included in this list. As a workaround, bézier shapes can be approximated using polylines and then tested with `pointInPolyline` or `pointInPolygon`. See [tessellate-cubic-beziers.js](examples/tessellate-cubic-beziers.js) as an example of how you might tesselate bézier curves for this purpose.

# Known Issues

Please note that the bézier-bézier intersections may not be well-behaved. There is work being done to make these more stable, but no eta is available at this time. As a workaround, bézier shapes can be approximated using polylines and then intersected with an appropriate polyline intersection method. See [tessellate-cubic-beziers.js](examples/tessellate-cubic-beziers.js) as an example of how you might do this.

# Links and Related Projects

- [http://www.quazistax.com](http://www.quazistax.com/testIntersection.html)
- [kld-path-parser](https://github.com/thelonious/kld-path-parser)
- [kld-transform-parser](https://github.com/thelonious/kld-transform-parser)
- [kld-affine](https://github.com/thelonious/kld-affine)
- [kld-polynomial](https://github.com/thelonious/kld-polynomial)
- [kld-contours](https://github.com/thelonious/kld-contours)
- [kld-data-transformer](https://github.com/thelonious/kld-data-transformer)
