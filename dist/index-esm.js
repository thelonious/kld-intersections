function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/**
 *  Point2D.js
 *  @module Point2D
 *  @copyright 2001-2019 Kevin Lindsey
 */

/**
 *  Point2D
 *
 *  @memberof module:kld-affine
 */
var Point2D =
/*#__PURE__*/
function () {
  /**
   *  Point2D
   *
   *  @param {number} x
   *  @param {number} y
   *  @returns {module:kld-affine.Point2D}
   */
  function Point2D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Point2D);

    this.x = x;
    this.y = y;
  }
  /**
   *  clone
   *
   *  @returns {module:kld-affine.Point2D}
   */


  _createClass(Point2D, [{
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y);
    }
    /**
     *  add
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "add",
    value: function add(that) {
      return new this.constructor(this.x + that.x, this.y + that.y);
    }
    /**
     *  subtract
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "subtract",
    value: function subtract(that) {
      return new this.constructor(this.x - that.x, this.y - that.y);
    }
    /**
     *  multiply
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "multiply",
    value: function multiply(scalar) {
      return new this.constructor(this.x * scalar, this.y * scalar);
    }
    /**
     *  divide
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "divide",
    value: function divide(scalar) {
      return new this.constructor(this.x / scalar, this.y / scalar);
    }
    /**
     *  equals
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {boolean}
     */

  }, {
    key: "equals",
    value: function equals(that) {
      return this.x === that.x && this.y === that.y;
    }
    /**
     *  precisionEquals
     *
     *  @param {module:kld-affine.Point2D} that
     *  @param {number} precision
     *  @returns {boolean}
     */

  }, {
    key: "precisionEquals",
    value: function precisionEquals(that, precision) {
      return Math.abs(this.x - that.x) < precision && Math.abs(this.y - that.y) < precision;
    } // utility methods

    /**
     *  lerp
     *
     *  @param {module:kld-affine.Point2D} that
     *  @param {number} t
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "lerp",
    value: function lerp(that, t) {
      var omt = 1.0 - t;
      return new this.constructor(this.x * omt + that.x * t, this.y * omt + that.y * t);
    }
    /**
     *  distanceFrom
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {number}
     */

  }, {
    key: "distanceFrom",
    value: function distanceFrom(that) {
      var dx = this.x - that.x;
      var dy = this.y - that.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     *  min
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {number}
     */

  }, {
    key: "min",
    value: function min(that) {
      return new this.constructor(Math.min(this.x, that.x), Math.min(this.y, that.y));
    }
    /**
     *  max
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {number}
     */

  }, {
    key: "max",
    value: function max(that) {
      return new this.constructor(Math.max(this.x, that.x), Math.max(this.y, that.y));
    }
    /**
     *  transform
     *
     *  @param {module:kld-affine.Matrix2D} matrix
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "transform",
    value: function transform(matrix) {
      return new this.constructor(matrix.a * this.x + matrix.c * this.y + matrix.e, matrix.b * this.x + matrix.d * this.y + matrix.f);
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "point(".concat(this.x, ",").concat(this.y, ")");
    }
  }]);

  return Point2D;
}();

/**
 *  Vector2D.js
 *  @module Vector2D
 *  @copyright 2001-2019 Kevin Lindsey
 */

/**
 *  Vector2D
 *
 *  @memberof module:kld-affine
 */
var Vector2D =
/*#__PURE__*/
function () {
  /**
   *  Vector2D
   *
   *  @param {number} x
   *  @param {number} y
   *  @returns {module:kld-affine.Vector2D}
   */
  function Vector2D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector2D);

    this.x = x;
    this.y = y;
  }
  /**
   *  fromPoints
   *
   *  @param {module:kld-affine.Point2D} p1
   *  @param {module:kld-affine.Point2D} p2
   *  @returns {module:kld-affine.Vector2D}
   */


  _createClass(Vector2D, [{
    key: "length",

    /**
     *  length
     *
     *  @returns {number}
     */
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     *  magnitude
     *
     *  @returns {number}
     */

  }, {
    key: "magnitude",
    value: function magnitude() {
      return this.x * this.x + this.y * this.y;
    }
    /**
     *  dot
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "dot",
    value: function dot(that) {
      return this.x * that.x + this.y * that.y;
    }
    /**
     *  cross
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "cross",
    value: function cross(that) {
      return this.x * that.y - this.y * that.x;
    }
    /**
     *  determinant
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "determinant",
    value: function determinant(that) {
      return this.x * that.y - this.y * that.x;
    }
    /**
     *  unit
     *
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "unit",
    value: function unit() {
      return this.divide(this.length());
    }
    /**
     *  add
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "add",
    value: function add(that) {
      return new this.constructor(this.x + that.x, this.y + that.y);
    }
    /**
     *  subtract
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "subtract",
    value: function subtract(that) {
      return new this.constructor(this.x - that.x, this.y - that.y);
    }
    /**
     *  multiply
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "multiply",
    value: function multiply(scalar) {
      return new this.constructor(this.x * scalar, this.y * scalar);
    }
    /**
     *  divide
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "divide",
    value: function divide(scalar) {
      return new this.constructor(this.x / scalar, this.y / scalar);
    }
    /**
     *  angleBetween
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "angleBetween",
    value: function angleBetween(that) {
      var cos = this.dot(that) / (this.length() * that.length());
      cos = Math.max(-1, Math.min(cos, 1));
      var radians = Math.acos(cos);
      return this.cross(that) < 0.0 ? -radians : radians;
    }
    /**
     *  Find a vector is that is perpendicular to this vector
     *
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "perp",
    value: function perp() {
      return new this.constructor(-this.y, this.x);
    }
    /**
     *  Find the component of the specified vector that is perpendicular to
     *  this vector
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "perpendicular",
    value: function perpendicular(that) {
      return this.subtract(this.project(that));
    }
    /**
     *  project
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "project",
    value: function project(that) {
      var percent = this.dot(that) / that.dot(that);
      return that.multiply(percent);
    }
    /**
     *  transform
     *
     *  @param {module:kld-affine.Matrix2D} matrix
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "transform",
    value: function transform(matrix) {
      return new this.constructor(matrix.a * this.x + matrix.c * this.y, matrix.b * this.x + matrix.d * this.y);
    }
    /**
     *  equals
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {boolean}
     */

  }, {
    key: "equals",
    value: function equals(that) {
      return this.x === that.x && this.y === that.y;
    }
    /**
     *  precisionEquals
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @param {number} precision
     *  @returns {boolean}
     */

  }, {
    key: "precisionEquals",
    value: function precisionEquals(that, precision) {
      return Math.abs(this.x - that.x) < precision && Math.abs(this.y - that.y) < precision;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "vector(".concat(this.x, ",").concat(this.y, ")");
    }
  }], [{
    key: "fromPoints",
    value: function fromPoints(p1, p2) {
      return new Vector2D(p2.x - p1.x, p2.y - p1.y);
    }
  }]);

  return Vector2D;
}();

/**
 *  Matrix2D.js
 *  @module Matrix2D
 *  @copyright 2001-2019 Kevin Lindsey
 */

/**
 *  Matrix2D
 *
 *  @memberof module:kld-affine
 */
