import assert from "assert";
import {Shapes, Intersection, Point2D} from "../index.js";

/**
 * A sorter for Point2Ds
 *
 * @param {Point2D} p1
 * @param {Point2D} p2
 * @returns {number}
 */
function pointSorter(p1, p2) {
    if (p1.x < p2.x) {
        return -1;
    }
    else if (p1.x > p2.x) {
        return 1;
    }
    else if (p1.y < p2.y) {
        return -1;
    }
    else if (p1.y > p2.y) {
        return 1;
    }

    return 0;
}

/**
 * Assert two points for equality
 *
 * @param {Array<Point2D>} points1
 * @param {Array<Point2D>} points2
 */
function assertEqualPoints(points1, points2) {
    assert.strictEqual(points1.length, points2.length);

    /* eslint-disable-next-line unicorn/no-for-loop */
    for (let i = 0; i < points1.length; i++) {
        const p1 = points1[i];
        const p2 = points2[i];

        assert(p1.equals(p2));
    }
}

/**
 * Intersect two shapes and assert the intersection points
 *
 * @param {ShapeInfo} shape1
 * @param {ShapeInfo} shape2
 * @param {Array<Point2D>} expected
 */
function assertIntersections(shape1, shape2, expected) {
    const result = Intersection.intersect(shape1, shape2);
    const points = result.points.sort(pointSorter);

    assertEqualPoints(points, expected);
}

