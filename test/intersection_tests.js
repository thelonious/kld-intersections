var bezier = require('../lib/functions/bezier');

var intersect = require('../index').intersect;
var shape = require('../index').shape;

var Point2D = require('kld-affine/lib/Point2D');

exports.testLineLineIntersection = function(beforeExit, assert) {
    var line1 = shape("line", {x1: 10, y1:10, x2:110, y2:110});
    var line2 = shape("line", {x1: 110, y1:10, x2:10, y2:110});
    var result = intersect(line1, line2);

    assert.equal(1, result.points.length);
    assert.equal(result.points[0].equals(new Point2D(60, 60)), true);
};

exports.testIntersectRectLine = function(beforeExit, assert) {
  var line = shape("line", {x1: 10, y1:10, x2:110, y2:110});
  var rect = shape("rect", {x:20, y:10, width:300, height:200});
  var result = intersect(rect, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(20, 20)), true);
};

exports.testIntersectRoundRectLine = function(beforeExit, assert) {
  var line = shape("line", {x1: 10, y1:10, x2:110, y2:110});
  var rect = shape("rect", {x:20, y:20, width:300, height:200, rx:10, ry:10});
  var result = intersect(rect, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(22.928932188134524, 22.928932188134524)), true);
};

exports.testIntersectDiamondLine = function(beforeExit, assert) {
  var diamond = shape("path", {d: "M -4.5,16 L 16,-4.5 L 35.5,16 L 16,35.5z"});
  var line = shape("line", {x1: 0, y1:0, x2:20, y2:20});
  var result = intersect(diamond, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(5.75, 5.75)), true);
}

exports.testIntersectSmallArcLine = function(beforeExit, assert) {
  var arc = shape("path", {d: "M0 20 A 20 20, 0, 0, 0, 20 0"}); // Quarter circle around origin
  var line = shape("line", {x1: 0, y1:0, x2:20, y2:20}); // Diagonal right-down
  var result = intersect(arc, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].distanceFrom(new Point2D(0, 0)), 20);
  assert.equal(result.points[0].x, result.points[0].y);
}

exports.testNoIntersectSmallArcLine = function(beforeExit, assert) {
  var arc = shape("path", {d: "M0 20 A 20 20, 0, 0, 0, 20 0"}); // Quarter circle around origin
  var line = shape("line", {x1: 0, y1:0, x2:20, y2:-20}); // Diagonal right-up
  var result = intersect(arc, line);

  assert.equal(0, result.points.length);
}

exports.testIntersectLargeArcLine = function(beforeExit, assert) {
  var arc = shape("path", {d: "M0 20 A 20 20, 0, 1, 0, 20 0"}); // Three-quarter circle around 20,20
  var line = shape("line", {x1: 0, y1:0, x2:40, y2:40}); // Diagonal right-down
  var result = intersect(arc, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].distanceFrom(new Point2D(20, 20)), 20);
  assert.equal(result.points[0].x, result.points[0].y);
}

exports.testNoIntersectLargeArcLine = function(beforeExit, assert) {
  var arc = shape("path", {d: "M0 20 A 20 20, 0, 1, 0, 20 0"}); // Three-quarter circle around 20,20
  var line = shape("line", {x1: 0, y1:0, x2:20, y2:20}); // Diagonal right-down
  var result = intersect(arc, line);

  assert.equal(0, result.points.length);
}

exports.testIntersectCircleCircle = function(beforeExit, assert) {
  var circle1 = shape("circle", {cx:0, cy:0, r:1});
  var circle2 = shape("circle", {cx:1, cy:1, r:1});
  var result = intersect(circle1, circle2);

  assert.equal(2, result.points.length);
  assert.equal(result.points[0].x, 1);
  assert.equal(result.points[0].y, 0);
  assert.equal(result.points[1].x, 0);
  assert.equal(result.points[1].y, 1);
}

exports.testIntersectArcArc = function(beforeExit, assert) {
  var arc1 = shape("path", {d: "M0 20 A 20 20, 0, 0, 0, 20 0"}); // Quarter circle around origin
  var arc2 = shape("path", {d: "M0 0 A 20 20, 0, 0, 0, 20 20"}); // Quarter circle around 20,0
  var result = intersect(arc1, arc2);

  assert.equal(1, result.points.length);
  assert.ok(Math.abs(result.points[0].x - 10) <= Number.EPSILON * 10);
  assert.ok(Math.abs(result.points[0].y - 17) <= 1);
}
