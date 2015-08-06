var IntersectionParams = require('./IntersectionParams');

function Token(type, text) {
	if (arguments.length > 0) {
		this.init(type, text);
	}
}
Token.prototype.init = function(type, text) {
	this.type = type;
	this.text = text;
};
Token.prototype.typeis = function(type) {
	return this.type == type;
}
var Path = {};
Path.COMMAND = 0;
Path.NUMBER = 1;
Path.EOD = 2;
Path.PARAMS = {
	A: ["rx", "ry", "x-axis-rotation", "large-arc-flag", "sweep-flag", "x", "y"],
	a: ["rx", "ry", "x-axis-rotation", "large-arc-flag", "sweep-flag", "x", "y"],
	C: ["x1", "y1", "x2", "y2", "x", "y"],
	c: ["x1", "y1", "x2", "y2", "x", "y"],
	H: ["x"],
	h: ["x"],
	L: ["x", "y"],
	l: ["x", "y"],
	M: ["x", "y"],
	m: ["x", "y"],
	Q: ["x1", "y1", "x", "y"],
	q: ["x1", "y1", "x", "y"],
	S: ["x2", "y2", "x", "y"],
	s: ["x2", "y2", "x", "y"],
	T: ["x", "y"],
	t: ["x", "y"],
	V: ["y"],
	v: ["y"],
	Z: [],
	z: []
};

function tokenize(d) {
	var tokens = new Array();
	while (d != "") {
		if (d.match(/^([ \t\r\n,]+)/)) {
			d = d.substr(RegExp.$1.length);
		} else if (d.match(/^([aAcChHlLmMqQsStTvVzZ])/)) {
			tokens[tokens.length] = new Token(Path.COMMAND, RegExp.$1);
			d = d.substr(RegExp.$1.length);
		} else if (d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) {
			tokens[tokens.length] = new Token(Path.NUMBER, parseFloat(RegExp.$1));
			d = d.substr(RegExp.$1.length);
		} else {
			throw new Error("Unrecognized segment command: " + d);
		}
	}
	tokens[tokens.length] = new Token(Path.EOD, null);
	return tokens;
}

module.exports = function newPath(d) {
	var tokens = this.tokenize(d);
	var index = 0;
	var token = tokens[index];
	var mode = "BOD";
	var intersectionParams = [];

	while (!token.typeis(Path.EOD)) {
		var param_length;
		var params = new Array();
		if (mode == "BOD") {
			if (token.text == "M" || token.text == "m") {
				index++;
				param_length = Path.PARAMS[token.text].length;
				mode = token.text;
			} else {
				throw new Error("Path data must begin with a moveto command");
			}
		} else {
			if (token.typeis(Path.NUMBER)) {
				param_length = Path.PARAMS[mode].length;
			} else {
				index++;
				param_length = Path.PARAMS[token.text].length;
				mode = token.text;
			}
		}
		if ((index + param_length) < tokens.length) {
			for (var i = index; i < index + param_length; i++) {
				var number = tokens[i];
				if (number.typeis(Path.NUMBER)) params[params.length] = number.text;
				else throw new Error("Parameter type is not a number: " + mode + "," + number.text);
			}
			var segment;
			var length = this.segments.length;
			var previous = (length == 0) ? null : this.segments[length - 1];
			switch (mode) {
				case "A":
					segment = new AbsoluteArcPath(params, this, previous);
					break;
				case "C":
					segment = new AbsoluteCurveto3(params, this, previous);
					break;
				case "c":
					segment = new RelativeCurveto3(params, this, previous);
					break;
				case "H":
					segment = new AbsoluteHLineto(params, this, previous);
					break;
				case "L":
					segment = new AbsoluteLineto(params, this, previous);
					break;
				case "l":
					segment = new RelativeLineto(params, this, previous);
					break;
				case "M":
					segment = new AbsoluteMoveto(params, this, previous);
					break;
				case "m":
					segment = new RelativeMoveto(params, this, previous);
					break;
				case "Q":
					segment = new AbsoluteCurveto2(params, this, previous);
					break;
				case "q":
					segment = new RelativeCurveto2(params, this, previous);
					break;
				case "S":
					segment = new AbsoluteSmoothCurveto3(params, this, previous);
					break;
				case "s":
					segment = new RelativeSmoothCurveto3(params, this, previous);
					break;
				case "T":
					segment = new AbsoluteSmoothCurveto2(params, this, previous);
					break;
				case "t":
					segment = new RelativeSmoothCurveto2(params, this, previous);
					break;
				case "Z":
					segment = new RelativeClosePath(params, this, previous);
					break;
				case "z":
					segment = new RelativeClosePath(params, this, previous);
					break;
				default:
					throw new Error("Unsupported segment type: " + mode);
			};
			intersectionParams.push(segment.getIntersectionParams());
			index += param_length;
			token = tokens[index];
			if (mode == "M") mode = "L";
			if (mode == "m") mode = "l";
		} else {
			throw new Error("Path data ended before all parameters were found");
		}
	}

	return intersectionParams;
}