var Matrix2D =
/*#__PURE__*/
function () {
  /**
   *  A 2D Matrix of the form:<br>
   *  [a c e]<br>
   *  [b d f]<br>
   *  [0 0 1]<br>
   *
   *  @param {number} a
   *  @param {number} b
   *  @param {number} c
   *  @param {number} d
   *  @param {number} e
   *  @param {number} f
   *  @returns {module:kld-affine.Matrix2D}
   */
  function Matrix2D() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var f = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Matrix2D);

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
  /**
   *  translation
   *
   *  @param {number} tx
   *  @param {number} ty
   *  @returns {module:kld-affine.Matrix2D}
   */


  _createClass(Matrix2D, [{
    key: "multiply",

    /**
     *  multiply
     *
     *  @param {module:kld-affine.Matrix2D} that
     *  @returns {module:kld-affine.Matrix2D}
     */
    value: function multiply(that) {
      if (this.isIdentity()) {
        return that;
      }

      if (that.isIdentity()) {
        return this;
      }

      return new this.constructor(this.a * that.a + this.c * that.b, this.b * that.a + this.d * that.b, this.a * that.c + this.c * that.d, this.b * that.c + this.d * that.d, this.a * that.e + this.c * that.f + this.e, this.b * that.e + this.d * that.f + this.f);
    }
    /**
     *  inverse
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "inverse",
    value: function inverse() {
      if (this.isIdentity()) {
        return this;
      }

      var det1 = this.a * this.d - this.b * this.c;

      if (det1 === 0.0) {
        throw new Error("Matrix is not invertible");
      }

      var idet = 1.0 / det1;
      var det2 = this.f * this.c - this.e * this.d;
      var det3 = this.e * this.b - this.f * this.a;
      return new this.constructor(this.d * idet, -this.b * idet, -this.c * idet, this.a * idet, det2 * idet, det3 * idet);
    }
    /**
     *  translate
     *
     *  @param {number} tx
     *  @param {number} ty
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "translate",
    value: function translate(tx, ty) {
      return new this.constructor(this.a, this.b, this.c, this.d, this.a * tx + this.c * ty + this.e, this.b * tx + this.d * ty + this.f);
    }
    /**
     *  scale
     *
     *  @param {number} scale
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scale",
    value: function scale(_scale) {
      return new this.constructor(this.a * _scale, this.b * _scale, this.c * _scale, this.d * _scale, this.e, this.f);
    }
    /**
     *  scaleAt
     *
     *  @param {number} scale
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaleAt",
    value: function scaleAt(scale, center) {
      var dx = center.x - scale * center.x;
      var dy = center.y - scale * center.y;
      return new this.constructor(this.a * scale, this.b * scale, this.c * scale, this.d * scale, this.a * dx + this.c * dy + this.e, this.b * dx + this.d * dy + this.f);
    }
    /**
     *  scaleNonUniform
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaleNonUniform",
    value: function scaleNonUniform(scaleX, scaleY) {
      return new this.constructor(this.a * scaleX, this.b * scaleX, this.c * scaleY, this.d * scaleY, this.e, this.f);
    }
    /**
     *  scaleNonUniformAt
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaleNonUniformAt",
    value: function scaleNonUniformAt(scaleX, scaleY, center) {
      var dx = center.x - scaleX * center.x;
      var dy = center.y - scaleY * center.y;
      return new this.constructor(this.a * scaleX, this.b * scaleX, this.c * scaleY, this.d * scaleY, this.a * dx + this.c * dy + this.e, this.b * dx + this.d * dy + this.f);
    }
    /**
     *  rotate
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotate",
    value: function rotate(radians) {
      var c = Math.cos(radians);
      var s = Math.sin(radians);
      return new this.constructor(this.a * c + this.c * s, this.b * c + this.d * s, this.a * -s + this.c * c, this.b * -s + this.d * c, this.e, this.f);
    }
    /**
     *  rotateAt
     *
     *  @param {number} radians
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotateAt",
    value: function rotateAt(radians, center) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      var cx = center.x;
      var cy = center.y;
      var a = this.a * cos + this.c * sin;
      var b = this.b * cos + this.d * sin;
      var c = this.c * cos - this.a * sin;
      var d = this.d * cos - this.b * sin;
      return new this.constructor(a, b, c, d, (this.a - a) * cx + (this.c - c) * cy + this.e, (this.b - b) * cx + (this.d - d) * cy + this.f);
    }
    /**
     *  rotateFromVector
     *
     *  @param {module:kld-affine.Vector2D} vector
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotateFromVector",
    value: function rotateFromVector(vector) {
      var unit = vector.unit();
      var c = unit.x; // cos

      var s = unit.y; // sin

      return new this.constructor(this.a * c + this.c * s, this.b * c + this.d * s, this.a * -s + this.c * c, this.b * -s + this.d * c, this.e, this.f);
    }
    /**
     *  flipX
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "flipX",
    value: function flipX() {
      return new this.constructor(-this.a, -this.b, this.c, this.d, this.e, this.f);
    }
    /**
     *  flipY
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "flipY",
    value: function flipY() {
      return new this.constructor(this.a, this.b, -this.c, -this.d, this.e, this.f);
    }
    /**
     *  skewX
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "skewX",
    value: function skewX(radians) {
      var t = Math.tan(radians);
      return new this.constructor(this.a, this.b, this.c + this.a * t, this.d + this.b * t, this.e, this.f);
    } // TODO: skewXAt

    /**
     *  skewY
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "skewY",
    value: function skewY(radians) {
      var t = Math.tan(radians);
      return new this.constructor(this.a + this.c * t, this.b + this.d * t, this.c, this.d, this.e, this.f);
    } // TODO: skewYAt

    /**
     *  isIdentity
     *
     *  @returns {boolean}
     */

  }, {
    key: "isIdentity",
    value: function isIdentity() {
      return this.a === 1.0 && this.b === 0.0 && this.c === 0.0 && this.d === 1.0 && this.e === 0.0 && this.f === 0.0;
    }
    /**
     *  isInvertible
     *
     *  @returns {boolean}
     */

  }, {
    key: "isInvertible",
    value: function isInvertible() {
      return this.a * this.d - this.b * this.c !== 0.0;
    }
    /**
     *  getScale
     *
     *  @returns {{ scaleX: number, scaleY: number }}
     */

  }, {
    key: "getScale",
    value: function getScale() {
      return {
        scaleX: Math.sqrt(this.a * this.a + this.c * this.c),
        scaleY: Math.sqrt(this.b * this.b + this.d * this.d)
      };
    }
    /**
     *  Calculates matrix Singular Value Decomposition
     *
     *  The resulting matrices — translation, rotation, scale, and rotation0 — return
     *  this matrix when they are multiplied together in the listed order
     *
     *  @see Jim Blinn's article {@link http://dx.doi.org/10.1109/38.486688}
     *  @see {@link http://math.stackexchange.com/questions/861674/decompose-a-2d-arbitrary-transform-into-only-scaling-and-rotation}
     *
     *  @returns {{
     *    translation: module:kld-affine.Matrix2D,
     *    rotation: module:kld-affine.Matrix2D,
     *    scale: module:kld-affine.Matrix2D,
     *    rotation0: module:kld-affine.Matrix2D
     *  }}
     */

  }, {
    key: "getDecomposition",
    value: function getDecomposition() {
      var E = (this.a + this.d) * 0.5;
      var F = (this.a - this.d) * 0.5;
      var G = (this.b + this.c) * 0.5;
      var H = (this.b - this.c) * 0.5;
      var Q = Math.sqrt(E * E + H * H);
      var R = Math.sqrt(F * F + G * G);
      var scaleX = Q + R;
      var scaleY = Q - R;
      var a1 = Math.atan2(G, F);
      var a2 = Math.atan2(H, E);
      var theta = (a2 - a1) * 0.5;
      var phi = (a2 + a1) * 0.5;
      return {
        translation: this.constructor.translation(this.e, this.f),
        rotation: this.constructor.rotation(phi),
        scale: this.constructor.nonUniformScaling(scaleX, scaleY),
        rotation0: this.constructor.rotation(theta)
      };
    }
    /**
     *  equals
     *
     *  @param {module:kld-affine.Matrix2D} that
     *  @returns {boolean}
     */

  }, {
    key: "equals",
    value: function equals(that) {
      return this.a === that.a && this.b === that.b && this.c === that.c && this.d === that.d && this.e === that.e && this.f === that.f;
    }
    /**
     *  precisionEquals
     *
     *  @param {module:kld-affine.Matrix2D} that
     *  @param {number} precision
     *  @returns {boolean}
     */

  }, {
    key: "precisionEquals",
    value: function precisionEquals(that, precision) {
      return Math.abs(this.a - that.a) < precision && Math.abs(this.b - that.b) < precision && Math.abs(this.c - that.c) < precision && Math.abs(this.d - that.d) < precision && Math.abs(this.e - that.e) < precision && Math.abs(this.f - that.f) < precision;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "matrix(".concat(this.a, ",").concat(this.b, ",").concat(this.c, ",").concat(this.d, ",").concat(this.e, ",").concat(this.f, ")");
    }
  }], [{
    key: "translation",
    value: function translation(tx, ty) {
      return new Matrix2D(1, 0, 0, 1, tx, ty);
    }
    /**
     *  scaling
     *
     *  @param {number} scale
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaling",
    value: function scaling(scale) {
      return new Matrix2D(scale, 0, 0, scale, 0, 0);
    }
    /**
     *  scalingAt
     *
     *  @param {number} scale
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scalingAt",
    value: function scalingAt(scale, center) {
      return new Matrix2D(scale, 0, 0, scale, center.x - center.x * scale, center.y - center.y * scale);
    }
    /**
     *  nonUniformScaling
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "nonUniformScaling",
    value: function nonUniformScaling(scaleX, scaleY) {
      return new Matrix2D(scaleX, 0, 0, scaleY, 0, 0);
    }
    /**
     *  nonUniformScalingAt
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "nonUniformScalingAt",
    value: function nonUniformScalingAt(scaleX, scaleY, center) {
      return new Matrix2D(scaleX, 0, 0, scaleY, center.x - center.x * scaleX, center.y - center.y * scaleY);
    }
    /**
     *  rotation
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotation",
    value: function rotation(radians) {
      var c = Math.cos(radians);
      var s = Math.sin(radians);
      return new Matrix2D(c, s, -s, c, 0, 0);
    }
    /**
     *  rotationAt
     *
     *  @param {number} radians
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotationAt",
    value: function rotationAt(radians, center) {
      var c = Math.cos(radians);
      var s = Math.sin(radians);
      return new Matrix2D(c, s, -s, c, center.x - center.x * c + center.y * s, center.y - center.y * c - center.x * s);
    }
    /**
     *  rotationFromVector
     *
     *  @param {module:kld-affine.Vector2D} vector
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotationFromVector",
    value: function rotationFromVector(vector) {
      var unit = vector.unit();
      var c = unit.x; // cos

      var s = unit.y; // sin

      return new Matrix2D(c, s, -s, c, 0, 0);
    }
    /**
     *  xFlip
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "xFlip",
    value: function xFlip() {
      return new Matrix2D(-1, 0, 0, 1, 0, 0);
    }
    /**
     *  yFlip
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "yFlip",
    value: function yFlip() {
      return new Matrix2D(1, 0, 0, -1, 0, 0);
    }
    /**
     *  xSkew
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "xSkew",
    value: function xSkew(radians) {
      var t = Math.tan(radians);
      return new Matrix2D(1, 0, t, 1, 0, 0);
    }
    /**
     *  ySkew
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "ySkew",
    value: function ySkew(radians) {
      var t = Math.tan(radians);
      return new Matrix2D(1, t, 0, 1, 0, 0);
    }
  }]);

  return Matrix2D;
}();
/**
 *  Identity matrix
 *
 *  @returns {module:kld-affine.Matrix2D}
 */


Matrix2D.IDENTITY = new Matrix2D();

Matrix2D.IDENTITY.isIdentity = function () {
  return true;
};

/**
 *  @module kld-affine
 */

/* eslint-disable camelcase */

/**
 *  Polynomial.js
 *
 *  @module Polynomial
 *  @copyright 2002-2019 Kevin Lindsey<br>
 *  -<br>
 *  Contribution {@link http://github.com/Quazistax/kld-polynomial}<br>
 *  copyright 2015 Robert Benko (Quazistax) <quazistax@gmail.com><br>
 *  MIT license
 */

/**
 *  Sign of a number (+1, -1, +0, -0).
 *
 *  @param {number} x
 *  @returns {number}
 */
function sign(x) {
  // eslint-disable-next-line no-self-compare
  return typeof x === "number" ? x ? x < 0 ? -1 : 1 : x === x ? x : NaN : NaN;
}
/**
 *  Polynomial
 *
 *  @memberof module:kld-polynomial
 */


var Polynomial =
/*#__PURE__*/
function () {
  /**
   *  Polynomial
   *
   *  @param {Array<number>} coefs
   *  @returns {module:kld-polynomial.Polynomial}
   */
  function Polynomial() {
    _classCallCheck(this, Polynomial);

    this.coefs = [];

    for (var i = arguments.length - 1; i >= 0; i--) {
      this.coefs.push(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    }

    this._variable = "t";
    this._s = 0;
  }
  /**
   *  Based on polint in "Numerical Recipes in C, 2nd Edition", pages 109-110
   *
   *  @param {Array<number>} xs
   *  @param {Array<number>} ys
   *  @param {number} n
   *  @param {number} offset
   *  @param {number} x
   *
   *  @returns {{y: number, dy: number}}
   */


  _createClass(Polynomial, [{
    key: "clone",

    /**
     *  Clones this polynomial and return the clone.
     *
     *  @returns {module:kld-polynomial.Polynomial}
     */
    value: function clone() {
      var poly = new Polynomial();
      poly.coefs = this.coefs.slice();
      return poly;
    }
    /**
     *  eval
     *
     *  @param {number} x
     */

  }, {
    key: "eval",
    value: function _eval(x) {
      if (isNaN(x)) {
        throw new TypeError("Parameter must be a number. Found '".concat(x, "'"));
      }

      var result = 0;

      for (var i = this.coefs.length - 1; i >= 0; i--) {
        result = result * x + this.coefs[i];
      }

      return result;
    }
    /**
     *  add
     *
     *  @param {module:kld-polynomial.Polynomial} that
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "add",
    value: function add(that) {
      var result = new Polynomial();
      var d1 = this.getDegree();
      var d2 = that.getDegree();
      var dmax = Math.max(d1, d2);

      for (var i = 0; i <= dmax; i++) {
        var v1 = i <= d1 ? this.coefs[i] : 0;
        var v2 = i <= d2 ? that.coefs[i] : 0;
        result.coefs[i] = v1 + v2;
      }

      return result;
    }
    /**
     *  multiply
     *
     *  @param {module:kld-polynomial.Polynomial} that
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "multiply",
    value: function multiply(that) {
      var result = new Polynomial();

      for (var i = 0; i <= this.getDegree() + that.getDegree(); i++) {
        result.coefs.push(0);
      }

      for (var _i = 0; _i <= this.getDegree(); _i++) {
        for (var j = 0; j <= that.getDegree(); j++) {
          result.coefs[_i + j] += this.coefs[_i] * that.coefs[j];
        }
      }

      return result;
    }
    /**
     *  divideEqualsScalar
     *
     *  @deprecated To be replaced by divideScalar
     *  @param {number} scalar
     */

  }, {
    key: "divideEqualsScalar",
    value: function divideEqualsScalar(scalar) {
      for (var i = 0; i < this.coefs.length; i++) {
        this.coefs[i] /= scalar;
      }
    }
    /**
     *  simplifyEquals
     *
     *  @deprecated To be replaced by simplify
     *  @param {number} TOLERANCE
     */

  }, {
    key: "simplifyEquals",
    value: function simplifyEquals() {
      var TOLERANCE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e-12;

      for (var i = this.getDegree(); i >= 0; i--) {
        if (Math.abs(this.coefs[i]) <= TOLERANCE) {
          this.coefs.pop();
        } else {
          break;
        }
      }
    }
    /**
     *  Sets small coefficients to zero.
     *
     *  @deprecated To be replaced by removeZeros
     *  @param {number} TOLERANCE
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "removeZerosEquals",
    value: function removeZerosEquals() {
      var TOLERANCE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e-15;
      var c = this.coefs;
      var err = 10 * TOLERANCE * Math.abs(c.reduce(function (pv, cv) {
        return Math.abs(cv) > Math.abs(pv) ? cv : pv;
      }));

      for (var i = 0; i < c.length - 1; i++) {
        if (Math.abs(c[i]) < err) {
          c[i] = 0;
        }
      }

      return this;
    }
    /**
     *  Scales polynomial so that leading coefficient becomes 1.
     *
     *  @deprecated To be replaced by getMonic
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "monicEquals",
    value: function monicEquals() {
      var c = this.coefs;

      if (c[c.length - 1] !== 1) {
        this.divideEqualsScalar(c[c.length - 1]);
      }

      return this;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      var coefs = [];
      var signs = [];

      for (var i = this.coefs.length - 1; i >= 0; i--) {
        var value = Math.round(this.coefs[i] * 1000) / 1000;

        if (value !== 0) {
          var signString = value < 0 ? " - " : " + ";
          value = Math.abs(value);

          if (i > 0) {
            if (value === 1) {
              value = this._variable;
            } else {
              value += this._variable;
            }
          }

          if (i > 1) {
            value += "^" + i;
          }

          signs.push(signString);
          coefs.push(value);
        }
      }

      signs[0] = signs[0] === " + " ? "" : "-";
      var result = "";

      for (var _i2 = 0; _i2 < coefs.length; _i2++) {
        result += signs[_i2] + coefs[_i2];
      }

      return result;
    }
    /**
     *  bisection
     *
     *  @param {number} min
     *  @param {number} max
     *  @param {number} [TOLERANCE]
     *  @param {number} [ACCURACY]
     *  @returns {number}
     */

  }, {
    key: "bisection",
    value: function bisection(min, max) {
      var TOLERANCE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-6;
      var ACCURACY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15;
      var minValue = this.eval(min);
      var maxValue = this.eval(max);
      var result;

      if (Math.abs(minValue) <= TOLERANCE) {
        result = min;
      } else if (Math.abs(maxValue) <= TOLERANCE) {
        result = max;
      } else if (minValue * maxValue <= 0) {
        var tmp1 = Math.log(max - min);
        var tmp2 = Math.LN10 * ACCURACY;
        var maxIterations = Math.ceil((tmp1 + tmp2) / Math.LN2);

        for (var i = 0; i < maxIterations; i++) {
          result = 0.5 * (min + max);
          var value = this.eval(result);

          if (Math.abs(value) <= TOLERANCE) {
            break;
          }

          if (value * minValue < 0) {
            max = result;
            maxValue = value;
          } else {
            min = result;
            minValue = value;
          }
        }
      }

      return result;
    }
    /**
     *  Based on trapzd in "Numerical Recipes in C, 2nd Edition", page 137
     *
     *  @param {number} min
     *  @param {number} max
     *  @param {number} n
     *  @returns {number}
     */

  }, {
    key: "trapezoid",
    value: function trapezoid(min, max, n) {
      if (isNaN(min) || isNaN(max) || isNaN(n)) {
        throw new TypeError("Parameters must be numbers");
      }

      var range = max - min;

      if (n === 1) {
        var minValue = this.eval(min);
        var maxValue = this.eval(max);
        this._s = 0.5 * range * (minValue + maxValue);
      } else {
        var iter = 1 << n - 2;
        var delta = range / iter;
        var x = min + 0.5 * delta;
        var sum = 0;

        for (var i = 0; i < iter; i++) {
          sum += this.eval(x);
          x += delta;
        }

        this._s = 0.5 * (this._s + range * sum / iter);
      }

      if (isNaN(this._s)) {
        throw new TypeError("this._s is NaN");
      }

      return this._s;
    }
    /**
     *  Based on trapzd in "Numerical Recipes in C, 2nd Edition", page 139
     *
     *  @param {number} min
     *  @param {number} max
     *  @returns {number}
     */

  }, {
    key: "simpson",
    value: function simpson(min, max) {
      if (isNaN(min) || isNaN(max)) {
        throw new TypeError("Parameters must be numbers");
      }

      var range = max - min;
      var st = 0.5 * range * (this.eval(min) + this.eval(max));
      var t = st;
      var s = 4.0 * st / 3.0;
      var os = s;
      var ost = st;
      var TOLERANCE = 1e-7;
      var iter = 1;

      for (var n = 2; n <= 20; n++) {
        var delta = range / iter;
        var x = min + 0.5 * delta;
        var sum = 0;

        for (var i = 1; i <= iter; i++) {
          sum += this.eval(x);
          x += delta;
        }

        t = 0.5 * (t + range * sum / iter);
        st = t;
        s = (4.0 * st - ost) / 3.0;

        if (Math.abs(s - os) < TOLERANCE * Math.abs(os)) {
          break;
        }

        os = s;
        ost = st;
        iter <<= 1;
      }

      return s;
    }
    /**
     *  romberg
     *
     *  @param {number} min
     *  @param {number} max
     *  @returns {number}
     */

  }, {
    key: "romberg",
    value: function romberg(min, max) {
      if (isNaN(min) || isNaN(max)) {
        throw new TypeError("Parameters must be numbers");
      }

      var MAX = 20;
      var K = 3;
      var TOLERANCE = 1e-6;
      var s = new Array(MAX + 1);
      var h = new Array(MAX + 1);
      var result = {
        y: 0,
        dy: 0
      };
      h[0] = 1.0;

      for (var j = 1; j <= MAX; j++) {
        s[j - 1] = this.trapezoid(min, max, j);

        if (j >= K) {
          result = Polynomial.interpolate(h, s, K, j - K, 0.0);

          if (Math.abs(result.dy) <= TOLERANCE * result.y) {
            break;
          }
        }

        s[j] = s[j - 1];
        h[j] = 0.25 * h[j - 1];
      }

      return result.y;
    }
    /**
     *  Estimate what is the maximum polynomial evaluation error value under which polynomial evaluation could be in fact 0.
     *
     *  @param {number} maxAbsX
     *  @returns {number}
     */

  }, {
    key: "zeroErrorEstimate",
    value: function zeroErrorEstimate(maxAbsX) {
      var poly = this;
      var ERRF = 1e-15;

      if (typeof maxAbsX === "undefined") {
        var rb = poly.bounds();
        maxAbsX = Math.max(Math.abs(rb.minX), Math.abs(rb.maxX));
      }

      if (maxAbsX < 0.001) {
        return 2 * Math.abs(poly.eval(ERRF));
      }

      var n = poly.coefs.length - 1;
      var an = poly.coefs[n];
      return 10 * ERRF * poly.coefs.reduce(function (m, v, i) {
        var nm = v / an * Math.pow(maxAbsX, i);
        return nm > m ? nm : m;
      }, 0);
    }
    /**
     *  Calculates upper Real roots bounds. <br/>
     *  Real roots are in interval [negX, posX]. Determined by Fujiwara method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ negX: number, posX: number }}
     */

  }, {
    key: "boundsUpperRealFujiwara",
    value: function boundsUpperRealFujiwara() {
      var a = this.coefs;
      var n = a.length - 1;
      var an = a[n];

      if (an !== 1) {
        a = this.coefs.map(function (v) {
          return v / an;
        });
      }

      var b = a.map(function (v, i) {
        return i < n ? Math.pow(Math.abs(i === 0 ? v / 2 : v), 1 / (n - i)) : v;
      });
      var coefSelectionFunc;

      var find2Max = function find2Max(acc, bi, i) {
        if (coefSelectionFunc(i)) {
          if (acc.max < bi) {
            acc.nearmax = acc.max;
            acc.max = bi;
          } else if (acc.nearmax < bi) {
            acc.nearmax = bi;
          }
        }

        return acc;
      };

      coefSelectionFunc = function coefSelectionFunc(i) {
        return i < n && a[i] < 0;
      }; // eslint-disable-next-line unicorn/no-fn-reference-in-iterator


      var max_nearmax_pos = b.reduce(find2Max, {
        max: 0,
        nearmax: 0
      });

      coefSelectionFunc = function coefSelectionFunc(i) {
        return i < n && (n % 2 === i % 2 ? a[i] < 0 : a[i] > 0);
      }; // eslint-disable-next-line unicorn/no-fn-reference-in-iterator


      var max_nearmax_neg = b.reduce(find2Max, {
        max: 0,
        nearmax: 0
      });
      return {
        negX: -2 * max_nearmax_neg.max,
        posX: 2 * max_nearmax_pos.max
      };
    }
    /**
     *  Calculates lower Real roots bounds. <br/>
     *  There are no Real roots in interval <negX, posX>. Determined by Fujiwara method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ negX: number, posX: number }}
     */

  }, {
    key: "boundsLowerRealFujiwara",
    value: function boundsLowerRealFujiwara() {
      var poly = new Polynomial();
      poly.coefs = this.coefs.slice().reverse();
      var res = poly.boundsUpperRealFujiwara();
      res.negX = 1 / res.negX;
      res.posX = 1 / res.posX;
      return res;
    }
    /**
     *  Calculates left and right Real roots bounds. <br/>
     *  Real roots are in interval [minX, maxX]. Combines Fujiwara lower and upper bounds to get minimal interval.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ minX: number, maxX: number }}
    */

  }, {
    key: "bounds",
    value: function bounds() {
      var urb = this.boundsUpperRealFujiwara();
      var rb = {
        minX: urb.negX,
        maxX: urb.posX
      };

      if (urb.negX === 0 && urb.posX === 0) {
        return rb;
      }

      if (urb.negX === 0) {
        rb.minX = this.boundsLowerRealFujiwara().posX;
      } else if (urb.posX === 0) {
        rb.maxX = this.boundsLowerRealFujiwara().negX;
      }

      if (rb.minX > rb.maxX) {
        rb.minX = rb.maxX = 0;
      }

      return rb; // TODO: if sure that there are no complex roots
      // (maybe by using Sturm's theorem) use:
      // return this.boundsRealLaguerre();
    }
    /**
     *  Calculates absolute upper roots bound. <br/>
     *  All (Complex and Real) roots magnitudes are &lt;= result. Determined by Rouche method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {number}
     */

  }, {
    key: "boundUpperAbsRouche",
    value: function boundUpperAbsRouche() {
      var a = this.coefs;
      var n = a.length - 1;
      var max = a.reduce(function (prev, curr, i) {
        if (i !== n) {
          curr = Math.abs(curr);
          return prev < curr ? curr : prev;
        }

        return prev;
      }, 0);
      return 1 + max / Math.abs(a[n]);
    }
    /**
     *  Calculates absolute lower roots bound. <br/>
     *  All (Complex and Real) roots magnitudes are &gt;= result. Determined by Rouche method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {number}
     */

  }, {
    key: "boundLowerAbsRouche",
    value: function boundLowerAbsRouche() {
      var a = this.coefs;
      var max = a.reduce(function (prev, curr, i) {
        if (i !== 0) {
          curr = Math.abs(curr);
          return prev < curr ? curr : prev;
        }

        return prev;
      }, 0);
      return Math.abs(a[0]) / (Math.abs(a[0]) + max);
    }
    /**
     *  Calculates left and right Real roots bounds.<br/>
     *  WORKS ONLY if all polynomial roots are Real.
     *  Real roots are in interval [minX, maxX]. Determined by Laguerre method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ minX: number, maxX: number }}
     */

  }, {
    key: "boundsRealLaguerre",
    value: function boundsRealLaguerre() {
      var a = this.coefs;
      var n = a.length - 1;
      var p1 = -a[n - 1] / (n * a[n]);
      var undersqrt = a[n - 1] * a[n - 1] - 2 * n / (n - 1) * a[n] * a[n - 2];
      var p2 = (n - 1) / (n * a[n]) * Math.sqrt(undersqrt);

      if (p2 < 0) {
        p2 = -p2;
      }

      return {
        minX: p1 - p2,
        maxX: p1 + p2
      };
    }
    /**
     *  Root count by Descartes rule of signs. <br/>
     *  Returns maximum number of positive and negative real roots and minimum number of complex roots.
     *  @see {@link http://en.wikipedia.org/wiki/Descartes%27_rule_of_signs}
     *
     *  @returns {{maxRealPos: number, maxRealNeg: number, minComplex: number}}
     */

  }, {
    key: "countRootsDescartes",
    value: function countRootsDescartes() {
      var a = this.coefs;
      var n = a.length - 1;
      var accum = a.reduce(function (acc, ai, i) {
        if (acc.prev_a !== 0 && ai !== 0) {
          if (acc.prev_a < 0 === ai > 0) {
            acc.pos++;
          }

          if (i % 2 === 0 !== acc.prev_a < 0 === (i % 2 === 1 !== ai > 0)) {
            acc.neg++;
          }
        }

        acc.prev_a = ai;
        return acc;
      }, {
        pos: 0,
        neg: 0,
        prev_a: 0
      });
      return {
        maxRealPos: accum.pos,
        maxRealNeg: accum.neg,
        minComplex: n - (accum.pos + accum.neg)
      };
    } // getters and setters

    /**
     *  get degree
     *
     *  @returns {number}
     */

  }, {
    key: "getDegree",
    value: function getDegree() {
      return this.coefs.length - 1;
    }
    /**
     *  getDerivative
     *
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "getDerivative",
    value: function getDerivative() {
      var derivative = new Polynomial();

      for (var i = 1; i < this.coefs.length; i++) {
        derivative.coefs.push(i * this.coefs[i]);
      }

      return derivative;
    }
    /**
     *  getRoots
     *
     *  @returns {Array<number>}
     */

  }, {
    key: "getRoots",
    value: function getRoots() {
      var result;
      this.simplifyEquals();

      switch (this.getDegree()) {
        case 0:
          result = [];
          break;

        case 1:
          result = this.getLinearRoot();
          break;

        case 2:
          result = this.getQuadraticRoots();
          break;

        case 3:
          result = this.getCubicRoots();
          break;

        case 4:
          result = this.getQuarticRoots();
          break;

        default:
          result = [];
      }

      return result;
    }
    /**
     *  getRootsInInterval
     *
     *  @param {number} min
     *  @param {number} max
     *  @returns {Array<number>}
     */

  }, {
    key: "getRootsInInterval",
    value: function getRootsInInterval(min, max) {
      var roots = [];
      /**
       *  @param {number} value
       */

      function push(value) {
        if (typeof value === "number") {
          roots.push(value);
        }
      }

      if (this.getDegree() === 0) {
        throw new RangeError("Unexpected empty polynomial");
      } else if (this.getDegree() === 1) {
        push(this.bisection(min, max));
      } else {
        // get roots of derivative
        var deriv = this.getDerivative();
        var droots = deriv.getRootsInInterval(min, max);

        if (droots.length > 0) {
          // find root on [min, droots[0]]
          push(this.bisection(min, droots[0])); // find root on [droots[i],droots[i+1]] for 0 <= i <= count-2

          for (var i = 0; i <= droots.length - 2; i++) {
            push(this.bisection(droots[i], droots[i + 1]));
          } // find root on [droots[count-1],xmax]


          push(this.bisection(droots[droots.length - 1], max));
        } else {
          // polynomial is monotone on [min,max], has at most one root
          push(this.bisection(min, max));
        }
      }

      return roots;
    }
    /**
     *  getLinearRoot
     *
     *  @returns {number}
     */

  }, {
    key: "getLinearRoot",
    value: function getLinearRoot() {
      var result = [];
      var a = this.coefs[1];

      if (a !== 0) {
        result.push(-this.coefs[0] / a);
      }

      return result;
    }
    /**
     *  getQuadraticRoots
     *
     *  @returns {Array<number>}
     */

  }, {
    key: "getQuadraticRoots",
    value: function getQuadraticRoots() {
      var results = [];

      if (this.getDegree() === 2) {
        var a = this.coefs[2];
        var b = this.coefs[1] / a;
        var c = this.coefs[0] / a;
        var d = b * b - 4 * c;

        if (d > 0) {
          var e = Math.sqrt(d);
          results.push(0.5 * (-b + e));
          results.push(0.5 * (-b - e));
        } else if (d === 0) {
          // really two roots with same value, but we only return one
          results.push(0.5 * -b);
        } // else imaginary results

      }

      return results;
    }
    /**
     *  getCubicRoots
     *
     *  This code is based on MgcPolynomial.cpp written by David Eberly.  His
     *  code along with many other excellent examples are avaiable at his site:
     *  http://www.geometrictools.com
     *
     *  @returns {Array<number>}
     */

  }, {
    key: "getCubicRoots",
    value: function getCubicRoots() {
      var results = [];

      if (this.getDegree() === 3) {
        var c3 = this.coefs[3];
        var c2 = this.coefs[2] / c3;
        var c1 = this.coefs[1] / c3;
        var c0 = this.coefs[0] / c3;
        var a = (3 * c1 - c2 * c2) / 3;
        var b = (2 * c2 * c2 * c2 - 9 * c1 * c2 + 27 * c0) / 27;
        var offset = c2 / 3;
        var discrim = b * b / 4 + a * a * a / 27;
        var halfB = b / 2;
        var ZEROepsilon = this.zeroErrorEstimate();

        if (Math.abs(discrim) <= ZEROepsilon) {
          discrim = 0;
        }

        if (discrim > 0) {
          var e = Math.sqrt(discrim);
          var root; // eslint-disable-line no-shadow

          var tmp = -halfB + e;

          if (tmp >= 0) {
            root = Math.pow(tmp, 1 / 3);
          } else {
            root = -Math.pow(-tmp, 1 / 3);
          }

          tmp = -halfB - e;

          if (tmp >= 0) {
            root += Math.pow(tmp, 1 / 3);
          } else {
            root -= Math.pow(-tmp, 1 / 3);
          }

          results.push(root - offset);
        } else if (discrim < 0) {
          var distance = Math.sqrt(-a / 3);
          var angle = Math.atan2(Math.sqrt(-discrim), -halfB) / 3;
          var cos = Math.cos(angle);
          var sin = Math.sin(angle);
          var sqrt3 = Math.sqrt(3);
          results.push(2 * distance * cos - offset);
          results.push(-distance * (cos + sqrt3 * sin) - offset);
          results.push(-distance * (cos - sqrt3 * sin) - offset);
        } else {
          var _tmp;

          if (halfB >= 0) {
            _tmp = -Math.pow(halfB, 1 / 3);
          } else {
            _tmp = Math.pow(-halfB, 1 / 3);
          }

          results.push(2 * _tmp - offset); // really should return next root twice, but we return only one

          results.push(-_tmp - offset);
        }
      }

      return results;
    }
    /**
     *  Calculates roots of quartic polynomial. <br/>
     *  First, derivative roots are found, then used to split quartic polynomial
     *  into segments, each containing one root of quartic polynomial.
     *  Segments are then passed to newton's method to find roots.
     *
     *  @returns {Array<number>} roots
     */

  }, {
    key: "getQuarticRoots",
    value: function getQuarticRoots() {
      var results = [];
      var n = this.getDegree();

      if (n === 4) {
        var poly = new Polynomial();
        poly.coefs = this.coefs.slice();
        poly.divideEqualsScalar(poly.coefs[n]);
        var ERRF = 1e-15;

        if (Math.abs(poly.coefs[0]) < 10 * ERRF * Math.abs(poly.coefs[3])) {
          poly.coefs[0] = 0;
        }

        var poly_d = poly.getDerivative();
        var derrt = poly_d.getRoots().sort(function (a, b) {
          return a - b;
        });
        var dery = [];
        var nr = derrt.length - 1;
        var rb = this.bounds();
        var maxabsX = Math.max(Math.abs(rb.minX), Math.abs(rb.maxX));
        var ZEROepsilon = this.zeroErrorEstimate(maxabsX);

        for (var _i3 = 0; _i3 <= nr; _i3++) {
          dery.push(poly.eval(derrt[_i3]));
        }

        for (var _i4 = 0; _i4 <= nr; _i4++) {
          if (Math.abs(dery[_i4]) < ZEROepsilon) {
            dery[_i4] = 0;
          }
        }

        var i = 0;
        var dx = Math.max(0.1 * (rb.maxX - rb.minX) / n, ERRF);
        var guesses = [];
        var minmax = [];

        if (nr > -1) {
          if (dery[0] !== 0) {
            if (sign(dery[0]) !== sign(poly.eval(derrt[0] - dx) - dery[0])) {
              guesses.push(derrt[0] - dx);
              minmax.push([rb.minX, derrt[0]]);
            }
          } else {
            results.push(derrt[0], derrt[0]);
            i++;
          }

          for (; i < nr; i++) {
            if (dery[i + 1] === 0) {
              results.push(derrt[i + 1], derrt[i + 1]);
              i++;
            } else if (sign(dery[i]) !== sign(dery[i + 1])) {
              guesses.push((derrt[i] + derrt[i + 1]) / 2);
              minmax.push([derrt[i], derrt[i + 1]]);
            }
          }

          if (dery[nr] !== 0 && sign(dery[nr]) !== sign(poly.eval(derrt[nr] + dx) - dery[nr])) {
            guesses.push(derrt[nr] + dx);
            minmax.push([derrt[nr], rb.maxX]);
          }
        }
        /**
         *  @param {number} x
         *  @returns {number}
         */


        var f = function f(x) {
          return poly.eval(x);
        };
        /**
         *  @param {number} x
         *  @returns {number}
         */


        var df = function df(x) {
          return poly_d.eval(x);
        };

        if (guesses.length > 0) {
          for (i = 0; i < guesses.length; i++) {
            guesses[i] = Polynomial.newtonSecantBisection(guesses[i], f, df, 32, minmax[i][0], minmax[i][1]);
          }
        }

        results = results.concat(guesses);
      }

      return results;
    }
  }], [{
    key: "interpolate",
    value: function interpolate(xs, ys, n, offset, x) {
      if (xs.constructor !== Array || ys.constructor !== Array) {
        throw new TypeError("xs and ys must be arrays");
      }

      if (isNaN(n) || isNaN(offset) || isNaN(x)) {
        throw new TypeError("n, offset, and x must be numbers");
      }

      var i, y;
      var dy = 0;
      var c = new Array(n);
      var d = new Array(n);
      var ns = 0;
      var diff = Math.abs(x - xs[offset]);

      for (i = 0; i < n; i++) {
        var dift = Math.abs(x - xs[offset + i]);

        if (dift < diff) {
          ns = i;
          diff = dift;
        }

        c[i] = d[i] = ys[offset + i];
      }

      y = ys[offset + ns];
      ns--;

      for (var m = 1; m < n; m++) {
        for (i = 0; i < n - m; i++) {
          var ho = xs[offset + i] - x;
          var hp = xs[offset + i + m] - x;
          var w = c[i + 1] - d[i];
          var den = ho - hp;

          if (den === 0.0) {
            throw new RangeError("Unable to interpolate polynomial. Two numbers in n were identical (to within roundoff)");
          }

          den = w / den;
          d[i] = hp * den;
          c[i] = ho * den;
        }

        dy = 2 * (ns + 1) < n - m ? c[ns + 1] : d[ns--];
        y += dy;
      }

      return {
        y: y,
        dy: dy
      };
    }
    /**
     *  Newton's (Newton-Raphson) method for finding Real roots on univariate function. <br/>
     *  When using bounds, algorithm falls back to secant if newton goes out of range.
     *  Bisection is fallback for secant when determined secant is not efficient enough.
     *  @see {@link http://en.wikipedia.org/wiki/Newton%27s_method}
     *  @see {@link http://en.wikipedia.org/wiki/Secant_method}
     *  @see {@link http://en.wikipedia.org/wiki/Bisection_method}
     *
     *  @param {number} x0 - Initial root guess
     *  @param {Function} f - Function which root we are trying to find
     *  @param {Function} df - Derivative of function f
     *  @param {number} max_iterations - Maximum number of algorithm iterations
     *  @param {number} [min] - Left bound value
     *  @param {number} [max] - Right bound value
     *  @returns {number} root
     */

  }, {
    key: "newtonSecantBisection",
    value: function newtonSecantBisection(x0, f, df, max_iterations, min, max) {
      var x,
          prev_dfx = 0,
          dfx,
          prev_x_ef_correction = 0,
          x_correction,
          x_new;
      var y, y_atmin, y_atmax;
      x = x0;
      var ACCURACY = 14;
      var min_correction_factor = Math.pow(10, -ACCURACY);
      var isBounded = typeof min === "number" && typeof max === "number";

      if (isBounded) {
        if (min > max) {
          throw new RangeError("Min must be greater than max");
        }

        y_atmin = f(min);
        y_atmax = f(max);

        if (sign(y_atmin) === sign(y_atmax)) {
          throw new RangeError("Y values of bounds must be of opposite sign");
        }
      }

      var isEnoughCorrection = function isEnoughCorrection() {
        // stop if correction is too small or if correction is in simple loop
        return Math.abs(x_correction) <= min_correction_factor * Math.abs(x) || prev_x_ef_correction === x - x_correction - x;
      };

      for (var i = 0; i < max_iterations; i++) {
        dfx = df(x);

        if (dfx === 0) {
          if (prev_dfx === 0) {
            // error
            throw new RangeError("df(x) is zero");
          } else {
            // use previous derivation value
            dfx = prev_dfx;
          } // or move x a little?
          // dfx = df(x != 0 ? x + x * 1e-15 : 1e-15);

        }

        prev_dfx = dfx;
        y = f(x);
        x_correction = y / dfx;
        x_new = x - x_correction;

        if (isEnoughCorrection()) {
          break;
        }

        if (isBounded) {
          if (sign(y) === sign(y_atmax)) {
            max = x;
            y_atmax = y;
          } else if (sign(y) === sign(y_atmin)) {
            min = x;
            y_atmin = y;
          } else {
            x = x_new;
            break;
          }

          if (x_new < min || x_new > max) {
            if (sign(y_atmin) === sign(y_atmax)) {
              break;
            }

            var RATIO_LIMIT = 50;
            var AIMED_BISECT_OFFSET = 0.25; // [0, 0.5)

            var dy = y_atmax - y_atmin;
            var dx = max - min;

            if (dy === 0) {
              x_correction = x - (min + dx * 0.5);
            } else if (Math.abs(dy / Math.min(y_atmin, y_atmax)) > RATIO_LIMIT) {
              x_correction = x - (min + dx * (0.5 + (Math.abs(y_atmin) < Math.abs(y_atmax) ? -AIMED_BISECT_OFFSET : AIMED_BISECT_OFFSET)));
            } else {
              x_correction = x - (min - y_atmin / dy * dx);
            }

            x_new = x - x_correction;

            if (isEnoughCorrection()) {
              break;
            }
          }
        }

        prev_x_ef_correction = x - x_new;
        x = x_new;
      }

      return x;
    }
  }]);

  return Polynomial;
}();

/**
 *  @module kld-polynomial
 */

/* parser generated by jison 0.4.18 */

/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function o(k, v, _o, l) {
    for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {
    }

    return _o;
  },
      $V0 = [1, 6],
      $V1 = [1, 17],
      $V2 = [1, 7],
      $V3 = [1, 10],
      $V4 = [1, 13],
      $V5 = [1, 28],
      $V6 = [1, 14],
      $V7 = [1, 34],
      $V8 = [1, 15],
      $V9 = [1, 33],
      $Va = [1, 21],
      $Vb = [1, 24],
      $Vc = [1, 25],
      $Vd = [1, 29],
      $Ve = [1, 30],
      $Vf = [1, 32],
      $Vg = [1, 31],
      $Vh = [1, 5],
      $Vi = [1, 5, 14, 16, 24, 28, 41],
      $Vj = [1, 57],
      $Vk = [1, 59],
      $Vl = [1, 58],
      $Vm = [1, 46],
      $Vn = [1, 52],
      $Vo = [1, 41],
      $Vp = [1, 42],
      $Vq = [1, 43],
      $Vr = [1, 44],
      $Vs = [1, 45],
      $Vt = [1, 47],
      $Vu = [1, 49],
      $Vv = [1, 50],
      $Vw = [1, 55],
      $Vx = [1, 56],
      $Vy = [1, 5, 14, 16, 24, 28, 41, 54],
      $Vz = [1, 5, 14, 16, 24, 28, 31, 32, 33, 34, 41, 54],
      $VA = [1, 5, 14, 16, 24, 28, 31, 32, 33, 34, 38, 40, 41, 54],
      $VB = [1, 5, 14, 16, 24, 28, 31, 32, 33, 34, 38, 40, 41, 54, 58],
      $VC = [1, 5, 14, 16, 24, 28, 41, 58],
      $VD = [1, 93],
      $VE = [1, 98],
      $VF = [1, 112],
      $VG = [1, 115],
      $VH = [14, 41],
      $VI = [14, 28],
      $VJ = [1, 127],
      $VK = [14, 24, 41],
      $VL = [14, 24, 41, 58],
      $VM = [14, 28, 58],
      $VN = [14, 24],
      $VO = [1, 5, 14, 28, 41],
      $VP = [1, 151];

  var parser = {
    trace: function trace() {},
    yy: {},
    symbols_: {
      "error": 2,
      "program": 3,
      "statements": 4,
      ";": 5,
      "statement": 6,
      "assignment": 7,
      "sequence": 8,
      "LET": 9,
      "IDENTIFIER": 10,
      "=": 11,
      "DEF": 12,
      "sequences": 13,
      ",": 14,
      "steps": 15,
      "|>": 16,
      "step": 17,
      "=~": 18,
      "namedPattern": 19,
      "expression": 20,
      "mathExpression": 21,
      "MAP": 22,
      "(": 23,
      ")": 24,
      "PATTERNS": 25,
      "{": 26,
      "patterns": 27,
      "}": 28,
      "SEQUENCES": 29,
      "callExpression": 30,
      "+": 31,
      "-": 32,
      "*": 33,
      "/": 34,
      "argumentList": 35,
      "memberExpression": 36,
      "primaryExpression": 37,
      ".": 38,
      "integer": 39,
      "[": 40,
      "]": 41,
      "boolean": 42,
      "NULL_TYPE": 43,
      "float": 44,
      "string": 45,
      "UNDEFINED_TYPE": 46,
      "$": 47,
      "arrayExpression": 48,
      "objectExpression": 49,
      "expressionElements": 50,
      "expressionElement": 51,
      "expressionProperties": 52,
      "expressionProperty": 53,
      ":": 54,
      "argument": 55,
      "...": 56,
      "pattern": 57,
      "AS": 58,
      "ANY_TYPE": 59,
      "ARRAY_TYPE": 60,
      "BOOLEAN_TYPE": 61,
      "TRUE": 62,
      "FALSE": 63,
      "NUMBER_TYPE": 64,
      "OBJECT_TYPE": 65,
      "STRING_TYPE": 66,
      "arrayPattern": 67,
      "objectPattern": 68,
      "PATTERN": 69,
      "ENUMERATION": 70,
      "patternElements": 71,
      "namedPatternElement": 72,
      "patternElement": 73,
      "range": 74,
      "..": 75,
      "patternProperties": 76,
      "namedPatternProperty": 77,
      "namedProperty": 78,
      "STRING": 79,
      "NUMBER": 80,
      "stringOrIdentifier": 81,
      "identifiers": 82,
      "$accept": 0,
      "$end": 1
    },
    terminals_: {
      2: "error",
      5: ";",
      9: "LET",
      10: "IDENTIFIER",
      11: "=",
      12: "DEF",
      14: ",",
      16: "|>",
      18: "=~",
      22: "MAP",
      23: "(",
      24: ")",
      25: "PATTERNS",
      26: "{",
      28: "}",
      29: "SEQUENCES",
      31: "+",
      32: "-",
      33: "*",
      34: "/",
      38: ".",
      40: "[",
      41: "]",
      43: "NULL_TYPE",
      46: "UNDEFINED_TYPE",
      47: "$",
      54: ":",
      56: "...",
      58: "AS",
      59: "ANY_TYPE",
      60: "ARRAY_TYPE",
      61: "BOOLEAN_TYPE",
      62: "TRUE",
      63: "FALSE",
      64: "NUMBER_TYPE",
      65: "OBJECT_TYPE",
      66: "STRING_TYPE",
      69: "PATTERN",
      70: "ENUMERATION",
      75: "..",
      79: "STRING",
      80: "NUMBER"
    },
    productions_: [0, [3, 1], [3, 2], [4, 3], [4, 1], [6, 1], [6, 1], [7, 4], [7, 4], [13, 3], [13, 1], [8, 1], [15, 3], [15, 1], [17, 2], [17, 1], [20, 1], [20, 6], [20, 4], [20, 4], [21, 1], [21, 3], [21, 3], [21, 3], [21, 3], [30, 3], [30, 4], [30, 1], [36, 1], [36, 3], [36, 3], [36, 4], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 3], [48, 2], [48, 3], [50, 3], [50, 1], [51, 1], [51, 1], [49, 2], [49, 3], [52, 3], [52, 1], [53, 3], [53, 1], [53, 1], [35, 3], [35, 1], [55, 1], [55, 2], [27, 3], [27, 1], [19, 1], [19, 3], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [57, 2], [57, 2], [57, 1], [67, 2], [67, 3], [71, 3], [71, 1], [72, 1], [72, 3], [73, 1], [73, 3], [73, 3], [73, 5], [74, 3], [74, 2], [74, 2], [74, 1], [68, 2], [68, 3], [76, 3], [76, 1], [77, 1], [77, 3], [78, 3], [78, 1], [42, 1], [42, 1], [45, 1], [39, 1], [44, 1], [81, 1], [81, 1], [82, 3], [82, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
    /* action[1] */
    , $$
    /* vstack */
    , _$
    /* lstack */
    ) {
      /* this == yyval */
      var $0 = $$.length - 1;

      switch (yystate) {
        case 1:
          return $$[$0];
          break;

        case 2:
          return $$[$0 - 1];
          break;

        case 3:
        case 9:
        case 12:
        case 44:
        case 50:
        case 55:
        case 59:
        case 82:
        case 96:
        case 109:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;

        case 4:
        case 10:
        case 13:
        case 45:
        case 51:
        case 56:
        case 60:
        case 83:
        case 97:
        case 110:
          this.$ = [$$[$0]];
          break;

        case 5:
        case 6:
        case 14:
        case 15:
        case 16:
        case 20:
        case 27:
        case 28:
        case 39:
        case 40:
        case 46:
        case 47:
        case 54:
        case 57:
        case 98:
        case 107:
          this.$ = $$[$0];
          break;

        case 7:
          this.$ = {
            type: 'assignment',
            name: $$[$0 - 2],
            value: $$[$0]
          };
          break;

        case 8:
          this.$ = {
            type: 'def',
            name: $$[$0 - 2],
            value: $$[$0]
          };
          break;

        case 11:
          this.$ = {
            type: 'sequence',
            steps: $$[$0]
          };
          break;

        case 17:
          this.$ = {
            type: 'map',
            value: [$$[$0 - 3], $$[$0 - 1]]
          };
          break;

        case 18:
          this.$ = {
            type: 'patterns',
            patterns: $$[$0 - 1]
          };
          break;

        case 19:
          this.$ = {
            type: 'sequences',
            sequences: $$[$0 - 1]
          };
          break;

        case 21:
          this.$ = {
            type: 'add',
            left: $$[$0 - 2],
            right: $$[$0]
          };
          break;

        case 22:
          this.$ = {
            type: 'subtract',
            left: $$[$0 - 2],
            right: $$[$0]
          };
          break;

        case 23:
          this.$ = {
            type: 'multiply',
            left: $$[$0 - 2],
            right: $$[$0]
          };
          break;

        case 24:
          this.$ = {
            type: 'divide',
            left: $$[$0 - 2],
            right: $$[$0]
          };
          break;

        case 25:
          this.$ = {
            type: 'invoke',
            name: $$[$0 - 2],
            args: []
          };
          break;

        case 26:
          this.$ = {
            type: 'invoke',
            name: $$[$0 - 3],
            args: $$[$0 - 1]
          };
          break;

        case 29:
          this.$ = {
            type: 'get-property',
            left: $$[$0 - 2],
            right: $$[$0]
          };
          break;

        case 30:
          this.$ = {
            type: 'get-index',
            left: $$[$0 - 2],
            right: $$[$0]
          };
          break;

        case 31:
          this.$ = {
            type: 'get-index',
            left: $$[$0 - 3],
            right: $$[$0 - 1]
          };
          break;

        case 32:
          this.$ = {
            type: 'boolean',
            value: $$[$0]
          };
          break;

        case 33:
          this.$ = {
            type: 'boolean',
            value: null
          };
          break;

        case 34:
          this.$ = {
            type: 'number',
            value: $$[$0]
          };
          break;

        case 35:
          this.$ = {
            type: 'string',
            value: $$[$0]
          };
          break;

        case 36:
          this.$ = {
            type: 'undefined',
            value: undefined
          };
          break;

        case 37:
          this.$ = {
            type: 'get-value',
            name: $$[$0]
          };
          break;

        case 38:
          this.$ = {
            type: 'get-structure'
          };
          break;

        case 41:
          this.$ = $$[$0 - 1];
          break;

        case 42:
          this.$ = {
            type: 'array',
            value: []
          };
          break;

        case 43:
          this.$ = {
            type: 'array',
            value: $$[$0 - 1]
          };
          break;

        case 48:
          this.$ = {
            type: 'object',
            value: []
          };
          break;

        case 49:
          this.$ = {
            type: 'object',
            value: $$[$0 - 1]
          };
          break;

        case 52:
          this.$ = {
            type: 'property',
            name: $$[$0 - 2],
            value: $$[$0]
          };
          break;

        case 53:
          this.$ = {
            type: 'property',
            name: $$[$0],
            value: null
          };
          break;

        case 58:
          this.$ = {
            type: 'spread',
            expression: $$[$0]
          };
          break;

        case 61:
        case 84:
          $$[$0].assignTo = null;
          this.$ = $$[$0];
          break;

        case 62:
        case 85:
        case 99:
          $$[$0 - 2].assignTo = $$[$0];
          this.$ = $$[$0 - 2];
          break;

        case 63:
          this.$ = {
            type: 'pattern',
            patternType: 'any',
            value: null
          };
          break;

        case 64:
          this.$ = {
            type: 'pattern',
            patternType: 'array',
            value: null
          };
          break;

        case 65:
          this.$ = {
            type: 'pattern',
            patternType: 'boolean',
            value: null
          };
          break;

        case 66:
          this.$ = {
            type: 'pattern',
            patternType: 'boolean',
            value: true
          };
          break;

        case 67:
          this.$ = {
            type: 'pattern',
            patternType: 'boolean',
            value: false
          };
          break;

        case 68:
          this.$ = {
            type: 'pattern',
            patternType: 'null',
            value: null
          };
          break;

        case 69:
          this.$ = {
            type: 'pattern',
            patternType: 'number',
            value: null
          };
          break;

        case 70:
          this.$ = {
            type: 'pattern',
            patternType: 'number',
            value: $$[$0]
          };
          break;

        case 71:
          this.$ = {
            type: 'pattern',
            patternType: 'object',
            value: null
          };
          break;

        case 72:
          this.$ = {
            type: 'pattern',
            patternType: 'string',
            value: null
          };
          break;

        case 73:
          this.$ = {
            type: 'pattern',
            patternType: 'string',
            value: $$[$0]
          };
          break;

        case 74:
          this.$ = {
            type: 'pattern',
            patternType: 'undefined',
            value: null
          };
          break;

        case 75:
        case 76:
          this.$ = $$[$0];
          break;

        case 77:
          this.$ = {
            type: 'pattern-reference',
            name: $$[$0]
          };
          break;

        case 78:
          this.$ = {
            type: 'enumeration-reference',
            name: $$[$0]
          };
          break;

        case 79:
          this.$ = {
            type: 'pattern',
            patternType: 'reference',
            value: $$[$0]
          };
          break;

        case 80:
          this.$ = {
            type: 'pattern',
            patternType: 'array-pattern',
            value: []
          };
          break;

        case 81:
          this.$ = {
            type: 'pattern',
            patternType: 'array-pattern',
            value: $$[$0 - 1]
          };
          break;

        case 86:
          this.$ = {
            type: 'element',
            pattern: $$[$0],
            range: {
              type: 'range',
              start: 1,
              stop: 1
            }
          };
          break;

        case 87:
          this.$ = {
            type: 'element',
            pattern: $$[$0 - 2],
            range: $$[$0]
          };
          break;

        case 88:
          this.$ = {
            type: 'element-group',
            elements: $$[$0 - 1],
            range: {
              type: 'range',
              start: 1,
              stop: 1
            }
          };
          break;

        case 89:
          this.$ = {
            type: 'element-group',
            elements: $$[$0 - 3],
            range: $$[$0]
          };
          break;

        case 90:
          this.$ = {
            type: 'range',
            start: $$[$0 - 2],
            stop: $$[$0]
          };
          break;

        case 91:
          this.$ = {
            type: 'range',
            start: 0,
            stop: $$[$0]
          };
          break;

        case 92:
          this.$ = {
            type: 'range',
            start: $$[$0 - 1],
            stop: Infinity
          };
          break;

        case 93:
          this.$ = {
            type: 'range',
            start: $$[$0],
            stop: $$[$0]
          };
          break;

        case 94:
          this.$ = {
            type: 'pattern',
            patternType: 'object',
            value: null
          };
          break;

        case 95:
          this.$ = {
            type: 'pattern',
            patternType: 'object-pattern',
            value: $$[$0 - 1]
          };
          break;

        case 100:
          this.$ = {
            type: 'property',
            name: $$[$0 - 2],
            pattern: $$[$0]
          };
          break;

        case 101:
          this.$ = {
            type: 'property',
            name: $$[$0],
            pattern: {
              type: 'pattern',
              patternType: 'any',
              value: null
            }
          };
          break;

        case 102:
          this.$ = true;
          break;

        case 103:
          this.$ = false;
          break;

        case 104:
        case 108:
          this.$ = $$[$0].substring(1, $$[$0].length - 1);
          break;

        case 105:
          this.$ = parseInt($$[$0]);
          break;

        case 106:
          this.$ = parseFloat($$[$0]);
          break;
      }
    },
    table: [{
      3: 1,
      4: 2,
      6: 3,
      7: 4,
      8: 5,
      9: $V0,
      10: $V1,
      12: $V2,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      1: [3]
    }, {
      1: [2, 1],
      5: [1, 35]
    }, o($Vh, [2, 4]), o($Vh, [2, 5]), o($Vh, [2, 6]), {
      10: [1, 36]
    }, {
      10: [1, 37]
    }, o([1, 5, 14, 24, 28, 41], [2, 11], {
      16: [1, 38]
    }), o($Vi, [2, 13]), {
      10: $Vj,
      19: 39,
      26: $Vk,
      40: $Vl,
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 40,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      79: $Vf,
      80: $Vg
    }, o($Vi, [2, 15]), o($Vy, [2, 16], {
      31: [1, 60],
      32: [1, 61],
      33: [1, 62],
      34: [1, 63]
    }), {
      23: [1, 64]
    }, {
      26: [1, 65]
    }, {
      26: [1, 66]
    }, o($Vz, [2, 20]), o($VA, [2, 37], {
      23: [1, 67]
    }), o($Vz, [2, 27], {
      38: [1, 68],
      40: [1, 69]
    }), o($VA, [2, 28]), o($VA, [2, 32]), o($VA, [2, 33]), o($VA, [2, 34]), o($VA, [2, 35]), o($VA, [2, 36]), o($VA, [2, 38]), o($VA, [2, 39]), o($VA, [2, 40]), {
      10: $V1,
      20: 70,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($VA, [2, 102]), o($VA, [2, 103]), o($VB, [2, 106]), o($VB, [2, 104]), {
      7: 75,
      9: $V0,
      10: $V1,
      12: $V2,
      20: 74,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      41: [1, 71],
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      50: 72,
      51: 73,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      7: 80,
      9: $V0,
      10: $V1,
      12: $V2,
      20: 79,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      28: [1, 76],
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      52: 77,
      53: 78,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      1: [2, 2],
      6: 81,
      7: 4,
      8: 5,
      9: $V0,
      10: $V1,
      12: $V2,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      11: [1, 82]
    }, {
      11: [1, 83]
    }, {
      10: $V1,
      17: 84,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($Vi, [2, 14]), o($Vi, [2, 61], {
      58: [1, 85]
    }), o($VC, [2, 63]), o($VC, [2, 64]), o($VC, [2, 65]), o($VC, [2, 66]), o($VC, [2, 67]), o($VC, [2, 68]), o($VC, [2, 69]), o($VC, [2, 70]), o($VC, [2, 71]), o($VC, [2, 72]), o($VC, [2, 73]), o($VC, [2, 74]), o($VC, [2, 75]), o($VC, [2, 76]), {
      10: [1, 86]
    }, {
      10: [1, 87]
    }, o($VC, [2, 79]), {
      10: $Vj,
      23: $VD,
      26: $Vk,
      40: $Vl,
      41: [1, 88],
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 92,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      71: 89,
      72: 90,
      73: 91,
      79: $Vf,
      80: $Vg
    }, {
      10: $VE,
      28: [1, 94],
      76: 95,
      77: 96,
      78: 97
    }, {
      10: $V1,
      23: $V5,
      26: $V7,
      30: 99,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: $V1,
      23: $V5,
      26: $V7,
      30: 100,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: $V1,
      23: $V5,
      26: $V7,
      30: 101,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: $V1,
      23: $V5,
      26: $V7,
      30: 102,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: $V1,
      20: 103,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: $Vj,
      19: 105,
      26: $Vk,
      27: 104,
      40: $Vl,
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 40,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      79: $Vf,
      80: $Vg
    }, {
      8: 107,
      10: $V1,
      13: 106,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: $V1,
      20: 111,
      21: 12,
      22: $V4,
      23: $V5,
      24: [1, 108],
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      35: 109,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      55: 110,
      56: $VF,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      10: [1, 113],
      39: 114,
      80: $VG
    }, {
      39: 116,
      80: $VG
    }, {
      24: [1, 117]
    }, o($VA, [2, 42]), {
      14: [1, 119],
      41: [1, 118]
    }, o($VH, [2, 45]), o($VH, [2, 46]), o($VH, [2, 47]), o($VA, [2, 48]), {
      14: [1, 121],
      28: [1, 120]
    }, o($VI, [2, 51]), o($VI, [2, 53], {
      54: [1, 122]
    }), o($VI, [2, 54]), o($Vh, [2, 3]), {
      8: 123,
      10: $V1,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      8: 124,
      10: $V1,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($Vi, [2, 12]), {
      10: [1, 125]
    }, o($VC, [2, 77]), o($VC, [2, 78]), o($VC, [2, 80]), {
      14: $VJ,
      41: [1, 126]
    }, o($VK, [2, 83]), o($VK, [2, 84], {
      58: [1, 128]
    }), o($VL, [2, 86], {
      5: [1, 129]
    }), {
      10: $Vj,
      23: $VD,
      26: $Vk,
      40: $Vl,
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 92,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      71: 130,
      72: 90,
      73: 91,
      79: $Vf,
      80: $Vg
    }, o($VC, [2, 94]), {
      14: [1, 132],
      28: [1, 131]
    }, o($VI, [2, 97]), o($VI, [2, 98], {
      58: [1, 133]
    }), o($VM, [2, 101], {
      54: [1, 134]
    }), o($Vz, [2, 21]), o($Vz, [2, 22]), o($Vz, [2, 23]), o($Vz, [2, 24]), {
      14: [1, 135]
    }, {
      14: [1, 137],
      28: [1, 136]
    }, o($VI, [2, 60]), {
      14: [1, 139],
      28: [1, 138]
    }, o($VI, [2, 10]), o($Vz, [2, 25]), {
      14: [1, 141],
      24: [1, 140]
    }, o($VN, [2, 56]), o($VN, [2, 57]), {
      10: $V1,
      20: 142,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($VA, [2, 29]), o($VA, [2, 30]), o([1, 5, 14, 16, 24, 28, 31, 32, 33, 34, 38, 40, 41, 54, 58, 75], [2, 105]), {
      41: [1, 143]
    }, o($VA, [2, 41]), o($VA, [2, 43]), {
      7: 75,
      9: $V0,
      10: $V1,
      12: $V2,
      20: 74,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      51: 144,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($VA, [2, 49]), {
      7: 80,
      9: $V0,
      10: $V1,
      12: $V2,
      20: 79,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      53: 145,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, {
      8: 146,
      10: $V1,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($VO, [2, 7]), o($VO, [2, 8]), o($Vi, [2, 62]), o($VC, [2, 81]), {
      10: $Vj,
      23: $VD,
      26: $Vk,
      40: $Vl,
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 92,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      72: 147,
      73: 91,
      79: $Vf,
      80: $Vg
    }, {
      10: [1, 148]
    }, {
      39: 150,
      74: 149,
      75: $VP,
      80: $VG
    }, {
      14: $VJ,
      24: [1, 152]
    }, o($VC, [2, 95]), {
      10: $VE,
      77: 153,
      78: 97
    }, {
      10: [1, 154]
    }, {
      10: $Vj,
      26: $Vk,
      40: $Vl,
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 155,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      79: $Vf,
      80: $Vg
    }, {
      8: 156,
      10: $V1,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($Vy, [2, 18]), {
      10: $Vj,
      19: 157,
      26: $Vk,
      40: $Vl,
      43: $Vm,
      44: 48,
      45: 51,
      46: $Vn,
      57: 40,
      59: $Vo,
      60: $Vp,
      61: $Vq,
      62: $Vr,
      63: $Vs,
      64: $Vt,
      65: $Vu,
      66: $Vv,
      67: 53,
      68: 54,
      69: $Vw,
      70: $Vx,
      79: $Vf,
      80: $Vg
    }, o($Vy, [2, 19]), {
      8: 158,
      10: $V1,
      15: 8,
      17: 9,
      18: $V3,
      20: 11,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($Vz, [2, 26]), {
      10: $V1,
      20: 111,
      21: 12,
      22: $V4,
      23: $V5,
      25: $V6,
      26: $V7,
      29: $V8,
      30: 16,
      36: 18,
      37: 19,
      40: $V9,
      42: 20,
      43: $Va,
      44: 22,
      45: 23,
      46: $Vb,
      47: $Vc,
      48: 26,
      49: 27,
      55: 159,
      56: $VF,
      62: $Vd,
      63: $Ve,
      79: $Vf,
      80: $Vg
    }, o($VN, [2, 58]), o($VA, [2, 31]), o($VH, [2, 44]), o($VI, [2, 50]), o($VI, [2, 52]), o($VK, [2, 82]), o($VK, [2, 85]), o($VL, [2, 87]), o($VL, [2, 93], {
      75: [1, 160]
    }), {
      39: 161,
      80: $VG
    }, o($VL, [2, 88], {
      5: [1, 162]
    }), o($VI, [2, 96]), o($VI, [2, 99]), o($VM, [2, 100]), {
      24: [1, 163]
    }, o($VI, [2, 59]), o($VI, [2, 9]), o($VN, [2, 55]), o($VL, [2, 92], {
      39: 164,
      80: $VG
    }), o($VL, [2, 91]), {
      39: 150,
      74: 165,
      75: $VP,
      80: $VG
    }, o($Vy, [2, 17]), o($VL, [2, 90]), o($VL, [2, 89])],
    defaultActions: {},
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = {
        yy: {}
      };

      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }

      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;

      if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
      }

      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;

      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }

      _token_stack: var lex = function lex() {
        var token;
        token = lexer.lex() || EOF;

        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }

        return token;
      };

      var symbol,
          preErrorSymbol,
          state,
          action,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;

      while (true) {
        state = stack[stack.length - 1];

        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == 'undefined') {
            symbol = lex();
          }

          action = table[state] && table[state][symbol];
        }

        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];

          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }

          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }

          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }

        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }

        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;

            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }

            break;

          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };

            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }

            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

            if (typeof r !== 'undefined') {
              return r;
            }

            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }

            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;

          case 3:
            return true;
        }
      }

      return true;
    }
  };
  /* generated by jison-lex 0.3.4 */

  var lexer = function () {
    var lexer = {
      EOF: 1,
      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },
      // resets the lexer, sets new input
      setInput: function setInput(input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };

        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }

        this.offset = 0;
        return this;
      },
      // consumes and returns one char from the input
      input: function input() {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);

        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }

        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },
      // unshifts one char (or a string) into the input
      unput: function unput(ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);
        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }

        var r = this.yylloc.range;
        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }

        this.yyleng = this.yytext.length;
        return this;
      },
      // When called from action, caches matched text and appends it on next action
      more: function more() {
        this._more = true;
        return this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function reject() {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }

        return this;
      },
      // retain first n characters of the match
      less: function less(n) {
        this.unput(this.match.slice(n));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function pastInput() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function upcomingInput() {
        var next = this.match;

        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }

        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function showPosition() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function test_match(match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };

          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);

        if (lines) {
          this.yylineno += lines.length;
        }

        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;

        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }

        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);

        if (this.done && this._input) {
          this.done = false;
        }

        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }

          return false; // rule action called reject() implying the next rule should be tested instead.
        }

        return false;
      },
      // return next match in input
      next: function next() {
        if (this.done) {
          return this.EOF;
        }

        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;

        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }

        var rules = this._currentRules();

        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);

          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;

            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);

              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }

        if (match) {
          token = this.test_match(match, rules[index]);

          if (token !== false) {
            return token;
          } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


          return false;
        }

        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      },
      // return next match that has a token
      lex: function lex() {
        var r = this.next();

        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;

        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);

        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      },
      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },
      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

        switch ($avoiding_name_collisions) {
          case 0:
            /* skip whitespace */
            break;

          case 1:
            /* skip comment */
            break;

          case 2:
            return 59;
            break;

          case 3:
            return 60;
            break;

          case 4:
            return 58;
            break;

          case 5:
            return 61;
            break;

          case 6:
            return 12;
            break;

          case 7:
            return 70;
            break;

          case 8:
            return 63;
            break;

          case 9:
            return 9;
            break;

          case 10:
            return 22;
            break;

          case 11:
            return 25;
            break;

          case 12:
            return 43;
            break;

          case 13:
            return 64;
            break;

          case 14:
            return 65;
            break;

          case 15:
            return 29;
            break;

          case 16:
            return 66;
            break;

          case 17:
            return 62;
            break;

          case 18:
            return 46;
            break;

          case 19:
            return 80;
            break;

          case 20:
            return 79;
            break;

          case 21:
            return 23;
            break;

          case 22:
            return 24;
            break;

          case 23:
            return 26;
            break;

          case 24:
            return 28;
            break;

          case 25:
            return 40;
            break;

          case 26:
            return 41;
            break;

          case 27:
            return 16;
            break;

          case 28:
            return '|';
            break;

          case 29:
            return 14;
            break;

          case 30:
            return 54;
            break;

          case 31:
            return 5;
            break;

          case 32:
            return 18;
            break;

          case 33:
            return 11;
            break;

          case 34:
            return '<=';
            break;

          case 35:
            return 56;
            break;

          case 36:
            return 75;
            break;

          case 37:
            return 38;
            break;

          case 38:
            return '_';
            break;

          case 39:
            return 31;
            break;

          case 40:
            return 32;
            break;

          case 41:
            return 33;
            break;

          case 42:
            return 34;
            break;

          case 43:
            return 47;
            break;

          case 44:
            return 10;
            break;
        }
      },
      rules: [/^(?:\s+)/, /^(?:\/\/.*)/, /^(?:any\b)/, /^(?:array\b)/, /^(?:as\b)/, /^(?:boolean\b)/, /^(?:def\b)/, /^(?:enum\b)/, /^(?:false\b)/, /^(?:let\b)/, /^(?:map\b)/, /^(?:patterns\b)/, /^(?:null\b)/, /^(?:number\b)/, /^(?:object\b)/, /^(?:sequences\b)/, /^(?:string\b)/, /^(?:true\b)/, /^(?:undefined\b)/, /^(?:[-+]?(0|[1-9]\d*)(\.\d+)?)/, /^(?:"[^"\r\n]*")/, /^(?:\()/, /^(?:\))/, /^(?:{)/, /^(?:})/, /^(?:\[)/, /^(?:\])/, /^(?:\|>)/, /^(?:\|)/, /^(?:,)/, /^(?::)/, /^(?:;)/, /^(?:=~)/, /^(?:=)/, /^(?:<=)/, /^(?:\.{3})/, /^(?:\.{2})/, /^(?:\.)/, /^(?:_)/, /^(?:\+)/, /^(?:-)/, /^(?:\*)/, /^(?:\/)/, /^(?:\$)/, /^(?:[a-zA-Z_][a-zA-Z0-9_]*)/],
      conditions: {
        "INITIAL": {
          "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
          "inclusive": true
        }
      }
    };
    return lexer;
  }();

  parser.lexer = lexer;

  function Parser() {
    this.yy = {};
  }

  Parser.prototype = parser;
  parser.Parser = Parser;
  return new Parser();
}();

