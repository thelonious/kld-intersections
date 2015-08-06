// expose module classes

exports.intersect = require('./intersect');
exports.IntersectionParams = require('./lib/IntersectionParams');
exports.shapeFunctions = require('./lib/functions/shape');
exports.bezierFunctions = require('./lib/functions/bezier');

// expose affine module classes
exports.Point2D = require('kld-affine').Point2D;
