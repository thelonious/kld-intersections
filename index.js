// expose module classes
exports.Intersection = require('./lib/Intersection');
exports.IntersectionArgs = require('./lib/IntersectionArgs');
exports.Shapes = require('./lib/Shapes');
exports.AffineShapes = require('./lib/AffineShapes');
exports.IntersectionQuery = require('./lib/IntersectionQuery');

// expose affine module classes
exports.Point2D = require('kld-affine').Point2D;
exports.Vector2D = require('kld-affine').Vector2D;
exports.Matrix2D = require('kld-affine').Matrix2D;
