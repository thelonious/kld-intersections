svg-intersections
=================

A library of intersection algorithms covering all SVG shape types.  
Possible to intersect rotated/scaled/skewed shapes.


Installation
-------
    npm install svg-intersections



API
---

This module exports two functions: 

The `intersect` function takes two shapes as an input an returns an result 
object providing a result status, and all intersection points of the two shapes.

```intersect (shape1, shape2)```


The `shape` function wraps the necessary input parameters for each of 
the two shapes. It requires the SVG element name of the shape as a string 
and an object of the SVG element's attributes.

```shape (svgElementName, svgAttributes)```


Usage example
-------------

**Example 1:**

![Example image](./images/UsageExample1.png)

```javascript
    
    var svgIntersections = require('svg-intersections');
    var intersect = svgIntersections.intersect;
    var shape = svgIntersections.shape;

    var intersections = intersect(  
        shape("circle", { cx: 0, cy: 0, r: 50 }),
        shape("rect", { x: 0, y: 0, width: 60, height: 30 })  
    );

```


Credits
-------

The implementation is based on the intersection procedures by Kevin Lindsey 
([http://www.kevlindev.com](www.kevlindev.com)) with contributions by 
Robert Benko ([http://www.quazistax.com](www.quazistax.com)).