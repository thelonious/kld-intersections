/* eslint-disable no-restricted-syntax */
import {Point2D} from "kld-affine";
import ShapeInfo from "./ShapeInfo.js";

class SvgShapes {
    /**
     * circle
     *
     * @param {SVGCircleElement} circle
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static circle(circle) {
        if (circle instanceof SVGCircleElement === false) {
            throw new TypeError(`Expected SVGCircleElement, but found ${circle}`);
        }

        const center = new Point2D(
            circle.cx.baseVal.value,
            circle.cy.baseVal.value
        );
        const radius = circle.r.baseVal.value;

        return ShapeInfo.circle(center, radius);
    }

    /**
     * ellipse
     *
     * @param {SVGEllipseElement} ellipse
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static ellipse(ellipse) {
        if (ellipse instanceof SVGEllipseElement === false) {
            throw new TypeError(`Expected SVGEllipseElement, but found ${ellipse}`);
        }

        const center = new Point2D(
            ellipse.cx.baseVal.value,
            ellipse.cy.baseVal.value
        );
        const radiusX = ellipse.rx.baseVal.value;
        const radiusY = ellipse.ry.baseVal.value;

        return ShapeInfo.ellipse(center, radiusX, radiusY);
    }

    /**
     * line
     *
     * @param {SVGLineElement} line
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static line(line) {
        if (line instanceof SVGLineElement === false) {
            throw new TypeError(`Expected SVGLineElement, but found ${line}`);
        }

        const p1 = new Point2D(
            line.x1.baseVal.value,
            line.y1.baseVal.value
        );
        const p2 = new Point2D(
            line.x2.baseVal.value,
            line.y2.baseVal.value
        );

        return ShapeInfo.line(p1, p2);
    }

    /**
     * path
     *
     * @param {SVGPathElement} path
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static path(path) {
        if (path instanceof SVGPathElement === false) {
            throw new TypeError(`Expected SVGPathElement, but found ${path}`);
        }

        const pathData = path.getAttributeNS(null, "d");

        return ShapeInfo.path(pathData);
    }

    /**
     * polygon
     *
     * @param {SVGPolygonElement} polygon
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static polygon(polygon) {
        if (polygon instanceof SVGPolygonElement === false) {
            throw new TypeError(`Expected SVGPolygonElement, but found ${polygon}`);
        }

        const points = [];

        for (let i = 0; i < polygon.points.numberOfItems; i++) {
            const point = polygon.points.getItem(i);

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
    static polyline(polyline) {
        if (polyline instanceof SVGPolylineElement === false) {
            throw new TypeError(`Expected SVGPolylineElement, but found ${polyline}`);
        }

        const points = [];

        for (let i = 0; i < polyline.points.numberOfItems; i++) {
            const point = polyline.points.getItem(i);

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
    static rect(rect) {
        if (rect instanceof SVGRectElement === false) {
            throw new TypeError(`Expected SVGRectElement, but found ${rect}`);
        }

        return ShapeInfo.rectangle(
            rect.x.baseVal.value,
            rect.y.baseVal.value,
            rect.width.baseVal.value,
            rect.height.baseVal.value,
            rect.rx.baseVal.value,
            rect.ry.baseVal.value
        );
    }

    /**
     * element
     *
     * @param {SVGElement} element
     * @returns {module:kld-intersections.ShapeInfo}
     */
    static element(element) {
        if (element instanceof SVGElement === false) {
            throw new TypeError(`Expected SVGElement, but found ${element}`);
        }

        /* eslint-disable-next-line prefer-destructuring */
        const tagName = element.tagName;

        switch (tagName) {
            case "circle":
                return SvgShapes.circle(element);
            case "ellipse":
                return SvgShapes.ellipse(element);
            case "line":
                return SvgShapes.line(element);
            case "path":
                return SvgShapes.path(element);
            case "polygon":
                return SvgShapes.polygon(element);
            case "polyline":
                return SvgShapes.polyline(element);
            case "rect":
                return SvgShapes.rect(element);
            default:
                throw new TypeError(`Unrecognized element type: '${tagName}'`);
        }
    }
}

export default SvgShapes;
