let assert = require('assert'),
  lib = require('../index'),
  Intersection = lib.Intersection,
  Point2D = lib.Point2D

describe('Intersections', () => {
  describe('Line-Line Intersection', () => {
    it('should intersect', () => {
      var a1 = new Point2D(10, 10)
      var a2 = new Point2D(110, 110)
      var b1 = new Point2D(110, 10)
      var b2 = new Point2D(10, 110)
      var result = Intersection.intersectLineLine(a1, a2, b1, b2)

      assert.equal('Intersection', result.status)
      assert.equal(1, result.points.length)
      assert.equal(result.points[0].equals(new Point2D(60, 60)), true)
    })
  })
  describe('Plolygon includes polyline', () => {
    it("should return result.status = 'Inside'", () => {
      var polygon = [new Point2D(0, 0), new Point2D(100, 0), new Point2D(100, 100), new Point2D(0, 100)]
      var polyline = [new Point2D(10, 10), new Point2D(35, 20), new Point2D(45, 55)]
      var result = Intersection.intersectPolygonPolyline(polygon, polyline)

      assert.equal('Inside', result.status)
      assert.equal(0, result.points.length)
    })
  })
  describe('Plolygon includes line', () => {
    it("should return result.status = 'Inside'", () => {
      var polygon = [new Point2D(0, 0), new Point2D(100, 0), new Point2D(100, 100), new Point2D(0, 100)]
      var result = Intersection.intersectLinePolygon(new Point2D(10, 10), new Point2D(45, 55), polygon)

      assert.equal('Inside', result.status)
      assert.equal(0, result.points.length)
    })
  })
})
