# SVG Shapes API

The SVG Shapes API allows you to create descriptions of shapes and curves using SVG elements from the DOM. With this API, you can create shape descriptions for the following elements:

- circle
- ellipse
- line
- path
- polygon
- polyline
- rect

When converting path elements, the element's path data will be used to generate shape descriptions, one shape description per path segment. All SVG path commands are supported.

In order to simplify code, `SvgShapes` includes an `element` method. Pass in an SVG element and this method will dispatch to the appropriate conversion method. An exception will be thrown for unsupported SVG element types.

The example below shows how you might convert and intersect two arbitrary SVG elements.

### Example

```javascript
const {SvgShapes, Intersection} = require("kld-intersections");

const shape1 = SvgShapes.element(document.querySelector("#a"));
const shape2 = SvgShapes.element(document.querySelector("#b"));
const result = Intersection.intersect(shape1, shape2);

console.log(result);
```

For more complete examples, have a look at the SVG files in the `visual-test` directory. These cover all combinations of shape intersections.
