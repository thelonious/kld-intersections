# Shape Info

- [Arc](#arc)
    - [Arc Examples](#arc-examples)
- [Quadratic Bezier](#quadratic-bezier)
    - [Quadratic Bezier Examples](#quadratic-bezier-examples)
- [Cubic Bezier](#cubic-bezier)
    - [Cubic Bezier Examples](#cubic-bezier-examples)
- [Circle](#circle)
    - [Circle Examples](#circle-examples)
- [Ellipse](#ellipse)
    - [Ellipse Examples](#ellipse-examples)
- [Line](#line)
    - [Line Examples](#line-examples)
- [Path](#path)
    - [Path Examples](#path-examples)
- [Polygon](#polygon)
    - [Polygon Examples](#polygon-examples)
- [Polyline](#polyline)
    - [Polyline Examples](#polyline-examples)
- [Rectangle](#rectangle)
    - [Rectangle Examples](#rectangle-examples)

---

This document describes how to use the ShapeInfo class to describe shapes for intersection. This class is built up of the following shape creation methods:

- ShapeInfo.arc(**...**)
- ShapeInfo.quadraticBezier(**...**)
- ShapeInfo.cubicBezier(**...**)
- ShapeInfo.circle(**...**)
- ShapeInfo.ellipse(**...**)
- ShapeInfo.line(**...**)
- ShapeInfo.path(**...**)
- ShapeInfo.polygon(**...**)
- ShapeInfo.polyline(**...**)
- ShapeInfo.rectangle(**...**)

In place of **...**, you can pass in one of the following:

- An object describing the shape
- An array describing the shape
- A list of arguments, describing the shape. This is the same as the array format; however, the array's elements are spread into the method call.

Each section below gives a description of the various formats that may be used to describe a given shape type.

# Arc

An arc is defined by:

- A center point
- An x radius and a y radius
- A start angle
- An end angle

## A Center Point

The center may be represented four ways:

- A `center` property that is an object with `x` and `y` number properties
- A `center` property that is an array with two number elements, `x` being the first element and `y` being the second element
- A `cx` number property and a `cy` number property
- A `centerX` number property and a `centerY` number property

### Center Examples

```javascript
const centers = [
    {center: new Point2D(10, 20)},
    {center: {x: 10, y: 20}},
    {center: [10, 20]},
    {cx: 10, cy: 20},
    {centerX: 10, centerY: 20}
];
```

## An X Radius and a Y Radius

The radii may be represented four ways:

- A `radii` property that is an object with `x` and `y` number properties
- A `radii` property that is an array with two number elements, `rx` being the first element and `ry` being the second element
- An `rx` number property and an `ry` number property
- A `radiusX` number property and a `radiusY` number property

### X and Y Radii Examples

```javascript
const radii = [
    {radii: {x: 5, y: 10}},
    {radii: [5, 10]},
    {rx: 5, ry: 10},
    {radiusX: 5, radiusY: 10}
];
```

## A start angle

The starting angle is a `startAngle` number property. This value is measured in radians.

## An end angle

The ending angle is a `endAngle` number property. This value is measured in radians.

## Array input

The above discussed how an object may be used to describe an Arc. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are two supported formats:

- A 6 element array defined as follows:
    - a number element being `centerX`
    - a number element being `centerY`
    - a number element being `radiusX`
    - a number element being `radiusY`
    - a number element being `startRadians`
    - a number element being `endRadians`
- A 5 element array defined as follows:
    - an object with `x` and `y` number properties being the `center`
    - a number element being `radiusX`
    - a number element being `radiusY`
    - a number element being `startRadians`
    - a number element being `endRadians`

## Arc Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const arcs = [
    ShapeInfo.arc({center: {x: 10, y: 20}, radii: {x: 5, y: 10}, startAngle: 0, endAngle: Math.PI}),
    ShapeInfo.arc({center: [10, 20], radii: [5, 10], startAngle: 0, endAngle: Math.PI}),
    ShapeInfo.arc({cx: 10, cy: 20, rx: 5, ry: 10, startAngle: 0, endAngle: Math.PI}),
    ShapeInfo.arc({centerX: 10, centerY: 20, radiusX: 5, radiusY: 10, startAngle: 0, endAngle: Math.PI}),
    ShapeInfo.arc([10, 20, 5, 10, 0, Math.PI]),
    ShapeInfo.arc([{x: 10, y: 20}, 5, 10, 0, Math.PI]),
    ShapeInfo.arc(10, 20, 5, 10, 0, Math.PI),
    ShapeInfo.arc({x: 10, y: 20}, 5, 10, 0, Math.PI)
];
```

# Quadratic Bezier

A quadratic bezier is defined by:

- 3 control points: p1, p2, and p3

## Control Points

A control point may be represented two ways:

- An object with `x` and `y` number properties
- An array with two number elements, `x` being the first element and `y` being the second element

### Control Point Examples

```javascript
const points = [
    {p1: new Point2D(10, 20)},
    {p2: {x: 10, y: 20}},
    {p3: [10, 20]}
];
```

## Array input

The above discussed how an object may be used to describe a Quadratic Bezier. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are two supported formats:

- A 6 element array defined as follows:
    - a number element being `p1.x`
    - a number element being `p1.y`
    - a number element being `p2.x`
    - a number element being `p2.y`
    - a number element being `p3.x`
    - a number element being `p3.y`
- A 3 element array defined as follows:
    - an object with `x` and `y` number properties being `p1`
    - an object with `x` and `y` number properties being `p2`
    - an object with `x` and `y` number properties being `p3`

## Quadratic Bezier Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const beziers = [
    ShapeInfo.quadraticBezier({p1: {x: 10, y: 20}, p2: {x: 5, y: 10}, p3: {x: 15, y: 30}}),
    ShapeInfo.quadraticBezier({p1: [10, 20], p2: [5, 10], p3: [15, 30]}),
    ShapeInfo.quadraticBezier([10, 20, 5, 10, 15, 30]),
    ShapeInfo.quadraticBezier([{x: 10, y: 20}, {x: 5, y: 10}, {x: 15, y: 30}]),
    ShapeInfo.quadraticBezier(10, 20, 5, 10, 15, 30),
    ShapeInfo.quadraticBezier({x: 10, y: 20}, {x: 5, y: 10}, {x: 15, y: 30})
];
```

# Cubic Bezier

A cubic bezier is defined by:

- 4 control points: p1, p2, p3, and p4

## Control Points

A control point may be represented two ways:

- An object with `x` and `y` number properties
- An array with two number elements, `x` being the first element and `y` being the second element

### Control Point Examples

```javascript
const points = [
    {p1: new Point2D(10, 20)},
    {p2: {x: 10, y: 20}},
    {p3: [10, 20]}
];
```

## Array input

The above discussed how an object may be used to describe a Quadratic Bezier. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are two supported formats:

- A 8 element array defined as follows:
    - a number element being `p1.x`
    - a number element being `p1.y`
    - a number element being `p2.x`
    - a number element being `p2.y`
    - a number element being `p3.x`
    - a number element being `p3.y`
    - a number element being `p4.x`
    - a number element being `p4.y`
- A 4 element array defined as follows:
    - an object with `x` and `y` number properties being `p1`
    - an object with `x` and `y` number properties being `p2`
    - an object with `x` and `y` number properties being `p3`
    - an object with `x` and `y` number properties being `p4`

## Cubic Bezier Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const beziers = [
    ShapeInfo.cubicBezier({p1: {x: 10, y: 20}, p2: {x: 5, y: 10}, p3: {x: 15, y: 30}, p4: {x: 20, y: 15}}),
    ShapeInfo.cubicBezier({p1: [10, 20], p2: [5, 10], p3: [15, 30], p4: [20, 15]}),
    ShapeInfo.cubicBezier([10, 20, 5, 10, 15, 30, 20, 15]),
    ShapeInfo.cubicBezier([{x: 10, y: 20}, {x: 5, y: 10}, {x: 15, y: 30}, {x: 20, y: 15}]),
    ShapeInfo.cubicBezier(10, 20, 5, 10, 15, 30, 20, 15),
    ShapeInfo.cubicBezier({x: 10, y: 20}, {x: 5, y: 10}, {x: 15, y: 30}, {x: 20, y: 15})
];
```

# Circle

An circle is defined by:

- A center point
- A radius

## A Center Point

The center may be represented four ways:

- A `center` property that is an object with `x` and `y` number properties
- A `center` property that is an array with two number elements, `x` being the first element and `y` being the second element
- A `cx` number property and a `cy` number property
- A `centerX` number property and a `centerY` number property

### Center Examples

```javascript
const centers = [
    {center: new Point2D(10, 20)},
    {center: {x: 10, y: 20}},
    {center: [10, 20]},
    {cx: 10, cy: 20},
    {centerX: 10, centerY: 20}
];
```

## A Radius

The radius may be represented two ways:

- An `r` number property
- A `radius` number

### Radius Examples

```javascript
const radii = [
    {r: 5},
    {radius: 5}
];
```

## Array input

The above discussed how an object may be used to describe an Circle. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are two supported formats:

- A 3 element array defined as follows:
    - a number element being `centerX`
    - a number element being `centerY`
    - a number element being `radius`
- A 2 element array defined as follows:
    - an object with `x` and `y` number properties being the `center`
    - a number element being `radius`

## Circle Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const circles = [
    ShapeInfo.circle({center: {x: 10, y: 20}, radius: 15}),
    ShapeInfo.circle({center: [10, 20], radius: 15}),
    ShapeInfo.circle({cx: 10, cy: 20, r: 15}),
    ShapeInfo.circle({centerX: 10, centerY: 20, radius: 15}),
    ShapeInfo.circle([10, 20, 15]),
    ShapeInfo.circle([{x: 10, y: 20}, 15]),
    ShapeInfo.circle(10, 20, 15),
    ShapeInfo.circle({x: 10, y: 20}, 15)
];
```

# Ellipse

An ellipse is defined by:

- A center point
- An x radius and a y radius

## A Center Point

The center may be represented four ways:

- A `center` property that is an object with `x` and `y` number properties
- A `center` property that is an array with two number elements, `x` being the first element and `y` being the second element
- A `cx` number property and a `cy` number property
- A `centerX` number property and a `centerY` number property

### Center Examples

```javascript
const centers = [
    {center: new Point2D(10, 20)},
    {center: {x: 10, y: 20}},
    {center: [10, 20]},
    {cx: 10, cy: 20},
    {centerX: 10, centerY: 20}
];
```

## An X Radius and a Y Radius

The radii may be represented four ways:

- A `radii` property that is an object with `x` and `y` number properties
- A `radii` property that is an array with two number elements, `rx` being the first element and `ry` being the second element
- An `rx` number property and an `ry` number property
- A `radiusX` number property and a `radiusY` number property

### X and Y Radii Examples

```javascript
const radii = [
    {radii: {x: 5, y: 10}},
    {radii: [5, 10]},
    {rx: 5, ry: 10},
    {radiusX: 5, radiusY: 10}
];
```

## Array input

The above discussed how an object may be used to describe an Ellipse. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are two supported formats:

- A 4 element array defined as follows:
    - a number element being `centerX`
    - a number element being `centerY`
    - a number element being `radiusX`
    - a number element being `radiusY`
- A 3 element array defined as follows:
    - an object with `x` and `y` number properties being the `center`
    - a number element being `radiusX`
    - a number element being `radiusY`

## Ellipse Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const ellipses = [
    ShapeInfo.ellipse({center: {x: 10, y: 20}, radii: {x: 5, y: 10}}),
    ShapeInfo.ellipse({center: [10, 20], radii: [5, 10]}),
    ShapeInfo.ellipse({cx: 10, cy: 20, rx: 5, ry: 10}),
    ShapeInfo.ellipse({centerX: 10, centerY: 20, radiusX: 5, radiusY: 10}),
    ShapeInfo.ellipse([10, 20, 3, 5]),
    ShapeInfo.ellipse([{x: 10, y: 20}, 3, 5]),
    ShapeInfo.ellipse(10, 20, 3, 5),
    ShapeInfo.ellipse({x: 10, y: 20}, 3, 5)
];
```

# Line

A line is defined by:

- 2 points: p1 and p2

## Points

A point may be represented two ways:

- An object with `x` and `y` number properties
- An array with two number elements, `x` being the first element and `y` being the second element

### Center Examples

```javascript
const points = [
    {p1: new Point2D(10, 20)},
    {p2: {x: 10, y: 20}},
    {p1: [10, 20]}
];
```

## Array input

The above discussed how an object may be used to describe a Quadratic Bezier. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are two supported formats:

- A 4 element array defined as follows:
    - a number element being `p1.x`
    - a number element being `p1.y`
    - a number element being `p2.x`
    - a number element being `p2.y`
- A 2 element array defined as follows:
    - an object with `x` and `y` number properties being `p1`
    - an object with `x` and `y` number properties being `p2`

## Line Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const lines = [
    ShapeInfo.line({p1: {x: 10, y: 20}, p2: {x: 5, y: 10}}),
    ShapeInfo.line({p1: [10, 20], p2: [5, 10]}),
    ShapeInfo.line([10, 20, 5, 10]),
    ShapeInfo.line([{x: 10, y: 20}, {x: 5, y: 10}]),
    ShapeInfo.line(10, 20, 5, 10),
    ShapeInfo.line({x: 10, y: 20}, {x: 5, y: 10})
];
```

# Path

A path is defined by:

- Path data

## Path Data

Path data is a string following the path syntax as defined by the [SVG Specification](https://www.w3.org/TR/SVG2/paths.html#PathData).

## Path Examples

```javascript
const paths = [
    ShapeInfo.path("M0,0 L100,100")
];
```

# Polygon

A polygon is defined by

- An array of zero or points

## Points

A point may be represented two ways:

- An object with `x` and `y` number properties
- An array with two number elements, `x` being the first element and `y` being the second element

Each of these representations is concatenated into a single array.

## Polygon Examples

```javascript
const polygons = [
    ShapeInfo.polygon([10, 20, 30, 40, 50, 60]),
    ShapeInfo.polygon([{x: 10, y: 20}, {x: 30, y: 40}, {x: 50, y: 60}])
];
```

# Polyline

A polyline is defined by

- An array of zero or points

## Points

A point may be represented two ways:

- An object with `x` and `y` number properties
- An array with two number elements, `x` being the first element and `y` being the second element

Each of these representations is concatenated into a single array.

## Polyline Examples

```javascript
const polylines = [
    ShapeInfo.polyline([10, 20, 30, 40, 50, 60]),
    ShapeInfo.polyline([{x: 10, y: 20}, {x: 30, y: 40}, {x: 50, y: 60}])
];
```

# Rectangle

A rectangle is defined by:

- A topLeft point
- A bottomRight point
- Optional x and y radii

## Points and Vectors

A point and a vector may be represented two ways:

- An object with `x` and `y` number properties
- An array with two number elements, `x` being the first element and `y` being the second element

## TopLeft Point

The `topLeft` point may be represented four ways:

- An object with a `topLeft` property that is a point as an object
- An object with a `topLeft` property that is a point as an array
- An object with a `x` number property and a `y` number property
- An object with a `top` number property and a `left` number property

## BottomRight Point

The `bottomRight` point may be represented six ways:

- An object with a `bottomRight` property that is a point as an object
- An object with a `bottomRight` property that is a point as an array
- An object with a `w` number property and a `h` number property
- An object with a `width` number property and a `height` number property
- An object with a `size` property that is a vector as an object
- An object with a `size` property that is a vector as an array

### Point Examples

```javascript
const points = [
    {topLeft: {x: 10, y: 20}, bottomRight: {x: 30, y: 40}},
    {topLeft: [10, 20], bottomRight: [30, 40]},
    {x: 10, y: 20, w: 20, h: 20},
    {top: 20, left: 10, width: 20, height: 20},
    {topLeft: {x: 10, y: 20}, size: {x: 20, y: 20}},
    {topLeft: [10, 20], size: [20, 20]}
];
```

## An X Radius

The x radius may be represented two ways:

- An `rx` number property 
- A `radiusX` number property

## A Y Radius

- An `ry` number property 
- A `radiusY` number property

## Array input

The above discussed how an object may be used to describe a Quadratic Bezier. For backward compatibility with older shapes APIs, it is also possible to pass an array or a list of arguments.

There are five supported formats:

- A 4 element array defined as follows:
    - a number element being `x`
    - a number element being `y`
    - a number element being `width`
    - a number element being `height`
- A 6 element array defined as follows:
    - a number element being `x`
    - a number element being `y`
    - a number element being `width`
    - a number element being `height`
    - a number element being `rx`
    - a number element being `ry`
- A 2 element array defined as follows:
    - an object with `x` and `y` number properties being `topLeft`
    - an object with `x` and `y` number properties being `size` (width, height)
- A 3 element array defined as follows:
    - an object with `x` and `y` number properties being `topLeft`
    - an object with `x` and `y` number properties being `size` (width, height)
    - an object with `rx` and `ry` number properties being `radii`
- A 3 element array defined as follows:
    - an object with `x` and `y` number properties being `topLeft`
    - an object with `x` and `y` number properties being `size` (width, height)
    - an object with `radiusX` and `radiusY` number properties being `radii`

## Rectangle Examples

Note that these examples are not exhaustive. You may combine the above descriptions in any way you wish.

```javascript
const rectangles = [
    ShapeInfo.rectangle({topLeft: {x: 10, y: 20}, bottomRight: {x: 5, y: 10}}),
    ShapeInfo.rectangle({topLeft: {x: 10, y: 20}, bottomRight: {x: 5, y: 10}, radiusX: 10, radiusY: 15}),
    ShapeInfo.rectangle({topLeft: [10, 20], bottomRight: [5, 10]}),
    ShapeInfo.rectangle({topLeft: [10, 20], bottomRight: [5, 10], radiusX: 10, radiusY: 15}),
    ShapeInfo.rectangle({top: 20, left: 10, width: 5, height: 10}),
    ShapeInfo.rectangle({x: 10, y: 20, w: 5, h: 10, rx: 10, ry: 15}),
    ShapeInfo.rectangle([10, 20, 5, 10, 10, 15]),
    ShapeInfo.rectangle(10, 20, 5, 10, 10, 15)
];
```
