# kld-intersections

- [Goals](#goals)
- [Install](#install)
- [Usage](#usage)
- [Example](#usage-example)
- [Known Issues](#known-issues)
- [Links](#links)

---

A library of intersection algorithms covering all permutations of the following SVG shapes:

- Quadratic Bézier
- Cubic Bézier
- Circle
- Ellipse
- Line
- Polygon
- Polyline
- Rectangle

## Goals

- Cover intersections for all types of curves and shapes in SVG
- Minimize external dependencies
- Make it easier to port to other languages
- Assume this is a low-level API upon which other simpler and richer APIs will be built
- Be a potential educational resource by demonstrating each intersection type independently, without relying on the results of other intersection types

## Install

    npm install kld-intersections

## Usage

In order to determine which intersection routine to invoke, you will need to determine two bits of information for each curve involved in the intersection:

1. The name the library uses to refer to the given curve type
2. The arguments, their order and their types, used to represent the curve parameters to the library

Below is a table listing each of the supported curve types. The `Name` column is the name you will need to use to refer to the shape of the given type. `Arguments` lists the parameters you will use to describe the shape of the given curve.

| Shape            | Name      | Arguments                                                                    |
| ---              | ---       | ---                                                                          |
| Quadratic Bézier | Bezier2   | **c1** : *Point2D*, **c2** : *Point2D*, **c3**: *Point2D*                    |
| Cubic Bézier     | Bezier3   | **c1** : *Point2D*, **c2** : *Point2D*, **c3**: *Point2D*, **c4**: *Point2D* |
| Circle           | Circle    | **center** : *Point2D*, **radius** : Number                                  |
| Ellipse          | Ellipse   | **center** : *Point2D*, **radiusX** : Number, **radiusY** : Number           |
| Line             | Line      | **p1** : *Point2D*, **p2** : *Point2D*                                       |
| Polygon          | Polygon   | **points** : *Array< Point2D >*                                                |
| Polyline         | Polyline  | **points** : *Array< Point2D >*                                                |
| Rectangle        | Rectangle | **topLeft** : *Point2D*, **bottomRight** : *Point2D*                         |

Once you've determined the names and arguments, you can build the intersection method name like so:

1. All intersections begin with `intersect`
2. Append the `Name` of the first curve type
3. Append the `Name` of the second curve type

It is important to note that not all combinations of names are available in the API. The current implementation supports 8 types of curves. If we count all combinations of any two curves, we end up needing `8 * 8 = 64` methods to cover all cases. And when we add `Arc` and `Path` to our list, we will need `10 * 10 = 100` methods to be written. Fortunately, the order that we specify the curves is not important.

If we intersect `a rectangle with a circle` or `a circle with a rectangle`, we will get the same results, regardless of their order. Recognizing this allows us to reduce the number of methods to `8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36`. Due to this reduction, one more restriction applies when determining the intersection method name:

> Shape names must be appended to the method name in alphabetical order

In our earlier example of intersecting a `Rectangle` and a `Circle`, we will need to list `Circle` before `Rectangle` giving us `intersectCircleRectangle` and not `intersectRectangleCircle`.

Now that you know the method name, you need to pass in arguments to describe the shape of each curve. You do that as below:

1. Review the `Arguments` list in the table above
2. Add all arguments for the first curve in the specified order to the method call
3. Add all arguments for the second curve in the specified order to the method call

## Example

Lets say that we wish to intersect a `circle` and a `rectangle`. We see that the circle's name is, unsurprisingly, `Circle`, and the name of the rectangle is `Rectangle`. This means our method name is:

```intersectCircleRectangle```

A circle is described with a center point and a radius. Those are our first two arguments. A rectangle is described with two points: the top-left corner and the bottom-right corner. Those are our final arguments. Lets see this in action.

```javascript
let lib = require('kld-intersections'),
    Point2D = lib.Point2D,
    Intersection = lib.Intersection;

let circle = {
    center: new Point2D(0, 0),
    radius: 50,
};

let rectangle = {
    topLeft: new Point2D(0, 0),
    bottomRight: new Point2D(60, 30)
};

let result = Intersection.intersectCircleRectangle(
    circle.center, circle.radius,
    rectangle.topLeft, rectangle.bottomRight
);

console.log(result);
```

### Result

```javascript
Intersection {
  status: 'Intersection',
  points: 
   [ Point2D { x: 50, y: 0 },
     Point2D { x: 40.00000000000001, y: 30.000000000000004 } ] }
```

`x` and `y` in the second point are not exactly 40 and 30 due to floating point imprecision.

### Visual Representation

If we were to plot the results, we would end up with an image like the following.

![Example image 1](./images/usage-example-1.png)

## Known Issues

Please note that the bézier-bézier intersections are not well-behaved. There is work being done to make these more stable, but no eta is available at this time. As a workaround, bézier shapes can be approximated using polylines and then intersected with an appropriate polyline intersection method. See [tessellate-cubic-beziers.js](examples/tessellate-cubic-beziers.js) as an example of how you might do this.

## Links

- A test page can be found at [http://www.quazistax.com](http://www.quazistax.com/testIntersection.html)