function AbsolutePathSegment(command, params, owner, previous) {
	if (arguments.length > 0) this.init(command, params, owner, previous);
};
AbsolutePathSegment.prototype.init = function(command, params, owner, previous) {
	this.command = command;
	this.owner = owner;
	this.previous = previous;
	this.points = [];
	var index = 0;
	while (index < params.length) {
		this.points.push(new Point2D(params[index], params[index + 1]));
		index += 2;
	}
};
AbsolutePathSegment.prototype.getLastPoint = function() {
	return this.points[this.points.length - 1].point;
};
AbsolutePathSegment.prototype.getIntersectionParams = function() {
	return null;
};



function AbsoluteArcPath(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("A", params, owner, previous);
	}
}
AbsoluteArcPath.prototype.init = function(command, params, owner, previous) {
	var point = new Array();
	var y = params.pop();
	var x = params.pop();
	point.push(x, y);
	AbsoluteArcPath.superclass.init.call(this, command, point, owner, previous);
	this.rx = parseFloat(params.shift());
	this.ry = parseFloat(params.shift());
	this.angle = parseFloat(params.shift());
	this.arcFlag = parseFloat(params.shift());
	this.sweepFlag = parseFloat(params.shift());
};
AbsoluteArcPath.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Ellipse", [this.getCenter(), this.rx, this.ry]);
};
AbsoluteArcPath.prototype.getCenter = function() {
	var startPoint = this.previous.getLastPoint();
	var endPoint = this.points[0];
	var rx = this.rx;
	var ry = this.ry;
	var angle = this.angle * Math.PI / 180;
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	var TOLERANCE = 1e-6;
	var halfDiff = startPoint.subtract(endPoint).divide(2);
	var x1p = halfDiff.x * c + halfDiff.y * s;
	var y1p = halfDiff.x * -s + halfDiff.y * c;
	var x1px1p = x1p * x1p;
	var y1py1p = y1p * y1p;
	var lambda = (x1px1p / (rx * rx)) + (y1py1p / (ry * ry));
	if (lambda > 1) {
		var factor = Math.sqrt(lambda);
		rx *= factor;
		ry *= factor;
	}
	var rxrx = rx * rx;
	var ryry = ry * ry;
	var rxy1 = rxrx * y1py1p;
	var ryx1 = ryry * x1px1p;
	var factor = (rxrx * ryry - rxy1 - ryx1) / (rxy1 + ryx1);
	if (Math.abs(factor) < TOLERANCE) factor = 0;
	var sq = Math.sqrt(factor);
	if (this.arcFlag == this.sweepFlag) sq = -sq;
	var mid = startPoint.add(endPoint).divide(2);
	var cxp = sq * rx * y1p / ry;
	var cyp = sq * -ry * x1p / rx;
	return new Point2D(cxp * c - cyp * s + mid.x, cxp * s + cyp * c + mid.y);
};



function AbsoluteCurveto2(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("Q", params, owner, previous);
	}
}
AbsoluteCurveto2.prototype = new AbsolutePathSegment();
AbsoluteCurveto2.prototype.constructor = AbsoluteCurveto2;
AbsoluteCurveto2.superclass = AbsolutePathSegment.prototype;

AbsoluteCurveto2.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier2", [this.previous.getLastPoint(), this.points[0], this.points[1]]);
};



function AbsoluteCurveto3(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("C", params, owner, previous);
	}
}
AbsoluteCurveto3.prototype = new AbsolutePathSegment();
AbsoluteCurveto3.prototype.constructor = AbsoluteCurveto3;
AbsoluteCurveto3.superclass = AbsolutePathSegment.prototype;

AbsoluteCurveto3.prototype.getLastControlPoint = function() {
	return this.points[1];
};
AbsoluteCurveto3.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier3", [this.previous.getLastPoint(), this.points[0], this.points[1], this.points[2]]);
};


