var Intersection = require('../lib/Intersection'),
    IntersectionParams = require('../lib/IntersectionParams'),
    Point2D = require('kld-affine').Point2D;

exports.lineLineIntersection = function(beforeExit, assert) {
    var a1 = new Point2D(10, 10);
    var a2 = new Point2D(110, 110);
    var b1 = new Point2D(110, 10);
    var b2 = new Point2D(10, 110);
    var result = Intersection.intersectLineLine(a1, a2, b1, b2);

    assert.equal(1, result.points.length);
    assert.equal(result.points[0].equals(new Point2D(60, 60)), true);
};

exports.testItersectShapes = function(beforeExit, assert) {
  var line1 = IntersectionParams.newLine(new Point2D(10, 10), new Point2D(110, 110));
  var line2 = IntersectionParams.newLine(new Point2D(110, 10), new Point2D(10, 110));
  var result = Intersection.intersectShapes(line1, line2);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(60, 60)), true);
};

exports.testIntersectRectLine = function(beforeExit, assert) {
  var line = IntersectionParams.newLine(new Point2D(10, 10), new Point2D(110, 110));
  var rect = IntersectionParams.newRect(20, 10, 300, 200);
  var result = Intersection.intersectShapes(rect, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(20, 20)), true);
};

exports.testIntersectRoundRectLine = function(beforeExit, assert) {
  var line = IntersectionParams.newLine(new Point2D(10, 10), new Point2D(110, 110));
  var rect = IntersectionParams.newRoundRect(20, 20, 300, 200, 10, 10);
  var result = Intersection.intersectShapes(rect, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(22.928932188134524, 22.928932188134524)), true);
};