// General functions

/**
 * Return the type name of the specified item
 *
 * @param {*} item
 * @returns {string}
 */
function typeName(item) {
  switch (item) {
    case null:
      return "null";

    case undefined:
      return "undefined";

    default:
      if (Array.isArray(item)) {
        return "array";
      }

      return _typeof(item);
  }
} // Array related functions

/**
 * Return the length of an array
 *
 * @param {Array} list
 * @returns {number}
 */

function length(list) {
  /* eslint-disable-line no-shadow */
  return Array.isArray(list) ? list.length : 0;
}
/**
 * Combine multiple arrays into a single array
 *
 * @param {Array<Array>} lists
 * @param {*} [missing=undefined]
 * @returns {Array}
 */

function zip(lists) {
  var missing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var result = [];

  if (Array.isArray(lists) && lists.length > 0 && lists.every(function (l) {
    return Array.isArray(l);
  })) {
    var maxLength = Math.max.apply(Math, _toConsumableArray(lists.map(function (l) {
      return l.length;
    })));

    for (var i = 0; i < maxLength; i++) {
      var part = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var list = _step.value;
          part.push(i < list.length ? list[i] : missing);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      result.push(part);
    }
  }

  return result;
}
/**
 * Partition an array into multiple arrays
 *
 * @param {Array} items
 * @param {number} count
 * @param {number} advance
 * @param {*} [missing=undefined]
 */