function AbsoluteHLineto(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("H", params, owner, previous);
	}
}
AbsoluteHLineto.prototype = new AbsolutePathSegment();
AbsoluteHLineto.prototype.constructor = AbsoluteHLineto;
AbsoluteHLineto.superclass = AbsolutePathSegment.prototype;

AbsoluteHLineto.prototype.init = function(command, params, owner, previous) {
	var prevPoint = previous.getLastPoint();
	var point = new Array();
	point.push(params.pop(), prevPoint.y);
	AbsoluteHLineto.superclass.init.call(this, command, point, owner, previous);
};


function AbsoluteLineto(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("L", params, owner, previous);
	}
}
AbsoluteLineto.prototype = new AbsolutePathSegment();
AbsoluteLineto.prototype.constructor = AbsoluteLineto;
AbsoluteLineto.superclass = AbsolutePathSegment.prototype;

AbsoluteLineto.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Line", [this.previous.getLastPoint(), this.points[0]]);
};



function AbsoluteMoveto(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("M", params, owner, previous);
	}
}
AbsoluteMoveto.prototype = new AbsolutePathSegment();
AbsoluteMoveto.prototype.constructor = AbsoluteMoveto;
AbsoluteMoveto.superclass = AbsolutePathSegment.prototype;


function AbsoluteSmoothCurveto2(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("T", params, owner, previous);
	}
}
AbsoluteSmoothCurveto2.prototype = new AbsolutePathSegment();
AbsoluteSmoothCurveto2.prototype.constructor = AbsoluteSmoothCurveto2;
AbsoluteSmoothCurveto2.superclass = AbsolutePathSegment.prototype;

AbsoluteSmoothCurveto2.prototype.getControlPoint = function() {
	var lastPoint = this.previous.getLastPoint();
	var point;
	if (this.previous.command.match(/^[QqTt]$/)) {
		var ctrlPoint = this.previous.getControlPoint();
		var diff = ctrlPoint.subtract(lastPoint);
		point = lastPoint.subtract(diff);
	} else {
		point = lastPoint;
	}
	return point;
};
AbsoluteSmoothCurveto2.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier2", [this.previous.getLastPoint(), this.getControlPoint(), this.points[0]]);
};


function AbsoluteSmoothCurveto3(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("S", params, owner, previous);
	}
}
AbsoluteSmoothCurveto3.prototype = new AbsolutePathSegment();
AbsoluteSmoothCurveto3.prototype.constructor = AbsoluteSmoothCurveto3;
AbsoluteSmoothCurveto3.superclass = AbsolutePathSegment.prototype;

AbsoluteSmoothCurveto3.prototype.getFirstControlPoint = function() {
	var lastPoint = this.previous.getLastPoint();
	var point;
	if (this.previous.command.match(/^[SsCc]$/)) {
		var lastControl = this.previous.getLastControlPoint();
		var diff = lastControl.subtract(lastPoint);
		point = lastPoint.subtract(diff);
	} else {
		point = lastPoint;
	}
	return point;
};
AbsoluteSmoothCurveto3.prototype.getLastControlPoint = function() {
	return this.points[0];
};
AbsoluteSmoothCurveto3.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier3", [this.previous.getLastPoint(), this.getFirstControlPoint(), this.points[0], this.points[1]]);
};


function RelativePathSegment(command, params, owner, previous) {
	if (arguments.length > 0) this.init(command, params, owner, previous);
}
RelativePathSegment.prototype = new AbsolutePathSegment();
RelativePathSegment.prototype.constructor = RelativePathSegment;
RelativePathSegment.superclass = AbsolutePathSegment.prototype;

RelativePathSegment.prototype.init = function(command, params, owner, previous) {
	this.command = command;
	this.owner = owner;
	this.previous = previous;
	this.points = [];
	var lastPoint;
	if (this.previous) lastPoint = this.previous.getLastPoint();
	else lastPoint = new Point2D(0, 0);
	var index = 0;
	while (index < params.length) {
		var point = new Point2D(lastPoint.x + params[index], lastPoint.y + params[index + 1]);
		this.points.push(point);
		index += 2;
	}
};

