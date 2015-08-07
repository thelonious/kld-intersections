svg-intersections
=================

A library of intersection algorithms covering all SVG shape types.  
Possible to intersect rotated/scaled/skewed shapes.


Installation
-------
    npm install svg-intersections


Usage example
-------------

**Example 1:**

![Example image](./images/UsageExample1.png)

```javascript
    
    var svgIntersections = require('svg-intersections');
    var intersect = svgIntersections.intersect;
    var IntersectionParams = svgIntersections.IntersectionParams;

    var intersections = intersect(  
        IntersectionParams.newShape("Circle", { cx: 0, cy: 0, r: 50 }),
        IntersectionParams.newShape("Rect", { x: 0, y: 0, width: 60, height: 30 })  
    );

```


Credits
-------

The implementation is based on the intersection procedures by Kevin Lindsey 
([http://www.kevlindev.com](www.kevlindev.com)) with contributions by 
Robert Benko ([http://www.quazistax.com](www.quazistax.com)).