function partition(items, count, advance) {
  var missing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  /* eslint-disable-next-line no-shadow */
  var length = items.length;
  var result = []; // default advance to count, if its not defined

  advance = advance === undefined ? count : advance; // we can't advance backwards and we always need to advance

  count = Math.max(1, count);
  advance = Math.max(1, advance);

  for (var i = 0; i < length; i += advance) {
    var part = [];
    var index = i;

    for (var j = 0; j < count; j++, index++) {
      part.push(index < length ? items[index] : missing);
    }

    result.push(part);
  }

  return result;
}
/**
 * Return a new array with the original array's content reversed
 *
 * @param {Array} items
 * @returns {Array|undefined}
 */

function reverse(items) {
  return Array.isArray(items) ? items.slice().reverse() : undefined;
}
/**
 * Return a new sorted array
 *
 * @param {Array} items
 * @param {Function} comparator
 * @returns {Array|undefined}
 */

function sort(items, comparator) {
  return Array.isArray(items) ? items.slice().sort(comparator) : undefined;
}
/**
 * Return a string by concatenating a list of strings, delimiting each with another string
 *
 * @param {Array<string>} items
 * @param {string} delimiter
 * @returns {string}
 */

function join(items, delimiter) {
  return items.join(delimiter);
} // Object related functions

/**
 * Predicate to determine if an item is an object
 *
 * @param {*} item
 * @returns {boolean}
 */

function isObject(item) {
  return item !== null && _typeof(item) === "object";
}
/**
 * Return a list of keys from an object
 *
 * @param {Object} item
 * @returns {string[]}
 */


function keys(item) {
  /* eslint-disable-next-line compat/compat */
  return isObject(item) ? Object.keys(item) : [];
}
/**
 * Return a list of values from an object
 *
 * @param {Object} item
 * @returns {any[]}
 */

function values(item) {
  /* eslint-disable-next-line compat/compat */
  return isObject(item) ? Object.values(item) : [];
}
/**
 * Return a list of key/value pairs from an object. Each element in the result is a 2-element array
 * where the first element is the key and the second element is the value
 *
 * @param {Object} item
 * @returns {Array<Array>}
 */

function pairs(item) {
  /* eslint-disable-next-line compat/compat */
  return isObject(item) ? Object.entries(item) : [];
}
/**
 * Convert a list of key/value pairs into an object. This is the reverse of pairs
 *
 * @param {Array<Array>} pairs
 * @returns {Object}
 */

function fromPairs(pairs) {
  /* eslint-disable-line no-shadow */
  var result = {};

  if (Array.isArray(pairs)) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = pairs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var pair = _step2.value;

        if (pair.length >= 2) {
          var _pair = _slicedToArray(pair, 2),
              key = _pair[0],
              value = _pair[1];

          result[key] = value;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return result;
} // Array and Object related

/**
 * If all items are objects, a new object with all the properties of all objects will be merged. If the same property
 * exists on multiple objects, the last object with that property wins.
 *
 * If the first item is an array, a new array will be created by appending all non-array items and concatenating all
 * array items.
 *
 * @param {Object|Array} items
 * @returns {Object|Array|undefined}
 */

function merge() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  if (items.length > 0 && Array.isArray(items[0])) {
    var _items$;

    return (_items$ = items[0]).concat.apply(_items$, _toConsumableArray(items.slice(1)));
  } else if (items.every(function (item) {
    return isObject(item);
  })) {
    return Object.assign.apply(Object, [{}].concat(items));
  }

  return undefined;
}

var StdLib = /*#__PURE__*/Object.freeze({
  typeName: typeName,
  length: length,
  zip: zip,
  partition: partition,
  reverse: reverse,
  sort: sort,
  join: join,
  keys: keys,
  values: values,
  pairs: pairs,
  fromPairs: fromPairs,
  merge: merge
});

var FAILURE_VALUE = {};
/**
 * Determine if object is something that can have properties
 *
 * @param {*} obj
 * @returns {boolean}
 */

function isObject$1(obj) {
  return obj !== null && _typeof(obj) === "object";
}
/**
 * Transformer
 */


