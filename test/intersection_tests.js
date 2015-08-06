var bezier = require('../lib/functions/bezier');

var intersect = require('../lib/intersect')(bezier);
var IntersectionParams = require('../lib/IntersectionParams');

var Point2D = require('kld-affine/lib/Point2D');

var IPTYPE = IntersectionParams.TYPE;

exports.testLineLineIntersection = function(beforeExit, assert) {
    var line1 = IntersectionParams.newShape(IPTYPE.LINE, {x1: 10, y1:10, x2:110, y2:110});
    var line2 = IntersectionParams.newShape(IPTYPE.LINE, {x1: 110, y1:10, x2:10, y2:110});
    var result = intersect(line1, line2);

    assert.equal(1, result.points.length);
    assert.equal(result.points[0].equals(new Point2D(60, 60)), true);
};



exports.testIntersectRectLine = function(beforeExit, assert) {
  var line = IntersectionParams.newShape(IPTYPE.LINE, {x1: 10, y1:10, x2:110, y2:110});
  var rect = IntersectionParams.newShape(IPTYPE.RECT, {x:20, y:10, width:300, height:200});
  var result = intersect(rect, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(20, 20)), true);
};

exports.testIntersectRoundRectLine = function(beforeExit, assert) {
  var line = IntersectionParams.newShape(IPTYPE.LINE, {x1: 10, y1:10, x2:110, y2:110});
  var rect = IntersectionParams.newShape(IPTYPE.RECT, {x:20, y:10, width:300, height:200, rx:10, ry:10});
  var result = intersect(rect, line);

  assert.equal(1, result.points.length);
  assert.equal(result.points[0].equals(new Point2D(22.928932188134524, 22.928932188134524)), true);
};