describe("Intersections", () => {
    it("Quadratic Bezier - Quadratic Bezier", () => {
        const shape1 = Shapes.path("M83,214 Q335,173 91,137");
        const shape2 = Shapes.path("M92,233 Q152,30 198,227");

        const expected = [
            new Point2D(98.72720538504241, 211.3625905201401),
            new Point2D(129.54187987698563, 143.27285394359626),
            new Point2D(173.83770343111445, 152.940611499889),
            new Point2D(188.27575037023598, 190.33459908605727)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Quadratic Bezier - Cubic Bezier", () => {
        const shape1 = Shapes.path("M123,47 Q146,255 188,47");
        const shape2 = Shapes.path("M171,143 C22,132 330,64 107,65");
        const expected = [
            new Point2D(125.13460408076253, 65.08475401519482),
            new Point2D(134.49717251169614, 120.3114904768965),
            new Point2D(140.0203543393166, 138.4178510972871),
            new Point2D(160.68034080878516, 142.07160371675803),
            new Point2D(177.7766308623799, 92.57967705087721),
            new Point2D(182.93500601086055, 70.88034340965095)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Quadratic Bezier - Circle", () => {
        const shape1 = Shapes.path("M50,20 Q200,300 350,10");
        const shape2 = Shapes.circle(80, 80, 40);
        const expected = [
            new Point2D(63.27523884077001, 43.66431004966725),
            new Point2D(108.75184271113037, 107.8088392550718)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Quadratic Bezier - Ellipse", () => {
        const shape1 = Shapes.path("M50,20 Q200,300 350,10");
        const shape2 = Shapes.ellipse(80, 80, 30, 40);
        const expected = [
            new Point2D(64.5070161096711, 45.74689113414642),
            new Point2D(104.55299413054938, 102.98407097584307)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Quadratic Bezier - Line", () => {
        const shape1 = Shapes.path("M50,20 Q200,300 350,10");
        const shape2 = Shapes.line(10, 20, 300, 210);
        const expected = [
            new Point2D(74.86365117074867, 62.49687490497326),
            new Point2D(216.42491507244551, 155.2439098750505)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Quadratic Bezier - Polygon", () => {
        const shape1 = Shapes.path("M50,20 Q200,300 350,10");
        const shape2 = Shapes.polygon([58, 30, 110, 27, 135, 108, 74, 145, 28, 108, 26, 53]);
        const expected = [
            new Point2D(56.18558820664384, 31.304108476474752),
            new Point2D(118.41228100507112, 118.06140332479293)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Quadratic Bezier - Rectangle", () => {
        const shape1 = Shapes.path("M50,20 Q200,300 350,10");
        const shape2 = Shapes.rectangle(35, 25, 80, 100);
        const expected = [
            new Point2D(52.70336708542367, 25.000000000000014),
            new Point2D(115, 114.575)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Cubic Bezier - Cubic Bezier", () => {
        const shape1 = Shapes.path("M203,140 C206,359 245,6 248,212");
        const shape2 = Shapes.path("M177,204 C441,204 8,149 265,154");
        const expected = [
            new Point2D(203.26720646036085, 154.38186574206628),
            new Point2D(203.80448029878028, 171.0080340325034),
            new Point2D(206.53089745589955, 203.7205799064048),
            new Point2D(218.26560490823644, 203.3977092167175),
            new Point2D(226.37034491873996, 177.96211427292837),
            new Point2D(234.28537892520342, 153.67909587175902),
            new Point2D(244.55650504358164, 153.7151359675932),
            new Point2D(247.269811682568, 184.6978038847097),
            new Point2D(247.8042453163769, 201.4484074305467)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Cubic Bezier - Circle", () => {
        const shape1 = Shapes.path("M50,20 C50,210 250,20 250,210");
        const shape2 = Shapes.circle(80, 80, 40);
        const expected = [
            new Point2D(52.22352295755968, 51.21689170519913),
            new Point2D(104.03665107361067, 111.97247887113267)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Cubic Bezier - Ellipse", () => {
        const shape1 = Shapes.path("M50,20 C50,210 250,20 250,210");
        const shape2 = Shapes.ellipse(80, 80, 30, 40);
        const expected = [
            new Point2D(53.96110954819515, 60.1348464093258),
            new Point2D(99.14716919990332, 110.79353212407386)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Cubic Bezier - Line", () => {
        const shape1 = Shapes.path("M50,20 C50,210 250,20 250,210");
        const shape2 = Shapes.line(10, 20, 300, 210);
        const expected = [
            new Point2D(51.64783510324115, 47.286512653847666),
            new Point2D(155.00539377733003, 115.0035338541128),
            new Point2D(247.19292496558265, 175.4022611843473)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Cubic Bezier - Polygon", () => {
        const shape1 = Shapes.path("M50,20 C50,210 250,20 250,210");
        const shape2 = Shapes.polygon([58, 30, 110, 27, 135, 108, 74, 145, 28, 108, 26, 53]);
        const expected = [
            new Point2D(50.48246685800199, 35.403226945811014),
            new Point2D(124.27379778337522, 114.50605708221505)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Cubic Bezier - Rectangle", () => {
        const shape1 = Shapes.path("M50,20 C50,210 250,20 250,210");
        const shape2 = Shapes.rectangle(35, 25, 80, 100);
        const expected = [
            new Point2D(50.04756726751318, 24.99999999999999),
            new Point2D(115, 113.72223572223957)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Circle - Circle", () => {
        const shape1 = Shapes.circle(70, 80, 50);
        const shape2 = Shapes.circle(140, 135, 80);
        const expected = [
            new Point2D(60.22271286332645, 129.03472908303905),
            new Point2D(115.32933760985969, 58.899024860178585)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Circle - Ellipse", () => {
        const shape1 = Shapes.circle(100, 100, 50);
        const shape2 = Shapes.ellipse(150, 120, 40, 50);
        const expected = [
            new Point2D(116.445893489817, 147.21792654619213),
            new Point2D(140.94197183977488, 71.29886863081731)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Circle - Line", () => {
        const shape1 = Shapes.circle(105, 115, 80);
        const shape2 = Shapes.line(16, 89, 200, 15);
        const expected = [
            new Point2D(31.84191758151497, 82.62879401612986),
            new Point2D(135.3745982325804, 40.990650710810044)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Circle - Polygon", () => {
        const shape1 = Shapes.circle(120, 75, 50);
        const shape2 = Shapes.polygon([48, 20, 100, 17, 125, 98, 64, 135, 18, 98, 16, 43]);
        const expected = [
            new Point2D(93.26257976100801, 117.25056637447055),
            new Point2D(103.34990500791412, 27.853692225641723)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Circle - Rectangle", () => {
        const shape1 = Shapes.circle(90, 55, 40);
        const shape2 = Shapes.rectangle(30, 35, 75, 100);
        const expected = [
            new Point2D(55.35898384862246, 35),
            new Point2D(105, 92.08099243547831)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Ellipse - Ellipse", () => {
        const shape1 = Shapes.ellipse(100, 100, 50, 40);
        const shape2 = Shapes.ellipse(150, 120, 40, 50);
        const expected = [
            new Point2D(112.88633296444475, 138.6487147334415),
            new Point2D(136.70828576029288, 72.84118698863836)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Ellipse - Line", () => {
        const shape1 = Shapes.ellipse(100, 100, 50, 40);
        const shape2 = Shapes.line(50, 50, 150, 150);
        const expected = [
            new Point2D(68.76524762227879, 68.76524762227879),
            new Point2D(131.2347523777212, 131.2347523777212)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Ellipse - Polygon", () => {
        const shape1 = Shapes.ellipse(100, 100, 50, 40);
        const shape2 = Shapes.polygon([48, 20, 100, 17, 125, 98, 64, 135, 18, 98, 16, 43]);
        const expected = [
            new Point2D(69.47373132371456, 131.67986788561578),
            new Point2D(113.74741995085054, 61.54164064075573)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Ellipse - Rectangle", () => {
        const shape1 = Shapes.ellipse(100, 100, 50, 40);
        const shape2 = Shapes.rectangle(35, 25, 80, 100);
        const expected = [
            new Point2D(60.96876251001001, 125),
            new Point2D(115, 61.842431943322175)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Line - Line", () => {
        const shape1 = Shapes.line(48, 27, 180, 116);
        const shape2 = Shapes.line(180, 27, 48, 116);

        const expected = [new Point2D(114, 71.5)];

        assertIntersections(shape1, shape2, expected);
    });
    it("Line - Polygon", () => {
        const shape1 = Shapes.line(20, 20, 100, 150);
        const shape2 = Shapes.polygon([48, 20, 100, 17, 125, 98, 64, 135, 18, 98, 16, 43]);

        const expected = [
            new Point2D(28.586666666666666, 33.95333333333333),
            new Point2D(83.4931129476584, 123.1763085399449)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Line - Rectangle", () => {
        const shape1 = Shapes.line(16, 89, 135, 59);
        const shape2 = Shapes.rectangle(35, 25, 80, 100);

        const expected = [
            new Point2D(35, 84.21008403361344),
            new Point2D(115, 64.0420168067227)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Path - Circle", () => {
        const shape1 = Shapes.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
        const shape2 = Shapes.circle(80, 80, 40);
        const expected = [
            new Point2D(40.49378036925451, 73.734330802915),
            new Point2D(48.0811192546348, 104.10777990531592),
            new Point2D(61.93906996427922, 115.69037413988258),
            new Point2D(118.18197295998756, 68.07788018501833)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Path - Ellipse", () => {
        const shape1 = Shapes.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
        const shape2 = Shapes.ellipse(80, 80, 30, 40);
        const expected = [
            new Point2D(65.40567989067512, 114.94772783703729),
            new Point2D(108.91468665042117, 69.33825981200226)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Path - Line", () => {
        const shape1 = Shapes.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
        const shape2 = Shapes.line(15, 75, 355, 140);
        const expected = [
            new Point2D(41.469363095003175, 80.0603194152212),
            new Point2D(90.39284374732412, 89.41333777522375),
            new Point2D(131.75979837885328, 97.32172616066313),
            new Point2D(147.372304199773, 100.30646992054483),
            new Point2D(174.0025359682078, 105.3975436409809),
            new Point2D(224.63128285241436, 115.07656878060865),
            new Point2D(278.6635091553598, 125.40625910323052),
            new Point2D(335.91913398904643, 136.35218738025884)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    // it("Path - Path", () => assert.fail());
    it("Path - Polygon", () => {
        const shape1 = Shapes.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
        const shape2 = Shapes.polygon([100, 50, 160, 40, 185, 120, 120, 165, 70, 120, 80, 70]);
        const expected = [
            new Point2D(71.72741550068481, 111.36292249657606),
            new Point2D(182.8756171982404, 113.20197503436931)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Path - Rectangle", () => {
        const shape1 = Shapes.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
        const shape2 = Shapes.rectangle(94, 45, 80, 100);
        const expected = [
            new Point2D(94, 84.28119297784802),
            new Point2D(174, 105.39445191110119)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Relative Path - Circle", () => {
        const shape1 = Shapes.path("M40,70 q10,80 50,20 t45,40 l25,-60 c20,110 120,-15 120,70 s120,-30 10,-40");
        const shape2 = Shapes.circle(80, 80, 40);
        const expected = [
            new Point2D(40.49378036925451, 73.734330802915),
            new Point2D(48.0811192546348, 104.10777990531592),
            new Point2D(61.93906996427922, 115.69037413988258),
            new Point2D(118.18197295998756, 68.07788018501833)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Relative Path - Ellipse", () => {
        const shape1 = Shapes.path("M40,70 q10,80 50,20 t45,40 l25,-60 c20,110 120,-15 120,70 s120,-30 10,-40");
        const shape2 = Shapes.ellipse(80, 80, 30, 40);
        const expected = [
            new Point2D(65.40567989067512, 114.94772783703729),
            new Point2D(108.91468665042117, 69.33825981200226)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Relative Path - Line", () => {
        const shape1 = Shapes.path("M40,70 q10,80 50,20 t45,40 l25,-60 c20,110 120,-15 120,70 s120,-30 10,-40");
        const shape2 = Shapes.line(15, 75, 355, 140);
        const expected = [
            new Point2D(41.469363095003175, 80.0603194152212),
            new Point2D(90.39284374732412, 89.41333777522375),
            new Point2D(131.75979837885328, 97.32172616066313),
            new Point2D(147.372304199773, 100.30646992054483),
            new Point2D(174.0025359682078, 105.3975436409809),
            new Point2D(224.63128285241436, 115.07656878060865),
            new Point2D(278.6635091553598, 125.40625910323052),
            new Point2D(335.91913398904643, 136.35218738025884)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    // it("Relative Path - Relative Path", () => assert.fail());
    it("Relative Path - Polygon", () => {
        const shape1 = Shapes.path("M40,70 q10,80 50,20 t45,40 l25,-60 c20,110 120,-15 120,70 s120,-30 10,-40");
        const shape2 = Shapes.polygon([100, 50, 160, 40, 185, 120, 120, 165, 70, 120, 80, 70]);
        const expected = [
            new Point2D(71.72741550068481, 111.36292249657606),
            new Point2D(182.8756171982404, 113.20197503436931)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Relative Path - Rectangle", () => {
        const shape1 = Shapes.path("M40,70 q10,80 50,20 t45,40 l25,-60 c20,110 120,-15 120,70 s120,-30 10,-40");
        const shape2 = Shapes.rectangle(94, 45, 80, 100);
        const expected = [
            new Point2D(94, 84.28119297784802),
            new Point2D(174, 105.39445191110119)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Polygon - Polygon", () => {
        const shape1 = Shapes.polygon([48, 20, 100, 17, 125, 98, 64, 130, 18, 98]);
        const shape2 = Shapes.polygon([20, 48, 17, 100, 98, 125, 130, 64, 98, 18, 43, 16]);
        const expected = [
            new Point2D(23.965325936199722, 102.1497919556172),
            new Point2D(82.59485061938305, 120.24532426524168),
            new Point2D(88.59479553903346, 17.65799256505576),
            new Point2D(102.1497919556172, 23.965325936199726),
            new Point2D(107.29032258064517, 107.29032258064515),
            new Point2D(120.24532426524168, 82.59485061938304)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Polygon - Rectangle", () => {
        const shape1 = Shapes.polygon([48, 20, 100, 17, 125, 98, 64, 130, 18, 98]);
        const shape2 = Shapes.rectangle(60, 30, 100, 80);
        const expected = [
            new Point2D(102.125, 110),
            new Point2D(104.01234567901234, 30)
        ];

        assertIntersections(shape1, shape2, expected);
    });
    it("Rectangle - Rectangle", () => {
        const shape1 = Shapes.rectangle(35, 25, 80, 100);
        const shape2 = Shapes.rectangle(55, 45, 120, 110);
        const expected = [
            new Point2D(55, 125),
            new Point2D(115, 45)
        ];

        assertIntersections(shape1, shape2, expected);
    });
});