var Transformer =
/*#__PURE__*/
function () {
  /**
   * Create a new empty Transformer. Normalizers can be used to validate and transform data. However, when a new
   * Transformer has been created, it needs to be populated with one or more type descriptions. The easiest way to do
   * this is with the static method fromSource.
   */
  function Transformer() {
    _classCallCheck(this, Transformer);

    this.symbolTable = {};
    this.functions = {};
    this.messages = [];
    this.verbose = false; // add standard library

    /* eslint-disable-next-line guard-for-in */

    for (var name in StdLib) {
      /* eslint-disable-next-line import/namespace */
      this.functions[name] = StdLib[name];
    }
  }
  /**
   * Add function
   *
   * @param {string} name
   * @param {Function} reference
   */


  _createClass(Transformer, [{
    key: "addFunction",
    value: function addFunction(name, reference) {
      // TODO: type check
      this.functions[name] = reference;
    }
    /**
     * Add information
     *
     * @param {string} message
     */

  }, {
    key: "addInfo",
    value: function addInfo(message) {
      if (this.verbose) {
        this.messages.push({
          type: "message",
          level: "info",
          message: message
        });
      }
    }
    /**
     * Add a warning
     *
     * @param {string} message
     */

  }, {
    key: "addWarning",
    value: function addWarning(message) {
      this.messages.push({
        type: "message",
        level: "warning",
        message: message
      });
    }
    /**
     * Add an error
     *
     * @param {string} message
     */

  }, {
    key: "addError",
    value: function addError(message) {
      this.messages.push({
        type: "message",
        level: "error",
        message: message
      });
    }
    /**
     * Compile and execute the source against the specfied structure
     *
     * @param {string} source
     * @param {*} structure
     * @returns {*}
     */

  }, {
    key: "execute",
    value: function execute(source, structure) {
      // TODO: cache results using source or source hash as key
      // parse source
      var statements = parser.parse(source); // clear any previous messages

      this.messages = []; // process statements

      var result;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var statement = _step.value;

          switch (statement.type) {
            case "assignment":
            case "def":
            case "sequence":
              {
                result = this.executeExpression(statement, structure, this.symbolTable);
                break;
              }

            default:
              this.addError("unknown statement type: ".concat(statement.type));
              return FAILURE_VALUE;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    }
    /*
     * Execute a method and return its value
     *
     * @param {object} expression
     * @param {object} symbolTable
     * @returns {*}
     */

  }, {
    key: "executeExpression",
    value: function executeExpression(expression, structure, symbolTable) {
      var _this = this;

      var getNumbers = function getNumbers(operation) {
        var left = _this.executeExpression(expression.left, structure, symbolTable);

        if (left !== FAILURE_VALUE && typeof left === "number") {
          var right = _this.executeExpression(expression.right, structure, symbolTable);

          if (right !== FAILURE_VALUE && typeof right === "number") {
            return operation(left, right);
          }
        }

        return FAILURE_VALUE;
      };

      switch (expression.type) {
        case "assignment":
          {
            var value = this.executeExpression(expression.value, structure, symbolTable);

            if (value === FAILURE_VALUE) {
              this.addError("Unable to evaluate assignment value for ".concat(expression.name));
              return FAILURE_VALUE;
            }

            symbolTable[expression.name] = value;
            return value;
          }

        case "def":
          symbolTable[expression.name] = expression.value;
          return undefined;

        case "get-value":
          if (expression.name in symbolTable) {
            var _value = symbolTable[expression.name];

            if (isObject$1(_value) && _value.type === "sequence") {
              var seqValue = this.executeExpression(_value, structure, symbolTable);

              if (seqValue === FAILURE_VALUE) {
                this.addError("Unable to evaluate sequence ".concat(expression.name));
                return FAILURE_VALUE;
              }

              return seqValue;
            }

            return _value;
          } else if (expression.name in this.functions) {
            return this.invokeFunction(expression.name, [structure]);
          }

          this.addError("Tried to access unbound symbol: ".concat(expression.name));
          return FAILURE_VALUE;

        case "get-property":
          {
            var object = this.executeExpression(expression.left, structure, symbolTable);
            return isObject$1(object) ? object[expression.right] : FAILURE_VALUE;
          }

        case "get-index":
          {
            var left = expression.left,
                right = expression.right;
            var array = this.executeExpression(left, structure, symbolTable);

            if (Array.isArray(array)) {
              var index = right < 0 ? array.length + right : right;
              return 0 <= index && index < array.length ? array[index] : FAILURE_VALUE;
            }

            return FAILURE_VALUE;
          }

        case "get-structure":
          return structure;

        case "sequences":
          {
            var result = FAILURE_VALUE;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = expression.sequences[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var sequence = _step2.value;
                var sequenceSymbolTable = Object.create(symbolTable);
                result = this.executeExpression(sequence, structure, sequenceSymbolTable);

                if (result !== FAILURE_VALUE) {
                  Object.assign(symbolTable, sequenceSymbolTable);
                  break;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            return result;
          }

        case "sequence":
          {
            var currentObject = structure;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = expression.steps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var step = _step3.value;

                if (step.type === "pattern") {
                  currentObject = this.executePattern(step, currentObject, symbolTable);
                } else {
                  currentObject = this.executeExpression(step, currentObject, symbolTable);
                }

                if (currentObject === FAILURE_VALUE) {
                  return FAILURE_VALUE;
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            return currentObject;
          }

        case "add":
          return getNumbers(function (a, b) {
            return a + b;
          });

        case "map":
          {
            var _expression$value = _slicedToArray(expression.value, 2),
                valueGenerator = _expression$value[0],
                transform = _expression$value[1];

            var values = this.executeExpression(valueGenerator, structure, symbolTable);

            if (values !== FAILURE_VALUE) {
              if (Array.isArray(values) === false) {
                this.addError("First argument of map must evaluate to an array");
                return FAILURE_VALUE;
              }

              var mapSymbolTable = Object.create(symbolTable);
              return values.map(function (value) {
                return _this.executeExpression(transform, value, mapSymbolTable);
              });
            }

            return FAILURE_VALUE;
          }

        case "patterns":
          {
            var _result = FAILURE_VALUE;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = expression.patterns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var pattern = _step4.value;
                var patternSymbolTable = Object.create(symbolTable);
                _result = this.executePattern(pattern, structure, patternSymbolTable);

                if (_result !== FAILURE_VALUE) {
                  Object.assign(symbolTable, patternSymbolTable);
                  break;
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            return _result;
          }

        case "subtract":
          return getNumbers(function (a, b) {
            return a - b;
          });

        case "multiply":
          return getNumbers(function (a, b) {
            return a * b;
          });

        case "divide":
          return getNumbers(function (a, b) {
            return a / b;
          });

        case "invoke":
          {
            var args = expression.args.reduce(function (accum, arg) {
              if (arg.type === "spread") {
                var _value2 = _this.executeExpression(arg.expression, structure, symbolTable); // const value = arg.name !== null ? symbolTable[arg.name] : structure;


                if (Array.isArray(_value2)) {
                  accum = accum.concat(_value2);
                } else {
                  accum.push(_value2);
                }
              } else {
                accum.push(_this.executeExpression(arg, structure, symbolTable));
              }

              return accum;
            }, []);

            if (expression.name in this.functions) {
              return this.invokeFunction(expression.name, args);
            }

            this.addError("Tried to access unbound symbol: ".concat(expression.name));
            return FAILURE_VALUE;
          }

        case "array":
          {
            var results = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = expression.value[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var element = _step5.value;

                if (element.type === "assignment") {
                  this.executeExpression(element, structure, symbolTable);
                } else {
                  var _value3 = this.executeExpression(element, structure, symbolTable);

                  if (_value3 === FAILURE_VALUE) {
                    return FAILURE_VALUE;
                  }

                  results.push(_value3);
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                  _iterator5["return"]();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }

            return results;
          }

        case "boolean":
        case "null":
        case "number":
        case "string":
        case "undefined":
          return expression.value;

        case "object":
          return this.executeObjectExpression(expression, structure, symbolTable);

        default:
          this.addError("Unrecognized expression type: '".concat(expression.type, "'"));
          return FAILURE_VALUE;
      }
    }
    /**
     * Execute an object pattern
     *
     * @param {Object} pattern
     * @param {*} structure
     * @param {Object} symbolTable
     * @returns {*}
     */

  }, {
    key: "executeObjectExpression",
    value: function executeObjectExpression(pattern, structure, symbolTable) {
      var objectSymbolTable = Object.create(symbolTable);
      var result = {};
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = pattern.value[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var element = _step6.value;

          switch (element.type) {
            case "property":
              {
                var name = this.executeExpression(element.name, structure, objectSymbolTable);

                if (name === FAILURE_VALUE) {
                  return FAILURE_VALUE;
                } else if (typeof name !== "string") {
                  this.addError("Property names must be string types: ".concat(name));
                  return FAILURE_VALUE;
                }

                var value = element.value !== null ? this.executeExpression(element.value, structure, objectSymbolTable) : symbolTable[name];

                if (value === FAILURE_VALUE) {
                  this.addError("Unable to evaluate value for property ".concat(name));
                  return FAILURE_VALUE;
                }

                result[name] = value;
                break;
              }

            case "assignment":
              {
                var _value4 = this.executeExpression(element, structure, objectSymbolTable);

                if (_value4 === FAILURE_VALUE) {
                  return FAILURE_VALUE;
                }

                break;
              }

            default:
              this.addError("Unrecognized object expression element type: ".concat(element.type));
              return FAILURE_VALUE;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return result;
    }
    /*
     * Acquire the value of a type pattern from the specified structure. Any named entities will be populated in the
     * specified symbolTable
     *
     * @param {object} pattern
     * @param {*} structure
     * @param {object} symbolTable
     * @returns {*}
     */

  }, {
    key: "executePattern",
    value: function executePattern(pattern, structure, symbolTable) {
      switch (pattern.patternType) {
        case "any":
          this.assign(symbolTable, pattern.assignTo, structure);
          return structure;

        case "array":
          if (Array.isArray(structure)) {
            this.assign(symbolTable, pattern.assignTo, structure);
            return structure;
          }

          return FAILURE_VALUE;

        case "array-pattern":
          {
            var result = this.executeArrayPattern(pattern, structure, symbolTable);
            return result === FAILURE_VALUE ? FAILURE_VALUE : symbolTable;
          }

        case "boolean":
          if (typeof structure === "boolean") {
            if (pattern.value === null || pattern.value === structure) {
              this.assign(symbolTable, pattern.assignTo, structure);
              return structure;
            }
          }

          return FAILURE_VALUE;

        case "null":
          if (structure === null) {
            this.assign(symbolTable, pattern.assignTo, structure);
            return structure;
          }

          return FAILURE_VALUE;

        case "number":
          if (typeof structure === "number") {
            if (pattern.value === null || pattern.value === structure) {
              this.assign(symbolTable, pattern.assignTo, structure);
              return structure;
            }
          }

          return FAILURE_VALUE;

        case "object":
          if (isObject$1(structure)) {
            this.assign(symbolTable, pattern.assignTo, structure);
            return structure;
          }

          return FAILURE_VALUE;

        case "object-pattern":
          {
            if (isObject$1(structure) === false) {
              return FAILURE_VALUE;
            }

            var _result2 = {};
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = pattern.value[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var property = _step7.value;
                var name = property.name,
                    propertyPattern = property.pattern,
                    assignTo = property.assignTo;

                if (name in structure) {
                  var value = this.executePattern(propertyPattern, structure[name], symbolTable);

                  if (value === FAILURE_VALUE) {
                    return FAILURE_VALUE;
                  }

                  this.assign(symbolTable, assignTo, structure[name]);
                  this.assign(_result2, assignTo, value);
                } else {
                  return FAILURE_VALUE;
                }
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                  _iterator7["return"]();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }

            this.assign(symbolTable, pattern.assignTo, structure);
            return _result2;
          }

        case "reference":
          if (pattern.value in this.patterns) {
            var referencedPattern = this.patterns[pattern.value];

            var _result3 = this.executePattern(referencedPattern, structure, symbolTable);

            if (_result3 !== FAILURE_VALUE) {
              this.assign(symbolTable, pattern.assignTo, _result3);
            }

            return _result3;
          }

          return FAILURE_VALUE;

        case "string":
          if (typeof structure === "string") {
            if (pattern.value === null || pattern.value === structure) {
              this.assign(symbolTable, pattern.assignTo, structure);
              return structure;
            }
          }

          return FAILURE_VALUE;

        case "undefined":
          // NOTE: Our current failure value is undefined, so this will be treated as an error. I can change
          // FAILURE_VALUE to be a sigil. I'll just have to be careful to return undefined at the top-most level.
          // I'm leaving this for now as this is probably not going to be used much
          if (structure === undefined) {
            this.assign(symbolTable, pattern.assignTo, structure);
            return structure;
          }

          return FAILURE_VALUE;

        default:
          throw new TypeError("unrecognized pattern type: '".concat(pattern.type, "'"));
      }
    }
    /*
     * Execute an array pattern
     *
     * @param {Object} pattern
     * @param {*} structure
     * @param {Object} symbolTable
     * @returns {*}
     */

  }, {
    key: "executeArrayPattern",
    value: function executeArrayPattern(pattern, structure, symbolTable) {
      if (Array.isArray(structure) === false) {
        return FAILURE_VALUE;
      }

      var result = [];
      var index = 0;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = pattern.value[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var element = _step8.value;
          var results = this.executeArrayPatternElement(element, index, structure, symbolTable);

          if (results === FAILURE_VALUE) {
            return FAILURE_VALUE;
          }

          result = result.concat(results);
          index += results.length;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      if (index === structure.length) {
        this.assign(symbolTable, pattern.assignTo, structure);
        return result;
      }

      return FAILURE_VALUE;
    }
    /*
     * Execute an element from an array pattern
     *
     * @param {Object} element
     * @param {number} index
     * @param {*} structure
     * @param {Object} symbolTable
     * @returns {Array|undefined}
     */

  }, {
    key: "executeArrayPatternElement",
    value: function executeArrayPatternElement(element, index, structure, symbolTable) {
      var result = [];

      switch (element.type) {
        case "element":
          {
            var results = this.executeArrayElementPattern(element, index, structure, symbolTable);

            if (results === FAILURE_VALUE) {
              return FAILURE_VALUE;
            }

            result = result.concat(results);
            index += results.length;
            break;
          }

        case "element-group":
          {
            var _results = this.executeArrayElementGroupPattern(element, index, structure, symbolTable);

            if (_results === FAILURE_VALUE) {
              return FAILURE_VALUE;
            }

            result = result.concat(_results);
            index += _results.length;
            break;
          }

        default:
          this.addError("Unrecognized array pattern element type: '".concat(element.type, "'"));
          return FAILURE_VALUE;
      }

      return result;
    }
    /*
     * Execute array element pattern
     *
     * @param {Object} element
     * @param {number} index
     * @param {*} structure
     * @param {Object} symbolTable
     * @returns {Array|undefined}
     */

  }, {
    key: "executeArrayElementPattern",
    value: function executeArrayElementPattern(element, index, structure, symbolTable) {
      var pattern = element.pattern,
          _element$range = element.range,
          start = _element$range.start,
          stop = _element$range.stop;
      var result = [];

      for (var i = 0; i < stop; i++) {
        var actualIndex = index + i; // treat out-of-bounds like a failure

        var value = actualIndex < structure.length ? this.executePattern(pattern, structure[actualIndex], symbolTable) : FAILURE_VALUE; // if we processed enough, continue, else failure

        if (value === FAILURE_VALUE) {
          if (i >= start) {
            break;
          }

          return FAILURE_VALUE;
        } // save result


        if (stop > 1) {
          this.pushAssign(symbolTable, element.assignTo, value);
        } else {
          this.assign(symbolTable, element.assignTo, value);
        }

        result.push(value);
      }

      return result;
    }
    /*
     * Execute array element group pattern
     *
     * @param {Object} element
     * @param {number} index
     * @param {*} structure
     * @param {Object} symbolTable
     * @returns {Array|undefined}
     */

  }, {
    key: "executeArrayElementGroupPattern",
    value: function executeArrayElementGroupPattern(group, index, structure, symbolTable) {
      var elements = group.elements,
          _group$range = group.range,
          start = _group$range.start,
          stop = _group$range.stop;
      var result = [];

      for (var i = 0; i < stop; i++) {
        var groupResults = []; // all elements must be successful

        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = elements[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _element = _step9.value;
            var elementSymbolTable = Object.create(symbolTable);
            var results = this.executeArrayPatternElement(_element, index, structure, elementSymbolTable);

            if (results === FAILURE_VALUE) {
              groupResults = FAILURE_VALUE;
              break;
            } // copy result into main symbol table


            if (_element.assignTo !== null && _element.assignTo !== undefined && _element.assignTo in elementSymbolTable) {
              if (stop > 1) {
                // this.pushAssign(symbolTable, element.assignTo, results);
                this.pushAssign(symbolTable, _element.assignTo, elementSymbolTable[_element.assignTo]);
              } else {
                // this.assign(symbolTable, element.assignTo, results);
                this.assign(symbolTable, _element.assignTo, elementSymbolTable[_element.assignTo]);
              }
            } // collect everything that matched and advance to the next item to match


            result = result.concat(results);
            index += results.length; // collect what we've matched in this group so far

            groupResults = groupResults.concat(results);
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        if (groupResults === FAILURE_VALUE) {
          // make sure we met our lower bounds criteria
          if (i >= start) {
            // if we didn't process any elements, then we haven't created arrays in the symbol table for this
            // group or its elements.
            if (i === 0) {
              this.assign(symbolTable, group.assignTo, []);
              var _iteratorNormalCompletion10 = true;
              var _didIteratorError10 = false;
              var _iteratorError10 = undefined;

              try {
                for (var _iterator10 = elements[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                  var element = _step10.value;
                  this.assign(symbolTable, element.assignTo, []);
                }
              } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                    _iterator10["return"]();
                  }
                } finally {
                  if (_didIteratorError10) {
                    throw _iteratorError10;
                  }
                }
              }
            }

            return result;
          }

          return FAILURE_VALUE;
        }

        if (stop > 1) {
          this.pushAssign(symbolTable, group.assignTo, groupResults);
        } else {
          this.assign(symbolTable, group.assignTo, groupResults);
        }
      }

      return result;
    }
    /*
     * Invoke a user-defined method and return its value
     *
     * @param {string} type
     * @param {Array} args
     * @returns {*}
     */

  }, {
    key: "invokeFunction",
    value: function invokeFunction(type, args) {
      if (type in this.functions) {
        var _this$functions;

        return (_this$functions = this.functions)[type].apply(_this$functions, _toConsumableArray(args));
      }

      return FAILURE_VALUE;
    }
    /**
     * Add a symbol/value to the symbol table, warning if an overwrite is occurring
     *
     * @param {Object} symbolTable
     * @param {string} name
     * @param {*} value
     */

  }, {
    key: "assign",
    value: function assign(symbolTable, name, value) {
      if (name !== null && name !== undefined) {
        /* eslint-disable-next-line no-prototype-builtins */
        if (symbolTable.hasOwnProperty(name)) {
          this.addWarning("Overwriting ".concat(name, " with value: ").concat(value));
        }

        symbolTable[name] = value;
      }
    }
    /**
     * Push a value onto the array at the name in the symbol table. If the name is not in the table already, an array will
     * be created and then the value will be pushed to it. This is used for grouped elements.
     *
     * @param {Object} symbolTable
     * @param {string} name
     * @param {*} value
     */

  }, {
    key: "pushAssign",
    value: function pushAssign(symbolTable, name, value) {
      if (name !== null && name !== undefined) {
        /* eslint-disable-next-line no-prototype-builtins */
        var items = symbolTable.hasOwnProperty(name) ? symbolTable[name] : [];

        if (Array.isArray(items)) {
          items.push(value);
          symbolTable[name] = items;
        } else {
          this.addWarning("Unable to push to ".concat(name, " because it is not an array: ").concat(items));
        }
      }
    }
  }]);

  return Transformer;
}();

/**
 * @module gp-data-transformer
 */

/**
 *  PathLexeme.js
 *
 *  @copyright 2002, 2013 Kevin Lindsey
 *  @module PathLexeme
 */

/**
 *  PathLexeme
 */
var PathLexeme =
/*#__PURE__*/
function () {
  /**
   *  PathLexeme
   *
   *  @param {number} type
   *  @param {string} text
   */
  function PathLexeme(type, text) {
    _classCallCheck(this, PathLexeme);

    this.type = type;
    this.text = text;
  }
  /**
   *  Determine if this lexeme is of the given type
   *
   *  @param {number} type
   *  @returns {boolean}
   */


  _createClass(PathLexeme, [{
    key: "typeis",
    value: function typeis(type) {
      return this.type === type;
    }
  }]);

  return PathLexeme;
}();
/*
 * token type enumerations
 */


PathLexeme.UNDEFINED = 0;
PathLexeme.COMMAND = 1;
PathLexeme.NUMBER = 2;
PathLexeme.EOD = 3;

/**
 *  Create a new instance of PathLexer
 */

var PathLexer =
/*#__PURE__*/
function () {
  /**
   *  @param {string} [pathData]
   */
  function PathLexer(pathData) {
    _classCallCheck(this, PathLexer);

    if (pathData === null || pathData === undefined) {
      pathData = "";
    }

    this.setPathData(pathData);
  }
  /**
   *  setPathData
   *
   *  @param {string} pathData
   */


  _createClass(PathLexer, [{
    key: "setPathData",
    value: function setPathData(pathData) {
      if (typeof pathData !== "string") {
        throw new TypeError("The first parameter must be a string");
      }

      this._pathData = pathData;
    }
    /**
     *  getNextToken
     *
     *  @returns {PathLexeme}
     */

  }, {
    key: "getNextToken",
    value: function getNextToken() {
      var result = null;
      var d = this._pathData;

      while (result === null) {
        if (d === null || d === "") {
          result = new PathLexeme(PathLexeme.EOD, "");
        } else if (d.match(/^([ \t\r\n,]+)/)) {
          d = d.substr(RegExp.$1.length);
        } else if (d.match(/^([AaCcHhLlMmQqSsTtVvZz])/)) {
          result = new PathLexeme(PathLexeme.COMMAND, RegExp.$1);
          d = d.substr(RegExp.$1.length);
        }
        /* eslint-disable-next-line unicorn/no-unsafe-regex */
        else if (d.match(/^(([-+]?\d+(\.\d*)?|[-+]?\.\d+)([eE][-+]?\d+)?)/)) {
            result = new PathLexeme(PathLexeme.NUMBER, RegExp.$1);
            d = d.substr(RegExp.$1.length);
          } else {
            throw new SyntaxError("Unrecognized path data: ".concat(d));
          }
      }

      this._pathData = d;
      return result;
    }
  }]);

  return PathLexer;
}();

var BOP = "BOP";
/**
 *  PathParser
 */

var PathParser =
/*#__PURE__*/
function () {
  /**
   * constructor
   */
  function PathParser() {
    _classCallCheck(this, PathParser);

    this._lexer = new PathLexer();
    this._handler = null;
  }
  /**
   *  parseData
   *
   *  @param {string} pathData
   *  @throws {Error}
   */


  _createClass(PathParser, [{
    key: "parseData",
    value: function parseData(pathData) {
      if (typeof pathData !== "string") {
        throw new TypeError("The first parameter must be a string: ".concat(pathData));
      } // begin parse


      if (this._handler !== null && typeof this._handler.beginParse === "function") {
        this._handler.beginParse();
      } // pass the pathData to the lexer


      var lexer = this._lexer;
      lexer.setPathData(pathData); // set mode to signify new path - Beginning Of Path

      var mode = BOP; // Process all tokens

      var lastToken = null;
      var token = lexer.getNextToken();

      while (token.typeis(PathLexeme.EOD) === false) {
        var parameterCount = void 0;
        var params = []; // process current token

        switch (token.type) {
          case PathLexeme.COMMAND:
            if (mode === BOP && token.text !== "M" && token.text !== "m") {
              throw new SyntaxError("New paths must begin with a moveto command. Found '".concat(token.text, "'"));
            } // Set new parsing mode


            mode = token.text; // Get count of numbers that must follow this command

            parameterCount = PathParser.PARAMCOUNT[token.text.toUpperCase()]; // Advance past command token

            token = lexer.getNextToken();
            break;

          case PathLexeme.NUMBER:
            // Most commands allow you to keep repeating parameters
            // without specifying the command again.  We just assume
            // that is the case and do nothing since the mode remains
            // the same
            if (mode === BOP) {
              throw new SyntaxError("New paths must begin with a moveto command. Found '".concat(token.text, "'"));
            } else {
              parameterCount = PathParser.PARAMCOUNT[mode.toUpperCase()];
            }

            break;

          default:
            throw new SyntaxError("Unrecognized command type: ".concat(token.type));
        } // Get parameters


        for (var i = 0; i < parameterCount; i++) {
          switch (token.type) {
            case PathLexeme.COMMAND:
              throw new SyntaxError("Parameter must be a number. Found '".concat(token.text, "'"));

            case PathLexeme.NUMBER:
              // convert current parameter to a float and add to
              // parameter list
              params[i] = parseFloat(token.text);
              break;

            case PathLexeme.EOD:
              throw new SyntaxError("Unexpected end of string");

            default:
              throw new SyntaxError("Unrecognized parameter type. Found type '".concat(token.type, "'"));
          }

          token = lexer.getNextToken();
        } // fire handler


        if (this._handler !== null) {
          var handler = this._handler;
          var methodName = PathParser.METHODNAME[mode]; // convert types for arcs

          if (mode === "a" || mode === "A") {
            params[3] = params[3] !== 0;
            params[4] = params[4] !== 0;
          }

          if (handler !== null && typeof handler[methodName] === "function") {
            handler[methodName].apply(handler, params);
          }
        } // Lineto's follow moveto when no command follows moveto params.  Go
        // ahead and set the mode just in case no command follows the moveto
        // command


        switch (mode) {
          case "M":
            mode = "L";
            break;

          case "m":
            mode = "l";
            break;

          case "Z":
          case "z":
            mode = "BOP";
            break;

          default: // ignore for now

        }

        if (token === lastToken) {
          throw new SyntaxError("Parser stalled on '".concat(token.text, "'"));
        } else {
          lastToken = token;
        }
      } // end parse


      if (this._handler !== null && typeof this._handler.endParse === "function") {
        this._handler.endParse();
      }
    }
    /**
     *  setHandler
     *
     *  @param {Object} handler
     */

  }, {
    key: "setHandler",
    value: function setHandler(handler) {
      this._handler = handler;
    }
  }]);

  return PathParser;
}();
/*
 * class constants
 */


PathParser.PARAMCOUNT = {
  A: 7,
  C: 6,
  H: 1,
  L: 2,
  M: 2,
  Q: 4,
  S: 4,
  T: 2,
  V: 1,
  Z: 0
};
PathParser.METHODNAME = {
  A: "arcAbs",
  a: "arcRel",
  C: "curvetoCubicAbs",
  c: "curvetoCubicRel",
  H: "linetoHorizontalAbs",
  h: "linetoHorizontalRel",
  L: "linetoAbs",
  l: "linetoRel",
  M: "movetoAbs",
  m: "movetoRel",
  Q: "curvetoQuadraticAbs",
  q: "curvetoQuadraticRel",
  S: "curvetoCubicSmoothAbs",
  s: "curvetoCubicSmoothRel",
  T: "curvetoQuadraticSmoothAbs",
  t: "curvetoQuadraticSmoothRel",
  V: "linetoVerticalAbs",
  v: "linetoVerticalRel",
  Z: "closePath",
  z: "closePath"
};

/**
 *  @module kld-path-parser
 */

var TWO_PI = 2.0 * Math.PI;
/**
 * normalizeAngle
 *
 * @param {number} radians
 * @returns {number}
 */

function normalizeAngle(radians) {
  var normal = radians % TWO_PI;
  return normal < 0.0 ? normal + TWO_PI : normal;
}
/**
 * Based on the SVG 1.1 specification, Appendix F: Implementation Requirements,
 * Section F.6 "Elliptical arc implementation notes"
 * {@see https://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes}
 *
 * @param {module:kld-affine.Point2D} startPoint
 * @param {module:kld-affine.Point2D} endPoint
 * @param {number} rx
 * @param {number} ry
 * @param {number} angle
 * @param {boolean} arcFlag
 * @param {boolean} sweepFlag
 * @returns {Array}
 */


function getArcParameters(startPoint, endPoint, rx, ry, angle, arcFlag, sweepFlag) {
  angle = angle * Math.PI / 180;
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var TOLERANCE = 1e-6; // Section (F.6.5.1)

  var halfDiff = startPoint.subtract(endPoint).multiply(0.5);
  var x1p = halfDiff.x * c + halfDiff.y * s;
  var y1p = halfDiff.x * -s + halfDiff.y * c; // Section (F.6.6.1)

  rx = Math.abs(rx);
  ry = Math.abs(ry); // Section (F.6.6.2)

  var x1px1p = x1p * x1p;
  var y1py1p = y1p * y1p;
  var lambda = x1px1p / (rx * rx) + y1py1p / (ry * ry); // Section (F.6.6.3)

  if (lambda > 1) {
    var _factor = Math.sqrt(lambda);

    rx *= _factor;
    ry *= _factor;
  } // Section (F.6.5.2)


  var rxrx = rx * rx;
  var ryry = ry * ry;
  var rxy1 = rxrx * y1py1p;
  var ryx1 = ryry * x1px1p;
  var factor = (rxrx * ryry - rxy1 - ryx1) / (rxy1 + ryx1);

  if (Math.abs(factor) < TOLERANCE) {
    factor = 0;
  }

  var sq = Math.sqrt(factor);

  if (arcFlag === sweepFlag) {
    sq = -sq;
  } // Section (F.6.5.3)


  var mid = startPoint.add(endPoint).multiply(0.5);
  var cxp = sq * rx * y1p / ry;
  var cyp = sq * -ry * x1p / rx; // Section (F.6.5.5 - F.6.5.6)

  var xcr1 = (x1p - cxp) / rx;
  var xcr2 = (x1p + cxp) / rx;
  var ycr1 = (y1p - cyp) / ry;
  var ycr2 = (y1p + cyp) / ry;
  var theta1 = new Vector2D(1, 0).angleBetween(new Vector2D(xcr1, ycr1));
  var deltaTheta = normalizeAngle(new Vector2D(xcr1, ycr1).angleBetween(new Vector2D(-xcr2, -ycr2)));

  if (sweepFlag === false) {
    deltaTheta -= TWO_PI;
  }

  return [cxp * c - cyp * s + mid.x, cxp * s + cyp * c + mid.y, rx, ry, theta1, theta1 + deltaTheta];
}
/**
 *  PathHandler
 */


var PathHandler =
/*#__PURE__*/
function () {
  /**
   * PathHandler
   *
   * @param {ShapeInfo} shapeCreator
   */
  function PathHandler(shapeCreator) {
    _classCallCheck(this, PathHandler);

    this.shapeCreator = shapeCreator;
    this.shapes = [];
    this.firstX = null;
    this.firstY = null;
    this.lastX = null;
    this.lastY = null;
    this.lastCommand = null;
  }
  /**
   * beginParse
   */


  _createClass(PathHandler, [{
    key: "beginParse",
    value: function beginParse() {
      // zero out the sub-path array
      this.shapes = []; // clear firstX, firstY, lastX, and lastY

      this.firstX = null;
      this.firstY = null;
      this.lastX = null;
      this.lastY = null; // need to remember last command type to determine how to handle the
      // relative Bezier commands

      this.lastCommand = null;
    }
    /**
     *  addShape
     *
     *  @param {ShapeInfo} shape
     */

  }, {
    key: "addShape",
    value: function addShape(shape) {
      this.shapes.push(shape);
    }
    /**
     *  arcAbs - A
     *
     *  @param {number} rx
     *  @param {number} ry
     *  @param {number} xAxisRotation
     *  @param {boolean} arcFlag
     *  @param {boolean} sweepFlag
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "arcAbs",
    value: function arcAbs(rx, ry, xAxisRotation, arcFlag, sweepFlag, x, y) {
      if (rx === 0 || ry === 0) {
        this.addShape(this.shapeCreator.line(this.lastX, this.lastY, x, y));
      } else {
        var _this$shapeCreator;

        var arcParameters = getArcParameters(new Point2D(this.lastX, this.lastY), new Point2D(x, y), rx, ry, xAxisRotation, arcFlag, sweepFlag);
        this.addShape((_this$shapeCreator = this.shapeCreator).arc.apply(_this$shapeCreator, _toConsumableArray(arcParameters)));
      }

      this.lastCommand = "A";
      this.lastX = x;
      this.lastY = y;
    }
    /**
     *  arcRel - a
     *
     *  @param {number} rx
     *  @param {number} ry
     *  @param {number} xAxisRotation
     *  @param {boolean} arcFlag
     *  @param {boolean} sweepFlag
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "arcRel",
    value: function arcRel(rx, ry, xAxisRotation, arcFlag, sweepFlag, x, y) {
      if (rx === 0 || ry === 0) {
        this.addShape(this.shapeCreator.line(this.lastX, this.lastY, this.lastX + x, this.lastY + y));
      } else {
        var _this$shapeCreator2;

        var arcParameters = getArcParameters(new Point2D(this.lastX, this.lastY), new Point2D(this.lastX + x, this.lastY + y), rx, ry, xAxisRotation, arcFlag, sweepFlag);
        this.addShape((_this$shapeCreator2 = this.shapeCreator).arc.apply(_this$shapeCreator2, _toConsumableArray(arcParameters)));
      }

      this.lastCommand = "a";
      this.lastX += x;
      this.lastY += y;
    }
    /**
     *  curvetoCubicAbs - C
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoCubicAbs",
    value: function curvetoCubicAbs(x1, y1, x2, y2, x, y) {
      this.addShape(this.shapeCreator.cubicBezier(this.lastX, this.lastY, x1, y1, x2, y2, x, y));
      this.lastX = x;
      this.lastY = y;
      this.lastCommand = "C";
    }
    /**
     *  curvetoCubicRel - c
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoCubicRel",
    value: function curvetoCubicRel(x1, y1, x2, y2, x, y) {
      this.addShape(this.shapeCreator.cubicBezier(this.lastX, this.lastY, this.lastX + x1, this.lastY + y1, this.lastX + x2, this.lastY + y2, this.lastX + x, this.lastY + y));
      this.lastX += x;
      this.lastY += y;
      this.lastCommand = "c";
    }
    /**
     *  linetoHorizontalAbs - H
     *
     *  @param {number} x
     */

  }, {
    key: "linetoHorizontalAbs",
    value: function linetoHorizontalAbs(x) {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, x, this.lastY));
      this.lastX = x;
      this.lastCommand = "H";
    }
    /**
     *  linetoHorizontalRel - h
     *
     *  @param {number} x
     */

  }, {
    key: "linetoHorizontalRel",
    value: function linetoHorizontalRel(x) {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, this.lastX + x, this.lastY));
      this.lastX += x;
      this.lastCommand = "h";
    }
    /**
     *  linetoAbs - L
     *
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "linetoAbs",
    value: function linetoAbs(x, y) {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, x, y));
      this.lastX = x;
      this.lastY = y;
      this.lastCommand = "L";
    }
    /**
     *  linetoRel - l
     *
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "linetoRel",
    value: function linetoRel(x, y) {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, this.lastX + x, this.lastY + y));
      this.lastX += x;
      this.lastY += y;
      this.lastCommand = "l";
    }
    /**
     *  movetoAbs - M
     *
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "movetoAbs",
    value: function movetoAbs(x, y) {
      this.firstX = x;
      this.firstY = y;
      this.lastX = x;
      this.lastY = y;
      this.lastCommand = "M";
    }
    /**
     *  movetoRel - m
     *
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "movetoRel",
    value: function movetoRel(x, y) {
      this.firstX += x;
      this.firstY += y;
      this.lastX += x;
      this.lastY += y;
      this.lastCommand = "m";
    }
    /**
     *  curvetoQuadraticAbs - Q
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoQuadraticAbs",
    value: function curvetoQuadraticAbs(x1, y1, x, y) {
      this.addShape(this.shapeCreator.quadraticBezier(this.lastX, this.lastY, x1, y1, x, y));
      this.lastX = x;
      this.lastY = y;
      this.lastCommand = "Q";
    }
    /**
     *  curvetoQuadraticRel - q
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoQuadraticRel",
    value: function curvetoQuadraticRel(x1, y1, x, y) {
      this.addShape(this.shapeCreator.quadraticBezier(this.lastX, this.lastY, this.lastX + x1, this.lastY + y1, this.lastX + x, this.lastY + y));
      this.lastX += x;
      this.lastY += y;
      this.lastCommand = "q";
    }
    /**
     *  curvetoCubicSmoothAbs - S
     *
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoCubicSmoothAbs",
    value: function curvetoCubicSmoothAbs(x2, y2, x, y) {
      var controlX, controlY;

      if (this.lastCommand.match(/^[SsCc]$/)) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[2];
        controlX = 2 * this.lastX - secondToLast.x;
        controlY = 2 * this.lastY - secondToLast.y;
      } else {
        controlX = this.lastX;
        controlY = this.lastY;
      }

      this.addShape(this.shapeCreator.cubicBezier(this.lastX, this.lastY, controlX, controlY, x2, y2, x, y));
      this.lastX = x;
      this.lastY = y;
      this.lastCommand = "S";
    }
    /**
     *  curvetoCubicSmoothRel - s
     *
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoCubicSmoothRel",
    value: function curvetoCubicSmoothRel(x2, y2, x, y) {
      var controlX, controlY;

      if (this.lastCommand.match(/^[SsCc]$/)) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[2];
        controlX = 2 * this.lastX - secondToLast.x;
        controlY = 2 * this.lastY - secondToLast.y;
      } else {
        controlX = this.lastX;
        controlY = this.lastY;
      }

      this.addShape(this.shapeCreator.cubicBezier(this.lastX, this.lastY, controlX, controlY, this.lastX + x2, this.lastY + y2, this.lastX + x, this.lastY + y));
      this.lastX += x;
      this.lastY += y;
      this.lastCommand = "s";
    }
    /**
     *  curvetoQuadraticSmoothAbs - T
     *
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoQuadraticSmoothAbs",
    value: function curvetoQuadraticSmoothAbs(x, y) {
      var controlX, controlY;

      if (this.lastCommand.match(/^[QqTt]$/)) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[1];
        controlX = 2 * this.lastX - secondToLast.x;
        controlY = 2 * this.lastY - secondToLast.y;
      } else {
        controlX = this.lastX;
        controlY = this.lastY;
      }

      this.addShape(this.shapeCreator.quadraticBezier(this.lastX, this.lastY, controlX, controlY, x, y));
      this.lastX = x;
      this.lastY = y;
      this.lastCommand = "T";
    }
    /**
     *  curvetoQuadraticSmoothRel - t
     *
     *  @param {number} x
     *  @param {number} y
     */

  }, {
    key: "curvetoQuadraticSmoothRel",
    value: function curvetoQuadraticSmoothRel(x, y) {
      var controlX, controlY;

      if (this.lastCommand.match(/^[QqTt]$/)) {
        var secondToLast = this.shapes[this.shapes.length - 1].args[1];
        controlX = 2 * this.lastX - secondToLast.x;
        controlY = 2 * this.lastY - secondToLast.y;
      } else {
        controlX = this.lastX;
        controlY = this.lastY;
      }

      this.addShape(this.shapeCreator.quadraticBezier(this.lastX, this.lastY, controlX, controlY, this.lastX + x, this.lastY + y));
      this.lastX += x;
      this.lastY += y;
      this.lastCommand = "t";
    }
    /**
     *  linetoVerticalAbs - V
     *
     *  @param {number} y
     */

  }, {
    key: "linetoVerticalAbs",
    value: function linetoVerticalAbs(y) {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, this.lastX, y));
      this.lastY = y;
      this.lastCommand = "V";
    }
    /**
     *  linetoVerticalRel - v
     *
     *  @param {number} y
     */

  }, {
    key: "linetoVerticalRel",
    value: function linetoVerticalRel(y) {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, this.lastX, this.lastY + y));
      this.lastY += y;
      this.lastCommand = "v";
    }
    /**
     *  closePath - z or Z
     */

  }, {
    key: "closePath",
    value: function closePath() {
      this.addShape(this.shapeCreator.line(this.lastX, this.lastY, this.firstX, this.firstY));
      this.lastX = this.firstX;
      this.lastY = this.firstY;
      this.lastCommand = "z";
    }
  }]);

  return PathHandler;
}();

