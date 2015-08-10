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