var Intersection = require('../lib/Intersection'),
    Point2D = require('kld-affine').Point2D;

exports.lineLineIntersection = function(beforeExit, assert) {
    var a1 = new Point2D(10, 10);
    var a2 = new Point2D(110, 110);
    var b1 = new Point2D(110, 10);
    var b2 = new Point2D(10, 110);
    var result = Intersection.intersectLineLine(a1, a2, b1, b2);

    assert.equal("Intersection", result.status);
    assert.equal(1, result.points.length);
    assert.equal(result.points[0].equals(new Point2D(60, 60)), true);
};