var source = "\ndef Center =\n    patterns {\n        { center: { x: number as x, y: number as y } },\n        { center: [ number as x, number as y ] },\n        { cx: number as x, cy: number as y },\n        { centerX: number as x, centerY: number as y }\n    } |> Point2D(x, y);\n\ndef Radii =\n    patterns {\n        { radii: { x: number as rx, y: number as ry } },\n        { radii: [ number as rx, number as ry ] },\n        { rx: number as rx, ry: number as ry },\n        { radiusX: number as rx, radiusY: number as ry }\n    } |> { \"rx\", \"ry\" };\n\ndef P1 =\n    patterns {\n        { p1: { x: number as x, y: number as y } },\n        { p1: [ number as x, number as y ] },\n        { p1x: number as x, p1y: number as y }\n    } |> Point2D(x, y);\n        \ndef P2 =\n    patterns {\n        { p1: { x: number as x, y: number as y } },\n        { p1: [ number as x, number as y ] },\n        { p1x: number as x, p1y: number as y }\n    } |> Point2D(x, y);\n        \ndef P3 =\n    patterns {\n        { p1: { x: number as x, y: number as y } },\n        { p1: [ number as x, number as y ] },\n        { p1x: number as x, p1y: number as y }\n    } |> Point2D(x, y);\n        \ndef P4 =\n    patterns {\n        { p1: { x: number as x, y: number as y } },\n        { p1: [ number as x, number as y ] },\n        { p1x: number as x, p1y: number as y }\n    } |> Point2D(x, y);\n\n            \ndef Arc = {\n    let radii = Radii,\n\n    \"center\": Center,\n    \"radiusX\": radii.rx,\n    \"radiusY\": radii.ry,\n    \"startRadians\": =~ number,\n    \"endRadians\": =~ number\n};\n\ndef ArcArgs = {\n    let elements =\n        patterns {\n            [ number as centerX, number as centerY, number as radiusX, number as radiusY, number as startRadians, number as endRadians ],\n            [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY, number as startRadians, number as endRadians ]\n        } |> { \"centerX\", \"centerY\", \"radiusX\", \"radiusY\", \"startRadians\", \"endRadians\" },\n    \n    \"center\": Point2D(elements.centerX, elements.centerY),\n    \"radiusX\": elements.radiusX,\n    \"radiusY\": elements.radiusY,\n    \"startRadians\": elements.startRadians,\n    \"endRadians\": elements.endRadians\n};\n\ndef Bezier2 = {\n    \"p1\": P1,\n    \"p2\": P2,\n    \"p3\": P3\n};\n\ndef Bezier2Args = {\n    let elements =\n        patterns {\n            [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y ],\n            [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }]\n        } |> { \"p1x\", \"p1y\", \"p2x\", \"p2y\", \"p3x\", \"p3y\" },\n    \n    \"p1\": Point2D(elements.p1x, elements.p1y),\n    \"p2\": Point2D(elements.p2x, elements.p2y),\n    \"p3\": Point2D(elements.p3x, elements.p3y)\n};\n\ndef Bezier3 = {\n    \"p1\": P1,\n    \"p2\": P2,\n    \"p3\": P3,\n    \"p4\": P4\n};\n\ndef Bezier3Args = {\n    let elements =\n        patterns {\n            [ number as p1x, number as p1y, number as p2x, number as p2y, number as p3x, number as p3y, number as p4x, number as p4y ],\n            [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y }, { x: number as p3x, y: number as p3y }, { x: number as p4x, y: number as p4y }]\n        } |> { \"p1x\", \"p1y\", \"p2x\", \"p2y\", \"p3x\", \"p3y\", \"p4x\", \"p4y\" },\n    \n    \"p1\": Point2D(elements.p1x, elements.p1y),\n    \"p2\": Point2D(elements.p2x, elements.p2y),\n    \"p3\": Point2D(elements.p3x, elements.p3y),\n    \"p4\": Point2D(elements.p4x, elements.p4y)\n};\n\ndef Circle = {\n    \"center\": Center,\n    \"radius\":\n        patterns {\n            { r: number as radius},\n            { radius: number as radius }\n        } |> radius\n};\n\ndef CircleArgs = {\n    let elements =\n        patterns {\n            [ number as centerX, number as centerY, number as radius ],\n            [ { x: number as centerX, y: number as centerY }, number as radius ]\n        } |> { \"centerX\", \"centerY\", \"radius\" },\n    \n    \"center\": Point2D(elements.centerX, elements.centerY),\n    \"radius\": elements.radius\n};\n\ndef Ellipse = {\n    let radii = Radii,\n\n    \"center\": Center,\n    \"radiusX\": radii.rx,\n    \"radiusY\": radii.ry\n};\n\ndef EllipseArgs = {\n    let elements =\n       patterns {\n            [ number as centerX, number as centerY, number as radiusX, number as radiusY ],\n            [ { x: number as centerX, y: number as centerY }, number as radiusX, number as radiusY ]\n        } |> { \"centerX\", \"centerY\", \"radiusX\", \"radiusY\" },\n    \n    \"center\": Point2D(elements.centerX, elements.centerY),\n    \"radiusX\": elements.radiusX,\n    \"radiusY\": elements.radiusY\n};\n\ndef Line = {\n    \"p1\": P1,\n    \"p2\": P2\n};\n\ndef LineArgs = {\n    let elements =\n        patterns {\n            [ number as p1x, number as p1y, number as p2x, number as p2y ],\n            [ { x: number as p1x, y: number as p1y }, { x: number as p2x, y: number as p2y } ]\n        } |> { \"p1x\", \"p1y\", \"p2x\", \"p2y\" },\n        \n    \"p1\": Point2D(elements.p1x, elements.p1y),\n    \"p2\": Point2D(elements.p2x, elements.p2y)\n};\n\ndef Path = {\n    \"segments\":\n        =~ { d: string as data } |> PathData(data)\n};\n\ndef PathArgs = {\n    \"segments\":\n        =~ string as data |> PathData(data)\n};\n\ndef Polygon = {\n    \"points\":\n        sequences {\n            =~ { points: [ (number, number); 0.. as coords ] }\n            |> [ map(coords, Point2D(...$)) ],\n\n            =~ { points: [ { x: number, y: number }; 0.. ] as points }\n            |> [ map(points, Point2D($.x, $.y)) ]\n        }\n};\n\ndef PolygonArgs = {\n    \"points\":\n        sequences {\n            =~ [ (number, number); 0.. as coords ]\n            |> [ map(coords, Point2D(...$)) ],\n\n            =~ [ { x: number, y: number }; 0.. ] as points\n            |> [ map(points, Point2D($.x, $.y)) ]\n        }\n};\n\ndef Polyline = {\n    \"points\":\n        sequences {\n            =~ { points: [ (number, number); 0.. as coords ] }\n            |> [ map(coords, Point2D(...$)) ],\n\n            =~ { points: [ { x: number, y: number }; 0.. ] as points }\n            |> [ map(points, Point2D($.x, $.y)) ]\n        }\n};\n\ndef PolylineArgs = {\n    \"points\":\n        sequences {\n            =~ [ (number, number); 0.. as coords ]\n            |> [ map(coords, Point2D(...$)) ],\n\n            =~ [ { x: number, y: number }; 0.. ] as points\n            |> [ map(points, Point2D($.x, $.y)) ]\n        }\n};\n\ndef Rectangle = {\n    let topLeft =\n        patterns {\n            { topLeft: { x: number as x, y: number as y } },\n            { topLeft: [ number as x, number as y ] },\n            { x: number as x, y: number as y },\n            { top: number as x, left: number as y }\n        } |> { \"x\", \"y\" },\n\n    \"topLeft\":\n        Point2D(topLeft.x, topLeft.y),\n\n    \"bottomRight\":\n        sequences {\n            patterns {\n                { bottomRight: { x: number as x, y: number as y } },\n                { bottomRight: [ number as x, number as y ] }\n            } |> Point2D(x, y),\n            patterns {\n                { w: number as w, h: number as h },\n                { width: number as w, height: number as h },\n                { size: { x: number as w, y: number as h } },\n                { size: [ number as w, number as h ] }\n            } |> Point2D(topLeft.x + w, topLeft.y + h)\n        },\n\n    \"rx\":\n        sequences {\n            =~ { rx: number as rx } |> rx,\n            =~ any |> 0\n        },\n    \"ry\":\n        sequences {\n            =~ { ry: number as ry } |> ry,\n            =~ any |> 0\n        }\n};\n\ndef RectangleArgs = {\n    let elements =\n        patterns {\n            [ number as x, number as y, number as width, number as height ],\n            [ number as x, number as y, number as width, number as height, number as rx, number as ry ],\n            [ { x: number as x, y: number as y }, { x: number as width, y: number as height } ],\n            [ { x: number as x, y: number as y }, { x: number as width, y: number as height }, { rx: number as rx, ry: number as ry } ],\n            [ { x: number as x, y: number as y }, { x: number as width, y: number as height }, { radiusX: number as rx, radiusY: number as ry } ]\n        } |> { \"x\", \"y\", \"width\", \"height\", \"rx\", \"ry\" },\n\n    \"topLeft\": Point2D(elements.x, elements.y),\n    \"bottomRight\": Point2D(elements.x + elements.width, elements.y + elements.height),\n    \"rx\": elements.rx,\n    \"ry\": elements.ry\n}\n";

var degree90 = Math.PI * 0.5;
/**
 *  ShapeInfo
 *  @memberof module:kld-intersections
 */

var ShapeInfo =
/*#__PURE__*/
function () {
  /**
   *  @param {string} name
   *  @param {Array} args
   *  @returns {module:kld-intersections.ShapeInfo}
   */
  function ShapeInfo(name, args) {
    _classCallCheck(this, ShapeInfo);

    this.name = name;
    this.args = args;
  }

  _createClass(ShapeInfo, null, [{
    key: "arc",
    value: function arc() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return create(ShapeInfo.ARC, args, ["center", "radiusX", "radiusY", "startRadians", "endRadians"]);
    }
  }, {
    key: "quadraticBezier",
    value: function quadraticBezier() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return create(ShapeInfo.QUADRATIC_BEZIER, args, ["p1", "p2", "p3"]);
    }
  }, {
    key: "cubicBezier",
    value: function cubicBezier() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return create(ShapeInfo.CUBIC_BEZIER, args, ["p1", "p2", "p3", "p4"]);
    }
  }, {
    key: "circle",
    value: function circle() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return create(ShapeInfo.CIRCLE, args, ["center", "radius"]);
    }
  }, {
    key: "ellipse",
    value: function ellipse() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return create(ShapeInfo.ELLIPSE, args, ["center", "radiusX", "radiusY"]);
    }
  }, {
    key: "line",
    value: function line() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return create(ShapeInfo.LINE, args, ["p1", "p2"]);
    }
  }, {
    key: "path",
    value: function path() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return create(ShapeInfo.PATH, args, ["segments"]);
    }
  }, {
    key: "polygon",
    value: function polygon() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return create(ShapeInfo.POLYGON, args, ["points"]);
    }
  }, {
    key: "polyline",
    value: function polyline() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return create(ShapeInfo.POLYLINE, args, ["points"]);
    }
  }, {
    key: "rectangle",
    value: function rectangle() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      var result = create(ShapeInfo.RECTANGLE, args, ["topLeft", "bottomRight", "rx", "ry"]);
      var ry = result.args.pop();
      var rx = result.args.pop();
      rx = rx === undefined ? 0 : rx;
      ry = ry === undefined ? 0 : ry;

      if (rx === 0 && ry === 0) {
        return result;
      }

      var _result$args$ = result.args[0],
          p1x = _result$args$.x,
          p1y = _result$args$.y;
      var _result$args$2 = result.args[1],
          p2x = _result$args$2.x,
          p2y = _result$args$2.y;
      var width = p2x - p1x;
      var height = p2y - p1y;

      if (rx === 0) {
        rx = ry;
      }

      if (ry === 0) {
        ry = rx;
      }

      if (rx > width * 0.5) {
        rx = width * 0.5;
      }

      if (ry > height * 0.5) {
        ry = height * 0.5;
      }

      var x0 = p1x;
      var y0 = p1y;
      var x1 = p1x + rx;
      var y1 = p1y + ry;
      var x2 = p2x - rx;
      var y2 = p2y - ry;
      var x3 = p2x;
      var y3 = p2y;
      var segments = [ShapeInfo.arc(x1, y1, rx, ry, 2 * degree90, 3 * degree90), ShapeInfo.line(x1, y0, x2, y0), ShapeInfo.arc(x2, y1, rx, ry, 3 * degree90, 4 * degree90), ShapeInfo.line(x3, y1, x3, y2), ShapeInfo.arc(x2, y2, rx, ry, 0, degree90), ShapeInfo.line(x2, y3, x1, y3), ShapeInfo.arc(x1, y2, rx, ry, degree90, 2 * degree90), ShapeInfo.line(x0, y2, x0, y1)];
      return new ShapeInfo(ShapeInfo.PATH, segments);
    }
  }]);

  return ShapeInfo;
}();

function create(type, object, properties) {
  var transformType;

  if (object.length === 1) {
    object = object[0];
    transformType = Array.isArray(object) || typeof object === "string" ? type + "Args" : type;
  } else {
    transformType = type + "Args";
  } // normalize the data


  var data = transformer.execute(transformType, object);

  if (data === FAILURE_VALUE) {
    // for (const message of transformer.messages) {
    //     console.log(message);
    // }
    throw new TypeError("".concat(type, " is not in a recognizable format: ").concat(JSON.stringify(object)));
  } // pull out the arguments


  var args = properties.length === 1 ? data[properties[0]] : properties.map(function (name) {
    return data[name];
  }); // return a new ShapeInfo

  return new ShapeInfo(type, args);
} // define shape name constants


ShapeInfo.ARC = "Arc";
ShapeInfo.QUADRATIC_BEZIER = "Bezier2";
ShapeInfo.CUBIC_BEZIER = "Bezier3";
ShapeInfo.CIRCLE = "Circle";
ShapeInfo.ELLIPSE = "Ellipse";
ShapeInfo.LINE = "Line";
ShapeInfo.PATH = "Path";
ShapeInfo.POLYGON = "Polygon";
ShapeInfo.POLYLINE = "Polyline";
ShapeInfo.RECTANGLE = "Rectangle"; // create shape argument normalizer

var transformer = new Transformer();
transformer.execute(source); // attach custom generators

transformer.addFunction("Point2D", function (x, y) {
  return new Point2D(x, y);
});
transformer.addFunction("PathData", function (pathData) {
  var parser = new PathParser();
  var handler = new PathHandler(ShapeInfo);
  parser.setHandler(handler);
  parser.parseData(pathData);
  return handler.shapes;
});

var TWO_PI$1 = 2.0 * Math.PI;
var UNIT_X = new Vector2D(1, 0);
/**
 * @memberof module:kld-intersections.Intersection~
 * @param {*} o
 * @returns {boolean}
 */

function isNullish(o) {
  return o === null || o === undefined;
}
/**
 *  bezout
 *
 *  This code is based on MgcIntr2DElpElp.cpp written by David Eberly.  His
 *  code along with many other excellent examples are avaiable at his site:
 *  http://www.magic-software.com
 *
 *  @param {Array<module:kld-intersections.Point2D>} e1
 *  @param {Array<module:kld-intersections.Point2D>} e2
 *  @returns {external:Polynomial}
 */


function bezout(e1, e2) {
  var AB = e1[0] * e2[1] - e2[0] * e1[1];
  var AC = e1[0] * e2[2] - e2[0] * e1[2];
  var AD = e1[0] * e2[3] - e2[0] * e1[3];
  var AE = e1[0] * e2[4] - e2[0] * e1[4];
  var AF = e1[0] * e2[5] - e2[0] * e1[5];
  var BC = e1[1] * e2[2] - e2[1] * e1[2];
  var BE = e1[1] * e2[4] - e2[1] * e1[4];
  var BF = e1[1] * e2[5] - e2[1] * e1[5];
  var CD = e1[2] * e2[3] - e2[2] * e1[3];
  var DE = e1[3] * e2[4] - e2[3] * e1[4];
  var DF = e1[3] * e2[5] - e2[3] * e1[5];
  var BFpDE = BF + DE;
  var BEmCD = BE - CD;
  return new Polynomial(AB * BC - AC * AC, AB * BEmCD + AD * BC - 2 * AC * AE, AB * BFpDE + AD * BEmCD - AE * AE - 2 * AC * AF, AB * DF + AD * BFpDE - 2 * AE * AF, AD * DF - AF * AF);
}
/**
 * normalizeAngle
 *
 * @param {number} radians
 * @returns {number}
 */


function normalizeAngle$1(radians) {
  var normal = radians % TWO_PI$1;
  return normal < 0.0 ? normal + TWO_PI$1 : normal;
}
/**
 * restrictPointsToArc
 *
 * @param {module:kld-intersections.Intersection} intersections
 * @param {module:kld-intersections.Point2D} center
 * @param {number} radiusX
 * @param {number} radiusY
 * @param {number} startRadians
 * @param {number} endRadians
 * @returns {module:kld-intersections.Intersection}
 */


