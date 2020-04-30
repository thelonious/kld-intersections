import assert from "assert";
import {Point2D, Vector2D} from "../index.js";

const EPSILON = 0.1; //1e-6;
const TWO_PI = Math.PI * 2.0;

const angleStep = 100;
const centerX = 100;
const centerY = 75;
const radius = 50;

describe("Arc Angles", () => {
	for (let startAngle = 0; startAngle < 360; startAngle += angleStep) {
		for (let endAngle = 0; endAngle < 360; endAngle += angleStep) {
			if (startAngle === endAngle) {
				continue;
			}

			it(`${startAngle} - ${endAngle}`, () => {
				const [startPoint, endPoint, flagA, flagS] = getArcCommandParameters(
					centerX, centerY,
					radius, radius,
					toRadians(startAngle), toRadians(endAngle)
				);
				const [cx, cy, rx, ry, sa, ea] = getArcParameters(
					startPoint, endPoint,
					radius, radius,
					toRadians(endAngle - startAngle),
					flagA, flagS
				);

				// assertNumbers(cx, centerX, "center x");
				// assertNumbers(cy, centerY, "center y");
				assertNumbers(rx, radius, "radius x");
				assertNumbers(ry, radius, "radius y");
				assertNumbers(sa < 0 ? sa + TWO_PI : sa, toRadians(startAngle), "start angle");
				assertNumbers(ea < 0 ? ea + TWO_PI : ea, toRadians(endAngle), "end angle");
			});
		}
	}
});

function assertNumbers(a, b, message) {
	assert(Math.abs(a - b) < EPSILON, `${message}: ${a} != ${b}`);
}

function toRadians(degrees) {
	return Math.PI * degrees / 180.0;
}

function toCartesian(centerX, centerY, radiusX, radiusY, angleRadians) {
    return new Point2D(
        centerX + (radiusX * Math.cos(angleRadians)),
        centerY + (radiusY * Math.sin(angleRadians))
    );
}

function getArcCommandParameters(centerX, centerY, radiusX, radiusY, startRadians, endRadians) {
	return [
		toCartesian(centerX, centerY, radiusX, radiusY, startRadians),
		toCartesian(centerX, centerY, radiusX, radiusY, endRadians),
		(endRadians - startRadians) > Math.PI ? 1 : 0,
		(endRadians - startRadians) > 0 ? 1 : 0
	];
}

function getArcParameters(startPoint, endPoint, rx, ry, angle, arcFlag, sweepFlag) {
    angle = angle * Math.PI / 180;

    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const TOLERANCE = 1e-6;

    // Section (F.6.5.1)
    const halfDiff = startPoint.subtract(endPoint).multiply(0.5);
    const x1p = halfDiff.x * c + halfDiff.y * s;
    const y1p = halfDiff.x * -s + halfDiff.y * c;

    // Section (F.6.6.1)
    rx = Math.abs(rx);
    ry = Math.abs(ry);

    // Section (F.6.6.2)
    const x1px1p = x1p * x1p;
    const y1py1p = y1p * y1p;
    const lambda = (x1px1p / (rx * rx)) + (y1py1p / (ry * ry));

    // Section (F.6.6.3)
    if (lambda > 1) {
        const factor = Math.sqrt(lambda);

        rx *= factor;
        ry *= factor;
    }

    // Section (F.6.5.2)
    const rxrx = rx * rx;
    const ryry = ry * ry;
    const rxy1 = rxrx * y1py1p;
    const ryx1 = ryry * x1px1p;

    let factor = (rxrx * ryry - rxy1 - ryx1) / (rxy1 + ryx1);

    if (Math.abs(factor) < TOLERANCE) {
        factor = 0;
    }

    let sq = Math.sqrt(factor);

    if (arcFlag === sweepFlag) {
        sq = -sq;
    }

    // Section (F.6.5.3)
    const mid = startPoint.add(endPoint).multiply(0.5);
    const cxp = sq * rx * y1p / ry;
    const cyp = sq * -ry * x1p / rx;

    // Section (F.6.5.5 - F.6.5.6)
    const xcr1 = (x1p - cxp) / rx;
    const xcr2 = (x1p + cxp) / rx;
    const ycr1 = (y1p - cyp) / ry;
    const ycr2 = (y1p + cyp) / ry;

    const theta1 = new Vector2D(1, 0).angleBetween(new Vector2D(xcr1, ycr1));
    // let deltaTheta = normalizeAngle(new Vector2D(xcr1, ycr1).angleBetween(new Vector2D(-xcr2, -ycr2)));
    let deltaTheta = new Vector2D(xcr1, ycr1).angleBetween(new Vector2D(-xcr2, -ycr2)) % TWO_PI;

    if (sweepFlag === false) {
        deltaTheta -= TWO_PI;
    }

    console.log(deltaTheta);

    return [
        cxp * c - cyp * s + mid.x,
        cxp * s + cyp * c + mid.y,
        rx,
        ry,
        theta1,
        theta1 + deltaTheta
    ];
}
