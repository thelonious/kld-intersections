import {Point2D, Vector2D} from "kld-affine";
import {PathParser} from "kld-path-parser";
import PathHandler from "./PathHandler.js";
import IntersectionArgs from "./IntersectionArgs.js";

class SvgShapes {
    /**
     * circle
     *
     * @param {SVGCircleElement} circle
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static circle(circle) {
        const center = new Point2D(
            circle.cx.baseVal.value,
            circle.cy.baseVal.value
        );
        const radius = circle.r.baseVal.value;

        return new IntersectionArgs("Circle", [center, radius]);
    }

    /**
     * ellipse
     *
     * @param {SVGEllipseElement} ellipse
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static ellipse(ellipse) {
        const center = new Point2D(
            ellipse.cx.baseVal.value,
            ellipse.cy.baseVal.value
        );
        const radiusX = ellipse.rx.baseVal.value;
        const radiusY = ellipse.ry.baseVal.value;

        return new IntersectionArgs("Ellipse", [center, radiusX, radiusY]);
    }

    /**
     * line
     *
     * @param {SVGLineElement} line
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static line(line) {
        const p1 = new Point2D(
            line.x1.baseVal.value,
            line.y1.baseVal.value
        );
        const p2 = new Point2D(
            line.x2.baseVal.value,
            line.y2.baseVal.value
        );

        return new IntersectionArgs("Line", [p1, p2]);
    }

    /**
     * path
     *
     * @param {SVGPathElement} path
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static path(path) {
        const pathData = path.getAttributeNS(null, "d");

        // TODO: cache parser and handler
        const parser = new PathParser();
        const handler = new PathHandler();

        parser.setHandler(handler);
        parser.parseData(pathData);

        return new IntersectionArgs("Path", handler.shapes);
    }

    /**
     * polygon
     *
     * @param {SVGPolygonElement} polygon
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static polygon(polygon) {
        const points = [];

        for (let i = 0; i < polygon.points.length; i++) {
            const point = polygon.points.getItem(i);

            points.push(new Point2D(point.x, point.y));
        }

        return new IntersectionArgs("Polygon", [points]);
    }

    /**
     * polyline
     *
     * @param {SVGPolylineElement} polyline
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static polyline(polyline) {
        const points = [];

        for (let i = 0; i < polyline.points.length; i++) {
            const point = polyline.points.getItem(i);

            points.push(new Point2D(point.x, point.y));
        }

        return new IntersectionArgs("Polygon", [points]);
    }

    /**
     * rect
     *
     * @param {SVGRectElement} rect
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static rect(rect) {
        // TODO: add support for rounded rectangles
        const topLeft = new Point2D(
            rect.x.baseVal.value,
            rect.y.baseVal.value
        );
        const size = new Vector2D(
            rect.width.baseVal.value,
            rect.height.baseVal.value
        );

        return new IntersectionArgs("Rectangle", [topLeft, topLeft.add(size)]);
    }

    /**
     * element
     *
     * @param {SVGElement} element
     * @returns {module:kld-intersections.IntersectionArgs}
     */
    static element(element) {
        /* eslint-disable-next-line prefer-destructuring */
        const tagName = element.tagName;

        if (typeof SvgShapes[tagName] === "function") {
            return SvgShapes[tagName](element);
        }

        throw new TypeError(`Unrecognized element type: '${tagName}'`);
    }
}

export default SvgShapes;