function restrictPointsToArc(intersections, center, radiusX, radiusY, startRadians, endRadians) {
  if (intersections.points.length === 0) {
    return intersections;
  }

  var result = new Intersection("No Intersection");
  var startNormal = normalizeAngle$1(startRadians);
  var endNormal = normalizeAngle$1(endRadians); // Advance end angle one turn if it's lower than the start angle so our interval test will work correctly

  if (endNormal < startNormal) {
    endNormal += TWO_PI$1;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = intersections.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;
      var a = normalizeAngle$1(UNIT_X.angleBetween(Vector2D.fromPoints(center, p)));

      if (startNormal <= a && a <= endNormal) {
        result.appendPoint(p);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (result.points.length > 0) {
    result.status = "Intersection";
  }

  return result;
}
/**
 *  closePolygon
 *  @memberof module:kld-intersections.Intersection~
 *  @param {Array<module:kld-intersections.Point2D>} points
 *  @returns {Array<module:kld-intersections.Point2D>}
 */


function closePolygon(points) {
  var copy = points.slice();
  copy.push(points[0]);
  return copy;
}
/**
 * Intersection
 * @memberof module:kld-intersections
 */


var Intersection =
/*#__PURE__*/
function () {
  /**
   *  @param {string} status
   *  @returns {module:kld-intersections.Intersection}
   */
  function Intersection(status) {
    _classCallCheck(this, Intersection);

    this.init(status);
  }
  /**
   *  init
   *
   *  @param {string} status
   *  @returns {module:kld-intersections.Intersection}
   */


  _createClass(Intersection, [{
    key: "init",
    value: function init(status) {
      this.status = status;
      this.points = [];
    }
    /**
     *  intersect
     *
     *  @param {module:kld-intersections.ShapeInfo} shape1
     *  @param {module:kld-intersections.ShapeInfo} shape2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "appendPoint",

    /**
     *  appendPoint
     *
     *  @param {module:kld-intersections.Point2D} point
     */
    value: function appendPoint(point) {
      this.points.push(point);
    }
    /**
     *  appendPoints
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     */

  }, {
    key: "appendPoints",
    value: function appendPoints(points) {
      this.points = this.points.concat(points);
    }
  }], [{
    key: "intersect",
    value: function intersect(shape1, shape2) {
      var result;

      if (!isNullish(shape1) && !isNullish(shape2)) {
        if (shape1.name === "Path") {
          result = Intersection.intersectPathShape(shape1, shape2);
        } else if (shape2.name === "Path") {
          result = Intersection.intersectPathShape(shape2, shape1);
        } else if (shape1.name === "Arc") {
          result = Intersection.intersectArcShape(shape1, shape2);
        } else if (shape2.name === "Arc") {
          result = Intersection.intersectArcShape(shape2, shape1);
        } else {
          var method;
          var args;

          if (shape1.name < shape2.name) {
            method = "intersect" + shape1.name + shape2.name;
            args = shape1.args.concat(shape2.args);
          } else {
            method = "intersect" + shape2.name + shape1.name;
            args = shape2.args.concat(shape1.args);
          }

          if (!(method in Intersection)) {
            throw new TypeError("Intersection not available: " + method);
          }

          result = Intersection[method].apply(null, args);
        }
      } else {
        result = new Intersection("No Intersection");
      }

      return result;
    }
    /**
     *  intersectPathShape
     *
     *  @param {module:kld-intersections.ShapeInfo} path
     *  @param {module:kld-intersections.ShapeInfo} shape
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectPathShape",
    value: function intersectPathShape(path, shape) {
      var result = new Intersection("No Intersection");
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = path.args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var segment = _step2.value;
          var inter = Intersection.intersect(segment, shape);
          result.appendPoints(inter.points);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     * intersectArcShape
     *
     * @param {module:kld-intersections.ShapeInfo} arc
     * @param {module:kld-intersections.ShapeInfo} shape
     * @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectArcShape",
    value: function intersectArcShape(arc, shape) {
      var _arc$args = _slicedToArray(arc.args, 5),
          center = _arc$args[0],
          radiusX = _arc$args[1],
          radiusY = _arc$args[2],
          startRadians = _arc$args[3],
          endRadians = _arc$args[4];

      var ellipse = new ShapeInfo(ShapeInfo.ELLIPSE, [center, radiusX, radiusY]);
      var ellipse_result = Intersection.intersect(ellipse, shape); // return ellipse_result;

      return restrictPointsToArc(ellipse_result, center, radiusX, radiusY, startRadians, endRadians);
    }
    /**
     *  intersectBezier2Bezier2
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} a3
     *  @param {module:kld-intersections.Point2D} b1
     *  @param {module:kld-intersections.Point2D} b2
     *  @param {module:kld-intersections.Point2D} b3
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Bezier2",
    value: function intersectBezier2Bezier2(a1, a2, a3, b1, b2, b3) {
      var a, b;
      var result = new Intersection("No Intersection");
      a = a2.multiply(-2);
      var c12 = a1.add(a.add(a3));
      a = a1.multiply(-2);
      b = a2.multiply(2);
      var c11 = a.add(b);
      var c10 = new Point2D(a1.x, a1.y);
      a = b2.multiply(-2);
      var c22 = b1.add(a.add(b3));
      a = b1.multiply(-2);
      b = b2.multiply(2);
      var c21 = a.add(b);
      var c20 = new Point2D(b1.x, b1.y); // bezout

      a = c12.x * c11.y - c11.x * c12.y;
      b = c22.x * c11.y - c11.x * c22.y;
      var c = c21.x * c11.y - c11.x * c21.y;
      var d = c11.x * (c10.y - c20.y) + c11.y * (-c10.x + c20.x);
      var e = c22.x * c12.y - c12.x * c22.y;
      var f = c21.x * c12.y - c12.x * c21.y;
      var g = c12.x * (c10.y - c20.y) + c12.y * (-c10.x + c20.x); // determinant

      var poly = new Polynomial(-e * e, -2 * e * f, a * b - f * f - 2 * e * g, a * c - 2 * f * g, a * d - g * g);
      var roots = poly.getRoots();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = roots[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var s = _step3.value;

          if (0 <= s && s <= 1) {
            var xp = new Polynomial(c12.x, c11.x, c10.x - c20.x - s * c21.x - s * s * c22.x);
            xp.simplifyEquals();
            var xRoots = xp.getRoots();
            var yp = new Polynomial(c12.y, c11.y, c10.y - c20.y - s * c21.y - s * s * c22.y);
            yp.simplifyEquals();
            var yRoots = yp.getRoots();

            if (xRoots.length > 0 && yRoots.length > 0) {
              var TOLERANCE = 1e-4;
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                checkRoots: for (var _iterator4 = xRoots[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var xRoot = _step4.value;

                  if (0 <= xRoot && xRoot <= 1) {
                    for (var k = 0; k < yRoots.length; k++) {
                      if (Math.abs(xRoot - yRoots[k]) < TOLERANCE) {
                        result.points.push(c22.multiply(s * s).add(c21.multiply(s).add(c20)));
                        break checkRoots;
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier2Bezier3
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} a3
     *  @param {module:kld-intersections.Point2D} b1
     *  @param {module:kld-intersections.Point2D} b2
     *  @param {module:kld-intersections.Point2D} b3
     *  @param {module:kld-intersections.Point2D} b4
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Bezier3",
    value: function intersectBezier2Bezier3(a1, a2, a3, b1, b2, b3, b4) {
      var a, b, c, d;
      var result = new Intersection("No Intersection");
      a = a2.multiply(-2);
      var c12 = a1.add(a.add(a3));
      a = a1.multiply(-2);
      b = a2.multiply(2);
      var c11 = a.add(b);
      var c10 = new Point2D(a1.x, a1.y);
      a = b1.multiply(-1);
      b = b2.multiply(3);
      c = b3.multiply(-3);
      d = a.add(b.add(c.add(b4)));
      var c23 = new Point2D(d.x, d.y);
      a = b1.multiply(3);
      b = b2.multiply(-6);
      c = b3.multiply(3);
      d = a.add(b.add(c));
      var c22 = new Point2D(d.x, d.y);
      a = b1.multiply(-3);
      b = b2.multiply(3);
      c = a.add(b);
      var c21 = new Point2D(c.x, c.y);
      var c20 = new Point2D(b1.x, b1.y);
      var c10x2 = c10.x * c10.x;
      var c10y2 = c10.y * c10.y;
      var c11x2 = c11.x * c11.x;
      var c11y2 = c11.y * c11.y;
      var c12x2 = c12.x * c12.x;
      var c12y2 = c12.y * c12.y;
      var c20x2 = c20.x * c20.x;
      var c20y2 = c20.y * c20.y;
      var c21x2 = c21.x * c21.x;
      var c21y2 = c21.y * c21.y;
      var c22x2 = c22.x * c22.x;
      var c22y2 = c22.y * c22.y;
      var c23x2 = c23.x * c23.x;
      var c23y2 = c23.y * c23.y;
      var poly = new Polynomial(-2 * c12.x * c12.y * c23.x * c23.y + c12x2 * c23y2 + c12y2 * c23x2, -2 * c12.x * c12.y * c22.x * c23.y - 2 * c12.x * c12.y * c22.y * c23.x + 2 * c12y2 * c22.x * c23.x + 2 * c12x2 * c22.y * c23.y, -2 * c12.x * c21.x * c12.y * c23.y - 2 * c12.x * c12.y * c21.y * c23.x - 2 * c12.x * c12.y * c22.x * c22.y + 2 * c21.x * c12y2 * c23.x + c12y2 * c22x2 + c12x2 * (2 * c21.y * c23.y + c22y2), 2 * c10.x * c12.x * c12.y * c23.y + 2 * c10.y * c12.x * c12.y * c23.x + c11.x * c11.y * c12.x * c23.y + c11.x * c11.y * c12.y * c23.x - 2 * c20.x * c12.x * c12.y * c23.y - 2 * c12.x * c20.y * c12.y * c23.x - 2 * c12.x * c21.x * c12.y * c22.y - 2 * c12.x * c12.y * c21.y * c22.x - 2 * c10.x * c12y2 * c23.x - 2 * c10.y * c12x2 * c23.y + 2 * c20.x * c12y2 * c23.x + 2 * c21.x * c12y2 * c22.x - c11y2 * c12.x * c23.x - c11x2 * c12.y * c23.y + c12x2 * (2 * c20.y * c23.y + 2 * c21.y * c22.y), 2 * c10.x * c12.x * c12.y * c22.y + 2 * c10.y * c12.x * c12.y * c22.x + c11.x * c11.y * c12.x * c22.y + c11.x * c11.y * c12.y * c22.x - 2 * c20.x * c12.x * c12.y * c22.y - 2 * c12.x * c20.y * c12.y * c22.x - 2 * c12.x * c21.x * c12.y * c21.y - 2 * c10.x * c12y2 * c22.x - 2 * c10.y * c12x2 * c22.y + 2 * c20.x * c12y2 * c22.x - c11y2 * c12.x * c22.x - c11x2 * c12.y * c22.y + c21x2 * c12y2 + c12x2 * (2 * c20.y * c22.y + c21y2), 2 * c10.x * c12.x * c12.y * c21.y + 2 * c10.y * c12.x * c21.x * c12.y + c11.x * c11.y * c12.x * c21.y + c11.x * c11.y * c21.x * c12.y - 2 * c20.x * c12.x * c12.y * c21.y - 2 * c12.x * c20.y * c21.x * c12.y - 2 * c10.x * c21.x * c12y2 - 2 * c10.y * c12x2 * c21.y + 2 * c20.x * c21.x * c12y2 - c11y2 * c12.x * c21.x - c11x2 * c12.y * c21.y + 2 * c12x2 * c20.y * c21.y, -2 * c10.x * c10.y * c12.x * c12.y - c10.x * c11.x * c11.y * c12.y - c10.y * c11.x * c11.y * c12.x + 2 * c10.x * c12.x * c20.y * c12.y + 2 * c10.y * c20.x * c12.x * c12.y + c11.x * c20.x * c11.y * c12.y + c11.x * c11.y * c12.x * c20.y - 2 * c20.x * c12.x * c20.y * c12.y - 2 * c10.x * c20.x * c12y2 + c10.x * c11y2 * c12.x + c10.y * c11x2 * c12.y - 2 * c10.y * c12x2 * c20.y - c20.x * c11y2 * c12.x - c11x2 * c20.y * c12.y + c10x2 * c12y2 + c10y2 * c12x2 + c20x2 * c12y2 + c12x2 * c20y2);
      var roots = poly.getRootsInInterval(0, 1);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = roots[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var s = _step5.value;
          var xRoots = new Polynomial(c12.x, c11.x, c10.x - c20.x - s * c21.x - s * s * c22.x - s * s * s * c23.x).getRoots();
          var yRoots = new Polynomial(c12.y, c11.y, c10.y - c20.y - s * c21.y - s * s * c22.y - s * s * s * c23.y).getRoots();

          if (xRoots.length > 0 && yRoots.length > 0) {
            var TOLERANCE = 1e-4;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              checkRoots: for (var _iterator6 = xRoots[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var xRoot = _step6.value;

                if (0 <= xRoot && xRoot <= 1) {
                  for (var k = 0; k < yRoots.length; k++) {
                    if (Math.abs(xRoot - yRoots[k]) < TOLERANCE) {
                      result.points.push(c23.multiply(s * s * s).add(c22.multiply(s * s).add(c21.multiply(s).add(c20))));
                      break checkRoots;
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                  _iterator6["return"]();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier2Circle
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} r
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Circle",
    value: function intersectBezier2Circle(p1, p2, p3, c, r) {
      return Intersection.intersectBezier2Ellipse(p1, p2, p3, c, r, r);
    }
    /**
     *  intersectBezier2Ellipse
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} ec
     *  @param {number} rx
     *  @param {number} ry
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Ellipse",
    value: function intersectBezier2Ellipse(p1, p2, p3, ec, rx, ry) {
      var a; // temporary variables
      // c2, c1, c0; // coefficients of quadratic

      var result = new Intersection("No Intersection");
      a = p2.multiply(-2);
      var c2 = p1.add(a.add(p3));
      a = p1.multiply(-2);
      var b = p2.multiply(2);
      var c1 = a.add(b);
      var c0 = new Point2D(p1.x, p1.y);
      var rxrx = rx * rx;
      var ryry = ry * ry;
      var roots = new Polynomial(ryry * c2.x * c2.x + rxrx * c2.y * c2.y, 2 * (ryry * c2.x * c1.x + rxrx * c2.y * c1.y), ryry * (2 * c2.x * c0.x + c1.x * c1.x) + rxrx * (2 * c2.y * c0.y + c1.y * c1.y) - 2 * (ryry * ec.x * c2.x + rxrx * ec.y * c2.y), 2 * (ryry * c1.x * (c0.x - ec.x) + rxrx * c1.y * (c0.y - ec.y)), ryry * (c0.x * c0.x + ec.x * ec.x) + rxrx * (c0.y * c0.y + ec.y * ec.y) - 2 * (ryry * ec.x * c0.x + rxrx * ec.y * c0.y) - rxrx * ryry).getRoots();
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = roots[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var t = _step7.value;

          if (0 <= t && t <= 1) {
            result.points.push(c2.multiply(t * t).add(c1.multiply(t).add(c0)));
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier2Line
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Line",
    value: function intersectBezier2Line(p1, p2, p3, a1, a2) {
      var a; // temporary variables
      // let c2, c1, c0; // coefficients of quadratic
      // cl; // c coefficient for normal form of line
      // n; // normal for normal form of line

      var min = a1.min(a2); // used to determine if point is on line segment

      var max = a1.max(a2); // used to determine if point is on line segment

      var result = new Intersection("No Intersection");
      a = p2.multiply(-2);
      var c2 = p1.add(a.add(p3));
      a = p1.multiply(-2);
      var b = p2.multiply(2);
      var c1 = a.add(b);
      var c0 = new Point2D(p1.x, p1.y); // Convert line to normal form: ax + by + c = 0
      // Find normal to line: negative inverse of original line's slope

      var n = new Vector2D(a1.y - a2.y, a2.x - a1.x); // Determine new c coefficient

      var cl = a1.x * a2.y - a2.x * a1.y; // Transform cubic coefficients to line's coordinate system and find roots
      // of cubic

      var roots = new Polynomial(n.dot(c2), n.dot(c1), n.dot(c0) + cl).getRoots(); // Any roots in closed interval [0,1] are intersections on Bezier, but
      // might not be on the line segment.
      // Find intersections and calculate point coordinates

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = roots[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var t = _step8.value;

          if (0 <= t && t <= 1) {
            // We're within the Bezier curve
            // Find point on Bezier
            var p4 = p1.lerp(p2, t);
            var p5 = p2.lerp(p3, t);
            var p6 = p4.lerp(p5, t); // See if point is on line segment
            // Had to make special cases for vertical and horizontal lines due
            // to slight errors in calculation of p6

            if (a1.x === a2.x) {
              if (min.y <= p6.y && p6.y <= max.y) {
                result.status = "Intersection";
                result.appendPoint(p6);
              }
            } else if (a1.y === a2.y) {
              if (min.x <= p6.x && p6.x <= max.x) {
                result.status = "Intersection";
                result.appendPoint(p6);
              }
            } else if (min.x <= p6.x && p6.x <= max.x && min.y <= p6.y && p6.y <= max.y) {
              result.status = "Intersection";
              result.appendPoint(p6);
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return result;
    }
    /**
     *  intersectBezier2Polygon
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Polygon",
    value: function intersectBezier2Polygon(p1, p2, p3, points) {
      return Intersection.intersectBezier2Polyline(p1, p2, p3, closePolygon(points));
    }
    /**
     *  intersectBezier2Polyline
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Polyline",
    value: function intersectBezier2Polyline(p1, p2, p3, points) {
      var result = new Intersection("No Intersection");
      var len = points.length;

      for (var i = 0; i < len - 1; i++) {
        var a1 = points[i];
        var a2 = points[i + 1];
        var inter = Intersection.intersectBezier2Line(p1, p2, p3, a1, a2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier2Rectangle
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier2Rectangle",
    value: function intersectBezier2Rectangle(p1, p2, p3, r1, r2) {
      var min = r1.min(r2);
      var max = r1.max(r2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectBezier2Line(p1, p2, p3, min, topRight);
      var inter2 = Intersection.intersectBezier2Line(p1, p2, p3, topRight, max);
      var inter3 = Intersection.intersectBezier2Line(p1, p2, p3, max, bottomLeft);
      var inter4 = Intersection.intersectBezier2Line(p1, p2, p3, bottomLeft, min);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier3Bezier3
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} a3
     *  @param {module:kld-intersections.Point2D} a4
     *  @param {module:kld-intersections.Point2D} b1
     *  @param {module:kld-intersections.Point2D} b2
     *  @param {module:kld-intersections.Point2D} b3
     *  @param {module:kld-intersections.Point2D} b4
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Bezier3",
    value: function intersectBezier3Bezier3(a1, a2, a3, a4, b1, b2, b3, b4) {
      var a, b, c, d; // temporary variables
      // c13, c12, c11, c10; // coefficients of cubic
      // c23, c22, c21, c20; // coefficients of cubic

      var result = new Intersection("No Intersection"); // Calculate the coefficients of cubic polynomial

      a = a1.multiply(-1);
      b = a2.multiply(3);
      c = a3.multiply(-3);
      d = a.add(b.add(c.add(a4)));
      var c13 = new Point2D(d.x, d.y);
      a = a1.multiply(3);
      b = a2.multiply(-6);
      c = a3.multiply(3);
      d = a.add(b.add(c));
      var c12 = new Point2D(d.x, d.y);
      a = a1.multiply(-3);
      b = a2.multiply(3);
      c = a.add(b);
      var c11 = new Point2D(c.x, c.y);
      var c10 = new Point2D(a1.x, a1.y);
      a = b1.multiply(-1);
      b = b2.multiply(3);
      c = b3.multiply(-3);
      d = a.add(b.add(c.add(b4)));
      var c23 = new Point2D(d.x, d.y);
      a = b1.multiply(3);
      b = b2.multiply(-6);
      c = b3.multiply(3);
      d = a.add(b.add(c));
      var c22 = new Point2D(d.x, d.y);
      a = b1.multiply(-3);
      b = b2.multiply(3);
      c = a.add(b);
      var c21 = new Point2D(c.x, c.y);
      var c20 = new Point2D(b1.x, b1.y); // bezout

      a = c13.x * c12.y - c12.x * c13.y;
      b = c13.x * c11.y - c11.x * c13.y;
      var c0 = c13.x * c10.y - c10.x * c13.y + c20.x * c13.y - c13.x * c20.y;
      var c1 = c21.x * c13.y - c13.x * c21.y;
      var c2 = c22.x * c13.y - c13.x * c22.y;
      var c3 = c23.x * c13.y - c13.x * c23.y;
      d = c13.x * c11.y - c11.x * c13.y;
      var e0 = c13.x * c10.y + c12.x * c11.y - c11.x * c12.y - c10.x * c13.y + c20.x * c13.y - c13.x * c20.y;
      var e1 = c21.x * c13.y - c13.x * c21.y;
      var e2 = c22.x * c13.y - c13.x * c22.y;
      var e3 = c23.x * c13.y - c13.x * c23.y;
      var f0 = c12.x * c10.y - c10.x * c12.y + c20.x * c12.y - c12.x * c20.y;
      var f1 = c21.x * c12.y - c12.x * c21.y;
      var f2 = c22.x * c12.y - c12.x * c22.y;
      var f3 = c23.x * c12.y - c12.x * c23.y;
      var g0 = c13.x * c10.y - c10.x * c13.y + c20.x * c13.y - c13.x * c20.y;
      var g1 = c21.x * c13.y - c13.x * c21.y;
      var g2 = c22.x * c13.y - c13.x * c22.y;
      var g3 = c23.x * c13.y - c13.x * c23.y;
      var h0 = c12.x * c10.y - c10.x * c12.y + c20.x * c12.y - c12.x * c20.y;
      var h1 = c21.x * c12.y - c12.x * c21.y;
      var h2 = c22.x * c12.y - c12.x * c22.y;
      var h3 = c23.x * c12.y - c12.x * c23.y;
      var i0 = c11.x * c10.y - c10.x * c11.y + c20.x * c11.y - c11.x * c20.y;
      var i1 = c21.x * c11.y - c11.x * c21.y;
      var i2 = c22.x * c11.y - c11.x * c22.y;
      var i3 = c23.x * c11.y - c11.x * c23.y; // determinant

      var poly = new Polynomial(-c3 * e3 * g3, -c3 * e3 * g2 - c3 * e2 * g3 - c2 * e3 * g3, -c3 * e3 * g1 - c3 * e2 * g2 - c2 * e3 * g2 - c3 * e1 * g3 - c2 * e2 * g3 - c1 * e3 * g3, -c3 * e3 * g0 - c3 * e2 * g1 - c2 * e3 * g1 - c3 * e1 * g2 - c2 * e2 * g2 - c1 * e3 * g2 - c3 * e0 * g3 - c2 * e1 * g3 - c1 * e2 * g3 - c0 * e3 * g3 + b * f3 * g3 + c3 * d * h3 - a * f3 * h3 + a * e3 * i3, -c3 * e2 * g0 - c2 * e3 * g0 - c3 * e1 * g1 - c2 * e2 * g1 - c1 * e3 * g1 - c3 * e0 * g2 - c2 * e1 * g2 - c1 * e2 * g2 - c0 * e3 * g2 + b * f3 * g2 - c2 * e0 * g3 - c1 * e1 * g3 - c0 * e2 * g3 + b * f2 * g3 + c3 * d * h2 - a * f3 * h2 + c2 * d * h3 - a * f2 * h3 + a * e3 * i2 + a * e2 * i3, -c3 * e1 * g0 - c2 * e2 * g0 - c1 * e3 * g0 - c3 * e0 * g1 - c2 * e1 * g1 - c1 * e2 * g1 - c0 * e3 * g1 + b * f3 * g1 - c2 * e0 * g2 - c1 * e1 * g2 - c0 * e2 * g2 + b * f2 * g2 - c1 * e0 * g3 - c0 * e1 * g3 + b * f1 * g3 + c3 * d * h1 - a * f3 * h1 + c2 * d * h2 - a * f2 * h2 + c1 * d * h3 - a * f1 * h3 + a * e3 * i1 + a * e2 * i2 + a * e1 * i3, -c3 * e0 * g0 - c2 * e1 * g0 - c1 * e2 * g0 - c0 * e3 * g0 + b * f3 * g0 - c2 * e0 * g1 - c1 * e1 * g1 - c0 * e2 * g1 + b * f2 * g1 - c1 * e0 * g2 - c0 * e1 * g2 + b * f1 * g2 - c0 * e0 * g3 + b * f0 * g3 + c3 * d * h0 - a * f3 * h0 + c2 * d * h1 - a * f2 * h1 + c1 * d * h2 - a * f1 * h2 + c0 * d * h3 - a * f0 * h3 + a * e3 * i0 + a * e2 * i1 + a * e1 * i2 - b * d * i3 + a * e0 * i3, -c2 * e0 * g0 - c1 * e1 * g0 - c0 * e2 * g0 + b * f2 * g0 - c1 * e0 * g1 - c0 * e1 * g1 + b * f1 * g1 - c0 * e0 * g2 + b * f0 * g2 + c2 * d * h0 - a * f2 * h0 + c1 * d * h1 - a * f1 * h1 + c0 * d * h2 - a * f0 * h2 + a * e2 * i0 + a * e1 * i1 - b * d * i2 + a * e0 * i2, -c1 * e0 * g0 - c0 * e1 * g0 + b * f1 * g0 - c0 * e0 * g1 + b * f0 * g1 + c1 * d * h0 - a * f1 * h0 + c0 * d * h1 - a * f0 * h1 + a * e1 * i0 - b * d * i1 + a * e0 * i1, -c0 * e0 * g0 + b * f0 * g0 + c0 * d * h0 - a * f0 * h0 - b * d * i0 + a * e0 * i0);
      poly.simplifyEquals();
      var roots = poly.getRootsInInterval(0, 1);
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = roots[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var s = _step9.value;
          var xp = new Polynomial(c13.x, c12.x, c11.x, c10.x - c20.x - s * c21.x - s * s * c22.x - s * s * s * c23.x);
          xp.simplifyEquals();
          var xRoots = xp.getRoots();
          var yp = new Polynomial(c13.y, c12.y, c11.y, c10.y - c20.y - s * c21.y - s * s * c22.y - s * s * s * c23.y);
          yp.simplifyEquals();
          var yRoots = yp.getRoots();

          if (xRoots.length > 0 && yRoots.length > 0) {
            var TOLERANCE = 1e-4;
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
              checkRoots: for (var _iterator10 = xRoots[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var xRoot = _step10.value;

                if (0 <= xRoot && xRoot <= 1) {
                  for (var k = 0; k < yRoots.length; k++) {
                    if (Math.abs(xRoot - yRoots[k]) < TOLERANCE) {
                      result.points.push(c23.multiply(s * s * s).add(c22.multiply(s * s).add(c21.multiply(s).add(c20))));
                      break checkRoots;
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError10 = true;
              _iteratorError10 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                  _iterator10["return"]();
                }
              } finally {
                if (_didIteratorError10) {
                  throw _iteratorError10;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier3Circle
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} r
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Circle",
    value: function intersectBezier3Circle(p1, p2, p3, p4, c, r) {
      return Intersection.intersectBezier3Ellipse(p1, p2, p3, p4, c, r, r);
    }
    /**
     *  intersectBezier3Ellipse
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @param {module:kld-intersections.Point2D} ec
     *  @param {number} rx
     *  @param {number} ry
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Ellipse",
    value: function intersectBezier3Ellipse(p1, p2, p3, p4, ec, rx, ry) {
      var a, b, c, d; // temporary variables
      // c3, c2, c1, c0; // coefficients of cubic

      var result = new Intersection("No Intersection"); // Calculate the coefficients of cubic polynomial

      a = p1.multiply(-1);
      b = p2.multiply(3);
      c = p3.multiply(-3);
      d = a.add(b.add(c.add(p4)));
      var c3 = new Point2D(d.x, d.y);
      a = p1.multiply(3);
      b = p2.multiply(-6);
      c = p3.multiply(3);
      d = a.add(b.add(c));
      var c2 = new Point2D(d.x, d.y);
      a = p1.multiply(-3);
      b = p2.multiply(3);
      c = a.add(b);
      var c1 = new Point2D(c.x, c.y);
      var c0 = new Point2D(p1.x, p1.y);
      var rxrx = rx * rx;
      var ryry = ry * ry;
      var poly = new Polynomial(c3.x * c3.x * ryry + c3.y * c3.y * rxrx, 2 * (c3.x * c2.x * ryry + c3.y * c2.y * rxrx), 2 * (c3.x * c1.x * ryry + c3.y * c1.y * rxrx) + c2.x * c2.x * ryry + c2.y * c2.y * rxrx, 2 * c3.x * ryry * (c0.x - ec.x) + 2 * c3.y * rxrx * (c0.y - ec.y) + 2 * (c2.x * c1.x * ryry + c2.y * c1.y * rxrx), 2 * c2.x * ryry * (c0.x - ec.x) + 2 * c2.y * rxrx * (c0.y - ec.y) + c1.x * c1.x * ryry + c1.y * c1.y * rxrx, 2 * c1.x * ryry * (c0.x - ec.x) + 2 * c1.y * rxrx * (c0.y - ec.y), c0.x * c0.x * ryry - 2 * c0.y * ec.y * rxrx - 2 * c0.x * ec.x * ryry + c0.y * c0.y * rxrx + ec.x * ec.x * ryry + ec.y * ec.y * rxrx - rxrx * ryry);
      var roots = poly.getRootsInInterval(0, 1);
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = roots[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var t = _step11.value;
          result.points.push(c3.multiply(t * t * t).add(c2.multiply(t * t).add(c1.multiply(t).add(c0))));
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier3Line
     *
     *  Many thanks to Dan Sunday at SoftSurfer.com.  He gave me a very thorough
     *  sketch of the algorithm used here.  Without his help, I'm not sure when I
     *  would have figured out this intersection problem.
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Line",
    value: function intersectBezier3Line(p1, p2, p3, p4, a1, a2) {
      var a, b, c, d; // temporary variables
      // c3, c2, c1, c0; // coefficients of cubic
      // cl; // c coefficient for normal form of line
      // n; // normal for normal form of line

      var min = a1.min(a2); // used to determine if point is on line segment

      var max = a1.max(a2); // used to determine if point is on line segment

      var result = new Intersection("No Intersection"); // Start with Bezier using Bernstein polynomials for weighting functions:
      //     (1-t^3)P1 + 3t(1-t)^2P2 + 3t^2(1-t)P3 + t^3P4
      //
      // Expand and collect terms to form linear combinations of original Bezier
      // controls.  This ends up with a vector cubic in t:
      //     (-P1+3P2-3P3+P4)t^3 + (3P1-6P2+3P3)t^2 + (-3P1+3P2)t + P1
      //             /\                  /\                /\       /\
      //             ||                  ||                ||       ||
      //             c3                  c2                c1       c0
      // Calculate the coefficients

      a = p1.multiply(-1);
      b = p2.multiply(3);
      c = p3.multiply(-3);
      d = a.add(b.add(c.add(p4)));
      var c3 = new Vector2D(d.x, d.y);
      a = p1.multiply(3);
      b = p2.multiply(-6);
      c = p3.multiply(3);
      d = a.add(b.add(c));
      var c2 = new Vector2D(d.x, d.y);
      a = p1.multiply(-3);
      b = p2.multiply(3);
      c = a.add(b);
      var c1 = new Vector2D(c.x, c.y);
      var c0 = new Vector2D(p1.x, p1.y); // Convert line to normal form: ax + by + c = 0
      // Find normal to line: negative inverse of original line's slope

      var n = new Vector2D(a1.y - a2.y, a2.x - a1.x); // Determine new c coefficient

      var cl = a1.x * a2.y - a2.x * a1.y; // ?Rotate each cubic coefficient using line for new coordinate system?
      // Find roots of rotated cubic

      var roots = new Polynomial(n.dot(c3), n.dot(c2), n.dot(c1), n.dot(c0) + cl).getRoots(); // Any roots in closed interval [0,1] are intersections on Bezier, but
      // might not be on the line segment.
      // Find intersections and calculate point coordinates

      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = roots[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var t = _step12.value;

          if (0 <= t && t <= 1) {
            // We're within the Bezier curve
            // Find point on Bezier
            var p5 = p1.lerp(p2, t);
            var p6 = p2.lerp(p3, t);
            var p7 = p3.lerp(p4, t);
            var p8 = p5.lerp(p6, t);
            var p9 = p6.lerp(p7, t);
            var p10 = p8.lerp(p9, t); // See if point is on line segment
            // Had to make special cases for vertical and horizontal lines due
            // to slight errors in calculation of p10

            if (a1.x === a2.x) {
              if (min.y <= p10.y && p10.y <= max.y) {
                result.status = "Intersection";
                result.appendPoint(p10);
              }
            } else if (a1.y === a2.y) {
              if (min.x <= p10.x && p10.x <= max.x) {
                result.status = "Intersection";
                result.appendPoint(p10);
              }
            } else if (min.x <= p10.x && p10.x <= max.x && min.y <= p10.y && p10.y <= max.y) {
              result.status = "Intersection";
              result.appendPoint(p10);
            }
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      return result;
    }
    /**
     *  intersectBezier3Polygon
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Polygon",
    value: function intersectBezier3Polygon(p1, p2, p3, p4, points) {
      return Intersection.intersectBezier3Polyline(p1, p2, p3, p4, closePolygon(points));
    }
    /**
     *  intersectBezier3Polyline
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Polyline",
    value: function intersectBezier3Polyline(p1, p2, p3, p4, points) {
      var result = new Intersection("No Intersection");
      var len = points.length;

      for (var i = 0; i < len - 1; i++) {
        var a1 = points[i];
        var a2 = points[i + 1];
        var inter = Intersection.intersectBezier3Line(p1, p2, p3, p4, a1, a2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectBezier3Rectangle
     *
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectBezier3Rectangle",
    value: function intersectBezier3Rectangle(p1, p2, p3, p4, r1, r2) {
      var min = r1.min(r2);
      var max = r1.max(r2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectBezier3Line(p1, p2, p3, p4, min, topRight);
      var inter2 = Intersection.intersectBezier3Line(p1, p2, p3, p4, topRight, max);
      var inter3 = Intersection.intersectBezier3Line(p1, p2, p3, p4, max, bottomLeft);
      var inter4 = Intersection.intersectBezier3Line(p1, p2, p3, p4, bottomLeft, min);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectCircleCircle
     *
     *  @param {module:kld-intersections.Point2D} c1
     *  @param {number} r1
     *  @param {module:kld-intersections.Point2D} c2
     *  @param {number} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectCircleCircle",
    value: function intersectCircleCircle(c1, r1, c2, r2) {
      var result; // Determine minimum and maximum radii where circles can intersect

      var r_max = r1 + r2;
      var r_min = Math.abs(r1 - r2); // Determine actual distance between circle circles

      var c_dist = c1.distanceFrom(c2);

      if (c_dist > r_max) {
        result = new Intersection("Outside");
      } else if (c_dist < r_min) {
        result = new Intersection("Inside");
      } else {
        result = new Intersection("Intersection");
        var a = (r1 * r1 - r2 * r2 + c_dist * c_dist) / (2 * c_dist);
        var h = Math.sqrt(r1 * r1 - a * a);
        var p = c1.lerp(c2, a / c_dist);
        var b = h / c_dist;
        result.points.push(new Point2D(p.x - b * (c2.y - c1.y), p.y + b * (c2.x - c1.x)));
        result.points.push(new Point2D(p.x + b * (c2.y - c1.y), p.y - b * (c2.x - c1.x)));
      }

      return result;
    }
    /**
     *  intersectCircleEllipse
     *
     *  @param {module:kld-intersections.Point2D} cc
     *  @param {number} r
     *  @param {module:kld-intersections.Point2D} ec
     *  @param {number} rx
     *  @param {number} ry
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectCircleEllipse",
    value: function intersectCircleEllipse(cc, r, ec, rx, ry) {
      return Intersection.intersectEllipseEllipse(cc, r, r, ec, rx, ry);
    }
    /**
     *  intersectCircleLine
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} r
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectCircleLine",
    value: function intersectCircleLine(c, r, a1, a2) {
      var result;
      var a = (a2.x - a1.x) * (a2.x - a1.x) + (a2.y - a1.y) * (a2.y - a1.y);
      var b = 2 * ((a2.x - a1.x) * (a1.x - c.x) + (a2.y - a1.y) * (a1.y - c.y));
      var cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y - 2 * (c.x * a1.x + c.y * a1.y) - r * r;
      var deter = b * b - 4 * a * cc;

      if (deter < 0) {
        result = new Intersection("Outside");
      } else if (deter === 0) {
        result = new Intersection("Tangent"); // NOTE: should calculate this point
      } else {
        var e = Math.sqrt(deter);
        var u1 = (-b + e) / (2 * a);
        var u2 = (-b - e) / (2 * a);

        if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
          if (u1 < 0 && u2 < 0 || u1 > 1 && u2 > 1) {
            result = new Intersection("Outside");
          } else {
            result = new Intersection("Inside");
          }
        } else {
          result = new Intersection("Intersection");

          if (0 <= u1 && u1 <= 1) {
            result.points.push(a1.lerp(a2, u1));
          }

          if (0 <= u2 && u2 <= 1) {
            result.points.push(a1.lerp(a2, u2));
          }
        }
      }

      return result;
    }
    /**
     *  intersectCirclePolygon
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} r
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectCirclePolygon",
    value: function intersectCirclePolygon(c, r, points) {
      return Intersection.intersectCirclePolyline(c, r, closePolygon(points));
    }
    /**
     *  intersectCirclePolyline
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} r
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectCirclePolyline",
    value: function intersectCirclePolyline(c, r, points) {
      var result = new Intersection("No Intersection");
      var len = points.length;
      var inter;

      for (var i = 0; i < len - 1; i++) {
        var a1 = points[i];
        var a2 = points[i + 1];
        inter = Intersection.intersectCircleLine(c, r, a1, a2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      } else {
        result.status = inter.status;
      }

      return result;
    }
    /**
     *  intersectCircleRectangle
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} r
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectCircleRectangle",
    value: function intersectCircleRectangle(c, r, r1, r2) {
      var min = r1.min(r2);
      var max = r1.max(r2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectCircleLine(c, r, min, topRight);
      var inter2 = Intersection.intersectCircleLine(c, r, topRight, max);
      var inter3 = Intersection.intersectCircleLine(c, r, max, bottomLeft);
      var inter4 = Intersection.intersectCircleLine(c, r, bottomLeft, min);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      } else {
        result.status = inter1.status;
      }

      return result;
    }
    /**
     *  intersectEllipseEllipse
     *
     *  This code is based on MgcIntr2DElpElp.cpp written by David Eberly.  His
     *  code along with many other excellent examples are avaiable at his site:
     *  http://www.magic-software.com
     *
     *  NOTE: Rotation will need to be added to this function
     *
     *  @param {module:kld-intersections.Point2D} c1
     *  @param {number} rx1
     *  @param {number} ry1
     *  @param {module:kld-intersections.Point2D} c2
     *  @param {number} rx2
     *  @param {number} ry2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectEllipseEllipse",
    value: function intersectEllipseEllipse(c1, rx1, ry1, c2, rx2, ry2) {
      var a = [ry1 * ry1, 0, rx1 * rx1, -2 * ry1 * ry1 * c1.x, -2 * rx1 * rx1 * c1.y, ry1 * ry1 * c1.x * c1.x + rx1 * rx1 * c1.y * c1.y - rx1 * rx1 * ry1 * ry1];
      var b = [ry2 * ry2, 0, rx2 * rx2, -2 * ry2 * ry2 * c2.x, -2 * rx2 * rx2 * c2.y, ry2 * ry2 * c2.x * c2.x + rx2 * rx2 * c2.y * c2.y - rx2 * rx2 * ry2 * ry2];
      var yPoly = bezout(a, b);
      var yRoots = yPoly.getRoots();
      var epsilon = 1e-3;
      var norm0 = (a[0] * a[0] + 2 * a[1] * a[1] + a[2] * a[2]) * epsilon;
      var norm1 = (b[0] * b[0] + 2 * b[1] * b[1] + b[2] * b[2]) * epsilon;
      var result = new Intersection("No Intersection");

      for (var y = 0; y < yRoots.length; y++) {
        var xPoly = new Polynomial(a[0], a[3] + yRoots[y] * a[1], a[5] + yRoots[y] * (a[4] + yRoots[y] * a[2]));
        var xRoots = xPoly.getRoots();

        for (var x = 0; x < xRoots.length; x++) {
          var tst = (a[0] * xRoots[x] + a[1] * yRoots[y] + a[3]) * xRoots[x] + (a[2] * yRoots[y] + a[4]) * yRoots[y] + a[5];

          if (Math.abs(tst) < norm0) {
            tst = (b[0] * xRoots[x] + b[1] * yRoots[y] + b[3]) * xRoots[x] + (b[2] * yRoots[y] + b[4]) * yRoots[y] + b[5];

            if (Math.abs(tst) < norm1) {
              result.appendPoint(new Point2D(xRoots[x], yRoots[y]));
            }
          }
        }
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectEllipseLine
     *
     *  NOTE: Rotation will need to be added to this function
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} rx
     *  @param {number} ry
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectEllipseLine",
    value: function intersectEllipseLine(c, rx, ry, a1, a2) {
      var result;
      var orign = new Vector2D(a1.x, a1.y);
      var dir = Vector2D.fromPoints(a1, a2);
      var center = new Vector2D(c.x, c.y);
      var diff = orign.subtract(center);
      var mDir = new Vector2D(dir.x / (rx * rx), dir.y / (ry * ry));
      var mDiff = new Vector2D(diff.x / (rx * rx), diff.y / (ry * ry));
      var a = dir.dot(mDir);
      var b = dir.dot(mDiff);
      c = diff.dot(mDiff) - 1.0;
      var d = b * b - a * c;

      if (d < 0) {
        result = new Intersection("Outside");
      } else if (d > 0) {
        var root = Math.sqrt(d); // eslint-disable-line no-shadow

        var t_a = (-b - root) / a;
        var t_b = (-b + root) / a;

        if ((t_a < 0 || 1 < t_a) && (t_b < 0 || 1 < t_b)) {
          if (t_a < 0 && t_b < 0 || t_a > 1 && t_b > 1) {
            result = new Intersection("Outside");
          } else {
            result = new Intersection("Inside");
          }
        } else {
          result = new Intersection("Intersection");

          if (0 <= t_a && t_a <= 1) {
            result.appendPoint(a1.lerp(a2, t_a));
          }

          if (0 <= t_b && t_b <= 1) {
            result.appendPoint(a1.lerp(a2, t_b));
          }
        }
      } else {
        var t = -b / a;

        if (0 <= t && t <= 1) {
          result = new Intersection("Intersection");
          result.appendPoint(a1.lerp(a2, t));
        } else {
          result = new Intersection("Outside");
        }
      }

      return result;
    }
    /**
     *  intersectEllipsePolygon
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} rx
     *  @param {number} ry
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectEllipsePolygon",
    value: function intersectEllipsePolygon(c, rx, ry, points) {
      return Intersection.intersectEllipsePolyline(c, rx, ry, closePolygon(points));
    }
    /**
     *  intersectEllipsePolyline
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} rx
     *  @param {number} ry
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectEllipsePolyline",
    value: function intersectEllipsePolyline(c, rx, ry, points) {
      var result = new Intersection("No Intersection");
      var len = points.length;

      for (var i = 0; i < len - 1; i++) {
        var b1 = points[i];
        var b2 = points[i + 1];
        var inter = Intersection.intersectEllipseLine(c, rx, ry, b1, b2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectEllipseRectangle
     *
     *  @param {module:kld-intersections.Point2D} c
     *  @param {number} rx
     *  @param {number} ry
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectEllipseRectangle",
    value: function intersectEllipseRectangle(c, rx, ry, r1, r2) {
      var min = r1.min(r2);
      var max = r1.max(r2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectEllipseLine(c, rx, ry, min, topRight);
      var inter2 = Intersection.intersectEllipseLine(c, rx, ry, topRight, max);
      var inter3 = Intersection.intersectEllipseLine(c, rx, ry, max, bottomLeft);
      var inter4 = Intersection.intersectEllipseLine(c, rx, ry, bottomLeft, min);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectLineLine
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} b1
     *  @param {module:kld-intersections.Point2D} b2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectLineLine",
    value: function intersectLineLine(a1, a2, b1, b2) {
      var result;
      var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
      var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
      var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

      if (u_b !== 0) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
          result = new Intersection("Intersection");
          result.points.push(new Point2D(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)));
        } else {
          result = new Intersection("No Intersection");
        }
      } else if (ua_t === 0 || ub_t === 0) {
        result = new Intersection("Coincident");
      } else {
        result = new Intersection("Parallel");
      }

      return result;
    }
    /**
     *  intersectLinePolygon
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectLinePolygon",
    value: function intersectLinePolygon(a1, a2, points) {
      return Intersection.intersectLinePolyline(a1, a2, closePolygon(points));
    }
    /**
     *  intersectLinePolyline
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectLinePolyline",
    value: function intersectLinePolyline(a1, a2, points) {
      var result = new Intersection("No Intersection");
      var len = points.length;

      for (var i = 0; i < len - 1; i++) {
        var b1 = points[i];
        var b2 = points[i + 1];
        var inter = Intersection.intersectLineLine(a1, a2, b1, b2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectLineRectangle
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectLineRectangle",
    value: function intersectLineRectangle(a1, a2, r1, r2) {
      var min = r1.min(r2);
      var max = r1.max(r2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectLineLine(min, topRight, a1, a2);
      var inter2 = Intersection.intersectLineLine(topRight, max, a1, a2);
      var inter3 = Intersection.intersectLineLine(max, bottomLeft, a1, a2);
      var inter4 = Intersection.intersectLineLine(bottomLeft, min, a1, a2);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectPolygonPolygon
     *
     *  @param {Array<module:kld-intersections.Point2D>} points1
     *  @param {Array<module:kld-intersections.Point2D>} points2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectPolygonPolygon",
    value: function intersectPolygonPolygon(points1, points2) {
      return Intersection.intersectPolylinePolyline(closePolygon(points1), closePolygon(points2));
    }
    /**
     *  intersectPolygonPolyline
     *
     *  @param {Array<module:kld-intersections.Point2D>} points1
     *  @param {Array<module:kld-intersections.Point2D>} points2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectPolygonPolyline",
    value: function intersectPolygonPolyline(points1, points2) {
      return Intersection.intersectPolylinePolyline(closePolygon(points1), points2);
    }
    /**
     *  intersectPolygonRectangle
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectPolygonRectangle",
    value: function intersectPolygonRectangle(points, r1, r2) {
      return Intersection.intersectPolylineRectangle(closePolygon(points), r1, r2);
    }
    /**
     *  intersectPolylinePolyline
     *
     *  @param {Array<module:kld-intersections.Point2D>} points1
     *  @param {Array<module:kld-intersections.Point2D>} points2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectPolylinePolyline",
    value: function intersectPolylinePolyline(points1, points2) {
      var result = new Intersection("No Intersection");
      var len = points1.length;

      for (var i = 0; i < len - 1; i++) {
        var a1 = points1[i];
        var a2 = points1[i + 1];
        var inter = Intersection.intersectLinePolyline(a1, a2, points2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectPolylineRectangle
     *
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @param {module:kld-intersections.Point2D} r1
     *  @param {module:kld-intersections.Point2D} r2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectPolylineRectangle",
    value: function intersectPolylineRectangle(points, r1, r2) {
      var min = r1.min(r2);
      var max = r1.max(r2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectLinePolyline(min, topRight, points);
      var inter2 = Intersection.intersectLinePolyline(topRight, max, points);
      var inter3 = Intersection.intersectLinePolyline(max, bottomLeft, points);
      var inter4 = Intersection.intersectLinePolyline(bottomLeft, min, points);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectRectangleRectangle
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} b1
     *  @param {module:kld-intersections.Point2D} b2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectRectangleRectangle",
    value: function intersectRectangleRectangle(a1, a2, b1, b2) {
      var min = a1.min(a2);
      var max = a1.max(a2);
      var topRight = new Point2D(max.x, min.y);
      var bottomLeft = new Point2D(min.x, max.y);
      var inter1 = Intersection.intersectLineRectangle(min, topRight, b1, b2);
      var inter2 = Intersection.intersectLineRectangle(topRight, max, b1, b2);
      var inter3 = Intersection.intersectLineRectangle(max, bottomLeft, b1, b2);
      var inter4 = Intersection.intersectLineRectangle(bottomLeft, min, b1, b2);
      var result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     *  intersectRayRay
     *
     *  @param {module:kld-intersections.Point2D} a1
     *  @param {module:kld-intersections.Point2D} a2
     *  @param {module:kld-intersections.Point2D} b1
     *  @param {module:kld-intersections.Point2D} b2
     *  @returns {module:kld-intersections.Intersection}
     */

  }, {
    key: "intersectRayRay",
    value: function intersectRayRay(a1, a2, b1, b2) {
      var result;
      var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
      var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
      var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

      if (u_b !== 0) {
        var ua = ua_t / u_b;
        result = new Intersection("Intersection");
        result.points.push(new Point2D(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)));
      } else if (ua_t === 0 || ub_t === 0) {
        result = new Intersection("Coincident");
      } else {
        result = new Intersection("Parallel");
      }

      return result;
    }
  }]);

  return Intersection;
}();

/**
 * Build shapes for intersection
 */

var Shapes =
/*#__PURE__*/
function () {
  function Shapes() {
    _classCallCheck(this, Shapes);
  }

  _createClass(Shapes, null, [{
    key: "arc",

    /**
     *  arc
     *
     *  @deprecated use ShapeInfo.arc
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @param {number} startRadians
     *  @param {number} endRadians
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    value: function arc(centerX, centerY, radiusX, radiusY, startRadians, endRadians) {
      return ShapeInfo.arc.apply(ShapeInfo, arguments);
    }
    /**
     *  quadraticBezier
     *
     *  @deprecated use ShapeInfo.quadraticBezier
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "quadraticBezier",
    value: function quadraticBezier(p1x, p1y, p2x, p2y, p3x, p3y) {
      return ShapeInfo.quadraticBezier.apply(ShapeInfo, arguments);
    }
    /**
     *  cubicBezier
     *
     *  @deprecated use ShapeInfo.cubicBezier
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @param {number} p3x
     *  @param {number} p3y
     *  @param {number} p4x
     *  @param {number} p4y
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "cubicBezier",
    value: function cubicBezier(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
      return ShapeInfo.cubicBezier.apply(ShapeInfo, arguments);
    }
    /**
     *  circle
     *
     *  @deprecated use ShapeInfo.circle
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radius
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "circle",
    value: function circle(centerX, centerY, radius) {
      return ShapeInfo.circle.apply(ShapeInfo, arguments);
    }
    /**
     *  ellipse
     *
     *  @deprecated use ShapeInfo.ellipse
     *  @param {number} centerX
     *  @param {number} centerY
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "ellipse",
    value: function ellipse(centerX, centerY, radiusX, radiusY) {
      return ShapeInfo.ellipse.apply(ShapeInfo, arguments);
    }
    /**
     *  line
     *
     *  @deprecated use ShapeInfo.line
     *  @param {number} p1x
     *  @param {number} p1y
     *  @param {number} p2x
     *  @param {number} p2y
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "line",
    value: function line(p1x, p1y, p2x, p2y) {
      return ShapeInfo.line.apply(ShapeInfo, arguments);
    }
    /**
     *  path
     *
     *  @deprecated use ShapeInfo.path
     *  @param {string} pathData
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "path",
    value: function path(pathData) {
      return ShapeInfo.path.apply(ShapeInfo, arguments);
    }
    /**
     *  polygon
     *
     *  @deprecated use ShapeInfo.polygon
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "polygon",
    value: function polygon(coords) {
      return ShapeInfo.polygon.apply(ShapeInfo, arguments);
    }
    /**
     *  polyline
     *
     *  @deprecated use ShapeInfo.polyline
     *  @param {Array<number>} coords
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "polyline",
    value: function polyline(coords) {
      return ShapeInfo.polyline.apply(ShapeInfo, arguments);
    }
    /**
     *  rectangle
     *
     *  @deprecated use ShapeInfo.rectangle
     *  @param {number} x
     *  @param {number} y
     *  @param {number} width
     *  @param {number} height
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "rectangle",
    value: function rectangle(x, y, width, height) {
      return ShapeInfo.rectangle.apply(ShapeInfo, arguments);
    }
  }]);

  return Shapes;
}();

/**
 * Build shapes for intersection
 */

var AffineShapes =
/*#__PURE__*/
function () {
  function AffineShapes() {
    _classCallCheck(this, AffineShapes);
  }

  _createClass(AffineShapes, null, [{
    key: "arc",

    /**
     *  arc
     *
     *  @deprecated use ShapeInfo.arc
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @param {number} startRadians
     *  @param {number} endRadians
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    value: function arc(center, radiusX, radiusY, startRadians, endRadians) {
      return ShapeInfo.arc.apply(ShapeInfo, arguments);
    }
    /**
     *  quadraticBezier
     *
     *   @deprecated use ShapeInfo.quadraticBezier
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "quadraticBezier",
    value: function quadraticBezier(p1, p2, p3) {
      return ShapeInfo.quadraticBezier.apply(ShapeInfo, arguments);
    }
    /**
     *  cubicBezier
     *
     *  @deprecated use ShapeInfo.cubicBezier
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @param {module:kld-intersections.Point2D} p3
     *  @param {module:kld-intersections.Point2D} p4
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "cubicBezier",
    value: function cubicBezier(p1, p2, p3, p4) {
      return ShapeInfo.cubicBezier.apply(ShapeInfo, arguments);
    }
    /**
     *  circle
     *
     *  @deprecated use ShapeInfo.circle
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radius
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "circle",
    value: function circle(center, radius) {
      return ShapeInfo.circle.apply(ShapeInfo, arguments);
    }
    /**
     *  ellipse
     *
     *  @deprecated use ShapeInfo.ellipse
     *  @param {module:kld-intersections.Point2D} center
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "ellipse",
    value: function ellipse(center, radiusX, radiusY) {
      return ShapeInfo.ellipse.apply(ShapeInfo, arguments);
    }
    /**
     *  line
     *
     *  @deprecated use ShapeInfo.line
     *  @param {module:kld-intersections.Point2D} p1
     *  @param {module:kld-intersections.Point2D} p2
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "line",
    value: function line(p1, p2) {
      return ShapeInfo.line.apply(ShapeInfo, arguments);
    }
    /**
     *  path
     *
     *  @deprecated use ShapeInfo.path
     *  @param {string} pathData
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "path",
    value: function path(pathData) {
      return ShapeInfo.path.apply(ShapeInfo, arguments);
    }
    /**
     *  polygon
     *
     *  @deprecated use ShapeInfo.polygon
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "polygon",
    value: function polygon(points) {
      return ShapeInfo.polygon.apply(ShapeInfo, arguments);
    }
    /**
     *  polyline
     *
     *  @deprecated use ShapeInfo.polyline
     *  @param {Array<module:kld-intersections.Point2D>} points
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "polyline",
    value: function polyline(points) {
      return ShapeInfo.polyline.apply(ShapeInfo, arguments);
    }
    /**
     *  rectangle
     *
     *  @deprecated use ShapeInfo.rectangle
     *  @param {module:kld-intersections.Point2D} topLeft
     *  @param {module:kld-intersections.Vector2D} size
     *  @param {number} [rx]
     *  @param {number} [ry]
     *  @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "rectangle",
    value: function rectangle(topLeft, size) {
      return ShapeInfo.rectangle.apply(ShapeInfo, arguments);
    }
  }]);

  return AffineShapes;
}();

var SvgShapes =
/*#__PURE__*/
function () {
  function SvgShapes() {
    _classCallCheck(this, SvgShapes);
  }

  _createClass(SvgShapes, null, [{
    key: "circle",

    /**
     * circle
     *
     * @param {SVGCircleElement} circle
     * @returns {module:kld-intersections.ShapeInfo}
     */
    value: function circle(_circle) {
      if (_circle instanceof SVGCircleElement === false) {
        throw new TypeError("Expected SVGCircleElement, but found ".concat(_circle));
      }

      var center = new Point2D(_circle.cx.baseVal.value, _circle.cy.baseVal.value);
      var radius = _circle.r.baseVal.value;
      return ShapeInfo.circle(center, radius);
    }
    /**
     * ellipse
     *
     * @param {SVGEllipseElement} ellipse
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "ellipse",
    value: function ellipse(_ellipse) {
      if (_ellipse instanceof SVGEllipseElement === false) {
        throw new TypeError("Expected SVGEllipseElement, but found ".concat(_ellipse));
      }

      var center = new Point2D(_ellipse.cx.baseVal.value, _ellipse.cy.baseVal.value);
      var radiusX = _ellipse.rx.baseVal.value;
      var radiusY = _ellipse.ry.baseVal.value;
      return ShapeInfo.ellipse(center, radiusX, radiusY);
    }
    /**
     * line
     *
     * @param {SVGLineElement} line
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "line",
    value: function line(_line) {
      if (_line instanceof SVGLineElement === false) {
        throw new TypeError("Expected SVGLineElement, but found ".concat(_line));
      }

      var p1 = new Point2D(_line.x1.baseVal.value, _line.y1.baseVal.value);
      var p2 = new Point2D(_line.x2.baseVal.value, _line.y2.baseVal.value);
      return ShapeInfo.line(p1, p2);
    }
    /**
     * path
     *
     * @param {SVGPathElement} path
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "path",
    value: function path(_path) {
      if (_path instanceof SVGPathElement === false) {
        throw new TypeError("Expected SVGPathElement, but found ".concat(_path));
      }

      var pathData = _path.getAttributeNS(null, "d");

      return ShapeInfo.path(pathData);
    }
    /**
     * polygon
     *
     * @param {SVGPolygonElement} polygon
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "polygon",
    value: function polygon(_polygon) {
      if (_polygon instanceof SVGPolygonElement === false) {
        throw new TypeError("Expected SVGPolygonElement, but found ".concat(_polygon));
      }

      var points = [];

      for (var i = 0; i < _polygon.points.numberOfItems; i++) {
        var point = _polygon.points.getItem(i);

        points.push(new Point2D(point.x, point.y));
      }

      return ShapeInfo.polygon(points);
    }
    /**
     * polyline
     *
     * @param {SVGPolylineElement} polyline
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "polyline",
    value: function polyline(_polyline) {
      if (_polyline instanceof SVGPolylineElement === false) {
        throw new TypeError("Expected SVGPolylineElement, but found ".concat(_polyline));
      }

      var points = [];

      for (var i = 0; i < _polyline.points.numberOfItems; i++) {
        var point = _polyline.points.getItem(i);

        points.push(new Point2D(point.x, point.y));
      }

      return ShapeInfo.polyline(points);
    }
    /**
     * rect
     *
     * @param {SVGRectElement} rect
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "rect",
    value: function rect(_rect) {
      if (_rect instanceof SVGRectElement === false) {
        throw new TypeError("Expected SVGRectElement, but found ".concat(_rect));
      }

      return ShapeInfo.rectangle(_rect.x.baseVal.value, _rect.y.baseVal.value, _rect.width.baseVal.value, _rect.height.baseVal.value, _rect.rx.baseVal.value, _rect.ry.baseVal.value);
    }
    /**
     * element
     *
     * @param {SVGElement} element
     * @returns {module:kld-intersections.ShapeInfo}
     */

  }, {
    key: "element",
    value: function element(_element) {
      if (_element instanceof SVGElement === false) {
        throw new TypeError("Expected SVGElement, but found ".concat(_element));
      }
      /* eslint-disable-next-line prefer-destructuring */


      var tagName = _element.tagName;

      switch (tagName) {
        case "circle":
          return SvgShapes.circle(_element);

        case "ellipse":
          return SvgShapes.ellipse(_element);

        case "line":
          return SvgShapes.line(_element);

        case "path":
          return SvgShapes.path(_element);

        case "polygon":
          return SvgShapes.polygon(_element);

        case "polyline":
          return SvgShapes.polyline(_element);

        case "rect":
          return SvgShapes.rect(_element);

        default:
          throw new TypeError("Unrecognized element type: '".concat(tagName, "'"));
      }
    }
  }]);

  return SvgShapes;
}();

/**
 *
 *  IntersectionQuery.js
 *
 *  @copyright 2017 Kevin Lindsey
 * @module IntersectionQuery
 */
/**
 * @namespace
 */

var IntersectionQuery = {};
/**
 *  pointInCircle
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {module:kld-intersections.Point2D} center
 *  @param {number} radius
 *  @returns {boolean}
 */

IntersectionQuery.pointInCircle = function (point, center, radius) {
  var v = Vector2D.fromPoints(center, point);
  return v.length() <= radius;
};
/**
 *  pointInEllipse
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {module:kld-intersections.Point2D} center
 *  @param {number} radiusX
 *  @param {number} radiusY
 *  @returns {boolean}
 */


IntersectionQuery.pointInEllipse = function (point, center, radiusX, radiusY) {
  var len = point.subtract(center);
  return len.x * len.x / (radiusX * radiusX) + len.y * len.y / (radiusY * radiusY) <= 1;
};
/**
 *  pointInPolyline
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {Array<module:kld-intersections.Point2D>} points
 */


IntersectionQuery.pointInPolyline = function (point, points) {
  var len = points.length;
  var counter = 0;
  var xInter;
  var p1 = points[0];

  for (var i = 1; i <= len; i++) {
    var p2 = points[i % len];
    var minY = Math.min(p1.y, p2.y);
    var maxY = Math.max(p1.y, p2.y);
    var maxX = Math.max(p1.x, p2.x);

    if (p1.y !== p2.y && minY < point.y && point.y <= maxY && point.x <= maxX) {
      xInter = (point.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;

      if (p1.x === p2.x || point.x <= xInter) {
        counter++;
      }
    }

    p1 = p2;
  }

  return counter % 2 === 1;
};
/**
 *  pointInPolyline
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {Array<module:kld-intersections.Point2D>} points
 */


IntersectionQuery.pointInPolygon = IntersectionQuery.pointInPolyline;
/**
 *  pointInRectangle
 *
 *  @param {module:kld-intersections.Point2D} point
 *  @param {module:kld-intersections.Point2D} topLeft
 *  @param {module:kld-intersections.Point2D} bottomRight
 *  @returns {boolean}
 */

IntersectionQuery.pointInRectangle = function (point, topLeft, bottomRight) {
  return topLeft.x <= point.x && point.x < bottomRight.x && topLeft.y <= point.y && point.y < bottomRight.y;
};

/**
 * @module kld-intersections
 */
/**
* @external Polynomial
*/

export { AffineShapes, Intersection, ShapeInfo as IntersectionArgs, IntersectionQuery, Matrix2D, Point2D, ShapeInfo, Shapes, SvgShapes, Vector2D };