function RelativeClosePath(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("z", params, owner, previous);
	}
}
RelativeClosePath.prototype = new RelativePathSegment();
RelativeClosePath.prototype.constructor = RelativeClosePath;
RelativeClosePath.superclass = RelativePathSegment.prototype;
RelativeClosePath.prototype.getLastPoint = function() {
	var current = this.previous;
	var point;
	while (current) {
		if (current.command.match(/^[mMzZ]$/)) {
			point = current.getLastPoint();
			break;
		}
		current = current.previous;
	}
	return point;
};
RelativeClosePath.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Line", [this.previous.getLastPoint(), this.getLastPoint()]);
};


function RelativeCurveto2(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("q", params, owner, previous);
	}
}
RelativeCurveto2.prototype = new RelativePathSegment();
RelativeCurveto2.prototype.constructor = RelativeCurveto2;
RelativeCurveto2.superclass = RelativePathSegment.prototype;

RelativeCurveto2.prototype.getControlPoint = function() {
	return this.points[0];
};
RelativeCurveto2.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier2", [this.previous.getLastPoint(), this.points[0], this.points[1]]);
};


function RelativeCurveto3(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("c", params, owner, previous);
	}
}
RelativeCurveto3.prototype = new RelativePathSegment();
RelativeCurveto3.prototype.constructor = RelativeCurveto3;
RelativeCurveto3.superclass = RelativePathSegment.prototype;

RelativeCurveto3.prototype.getLastControlPoint = function() {
	return this.points[1];
};
RelativeCurveto3.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier3", [this.previous.getLastPoint(), this.points[0], this.points[1], this.points[2]]);
};


function RelativeLineto(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("l", params, owner, previous);
	}
}
RelativeLineto.prototype = new RelativePathSegment();
RelativeLineto.prototype.constructor = RelativeLineto;
RelativeLineto.superclass = RelativePathSegment.prototype;

RelativeLineto.prototype.toString = function() {
	var points = new Array();
	var command = "";
	var lastPoint;
	var point;
	if (this.previous) lastPoint = this.previous.getLastPoint();
	else lastPoint = new Point(0, 0);
	point = this.points[0].subtract(lastPoint);
	if (this.previous.constructor != this.constuctor)
		if (this.previous.constructor != RelativeMoveto) cmd = this.command;
	return cmd + point.toString();
};
RelativeLineto.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Line", [this.previous.getLastPoint(), this.points[0]]);
};



function RelativeMoveto(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("m", params, owner, previous);
	}
}
RelativeMoveto.prototype = new RelativePathSegment();
RelativeMoveto.prototype.constructor = RelativeMoveto;
RelativeMoveto.superclass = RelativePathSegment.prototype;



function RelativeSmoothCurveto2(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("t", params, owner, previous);
	}
}
RelativeSmoothCurveto2.prototype = new RelativePathSegment();
RelativeSmoothCurveto2.prototype.constructor = RelativeSmoothCurveto2;
RelativeSmoothCurveto2.superclass = RelativePathSegment.prototype;

RelativeSmoothCurveto2.prototype.getControlPoint = function() {
	var lastPoint = this.previous.getLastPoint();
	var point;
	if (this.previous.command.match(/^[QqTt]$/)) {
		var ctrlPoint = this.previous.getControlPoint();
		var diff = ctrlPoint.subtract(lastPoint);
		point = lastPoint.subtract(diff);
	} else {
		point = lastPoint;
	}
	return point;
};
RelativeSmoothCurveto2.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier2", [this.previous.getLastPoint(), this.getControlPoint(), this.points[0]]);
};



function RelativeSmoothCurveto3(params, owner, previous) {
	if (arguments.length > 0) {
		this.init("s", params, owner, previous);
	}
}
RelativeSmoothCurveto3.prototype = new RelativePathSegment();
RelativeSmoothCurveto3.prototype.constructor = RelativeSmoothCurveto3;
RelativeSmoothCurveto3.superclass = RelativePathSegment.prototype;

RelativeSmoothCurveto3.prototype.getFirstControlPoint = function() {
	var lastPoint = this.previous.getLastPoint();
	var point;
	if (this.previous.command.match(/^[SsCc]$/)) {
		var lastControl = this.previous.getLastControlPoint();
		var diff = lastControl.subtract(lastPoint);
		point = lastPoint.subtract(diff);
	} else {
		point = lastPoint;
	}
	return point;
};
RelativeSmoothCurveto3.prototype.getLastControlPoint = function() {
	return this.points[0];
};
RelativeSmoothCurveto3.prototype.getIntersectionParams = function() {
	return new IntersectionParams("Bezier3", [this.previous.getLastPoint(), this.getFirstControlPoint(), this.points[0], this.points[1]]);
};